"use client";

import { useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BP } from "@/lib/motion";

/**
 * Per-character colour reveal scrubbed by scroll: the template's text component (props read from
 * its React tree: `useScrollColor`, `scrollColor` = faint, `defaultColor` = ink, `primaryColor` =
 * accent over a start/end index, `startOffset` "start 0.75", `endOffset` "start 0.35"). Every
 * character starts faint and turns ink — or accent inside the *asterisk* range — linearly as the
 * element's top travels from 75% to 35% of the viewport.
 */
export function ScrollRevealText({
  text,
  className = "",
  start = 0.75,
  end = 0.35,
  indent = 0,
  indentSmall,
  as: Tag = "p",
  dark = false,
}: {
  text: string;
  className?: string;
  start?: number;
  end?: number;
  /** leading nbsp count (the template indents the first line with spaces) */
  indent?: number;
  /** leading nbsp count under the desktop breakpoint */
  indentSmall?: number;
  as?: "p" | "h1" | "h2" | "h3";
  /** on a dark backdrop the revealed colour is white and the un-revealed one a dim grey */
  dark?: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${BP.desktop - 1}px)`);
    const on = () => setSmall(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const chars = useMemo(() => parse(text, small && indentSmall !== undefined ? indentSmall : indent), [text, indent, indentSmall, small]);
  const { scrollYProgress } = useScroll({ target: ref, offset: [`start ${start * 100}%`, `start ${end * 100}%`] });
  const count = useTransform(scrollYProgress, [0, 1], [0, chars.length]);
  const [revealed, setRevealed] = useState(0);
  useMotionValueEvent(count, "change", (v) => setRevealed(Math.round(v)));

  const nodes: ReactNode[] = chars.map((c, i) => (
    <span key={i} className={i < revealed ? (c.accent ? "text-accent" : dark ? "text-on-dark" : "text-ink") : dark ? "text-reveal-dim-dark" : "text-reveal-dim"}>
      {c.ch}
    </span>
  ));

  // the per-character spans are decoration for assistive tech; the plain text is read instead
  return (
    <Tag ref={ref as never} className={className}>
      <span className="sr-only">{text.replace(/\*/g, "")}</span>
      <span aria-hidden="true">{nodes}</span>
    </Tag>
  );
}

function parse(text: string, indent: number) {
  const out: { ch: string; accent: boolean }[] = [];
  // plain spaces (the element is `white-space: pre-wrap`), as the template does: an nbsp falls back
  // to another font's glyph in Inter Display and grows every line box by a few px
  for (let i = 0; i < indent; i++) out.push({ ch: " ", accent: false });
  let accent = false;
  for (const ch of text) {
    if (ch === "*") {
      accent = !accent;
      continue;
    }
    out.push({ ch, accent });
  }
  return out;
}
