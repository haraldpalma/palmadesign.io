// Central access to content + brand constants.
// - brand.config.ts        → identity + technical config (edited in code, per client)
// - src/content/site.json  → editable page copy + per-page SEO meta (Keystatic "Site copy")
import { brand } from '../../brand.config';
import data from '../content/site.json';

export { brand };
export const site = data; // page copy: meta, home, sections, faqs, footer
export const meta = data.meta;

// Identity, assembled from brand.config (used by footer, contact, legal, schema).
export const org = {
  legalName: brand.legalName,
  name: brand.name,
  email: brand.email,
  phone: brand.phone,
  linkedin: brand.linkedin,
  city: brand.city,
  country: brand.country,
  siblingLink: brand.siblingLink,
};

export const SITE_URL = brand.siteUrl.replace(/\/$/, '');
export const SITE_NAME = brand.name;
export const OG_IMAGE = brand.ogImage;
export const NAV = brand.nav;
export const CATEGORIES = brand.categories;

export type Meta = { title: string; description: string };

// Resolve a clean canonical URL for a path.
export function canonical(path: string): string {
  if (path === '/' || path === '') return SITE_URL + '/';
  return SITE_URL + '/' + path.replace(/^\/+|\/+$/g, '');
}
