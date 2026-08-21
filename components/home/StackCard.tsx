"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function StackCard({
  label,
  stack,
  groups,
  side,
}: {
  label: string;
  stack: Record<string, string>;
  groups: Record<string, string>;
  side: "left" | "right";
}) {
  return (
    <motion.dl
      className="group relative grid gap-4 rounded-2xl border border-line bg-surface p-6 overflow-hidden"
      initial={{ opacity: 0, x: side === "left" ? -30 : 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease }}
      whileHover={{
        borderColor: "rgba(194,58,18,0.3)",
        boxShadow: "0 12px 60px rgba(194,58,18,0.1)",
      }}
    >
      {/* Corner accent */}
      <motion.div
        className="pointer-events-none absolute right-0 top-0 h-20 w-20 opacity-0 group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle at top right, rgba(194,58,18,0.12), transparent 70%)",
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.dt
        className="font-display text-2xl text-ink"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease }}
      >
        {label}
      </motion.dt>

      {Object.entries(groups).map(([key, groupLabel], i) => (
        <motion.div
          key={key}
          className="border-l-2 border-accent pl-4"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08, ease }}
        >
          <dt className="text-xs uppercase tracking-wider text-muted">{groupLabel}</dt>
          <dd className="mt-1 text-sm leading-6 text-ink/90">{stack[key]}</dd>
        </motion.div>
      ))}
    </motion.dl>
  );
}
