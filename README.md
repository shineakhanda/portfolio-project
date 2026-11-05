# Shine Akhanda — Portfolio

Source for [shineakhanda.dev](https://shineakhanda.dev), the portfolio of Shine Akhanda: web developer, digital marketer and founder of Cave Technologies in Mymensingh, Bangladesh.

A multi-page React site that is prerendered to static HTML and deployed on Cloudflare, with a small Hono API for the contact form.

## Stack

- React 19, TypeScript, React Router 7
- Vite 8, Tailwind CSS 4
- Hono on Cloudflare Workers
- Markdown articles (Marked + js-yaml)
- Self-hosted Bricolage Grotesque and Manrope fonts

## Using this for your own portfolio

You're welcome to. Two guides walk you through it:

- [docs/CUSTOMIZE.md](docs/CUSTOMIZE.md): replace the content, photos, projects, skills and colours with your own
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md): put it online on Cloudflare, set up the contact form and add a domain

The code is MIT licensed. Shine's portrait, screenshots, articles and copy are not, so replace them before you publish.

## Getting started

Requires Node.js 20 or newer.

```bash
git clone https://github.com/shineakhanda/portfolio-project.git
cd portfolio-project
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check, build, and prerender every route to `dist/` |
| `npm run preview` | Serve the production build at `http://127.0.0.1:4174` |
| `npm run validate` | Check the built HTML, sitemap, RSS and links |
| `npm run audit` | Browser and accessibility checks (set `CHROME_PATH` to your Chrome) |
| `npm run test:api` | Test the contact API |
| `npm run assets` | Regenerate WebP and social images from source JPGs |

Use `npm run preview`, not `vite preview`, to test the build. It serves real pages and the real 404 instead of a single-page fallback.

## Editing content

| To change | Edit |
| --- | --- |
| Name, phone, email, social links, stats | `src/data/site.ts` |
| Projects | `src/data/projects.ts` (images go in `public/projects/`) |
| Services | `src/data/services.ts` |
| Skills | `src/data/skills.ts` (icons in `src/components/ui/BrandIcon.tsx`) |
| Navigation | `src/data/navigation.ts` |
| Page titles and descriptions | `src/lib/seo.ts` |

Run `npm run assets` after adding project images.

### Adding an article

Create a Markdown file in `src/content/blog/`:

```yaml
---
title: "Article title"
description: "Unique meta description."
excerpt: "Short card excerpt."
date: "2026-11-05"
updated: "2026-11-05"
category: "Web Development"   # must exist in src/data/blogTaxonomy.ts
tags: ["React", "Business Websites"]
featured: false
order: 12
cover: "/blog/my-article.jpg"
coverAlt: "Describe the cover image"
---
```

The article page, sitemap entry, RSS item and archive listings are generated on build. Don't edit `src/generated/blogIndex.ts` by hand.

## Deployment

Deployed as a Cloudflare Worker (`wrangler.toml`). Build command `npm run build`, deploy command `npx wrangler deploy`. Every push to `main` triggers a deploy, so group changes into one commit where possible.

Environment variables, the contact form and custom domains are covered in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Project layout

```text
src/
  pages/          one component per route
  components/     layout, UI and project components
  data/           site content (projects, services, skills, profile)
  content/blog/   Markdown articles
  lib/            SEO, structured data, routing, blog helpers
  server/api.ts   Hono contact API
worker/index.ts   Cloudflare Worker entry
scripts/          build, prerender, validation and audit scripts
docs/             deployment, customisation and SEO guides
```

## License

Code is MIT licensed. The portrait, project screenshots, written content and personal branding are not covered. See [LICENSE](LICENSE).
