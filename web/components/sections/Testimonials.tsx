"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { testimonials } from "@/content/testimonials";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollRevealText } from "@/components/motion/ScrollRevealText";
import { HIDDEN, variantSpring } from "@/lib/motion";

/**
 * "// Testimonials" (measured): rule + label row; container padding 96px 20px; text column at
 * x 260, 920 wide, gap 48: counter "01/03" (DM Mono, accent + grey-light) absolutely at the top,
 * the quote (72px/74, 12 leading nbsp, scroll colour reveal 0.75 → 0.35 with an accent range),
 * then "// Name" (18px 600) and role (grey). Avatars: three 72px rings (4px pad; accent when
 * active, white otherwise) stacked at the right, 82px pitch; click switches the quote with the
 * template's variant spring.
 */
export function Testimonials() {
  const [active, setActive] = useState(0);
  if (!testimonials.length) return null;
  const t = testimonials[active];

  return (
    <section id="testimonials" className="testimonials relative bg-page" aria-labelledby="testimonials-label">
      <div className="h-px w-full bg-grey-light" aria-hidden="true" />
      <div className="intro-head">
        <SectionLabel id="testimonials-label">Testimonials</SectionLabel>
      </div>

      {/* under the desktop breakpoint the template lists every testimonial, no slider */}
      <div className="testimonials-stack">
        {testimonials.map((item, i) => (
          <figure key={i} className="testimonials-figure">
            <p className="testimonials-counter t-mono">
              <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-grey-light">/{String(testimonials.length).padStart(2, "0")}</span>
            </p>
            <blockquote>
              <ScrollRevealText text={item.quote} indent={6} className="t-quote" start={0.75} end={0.35} />
            </blockquote>
            <figcaption className="testimonials-author">
              <p className="t-row">
                <span className="text-ink">{"// "}</span>
                {item.name}
              </p>
              <p className="t-body">{item.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="testimonials-body">
        <div className="testimonials-text">
          <p className="testimonials-counter t-mono" aria-live="polite">
            <span className="text-accent">{String(active + 1).padStart(2, "0")}</span>
            <span className="text-grey-light">/{String(testimonials.length).padStart(2, "0")}</span>
          </p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={active}
              className="testimonials-figure"
              initial={{ opacity: HIDDEN, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: HIDDEN, y: -16 }}
              transition={variantSpring}
            >
              <blockquote>
                <ScrollRevealText text={t.quote} indent={12} indentSmall={6} className="t-quote" start={0.75} end={0.35} />
              </blockquote>
              <figcaption className="testimonials-author">
                <p className="t-row">
                  <span className="text-ink">{"// "}</span>
                  {t.name}
                </p>
                <p className="t-body">{t.role}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <ul className="testimonials-avatars" aria-label="Choose a testimonial">
          {testimonials.map((item, i) => (
            <li key={i}>
              <button
                type="button"
                className="testimonials-avatar"
                data-active={i === active || undefined}
                aria-pressed={i === active}
                aria-label={`Testimonial ${i + 1}: ${item.name}`}
                onClick={() => setActive(i)}
              >
                <img src={item.avatar} alt="" width={64} height={64} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
