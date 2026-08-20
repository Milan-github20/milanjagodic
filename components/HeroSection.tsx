"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import type { Screenshot } from "@/lib/screenshots";
import { Container } from "./Container";
import { LiveProductCard } from "./LiveProductCard";

type HeroSectionProps = {
  locale: Locale;
  liveLabel: string;
  sentence: string;
  secondary: string;
  kicker: string;
  seeWork: string;
  getInTouch: string;
  tennisMatchTitle: string;
  tennisMatchSubtitle: string;
  availableLabel: string;
  stats: { value: string; label: string }[];
  heroShots?: Screenshot[];
};

const ease = [0.22, 1, 0.36, 1] as const;

function SplitChars({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-block pb-2 ${className}`} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: delay + i * 0.035,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection({
  locale,
  liveLabel,
  sentence,
  secondary,
  kicker,
  seeWork,
  getInTouch,
  tennisMatchTitle,
  tennisMatchSubtitle,
  availableLabel,
  stats,
  heroShots,
}: HeroSectionProps) {
  return (
    <section className="hero-glow cinematic-grid relative overflow-hidden">
      {/* Floating ambient orbs — desktop only, static on mobile */}
      <div
        className="pointer-events-none absolute left-[10%] top-[20%] h-64 w-64 rounded-full opacity-20 blur-3xl hidden lg:block"
        style={{ background: "var(--wash)" }}
      />
      <div
        className="pointer-events-none absolute right-[15%] top-[10%] h-48 w-48 rounded-full opacity-10 blur-3xl hidden lg:block"
        style={{ background: "var(--accent)" }}
      />

      <Container className="relative grid items-end gap-10 py-12 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-12 lg:py-28">
        <div>
          {/* Kicker badge */}
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <span className="font-display text-sm italic text-accent">00</span>
            <motion.span
              className="inline-block h-px w-6 bg-accent/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease }}
              style={{ originX: 0 }}
            />
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted leading-tight">{kicker}</p>
              <motion.span
                className="flex items-center gap-1.5 text-xs text-muted/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-green-500"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {availableLabel}
              </motion.span>
          </motion.div>

          {/* Name */}
          <h1 className="mt-5 font-display text-[3rem] leading-[0.9] tracking-tight text-ink sm:text-7xl lg:text-[7rem]">
            <span className="block">
              <SplitChars text="Milan" delay={0.12} />
            </span>
            <span className="block italic text-accent">
              <SplitChars text="Jagodić" delay={0.28} />
            </span>
          </h1>

          {/* Description */}
          <motion.p
            className="mt-8 max-w-xl text-base leading-7 text-muted sm:text-xl sm:leading-9"
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
          >
            {sentence}
          </motion.p>

          <motion.p
            className="mt-3 text-xs text-muted/80 sm:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.68 }}
          >
            {secondary}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.75, ease }}
          >
            <Link
              href={localePath(locale, "#work")}
              className="inline-flex h-11 items-center justify-center whitespace-nowrap bg-accent px-5 text-xs font-medium uppercase tracking-[0.12em] text-canvas transition-all duration-200 hover:bg-ink active:scale-[0.98] sm:h-12 sm:px-7 sm:text-sm"
            >
              {seeWork}
            </Link>
            <Link
              href={localePath(locale, "contact")}
              className="inline-flex h-11 items-center justify-center whitespace-nowrap border border-line px-5 text-xs font-medium uppercase tracking-[0.12em] text-ink transition-all duration-200 hover:border-accent hover:text-accent active:scale-[0.98] sm:h-12 sm:px-7 sm:text-sm"
            >
              {getInTouch}
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="mt-8 flex gap-6 border-t border-line pt-6 sm:gap-8 sm:mt-10 sm:pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                className="flex flex-col gap-0.5 cursor-default"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.08, ease }}
              >
                <span className="font-display text-xl text-ink sm:text-2xl">{value}</span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-muted sm:text-xs">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.3, ease }}
        >
          <LiveProductCard
            title={tennisMatchTitle}
            subtitle={tennisMatchSubtitle}
            liveLabel={liveLabel}
            shots={heroShots}
          />
        </motion.div>
      </Container>
    </section>
  );
}
