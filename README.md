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

The filename becomes the title (`neon-samurai.webp` → "Neon Samurai") and files
are sorted by name — prefix with numbers (`01-…`, `02-…`) to control order.
Keep images at a sensible web size (max ~1600px, WebP) for fast loading.

## Configuration

All site-wide settings (domain, email, social links, form endpoint) live in a
single file: [`src/config/site.ts`](src/config/site.ts). When you buy a domain,
update `url` there and replace `your-domain.com` in `index.html`,
`public/sitemap.xml` and `public/robots.txt`.

## Deploy

The site is static. `vercel.json` is included for Vercel (SPA rewrites + asset
caching); `dist/.htaccess` covers Apache/LiteSpeed hosts (Hostinger, Neoserv).
