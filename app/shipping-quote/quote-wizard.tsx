"use client";

import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  BUCKET_WIDTH_OPTIONS,
  COUNTRY_OPTIONS,
  EMAIL_REGEX,
  FINANCING_OPTIONS,
  VIBRATION_OPTIONS,
  LEAD_TIME_OPTIONS,
  type BucketWidthRange,
  type CountryOption,
  type FinancingOption,
  type VibrationNeeded,
  type LeadTimeOption,
  formatPhoneNumber,
  getInitialAnswersFromModel,
  getRecommendation,
  isPhoneNumberValid,
} from "./quote-flow";

type WizardState = {
  vibrationNeeded: VibrationNeeded | "";
  bucketWidthRange: BucketWidthRange | "";
  leadTime: LeadTimeOption | "";
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: CountryOption | "";
  financing: FinancingOption | "";
  consent: boolean;
};

type QuoteWizardProps = {
  initialModel?: string;
  isError: boolean;
};

const totalSteps = 9;

const inputClass =
  "w-full rounded-lg border border-[#C7D3E5] bg-white px-4 py-3 text-base text-[#03122B] outline-none transition placeholder:text-[#6C7A8E] focus:border-[#2674F0] focus:ring-4 focus:ring-[#2674F0]/15";
const questionClass = "block text-2xl font-extrabold leading-tight text-[#03122B] md:text-3xl";

function getInitialState(initialModel?: string): WizardState {
  const modelDefaults = getInitialAnswersFromModel(initialModel);

  return {
    vibrationNeeded: modelDefaults.vibrationNeeded,
    bucketWidthRange: modelDefaults.bucketWidthRange,
    leadTime: "",
    fullName: "",
    phone: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    financing: "",
    consent: false,
  };
}

function OptionButton({
  selected,
  children,
  onClick,
}: {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg border px-4 py-4 text-left text-sm font-semibold shadow-sm transition md:text-base ${selected
        ? "border-[#2674F0] bg-[#EAF2FF] text-[#03122B] ring-4 ring-[#2674F0]/15"
        : "border-[#C7D3E5] bg-white text-[#03122B] hover:border-[#2674F0]"
        }`}
    >
      {children}
    </button>
  );
}

export default function QuoteWizard({ initialModel, isError }: QuoteWizardProps) {
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState<WizardState>(() =>
    getInitialState(initialModel)
  );
  const [message, setMessage] = useState("");

  const recommendation = useMemo(() => {
    if (!formState.vibrationNeeded || !formState.bucketWidthRange) {
      return null;
    }

    return getRecommendation(formState.vibrationNeeded, formState.bucketWidthRange);
  }, [formState.bucketWidthRange, formState.vibrationNeeded]);

  const updateField = <Key extends keyof WizardState>(
    field: Key,
    value: WizardState[Key]
  ) => {
    setFormState((current) => ({ ...current, [field]: value }));
    setMessage("");
  };

  const validateStep = (currentStep: number): string => {
    switch (currentStep) {
      case 1:
        return formState.vibrationNeeded ? "" : "Please choose an option.";
      case 2:
        return formState.bucketWidthRange
          ? ""
          : "Please choose the closest bucket width range.";
      case 3:
        return formState.leadTime
          ? ""
          : "Please choose your expected lead time.";
      case 4:
        return formState.fullName.trim() ? "" : "Please enter your full name.";
      case 5:
        return isPhoneNumberValid(formState.phone.trim())
          ? ""
          : "Enter a 10-digit US or Canadian phone number.";
      case 6:
        return EMAIL_REGEX.test(formState.email.trim())
          ? ""
          : "Please enter a valid email address.";
      case 7:
        if (!formState.streetAddress.trim()) return "Please enter your street address.";
        if (!formState.city.trim()) return "Please enter your city.";
        if (!formState.state.trim()) return "Please enter your state or province.";
        if (!formState.zipCode.trim()) return "Please enter your ZIP or postal code.";
        if (!formState.country) return "Please choose United States or Canada.";
        return "";
      case 8:
        return formState.financing ? "" : "Please choose Yes or No.";
      case 9:
        return formState.consent
          ? ""
          : "Please confirm that we can contact you about your quote request.";
      default:
        return "";
    }
  };

  const goNext = () => {
    const validationMessage = validateStep(step);
    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    setMessage("");
    setStep((current) => Math.min(totalSteps, current + 1));
  };

  const goBack = () => {
    setMessage("");
    setStep((current) => Math.max(1, current - 1));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const validationMessage = validateStep(step);
    if (validationMessage) {
      event.preventDefault();
      setMessage(validationMessage);
    }
  };

  const progressPercent = Math.round((step / totalSteps) * 100);

  return (
    <>
      <div className="w-full p-2">
        <p className="mt-4 mb-4 text-md sm:text-xl font-semibold text-center text-[#D8E3F4]">
          <b>{100 - progressPercent}</b>% LEFT TO UNLOCK YOUR DISCOUNT CODE
        </p>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const isCompleted = index < step;

            return (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${isCompleted
                  ? "bg-[#2674F0]"
                  : "bg-white/20"
                  }`}
              />
            );
          })}
        </div>

        
      </div>
      <main className="flex px-2 py-2 text-[#03122B] sm:px-2 md:px-2">

        <section className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-lg border border-white/20 bg-[#F8FBFF] shadow-2xl md:grid-cols-[0.9fr_1.35fr]">

          <aside className="flex flex-col justify-between bg-gradient-to-b from-[#073073] to-[#03122B] p-6 text-white md:p-8">
            <div>
              <p className="text-md font-bold uppercase tracking-[0.18em] text-[#AFC2DC]">
                DeSite Products
              </p>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
                GET YOUR DISCOUNT CODE
              </h1>
              <p className="mt-4 text-md leading-6 text-[#D8E3F4]">
                Answer one question at a time and we will recommend the best screener
                for your equipment.
              </p>
            </div>

            <div className="mt-8 md:mt-0">

              {initialModel ? (
                <p className="mt-5 rounded-lg border border-white/15 bg-white/[0.08] px-4 py-3 text-sm leading-6 text-[#D8E3F4]">
                  Selected model:{" "}
                  <span className="font-semibold text-white">{initialModel}</span>
                </p>
              ) : null}
            </div>
          </aside>

          <form
            action="/api/shipping-quote"
            method="POST"
            onSubmit={handleSubmit}
            className="flex min-h-[560px] flex-col p-6 md:p-10"
          >
            <input type="hidden" name="vibrationNeeded" value={formState.vibrationNeeded} />
            <input type="hidden" name="bucketWidthRange" value={formState.bucketWidthRange} />
            <input type="hidden" name="leadTime" value={formState.leadTime} />
            <input type="hidden" name="fullName" value={formState.fullName.trim()} />
            <input type="hidden" name="phone" value={formState.phone.trim()} />
            <input type="hidden" name="email" value={formState.email.trim()} />
            <input
              type="hidden"
              name="streetAddress"
              value={formState.streetAddress.trim()}
            />
            <input type="hidden" name="city" value={formState.city.trim()} />
            <input type="hidden" name="state" value={formState.state.trim()} />
            <input type="hidden" name="zipCode" value={formState.zipCode.trim()} />
            <input type="hidden" name="country" value={formState.country} />
            <input type="hidden" name="financing" value={formState.financing} />
            <input type="hidden" name="consent" value={formState.consent ? "accepted" : ""} />

            {isError ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                We could not send your request. Please review your answers and try again.
              </p>
            ) : null}

            <div className="flex flex-1 items-center py-8">
              <div className="w-full">
                {step === 1 ? (
                  <section>
                    <h2 className={questionClass}>Do you need a vibration screener?</h2>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {VIBRATION_OPTIONS.map((option) => (
                        <OptionButton
                          key={option}
                          selected={formState.vibrationNeeded === option}
                          onClick={() => updateField("vibrationNeeded", option)}
                        >
                          {option}
                        </OptionButton>
                      ))}
                    </div>
                  </section>
                ) : null}

                {step === 2 ? (
                  <section>
                    <h2 className={questionClass}>How wide is your bucket in inches?</h2>
                    <div className="mt-6 grid gap-3">
                      {BUCKET_WIDTH_OPTIONS.map((option) => (
                        <OptionButton
                          key={option}
                          selected={formState.bucketWidthRange === option}
                          onClick={() => updateField("bucketWidthRange", option)}
                        >
                          {option}
                        </OptionButton>
                      ))}
                    </div>
                  </section>
                ) : null}
                {step === 3 ? (
                  <section>
                    <h2 className={questionClass}>What is your lead time?</h2>

                    <div className="mt-6 grid gap-3">
                      {LEAD_TIME_OPTIONS.map((option) => (
                        <OptionButton
                          key={option}
                          selected={formState.leadTime === option}
                          onClick={() => updateField("leadTime", option)}
                        >
                          {option}
                        </OptionButton>
                      ))}
                    </div>
                  </section>
                ) : null}

                {step === 4 ? (
                  <section>
                    <label htmlFor="fullNameInput" className={questionClass}>
                      What is your full name?
                    </label>
                    <input
                      id="fullNameInput"
                      type="text"
                      autoComplete="name"
                      placeholder="Full name"
                      value={formState.fullName}
                      onChange={(event) => updateField("fullName", event.target.value)}
                      className={`${inputClass} mt-5`}
                    />
                  </section>
                ) : null}

                {step === 5 ? (
                  <section>
                    <label htmlFor="phoneInput" className={questionClass}>
                      What is your phone number?
                    </label>
                    <p className="mt-3 text-sm leading-6 text-[#536177]">
                      Enter a valid US or Canadian phone number. Format: (800) 890
                      1901.
                    </p>
                    <input
                      id="phoneInput"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="(800) 890 1901"
                      value={formState.phone}
                      onChange={(event) =>
                        updateField("phone", formatPhoneNumber(event.target.value))
                      }
                      className={`${inputClass} mt-5`}
                    />
                  </section>
                ) : null}

                {step === 6 ? (
                  <section>
                    <label htmlFor="emailInput" className={questionClass}>
                      What is your email address?
                    </label>
                    <input
                      id="emailInput"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
                      value={formState.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      className={`${inputClass} mt-5`}
                    />
                  </section>
                ) : null}

                {step === 7 ? (
                  <section>
                    <h2 className={questionClass}>What is your full shipping address?</h2>
                    <div className="mt-6 grid gap-4">
                      <input
                        aria-label="Street address"
                        type="text"
                        autoComplete="street-address"
                        placeholder="Street address"
                        value={formState.streetAddress}
                        onChange={(event) => updateField("streetAddress", event.target.value)}
                        className={inputClass}
                      />
                      <div className="grid gap-4 md:grid-cols-2">
                        <input
                          aria-label="City"
                          type="text"
                          autoComplete="address-level2"
                          placeholder="City"
                          value={formState.city}
                          onChange={(event) => updateField("city", event.target.value)}
                          className={inputClass}
                        />
                        <input
                          aria-label="State or province"
                          type="text"
                          autoComplete="address-level1"
                          placeholder="State / Province"
                          value={formState.state}
                          onChange={(event) => updateField("state", event.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <input
                          aria-label="ZIP or postal code"
                          type="text"
                          autoComplete="postal-code"
                          placeholder="ZIP / Postal Code"
                          value={formState.zipCode}
                          onChange={(event) => updateField("zipCode", event.target.value)}
                          className={inputClass}
                        />
                        <select
                          aria-label="Country"
                          value={formState.country}
                          onChange={(event) =>
                            updateField("country", event.target.value as CountryOption | "")
                          }
                          className={inputClass}
                        >
                          <option value="">Country</option>
                          {COUNTRY_OPTIONS.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </section>
                ) : null}

                {step === 8 ? (
                  <section>
                    <h2 className={questionClass}>Are you interested in financing?</h2>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {FINANCING_OPTIONS.map((option) => (
                        <OptionButton
                          key={option}
                          selected={formState.financing === option}
                          onClick={() => updateField("financing", option)}
                        >
                          {option}
                        </OptionButton>
                      ))}
                    </div>
                  </section>
                ) : null}

                {step === 9 ? (
                  <section>
                    <h2 className={questionClass}>Please confirm your contact consent.</h2>
                    {recommendation ? (
                      <div className="mt-5 rounded-lg border border-[#C7D3E5] bg-white p-4 text-sm text-[#536177] shadow-sm">
                        <p className="font-semibold text-[#03122B]">Recommended model</p>
                        <p className="mt-1 text-lg font-extrabold text-[#073073]">
                          {recommendation.requiresReview
                            ? "Team review"
                            : recommendation.model}
                        </p>
                        {recommendation.note ? (
                          <p className="mt-2 leading-6">{recommendation.note}</p>
                        ) : null}
                      </div>
                    ) : null}
                    <label className="mt-6 flex items-start gap-3 rounded-lg border border-[#C7D3E5] bg-white p-4 text-sm leading-6 text-[#536177] shadow-sm">
                      <input
                        type="checkbox"
                        checked={formState.consent}
                        onChange={(event) => updateField("consent", event.target.checked)}
                        className="mt-1 size-4 accent-[#2674F0]"
                      />
                      <span>
                        I consent to be contacted by phone, email, or SMS regarding my
                        quote request, shipping details, and financing options.
                      </span>
                    </label>
                  </section>
                ) : null}
              </div>
            </div>

            <div aria-live="polite" className="min-h-12">
              {message ? (
                <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  {message}
                </p>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#DCE6F4] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className="rounded-lg border border-[#C7D3E5] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#03122B] transition hover:border-[#2674F0] hover:text-[#2674F0] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>

              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-lg bg-[#2674F0] px-7 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-[#2674F0]/20 transition hover:bg-[#155EC7]"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-lg bg-[#2674F0] px-7 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-[#2674F0]/20 transition hover:bg-[#155EC7]"
                >
                  Submit Discount Request
                </button>
              )}
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
