// Capture both above-the-fold AND full-page screenshots at multiple widths.
// Usage: node scripts/screenshot.mjs [tag]
//
//   /tmp/lecs-shots/[tag]/full/[route]_w[width].png    - whole page
//   /tmp/lecs-shots/[tag]/viewport/[route]_w[width].png - first viewport only
import puppeteer from "puppeteer";
import fs from "node:fs/promises";
import path from "node:path";

const TAG = process.argv[2] ?? "v1";
const OUT_DIR = `/tmp/lecs-shots/${TAG}`;
const BASE = "http://127.0.0.1:4321";

const ROUTES = {
  home: "/",
  home_fr: "/fr/",
  profile: "/profile/sebastien-le-beux",
  profile_waring: "/profile/jean-baptiste-waring",
  publication: "/publication/xgswap-gradient-boosting-nisq-routing-2024",
  articles: "/articles",
  notfound: "/this-page-does-not-exist"
};

const WIDTHS = [360, 414, 768, 1024, 1440];

await fs.mkdir(path.join(OUT_DIR, "full"), { recursive: true });
await fs.mkdir(path.join(OUT_DIR, "viewport"), { recursive: true });

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

try {
  for (const [name, route] of Object.entries(ROUTES)) {
    for (const w of WIDTHS) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
      try {
        await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 30000 });
      } catch (e) { /* ignore */ }
      await new Promise((r) => setTimeout(r, 350));

      const vp = path.join(OUT_DIR, "viewport", `${name}_w${w}.png`);
      const full = path.join(OUT_DIR, "full", `${name}_w${w}.png`);
      await page.screenshot({ path: vp, fullPage: false });
      await page.screenshot({ path: full, fullPage: true });
      console.log(`✓ ${name}@${w}`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
console.log(`Done. ${OUT_DIR}/`);
