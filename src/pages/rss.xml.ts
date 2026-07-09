import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_URL, SITE_NAME, brand } from '../lib/site';

// RSS for the journal — full item list, newest first.
export async function GET(context: APIContext) {
  const posts = (await getCollection('journal', ({ data }) => !data.draft)).sort((a, b) =>
    a.data.date < b.data.date ? 1 : -1
  );
  return rss({
    title: `${SITE_NAME} — Journal`,
    description: brand.description,
    site: context.site ?? SITE_URL,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.excerpt,
      pubDate: new Date(p.data.date),
      link: `/journal/${p.id}`,
      categories: [p.data.category],
    })),
  });
}
