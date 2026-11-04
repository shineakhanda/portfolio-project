import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllSkills, getCoreSkills, getSkillsByLayer, SKILL_LAYERS } from "@/data/skills";
import { getProjectBySlug } from "@/data/projects";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { cn } from "@/lib/utils";
import type { SkillLayer, TechItem } from "@/types/content";

type Filter = "all" | "core" | "projects";

const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: "all", label: "All tools" },
  { id: "core", label: "Core stack" },
  { id: "projects", label: "Used on live projects" },
];

const matchesFilter = (item: TechItem, filter: Filter) =>
  filter === "all" || (filter === "core" ? Boolean(item.core) : Boolean(item.projects?.length));

/* The path a single visit takes, top to bottom. This is a real sequence. */
const REQUEST_PATH: Array<{ layer: SkillLayer; title: string; body: string; tools: string }> = [
  {
    layer: "marketing",
    title: "Someone searches, or sees an ad",
    body: "Good technical SEO and well-aimed campaigns put the business in front of people already looking.",
    tools: "Google Search, Google Ads, Meta Ads",
  },
  {
    layer: "server",
    title: "DNS and the CDN answer first",
    body: "The domain resolves and cached files are served from close to the visitor.",
    tools: "Cloudflare",
  },
  {
    layer: "server",
    title: "The server takes the request",
    body: "A hardened Linux machine and a properly configured web server pass the request on.",
    tools: "nginx or Apache on Ubuntu, Debian or RHEL",
  },
  {
    layer: "web",
    title: "The application builds the page",
    body: "Pages are rendered, forms are handled and data is read from the database.",
    tools: "Next.js, React or PHP, with Node.js or Hono and PostgreSQL or MySQL",
  },
  {
    layer: "web",
    title: "The page loads fast and makes sense",
    body: "Clean markup, accessible design and a clear next step for the visitor.",
    tools: "HTML, CSS, TypeScript, Core Web Vitals",
  },
  {
    layer: "marketing",
    title: "The visit is measured",
    body: "Enquiries and search queries are tracked, so the next campaign is better than the last.",
    tools: "Google Analytics, Search Console",
  },
];

const layerColor = (layer: SkillLayer) =>
  SKILL_LAYERS.find((entry) => entry.id === layer)?.color ?? "bg-sky";

function SkillTile({ item, layer }: { item: TechItem; layer: SkillLayer }) {
  const projects = (item.projects ?? [])
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  return (
    <li className="flex flex-col rounded-[var(--radius-soft)] border border-line bg-paper p-5">
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-ink text-ink",
            layerColor(layer),
          )}
        >
          <BrandIcon name={item.icon} size={20} />
        </span>
        {item.core ? <span className="chip">Core stack</span> : null}
      </div>
      <h4 className="mt-5 font-display text-[1.2rem] font-bold leading-tight tracking-[-0.015em]">
        {item.name}
      </h4>
      <p className="mt-1.5 text-sm leading-6 text-muted">{item.description}</p>
      {projects.length > 0 ? (
        <p className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-4 text-[0.82rem]">
          <span className="font-semibold text-muted">Used on</span>
          {projects.map((project) => (
            <Link key={project.slug} to={`/projects/${project.slug}`} className="link-underline font-semibold">
              {project.title}
            </Link>
          ))}
        </p>
      ) : null}
    </li>
  );
}

export function Skills() {
  const [filter, setFilter] = useState<Filter>("all");
  const coreSkills = useMemo(() => getCoreSkills(), []);
  const totalSkills = useMemo(() => getAllSkills().length, []);

  return (
    <>
      <div className="container-editorial pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Skills" }]} />
      </div>

      <div className="container-editorial">
        <PageHeader
          eyebrow="Skills"
          title="Skills and tools, from the page down to the server"
          intro={
            <p>
              {totalSkills} tools across web development, marketing and Linux administration. No
              made-up percentages: where a tool was used on a live client site, the project is
              linked so you can see it for yourself.
            </p>
          }
        />
      </div>

      {/* Layer index */}
      <nav aria-label="Skill layers" className="container-editorial">
        <ul className="grid gap-4 md:grid-cols-3">
          {SKILL_LAYERS.map((layer) => {
            const categories = getSkillsByLayer(layer.id);
            const items = categories.flatMap((category) => category.items);
            return (
              <li key={layer.id}>
                <a
                  href={`#layer-${layer.id}`}
                  className={cn(
                    "group flex h-full flex-col rounded-[var(--radius-card)] border-[1.5px] border-ink p-6 transition-transform hover:-translate-y-1",
                    layer.color,
                  )}
                >
                  <span className="text-sm font-semibold text-ink-soft">{layer.question}</span>
                  <span className="display mt-2 text-[clamp(1.8rem,3vw,2.4rem)]">{layer.name}</span>
                  <span className="mt-2 text-sm leading-6 text-ink-soft">{layer.summary}</span>
                  <span className="mt-auto flex items-center justify-between gap-3 pt-6">
                    <span className="flex -space-x-2" aria-hidden="true">
                      {items.slice(0, 5).map((item) => (
                        <span
                          key={item.name}
                          className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-ink bg-paper"
                        >
                          <BrandIcon name={item.icon} size={16} />
                        </span>
                      ))}
                    </span>
                    <span className="text-sm font-bold">{items.length} tools</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Core stack */}
      <section className="container-editorial pt-14 md:pt-20" aria-labelledby="core-stack">
        <div className="rounded-[var(--radius-card)] bg-paper-deep p-6 md:p-10">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <h2 id="core-stack" className="display text-[clamp(1.9rem,3.2vw,2.6rem)]">
                The core stack
              </h2>
              <p className="mt-3 max-w-sm text-[0.95rem] leading-7 text-muted">
                What I reach for first on a new project, before anything more specialised.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2 lg:col-span-8">
              {coreSkills.map((item) => (
                <li key={item.name} className="chip gap-2 bg-paper py-2 pl-2.5 pr-3.5 text-sm">
                  <BrandIcon name={item.icon} size={16} />
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Filter + layers */}
      <div className="container-editorial pb-6 pt-14 md:pt-20">
        <div
          role="group"
          aria-label="Filter tools"
          className="inline-flex flex-wrap gap-1 rounded-full border border-line bg-paper p-1"
        >
          {FILTERS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={filter === option.id}
              onClick={() => setFilter(option.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                filter === option.id ? "bg-ink text-paper" : "text-muted hover:bg-paper-deep hover:text-ink",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container-editorial pb-16 md:pb-24">
        {SKILL_LAYERS.map((layer) => {
          const categories = getSkillsByLayer(layer.id)
            .map((category) => ({
              ...category,
              items: category.items.filter((item) => matchesFilter(item, filter)),
            }))
            .filter((category) => category.items.length > 0);

          if (categories.length === 0) return null;

          return (
            <section
              key={layer.id}
              id={`layer-${layer.id}`}
              aria-labelledby={`layer-${layer.id}-title`}
              className="scroll-mt-28 pt-12 first:pt-4 md:pt-16"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className={cn("swatch h-4 w-4", layer.color)} aria-hidden="true" />
                <span className="text-sm font-semibold text-muted">{layer.question}</span>
              </div>
              <h2 id={`layer-${layer.id}-title`} className="display mt-3 text-[clamp(2.2rem,4.4vw,3.6rem)]">
                {layer.name}
              </h2>

              <div className="mt-8 space-y-10">
                {categories.map((category) => (
                  <div key={category.slug} id={category.slug} className="grid scroll-mt-28 gap-5 lg:grid-cols-12">
                    <div className="lg:col-span-3">
                      <h3 className="font-display text-[1.5rem] font-bold tracking-[-0.02em]">{category.title}</h3>
                      <p className="mt-2 max-w-xs text-sm leading-6 text-muted">{category.description}</p>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-9 xl:grid-cols-3">
                      {category.items.map((item) => (
                        <SkillTile key={`${category.slug}-${item.name}`} item={item} layer={layer.id} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* How the layers connect */}
      <section className="bg-paper-deep py-16 md:py-24" aria-labelledby="request-path">
        <div className="container-editorial grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="request-path" className="display text-[clamp(2.2rem,4vw,3.4rem)]">
              How it all fits into one visit
            </h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-muted">
              Good code is only half of a reliable website. Here is every layer a single customer
              visit passes through, and the tools I use at each step.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <Link to="/services" className="link-underline">
                Services built on these skills
              </Link>
              <Link to="/infrastructure" className="link-underline">
                More on server work
              </Link>
            </div>
          </div>
          <ol className="relative lg:col-span-7 lg:col-start-6">
            {REQUEST_PATH.map((step, index) => (
              <li key={step.title} className="relative grid grid-cols-[2.75rem_1fr] gap-4 pb-8 last:pb-0">
                {index < REQUEST_PATH.length - 1 ? (
                  <span className="absolute left-[1.31rem] top-11 bottom-0 w-[1.5px] bg-ink/25" aria-hidden="true" />
                ) : null}
                <span
                  className={cn(
                    "relative flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-ink font-display text-lg font-bold",
                    layerColor(step.layer),
                  )}
                >
                  {index + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-display text-[1.3rem] font-bold leading-tight tracking-[-0.015em]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[0.95rem] leading-7 text-muted">{step.body}</p>
                  <p className="mt-2 text-sm font-semibold text-ink-soft">{step.tools}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-editorial py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h2 className="display text-[clamp(2.4rem,5vw,4.2rem)]">
              Not sure which stack fits your project?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted">
              Tell me what the site needs to do. I&apos;ll suggest the simplest setup your team can
              keep running.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <ButtonLink href="/contact">Start a project</ButtonLink>
            <ButtonLink href="/projects" variant="outline">
              See the work
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
