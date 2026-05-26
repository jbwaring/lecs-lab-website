# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Astro 6 static site for **LECS** (Laboratory for Emerging Computing Systems, Concordia University ECE). Visual language mirrors concordia.ca — Concordia maroon `#912338`, Inter body, Gill Sans accents. Plain CSS in `src/styles/global.css`, no framework. Deployed on Vercel.

Node `>=22.12.0`.

## Commands

- `npm run dev` — dev server at `localhost:4321`
- `npm run build` — static build to `./dist/`
- `npm run preview` — serve the production build
- `node scripts/sweep.mjs` — run dev first, then this Puppeteer script checks every route at widths 320/360/414/768/1024/1440 and reports horizontal overflow (`docW != viewport`)
- `node scripts/inspect.mjs <route> <width>` — find the widest overflowing element on a single page (dev server must be running)
- `node scripts/screenshot.mjs [tag]` — capture viewport + full-page PNGs for the canonical route set into `/tmp/lecs-shots/<tag>/`

No test suite, no linter, no type-check script — rely on `astro build` (runs `astro check`-equivalent collection validation via Zod) to catch breakage.

## Architecture

### Content model

Two sources of content live side-by-side:

1. **Astro content collections** (`src/content/`) — the source of truth for **people** and **publications**. Schemas in `src/content.config.ts` use Zod with `glob` loaders over `**/*.json`. The `labMemberId` enum is the canonical roster — adding a person means (a) creating `src/content/people/<id>.json`, (b) extending the `labMemberId` enum, and (c) optionally tagging their publications via `labMembers`. The `topic` enum is shared between publication `topics` and person `areas`.
2. **`src/data/lecs.ts`** — static content that is NOT in a collection: `researchAreas`, `news`, `articles` (long-form notes), plus role/area labels and date helpers. `articles` is marked as HELD — `relatedPub` slugs from the original synthetic dataset may not resolve against the current arXiv-mirrored publications; pages must handle missing links gracefully.

PDFs are mirrored locally to `public/papers/<basename>.pdf`; publications point at them via `pdfPath`. If no local mirror exists, `pdfPath` is `null` and the UI falls back to `arxivPdf` / `openAccessUrl`.

### People ordering and author resolution

`src/lib/people.ts` centralizes two non-obvious behaviors used across pages:

- **`getOrderedPeople()`** — the PI (`role === "supervisor"`) is always pinned first; others sort alphabetically by `sortKey` (family-name form). Sébastien's `sortKey` is `"Le Beux"` because the algorithmic split would pick `"Beux"`.
- **`findPersonByAuthorTag()`** — maps a free-form author string on a publication (`"Sébastien Le Beux"`, `"S. Le Beux"`, `"S. L. Beux"`, `"Le Beux, S."`, `"Waring, J.-B."`) to a `PersonEntry`. Handles compound surnames and the abbreviated `"L. Beux"` form. Use this — do not write ad-hoc matching at call sites.

### i18n (EN + FR)

`astro.config.mjs` sets `prefixDefaultLocale: false` → EN routes live at the root (`/`, `/articles`, `/profile/[id]`); FR mirrors live under `/fr/` (`/fr/`, `/fr/articles`, `/fr/profile/[id]`). Every FR page under `src/pages/fr/` is a parallel file, NOT a router rewrite — keep them in sync when adding sections or props.

All copy goes through `t(locale, key)` from `src/lib/i18n.ts`, backed by the `strings` table in `src/i18n/strings.ts`. Helpers:

- `detectLocale(pathname)` — `"fr"` if `/fr` prefix, else `"en"`
- `localizePath(path, locale)` — prepends `/fr` for FR
- `counterpartPath(pathname, locale)` — the EN↔FR pair, used by the language toggle in `Layout.astro`
- `fmtDate` / `fmtDateLong` — locale-aware via `month.short.<n>` / `month.long.<n>` keys (do NOT call `Intl.DateTimeFormat` ad-hoc; the i18n table is the source of truth)

When adding a string, add **both** `en` and `fr` entries in `src/i18n/strings.ts`. The `t()` helper silently falls back to EN on missing FR keys, which masks bugs.

### Layout and chrome

`src/layouts/Layout.astro` is the single page shell — utility breadcrumb bar, brand header, nav, language toggle, footer. Pages pass `activeNav`, optional `crumbs`, `condensedFooter`, and may override `locale` (useful for the FR mirrors which would otherwise have to re-detect).

Nav structure is defined inside `Layout.astro`; the hamburger drawer is moved to `body` level via a portal pattern so its z-index escapes the header stacking context (see commit `4763386` for the rationale — don't undo this).

### Components

`src/components/` holds the reusable islands: `HomeHero`, `PersonCard`, `Avatar`, `NewsCard`, `NewsThumb`, `ArticleThumb`, `PublicationRow`. The People and Publications filters are interactive islands hydrated inline in `src/pages/index.astro`.

### Pages

```
src/pages/
  index.astro              landing (about / research / people / news / publications / join)
  articles.astro           article listing
  article/[slug].astro     article detail (reads articles[] from data/lecs.ts)
  profile/[id].astro       person detail
  publication/[slug].astro paper detail
  404.astro
  fr/                      FR mirrors of all of the above
```

`index.astro` synthesizes the News section from the 6 most-recent publications when the static `news` array runs thin — see the `newsFromPapers` block.

## Responsive QA

Layout must not produce horizontal scroll at any width down to 320 px. Use the Puppeteer scripts above after layout changes — `sweep.mjs` for a fast pass, `inspect.mjs` to localize an offender. See recent commits (`46b9862`, `4763386`) for the bugs these scripts caught.

## Editing content

Per the README, "lab content lives in `src/data/lecs.ts` — edit that one file" is **only true for** research areas, news, and articles. For people and publications, edit the JSON under `src/content/{people,publications}/`. When in doubt, the Zod schema in `src/content.config.ts` defines the contract — the build will fail loudly on mismatch.
