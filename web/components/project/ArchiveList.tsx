import type { ArchiveProject } from "@/content/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "// Old projects" (measured): rule + label row, 80px, then 66px rows (padding 20): name (18px
 * 600) · year (DM Mono, 24px after the name) · category at the half-way column · index (DM Mono)
 * · 24px arrow. Rows are links when a URL exists.
 */
export function ArchiveList({ items }: { items: ArchiveProject[] }) {
  return (
    <section className="archive" aria-labelledby="archive-label">
      <div className="h-px w-full bg-grey-light" aria-hidden="true" />
      <div className="intro-head">
        <SectionLabel id="archive-label">Old projects</SectionLabel>
      </div>
      <ul className="archive-rows">
        {items.map((p, i) => {
          const inner = (
            <>
              <span className="archive-name">
                <h3 className="t-row">{p.name}</h3>
                <span className="t-mono text-grey">({p.year})</span>
              </span>
              <span className="t-body archive-cat">{p.category}</span>
              <span className="archive-end">
                <span className="t-mono text-grey">{String(i + 1).padStart(2, "0")}</span>
                <Icon name="arrowUp" className="archive-arrow" />
              </span>
            </>
          );
          return (
            <Reveal key={p.name} fromY={16} amount={0.3} as="li" className="archive-row-wrap">
              {p.url ? (
                <a href={p.url} target="_blank" rel="noreferrer" className="archive-row">
                  {inner}
                </a>
              ) : (
                <div className="archive-row">{inner}</div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
