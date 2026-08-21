"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Screenshot } from "@/lib/content/screenshots";
import { BrowserFrame } from "@/components/work/BrowserFrame";
import { PhoneFrame } from "@/components/work/PhoneFrame";

const ease = [0.22, 1, 0.36, 1] as const;

type ProductStageProps = {
  desktop: Screenshot;
  mobile: Screenshot;
  eyebrow: string;
  title: string;
  detail: string;
  atmosphereSrc?: string;
};

/** Product mockups on a warm tennis atmosphere — breaks the text wall. */
export function ProductStage({
  desktop,
  mobile,
  eyebrow,
  title,
  detail,
  atmosphereSrc = "/work/tennis-match/atmosphere/court.webp",
}: ProductStageProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-line sm:rounded-3xl"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease }}
    >
      <Image
        src={atmosphereSrc}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 1100px"
        className="object-cover object-[center_40%] sm:object-center"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-canvas/90 via-canvas/82 to-canvas/70 sm:bg-gradient-to-br sm:from-canvas/88 sm:via-canvas/72 sm:to-canvas/55"
        aria-hidden
      />

      <div className="relative grid gap-6 p-4 sm:gap-8 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-10 lg:p-10">
        <div className="order-2 lg:order-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
          <h3 className="mt-2 max-w-md font-display text-xl tracking-tight text-ink sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted sm:text-base sm:leading-7">
            {detail}
          </p>

          <div className="mt-6 hidden md:block md:mt-8">
            <BrowserFrame shot={desktop} />
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end lg:pb-2">
          <PhoneFrame
            shots={mobile}
            size="md"
            showDots={false}
            className="drop-shadow-[0_20px_40px_rgba(28,20,16,0.22)] sm:drop-shadow-[0_28px_56px_rgba(28,20,16,0.28)]"
          />
        </div>
      </div>
    </motion.div>
  );
}
