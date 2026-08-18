"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/lib/i18n";

export default function NotFound() {
  const pathname = usePathname() ?? "";
  const segment = pathname.split("/")[1];
  const locale = isLocale(segment) ? segment : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center gap-6 py-20">
      <p className="text-sm uppercase tracking-widest text-accent">404</p>
      <h1 className="font-display text-5xl text-ink sm:text-6xl">
        {dict.notFound.title}
      </h1>
      <p className="max-w-md text-muted">{dict.notFound.body}</p>
      <Link
        href={localePath(locale)}
        className="inline-flex h-11 items-center bg-accent px-5 text-sm font-medium text-canvas"
      >
        {dict.notFound.home}
      </Link>
    </Container>
  );
}
