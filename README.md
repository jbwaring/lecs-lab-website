# LECS — Laboratory for Emerging Computing Systems

Astro v6 site for the [Laboratory for Emerging Computing Systems](https://sites.google.com/site/lebeux/)
at Concordia University, in the visual language of [concordia.ca](https://www.concordia.ca).

## Pages

- `/` — landing page (hero, about, research, people, news, publications, join)
- `/profile/[id]` — individual profile per person
- `/articles` — long-form research notes listing
- `/article/[slug]` — article detail
- `/publication/[slug]` — paper detail (IBM-research-style)

Lab content lives in [`src/data/lecs.ts`](src/data/lecs.ts) — edit that one file to
update people, news, publications, and articles.

## Commands

| Command            | Action                                       |
| ------------------ | -------------------------------------------- |
| `npm install`      | Install dependencies                         |
| `npm run dev`      | Local dev server at `localhost:4321`         |
| `npm run build`    | Build to `./dist/`                           |
| `npm run preview`  | Preview the production build locally         |

## Stack

- [Astro 6](https://astro.build/) — static rendering with islands for the people / publications filters
- `astro:assets` — responsive WebP for the hero photo
- [`@vercel/analytics`](https://vercel.com/docs/analytics) — page-view analytics on Vercel
- Plain CSS in `src/styles/global.css` (no framework) — Concordia maroon `#912338`, Inter for body, Gill Sans for accents

Hero photograph: silicon wafer macro by [Laura Ockel](https://unsplash.com/@viazavier), via Unsplash.
