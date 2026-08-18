import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.meta.aboutTitle };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang as Locale);

  return (
    <Container className="flex flex-col gap-20 py-16 sm:py-24">
      <header className="flex flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
          {dict.about.kicker}
        </p>
        <h1 className="font-display text-5xl tracking-tight text-ink sm:text-7xl">
          {site.name}
        </h1>
      </header>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal className="flex max-w-2xl flex-col gap-6 text-lg leading-8 text-muted">
          <h2 className="font-display text-3xl text-ink">{dict.about.who.title}</h2>
          <p>{dict.about.who.p1}</p>
          <p>{dict.about.who.p2}</p>
        </Reveal>
        <Reveal
          delay={0.06}
          className="aspect-[4/5] rounded-2xl border border-line bg-surface-raised"
          aria-hidden
        >
          <p className="p-5 text-sm text-muted">{dict.about.photoSoon}</p>
        </Reveal>
      </section>

      <Reveal className="flex max-w-2xl flex-col gap-6 border-t border-line pt-16">
        <h2 className="font-display text-4xl tracking-tight text-ink">
          {dict.about.how.title}
        </h2>
        <p className="text-lg leading-8 text-muted">{dict.about.how.p}</p>
      </Reveal>

      <Reveal className="flex flex-col gap-8 border-t border-line pt-16">
        <h2 className="font-display text-4xl tracking-tight text-ink">
          {dict.about.stack.title}
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {(
            [
              ["Tennis Match", dict.stack.tennisMatch],
              ["Preferito", dict.stack.preferito],
            ] as const
          ).map(([label, stack]) => (
            <dl
              key={label}
              className="grid gap-4 rounded-xl border border-line bg-surface p-5"
            >
              <dt className="font-display text-xl text-ink">{label}</dt>
              {(
                Object.entries(dict.stack.groups) as [
                  keyof typeof dict.stack.groups,
                  string,
                ][]
              ).map(([key, groupLabel]) => (
                <div key={key} className="border-l-2 border-accent pl-4">
                  <dt className="text-xs uppercase tracking-wider text-muted">
                    {groupLabel}
                  </dt>
                  <dd className="mt-1 leading-7 text-muted">{stack[key]}</dd>
                </div>
              ))}
            </dl>
          ))}
        </div>
      </Reveal>

      <Reveal className="flex max-w-2xl flex-col gap-6 border-t border-line pt-16">
        <h2 className="font-display text-4xl tracking-tight text-ink">
          {dict.about.looking.title}
        </h2>
        <p className="text-lg leading-8 text-muted">{dict.about.looking.p}</p>
        <p className="text-lg leading-8 text-muted/80">
          {dict.about.looking.tennis}
        </p>
        <p className="text-sm text-muted">
          <a
            href={localePath(lang as Locale, "cv")}
            className="text-accent underline underline-offset-4"
          >
            {dict.about.looking.cvLabel}
          </a>
        </p>
      </Reveal>
    </Container>
  );
}
