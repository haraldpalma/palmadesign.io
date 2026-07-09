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
      category: z.enum(['Websites', 'Brand & identity']),
      industry: z.string(),
      year: z.string(),
      stack: z.array(z.string()).default([]),
      excerpt: z.string(),
      metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      ogImage: image().optional(),
      draft: z.boolean().default(false),
    }),
});

// Graphics gallery — image-led portfolio pieces (25 years of graphic design).
// JSON entries edited via Keystatic; images live in public/images/graphics/.
const graphics = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/graphics' }),
  schema: z.object({
    title: z.string(),
    category: z.enum([
      'Logos & marks',
      'Brand identity',
      'Print & editorial',
      'Campaign',
      'Illustration',
    ]),
    year: z.string(),
    client: z.string().default(''),
    image: z.string(),
    alt: z.string(),
    note: z.string().default(''),
    draft: z.boolean().default(false),
  }),
});

// Journal — studio writing on design, websites and AI. Markdoc via Keystatic.
const journal = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/journal' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      date: z.string(), // YYYY-MM-DD
      category: z.enum(['Design', 'Websites', 'AI', 'Studio']),
      ogImage: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { work, graphics, journal };
