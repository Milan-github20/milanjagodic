"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import type { Screenshot } from "@/lib/content/screenshots";
import { Container } from "@/components/layout/Container";
import { LiveProductCard } from "@/components/home/LiveProductCard";

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
  heroShots?: { desktop: Screenshot; mobile: Screenshot };
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
    <section className="relative -mt-14 overflow-hidden pt-14">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/atmosphere/desk.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_42%] sm:object-[center_35%]"
        />
        {/* Mobile: stronger wash for text; desktop: photo more visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/55 via-canvas/50 to-canvas sm:from-canvas/25 sm:via-canvas/30 sm:to-canvas/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas/85 via-canvas/55 to-canvas/40 sm:from-canvas/70 sm:via-canvas/25 sm:to-transparent md:from-canvas/75 md:via-canvas/20" />
      </div>

      <Container
        wide
        className="relative grid items-start gap-10 py-10 pb-8 sm:gap-12 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,1fr)] lg:gap-14 lg:py-28 xl:gap-16"
      >
        <div className="min-w-0 lg:pr-2">
          {/* Kicker badge */}
          <motion.div
            className="flex flex-wrap items-center gap-2.5 sm:gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <p className="text-[10px] font-medium uppercase leading-tight tracking-[0.16em] text-ink/70 sm:text-[11px] sm:tracking-[0.18em] sm:text-muted">
              {kicker}
            </p>
            <motion.span
              className="flex items-center gap-1.5 text-xs text-ink/65 sm:text-muted/70"
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
          <h1 className="mt-5 font-display text-[2.55rem] leading-[0.95] tracking-tight text-ink sm:mt-7 sm:text-7xl lg:text-[5.75rem] xl:text-[6.5rem]">
            <span className="block">
              <SplitChars text="Milan" delay={0.12} />
            </span>
            <span className="block italic text-accent">
              <SplitChars text="Jagodić" delay={0.28} />
            </span>
          </h1>

          {/* Description */}
          <motion.p
            className="mt-6 max-w-lg text-[0.95rem] leading-7 text-ink/75 sm:mt-8 sm:text-lg sm:leading-8 sm:text-muted lg:text-xl lg:leading-9"
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
          >
            {sentence}
          </motion.p>

          <motion.p
            className="mt-3 text-xs text-ink/60 sm:text-sm sm:text-muted/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.68 }}
          >
            {secondary}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.75, ease }}
          >
            <Link
              href={localePath(locale, "#work")}
              className="inline-flex h-11 w-full items-center justify-center whitespace-nowrap bg-accent px-5 text-xs font-medium uppercase tracking-[0.12em] text-canvas transition-all duration-200 hover:bg-ink active:scale-[0.98] sm:h-12 sm:w-auto sm:px-7 sm:text-sm"
            >
              {seeWork}
            </Link>
            <Link
              href={localePath(locale, "contact")}
              className="inline-flex h-11 w-full items-center justify-center whitespace-nowrap border border-line bg-canvas/50 px-5 text-xs font-medium uppercase tracking-[0.12em] text-ink transition-all duration-200 hover:border-accent hover:text-accent active:scale-[0.98] sm:h-12 sm:w-auto sm:bg-transparent sm:px-7 sm:text-sm"
            >
              {getInTouch}
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line/80 pt-6 sm:mt-10 sm:gap-x-12 sm:pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                className="flex items-baseline gap-2 cursor-default sm:gap-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.08, ease }}
              >
                <span className="font-display text-2xl text-ink sm:text-3xl">
                  {value}
                </span>
                <span className="max-w-[7.5rem] text-[10px] uppercase leading-snug tracking-[0.1em] text-muted sm:max-w-none sm:text-xs sm:tracking-[0.12em]">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating card — hidden on phones; Work section follows instead */}
        <motion.div
          className="mx-auto hidden w-full max-w-md md:block lg:mx-0 lg:max-w-none"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.3, ease }}
        >
          <LiveProductCard
            title={tennisMatchTitle}
            subtitle={tennisMatchSubtitle}
            liveLabel={liveLabel}
            desktopShot={heroShots?.desktop}
            mobileShot={heroShots?.mobile}
          />
        </motion.div>
      </Container>
    </section>
  );
}
