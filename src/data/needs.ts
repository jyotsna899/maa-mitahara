import { NeedDefinition } from '@/types';

export const NEEDS: Record<string, NeedDefinition> = {
  iron_haemoglobin: {
    key: 'iron_haemoglobin',
    title: 'Iron & Haemoglobin',
    slug: 'iron-haemoglobin',
    customerSymptom: 'Low iron, fatigue, feeling faint or breathless',
    clinicalRationale: 'Traditional black sesame, garden cress (halim), ragi, and jaggery provide bioavailable dietary iron and folate to support expanding maternal blood volume.',
    relevantStages: ['first_trimester', 'second_trimester', 'third_trimester', 'postpartum', 'trying_to_conceive'],
  },
  energy_protein: {
    key: 'energy_protein',
    title: 'Energy & Sustained Stamina',
    slug: 'energy-protein',
    customerSymptom: 'Exhaustion, low daily energy, midday slumps',
    clinicalRationale: 'Roasted multigrains, whole millets, and slow-burning cold-pressed ghee release sustained carbohydrates without sharp blood sugar spikes.',
    relevantStages: ['trying_to_conceive', 'first_trimester', 'second_trimester', 'third_trimester'],
  },
  digestion: {
    key: 'digestion',
    title: 'Digestion & Gut Comfort',
    slug: 'digestion',
    customerSymptom: 'Constipation, bloating, sluggish metabolism, heartburn',
    clinicalRationale: 'Dietary fiber from whole grains, ajwain, fennel, and ghee-lubricated formulations support natural gastrointestinal motility under progesterone elevation.',
    relevantStages: ['first_trimester', 'second_trimester', 'third_trimester'],
  },
  calcium_bones: {
    key: 'calcium_bones',
    title: 'Calcium & Bone Strength',
    slug: 'calcium-bones',
    customerSymptom: 'Backache, leg cramps, skeletal support for baby',
    clinicalRationale: 'Finger millet (ragi), white sesame, and almond flour offer dense plant-based calcium essential for fetal bone ossification and maternal bone preservation.',
    relevantStages: ['second_trimester', 'third_trimester', 'postpartum'],
  },
  nausea_cravings: {
    key: 'nausea_cravings',
    title: 'Nausea & Palate Cravings',
    slug: 'nausea-cravings',
    customerSymptom: 'Morning sickness, food aversions, bitter taste',
    clinicalRationale: 'Subtle citrus infusions, roasted cacao, and light cardamom gently soothe gastric irritation and satisfy wholesome sweet cravings without synthetic additives.',
    relevantStages: ['first_trimester'],
  },
  lactation: {
    key: 'lactation',
    title: 'Lactation & Milk Flow',
    slug: 'lactation',
    customerSymptom: 'Establishing or maintaining breast milk supply',
    clinicalRationale: 'Time-tested galactagogues including fenugreek (methi), shatavari, dill, and fennel seed stimulate natural prolactin response and enrich breast milk quality.',
    relevantStages: ['postpartum'],
  },
  recovery: {
    key: 'recovery',
    title: 'Postpartum Jaapa Recovery',
    slug: 'recovery',
    customerSymptom: 'Uterine healing, joint aches, pelvic weakness, fatigue after delivery',
    clinicalRationale: 'Traditional restorative Jaapa ingredients such as edible gum (gond), dry ginger (saunth), turmeric, and ajwain promote uterine contraction, pelvic repair, and warmth.',
    relevantStages: ['postpartum'],
  },
};

export const NEED_LIST = Object.values(NEEDS);
