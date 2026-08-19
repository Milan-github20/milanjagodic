import type { Locale } from "./i18n";
import { site } from "./site";

export type CvJob = {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  bullets: string[];
};

export type CvProject = {
  name: string;
  role: string;
  year: string;
  url: string;
  summary: string;
  bullets: string[];
};

export type CvSchool = {
  school: string;
  program: string;
  start: string;
  end: string;
};

export type CvContent = {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  website: string;
  summary: string;
  experience: CvJob[];
  projects: CvProject[];
  education: CvSchool[];
  skills: string[];
  languages: { name: string; level: string }[];
};

const en: CvContent = {
  name: site.name,
  title: site.role,
  location: site.location,
  email: site.email,
  phone: "",
  github: site.social.github ?? "",
  linkedin: site.social.linkedin ?? "",
  website: "",
  summary:
    "I design and ship web products end to end - from the first user problem to a live app with login, data, and real workflows. Currently based in Bosnia and Herzegovina.",
  experience: [
    {
      company: "Računari d.o.o.",
      role: "Frontend Developer",
      start: "Mar 2022",
      end: "Present",
      location: "Bosnia and Herzegovina",
      bullets: [
        "Working as a frontend developer, primarily using React.js, HTML, CSS, and JavaScript.",
        "Collaborate with backend developers to build responsive, user-friendly web applications.",
        "Keep improving how the apps look, feel, and perform as they are used.",
      ],
    },
  ],
  projects: [
    {
      name: "Tennis Match",
      role: "Product, design, full-stack — solo",
      year: "2026",
      url: "https://tennismatch.ba",
      summary:
        "Live recreational tennis matchmaking for Bosnia and Herzegovina.",
      bullets: [
        "Players find someone at their level, send a challenge, agree time and venue, confirm the result, and track ELO.",
        "Auth, Postgres with RLS, realtime chat after a challenge is accepted, server-side ELO, fair-play confirmation.",
        "Shipped to production; still in active development. Try demo on tennismatch.ba.",
      ],
    },
    {
      name: "Preferito",
      role: "Design + full-stack — client work",
      year: "2026",
      url: "https://preferito.vercel.app",
      summary:
        "Scheduling and client management for a salon in daily use.",
      bullets: [
        "Clients book themselves; the barber runs the calendar. Overlap is blocked in the database, not only in the UI.",
        "Roles, working hours, Saturday pending confirmation, no-show rules, busy-interval privacy for clients.",
        "Stack: React, Vite, TypeScript, Supabase, Tailwind — live as an SPA on Vercel.",
      ],
    },
  ],
  education: [
    {
      school: "Pan-European University Apeiron",
      program: "Programming and software engineering",
      start: "2021",
      end: "Present",
    },
  ],
  skills: [
    "TypeScript",
    "Next.js",
    "React",
    "Vite",
    "Supabase (Postgres, Auth, RLS, Realtime, Storage)",
    "Tailwind",
    "shadcn/ui",
    "Vercel",
  ],
  languages: [
    { name: "Serbian", level: "Native" },
    { name: "English", level: "Professional" },
  ],
};

const sr: CvContent = {
  name: site.name,
  title: "Full-stack developer",
  location: "Bosna i Hercegovina",
  email: site.email,
  phone: "",
  github: site.social.github ?? "",
  linkedin: site.social.linkedin ?? "",
  website: "",
  summary:
    "Dizajniram i isporučujem web proizvode od prve ideje do aplikacije u produkciji - sa prijavom, bazom i stvarnim tokovima rada. Radim iz Bosne i Hercegovine.",
  experience: [
    {
      company: "Računari d.o.o.",
      role: "Frontend developer",
      start: "mart 2022",
      end: "danas",
      location: "Bosna i Hercegovina",
      bullets: [
        "Radim kao frontend developer, uglavnom u React.js, HTML, CSS i JavaScriptu.",
        "Sarađujem sa backend developerima na web aplikacijama koje rade na telefonu i koje je lako koristiti.",
        "Dorađujem izgled, korišćenje i brzinu dok se aplikacije koriste.",
      ],
    },
  ],
  projects: [
    {
      name: "Tennis Match",
      role: "Proizvod, dizajn, full-stack — solo",
      year: "2026",
      url: "https://tennismatch.ba",
      summary:
        "Rekreativno spajanje tenisera u Bosni i Hercegovini, u produkciji.",
      bullets: [
        "Igrači pronađu nekoga svog nivoa, pošalju izazov, dogovore termin i teren, potvrde rezultat i prate ELO.",
        "Prijava, Postgres sa RLS-om, poruke uživo nakon prihvatanja izazova, ELO na serveru, fer potvrda rezultata.",
        "U produkciji; i dalje u aktivnom razvoju. Demo na tennismatch.ba.",
      ],
    },
    {
      name: "Preferito",
      role: "Dizajn + full-stack — klijentski rad",
      year: "2026",
      url: "https://preferito.vercel.app",
      summary:
        "Zakazivanje i upravljanje klijentima za salon u svakodnevnoj upotrebi.",
      bullets: [
        "Klijent sam zakazuje; frizer vodi kalendar. Preklapanje termina blokira baza, ne samo ekran.",
        "Uloge, radno vrijeme, subota na potvrdu, pravila za izostanak, klijent vidi samo zauzete intervale.",
        "React, Vite, TypeScript, Supabase, Tailwind — SPA na Vercelu, u produkciji.",
      ],
    },
  ],
  education: [
    {
      school: "Panevropski univerzitet Apeiron",
      program: "Programiranje i softversko inženjerstvo",
      start: "2021",
      end: "danas",
    },
  ],
  skills: [
    "TypeScript",
    "Next.js",
    "React",
    "Vite",
    "Supabase (Postgres, Auth, RLS, Realtime, Storage)",
    "Tailwind",
    "shadcn/ui",
    "Vercel",
  ],
  languages: [
    { name: "Srpski", level: "maternji" },
    { name: "Engleski", level: "profesionalni" },
  ],
};

export function getCv(locale: Locale): CvContent {
  return locale === "sr" ? sr : en;
}
