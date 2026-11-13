# Feel parity — every motion, measured vs built

Source values: `docs/forensics.md` (capture + live probes). "Built" is what the rebuild does; "check" is how it was verified. ✓ = tracks the template; ≈ = same choreography, timing fitted to samples; ✗ = not reproduced.

| # | Where | Template (measured) | Built | Check |
|---|---|---|---|---|
| L1 | Hero load-in: photo | scale 2.4 → 1, opacity 0 → 1; starts ≈0.45s, ends ≈1.55s, ease-in-out (0.08 @ +150ms, 0.34 @ +450, 0.89 @ +750) | same, `delay 0.45, duration 1.1, ease [0.55,0,0.15,1]` | ≈ time-sampled on both pages |
| L2 | Hero load-in: name | scale 0 → 1 about the track centre, ≈1.05–1.6s | `delay 1.1, duration 0.55` | ≈ sampled |
| L3 | Hero load-in: socials | opacity 0 → 1, ≈1.5–3.0s | `delay 1.5, duration 1.5` | ✓ (renders when socials have URLs) |
| M2 | Hero name marquee | 70 px/s, 24px between copies | CSS keyframe marquee, duration = half-track / 70 | ✓ 70 px/s sampled |
| S1 | Hero name on scroll | translateX 0 → −910px across the first ~900px (eased by Lenis) | `useTransform(scrollY, [0,900], [0,-910])` | ✓ |
| S2 | Hero photo parallax | translateY = 0.4 × scrollY | same | ✓ |
| N1 | Nav / hero / footer text | white + `mix-blend-mode: exclusion` | same (on the stacking-context element) | ✓ screenshots light + dark |
| R1 | Intro lead / testimonial quote / about lead & quote | per-character colour scrub, offsets `start 0.75 → start 0.35`, faint → ink, accent range | `ScrollRevealText` with the same offsets | ✓ by eye; template's own reveal is chunk-stepped under Lenis, ours is per character |
| R2 | Section reveals (service groups, cards, rows) | opacity 0.001 → 1 (+ scale 0.9 → 1 for groups) in 650ms, no-bounce spring | `Reveal` (whileInView, spring 0.65/0) | ✓ |
| V1 | Variant switches (number, testimonial, menu) | spring 0.4s, bounce 0.2 (from the React tree) | `variantSpring` | ✓ |
| H1 | "See my Work" / "Let's Talk" pill hover | accent circle grows from bottom centre (1px → ~285px), label slides up 35px to a white copy | CSS transitions, 650ms with the measured curve | ✓ by eye |
| H2 | Project image hover | accent 84px "View" circle follows the pointer | spring-followed label, variant spring scale in/out | ≈ |
| H3 | Nav link hover | tiny rotateY tilt | not reproduced (sub-pixel) | ✗ minor |
| P1 | Project cards | sticky 900px slots, 200px apart; the card behind scales 1 → 0.9 and fades 1 → 0 while the next slot travels one viewport | same, progress from the static slot wrapper | ✓ |
| C1 | Services counter | number flips as each group's top passes the sticky number | scroll-driven index, flip with V1 | ✓ |
| F1 | Footer reveal | fixed layer under `main`, 100vh spacer; photo scale 1.1 → 1 and opacity 0 → 1 over the last viewport; "Reach Out" row translateX = min(0, 65 − 790p) | same | ✓ |
| T1 | Trust marquee | ticker, 32px gaps | 70 px/s ticker | ≈ (speed not measurable: paused off-screen on the template) |
| W1 | /projects horizontal scroll | sticky viewport, track slides left; section n×450px | same formula, with a floor so 2 cards still travel | ≈ |
| G1 | Project page gallery | images 1100px tall, fixed −200px offset, no scroll motion | same | ✓ wheel-verified on the template |
| G2 | Project page cover | scale 1 → 0.985 over the first ~600px | same | ✓ |
| X1 | Hero grain | WebGL blue-noise canvas, `mix-blend-mode: overlay` | static SVG turbulence tile, overlay, 32% | ≈ |
| X2 | Lenis | smooth scroll, lerp | Lenis `lerp 0.1` | ✓ |
