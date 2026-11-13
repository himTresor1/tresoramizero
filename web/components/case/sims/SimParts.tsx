"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from "react";

/** True while the media query matches (false on the server). */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** A fake pointer that glides to the element marked `data-sim-target={target}` inside `host`. */
export function SimCursor({ host, target, pressing, layoutKey }: { host: RefObject<HTMLDivElement | null>; target: string | null; pressing: boolean; layoutKey: unknown }) {
  const ref = useRef<HTMLDivElement>(null);
  // positioned straight on the node after layout (no state → no cascading renders)
  useLayoutEffect(() => {
    const node = ref.current;
    const root = host.current;
    if (!node) return;
    const el = root && target ? root.querySelector<HTMLElement>(`[data-sim-target="${target}"]`) : null;
    if (!el || !root) {
      node.style.opacity = "0";
      return;
    }
    const r = el.getBoundingClientRect();
    const h = root.getBoundingClientRect();
    const x = (r.left - h.left + r.width / 2) / (r.width > 0 ? 1 : 1);
    const y = r.top - h.top + r.height / 2;
    node.style.opacity = "1";
    node.style.transform = `translate(${x}px, ${y}px) scale(${pressing ? 0.86 : 1})`;
  }, [host, target, pressing, layoutKey]);
  return (
    <div ref={ref} className="sim-cursor" style={{ opacity: 0 }} aria-hidden="true">
      <svg width="22" height="24" viewBox="0 0 22 24">
        <path d="M2 2 L2 19 L6.5 15 L9.5 22 L12.8 20.6 L9.8 13.8 L16 13.4 Z" fill="#171717" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Scales a fixed design width into whatever box it is given (like Script's hero demo). */
export function SimScale({ width, height, children, className = "" }: { width: number; height: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      if (e.contentRect.width > 0) setScale(e.contentRect.width / width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={ref} className={`sim-scale ${className}`} style={{ height: height * scale }}>
      <div className="sim-scale-inner" style={{ width, height, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

/** Renders a streamed answer: **bold** and [n] citation chips, with chip `active` highlighted. */
export function Rich({ text, active, onChip }: { text: string; active?: number | null; onChip?: string }) {
  // A chip run plus the punctuation that follows it ("[1][2].") stays on one line.
  const parts = text.split(/((?:\[\d+\])+[.,;:]?)|(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        if (/^\*\*/.test(p)) return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (/^\[\d+\]/.test(p)) {
          const chips = [...p.matchAll(/\[(\d+)\]/g)].map((m) => Number(m[1]));
          const tail = p.replace(/\[\d+\]/g, "");
          return (
            <span key={i} className="sfig-chip-run">
              {chips.map((n) => (
                <span key={n} className={`sfig-chip ${active === n ? "sfig-chip-active" : ""}`} data-sim-target={onChip ? `${onChip}-${n}` : undefined}>
                  {n}
                </span>
              ))}
              {tail}
            </span>
          );
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

export function Caret() {
  return <span className="sim-caret" aria-hidden="true" />;
}

export function Orb({ size = 22, status }: { size?: number; status?: string | null }) {
  return (
    <span className="sim-orb-wrap">
      <span className={`sim-orb ${status ? "sim-orb-live" : ""}`} style={{ width: size, height: size }} aria-hidden="true" />
      {status && <span className="sim-status">{status}</span>}
    </span>
  );
}
