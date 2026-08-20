"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import type { Screenshot } from "@/lib/screenshots";
import { DevicePreview } from "./DevicePreview";
import { PhoneFrame } from "./PhoneFrame";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

type WorkCardProps = {
  locale: Locale;
  title: string;
  subtitle: string;
  cardLine: string;
  tags: readonly string[];
  role: string;
  slug: string;
  liveHref: string;
  variant: "list" | "calendar";
  featured?: boolean;
  readLabel: string;
  liveLabel: string;
  shot?: Screenshot;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function WorkCard({
  locale,
  title,
  subtitle,
  cardLine,
  tags,
  role,
  slug,
  liveHref,
  variant,
  featured = false,
  readLabel,
  liveLabel,
  shot,
}: WorkCardProps) {
  const ref = useRef<HTMLElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(rawX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(rawY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.article
      ref={ref}
      className={`group relative grid items-center gap-8 overflow-hidden rounded-2xl border border-line p-5 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-10 ${
        featured ? "bg-surface-raised" : "bg-surface"
      }`}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      whileHover={{
        borderColor: "rgba(194,58,18,0.35)",
        boxShadow: "0 24px 80px rgba(194,58,18,0.14)",
      }}
      transition={{ duration: 0.3, ease }}
    >
      {/* Glare overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.06) 0%, transparent 60%)`,
        }}
      />

      {/* Device preview */}
      <motion.div
        whileHover={{ scale: 1.04, rotate: 0.7 }}
        transition={{ duration: 0.4, ease }}
        style={{ transformStyle: "preserve-3d", translateZ: 20 }}
      >
        {shot ? (
          <PhoneFrame shots={shot} size="md" interactive={false} />
        ) : (
          <DevicePreview variant={variant} />
        )}
      </motion.div>

      <div className="flex flex-col gap-5" style={{ transform: "translateZ(10px)" }}>
        <h3 className="font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h3>
        <p className="max-w-md text-base leading-7 text-muted">{subtitle}</p>
        <p className="text-sm leading-6 text-ink/80">{cardLine}</p>

        {/* Animated tags */}
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <motion.li
              key={tag}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.3, ease }}
              whileHover={{ scale: 1.1, borderColor: "var(--accent)", color: "var(--accent)" }}
              className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted cursor-default transition-colors duration-150"
            >
              {tag}
            </motion.li>
          ))}
        </ul>

        <p className="text-sm text-muted">{role}</p>

        <div className="flex flex-wrap gap-3">
          <Link
            href={localePath(locale, `work/${slug}`)}
            className="inline-flex h-11 flex-1 items-center justify-center whitespace-nowrap bg-accent px-5 text-xs font-medium uppercase tracking-[0.1em] text-canvas transition-colors hover:bg-ink sm:flex-none sm:text-sm"
          >
            {readLabel}
          </Link>
          <a
            href={liveHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 flex-1 items-center justify-center whitespace-nowrap border border-line px-5 text-xs font-medium uppercase tracking-[0.1em] text-ink transition-colors hover:border-accent hover:text-accent sm:flex-none sm:text-sm"
          >
            {liveLabel}
          </a>
        </div>
      </div>
    </motion.article>
  );
}
