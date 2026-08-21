"use client";

import QuoteWizard from "@/app/shipping-quote/quote-wizard";
import { useSearchParams } from "next/navigation";


export default function ShippingQuoteSection() {
  const searchParams = useSearchParams();

  const model = searchParams.get("model") ?? undefined;

  return (
    <section
      id="shipping-quote"
      className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-white/20 bg-white/5 p-2 md:p-2"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-3 text-center">
          
          <h2 className="mt-3 text-2xl font-extrabold text-white md:text-4xl">
             GET YOUR DISCOUNT CODE IN MINUTES
          </h2>
        </div>

        <QuoteWizard
          initialModel={model}
          isError={false}
        />
      </div>
    </section>
  );
}