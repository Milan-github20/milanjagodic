import type { Locale } from "./i18n";

/**
 * Region to blur, in percent of the image box.
 * Used to hide other players' names and avatars — the PRD only allows
 * Milan's own data or demo-account data in published screenshots.
 */
export type ScreenshotMask = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type Screenshot = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  masks?: ScreenshotMask[];
};

const NAME_MASK_WIDTH = 34;
const AVATAR_MASK_WIDTH = 10;

/** Search results: four cards, each with a real name and photo. */
const playerListMasks: ScreenshotMask[] = [0, 1, 2, 3].flatMap((row) => {
  const pitch = 19.1;
  return [
    { top: 35.2 + row * pitch, left: 22, width: NAME_MASK_WIDTH, height: 3 },
    { top: 38.9 + row * pitch, left: 10.5, width: AVATAR_MASK_WIDTH, height: 5 },
  ];
});

/** Ranking list: Milan's own row stays visible, the calibration rows do not. */
const rankingMasks: ScreenshotMask[] = [0, 1, 2, 3, 4].flatMap((row) => {
  const pitch = 8.44;
  return [
    { top: 57.9 + row * pitch, left: 33, width: 33, height: 2.8 },
    { top: 58.0 + row * pitch, left: 11.5, width: 8.5, height: 4.2 },
  ];
});

/** Dashboard: the opponent in the latest result. */
const homeMasks: ScreenshotMask[] = [
  { top: 88.6, left: 27, width: 33, height: 2.8 },
  { top: 88.2, left: 11.5, width: 9, height: 4.6 },
];

const dimensions = { width: 399, height: 871 };

export function getTennisMatchShots(locale: Locale): Screenshot[] {
  const sr = locale === "sr";

  return [
    {
      id: "players",
      src: "/work/tennis-match/players.png",
      ...dimensions,
      alt: sr
        ? "Pretraga igrača sa filterima po lokaciji i nivou"
        : "Player search with location and level filters",
      caption: sr
        ? "Pretraga protivnika: filter po lokaciji, procjena nivoa iz upitnika, preporučeni igrači."
        : "Finding an opponent: filter by location, level estimated from the questionnaire, recommended players.",
      masks: playerListMasks,
    },
    {
      id: "profile",
      src: "/work/tennis-match/profile.png",
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
      src: "/work/tennis-match/home.png",
      ...dimensions,
      alt: sr
        ? "Početni ekran sa rangom i nedavnim rezultatima"
        : "Home screen with rank and recent results",
      caption: sr
        ? "Početna: trenutni rang, napredak do sljedećeg nivoa i zadnji odigrani mečevi."
        : "Home: current rank, progress to the next tier, and the latest confirmed matches.",
      masks: homeMasks,
    },
    {
      id: "rankings",
      src: "/work/tennis-match/rankings.png",
      ...dimensions,
      alt: sr
        ? "Rang lista sa ukupnim, sedmičnim i mjesečnim pregledom"
        : "Ranking list with overall, weekly, and monthly views",
      caption: sr
        ? "Rang lista: ukupno, sedmično i mjesečno. Igrači bez dva potvrđena meča stoje u kalibraciji."
        : "Rankings: overall, weekly, and monthly. Players without two confirmed matches sit in calibration.",
      masks: rankingMasks,
    },
    {
      id: "landing",
      src: "/work/tennis-match/landing.png",
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

/** Shots that show the product itself, for the compact hero carousel. */
export function getTennisMatchHeroShots(locale: Locale): Screenshot[] {
  const appShots = new Set(["players", "home", "rankings"]);
  return getTennisMatchShots(locale).filter((shot) => appShots.has(shot.id));
}

export function getFeaturedShot(locale: Locale): Screenshot {
  return getTennisMatchShots(locale)[0];
}
