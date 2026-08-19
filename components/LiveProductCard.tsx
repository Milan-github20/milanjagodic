"use client";

import { site } from "@/lib/site";
import { DevicePreview } from "./DevicePreview";
import { motion } from "motion/react";

type LiveProductCardProps = {
  title: string;
  subtitle: string;
  liveLabel: string;
};

export function LiveProductCard({
  title,
  subtitle,
  liveLabel,
}: LiveProductCardProps) {
  return (
    <motion.a
      href={site.tennisMatch.url}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl border border-line bg-surface-raised p-6 sm:p-8"
      whileHover={{
        y: -6,
        borderColor: "rgba(194,58,18,0.4)",
        boxShadow: "0 20px 60px var(--glow)",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
        <motion.span
          className="size-2 rounded-full bg-accent"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        {liveLabel}
      </p>
      <DevicePreview variant="list" />
      <h2 className="mt-6 font-display text-3xl tracking-tight text-ink">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">{subtitle}</p>
      <motion.p
        className="mt-4 text-sm font-medium text-accent"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        tennismatch.ba →
      </motion.p>
    </motion.a>
  );
}
