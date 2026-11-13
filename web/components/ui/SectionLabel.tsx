/**
 * "// Intro" — the accent label that opens every section. Slash at x=20, word at x=44 (desktop).
 * `inline` renders the slashes inside the heading itself, as the project page's "// Overview" does.
 */
export function SectionLabel({ children, id, className = "", inline = false }: { children: string; id?: string; className?: string; inline?: boolean }) {
  if (inline) {
    return (
      <h2 id={id} className={`t-label ${className}`}>
        {"// "}
        {children}
      </h2>
    );
  }
  return (
    <div id={id} className={`section-label ${className}`}>
      <span className="t-slash" aria-hidden="true">
        {"//"}
      </span>
      <h2 className="t-label">{children}</h2>
    </div>
  );
}
