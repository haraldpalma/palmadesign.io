import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/site';

// robots.txt — welcomes classic + AI crawlers; disallows the CMS admin/endpoints.
// Generated so the Sitemap line always points at the right origin.
const AI_BOTS = ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Google-Extended'];

export const GET: APIRoute = () => {
  const body = [
    '# Classic crawlers + explicitly welcomed AI crawlers. Admin/endpoints disallowed.',
    'User-agent: *',
    'Allow: /',
    'Disallow: /keystatic',
    'Disallow: /api/',
    '',
    ...AI_BOTS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
    `Sitemap: ${SITE_URL}/sitemap-index.xml`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
