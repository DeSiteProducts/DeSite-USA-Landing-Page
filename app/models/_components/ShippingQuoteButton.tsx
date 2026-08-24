"use client";

import { useRouter } from "next/navigation";

type ShippingQuoteButtonProps = {
  model: string;
};

export default function ShippingQuoteButton({
  model,
}: ShippingQuoteButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`?model=${encodeURIComponent(model)}#shipping-quote`, {
      scroll: false,
    });

    document.getElementById("shipping-quote")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
       className="mt-3 mx-auto flex w-fit items-center gap-2 rounded-full bg-[#30ab33] px-6 py-2.5 text-md font-semibold uppercase tracking-wide text-[white] transition hover:bg-[#C9D1DC] hover:text-black"
    >
      CLICK HERE FOR A DISCOUNT CODE
    </button>
  );
}
