/** Everything about Tresor that appears on the site. Nothing here is hard-coded in components. */

export const profile = {
  /** Shown in the hero and the browser title. Q4 in PLAN.md: order to confirm. */
  firstName: "Tresor",
  lastName: "Amizero",
  fullName: "Tresor Amizero",
  /** The hero's role lines. Line 1 is fixed (decision D1). Line 2: Q3 in PLAN.md. */
  roles: ["Product Designer", "Design Systems"],
  /** Nav wordmark, mirrors the template's "© Alex Design & Strategy". */
  wordmark: "Tresor Amizero",
  location: "Kigali, Rwanda",
  /** Third footer line (the template has Office / Mail / Phone; no phone ships, decision D6). */
  openTo: "Product design roles and freelance work",
  /** One email only (decision D6). Q4 confirms which. */
  email: "peaceamizero@gmail.com",
  /** Only real handles ship. Entries with an empty url are hidden. */
  socials: [
    { label: "Linkedin", url: "" },
    { label: "Twitter", url: "" },
    { label: "Instagram", url: "" },
  ],
  intro: {
    /** Words between *asterisks* are the accent words (the template highlights one clause). */
    lead:
      "I’m a *product designer who partners with teams to turn ideas into real products.* I focus on clear interfaces, sharp decisions, and systems that last.",
    body:
      "From research and wireframes to high-fidelity prototypes and design systems in Figma, I take products from first sketch to shipped screens — and I write the front-end code too.",
    cta: "See my Work",
  },
  meta: {
    title: "Tresor Amizero — Product Designer",
    description:
      "Product designer in Kigali, Rwanda. Clear interfaces, design systems and prototypes for products used by thousands of people.",
  },
} as const;
