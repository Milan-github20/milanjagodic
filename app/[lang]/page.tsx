import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { LiveProductCard } from "@/components/LiveProductCard";
import { Reveal } from "@/components/Reveal";
import { WorkCard } from "@/components/WorkCard";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <section className="hero-glow cinematic-grid relative overflow-hidden">
        <Container className="relative grid items-end gap-16 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-12 lg:py-28">
          <div>
            <p className="text-sm font-medium text-accent">{dict.hero.kicker}</p>
            <h1 className="mt-6 font-display text-[4rem] leading-[0.9] tracking-tight text-ink sm:text-8xl lg:text-[7rem]">
              <span className="block">Milan</span>
              <span className="block italic text-accent">Jagodić</span>
            </h1>
            <p className="mt-10 max-w-xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
              {dict.hero.sentence}
            </p>
            <p className="mt-4 text-sm text-muted/80">{dict.hero.secondary}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={localePath(locale, "#work")}
                className="inline-flex h-12 items-center justify-center bg-accent px-7 text-sm font-medium text-canvas transition hover:bg-ink"
              >
                {dict.hero.seeWork}
              </Link>
              <Link
                href={localePath(locale, "contact")}
                className="inline-flex h-12 items-center justify-center border border-line px-7 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
              >
                {dict.hero.getInTouch}
              </Link>
            </div>
          </div>
          <LiveProductCard
            title={site.tennisMatch.title}
            subtitle={dict.work.tennisMatch.subtitle}
            liveLabel={dict.hero.liveProduct}
          />
        </Container>
      </section>

      <section id="work" className="scroll-mt-20 border-t border-line">
        <Container className="flex flex-col gap-12 py-20 sm:py-24">
          <Reveal>
            <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
              {dict.work.title}
            </h2>
          </Reveal>
          <div className="flex flex-col gap-14">
            <Reveal>
              <WorkCard
                locale={locale}
                featured
                title={site.tennisMatch.title}
                subtitle={dict.work.tennisMatch.subtitle}
                cardLine={dict.work.tennisMatch.cardLine}
                tags={dict.work.tennisMatch.tags}
                role={dict.work.tennisMatch.role}
                slug={site.tennisMatch.slug}
                liveHref={site.tennisMatch.url}
                variant="list"
                readLabel={dict.work.readCaseStudy}
                liveLabel={dict.work.live}
              />
            </Reveal>
            <Reveal delay={0.08}>
              <WorkCard
                locale={locale}
                title={site.preferito.title}
                subtitle={dict.work.preferito.subtitle}
                cardLine={dict.work.preferito.cardLine}
                tags={dict.work.preferito.tags}
                role={dict.work.preferito.role}
                slug={site.preferito.slug}
                liveHref={site.preferito.url}
                variant="calendar"
                readLabel={dict.work.readCaseStudy}
                liveLabel={dict.work.live}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface">
        <Container className="flex flex-col gap-12 py-20 sm:py-24">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
              {dict.process.kicker}
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
              {dict.process.title}
            </h2>
          </Reveal>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dict.process.steps.map((item, index) => (
              <Reveal key={item} delay={index * 0.06}>
                <li className="flex h-full flex-col gap-4 rounded-xl border border-line bg-surface-raised p-6">
                  <span className="font-display text-4xl italic text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-7 text-muted">{item}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="flex flex-col gap-12 py-20 sm:py-24">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
              {dict.stack.kicker}
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
              {dict.stack.title}
            </h2>
            <p className="mt-3 max-w-xl text-muted">{dict.stack.note}</p>
          </Reveal>
          <div className="grid gap-10 lg:grid-cols-2">
            {(
              [
                ["Tennis Match", dict.stack.tennisMatch],
                ["Preferito", dict.stack.preferito],
              ] as const
            ).map(([label, stack]) => (
              <dl
                key={label}
                className="grid gap-4 rounded-2xl border border-line bg-surface p-6"
              >
                <dt className="font-display text-2xl text-ink">{label}</dt>
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
                    <dd className="mt-1 text-sm leading-6 text-ink/90">
                      {stack[key]}
                    </dd>
                  </div>
                ))}
              </dl>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface">
        <Container className="flex flex-col gap-6 py-20 sm:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            {dict.close.location}
          </p>
          <p className="max-w-2xl font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            {dict.close.availability}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="w-fit text-xl font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:text-ink sm:text-2xl"
          >
            {site.email}
          </a>
        </Container>
      </section>
    </>
  );
}
