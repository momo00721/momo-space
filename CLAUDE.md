# Kakimo Portfolio Site

Astro v6 static site for Kakimo design studio portfolio. Deployed to GitHub Pages.

## Quick Start
```bash
cd /Users/maomao/workbyworks-replica
npm run dev        # dev server, auto-finds available port
npm run build      # production build
```

## Key Configuration
- **Tech**: Astro v6.3, static output (`output: 'static'`)
- **Base path**: `/momo-space/` (configured in `astro.config.mjs`)
- **Dev URL**: `http://localhost:4321/momo-space/` (port may shift if occupied)
- **Production**: `https://momo00721.github.io/momo-space/`
- **Repo**: `https://github.com/momo00721/momo-space` (branch: `main`)

## Project Structure
```
src/
├── content/projects/   # 31 project markdown files (Zod schema in content.config.ts)
├── pages/
│   ├── index.astro     # Homepage: Banner carousel + project grid + marquee
│   ├── works/
│   │   └── [slug].astro # Project detail: image stack + description
│   └── info.astro      # Info/contact page
├── components/
│   ├── Header.astro    # Fixed header with logo.png (adaptive invert on banner)
│   ├── Footer.astro    # Phone/WeChat contact
│   ├── Banner.astro    # Swiper carousel (homepage hero, 7 slides)
│   └── ProjectCard.astro
├── utils/projects.ts   # getFeaturedProjects(), getAdjacentProjects(), etc.
├── styles/global.css   # All global styles (24-col grid, typography, responsive)
└── layouts/BaseLayout.astro
public/
├── works/              # All project images (31 projects, 450+ files, ~330MB)
│   ├── banner/         # 7 banner images (2235×1010)
│   └── [slug]/         # cover + 01-XX images per project
└── logo.png            # Site logo (adaptive black/white via CSS filter)
```

## Critical Rules
- **All image paths must use `base` prefix**: `/works/...` won't work; must be `${base}works/...` or use the `asset()` helper pattern
- **Images in `public/` receive zero processing** (no compression, no Vite pipeline)
- **Git push**: If HTTP/2 fails, use `git -c http.version=HTTP/1.1 push`
- **Large repo** (~330MB): `git config http.postBuffer 524288000` needed for push
- Project content schema: `title`, `titleCn`, `category`, `client`, `year`, `featured`, `order`, `cover`, `images[]`
- Categories for filter: `branding`, `packaging`, `digital`, `print`, `advertising`, `environment`
- Banner slides map to `featured: true` projects ordered by `order` field
- Header logo inverts on homepage: `.header-home .header-logo-img { filter: invert(1); }` + `mix-blend-mode: difference`
