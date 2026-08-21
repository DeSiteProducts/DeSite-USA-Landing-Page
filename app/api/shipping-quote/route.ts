import { NextResponse } from "next/server";

import {
  EMAIL_REGEX,
  formatPhoneNumber,
  getLeadValueAndCurrency,
  getRecommendation,
  isBucketWidthRange,
  isLeadTimeOption,
  isCountryOption,
  isFinancingOption,
  isPhoneNumberValid,
  isVibrationNeeded,
} from "../../shipping-quote/quote-flow";

function generateDiscountCode(length = 6): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  return Array.from(
    randomValues,
    (value) => characters[value % characters.length]
  ).join("");
}

function toStringValue(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function buildRedirectUrl(
  request: Request,
  pathname: "/shipping-quote" | "/thank-you",
  result?: "error" | "success",
  params?: Record<string, string>
) {
  const url = new URL(
    pathname,
    process.env.NEXT_PUBLIC_SITE_URL ?? request.url
  );

  if (result) {
    url.searchParams.set(result, "1");
  }

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  return url;
}

function redirectAfterPost(
  request: Request,
  pathname: "/shipping-quote" | "/thank-you",
  result?: "error" | "success",
  params?: Record<string, string>
) {
  return NextResponse.redirect(
    buildRedirectUrl(request, pathname, result, params),
    { status: 303 }
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const vibrationNeeded = toStringValue(formData.get("vibrationNeeded"));
    const bucketWidthRange = toStringValue(formData.get("bucketWidthRange"));
    const leadTime = toStringValue(formData.get("leadTime"));
    const fullName = toStringValue(formData.get("fullName"));
    const phone = toStringValue(formData.get("phone"));
    const email = toStringValue(formData.get("email"));
    const streetAddress = toStringValue(formData.get("streetAddress"));
    const city = toStringValue(formData.get("city"));
    const stateProvince = toStringValue(formData.get("state"));
    const zipCode = toStringValue(formData.get("zipCode"));
    const country = toStringValue(formData.get("country"));
    const financing = toStringValue(formData.get("financing"));
    const consent = toStringValue(formData.get("consent"));
    const discountCode = generateDiscountCode(6);

    if (
      !isVibrationNeeded(vibrationNeeded) ||
      !isBucketWidthRange(bucketWidthRange) ||
      !isLeadTimeOption(leadTime) ||
      fullName.length === 0 ||
      !isPhoneNumberValid(phone) ||
      !EMAIL_REGEX.test(email) ||
      streetAddress.length === 0 ||
      city.length === 0 ||
      stateProvince.length === 0 ||
      zipCode.length === 0 ||
      !isCountryOption(country) ||
      !isFinancingOption(financing) ||
      consent !== "accepted"
    ) {
      console.warn("[shipping-quote] Invalid form submission", {
        vibrationNeededValid: isVibrationNeeded(vibrationNeeded),
        bucketWidthRangeValid: isBucketWidthRange(bucketWidthRange),
        leadTimeValid: isLeadTimeOption(leadTime),
        fullNamePresent: fullName.length > 0,
        phoneValid: isPhoneNumberValid(phone),
        emailValid: EMAIL_REGEX.test(email),
        streetAddressPresent: streetAddress.length > 0,
        cityPresent: city.length > 0,
        statePresent: stateProvince.length > 0,
        zipCodePresent: zipCode.length > 0,
        countryValid: isCountryOption(country),
        financingValid: isFinancingOption(financing),
        consentAccepted: consent === "accepted",
     
      });
      return redirectAfterPost(request, "/shipping-quote", "error");
    }

    const recommendation = getRecommendation(vibrationNeeded, bucketWidthRange);
    const leadPricing = getLeadValueAndCurrency(recommendation.model, country);
    const formattedPhone = formatPhoneNumber(phone);
    const phoneHref = `+1${formattedPhone.replace(/\D/g, "")}`;
    const recommendationNoteLine = recommendation.note
      ? [`Recommendation Note: ${recommendation.note}`]
      : [];
    const response = await fetch(
    "",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
        discountCode
      }),
    });

     if (!response.ok) {
    return redirectAfterPost(request, "/shipping-quote", "error");
  }


    return redirectAfterPost(request, "/thank-you", "success", {
      model: recommendation.model,
      recommendedModel: recommendation.model,
      recommendationNote: recommendation.note,
      requiresReview: recommendation.requiresReview ? "1" : "0",
      vibrationNeeded,
      bucketWidthRange,
      leadTime,
      country,
      financing,
      value: leadPricing.value,
      currency: leadPricing.currency,
      discountCode,
    });
  } catch (error) {
    console.error("[shipping-quote] Failed to send quote request email", error);
    return redirectAfterPost(request, "/shipping-quote", "error");
  }
}
