import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_URL, SITE_NAME } from '../../lib/site';

// Clean markdown twin of every case study, served at the same slug (/work/x and /work/x.md).
// Plain markdown for AI assistants — no nav, no chrome, source-of-truth text.
export async function getStaticPaths() {
  const items = await getCollection('work', ({ data }) => !data.draft);
  return items.map((cs) => ({ params: { slug: cs.id }, props: { cs } }));
}

export const GET: APIRoute = ({ props }) => {
  const { cs } = props as { cs: Awaited<ReturnType<typeof getCollection>>[number] };
  const d = cs.data;
  const metrics = d.metrics.length
    ? d.metrics.map((m: { value: string; label: string }) => `${m.value} ${m.label}`).join(' · ')
    : '';
  const header =
    `# ${d.title}\n\n` +
    `> ${d.client} · ${d.industry} · ${d.year} · ${SITE_NAME}\n` +
    (d.stack.length ? `> Built with: ${d.stack.join(', ')}\n` : '') +
    (metrics ? `> Results: ${metrics}\n` : '') +
    `> Source: ${SITE_URL}/work/${cs.id}\n\n` +
    `---\n\n`;
  return new Response(header + (cs.body ?? ''), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
