"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import type { CaseStudyContent } from "@/lib/case-studies";
import type { Dictionary } from "@/lib/dictionaries";
import type { Screenshot } from "@/lib/screenshots";
import { site } from "@/lib/site";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Container } from "./Container";
import { DevicePreview } from "./DevicePreview";
import { Reveal } from "./Reveal";
import { ScreenshotGallery } from "./ScreenshotGallery";
import { SectionNumber } from "./SectionNumber";
import { MagneticButton } from "./MagneticButton";

type CaseStudyLayoutProps = {
  locale: Locale;
  dict: Dictionary;
  content: CaseStudyContent;
  variant: "list" | "calendar";
  shots?: Screenshot[];
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

function DecisionCard({ d, cs, index }: { d: { problem: string; options: string; choice: string; why: string }; cs: Dictionary["caseStudy"]; index: number }) {
  return (
    <motion.div
      className="rounded-xl border border-line bg-surface p-6 sm:p-8 relative overflow-hidden group"
      initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease }}
      whileHover={{
        borderColor: "rgba(194,58,18,0.25)",
        boxShadow: "0 8px 40px rgba(194,58,18,0.07)",
      }}
    >
      {/* Number label */}
      <motion.span
        className="absolute top-4 right-6 font-display text-5xl italic text-accent/10 select-none pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 + 0.2 }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <p className="text-xs uppercase tracking-wider text-accent">{cs.problem}</p>
      <p className="mt-2 text-lg text-ink">{d.problem}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
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
            <p className="mt-1 text-sm text-muted">{value}</p>
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
}: CaseStudyLayoutProps) {
  const cs = dict.caseStudy;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const nextTitle =
    content.nextProjectSlug === "tennis-match"
      ? site.tennisMatch.title
      : site.preferito.title;

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="hero-glow cinematic-grid relative overflow-hidden border-b border-line">
        <Container className="relative py-12 sm:py-20 lg:py-32">
          <motion.div style={{ y: yText, opacity }}>
            <motion.p
              className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-accent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <motion.span
                className="inline-block h-px w-8 bg-accent origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.1, ease }}
              />
              {content.role} · {content.year}
            </motion.p>

            <h1 className="mt-5 font-display text-4xl tracking-tight text-ink sm:text-6xl lg:text-8xl">
              <SplitTitle text={content.title} delay={0.1} />
            </h1>

            <motion.p
              className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl"
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.65, delay: 0.4, ease }}
            >
              {content.hook}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              {content.stack.map((item, i) => (
                <motion.span
                  key={item}
                  className="rounded-full border border-line px-3 py-1 text-xs text-muted"
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
              className="mt-10 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65, ease }}
            >
              <MagneticButton>
                <a
                  href={content.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center bg-accent px-5 text-sm font-medium text-canvas hover:bg-ink transition-colors"
                >
                  {cs.live}
                </a>
              </MagneticButton>
              {content.demoUrl ? (
                <MagneticButton>
                  <a
                    href={content.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center border border-line px-5 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors"
                  >
                    {cs.tryDemo}
                  </a>
                </MagneticButton>
              ) : content.demoOnRequest ? (
                <MagneticButton>
                  <Link
                    href={localePath(locale, "contact")}
                    className="inline-flex h-11 items-center border border-line px-5 text-sm font-medium text-muted hover:border-accent hover:text-accent transition-colors"
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
        className="sticky top-16 z-30 border-b border-line bg-canvas/90 backdrop-blur-md overflow-hidden"
      >
        <motion.div
          className="h-px bg-accent/20 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        />
        <Container className="flex gap-6 overflow-x-auto py-3 text-sm">
          {navIds.map((id, i) => (
            <motion.a
              key={id}
              href={`#${id}`}
              className="shrink-0 text-muted transition-colors hover:text-accent relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease }}
            >
              {cs.nav[id]}
            </motion.a>
          ))}
        </Container>
      </nav>

      <Container className="py-16 sm:py-20">
        {/* Overview */}
        <section id="overview" className="scroll-mt-28">
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

          <Reveal className="mt-12">
            <h3 className="font-display text-2xl text-ink">{cs.role}</h3>
            <ul className="mt-4 max-w-3xl space-y-2 pl-0 text-muted">
              {content.constraints.map((item, i) => (
                <motion.li
                  key={item.slice(0, 40)}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease }}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <h3 className="font-display text-2xl text-ink">{cs.goals}</h3>
            <ul className="mt-4 max-w-3xl space-y-2 pl-0 text-muted">
              {content.goals.map((item, i) => (
                <motion.li
                  key={item.slice(0, 40)}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease }}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
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
          <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
            {content.flow.map((step, index) => (
              <motion.div
                key={step.title}
                className="min-w-[220px] shrink-0 rounded-xl border border-line bg-surface p-5 sm:min-w-[240px] cursor-default relative overflow-hidden group"
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.06, ease }}
                whileHover={{ borderColor: "rgba(194,58,18,0.3)", y: -4 }}
              >
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-accent origin-left scale-x-0 group-hover:scale-x-100"
                  style={{ right: 0 }}
                  transition={{ duration: 0.4, ease }}
                />
                <span className="font-display text-3xl italic text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-medium text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
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
        <section id="decisions" className="mt-20 scroll-mt-28">
          <SectionNumber number="03" label={cs.decisions} />
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{cs.decisions}</h2>
          </Reveal>
          <div className="mt-8 flex flex-col gap-4 sm:gap-6">
            {content.decisions.map((d, index) => (
              <DecisionCard key={d.problem} d={d} cs={cs} index={index} />
            ))}
          </div>
        </section>

        {/* Technical */}
        <section id="technical" className="mt-20 scroll-mt-28">
          <SectionNumber number="04" label={cs.technical} />
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{cs.technical}</h2>
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
          <ul className="mt-6 max-w-3xl space-y-2 pl-0 text-muted">
            {content.technicalNotes.map((note, i) => (
              <motion.li
                key={note.slice(0, 40)}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {note}
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Outcome */}
        <section id="outcome" className="mt-20 scroll-mt-28">
          <SectionNumber number="05" label={cs.hardParts} />
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{cs.hardParts}</h2>
            <ul className="mt-4 max-w-3xl space-y-2 pl-0 text-muted">
              {content.hardParts.map((item, i) => (
                <motion.li
                  key={item.slice(0, 40)}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease }}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{cs.outcome}</h2>
            <div className="mt-4 max-w-3xl space-y-4 text-muted">
              {content.outcome.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{cs.next}</h2>
            <ul className="mt-4 max-w-3xl space-y-2 pl-0 text-muted">
              {content.next.map((item, i) => (
                <motion.li
                  key={item.slice(0, 40)}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease }}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
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
