import type { CaseStudy } from "./types";

/**
 * IST Legal — a short case study. Facts come from the ist-legal-landing repo (docs/brief.md,
 * docs/design-rationale.md, docs/evidence-ledger.md, docs/hackathon-feedback.md, git log).
 */
export const istLegalCaseStudy: CaseStudy = {
  slug: "ist-legal",
  eyebrow: "IST Africa · Website · Design system",
  tagline: "An AI tool built for legal practice.",
  intro:
    "IST Legal AI is a legal workspace grounded in the law of the country you practise in: research, document review and drafting with sources you can open. The brief for its website was blunt. I redesigned the full multi-page site so a lawyer understands in seconds that this was built for legal work, not a generic AI product with legal copy.",
  meta: [
    { label: "My role", value: "Product designer, site and design system" },
    { label: "The scope", value: "Landing (×3 countries) · Platform · Solutions · Security · Pricing" },
    { label: "The journey", value: "Oct — Nov 2026" },
    { label: "Today", value: "Live · istlegal.ai" },
  ],
  blocks: [
    { type: "heading", eyebrow: "The problem", title: "“More SaaS than legal.”" },
    {
      type: "text",
      body: "That was the feedback on the old site, and it was right. The pages could have sold any software: a dashboard screenshot, a generic chat, a list of features. The claims were not provable either: an accuracy percentage, a university that “trusted” the product, security badges nobody had earned. Lawyers are trained to notice exactly that kind of thing, and the site was asking them to sign up for a tool about verifiable sources with a page that had none.",
    },
    {
      type: "steps",
      items: [
        { n: "01", title: "It looked like a template.", body: "Nothing on the page was specific to law, or to Rwanda and Kenya." },
        { n: "02", title: "It overclaimed.", body: "Accuracy figures, badges and endorsements that could not be backed up." },
        { n: "03", title: "It showed nothing real.", body: "Generic AI conversations instead of legal work with sources." },
      ],
    },

    { type: "question", text: "How does a website prove it was built for legal work before anyone signs up?" },

    { type: "heading", eyebrow: "Decision 01 · Show the law, separately", title: "The analysis and the law it relies on are always visibly apart." },
    {
      type: "text",
      body: "That one rule became the concept for the whole site. Instead of screenshots, the pages hold five live, illustrative demos: a cited answer, a jurisdiction switch, case law, legislation and a contract review where obligations, risks and inconsistencies are marked in the document itself. In every one the AI’s reading sits on one side and the source it rests on sits on the other, and you can open the source. Each demo is labelled “Illustrative example”, because a believable demo and a real case are not the same thing.",
    },

    { type: "heading", eyebrow: "Decision 02 · Say less, prove more", title: "Every claim on the site has a line in a ledger." },
    {
      type: "text",
      body: "Before writing a word I audited the old site’s claims into an evidence ledger: what it said, what we could show for it, keep or cut. The accuracy percentage, the “trusted by” university and the compliance badges went. Security is written as what the platform is designed to support, with no badges. Where the client’s numbers are still being confirmed, the page says so, in public. A site about verifiable sources has to be one.",
    },
    {
      type: "list",
      title: "What we cut",
      items: [
        "“95% accuracy” and other figures nobody could source.",
        "A university named as trusting the product.",
        "GDPR and SOC 2 badges that had not been earned.",
        "Stock testimonials, until real ones arrive.",
      ],
    },

    { type: "heading", eyebrow: "Decision 03 · Jurisdiction first", title: "One site, three countries, and the law changes with the flag." },
    {
      type: "text",
      body: "The product is only useful inside a jurisdiction, so the site is built the same way. There is an international version and one each for Rwanda and Kenya; the hero badge, the examples in the demos and the pricing follow the country. On the Rwandan site the hero carries imigongo panels, and prices are in francs. A lawyer in Kigali should never have to translate the page into their own practice.",
    },

    { type: "heading", eyebrow: "Decision 04 · Paper, not dashboard", title: "A warm page, one clay accent, and a serif for the titles." },
    {
      type: "text",
      body: "The look started from a template I measured carefully, then rebuilt on a warm paper palette with a single clay accent, so the product demos carry the colour. After the hackathon review the reviewers asked for the one thing a legal reader expects and a SaaS page never has: a serif. Titles moved to Newsreader; everything else stayed in Inter. One token set runs every page, and the demos are built from the same components the app uses.",
    },
    {
      type: "stats",
      items: [
        { value: "19", label: "widths checked, 320 to 1920px, zero overflow" },
        { value: "0", label: "WCAG 2.2 AA violations; accessibility score 100" },
        { value: "99–100", label: "Lighthouse on desktop" },
      ],
    },

    { type: "heading", eyebrow: "Where it stands", title: "Chosen, shipped, still being confirmed." },
    {
      type: "text",
      body: "The redesign was built in a company hackathon and chosen over three other prototypes; their best ideas, the serif, the security page and the apps section, were merged in. Two rounds of client feedback followed, and the site is live. The interim numbers on the page and the testimonials are still waiting on the client, and they say so until then.",
    },
    {
      type: "stats",
      items: [
        { value: "3", label: "country versions: international, Rwanda, Kenya" },
        { value: "5", label: "live demos, each one labelled illustrative" },
        { value: "4 wks", label: "from brief to the hackathon decision" },
      ],
    },

    { type: "heading", eyebrow: "What I would do differently", title: "Start from the ledger, not the layout." },
    {
      type: "text",
      body: "I designed pages first and audited claims second, which meant redesigning sections once the evidence turned out thinner than the copy. Next time the ledger comes first: decide what we can prove, then design the page that proves it.",
    },
  ],
};
