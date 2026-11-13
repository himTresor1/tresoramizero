# Forensics — TD_Alexfolio (Framer template)

Source capture: `reference/alexfolio/<route>/` (6 routes, captured 2026-11-06, headed Chromium, viewports 1440×900 / 768×1024 / 390×844). Live oracle: https://td-alexfolio.framer.website/. Values below are measured, not guessed; where I measured live (browser pane) instead of from the capture, it says so.

## Stack
- Framer site, Motion runtime (`framerMotion: true`), **Lenis** smooth scroll. No GSAP, no Three.
- `hover-fiber.json` is empty on every route → motion props are compiled away. Hover specs come from `hover-thorough.json` (mouse-diff) and live probing; scroll choreography from `scroll-motion.json` + `motion-probe`.
- Two colour schemes: the stylesheet has a `(prefers-color-scheme: dark)` block. The capture is the **light** theme; dark values are noted where I measured them.

## Routes (all captured, all complete)
| Route | Folder | Sections | What it is |
|---|---|---|---|
| `/` | `home` | 13 slugs (6 real sections + variants) | Nav · Hero · Intro · Services · Projects (4 sticky cards) · Testimonials · Trust marquee · fixed Footer |
| `/projects` | `projects` | — | "Work Index": horizontal card row, then "Old projects" list |
| `/about` | `about` | — | Portrait + big paragraph, two columns, dark phone image, Recognition table, dark quote with smoke image, Facts (90 / years / awards), trust marquee |
| `/contact` | `contact` | 3 | "Reach Out" + form (name, job, email, message, Send) + office/mail/phone + socials |
| `/projects/<slug>` | `projects-formula-vintage`, `projects-sprey-zest` | — | Full-bleed hero image · title + "// Overview" paragraph · 4 full-width gallery images · "More Projects" 3-col grid |

The capture's "02-your-text-here", "06…09-large", "11-trust", "12-graphic", "13-your-text-here" slugs are breakpoint variants / children of the six real sections, not extra sections.

## Breakpoints (from the stylesheet, not invented)
- **Desktop ≥ 1200px**
- **Tablet 810–1199px**
- **Mobile ≤ 809px**
Three breakpoints, Framer's standard set. Computed styles below are desktop (1440); tablet/mobile come from `screenshots/*-{tablet,mobile}.png` and the per-breakpoint DOM variants in `dom/full.html`.

## Page architecture (desktop, measured live)
- `main` is `position: relative; z-index: 2`, height 10 271px.
- The **footer is fixed**: a `position: fixed; top: 0; bottom: 0; z-index: 1; height: 100vh` wrapper holds `<footer>` (900px). `main` scrolls over it; page height = main + 900 so the footer is revealed at the end. Body background is the accent (`#ff442b`), visible for a frame on overscroll.
- Section stack (y, height): hero 0/900 · what-i-do 900/846 · services 1746/3094 · projects 4840/4429 · testimonials 9269/906 · trust 10175/96.

## Tokens (light theme, from `tokens/source-vars.css`)
| Token | Value | Used for |
|---|---|---|
| white | `#fff` | page surfaces, project card, trust strip |
| ink | `#151414` | headings, body strong text, outlined-number stroke |
| ink-deep | `#121111` | projects section bg, footer bg, "See my Work" fill, button fill |
| grey | `#4f4a4a` | body copy (intro small paragraph, project description) |
| grey-light | `#c4bfbf` | rules / dividers, muted |
| faint | `#ebeaea` | un-revealed words in scroll-reveal text (intro, quote), hero/photo bg tint |
| accent | `#ff442b` | section labels `// Intro`, "View" circle, body bg, highlighted words |
| tint | `#fff5f533` → `#fff5f500` | overlay gradients |
Dark theme (measured live with `prefers-color-scheme: dark`): ink → `#fff`, surfaces → `#121111`, grey → `#a7a0a0`, faint → `#403b3b`, accent → `#f05038`, label accent `#f05038`. Hero/footer h1 stays white in both.

## Typography (desktop computed)
| Role | Family | Size / line | Weight | Tracking | Colour |
|---|---|---|---|---|---|
| Hero & footer marquee name | Inter Display | 280 / 220 | 500 | −11.2px (−0.04em) | white |
| Hero role lines | Inter Display | 64 / 64 | 600 | −2.112px (−0.033em) | ink |
| Section h2 (services groups, quote) | Inter Display | 72 / 72 (quote 74) | 600 | −2.16px (−0.03em) | ink |
| Project card title (h3) | Inter Display | 64 / 64 | 600 | −2.112px | ink |
| Section label (`Intro`, `Services`…) | Inter Display | 18 / 24 | 600 | 0 | accent |
| Label slash `//` | Inter | 16 / 19.2 | 400 | 0 | accent |
| Service row (h4) | Inter Display | 18 / 24 | 600 | 0 | ink |
| Body / description | Inter Display | 18 / 25.2 | 400 | 0.18px (0.01em) | grey |
| Index numbers `01`, `(2024)`, `01/03` | DM Mono | 18 / 26 | 400 | 0.18px | grey (accent for the active counter) |
| Big outlined service number | DM Mono | 252 / 220 | 300 | −5.04px (−0.02em) | fill white, `-webkit-text-stroke: 1px ink` |
| Nav links | Inter Display | 18 / 25.2 | 400 | 0 | ink |
| Footer details | Inter Display | 18 / 25.2 | 400 | 0 | white (dark footer) |
Fonts: Inter Display 400/500/600, Inter 400, DM Mono 300/400 (`assets/fonts/` has the subsets Framer served; see `web/styles/fonts.css`). "Instrument Sans" appears twice (the Framer badge) — not ours.

## Layout measurements (desktop 1440)
- Page gutter **20px**; section label at x=44 (after the `//` at x=20); content column for services x=514…1420 (906 wide), heading at x=559, rows x=581…1314, index at x=1335.
- Nav: 92px tall, 4 items (wordmark left, Projects, About, Contact) spread across 1400px; transparent.
- Hero: 1440×900, image `object-fit: cover; object-position: 50% 100%`, name marquee row at y=340 h=220, socials bottom-left (x=16, y=744…852, 3 rows 25px, 42px pitch), role lines right-aligned bottom-right (x≈1031…1412, y=716/788).
- Intro: section 846px; label at y=913; big text block centred (text-indent on the first line, ~64–72px, measured on build); small paragraph x=736 w=530 at y=1425; button "See my Work" x=736 y=1561 184×65, radius 56px, ink fill text white (two stacked labels for the hover swap).
- Services: big number 462×342 at x=20, **sticky top 96px**; four groups ~750px apart; row height 22 with 53px pitch, 1px rules.
- Projects: section bg `#121111`; 4 cards, each `position: sticky; top: 0`, 1440×900 slot, inner "padding container" 1400×820 at (20, +60), radius 20px, white; image left ~880 wide, text column x=955 (year, h3 64px, description w=396, tag list rows 25px/42px pitch with 1px rules).
- Testimonials: 906px; counter `01/03` at x=260 y=+189; quote p x=260 w=920; name row at y=+627; three 64px avatars stacked at x=1352 (82px pitch), active one ringed in accent.
- Trust: 96px strip, logo `ul` gap 32px, infinite marquee.
- Footer (fixed, 900): image cover with 5% overscan (1584×990 at −72,−45); "Reach Out -" marquee row at y=300 h=300 (text 280px at y=340); Details block y=691 h=209: Office / Mail / Phone lines (y=711/740/770), socials row y=855; back-to-top 44px white circle at (1376, 20).

## Motion (measured)
| # | Where | What | Numbers |
|---|---|---|---|
| M1 | every reveal | entrance from `opacity: 0.001` (Framer keeps the layer composited) | 39 appear specs on home; CDP caught the curve: **650ms**, easing = the 64-stop `linear(…)` in `motion/motion-specs.md` (≈ spring, duration 0.65, bounce 0). Use the `linear()` string verbatim as the CSS timing function. |
| M2 | hero name, footer "Reach Out" | horizontal marquee | CDP: **39 400ms linear** per loop (hero). Footer marquee is **scroll-translated**: `translateX 0 → −800px` across the page scroll. |
| M3 | hero image | load-in | `scale 1.1 → 1`, `opacity 0 → 1` (from `scroll-motion.json`, kind `pin-scrub` = the on-load animation, M1 timing). |
| M4 | section labels (`// Intro`, `// Services`, `// Projects`) | parallax | listed as `parallax` in `transitions.json`; magnitude to confirm from `motion-probe-live.json`. |
| M5 | intro text, testimonial quote | word-by-word colour reveal on scroll | spans start `faint #ebeaea` and flip to ink / accent as the section scrolls (scrub, no duration). The accent words are authored, not computed. |
| M6 | services big number | sticky counter | number sticks at `top: 96px` and reads 01→04 as groups pass (page text shows `04` at the end). |
| M7 | project cards | sticky stack | each card `sticky; top: 0`, 900px slot; next card slides over the previous. Card content fades up on enter (650ms, M1). |
| M8 | "See my Work" button | hover: accent circle grows from the centre | `circle animation` div 1×1 at centre, `transform translate(−0.5,−0.5) → translate(−142.5,−142.5)` i.e. grows to ~285px, radius 268px → 94%; label swaps (two stacked labels, `overflow: hidden`). |
| M9 | nav links | hover | tiny `rotateY` 3D tilt (matrix3d with 0.018 skew) on the link text. |
| M10 | testimonial avatars | click to switch slide; active ring | `Content` bg `#262626 → #ff622e`, `Dot` bg transparent → `#f9fbfb` (hover-thorough). |
| M11 | "View" circle on project image | follows / appears on hover | accent 84px circle, label "View" (screenshot 06). Exact behaviour to probe when building. |
| M12 | Lenis | smooth scroll | detected; `lerp` to compare with motion-probe (template default `duration 1.2`). |
Blind spots: springs inferred from the linear() curve (good match); pseudo-elements not captured; mobile/tablet layout is screenshot-only; `blue_noise_med.png` is in the asset list — a grain overlay somewhere (likely the dark about-page quote); confirm when building /about.

## Images (template, reference only — never ship)
`assets/images/`: hero portrait `6OgKiFgKAZ4mheqIKNMLEb69nM` (3670×1979 source), footer portrait `wMoYduUKAz8Xh6RTKnOvPGEbro`, 4 project covers, 3 avatars, logos, noise. Tresor supplies hero + footer portraits (D4); project images come from Tresor's work.

## Addendum — found while building (all measured live)
- **Blend:** nav, hero name/roles/socials and footer text are white with `mix-blend-mode: exclusion` (reads dark on light, light on dark). On inner pages the nav is plain ink.
- **Hero load-in:** photo scale 2.4 → 1 + opacity 0 → 1 (≈0.45s → 1.55s, ease-in-out); name scale 0 → 1 (≈1.05 → 1.6s); socials fade 1.5 → 3.0s. Name marquee 70 px/s, 24px gaps. The hero also carries a WebGL grain canvas (`mix-blend-mode: overlay`).
- **Scroll colour reveal:** the intro lead and quotes are per-character spans; the React props read from the tree: `useScrollColor`, `startOffset "start 0.75"`, `endOffset "start 0.35"`, `scrollColor` faint, `defaultColor` ink, `primaryColor` accent over `startIndex..endIndex`. Desktop lead has 21 leading spaces, under 1200px 9. Tablet override: 54px (measured 28px at 768 and 390).
- **Variant transitions:** spring 0.4s / bounce 0.2 (number flip, testimonial switch, menu).
- **Section label rows** sit in a `position: sticky; top: 0` wrapper (transparent). Intro: no gap after the row; Services and Testimonials: 40px before their content; Projects: 60px.
- **Services rows:** 58px, padding 0 24px, index flush right; groups enter at scale 0.9. Mobile: content at 16px, rows 52px, title 32px, desc 14px.
- **Projects cards:** slots 900px sticky at top 0, 200px apart, card padding 60 20 20 → 1400×820 panel; the card behind scales 1 → 0.9 / fades 1 → 0 while the next slot travels one viewport. Mobile: 4px side margins, image 358×539 on top, title 24px, tags 14px.
- **Testimonials:** desktop slider (avatars 72px rings, accent when active); under 1200px every testimonial is listed (gap 56, quote 28px).
- **Footer:** fixed layer under main + 100vh spacer; photo scale 1.1 → 1 / opacity 0 → 1 over the last viewport; marquee translateX ≈ min(0, 65 − 790p). Mobile: marquee text top 362, details lines 16px at 673/699/726, socials at 808.
- **Dark theme:** page/card `#121111`, ink `#fff`, grey `#a7a0a0`, rules `#403b3b`, un-revealed text `#222020`, accent `#f05038`, number stroke white.
- **Mobile menu:** nav grows to 250px, ink-deep background, links 16px white at 85/139/193, toggle becomes an X.
- **/projects:** "Work Index" hero (padding 320 20 20, h1 120/108), sticky horizontal scroll of 1280×900 cards (section n × 450px), "Old projects" rows 66px (name · (year) · category · index · arrow).
- **/about:** hero padding 320 20 160 pulled up 70px (portrait 64×96 beside a 72px lead; three 427px columns), 900px image frame (image 1080 tall at −180), awards rows 66px, dark quote (text 764 wide, image at 34%), facts with the sticky number (blocks 832 wide, padding 160 0, gap 64), trust strip.
- **/contact:** section padding 180 20 40 pulled up 70px; h1 column 462, form column at 558 (862 wide, padding-top 200, gap 40): h2 40px, fields 16px Inter at a 63px pitch with 1px rules, 189×60 ink pill, details (padding-top 56, gap 60).
- **Project page:** 900px cover (image 1504×964 at −32; scale → 0.985 on scroll), title 120/108 + "// Overview" (40px/44 weight 500 in a 704px column at x 736), gallery frames 900px with 1100px images at −200 (static), "More Projects" 3 × 480×636 cards.

## Self-review 0
- All 6 routes captured with dom, computed styles, motion, tokens, screenshots at 3 viewports: **yes**.
- Breakpoints read from the stylesheet (3), not invented: **yes**.
- Every type style and colour above comes from computed values: **yes**; dark-theme values are a first pass and get re-measured when the dark theme is built.
- Motion: one real CDP curve (650ms linear()) + marquee timing + scroll kinds; per-element scroll keyframes pending `motion-probe-live.json`. Hover "View" and the services counter need a live probe during the build: **open, tracked in M6/M11**.
- Not yet known: tablet/mobile measurements (screenshots only) — measured live per section during Phase 2.
