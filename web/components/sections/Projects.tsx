"use client";

import { useRef } from "react";
import { publishedProjects } from "@/content/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "./ProjectCard";

/**
 * "// Projects" (measured): section bg ink-deep, sticky label row, 60px top padding, one 900px
 * sticky slot per card (top 0) with 200px between slots, 120px bottom padding. Each card is a
 * white 1400×820 panel (padding 12, radius 20): image 881×796 (radius 16) + text column (485,
 * padding 32). As the next card slides over, the card behind scales 1 → 0.9 and fades 1 → 0 across
 * exactly one viewport of scroll (motion-probe, M7).
 */
export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section id="projects" className="projects relative bg-page-deep" aria-labelledby="projects-label">
      <div className="projects-head">
        <SectionLabel id="projects-label">Projects</SectionLabel>
      </div>
      <div ref={ref} className="projects-stack">
        {publishedProjects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} count={publishedProjects.length} />
        ))}
      </div>
    </section>
  );
}
