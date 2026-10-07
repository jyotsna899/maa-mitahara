'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStage } from '@/context/StageContext';
import { STAGE_LIST, STAGES } from '@/data/stages';
import { NEED_LIST } from '@/data/needs';
import { PRODUCTS } from '@/data/catalog';
import { DOCTORS } from '@/data/doctors';
import { shopifyService } from '@/services/mock/shopifyService';
import { ProductCard } from '@/components/product/ProductCard';
import { MedicalDisclaimer } from '@/components/safety/MedicalDisclaimer';
import { Product, StageKey } from '@/types';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Star,
  ShoppingBag,
  Heart,
  AlertCircle,
  HelpCircle,
  Clock,
  RotateCcw,
} from 'lucide-react';

export default function NutritionFinderPage() {
  const { setStage } = useStage();

  // Multi-step quiz state machine
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4; // Steps 1 to 4 questions, Step 5 is results

  // Answers state
  const [forWhom, setForWhom] = useState<'myself' | 'loved_one'>('myself');
  const [selectedStage, setSelectedStage] = useState<StageKey>('second_trimester');
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(['energy_protein']);
  const [clinicalFlag, setClinicalFlag] = useState<string>('none');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Toggle multiple needs (max 2)
  const toggleNeed = (needKey: string) => {
    if (selectedNeeds.includes(needKey)) {
      if (selectedNeeds.length > 1) {
        setSelectedNeeds(selectedNeeds.filter((n) => n !== needKey));
      }
    } else {
      if (selectedNeeds.length < 2) {
        setSelectedNeeds([...selectedNeeds, needKey]);
      } else {
        setSelectedNeeds([selectedNeeds[1], needKey]);
      }
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finalize plan
      setStage(selectedStage);
      setIsCompleted(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentStep(1);
    setIsCompleted(false);
  };

  // Safe recommendations filtering
  const stageDef = STAGES[selectedStage];
  const recommendedProducts = PRODUCTS.filter((p) => {
    // Stage check
    const matchesStage = p.stageTags.includes(selectedStage);
    if (!matchesStage) return false;

    // Safety gate: never recommend unapproved items
    if (p.clinicalReviewStatus === 'not_for_pregnancy' && selectedStage.includes('trimester')) {
      return false;
    }

    // GDM clinical gate
    if (clinicalFlag === 'gdm' && p.ingredients.some((i) => i.name.toLowerCase().includes('jaggery'))) {
      // If GDM, favor sugar-free recipes
      return p.name.toLowerCase().includes('sugar-free') || p.slug.includes('dana');
    }

    // Need match
    const matchesNeed = p.needTags.some((n) => selectedNeeds.includes(n));
    return matchesNeed || p.isHero;
  }).slice(0, 3);

  const fallbackProducts = recommendedProducts.length > 0
    ? recommendedProducts
    : PRODUCTS.filter((p) => p.stageTags.includes(selectedStage)).slice(0, 3);

  const handleAddPlanToCart = () => {
    fallbackProducts.forEach((p) => {
      shopifyService.addToCart({
        productId: p.id,
        variantId: p.variants[0].id,
        name: `[Personalized Plan] ${p.name}`,
        sizeLabel: p.variants[0].sizeLabel,
        price: p.variants[0].price,
        quantity: 1,
        isSubscription: false,
        stageTag: p.stageTags[0],
      });
    });
    alert(`Success: Added ${fallbackProducts.length} recommended preparations to your Stage Care cart!`);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#211D1A] py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Top Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CDBF] bg-white px-3.5 py-1 text-xs font-semibold text-[#1E3A2F] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#1E3A2F]" />
            <span>Doctor-Reviewed Personal Nutrition Finder</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#211D1A]">
            Find Your Stage-Specific <span className="italic font-normal text-[#1E3A2F]">Plan</span>.
          </h1>

          <p className="text-xs sm:text-sm text-[#66615D] max-w-xl mx-auto leading-relaxed">
            Answer 4 clinical questions to receive an obstetrician-evaluated dietary routine tailored to your gestational week and symptoms.
          </p>
        </div>

        {/* ────────────────────────────────────────────────────────────
            QUESTIONNAIRE FLOW (STEPS 1 TO 4)
        ──────────────────────────────────────────────────────────── */}
        {!isCompleted ? (
          <div className="rounded-[16px] border border-[#E6DFD5] bg-white p-6 sm:p-10 shadow-sm space-y-8">
            {/* Progress Bar & Step Indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#776D66]">
                <span>Question {currentStep} of {totalSteps}</span>
                <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
              </div>
              <div className="w-full h-1.5 bg-[#E6DFD5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1E3A2F] rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Who is this for? */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F]">
                    Step 1 · Shopper Context
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#211D1A]">
                    Who is this nourishing plan being created for?
                  </h2>
                  <p className="text-xs text-[#776D66]">
                    This helps customize the care instructions and gifting options.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setForWhom('myself')}
                    className={`p-5 rounded-card border text-left transition-all ${
                      forWhom === 'myself'
                        ? 'border-[#1E3A2F] bg-[#FAF7F2] ring-2 ring-[#1E3A2F]/20 shadow-sm'
                        : 'border-[#E6DFD5] hover:border-[#D9CDBF]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-white border border-[#E6DFD5] flex items-center justify-center text-[#1E3A2F] mb-3 font-serif font-bold">
                      M
                    </div>
                    <div className="font-serif font-bold text-base text-[#211D1A]">
                      For Myself
                    </div>
                    <p className="text-xs text-[#66615D] mt-1">
                      I am actively planning, pregnant, or recovering postpartum.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForWhom('loved_one')}
                    className={`p-5 rounded-card border text-left transition-all ${
                      forWhom === 'loved_one'
                        ? 'border-[#1E3A2F] bg-[#FAF7F2] ring-2 ring-[#1E3A2F]/20 shadow-sm'
                        : 'border-[#E6DFD5] hover:border-[#D9CDBF]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-white border border-[#E6DFD5] flex items-center justify-center text-[#1E3A2F] mb-3 font-serif font-bold">
                      G
                    </div>
                    <div className="font-serif font-bold text-base text-[#211D1A]">
                      For a Loved One
                    </div>
                    <p className="text-xs text-[#66615D] mt-1">
                      Gifting for my wife, daughter, daughter-in-law, or sister.
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Motherhood Stage */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F]">
                    Step 2 · Gestational Stage
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#211D1A]">
                    Where are you currently in the motherhood journey?
                  </h2>
                  <p className="text-xs text-[#776D66]">
                    Different trimesters require specific thermal bioactives and exclude certain herbs.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {STAGE_LIST.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setSelectedStage(s.key)}
                      className={`p-4 rounded-card border text-left transition-all ${
                        selectedStage === s.key
                          ? 'border-[#1E3A2F] bg-[#FAF7F2] ring-2 ring-[#1E3A2F]/20 shadow-sm'
                          : 'border-[#E6DFD5] hover:border-[#D9CDBF]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-[#211D1A]">
                          {s.title}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-[#1E3A2F] bg-white px-2 py-0.5 rounded-full border border-[#E6DFD5]">
                          {s.weekRange}
                        </span>
                      </div>
                      <p className="text-xs text-[#66615D] mt-1.5 line-clamp-1">
                        {s.shortDescription}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Health Needs / Symptoms */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F]">
                    Step 3 · Symptom Targeting
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#211D1A]">
                    What matters most to your body right now?
                  </h2>
                  <p className="text-xs text-[#776D66]">
                    Select up to 2 primary areas of nutritional focus.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {NEED_LIST.slice(0, 6).map((need) => {
                    const isSelected = selectedNeeds.includes(need.key);
                    return (
                      <button
                        key={need.key}
                        type="button"
                        onClick={() => toggleNeed(need.key)}
                        className={`p-4 rounded-card border text-left transition-all ${
                          isSelected
                            ? 'border-[#1E3A2F] bg-[#FAF7F2] ring-2 ring-[#1E3A2F]/20 shadow-sm'
                            : 'border-[#E6DFD5] hover:border-[#D9CDBF]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-sm text-[#211D1A]">
                            {need.title}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />
                          )}
                        </div>
                        <p className="text-xs text-[#66615D] mt-1">
                          {need.customerSymptom}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Safety & Allergens */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F]">
                    Step 4 · Clinical Safety Gates
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#211D1A]">
                    Any dietary restrictions or clinical flags?
                  </h2>
                  <p className="text-xs text-[#776D66]">
                    Our clinical algorithm will filter out unsuitable ingredients.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'none', label: 'None / Standard Traditional Diet', desc: 'No known allergies or glycemic restrictions' },
                    { id: 'gdm', label: 'Gestational Diabetes (GDM) / Strict Sugar-Free', desc: 'Hold traditional jaggery and prioritize sugar-free dry fruit formulations' },
                    { id: 'nut', label: 'Nut Allergy (Almonds, Cashews, Walnuts)', desc: 'Exclude tree nut flours and substitute whole seed alternatives' },
                    { id: 'dairy', label: 'Lactose or Desi Ghee Sensitivity', desc: 'Assess gentle digestive preparations with minimal fat density' },
                  ].map((flag) => (
                    <button
                      key={flag.id}
                      type="button"
                      onClick={() => setClinicalFlag(flag.id)}
                      className={`w-full p-4 rounded-card border text-left transition-all ${
                        clinicalFlag === flag.id
                          ? 'border-[#1E3A2F] bg-[#FAF7F2] ring-2 ring-[#1E3A2F]/20 shadow-sm'
                          : 'border-[#E6DFD5] hover:border-[#D9CDBF]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs font-bold text-[#211D1A]">{flag.label}</strong>
                        {clinicalFlag === flag.id && <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />}
                      </div>
                      <p className="text-xs text-[#66615D] mt-0.5">{flag.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-[#E6DFD5]">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#D9CDBF] text-xs font-bold text-[#776D66] hover:text-[#211D1A] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
              >
                <span>{currentStep === totalSteps ? 'Generate Doctor Plan' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4 text-[#9DBDA6]" />
              </button>
            </div>
          </div>
        ) : (
          /* ────────────────────────────────────────────────────────────
              STEP 5: PERSONALISED PLAN RESULTS
          ──────────────────────────────────────────────────────────── */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Plan Header Card */}
            <div className="rounded-[16px] border border-[#1E3A2F] bg-white p-6 sm:p-10 shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DFD5] pb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F]">
                    Obstetrician-Evaluated Protocol
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1A] mt-1">
                    Your Personalized {stageDef.title} Care Plan
                  </h2>
                  <p className="text-xs text-[#776D66] mt-0.5">
                    Stage Window: {stageDef.weekRange} · Reviewer: {stageDef.doctorReviewerName}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#776D66] hover:text-[#211D1A] shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>

              {/* Rationale & Advice */}
              <div className="p-4 rounded-card bg-[#FAF7F2] border border-[#E6DFD5] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A2F] block">
                  Clinical Protocol Overview
                </span>
                <p className="text-xs sm:text-sm text-[#211D1A] leading-relaxed">
                  {stageDef.bodyNeedsSummary}
                </p>
                {clinicalFlag === 'gdm' && (
                  <div className="mt-2 p-2.5 rounded bg-[#FDF6F3] border border-[#F2D7CB] text-xs text-[#8A3B26]">
                    <strong>GDM Filter Active: </strong>
                    <span>High-glycemic jaggery sweets held. Sugar-free dry fruit formulations prioritized.</span>
                  </div>
                )}
              </div>

              {/* Recommended Formulations Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#211D1A]">
                    Recommended Formulations for Your Plan
                  </h3>
                  <span className="text-xs text-[#1E3A2F] font-bold">
                    {fallbackProducts.length} Items Selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {fallbackProducts.map((p) => (
                    <div key={p.id} className="rounded-card border border-[#E6DFD5] p-3.5 bg-[#FAF7F2]">
                      <div className="aspect-portrait w-full rounded overflow-hidden bg-white mb-2 flex flex-col items-center justify-center p-3 text-center border border-[#E6DFD5]">
                        <span className="font-serif text-lg font-bold text-[#1E3A2F]">
                          {p.name.charAt(0)}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-[#776D66] mt-0.5 font-bold">
                          {p.form}
                        </span>
                      </div>
                      <h4 className="font-serif text-xs font-bold text-[#211D1A] line-clamp-1">
                        {p.name}
                      </h4>
                      <div className="text-[11px] text-[#776D66] mt-0.5">
                        ₹{p.variants[0]?.price} · {p.variants[0]?.sizeLabel.split(' ')[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Plan Action */}
              <div className="pt-4 border-t border-[#E6DFD5] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="font-serif text-xl font-bold text-[#211D1A]">
                    Combined Plan: ₹{fallbackProducts.reduce((sum, p) => sum + p.variants[0].price, 0)}
                  </span>
                  <span className="text-[11px] text-[#1E3A2F] block">
                    Free Pan-India Express Delivery & Stage Guide Included
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddPlanToCart}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Recommended Plan to Cart</span>
                </button>
              </div>
            </div>

            {/* Stage FAQs & Clinical Details */}
            {stageDef.stageFaqs && (
              <div className="rounded-card border border-[#E6DFD5] bg-white p-6 sm:p-8 space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#211D1A]">
                  Frequently Asked Questions for {stageDef.title}
                </h3>
                <div className="space-y-3">
                  {stageDef.stageFaqs.map((faq, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] space-y-1">
                      <strong className="text-xs font-bold text-[#211D1A] block">{faq.question}</strong>
                      <p className="text-xs text-[#66615D]">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-12">
          <MedicalDisclaimer />
        </div>
      </div>
    </div>
  );
}
