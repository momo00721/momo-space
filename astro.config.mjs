// @ts-check
import { defineConfig } from 'astro/config';

// 用平台内置环境变量自动判断部署目标，无需手动注入：
// - Cloudflare Pages: CF_PAGES=1  → base /, site kakimo.pages.dev
// - GitHub Actions:   GITHUB_ACTIONS=true（且非 Cloudflare）→ base /momo-space/, site momo00721.github.io
// - 本地/其他:        base /, site kakimo.pages.dev
const isCloudflare = process.env.CF_PAGES === '1';
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  output: 'static',
  site: isCloudflare
    ? 'https://kakimo.pages.dev'
    : 'https://momo00721.github.io',
  base: isGitHubActions && !isCloudflare ? '/momo-space/' : '/',
  build: {
    assets: 'assets',
  },
});
