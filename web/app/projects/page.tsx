import type { Metadata } from "next";
import { publishedProjects, archiveProjects } from "@/content/projects";
import { WorkIndex } from "@/components/project/WorkIndex";
import { ArchiveList } from "@/components/project/ArchiveList";

const projectsDescription = "Product design case studies by Tresor Amizero: IST Legal, Script, and earlier work for BRD, MININFRA, REMA and the Rwanda TVET Board.";
export const metadata: Metadata = {
  title: "Projects — Product Design Case Studies",
  description: projectsDescription,
  alternates: { canonical: "/projects" },
  openGraph: { title: "Projects by Tresor Amizero", description: projectsDescription, url: "/projects" },
};

/**
 * /projects: "Work Index" hero (padding 320 20 20, h1 120/108), a sticky horizontal
 * scroll of 1280×900 cards, then the "// Old projects" list (66px rows).
 */
export default function ProjectsPage() {
  return (
    <>
      <section className="work-hero">
        <h1 className="t-project-title">Work Index</h1>
      </section>
      <WorkIndex projects={publishedProjects} />
      <ArchiveList items={archiveProjects} />
    </>
  );
}
