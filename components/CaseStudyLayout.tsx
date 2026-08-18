import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import type { CaseStudyContent } from "@/lib/case-studies";
import type { Dictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Container } from "./Container";
import { DevicePreview } from "./DevicePreview";
import { Reveal } from "./Reveal";

type CaseStudyLayoutProps = {
  locale: Locale;
  dict: Dictionary;
  content: CaseStudyContent;
  variant: "list" | "calendar";
};

const navIds = ["overview", "decisions", "technical", "outcome"] as const;

export function CaseStudyLayout({
  locale,
  dict,
  content,
  variant,
}: CaseStudyLayoutProps) {
  const cs = dict.caseStudy;
  const nextTitle =
    content.nextProjectSlug === "tennis-match"
      ? site.tennisMatch.title
      : site.preferito.title;

  return (
    <>
      <section className="hero-glow cinematic-grid relative overflow-hidden border-b border-line">
        <Container className="relative py-16 sm:py-24 lg:py-28">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            {content.role} · {content.year}
          </p>
          <h1 className="mt-4 font-display text-5xl tracking-tight text-ink sm:text-7xl lg:text-8xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            {content.hook}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {content.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line px-3 py-1 text-xs text-muted"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={content.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center bg-accent px-5 text-sm font-medium text-canvas hover:bg-ink"
            >
              {cs.live}
            </a>
            {content.demoUrl ? (
              <a
                href={content.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center border border-line px-5 text-sm font-medium text-ink hover:border-accent hover:text-accent"
              >
                {cs.tryDemo}
              </a>
            ) : content.demoOnRequest ? (
              <Link
                href={localePath(locale, "contact")}
                className="inline-flex h-11 items-center border border-line px-5 text-sm font-medium text-muted"
              >
                {cs.demoOnRequest}
              </Link>
            ) : null}
          </div>
        </Container>
      </section>

      <nav
        aria-label="Case study sections"
        className="sticky top-16 z-30 border-b border-line bg-canvas/90 backdrop-blur-md"
      >
        <Container className="flex gap-6 overflow-x-auto py-3 text-sm">
          {navIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="shrink-0 text-muted transition hover:text-accent"
            >
              {cs.nav[id]}
            </a>
          ))}
        </Container>
      </nav>

      <Container className="py-16 sm:py-20">
        <section id="overview" className="scroll-mt-28">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              {cs.overview}
            </h2>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-line bg-surface p-5"
                >
                  <dt className="text-xs uppercase tracking-wider text-muted">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-display text-2xl text-ink">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="mt-16">
            <h3 className="font-display text-2xl text-ink">{cs.context}</h3>
            <div className="mt-4 max-w-3xl space-y-4 text-base leading-7 text-muted">
              {content.context.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <h3 className="font-display text-2xl text-ink">{cs.role}</h3>
            <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-muted">
              {content.constraints.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <h3 className="font-display text-2xl text-ink">{cs.goals}</h3>
            <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-muted">
              {content.goals.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="mt-20">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              {cs.flow}
            </h2>
          </Reveal>
          <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
            {content.flow.map((step, index) => (
              <Reveal
                key={step.title}
                delay={index * 0.05}
                className="min-w-[220px] shrink-0 rounded-xl border border-line bg-surface p-5 sm:min-w-[240px]"
              >
                <span className="font-display text-3xl italic text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-medium text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <DevicePreview variant={variant} />
          </div>
        </section>

        <section id="decisions" className="mt-20 scroll-mt-28">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              {cs.decisions}
            </h2>
          </Reveal>
          <div className="mt-8 flex flex-col gap-6">
            {content.decisions.map((d, index) => (
              <Reveal
                key={d.problem}
                delay={index * 0.04}
                className="rounded-xl border border-line bg-surface p-6 sm:p-8"
              >
                <p className="text-xs uppercase tracking-wider text-accent">
                  {cs.problem}
                </p>
                <p className="mt-2 text-lg text-ink">{d.problem}</p>
                <p className="mt-4 text-sm text-muted">
                  <strong className="text-ink">{cs.options}:</strong> {d.options}
                </p>
                <p className="mt-2 text-sm text-muted">
                  <strong className="text-ink">{cs.choice}:</strong> {d.choice}
                </p>
                <p className="mt-2 text-sm text-muted">
                  <strong className="text-ink">{cs.why}:</strong> {d.why}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="technical" className="mt-20 scroll-mt-28">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              {cs.technical}
            </h2>
          </Reveal>
          <Reveal className="mt-8 rounded-xl border border-line bg-surface-raised p-6 sm:p-8">
            <ArchitectureDiagram
              variant={content.slug === "tennis-match" ? "tennis" : "preferito"}
              caption={
                content.slug === "tennis-match"
                  ? cs.tennisCaption
                  : cs.preferitoCaption
              }
            />
          </Reveal>
          <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5 text-muted">
            {content.technicalNotes.map((note) => (
              <li key={note.slice(0, 40)}>{note}</li>
            ))}
          </ul>
        </section>

        <section id="outcome" className="mt-20 scroll-mt-28">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              {cs.hardParts}
            </h2>
            <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-muted">
              {content.hardParts.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              {cs.outcome}
            </h2>
            <div className="mt-4 max-w-3xl space-y-4 text-muted">
              {content.outcome.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              {cs.next}
            </h2>
            <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-muted">
              {content.next.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="mt-20 border-t border-line pt-16">
          <p className="text-sm uppercase tracking-wider text-muted">
            {cs.nextProject}
          </p>
          <Link
            href={localePath(locale, `work/${content.nextProjectSlug}`)}
            className="mt-4 block font-display text-4xl text-accent transition hover:text-ink sm:text-5xl"
          >
            {nextTitle} →
          </Link>
        </section>
      </Container>
    </>
  );
}
