export const TRAFFIC_SOURCES = [
  "facebook", "instagram", "google_ads", "google", "direct_unknown", "meta", "other",
] as const;

export type TrafficSource = (typeof TRAFFIC_SOURCES)[number];
export type TrafficAttribution = {
  source: TrafficSource;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  landingPage: string;
  referrerHost: string;
};

function parseUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url : null;
  } catch {
    return null;
  }
}

export function detectTrafficAttribution(href: string, referrer: string): TrafficAttribution {
  const url = parseUrl(href);
  const params = url?.searchParams ?? new URLSearchParams();
  const utmSource = (params.get("utm_source") ?? "").trim().slice(0, 200);
  const utmMedium = (params.get("utm_medium") ?? "").trim().slice(0, 200);
  const ref = parseUrl(referrer);
  const host = ref && ref.hostname !== url?.hostname ? ref.hostname.toLowerCase() : "";
  const matches = (domain: string) => host === domain || host.endsWith(`.${domain}`);
  const source = utmSource.toLowerCase();
  let detected: TrafficSource = "direct_unknown";

  if (["gclid", "gbraid", "wbraid"].some((key) => params.get(key)?.trim())) {
    detected = "google_ads";
  } else if (["facebook", "fb"].includes(source)) {
    detected = "facebook";
  } else if (["instagram", "ig"].includes(source)) {
    detected = "instagram";
  } else if (["google_ads", "googleads", "adwords"].includes(source)) {
    detected = "google_ads";
  } else if (source === "google") {
    detected = ["cpc", "ppc", "paid", "paid_search", "paidsearch", "paid-search"].includes(utmMedium.toLowerCase())
      ? "google_ads" : "google";
  } else if (source) {
    detected = source === "meta" ? "meta" : "other";
  } else if (matches("instagram.com")) {
    detected = "instagram";
  } else if (matches("facebook.com") || matches("fb.com")) {
    detected = "facebook";
  } else if (params.get("fbclid")) {
    // A Meta click identifier alone does not distinguish Facebook from Instagram.
    detected = "meta";
  } else if (/^(?:www\.)?google\.(?:com|[a-z]{2}|com\.[a-z]{2}|co\.[a-z]{2})$/.test(host)) {
    detected = "google";
  } else if (host) {
    detected = "other";
  }

  return {
    source: detected,
    utmSource,
    utmMedium,
    utmCampaign: (params.get("utm_campaign") ?? "").trim().slice(0, 200),
    // Exclude arbitrary URL parameters, fragments and referrer paths.
    landingPage: url ? `${url.origin}${url.pathname}`.slice(0, 1000) : "",
    referrerHost: host.slice(0, 253),
  };
}

/** Treat browser-supplied attribution as descriptive, untrusted lead metadata. */
export function normalizeTrafficAttribution(value: unknown): TrafficAttribution {
  const data = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const string = (key: string, limit: number) => typeof data[key] === "string"
    ? data[key].replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, limit) : "";
  const landing = parseUrl(string("landingPage", 1000));
  return {
    source: TRAFFIC_SOURCES.includes(data.source as TrafficSource) ? data.source as TrafficSource : "direct_unknown",
    utmSource: string("utmSource", 200),
    utmMedium: string("utmMedium", 200),
    utmCampaign: string("utmCampaign", 200),
    landingPage: landing ? `${landing.origin}${landing.pathname}` : "",
    referrerHost: string("referrerHost", 253),
  };
}

const STORAGE_KEY = "desite:traffic-attribution:v1";
let inMemory: TrafficAttribution | undefined;

/** First entry in this tab; internal navigation and reloads preserve its source. */
export function getVisitAttribution(): TrafficAttribution {
  if (inMemory) return inMemory;
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (parsed && typeof parsed === "object" && "source" in parsed &&
          TRAFFIC_SOURCES.includes(parsed.source as TrafficSource)) {
        inMemory = normalizeTrafficAttribution(parsed);
        return inMemory;
      }
    }
  } catch { /* Storage may be unavailable or contain invalid data. */ }

  inMemory = detectTrafficAttribution(window.location.href, document.referrer);
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(inMemory));
  } catch { /* Keep attribution in memory when browser storage is blocked. */ }
  return inMemory;
}
