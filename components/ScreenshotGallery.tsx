"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Screenshot } from "@/lib/screenshots";

export type GalleryLabels = {
  close: string;
  prev: string;
  next: string;
  zoomHint: string;
};

type ScreenshotGalleryProps = {
  shots: Screenshot[];
  labels: GalleryLabels;
};

export function ScreenshotGallery({ shots, labels }: ScreenshotGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
        {shots.map((shot) => (
          <figure
            key={shot.id}
            className="w-[210px] shrink-0 snap-center sm:w-[240px]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(shots.indexOf(shot))}
              className="block w-full cursor-zoom-in rounded-[1.75rem] transition-transform duration-300 hover:-translate-y-1"
              aria-label={`${shot.alt} — ${labels.zoomHint}`}
            >
              <div className="rounded-[1.75rem] border border-line bg-surface-raised p-2 shadow-[0_12px_40px_var(--glow)]">
                <div className="mx-auto mb-2 h-1.5 w-14 rounded-full bg-ink/20" />
                <div
                  className="relative overflow-hidden rounded-[1.25rem] bg-surface"
                  style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    loading="lazy"
                    sizes="240px"
                    quality={65}
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </button>
            <figcaption className="mt-4 text-sm leading-6 text-muted">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-ink/85 p-4 sm:p-8"
          role="dialog"
          aria-modal
          aria-label={active.alt}
          onClick={close}
        >
          <div
            className="relative max-h-[72vh] w-auto overflow-hidden rounded-2xl border border-canvas/20 bg-surface shadow-2xl"
            style={{ aspectRatio: `${active.width} / ${active.height}` }}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              sizes="(max-width: 640px) 90vw, 420px"
              quality={80}
              className="h-full w-auto object-contain"
              priority
            />
          </div>

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
        </div>
      ) : null}
    </>
  );
}
