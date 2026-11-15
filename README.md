# Monti — Cover Art & Spotify Canvas

Portfolio and booking site for Monti: cover art and Spotify Canvas loops for
musicians. Built as a fast, static single-page React app.

## Tech

- React 19 + React Router 7
- Vite 6 + TypeScript
- Tailwind CSS 4
- Motion (animations)

## Run locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # outputs static site to dist/
npm run preview  # preview the production build
npm run lint     # type-check with tsc
```

## Adding your work (no code changes needed)

- **Cover art / images** → drop files into `src/assets/concept-art/`
- **Motion / videos** → drop files into `src/assets/motion/`

Filenames are not shown on the site. Files are sorted by name, so prefix them
with numbers (`01-…`, `02-…`) to control order.
Keep images at a sensible web size (max ~1600px, WebP) for fast loading.

## Configuration

All site-wide settings (domain, email, social links, form endpoint) live in a
single file: [`src/config/site.ts`](src/config/site.ts). The site currently
uses `https://monti-xi.vercel.app`. When a custom domain is connected, update
`url` there and replace `monti-xi.vercel.app` in `index.html`,
`public/sitemap.xml`, `public/robots.txt` and `public/llms.txt`.

The link preview image is `public/og-cover.jpg` (1200×630).

## Deploy

The site is static. `vercel.json` is included for Vercel (SPA rewrites);
`dist/.htaccess` covers Apache/LiteSpeed hosts (Hostinger, Neoserv).
