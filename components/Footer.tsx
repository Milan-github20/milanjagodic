"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { Container } from "./Container";

function PlaceholderLink({ label, title }: { label: string; title: string }) {
  return (
    <span className="cursor-default text-muted/50" title={title}>
      {label}
    </span>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const links = [
    site.social.github ? { href: site.social.github, label: "GitHub", external: true } : null,
    site.social.linkedin ? { href: site.social.linkedin, label: "LinkedIn", external: true } : null,
    { href: localePath(locale, "cv"), label: "CV", external: false },
  ].filter(Boolean) as { href: string; label: string; external: boolean }[];

  return (
    <footer className="mt-auto border-t border-line bg-surface print:hidden overflow-hidden">
        <Container className="flex flex-row items-center justify-center gap-8 py-6 text-sm">
        <motion.a
          href={`mailto:${site.email}`}
          className="shrink-0 text-muted transition-colors hover:text-accent"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          whileHover={{ x: 4 }}
        >
          {site.email}
        </motion.a>
        <div className="flex items-center gap-x-5">
          {links.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07, ease }}
            >
              {link.external ? (
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="relative text-muted transition-colors hover:text-accent after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </motion.a>
              ) : (
                <Link
                  href={link.href}
                  className="relative text-muted transition-colors hover:text-accent after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              )}
            </motion.div>
          ))}
          {!site.social.linkedin && (
            <PlaceholderLink
              label={dict.footer.linkedinSoon}
              title={dict.footer.urlSoon}
            />
          )}
        </div>
      </Container>
    </footer>
  );
}
