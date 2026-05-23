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

/**
 * Map a published author tag to a person entry. Handles common variations:
 *
 *   "Sébastien Le Beux"  → matches "le beux"
 *   "S. Le Beux"         → matches "le beux"
 *   "Le Beux, S."        → matches "le beux"
 *   "S. L. Beux"         → matches the abbreviated form "l. beux"
 *   "Waring, J.-B."      → matches "waring"
 *
 * For compound surnames (e.g. "Le Beux"), the matcher additionally tries the
 * abbreviated form ("L. Beux") and the trailing token alone ("beux").
 */
export function findPersonByAuthorTag(
  tag: string,
  people: PersonEntry[]
): PersonEntry | undefined {
  const t = fold(tag);
  return people.find((p) => {
    for (const candidate of surnameCandidates(p)) {
      if (t.includes(candidate)) return true;
    }
    return false;
  });
}

/** Folded surname-shape candidates that should resolve to this person. */
function surnameCandidates(p: PersonEntry): string[] {
  const sortKey = p.data.sortKey ?? p.data.name.trim().split(/\s+/).pop() ?? "";
  const folded = fold(sortKey);
  const out = new Set<string>();
  if (folded) out.add(folded);

  const tokens = folded.split(/\s+/).filter(Boolean);
  if (tokens.length > 1) {
    // Trailing token alone ("beux" for "le beux"). Distinct enough for our roster.
    out.add(tokens[tokens.length - 1]);
    // Abbreviated form: "l. beux" for "le beux"
    const abbrev = tokens.slice(0, -1).map((tok) => tok[0] + ".").join(" ") + " " + tokens[tokens.length - 1];
    out.add(abbrev);
  }
  return [...out];
}
