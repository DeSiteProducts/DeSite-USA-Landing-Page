"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ShippingQuoteSection = dynamic(() => import("./ShippingQuoteSection"), {
  ssr: false,
});

/** Loads the multi-step form only when the visitor is close enough to use it. */
export default function DeferredShippingQuoteSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div id="shipping-quote" ref={sectionRef}>
      {shouldLoad ? <ShippingQuoteSection /> : null}
    </div>
  );
}
