export type StageKey =
  | 'trying_to_conceive'
  | 'first_trimester'
  | 'second_trimester'
  | 'third_trimester'
  | 'postpartum';

export type NeedKey =
  | 'iron_haemoglobin'
  | 'energy_protein'
  | 'digestion'
  | 'calcium_bones'
  | 'nausea_cravings'
  | 'lactation'
  | 'recovery';

export type FormType =
  | 'laddu'
  | 'diy_mix'
  | 'snack_mix'
  | 'programme'
  | 'gift_box'
  | 'sampler';

export type ClinicalReviewStatus = 'approved' | 'pending' | 'not_for_pregnancy';

export type BrandLine = 'standard' | 'healthy_delights';

export interface ProductVariant {
  id: string;
  sizeLabel: string; // e.g. "70g Trial Pack", "200g", "500g"
  weightGrams: number;
  price: number;
  regularPrice?: number;
  isTrialPack: boolean;
  inStock: boolean;
  stockRiskFlag: boolean;
}

export interface ClinicalReviewInfo {
  reviewerName: string;
  qualification: string;
  hospital: string;
  scope: string; // e.g., "Stage Fit, Serving Guidance & Exclusions"
  reviewDate: string; // ISO date or "Pending"
  signedNote?: string;
}

export interface ServingGuidance {
  stage: StageKey;
  quantityPerDay: string;
  timing: string;
  instructions: string;
}

export interface Product {
  id: string;
  canonicalGroupId?: string; // Links duplicates like Mom to Be vs Postnatal
  name: string;
  slug: string;
  brandLine: BrandLine;
  form: FormType;
  stageTags: StageKey[];
  needTags: NeedKey[];
  isHero: boolean;
  
  // Pricing and Variants
  variants: ProductVariant[];
  
  // Marketing & Positioning
  stageBenefitSummary: string; // One-line benefit per stage (MS-4)
  whyInYourPlan: string[]; // 2-3 bullets for why this ingredient at this stage (MS-5)
  
  // Safety & Clinical Governance
  clinicalReviewStatus: ClinicalReviewStatus;
  clinicalReview: ClinicalReviewInfo;
  allergens: string[]; // ['Nuts', 'Dairy / Ghee', 'Gluten', 'Sesame']
  mayContain?: string[];
  contraindications?: string[]; // e.g. "Gestational diabetes check doctor"
  
  // Nutrition & Ingredients (Preserved accurately; "Information pending" if unverified)
  ingredients: { name: string; percentage?: string; sourcingNote?: string }[];
  nutritionPerServing: Record<string, string>;
  nutritionPer100g: Record<string, string>;
  fssaiNumber: string;
  shelfLife: string;
  storage: string;
  servingGuidance: ServingGuidance[];
  
  // Cross-sell & Stage Evolution
  pairsWellWithIds?: string[];
  nextStageProductIds?: string[];
  
  // Media & Rating
  imageUrl?: string;
  rating: number;
  reviewCount: number;
  stageReviewCount?: number;
}

export interface StageDefinition {
  key: StageKey;
  title: string;
  slug: string;
  weekRange: string;
  shortDescription: string;
  bodyNeedsSummary: string; // 3-4 lines written with doctor (DS-3)
  heroProductSlug: string;
  starterKitId: string;
  primaryNeeds: NeedKey[];
  doctorReviewerName: string;
  stageFaqs: { question: string; answer: string }[];
  nextStageKey?: StageKey;
}

export interface NeedDefinition {
  key: NeedKey;
  title: string;
  slug: string;
  customerSymptom: string; // Plain language: e.g. "Tiredness & stamina", "Low iron & weakness"
  clinicalRationale: string;
  relevantStages: StageKey[];
}

export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  hospital: string;
  reviewScope: string;
  bio: string;
  photoUrl: string;
  videoUrl?: string;
}

export interface StageKit {
  id: string;
  name: string;
  slug: string;
  stageKey: StageKey;
  description: string;
  productIds: string[];
  sizes: {
    label: string;
    durationDays: number;
    price: number;
    regularPrice: number;
    rupeeSaving: number;
  }[];
  dailyGuide: string;
}

export interface ClaimItem {
  id: string;
  badge: string;
  exactMeaning: string;
  proofSource: string;
  owner: string;
  status: 'active' | 'rewritten' | 'pending_lab' | 'retired';
}
