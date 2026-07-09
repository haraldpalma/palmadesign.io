import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_URL, SITE_NAME } from '../../lib/site';

// Clean markdown twin of every journal post (/journal/x and /journal/x.md).
// Plain markdown for AI assistants — no nav, no chrome, source-of-truth text.
export async function getStaticPaths() {
  const posts = await getCollection('journal', ({ data }) => !data.draft);
  return posts.map((p) => ({ params: { slug: p.id }, props: { p } }));
}

export const GET: APIRoute = ({ props }) => {
  const { p } = props as { p: Awaited<ReturnType<typeof getCollection>>[number] };
  const d = p.data;
  const header =
    `# ${d.title}\n\n` +
    `> Harald Palma · ${d.date} · ${d.category} · ${SITE_NAME}\n` +
    `> Source: ${SITE_URL}/journal/${p.id}\n\n` +
    `---\n\n`;
  return new Response(header + (p.body ?? ''), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
