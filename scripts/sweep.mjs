import puppeteer from "puppeteer";

const BASE = "http://127.0.0.1:4321";
const routes = [
  "/", "/fr/",
  "/profile/sebastien-le-beux", "/fr/profile/sebastien-le-beux",
  "/publication/xgswap-gradient-boosting-nisq-routing-2024",
  "/articles", "/this-does-not-exist"
];
const widths = [320, 360, 414, 768, 1024, 1440];

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

for (const route of routes) {
  for (const w of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: 800 });
    try {
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 15000 });
    } catch (e) { /* ignore */ }
    const docW = await page.evaluate(() => document.documentElement.scrollWidth);
    const ok = docW === w ? "✓" : "✗";
    console.log(`${ok} ${route.padEnd(60)} @ ${String(w).padStart(4)}  docW=${docW}`);
    await page.close();
  }
}
await browser.close();
