export const VIBRATION_OPTIONS = ["Vibratory", "Grizzly", "I'm not sure"] as const;
export const FINANCING_OPTIONS = ["Yes", "No"] as const;
export const COUNTRY_OPTIONS = ["United States", "Canada"] as const;

export const BUCKET_WIDTH_OPTIONS = [
  "56 inches or less",
  "68 inches or less",
  "84 inches or less",
  "108 inches or less",
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
  if (vibrationNeeded === "Vibratory") {
    const vibrationRecommendations: Record<BucketWidthRange, Recommendation> = {
      "56 inches or less": {
        model: "SLG 56",
        note: "Only recommended model for this bucket range, even when vibration is selected.",
        requiresReview: false,
      },
      "68 inches or less": {
        model: "68 ProScreen",
        note: "",
        requiresReview: false,
      },
      "84 inches or less": {
        model: "78 ProScreen",
        note: "",
        requiresReview: false,
      },
      "108 inches or less": {
        model: "108 ProScreen",
        note: "",
        requiresReview: false,
      },
    };

    return vibrationRecommendations[bucketWidthRange];
  }

  const grizzlyRecommendations: Record<BucketWidthRange, Recommendation> = {
    "56 inches or less": {
      model: "SLG 56",
      note: "",
      requiresReview: false,
    },
    "68 inches or less": {
      model: "78 Grizzly",
      note: "Closest non-vibration option for this bucket size.",
      requiresReview: false,
    },
    "84 inches or less": {
      model: "78 Grizzly",
      note: "",
      requiresReview: false,
    },
    "108 inches or less": {
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
      vibrationNeeded: "Vibratory",
      bucketWidthRange: "68 inches or less",
    },
    "78 ProScreen": {
      vibrationNeeded: "Vibratory",
      bucketWidthRange: "84 inches or less",
    },
    "108 ProScreen": {
      vibrationNeeded: "Vibratory",
      bucketWidthRange: "108 inches or less",
    },
    "SLG 56": {
      vibrationNeeded: "Grizzly",
      bucketWidthRange: "56 inches or less",
    },
    "SLG 78": {
      vibrationNeeded: "Grizzly",
      bucketWidthRange: "68 inches or less",
    },
    "SLG 108": {
      vibrationNeeded: "Grizzly",
      bucketWidthRange: "108 inches or less",
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
