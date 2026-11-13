import Link from "next/link";
import type { Project } from "@/content/projects";
import { media } from "@/content/media";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "// More Projects": rule + label row, 48px gap, then a 3-column grid of 480×636
 * cards with no gap: white panel (padding 12, radius 20), image 456×496 (radius 16), text block
 * (padding 16): h3 40px/40 −0.033em, then the year in DM Mono.
 */
export function MoreProjects({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;
  return (
    <section className="more-projects" aria-labelledby="more-projects-label">
      <div className="h-px w-full bg-grey-light" aria-hidden="true" />
      <div className="intro-head">
        <SectionLabel id="more-projects-label">More Projects</SectionLabel>
      </div>
      <ul className="more-grid">
        {projects.map((p, i) => {
          const cover = media.projects[p.cover];
          return (
            <li key={p.slug} className="more-cell">
              <Reveal fromY={32} amount={0.2} delay={0.08 * (i % 3)} className="more-card">
                <Link href={`/projects/${p.slug}`} className="more-card-link">
                  <span className="more-image">
                    <img src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} loading="lazy" />
                  </span>
                  <span className="more-text">
                    <span className="t-more-title">{p.name}</span>
                    <span className="t-mono text-ink">({p.year})</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
