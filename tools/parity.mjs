// Layout parity: measures the same anchors (found by text) on the live template and on the
// rebuild, at one viewport, and prints the differences. Both pages are scrolled through first so
// every scroll-triggered transform has reached its final state.
//
//   node tools/parity.mjs [width=1440] [height=900] [liveUrl] [localUrl]
//
import { chromium } from "playwright";

const W = Number(process.argv[2] || 1440);
const H = Number(process.argv[3] || 900);
const LIVE = process.argv[4] || "https://td-alexfolio.framer.website/";
const LOCAL = process.argv[5] || "http://localhost:3200/";

// [name, live text, local text, options]
const ANCHORS = [
  ["nav wordmark", "© Alex Design & Strategy", "Tresor Amizero", { nav: true }],
  ["nav Projects", "Projects", "Projects", { nav: true }],
  ["nav Contact", "Contact", "Contact", { nav: true }],
  ["hero role 1", "Web Designer", "Product Designer"],
  ["hero role 2", "Art Director", "Design Systems"],
  ["hero social", "Linkedin", "Linkedin", { optional: true }],
  ["label Intro", "Intro", "Intro"],
  ["intro lead", "I’m a versatile", "I’m a product", { startsWith: true, big: true }],
  ["intro copy", "Bringing your vision", "From research", { startsWith: true }],
  ["intro button", "See my Work", "See my Work", { last: false }],
  ["label Services", "Services", "Services"],
  ["services number", "01", "01", { big: true }],
  ["group 1 title", "Branding & Marketing", "Product & UX Design"],
  ["group 1 desc", "Branding that builds", "User-centered", { startsWith: true }],
  ["row 1", "Brand Strategy and Messaging", "User Research & Interviews"],
  ["row 1 index", "01", "01", { afterText: ["Brand Strategy and Messaging", "User Research & Interviews"] }],
  ["group 2 title", "Website Design", "Design Systems", { big: true }],
  ["label Projects", "Projects", "Projects", { notNav: true }],
  ["project year", "(2024)", "(2026)"],
  ["project title", "Formula Vintage", "IST Legal"],
  ["project desc", "For Formula Vintage", "IST Legal is", { startsWith: true }],
  ["project tag 1", "Landing Page", "Website"],
  ["project tag 2", "Mobile App", "Product Design"],
  ["label Testimonials", "Testimonials", "Testimonials"],
  ["quote counter", "01", "01", { nth: -1, small: true }],
  ["quote", "“His keen eye", "“Tresor’s eye", { startsWith: true, big: true }],
  ["quote author", "Maya Lopez", "Client name", { endsWith: true }],
  ["quote role", "CEO, Fundwizz", "Role, Company"],
  ["footer mail", "Mail:", "Mail:", { startsWith: true }],
  ["footer marquee", "Reach Out -", "Reach Out -"],
];

const MEASURE = `(opts) => {
  const norm = (s) => (s || "").replace(/\\u00a0/g, " ").replace(/\\s+/g, " ").trim();
  const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const leaves = [...document.querySelectorAll("body *")].filter((e) => {
    if (!vis(e)) return false;
    if (e.children.length === 0) return true;
    // a text container whose children are only inline spans (per-char reveal text)
    return [...e.children].every((c) => c.tagName === "SPAN") && e.tagName !== "DIV" && e.tagName !== "UL";
  });
  let cands = leaves.filter((e) => {
    const t = norm(e.textContent);
    return opts.startsWith ? t.startsWith(opts.text) : opts.endsWith ? t.endsWith(opts.text) : t === opts.text;
  });
  if (opts.big) cands = cands.filter((e) => parseFloat(getComputedStyle(e).fontSize) > 60);
  if (opts.small) cands = cands.filter((e) => parseFloat(getComputedStyle(e).fontSize) < 30);
  if (opts.nav) cands = cands.filter((e) => e.closest("nav"));
  if (opts.notNav) cands = cands.filter((e) => !e.closest("nav"));
  if (opts.afterText) {
    const ref = leaves.find((e) => norm(e.textContent) === opts.afterText);
    if (ref) { const y = ref.getBoundingClientRect().top; cands = cands.filter((e) => Math.abs(e.getBoundingClientRect().top - y) < 6 && e !== ref); }
  }
  // prefer the deepest (innermost) match
  cands = cands.filter((e) => !cands.some((o) => o !== e && e.contains(o)));
  const el = opts.nth !== undefined ? cands.at(opts.nth) : cands[0];
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const c = getComputedStyle(el);
  const sec = el.closest("section, footer, nav");
  const sr = sec ? sec.getBoundingClientRect() : { top: 0 };
  return {
    x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height),
    ys: Math.round(r.y - sr.top),
    fontSize: c.fontSize, lineHeight: c.lineHeight, letterSpacing: c.letterSpacing, fontWeight: c.fontWeight,
    fontFamily: c.fontFamily.split(",")[0].replace(/"/g, ""), color: c.color,
  };
}`;

async function scrollThrough(page) {
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += 300) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(90);
  }
  await page.waitForTimeout(800);
  await page.evaluate(() => (window.__lenis ? window.__lenis.scrollTo(0, { immediate: true, force: true }) : window.scrollTo(0, 0)));
  await page.waitForTimeout(600);
  await page.mouse.wheel(0, -100000);
  await page.waitForTimeout(800);
}

async function measureAll(url, which) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: W, height: H }, colorScheme: "light" });
  // the Framer site keeps connections open, so "networkidle" never settles: wait for load + fonts
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(4000);
  await page.evaluate(() => document.fonts.ready);
  await scrollThrough(page);
  const out = {};
  for (const [name, liveText, localText, opts = {}] of ANCHORS) {
    const text = which === "live" ? liveText : localText;
    const afterText = opts.afterText ? opts.afterText[which === "live" ? 0 : 1] : undefined;
    out[name] = await page.evaluate(`(${MEASURE})(${JSON.stringify({ ...opts, text, afterText })})`);
  }
  out.__page = await page.evaluate(() => ({ h: document.documentElement.scrollHeight }));
  await browser.close();
  return out;
}

const live = await measureAll(LIVE, "live");
const local = await measureAll(LOCAL, "local");

const rows = [];
let flagged = 0;
for (const [name, , , opts = {}] of ANCHORS) {
  const a = live[name], b = local[name];
  if (!a || !b) { rows.push(`| ${name} | ${a ? "found" : "MISSING"} | ${b ? "found" : "MISSING"} | ${opts.optional ? "(optional)" : "⚠"} |`); if (!opts.optional) flagged++; continue; }
  const diffs = [];
  const num = (k) => { const d = b[k] - a[k]; if (Math.abs(d) > 1) diffs.push(`${k} ${a[k]}→${b[k]} (${d > 0 ? "+" : ""}${d})`); };
  num("x"); num("ys"); num("h");
  for (const k of ["fontSize", "lineHeight", "letterSpacing", "fontWeight", "fontFamily", "color"]) if (a[k] !== b[k]) diffs.push(`${k} ${a[k]}→${b[k]}`);
  if (diffs.length) flagged++;
  rows.push(`| ${name} | y ${a.y} / ys ${a.ys} | y ${b.y} / ys ${b.ys} | ${diffs.length ? diffs.join("; ") : "✓"} |`);
}
console.log(`# Parity ${W}×${H}\n\nlive page height ${live.__page.h}, rebuild ${local.__page.h}\n`);
console.log("| anchor | live | rebuild | diffs (x, y-in-section, h, type) |\n|---|---|---|---|");
console.log(rows.join("\n"));
console.log(`\n${flagged} anchors with differences out of ${ANCHORS.length}`);
