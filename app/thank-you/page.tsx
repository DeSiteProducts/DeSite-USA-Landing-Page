import type { Metadata } from "next";
import Link from "next/link";
import LeadConversionEvents from "./conversion-events";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your quote request was submitted successfully.",
  robots: {
    index: false,
    follow: false,
  },
};

type ThankYouPageProps = {
  searchParams?: Promise<{
    success?: string;
    model?: string;
    recommendedModel?: string;
    recommendationNote?: string;
    requiresReview?: string;
    vibrationNeeded?: string;
    bucketWidthRange?: string;
    country?: string;
    financing?: string;
    value?: string;
    currency?: string;
    discountCode?: string;
  }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const isSuccessfulLead = params?.success === "1";
  const recommendedModel = params?.recommendedModel ?? params?.model ?? "";
  const value = Number(params?.value ?? "0");
  const currency: "USD" | "CAD" = params?.currency === "CAD" ? "CAD" : "USD";
  const leadData = {
    recommendedModel,
    recommendationNote: params?.recommendationNote ?? "",
    requiresReview: params?.requiresReview === "1",
    vibrationNeeded: params?.vibrationNeeded ?? "",
    bucketWidthRange: params?.bucketWidthRange ?? "",
    country: params?.country ?? "",
    financing: params?.financing ?? "",
    value: Number.isFinite(value) ? value : 0,
    currency,
    
  };
  const discountCode = params?.discountCode ?? "";

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#03122B] via-[#073073] to-[#082F72] px-6 py-12 text-white md:px-12 flex items-center">
      <section className="mx-auto w-full max-w-2xl rounded-3xl border border-white/20 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-sm md:p-10">
        {isSuccessfulLead && (
          <LeadConversionEvents
            recommendedModel={leadData.recommendedModel}
            vibrationNeeded={leadData.vibrationNeeded}
            bucketWidthRange={leadData.bucketWidthRange}
            country={leadData.country}
            financing={leadData.financing}
            value={leadData.value}
            currency={leadData.currency}
          />
        )}
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#AFC2DC]">
          Thank You
        </p>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
          Thank you for requesting a discount code.
        </h1>
        {discountCode && (
          <div className="mt-6 rounded-2xl border-2 border-[#2674F0] bg-white p-6 text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-[#536177]">
              Your discount code
            </p>

            <p className="mt-2 text-3xl font-extrabold tracking-[0.2em] text-[#2674F0]">
              {discountCode}
            </p>
            <p className="text-sm font-bold uppercase tracking-wider text-[#536177]">
              Save your discount code it’s valid for the next 30 days!
            </p>
          </div>
        )}
        {leadData.requiresReview ? (
          <>
            <p className="mt-4 text-[#E0E3E8]">
              Our team will review your bucket size and recommend the best option
              for your equipment.
            </p>
            <p className="mt-4 text-[#E0E3E8]">
              You will be contacted soon from +1 (806) 500-3915 with your
              shipping details and next steps.
            </p>
          </>
        ) : (
          <>
            <p className="mt-4 text-[#E0E3E8]">
              Based on your answers, the best recommended model for you is:
            </p>
            <p className="mt-5 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-2xl font-extrabold text-white">
              {leadData.recommendedModel || "Pending review"}
            </p>
            {leadData.recommendationNote ? (
              <p className="mt-3 text-sm text-[#E0E3E8]">
                {leadData.recommendationNote}
              </p>
            ) : null}
            <p className="mt-4 text-[#E0E3E8]">
              Our team will review your request and contact you soon from +1
              (806) 500-3915 with your shipping details and next steps.
            </p>
          </>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="tel:+18065003915"
            className="inline-flex rounded-lg bg-[#2674F0] px-7 py-3 text-sm font-semibold uppercase tracking-wide transition hover:bg-[#5693F3]"
          >
            Call +1 (806) 500-3915
          </a>
          <Link
            href="/"
            className="inline-flex rounded-lg border border-white/25 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
          >
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}
