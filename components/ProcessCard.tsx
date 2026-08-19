"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProcessCard({
  number,
  text,
  delay,
}: {
  number: string;
  text: string;
  delay: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.li
      ref={ref}
      className="group flex h-full flex-col gap-4 rounded-xl border border-line bg-surface-raised p-6 cursor-default relative overflow-hidden"
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay, ease }}
      whileHover={{
        y: -8,
        borderColor: "rgba(194,58,18,0.4)",
        boxShadow: "0 20px 60px rgba(194,58,18,0.12)",
      }}
    >
      {/* Animated fill background on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-accent/[0.03] opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />

      {/* Accent bar — draws in when in view */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent origin-top"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2, ease }}
      />

      <motion.span
        className="font-display text-4xl italic text-accent"
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.55, delay: delay + 0.15, type: "spring", bounce: 0.4 }}
      >
        {number}
      </motion.span>
      <p className="text-base leading-7 text-muted">{text}</p>
    </motion.li>
  );
}
