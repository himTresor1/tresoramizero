"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { Project } from "@/content/projects";
import { media } from "@/content/media";

/**
 * Sticky horizontal scroll: a 100vh sticky viewport inside a tall section;
 * the card track (n × 1280px) slides left as the section scrolls. The section's base height is
 * n × 450px; with few cards that leaves no travel, so the height is the larger
 * of that and 100vh + the track overflow × 0.31 (the px-per-px scroll ratio).
 * Cards: 1280×900 slots (padding 60 20 20) → 1240×820 white panels (padding 12, radius 20),
 * image 778×796 (radius 16) + text column 428 (padding 32).
 */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLElement>(null);
  const [travel, setTravel] = useState(0);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (vw < 1200) {
        // under the desktop breakpoint the cards stack in flow (globals.css): no sticky, no travel
        setTravel(0);
        setHeight(undefined);
        return;
      }
      const cardW = 1280;
      const track = cardW * projects.length;
      const t = Math.max(0, track - vw);
      setTravel(t);
      setHeight(Math.max(projects.length * (vh / 2), vh + t * 0.307));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [projects.length]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  return (
    <section ref={ref} className="work-index" style={{ height }} aria-label="Project index">
      <div className="work-sticky">
        <motion.div className="work-track" style={{ x }}>
          {projects.map((p, i) => {
            const cover = media.projects[p.cover];
            return (
              <article key={p.slug} className="work-slot">
                <div className="work-card">
                  <Link href={`/projects/${p.slug}`} className="work-image" aria-label={`View ${p.name}`}>
                    <img src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} loading={i === 0 ? "eager" : "lazy"} />
                  </Link>
                  <div className="work-text">
                    <div className="project-headline">
                      <p className="t-mono text-ink">({p.year})</p>
                      <h2 className="t-h3">
                        <Link href={`/projects/${p.slug}`} className="tap inline-block">
                          {p.name}
                        </Link>
                      </h2>
                      <p className="t-body work-summary">{p.overview}</p>
                    </div>
                    <ul className="project-tags">
                      {p.tags.map((t) => (
                        <li key={t} className="t-body">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
