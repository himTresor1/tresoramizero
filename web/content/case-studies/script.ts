import type { CaseStudy } from "./types";

/**
 * Script — the case study. Every fact comes from the o2labbs repo (docs/, decks, ADRs, git log);
 * nothing is invented. Instead of screenshots, the product is shown through self-playing
 * simulations rebuilt from it (the way its own landing page does) and its isometric figures.
 */
export const scriptCaseStudy: CaseStudy = {
  slug: "script",
  eyebrow: "O2Labbs · Product · Brand · Design system · Web",
  tagline: "Your company’s brain, built to remember.",
  intro:
    "Script is a workspace-scoped memory for organisations. It takes in documents, scans, meetings and work tools, and answers plain-language questions with sources, matched to what each person is cleared to see. I co-founded it and designed it: the product, the brand and the site.",
  meta: [
    { label: "My role", value: "Co-founder, product designer" },
    { label: "The scope", value: "Brand → design system → app → landing" },
    { label: "The journey", value: "Apr 2026 — today" },
    { label: "Today", value: "MVP live · pilot in progress" },
  ],
  blocks: [
    { type: "sim", sim: "product", caption: "The product, playing itself: a procurement question, three cited sources, and the passage behind a citation. Fictional workspace, as in Script’s own demo." },

    { type: "heading", eyebrow: "The problem", title: "Institutions forget why they decided what they decided." },
    {
      type: "text",
      body: "Knowledge walks out with people. What stays is scattered across drives, chats, meetings, photocopies and scans, in English, Kinyarwanda and French. Search can’t read a scanned page, and a generic AI can’t show where its answers come from. So the same question gets asked again, and answered from memory. We built Script for teams of 20 to 500 who can’t afford that: a development bank, an insurer, a ministry, a university.",
    },
    {
      type: "steps",
      items: [
        { n: "01", title: "It leaves with people.", body: "Decisions live in heads, then in exit interviews." },
        { n: "02", title: "It is scattered.", body: "Drives, chats, meetings, photocopies, scans, three languages." },
        { n: "03", title: "Tools can’t reach it.", body: "Search can’t read scans; generic AI can’t cite." },
      ],
    },

    { type: "question", text: "How do you make an AI you can trust with an institution’s memory?" },

    { type: "heading", eyebrow: "Decision 01 · Never guess when you can cite", title: "Every answer traces back to a source." },
    {
      type: "split",
      body: "Answers stream in with numbered citation chips; tapping one opens the exact passage, so a lawyer or a loan officer checks in seconds rather than trusts. The other half of citing is refusing. When the library has nothing, Script says so and tells you where the answer probably lives. That refusal cost us a few impressive-looking demos and bought the only thing that matters for an institution: an answer you can take to a committee.",
      sim: "not-found",
      caption: "Script asked for a figure it doesn’t have.",
    },

    { type: "heading", eyebrow: "Decision 02 · Permission follows the document", title: "The same question. Different answers. On purpose." },
    {
      type: "split",
      flip: true,
      body: "Permissions are enforced before retrieval, not after. The first private channel or restricted project we ingest would otherwise become a leak, so clearance was a blocker for every connector, not a follow-up. The intern gets a true answer too: that a figure exists, and who owns it.",
      sim: "clearance",
      caption: "Two people, one question, at the same moment.",
    },
    { type: "quote", text: "The first private channel or restricted project ingested makes that a leak. A blocker, not a follow-up.", source: "Product definition, §2" },

    { type: "heading", eyebrow: "Decision 03 · Honesty as a design rule", title: "If the API can’t do it, the screen says “Coming soon”." },
    {
      type: "text",
      body: "The product is not allowed to invent capabilities the API does not support. When Google turned out to have no official listen-bot API, we dropped the visible meeting bot and moved to the platforms’ own transcripts. Connectors show honest states: Available, Connected, Coming soon, Error. In the investor deck every claim is labelled Live, Our design, or Before the pilot.",
    },
    {
      type: "list",
      title: "What we said no to",
      items: [
        "A bot that sits in the meeting gallery (no official API on Meet).",
        "Guessing an answer when the library is silent.",
        "Invented testimonials and metrics on the landing page.",
        "A third-party AI router that would add another data processor.",
      ],
    },

    { type: "heading", eyebrow: "Where it stands", title: "Live is a beginning." },
    {
      type: "text",
      body: "The MVP is live and running on fictional documents. We demoed it to the Development Bank of Rwanda in October 2026 and pitched it at Hanga Ignite. The proposed first pilot is one department, six to eight weeks, about fifteen people, measured on time to answer, accuracy and what they tell us.",
    },
    {
      type: "stats",
      items: [
        { value: "7", label: "capabilities on the scorecard, four shipped" },
        { value: "5", label: "people on the team" },
        { value: "6–8 wks", label: "the pilot we are asking for" },
      ],
    },

    { type: "heading", eyebrow: "What I would do differently", title: "Earlier users, fewer surfaces." },
    {
      type: "text",
      body: "We built chat, library, meetings, connectors and workflows before a single outside team used it. I would ship the cited answer alone, put it in front of one department, and let their questions decide the second feature. The honesty rules came from catching ourselves overclaiming; next time they come first.",
    },
  ],
};
