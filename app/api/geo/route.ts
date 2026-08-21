import { cookies, headers } from "next/headers";

const COUNTRY_HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "cloudfront-viewer-country",
  "x-appengine-country",
  "x-country-code",
  "x-forwarded-country",
];

function normalizeCountryCode(value: string | null): string | null {
  if (!value) {
    return null;
  }
  const trimmed = value.trim();
  return /^[a-z]{2}$/i.test(trimmed) ? trimmed.toUpperCase() : null;
}

function parseNetlifyGeo(headerValue: string | null): string | null {
  if (!headerValue) {
    return null;
  }

  const candidates = [headerValue];
  try {
    candidates.push(decodeURIComponent(headerValue));
  } catch {
    // Keep raw header if decode fails.
  }

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate) as {
        country?: string;
        countryCode?: string;
        country_code?: string;
        countrycode?: string;
        countryData?: { code?: string };
      };

      const byDirect =
        normalizeCountryCode(parsed.countryCode ?? null) ??
        normalizeCountryCode(parsed.country_code ?? null) ??
        normalizeCountryCode(parsed.countrycode ?? null) ??
        normalizeCountryCode(parsed.country ?? null);
      if (byDirect) {
        return byDirect;
      }

      const byNested = normalizeCountryCode(parsed.countryData?.code ?? null);
      if (byNested) {
        return byNested;
      }
    } catch {
      // Ignore invalid JSON payloads.
    }
  }

  return null;
}

export async function GET(request: Request) {
  const headerStore = await headers();
  const cookieStore = await cookies();
  const requestUrl = new URL(request.url);
  const debugMode = requestUrl.searchParams.get("debug") === "1";

  const buildHeaders = (varyValue: string) => ({
    "Cache-Control": "no-store, max-age=0",
    "Netlify-Vary": "country",
    Vary: varyValue,
  });

  const buildPayload = (countryCode: string | null, source: string) => {
    if (!debugMode) {
      return { countryCode };
    }

    return {
      countryCode,
      source,
      cookieCountry: cookieStore.get("nf_country")?.value ?? null,
      headers: {
        "x-nf-geo": headerStore.get("x-nf-geo"),
        "x-vercel-ip-country": headerStore.get("x-vercel-ip-country"),
        "cf-ipcountry": headerStore.get("cf-ipcountry"),
        "cloudfront-viewer-country": headerStore.get("cloudfront-viewer-country"),
        "x-appengine-country": headerStore.get("x-appengine-country"),
        "x-country-code": headerStore.get("x-country-code"),
        "x-forwarded-country": headerStore.get("x-forwarded-country"),
      },
    };
  };

  const cookieCountry = normalizeCountryCode(
    cookieStore.get("nf_country")?.value ?? null
  );
  if (cookieCountry) {
    return Response.json(
      buildPayload(cookieCountry, "cookie:nf_country"),
      {
        headers: buildHeaders("Cookie"),
      }
    );
  }

  const netlifyGeoCountry = parseNetlifyGeo(headerStore.get("x-nf-geo"));
  if (netlifyGeoCountry) {
    return Response.json(
      buildPayload(netlifyGeoCountry, "header:x-nf-geo"),
      {
        headers: buildHeaders("x-nf-geo"),
      }
    );
  }

  let countryCode: string | null = null;
  for (const headerName of COUNTRY_HEADERS) {
    const value = normalizeCountryCode(headerStore.get(headerName));
    if (value) {
      countryCode = value;
      break;
    }
  }

  return Response.json(
    buildPayload(countryCode, "fallback-headers"),
    {
      headers: buildHeaders(
        "x-nf-geo, x-vercel-ip-country, cf-ipcountry, cloudfront-viewer-country, x-appengine-country, x-country-code, x-forwarded-country, Cookie"
      ),
    }
  );
}
