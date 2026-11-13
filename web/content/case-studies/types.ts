import type { media } from "../media";

export type ImageKey = keyof typeof media.projects;

export type CaseBlock =
  | { type: "heading"; eyebrow: string; title: string }
  | { type: "text"; body: string }
  | { type: "image"; key: ImageKey; caption?: string }
  | { type: "steps"; items: { n: string; title: string; body: string }[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "compare"; before: { key: ImageKey; label: string; caption: string }; after: { key: ImageKey; label: string; caption: string } }
  | { type: "quote"; text: string; source?: string }
  | { type: "question"; text: string }
  | { type: "list"; title: string; items: string[] }
  | { type: "figure"; figure: "cited-answer" | "clearance" | "workflow" | "palette" | "brand"; caption?: string }
  /** A self-playing simulation, full width. */
  | { type: "sim"; sim: SimName; caption?: string }
  /** Text beside a small simulation. */
  | { type: "split"; body: string; sim?: SimName; iso?: { name: string; title: string; height?: number }; caption?: string; flip?: boolean }
  /** One of the product's isometric figures (copied HTML), full width. */
  | { type: "iso"; name: string; title: string; height?: number; caption?: string };

export type SimName = "product" | "not-found" | "clearance" | "connectors" | "workflow" | "orb";

export type CaseStudy = {
  slug: string;
  eyebrow: string;
  tagline: string;
  intro: string;
  meta: { label: string; value: string }[];
  blocks: CaseBlock[];
};
