# Test plan — content collections + CMS

This is the verification recipe for the migration in this branch and for
the CMS once it is live. Run it after any structural change to
collections, the schema, or the editor config.

## Levels

| Level | What it covers                                                | Cost  |
|-------|---------------------------------------------------------------|-------|
| 1     | Build + schema validation                                     | sec   |
| 2     | HTTP smoke (every route returns the expected status)          | sec   |
| 3     | Render parity (key fields appear correctly on each page)      | min   |
| 4     | Responsive QA (no horizontal overflow at any width)           | ~min  |
| 5     | CMS round-trip (manual, post-deploy)                          | ~5min |
| 6     | Approval / branch-protection enforcement (manual, post-deploy) | ~5min |

Run levels 1–4 locally before merging any branch. Run 5–6 once after
the OAuth proxy and branch protection are configured for the first time
(or whenever those settings change).

## Level 1 — Build + schema validation

```sh
npm run build
```

Expected: exit 0; final line reads `[build] N page(s) built in …s`.
Current baseline: **125 pages**.

What this proves:

- Every JSON / MDX entry in `src/content/{people,publications,articles,news}/`
  parses against the Zod schema in `src/content.config.ts`. A typo in a
  topic enum value, a missing required field, or a bad date string fails
  here.
- All page routes that depend on those collections resolve their
  `getStaticPaths`. Article slug routes (EN + FR) come from MDX
  frontmatter; if a slug is duplicated, this fails.

Failure modes worth knowing:

- `Could not parse entry frontmatter` → the MDX frontmatter is malformed
  (most often a quote not closed, or a `:` inside an unquoted value).
- `Expected one of …` → a `topics` or `role` value isn't in the enum.
  Update the file OR extend the enum in `src/content.config.ts` (and
  mirror in `public/admin/config.yml`).
- `pages built` count drops unexpectedly → one of the dynamic routes is
  silently empty. Most often a renamed collection or a wrong glob.

## Level 2 — HTTP smoke

With `npm run dev` running on `http://localhost:4321`:

```sh
for r in / /articles /article/yield-from-the-foundry \
         /article/from-lyon-to-montreal \
         /fr/ /fr/articles /fr/article/spiking-edge-2025 \
         /publication/noise-aware-utility-nisq-2024 \
         /profile/sebastien-le-beux \
         /this-does-not-exist; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:4321$r")
  echo "$code  $r"
done
```

Expected: every real route `200`; `/this-does-not-exist` is `404`.
**Note**: Astro dev binds IPv6 first — use `localhost`, not `127.0.0.1`.

When the article slug list changes, update the article slugs in the
script. The full list is `ls src/content/articles/`.

## Level 3 — Render parity

For each of the article pages: open in a browser (or `curl | grep`) and
confirm:

- The title (`<h1>`), date (`venue-row`), tag pill, topic pills, and
  excerpt (`abstract-block`) all match the MDX frontmatter.
- The body renders as `<p>` tags — one per blank-line-separated paragraph.
  If the body is rendered as a single line of `\n`-separated text, MDX
  is not being parsed (check `@astrojs/mdx` in `astro.config.mjs`).
- The reading-time figure looks plausible (≥ 2 min). The helper is
  `readingTime(article.body)` from `src/lib/i18n.ts` and counts
  whitespace-separated tokens.
- The author byline links to `/profile/<id>` when the article's
  `author` frontmatter matches a `people` entry's `name` exactly.
- The "Related articles" sidebar contains articles that share at least
  one topic. Open one to make sure the link resolves.
- "Companion paper" block appears only when the article's `relatedPub`
  resolves to a publication slug. (Several of our articles have a
  `relatedPub` that doesn't exist yet — this is expected and the page
  must render normally without it.)

Home page News section — verify that:

- It shows **exactly 6 cards**, sorted newest first.
- It contains a mix of editor-authored items (tags like `Award`, `Talk`,
  `Funding`) AND auto-synthesized paper items (tag `Paper`). The merge
  is done in `src/pages/index.astro` (and the FR mirror).

Spot-check parity for `/fr/` mirrors: same content, French chrome.

## Level 4 — Responsive QA

With `npm run dev` running:

```sh
node scripts/sweep.mjs
```

Expected: every route × width combo shows `✓` (document width equals
viewport width — no horizontal scroll). Widths tested: 320, 360, 414,
768, 1024, 1440.

If a row fails, drill into the offender:

```sh
node scripts/inspect.mjs <route> <width>
```

The script reports the widest overflowing element and a CSS path.

Note: `scripts/sweep.mjs` and `scripts/inspect.mjs` hit `127.0.0.1`. If
your dev server only binds IPv6 (`::1`), they will fail with `ERR_CONNECTION_REFUSED`.
Either edit the script's `BASE` constant temporarily or start the dev
server with `npm run dev -- --host 127.0.0.1`.

## Level 5 — CMS round-trip (manual, after OAuth proxy is deployed)

Pre-requisite: OAuth proxy URL set in `public/admin/config.yml`,
GitHub repo set in `backend.repo`, and you are a collaborator on the
repo.

1. Open `https://<site>/admin/`. Log in with GitHub.
2. **People** → pick any non-PI member → change a non-visible field (e.g.
   `office`) → **Save**.
3. Expect: a new branch + a draft PR appear in the GitHub repo within
   a few seconds.
4. Vercel posts a preview deployment URL on the PR conversation within
   ~30 seconds.
5. Open the preview URL. Navigate to that person's profile page.
   Confirm the change is present.
6. In the CMS, set the entry status to **Ready**.
7. Sveltia attempts to merge the PR. If branch protection is configured
   (level 6), the merge is blocked for non-prof accounts — which is the
   desired behavior.

Repeat the round-trip for:

- A new **Article** (create from scratch in the CMS).
- A new **News** item.
- An edit to a **Publication** (changing the abstract).

This proves the CMS, the OAuth proxy, the editorial workflow, and Vercel
previews are all wired up.

## Level 6 — Branch-protection enforcement

Pre-requisite: `main` is protected (Settings → Branches → require PR
review, restrict push, require status checks).

1. Have a **non-prof** account try to merge the PR from level 5. Expect:
   GitHub UI shows "Merging is blocked — at least 1 approving review is
   required" (or similar).
2. As the **prof**, click **Approve** in the PR review UI.
3. Have the webmaster (or prof) merge the PR.
4. Vercel redeploys `main`. The live site reflects the change within
   ~1 minute.
5. Negative test: try to push directly to `main` from a non-admin local
   clone. Expect: `! [remote rejected] main -> main (protected branch hook
   declined)`.

If step 1 succeeds (the non-prof can merge), branch protection is not
configured correctly and this is a serious gap. Fix before onboarding
members.

## Adding a new collection or field — what to re-test

When you extend the schema:

| Change                                  | Re-run                            |
|-----------------------------------------|-----------------------------------|
| Add field to existing collection        | Level 1, then 3 (the affected page) |
| Add new collection                      | Level 1 + level 2 + level 5       |
| Add value to `topic` / `role` enum      | Level 1; mirror in `public/admin/config.yml`; level 5 |
| Add a new lab member ID                 | Level 1; mirror in BOTH `src/content.config.ts` AND `public/admin/config.yml._lab_member_options`; level 5 |

The enum mirroring between Zod and the CMS config is the most common
source of "works in dev, breaks in CMS" issues. Always grep both files
when changing one.
