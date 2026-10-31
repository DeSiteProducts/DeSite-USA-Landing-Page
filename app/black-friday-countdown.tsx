"use client";

import { useEffect, useState } from "react";

const units = [
  { label: "Days", seconds: 86400 },
  { label: "Hours", seconds: 3600 },
  { label: "Minutes", seconds: 60 },
  { label: "Seconds", seconds: 1 },
];

export default function BlackFridayCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      // December 1 at midnight in the visitor's local browser timezone.
      const saleEnd = new Date(2026, 11, 1).getTime();
      setRemaining(Math.max(0, Math.ceil((saleEnd - Date.now()) / 1000)));
    };
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="sale-countdown" aria-label="Early Black Friday Sale">
      <div className="sale-countdown-clock" role="timer" aria-live="off" aria-label="Time remaining in the sale">
        <span className="sale-countdown-dot" aria-hidden="true" />
        {units.map(({ label, seconds }, index) => {
          const value = remaining === null ? null : Math.floor(remaining / seconds);
          const display = value === null ? "--" : String(index === 0 ? value : value % (index === 1 ? 24 : 60)).padStart(2, "0");

          return (
            <div className="sale-countdown-unit" key={label}>
              <span className="sale-countdown-number">{display}</span>
              <span className="sale-countdown-label">{label}</span>
            </div>
          );
        })}
      </div>
      <p className="sale-countdown-title">Early Black Friday Sale</p>
    </section>
  );
}
