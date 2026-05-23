// Identify the WIDEST overflowing element + first-in-DOM offender.
import puppeteer from "puppeteer";

const BASE = "http://127.0.0.1:4321";
const route = process.argv[2] ?? "/";
const width = Number(process.argv[3] ?? 360);

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});
const page = await browser.newPage();
await page.setViewport({ width, height: 800, deviceScaleFactor: 1 });
await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 30000 });

const result = await page.evaluate((vw) => {
  const docW = document.documentElement.scrollWidth;
  const bodyW = document.body.scrollWidth;
  const candidates = [];
  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (r.right > vw + 1) {
      candidates.push({
        tag: el.tagName,
        cls: typeof el.className === "string" ? el.className.slice(0, 80) : "",
        id: el.id || undefined,
        left: Math.round(r.left),
        right: Math.round(r.right),
        w: Math.round(r.width),
        path: (() => {
          const parts = [];
          let cur = el;
          while (cur && cur !== document.body && parts.length < 5) {
            const t = cur.tagName.toLowerCase();
            const c = typeof cur.className === "string" && cur.className
              ? "." + cur.className.split(/\s+/).slice(0, 2).join(".")
              : "";
            parts.unshift(t + c);
            cur = cur.parentElement;
          }
          return parts.join(" > ");
        })()
      });
    }
  }
  // Take the widest 8
  candidates.sort((a, b) => b.right - a.right);
  return { viewport: vw, docW, bodyW, total: candidates.length, top: candidates.slice(0, 8) };
}, width);

console.log(JSON.stringify(result, null, 2));

await browser.close();
