import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { projects, publishedProjects } from "@/content/projects";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectOverview } from "@/components/project/ProjectOverview";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { MoreProjects } from "@/components/project/MoreProjects";
import { CaseStudy } from "@/components/case/CaseStudy";
import { JsonLd, caseStudySchema } from "@/lib/seo";
import { media } from "@/content/media";
import { profile } from "@/content/profile";

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  const title = `${p.name} — Product Design Case Study`;
  const description = `${p.summary} A case study by ${profile.fullName}.`;
  const cover = media.projects[p.cover];
  return {
    title,
    description,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${p.name} — case study by ${profile.fullName}`, description, url: `/projects/${p.slug}`, type: "article", images: [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }] },
    twitter: { card: "summary_large_image", title, description, images: [cover.src] },
  };
}

// `params` is read inside a Suspense boundary so navigation to a project page stays instant
// (Next 16 cache components); every published slug is prerendered anyway.
export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="project-hero" aria-hidden="true" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug && p.published);
  if (!project) notFound();
  const others = publishedProjects.filter((p) => p.slug !== project.slug);

  return (
    <>
      <JsonLd data={caseStudySchema(project)} />
      <ProjectHero project={project} />
      <div className="project-page-body">
        {project.caseStudy ? (
          <CaseStudy project={project} study={project.caseStudy} />
        ) : (
          <>
            <ProjectOverview project={project} />
            <ProjectGallery project={project} />
          </>
        )}
        <MoreProjects projects={others} />
      </div>
    </>
  );
}
