import type { Metadata } from "next";
import QuoteWizard from "./quote-wizard";

export const metadata: Metadata = {
  title: "Shipping Quote Request",
  description:
    "Request a guided shipping quote and receive the best recommended DeSite screener model for your equipment.",
  robots: {
    index: true,
    follow: true,
  },
};

type ShippingQuotePageProps = {
  searchParams?: Promise<{ model?: string; error?: string }>;
};

export default async function ShippingQuotePage({
  searchParams,
}: ShippingQuotePageProps) {
  const params = await searchParams;

  return (
    <QuoteWizard
      initialModel={params?.model}
      isError={params?.error === "1"}
    />
  );
}
