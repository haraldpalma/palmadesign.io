import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';
import { brand } from './brand.config';

const site = brand.siteUrl.replace(/\/$/, '');

// Static output — content lives in the HTML (never client-rendered) so search +
// LLM crawlers see everything. The Netlify adapter exists ONLY so the /keystatic
// admin + its API run on-demand as functions; every content page is prerendered.
export default defineConfig({
  site,
  output: 'static',
  adapter: netlify(),
  trailingSlash: 'never',
  build: {
    // Clean URLs: /advisory not /advisory/index.html
    format: 'file',
  },
  integrations: [
    markdoc(),
    react(),
    keystatic(),
    sitemap({
      filter: (page) =>
        // Keep admin, endpoints, markdown twins and the feed out of the sitemap
        // (drafts are already excluded at the source).
        !page.includes('/keystatic') &&
        !page.includes('/api/') &&
        !page.endsWith('.md') &&
        !page.endsWith('.txt') &&
        !page.endsWith('/rss.xml') &&
        !page.endsWith('/404'),
      changefreq: 'monthly',
      priority: 0.7,
      serialize(item) {
        // Home is the priority; the journal index changes most often.
        if (item.url === `${site}/`) item.priority = 1.0;
        if (item.url === `${site}/journal`) item.changefreq = 'weekly';
        return item;
      },
    }),
  ],
});
