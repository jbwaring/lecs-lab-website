import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const labMemberId = z.enum([
  "sebastien-le-beux",
  "jean-baptiste-waring",
  "masoud-rahimi",
  "ismael-ridha",
  "milad-eslaminia",
  "frederic-gagne",
  "paria-zolfaghari",
  "oceane-destras",
  "mohsen-asghari"
]);

const role = z.enum([
  "supervisor",
  "postdoc",
  "phd",
  "msc",
  "undergraduate",
  "visiting",
  "alumni"
]);

const topic = z.enum([
  "photonics",
  "reconfig",
  "noc",
  "quantum",
  "edge-ai",
  "neuro",
  "soc",
  "approx",
  "fpga"
]);

const publications = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/publications" }),
  schema: z.object({
    // Identity & display
    slug: z.string(),
    title: z.string(),
    authors: z.array(z.string()),
    abstract: z.string(),
    date: z.string(),
    year: z.number().int(),
    venue: z.string().default("arXiv"),
    type: z.string().default("Preprint"),
    topics: z.array(topic).default([]),
    labMembers: z.array(labMemberId).default([]),

    // arXiv (optional — only set for arXiv-mirrored papers)
    arxivId: z.string().optional(),
    arxivAbs: z.string().url().optional(),
    arxivPdf: z.string().url().optional(),
    arxivHtml: z.string().url().optional(),
    primaryCategory: z.string().optional(),

    // Semantic Scholar (optional)
    semanticScholarId: z.string().optional(),
    doi: z.string().optional(),
    /** Canonical web page for the paper — DOI link, Semantic Scholar page, or arXiv abs. */
    paperUrl: z.string().url().optional(),
    /** Open-access PDF URL from the publisher / repository, when not on arXiv. */
    openAccessUrl: z.string().url().optional(),

    // Local mirror under public/papers/[basename].pdf — null when no download available.
    pdfPath: z.string().nullable().optional()
  })
});

const people = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/people" }),
  schema: z.object({
    name: z.string(),
    role,
    title: z.string(),
    affiliation: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    office: z.string().optional(),
    areas: z.array(topic).default([]),
    since: z.number().int().optional(),
    until: z.number().int().optional(),
    thesis: z.string().optional(),
    bio: z.string(),
    links: z
      .object({
        scholar: z.string().url().optional(),
        dblp: z.string().url().optional(),
        site: z.string().url().optional()
      })
      .optional(),
    projects: z.array(z.string()).optional(),
    /** Sort key: surname for alphabetical ordering. Sébastien is pinned manually. */
    sortKey: z.string().optional()
  })
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/articles" }),
  schema: z.object({
    slug: z.string(),
    date: z.string(),
    tag: z.string(),
    author: z.string(),
    /** Optional companion publication slug. May not resolve — pages handle gracefully. */
    relatedPub: z.string().optional(),
    topics: z.array(topic).default([]),
    title: z.string(),
    excerpt: z.string()
  })
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/news" }),
  schema: z.object({
    date: z.string(),
    tag: z.string(),
    title: z.string(),
    summary: z.string(),
    /** Optional click-through link (internal path or external URL). */
    href: z.string().optional()
  })
});

export const collections = { publications, people, articles, news };
