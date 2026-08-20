"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { Screenshot } from "@/lib/screenshots";

const ease = [0.22, 1, 0.36, 1] as const;

const widths = {
  sm: "w-[190px] sm:w-[210px]",
  md: "w-[230px] sm:w-[260px]",
  lg: "w-[270px] sm:w-[300px]",
} as const;

type PhoneFrameProps = {
  shots: Screenshot | Screenshot[];
  size?: keyof typeof widths;
  priority?: boolean;
  /** Mouse-follow tilt. Turn off when a parent already tilts. */
  interactive?: boolean;
  /** Cycle through shots. Ignored for a single shot or reduced motion. */
  autoplay?: boolean;
  intervalMs?: number;
  /** Off when the frame sits inside a link — buttons cannot nest in an anchor. */
  showDots?: boolean;
  className?: string;
};

export function PhoneFrame({
  shots,
  size = "sm",
  priority = false,
  interactive = true,
  autoplay = false,
  intervalMs = 3200,
  showDots = true,
  className = "",
}: PhoneFrameProps) {
  const list = Array.isArray(shots) ? shots : [shots];
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const cycles = autoplay && list.length > 1 && !reduceMotion;

  useEffect(() => {
    if (!cycles || paused) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % list.length),
      intervalMs
    );
    return () => window.clearInterval(timer);
  }, [cycles, paused, intervalMs, list.length]);

  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 180, damping: 20 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [7, -7]), spring);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-9, 9]), spring);

  const tilts = interactive && !reduceMotion;

  const handleMove = (event: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !tilts) return;
    const rect = el.getBoundingClientRect();
    rawX.set((event.clientX - rect.left) / rect.width - 0.5);
    rawY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setPaused(false);
  };

  const active = list[index];

  return (
    <div ref={ref} className={`mx-auto ${widths[size]} ${className}`}>
      <motion.div
        className="relative rounded-[1.75rem] border border-line bg-surface-raised p-2 shadow-[0_0_40px_var(--glow)]"
        style={
          tilts
            ? { rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }
            : undefined
        }
        onMouseMove={handleMove}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={handleLeave}
        whileHover={{ boxShadow: "0 18px 70px var(--glow)" }}
        transition={{ duration: 0.3, ease }}
      >
        <div className="mx-auto mb-2 h-1.5 w-14 rounded-full bg-ink/20" />

        <div
          className="relative overflow-hidden rounded-[1.25rem] bg-surface"
          style={{ aspectRatio: `${active.width} / ${active.height}` }}
        >
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={active.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                priority={priority}
                sizes="(max-width: 640px) 60vw, 300px"
                className="object-cover object-top"
              />

              {active.masks?.map((mask) => (
                <div
                  key={`${mask.top}-${mask.left}`}
                  aria-hidden
                  className="pointer-events-none absolute rounded-[3px]"
                  style={{
                    top: `${mask.top}%`,
                    left: `${mask.left}%`,
                    width: `${mask.width}%`,
                    height: `${mask.height}%`,
                    backdropFilter: "blur(7px)",
                    WebkitBackdropFilter: "blur(7px)",
                    background: "rgba(120,100,90,0.16)",
                  }}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {cycles && showDots ? (
          <div className="mt-2 flex justify-center gap-1.5">
            {list.map((shot, i) => (
              <button
                key={shot.id}
                type="button"
                aria-label={shot.alt}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className="p-1"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-300 ${
                    i === index ? "w-4 bg-accent" : "w-1.5 bg-line"
                  }`}
                />
              </button>
            ))}
          </div>
        ) : null}
        {cycles && !showDots ? (
          <div className="mt-2 flex justify-center gap-1.5" aria-hidden>
            {list.map((shot, i) => (
              <span
                key={shot.id}
                className={`block h-1 rounded-full transition-all duration-300 ${
                  i === index ? "w-4 bg-accent" : "w-1.5 bg-line"
                }`}
              />
            ))}
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}
