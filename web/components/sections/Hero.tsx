"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { profile } from "@/content/profile";
import { media } from "@/content/media";
import { Icon, socialIcon } from "@/components/ui/Icon";
import { Marquee } from "@/components/ui/Marquee";
import { HIDDEN } from "@/lib/motion";

/**
 * Hero (docs/forensics.md §Layout, §Motion). Desktop 1440×900:
 * - photo covers the section (object-position 50% 100%), parallax translateY = 0.4 × scrollY
 * - the name runs as a marquee at 280px/220px, white + exclusion blend, row top 332px; the whole
 *   row also slides left 910px across the first 900px of scroll
 * - socials bottom-left (x16, bottom 48, 24px icon + 10px + label), roles bottom-right (64px/64,
 *   8px apart, bottom 48), both white + exclusion blend
 * Under 810px: 120px name, 32px/35px roles bottom-left, icon-only socials bottom-right.
 *
 * Load-in choreography, sampled on the live page (docs/forensics.md M3):
 *   photo   scale 2.4 → 1, opacity 0 → 1   starts ≈0.45s, lasts ≈1.05s, ease-in-out
 *   name    scale 0 → 1 around the centre   starts ≈1.0s,  lasts ≈0.6s
 *   socials opacity 0 → 1                   starts ≈1.5s,  lasts ≈1.5s
 *   marquee 70px/s, 24px between copies
 */
// fitted to the live samples (photo progress 0.08 @ +150ms, 0.34 @ +450ms, 0.89 @ +750ms of a
// ~1.1s run starting ≈0.45s after load)
const introEase = [0.55, 0, 0.15, 1] as const;

export function Hero() {
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, (v) => v * 0.4);
  const nameX = useTransform(scrollY, [0, 900], [0, -910], { clamp: true });
  const socials = profile.socials.filter((s) => s.url);

  return (
    <section id="hero" className="hero relative w-full overflow-hidden bg-faint" aria-label="Introduction">
      {/* photo */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <motion.div
          initial={{ scale: 2.4, opacity: HIDDEN }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.45, ease: introEase }}
          className="h-full w-full"
        >
          <picture className="block h-full w-full">
            <source media="(max-width: 809px)" srcSet={media.heroMobile.src} />
            <img
              src={media.hero.src}
              alt={media.hero.alt}
              width={media.hero.width}
              height={media.hero.height}
              fetchPriority="high"
              className="h-full w-full object-cover object-[50%_100%] max-[809px]:object-[58%_50%]"
            />
          </picture>
        </motion.div>
      </motion.div>
      <div className="hero-grain" aria-hidden="true" />

      {/* name marquee */}
      <motion.div className="hero-name absolute left-0 w-full" style={{ x: nameX }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.55, delay: 1.1, ease: introEase }} className="origin-center">
          <Marquee
            pxPerSec={70}
            copies={3}
            className="hero-name-track"
            item={(i) =>
              i === 0 ? (
                <h1 className="t-marquee hero-name-text">{profile.fullName} -</h1>
              ) : (
                <span className="t-marquee hero-name-text">{profile.fullName} -</span>
              )
            }
          />
        </motion.div>
      </motion.div>

      {/* socials */}
      {socials.length > 0 && (
        <motion.ul
          className="hero-socials absolute flex flex-col gap-[16px] text-on-dark"
          initial={{ opacity: HIDDEN }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5, ease: introEase }}
        >
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noreferrer" className="hero-social flex items-center gap-[10px]">
                <Icon name={socialIcon(s.label)} />
                <span className="t-nav hero-social-label">{s.label}</span>
              </a>
            </li>
          ))}
        </motion.ul>
      )}

      {/* roles */}
      <div className="hero-roles absolute text-on-dark">
        {profile.roles.map((r) => (
          <h2 key={r} className="t-role hero-role">
            {r}
          </h2>
        ))}
      </div>
    </section>
  );
}
