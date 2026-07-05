import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { brand, SITE_URL, site } from '../lib/site';

// llms.txt — plain-markdown site index for AI assistants. Generated from
// brand.config + site copy + the case-study collection, so it never goes stale.
export const GET: APIRoute = async () => {
  const items = (await getCollection('work', ({ data }) => !data.draft)).sort((a, b) =>
    a.data.year < b.data.year ? 1 : -1
  );
  const m = site.meta as Record<string, { description: string }>;
  const navLines = brand.nav.map(
    (n) => `- [${n.label}](${SITE_URL}${n.href}): ${m[n.href.replace('/', '')]?.description ?? ''}`
  );
  const workLines = items.map(
    (cs) => `- [${cs.data.title}](${SITE_URL}/work/${cs.id}): ${cs.data.client} — ${cs.data.excerpt}`
  );

  const body = [
    `# ${brand.name}`,
    ``,
    `> ${brand.description}`,
    ``,
    `## Core pages`,
    `- [Home](${SITE_URL}/): ${m.home?.description ?? ''}`,
    ...navLines,
    `- [Contact](${SITE_URL}/contact): ${m.contact?.description ?? ''}`,
    ``,
    `## Work (each case study is also served as clean markdown at /work/<slug>.md)`,
    ...workLines,
    ``,
    `## Contact`,
    `- Email: ${brand.email}`,
    `- LinkedIn: ${brand.linkedin}`,
    ``,
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
