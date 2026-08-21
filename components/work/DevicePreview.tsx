"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

function ListUi() {
  const widths = [72, 88, 64, 80, 56];
  return (
    <div className="flex flex-col gap-1.5">
      <motion.div
        className="mb-1 h-7 rounded-md bg-accent/80"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
      />
      {widths.map((width, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-2 rounded-md border border-line/60 bg-surface px-2 py-1.5"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 + index * 0.06, ease }}
        >
          <span className="size-5 shrink-0 rounded-full bg-accent-soft" />
          <motion.span
            className="h-1.5 rounded-full bg-line"
            initial={{ width: 0 }}
            whileInView={{ width: `${width}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.07, ease }}
            style={{ display: "block" }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function CalendarUi() {
  const filled = new Set([8, 9, 15, 22]);

  return (
    <div className="flex flex-col gap-2">
      <motion.div
        className="h-7 rounded-md bg-ink/20"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease }}
      />
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 28 }, (_, index) => (
          <motion.div
            key={index}
            className={`aspect-square rounded-[3px] ${
              filled.has(index) ? "bg-accent/70" : "bg-line/40"
            }`}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: index * 0.018, ease }}
          />
        ))}
      </div>
    </div>
  );
}

export function DevicePreview({
  variant,
}: {
  variant: "list" | "calendar";
}) {
  return (
    <div className="mx-auto w-[190px] sm:w-[210px]">
      <motion.div
        className="rounded-[1.75rem] border border-line bg-surface-raised px-3 pb-4 pt-3 shadow-[0_0_40px_var(--glow)]"
        whileHover={{ boxShadow: "0 0 60px rgba(194,58,18,0.25)", scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-ink/20" />
        {variant === "list" ? <ListUi /> : <CalendarUi />}
      </motion.div>
    </div>
  );
}
