"use client";

import { useReducedMotion } from "motion/react";

/**
 * Soft floating color blobs behind the whole site.
 * Complements body::before washes — no photos, just gentle atmosphere.
 */
export function SiteAtmosphere() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden sm:block"
      aria-hidden
    >
      <div
        className={`absolute -left-[12%] top-[18%] h-[42vmin] w-[42vmin] rounded-full bg-[var(--wash)] opacity-25 blur-3xl ${
          reduceMotion ? "" : "animate-[atmosphere-drift_22s_ease-in-out_infinite_alternate]"
        }`}
      />
      <div
        className={`absolute -right-[8%] top-[42%] h-[36vmin] w-[36vmin] rounded-full bg-[var(--wash-2)] opacity-20 blur-3xl ${
          reduceMotion ? "" : "animate-[atmosphere-drift_28s_ease-in-out_infinite_alternate-reverse]"
        }`}
      />
      <div
        className={`absolute bottom-[8%] left-[35%] h-[30vmin] w-[30vmin] rounded-full bg-accent opacity-[0.07] blur-3xl ${
          reduceMotion ? "" : "animate-[atmosphere-drift_26s_ease-in-out_infinite_alternate]"
        }`}
      />
    </div>
  );
}
