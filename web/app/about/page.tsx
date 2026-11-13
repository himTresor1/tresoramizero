import type { Metadata } from "next";
import { about } from "@/content/about";
import { media } from "@/content/media";
import { profile } from "@/content/profile";
import { ScrollRevealText } from "@/components/motion/ScrollRevealText";
import { Reveal } from "@/components/motion/Reveal";
import { PillButton } from "@/components/ui/PillButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Facts } from "@/components/about/Facts";
import { ExperienceRows } from "@/components/about/ExperienceRows";
import { Trust } from "@/components/sections/Trust";

const aboutDescription = `About ${profile.fullName}: product designer in ${profile.location}, trained at Rwanda Coding Academy, with work for the Development Bank of Rwanda, IST Africa, O2Labbs, MININFRA and the Rwanda TVET Board.`;
export const metadata: Metadata = {
  title: `About ${profile.fullName} — Product Designer`,
  description: aboutDescription,
  alternates: { canonical: "/about" },
  openGraph: { title: `About ${profile.fullName}`, description: aboutDescription, url: "/about", type: "profile", firstName: profile.firstName, lastName: profile.lastName },
};

/**
 * /about: hero (padding 320 20 160, gap 80) with a 64×96 portrait
 * beside the 72px lead and a three-column row (two paragraphs + "Let's Talk"); a 900px image
 * frame (image 1080 tall, −180); "// Recognition and Awards" rows (66px) — here "// Experience";
 * a dark 900px quote on a dimmed image (text 764 wide centred, 72px white reveal); "// Facts"
 * with the sticky outlined number; the trust strip.
 */
export default function AboutPage() {
  return (
    <>
      <section className="about-hero" aria-label="About Tresor">
        <div className="about-lead-row">
          <Reveal className="about-portrait" fromY={12}>
            <img src={media.portraitSmall.src} alt={media.portraitSmall.alt} width={64} height={96} />
          </Reveal>
          <ScrollRevealText text={about.lead} indent={9} indentSmall={0} className="about-lead t-h2" start={0.9} end={0.45} as="h1" />
        </div>
        <div className="about-columns">
          {about.columns.map((c) => (
            <Reveal key={c.slice(0, 12)} fromY={16} className="about-col">
              <p className="t-body">{c}</p>
            </Reveal>
          ))}
          <Reveal fromY={16} className="about-col about-cta">
            <PillButton href="/contact">{about.cta}</PillButton>
          </Reveal>
        </div>
      </section>

      <section className="about-frame" aria-label="Studio photo">
        <div className="about-frame-image">
          <img src={media.aboutImage.src} alt={media.aboutImage.alt} width={media.aboutImage.width} height={media.aboutImage.height} loading="lazy" />
        </div>
      </section>

      <section className="about-exp" aria-labelledby="exp-label">
        <div className="h-px w-full bg-grey-light" aria-hidden="true" />
        <div className="intro-head">
          <SectionLabel id="exp-label">Experience</SectionLabel>
        </div>
        <ExperienceRows />
      </section>

      <section className="about-quote" aria-label="Approach">
        <div className="about-quote-image" aria-hidden="true">
          <img src={media.aboutQuoteImage.src} alt="" width={media.aboutQuoteImage.width} height={media.aboutQuoteImage.height} loading="lazy" />
        </div>
        <div className="about-quote-text">
          <ScrollRevealText text={about.quote} className="t-quote about-quote-copy" start={0.8} end={0.4} dark />
        </div>
      </section>

      <Facts />
      <Trust />
    </>
  );
}
