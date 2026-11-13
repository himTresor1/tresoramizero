# Tresor Amizero — Product Designer portfolio

> **Status (2026-11-06):** Phases 0–4 done for all six routes (home, /projects, /projects/<slug>, /about, /contact, footer); layout parity-checked against the live template at 1440 and 390 (`reference/parity-*.md`), motion inventory in `docs/feel-parity.md`, scores in `docs/phase-reviews.md`. Open: the content questions in §5, real images, the Script case study (site unreachable), and Phase 6 deploy.

Rebuild of the Framer template **TD_Alexfolio** (https://td-alexfolio.framer.website/) as a clean Next.js + Tailwind site, filled with Tresor's own content. Two case studies ship first: **IST Legal** and **Script**.

## 0. Decisions already made

| # | Decision |
|---|---|
| D1 | Headline is **Product Designer**. Engineering appears last on the page, as a secondary strength. |
| D2 | Case studies, in order: **IST Legal** (https://istlegal.ai/rw), then **Script** (https://script.o2labbs.com/). Each gets its own page. Other projects come later. |
| D3 | Look and feel: extract TD_Alexfolio with `extract-site`, rebuild it **100%** (same layout, colors, type, motion), with a self-review at every stage. Honest ceiling for a clean rebuild is 85–95% visual match; the probe loop closes the rest. |
| D4 | No logo or brand. Keep the template's colors. Hero and footer images come from Tresor (image generation); placeholders until then. |
| D5 | Stack: Next.js 16 + Tailwind v4 + `motion` + Lenis (same versions as `ist-legal-landing/web`). Deployable to Vercel. |
| D6 | Contact: one email only. No date of birth, no phone numbers. |

## 1. What the template is (from a first look)

- **Pages:** home `/` + project pages `/projects/<slug>` (four in the template). We need the home page and one project-page template, used twice.
- **Home sections:** Nav · Hero (full-bleed portrait, huge name, role lines, social links) · Intro · Services (4 groups with numbered rows) · Projects grid (year, name, tags) · Testimonials (3 slides) · Footer (email, phone, socials, back-to-top).
- **Project page:** full-bleed hero image · title · "// Overview" paragraph · image gallery · "More Projects" grid · footer.
- **Type:** Inter Display, Inter, DM Mono. **Accent:** orange `rgb(240, 80, 56)` as page background on project pages, greyscale hero. Exact tokens come from the extraction.
- **Stack:** Framer (Motion runtime), so `appear-effects.json` + `scroll-motion.json` + `hover-fiber.json` are the real motion signal.

## 2. Content map (template → Tresor)

| Template | Tresor |
|---|---|
| "Alex Graham — Web Designer / Art Director" | "Tresor Amizero — Product Designer" (second role line: to decide, e.g. "Design Systems" or "UX Engineer"; see Q3) |
| Intro paragraphs | Rewritten from the resume: user-centered, goal-driven product design; design systems; prototyping in Figma; ships with engineers |
| Services: Branding / Website / Web Dev / App Design | 1. Product & UX Design · 2. Design Systems · 3. Research, Testing & Prototyping · 4. **Engineering** (last, per D1: React, Next.js, React Native, Tailwind) |
| Projects grid (4) | IST Legal (2026) · Script (2025/26) · then placeholders hidden until later (MINUZA, GradPal, TVET Portal) |
| Testimonials | Real quotes from IST / BRD / GradPal if available; otherwise the section is hidden, not faked (Q4) |
| Footer: email, phone, socials | One email, LinkedIn (+ any other real handle), no phone |
| Project page copy | Written case-study overview per project + real screenshots |

All copy lives in `content/*.ts`, all images in `content/media.ts`. Nothing hard-coded in components.

## 3. Phases

### Phase 0 — Extract (ground truth)
1. `cd ist-legal-landing/extract-site` and run, **headed**:
   `bin/extract-site https://td-alexfolio.framer.website/ --routes --max-routes 6 --out /Users/peaam/tresor-portfolio/reference --name alexfolio`
   → `reference/alexfolio/home/` and `reference/alexfolio/projects-*/`.
2. Read `meta.json`, `stack/detected.md`, `motion/motion-specs.md`, `appear-effects.json`, `scroll-motion.json`, `hover-fiber.json`, `tokens/source-vars.css`, `content/layouts.json`.
3. Run `motion-probe.mjs` on the live home page → baseline keyframes.
4. **Self-review 0:** write `docs/forensics.md` — section list, real breakpoints (count them, don't invent), every measured duration/easing, token table, fonts found, blind spots (pseudo-elements, springs). Confirm no section is missing before building anything.

### Phase 1 — Scaffold
1. `tresor-portfolio/web`: Next.js 16 (App Router), Tailwind v4, `motion`, `lenis`, TypeScript.
2. `styles/tokens.css` seeded from `tokens/source-vars.css` / `colors.json` / `typography.json` / `spacing.json`. Fonts: Inter + Inter Display + DM Mono (self-hosted from `assets/fonts/`, or Google Fonts if the captured subsets are incomplete).
3. Primitives: `Section`, `Nav`, `Footer`, `Button/Link`, `ProjectCard`, `NumberedRow`, `Marquee/Slider` (whatever the testimonials use), `Reveal` wrapper driven by measured appear-effects.
4. `content/` schema: `profile.ts`, `services.ts`, `projects.ts`, `testimonials.ts`, `media.ts`.
5. **Self-review 1:** `next build` passes, tokens match the capture 1:1, fonts render (compare an `h1` in the browser against the live site).

### Phase 2 — Home page, section by section (parity gate each)
Order: Nav → Hero → Intro → Services → Projects → Testimonials → Footer.
For each section:
1. Build from `content/layouts.json` + `dom/computed-styles.json` (measured boxes, not eyeballing).
2. Port motion from measured values (`appear-effects`, `animations.json`, `hover-fiber`, `scroll-motion`).
3. **Gate:** `probe.mjs <live> http://localhost:3000 reference/alexfolio/home` → single-digit diffs; screenshots at desktop / tablet / mobile diffed against `screenshots/sections/NN-*`; `motion-probe` keyframes track the live ones.
4. Log in `docs/phase-reviews.md`: score 1–5 on layout · motion · responsive · consistency · craft. Anything under 5 gets a reason and a fix before the next section.

### Phase 3 — Project page template + two case studies
1. Build `/projects/[slug]` from the `projects-*` capture, same gate as Phase 2.
2. **IST Legal** (`/projects/ist-legal`): hero image + overview + gallery. Source material: the live site https://istlegal.ai/rw (screenshots at desktop and mobile), plus `ist-legal-landing/` (Tresor's own design work: `docs/`, `web/content/`, `reference/powder/`). Overview copy drafted from that work, with Tresor's role stated plainly (UX Designer, IST Africa).
3. **Script** (`/projects/script`): same structure. **Blocked right now:** script.o2labbs.com times out (DNS resolves to 62.171.161.22, no HTTP answer). Need the site back up, or screenshots + a short description from Tresor (Q2).
4. "More Projects" grid at the bottom links the two to each other; later projects slot in from `content/projects.ts`.
5. **Self-review 3:** both pages read as real case studies (problem → role → process → outcome), no template text left anywhere, no lorem, every image credited to a real screen.

### Phase 4 — Motion & feel pass
1. Walk the live site and the rebuild side by side: page load, scroll reveals, hover on nav / project cards / numbered rows, testimonial slider, back-to-top, page transitions between home and project pages.
2. Fix every difference against measured values. Keep `opacity: 0.001` for entrances (compositing), refresh scroll triggers after fonts/images load, Lenis smooth scroll if the capture shows it.
3. **Self-review 4:** `docs/feel-parity.md` — one row per motion, measured vs built, pass/fail.

### Phase 5 — Responsive & quality
1. Check at **320, 375, 390, 430, 768, 1024, 1280, 1440, 1920** and 390 landscape, plus drag-resize through in-between widths.
2. Hard fails: horizontal scroll, overlap/clipping, text overflow, distorted images, tap targets under 44px, broken motion on mobile.
3. `text-wrap: balance` on headings, `pretty` on body; no orphan words in headings; consistent CTA labels and capitalization.
4. Accessibility: keyboard nav, focus-visible states, contrast, alt text, reduced-motion fallback.
5. Lighthouse ≥ 95 performance / 100 accessibility on both page types.
6. **Self-review 5:** final scorecard in `docs/phase-reviews.md`; bar = "proud to show any page at any width to a senior designer".

### Phase 6 — Handover & deploy
1. Swap placeholder hero/footer images for Tresor's generated ones (drop-in via `content/media.ts`).
2. README: how to add a project, change copy, swap images.
3. Deploy to Vercel (needs Tresor's Vercel/GitHub login — I'll prepare, Tresor presses deploy).

## 4. Rules for the build
- Build from measured DOM/CSS; screenshots verify, they don't drive.
- No invented durations, easings, colors or spacing. Every raw value is a measured template value and becomes a token first.
- Port the template's **patterns**; ship only Tresor's copy and images. Template images are reference only and never ship.
- One component per job; hover / focus / active / disabled states everywhere.
- Never move on with a known defect. Each phase ends with a written self-review.

## 5. Open questions (answer whenever; none blocks Phase 0–2)
- **Q1 — Testimonials:** do you have real quotes (IST, BRD, GradPal, O2Labbs clients)? If not, hide the section rather than fake it.
- **Q2 — Script:** the site is unreachable right now. Is it down, or geo-restricted? Can you share screenshots or a Figma link, and 3–4 lines on what Script is?
- **Q3 — Second role line:** the template shows two lines ("Web Designer / Art Director"). Keep "Product Designer" alone, or add one more (e.g. "Design Systems", "UX Engineer")?
- **Q4 — Name order and socials:** "Tresor Amizero" or "Amizero Tresor"? Which email (peaceamizero@ or amizeropeace@)? LinkedIn / X / Instagram / Dribbble / Behance handles?
- **Q5 — IST Legal case study:** anything confidential I must leave out? Can I use screenshots of the live site and the Figma work?

## 6. Where things live
```
/Users/peaam/tresor-portfolio/
  PLAN.md               ← this file
  reference/alexfolio/  ← extract-site output (ground truth)
  docs/                 ← forensics, phase-reviews, feel-parity
  web/                  ← Next.js app (content/, components/, styles/, app/)
```
