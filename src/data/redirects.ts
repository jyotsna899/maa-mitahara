export interface RedirectRule {
  source: string;
  destination: string;
  permanent: boolean;
  reason: string;
}

export const LEGACY_REDIRECTS: RedirectRule[] = [
  {
    source: '/collections/antenatal',
    destination: '/stage/second-trimester',
    permanent: true,
    reason: 'Retired "Antenatal" catch-all in favor of stage-specific URLs (IA-1, IA-2)',
  },
  {
    source: '/collections/pre-pregnancy',
    destination: '/stage/trying-to-conceive',
    permanent: true,
    reason: 'Standardized terminology: Pre-pregnancy -> Trying to Conceive (IA-1)',
  },
  {
    source: '/collections/mom-to-be',
    destination: '/stage/second-trimester',
    permanent: true,
    reason: 'Retired vague "Mom to Be" collection (IA-1)',
  },
  {
    source: '/collections/second-trimester-energy-boost',
    destination: '/stage/second-trimester',
    permanent: true,
    reason: 'Merged duplicate 2nd trimester collection (IA-2)',
  },
  {
    source: '/collections/postnatal',
    destination: '/stage/postpartum',
    permanent: true,
    reason: 'Standardized terminology: Postnatal -> Postpartum (IA-1)',
  },
  {
    source: '/collections/combo-packages',
    destination: '/kits',
    permanent: true,
    reason: 'Replaced "Combo packages" with dedicated Kits and Programmes (IA-3)',
  },
  {
    source: '/collections/gift-boxes',
    destination: '/kits',
    permanent: true,
    reason: 'Consolidated under Kits and Gifts (IA-3)',
  },
];
