/**
 * Case studies. The first two ship (decision D2). Later ones are listed with `published: false`
 * so they stay out of the grid and the sitemap until they have a page.
 */
import { media } from "./media";
import type { CaseStudy } from "./case-studies/types";
import { scriptCaseStudy } from "./case-studies/script";
import { istLegalCaseStudy } from "./case-studies/ist-legal";

export type Project = {
  /** A full written case study; when present the project page renders it instead of overview + gallery. */
  caseStudy?: CaseStudy;
  slug: string;
  name: string;
  year: string;
  tags: string[];
  published: boolean;
  /** Short line under the name in the grid, and the meta description. */
  summary: string;
  /** Hero image on the project page and thumbnail in the grid. */
  cover: keyof typeof media.projects;
  overview: string;
  /** Role, client, timeline: the small facts column. */
  facts: { label: string; value: string }[];
  /** Gallery images, in order. */
  gallery: (keyof typeof media.projects)[];
  /** External link, if the product is public. */
  link?: { label: string; url: string };
};

export const projects: Project[] = [
  {
    slug: "ist-legal",
    name: "IST Legal",
    year: "2026",
    tags: ["Website", "Product Design", "Design System"],
    published: true,
    summary: "A premium, jurisdiction-aware website for an AI legal platform built for Rwanda and Kenya.",
    cover: "istLegalCover",
    overview:
      "IST Legal is an AI legal intelligence platform grounded in Rwandan and Kenyan law. The brief was blunt: the site felt “more SaaS than legal.” I redesigned the full multi-page website so a lawyer understands in seconds that this is a purpose-built legal product, not a generic AI assistant with legal copy. Every demo shows believable legal work with verifiable citations, and the whole site runs on one design system.",
    facts: [
      { label: "Role", value: "UX Designer" },
      { label: "Company", value: "IST Africa" },
      { label: "Year", value: "2026" },
      { label: "Scope", value: "Multi-page website, design system, product demos" },
    ],
    gallery: ["istLegal1", "istLegal2", "istLegal3", "istLegal4"],
    caseStudy: istLegalCaseStudy,
    link: { label: "Visit istlegal.ai", url: "https://istlegal.ai/rw" },
  },
  {
    slug: "script",
    name: "Script",
    year: "2026",
    tags: ["Product Design", "Brand", "Design System"],
    published: true,
    summary: "The company brain: an AI that answers from an institution’s own documents, with sources, matched to what each person is cleared to see.",
    cover: "scriptCover",
    overview:
      "Script turns an organisation’s documents, scans, meetings and work tools into answers with sources, matched to what each person is cleared to see. I co-founded it and designed the product, the brand and the site: cited answers as the interface, clearance before the AI sees anything, and workflows written in plain Markdown.",
    facts: [
      { label: "Role", value: "Co-founder, product designer" },
      { label: "Company", value: "O2Labbs" },
      { label: "Year", value: "2026" },
    ],
    gallery: ["script1", "script2", "script3"],
    link: { label: "Visit script.o2labbs.com", url: "https://script.o2labbs.com/" },
    caseStudy: scriptCaseStudy,
  },
  // Later (not published yet): MINUZA (BRD), GradPal, TVET Management Portal (RTB), KIVU-NAV-AID.
];

export const publishedProjects = projects.filter((p) => p.published);

/** The "// Old projects" list on /projects: earlier work without a case study (yet). */
export type ArchiveProject = { name: string; year: string; category: string; url?: string };
export const archiveProjects: ArchiveProject[] = [
  { name: "GradPal Marketplace", year: "2025", category: "Web App · Design System", url: "https://gradpal.io" },
  { name: "MINUZA", year: "2024", category: "Student Loans · BRD" },
  { name: "BRD Procurement", year: "2024", category: "Web App" },
  { name: "KIVU-NAV-AID", year: "2024", category: "Maritime Navigation · MININFRA" },
  { name: "EmissionLog", year: "2024", category: "Greenhouse Gas Tracking · REMA" },
  { name: "TVET Management Portal", year: "2023", category: "Admin Portal · RTB" },
  { name: "RCA-MIS", year: "2023", category: "School Management System" },
];
