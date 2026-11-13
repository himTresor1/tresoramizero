import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { ContactForm } from "@/components/contact/ContactForm";
import { Icon, socialIcon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

const contactDescription = `Get in touch with ${profile.fullName}, product designer in ${profile.location}, for product design roles and freelance work.`;
export const metadata: Metadata = {
  title: `Contact ${profile.fullName}`,
  description: contactDescription,
  alternates: { canonical: "/contact" },
  openGraph: { title: `Contact ${profile.fullName}`, description: contactDescription, url: "/contact" },
};

/**
 * /contact: one section (padding 180 20 40, two columns 76px apart): "Reach Out"
 * h1 120/108 in a 462px column; the form column at x 558 (862 wide, padding-top 200, gap 40):
 * h2 40px/40, four underlined fields (16px Inter, 63px pitch), a 189×60 ink pill, then the
 * details block (padding-top 56, gap 60): three lines and the socials row.
 */
export default function ContactPage() {
  const socials = profile.socials.filter((s) => s.url);
  return (
    <section className="contact" aria-labelledby="contact-title">
      <div className="contact-headline">
        <Reveal fromY={24}>
          <h1 id="contact-title" className="t-project-title">
            Reach
            <br />
            Out
          </h1>
        </Reveal>
      </div>
      <div className="contact-col">
        <Reveal fromY={24} amount={0.1}>
          <h2 className="t-contact-h2">
            Tell me about your idea.
            <br />
            I’ll take it from there.
          </h2>
        </Reveal>
        <ContactForm />
        <div className="contact-details">
          <div className="contact-lines">
            <p className="t-body">
              <strong>Based in:</strong> {profile.location}
            </p>
            <p className="t-body">
              <strong>Mail:</strong>{" "}
              <a href={`mailto:${profile.email}`} className="tap inline-block">
                {profile.email}
              </a>
            </p>
            <p className="t-body">
              <strong>Open to:</strong> {profile.openTo}
            </p>
          </div>
          {socials.length > 0 && (
            <ul className="contact-socials">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="flex items-center gap-[10px] text-grey">
                    <Icon name={socialIcon(s.label)} />
                    <span className="t-body">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
