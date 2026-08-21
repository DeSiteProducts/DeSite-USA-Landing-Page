"use client";

import { useEffect } from "react";

type LeadConversionEventsProps = {
  recommendedModel: string;
  vibrationNeeded: string;
  bucketWidthRange: string;
  country: string;
  financing: string;
  value: number;
  currency: "USD" | "CAD";
};

type DataLayerEvent = {
  event: string;
  form_name: string;
  recommended_model: string;
  vibration_needed: string;
  bucket_width_range: string;
  country: string;
  financing: string;
  value: number;
  currency: "USD" | "CAD";
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (eventType: string, eventName: string, payload: Record<string, unknown>) => void;
    __desiteLeadConversionKeys?: string[];
  }
}

export default function LeadConversionEvents({
  recommendedModel,
  vibrationNeeded,
  bucketWidthRange,
  country,
  financing,
  value,
  currency,
}: LeadConversionEventsProps) {
  useEffect(() => {
    const eventKey = `shipping-quote:${window.location.href}`;
    const firedKeys = window.__desiteLeadConversionKeys ?? [];

    if (firedKeys.includes(eventKey)) {
      return;
    }

    window.__desiteLeadConversionKeys = [...firedKeys, eventKey];

    const payload: DataLayerEvent = {
      event: "lead_generated",
      form_name: "Shipping Quote",
      recommended_model: recommendedModel,
      vibration_needed: vibrationNeeded,
      bucket_width_range: bucketWidthRange,
      country,
      financing,
      value,
      currency,
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);

    const metaPayload = {
      content_name: recommendedModel,
      content_category: "Shipping Quote",
      vibration_needed: vibrationNeeded,
      bucket_width_range: bucketWidthRange,
      country,
      financing,
      value,
      currency,
    };

    let retryTimer: number | undefined;
    let attempts = 0;

    const trackMetaLead = () => {
      attempts += 1;

      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", metaPayload);
        return;
      }

      if (attempts < 5) {
        retryTimer = window.setTimeout(trackMetaLead, 400);
      }
    };

    trackMetaLead();

    return () => {
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
    };
  }, [
    bucketWidthRange,
    country,
    currency,
    financing,
    recommendedModel,
    value,
    vibrationNeeded,
  ]);

  return null;
}
