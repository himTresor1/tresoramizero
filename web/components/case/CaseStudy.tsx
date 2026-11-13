import type { CaseStudy as CaseStudyT, CaseBlock } from "@/content/case-studies/types";
import type { Project } from "@/content/projects";
import { media } from "@/content/media";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollRevealText } from "@/components/motion/ScrollRevealText";
import { CitedAnswerFigure } from "./figures/CitedAnswer";
import { ClearanceFigure } from "./figures/Clearance";
import { WorkflowFigure } from "./figures/Workflow";
import { PaletteFigure } from "./figures/Palette";
import { Sim, BrandFigure, IsoFigure } from "./sims";

/**
 * Case-study renderer. Skeleton follows the strong examples (Sai Tharun's Licious studies and
 * the usual Problem → Decisions → Outcome shape): hero meta block, eyebrow + headline + short
 * body pairs, numbered steps, stat tiles, before/after pairs, pull quotes, and figures rebuilt
 * from the product. Type and spacing follow the site's type roles; nothing is bold inside paragraphs.
 */
export function CaseStudy({ project, study }: { project: Project; study: CaseStudyT }) {
  return (
    <article className="case">
      <header className="case-head">
        <div className="case-head-row">
          <div className="case-title-cell">
            <Reveal fromY={24}>
              <p className="t-label case-eyebrow">{study.eyebrow}</p>
              <h1 className="t-project-title">{project.name}</h1>
              <p className="case-tagline">{study.tagline}</p>
            </Reveal>
          </div>
          <Reveal fromY={24} amount={0.1} className="case-intro-cell">
            <p className="t-overview case-intro">{study.intro}</p>
            {project.link && (
              <a href={project.link.url} target="_blank" rel="noreferrer" className="t-row project-link tap inline-block">
                {project.link.label} ↗
              </a>
            )}
          </Reveal>
        </div>
        <Reveal fromY={16} amount={0.2} className="case-meta">
          {study.meta.map((m) => (
            <div key={m.label} className="case-meta-item">
              <span className="t-mono text-grey case-meta-label">{m.label}</span>
              <span className="t-row">{m.value}</span>
            </div>
          ))}
        </Reveal>
      </header>

      <div className="case-body">
        {study.blocks.map((b, i) => (
          <Block key={i} block={b} />
        ))}
      </div>
    </article>
  );
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <Reveal fromY={20} amount={0.3} className="case-heading">
          <p className="t-label case-eyebrow">{block.eyebrow}</p>
          <h2 className="t-case-h2">{block.title}</h2>
        </Reveal>
      );
    case "text":
      return (
        <Reveal fromY={16} amount={0.2} className="case-text">
          <p className="t-case-body">{block.body}</p>
        </Reveal>
      );
    case "image": {
      const img = media.projects[block.key];
      return (
        <Reveal fromY={24} amount={0.15} as="section" className="case-image">
          <div className="case-image-frame">
            <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" />
          </div>
          {block.caption && <p className="t-body case-caption">{block.caption}</p>}
        </Reveal>
      );
    }
    case "steps":
      return (
        <ol className="case-steps">
          {block.items.map((s, i) => (
            <Reveal key={s.n} as="li" fromY={16} amount={0.2} delay={0.06 * i} className="case-step">
              <span className="t-mono text-accent">{s.n}</span>
              <h3 className="t-row case-step-title">{s.title}</h3>
              <p className="t-body">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      );
    case "stats":
      return (
        <ul className="case-stats">
          {block.items.map((s, i) => (
            <Reveal key={s.label} as="li" fromY={16} amount={0.2} delay={0.06 * i} className="case-stat">
              <span className="case-stat-value">{s.value}</span>
              <span className="t-body">{s.label}</span>
            </Reveal>
          ))}
        </ul>
      );
    case "compare": {
      const a = media.projects[block.before.key];
      const b = media.projects[block.after.key];
      return (
        <Reveal fromY={24} amount={0.15} as="section" className="case-compare">
          {[
            { img: a, ...block.before },
            { img: b, ...block.after },
          ].map((side) => (
            <figure key={side.label} className="case-compare-side">
              <figcaption className="t-mono text-grey">{side.label}</figcaption>
              <div className="case-image-frame">
                <img src={side.img.src} alt={side.img.alt} width={side.img.width} height={side.img.height} loading="lazy" />
              </div>
              <p className="t-body case-caption">{side.caption}</p>
            </figure>
          ))}
        </Reveal>
      );
    }
    case "quote":
      return (
        <Reveal fromY={16} amount={0.3} as="section" className="case-quote">
          <blockquote>
            <ScrollRevealText text={`“${block.text}”`} className="t-quote case-quote-text" start={0.85} end={0.45} />
          </blockquote>
          {block.source && <p className="t-mono text-grey case-quote-source">— {block.source}</p>}
        </Reveal>
      );
    case "question":
      return (
        <Reveal fromY={16} amount={0.3} as="section" className="case-question">
          <p className="t-label case-eyebrow">The design question</p>
          <p className="t-case-question">{block.text}</p>
        </Reveal>
      );
    case "list":
      return (
        <Reveal fromY={16} amount={0.2} as="section" className="case-list">
          <h3 className="t-row">{block.title}</h3>
          <ul>
            {block.items.map((it) => (
              <li key={it} className="t-body">
                {it}
              </li>
            ))}
          </ul>
        </Reveal>
      );
    case "figure":
      return (
        <Reveal fromY={24} amount={0.15} as="section" className="case-figure">
          <div className="case-figure-frame">
            {block.figure === "cited-answer" && <CitedAnswerFigure />}
            {block.figure === "clearance" && <ClearanceFigure />}
            {block.figure === "workflow" && <WorkflowFigure />}
            {block.figure === "palette" && <PaletteFigure />}
            {block.figure === "brand" && <BrandFigure />}
          </div>
          {block.caption && <p className="t-body case-caption">{block.caption}</p>}
        </Reveal>
      );
    case "sim":
      return (
        <Reveal fromY={24} amount={0.1} as="section" className="case-sim">
          <div className={`case-sim-frame ${block.sim === "product" ? "case-sim-frame-product" : ""}`}>
            <Sim name={block.sim} />
          </div>
          {block.caption && <p className="t-body case-caption">{block.caption}</p>}
        </Reveal>
      );
    case "split":
      return (
        <Reveal fromY={20} amount={0.15} as="section" className={`case-split ${block.flip ? "case-split-flip" : ""}`}>
          <div className="case-split-text">
            <p className="t-case-body">{block.body}</p>
          </div>
          <div className="case-split-sim">
            <div className={`case-sim-frame case-sim-frame-small ${block.iso ? "case-sim-frame-iso" : ""}`}>
              {block.sim && <Sim name={block.sim} />}
              {block.iso && <IsoFigure name={block.iso.name} title={block.iso.title} height={block.iso.height ?? 420} />}
            </div>
            {block.caption && <p className="t-body case-caption">{block.caption}</p>}
          </div>
        </Reveal>
      );
    case "iso":
      return (
        <Reveal fromY={24} amount={0.1} as="section" className="case-iso">
          <div className="case-iso-frame">
            <IsoFigure name={block.name} title={block.title} height={block.height} />
          </div>
          {block.caption && <p className="t-body case-caption">{block.caption}</p>}
        </Reveal>
      );
  }
}
