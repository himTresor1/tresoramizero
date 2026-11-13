import type { Project } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Title + overview (measured): section 900px tall with 96px bottom padding; the content row starts
 * 320px down. Left: h1 120px/108 −0.04em in a 724px column (padding 0 0 20px 20px). Right (x 736,
 * 704 wide): "// Overview" label in a 12px 20px cell, then the overview paragraph (40px/44px,
 * −0.02em, weight 500) with 20px padding and a 36px gap for the facts row.
 */
export function ProjectOverview({ project }: { project: Project }) {
  return (
    <section className="project-overview" aria-labelledby="project-title">
      <div className="project-overview-row">
        <div className="project-title-cell">
          <Reveal fromY={24} amount={0.3}>
            <h1 id="project-title" className="t-project-title">
              {project.name}
            </h1>
          </Reveal>
        </div>
        <div className="project-overview-col">
          <div className="project-overview-label">
            <SectionLabel inline>Overview</SectionLabel>
          </div>
          <Reveal fromY={24} amount={0.2} className="project-overview-text">
            <p className="t-overview">{project.overview}</p>
            <dl className="project-facts">
              {project.facts.map((f) => (
                <div key={f.label} className="project-fact">
                  <dt className="t-mono text-grey">{f.label}</dt>
                  <dd className="t-row">{f.value}</dd>
                </div>
              ))}
            </dl>
            {project.link && (
              <a href={project.link.url} target="_blank" rel="noreferrer" className="t-row project-link tap inline-block">
                {project.link.label} ↗
              </a>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
