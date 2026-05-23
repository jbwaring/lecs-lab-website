// Capture full-page screenshots of key routes at multiple widths.
// Usage: node scripts/screenshot.mjs [tag]
//
// The script saves PNGs into /tmp/lecs-shots/[tag]/ — each named
//   [route]_w[width].png  (e.g., home_w360.png).
import puppeteer from "puppeteer";
import fs from "node:fs/promises";
import path from "node:path";

const TAG = process.argv[2] ?? "v1";
const OUT_DIR = `/tmp/lecs-shots/${TAG}`;
const BASE = "http://127.0.0.1:4321";

// Route name → URL path
const ROUTES = {
  home: "/",
  home_fr: "/fr/",
  profile: "/profile/sebastien-le-beux",
  profile_fr: "/fr/profile/sebastien-le-beux",
  publication: "/publication/xgswap-gradient-boosting-nisq-routing-2024",
  publication_fr: "/fr/publication/xgswap-gradient-boosting-nisq-routing-2024",
  articles: "/articles",
  notfound: "/this-page-does-not-exist"
};

const WIDTHS = [360, 414, 768, 1024, 1440];

await fs.mkdir(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

try {
  for (const [name, route] of Object.entries(ROUTES)) {
    for (const w of WIDTHS) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
      const url = `${BASE}${route}`;
      try {
        await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
      } catch (e) {
        console.warn(`[${name}@${w}] navigation issue: ${e.message}`);
      }
      // Wait a moment for fonts and image loading.
      await new Promise((r) => setTimeout(r, 350));

      const outPath = path.join(OUT_DIR, `${name}_w${w}.png`);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`✓ ${outPath}`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}

console.log(`\nAll screenshots saved under ${OUT_DIR}/`);
