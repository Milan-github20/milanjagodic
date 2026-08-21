# Milan Jagodić — portfolio

Personal site for **Milan Jagodić**, full-stack developer. English by default, Serbian at `/sr`. Live products: [Tennis Match](https://tennismatch.ba) and [Preferito](https://preferito.vercel.app).

This repo is the portfolio only. Application source for Tennis Match and Preferito stays private.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Motion · Vercel

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `/` redirects to `/en`.

```bash
npm run build
npm run start
```

## Environment

Copy into `.env.local` (do not commit secrets):

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL. Defaults to `https://milanjagodic.vercel.app`. |
| `FORMSPARK_ID` | No | Enables the contact form. Without it, submissions are logged on the server. |

## Routes

| Path | Page |
|---|---|
| `/en`, `/sr` | Home |
| `/en/work/tennis-match` | Tennis Match case study |
| `/en/work/preferito` | Preferito case study |
| `/en/about` | About |
| `/en/contact` | Contact |
| `/en/cv` | CV (print to A4 from `lib/content/cv.ts`) |

`/bs` redirects to `/sr`. Command palette: `Ctrl+K` / `Cmd+K`.
