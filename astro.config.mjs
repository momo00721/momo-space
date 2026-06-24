// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  site: 'https://momo00721.github.io',
  base: '/momo-space/',

  build: {
    assets: 'assets',
  },

  adapter: cloudflare(),
});