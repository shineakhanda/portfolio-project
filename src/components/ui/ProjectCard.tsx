import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="group">
      <Link
        to={`/projects/${project.slug}`}
        className="block overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-deep"
        aria-label={`View ${project.title} project`}
      >
        <img
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="aspect-[1.4/1] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </Link>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="chip bg-sky">{project.category}</span>
        <span className="chip">{project.projectType}</span>
      </div>
      <h3 className="display mt-3 text-[clamp(1.8rem,3.2vw,2.6rem)]">
        <Link to={`/projects/${project.slug}`} className="transition-colors hover:text-muted">
          {project.title}
        </Link>
      </h3>
      <p className="mt-3 max-w-lg text-[0.95rem] leading-7 text-muted">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
        <Link to={`/projects/${project.slug}`} className="link-underline">
          Read the case study
        </Link>
        <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
          Visit live site <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
