# Phase reviews

Scores 1–5 per section: layout · motion · responsive · consistency · craft. Anything under 5 gets a reason and a fix. Evidence: `reference/parity-1440.md`, `reference/parity-390.md` (text-anchored layout parity against the live template), `docs/feel-parity.md` (motion), `reference/a11y.log`, `reference/tap-targets.log`.

## Phase 0 — extraction (2026-11-06)
- 6 routes captured complete. Forensics in `docs/forensics.md` (+ addendum of everything measured live during the build). Score: 5.

## Phase 1 — scaffold
- Next 16 + Tailwind 4 + motion 14 + Lenis, tokens from the capture (light + dark), self-hosted Inter / Inter Display / DM Mono (the exact files the template serves). `tsc` and `eslint` clean (warnings only: `<img>` instead of `next/image`, deliberate — the template's crops are controlled in CSS). Score: 5.

## Phase 2 — home page (desktop 1440 + mobile 390 parity-checked)
| Section | layout | motion | responsive | consistency | craft | notes |
|---|---|---|---|---|---|---|
| Nav | 5 | 4 | 5 | 5 | 5 | every anchor ✓ at 1440 and 390; the nav-link hover tilt (sub-pixel rotateY) is not reproduced |
| Hero | 5 | 5 | 5 | 5 | 4 | roles, name row, socials, intro choreography and marquee speed match; grain is an SVG approximation of the WebGL canvas |
| Intro | 5 | 5 | 5 | 5 | 5 | lead/copy/button positions ✓ (lead height differs only with copy length); reveal uses the template's own offsets |
| Services | 5 | 5 | 5 | 5 | 5 | number, titles, rows, index ✓ at both widths; counter flips per group |
| Projects | 5 | 5 | 5 | 5 | 4 | sticky stack and fade/scale match; "View" cursor follow verified by eye only |
| Testimonials | 5 | 5 | 5 | 5 | 3 | placeholder quotes and avatars are flagged in `content/testimonials.ts`; section must ship with real quotes or be hidden |
| Trust | 5 | 4 | 5 | 5 | 3 | text wordmarks until logos arrive; ticker speed assumed 70 px/s (template pauses off-screen) |
| Footer | 5 | 5 | 5 | 5 | 4 | reveal, photo and marquee scrub match; third line ("Open to") replaces the template's phone line |

## Phase 3 — inner pages
| Page | layout | motion | responsive | consistency | craft | notes |
|---|---|---|---|---|---|---|
| /projects | 5 | 4 | 4 | 5 | 4 | horizontal scroll formula extended for 2 cards; "Old projects" rows from the resume; mobile stacks the cards |
| /projects/<slug> | 5 | 5 | 4 | 5 | 3 | title/overview/gallery/more-grid positions ✓; **Script case study has placeholder copy and images**; IST Legal copy drafted, images are placeholders |
| /about | 5 | 5 | 4 | 5 | 4 | all template blocks rebuilt with Tresor's experience and facts; three placeholder images |
| /contact | 5 | 4 | 5 | 5 | 4 | form composes a mailto (no backend); positions ✓ incl. the 70px pull-up |

## Phase 4 — motion
- `docs/feel-parity.md`: 23 motions inventoried; 15 ✓, 6 ≈ (timing fitted to samples), 2 ✗ (nav tilt, WebGL grain replaced by SVG noise).

## Phase 5 — quality (first pass)
- **axe (WCAG 2.2 AA + best practice):** 9 nodes left, all the same finding: the accent `#ff442b` section labels at 18px on white are 3.43:1 (needs 4.5). This is the template's own colour on its own labels (decision D4: keep the template's colours). To pass AA the label colour would have to deepen to about `#e23a22`; left as-is pending Tresor's call. Everything else is clean (fixed: aria-label on `<p>`, heading order).
- **Touch targets (390):** remaining flags are the footer email / back-to-top (false positives: the probe hits `main` over the fixed footer) and one `.work-image` (large element, probe artefact).
- **Responsive sweep (320, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 390 landscape × 5 routes):** one real defect found and fixed (the intro copy's fixed 530px width overflowed phones); everything else flagged is the deliberate marquee / horizontal-track bleed. `reference/responsive-sweep.log`.
- **Production build:** `next build` passes; all routes prerender statically. Next.js prints a security-upgrade notice for 16.4.0 (see the turn report).
- **Lighthouse:** not run yet.
- **Not verified in a real browser by a person:** hover states, keyboard flow, reduced-motion.

## Open items
1. Content: socials, which email, second role line, testimonials, Script copy/images, confidentiality for IST Legal (PLAN.md §5).
2. Real images (hero, hero-mobile, footer, project covers/galleries, about ×3, avatars).
3. Accent-label contrast decision.
4. Phase 5 sweep + Lighthouse; Phase 6 deploy.
