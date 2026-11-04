import { MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { ACHIEVEMENTS, EXPERTISE, SITE } from "@/data/site";
import { PROJECTS } from "@/data/projects";
import { SKILL_CATEGORIES } from "@/data/skills";
import { getFeaturedPosts } from "@/lib/blogMeta";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { BlogCard } from "@/components/ui/BlogCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const homeStack = [
  "react",
  "typescript",
  "nextjs",
  "nodejs",
  "php",
  "hono",
  "mongodb",
  "mysql",
  "postgresql",
  "debian",
  "ubuntu",
  "rhel",
] as const;

const homeStackItems = homeStack
  .map((icon) => {
    for (const category of SKILL_CATEGORIES) {
      const item = category.items.find((entry) => entry.icon === icon);
      if (item) return item;
    }
    return undefined;
  })
  .filter((item): item is NonNullable<typeof item> => Boolean(item));

/* Hero summary of the three layers. Mirrors EXPERTISE, top to bottom. */
const heroLayers = [
  { name: "Websites", detail: "React, Next.js, TypeScript" },
  { name: "Marketing & SEO", detail: "Search, social and paid ads" },
  { name: "Linux servers", detail: "Bare metal, Debian, Ubuntu, RHEL" },
] as const;

const layerColor = ["bg-sky", "bg-butter", "bg-apricot"] as const;

const afterLaunch = [
  {
    title: "Server setup",
    body: "Installing Linux on bare metal or a VPS, then services, firewalls and a clean way to deploy.",
  },
  {
    title: "Troubleshooting",
    body: "Calm, step-by-step diagnosis when something won't boot, connect, mount or keep up.",
  },
  {
    title: "Recovery",
    body: "Getting back into a broken machine and restoring service without making things worse.",
  },
  {
    title: "Maintenance",
    body: "Updates, backups and written notes, so the same problem doesn't come back next month.",
  },
] as const;

export function Home() {
  const featuredPosts = getFeaturedPosts(3);
  const headlineStats = ACHIEVEMENTS.slice(0, 2);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="container-editorial grid gap-12 pb-16 pt-10 md:pt-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-2 text-sm font-semibold text-muted">
            <MapPin size={15} strokeWidth={1.8} aria-hidden="true" />
            Shine Akhanda, {SITE.location.display}
          </p>
          <h1 className="display mt-5 text-[clamp(2.9rem,6.6vw,5.6rem)]">
            Websites that bring in customers, on servers that stay up.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft">
            I build websites for businesses in Bangladesh and abroad, run the marketing that brings
            people to them, and look after the Linux servers they live on. I also founded{" "}
            <Link to="/about" className="link-underline font-semibold text-ink">
              Cave Technologies
            </Link>
            .
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/projects">See my work</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Start a project
            </ButtonLink>
            <a
              href={SITE.phone.href}
              className="ml-1 inline-flex items-center gap-2 py-3 text-sm font-semibold text-muted transition-colors hover:text-ink"
            >
              <Phone size={15} strokeWidth={1.8} aria-hidden="true" />
              {SITE.phone.display}
            </a>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
            {headlineStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="flex items-baseline gap-3">
                  <span className="font-display text-[2.6rem] font-bold leading-none tracking-[-0.04em]">
                    {stat.value}
                  </span>
                  <span className="max-w-[9rem] text-sm font-semibold leading-snug text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <figure>
            <div className="flex items-end gap-4">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-[1.5px] border-ink bg-butter md:h-32 md:w-32">
                <img
                  src={SITE.portrait.src}
                  alt={SITE.portrait.alt}
                  width={SITE.portrait.width}
                  height={SITE.portrait.height}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="pb-2 text-sm leading-6 text-muted">
                <span className="block font-display text-lg font-bold text-ink">Shine Akhanda</span>
                Founder &amp; CEO, {SITE.company.name}
              </figcaption>
            </div>

            <ol className="strata strata-in mt-6" aria-label="What I work on, from the surface down">
              {heroLayers.map((layer) => (
                <li key={layer.name} className="stratum">
                  <span className="block font-display text-[1.35rem] font-bold leading-tight tracking-[-0.02em]">
                    {layer.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-ink-soft">{layer.detail}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              {SITE.tagline}
            </p>
          </figure>
        </div>
      </section>

      {/* Selected work */}
      <section id="selected-work" className="container-editorial scroll-mt-24 pb-20 md:pb-28">
        <SectionHeading
          title="Recent client work"
          description="Four live websites for an architecture studio, a hospital, an online madrasa and an international wig manufacturer. Each case study links to the real site."
          link={{ label: "See all projects", href: "/projects" }}
          className="mb-10 md:mb-14"
        />
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Practice: the three layers in detail */}
      <section className="container-editorial pb-20 md:pb-28">
        <div className="rounded-[var(--radius-card)] bg-paper-deep p-6 md:p-10 lg:p-12">
          <SectionHeading
            title="One person who understands the whole stack"
            description="A site is easier to improve when the page, the marketing and the server are looked after together. Nothing gets lost between three different agencies."
            link={{ label: "All services", href: "/services" }}
            className="mb-10"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {EXPERTISE.map((item, index) => (
              <article
                key={item.title}
                className="flex flex-col rounded-[var(--radius-soft)] border border-line bg-paper p-6"
              >
                <p className="flex items-center gap-2 text-sm font-semibold text-muted">
                  <span className={`swatch ${layerColor[index]}`} aria-hidden="true" />
                  {item.layer}
                </p>
                <h3 className="display mt-6 text-[clamp(1.7rem,2.6vw,2.2rem)]">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-7 text-muted">{item.body}</p>
                <Link to={item.href} className="link-underline mt-auto self-start pt-6 text-sm font-semibold">
                  {item.linkLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className="container-editorial pb-20 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="display text-[clamp(2.3rem,4.4vw,3.8rem)]">
              A developer who also runs a business
            </h2>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-5 text-[1.05rem] leading-8 text-ink-soft">
              <p>
                I&apos;m Shine, a web developer and digital marketer from Mymensingh. Through Cave
                Technologies I work with businesses that need to look credible online, reach the
                right customers, and own a site they can actually keep up to date.
              </p>
              <p>
                Running my own company changed how I build. I still care about typography and clean
                code, but the first question is always whether a page helps someone decide. And
                because I also manage Linux servers, I stay around after launch: setup,
                troubleshooting, recovery and the boring maintenance that keeps things online.
              </p>
            </div>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Company", "Founder & CEO, Cave Technologies"],
                ["Based in", "Mymensingh, Bangladesh"],
                ["Languages", "English and Bangla"],
                ["How I work", "Plain updates, careful builds, written handover"],
              ].map(([term, value]) => (
                <div key={term} className="rounded-[var(--radius-soft)] border border-line px-5 py-4">
                  <dt className="text-sm font-semibold text-muted">{term}</dt>
                  <dd className="mt-1 font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/about" variant="outline">
                Read my story
              </ButtonLink>
              <ButtonLink href="/infrastructure" variant="outline">
                Server and Linux work
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* After launch */}
      <section className="container-editorial pb-20 md:pb-28">
        <div className="grid overflow-hidden rounded-[var(--radius-card)] border-[1.5px] border-ink lg:grid-cols-12">
          <div className="bg-butter p-7 md:p-10 lg:col-span-5">
            <h2 className="display text-[clamp(2.2rem,4vw,3.4rem)]">Launch day is only the start</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-ink-soft">
              Linux administration is the part of my work clients rarely see. It decides whether
              the website is reachable, recoverable, and understood when something breaks at 2 a.m.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Debian", "Ubuntu", "AlmaLinux", "CentOS", "RHEL"].map((name) => (
                <span key={name} className="chip bg-paper/70">
                  {name}
                </span>
              ))}
            </div>
            <ButtonLink href="/infrastructure" className="mt-8">
              How I handle servers
            </ButtonLink>
          </div>
          <div className="grid bg-paper sm:grid-cols-2 lg:col-span-7">
            {afterLaunch.map((item) => (
              <div
                key={item.title}
                className="border-b border-line p-6 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-child(n+3)]:border-b-0 md:p-8"
              >
                <h3 className="font-display text-[1.45rem] font-bold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-7 text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="container-editorial pb-20 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="display text-[clamp(2.2rem,4vw,3.4rem)]">Tools I reach for most</h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-muted">
              The stack follows the problem, not the trend. These cover most of my frontend,
              backend, database and server work.
            </p>
            <Link to="/skills" className="link-underline mt-6 text-sm font-semibold">
              Full skills list
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4">
            {homeStackItems.map((item) => (
              <li
                key={item.name}
                className="flex min-h-[6.5rem] flex-col justify-between rounded-[var(--radius-soft)] border border-line bg-paper p-4 transition-colors hover:bg-sky"
              >
                <BrandIcon name={item.icon} size={22} className="text-ink" />
                <span className="mt-4 text-sm font-semibold">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journal */}
      <section className="container-editorial pb-16 md:pb-24">
        <SectionHeading
          title="From the journal"
          description="Practical writing on websites, marketing and the servers behind them, mostly from real client questions."
          link={{ label: "All articles", href: "/blog" }}
          className="mb-10 md:mb-14"
        />
        <div className="grid gap-10 lg:grid-cols-12">
          {featuredPosts[0] ? (
            <div className="lg:col-span-7">
              <BlogCard post={featuredPosts[0]} variant="featured" />
            </div>
          ) : null}
          <div className="lg:col-span-5">
            {featuredPosts.slice(1).map((post) => (
              <BlogCard key={post.slug} post={post} variant="compact" />
            ))}
            <div className="border-t border-line pt-5">
              <p className="max-w-sm text-[0.95rem] leading-7 text-muted">
                Longer guides for the decisions that come before a redesign, a campaign or a server
                move.
              </p>
              <ButtonLink href="/blog" variant="outline" className="mt-5">
                Read the journal
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
