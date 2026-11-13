"use client";

import { motion, useScroll, useTransform } from "motion/react";
import type { Project } from "@/content/projects";
import { media } from "@/content/media";
import { HIDDEN } from "@/lib/motion";

/**
 * Project page hero (measured on /projects/formula-vintage): a 1440×900 white container whose
 * image is 1504×964 at (−32, −32) — a 32px overscan that the scroll parallax uses. Loads in with
 * the M1 reveal.
 */
export function ProjectHero({ project }: { project: Project }) {
  const cover = media.projects[project.cover];
  // measured with wheel scrolling: the cover eases to scale 0.985 over the first ~600px of scroll
  const { scrollY } = useScroll();
  const scrollScale = useTransform(scrollY, [0, 600], [1, 0.985], { clamp: true });
  return (
    <section className="project-hero" aria-label={`${project.name} cover`}>
      <motion.div
        className="project-hero-image"
        style={{ scale: scrollScale }}
        initial={{ opacity: HIDDEN }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", duration: 0.65, bounce: 0 }}
      >
        <img src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} fetchPriority="high" />
      </motion.div>
    </section>
  );
}
