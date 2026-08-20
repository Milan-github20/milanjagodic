import type { Locale } from "./i18n";

export type Screenshot = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

const dimensions = { width: 720, height: 1574 };

export function getTennisMatchShots(locale: Locale): Screenshot[] {
  const sr = locale === "sr";

  return [
    {
      id: "players",
      src: "/work/tennis-match/players.webp",
      ...dimensions,
      alt: sr
        ? "Pretraga igrača sa filterima po lokaciji i nivou"
        : "Player search with location and level filters",
      caption: sr
        ? "Pretraga protivnika: filter po lokaciji, procjena nivoa iz upitnika, preporučeni igrači."
        : "Finding an opponent: filter by location, level estimated from the questionnaire, recommended players.",
    },
    {
      id: "profile",
      src: "/work/tennis-match/profile.webp",
      ...dimensions,
      alt: sr
        ? "Profil igrača sa ELO ocjenom i dostupnošću"
        : "Player profile with ELO rating and availability",
      caption: sr
        ? "Profil: ELO, fair play ocjena, stil igre i sedmična tabela dostupnosti."
        : "Profile: ELO, fair-play score, playing style, and a weekly availability grid.",
    },
    {
      id: "home",
      src: "/work/tennis-match/home.webp",
      ...dimensions,
      alt: sr
        ? "Početni ekran sa rangom i nedavnim rezultatima"
        : "Home screen with rank and recent results",
      caption: sr
        ? "Početna: trenutni rang, napredak do sljedećeg nivoa i zadnji odigrani mečevi."
        : "Home: current rank, progress to the next tier, and the latest confirmed matches.",
    },
    {
      id: "rankings",
      src: "/work/tennis-match/rankings.webp",
      ...dimensions,
      alt: sr
        ? "Rang lista sa ukupnim, sedmičnim i mjesečnim pregledom"
        : "Ranking list with overall, weekly, and monthly views",
      caption: sr
        ? "Rang lista: ukupno, sedmično i mjesečno. Igrači bez dva potvrđena meča stoje u kalibraciji."
        : "Rankings: overall, weekly, and monthly. Players without two confirmed matches sit in calibration.",
    },
    {
      id: "landing",
      src: "/work/tennis-match/landing.webp",
      ...dimensions,
      alt: sr
        ? "Landing stranica Tennis Matcha"
        : "Tennis Match landing page",
      caption: sr
        ? "Landing: registracija i „Isprobaj demo“ — bez naloga se vidi kako aplikacija radi."
        : "Landing: sign-up and Try demo — the app can be explored without an account.",
    },
  ];
}

/** App screens for the compact hero carousel. */
export function getTennisMatchHeroShots(locale: Locale): Screenshot[] {
  const appShots = new Set(["players", "home", "rankings"]);
  return getTennisMatchShots(locale).filter((shot) => appShots.has(shot.id));
}

export function getFeaturedShot(locale: Locale): Screenshot {
  return getTennisMatchShots(locale)[0];
}
