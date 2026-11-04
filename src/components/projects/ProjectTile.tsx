import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import { BrowserFrame } from "@/components/projects/BrowserFrame";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

const TONES = ["bg-sky", "bg-butter", "bg-apricot", "bg-sky"] as const;

/** A stable accent colour per project, based on its order in the portfolio. */
export function projectTone(slug: string): (typeof TONES)[number] {
  const index = Math.max(
    0,
    PROJECTS.findIndex((project) => project.slug === slug),
  );
  return TONES[index % TONES.length];
}

type ProjectTileProps = {
  project: Project;
  /** "wide" tiles put text beside the screenshot on large screens. */
  size?: "wide" | "narrow";
  priority?: boolean;
  className?: string;
};

export function ProjectTile({ project, size = "narrow", priority = false, className }: ProjectTileProps) {
  const wide = size === "wide";

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border-[1.5px] border-ink",
        projectTone(project.slug),
        wide && "lg:min-h-[30rem] lg:flex-row",
        className,
      )}
    >
      <div className={cn("flex flex-col p-6 md:p-8", wide && "lg:w-[38%] lg:shrink-0 lg:pr-4")}>
        <p className="flex flex-wrap gap-2">
          <span className="chip bg-paper/70">{project.category}</span>
          <span className="chip bg-paper/40">{project.projectType}</span>
        </p>
        <h3 className="display mt-5 text-[clamp(2rem,3.4vw,2.9rem)]">
          {/* The title link stretches over the whole card. */}
          <Link
            to={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-md text-[0.95rem] leading-7 text-ink-soft">{project.summary}</p>
        <div className={cn("mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold", wide && "lg:mt-auto")}>
          <span className="link-underline">Read the case study</span>
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline relative z-20"
          >
            Live site <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Screenshot rises out of the bottom edge of the card. */}
      <div
        className={cn(
          "relative mt-auto px-6 md:px-8",
          wide && "lg:mt-10 lg:flex lg:flex-1 lg:flex-col lg:pl-0 lg:pr-0",
        )}
      >
        <BrowserFrame
          url={project.externalUrl}
          variant="tile"
          className={cn(
            "translate-y-3 shadow-[var(--shadow-lift)] transition-transform duration-500 ease-out group-hover:translate-y-0 motion-reduce:translate-y-0",
            wide && "lg:flex-1 lg:rounded-tr-none lg:border-r-0",
          )}
        >
          <img
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            className={cn(
              "aspect-[16/10] w-full object-cover object-top",
              wide && "lg:absolute lg:inset-0 lg:aspect-auto lg:h-full",
            )}
          />
        </BrowserFrame>
      </div>

      {/* Visible focus ring for the stretched link. */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] ring-ink ring-offset-2 group-has-[a:focus-visible]:ring-2"
        aria-hidden="true"
      />
    </article>
  );
}
