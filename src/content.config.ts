import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Case studies ("work"). Markdoc is the source of truth (edited via Keystatic).
// Schema mirrors keystatic.config.ts so the editor and the build agree.
const work = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      category: z.enum(['Client portals', 'Internal tools', 'Websites', 'AI & automation']),
      industry: z.string(),
      year: z.string(),
      stack: z.array(z.string()).default([]),
      excerpt: z.string(),
      metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      ogImage: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { work };
