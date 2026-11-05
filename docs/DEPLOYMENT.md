# Deployment guide

This site runs as a **Cloudflare Worker**. The Worker serves the prerendered pages from `dist/` and handles the contact form at `/api/contact`. Cloudflare's free plan is enough.

You can deploy in two ways:

- **[Option A: from GitHub](#option-a-deploy-from-github-recommended)**. Cloudflare builds and deploys every time you push. Best for most people.
- **[Option B: from your computer](#option-b-deploy-from-your-computer)**, with the Wrangler CLI.

Before either, make the site yours. See [CUSTOMIZE.md](CUSTOMIZE.md).

---

## Before you start

You need:

- A [Cloudflare account](https://dash.cloudflare.com/sign-up)
- A GitHub account with your copy of this repo (fork it, or use it as a template)
- Node.js 20 or newer, if you want to build or test locally
- Optional: a domain name, and a [Resend](https://resend.com) account for the contact form

Check that it builds on your machine first:

```bash
npm install
npm run build
npm run preview   # open http://127.0.0.1:4174
```

## 1. Rename the Worker

Open `wrangler.toml` and change the name to your own:

```toml
name = "my-portfolio"
```

Leave the rest of the file as it is. Commit and push.

## Option A: deploy from GitHub (recommended)

1. In the Cloudflare dashboard, open **Workers & Pages** and choose **Create**.
2. Choose to import a Git repository, connect your GitHub account, and pick your repo and the `main` branch.
3. Set the build settings:

   | Setting | Value |
   | --- | --- |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy` |
   | Root directory | leave empty |

4. Add the **build variables** (see [Environment variables](#environment-variables)). These are needed while the site is being built.
5. Save and deploy. The first build takes a few minutes.

After that, every push to `main` builds and deploys automatically. You can change these settings later in your Worker under **Settings → Build**.

> **Tip:** Each push is one deploy. If your plan has a deploy limit, put related changes in one commit before pushing.

## Option B: deploy from your computer

```bash
npx wrangler login                        # opens the browser once
SITE_URL=https://example.com VITE_SITE_URL=https://example.com npm run build
npx wrangler deploy
```

Add contact form secrets from the terminal:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_FROM_EMAIL
npx wrangler secret put CONTACT_TO_EMAIL
```

## Environment variables

There are two kinds, and they go in different places.

### Build variables

These are used while the site is built. Set them under **Settings → Build → Build variables and secrets**, or in a local `.env` file (copy `.env.example`).

| Name | Example | Purpose |
| --- | --- | --- |
| `SITE_URL` | `https://example.com` | Used for canonical URLs, the sitemap, RSS and robots.txt |
| `VITE_SITE_URL` | `https://example.com` | Same address, used by the browser code |

Both must be the same address, with no trailing slash. If you change your domain, rebuild.

If you don't have a domain yet, use your Worker's `workers.dev` address and change it later.

### Runtime variables and secrets

These are read by the contact form while the site is running. Set them under **Settings → Variables & Secrets**. Mark `RESEND_API_KEY` as a secret.

| Name | Example | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | `re_...` | Sends contact form email through Resend |
| `CONTACT_FROM_EMAIL` | `My Website <website@example.com>` | Sender address. Must be on a domain verified in Resend |
| `CONTACT_TO_EMAIL` | `you@example.com` | Where enquiries are delivered |

Until `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` are set, the form shows a clear error message instead of failing silently.

## 2. Set up the contact form (optional)

1. Sign up at [resend.com](https://resend.com).
2. Add your domain under **Domains** and add the DNS records Resend gives you. If your domain is on Cloudflare, add them in Cloudflare's DNS tab.
3. Wait until the domain shows as verified.
4. Create an API key.
5. Add the three runtime variables above to your Worker, then redeploy.
6. Send yourself a test message from `/contact` and check it arrives.

Before you deploy, also change the fallback email and phone in `src/server/api.ts`. They appear in the form's error messages.

## 3. Add your domain (optional)

1. Add your domain to Cloudflare, if it isn't there already.
2. Open your Worker, go to **Settings → Domains & Routes**, and add a custom domain.
3. Set `SITE_URL` and `VITE_SITE_URL` to the new address and redeploy.
4. If you use both `www` and the bare domain, redirect one to the other so the site has a single address.

## 4. Check the live site

- Open a few pages directly, like `/about` and `/projects`, and refresh them.
- Visit a page that doesn't exist and make sure the 404 page appears.
- Check that `/sitemap.xml`, `/robots.txt`, `/rss.xml` and `/llms.txt` load and use your domain.
- Test the contact form, if you set it up.
- Submit your sitemap in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters).
- Run [PageSpeed Insights](https://pagespeed.web.dev) on the live URL.

## Alternative: Cloudflare Pages

The repo also works on Cloudflare **Pages**, using `functions/api/[[path]].ts`, `public/_headers` and `public/_routes.json`.

1. Create a **Pages** project, not a Worker, and connect the repo.
2. Build command: `npm run build`. Build output directory: `dist`.
3. Don't set a deploy command.
4. Add the same variables as above in the Pages project settings.

Use either Workers or Pages, not both.

## Troubleshooting

| Problem | Likely cause and fix |
| --- | --- |
| Build fails with a TypeScript error | Run `npm run build` locally; the same error appears there with the file and line. |
| Sitemap or canonical links show `shineakhanda.dev` | `SITE_URL` / `VITE_SITE_URL` aren't set as **build** variables. Set them and redeploy. |
| Deploy fails or Cloudflare tries to detect a framework | Make sure `wrangler.toml` is in the repo root and the deploy command is `npx wrangler deploy`. |
| Pages 404 when you refresh them | Check you didn't mix the two setups: a Worker needs the deploy command; a Pages project must not have one. |
| Contact form says it isn't configured | Add `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` as **runtime** variables and redeploy. |
| Contact form says delivery failed | The sender domain isn't verified in Resend yet, or the API key is wrong. |
| `npm run validate` fails after you rebrand | That script checks for the original domain and email. Update the values in `scripts/validate-build.mjs`. |
