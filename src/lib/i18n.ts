import { strings, type Locale, type StringKey, LOCALES } from "../i18n/strings";

export type { Locale };
export { LOCALES };

const DEFAULT_LOCALE: Locale = "en";

/**
 * Detect the active locale from a URL pathname. With `prefixDefaultLocale: false`,
 * the English routes live at the root and French routes are prefixed with `/fr`.
 */
export function detectLocale(pathname: string): Locale {
  if (pathname.startsWith("/fr/") || pathname === "/fr") return "fr";
  return DEFAULT_LOCALE;
}

/** Translate a string key for the given locale. Falls back to English on missing keys. */
export function t(locale: Locale, key: StringKey): string {
  const table = strings[locale] ?? strings[DEFAULT_LOCALE];
  return (table as Record<StringKey, string>)[key] ?? strings[DEFAULT_LOCALE][key] ?? key;
}

/** Build a localized URL. EN paths stay as-is; FR paths get a `/fr` prefix. */
export function localizePath(path: string, locale: Locale): string {
  if (locale === "en") return path;
  if (path === "/") return "/fr/";
  if (path.startsWith("/fr/") || path === "/fr") return path;
  return `/fr${path.startsWith("/") ? path : "/" + path}`;
}

/** Pair an EN path with its FR equivalent for the language toggle. */
export function counterpartPath(pathname: string, currentLocale: Locale): string {
  if (currentLocale === "fr") {
    if (pathname === "/fr" || pathname === "/fr/") return "/";
    return pathname.replace(/^\/fr(\/|$)/, "/");
  }
  return localizePath(pathname || "/", "fr");
}

/** Compact-date formatter ("May 23, 2026" / "23 mai 2026"). */
export function fmtDate(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split("-").map(Number);
  const month = t(locale, `month.short.${m}` as StringKey);
  return locale === "fr" ? `${d} ${month} ${y}` : `${month} ${d}, ${y}`;
}

/** Long-date formatter ("May 23, 2026" with full month, French equivalents). */
export function fmtDateLong(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split("-").map(Number);
  const month = t(locale, `month.long.${m}` as StringKey);
  return locale === "fr" ? `${d} ${month} ${y}` : `${month} ${d}, ${y}`;
}

/** Reading time (in minutes), language-agnostic. */
export function readingTime(body: string[]): number {
  const words = body.join(" ").split(/\s+/).length;
  return Math.max(2, Math.round(words / 220));
}
