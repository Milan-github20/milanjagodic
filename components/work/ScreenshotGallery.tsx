"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Screenshot } from "@/lib/content/screenshots";

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

function shortLabel(caption: string) {
  const colon = caption.indexOf(":");
  return colon > 0 ? caption.slice(0, colon) : caption;
}

function longCaption(caption: string) {
  const colon = caption.indexOf(":");
  return colon > 0 ? caption.slice(colon + 1).trim() : caption;
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      aria-hidden
      className="block"
    >
      {direction === "left" ? (
        <path
          d="M10 3.5 5.5 8 10 12.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M6 3.5 10.5 8 6 12.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export function ScreenshotGallery({ shots, labels }: ScreenshotGalleryProps) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const safeIndex = shots.length === 0 ? 0 : Math.min(index, shots.length - 1);
  const active = shots[safeIndex];
  const prevShot = shots[(safeIndex - 1 + shots.length) % shots.length];
  const nextShot = shots[(safeIndex + 1) % shots.length];

  const step = useCallback(
    (delta: number) => {
      if (shots.length === 0) return;
      setIndex((current) => (current + delta + shots.length) % shots.length);
    },
    [shots.length]
  );

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    if (index !== safeIndex) setIndex(safeIndex);
  }, [index, safeIndex]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "Escape" && lightboxOpen) closeLightbox();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [step, lightboxOpen, closeLightbox]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxOpen]);

  if (!active) return null;

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="grid items-stretch lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: dense screen picker */}
          <div className="flex flex-col border-b border-line p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
                  {String(safeIndex + 1).padStart(2, "0")} /{" "}
                  {String(shots.length).padStart(2, "0")}
                </p>
                <h4 className="mt-1 font-display text-2xl tracking-tight text-ink sm:text-3xl">
                  {shortLabel(active.caption)}
                </h4>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={labels.prev}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface-raised text-ink transition hover:border-accent hover:text-accent"
                >
                  <ArrowIcon direction="left" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={labels.next}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface-raised text-ink transition hover:border-accent hover:text-accent"
                >
                  <ArrowIcon direction="right" />
                </button>
              </div>
            </div>

            <p className="mb-4 text-sm leading-6 text-muted">
              {longCaption(active.caption)}
            </p>

            <ol
              className="flex flex-1 flex-col gap-2"
              role="tablist"
              aria-label="Screens"
            >
              {shots.map((shot, i) => {
                const selected = i === safeIndex;
                return (
                  <li key={shot.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setIndex(i)}
                      className={`flex w-full items-start gap-3 rounded-xl border px-2.5 py-2.5 text-left transition-all duration-200 sm:gap-3.5 sm:px-3 sm:py-3 ${
                        selected
                          ? "border-accent/35 bg-accent-soft shadow-[0_8px_24px_var(--glow)]"
                          : "border-line bg-canvas/50 hover:border-ink/15 hover:bg-surface-raised"
                      }`}
                    >
                      <span
                        className={`relative mt-0.5 h-[52px] w-[28px] shrink-0 overflow-hidden rounded-[0.45rem] border sm:h-[60px] sm:w-[32px] ${
                          selected ? "border-accent/40" : "border-line"
                        }`}
                      >
                        <Image
                          src={shot.src}
                          alt=""
                          fill
                          sizes="32px"
                          className="object-cover object-top"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span
                            className={`font-display text-xs italic tabular-nums ${
                              selected ? "text-accent" : "text-ink/30"
                            }`}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              selected ? "text-ink" : "text-muted"
                            }`}
                          >
                            {shortLabel(shot.caption)}
                          </span>
                        </span>
                        <span
                          className={`mt-1 block text-xs leading-5 ${
                            selected ? "text-muted" : "text-ink/40"
                          }`}
                        >
                          {longCaption(shot.caption)}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right: stage with side peeks */}
          <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden bg-canvas px-2 py-6 sm:min-h-[520px] sm:px-4 sm:py-10">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 65% 50% at 50% 42%, var(--glow), transparent 68%), linear-gradient(180deg, transparent 0%, var(--accent-soft) 100%)",
              }}
              aria-hidden
            />

            <div className="relative flex w-full max-w-[420px] items-center justify-center">
              {prevShot ? (
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={labels.prev}
                  className="absolute left-0 z-[1] hidden w-[108px] -translate-x-2 scale-90 opacity-35 transition hover:opacity-55 sm:block"
                >
                  <MiniPhone shot={prevShot} />
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="relative z-[2] w-[min(200px,58vw)] cursor-zoom-in transition-transform duration-300 hover:-translate-y-1 sm:w-[250px]"
                aria-label={`${active.alt} — ${labels.zoomHint}`}
              >
                <div className="rounded-[1.75rem] border border-line bg-surface-raised p-2.5 shadow-[0_20px_60px_var(--glow)]">
                  <div className="mx-auto mb-2 h-1.5 w-14 rounded-full bg-ink/20" />
                  <div
                    className="relative overflow-hidden rounded-[1.25rem] bg-surface"
                    style={{
                      aspectRatio: `${active.width} / ${active.height}`,
                    }}
                  >
                    {shots.map((shot, i) => (
                      <div
                        key={shot.id}
                        className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                          i === safeIndex ? "opacity-100" : "opacity-0"
                        }`}
                        aria-hidden={i !== safeIndex}
                      >
                        <Image
                          src={shot.src}
                          alt={i === safeIndex ? shot.alt : ""}
                          fill
                          sizes="250px"
                          className="object-cover object-top"
                          priority={i === 0}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </button>

              {nextShot ? (
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={labels.next}
                  className="absolute right-0 z-[1] hidden w-[108px] translate-x-2 scale-90 opacity-35 transition hover:opacity-55 sm:block"
                >
                  <MiniPhone shot={nextShot} />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen ? (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-ink/85 p-4 sm:p-8"
          role="dialog"
          aria-modal
          aria-label={active.alt}
          onClick={closeLightbox}
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
              className="inline-flex size-10 items-center justify-center rounded-full border border-canvas/30 text-canvas transition hover:border-accent hover:text-accent"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={labels.next}
              className="inline-flex size-10 items-center justify-center rounded-full border border-canvas/30 text-canvas transition hover:border-accent hover:text-accent"
            >
              <ArrowIcon direction="right" />
            </button>
            <button
              type="button"
              onClick={closeLightbox}
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

function MiniPhone({ shot }: { shot: Screenshot }) {
  return (
    <div className="rounded-[1rem] border border-line bg-surface-raised p-1.5 shadow-[0_8px_24px_rgba(28,20,16,0.08)]">
      <div className="mx-auto mb-1 h-1 w-8 rounded-full bg-ink/15" />
      <div
        className="relative overflow-hidden rounded-[0.7rem] bg-surface"
        style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
      >
        <Image
          src={shot.src}
          alt=""
          fill
          sizes="108px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
