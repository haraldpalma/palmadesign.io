// ═══════════════════════════════════════════════════════════════════════════
//  brand.config.ts — Palma Design (palmadesign.io)
//  Studio site (site 2 of the Palma ecosystem). Built on the Palma Web Kit.
// ═══════════════════════════════════════════════════════════════════════════

export const brand = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: 'Palma Design',
  legalName: 'Harald Walter Palma',
  role: 'Design studio',
  description:
    'Palma Design is a European design studio, working everywhere — 25 years of graphic design behind it. We design brands, graphics and hand-coded websites — built with AI, engineered for search, and made to last.',

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
    { label: 'Graphics', href: '/graphics' },
    { label: 'Journal', href: '/journal' },
    { label: 'Services', href: '/services' },
    { label: 'Studio', href: '/studio' },
  ],

  // ── Case-study categories (must match the enum in keystatic.config.ts) ──────
  categories: ['All', 'Websites', 'Brand & identity'] as const,

  // ── Graphics-gallery categories (must match keystatic.config.ts) ────────────
  graphicsCategories: [
    'All',
    'Logos & marks',
    'Brand identity',
    'Print & editorial',
    'Campaign',
    'Illustration',
  ] as const,

  // ── Journal categories (must match keystatic.config.ts) ─────────────────────
  journalCategories: ['Design', 'Websites', 'AI', 'Studio'] as const,

  // ── Person/Org schema: expertise ────────────────────────────────────────────
  knowsAbout: [
    'Graphic design',
    'Brand identity',
    'Typography',
    'Web design',
    'Web development',
    'SEO',
    'AI-assisted design',
  ],

  // ── Default social share image (1200×630) ──────────────────────────────────
  ogImage: '/og/og-image.jpg',

  // ── Legal template region ────────────────────────────────────────────────────
  legalRegion: 'AT' as 'AT' | 'DE' | 'generic',

  // ── CTA label used across the studio (intake, not "book a call") ────────────
  cta: 'Start a project',
};

export type Brand = typeof brand;
