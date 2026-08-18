"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

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
    <Reveal>
      <form
        onSubmit={onSubmit}
        className="mt-10 flex max-w-lg flex-col gap-4 rounded-2xl border border-line bg-surface p-6 sm:p-8"
      >
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-muted">{dict.contact.name}</span>
          <input
            required
            name="name"
            className="h-11 rounded-lg border border-line bg-surface-raised px-3 text-ink outline-none focus:border-accent"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-muted">{dict.contact.email}</span>
          <input
            required
            type="email"
            name="email"
            className="h-11 rounded-lg border border-line bg-surface-raised px-3 text-ink outline-none focus:border-accent"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-muted">{dict.contact.message}</span>
          <textarea
            required
            name="message"
            rows={5}
            className="rounded-lg border border-line bg-surface-raised px-3 py-2 text-ink outline-none focus:border-accent"
          />
        </label>
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-2 inline-flex h-11 items-center justify-center bg-accent px-5 text-sm font-medium text-canvas disabled:opacity-60"
        >
          {status === "sending" ? dict.contact.sending : dict.contact.send}
        </button>
        {status === "success" && (
          <p className="text-sm text-accent">{dict.contact.success}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-accent">
            {dict.contact.error}{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
          </p>
        )}
        <p className="text-xs leading-5 text-muted">{dict.contact.privacy}</p>
      </form>
    </Reveal>
  );
}

export function ContactPageContent({ dict }: { dict: Dictionary }) {
  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-24">
      <header className="flex max-w-2xl flex-col gap-6">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
          {dict.contact.kicker}
        </p>
        <h1 className="font-display text-5xl tracking-tight text-ink sm:text-7xl">
          {dict.contact.title}
        </h1>
        <p className="text-lg leading-8 text-muted">{dict.close.availability}</p>
      </header>

      <a
        href={`mailto:${site.email}`}
        className="w-fit font-display text-3xl italic text-accent hover:text-ink sm:text-5xl"
      >
        {site.email}
      </a>

      {(site.social.linkedin || site.social.github) && (
        <p className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {site.social.linkedin ? (
            <a
              href={site.social.linkedin}
              className="text-muted transition hover:text-accent"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          ) : null}
          {site.social.github ? (
            <a
              href={site.social.github}
              className="text-muted transition hover:text-accent"
              rel="noreferrer"
            >
              GitHub
            </a>
          ) : null}
        </p>
      )}

      <p className="max-w-md text-sm leading-6 text-muted">
        {dict.contact.formNote}
      </p>

      <ContactForm dict={dict} />
    </Container>
  );
}
