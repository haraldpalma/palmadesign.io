// JSON-LD @graph builders. Emitted static in the raw <head> so non-JS crawlers
// see the entity graph. IDs are stable and cross-referenced (Person <- author, etc.).
// All facts come from brand.config — nothing here is client-specific.
import { SITE_URL, SITE_NAME, brand, org } from './site';

const PERSON_ID = `${SITE_URL}/#person`;
const ORG_ID = `${SITE_URL}/#org`;
const SITE_ID = `${SITE_URL}/#website`;
const sameAs = [brand.linkedin, ...brand.sameAs].filter(Boolean);

export const personNode = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: brand.name,
  jobTitle: brand.role,
  description: brand.description,
  address: { '@type': 'PostalAddress', addressLocality: brand.city, addressCountry: brand.country },
  url: SITE_URL,
  email: org.email,
  sameAs,
  knowsAbout: brand.knowsAbout,
};

export const orgNode = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  email: org.email,
  founder: { '@id': PERSON_ID },
  address: { '@type': 'PostalAddress', addressLocality: brand.city, addressCountry: brand.country },
  sameAs,
};

export const websiteNode = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en',
};

export function webPageNode(opts: {
  url: string;
  name: string;
  description: string;
  about?: boolean;
}) {
  return {
    '@type': 'WebPage',
    '@id': `${opts.url.replace(/\/$/, '')}/#webpage`,
    url: opts.url,
    name: opts.name,
    isPartOf: { '@id': SITE_ID },
    ...(opts.about ? { about: { '@id': PERSON_ID } } : {}),
    description: opts.description,
  };
}

export function breadcrumbNode(trail: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: t.url,
    })),
  };
}

export function faqNode(faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function blogPostingNode(opts: {
  slug: string;
  headline: string;
  datePublished: string;
  section: string;
  description: string;
  image?: string;
}) {
  const url = `${SITE_URL}/writing/${opts.slug}`;
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: opts.headline,
    datePublished: opts.datePublished,
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: url,
    articleSection: opts.section,
    description: opts.description,
    ...(opts.image ? { image: opts.image } : {}),
  };
}

// Wrap a set of nodes into a @graph document. Person/Org/WebSite are always present.
export function graph(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [personNode, orgNode, websiteNode, ...nodes],
  };
}
