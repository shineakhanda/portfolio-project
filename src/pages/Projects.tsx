import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import { ProjectBook } from "@/components/projects/ProjectBook";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Projects() {
  return (
    <>
      <div className="container-editorial pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
      </div>

      <div className="container-editorial">
        <PageHeader
          eyebrow="Work"
          title="Websites that real businesses run on"
          intro={
            <p>
              Four live client websites in Bangladesh and abroad: an architecture studio, a hospital
              in Mymensingh, an online madrasa and an international wig manufacturer. Each case study
              sticks to what can be verified and links to the real site.
            </p>
          }
          aside={
            <nav aria-label="Jump to a project" className="flex flex-wrap gap-2 md:justify-end">
              {PROJECTS.map((project) => (
                <a
                  key={project.slug}
                  href={`#project-page-${project.slug}`}
                  className="chip bg-paper transition-colors hover:bg-butter"
                >
                  {project.title}
                </a>
              ))}
            </nav>
          }
        />
      </div>

      <section className="container-editorial pb-10 md:pb-16" aria-labelledby="project-book-heading">
        <h2 id="project-book-heading" className="sr-only">
          Client projects
        </h2>
        <ProjectBook />
      </section>

      <section className="bg-paper-deep py-14 md:py-20" aria-labelledby="project-index">
        <div className="container-editorial">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="project-index" className="display text-[clamp(2.2rem,4.4vw,3.6rem)]">
              All projects at a glance
            </h2>
            <ButtonLink href="/contact" variant="outline">
              Discuss your project
            </ButtonLink>
          </div>

          <ul className="mt-10 grid gap-3">
            {PROJECTS.map((project) => (
              <li
                key={project.slug}
                className="grid items-center gap-4 rounded-[var(--radius-soft)] border border-line bg-paper p-4 sm:grid-cols-[6rem_1fr_auto] md:p-5"
              >
                <img
                  src={project.image.src}
                  alt=""
                  width={project.image.width}
                  height={project.image.height}
                  loading="lazy"
                  decoding="async"
                  className="hidden aspect-[4/3] w-24 rounded-xl border border-line object-cover object-top sm:block"
                />
                <div>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="font-display text-[1.5rem] font-bold tracking-[-0.02em] transition-colors hover:text-muted"
                  >
                    {project.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted">
                    {project.projectType} for {project.category.toLowerCase()}
                  </p>
                </div>
                <div className="flex gap-5 text-sm font-semibold">
                  <Link to={`/projects/${project.slug}`} className="link-underline">
                    Case study
                  </Link>
                  <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
                    Live site <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
