# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Astro 6 static site for **LECS** (Laboratory for Emerging Computing Systems, Concordia University ECE). Visual language mirrors concordia.ca — Concordia maroon `#912338`, Inter body, Gill Sans accents. Plain CSS in `src/styles/global.css`, no framework. Deployed on Vercel.

Node `>=22.12.0`.

## Commands

- `npm run dev` — dev server at `localhost:4321` (binds IPv6 first; if scripts using `127.0.0.1` fail, use `localhost` or `--host 127.0.0.1`)
- `npm run build` — static build to `./dist/`; current baseline **125 pages**
- `npm run preview` — serve the production build
- `node scripts/sweep.mjs` — run dev first, then this Puppeteer script checks every route at widths 320/360/414/768/1024/1440 and reports horizontal overflow (`docW != viewport`)
- `node scripts/inspect.mjs <route> <width>` — find the widest overflowing element on a single page (dev server must be running)
- `node scripts/screenshot.mjs [tag]` — capture viewport + full-page PNGs for the canonical route set into `/tmp/lecs-shots/<tag>/`

No test suite, no linter, no type-check script — rely on `astro build` (validates collections via Zod) to catch breakage. The full verification recipe is in [`docs/TESTING.md`](docs/TESTING.md) — six levels from build/schema through CMS round-trip and branch-protection enforcement.

## Architecture

### Content model

Four Astro content collections under `src/content/`, all schema-validated in [`src/content.config.ts`](src/content.config.ts):

| Collection     | Files                                | Loader glob   |
|----------------|--------------------------------------|---------------|
| `people`       | `src/content/people/<id>.json`       | `**/*.json`   |
| `publications` | `src/content/publications/*.json`    | `**/*.json`   |
| `articles`     | `src/content/articles/*.mdx`         | `**/*.mdx`    |
| `news`         | `src/content/news/*.json`            | `**/*.json`   |

Three enums in `content.config.ts` are the canonical lists:

- **`labMemberId`** — the lab roster. Adding a person means (a) `src/content/people/<id>.json`, (b) extending the enum, (c) optionally tagging their publications via `labMembers`.
- **`role`** — used by `people.role`.
- **`topic`** — shared between `publications.topics`, `people.areas`, and `articles.topics`. Same values, same labels.

When any of these change, also mirror the change in `public/admin/config.yml` (the CMS schema is a parallel copy — see "CMS" below).

`src/data/lecs.ts` only holds content that is not edited frequently and does not warrant a CMS surface: `researchAreas`, `roleLabel` / `rolesOrder` / `roleShortLabel`, `areaTitle`, and `lab` metadata (address, phone). Edit it via a regular PR.

PDFs are mirrored locally to `public/papers/<basename>.pdf`; publications point at them via `pdfPath`. If no local mirror exists, `pdfPath` is `null` and the UI falls back to `arxivPdf` / `openAccessUrl`.

### News section composition

The home page News grid is **merged** from two sources in `src/pages/index.astro` (and the FR mirror): the `news` collection (editor-authored) and a synthesized list of the 6 most-recent publications (`newsFromPapers`). Both lists are concatenated, sorted newest first, and sliced to 6. So editor news displaces paper-derived entries when it is newer. Don't reintroduce a "show only one source" path without removing the other.

### Articles (MDX)

Article pages render the MDX body via `render()` from `astro:content`:

```ts
import { render } from "astro:content";
const { Content } = await render(article);
// ...
<Content />
```

Reading time is computed from `article.body` (raw Markdown) by `readingTime()` in `src/lib/i18n.ts`, which accepts `string | string[]`. The frontmatter `relatedPub` slug is best-effort — articles whose companion paper isn't in the publications collection still render normally, just without the "Companion paper" block.

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
- `readingTime(body)` — accepts a Markdown string OR a paragraph array

When adding a string, add **both** `en` and `fr` entries in `src/i18n/strings.ts`. The `t()` helper silently falls back to EN on missing FR keys, which masks bugs.

### Layout and chrome

`src/layouts/Layout.astro` is the single page shell — utility breadcrumb bar, brand header, nav, language toggle, footer. Pages pass `activeNav`, optional `crumbs`, `condensedFooter`, and may override `locale` (useful for the FR mirrors which would otherwise have to re-detect).

Nav structure is defined inside `Layout.astro`; the hamburger drawer is moved to `body` level via a portal pattern so its z-index escapes the header stacking context (see commit `4763386` for the rationale — don't undo this).

### Components

`src/components/` holds the reusable islands: `HomeHero`, `PersonCard`, `Avatar`, `NewsCard`, `NewsThumb`, `ArticleThumb`, `PublicationRow`. The People and Publications filters are interactive islands hydrated inline in `src/pages/index.astro`. `NewsCard` accepts the shared `NewsItem` type from `src/data/lecs.ts` — both editor-authored news items and synthesized paper items conform to it.

### Pages

```
src/pages/
  index.astro              landing (about / research / people / news / publications / join)
  articles.astro           article listing (reads from `articles` collection)
  article/[slug].astro     article detail; renders MDX body via render()
  profile/[id].astro       person detail
  publication/[slug].astro paper detail
  404.astro
  fr/                      FR mirrors of all of the above
```

## CMS (`/admin/`)

The site ships a Sveltia CMS (Decap-compatible, git-backed) at `/admin/` so lab members can edit content through a web UI. Configuration lives in:

- `public/admin/index.html` — loads the Sveltia bundle from a CDN
- `public/admin/config.yml` — collection + field definitions, editorial workflow on

Every CMS save opens or updates a Pull Request against `main`. Vercel builds a preview deployment per PR. Branch protection on `main` enforces that only the prof can approve a merge. The full editor workflow and the one-time infrastructure setup (GitHub OAuth App + Cloudflare Worker auth proxy + branch protection + collaborator invites) are documented in [`docs/CMS.md`](docs/CMS.md).

**Schema-mirroring trap:** `public/admin/config.yml` duplicates the field shapes in `src/content.config.ts`. The CMS does not read Zod; the build does not read the YAML. When you change one — adding a `topic` value, a new `labMemberId`, a new field on `people` — grep both files and update both, or you get "looks fine in dev, breaks in the CMS" failures. The `_topic_options`, `_role_options`, and `_lab_member_options` YAML anchors in `config.yml` are the things to keep in sync.

## Responsive QA

Layout must not produce horizontal scroll at any width down to 320 px. Use the Puppeteer scripts above after layout changes — `sweep.mjs` for a fast pass, `inspect.mjs` to localize an offender. See recent commits (`46b9862`, `4763386`) for the bugs these scripts caught.

## Editing content — quick reference

| Content type                          | Editor surface                                |
|---------------------------------------|-----------------------------------------------|
| People, publications, articles, news  | CMS at `/admin/` (preferred) OR JSON/MDX file under `src/content/` |
| Research areas, role labels, lab metadata | `src/data/lecs.ts` via regular PR         |
| Site copy (chrome, labels)            | `src/i18n/strings.ts` (EN + FR both required) |
| Page layout / templates               | `.astro` files under `src/pages/`, `src/components/`, `src/layouts/` |

When in doubt, the Zod schema in `src/content.config.ts` defines the contract — the build will fail loudly on mismatch.
