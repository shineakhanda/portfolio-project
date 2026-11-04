import { PROJECTS } from "@/data/projects";
import { ProjectTile } from "@/components/projects/ProjectTile";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";

/* Wide, two narrow, wide: a simple rhythm for four projects. */
const layout = (index: number, total: number) =>
  index === 0 || index === total - 1
    ? { size: "wide" as const, span: "lg:col-span-12" }
    : { size: "narrow" as const, span: "lg:col-span-6" };

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
              Four live client websites: an architecture studio, a hospital in Mymensingh, an online
              madrasa and an international wig manufacturer. Open any of them to read the case
              study, or visit the real site.
            </p>
          }
        />
      </div>

      <section className="container-editorial pb-16 md:pb-24" aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="sr-only">
          Client projects
        </h2>
        <ul className="grid gap-5 lg:grid-cols-12">
          {PROJECTS.map((project, index) => {
            const { size, span } = layout(index, PROJECTS.length);
            return (
              <li key={project.slug} id={`project-${project.slug}`} className={`scroll-mt-28 ${span}`}>
                <ProjectTile project={project} size={size} priority={index === 0} className="h-full" />
              </li>
            );
          })}
        </ul>
        <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
          Case studies only describe what can be seen on the live websites. A detailed,
          client-approved breakdown of any project is available on request.
        </p>
      </section>

      <section className="container-editorial pb-20 md:pb-28">
        <div className="grid gap-8 rounded-[var(--radius-card)] bg-paper-deep p-7 md:grid-cols-12 md:items-center md:p-12">
          <div className="md:col-span-8">
            <h2 className="display text-[clamp(2.2rem,4.4vw,3.6rem)]">Want yours to be the next one?</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted">
              Tell me about your business and what the website needs to do. I&apos;ll reply with an
              honest view of scope, timing and cost.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <ButtonLink href="/contact">Start a project</ButtonLink>
            <ButtonLink href="/services" variant="outline">
              See services
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
