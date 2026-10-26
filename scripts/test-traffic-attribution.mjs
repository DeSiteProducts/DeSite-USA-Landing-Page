import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const requireModule = createRequire(import.meta.url);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function load(relative, globals = {}, imports = {}) {
  const filename = path.resolve(projectRoot, relative);
  const code = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports, URL, URLSearchParams, Uint32Array, crypto: globalThis.crypto, process, console,
    require: (name) => imports[name] ?? requireModule(name), ...globals,
  }, { filename });
  return exports;
}

async function run() {
  const attribution = load("app/lib/traffic-attribution.ts");
  const base = "https://desiteproducts.com/";
  for (const [query, referrer, expected] of [
    ["?utm_source=facebook", "", "facebook"],
    ["?utm_source=ig", "", "instagram"],
    ["?utm_source=GOOGLE&utm_medium=CPC", "", "google_ads"],
    ["?gclid=example", "", "google_ads"],
    ["?wbraid=example", "", "google_ads"],
    ["?gbraid=example", "", "google_ads"],
    ["?utm_source=google&utm_medium=organic", "", "google"],
    ["", "https://www.google.co.cr/search?q=test", "google"],
    ["", "https://l.facebook.com/", "facebook"],
    ["", "https://l.instagram.com/", "instagram"],
    ["?fbclid=example", "", "meta"],
    ["", "", "direct_unknown"],
    ["", `${base}models/slg-56`, "direct_unknown"],
    ["", "https://facebook.com.evil.example/", "other"],
    ["?utm_source=newsletter", "https://google.com/", "other"],
  ]) {
    assert.equal(attribution.detectTrafficAttribution(base + query, referrer).source, expected);
  }
  assert.equal(attribution.detectTrafficAttribution(base + "?email=private#secret", "").landingPage, base);
  assert.equal(attribution.normalizeTrafficAttribution({ source: "invalid" }).source, "direct_unknown");
  assert.equal(attribution.normalizeTrafficAttribution({ utmCampaign: "x".repeat(500) }).utmCampaign.length, 200);

  const saved = new Map();
  const browser = {
    location: { href: base + "?utm_source=instagram&utm_campaign=spring" },
    sessionStorage: { getItem: (key) => saved.get(key), setItem: (key, value) => saved.set(key, value) },
  };
  let client = load("app/lib/traffic-attribution.ts", { window: browser, document: { referrer: "" } });
  assert.equal(client.getVisitAttribution().source, "instagram");
  browser.location.href = base + "shipping-quote";
  client = load("app/lib/traffic-attribution.ts", { window: browser, document: { referrer: base } });
  assert.equal(client.getVisitAttribution().source, "instagram", "Full navigation preserves the first source");
  browser.sessionStorage.getItem = () => { throw new Error("Storage blocked"); };
  browser.sessionStorage.setItem = () => { throw new Error("Storage blocked"); };
  client = load("app/lib/traffic-attribution.ts", { window: browser, document: { referrer: "https://facebook.com/" } });
  assert.equal(client.getVisitAttribution().source, "facebook");

  let payload;
  const route = load("app/api/shipping-quote/route.ts", {
    fetch: async (_url, options) => { payload = JSON.parse(options.body); return { ok: true }; },
  }, {
    "../../lib/traffic-attribution": attribution,
    "../../shipping-quote/quote-flow": load("app/shipping-quote/quote-flow.ts"),
  });
  const flow = load("app/shipping-quote/quote-flow.ts");
  const values = {
    vibrationNeeded: flow.VIBRATION_OPTIONS[0], bucketWidthRange: flow.BUCKET_WIDTH_OPTIONS[0],
    leadTime: flow.LEAD_TIME_OPTIONS[0], fullName: "Attribution Test", phone: "8772547903",
    email: "test@example.com", streetAddress: "123 Test", city: "Austin", state: "TX",
    zipCode: "78701", country: "United States", financing: "No", consent: "accepted",
  };
  for (const [raw, expected] of [
    [JSON.stringify(attribution.detectTrafficAttribution(base + "?utm_source=instagram", "")), "instagram"],
    ["malformed", "direct_unknown"], ["", "direct_unknown"],
  ]) {
    const response = await route.POST(new Request(base + "api/shipping-quote", {
      method: "POST", body: new URLSearchParams({ ...values, trafficAttribution: raw }),
    }));
    assert.equal(response.status, 303);
    assert.ok(response.headers.get("location").includes("/thank-you?"));
    assert.equal(payload.leadSource, expected);
    assert.equal(payload.trafficAttribution.source, expected);
  }
  console.log("Traffic attribution tests passed (including mocked email-service payload; no emails sent).");
}

run().catch((error) => { console.error(error); process.exitCode = 1; });
