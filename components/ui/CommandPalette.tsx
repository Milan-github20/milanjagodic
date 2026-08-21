"use client";

import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { site } from "@/lib/content/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type CommandPaletteProps = {
  locale: Locale;
  dict: Dictionary;
};

export function CommandPalette({ locale, dict }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  async function copyEmail() {
    await navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!open) return null;

  const items = [
    { label: dict.cmdk.work, href: localePath(locale, "#work") },
    {
      label: dict.cmdk.tennisMatch,
      href: localePath(locale, "work/tennis-match"),
    },
    {
      label: dict.cmdk.preferito,
      href: localePath(locale, "work/preferito"),
    },
    { label: dict.cmdk.about, href: localePath(locale, "about") },
    { label: dict.cmdk.contact, href: localePath(locale, "contact") },
    { label: dict.cmdk.cv, href: localePath(locale, "cv") },
    ...(site.social.linkedin
      ? [{ label: dict.cmdk.linkedin, href: site.social.linkedin }]
      : []),
    ...(site.social.github
      ? [{ label: dict.cmdk.github, href: site.social.github }]
      : []),
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-canvas/80 px-4 pt-[15vh] backdrop-blur-sm"
      role="dialog"
      aria-modal
      aria-label={dict.cmdk.label}
      onClick={close}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface-raised shadow-[0_0_60px_var(--glow)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-line px-4 py-3">
          <p className="text-xs uppercase tracking-widest text-muted">
            ⌘K
          </p>
        </div>
        <ul className="max-h-80 overflow-y-auto py-2">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block px-4 py-2.5 text-sm text-ink transition hover:bg-accent-soft hover:text-accent"
                onClick={close}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="block w-full px-4 py-2.5 text-left text-sm text-ink transition hover:bg-accent-soft hover:text-accent"
              onClick={() => {
                void copyEmail();
              }}
            >
              {copied ? dict.cmdk.copied : dict.cmdk.copyEmail}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
