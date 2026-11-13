import { trustedBy } from "@/content/testimonials";
import { Marquee } from "@/components/ui/Marquee";

/** 96px logo ticker (measured): 60px items, 32px gap, white strip. Text wordmarks until logos arrive. */
export function Trust() {
  return (
    <section className="trust bg-page" aria-label="Organisations I have worked with">
      <Marquee pxPerSec={70} copies={2} className="trust-track">
        <ul className="trust-list">
          {trustedBy.map((name) => (
            <li key={name} className="trust-item">
              <span className="trust-mark">{name}</span>
            </li>
          ))}
        </ul>
      </Marquee>
    </section>
  );
}
