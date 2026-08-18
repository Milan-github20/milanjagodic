import type { Locale } from "@/lib/i18n";

export type CaseStudyStat = { label: string; value: string };
export type CaseStudyStep = { title: string; description: string };
export type CaseStudyDecision = {
  problem: string;
  options: string;
  choice: string;
  why: string;
};
export type CaseStudyContent = {
  slug: string;
  title: string;
  hook: string;
  role: string;
  year: number;
  duration: string;
  status: string;
  stack: string[];
  liveUrl: string;
  demoUrl?: string;
  demoOnRequest?: boolean;
  stats: CaseStudyStat[];
  context: string[];
  constraints: string[];
  goals: string[];
  flow: CaseStudyStep[];
  decisions: CaseStudyDecision[];
  technicalNotes: string[];
  hardParts: string[];
  outcome: string[];
  next: string[];
  nextProjectSlug: string;
};

export function getTennisMatchCaseStudy(locale: Locale): CaseStudyContent {
  if (locale === "sr") {
    return {
      slug: "tennis-match",
      title: "Tennis Match",
      hook:
        "Zajednica tenisera koji traže s kim da igraju — pronađi protivnika svog nivoa, dogovori meč i prati ELO rang.",
      role: "Solo: proizvod, interfejs, backend, tekst, pravila",
      year: 2026,
      duration: "Jun–avgust 2026",
      status: "U produkciji, i dalje se razvija",
      stack: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "shadcn/ui",
        "Tailwind",
        "Vercel",
      ],
      liveUrl: "https://tennismatch.ba",
      demoUrl: "https://tennismatch.ba",
      stats: [
        { label: "Trajanje", value: "Jun–avg 2026" },
        { label: "Tim", value: "Solo" },
        { label: "Status", value: "U produkciji" },
        { label: "Fokus", value: "Spajanje + ELO" },
      ],
      context: [
        "Mnogi teniseri žele da igraju, ali nemaju s kim. Partner nije uvijek slobodan, a pronaći nekoga novog istog nivoa je teško — ne znaš je li pretjerano jak ili preslab.",
        "Nije bilo mjesta gdje se to rješava na jednom mjestu: ko je tu, kog nivoa, i može li se zakazati meč.",
        "Tennis Match je web aplikacija koja radi kao lokalna teniska zajednica za BiH.",
      ],
      constraints: [
        "Sve sam radio sam: ideja, dizajn, baza, prijava, logika mečeva i ELO-a, admin panel, produkcija.",
        "Nema rezervacije terena, turnira, niti automatskog spajanja bez truda korisnika.",
        "Izvorni kod nije javan. Pričam o arhitekturi, ne dijelim repo.",
      ],
      goals: [
        "Omogućiti igračima da pronađu protivnike sličnog nivoa.",
        "Dati fer okvir za izazov, dogovor termina i potvrdu rezultata.",
        "Graditi rang listu koja ima smisla — ne lažni brojevi.",
      ],
      flow: [
        {
          title: "Registracija",
          description: "Kratak uvod i upitnik o iskustvu → privremeni rang.",
        },
        {
          title: "Pretraga",
          description: "Igrači po nivou, gradu i podlozi.",
        },
        {
          title: "Izazov",
          description: "Pošalji izazov; dogovori termin i teren u aplikaciji.",
        },
        {
          title: "Poruke",
          description: "Poruke se otvaraju tek nakon prihvatanja izazova.",
        },
        {
          title: "Rezultat",
          description:
            "Unos po setovima; protivnik potvrđuje; ELO se ažurira na serveru.",
        },
      ],
      decisions: [
        {
          problem: "Novi igrač nema ELO.",
          options: "Svi počinju od 1000, upitnik, ili bez ranga.",
          choice:
            "Upitnik daje privremeni rang; ELO kreće nakon 2 potvrđena meča.",
          why: "Rang lista mora imati smisla od prvog dana, bez uništavanja ljestvice.",
        },
        {
          problem: "Neželjene poruke i privatnost.",
          options: "Otvorene poruke ili poruke tek nakon prihvatanja.",
          choice: "Poruke tek nakon prihvatanja izazova.",
          why: "Sprečava neželjene poruke i štiti igrače.",
        },
        {
          problem: "Lažni ili sporni rezultati.",
          options: "Jedan unosi, oba potvrđuju, ili odmah admin.",
          choice:
            "Jedan unosi; drugi potvrđuje; poslije 2 sata automatska potvrda; odbijanje ide adminu.",
          why: "Fer igra, bez blokade normalnog toka.",
        },
        {
          problem: "Kako regruter vidi aplikaciju.",
          options: "Registracija, demo nalog, ili na upit.",
          choice:
            "Jedan klik na početnoj strani — demo nalog, odvojen od pravih igrača.",
          why: "Regruter vidi aplikaciju bez registracije; pravi igrači ostaju izolirani.",
        },
        {
          problem: "Gdje se računa ELO.",
          options: "U pregledaču ili na serveru.",
          choice: "Na serveru, tako da se bodovi ne primijene dvaput.",
          why: "Rang lista ostaje fer i pri osvježavanju stranice.",
        },
        {
          problem: "Šta ulazi u prvu verziju.",
          options: "Turniri i rezervacija terena, ili fokus na rang listu.",
          choice: "Bez turnira i rezervacije terena u prvoj verziji.",
          why: "Jezgro mora biti pouzdano prije širenja.",
        },
      ],
      technicalNotes: [
        "Prijava: Google i email sa lozinkom, reset lozinke, potvrda emaila.",
        "RLS: ko vidi čije podatke i ko može da potvrdi meč.",
        "Supabase Realtime za izazove i poruke.",
        "ELO se računa na serveru — ista potvrda ne dodaje bodove dvaput.",
        "Demo nalog (`is_demo`) je odvojen od pravih igrača.",
      ],
      hardParts: [
        "Početni rang bez uništavanja ljestvice.",
        "Izazov i rezultat kao pravi tok stanja, ne samo da/ne.",
        "Potvrda rezultata, rok i spor pred adminom, bez dvostrukog brojanja ELO-a.",
      ],
      outcome: [
        "Aplikacija je u produkciji na tennismatch.ba — igrači se registruju, pronalaze protivnike, zakazuju mečeve i prate rang.",
        "Srpski je glavni jezik proizvoda; engleski postoji od početka.",
        "Ne objavljujem broj korisnika — samo da je u upotrebi.",
      ],
      next: [
        "Nagrade za igranje (angažman, ne buka).",
        "Online mjesečna pretplata.",
        "Bolje obavijesti, bez pretvaranja u društvenu mrežu.",
      ],
      nextProjectSlug: "preferito",
    };
  }

  return {
    slug: "tennis-match",
    title: "Tennis Match",
    hook:
      "A recreational tennis community for BiH — find players at your level, challenge, schedule, and track ELO.",
    role: "Solo: product, interface, backend, copy, legal",
    year: 2026,
    duration: "June–August 2026",
    status: "Live, still in active development",
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "shadcn/ui",
      "Tailwind",
      "Vercel",
    ],
    liveUrl: "https://tennismatch.ba",
    demoUrl: "https://tennismatch.ba",
    stats: [
      { label: "Duration", value: "Jun–Aug 2026" },
      { label: "Team", value: "Solo" },
      { label: "Status", value: "In production" },
      { label: "Focus", value: "Matchmaking + ELO" },
    ],
    context: [
      "Many players want to play but don't know who matches their level. A partner isn't always free, and finding someone new at the right strength is hard.",
      "There was no single place to solve this: who's around, at what level, and can you schedule a match.",
      "Tennis Match is a web app that works as a local tennis community for Bosnia and Herzegovina.",
    ],
    constraints: [
      "Solo build — idea, design, database, login, match and ELO logic, admin panel, production.",
      "No court booking, tournaments, or zero-effort auto-match.",
      "Source is not public. Architecture story only, not the repo.",
    ],
    goals: [
      "Let players find opponents at a similar level.",
      "Give a fair frame for a challenge, scheduling, and result confirmation.",
      "Build a ranking that means something — no fake numbers.",
    ],
    flow: [
      {
        title: "Register",
        description: "Short intro and experience questionnaire → provisional rank.",
      },
      {
        title: "Search",
        description: "Players by level, city, and surface.",
      },
      {
        title: "Challenge",
        description: "Send a challenge; agree time and venue in the app.",
      },
      {
        title: "Messages",
        description: "Chat unlocks only after the challenge is accepted.",
      },
      {
        title: "Result",
        description:
          "Score by set; the other player confirms; ELO updates on the server.",
      },
    ],
    decisions: [
      {
        problem: "A new player has no ELO.",
        options: "Everyone starts at 1000, a questionnaire, or no rank.",
        choice:
          "Questionnaire → provisional rank; ELO after 2 confirmed matches.",
        why: "The ladder has to make sense from day one without breaking fairness.",
      },
      {
        problem: "Spam and privacy in chat.",
        options: "Open chat vs chat after accept.",
        choice: "Chat only after the challenge is accepted.",
        why: "Stops unwanted messages and protects players.",
      },
      {
        problem: "Fake or disputed scores.",
        options: "One entry vs both confirm vs admin immediately.",
        choice:
          "One enters; the other confirms; auto-confirm after 2 hours; reject goes to admin.",
        why: "Fair play without blocking normal flow.",
      },
      {
        problem: "How a recruiter tries the app.",
        options: "Register vs demo account vs on request.",
        choice:
          "One click on the landing page — a demo account, isolated from real players.",
        why: "Recruiters see the app without signing up; real players stay separate.",
      },
      {
        problem: "Where ELO is calculated.",
        options: "In the browser vs on the server.",
        choice: "On the server, so the same confirmation cannot apply twice.",
        why: "Rankings stay fair, even on refresh.",
      },
      {
        problem: "What belongs in the first version.",
        options: "Tournaments and court booking vs a trusted ladder.",
        choice: "No tournaments or court booking in the first version.",
        why: "The core has to be trusted before expanding.",
      },
    ],
    technicalNotes: [
      "Login: Google and email/password, password reset, email confirmation.",
      "RLS: who sees whose data; who can confirm a match.",
      "Supabase Realtime for challenges and messages.",
      "ELO runs on the server — the same confirmation cannot apply twice.",
      "Demo users (`is_demo`) are kept apart from real players.",
    ],
    hardParts: [
      "Starting a ranking without breaking the ladder.",
      "Challenge and result as a real state machine, not a yes/no flag.",
      "Fair-play confirmation, timeout, and admin dispute without double-counting ELO.",
    ],
    outcome: [
      "Live at tennismatch.ba — players register, find opponents, schedule matches, and track rank.",
      "Serbian is the product's primary language; English from day one.",
      "No public user counts — in use, that's it.",
    ],
    next: [
      "Rewards for playing (engagement, not noise).",
      "Online monthly subscription.",
      "Better notifications, without turning into a social app.",
    ],
    nextProjectSlug: "preferito",
  };
}

export function getPreferitoCaseStudy(locale: Locale): CaseStudyContent {
  if (locale === "sr") {
    return {
      slug: "preferito",
      title: "Preferito",
      hook:
        "Sistem rezervacija za pravi frizerski salon — klijent sam zakazuje, algoritam čuva pauze, baza sprečava preklapanje.",
      role: "Dizajn i full-stack razvoj",
      year: 2026,
      duration: "2026",
      status: "U svakodnevnoj upotrebi",
      stack: [
        "React",
        "TypeScript",
        "Vite",
        "Supabase",
        "TanStack Query",
        "Vercel",
      ],
      liveUrl: "https://preferito.vercel.app",
      demoOnRequest: true,
      stats: [
        { label: "Biznis", value: "1 salon" },
        { label: "Tim", value: "Solo" },
        { label: "Status", value: "U produkciji" },
        { label: "Fokus", value: "Zakazivanje + pravila" },
      ],
      context: [
        "Preferito je frizerski salon Milijane Rudić u Mrkonjić Gradu. Termini su se zakazivali telefonom, Instagramom i usputnom porukom.",
        "Dok frizerka radi, telefon zvoni, klijent pita „imaš li sutra u 16“, a niko tačno ne zna da li taj termin stane — fade traje 40 min, fade s bradom 60.",
        "Zadatak nije bio „napraviti sajt salona“. Zadatak je bio da zakazivanje prestane biti usko grlo.",
      ],
      constraints: [
        "Jedna frizerka. Nedjelja zatvorena. Radno vrijeme varira po danu.",
        "Većina dolazi sa telefona. Nema budžeta za poseban backend tim.",
        "Sistem mora biti dovoljno jednostavan da ga vodi salon, ne programer.",
      ],
      goals: [
        "Klijent zakaže bez poziva, na jeziku mjesta, sa telefona.",
        "Termini se nikad ne preklapaju, ni kad dvojica kliknu isto.",
        "Pravila salona žive u sistemu: otkaz do 2 sata, izostanak, neradna nedjelja.",
      ],
      flow: [
        {
          title: "Usluga",
          description:
            "Klijent bira uslugu; cijena i minuti odmah. Brada +20 min gdje treba.",
        },
        {
          title: "Datum",
          description: "Kalendar gasi prošlost, nedjelju i neradne dane.",
        },
        {
          title: "Vrijeme",
          description:
            "Samo termini koji stanu uz trajanje, pauzu i radno vrijeme.",
        },
        {
          title: "Potvrda",
          description: "Sažetak, napomena, potvrda. Subota ide na čekanje.",
        },
      ],
      decisions: [
        {
          problem: "Zašto vlastita aplikacija, a ne Booksy ili Treatwell?",
          options: "Gotov servis ili vlastito rješenje.",
          choice: "Vlastita aplikacija za lokalni način rada.",
          why: "Kontrola, bez provizije, pravila salona u kodu.",
        },
        {
          problem: "Preklapanje termina.",
          options: "Samo u interfejsu ili i u bazi.",
          choice:
            "Provjera prije unosa, plus ograničenje u bazi protiv preklapanja.",
          why: "Dva telefona mogu kliknuti 16:00 u istoj sekundi.",
        },
        {
          problem: "Pauza između klijenata.",
          options: "Bez pauze ili 40 minuta.",
          choice: "40 minuta između klijenata u algoritmu.",
          why: "Frizerka treba da završi, očisti i primi sljedećeg — ovo nije sastanak od 30 minuta.",
        },
        {
          problem: "Subota i vikend.",
          options: "Odmah potvrđeno ili na čekanju.",
          choice: "Subota čeka dok frizerka ne potvrdi.",
          why: "Vikend je najskuplji dan — kontrola ostaje kod salona.",
        },
        {
          problem: "Klijent se ne pojavi.",
          options: "Bez posljedice ili blokada.",
          choice:
            "Dva izostanka blokiraju nove rezervacije (pravilo u bazi).",
          why: "Pravilo mora živjeti u bazi, ne samo na ekranu.",
        },
        {
          problem: "Privatnost klijenata.",
          options: "Svi vide kalendar ili samo zauzete intervale.",
          choice: "Klijent vidi samo zauzete intervale.",
          why: "Ne čita tuđe termine, imena ni telefone.",
        },
      ],
      technicalNotes: [
        "Frontend: React 18, TypeScript, Vite, React Router, TanStack Query, Tailwind, shadcn/ui, Framer Motion.",
        "Backend: Supabase Postgres, prijava, RLS, RPC, triggeri.",
        "Termini na 20 minuta; trajanje iz usluge, brada iz napomene.",
        "Tri uloge: klijent, frizerka (/frizer), admin.",
        "Sesija se gasi poslije sat vremena neaktivnosti.",
      ],
      hardParts: [
        "Algoritam slobodnog termina sa pauzom, radnim vremenom i trajanjem usluge.",
        "Dva klijenta kliknu isti termin u istoj sekundi — interfejs i ograničenje u bazi.",
        "Zakazivanje je politika salona napisana u kodu, ne samo kalendar.",
      ],
      outcome: [
        "Salon ima jedan kanal za zakazivanje umjesto tri. Klijent vidi šta je slobodno. Frizerka vidi dan.",
        "Ne izmišljam procentualni rast — iskren ishod: sistem rješava greške zbog kojih je rađen.",
      ],
      next: [
        "Podsjetnik dan prije (SMS ili WhatsApp).",
        "Jasniji prazan ekran kad nema slobodnih termina.",
        "Jednostavna statistika: izostanci, zauzeti dani, usluge.",
      ],
      nextProjectSlug: "tennis-match",
    };
  }

  return {
    slug: "preferito",
    title: "Preferito",
    hook:
      "Live booking for a real barber shop — clients book themselves, the algorithm keeps buffers, the database prevents overlap.",
    role: "Design and full-stack development",
    year: 2026,
    duration: "2026",
    status: "In daily use",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Supabase",
      "TanStack Query",
      "Vercel",
    ],
    liveUrl: "https://preferito.vercel.app",
    demoOnRequest: true,
    stats: [
      { label: "Business", value: "1 salon" },
      { label: "Team", value: "Solo" },
      { label: "Status", value: "In production" },
      { label: "Focus", value: "Booking + rules" },
    ],
    context: [
      "Preferito is Milijana Rudić's barber shop in Mrkonjić Grad. Appointments were booked by phone, Instagram, and ad-hoc messages.",
      "While cutting hair, the phone rings — \"do you have 4pm tomorrow?\" — but nobody knows if the slot fits. A fade is 40 minutes; fade with beard is 60.",
      "The job wasn't \"make a salon website.\" The job was to stop scheduling from being the bottleneck.",
    ],
    constraints: [
      "One barber. Sunday closed. Working hours vary by day.",
      "Most traffic is mobile. No budget for a separate backend team.",
      "The system must be simple enough for the salon to run, not the developer.",
    ],
    goals: [
      "The client books without calling, in the local language, from their phone.",
      "Appointments never overlap, even when two people tap the same slot.",
      "Salon rules live in the system: 2-hour cancel, no-show, closed Sunday.",
    ],
    flow: [
      {
        title: "Service",
        description:
          "The client picks a service; price and minutes update. Beard adds 20 minutes where needed.",
      },
      {
        title: "Date",
        description: "The calendar blocks past dates, Sunday, and closed days.",
      },
      {
        title: "Time",
        description:
          "Only slots that fit duration, the buffer, and that day's hours.",
      },
      {
        title: "Confirm",
        description: "Summary, note, confirm. Saturday bookings wait for approval.",
      },
    ],
    decisions: [
      {
        problem: "Why a custom app, not Booksy or Treatwell?",
        options: "Off-the-shelf vs custom.",
        choice: "A custom app for the local way of working.",
        why: "Operational control, no commission, salon rules in code.",
      },
      {
        problem: "Overlapping appointments.",
        options: "Interface only vs a database constraint.",
        choice: "Check again before insert, plus an overlap constraint in the database.",
        why: "Two phones can tap 4pm in the same second.",
      },
      {
        problem: "Time between clients.",
        options: "No gap vs a 40-minute buffer.",
        choice: "A 40-minute buffer in the scheduling algorithm.",
        why: "The barber needs to finish, clean up, and take the next person — this is not a 30-minute call.",
      },
      {
        problem: "Saturday and the weekend.",
        options: "Confirm immediately vs wait.",
        choice: "Saturday stays pending until the barber confirms.",
        why: "The weekend is the most expensive day — control stays with the salon.",
      },
      {
        problem: "No-shows.",
        options: "No consequence vs a block.",
        choice: "Two no-shows block new bookings (a database trigger).",
        why: "The rule has to live in the database, not only on screen.",
      },
      {
        problem: "Client privacy.",
        options: "Full calendar vs busy intervals only.",
        choice: "The client sees only busy intervals.",
        why: "They never read other people's appointments, names, or phones.",
      },
    ],
    technicalNotes: [
      "Frontend: React 18, TypeScript, Vite, React Router, TanStack Query, Tailwind, shadcn/ui, Framer Motion.",
      "Backend: Supabase Postgres, Auth, RLS, RPC, triggers.",
      "20-minute slot grid; duration from the service, beard from the note.",
      "Three roles: client, barber (/frizer), admin.",
      "The session ends after 1 hour of inactivity.",
    ],
    hardParts: [
      "A free-slot algorithm with buffer, working hours, and service duration.",
      "Two clients tapping the same slot — interface and database constraint.",
      "Booking is salon policy written in code, not just a calendar.",
    ],
    outcome: [
      "One booking channel instead of three. The client sees what's free. The barber sees the day.",
      "No invented growth percentages — honest outcome: the system fixes the errors it was built for.",
    ],
    next: [
      "A reminder the day before (SMS or WhatsApp).",
      "A clearer empty state when no slots exist.",
      "Simple stats: no-shows, busy days, popular services.",
    ],
    nextProjectSlug: "tennis-match",
  };
}

export function getCaseStudy(
  slug: string,
  locale: Locale
): CaseStudyContent | null {
  if (slug === "tennis-match") return getTennisMatchCaseStudy(locale);
  if (slug === "preferito") return getPreferitoCaseStudy(locale);
  return null;
}
