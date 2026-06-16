// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  site: 'https://kakimo.pages.dev',
  base: '/',

  build: {
    assets: 'assets',
  },

  adapter: cloudflare(),
});