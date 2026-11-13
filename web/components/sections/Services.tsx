"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/content/services";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { StickyNumber } from "./StickyNumber";

/**
 * "// Services". Desktop: rule + 49px label row, 40px, then the
 * "content" row (padding 20, gap 32): the outlined number (462×342, DM Mono 300 252px, sticky top
 * 96px) and the card column (x 514, 906 wide, padding-top 160, gap 240 between groups). Each
 * group: h2 72px + description (16px inset, 640 max), then 80px, then the rows (58px, padding
 * 0 24px, h4 + DM Mono index, 1px rules). Groups enter at scale 0.9 / opacity 0 (reveal timing).
 * The number reads the group whose top has passed the number's own top (M6).
 */
export function Services() {
  const [active, setActive] = useState(0);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = 96 + 342 / 2; // the number's vertical centre, in viewport px
      let idx = 0;
      groupRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      setActive((a) => (a === idx ? a : idx));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="services" className="services relative bg-page" aria-label="Services">
      <div className="h-px w-full bg-grey-light" aria-hidden="true" />
      <div className="intro-head">
        <SectionLabel id="services-label">Services</SectionLabel>
      </div>
      <div className="services-content">
        <div className="services-number-col">
          <StickyNumber index={active} total={services.length} />
        </div>
        <div className="services-cards">
          {services.map((g, i) => (
            <Reveal
              key={g.title}
              fromScale={0.9}
              amount={0.15}
              className="services-group"
              ref={(el: HTMLDivElement | null) => {
                groupRefs.current[i] = el;
              }}
            >
              <div className="services-group-head">
                <h2 className="t-h2">{g.title}</h2>
                <p className="t-body services-group-desc">{g.description}</p>
              </div>
              <ul className="services-rows">
                {g.items.map((item, j) => (
                  <li key={item} className="services-row">
                    <h3 className="t-row">{item}</h3>
                    <span className="t-mono text-grey">{String(j + 1).padStart(2, "0")}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
