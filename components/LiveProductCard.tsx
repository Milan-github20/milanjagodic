import { site } from "@/lib/site";
import { DevicePreview } from "./DevicePreview";

type LiveProductCardProps = {
  title: string;
  subtitle: string;
  liveLabel: string;
};

export function LiveProductCard({
  title,
  subtitle,
  liveLabel,
}: LiveProductCardProps) {
  return (
    <a
      href={site.tennisMatch.url}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl border border-line bg-surface-raised p-6 transition duration-300 hover:border-accent/50 hover:shadow-[0_0_48px_var(--glow)] sm:p-8"
    >
      <p className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
        <span className="size-2 animate-pulse rounded-full bg-accent" aria-hidden />
        {liveLabel}
      </p>
      <DevicePreview variant="list" />
      <h2 className="mt-6 font-display text-3xl tracking-tight text-ink">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">{subtitle}</p>
      <p className="mt-4 text-sm font-medium text-accent group-hover:underline group-hover:underline-offset-4">
        tennismatch.ba →
      </p>
    </a>
  );
}
