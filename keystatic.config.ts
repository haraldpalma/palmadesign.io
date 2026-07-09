// keystatic.config.ts — Palma Design CMS (GitHub mode).
// Editing at /keystatic commits to the repo; Netlify auto-builds. Manages the
// case-study collection. (Fixed page copy lives in src/content/site.json and can
// be exposed as a Keystatic singleton later, same as haraldpalma.com did.)
import { config, collection, singleton, fields } from '@keystatic/core';
import { brand } from './brand.config';

const [repoOwner, repoName] = brand.keystaticRepo.split('/');

export default config({
  storage: {
    kind: 'github',
    repo: { owner: repoOwner, name: repoName },
  },
  singletons: {
    servicesShowcase: singleton({
      label: 'Services — showcase images',
      path: 'src/content/settings/services-showcase',
      format: { data: 'json' },
      schema: {
        images: fields.array(
          fields.object({
            src: fields.image({
              label: 'Project screenshot',
              directory: 'public/images/showcase',
              publicPath: '/images/showcase/',
            }),
            alt: fields.text({ label: 'Alt text (describe the screenshot)' }),
          }),
          {
            label: 'Screenshots',
            description:
              'Three project screenshots shown as a fanned deck that stretches into a row on the Services page.',
            itemLabel: (p) => p.fields.alt.value || 'Screenshot',
          }
        ),
      },
    }),
  },
  collections: {
    work: collection({
      label: 'Work (case studies)',
      slugField: 'title',
      path: 'src/content/work/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        client: fields.text({ label: 'Client' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Websites', value: 'Websites' },
            { label: 'Brand & identity', value: 'Brand & identity' },
          ],
          defaultValue: 'Websites',
        }),
        industry: fields.text({ label: 'Industry' }),
        year: fields.text({ label: 'Year' }),
        stack: fields.array(fields.text({ label: 'Tool' }), {
          label: 'Stack',
          itemLabel: (p) => p.value,
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          description: 'Answer-first summary. Used on cards, meta description and llms.txt.',
          multiline: true,
        }),
        metrics: fields.array(
          fields.object({
            value: fields.text({ label: 'Value', description: 'e.g. €600k' }),
            label: fields.text({ label: 'Label', description: 'e.g. merchandise ordered' }),
          }),
          {
            label: 'Headline metrics',
            itemLabel: (p) => `${p.fields.value.value} ${p.fields.label.value}`,
          }
        ),
        ogImage: fields.image({
          label: 'OG / cover image (1200×630)',
          directory: 'public/og',
          publicPath: '/og/',
        }),
        draft: fields.checkbox({
          label: 'Draft (noindex, excluded from sitemap)',
          defaultValue: false,
        }),
        body: fields.markdoc({
          label: 'Case study',
          options: {
            image: { directory: 'src/content/work/_images', publicPath: '/work-images/' },
          },
        }),
      },
    }),
    graphics: collection({
      label: 'Graphics (gallery)',
      slugField: 'title',
      path: 'src/content/graphics/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Logos & marks', value: 'Logos & marks' },
            { label: 'Brand identity', value: 'Brand identity' },
            { label: 'Print & editorial', value: 'Print & editorial' },
            { label: 'Campaign', value: 'Campaign' },
            { label: 'Illustration', value: 'Illustration' },
          ],
          defaultValue: 'Brand identity',
        }),
        year: fields.text({ label: 'Year', description: 'e.g. 2019' }),
        client: fields.text({ label: 'Client (optional)' }),
        image: fields.image({
          label: 'Artwork',
          directory: 'public/images/graphics',
          publicPath: '/images/graphics/',
          validation: { isRequired: true },
        }),
        alt: fields.text({
          label: 'Alt text',
          description: 'Describe the piece for screen readers and search.',
        }),
        note: fields.text({
          label: 'Note (optional)',
          description: 'One short line shown under the piece.',
          multiline: true,
        }),
        draft: fields.checkbox({
          label: 'Draft (hidden from the gallery)',
          defaultValue: false,
        }),
      },
    }),
    journal: collection({
      label: 'Journal (writing)',
      slugField: 'title',
      path: 'src/content/journal/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        excerpt: fields.text({
          label: 'Excerpt',
          description: 'Answer-first summary. Used on cards, meta description and llms.txt.',
          multiline: true,
        }),
        date: fields.text({ label: 'Date', description: 'YYYY-MM-DD' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Design', value: 'Design' },
            { label: 'Websites', value: 'Websites' },
            { label: 'AI', value: 'AI' },
            { label: 'Studio', value: 'Studio' },
          ],
          defaultValue: 'Design',
        }),
        ogImage: fields.image({
          label: 'OG / cover image (1200×630)',
          directory: 'public/og',
          publicPath: '/og/',
        }),
        draft: fields.checkbox({
          label: 'Draft (noindex, excluded from sitemap)',
          defaultValue: false,
        }),
        body: fields.markdoc({
          label: 'Article',
          options: {
            image: { directory: 'src/content/journal/_images', publicPath: '/journal-images/' },
          },
        }),
      },
    }),
  },
});
