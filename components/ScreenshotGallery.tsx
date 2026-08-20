"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Screenshot } from "@/lib/screenshots";
import { PhoneFrame } from "./PhoneFrame";

const ease = [0.22, 1, 0.36, 1] as const;

export type GalleryLabels = {
  close: string;
  prev: string;
  next: string;
  maskNote: string;
  zoomHint: string;
};

type ScreenshotGalleryProps = {
  shots: Screenshot[];
  labels: GalleryLabels;
};

export function ScreenshotGallery({ shots, labels }: ScreenshotGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const hasMasks = shots.some((shot) => shot.masks?.length);

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null
          ? current
          : (current + delta + shots.length) % shots.length
      ),
    [shots.length]
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : shots[openIndex];

  return (
    <>
      <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
        {shots.map((shot, index) => (
          <motion.figure
            key={shot.id}
            className="w-[210px] shrink-0 snap-center sm:w-[240px]"
            initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: index * 0.08, ease }}
          >
            <motion.button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="block w-full cursor-zoom-in rounded-[1.75rem]"
              aria-label={`${shot.alt} — ${labels.zoomHint}`}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease }}
            >
              <PhoneFrame shots={shot} size="sm" interactive={false} />
            </motion.button>
            <figcaption className="mt-4 text-sm leading-6 text-muted">
              {shot.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      {hasMasks ? (
        <p className="mt-2 text-xs text-muted/70">{labels.maskNote}</p>
      ) : null}

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-ink/80 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal
            aria-label={active.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            <motion.div
              className="relative max-h-[72vh] w-auto"
              style={{ aspectRatio: `${active.width} / ${active.height}` }}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-canvas/20 bg-surface shadow-2xl">
                <Image
                  src={active.src}
                  alt={active.alt}
                  width={active.width}
                  height={active.height}
                  sizes="(max-width: 640px) 90vw, 420px"
                  className="h-full w-auto object-contain"
                />
                {active.masks?.map((mask) => (
                  <div
                    key={`${mask.top}-${mask.left}`}
                    aria-hidden
                    className="pointer-events-none absolute rounded-[3px]"
                    style={{
                      top: `${mask.top}%`,
                      left: `${mask.left}%`,
                      width: `${mask.width}%`,
                      height: `${mask.height}%`,
                      backdropFilter: "blur(9px)",
                      WebkitBackdropFilter: "blur(9px)",
                      background: "rgba(120,100,90,0.18)",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            <p className="max-w-md text-center text-sm leading-6 text-canvas/80">
              {active.caption}
            </p>

            <div
              className="flex items-center gap-2"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={labels.prev}
                className="flex size-10 items-center justify-center rounded-full border border-canvas/30 text-canvas transition hover:border-accent hover:text-accent"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={labels.next}
                className="flex size-10 items-center justify-center rounded-full border border-canvas/30 text-canvas transition hover:border-accent hover:text-accent"
              >
                →
              </button>
              <button
                type="button"
                onClick={close}
                className="ml-2 h-10 rounded-full border border-canvas/30 px-4 text-sm text-canvas transition hover:border-accent hover:text-accent"
              >
                {labels.close}
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
