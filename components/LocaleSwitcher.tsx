"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { localeLabel, locales } from "@/lib/i18n";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const otherLocale = locales.find((l) => l !== locale) ?? "sr";
  const switchedPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <Link
      href={switchedPath}
      className="rounded-full border border-line px-2.5 py-0.5 text-xs uppercase tracking-wider text-muted transition hover:border-accent hover:text-accent"
      hrefLang={otherLocale}
    >
      {localeLabel(otherLocale)}
    </Link>
  );
}
