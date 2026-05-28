// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://momo00721.github.io',
  base: '/momo-space/',
  build: {
    assets: 'assets',
  },
});
