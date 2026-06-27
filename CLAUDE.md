# Kakimo Portfolio Site

Astro v6 static site for Kakimo design studio portfolio.

## Quick Start
```bash
cd /Users/maomao/workbyworks-replica
npm run dev        # dev server at localhost:4321
npm run build      # production build → dist/
```

## Deployment

**Target**: Cloudflare Pages at `https://kakimo.pages.dev`

**Config**:
- Base path: `/`
- Site URL: `https://kakimo.pages.dev`
- Build command: `npm run build`
- Output directory: `dist`

**To deploy**: Push to `main` branch → Cloudflare Pages auto-deploys via Git integration.

Git remote: `https://github.com/momo00721/momo-space.git`

## Project Structure
```
src/
├── content/projects/   # 31 project markdown files
├── pages/
│   ├── index.astro     # Homepage: Banner carousel + project grid + marquee
│   ├── works/
│   │   ├── index.astro # Works listing with category filter
│   │   └── [slug].astro # Project detail
│   ├── info.astro      # Studio info (Chinese)
│   ├── 404.astro       # Custom 404 page
│   └── sitemap.xml.ts  # Auto-generated sitemap
├── components/
│   ├── Header.astro    # Fixed header, mix-blend-mode on homepage
│   ├── Footer.astro
│   ├── Banner.astro    # Swiper carousel (Autoplay+Pagination+Navigation)
│   ├── ProjectCard.astro
│   └── Marquee.astro   # CSS animated scrolling text
├── utils/projects.ts   # getFeaturedProjects(), getAdjacentProjects(), etc.
├── styles/global.css   # All global styles
└── layouts/BaseLayout.astro
public/
├── works/              # All 460 original PNG/JPG images (31 projects, ~372MB)
│   ├── banner/         # 7 banner images (PNG originals)
│   └── [slug]/         # cover + numbered images per project
├── sw.js              # Service Worker for offline caching
├── _headers           # Cloudflare CDN cache rules
├── robots.txt
├── logo.png / logo.webp / logo.svg
└── share.webp / favicon.svg
```

## Key Facts
- **Images**: All 460 images are ORIGINAL PNG/JPG (not WebP). Colors are 100% accurate to source files. DO NOT convert to WebP.
- **Image loading**: Banner preloaded (fetchpriority=high), project cards lazy-loaded, detail pages first 2 eager + rest lazy
- **Service Worker**: sw.js caches all pages/images after first visit. Subsequent visits load instantly from local cache.
- **Swiper**: Banner carousel uses Autoplay, Pagination, Navigation modules (all properly registered)
- **SEO**: JSON-LD structured data (set:html), Open Graph, Twitter cards, sitemap.xml, robots.txt
- **Cache headers**: Cloudflare _headers file sets image cache to 1 year
- **Categories**: branding, packaging, digital, print, environment
- **Featured projects** (banner): order 1-7 → guangzhou-baiyun-logo, duanquan, daijobu, longyun-hotel, zaifeng-sports, progardix, rainlight-tech

## Images — CRITICAL RULES
- **NEVER convert images to WebP or any other format** — this causes color shifts
- **NEVER compress or resize images** — client views this on high-res displays
- **All image references use original extensions** (.png or .jpg, never .webp)
- Cover images are named `封面.png`/`封面.jpg` or `cover.png`/`cover.jpg`
- Banner images are `banner_01.png` through `banner_07.png`

## Deployment History
- Originally deployed to GitHub Pages (`/momo-space/` base)
- Switched to Cloudflare Pages (`/` base) for China accessibility via JD Cloud edge nodes
- Commit `5aba1b5` is the Cloudflare Pages config (may be unpushed)
