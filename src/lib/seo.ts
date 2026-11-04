import { PROJECTS, getProjectBySlug } from "@/data/projects";
import { getServiceBySlug } from "@/data/services";
import { getCategoryBySlug, slugifyTag } from "@/data/blogTaxonomy";
import { SITE } from "@/data/site";
import { getPostBySlug, getPostsByTag } from "@/lib/blogMeta";
import { stripTrailingSlash } from "@/lib/utils";
import type { PageSeo } from "@/types/content";

function normalisePath(pathname: string): string {
  const cleaned = stripTrailingSlash(pathname.split("?")[0].split("#")[0]);
  return cleaned === "" ? "/" : cleaned;
}

export function getPageSeo(inputPath: string): PageSeo {
  const path = normalisePath(inputPath);

  if (path === "/") {
    return {
      title: "Shine Akhanda | Web Developer & SEO in Mymensingh, Bangladesh",
      description:
        "Web developer, digital marketer and Linux admin in Mymensingh, Bangladesh. I build fast business websites, run SEO and ads, and keep the servers running.",
      path,
      type: "website",
      image: SITE.defaultImage,
      imageAlt: SITE.defaultImageAlt,
    };
  }

  if (path === "/about") {
    return {
      title: "About Shine Akhanda | Web Developer & Founder of Cave Technologies",
      description:
        "Meet Shine Akhanda: web developer, digital marketer and founder of Cave Technologies in Mymensingh, with hands-on Linux server experience.",
      path,
      type: "profile",
      image: SITE.defaultImage,
      imageAlt: SITE.defaultImageAlt,
    };
  }

  if (path === "/projects") {
    return {
      title: "Website Projects & Case Studies | Shine Akhanda, Bangladesh",
      description:
        "Live client websites by Shine Akhanda for an architecture studio, a Mymensingh hospital, an online madrasa and an international manufacturer, with case studies.",
      path,
      image: PROJECTS[0]?.image.src,
      imageAlt: PROJECTS[0]?.image.alt,
    };
  }

  if (path.startsWith("/projects/")) {
    const slug = path.split("/")[2] ?? "";
    const project = getProjectBySlug(slug);
    if (!project) return notFoundSeo(path);
    return {
      title: `${project.title}: ${project.category} Website by Shine Akhanda`,
      description: project.summary,
      path,
      image: project.ogImage ?? project.image.src,
      imageAlt: project.image.alt,
    };
  }

  if (path === "/skills") {
    return {
      title: "Skills: React, Next.js, SEO & Linux | Shine Akhanda",
      description:
        "Shine Akhanda's skills across React, Next.js, TypeScript, PHP, Node.js, technical SEO, Google and Meta Ads, and Linux servers, linked to real client projects.",
      path,
    };
  }

  if (path === "/services") {
    return {
      title: "Web Development, SEO & Marketing Services | Shine Akhanda",
      description:
        "Website development, React and Next.js, digital marketing, SEO and Linux server services from Shine Akhanda in Mymensingh, for clients in Bangladesh and abroad.",
      path,
    };
  }

  if (path.startsWith("/services/")) {
    const slug = path.split("/")[2] ?? "";
    const service = getServiceBySlug(slug);
    if (!service) return notFoundSeo(path);
    return {
      title: service.seoTitle,
      description: service.seoDescription,
      path,
    };
  }

  if (path === "/blog") {
    return {
      title: "Journal — Web Development, Marketing & Linux | Shine Akhanda",
      description:
        "Practical articles by Shine Akhanda on web development, React and Next.js, TypeScript, backend engineering, digital marketing, SEO, and Linux server administration.",
      path,
      type: "website",
    };
  }

  if (path.startsWith("/blog/categories/")) {
    const slug = path.split("/")[3] ?? "";
    const category = getCategoryBySlug(slug);
    if (!category) return notFoundSeo(path);
    return {
      title: `${category.name} Articles | Shine Akhanda Journal`,
      description: category.seoDescription,
      path,
      type: "website",
    };
  }

  if (path.startsWith("/blog/tags/")) {
    const slug = path.split("/")[3] ?? "";
    const posts = getPostsByTag(slug);
    if (posts.length === 0) return notFoundSeo(path);
    const tag = posts[0]?.tags.find((item) => slugifyTag(item) === slug) ?? slug;
    return {
      title: `Tagged: ${tag} | Shine Akhanda Journal`,
      description: `Articles tagged ${tag} from Shine Akhanda's journal on web development, digital marketing, and infrastructure.`,
      path,
      noindex: true,
    };
  }

  if (path.startsWith("/blog/")) {
    const slug = path.split("/")[2] ?? "";
    const post = getPostBySlug(slug);
    if (!post) return notFoundSeo(path);
    return {
      title: post.title.length > 52 ? post.title : `${post.title} | Shine Akhanda`,
      description: post.description,
      path,
      type: "article",
      image: post.cover,
      imageAlt: post.coverAlt,
      publishedTime: new Date(`${post.date}T00:00:00Z`).toISOString(),
      modifiedTime: new Date(`${post.updated}T00:00:00Z`).toISOString(),
      articleTags: post.tags,
    };
  }

  if (path === "/infrastructure") {
    return {
      title: "Linux Server Setup, Troubleshooting & Recovery | Shine Akhanda",
      description:
        "Linux server setup, bare-metal installs, troubleshooting and recovery on Debian, Ubuntu and RHEL: the systems work that keeps business websites online.",
      path,
    };
  }

  if (path === "/contact") {
    return {
      title: "Contact Shine Akhanda | Hire a Web Developer in Mymensingh",
      description:
        "Contact Shine Akhanda for web development, digital marketing, SEO, or Linux infrastructure work. Call +8801302776234, email me@shineakhanda.dev, or use the enquiry form.",
      path,
    };
  }

  if (path === "/privacy") {
    return {
      title: "Privacy | Shine Akhanda",
      description:
        "How this portfolio handles contact-form information, hosting logs, external links, and privacy choices.",
      path,
      noindex: true,
    };
  }

  return notFoundSeo(path);
}

export function notFoundSeo(path: string): PageSeo {
  return {
    title: "Page Not Found | Shine Akhanda",
    description: "The page you requested could not be found. Explore Shine Akhanda's selected work, services, and journal instead.",
    path,
    noindex: true,
  };
}

export function getSeoAlternates(path: string): Array<{ hreflang: string; href: string }> {
  return [{ hreflang: "en-BD", href: `${SITE.url}${path === "/" ? "/" : path}` }];
}
