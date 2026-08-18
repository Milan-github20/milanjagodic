import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import Link from "next/link";
import { site } from "@/lib/site";
import type { Dictionary } from "@/lib/dictionaries";
import { Container } from "./Container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: HeaderProps) {
  const nav = [
    { href: localePath(locale, "#work"), label: dict.nav.work },
    { href: localePath(locale, "about"), label: dict.nav.about },
    { href: localePath(locale, "contact"), label: dict.nav.contact },
    { href: localePath(locale, "cv"), label: dict.nav.cv },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/85 backdrop-blur-md print:hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <Container className="flex min-h-16 items-center justify-between gap-6 py-3">
        <Link
          href={localePath(locale)}
          className="shrink-0 text-sm font-medium tracking-tight text-ink hover:text-accent"
        >
          {site.name}
        </Link>
        <nav
          aria-label={dict.nav.primary}
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle dict={dict} />
          <LocaleSwitcher locale={locale} />
        </nav>
      </Container>
    </header>
  );
}
