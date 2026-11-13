// Measures where the template places content at a wide viewport (default 1920×1080):
// prints the rect of a few text anchors and containers per route.
//   node tools/measure-wide.mjs [width] [height] [baseUrl]
import { chromium } from "playwright";

const W = Number(process.argv[2] || 1920);
const H = Number(process.argv[3] || 1080);
const BASE = process.argv[4] || "https://td-alexfolio.framer.website";

const ROUTES = {
  "/": ["© Alex Design & Strategy", "Projects", "Contact", "Web Designer", "Linkedin", "Intro", "Bringing your vision", "See my Work", "Services", "Branding & Marketing", "Brand Strategy and Messaging", "(2024)", "Formula Vintage", "Landing Page", "01", "Maya Lopez", "Mail:", "Reach Out -"],
  "/about": ["I’m a designer", "I got my start", "Most of my work", "Let's Talk", "Recognition and Awards", "Vibrent", "SOTD", "Awwwards", "Distinctive design", "Completed Projects", "Across industries"],
  "/projects/formula-vintage": ["Formula Vintage", "// Overview", "For Formula Vintage", "More Projects", "Sprey Zest", "(2020)"],
  "/contact": ["Reach", "Tell me about", "Your name", "Send Message", "Office:"],
  "/projects": ["Work Index", "(2024)", "Old projects", "Vodoo Child", "Branding", "01"],
};

const SCRIPT = `(texts) => {
  const norm = (s) => (s || "").replace(/\\u00a0/g, " ").replace(/\\s+/g, " ").trim();
  const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const all = [...document.querySelectorAll("body *")].filter(vis);
  const out = {};
  for (const t of texts) {
    const el = all.find((e) => (e.children.length === 0 || [...e.children].every((c) => c.tagName === "SPAN")) && norm(e.textContent).startsWith(t));
    if (!el) { out[t] = null; continue; }
    const r = el.getBoundingClientRect(); const c = getComputedStyle(el);
    out[t] = [Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height), c.fontSize];
  }
  const named = {};
  for (const n of ["Max width container", "padding container", "content", "service card section", "Number 1 on", "text max width", "card container", "form container", "headline", "work container", "row container", "Details", "Desktop"]) {
    const el = [...document.querySelectorAll('[data-framer-name="' + n + '"]')].find(vis);
    if (el) { const r = el.getBoundingClientRect(); named[n] = [Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height)]; }
  }
  const imgs = [...document.querySelectorAll("img")].filter(vis).slice(0, 6).map((i) => { const r = i.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height)]; });
  return { texts: out, named, imgs, h: document.documentElement.scrollHeight };
}`;

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: W, height: H }, colorScheme: "light" });
for (const [route, texts] of Object.entries(ROUTES)) {
  await page.goto(BASE + route, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(3500);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += 400) { await page.mouse.wheel(0, 400); await page.waitForTimeout(60); }
  await page.waitForTimeout(600);
  await page.mouse.wheel(0, -100000);
  await page.waitForTimeout(800);
  const res = await page.evaluate(`(${SCRIPT})(${JSON.stringify(texts)})`);
  console.log(`\n## ${route} @${W} (page ${res.h})`);
  for (const [k, v] of Object.entries(res.texts)) console.log(`  ${JSON.stringify(k).padEnd(34)} ${v ? v.join(" ") : "—"}`);
  for (const [k, v] of Object.entries(res.named)) console.log(`  [${k}] ${v.join(" ")}`);
  console.log(`  imgs ${JSON.stringify(res.imgs)}`);
}
await browser.close();
