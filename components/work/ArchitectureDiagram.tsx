"use client";

import { motion } from "motion/react";
import type { Locale } from "@/lib/i18n";

const ease = [0.22, 1, 0.36, 1] as const;

const copy = {
  sr: {
    layers: [
      {
        number: "01",
        eyebrow: "Klijent",
        title: "Next.js Frontend",
        detail: "App Router · TypeScript · Tailwind",
        badge: "Vercel",
      },
      {
        number: "02",
        eyebrow: "Podaci i platforma",
        title: "Supabase",
        detail: "Auth, baza i realtime u jednom sloju",
        modules: [
          { title: "Supabase Auth", desc: "Prijava i sesije" },
          { title: "Postgres + RLS", desc: "Podaci i pristup" },
          { title: "Realtime Engine", desc: "Izazovi i poruke" },
        ],
      },
      {
        number: "03",
        eyebrow: "Rangiranje",
        title: "ELO funkcija na serveru",
        detail: "Nakon meča automatski ažurira ELO bodove",
        badge: "Na serveru",
      },
    ],
  },
  en: {
    layers: [
      {
        number: "01",
        eyebrow: "Client",
        title: "Next.js Frontend",
        detail: "App Router · TypeScript · Tailwind",
        badge: "Vercel",
      },
      {
        number: "02",
        eyebrow: "Data platform",
        title: "Supabase",
        detail: "Auth, database, and realtime in one layer",
        modules: [
          { title: "Supabase Auth", desc: "Login & sessions" },
          { title: "Postgres + RLS", desc: "Data & access" },
          { title: "Realtime Engine", desc: "Challenges & chat" },
        ],
      },
      {
        number: "03",
        eyebrow: "Ranking",
        title: "ELO server function",
        detail: "Automatically updates ELO ratings after each match",
        badge: "On the server",
      },
    ],
  },
} as const;

export function ArchitectureDiagram({
  variant,
  caption,
  locale = "en",
}: {
  variant: "tennis" | "preferito";
  caption: string;
  locale?: Locale;
}) {
  if (variant === "preferito") {
    return <PreferitoDiagram caption={caption} />;
  }

  const layers = (copy[locale] ?? copy.en).layers;
  const pills = caption.split("·").map((part) => part.trim()).filter(Boolean);

  return (
    <div className="w-full" role="img" aria-label="Tennis Match architecture">
      <div className="relative">
        {/* Vertical rail */}
        <div
          className="pointer-events-none absolute top-3 bottom-3 left-[1.15rem] w-px bg-line sm:left-[1.35rem]"
          aria-hidden
        >
          <motion.div
            className="h-full w-full origin-top bg-accent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease }}
          />
        </div>

        <div className="flex flex-col gap-5 sm:gap-6">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.number}
              className="relative grid grid-cols-[2.5rem_1fr] gap-3 sm:grid-cols-[3rem_1fr] sm:gap-5"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease }}
            >
              <div className="relative flex justify-center pt-5">
                <span className="relative z-[1] flex size-5 items-center justify-center rounded-full border-2 border-accent bg-canvas sm:size-6">
                  <span className="size-2 rounded-full bg-accent" />
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-line bg-surface-raised">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line px-4 py-3.5 sm:px-5">
                  <div>
                    <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
                      <span className="font-display text-sm italic normal-case tracking-normal">
                        {layer.number}
                      </span>
                      {layer.eyebrow}
                    </p>
                    <h3 className="mt-1 font-display text-xl tracking-tight text-ink sm:text-2xl">
                      {layer.title}
                    </h3>
                    <p className="mt-1 max-w-xl text-xs leading-5 text-muted sm:text-sm sm:leading-6">
                      {layer.detail}
                    </p>
                  </div>
                  {"badge" in layer && layer.badge ? (
                    <span className="rounded-full border border-line bg-canvas px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                      {layer.badge}
                    </span>
                  ) : null}
                </div>

                {"modules" in layer && layer.modules ? (
                  <div className="grid gap-px bg-line sm:grid-cols-3">
                    {layer.modules.map((mod) => (
                      <div
                        key={mod.title}
                        className="bg-surface-raised px-4 py-3.5 sm:px-5"
                      >
                        <p className="text-sm font-medium text-ink">{mod.title}</p>
                        <p className="mt-0.5 text-xs text-muted">{mod.desc}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {pills.length ? (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-line bg-canvas px-3 py-1.5 text-[11px] text-muted"
            >
              {pill}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-center text-xs text-muted">{caption}</p>
      )}
    </div>
  );
}

function PreferitoDiagram({ caption }: { caption: string }) {
  return (
    <svg
      viewBox="0 0 720 200"
      className="w-full text-ink"
      aria-label="Preferito architecture diagram"
      role="img"
    >
      <defs>
        <marker
          id="arrow-p"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" className="text-muted" />
        </marker>
      </defs>
      {[
        { x: 20, label: "React SPA" },
        { x: 170, label: "Auth" },
        { x: 320, label: "Postgres + RLS" },
        { x: 490, label: "RPC / triggers" },
        { x: 620, label: "Vercel" },
      ].map((node, i, arr) => (
        <g key={node.label}>
          <rect
            x={node.x}
            y="70"
            width="120"
            height="60"
            rx="8"
            fill="none"
            stroke="currentColor"
            className="text-line"
          />
          <text
            x={node.x + 60}
            y="105"
            textAnchor="middle"
            className="fill-ink text-[11px]"
          >
            {node.label}
          </text>
          {i < arr.length - 1 && (
            <line
              x1={node.x + 120}
              y1="100"
              x2={arr[i + 1].x}
              y2="100"
              stroke="currentColor"
              className="text-muted"
              markerEnd="url(#arrow-p)"
            />
          )}
        </g>
      ))}
      <text x="360" y="175" textAnchor="middle" className="fill-muted text-[10px]">
        {caption}
      </text>
    </svg>
  );
}
