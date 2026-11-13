import { profile } from "@/content/profile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollRevealText } from "@/components/motion/ScrollRevealText";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "// Intro" (measured, docs/forensics.md). Desktop: 1px rule, 49px label row, container padding
 * 120px 20px, lead paragraph 1200px wide centred (72px/74px, −0.04em, first line indented with
 * 21 nbsp), then a 60px gap and a 2-column bottom row (684 | 684, gap 32) whose right column holds
 * the 530px body paragraph and, 60px below, the pill button. 120px bottom padding.
 * Under 1200px: padding 0 16px, lead 28px/28px with 9 nbsp, body 14px/19.6, one column, gap 40.
 */
export function Intro() {
  return (
    <section id="intro" className="intro relative bg-page" aria-labelledby="intro-label">
      <div className="h-px w-full bg-grey-light" aria-hidden="true" />
      <div className="intro-head">
        <SectionLabel id="intro-label">Intro</SectionLabel>
      </div>
      <div className="intro-body">
        {/* the template's component props (read from its React tree): useScrollColor, startOffset
            "start 0.75", endOffset "start 0.35", 21 leading nbsp on desktop, 9 under 1200px */}
        <ScrollRevealText text={profile.intro.lead} indent={21} indentSmall={9} className="intro-lead t-lead" start={0.75} end={0.35} />
        <div className="intro-bottom">
          <div className="intro-spacer" aria-hidden="true" />
          <Reveal className="intro-content">
            <p className="t-body intro-copy">{profile.intro.body}</p>
            <PillButton href="/#projects">{profile.intro.cta}</PillButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
