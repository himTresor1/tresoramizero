"use client";

import { type CSSProperties, type ReactNode } from "react";

/**
 * Infinite horizontal ticker. Renders the item 2 × `copies` times and slides the track by exactly
 * one set, so the loop is seamless. `pxPerSec` is set per use (hero name: 70 px/s).
 * `item(i)` lets the first copy carry the real element (an h1) while the rest stay decorative.
 */
export function Marquee({
  children,
  item,
  pxPerSec,
  copies = 6,
  className = "",
  style,
}: {
  children?: ReactNode;
  item?: (index: number) => ReactNode;
  pxPerSec: number;
  copies?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`marquee ${className}`} style={style}>
      <MarqueeTrack pxPerSec={pxPerSec}>
        {Array.from({ length: copies * 2 }).map((_, i) => (
          <div className="marquee-item" key={i} aria-hidden={i > 0 || undefined}>
            {item ? item(i) : children}
          </div>
        ))}
      </MarqueeTrack>
    </div>
  );
}

function MarqueeTrack({ pxPerSec, children }: { pxPerSec: number; children: ReactNode }) {
  // duration = (half the track) / speed; the half-track width is only known after layout, so the
  // track measures itself once mounted and sets --marquee-duration
  return (
    <div
      className="marquee-track"
      ref={(el) => {
        if (!el) return;
        const set = () => {
          const half = el.scrollWidth / 2;
          el.style.setProperty("--marquee-duration", `${half / pxPerSec}s`);
        };
        set();
        if (typeof ResizeObserver !== "undefined") {
          const ro = new ResizeObserver(set);
          ro.observe(el);
        }
      }}
    >
      {children}
    </div>
  );
}
