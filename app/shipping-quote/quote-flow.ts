export const VIBRATION_OPTIONS = ["Yes", "No", "I'm not sure"] as const;
export const FINANCING_OPTIONS = ["Yes", "No"] as const;
export const COUNTRY_OPTIONS = ["United States", "Canada"] as const;

export const BUCKET_WIDTH_OPTIONS = [
  "0-56",
  "56-68",
  "69-84",
  "85-108",
] as const;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_REGEX = /^\([2-9]\d{2}\) [2-9]\d{2} \d{4}$/;

const PHONE_ALLOWED_CHARACTERS_REGEX = /^[\d\s()+.-]*$/;
const PHONE_DIGITS_REGEX = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;

export type VibrationNeeded = (typeof VIBRATION_OPTIONS)[number];
export type FinancingOption = (typeof FINANCING_OPTIONS)[number];
export type CountryOption = (typeof COUNTRY_OPTIONS)[number];
export type BucketWidthRange = (typeof BUCKET_WIDTH_OPTIONS)[number];
export const LEAD_TIME_OPTIONS = [
  "Immediately",
  "Within 30 days",
  "1–3 months",
  "Just exploring options",
] as const;
export function isLeadTimeOption(value: string): value is LeadTimeOption {
  return LEAD_TIME_OPTIONS.includes(value as LeadTimeOption);
}

export type LeadTimeOption = (typeof LEAD_TIME_OPTIONS)[number];

export type Recommendation = {
  model: string;
  note: string;
  requiresReview: boolean;
};

export function isVibrationNeeded(value: string): value is VibrationNeeded {
  return VIBRATION_OPTIONS.includes(value as VibrationNeeded);
}

export function isBucketWidthRange(value: string): value is BucketWidthRange {
  return BUCKET_WIDTH_OPTIONS.includes(value as BucketWidthRange);
}

export function isFinancingOption(value: string): value is FinancingOption {
  return FINANCING_OPTIONS.includes(value as FinancingOption);
}

export function isCountryOption(value: string): value is CountryOption {
  return COUNTRY_OPTIONS.includes(value as CountryOption);
}

export function getPhoneDigits(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.slice(1);
  }

  return digits;
}

export function formatPhoneNumber(value: string): string {
  const digits = getPhoneDigits(value).slice(0, 10);

  if (digits.length === 0) {
    return "";
  }

  if (digits.length <= 3) {
    return `(${digits}`;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

export function isPhoneNumberValid(value: string): boolean {
  const digits = getPhoneDigits(value);

  return (
    PHONE_ALLOWED_CHARACTERS_REGEX.test(value) &&
    PHONE_DIGITS_REGEX.test(digits) &&
    formatPhoneNumber(digits) === formatPhoneNumber(value)
  );
}

export function getRecommendation(
  vibrationNeeded: VibrationNeeded,
  bucketWidthRange: BucketWidthRange
): Recommendation {
  if (vibrationNeeded === "Yes") {
    const vibrationRecommendations: Record<BucketWidthRange, Recommendation> = {
      "0-56": {
        model: "SLG 56",
        note: "Only recommended model for this bucket range, even when vibration is selected.",
        requiresReview: false,
      },
      "56-68": {
        model: "68 ProScreen",
        note: "",
        requiresReview: false,
      },
      "69-84": {
        model: "78 ProScreen",
        note: "",
        requiresReview: false,
      },
      "85-108": {
        model: "108 ProScreen",
        note: "",
        requiresReview: false,
      },
    };

    return vibrationRecommendations[bucketWidthRange];
  }

  const grizzlyRecommendations: Record<BucketWidthRange, Recommendation> = {
    "0-56": {
      model: "SLG 56",
      note: "",
      requiresReview: false,
    },
    "56-68": {
      model: "78 Grizzly",
      note: "Closest non-vibration option for this bucket size.",
      requiresReview: false,
    },
    "69-84": {
      model: "78 Grizzly",
      note: "",
      requiresReview: false,
    },
    "85-108": {
      model: "108 Grizzly",
      note: "",
      requiresReview: false,
    },
  };

  return grizzlyRecommendations[bucketWidthRange];
}

export function getInitialAnswersFromModel(model: string | undefined): {
  vibrationNeeded: VibrationNeeded | "";
  bucketWidthRange: BucketWidthRange | "";
} {
  const selectedModel = model ?? "";
  const modelDefaults: Record<
    string,
    { vibrationNeeded: VibrationNeeded; bucketWidthRange: BucketWidthRange }
  > = {
    "68 ProScreen": {
      vibrationNeeded: "Yes",
      bucketWidthRange: "56-68",
    },
    "78 ProScreen": {
      vibrationNeeded: "Yes",
      bucketWidthRange: "69-84",
    },
    "108 ProScreen": {
      vibrationNeeded: "Yes",
      bucketWidthRange: "85-108",
    },
    "SLG 56": {
      vibrationNeeded: "No",
      bucketWidthRange: "0-56",
    },
    "SLG 78": {
      vibrationNeeded: "No",
      bucketWidthRange: "69-84",
    },
    "SLG 108": {
      vibrationNeeded: "No",
      bucketWidthRange: "85-108",
    },
  };

  return modelDefaults[selectedModel] ?? { vibrationNeeded: "", bucketWidthRange: "" };
}

export function getLeadValueAndCurrency(
  recommendedModel: string,
  country: CountryOption
): {
  value: string;
  currency: "USD" | "CAD";
} {
  const currency: "USD" | "CAD" = country === "Canada" ? "CAD" : "USD";
  const prices: Record<string, { USD: string; CAD: string }> = {
    "108 ProScreen": { USD: "19900", CAD: "21500" },
    "78 ProScreen": { USD: "13900", CAD: "13500" },
    "68 ProScreen": { USD: "7900", CAD: "8500" },
    "108 Grizzly": { USD: "14900", CAD: "14500" },
    "78 Grizzly": { USD: "7900", CAD: "8500" },
    "SLG 56": { USD: "4500", CAD: "4700" },
  };
  const selected = prices[recommendedModel];

  if (!selected) {
    return { value: "0", currency };
  }

  return { value: selected[currency], currency };
}
