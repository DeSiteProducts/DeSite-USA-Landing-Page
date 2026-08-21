import { spawn } from "node:child_process";
import { once } from "node:events";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import net from "node:net";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const appPort = Number(process.env.SMOKE_APP_PORT ?? "3100");
const smtpPort = Number(process.env.SMOKE_SMTP_PORT ?? "2525");
const appUrl = `http://127.0.0.1:${appPort}`;
const receivedMessages = [];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function createMockSmtpServer() {
  return net.createServer((socket) => {
    let buffer = "";
    let dataMode = false;
    let message = "";
    let authLoginStep = 0;

    socket.setEncoding("utf8");
    socket.write("220 localhost ESMTP smoke-test\r\n");

    function handleLine(line) {
      if (dataMode) {
        if (line === ".") {
          receivedMessages.push(message);
          message = "";
          dataMode = false;
          socket.write("250 2.0.0 Message accepted\r\n");
          return;
        }

        message += `${line}\n`;
        return;
      }

      if (authLoginStep === 1) {
        authLoginStep = 2;
        socket.write("334 UGFzc3dvcmQ6\r\n");
        return;
      }

      if (authLoginStep === 2) {
        authLoginStep = 0;
        socket.write("235 2.7.0 Authentication successful\r\n");
        return;
      }

      const upperLine = line.toUpperCase();

      if (upperLine.startsWith("EHLO") || upperLine.startsWith("HELO")) {
        socket.write(
          "250-localhost\r\n250-AUTH PLAIN LOGIN\r\n250 8BITMIME\r\n"
        );
        return;
      }

      if (upperLine.startsWith("AUTH PLAIN")) {
        socket.write("235 2.7.0 Authentication successful\r\n");
        return;
      }

      if (upperLine === "AUTH LOGIN") {
        authLoginStep = 1;
        socket.write("334 VXNlcm5hbWU6\r\n");
        return;
      }

      if (
        upperLine.startsWith("MAIL FROM") ||
        upperLine.startsWith("RCPT TO") ||
        upperLine === "RSET" ||
        upperLine.startsWith("NOOP")
      ) {
        socket.write("250 2.0.0 OK\r\n");
        return;
      }

      if (upperLine === "DATA") {
        dataMode = true;
        socket.write("354 End data with <CR><LF>.<CR><LF>\r\n");
        return;
      }

      if (upperLine === "QUIT") {
        socket.write("221 2.0.0 Bye\r\n");
        socket.end();
        return;
      }

      socket.write("250 2.0.0 OK\r\n");
    }

    socket.on("data", (chunk) => {
      buffer += chunk;

      let nextLineIndex = buffer.indexOf("\n");
      while (nextLineIndex !== -1) {
        const line = buffer.slice(0, nextLineIndex).replace(/\r$/, "");
        buffer = buffer.slice(nextLineIndex + 1);
        handleLine(line);
        nextLineIndex = buffer.indexOf("\n");
      }
    });
  });
}

async function waitForApp() {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${appUrl}/shipping-quote`, {
        redirect: "manual",
      });

      if (response.ok) {
        return;
      }
    } catch {
      // The server is still starting.
    }

    await new Promise((resolveDelay) => setTimeout(resolveDelay, 500));
  }

  throw new Error("Timed out waiting for Next.js production server.");
}

async function postQuote(formValues) {
  return fetch(`${appUrl}/api/shipping-quote`, {
    method: "POST",
    body: new URLSearchParams(formValues),
    redirect: "manual",
  });
}

function validateHtmlPatterns(markup) {
  assert(
    markup.includes("Shipping Quote"),
    "Shipping quote page should render the guided quote experience."
  );

  assert(
    !markup.includes("[\\s.-]"),
    "Rendered HTML should not include the browser-incompatible phone pattern."
  );

  const patterns = [...markup.matchAll(/pattern="([^"]+)"/g)];

  for (const [, pattern] of patterns) {
    new RegExp(pattern, "v");
  }
}

async function run() {
  const smtpServer = createMockSmtpServer();
  smtpServer.listen(smtpPort, "127.0.0.1");
  await once(smtpServer, "listening");

  const app = spawn("npm", ["run", "start", "--", "-p", String(appPort)], {
    cwd: projectRoot,
    env: {
      ...process.env,
      NEXT_PUBLIC_SITE_URL: appUrl,
      SMTP_HOST: "127.0.0.1",
      SMTP_PORT: String(smtpPort),
      SMTP_USER: "smoke@example.com",
      SMTP_PASS: "smoke-password",
      SMTP_FROM: "smoke@example.com",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  const logs = [];
  app.stdout.on("data", (chunk) => logs.push(chunk.toString()));
  app.stderr.on("data", (chunk) => logs.push(chunk.toString()));

  try {
    await waitForApp();

    const formPageResponse = await fetch(`${appUrl}/shipping-quote`);
    const formPageMarkup = await formPageResponse.text();
    validateHtmlPatterns(formPageMarkup);

    const invalidResponse = await postQuote({
      vibrationNeeded: "Yes",
      bucketWidthRange: "69-84",
      fullName: "",
      phone: "123",
      email: "bad-email",
      streetAddress: "",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      country: "United States",
      financing: "Yes",
      consent: "accepted",
    });
    assert(invalidResponse.status === 303, "Invalid form should return 303.");
    assert(
      invalidResponse.headers
        .get("location")
        ?.startsWith(`${appUrl}/shipping-quote?error=1`),
      "Invalid form should redirect back to the form with error=1."
    );
    assert(
      receivedMessages.length === 0,
      "Invalid form should not send an email."
    );

    const validResponse = await postQuote({
      vibrationNeeded: "Yes",
      bucketWidthRange: "69-84",
      fullName: "Amplify Smoke Test",
      phone: "(877) 254 7903",
      email: "lead@example.com",
      streetAddress: "123 Test Road",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      country: "United States",
      financing: "Yes",
      consent: "accepted",
    });
    assert(validResponse.status === 303, "Valid form should return 303.");

    const successLocation = validResponse.headers.get("location") ?? "";
    assert(
      successLocation.startsWith(`${appUrl}/thank-you?success=1`),
      "Valid form should redirect to thank-you with success=1."
    );
    assert(
      successLocation.includes("model=78+ProScreen"),
      "Success redirect should include the recommended model for compatibility."
    );
    assert(
      successLocation.includes("recommendedModel=78+ProScreen"),
      "Success redirect should include the recommended model."
    );
    assert(
      successLocation.includes("bucketWidthRange=69-84"),
      "Success redirect should include the bucket width range."
    );
    assert(receivedMessages.length === 1, "Valid form should send one email.");
    assert(
      receivedMessages[0].includes("Amplify Smoke Test") &&
        receivedMessages[0].includes("lead@example.com") &&
        receivedMessages[0].includes("Recommended Model: 78 ProScreen") &&
        receivedMessages[0].includes("Vibration Screener Needed: Yes") &&
        receivedMessages[0].includes("Bucket Width Range: 69-84") &&
        receivedMessages[0].includes("Phone: (877) 254 7903") &&
        receivedMessages[0].includes("78 ProScreen"),
      "Captured email should include submitted lead details."
    );

    const smallBucketResponse = await postQuote({
      vibrationNeeded: "Yes",
      bucketWidthRange: "0-56",
      fullName: "Small Bucket Smoke Test",
      phone: "(806) 500 3915",
      email: "small-bucket@example.com",
      streetAddress: "456 Compact Lane",
      city: "Austin",
      state: "TX",
      zipCode: "78702",
      country: "United States",
      financing: "No",
      consent: "accepted",
    });
    assert(
      smallBucketResponse.status === 303,
      "Small bucket valid form should return 303."
    );

    const smallBucketLocation =
      smallBucketResponse.headers.get("location") ?? "";
    assert(
      smallBucketLocation.includes("model=SLG+56") &&
        smallBucketLocation.includes("recommendedModel=SLG+56") &&
        smallBucketLocation.includes("bucketWidthRange=0-56"),
      "0-56 with vibration selected should recommend SLG 56."
    );
    assert(
      receivedMessages.length === 2,
      "Second valid form should send a second email."
    );
    assert(
      receivedMessages[1].includes("Small Bucket Smoke Test") &&
        receivedMessages[1].includes("Recommended Model: SLG 56") &&
        receivedMessages[1].includes("Vibration Screener Needed: Yes") &&
        receivedMessages[1].includes("Bucket Width Range: 0-56") &&
        receivedMessages[1].includes("Phone: (806) 500 3915"),
      "0-56 vibration email should include the SLG 56 recommendation."
    );

    console.log("Shipping quote smoke test passed.");
  } catch (error) {
    console.error(logs.join(""));
    throw error;
  } finally {
    app.kill("SIGTERM");
    smtpServer.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
