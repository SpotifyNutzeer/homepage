import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://paul.wtf',
  output: 'static',
  trailingSlash: 'never',
  build: {
    assets: '_astro',
    inlineStylesheets: 'auto'
  },
  compressHTML: true,
  integrations: [sitemap()]
});
