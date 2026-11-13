"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { profile } from "@/content/profile";
import { media } from "@/content/media";
import { Icon, socialIcon } from "@/components/ui/Icon";
import { Marquee } from "@/components/ui/Marquee";
import { getLenis } from "@/lib/scroll";

/**
 * Fixed footer reveal: the footer sits in a
 * fixed, full-viewport layer under `main` (z 1 vs 2) and a 100vh spacer after main lets the page
 * scroll past it. Across that last viewport (progress p):
 *   photo   scale 1.1 → 1, opacity 0 → 1 (linear in p)
 *   marquee "Reach Out -" slides left: translateX = min(0, 65 − 790p)
 * Details block: lines at y 711/740/770, socials row y 855, back-to-top 44px circle at (1376, 20).
 * Text is white + exclusion blend, like the hero.
 */
export function Footer() {
  const spacer = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: spacer, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const marqueeX = useTransform(scrollYProgress, (p) => Math.min(0, 65 - 790 * p));
  const socials = profile.socials.filter((s) => s.url);

  return (
    <>
      <div ref={spacer} className="footer-spacer" aria-hidden="true" />
      <div className="footer-layer">
        <footer className="footer" id="contact-footer">
          <motion.div className="footer-image" style={{ scale, opacity }}>
            <img src={media.footer.src} alt="" width={media.footer.width} height={media.footer.height} loading="lazy" />
          </motion.div>

          <motion.div className="footer-marquee" style={{ x: marqueeX }} aria-hidden="true">
            <Marquee pxPerSec={70} copies={3} className="hero-name-track">
              <span className="t-marquee hero-name-text">Reach Out -</span>
            </Marquee>
          </motion.div>

          <div className="footer-details">
            <p className="t-nav">
              <strong>Based in:</strong> {profile.location}
            </p>
            <p className="t-nav">
              <strong>Mail:</strong>{" "}
              <a href={`mailto:${profile.email}`} className="tap inline-block">
                {profile.email}
              </a>
            </p>
            <p className="t-nav">
              <strong>Open to:</strong> {profile.openTo}
            </p>
          </div>

          {socials.length > 0 && (
            <ul className="footer-socials">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="flex items-center gap-[10px]">
                    <Icon name={socialIcon(s.label)} />
                    <span className="t-nav">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            className="footer-top"
            aria-label="Back to top"
            onClick={() => {
              const l = getLenis();
              if (l) l.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Icon name="arrowUp" />
          </button>
        </footer>
      </div>
    </>
  );
}
