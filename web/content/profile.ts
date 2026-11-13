/** Everything about Tresor that appears on the site. Nothing here is hard-coded in components. */

export const profile = {
  /** Shown in the hero and the browser title. */
  firstName: "Tresor",
  lastName: "Amizero",
  fullName: "Tresor Amizero",
  /** The hero's role lines. */
  roles: ["Product Designer", "Design Systems"],
  /** Nav wordmark. */
  wordmark: "Tresor Amizero",
  location: "Kigali, Rwanda",
  /** Third footer line (no phone number ships). */
  openTo: "Product design roles and freelance work",
  /** The one contact email. */
  email: "peaceamizero@gmail.com",
  /** Only real handles ship. Entries with an empty url are hidden. */
  socials: [
    { label: "Linkedin", url: "" },
    { label: "Twitter", url: "" },
    { label: "Instagram", url: "" },
  ],
  intro: {
    /** Words between *asterisks* are the accent words (one highlighted clause). */
    lead:
      "I’m a *product designer who partners with teams to turn ideas into real products.* I focus on clear interfaces, sharp decisions, and systems that last.",
    body:
      "From research and wireframes to high-fidelity prototypes and design systems in Figma, I take products from first sketch to shipped screens — and I write the front-end code too.",
    cta: "See my Work",
  },
  /** Site-wide SEO. `siteUrl` is the canonical origin; every absolute URL on the site derives from it. */
  meta: {
    siteUrl: "https://tresoramizero.com",
    siteName: "Tresor Amizero",
    title: "Tresor Amizero — Product Designer in Kigali, Rwanda",
    description:
      "Tresor Amizero is a product designer in Kigali, Rwanda: clear interfaces, design systems and prototypes for products used by thousands of people, including IST Legal, Script and MINUZA.",
    keywords: [
      "Tresor Amizero",
      "Amizero Tresor",
      "product designer",
      "UX designer",
      "UI/UX designer",
      "design systems",
      "Kigali",
      "Rwanda",
      "product designer Rwanda",
      "product designer Kigali",
      "IST Legal",
      "Script",
      "portfolio",
    ],
    /** Short line for the Open Graph image and the JSON-LD description. */
    tagline: "Product designer · Kigali, Rwanda",
    jobTitle: "Product Designer",
    /** Organisations named on the site; used in the Person schema's `worksFor` / `alumniOf`. */
    employer: { name: "IST Africa", url: "https://istlegal.ai" },
    alumniOf: { name: "Rwanda Coding Academy", url: "https://rca.ac.rw" },
  },
} as const;
