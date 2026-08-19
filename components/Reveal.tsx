"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale" | "clip";
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  if (direction === "clip") {
    return (
      <div className={`overflow-hidden ${className}`}>
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay, ease }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  if (direction === "scale") {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay, ease }}
      >
        {children}
      </motion.div>
    );
  }

  const initial =
    direction === "left"
      ? { opacity: 0, x: -30, filter: "blur(8px)" }
      : direction === "right"
        ? { opacity: 0, x: 30, filter: "blur(8px)" }
        : { opacity: 0, y: 28, filter: "blur(6px)" };

  const animate =
    direction === "left" || direction === "right"
      ? { opacity: 1, x: 0, filter: "blur(0px)" }
      : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
