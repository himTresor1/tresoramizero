"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { about, type Experience as Row } from "@/content/about";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { HIDDEN, variantSpring } from "@/lib/motion";

/**
 * Experience table: 66px rows (role · organisation · period · index · arrow). Hovering a row turns
 * it accent and opens a summary card that trails the pointer on both axes through a soft spring (to
 * the right of the cursor, flipping left near the edge, clamped to the viewport): it lags behind a
 * fast flick and settles in slowly. A row with a URL is a link to that site. Keyboard focus shows the
 * same card beside the row.
 */
type Pt = { x: number; y: number };
const GAP = 24; // distance from the pointer to the card's near edge
const EDGE = 16; // viewport inset
const FOLLOW = { stiffness: 90, damping: 22, mass: 1.1 }; // heavy, slow trail
export function ExperienceRows() {
  const [active, setActive] = useState<number | null>(null);
  const open = useRef(false); // whether a card is currently shown (so a fresh entry can drift in)
  const cardRef = useRef<HTMLDivElement>(null);

  // The card's target position (where it should be for the current pointer) is a motion value; the
  // springs below trail it, so a fast flick leaves the card behind and it eases in afterwards.
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const left = useSpring(targetX, FOLLOW);
  const top = useSpring(targetY, FOLLOW);
  const lastPt = useRef<Pt>({ x: 0, y: 0 });
  const aim = useCallback(
    (p: Pt, jump = false) => {
      lastPt.current = p;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = cardRef.current?.offsetWidth ?? 400;
      const h = cardRef.current?.offsetHeight ?? 260;
      const fitsRight = p.x + GAP + w + EDGE <= vw;
      const x = Math.min(Math.max(EDGE, fitsRight ? p.x + GAP : p.x - GAP - w), vw - w - EDGE);
      const y = Math.min(Math.max(EDGE, p.y - 40), vh - h - EDGE);
      if (jump) {
        // first appearance: start a little behind the pointer so the card drifts in rather than pops
        left.jump(x);
        top.jump(y + 24);
      }
      targetX.set(x);
      targetY.set(y);
    },
    [left, top, targetX, targetY],
  );
  // a new row's card can be taller than the last one: re-clamp once its content has mounted
  useEffect(() => {
    if (active !== null) aim(lastPt.current);
  }, [active, aim]);

  const row = active !== null ? about.experience[active] : null;

  return (
    <>
      <ul
        className="archive-rows exp-rows"
        onMouseLeave={() => {
          open.current = false;
          setActive(null);
        }}
      >
        {about.experience.map((e, i) => (
          <Reveal key={e.title + e.org} as="li" fromY={16} amount={0.3} className="archive-row-wrap">
            <RowShell
              row={e}
              active={active === i}
              onEnter={(p) => {
                aim(p, !open.current);
                open.current = true;
                setActive(i);
              }}
              onMove={(p) => aim(p)}
              onLeave={() =>
                setActive((a) => {
                  if (a !== i) return a;
                  open.current = false;
                  return null;
                })
              }
            >
              <h3 className="t-row exp-col">{e.title}</h3>
              <span className="t-body exp-col exp-muted">{e.org}</span>
              <span className="t-body exp-col exp-muted">{e.period}</span>
              <span className="archive-end">
                <span className="t-mono exp-muted">{String(i + 1).padStart(2, "0")}</span>
                <Icon name="arrowUp" className="archive-arrow" />
              </span>
            </RowShell>
          </Reveal>
        ))}
      </ul>

      <AnimatePresence>
        {row && (
          <motion.div
            ref={cardRef}
            className="exp-card"
            style={{ top, left }}
            initial={{ opacity: HIDDEN, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: HIDDEN, y: 8, scale: 0.98 }}
            transition={variantSpring}
            aria-hidden="true"
          >
            <p className="t-row exp-card-title">
              {row.title} <span className="exp-card-org">@ {row.org}</span>
            </p>
            <ul className="exp-card-list">
              {row.summary.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            {row.url && <p className="exp-card-link">{row.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "")} ↗</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function RowShell({
  row,
  active,
  onEnter,
  onMove,
  onLeave,
  children,
}: {
  row: Row;
  active: boolean;
  onEnter: (p: Pt) => void;
  onMove: (p: Pt) => void;
  onLeave: () => void;
  children: React.ReactNode;
}) {
  const handlers = {
    onPointerEnter: (e: React.PointerEvent) => onEnter({ x: e.clientX, y: e.clientY }),
    onPointerMove: (e: React.PointerEvent) => onMove({ x: e.clientX, y: e.clientY }),
    onPointerLeave: onLeave,
    onFocus: (e: React.FocusEvent) => {
      const r = e.currentTarget.getBoundingClientRect();
      onEnter({ x: r.left + r.width * 0.31, y: r.top + r.height / 2 });
    },
    onBlur: onLeave,
  };
  const label = `${row.title} at ${row.org}, ${row.period}. ${row.summary.join(" ")}`;
  if (row.url) {
    return (
      <a href={row.url} target="_blank" rel="noreferrer" className="archive-row exp-row" data-active={active || undefined} aria-label={`${label} Opens ${row.org}'s website.`} {...handlers}>
        {children}
      </a>
    );
  }
  return (
    <div className="archive-row exp-row" data-active={active || undefined} tabIndex={0} aria-label={label} {...handlers}>
      {children}
    </div>
  );
}
