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
    arxivId: z.string(),
    slug: z.string(),
    title: z.string(),
    authors: z.array(z.string()),
    abstract: z.string(),
    date: z.string(),
    year: z.number().int(),
    primaryCategory: z.string().optional(),
    venue: z.string().default("arXiv"),
    type: z.string().default("Preprint"),
    topics: z.array(topic).default([]),
    pdfPath: z.string().nullable().optional(),
    arxivAbs: z.string().url(),
    arxivPdf: z.string().url(),
    arxivHtml: z.string().url().optional(),
    labMembers: z.array(labMemberId).default([])
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

export const collections = { publications, people };
