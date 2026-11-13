import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The template's "See my Work" pill (measured): 184×65, padding 20px 40px, radius 56, 1px rule,
 * grey label. Hover (M8): an accent circle grows from the bottom centre to ~285px and the label
 * slides up 35px to reveal a white copy. Styles in globals.css (.pill).
 */
export function PillButton({ href, children, className = "", external = false }: { href: string; children: ReactNode; className?: string; external?: boolean }) {
  const inner = (
    <>
      <span className="pill-circle" aria-hidden="true" />
      <span className="pill-text">
        <span className="pill-label">{children}</span>
        <span className="pill-label pill-label-alt" aria-hidden="true">
          {children}
        </span>
      </span>
    </>
  );
  if (external) {
    return (
      <a href={href} className={`pill ${className}`} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={`pill ${className}`}>
      {inner}
    </Link>
  );
}
