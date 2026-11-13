import type { Project } from "@/content/projects";
import { media } from "@/content/media";

/**
 * Gallery (measured): one 1440×900 frame per image, 20px apart; each image is 1100px tall and
 * sits 200px above its frame (a fixed offset — the live site's gallery images do not move with
 * scroll, verified with real wheel scrolling).
 */
export function ProjectGallery({ project }: { project: Project }) {
  return (
    <div className="project-gallery">
      {project.gallery.map((key, i) => {
        const image = media.projects[key];
        return (
          <section key={key} className="project-frame" aria-label={image.alt}>
            <div className="project-frame-image">
              <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading={i === 0 ? "eager" : "lazy"} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
