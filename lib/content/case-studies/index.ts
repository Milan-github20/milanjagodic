import type { Locale } from "@/lib/i18n";

export type CaseStudyStat = { label: string; value: string };
export type CaseStudyStep = { title: string; description: string };
export type CaseStudyDecision = {
  title?: string;
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
  liveLabel?: string;
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
        "Digitalna platforma za rekreativne tenisere koja automatizuje pronalazak protivnika, ugovaranje mečeva i dinamičko praćenje napretka kroz ELO algoritam.",
      role: "Solo projekat · UI/UX dizajn · Full-stack development",
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
      liveLabel: "Pogledaj aplikaciju",
      stats: [
        { label: "Trajanje", value: "Jun–avg 2026" },
        { label: "Tim", value: "Solo Developer" },
        { label: "Status", value: "U produkciji" },
        { label: "Fokus", value: "Spajanje igrača i ELO" },
      ],
      context: [
        "Rekreativni teniseri se često suočavaju s problemom pronalaska adekvatnih partnera za igru. Klasični kanali komunikacije ne nude uvid u stvarni nivo vještine, što često dovodi do neizbalansiranih i nezanimljivih mečeva.",
        "Nije postojala centralizovana platforma koja na jednom mjestu rješava ključna pitanja: ko je dostupan za igru, kog je nivoa i kada možemo odigrati meč?",
        "Tennis Match je nastao kao rješenje — digitalna platforma koja povezuje lokalnu tenisku zajednicu u BiH i čini organizaciju mečeva jednostavnom.",
      ],
      constraints: [
        "End-to-end razvoj: samostalno sam realizovao kompletan proizvod — od UI/UX dizajna i arhitekture baze, do backend logike mečeva, Auth sistema, ELO algoritma, admin panela i produkcije.",
        "Fokusiran opseg: proizvod je namjerno usmjeren isključivo na direktno spajanje igrača i rangiranje. Rezervacija terena i turniri su izostavljeni kako bi korisničko iskustvo ostalo brzo i jednostavno.",
        "Zatvoren kod (closed-source): izvorni kod nije javan jer je projekat u aktivnoj produkciji, ali u nastavku prikazujem tehničku arhitekturu i ključne odluke pri razvoju.",
      ],
      goals: [
        "Precizno spajanje: omogućiti igračima da brzo i lako pronađu protivnike sličnog nivoa vještine.",
        "Jednostavan tok meča: definisati fer i intuitivan proces za slanje izazova, dogovor termina i dvostruku potvrdu rezultata.",
        "Realistično rangiranje: implementirati stabilan ELO algoritam koji odražava stvarnu formu i napredak igrača na rang listi.",
      ],
      flow: [
        {
          title: "Upitnik i inicijalni rang",
          description:
            "Korisnik prolazi kroz kratak upitnik o teniskom iskustvu na osnovu kojeg sistem dodjeljuje privremeni ELO rang za ravnopravan početak.",
        },
        {
          title: "Filtriranje i pronalazak",
          description:
            "Pametna pretraga igrača prema nivou vještine, gradu i željenoj podlozi, čime se eliminiše nagađanje o kvalitetu protivnika.",
        },
        {
          title: "Slanje izazova",
          description:
            "Direktna interakcija: slanje upita za meč sa predloženim terminom i lokacijom direktno kroz interfejs aplikacije.",
        },
        {
          title: "Koordinacija i dogovor",
          description:
            "Otvaranje namjenskog kanala za komunikaciju nakon prihvaćenog izazova, radi finalizacije detalja meča uz očuvanje privatnosti.",
        },
        {
          title: "Verifikacija i ažuriranje ranga",
          description:
            "Unos rezultata zahtijeva potvrdu oba igrača. Nakon verifikacije, ELO algoritam u realnom vremenu ažurira bodove i poziciju na tabeli.",
        },
      ],
      decisions: [
        {
          title: "Inicijalno rangiranje",
          problem: "Kategorizacija novih korisnika bez istorije mečeva.",
          options:
            "Fiksni početni bodovi (npr. 1000), ulazni test (kviz) ili profil bez ranga.",
          choice:
            "Dinamički upitnik za procjenu nivoa + kalibracija kroz prva dva meča.",
          why: 'Obezbjeđuje relevantnost rang liste od samog starta i sprečava drastična odstupanja u kvalitetu mečeva (tzv. „ranking inflation").',
        },
        {
          title: "Privatnost i komunikacija",
          problem: "Prevencija spama i zaštita privatnih podataka igrača.",
          options: "Otvoreni čet sistem ili uslovna komunikacija.",
          choice:
            "Omogućavanje razmjene poruka isključivo nakon obostranog prihvatanja izazova.",
          why: "Maksimizira sigurnost korisnika i eliminiše mogućnost uznemiravanja od strane nepoznatih profila.",
        },
        {
          title: "Validacija rezultata",
          problem:
            "Potencijalna manipulacija rezultatima i unos netačnih podataka.",
          options:
            "Jednostrani unos, manuelna potvrda administratora ili dvostruka verifikacija.",
          choice:
            'Sistem „unos-potvrda" sa automatskom validacijom nakon 2 sata (u slučaju neaktivnosti drugog igrača).',
          why: "Osigurava integritet podataka uz zadržavanje brzine protoka informacija bez zagušenja admin panela.",
        },
        {
          title: "Dostupnost za regrutere (Demo mod)",
          problem:
            "Kako omogućiti uvid u aplikaciju bez narušavanja baze pravih korisnika.",
          options:
            "Standardna registracija, video prezentacija ili demo nalog.",
          choice:
            'Implementacija „One-click Demo" moda koji koristi izolovanu bazu podataka.',
          why: "Regruter dobija momentalan uvid u UX/UI i funkcionalnosti, dok pravi korisnici ostaju zaštićeni od testnih podataka.",
        },
        {
          title: "Arhitektura kalkulacija (Backend vs Frontend)",
          problem:
            "Sigurnost i preciznost obračuna bodova (ELO rejting).",
          options:
            "Kalkulacija na klijentskoj strani (pregledač) ili serverska obrada.",
          choice:
            "Isključiva obrada podataka na backendu (server-side logic).",
          why: "Sprečava manipulaciju bodovima kroz manipulaciju koda na frontendu i osigurava konzistentnost rang liste pri svakom osvježavanju.",
        },
      ],
      technicalNotes: [
        "Autentifikacija i sigurnost: podrška za Google OAuth i Email/Password sa kompletnim sistemom za verifikaciju naloga i sigurni reset lozinke.",
        "Row Level Security (RLS): granularna restrikcija pristupa u bazi — osigurava da samo autorizovani igrači mogu vidjeti privatne podatke i potvrditi rezultat meča.",
        "Realtime sinhronizacija: korištenje Supabase Realtime protokola (WebSockets) za trenutnu dostavu obavještenja o izazovima i porukama bez osvježavanja stranice.",
        "Server-side ELO logika i idempotentnost: izračunavanje bodova se vrši isključivo na backendu čime se spriječava manipulacija koda na klijentu i onemogućava višestruko bodovanje istog meča.",
        "Izolovano demo okruženje (sandbox): testni nalog koristi is_demo flag koji potpuno odvaja testne podatke od produkcione baze i pravih igrača na rang listi.",
      ],
      hardParts: [
        "Balansiranje inicijalnog rejtinga: postizanje stabilnosti rang liste kroz preciznu kalibraciju novih igrača bez narušavanja postojećeg poretka.",
        "Upravljanje životnim ciklusom meča: implementacija robusnog automata stanja za upravljanje tokom meča — od izazova do validacije rezultata.",
        "Sistem arbitraže i integritet podataka: rješavanje spornih rezultata i implementacija mehanizama isteka roka uz striktnu prevenciju dupliranja bodova.",
      ],
      outcome: [
        "Produkciono okruženje: aplikacija je u potpunosti funkcionalna i dostupna na tennismatch.ba, podržavajući kompletan korisnički ciklus od registracije do rangiranja.",
        "Lokalizacija: arhitektura podržava više jezika od samog početka, sa primarnim fokusom na lokalno i englesko govorno područje.",
        "Validacija u realnim uslovima: fokus projekta je na stabilnosti sistema i stvarnom angažmanu korisnika u produkcionom okruženju.",
      ],
      next: [
        "Sistem lojalnosti i zadržavanja korisnika: uvođenje mehanizama nagrađivanja za povećanje angažmana (elementi igre sa fokusom na kvalitet).",
        "Monetizacija: implementacija pretplatničkog modela za napredne statistike i dodatne funkcionalnosti.",
        "Optimizacija sistema obavještenja: unapređenje korisničkog iskustva kroz relevantna obavještenja, bez nepotrebnog opterećenja korisnika.",
      ],
      nextProjectSlug: "preferito",
    };
  }

  return {
    slug: "tennis-match",
    title: "Tennis Match",
    hook:
      "A digital platform for recreational tennis players that automates finding opponents, arranging matches, and dynamic progress tracking through an ELO algorithm.",
    role: "Solo project · UI/UX design · Full-stack development",
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
    liveLabel: "View the app",
    stats: [
      { label: "Duration", value: "Jun–Aug 2026" },
      { label: "Team", value: "Solo Developer" },
      { label: "Status", value: "In production" },
      { label: "Focus", value: "Matchmaking & ELO" },
    ],
    context: [
      "Recreational tennis players often struggle to find suitable partners. Classic communication channels give no real insight into skill level, which often leads to unbalanced and dull matches.",
      "There was no centralized platform that answers the key questions in one place: who is available to play, at what level, and when can we schedule a match?",
      "Tennis Match was built as the answer — a digital platform that connects the local tennis community in BiH and makes organizing matches simple.",
    ],
    constraints: [
      "End-to-end development: I built the full product solo — from UI/UX design and database architecture to match backend logic, auth, the ELO algorithm, admin panel, and production.",
      "Focused scope: the product is intentionally limited to direct player matching and ranking. Court booking and tournaments were left out so the experience stays fast and simple.",
      "Closed-source: the source is not public because the project is live in production, but below I show the technical architecture and key development decisions.",
    ],
    goals: [
      "Precise matching: let players quickly and easily find opponents at a similar skill level.",
      "Simple match flow: define a fair, intuitive process for challenges, scheduling, and double confirmation of results.",
      "Realistic ranking: implement a stable ELO algorithm that reflects real form and progress on the ladder.",
    ],
    flow: [
      {
        title: "Questionnaire & initial rank",
        description:
          "The user goes through a short tennis-experience questionnaire so the system can assign a provisional ELO rank for a fair start.",
      },
      {
        title: "Filtering & discovery",
        description:
          "Smart player search by skill level, city, and preferred surface — removing guesswork about opponent quality.",
      },
      {
        title: "Sending a challenge",
        description:
          "Direct interaction: send a match request with a proposed time and location straight through the app interface.",
      },
      {
        title: "Coordination & agreement",
        description:
          "A dedicated chat opens after the challenge is accepted, so players can finalize match details while privacy stays intact.",
      },
      {
        title: "Verification & rank update",
        description:
          "Result entry requires confirmation from both players. After verification, the ELO algorithm updates scores and ladder position in real time.",
      },
    ],
    decisions: [
      {
        title: "Initial ranking",
        problem: "Categorizing new users with no match history.",
        options:
          "Fixed starting points (e.g. 1000), an entry quiz, or a profile with no rank.",
        choice:
          "A dynamic questionnaire for level estimation + calibration through the first two matches.",
        why: "Keeps the ladder relevant from day one and prevents wild quality gaps (ranking inflation).",
      },
      {
        title: "Privacy & communication",
        problem: "Preventing spam and protecting players' private data.",
        options: "Open chat vs conditional messaging.",
        choice:
          "Messaging unlocks only after both sides accept a challenge.",
        why: "Maximizes user safety and removes harassment from unknown profiles.",
      },
      {
        title: "Result validation",
        problem: "Potential score manipulation and incorrect data entry.",
        options:
          "Single-sided entry, manual admin confirmation, or double verification.",
        choice:
          "An enter-and-confirm flow with automatic validation after 2 hours if the other player is inactive.",
        why: "Protects data integrity while keeping the flow fast — without flooding the admin panel.",
      },
      {
        title: "Recruiter access (Demo mode)",
        problem:
          "How to let someone explore the app without touching the real user base.",
        options: "Standard registration, a video walkthrough, or a demo account.",
        choice:
          "A one-click demo mode that uses an isolated data pool.",
        why: "Recruiters get an instant look at UX/UI and features while real users stay protected from test data.",
      },
      {
        title: "Calculation architecture (Backend vs Frontend)",
        problem: "Security and precision of score calculation (ELO rating).",
        options: "Client-side calculation in the browser vs server-side processing.",
        choice: "All score processing runs exclusively on the backend.",
        why: "Stops score tampering via frontend code and keeps rankings consistent on every refresh.",
      },
    ],
    technicalNotes: [
      "Authentication & security: Google OAuth and email/password with full account verification and secure password reset.",
      "Row Level Security (RLS): granular database access control — only authorized players can see private data and confirm match results.",
      "Realtime sync: Supabase Realtime (WebSockets) delivers challenge and message updates instantly without refreshing the page.",
      "Server-side ELO logic & idempotency: scores are calculated only on the backend, which blocks client-side tampering and double-counting the same match.",
      "Isolated demo environment (sandbox): the demo account uses an is_demo flag that fully separates test data from the production ladder and real players.",
    ],
    hardParts: [
      "Balancing the initial rating: stabilizing the ladder through precise calibration of new players without disrupting the existing order.",
      "Match lifecycle management: a robust state machine for the match flow — from challenge to result validation.",
      "Arbitration system and data integrity: resolving disputed scores and timeout mechanisms with strict prevention of double-counting points.",
    ],
    outcome: [
      "Production environment: the app is fully functional and live at tennismatch.ba, supporting the complete user cycle from registration to ranking.",
      "Localization: the architecture has supported multiple languages from day one, with primary focus on the local and English-speaking audience.",
      "Validation in real conditions: the project focuses on system stability and real user engagement in a live environment.",
    ],
    next: [
      "Loyalty and retention system: reward mechanisms to increase engagement (gamification focused on quality).",
      "Monetization: a subscription model for advanced stats and extra features.",
      "Notification system optimization: better UX through relevant alerts, without unnecessary noise.",
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
