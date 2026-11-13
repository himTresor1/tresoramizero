"use client";

import { useEffect, useRef, useState } from "react";
import { about } from "@/content/about";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { StickyNumber } from "@/components/sections/StickyNumber";

/**
 * "// Facts": label row, 40px, then a row (gap 40) of the sticky outlined number
 * (475×352) and a 925px card column (x 515) whose blocks (x 561, 832 wide, padding 160 0,
 * gap 64) hold a 72px title and a body paragraph, separated by 1px lines; 306px spacer at the end.
 * The number shows each block's own figure.
 */
export function Facts() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = 96 + 352 / 2;
      let idx = 0;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      setActive((a) => (a === idx ? a : idx));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="facts" aria-label="Facts">
      <div className="h-px w-full bg-grey-light" aria-hidden="true" />
      <div className="intro-head">
        <SectionLabel>Facts</SectionLabel>
      </div>
      <div className="facts-content">
        <div className="facts-number-col">
          <StickyNumber index={active} total={about.facts.length} labels={about.facts.map((f) => f.number)} />
        </div>
        <div className="facts-cards">
          {about.facts.map((f, i) => (
            <Reveal
              key={f.title}
              fromScale={0.9}
              amount={0.2}
              className="facts-block"
              ref={(el: HTMLDivElement | null) => {
                refs.current[i] = el;
              }}
            >
              <span className="t-number facts-number-inline" aria-hidden="true">
                {f.number}
              </span>
              <h2 className="t-h2">{f.title}</h2>
              <p className="t-body facts-text">{f.text}</p>
            </Reveal>
          ))}
          <div className="facts-spacer" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
