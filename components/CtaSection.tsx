"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export function CtaSection({
  location,
  availability,
  email,
  availableNow,
  whatIOffer,
  offerItems,
  findMe,
  navigate,
  socialLinks,
  quickLinks,
}: {
  location: string;
  availability: string;
  email: string;
  availableNow: string;
  whatIOffer: string;
  offerItems: string[];
  findMe: string;
  navigate: string;
  socialLinks: { label: string; href: string | null }[];
  quickLinks: { label: string; href: string }[];
}) {
  return (
    <section className="border-t border-line bg-surface overflow-hidden relative">
      {/* Background orbs — static on mobile, animated on desktop */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(circle, rgba(194,58,18,0.09) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, rgba(194,58,18,0.06) 0%, transparent 70%)" }}
      />

      <Container className="relative py-14 sm:py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-20">

          {/* Left — main CTA */}
          <div className="flex flex-col gap-8">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="font-display text-sm italic text-accent">04</span>
                <motion.span
                  className="inline-block h-px w-8 bg-accent/40"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease }}
                  style={{ originX: 0 }}
                />
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                  {location}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl lg:text-[3.5rem]">
                {availability}
              </p>
            </Reveal>

            {/* Divider */}
            <motion.div
              className="h-px bg-line origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
            />

            <Reveal delay={0.18}>
              <motion.a
                href={`mailto:${email}`}
                className="group w-fit flex items-center gap-2 font-display text-lg italic text-accent sm:text-2xl lg:text-3xl break-all"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3, ease }}
              >
                <span className="underline decoration-accent/30 underline-offset-4 transition-all duration-300 group-hover:decoration-accent/80">
                  {email}
                </span>
                <motion.span
                  className="text-xl not-italic"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </motion.a>
            </Reveal>

            {/* Status */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.span
                className="inline-block h-2 w-2 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-sm text-muted">{availableNow}</span>
            </motion.div>
          </div>

          {/* Right — info grid */}
          <div className="flex flex-col gap-10 lg:pt-2">

            {/* What I do */}
            <Reveal delay={0.1}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-4">
                {whatIOffer}
              </p>
              <ul className="flex flex-col gap-3">
                {offerItems.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-3 text-sm text-muted"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease }}
                  >
                    <span className="h-px w-4 shrink-0 bg-accent/50" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Reveal>

            {/* Social links */}
            <Reveal delay={0.2}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-4">
                {findMe}
              </p>
              <div className="flex flex-col gap-2">
                {socialLinks.filter(l => l.href).map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href!}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 text-sm text-muted hover:text-ink transition-colors w-fit"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.07, ease }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="h-px w-4 shrink-0 bg-line group-hover:bg-accent transition-colors" />
                    {link.label}
                    <span className="text-xs text-muted/40 group-hover:text-accent transition-colors">↗</span>
                  </motion.a>
                ))}
              </div>
            </Reveal>

            {/* Quick nav */}
            <Reveal delay={0.28}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-4">
                {navigate}
              </p>
              <div className="flex flex-col gap-2">
                {quickLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.28 + i * 0.06, ease }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center gap-3 text-sm text-muted hover:text-ink transition-colors w-fit"
                    >
                      <motion.span
                        className="h-px w-4 shrink-0 bg-line group-hover:bg-accent transition-colors"
                      />
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </Reveal>

          </div>
        </div>
      </Container>
    </section>
  );
}
