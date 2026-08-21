"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import type { CaseStudyContent } from "@/lib/content/case-studies";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Screenshot } from "@/lib/content/screenshots";
import { site } from "@/lib/content/site";
import { Container } from "@/components/layout/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { ArchitectureDiagram } from "@/components/work/ArchitectureDiagram";
import { DevicePreview } from "@/components/work/DevicePreview";
import { FlowTimeline } from "@/components/work/FlowTimeline";
import { ProductStage } from "@/components/work/ProductStage";
import { ScreenshotGallery } from "@/components/work/ScreenshotGallery";

type CaseStudyLayoutProps = {
  locale: Locale;
  dict: Dictionary;
  content: CaseStudyContent;
  variant: "list" | "calendar";
  shots?: Screenshot[];
  desktopShot?: Screenshot;
};

const ease = [0.22, 1, 0.36, 1] as const;
const navIds = ["overview", "decisions", "technical", "outcome"] as const;

function SplitTitle({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span aria-label={text} className="inline-block pb-2">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.025, ease }}
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/** Bold the leading label before the first colon, e.g. "End-to-end razvoj: …" */
function LabeledLine({ text }: { text: string }) {
  const colon = text.indexOf(":");
  if (colon <= 0 || colon > 72) {
    return <span className="leading-7">{text}</span>;
  }

  return (
    <span className="leading-7">
      <span className="font-semibold text-ink">{text.slice(0, colon + 1)}</span>
      <span className="text-muted"> {text.slice(colon + 1).trimStart()}</span>
    </span>
  );
}

function StatCard({ label, value, index }: { label: string; value: string; index: number }) {
  return (
    <motion.div
      className="rounded-xl border border-line bg-surface p-5 relative overflow-hidden group cursor-default"
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease }}
      whileHover={{ borderColor: "rgba(194,58,18,0.35)", y: -4 }}
    >
      <motion.div
        className="absolute inset-0 bg-accent/[0.03] opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left scale-x-0 group-hover:scale-x-100"
        transition={{ duration: 0.4, ease }}
      />
      <dt className="text-xs uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-2 font-display text-2xl text-ink">{value}</dd>
    </motion.div>
  );
}

function DecisionCard({
  d,
  cs,
  index,
}: {
  d: {
    title?: string;
    problem: string;
    options: string;
    choice: string;
    why: string;
  };
  cs: Dictionary["caseStudy"];
  index: number;
}) {
  return (
    <motion.div
      className="rounded-xl border border-line bg-surface p-4 sm:p-8 relative overflow-hidden group"
      initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease }}
      whileHover={{
        borderColor: "rgba(194,58,18,0.25)",
        boxShadow: "0 8px 40px rgba(194,58,18,0.07)",
      }}
    >
      <motion.span
        className="absolute top-3 right-4 font-display text-4xl italic text-accent/10 select-none pointer-events-none sm:top-4 sm:right-6 sm:text-5xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 + 0.2 }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {d.title ? (
        <h3 className="pr-14 font-display text-xl tracking-tight text-ink sm:text-2xl">
          {d.title}
        </h3>
      ) : null}

      <p
        className={`text-xs uppercase tracking-wider text-accent ${
          d.title ? "mt-5" : ""
        }`}
      >
        {cs.problem}
      </p>
      <p className="mt-2 text-base leading-7 text-ink sm:text-lg">{d.problem}</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3 sm:gap-3">
        {[
          { label: cs.options, value: d.options },
          { label: cs.choice, value: d.choice },
          { label: cs.why, value: d.why },
        ].map(({ label, value }, i) => (
          <motion.div
            key={label}
            className="border-l-2 border-line pl-3 group-hover:border-accent/40"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.05 + i * 0.06, ease }}
          >
            <p className="text-xs font-medium text-ink">{label}</p>
            <p className="mt-1 text-sm leading-6 text-muted">{value}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function CaseStudyLayout({
  locale,
  dict,
  content,
  variant,
  shots,
  desktopShot,
}: CaseStudyLayoutProps) {
  const cs = dict.caseStudy;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const byId = (id: string) => shots?.find((shot) => shot.id === id);
  const stageMobile = byId("landing") ?? byId("home");
  const showProductStage = Boolean(desktopShot && stageMobile);

  const nextTitle =
    content.nextProjectSlug === "tennis-match"
      ? site.tennisMatch.title
      : site.preferito.title;

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="hero-glow cinematic-grid relative overflow-hidden border-b border-line">
        <Container className="relative py-10 sm:py-20 lg:py-32">
          <motion.div style={{ y: yText, opacity }}>
            <motion.p
              className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-medium uppercase tracking-[0.14em] text-accent sm:text-sm sm:tracking-[0.18em]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <motion.span
                className="inline-block h-px w-6 bg-accent origin-left sm:w-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.1, ease }}
              />
              <span className="min-w-0 leading-snug">
                {content.role} · {content.year}
              </span>
            </motion.p>

            <h1 className="mt-4 font-display text-[2.35rem] tracking-tight text-ink sm:mt-5 sm:text-6xl lg:text-8xl">
              <SplitTitle text={content.title} delay={0.1} />
            </h1>

            <motion.p
              className="mt-5 max-w-2xl text-base leading-7 text-muted sm:mt-6 sm:text-xl sm:leading-8"
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.65, delay: 0.4, ease }}
            >
              {content.hook}
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap gap-2 sm:mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              {content.stack.map((item, i) => (
                <motion.span
                  key={item}
                  className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted sm:px-3 sm:text-xs"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.04, duration: 0.3, ease }}
                  whileHover={{ borderColor: "var(--accent)", color: "var(--accent)", scale: 1.08 }}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65, ease }}
            >
              <MagneticButton>
                <a
                  href={content.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 w-full items-center justify-center bg-accent px-5 text-sm font-medium text-canvas hover:bg-ink transition-colors sm:w-auto"
                >
                  {content.liveLabel ?? cs.live}
                </a>
              </MagneticButton>
              {content.demoUrl ? (
                <MagneticButton>
                  <a
                    href={content.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 w-full items-center justify-center border border-line px-5 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors sm:w-auto"
                  >
                    {cs.tryDemo}
                  </a>
                </MagneticButton>
              ) : content.demoOnRequest ? (
                <MagneticButton>
                  <Link
                    href={localePath(locale, "contact")}
                    className="inline-flex h-11 w-full items-center justify-center border border-line px-5 text-sm font-medium text-muted hover:border-accent hover:text-accent transition-colors sm:w-auto"
                  >
                    {cs.demoOnRequest}
                  </Link>
                </MagneticButton>
              ) : null}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Sticky nav */}
      <nav
        aria-label="Case study sections"
        className="sticky top-14 z-30 border-b border-line bg-canvas/90 backdrop-blur-md overflow-hidden"
      >
        <motion.div
          className="h-px bg-accent/20 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        />
        <Container className="flex gap-5 overflow-x-auto py-3 text-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navIds.map((id, i) => (
            <motion.a
              key={id}
              href={`#${id}`}
              className="shrink-0 whitespace-nowrap text-muted transition-colors hover:text-accent relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease }}
            >
              {cs.nav[id]}
            </motion.a>
          ))}
        </Container>
      </nav>

      <Container className="py-12 sm:py-20">
        {/* Overview */}
        <section id="overview" className="scroll-mt-32">
          <SectionNumber number="01" label={cs.overview} />
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{cs.overview}</h2>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.stats.map((stat, i) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} index={i} />
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

          {showProductStage && desktopShot && stageMobile ? (
            <div className="mt-14">
              <ProductStage
                desktop={desktopShot}
                mobile={stageMobile}
                eyebrow={cs.productStage.eyebrow}
                title={cs.productStage.title}
                detail={cs.productStage.detail}
              />
            </div>
          ) : null}

          <Reveal className="mt-12">
            <h3 className="font-display text-2xl text-ink">{cs.role}</h3>
            <ul className="mt-4 max-w-3xl space-y-4 pl-0">
              {content.constraints.map((item, i) => (
                <motion.li
                  key={item.slice(0, 40)}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease }}
                >
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <LabeledLine text={item} />
                </motion.li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <h3 className="font-display text-2xl text-ink">{cs.goals}</h3>
            <ul className="mt-4 max-w-3xl space-y-4 pl-0">
              {content.goals.map((item, i) => (
                <motion.li
                  key={item.slice(0, 40)}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease }}
                >
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <LabeledLine text={item} />
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Flow */}
        <section className="mt-20">
          <SectionNumber number="02" label={cs.flow} />
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{cs.flow}</h2>
          </Reveal>
          <FlowTimeline steps={content.flow} />
          {shots?.length ? (
            <div className="mt-12">
              <Reveal>
                <h3 className="font-display text-2xl text-ink">{cs.screens}</h3>
              </Reveal>
              <div className="mt-6">
                <ScreenshotGallery shots={shots} labels={cs.gallery} />
              </div>
            </div>
          ) : (
            <motion.div
              className="mt-10 flex justify-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <DevicePreview variant={variant} />
            </motion.div>
          )}
        </section>

        {/* Decisions */}
        <section id="decisions" className="mt-20 scroll-mt-32">
          <SectionNumber number="03" label={cs.decisions} />
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{cs.decisions}</h2>
          </Reveal>
          <div className="mt-8 flex flex-col gap-4 sm:gap-6">
            {content.decisions.map((d, index) => (
              <DecisionCard key={d.title ?? d.problem} d={d} cs={cs} index={index} />
            ))}
          </div>
        </section>

        {/* Technical */}
        <section id="technical" className="mt-20 scroll-mt-32">
          <SectionNumber number="04" label={cs.technical} />
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{cs.technical}</h2>
          </Reveal>
          <Reveal className="mt-8">
            <ArchitectureDiagram
              variant={content.slug === "tennis-match" ? "tennis" : "preferito"}
              locale={locale}
              caption={
                content.slug === "tennis-match"
                  ? cs.tennisCaption
                  : cs.preferitoCaption
              }
            />
          </Reveal>
          <ul className="mt-6 max-w-3xl space-y-4 pl-0">
            {content.technicalNotes.map((note, i) => (
              <motion.li
                key={note.slice(0, 40)}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <LabeledLine text={note} />
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Outcome */}
        <section id="outcome" className="mt-20 scroll-mt-32">
          <SectionNumber number="05" label={cs.hardParts} />
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{cs.hardParts}</h2>
            <ul className="mt-4 max-w-3xl space-y-4 pl-0">
              {content.hardParts.map((item, i) => (
                <motion.li
                  key={item.slice(0, 40)}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease }}
                >
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <LabeledLine text={item} />
                </motion.li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{cs.outcome}</h2>
            <ul className="mt-4 max-w-3xl space-y-4 pl-0">
              {content.outcome.map((item, i) => (
                <motion.li
                  key={item.slice(0, 40)}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease }}
                >
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <LabeledLine text={item} />
                </motion.li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{cs.next}</h2>
            <ul className="mt-4 max-w-3xl space-y-4 pl-0">
              {content.next.map((item, i) => (
                <motion.li
                  key={item.slice(0, 40)}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease }}
                >
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <LabeledLine text={item} />
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Next project */}
        <section className="mt-20 border-t border-line pt-16">
          <motion.p
            className="text-sm uppercase tracking-wider text-muted"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease }}
          >
            {cs.nextProject}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <Link
              href={localePath(locale, `work/${content.nextProjectSlug}`)}
              className="group mt-4 block font-display text-4xl text-accent transition-colors hover:text-ink sm:text-5xl"
            >
              <motion.span
                className="inline-flex items-center gap-4"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3, ease }}
              >
                {nextTitle}
                <motion.span
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>
        </section>
      </Container>
    </>
  );
}
