# Editing the LECS website

This site uses **Sveltia CMS** — a small web editor at
`https://<site>/admin/` — backed by GitHub. Every edit you make becomes a
Pull Request that the professor approves before it goes live. There is no
database; the content lives as files in the git repository.

## For lab members

### One-time setup (your account)

1. The webmaster will invite you as a **collaborator** on the GitHub
   repository. You will get an email — accept the invitation.
2. Open `https://<site>/admin/` in any browser. Click **Login with GitHub**
   and authorise the app.

You do not need to install anything, and you do not need to learn git.

### Editing your profile

1. Go to `https://<site>/admin/`.
2. Open the **People** collection in the left sidebar.
3. Click your name.
4. Update the fields — bio, role, areas, links — and click **Save**.
5. Above the editor, change the status from **Draft → In Review**.
6. The webmaster is notified. They will paste the **preview URL** into the
   review thread and send it to the professor.
7. Once the professor approves, your change goes live within ~1 minute.

If you spot something wrong with your draft before submitting, stay in
**Draft** status — only **In Review** signals "ready for the webmaster".

### Drafting an article

1. **People → Articles → New article**.
2. Fill in the metadata:
   - **Slug** — lowercase, hyphenated, unique (e.g. `my-new-article`).
     This becomes the URL.
   - **Date** — `YYYY-MM-DD`.
   - **Tag** — short category label (e.g. `Research note`, `Engineering`).
   - **Author** — must match a person's full **Name** exactly so the page
     links to your profile.
   - **Related publication slug** — optional; the slug of the paper this
     article discusses.
   - **Topics** — at least one. Used by the article filter.
   - **Title**, **Excerpt** (one paragraph), **Body** (Markdown).
3. **Save → status In Review**.

### What "Draft / In Review / Ready" mean

| Status     | Who acts next | What happens                                       |
|------------|---------------|----------------------------------------------------|
| Draft      | You           | Your change exists as a draft PR. Not yet visible. |
| In Review  | Webmaster     | Webmaster shares preview with the professor.       |
| Ready      | Webmaster     | Webmaster merges the PR; the change goes live.    |

You can always go back to a saved Draft and keep editing.

## For the webmaster

You play two roles:

1. **Funnel between members and the professor.** When a draft goes to
   *In Review*, take the preview URL (it appears as a Vercel comment on
   the PR) and forward it to the professor with whatever context they
   need.
2. **Merge after approval.** Once the professor approves the PR (or tells
   you in person), set the entry to **Ready** in the CMS — Sveltia will
   merge the PR. Vercel redeploys `main` within a minute.

You can also bypass the CMS and edit files directly via the GitHub web
UI or a local clone. The repository layout is documented in `CLAUDE.md`.

## For the professor

You receive a preview link from the webmaster. Open it, browse the
relevant page (or the home page if it's a news item), and either:

- **Approve** the PR on GitHub (you have admin rights), or
- Tell the webmaster verbally; they will merge for you.

Branch protection on `main` is configured so that no change reaches the
live site without your approval.

## What lives where

| Content type      | Location in the repo                       |
|-------------------|--------------------------------------------|
| People profiles   | `src/content/people/*.json`                |
| Publications      | `src/content/publications/*.json`          |
| Articles          | `src/content/articles/*.mdx`               |
| News items        | `src/content/news/*.json`                  |
| Paper PDFs        | `public/papers/<basename>.pdf`             |
| Research areas, role labels, lab metadata | `src/data/lecs.ts` (edit via PR only) |

Research areas and lab address don't change often, so they are not
exposed in the CMS. Edit `src/data/lecs.ts` via a PR if needed.

## How the news section is built

The home page News section shows the **6 most recent items** drawn from
two sources, merged and sorted by date:

1. Editor-authored entries from the **News** collection (CMS).
2. Auto-generated entries from the **6 most recent publications**.

If you publish a custom news item dated after the latest paper, it
displaces the oldest paper-derived item in the grid.

## One-time deployment setup (webmaster, infrastructure)

Sveltia talks to GitHub through a small OAuth proxy. Until the proxy is
deployed, login at `/admin/` will fail.

1. **Register a GitHub OAuth App** under the lab's GitHub account.
   Set the callback URL to your worker subdomain
   (`https://<worker>.workers.dev/callback`). Note the Client ID and
   Client Secret.
2. **Deploy `sveltia-cms-auth`** to Cloudflare Workers (free tier, no
   credit card required). Follow the project's README — the worker is
   roughly 30 lines and reads the Client ID/Secret from encrypted env
   vars.
3. **Edit `public/admin/config.yml`**:
   - `backend.repo`: set to `OWNER/REPO` for this repo.
   - `backend.base_url`: set to your worker URL.
4. **Protect `main` in GitHub** (Settings → Branches):
   - Require pull request reviews before merging (1 approver, the prof).
   - Require status checks to pass (the Vercel preview build).
   - Restrict who can push to `main` to admins only.
5. **Invite collaborators**. Members get *write*, the professor gets
   *admin*.

After this, `/admin/` is the only thing members ever need to touch.
