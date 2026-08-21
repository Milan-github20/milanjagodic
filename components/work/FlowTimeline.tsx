"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import type { CaseStudyStep } from "@/lib/content/case-studies";

const ease = [0.22, 1, 0.36, 1] as const;

type FlowTimelineProps = {
  steps: CaseStudyStep[];
};

export function FlowTimeline({ steps }: FlowTimelineProps) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.35"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={trackRef} className="relative mt-10">
      <div
        className="pointer-events-none absolute top-3 bottom-3 left-[1.375rem] w-px bg-line sm:left-[2.125rem]"
        aria-hidden
      >
        {reduceMotion ? (
          <div className="h-full w-full origin-top bg-accent" />
        ) : (
          <motion.div
            className="h-full w-full origin-top bg-accent"
            style={{ scaleY: lineScale }}
          />
        )}
      </div>

      <ol className="relative flex flex-col">
        {steps.map((step, index) => (
          <FlowStep
            key={step.title}
            step={step}
            index={index}
            total={steps.length}
            progress={scrollYProgress}
            reduceMotion={!!reduceMotion}
          />
        ))}
      </ol>
    </div>
  );
}

function FlowStep({
  step,
  index,
  total,
  progress,
  reduceMotion,
}: {
  step: CaseStudyStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const start = index / total;
  const mid = start + 0.5 / total;
  const end = (index + 1) / total;

  const activeOpacity = useTransform(
    progress,
    [Math.max(0, start - 0.06), mid, Math.min(1, end + 0.06)],
    [0.4, 1, 0.5]
  );
  const nodeScale = useTransform(
    progress,
    [Math.max(0, start - 0.04), mid, end],
    [0.9, 1.2, 1]
  );
  const cardLift = useTransform(
    progress,
    [Math.max(0, start - 0.04), mid, end],
    [6, 0, 4]
  );

  return (
    <motion.li
      className="relative grid grid-cols-[2.25rem_1fr] gap-3 py-4 sm:grid-cols-[4.25rem_1fr] sm:gap-8 sm:py-7"
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease }}
    >
      <div className="relative flex justify-center pt-2">
        <motion.span
          className="relative z-[1] flex size-5 items-center justify-center rounded-full border-2 border-accent bg-canvas sm:size-6"
          style={reduceMotion ? undefined : { scale: nodeScale }}
          aria-hidden
        >
          <span className="size-2 rounded-full bg-accent sm:size-2.5" />
        </motion.span>
      </div>

      <motion.div
        className="min-w-0 rounded-2xl border border-line bg-surface px-4 py-4 sm:px-7 sm:py-6"
        style={
          reduceMotion
            ? undefined
            : { opacity: activeOpacity, y: cardLift }
        }
      >
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-display text-3xl italic leading-none text-accent sm:text-5xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-xl tracking-tight text-ink sm:text-3xl">
            {step.title}
          </h3>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-7 text-muted sm:text-base">
          {step.description}
        </p>
      </motion.div>
    </motion.li>
  );
}
