import type { Metadata } from "next";
import { publishedProjects, archiveProjects } from "@/content/projects";
import { WorkIndex } from "@/components/project/WorkIndex";
import { ArchiveList } from "@/components/project/ArchiveList";

export const metadata: Metadata = { title: "Projects", description: "Selected product design work by Tresor Amizero." };

/**
 * /projects (measured): "Work Index" hero (padding 320 20 20, h1 120/108), a sticky horizontal
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
