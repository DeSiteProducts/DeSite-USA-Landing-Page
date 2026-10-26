import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const client = new SESClient({ region: "us-east-1" });

export const handler = async (event) => {
  // Si viene de API Gateway, event.body es string JSON
  // Si viene de prueba en consola, event ya es objeto
  const body =
    typeof event.body === "string"
      ? JSON.parse(event.body)
      : event;

  const {
    recommendation,
    leadPricing,
    vibrationNeeded,
    bucketWidthRange,
    leadTime,
    fullName,
    formattedPhone,
    email,
    streetAddress,
    city,
    stateProvince,
    zipCode,
    country,
    financing,
    consent,
    discountCode,
    leadSource,
    trafficAttribution
  } = body;

  const phone = formattedPhone;

  const phoneHref = `+1${phone.replace(/\D/g, "")}`;

  const recommendationNoteLine = recommendation.note
    ? [`Recommendation Note: ${recommendation.note}`]
    : [];
  function escapeHtml(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
  console.log("EVENT:", JSON.stringify(event, null, 2));
  console.log("BODY:", JSON.stringify(body, null, 2));

  const subject =
    `New Shipping Discount Code Request - Recommended Model: ${recommendation.model}`;
  const attributionFields = [
    ["Lead Source", leadSource || trafficAttribution?.source || "direct_unknown"],
    ["UTM Source", trafficAttribution?.utmSource || "Not available"],
    ["UTM Medium", trafficAttribution?.utmMedium || "Not available"],
    ["UTM Campaign", trafficAttribution?.utmCampaign || "Not available"],
    ["Landing Page", trafficAttribution?.landingPage || "Not available"],
    ["Referrer Host", trafficAttribution?.referrerHost || "Not available"],
  ];

  const bodyText = [
    "New shipping discount code request",
    "",
    `Recommended Model: ${recommendation.model}`,
    ...recommendationNoteLine,
    `Vibration Screener Needed: ${vibrationNeeded}`,
    `Bucket Width Range: ${bucketWidthRange}`,
    `Lead Time: ${leadTime}`,
    `Full Name: ${fullName}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Street Address: ${streetAddress}`,
    `City: ${city}`,
    `State / Province: ${stateProvince}`,
    `ZIP / Postal Code: ${zipCode}`,
    `Country: ${country}`,
    `Interested in Financing: ${financing}`,
    `Consent Confirmation: ${consent}`,
    `Discount Code: ${discountCode}`,
    ...attributionFields.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");


  const bodyHtml = `
<div style="margin:0;background:#f2f6fc;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:#0f1b2d;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #dbe5f2;border-radius:16px;overflow:hidden;">

    <tr>
      <td style="background:linear-gradient(180deg,#073073 0%,#03122B 100%);padding:28px 24px 20px;text-align:center;">
        <img
          src="https://desiteproducts.com/wp-content/uploads/2026/05/LOGO.png"
          alt="DeSite Products"
          width="220"
          style="display:block;margin:0 auto 14px;height:auto;"
        />

        <p style="margin:0;font-size:12px;letter-spacing:.12em;font-weight:700;color:#afc2dc;text-transform:uppercase;">
          Shipping Discount Code Request
        </p>

        <h1 style="margin:10px 0 0;font-size:24px;line-height:1.25;color:#ffffff;">
          New Lead Submission
        </h1>

      </td>
    </tr>

    <tr>
      <td style="padding:20px 24px 8px;">

        <p style="margin:0 0 14px;font-size:14px;color:#3e5067;">
          A new customer submitted a discount code request on DeSite USA. Details are below:
        </p>

        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;border-spacing:0 10px;">

          <tr>
            <td style="padding:14px 16px;background:#edf4ff;border:1px solid #b9d3ff;border-radius:10px;">
              <strong>Recommended Model:</strong>
              ${escapeHtml(recommendation.model)}
            </td>
          </tr>

          ${recommendation.note
      ? `
          <tr>
            <td style="padding:14px 16px;background:#edf4ff;border:1px solid #b9d3ff;border-radius:10px;">
              <strong>Recommendation Note:</strong>
              ${escapeHtml(recommendation.note)}
            </td>
          </tr>
          `
      : ""
    }

          <tr>
            <td style="padding:14px 16px;background:#f8fbff;border:1px solid #dbe5f2;border-radius:10px;">
              <strong>Vibratory Screener or Grizzly Screener :</strong>
              ${escapeHtml(vibrationNeeded)}
            </td>
          </tr>

          <tr>
            <td style="padding:14px 16px;background:#f8fbff;border:1px solid #dbe5f2;border-radius:10px;">
              <strong>Bucket Width:</strong>
              ${escapeHtml(bucketWidthRange)}
            </td>
          </tr>
          <tr>
            <td style="padding:14px 16px;background:#edf4ff;border:1px solid #b9d3ff;border-radius:10px;">
              <strong>When would you like your screener?</strong>
              ${escapeHtml(leadTime)}
            </td>
          </tr>

          <tr>
            <td style="padding:14px 16px;background:#f8fbff;border:1px solid #dbe5f2;border-radius:10px;">
              <strong>Full Name:</strong>
              ${escapeHtml(fullName)}
            </td>
          </tr>

          <tr>
            <td style="padding:14px 16px;background:#f8fbff;border:1px solid #dbe5f2;border-radius:10px;">
              <strong>Phone:</strong>
              ${escapeHtml(phone)}
            </td>
          </tr>

          <tr>
            <td style="padding:14px 16px;background:#f8fbff;border:1px solid #dbe5f2;border-radius:10px;">
              <strong>Email:</strong>
              ${escapeHtml(email)}
            </td>
          </tr>

          <tr>
            <td style="padding:14px 16px;background:#f8fbff;border:1px solid #dbe5f2;border-radius:10px;">
              <strong>Delivery address:</strong>
              ${escapeHtml(streetAddress)}
            </td>
          </tr>

          <tr>
            <td style="padding:14px 16px;background:#f8fbff;border:1px solid #dbe5f2;border-radius:10px;">
              <strong>City:</strong>
              ${escapeHtml(city)}
            </td>
          </tr>

          <tr>
            <td style="padding:14px 16px;background:#f8fbff;border:1px solid #dbe5f2;border-radius:10px;">
              <strong>State / Province:</strong>
              ${escapeHtml(stateProvince)}
            </td>
          </tr>

          <tr>
            <td style="padding:14px 16px;background:#f8fbff;border:1px solid #dbe5f2;border-radius:10px;">
              <strong>ZIP / Postal Code:</strong>
              ${escapeHtml(zipCode)}
            </td>
          </tr>

          <tr>
            <td style="padding:14px 16px;background:#f8fbff;border:1px solid #dbe5f2;border-radius:10px;">
              <strong>Country:</strong>
              ${escapeHtml(country)}
            </td>
          </tr>

          <tr>
            <td style="padding:14px 16px;background:#f8fbff;border:1px solid #dbe5f2;border-radius:10px;">
              <strong>Interested in Financing:</strong>
              ${escapeHtml(financing)}
            </td>
          </tr>

          <tr>
            <td style="padding:14px 16px;background:#f8fbff;border:1px solid #dbe5f2;border-radius:10px;">
              <strong>Consent Confirmation:</strong>
              ${escapeHtml(consent)}
            </td>
          </tr>

          <tr>
            <td style="padding:14px 16px;background:#f8fbff;border:1px solid #dbe5f2;border-radius:10px;">
              <strong>Discount Code:</strong>
              ${escapeHtml(discountCode)}
            </td>
          </tr>
             

          ${attributionFields.map(([label, value]) => `
          <tr>
            <td style="padding:14px 16px;background:#f8fbff;border:1px solid #dbe5f2;border-radius:10px;">
              <strong>${escapeHtml(label)}:</strong>
              ${escapeHtml(value)}
            </td>
          </tr>
          `).join("")}

        </table>

      </td>
    </tr>

    <tr>
      <td style="padding:18px 24px 24px;text-align:center;">
        <a
          href="tel:${escapeHtml(phoneHref)}"
          style="display:inline-block;padding:12px 18px;border-radius:999px;background:#2674F0;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;"
        >
          Call Lead Now
        </a>
      </td>
    </tr>

  </table>
</div>
`;


  const command = new SendEmailCommand({
    Source: "sales@desiteusa.com",

    Destination: {
      ToAddresses: ["salesusa@desiteproducts.com"],
    },

    ReplyToAddresses: [email],

    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Text: {
          Data: bodyText,
        },
        Html: {
          Data: bodyHtml,
        },
      },
    },
  });



  await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true
    }),
  };



};

