"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import type { Project } from "@/content/projects";
import { media } from "@/content/media";
import { Reveal } from "@/components/motion/Reveal";
import { variantSpring } from "@/lib/motion";

/** Document offset of an element in normal flow (unaffected by sticky positioning, unlike getBoundingClientRect). */
function documentTop(el: HTMLElement | null) {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

export function ProjectCard({ project, index, count }: { project: Project; index: number; count: number }) {
  const slot = useRef<HTMLDivElement>(null);
  const cover = media.projects[project.cover];
  const isLast = index === count - 1;

  // M7: every slot is sticky at top 0 inside the stack, so each card waits while the next one
  // slides over it. While the next slot travels one viewport (its top sits 1100px below this
  // slot's top: 900px slot + 200px gap), the card behind scales 1 → 0.9 and fades 1 → 0.
  // the range lives in a ref so the transformer below always reads the latest measurement
  const range = useRef<[number, number]>([Infinity, Infinity]);
  const [, bump] = useState(0);
  useEffect(() => {
    const measure = () => {
      const top = documentTop(slot.current);
      const vh = window.innerHeight;
      range.current = [top + 200, top + vh + 200];
      bump((n) => n + 1);
    };
    measure();
    window.addEventListener("resize", measure);
    // fonts and images can move the stack after mount
    const t = setTimeout(measure, 1500);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);
  const { scrollY } = useScroll();
  const progress = (y: number) => {
    const [a, b] = range.current;
    if (!Number.isFinite(a) || !Number.isFinite(b) || b === a) return 0; // not measured yet
    return Math.min(1, Math.max(0, (y - a) / (b - a)));
  };
  const scale = useTransform(scrollY, (y) => (isLast ? 1 : 1 - 0.1 * progress(y)));
  const opacity = useTransform(scrollY, (y) => (isLast ? 1 : 1 - progress(y)));

  // "View" cursor label over the image (M11): accent 84px circle following the pointer.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 300, damping: 30, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 300, damping: 30, mass: 0.5 });
  const hover = useMotionValue(0);
  const cursorScale = useSpring(hover, variantSpring);

  return (
    <div ref={slot} className="project-slot">
      <motion.div className="project-card" style={{ scale, opacity }}>
        <Reveal fromY={40} amount={0.2} className="project-card-inner">
          <Link
            href={`/projects/${project.slug}`}
            className="project-image"
            aria-label={`View ${project.name}`}
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              mx.set(e.clientX - r.left);
              my.set(e.clientY - r.top);
            }}
            onPointerEnter={() => hover.set(1)}
            onPointerLeave={() => hover.set(0)}
          >
            <img src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} loading={index === 0 ? "eager" : "lazy"} />
            <motion.span className="project-view" style={{ x: sx, y: sy, scale: cursorScale }} aria-hidden="true">
              View
            </motion.span>
          </Link>
          <div className="project-text">
            <div className="project-headline">
              <p className="t-mono text-ink">({project.year})</p>
              <h3 className="t-h3">
                <Link href={`/projects/${project.slug}`} className="tap">
                  {project.name}
                </Link>
              </h3>
              <p className="t-body project-summary">{project.overview}</p>
            </div>
            <ul className="project-tags">
              {project.tags.map((t) => (
                <li key={t} className="t-body">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </motion.div>
    </div>
  );
}
