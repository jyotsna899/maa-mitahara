import { ClaimItem } from '@/types';

export const CLAIMS: ClaimItem[] = [
  {
    id: 'claim-01',
    badge: 'Stage-Matched Nutrition',
    exactMeaning: 'Formulations scientifically & traditionally curated for the distinct physiological stages: Trying to Conceive, 1st, 2nd, 3rd Trimester, and Postpartum.',
    proofSource: 'Stage Taxonomy & Medical Review Protocol v2',
    owner: 'Clinical Advisory Panel',
    status: 'active',
  },
  {
    id: 'claim-02',
    badge: 'Reviewed by Obstetricians',
    exactMeaning: 'Each stage-tagged product is evaluated by named doctors for ingredient suitability, serving limits, and allergen contraindications.',
    proofSource: 'Clinical Sign-off Records (Dr. Ritu Dhand, Dr. Neha, Dr. Archana Shukla)',
    owner: 'Medical Panel',
    status: 'active',
  },
  {
    id: 'claim-03',
    badge: 'Clean & Transparent Ingredients',
    exactMeaning: 'Full disclosure of all ingredients with quantities or percentages; no hidden chemical stabilizers, synthetic emulsifiers, or artificial coloring.',
    proofSource: 'Product Master Specification Sheet & Packaging Declarations',
    owner: 'Quality Assurance Head',
    status: 'active',
  },
  {
    id: 'claim-04',
    badge: 'Traditional Jaapa Formulation',
    exactMeaning: 'Authentic Ayurvedic and regional postpartum preparation methods utilizing roasted edible gum (gond), dry ginger (saunth), and bilona cow ghee.',
    proofSource: 'Master Production Standard Operating Procedure',
    owner: 'Production Head',
    status: 'active',
  },
  {
    id: 'claim-05',
    badge: '100% Nutrition (Previous Tagline)',
    exactMeaning: 'Retired per FSSAI regulations. Replaced with substantiated whole-food nutrient density claims.',
    proofSource: 'FSSAI Claims Remediation Directive',
    owner: 'Legal & Regulatory Counsel',
    status: 'retired',
  },
  {
    id: 'claim-06',
    badge: 'Doctor Recommended (Unqualified)',
    exactMeaning: 'Retired per ASCI compliance. Replaced with specific "Reviewed by Dr. [Name]" attribution.',
    proofSource: 'ASCI Advertising Standard Remediation',
    owner: 'Legal & Regulatory Counsel',
    status: 'retired',
  },
];
