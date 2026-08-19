"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, animate } from "motion/react";

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const dotScale = useMotionValue(1);
  const ringScale = useMotionValue(1);
  const ringOpacity = useMotionValue(0.5);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role=button], input, textarea, select, label")) {
        animate(dotScale, 0, { duration: 0.2 });
        animate(ringScale, 2.2, { duration: 0.35, ease: [0.22, 1, 0.36, 1] });
        animate(ringOpacity, 1, { duration: 0.2 });
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role=button], input, textarea, select, label")) {
        animate(dotScale, 1, { duration: 0.3 });
        animate(ringScale, 1, { duration: 0.4, ease: [0.22, 1, 0.36, 1] });
        animate(ringOpacity, 0.5, { duration: 0.25 });
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [x, y, dotScale, ringScale, ringOpacity]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block"
      aria-hidden
    >
      {/* Ring */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50"
        style={{ left: x, top: y, width: 32, height: 32, scale: ringScale, opacity: ringOpacity }}
      />
      {/* Dot */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ left: x, top: y, width: 5, height: 5, scale: dotScale }}
      />
    </motion.div>
  );
}
