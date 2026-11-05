# Make this portfolio your own

This guide takes you from a copy of the repo to a portfolio with your name, work and colours. Plan on an afternoon. Most of it is editing text in a few data files.

When you're done, follow [DEPLOYMENT.md](DEPLOYMENT.md) to put it online.

> **Please read first.** The code is MIT licensed, so you're free to use it. The portrait, project screenshots, articles, written copy and personal branding belong to Shine Akhanda and are **not** included in that licence. Replace all of them before you publish. See [LICENSE](../LICENSE).

---

## 1. Get the code running

1. Fork the repo on GitHub, or click **Use this template** if it's available.
2. Clone your copy and start the dev server:

   ```bash
   git clone https://github.com/YOUR-USERNAME/portfolio-project.git
   cd portfolio-project
   npm install
   npm run dev
   ```

3. Open `http://localhost:5173`. Changes appear as soon as you save a file.

## 2. Your profile

Open **`src/data/site.ts`**. Most personal details on the site come from here:

- `name`, `title`, `tagline`, `description`
- `location`, `phone`, `email`
- `company`, if you run one. If you don't, see [Removing the company](#removing-the-company)
- `SOCIAL_LINKS`: your profiles. Delete any you don't use.
- `ACHIEVEMENTS`: the numbers on the homepage and About page. Only use numbers you can back up.
- `EXPERTISE` and `PRINCIPLES`: your services summary and how you work.

Also replace your site address in **`.env.example`** and copy it to `.env`:

```bash
cp .env.example .env
```

## 3. Your photo and icons

| File | What it is | Size |
| --- | --- | --- |
| `public/images/shine-akhanda-portrait.webp` | Portrait shown on the site | 512 × 512 |
| `public/images/shine-akhanda.jpg` | Portrait used in search results | 512 × 512 |
| `public/images/og-default.jpg` | Preview image when the site is shared | 1200 × 630 |
| `public/favicon.ico`, `favicon-*.png`, `apple-touch-icon.png`, `android-chrome-*.png` | Browser and phone icons | as named |

You can keep the file names, or rename them and update `portrait` and `defaultImage` in `src/data/site.ts`.

A tool like [RealFaviconGenerator](https://realfavicongenerator.net) makes the whole icon set from one image.

## 4. Your projects

Open **`src/data/projects.ts`**. Each project is one object:

```ts
{
  slug: "my-client",                 // becomes /projects/my-client
  title: "My Client",
  category: "Healthcare",
  projectType: "Business website",
  summary: "One or two sentences for cards and search results.",
  description: "A longer paragraph.",
  objective: "What the website needed to do.",
  overview: ["Paragraph one.", "Paragraph two."],
  roleNote: "What you did on this project. Be honest about your part.",
  stack: ["Next.js", "Tailwind CSS"],
  highlights: ["Point one", "Point two", "Point three"],
  externalUrl: "https://my-client.com",
  image: {
    src: "/projects/my-client.webp",
    alt: "My Client homepage",
    width: 1440,
    height: 1100,
  },
  ogImage: "/projects/my-client-og.jpg",
  index: "01",
}
```

To add the screenshot:

1. Take a screenshot of the live site's homepage at 1440 px wide and save it as `public/projects/my-client.jpg`.
2. Run `npm run assets`. This creates the `.webp` version and the `-og.jpg` share image.
3. Delete the old project screenshots in `public/projects/`.

The Work page lays out projects as wide, half, half, wide. It looks best with an even number of projects. It works with any number.

## 5. Your skills

Open **`src/data/skills.ts`**.

- `SKILL_LAYERS` are the three big groups. Rename them to suit your work.
- In `SKILL_CATEGORIES`, each `layer` must match one of the layer ids: `web`, `marketing` or `server`.
- Add `core: true` to the tools you use most. They appear in the "Core stack" strip.
- Add `projects: ["my-client"]` to link a skill to projects that used it. Use project `slug`s from `projects.ts`.

Icons come from `src/components/ui/BrandIcon.tsx`. To add one, import it from [`react-icons/si`](https://react-icons.github.io/react-icons/icons/si/), add a name to `TechIconName` in `src/types/content.ts`, then map it in `BRAND_ICONS`.

## 6. Your services

Open **`src/data/services.ts`**. Each service gets its own page at `/services/<slug>`, with a process, FAQs and related projects.

- Keep `seoTitle` under about 60 characters and `seoDescription` under about 160.
- `relatedProjectSlugs` must use slugs from `projects.ts`.
- Delete services you don't offer. Also remove them from `FOOTER_NAV` in `src/data/navigation.ts`.

## 7. Page text

The headlines and paragraphs on each page live in the page files:

| Page | File |
| --- | --- |
| Home | `src/pages/Home.tsx` |
| About | `src/pages/About.tsx` |
| Services overview | `src/pages/Services.tsx` |
| Server work | `src/pages/Infrastructure.tsx` |
| Contact | `src/pages/Contact.tsx` |
| Privacy | `src/pages/Privacy.tsx` |
| Footer | `src/components/layout/Footer.tsx` |
| Header tagline | `src/components/layout/Header.tsx` |

Search for the text you see on screen to find it quickly.

**Don't need the Linux page?** Remove `/infrastructure` from `src/App.tsx`, `src/lib/pageRegistry.tsx`, `src/lib/routes.ts` and `FOOTER_NAV` in `src/data/navigation.ts`, then delete `src/pages/Infrastructure.tsx` and any links to it. Run `npm run build` to catch anything missed.

## 8. Search and sharing details

Search engines read these, so they should describe you:

| What | File |
| --- | --- |
| Page titles and descriptions | `src/lib/seo.ts` |
| Structured data (who you are, your company) | `src/lib/structuredData.ts` |
| `llms.txt` summary for AI tools | `renderLlmsTxt` in `scripts/prerender.mjs` |
| RSS feed title | `scripts/prerender.mjs` and `index.html` |
| App name and colours | `public/site.webmanifest` and `index.html` |
| Security contact | `public/.well-known/security.txt` |
| Contact form fallback email and phone | `src/server/api.ts` |
| Build checks | `scripts/validate-build.mjs` and `scripts/test-hono.mjs` check for the original domain and email; update them |

`docs/SEO.md` is Shine's own SEO plan. Delete it or replace it with yours.

A quick way to catch anything left over:

```bash
grep -rn "Shine\|shineakhanda\|Cave Technologies\|Mymensingh" src scripts public index.html
```

## 9. The blog

Delete the articles in `src/content/blog/` and their covers in `public/blog/`. Then add your own. The front matter template is in the [README](../README.md#adding-an-article).

To change the blog categories, edit `src/data/blogTaxonomy.ts`. Every article's `category` must match one of them.

Keep at least one article. The build checks expect the RSS feed to have items, and the homepage shows your latest posts.

## 10. Colours and fonts (optional)

All colours are defined at the top of **`src/styles/globals.css`**:

```css
--color-paper: #fdfdfb;    /* page background */
--color-ink: #26231f;      /* text */
--color-sky: #d9eefa;      /* first accent */
--color-butter: #fff1ab;   /* second accent */
--color-apricot: #ffdfc6;  /* third accent */
```

Change these and the whole site follows. Keep the accents light so dark text stays readable on them. A contrast checker like [WebAIM](https://webaim.org/resources/contrastchecker/) helps.

Headings use Bricolage Grotesque, stored at `public/fonts/`. To use another font:

1. Put the `.woff` or `.woff2` file in `public/fonts/`.
2. Update the `@font-face` block at the top of `globals.css`.
3. Update the preload link in `scripts/prerender.mjs`. Search for `bricolage`.

Body text uses Manrope, loaded in `src/main.tsx`.

## Removing the company

If you don't run a company:

1. Remove the `company` block from `src/data/site.ts`, then run `npm run build`. TypeScript will list every place that used it.
2. Remove the `Organization` entry and `worksFor` in `src/lib/structuredData.ts`.
3. Remove the company section from `src/pages/About.tsx`.

## Before you publish

- [ ] No personal details, photos or screenshots from the original are left (run the `grep` above)
- [ ] `npm run build` finishes without errors
- [ ] `npm run preview` looks right on desktop and on a phone
- [ ] Every project link opens the right live site
- [ ] `SITE_URL` and `VITE_SITE_URL` point to your domain

Then follow [DEPLOYMENT.md](DEPLOYMENT.md).
