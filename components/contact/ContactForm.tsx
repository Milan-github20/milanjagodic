"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/content/site";
import { Container } from "@/components/layout/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionNumber } from "@/components/ui/SectionNumber";

const ease = [0.22, 1, 0.36, 1] as const;

function SplitChars({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-block pb-2 ${className}`} aria-label={text}>
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

function AnimatedField({
  label,
  name,
  type = "text",
  required = false,
  rows,
  delay = 0,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  rows?: number;
  delay?: number;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.label
      className="flex flex-col gap-2 text-sm"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease }}
    >
      <motion.span
        className="font-medium transition-colors duration-200"
        animate={{ color: focused ? "var(--accent)" : "var(--muted)" }}
      >
        {label}
      </motion.span>
      <div className="relative">
        {rows ? (
          <textarea
            required={required}
            name={name}
            rows={rows}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2 text-ink outline-none transition-colors duration-200 focus:border-accent resize-none"
          />
        ) : (
          <input
            required={required}
            type={type}
            name={name}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="h-11 w-full rounded-lg border border-line bg-surface-raised px-3 text-ink outline-none transition-colors duration-200 focus:border-accent"
          />
        )}
        {/* Animated focus underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-accent origin-left"
          style={{ right: 0, borderRadius: "0 0 8px 8px" }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.3, ease }}
        />
      </div>
    </motion.label>
  );
}

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 flex max-w-lg flex-col gap-5 rounded-2xl border border-line bg-surface p-4 sm:p-8 relative overflow-hidden"
    >
      {/* Corner accent */}
      <motion.div
        className="pointer-events-none absolute top-0 right-0 h-24 w-24 opacity-60"
        style={{
          background: "radial-gradient(circle at top right, rgba(194,58,18,0.08), transparent 70%)",
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <AnimatedField label={dict.contact.name} name="name" required delay={0.1} />
      <AnimatedField label={dict.contact.email} name="email" type="email" required delay={0.18} />
      <AnimatedField label={dict.contact.message} name="message" required rows={5} delay={0.26} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.36, ease }}
      >
        <MagneticButton className="w-full">
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full inline-flex h-11 items-center justify-center bg-accent px-5 text-sm font-medium text-canvas disabled:opacity-60 transition-colors hover:bg-ink"
          >
            <AnimatePresence mode="wait">
              {status === "sending" ? (
                <motion.span
                  key="sending"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {dict.contact.sending}
                </motion.span>
              ) : (
                <motion.span
                  key="send"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {dict.contact.send}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </MagneticButton>
      </motion.div>

      <AnimatePresence>
        {status === "success" && (
          <motion.p
            className="text-sm text-accent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {dict.contact.success}
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            className="text-sm text-accent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {dict.contact.error}{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
          </motion.p>
        )}
      </AnimatePresence>

      <motion.p
        className="text-xs leading-5 text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        {dict.contact.privacy}
      </motion.p>
    </form>
  );
}

export function ContactPageContent({ dict }: { dict: Dictionary }) {
  return (
    <>
      {/* Hero header */}
      <div className="hero-glow cinematic-grid border-b border-line overflow-hidden">
        <Container className="py-12 sm:py-20 lg:py-24">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <span className="font-display text-sm italic text-accent">01</span>
            <motion.span
              className="h-px w-10 bg-accent/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease }}
              style={{ originX: 0 }}
            />
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
              {dict.contact.kicker}
            </span>
          </motion.div>

          <h1 className="font-display text-[2.35rem] tracking-tight text-ink sm:text-6xl lg:text-7xl overflow-hidden">
            <SplitChars text={dict.contact.title} delay={0.08} />
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-lg leading-8 text-muted"
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, delay: 0.45, ease }}
          >
            {dict.close.availability}
          </motion.p>
        </Container>
      </div>

      <Container className="flex flex-col gap-0 py-12 sm:py-16 lg:py-20">
        {/* Email direct link */}
        <section className="border-b border-line pb-16 mb-16">
          <SectionNumber number="02" label="Direct" />
          <motion.a
            href={`mailto:${site.email}`}
            className="group w-fit font-display text-xl italic text-accent hover:text-ink sm:text-3xl lg:text-5xl flex items-center gap-3 transition-colors break-all"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            whileHover={{ x: 8 }}
          >
            {site.email}
            <motion.span
              className="text-2xl"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.a>

          {/* Social links */}
          {(site.social.linkedin || site.social.github) && (
            <motion.div
              className="mt-8 flex flex-wrap gap-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25, ease }}
            >
              {site.social.linkedin ? (
                <motion.a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  LinkedIn
                </motion.a>
              ) : null}
              {site.social.github ? (
                <motion.a
                  href={site.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  GitHub
                </motion.a>
              ) : null}
            </motion.div>
          )}
        </section>

        {/* Form */}
        <section>
          <SectionNumber number="03" label={dict.contact.formNote} />
          <motion.p
            className="max-w-md text-sm leading-6 text-muted mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease }}
          >
            {dict.contact.formNote}
          </motion.p>
          <ContactForm dict={dict} />
        </section>
      </Container>
    </>
  );
}
