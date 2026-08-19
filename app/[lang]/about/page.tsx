"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionNumber } from "@/components/SectionNumber";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

function SplitChars({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span aria-label={text} className="inline-block pb-2">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.03, ease }}
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang as Locale);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yHeader = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      {/* Hero — full width */}
      <section ref={heroRef} className="hero-glow cinematic-grid relative overflow-hidden border-b border-line">
        <Container className="py-12 sm:py-20 lg:py-28">
          <motion.div style={{ y: yHeader, opacity }}>
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <span className="font-display text-sm italic text-accent">01</span>
              <motion.span
                className="inline-block h-px w-10 bg-accent/40"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.1, ease }}
                style={{ originX: 0 }}
              />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                {dict.about.kicker}
              </span>
            </motion.div>

            <h1 className="mt-5 font-display text-4xl tracking-tight text-ink sm:text-6xl lg:text-8xl">
              <SplitChars text={site.name} delay={0.08} />
            </h1>

            <motion.p
              className="mt-6 max-w-xl text-lg leading-8 text-muted"
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.45, ease }}
            >
              {dict.about.who.p1}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Who */}
      <section className="border-b border-line">
        <Container className="py-16 sm:py-20">
          <SectionNumber number="02" label={dict.about.who.title} />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal className="flex flex-col gap-6 text-lg leading-8 text-muted">
              <h2 className="font-display text-3xl text-ink">{dict.about.who.title}</h2>
              <p>{dict.about.who.p1}</p>
              <p>{dict.about.who.p2}</p>
            </Reveal>

            <Reveal delay={0.06}>
              <motion.div
                className="aspect-[4/5] rounded-2xl border border-line bg-surface-raised overflow-hidden relative group cursor-default"
                whileHover={{ borderColor: "rgba(194,58,18,0.3)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent origin-top"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease }}
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="h-32 w-32 rounded-full blur-2xl" style={{ background: "var(--accent-soft)" }} />
                </motion.div>
                <p className="relative z-10 p-5 text-sm text-muted">{dict.about.photoSoon}</p>
              </motion.div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How */}
      <section className="border-b border-line bg-surface">
        <Container className="py-16 sm:py-20">
          <SectionNumber number="03" label={dict.about.how.title} />
          <Reveal className="flex max-w-2xl flex-col gap-6">
            <h2 className="font-display text-4xl tracking-tight text-ink">{dict.about.how.title}</h2>
            <p className="text-lg leading-8 text-muted">{dict.about.how.p}</p>
          </Reveal>
        </Container>
      </section>

      {/* Stack */}
      <section className="border-b border-line">
        <Container className="py-16 sm:py-20">
          <SectionNumber number="04" label={dict.about.stack.title} />
          <Reveal className="flex flex-col gap-8">
            <h2 className="font-display text-4xl tracking-tight text-ink">{dict.about.stack.title}</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {(
                [
                  ["Tennis Match", dict.stack.tennisMatch],
                  ["Preferito", dict.stack.preferito],
                ] as const
              ).map(([label, stack], cardIdx) => (
                <motion.dl
                  key={label}
                  className="group grid gap-4 rounded-xl border border-line bg-surface p-5 overflow-hidden relative"
                  initial={{ opacity: 0, x: cardIdx === 0 ? -24 : 24, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease }}
                  whileHover={{ borderColor: "rgba(194,58,18,0.3)", boxShadow: "0 8px 40px rgba(194,58,18,0.08)" }}
                >
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent origin-top scale-y-0 group-hover:scale-y-100"
                    transition={{ duration: 0.4, ease }}
                  />
                  <dt className="font-display text-xl text-ink">{label}</dt>
                  {(Object.entries(dict.stack.groups) as [keyof typeof dict.stack.groups, string][]).map(([key, groupLabel], i) => (
                    <motion.div
                      key={key}
                      className="border-l-2 border-accent pl-4"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.07, ease }}
                    >
                      <dt className="text-xs uppercase tracking-wider text-muted">{groupLabel}</dt>
                      <dd className="mt-1 leading-7 text-muted">{stack[key]}</dd>
                    </motion.div>
                  ))}
                </motion.dl>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Looking for */}
      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <SectionNumber number="05" label={dict.about.looking.title} />
          <Reveal className="flex max-w-2xl flex-col gap-6">
            <h2 className="font-display text-4xl tracking-tight text-ink">{dict.about.looking.title}</h2>
            <p className="text-lg leading-8 text-muted">{dict.about.looking.p}</p>
            <p className="text-lg leading-8 text-muted/80">{dict.about.looking.tennis}</p>
            <motion.a
              href={localePath(lang as Locale, "cv")}
              className="w-fit inline-flex items-center gap-2 text-sm text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-all"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              {dict.about.looking.cvLabel}
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.a>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
