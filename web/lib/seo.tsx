import { profile } from "@/content/profile";

/**
 * Structured data (schema.org JSON-LD) so search engines connect the name, the role, the city and
 * this site. The Person node is what a "Tresor Amizero" search can show as a knowledge panel.
 */
const PERSON_ID = `${profile.meta.siteUrl}/#person`;
const SITE_ID = `${profile.meta.siteUrl}/#website`;

export function personSchema() {
  const sameAs = profile.socials.map((s) => s.url).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.fullName,
    givenName: profile.firstName,
    familyName: profile.lastName,
    jobTitle: profile.meta.jobTitle,
    description: profile.meta.description,
    url: profile.meta.siteUrl,
    image: `${profile.meta.siteUrl}/opengraph-image`,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Kigali", addressCountry: "RW" },
    worksFor: { "@type": "Organization", name: profile.meta.employer.name, url: profile.meta.employer.url },
    alumniOf: { "@type": "EducationalOrganization", name: profile.meta.alumniOf.name, url: profile.meta.alumniOf.url },
    knowsAbout: ["Product design", "UX design", "UI design", "Design systems", "Prototyping", "Front-end development"],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: profile.meta.siteName,
    url: profile.meta.siteUrl,
    description: profile.meta.description,
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

export function caseStudySchema(p: { name: string; summary: string; slug: string; year: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${p.name} — case study`,
    headline: `${p.name} — product design case study by ${profile.fullName}`,
    description: p.summary,
    url: `${profile.meta.siteUrl}/projects/${p.slug}`,
    dateCreated: p.year.slice(0, 4),
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    isPartOf: { "@id": SITE_ID },
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}
