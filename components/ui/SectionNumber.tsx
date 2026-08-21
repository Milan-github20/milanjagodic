"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

type SectionNumberProps = {
  number: string;
  label: string;
  delay?: number;
};

export function SectionNumber({ number, label, delay = 0 }: SectionNumberProps) {
  return (
    <motion.div
      className="flex items-center gap-4 mb-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease }}
    >
      <span className="font-display text-sm italic text-accent">{number}</span>
      <motion.span
        className="h-px flex-1 max-w-[40px] bg-accent/40 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.1, ease }}
        style={{ originX: 0 }}
      />
      <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
        {label}
      </span>
    </motion.div>
  );
}
