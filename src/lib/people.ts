import { getCollection, type CollectionEntry } from "astro:content";

export type PersonEntry = CollectionEntry<"people">;

/** Family-name-style key for alphabetical ordering. Falls back to surname split from the full name. */
function sortKeyFor(p: PersonEntry): string {
  if (p.data.sortKey) return p.data.sortKey.toLowerCase();
  const tokens = p.data.name.trim().split(/\s+/);
  return tokens[tokens.length - 1].toLowerCase();
}

/** Strip diacritics for accent-insensitive comparison. */
export function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/**
 * People in display order: the PI (supervisor) is pinned first, the rest are
 * sorted alphabetically by family-name sort key. Stable across rebuilds.
 */
export async function getOrderedPeople(): Promise<PersonEntry[]> {
  const all = await getCollection("people");
  const pi = all.filter((p) => p.data.role === "supervisor");
  const rest = all
    .filter((p) => p.data.role !== "supervisor")
    .sort((a, b) => sortKeyFor(a).localeCompare(sortKeyFor(b), "en"));
  return [...pi, ...rest];
}

/** Map a published author tag like "Le Beux, S." or "Sébastien Le Beux" to a person entry, if any. */
export function findPersonByAuthorTag(
  tag: string,
  people: PersonEntry[]
): PersonEntry | undefined {
  const t = fold(tag);
  return people.find((p) => {
    const last = sortKeyFor(p);
    const lastFolded = fold(last);
    return t.includes(lastFolded);
  });
}
