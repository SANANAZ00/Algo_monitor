# ALGO · Algae Biorefinery Project

Next.js 15 (App Router) + Tailwind CSS 3 + TypeScript. No images or external services needed.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
```

## Deploy

Push to GitHub, then import the repo on [vercel.com/new](https://vercel.com/new). Defaults work, no settings needed.

## Where things live

| What | Where |
| --- | --- |
| All text, products, steps, references | `lib/data.ts` |
| Home page | `app/page.tsx` |
| Product pages (`/products/oil`, `/feed`, `/biostimulant`) | `app/products/[slug]/page.tsx` |
| Project document (shareable) | `app/docs/page.tsx` |
| Interactive demos | `components/demos/` |
| SVG illustrations | `components/art.tsx` |
| Downloadable poster | `public/ALGO-project-poster.pdf` |

Benefits are goals to be validated through testing.
