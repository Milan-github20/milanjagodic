"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Screenshot } from "@/lib/content/screenshots";

const widths = {
  sm: "w-[160px] sm:w-[210px]",
  md: "w-[200px] sm:w-[260px]",
  lg: "w-[230px] sm:w-[300px]",
} as const;

type PhoneFrameProps = {
  shots: Screenshot | Screenshot[];
  size?: keyof typeof widths;
  priority?: boolean;
  autoplay?: boolean;
  intervalMs?: number;
  showDots?: boolean;
  className?: string;
};

export function PhoneFrame({
  shots,
  size = "sm",
  priority = false,
  autoplay = false,
  intervalMs = 4000,
  showDots = true,
  className = "",
}: PhoneFrameProps) {
  const list = Array.isArray(shots) ? shots : [shots];
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const safeIndex = list.length === 0 ? 0 : Math.min(index, list.length - 1);
  const cycles = autoplay && list.length > 1 && !reduceMotion;

  useEffect(() => {
    if (index !== safeIndex) setIndex(safeIndex);
  }, [index, safeIndex]);

  useEffect(() => {
    if (!cycles || paused) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % list.length),
      intervalMs
    );
    return () => window.clearInterval(timer);
  }, [cycles, paused, intervalMs, list.length]);

  const active = list[safeIndex];
  if (!active) return null;

  return (
    <div
      className={`mx-auto ${widths[size]} ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative rounded-[1.75rem] border border-line bg-surface-raised p-2 shadow-[0_12px_40px_var(--glow)]">
        <div className="mx-auto mb-2 h-1.5 w-14 rounded-full bg-ink/20" />

        <div
          className="relative overflow-hidden rounded-[1.25rem] bg-surface"
          style={{ aspectRatio: `${active.width} / ${active.height}` }}
        >
          {list.length === 1 ? (
            <Image
              src={active.src}
              alt={active.alt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 55vw, 260px"
              className="object-cover object-top"
            />
          ) : (
            list.map((shot, i) => (
              <div
                key={shot.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                  i === safeIndex ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={i !== safeIndex}
              >
                <Image
                  src={shot.src}
                  alt={i === safeIndex ? shot.alt : ""}
                  fill
                  priority={priority && i === 0}
                  sizes="(max-width: 640px) 55vw, 260px"
                  className="object-cover object-top"
                />
              </div>
            ))
          )}
        </div>

        {cycles ? (
          showDots ? (
            <div className="mt-2 flex justify-center gap-1.5">
              {list.map((shot, i) => (
                <button
                  key={shot.id}
                  type="button"
                  aria-label={shot.alt}
                  aria-current={i === safeIndex}
                  onClick={() => setIndex(i)}
                  className="p-1"
                >
                  <span
                    className={`block h-1 rounded-full transition-all duration-300 ${
                      i === safeIndex ? "w-4 bg-accent" : "w-1.5 bg-line"
                    }`}
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-2 flex justify-center gap-1.5" aria-hidden>
              {list.map((shot, i) => (
                <span
                  key={shot.id}
                  className={`block h-1 rounded-full transition-all duration-300 ${
                    i === safeIndex ? "w-4 bg-accent" : "w-1.5 bg-line"
                  }`}
                />
              ))}
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}
