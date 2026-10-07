import { StageDefinition } from '@/types';

export const STAGES: Record<string, StageDefinition> = {
  trying_to_conceive: {
    key: 'trying_to_conceive',
    title: 'Trying to Conceive',
    slug: 'trying-to-conceive',
    weekRange: 'Pre-pregnancy & Preparation',
    shortDescription: 'Foundational nourishment and hormonal balance before conception.',
    bodyNeedsSummary: 'Preparing your body requires dense micronutrient support, cellular vitality, and gentle digestive warming to cultivate an optimal reproductive environment.',
    heroProductSlug: 'to-be-confirmed-ttc-hero',
    starterKitId: 'trying-to-conceive-kit',
    primaryNeeds: ['energy_protein', 'iron_haemoglobin', 'digestion'],
    doctorReviewerName: 'Dr. Ritu Dhand',
    stageFaqs: [
      {
        question: 'When should I start preparing with traditional nutrition?',
        answer: 'Clinical guidelines recommend foundational nutritional preparation 3 to 6 months prior to planned conception.'
      },
      {
        question: 'Are pregnancy laddus safe during the pre-conception window?',
        answer: 'Only formulations explicitly approved for Trying to Conceive should be consumed. Pregnancy-specific items with uterine stimulatory properties are strictly held until clinical confirmation.'
      }
    ],
    nextStageKey: 'first_trimester',
  },
  first_trimester: {
    key: 'first_trimester',
    title: '1st Trimester',
    slug: 'first-trimester',
    weekRange: 'Weeks 1 to 13',
    shortDescription: 'Gentle, light formulations crafted for early nausea, palate changes, and cellular formation.',
    bodyNeedsSummary: 'The first 13 weeks demand gentle, easily digestible foods that respect early morning sickness and heightened aroma sensitivity while supporting early embryonic development.',
    heroProductSlug: 'orange-and-cacao-laddu',
    starterKitId: '1st-trimester-gentle-start-kit',
    primaryNeeds: ['nausea_cravings', 'digestion', 'energy_protein'],
    doctorReviewerName: 'Dr. Neha',
    stageFaqs: [
      {
        question: 'Why are there fewer products in the 1st Trimester collection?',
        answer: 'Per clinical safety protocols, heavy traditional heating herbs (gond, methi, ajwain) are restricted during early embryonic attachment. We offer only delicate, approved formulations.'
      },
      {
        question: 'How do I consume laddus when experiencing morning sickness?',
        answer: 'Take small bites at room temperature with lukewarm water or milk. Serving guidance is specified per product.'
      }
    ],
    nextStageKey: 'second_trimester',
  },
  second_trimester: {
    key: 'second_trimester',
    title: '2nd Trimester',
    slug: 'second-trimester',
    weekRange: 'Weeks 14 to 27',
    shortDescription: 'Sustained energy, calcium, and blood-building support during rapid fetal growth.',
    bodyNeedsSummary: 'As morning sickness eases and skeletal growth accelerates, your body requires elevated calcium, protein, and iron along with sustained slow-burning energy to prevent fatigue.',
    heroProductSlug: 'multigrain-laddu',
    starterKitId: '2nd-trimester-energy-kit',
    primaryNeeds: ['energy_protein', 'calcium_bones', 'iron_haemoglobin'],
    doctorReviewerName: 'Dr. Archana Shukla',
    stageFaqs: [
      {
        question: 'Can I consume more than one laddu a day in my 2nd trimester?',
        answer: 'Serving sizes depend on your glycemic status and daily caloric plan. Follow the stage-specific serving guidance on each pack.'
      },
      {
        question: 'Do these laddus replace my prenatal iron and calcium tablets?',
        answer: 'No. Traditional food preparations complement your diet but do not replace prescribed clinical supplements.'
      }
    ],
    nextStageKey: 'third_trimester',
  },
  third_trimester: {
    key: 'third_trimester',
    title: '3rd Trimester',
    slug: 'third-trimester',
    weekRange: 'Weeks 28 to Delivery',
    shortDescription: 'Vitality, healthy fats, and pelvic readiness for the final trimester and labor.',
    bodyNeedsSummary: 'Rapid fetal weight gain, digestive pressure, and maternal stamina require nutrient-dense healthy fats, easily digested fiber, and sustained iron support without heavy refined sugars.',
    heroProductSlug: 'dryfruit-laddu',
    starterKitId: '3rd-trimester-vitality-kit',
    primaryNeeds: ['iron_haemoglobin', 'digestion', 'calcium_bones'],
    doctorReviewerName: 'Dr. Ritu Dhand',
    stageFaqs: [
      {
        question: 'Are dry fruits and seeds safe in the late third trimester?',
        answer: 'Yes, wholesome roasted nuts and seeds provide vital essential fatty acids. Consult your doctor if managing gestational diabetes.'
      },
      {
        question: 'When should I transition to postpartum jaapa preparations?',
        answer: 'Immediate postpartum jaapa preparations (gond, saunth, methi) should begin strictly after delivery, not during pregnancy.'
      }
    ],
    nextStageKey: 'postpartum',
  },
  postpartum: {
    key: 'postpartum',
    title: 'Postpartum & Lactation',
    slug: 'postpartum',
    weekRange: 'Day 1 to 12 Months',
    shortDescription: 'Sacred traditional Jaapa recovery, pelvic restoration, and lactation nourishment.',
    bodyNeedsSummary: 'The postpartum window requires warm, restorative Ayurvedic nutrition to facilitate uterine involution, joint strengthening, tissue repair, and rich breast milk synthesis.',
    heroProductSlug: 'gond-giri-laddu',
    starterKitId: 'postpartum-recovery-kit',
    primaryNeeds: ['recovery', 'lactation', 'calcium_bones'],
    doctorReviewerName: 'Dr. Archana Shukla',
    stageFaqs: [
      {
        question: 'What is the difference between Gond Giri and Dana Methi laddus?',
        answer: 'Gond Giri focuses on maternal joint strength, spinal comfort, and tissue restoration, while Dana Methi primarily supports uterine recovery and prolactin release for milk supply.'
      },
      {
        question: 'When do I start the Jannani 30-Day or Prasavitri 40-Day programmes?',
        answer: 'The programme begins from Day 3 to Day 5 post-delivery (or upon doctor clearance after a caesarean birth).'
      }
    ],
  },
};

export const STAGE_LIST = Object.values(STAGES);
