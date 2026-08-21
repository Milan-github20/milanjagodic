"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import type { Screenshot } from "@/lib/content/screenshots";
import { BrowserFrame } from "@/components/work/BrowserFrame";
import { DevicePreview } from "@/components/work/DevicePreview";
import { PhoneFrame } from "@/components/work/PhoneFrame";

type WorkCardProps = {
  locale: Locale;
  title: string;
  subtitle: string;
  cardLine: string;
  tags: readonly string[];
  role: string;
  slug: string;
  liveHref: string;
  variant: "list" | "calendar";
  featured?: boolean;
  readLabel: string;
  liveLabel: string;
  shot?: Screenshot;
  desktopShot?: Screenshot;
};

export function WorkCard({
  locale,
  title,
  subtitle,
  cardLine,
  tags,
  role,
  slug,
  liveHref,
  variant,
  featured = false,
  readLabel,
  liveLabel,
  shot,
  desktopShot,
}: WorkCardProps) {
  return (
    <article
      className={`group relative grid items-center gap-6 overflow-hidden rounded-2xl border border-line p-4 transition-colors duration-200 hover:border-accent/40 sm:gap-8 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-10 ${
        featured ? "bg-surface-raised" : "bg-surface"
      }`}
    >
      {desktopShot || shot ? (
        <>
          {desktopShot ? (
            <div className="hidden md:block">
              <BrowserFrame shot={desktopShot} priority={featured} />
            </div>
          ) : null}
          {shot ? (
            <div className={desktopShot ? "md:hidden" : undefined}>
              <PhoneFrame shots={shot} size="md" />
            </div>
          ) : null}
        </>
      ) : (
        <DevicePreview variant={variant} />
      )}

      <div className="flex flex-col gap-5">
        <h3 className="font-display text-2xl tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h3>
        <p className="max-w-md text-sm leading-6 text-muted sm:text-base sm:leading-7">{subtitle}</p>
        <p className="text-sm leading-6 text-ink/80">{cardLine}</p>

        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <p className="text-sm text-muted">{role}</p>

        <div className="flex flex-wrap gap-3">
          <Link
            href={localePath(locale, `work/${slug}`)}
            className="inline-flex h-11 flex-1 items-center justify-center whitespace-nowrap bg-accent px-5 text-xs font-medium uppercase tracking-[0.1em] text-canvas transition-colors hover:bg-ink sm:flex-none sm:text-sm"
          >
            {readLabel}
          </Link>
          <a
            href={liveHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 flex-1 items-center justify-center whitespace-nowrap border border-line px-5 text-xs font-medium uppercase tracking-[0.1em] text-ink transition-colors hover:border-accent hover:text-accent sm:flex-none sm:text-sm"
          >
            {liveLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
