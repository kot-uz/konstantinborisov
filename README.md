# Konstantin Borisov — Portfolio

Personal portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for Production

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework is detected as **Next.js** automatically — no extra config needed.
4. Click **Deploy**.
5. To use a custom domain (`konstantinborisov.dev`), go to **Project Settings → Domains** and add it, then update your DNS records as shown.

No environment variables are required.

## Editing Content

All portfolio content lives in `src/data/` — edit these files without touching any UI components:

| File | What it controls |
|---|---|
| `src/data/site.ts` | Name, title, description, domain, nav links |
| `src/data/skills.ts` | Skill groups and technologies |
| `src/data/projects.ts` | Project cards (name, description, tech, links) |
| `src/data/experience.ts` | Work history timeline |
| `src/data/socials.ts` | Email, GitHub, Telegram, LinkedIn |

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (base-nova style, blue accent)
- **Framer Motion** (scroll-reveal animations)
- **next-themes** (dark/light mode)
- **Lucide React** (icons)
