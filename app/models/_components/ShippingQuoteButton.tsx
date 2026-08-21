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
      className="mt-8 block w-fit rounded-full bg-[#2674F0] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#082F72] mx-auto"
    >
      CLICK HERE FOR A DISCOUNT
    </button>
  );
}
