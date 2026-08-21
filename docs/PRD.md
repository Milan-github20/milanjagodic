# PRD — Milan Jagodić personal portfolio

**Status:** v1 locked from discovery (2026-08-17)  
**This file is the source of truth.** Before any copy, design, IA change, or code: read this document. If a decision is not in here, ask — do not invent users, metrics, features, years, stack, or client details.

Related product URLs:

- Tennis Match (flagship): https://tennismatch.ba
- Preferito (client work): https://preferito.vercel.app

---

## 1. How to use this document

1. Read this PRD in full.
2. If something is marked `TODO` or `PLACEHOLDER`, implement the slot, never fake the content.
3. Propose copy → wait for Milan’s OK before treating it as final.
4. Then design/build.
5. Quality order: **writing > structure > typography/spacing > screenshots > motion.**

If a later chat contradicts this file, update the PRD first, then implement.

---

## 2. Product intent

Personal portfolio for **Milan Jagodić**, full-stack developer.

**Positioning (not junior, not tutorial gallery):**

> Full-stack developer who ships products people actually use — from idea to production.

**Hero sentence (English, locked direction — polish later, do not change meaning):**

> I design and ship web products end to end — from the first user problem to a live app with auth, data, and real workflows. Currently based in Bosnia and Herzegovina.

**Secondary tags:** Full-stack · Product-minded · Shipped to production

**What the site must prove in 10 seconds:** who he is, and that he has a live product.  
**What it must prove in 90 seconds:** Tennis Match problem → flow → his role, with live link + demo path.

This is a calm product site, not a Dribbble shot and not an Awwwards demo.

---

## 3. Identity and go-to-market

| Field | Decision |
|---|---|
| Name on site | Milan Jagodić |
| Role title | Full-stack Developer |
| Location line | Bosnia and Herzegovina (no city) |
| Target | Full-time **and** selected freelance |
| Level | Product-minded full-stack; site must read above typical junior |
| Availability copy | Available for full-time and selected freelance, remote from BiH — now |
| Email | jagodicm2002@gmail.com |
| Languages | **English default** + Serbian (`sr`) toggle in v1 |
| Domain | None yet → Vercel URL for v1; personal domain later |
| GitHub / LinkedIn | LinkedIn: https://www.linkedin.com/in/milan-jagodić-83b9ba204/ . GitHub profile: https://github.com/Milan-github20 . Tennis Match and Preferito source stay private. |
| Photo / avatar | **PLACEHOLDER**; Milan will provide later |
| CV | Draft page at `/cv` (EN + SR). Content lives in `lib/content/cv.ts` for Milan to edit. Print / Save as PDF for a 1-page A4. Role at Računari d.o.o. and Apeiron programme left blank until he fills them. |
| Command palette | Yes in v1 (cmd+k): Work, About, Contact, Copy email |
| Analytics | Plausible or Umami (non-invasive) |
| Contact | Mailto + short working form (Resend or Formspark). No 12-field form. No Cal.com/Calendly in v1 |

---

## 4. Explicit non-goals

Do **not** ship:

- 10 mini projects, tutorial clones, certificate walls
- Fake metrics, fake users, unused stack logos
- Black + gradient + custom cursor + endless marquee + 3s splash loader
- “I am passionate about coding and always learning”
- Case study of 4000 words with no images, or 8 images with no decisions
- Tennis Match or Preferito **source code** in this repo (secrets, keys, client data)
- Blog / `/now` in v1

Forbidden motion/effects in v1 (even with “rich motion”):

- Custom cursor
- Invert scroll
- Endless marquee
- Splash / page loader
- Particle background
- Glassmorphism everywhere

---

## 5. Information architecture

Few pages, each finished.

| Route | Purpose |
|---|---|
| `/` | Who, what, 2 featured works, contact close |
| `/work/tennis-match` | Flagship case study (~70% of portfolio attention) |
| `/work/preferito` | Client/salon case study |
| `/about` | Story, how he works, stack, what he wants |
| `/contact` | Short, clear |
| `/404` | Custom |

Optional later (not v1): `/now`, notes, blog.

**Global chrome**

- Header: name · Work · About · Contact · CV (`/[lang]/cv`)
- Footer on every page: email, LinkedIn, CV. GitHub only if a profile URL exists (not TM/Preferito source).
- End of each case study: “Next project” with a large preview
- Custom OG image per page/project
- Favicon + apple touch icon
- Tab title pattern: `Milan Jagodić — Tennis Match` / `Milan Jagodić — Preferito` / etc.
- JSON-LD `Person` (basic)
- Sitemap + robots

**i18n**

- Default locale: English
- Second locale: Serbian (`sr`)
- Milan approves English copy; Serbian is drafted too and approved
- Do not ship a third locale (HR/BS) in v1

---

## 6. Homepage layout (locked)

### 6.1 Hero (first screen)

- Name
- One strong English sentence (see §2)
- One secondary line
- Two CTAs: **See work** · **Get in touch**
- Small “live product” badge linking to https://tennismatch.ba

### 6.2 Selected work — two large cards only

**Card 1 — Tennis Match**

- Title: Tennis Match
- Subtitle: Recreational tennis matchmaking for Bosnia and Herzegovina
- Tags: Full-stack · Marketplace / community · Live
- One strong screenshot of the **app** (player list or rankings), **not** the marketing landing
- Role: Product, design, full-stack

**Card 2 — Preferito**

- Title: Preferito
- Subtitle: Scheduling and client management for a local salon
- Tags: Full-stack · Booking · Client work
- Screenshot of calendar / admin (mask real clients)
- Role: Full-stack for a real business

### 6.3 How I work — four short blocks

1. Start with the user problem
2. Design the smallest complete workflow
3. Ship auth, data, and edge cases
4. Iterate after real usage

### 6.4 Stack

Only technologies **actually used** on the featured products. Do not claim one shared stack.

**Tennis Match:** Next.js · TypeScript · Supabase (Postgres, Auth, RLS, Storage, Realtime) · shadcn/ui · Tailwind · Vercel

**Preferito:** React 18 · TypeScript · Vite · React Router · TanStack Query · Supabase (Postgres, Auth, RLS, RPC, triggers) · shadcn/ui · Tailwind · Framer Motion · Vercel (SPA)

**Portfolio (this repo):** Next.js App Router · TypeScript · Tailwind · Motion · MDX/content modules · Vercel

No 40-logo cloud. Group on About as: Language / Framework / Data / Design / Deploy.

### 6.5 Close

Availability line from §3. Clickable email. Location: Bosnia and Herzegovina.

---

## 7. Case study template (same for both projects)

Recruiter scans ~90 seconds, then reads depth.

**Page spine, in this order:**

1. **Hero** — name, one sentence, live link, demo path, stack pills, role, year
2. **Overview in 4 numbers** — no fake user counts. Allowed: time, solo, capability, shipped/in use
3. **Context** — who, problem, why WhatsApp/Facebook/random booking fail
4. **Role & constraints** — solo, budget/time, intentional non-goals
5. **Goals** — 3 bullets, measurable if true
6. **UX flow** — horizontal steps with screenshots (strongest visual)
7. **Product decisions** — 4–6 of Problem → Options → Choice → Why
8. **Technical architecture** — one clean diagram + 3–5 implementation notes (no wall of code)
9. **Hard parts** — where he got stuck and how he solved it
10. **Outcome** — what runs today, what he learned, what he would do differently
11. **Next** — 3 smart improvements (product still lives)
12. **Links** — Live · Demo · GitHub only if allowed · next project

Sticky mini-nav: Overview / Decisions / Technical / Outcome.

**Writing:** English default, short, precise. Numbers over adjectives. No “passionate”, “leverage”, “robust solution”, “seamless experience”.

---

## 8. Featured work A — Tennis Match (flagship)

### 8.1 What it is

Live recreational tennis matchmaking community for Bosnia and Herzegovina. Connects players of similar level; challenges, scheduling time/venue, result confirmation, ELO rankings.

**Not:** court booking. **Not:** tournament platform. **Not:** an app that finds a match with zero user effort. The user sends a challenge; the app gives a fair frame.

Live: https://tennismatch.ba  
Public product: may be named, linked, screenshotted. **Mask other players’ personal data** (names, photos, messages) unless using the demo account.

Positioning (from live site, confirmed):

- Problem: not that you play solo — you don’t know who is your level
- For: recreational players who want a fair match, a clear agreement, a ranking that means something
- Not for: court reservation, tournaments, zero-effort auto-match

### 8.2 Role and status

| Field | Fact |
|---|---|
| Role | Solo: product, UI, backend, copy, legal |
| Status | Live, still in active development |
| Stack | Next.js + Supabase (Postgres, Auth, RLS, Storage, **Realtime**) + shadcn/ui + Tailwind + Vercel |
| Duration | **June–August 2026** |
| Product languages | Serbian primary; English from day one |
| Auth (observed + confirmed) | Google + email/password, forgot password, email confirmation |
| Mobile | Responsive web, **not** a PWA |
| Source | **Not public.** Architecture story only; no full repo |
| Legal on product | Terms + Privacy Policy exist on tennismatch.ba |
| Brand on portfolio | Tennis Match **logo allowed** |
| Public metrics | Has real users. **Do not publish counts.** Use “Live” / “In use” only |
| Year | **2026** (ship year for case study hero) |

### 8.3 Core flow (must be visual in the case study)

1. Register + short experience questionnaire → **provisional** playing level  
2. Search local players by level  
3. Send challenge; agree time and venue in-app  
4. Messages unlock **only after** challenge is accepted  
5. Enter result; counterpart confirms (or timeout / reject-to-admin); ELO on ranking (overall / weekly / monthly)

### 8.4 Feature set to show

- Smart pairing (level + ELO once ELO exists)
- Direct challenges
- ELO ranking: overall / weekly / monthly
- In-app messages after accept, with quick call links (Viber / WhatsApp / tel)
- Fair play: result confirmation + **Fair Play rating** (who confirms, who cancels)
- Search by level, city, and **surface**
- Both players confirm the scheduled time before the match
- Score entry **by set**
- ELO calculated **on the server**, not in the browser
- BiH venue list at scheduling — agreement only, **no booking**

### 8.5 Intentional product boundaries (maturity, not weakness)

- No court booking
- No tournaments in MVP
- Chat locked until challenge accepted (anti-spam / privacy)
- Challenges **do not expire** until accept or decline (35B)

### 8.6 State machine (confirmed)

```
sent → accepted | declined
accepted → scheduled → played → both confirmed | disputed
```

Reject of a submitted score → **admin decision** (disputed).  
Challenges do not auto-expire while in `sent`.

### 8.7 Rating rules (confirmed)

- New player has **no ELO**. Questionnaire → **provisional rank/level**.
- **ELO starts after 2 confirmed matches.**
- Do not start everyone at 1000.
- Exact questionnaire mapping and K-factor: treat as outline-from-product; Milan confirms copy. Do not invent a formula if unknown — describe the rule, not fake math.

### 8.8 Result confirmation (confirmed)

- One player enters the score; the other confirms.
- **Silence → auto-confirm after 2 hours.**
- **Reject → goes to admin for a decision** (disputed). ELO must not apply until resolved.
- ELO update must be **idempotent** (no double-apply on refresh).

### 8.9 Chat

- Unlocks only after accept
- Supabase Realtime
- Quick links: Viber / WhatsApp / tel

### 8.10 Venues

- Filled by Milan / admin
- Users do not crowd-source venues in v1 of the product
- Selection at schedule time; not a reservation system

### 8.11 Demo for recruiters

- **Live on tennismatch.ba:** one-click **Try demo** on the landing page — no registration, no credentials to publish.
- Demo account is isolated from real players (`is_demo` pool). Challenges, chat, and profile edits are blocked in demo mode.
- Portfolio CTA: link to live site demo button. **Do not** publish `DEMO_USER_*` env values.
- Screenshots may use the demo account; never use other people’s real player data.

### 8.12 Screenshot plan (minimum)

Shoot **after** copy/design OK. Prefer mobile-first. Mask real players.

1. Marketing landing (small; not the case-study hero)
2. Onboarding / level questionnaire
3. Player list with filter — **candidate for main shot**
4. Player profile
5. Send challenge
6. Inbox / chat after accept
7. Result entry + confirmation
8. Rankings (week / month / all)
9. Mobile view (required)

Optional: 15s silent WebM, autoplay muted in case-study hero — **v1 may ship without video** if not ready; do not block on it.

### 8.13 Product decisions the case study MUST cover

Format: Problem → Options → Choice → Why.

1. Cold start: questionnaire provisional rank, not everyone at 1000; ELO after 2 confirmed matches
2. Challenge as state machine (including scheduled + disputed)
3. Chat permission only after accept
4. Fair play: enter/confirm, 2h auto-confirm, reject → admin
5. Ranking windows: overall + weekly + monthly, not a single rank
6. Scope cut: tournaments and venue booking out of MVP

### 8.14 Technical depth to cover (adapt, don’t invent)

- Auth and profile
- Authorization / RLS: who sees whose data; who can confirm a match
- Player search by level / city
- Idempotent ELO update
- Realtime for challenges/messages
- Avatar upload if it exists (`TODO` confirm in screenshots)
- Deploy, env, backup, privacy / GDPR-ish
- Architecture diagram: Client → Auth → DB → jobs (ELO, challenge state, messages)

Clean diagram — not a Miro screenshot.

### 8.15 Hard parts and next (proposed from brief — Milan may correct)

**Proposed hard parts (label as his, but keep factual; he will correct):**

1. Cold-start rating without destroying the ladder
2. Challenge + result flow as a real state machine, not a boolean
3. Fair-play confirmation, timeout, and admin dispute without double-counting ELO

**Next (from case study — Milan confirmed direction):**

1. Player rewards for playing (engagement, not noise)
2. Online monthly subscription payment
3. Richer notifications without turning into a noisy social app

**Outcome line:** Live in production, in use, still iterating. No user counts.

### 8.16 Observed on tennismatch.ba (do not contradict without PRD update)

- Local-language marketing site
- Problem / 4-step process / 6 features match this PRD
- Auth: Google + email
- Terms and Privacy Policy linked
- Copyright 2026
- No public user counts on the landing

---

## 9. Featured work B — Preferito (client / local business)

### 9.1 What it is

Production scheduling and client-management product for a real salon — **not** “I made a website for a hairdresser.”

| Field | Fact |
|---|---|
| Public name | Preferito |
| Owner (public on live site) | Milijana Rudić |
| Positioning | Men’s barber / muški frizer, Mrkonjić Grad |
| Live URL | https://preferito.vercel.app |
| Canonical | Production. Ignore leftover tab title `test – …`; Milan will remove it |
| Stack | React 18 + TypeScript + Vite + React Router + TanStack Query + Supabase (Postgres, Auth, RLS, RPC, triggers) + shadcn/ui + Tailwind + Framer Motion + Vercel (SPA) |
| Role | Design + full-stack development |
| Year | **2026** |
| Users | **One salon**, in daily use |
| Staff | **One barber today.** App **technically supports multiple staff**; that is unused |
| Client accounts | Yes — `/booking` has login + register |
| Payments | None |
| SMS/email reminders | None |
| Overlap | Prevented **in the database**, not only UI |
| Hours | Working hours, breaks, holidays exist |
| Source | Not in this portfolio repo |

### 9.2 Real feature set (do not add extras)

Confirmed by Milan + live landing:

- Calendar / appointments with **20-minute slot grid**
- Services + duration + price (public on landing)
- Admin vs client roles; barber panel at `/frizer`; multi-staff **supported**, not used
- Statuses: booked / confirmed / done / no-show / cancelled
- **40-minute buffer** between clients (prep, cleanup — not a 30-min Zoom call)
- **Saturday bookings pending** until barber confirms; other days auto-confirmed
- **Two no-shows block** new bookings (DB trigger, not React-only)
- Beard add-on: +20 min on shorter services when noted
- Session timeout after **1 hour** of inactivity
- Client sees only **busy intervals** via RPC — not other clients’ appointments
- Working hours (published): Mon 09–17, Tue 11–19, Wed 09–17, Thu 11–19, Fri 09–17, Sat 09–16, Sun closed
- Cancellation: up to 2 hours before via app or phone
- Late > 10 minutes → appointment cancelled (business rule on landing)
- Client self-serve booking via `/booking`

Live landing also shows: gallery, address (Sime Šolaje bb), phone +387 65 065 632, Instagram, notes about beard add-on and weekend booking.

### 9.3 Case study decisions to cover

- Why custom app, not Booksy/Treatwell (write from operational control, no commission, local workflow — **do not invent a quote from the client**)
- Overlapping appointments: DB constraint, not only UI
- Privacy: who sees which clients (owner/admin vs client sees own)
- What the client asked vs what Milan proposed (`TODO` if unknown — ask, don’t invent)

### 9.4 Screenshot and privacy policy for the portfolio

**Allowed on the portfolio (already public on the landing):** salon name, owner name, prices, address, phone.

**Must mask:** real clients in calendar/admin (names, phones, notes).

**Recruiter access (32B):**

- There will be a **demo account that does not touch real appointments**.
- **Credentials do not exist yet.** Build the case study with a **Demo** block ready for email/password.
- Copy until then: demo credentials coming / on request — same pattern as Tennis Match.
- Do **not** invite recruiters to register on production and book real slots.

### 9.5 Services snapshot (from live site; verify before locking copy)

Use as reference, re-check if the live site changed:

- Šišanje i uređivanje brade — 23 KM / 60 min
- Fade, buzz cut, precizno šišanje duže kose — 15 KM / 40 min (+20 min with beard)
- Uređivanje brade — 8 KM / 20 min
- Dječije šišanje do 7 god — 7 KM / 20 min
- Hair wash after appointment — 5 KM

### 9.6 Overview numbers (no fake scale)

Allowed examples: Solo build · One business in production · Auth + calendar constraints · In daily use  
Do not invent “100+ clients” on the **portfolio** unless Milan explicitly allows quoting the salon landing stats.

---

## 10. About page

Four short, mature blocks. No clichés.

1. **Who** — two paragraphs: where he’s from (BiH), what he builds, end-to-end
2. **How** — problem first, ship small, edge cases, clear communication
3. **Stack & tools** — Language / Framework / Data / Design / Deploy
4. **Looking for** — full-time product team **and** selected freelance; remote from BiH

One human sentence (tennis / why Tennis Match exists). Not a full biography.

Photo: placeholder. CV: placeholder until content exists.

---

## 11. Contact page

- Mailto: jagodicm2002@gmail.com
- Short form that works (Resend or Formspark); keep fields minimal (name, email, message)
- One availability sentence
- No Calendly in v1
- LinkedIn: https://www.linkedin.com/in/milan-jagodić-83b9ba204/
- GitHub: https://github.com/Milan-github20 (profile only). Do not publish Tennis Match or Preferito source.

Form + analytics ⇒ include a short privacy note on the portfolio (`TODO` exact legal text; do not copy-paste Tennis Match policy blindly).

---

## 12. Visual direction (locked)

**Look:** light cinematic portfolio by default, with a dark option. Editorial product site — not a template, not circus.

| Token | Decision |
|---|---|
| Theme | **Light default** (warm sand / peach / dusty blue wash + rust accent). Dark cinematic is optional via toggle. |
| Color | Warm paper + deep brown ink + rust (`#C23A12`) + soft peach and dusty-blue washes. **No Tennis Match green.** |
| Type | One strong display + clean sans for body. Large titles, lots of air, full-bleed project heroes |
| Grid | 8px. Consistent spacing |
| Motion | **Rich but disciplined:** page transitions, scroll reveal, sticky case-study nav, project-card hover, layout animations, cmd+k. See §4 bans |
| Screenshots | Tidy device mockups, subtle glow, slight perspective. Not raw full-bleed PNGs |
| Priority shots | Mobile-first (both products are used on phones) |
| Performance | Part of the brand: Lighthouse green, AVIF/WebP, subset fonts, `next/image`, blur placeholder |
| A11y | Keyboard, contrast, alt text |

**Wow comes from type + layout + writing, not effects.** No neo-brutalist offset shadows.

Extras that separate 7/10 from 9.5/10:

- Custom OG per case study (LinkedIn-ready)
- cmd+k
- Next-project preview
- Custom 404
- Architecture diagrams drawn cleanly
- Tennis Match before/after: WhatsApp chaos vs in-app flow

---

## 13. Portfolio engineering (this repo is the third project)

**Preferred stack (confirmed):**

- Next.js App Router + TypeScript
- MDX for case studies (edit as articles; layout stays consistent)
- Tailwind + a small set of custom components. No huge UI kit
- Motion library for page/hero/scroll — modest API, rich choreography within §4
- `next/image`
- Sitemap, robots, metadata, JSON-LD Person
- Deploy: Vercel
- GitHub: public when v1 works; README how to build and which env vars
- i18n: EN + `sr` in v1

Workspace today: Next.js 16 + React 19 + Tailwind 4 + TypeScript starter. Replace the default template entirely.

**Do not** put Tennis Match or Preferito application source, `.env` secrets, or real customer rows in this repo.

---

## 14. Copy rules

- English default; Serbian toggle
- Milan supplies facts; agent proposes copy; **Milan approves**
- Never invent users, metrics, clients, features, years, or stack
- Unknown → `TODO` in the PRD or in MDX, then ask
- Tone: calm, precise, confident, no hype
- Hero and case-study hooks stay short

---

## 15. Placeholders (ship the slot, not fake content)

| Slot | Until Milan provides |
|---|---|
| Domain | Vercel URL |
| GitHub URL | https://github.com/Milan-github20 — profile only. App source stays private. |
| LinkedIn URL | https://www.linkedin.com/in/milan-jagodić-83b9ba204/ |
| Photo | About/hero placeholder |
| CV PDF | Page exists; Milan edits `lib/content/cv.ts` then prints A4. Optional exported PDF later |
| Tennis Match demo | **Live** — one-click on tennismatch.ba landing; no credentials in portfolio |
| Preferito demo email/password | Same; **must not hit real calendar** |
| Screenshot folder | Shot lists in §8.12; shoot after copy/design OK |
| TM hard parts / next | Use §8.15 |

---

## 16. Definition of done

v1 is done when:

- Recruiter knows in 10s who Milan is and that a live product exists
- In 90s understands Tennis Match problem → flow → role
- Can click live TM + **Try demo** on the landing page
- Preferito is a real B2B case, not a filler card; demo slot ready
- Case studies have product decisions, not only a screenshot gallery
- Site is fast, readable on phone, accessible, tidy
- No lies, no empty hype, no template feel
- About and Contact work; CV is one click **or** an honest placeholder
- OG images work when the link is shared
- English is clean; Serbian toggle works
- Lighthouse performance/a11y are green on the bar that matters

---

## 17. Implementation sequence

1. Keep this PRD updated  
2. IA + visual tokens (type, palette, spacing) — wait for OK if they change  
3. Copy outline: homepage + Tennis Match, then Preferito + About/Contact — wait for OK  
4. Build: chrome → home → TM case study → Preferito → About → Contact → 404/OG/i18n  
5. Screenshots and demo credentials last  

If time is short: **homepage + one perfect Tennis Match case study** beats two half-done projects. Current scope decision is still **full v1 (19A)** unless Milan cuts it.

---

## 18. Open TODOs (ask before inventing)

- [ ] Personal domain
- [x] GitHub profile URL — https://github.com/Milan-github20 (Tennis Match / Preferito source stays private)
- [x] LinkedIn URL — https://www.linkedin.com/in/milan-jagodić-83b9ba204/
- [ ] Photo
- [x] CV content → draft at `/cv`; Milan fills Računari role, Apeiron programme, optional phone/GitHub/LinkedIn; then print A4
- [ ] Tennis Match demo credentials in portfolio repo (not needed — live button on product)
- [ ] Preferito demo credentials (isolated from real bookings)
- [ ] Confirm avatar upload exists in TM
- [ ] Preferito: client asked vs Milan proposed
- [ ] Exact ELO formula / questionnaire mapping (describe rules, don’t fake K-factor)
- [ ] Portfolio privacy note text
- [ ] Screenshot set + optional 15s TM video
- [ ] Preferito remove `test` from document title on the live app
- [ ] Form provider choice: Resend vs Formspark (agent may pick the simpler working option)
- [ ] Plausible vs Umami (agent may pick)

---

## 19. Decision log (discovery)

| ID | Decision |
|---|---|
| 1A | Name: Milan Jagodić |
| 2A | Title: Full-stack Developer |
| 3C | Full-time + freelance |
| 4 | No domain; EN default + BH; social later |
| 5B | Next + Supabase + realtime + Vercel |
| 6A | TM solo all the way; live; still developing |
| 7B | Users exist; public copy = Live / In use only |
| 8C | TM demo live on tennismatch.ba landing (Try demo); portfolio links to product, no credentials |
| 9B | Internals mostly as brief; Milan confirms outline |
| 10C | Screenshots after copy/design OK |
| 11A | Preferito real name + screenshots; mask clients |
| 12B | Calendar, services, prices, duration, admin, statuses; **staff multi-support unused** (see 31B) |
| 13A / 33A | Public live URL preferito.vercel.app; production |
| 14A | One salon; solo build; **Preferito stack is React/Vite, not Next.js** |
| 15B | Light, editorial; first pass was fully neutral |
| 39A | 2026-08-17: Milan rejected the beige-only first pass. Keep light + editorial; add one rust accent (`#C23A12`). Still no TM green, no dark mode, max 3 colors. |
| 40A | 2026-08-18: Milan chose **dark cinematic** portfolio. Near-black + warm off-white + rust accent. Replaces 15B/39A light lock for the portfolio site. |
| 43A | 2026-08-18: Locale is **Serbian (`sr`)**, not Bosnian. `/bs` redirects to `/sr`. |
| 44A | 2026-08-18: Light theme is default (warm sand, peach, dusty blue, rust). Dark remains available via toggle. |
| 41A | TM duration June–August 2026; Fair Play rating; server-side ELO; demo live on landing |
| 42A | Preferito: 40-min buffer, Saturday pending, 2 no-show block, RPC busy intervals, React/Vite stack |
| 16 | Photo later (placeholder); CV draft at `/cv` from 2026-08-18; cmd+k yes; **rich** motion within bans |
| 43A | 2026-08-18: CV facts from Milan — Računari d.o.o. from Mar 2022, role Frontend Developer; React.js, HTML, CSS, JavaScript; collaborates with backend; UI/UX and performance. Apeiron from 2021 (ongoing), programme Programming and software engineering. UKC / Vodovod Čelinac were spoken examples only — not on the CV. |
| 17A | Next App Router + TS + MDX + Tailwind + Vercel; GitHub public |
| 18 | Mailto + short form + Plausible/Umami; EN + BH |
| 19A | Full site in v1 |
| 20A | Agent drafts EN copy; Milan approves; TM logo OK; mask players |
| 21A | Challenge states including scheduled + disputed |
| 22A + 34 | Provisional from questionnaire; ELO after **2** confirmed matches |
| 23 + 34 | One enters; other confirms; **2h auto-confirm**; reject → **admin** |
| 24A | Chat after accept; Viber/WhatsApp/tel |
| 25A | Admin venues; not PWA; TM source private |
| 26 | Preferito @ preferito.vercel.app |
| 27A+C | DB overlap constraint; no SMS/pay; in use; hours/breaks/holidays |
| 28A | Availability now; email jagodicm2002@gmail.com |
| 29 | Agent decides motion = rich + §4 bans |
| 30 | EN+BH; networks/photo/CV placeholders |
| 31B | One barber now; multi-staff supported unused |
| 32B | Demo account planned; build as if it will exist; not created yet |
| 35B | Challenges do not expire until accept/decline |
| 36A | Location: Bosnia and Herzegovina only |
| 37B | TM year 2026; propose next/hard parts from brief |
| 38A | Preferito public landing facts allowed; mask calendar clients |
| 44A | 2026-08-18: LinkedIn https://www.linkedin.com/in/milan-jagodić-83b9ba204/ . GitHub profile https://github.com/Milan-github20 . TM and Preferito source stay private. |
