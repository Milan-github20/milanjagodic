"use client";

import { site } from "@/lib/content/site";
import type { Screenshot } from "@/lib/content/screenshots";
import { BrowserFrame } from "@/components/work/BrowserFrame";
import { DevicePreview } from "@/components/work/DevicePreview";
import { PhoneFrame } from "@/components/work/PhoneFrame";

type LiveProductCardProps = {
  title: string;
  subtitle: string;
  liveLabel: string;
  desktopShot?: Screenshot;
  mobileShot?: Screenshot;
};

export function LiveProductCard({
  title,
  subtitle,
  liveLabel,
  desktopShot,
  mobileShot,
}: LiveProductCardProps) {
  return (
    <a
      href={site.tennisMatch.url}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl border border-line bg-surface-raised p-4 transition-colors duration-200 hover:border-accent/40 sm:p-5 lg:p-6"
    >
      <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
        <span className="size-2 rounded-full bg-accent" aria-hidden />
        {liveLabel}
      </p>

      {desktopShot || mobileShot ? (
        <>
          {desktopShot ? (
            <div className="hidden md:block">
              <BrowserFrame shot={desktopShot} priority />
            </div>
          ) : null}
          {mobileShot ? (
            <div className={desktopShot ? "md:hidden" : undefined}>
              <PhoneFrame
                shots={mobileShot}
                size="md"
                priority
                showDots={false}
              />
            </div>
          ) : null}
        </>
      ) : (
        <DevicePreview variant="list" />
      )}

      <h2 className="mt-5 font-display text-2xl tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
        {subtitle}
      </p>
      <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform duration-200 group-hover:translate-x-1 sm:text-base">
        tennismatch.ba
        <svg
          viewBox="0 0 16 16"
          width="12"
          height="12"
          fill="none"
          aria-hidden
          className="block"
        >
          <path
            d="M6 3.5 10.5 8 6 12.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </p>
    </a>
  );
}
