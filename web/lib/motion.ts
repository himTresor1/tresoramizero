// Motion values measured from the template (docs/forensics.md §Motion). Nothing here is invented.
import type { Transition } from "motion/react";

/** M1: the one CDP-captured entrance: 650ms, a no-bounce spring (the linear() curve in tokens.css). */
export const reveal: Transition = { type: "spring", duration: 0.65, bounce: 0 };

/** The template's default variant-switch transition (read from its React tree): spring 0.4s, bounce 0.2. */
export const variantSpring: Transition = { type: "spring", duration: 0.4, bounce: 0.2 };

/** Entrances start at 0.001, not 0, so the compositing layer is kept (no paint pop). */
export const HIDDEN = 0.001;

/** M2: hero name marquee, one full loop. */
export const MARQUEE_LOOP_S = 39.4;

/** M3: hero image load-in. */
export const heroImageFrom = { scale: 1.1, opacity: HIDDEN };
export const heroImageTo = { scale: 1, opacity: 1 };

/** Breakpoints read off the template's stylesheet. */
export const BP = { tablet: 810, desktop: 1200 } as const;
