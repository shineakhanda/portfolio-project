import type { SkillCategory, SkillLayer, TechItem } from "@/types/content";

/*
  Skills are grouped into the same three layers used across the site:
  what visitors see, how they find it, and what keeps it running.
  `projects` only lists portfolio projects whose verified stack includes the
  tool (see src/data/projects.ts), so every link on the page is real.
*/

export const SKILL_LAYERS: Array<{
  id: SkillLayer;
  name: string;
  question: string;
  summary: string;
  color: "bg-sky" | "bg-butter" | "bg-apricot";
}> = [
  {
    id: "web",
    name: "Websites",
    question: "What people see",
    summary: "Frontend, styling, backend and databases for fast, maintainable business websites.",
    color: "bg-sky",
  },
  {
    id: "marketing",
    name: "Marketing & SEO",
    question: "How they find you",
    summary: "Search, analytics and paid campaigns that bring the right visitors and measure what they do.",
    color: "bg-butter",
  },
  {
    id: "server",
    name: "Linux & servers",
    question: "What keeps it running",
    summary: "Linux distributions, web servers and the day-to-day administration behind a dependable site.",
    color: "bg-apricot",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    slug: "frontend",
    title: "Frontend",
    layer: "web",
    description: "Semantic, responsive interfaces built from reusable, typed components.",
    items: [
      {
        name: "HTML5",
        description: "Semantic structure, accessible forms and markup that search engines can read.",
        icon: "html",
      },
      {
        name: "CSS3",
        description: "Grid, flexbox, custom properties, fluid type and careful responsive layouts.",
        icon: "css",
        projects: ["hylic-sketch", "moushafi-hospital", "madinatul-quran", "wig-vend"],
      },
      {
        name: "JavaScript",
        description: "Modern browser APIs, interactive UI and async logic without unnecessary weight.",
        icon: "javascript",
        projects: ["madinatul-quran"],
      },
      {
        name: "TypeScript",
        description: "Typed application code for safer refactors and fewer runtime surprises.",
        icon: "typescript",
        core: true,
      },
      {
        name: "React",
        description: "Composable interfaces, state management and accessible interactions.",
        icon: "react",
        core: true,
        projects: ["hylic-sketch", "wig-vend"],
      },
      {
        name: "Next.js",
        description: "Server and static rendering, routing, image handling and metadata for SEO.",
        icon: "nextjs",
        core: true,
        projects: ["wig-vend"],
      },
      {
        name: "Angular",
        description: "Structured applications with components, services and typed forms.",
        icon: "angular",
      },
    ],
  },
  {
    slug: "styling",
    title: "Styling & motion",
    layer: "web",
    description: "Visual systems that stay consistent as a site grows.",
    items: [
      {
        name: "Tailwind CSS",
        description: "Utility-first styling with design tokens and responsive variants.",
        icon: "tailwind",
        core: true,
      },
      {
        name: "Bootstrap",
        description: "Reliable responsive grids, navigation and form components.",
        icon: "bootstrap",
        projects: ["moushafi-hospital"],
      },
      {
        name: "Framer Motion",
        description: "Purposeful animation that explains a change instead of decorating it.",
        icon: "framer",
        projects: ["hylic-sketch"],
      },
      {
        name: "shadcn/ui",
        description: "Accessible primitives adapted to a project's own visual language.",
        icon: "shadcn",
      },
      {
        name: "Lucide",
        description: "Consistent, accessible line icons for interfaces.",
        icon: "lucide",
      },
    ],
  },
  {
    slug: "backend",
    title: "Backend",
    layer: "web",
    description: "APIs, forms and server logic sized to what the project actually needs.",
    items: [
      {
        name: "Node.js",
        description: "Server-side JavaScript for APIs, integrations and build tooling.",
        icon: "nodejs",
        core: true,
      },
      {
        name: "PHP",
        description: "Server-rendered sites, form handling and maintaining existing PHP projects.",
        icon: "php",
        core: true,
        projects: ["moushafi-hospital", "madinatul-quran"],
      },
      {
        name: "Hono",
        description: "Lightweight, standards-based APIs for edge and serverless runtimes.",
        icon: "hono",
        core: true,
      },
    ],
  },
  {
    slug: "databases",
    title: "Databases",
    layer: "web",
    description: "Storage chosen for the shape of the data, not out of habit.",
    items: [
      {
        name: "PostgreSQL",
        description: "Relational models with strong constraints and dependable queries.",
        icon: "postgresql",
        core: true,
      },
      {
        name: "MySQL",
        description: "Relational data, indexing and content-heavy application backends.",
        icon: "mysql",
        core: true,
      },
      {
        name: "MongoDB",
        description: "Document storage for flexible content and application data.",
        icon: "mongodb",
        core: true,
      },
    ],
  },
  {
    slug: "seo",
    title: "SEO & analytics",
    layer: "marketing",
    description: "Making a site easy for search engines to understand, and measuring what visitors do.",
    items: [
      {
        name: "Technical SEO",
        description: "Crawlability, indexing, canonicals, sitemaps, metadata and internal links.",
        icon: "search",
        core: true,
      },
      {
        name: "Structured data",
        description: "Schema.org markup so search engines understand people, services and articles.",
        icon: "schema",
      },
      {
        name: "Core Web Vitals",
        description: "Loading speed, responsiveness and layout stability measured and improved.",
        icon: "activity",
      },
      {
        name: "Google Search Console",
        description: "Index coverage, search queries and fixing what stops pages from ranking.",
        icon: "search-console",
        core: true,
      },
      {
        name: "Google Analytics",
        description: "Tracking enquiries and sales, not just page views.",
        icon: "google-analytics",
        core: true,
      },
      {
        name: "Content strategy",
        description: "Pages and articles planned around the questions customers actually search.",
        icon: "content",
      },
    ],
  },
  {
    slug: "advertising",
    title: "Paid advertising",
    layer: "marketing",
    description: "Campaigns with a clear goal and a budget that fits the business.",
    items: [
      {
        name: "Google Ads",
        description: "Search campaigns aimed at people already looking for the service.",
        icon: "google-ads",
        core: true,
      },
      {
        name: "Meta Ads",
        description: "Facebook and Instagram campaigns for local reach and lead generation.",
        icon: "meta",
        core: true,
      },
    ],
  },
  {
    slug: "operating-systems",
    title: "Linux distributions",
    layer: "server",
    description: "Hands-on work across the Debian/Ubuntu and Red Hat families.",
    items: [
      {
        name: "Debian",
        description: "Stable foundations for long-lived servers and services.",
        icon: "debian",
        core: true,
      },
      {
        name: "Ubuntu",
        description: "LTS administration on cloud and bare-metal machines.",
        icon: "ubuntu",
        core: true,
        projects: ["wig-vend"],
      },
      {
        name: "Red Hat Enterprise Linux",
        description: "RHEL services, security and package workflows.",
        icon: "rhel",
        core: true,
      },
      {
        name: "AlmaLinux",
        description: "RHEL-compatible servers for long-term stability.",
        icon: "almalinux",
      },
      {
        name: "CentOS",
        description: "Maintaining established CentOS servers and planning migrations off them.",
        icon: "centos",
      },
    ],
  },
  {
    slug: "web-servers",
    title: "Web servers & hosting",
    layer: "server",
    description: "The software that actually serves the site to visitors.",
    items: [
      {
        name: "nginx",
        description: "Reverse proxy, TLS, caching and serving Node and static sites.",
        icon: "nginx",
        projects: ["wig-vend"],
      },
      {
        name: "Apache",
        description: "Virtual hosts and PHP hosting on traditional server setups.",
        icon: "apache",
      },
      {
        name: "Cloudflare",
        description: "DNS, CDN, security rules and edge deployments.",
        icon: "cloudflare",
        core: true,
        projects: ["hylic-sketch", "moushafi-hospital", "madinatul-quran"],
      },
      {
        name: "Bash & SSH",
        description: "Scripting routine jobs and working safely on remote machines.",
        icon: "bash",
      },
    ],
  },
  {
    slug: "infrastructure",
    title: "Administration & recovery",
    layer: "server",
    description: "The quiet work that keeps systems reachable, recoverable and understood.",
    items: [
      {
        name: "Linux server setup",
        description: "Users, services, firewalls, web servers and a clean way to deploy.",
        icon: "terminal",
      },
      {
        name: "Bare-metal setup",
        description: "Installing physical servers: storage, networking and the operating system.",
        icon: "hard-drive",
      },
      {
        name: "Server administration",
        description: "Updates, monitoring, backups and service management over time.",
        icon: "server",
      },
      {
        name: "Troubleshooting",
        description: "Step-by-step diagnosis of boot, network, storage and performance problems.",
        icon: "wrench",
      },
      {
        name: "Recovery & rescue",
        description: "Regaining access to failed machines and restoring service without guesswork.",
        icon: "life-buoy",
      },
      {
        name: "Hardening",
        description: "Sensible defaults, least privilege and documented configuration.",
        icon: "shield",
      },
    ],
  },
];

export function getSkillsByLayer(layer: SkillLayer): SkillCategory[] {
  return SKILL_CATEGORIES.filter((category) => category.layer === layer);
}

export function getAllSkills(): TechItem[] {
  return SKILL_CATEGORIES.flatMap((category) => category.items);
}

export function getCoreSkills(): TechItem[] {
  return getAllSkills().filter((item) => item.core);
}

/** Skills whose verified stack includes the given project. */
export function getSkillsForProject(projectSlug: string): TechItem[] {
  return getAllSkills().filter((item) => item.projects?.includes(projectSlug));
}
