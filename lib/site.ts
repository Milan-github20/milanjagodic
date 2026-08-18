export const site = {
  name: "Milan Jagodić",
  role: "Full-stack Developer",
  location: "Bosnia and Herzegovina",
  email: "jagodicm2002@gmail.com",
  availability:
    "Available for full-time and selected freelance, remote from BiH — now",
  positioning:
    "Full-stack developer who ships products people actually use — from idea to production.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://milanjagodic.vercel.app",
  social: {
    github: "https://github.com/Milan-github20",
    linkedin: "https://www.linkedin.com/in/milan-jagodić-83b9ba204/",
    cv: null as string | null,
  },
  tennisMatch: {
    slug: "tennis-match",
    url: "https://tennismatch.ba",
    title: "Tennis Match",
    year: 2026,
  },
  preferito: {
    slug: "preferito",
    url: "https://preferito.vercel.app",
    title: "Preferito",
    year: 2026,
  },
} as const;

export const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressCountry: "BA",
  },
  description: site.positioning,
  sameAs: [
    "https://www.linkedin.com/in/milan-jagodić-83b9ba204/",
    "https://github.com/Milan-github20",
  ],
};
