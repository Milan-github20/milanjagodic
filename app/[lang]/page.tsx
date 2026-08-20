import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { WorkCard } from "@/components/WorkCard";
import { HeroSection } from "@/components/HeroSection";
import { ProcessCard } from "@/components/ProcessCard";
import { StackCard } from "@/components/StackCard";
import { CtaSection } from "@/components/CtaSection";
import { Marquee } from "@/components/Marquee";
import { SectionNumber } from "@/components/SectionNumber";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { getFeaturedShot, getTennisMatchHeroShots } from "@/lib/screenshots";
import { site } from "@/lib/site";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <HeroSection
        locale={locale}
        kicker={dict.hero.kicker}
        sentence={dict.hero.sentence}
        secondary={dict.hero.secondary}
        seeWork={dict.hero.seeWork}
        getInTouch={dict.hero.getInTouch}
        liveLabel={dict.hero.liveProduct}
        tennisMatchTitle={site.tennisMatch.title}
        tennisMatchSubtitle={dict.work.tennisMatch.subtitle}
        availableLabel={dict.close.heroAvailable}
        stats={[...dict.close.heroStats]}
        heroShots={getTennisMatchHeroShots(locale)}
      />

      {/* Work */}
      <section id="work" className="scroll-mt-16 border-t border-line">
        <Container className="flex flex-col gap-10 py-12 sm:py-16 lg:py-24">
          <Reveal>
            <SectionNumber number="01" label={dict.work.title} />
            <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {dict.work.title}
            </h2>
          </Reveal>
          <div className="flex flex-col gap-10 sm:gap-14">
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
                shot={getFeaturedShot(locale)}
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

      {/* Process */}
      <section className="border-t border-line bg-surface">
        <Container className="flex flex-col gap-10 py-12 sm:py-16 lg:py-24">
          <Reveal>
            <SectionNumber number="02" label={dict.process.kicker} />
            <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {dict.process.title}
            </h2>
          </Reveal>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dict.process.steps.map((item, index) => (
              <ProcessCard
                key={item}
                number={String(index + 1).padStart(2, "0")}
                text={item}
                delay={index * 0.09}
              />
            ))}
          </ol>
        </Container>
      </section>

      {/* Stack */}
      <section className="border-t border-line">
        <Container className="flex flex-col gap-10 py-12 sm:py-16 lg:py-24">
          <Reveal>
            <SectionNumber number="03" label={dict.stack.kicker} />
            <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {dict.stack.title}
            </h2>
            <p className="mt-3 max-w-xl text-muted">{dict.stack.note}</p>
          </Reveal>
          <div className="grid gap-10 lg:grid-cols-2">
            <StackCard
              label="Tennis Match"
              stack={dict.stack.tennisMatch as Record<string, string>}
              groups={dict.stack.groups as Record<string, string>}
              side="left"
            />
            <StackCard
              label="Preferito"
              stack={dict.stack.preferito as Record<string, string>}
              groups={dict.stack.groups as Record<string, string>}
              side="right"
            />
          </div>
        </Container>
      </section>

      <Marquee items={[...dict.close.marqueeItems]} />

      {/* CTA */}
      <CtaSection
        location={dict.close.location}
        availability={dict.close.availability}
        email={site.email}
        availableNow={dict.close.availableNow}
        whatIOffer={dict.close.whatIOffer}
        offerItems={[...dict.close.offerItems]}
        findMe={dict.close.findMe}
        navigate={dict.close.navigate}
        socialLinks={[
          { label: "GitHub", href: site.social.github },
          { label: "LinkedIn", href: site.social.linkedin },
        ]}
        quickLinks={[
          { label: dict.work.title, href: "#work" },
          { label: dict.nav.about, href: "about" },
          { label: dict.nav.cv, href: "cv" },
        ]}
      />
    </>
  );
}
