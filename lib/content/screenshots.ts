import type { Locale } from "@/lib/i18n";

export type Screenshot = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

const dimensions = { width: 471, height: 1024 };

export function getTennisMatchShots(locale: Locale): Screenshot[] {
  const sr = locale === "sr";

  return [
    {
      id: "landing",
      src: "/work/tennis-match/screenshots/01-landing.webp",
      ...dimensions,
      alt: sr
        ? "Landing stranica Tennis Matcha"
        : "Tennis Match landing page",
      caption: sr
        ? "Landing: Istraži platformu bez obaveza. Brza registracija i interaktivni demo za trenutni uvid u funkcionalnosti."
        : "Landing: Explore the platform with no commitment. Quick sign-up and an interactive demo for an instant look at the features.",
    },
    {
      id: "home",
      src: "/work/tennis-match/screenshots/02-home.webp",
      ...dimensions,
      alt: sr
        ? "Početni ekran sa rangom i nedavnim rezultatima"
        : "Home screen with rank and recent results",
      caption: sr
        ? "Početna: Tvoja teniska statistika na dlanu. Prati svoj napredak, trenutni ranking i istoriju poslednjih mečeva."
        : "Home: Your tennis stats at a glance. Track progress, current ranking, and recent match history.",
    },
    {
      id: "search",
      src: "/work/tennis-match/screenshots/03-search.webp",
      ...dimensions,
      alt: sr
        ? "Pretraga igrača sa filterima po lokaciji i nivou"
        : "Player search with location and level filters",
      caption: sr
        ? "Pretraga: Pronađi idealnog sparing partnera. Napredna pretraga po lokaciji i nivou vještine za fer i uzbudljiv meč."
        : "Search: Find the ideal sparring partner. Advanced search by location and skill level for a fair, exciting match.",
    },
    {
      id: "rankings",
      src: "/work/tennis-match/screenshots/04-rankings.webp",
      ...dimensions,
      alt: sr
        ? "Rang lista sa ukupnim, sedmičnim i mjesečnim pregledom"
        : "Ranking list with overall, weekly, and monthly views",
      caption: sr
        ? "Rang lista: Popni se na vrh tabele. Prati globalnu i lokalnu rang listu u realnom vremenu i postani broj 1."
        : "Rankings: Climb to the top of the table. Follow global and local rankings in real time and become number 1.",
    },
    {
      id: "profile",
      src: "/work/tennis-match/screenshots/05-profile.webp",
      ...dimensions,
      alt: sr
        ? "Profil igrača sa ELO ocjenom i dostupnošću"
        : "Player profile with ELO rating and availability",
      caption: sr
        ? "Profil: Personalizovani profil igrača. Istakni svoj stil igre, ELO rejting i definiši termine kada si slobodan za igru."
        : "Profile: A personalized player profile. Highlight your playing style, ELO rating, and set when you're free to play.",
    },
  ];
}

/** Desktop marketing landing — hero + featured work card. */
export function getTennisMatchDesktopShot(locale: Locale): Screenshot {
  const sr = locale === "sr";
  return {
    id: "landing-desktop",
    src: "/work/tennis-match/screenshots/00-landing-desktop.webp",
    width: 1600,
    height: 763,
    alt: sr
      ? "Desktop landing stranica Tennis Matcha"
      : "Tennis Match desktop landing page",
    caption: sr
      ? "Landing: Istraži platformu bez obaveza. Brza registracija i interaktivni demo za trenutni uvid u funkcionalnosti."
      : "Landing: Explore the platform with no commitment. Quick sign-up and an interactive demo for an instant look at the features.",
  };
}

export function getTennisMatchMobileLanding(locale: Locale): Screenshot {
  return getTennisMatchShots(locale).find((shot) => shot.id === "landing")!;
}

/** Live-product hero — desktop + mobile landing pair. */
export function getTennisMatchHeroShots(locale: Locale): {
  desktop: Screenshot;
  mobile: Screenshot;
} {
  return {
    desktop: getTennisMatchDesktopShot(locale),
    mobile: getTennisMatchMobileLanding(locale),
  };
}

export function getFeaturedShots(locale: Locale): {
  desktop: Screenshot;
  mobile: Screenshot;
} {
  return getTennisMatchHeroShots(locale);
}
