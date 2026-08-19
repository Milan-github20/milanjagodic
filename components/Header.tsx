"use client";

import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import type { Dictionary } from "@/lib/dictionaries";
import { Container } from "./Container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "motion/react";

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Header({ locale, dict }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = [
    { href: localePath(locale, "#work"), label: dict.nav.work },
    { href: localePath(locale, "about"), label: dict.nav.about },
    { href: localePath(locale, "contact"), label: dict.nav.contact },
    { href: localePath(locale, "cv"), label: dict.nav.cv },
  ] as const;

  const { scrollY, scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <header className="sticky top-0 z-40 h-14 print:hidden">
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-accent z-10"
        style={{ scaleX }}
      />

      {/* Background fades in on scroll */}
      <motion.div
        className="absolute inset-0 bg-canvas backdrop-blur-xl border-b border-line"
        style={{ opacity: bgOpacity }}
      />

      <Container className="relative flex h-full items-center justify-between gap-4">

        {/* Logo */}
        <Link href={localePath(locale)} className="group shrink-0" onClick={() => setMenuOpen(false)}>
          <motion.div
            className="flex items-center gap-2.5"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            <motion.div
              className="flex h-7 w-7 items-center justify-center border border-accent/50 group-hover:border-accent group-hover:bg-accent transition-all duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-display text-xs italic text-accent group-hover:text-canvas transition-colors duration-200 leading-none">
                MJ
              </span>
            </motion.div>
            <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-muted group-hover:text-ink transition-colors duration-200 sm:block">
              {site.name}
            </span>
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <nav aria-label={dict.nav.primary} className="hidden md:flex items-center gap-1">
          {nav.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.35, ease }}
            >
              <Link
                href={item.href}
                className="relative px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          <div className="mx-2 h-4 w-px bg-line/50" />
          <ThemeToggle dict={dict} />
          <div className="ml-1">
            <LocaleSwitcher locale={locale} />
          </div>
        </nav>

        {/* Mobile right side */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle dict={dict} />
          <LocaleSwitcher locale={locale} />
          {/* Hamburger / X — fixed size, no extra padding */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="relative flex h-6 w-6 flex-col items-center justify-center"
          >
            <motion.span
              className="absolute block h-px w-5 bg-ink origin-center"
              animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.22, ease }}
            />
            <motion.span
              className="absolute block h-px bg-ink origin-center"
              animate={menuOpen ? { width: 0, opacity: 0 } : { width: 20, opacity: 1 }}
              transition={{ duration: 0.15, ease }}
            />
            <motion.span
              className="absolute block h-px w-5 bg-ink origin-center"
              animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.22, ease }}
            />
          </button>
        </div>

      </Container>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute left-0 right-0 top-full z-50 border-b border-line bg-canvas md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease }}
          >
            <Container className="flex flex-col py-4">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25, ease }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4 border-b border-line/40 py-4 text-xs font-medium uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink last:border-0"
                  >
                    <span className="font-display text-xs italic text-accent/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
