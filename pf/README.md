# Vidun Shanuka — Portfolio

Personal portfolio built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

## Run locally

```bash
cd pf
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run lint
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`) so canonical URLs, the sitemap and Open Graph tags use your domain. On Vercel the production URL is picked up automatically.

## Structure

- `src/app` — routes, metadata, `opengraph-image`, `icon`, `sitemap`, `robots`, `not-found`
- `src/components/sections` — home page sections (server components)
- `src/components/motion` — small client wrappers for Framer Motion (`motion`) animations
- `src/components/layout` — navbar, footer, theme toggle, providers
- `src/data` — all portfolio content; edit these files to update the site
- `src/app/globals.css` — design tokens (colors, type scale, spacing, radius, shadows) for both themes
