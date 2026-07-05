// ═══════════════════════════════════════════════════════════════════════════
//  brand.config.ts — Palma Design (palmadesign.io)
//  Studio site (site 2 of the Palma ecosystem). Built on the Palma Web Kit.
// ═══════════════════════════════════════════════════════════════════════════

export const brand = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: 'Palma Design',
  legalName: 'Harald Walter Palma',
  role: 'Design & no-code studio',
  description:
    'Palma Design is a design and no-code studio in Vienna. We build client portals, internal tools and custom websites on Softr, Airtable and Claude — and keep them running. Premium & Enterprise Softr partner.',

  // ── URLs & contact ────────────────────────────────────────────────────────
  siteUrl: 'https://palmadesign.io',
  email: 'hello@palmadesign.io',
  phone: '',

  // ── Location ────────────────────────────────────────────────────────────────
  city: 'Vienna',
  country: 'AT',

  // ── Legal (Impressum / Privacy / Terms) ────────────────────────────────────
  legalAddress: 'Servitengasse 8/18, 1090 Vienna',
  vatId: 'ATU59861224',
  jurisdiction: 'Vienna',
  supervisoryAuthority: 'the Austrian Data Protection Authority (dsb.gv.at)',

  // ── Social / off-site (Org + Person sameAs) ─────────────────────────────────
  linkedin: 'https://www.linkedin.com/in/harald-palma-03a9a8231/',
  sameAs: ['https://www.softr.io/partners/harald-palma'],

  // ── Referral link — studio does NOT link back up the funnel (ecosystem §1) ──
  siblingLink: null as { label: string; url: string } | null,

  // ── Analytics (null = stubbed) ──────────────────────────────────────────────
  gaId: null as string | null,

  // ── CMS repo (owner/name) ───────────────────────────────────────────────────
  keystaticRepo: 'haraldpalma/palmadesign.io',

  // ── Navigation ──────────────────────────────────────────────────────────────
  nav: [
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'Hosting', href: '/hosting' },
    { label: 'Studio', href: '/studio' },
  ],

  // ── Case-study categories (must match the enum in keystatic.config.ts) ──────
  categories: ['All', 'Client portals', 'Internal tools', 'Websites', 'AI & automation'] as const,

  // ── Person/Org schema: expertise ────────────────────────────────────────────
  knowsAbout: [
    'Softr',
    'Airtable',
    'No-code development',
    'Client portals',
    'Web design',
    'AI automation',
  ],

  // ── Default social share image (1200×630) ──────────────────────────────────
  ogImage: '/og/og-image.jpg',

  // ── Legal template region ────────────────────────────────────────────────────
  legalRegion: 'AT' as 'AT' | 'DE' | 'generic',

  // ── CTA label used across the studio (intake, not "book a call") ────────────
  cta: 'Start a project',
};

export type Brand = typeof brand;
