import { ArrowLeft, ArrowRight, Check, Info } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug, getProjectNeighbours } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { SKILL_CATEGORIES } from "@/data/skills";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { BrowserFrame, displayHost } from "@/components/projects/BrowserFrame";
import { projectTone } from "@/components/projects/ProjectTile";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { NotFound } from "@/pages/NotFound";

export function ProjectDetails() {
  const { slug = "" } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <NotFound />;
  }

  const { previous, next } = getProjectNeighbours(project.slug);
  const tone = projectTone(project.slug);
  const builtWith = SKILL_CATEGORIES.flatMap((category) =>
    category.items
      .filter((item) => item.projects?.includes(project.slug))
      .map((item) => ({ item, categorySlug: category.slug })),
  );
  const relatedServices = SERVICES.filter((service) =>
    service.relatedProjectSlugs.includes(project.slug),
  );

  return (
    <>
      <div className="container-editorial pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: project.title },
          ]}
        />
      </div>

      <article>
        <header className="container-editorial pb-10 pt-10 md:pb-12 md:pt-14">
          <p className="flex flex-wrap gap-2">
            <span className={`chip ${tone}`}>{project.category}</span>
            <span className="chip">{project.projectType}</span>
          </p>
          <h1 className="display mt-5 max-w-4xl text-[clamp(3rem,7.5vw,6.4rem)]">{project.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">{project.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={project.externalUrl}>Visit {displayHost(project.externalUrl)}</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Discuss a similar project
            </ButtonLink>
            <span className="ml-1 inline-flex items-center gap-2 text-sm font-semibold text-muted">
              <span className="h-2.5 w-2.5 rounded-full border border-ink bg-butter" aria-hidden="true" />
              Live today
            </span>
          </div>
        </header>

        <figure className="container-editorial">
          <div className={`overflow-hidden rounded-[var(--radius-card)] border-[1.5px] border-ink px-4 pt-6 sm:px-10 sm:pt-12 lg:px-16 lg:pt-16 ${tone}`}>
            <BrowserFrame url={project.externalUrl} variant="tile" className="shadow-[var(--shadow-lift)]">
              <img
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                fetchPriority="high"
                decoding="async"
                className="max-h-[72vh] w-full object-cover object-top"
              />
            </BrowserFrame>
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            The public {project.title} website, as it appears today.
          </figcaption>
        </figure>

        <section className="container-editorial py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="eyebrow text-muted">Overview</p>
            </div>
            <div className="lg:col-span-6">
              <div className="space-y-5 text-base leading-8 text-ink-soft">
                {project.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <aside className="lg:col-span-3">
              <div className="rounded-[var(--radius-card)] bg-paper-deep p-6">
                <h2 className="font-display text-xl font-bold">Built with</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((technology) => (
                    <li key={technology} className="chip bg-paper">
                      {technology}
                    </li>
                  ))}
                </ul>
                {builtWith.length > 0 ? (
                  <>
                    <p className="mt-5 text-sm font-semibold text-muted">More about these skills</p>
                    <ul className="mt-2 space-y-2">
                      {builtWith.map(({ item, categorySlug }) => (
                        <li key={item.name}>
                          <Link
                            to={`/skills#${categorySlug}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-muted"
                          >
                            <BrandIcon name={item.icon} size={15} />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
                <p className="mt-5 text-[0.8rem] leading-5 text-muted">
                  Only technology that can be seen in the live site is listed.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-paper-deep py-14 md:py-20">
          <div className="container-editorial grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-muted">Objective</p>
              <h2 className="display mt-4 text-[clamp(2.3rem,4.5vw,4.2rem)]">
                What the website needed to do
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="font-display text-[clamp(1.35rem,2.4vw,2rem)] font-semibold leading-[1.45] tracking-[-0.02em]">
                {project.objective}
              </p>
              <ul className="mt-9 grid gap-3 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 rounded-[var(--radius-soft)] border border-line bg-paper p-4 text-[0.95rem] leading-6 text-ink-soft"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink bg-butter">
                      <Check size={14} strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="container-editorial py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="eyebrow text-muted">Role &amp; scope</p>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-[var(--radius-card)] border border-line bg-paper-light p-6 md:p-8">
                <Info size={20} strokeWidth={1.4} className="text-muted" aria-hidden="true" />
                <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.02em]">
                  A note on this case study
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">{project.roleNote}</p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  No client testimonial, performance metric, or business result has been invented
                  for this page. For a detailed, client-approved scope breakdown, please make a
                  direct enquiry.
                </p>
                <ButtonLink href="/contact" variant="outline" className="mt-6">
                  Request project details
                </ButtonLink>
              </div>
            </div>
            {relatedServices.length > 0 ? (
              <nav aria-label="Related services" className="lg:col-span-2">
                <p className="text-sm font-semibold text-muted">Related services</p>
                <ul className="mt-3 space-y-2">
                  {relatedServices.map((service) => (
                    <li key={service.slug}>
                      <Link to={`/services/${service.slug}`} className="link-underline text-sm font-semibold">
                        {service.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        </section>

        <section className="container-editorial pb-16 md:pb-24">
          <div className="grid gap-5 md:grid-cols-2">
            {previous ? (
              <Link
                to={`/projects/${previous.slug}`}
                className="group rounded-[var(--radius-card)] border-[1.5px] border-line bg-paper p-6 transition-colors hover:border-ink hover:bg-sky md:p-8"
              >
                <span className="eyebrow flex items-center gap-2 text-muted">
                  <ArrowLeft size={12} strokeWidth={1.5} aria-hidden="true" /> Previous project
                </span>
                <span className="mt-6 block font-display text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-none tracking-[-0.03em]">
                  {previous.title}
                </span>
                <span className="mt-3 block text-xs text-muted">{previous.category}</span>
              </Link>
            ) : null}
            {next ? (
              <Link
                to={`/projects/${next.slug}`}
                className="group rounded-[var(--radius-card)] border-[1.5px] border-line bg-paper p-6 text-right transition-colors hover:border-ink hover:bg-butter md:p-8"
              >
                <span className="eyebrow flex items-center justify-end gap-2 text-muted">
                  Next project <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="mt-6 block font-display text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-none tracking-[-0.03em]">
                  {next.title}
                </span>
                <span className="mt-3 block text-xs text-muted">{next.category}</span>
              </Link>
            ) : null}
          </div>
        </section>
      </article>
    </>
  );
}
