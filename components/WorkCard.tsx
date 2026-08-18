import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { DevicePreview } from "./DevicePreview";

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
}: WorkCardProps) {
  return (
    <article
      className={`group grid items-center gap-10 rounded-2xl border border-line p-6 transition duration-300 hover:border-accent/40 hover:shadow-[0_0_48px_var(--glow)] sm:p-10 lg:grid-cols-2 lg:gap-14 ${
        featured ? "bg-surface-raised" : "bg-surface"
      }`}
    >
      <DevicePreview variant={variant} />
      <div className="flex flex-col gap-5">
        <h3 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
          {title}
        </h3>
        <p className="max-w-md text-base leading-7 text-muted">{subtitle}</p>
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
            className="inline-flex h-11 items-center justify-center bg-accent px-5 text-sm font-medium text-canvas transition hover:bg-ink hover:text-canvas"
          >
            {readLabel}
          </Link>
          <a
            href={liveHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center border border-line px-5 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
          >
            {liveLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
