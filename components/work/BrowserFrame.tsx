"use client";

import Image from "next/image";
import type { Screenshot } from "@/lib/content/screenshots";

type BrowserFrameProps = {
  shot: Screenshot;
  priority?: boolean;
  className?: string;
};

export function BrowserFrame({
  shot,
  priority = false,
  className = "",
}: BrowserFrameProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="overflow-hidden rounded-xl border border-line bg-surface-raised shadow-[0_16px_48px_var(--glow)]">
        <div className="flex items-center gap-2 border-b border-line bg-canvas/80 px-3 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
          </span>
          <div className="ml-2 flex min-w-0 flex-1 items-center rounded-md border border-line bg-surface px-3 py-1">
            <span className="truncate text-[11px] text-muted">
              tennismatch.ba
            </span>
          </div>
        </div>
        <div
          className="relative bg-ink"
          style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 720px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
