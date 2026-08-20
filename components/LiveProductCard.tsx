"use client";

import { site } from "@/lib/site";
import type { Screenshot } from "@/lib/screenshots";
import { DevicePreview } from "./DevicePreview";
import { PhoneFrame } from "./PhoneFrame";

type LiveProductCardProps = {
  title: string;
  subtitle: string;
  liveLabel: string;
  shots?: Screenshot[];
};

export function LiveProductCard({
  title,
  subtitle,
  liveLabel,
  shots,
}: LiveProductCardProps) {
  return (
    <a
      href={site.tennisMatch.url}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl border border-line bg-surface-raised p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_60px_var(--glow)] sm:p-8"
    >
      <p className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
        <span className="size-2 rounded-full bg-accent" aria-hidden />
        {liveLabel}
      </p>
      {shots?.length ? (
        <PhoneFrame shots={shots} autoplay priority showDots={false} />
      ) : (
        <DevicePreview variant="list" />
      )}
      <h2 className="mt-6 font-display text-3xl tracking-tight text-ink">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">{subtitle}</p>
      <p className="mt-4 text-sm font-medium text-accent transition-transform duration-200 group-hover:translate-x-1">
        tennismatch.ba →
      </p>
    </a>
  );
}
