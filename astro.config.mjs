// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://kakimo.pages.dev',
  base: '/',
  build: {
    assets: 'assets',
  },
});
