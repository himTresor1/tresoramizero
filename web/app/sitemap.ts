import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { publishedProjects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.meta.siteUrl;
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...publishedProjects.map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.8 })),
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];
}
