'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStage } from '@/context/StageContext';
import { STAGE_LIST, STAGES } from '@/data/stages';
import { NEED_LIST } from '@/data/needs';
import { PRODUCTS } from '@/data/catalog';
import { DOCTORS } from '@/data/doctors';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { Product, StageKey } from '@/types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Truck,
  Award,
  Leaf,
  Heart,
  BookOpen,
  Wheat,
  Activity,
  Check,
  Stethoscope,
  Info,
  Calendar,
  Flame,
} from 'lucide-react';

export default function HomePage() {
  const { stage, setStage, openSelector } = useStage();

  // Active stage display logic
  const activeStageKey: StageKey = stage || 'second_trimester';
  const currentStageDef = STAGES[activeStageKey];

  // Quick View modal state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter products for the tabbed collection ("Start with one. Build from there.")
  const [activeCollectionTab, setActiveCollectionTab] = useState<'stage' | 'bestsellers' | 'jaapa' | 'nausea'>('stage');

  const getTabProducts = () => {
    switch (activeCollectionTab) {
      case 'stage':
        return PRODUCTS.filter((p) => p.stageTags.includes(activeStageKey)).slice(0, 4);
      case 'bestsellers':
        return [
          PRODUCTS.find((p) => p.slug === 'gond-giri-laddu') || PRODUCTS[0],
          PRODUCTS.find((p) => p.slug === 'orange-and-cacao-laddu') || PRODUCTS[1],
          PRODUCTS.find((p) => p.slug === 'multigrain-laddu') || PRODUCTS[2],
          PRODUCTS.find((p) => p.slug === 'dryfruit-laddu') || PRODUCTS[3],
        ];
      case 'jaapa':
        return PRODUCTS.filter((p) => p.stageTags.includes('postpartum')).slice(0, 4);
      case 'nausea':
        return PRODUCTS.filter((p) => p.stageTags.includes('first_trimester')).slice(0, 4);
      default:
        return PRODUCTS.slice(0, 4);
    }
  };

  const tabProducts = getTabProducts();

  // Hero Spotlight Hero Formulation (Peak Style)
  const heroSpotlightProduct =
    PRODUCTS.find((p) => p.slug === 'orange-and-cacao-laddu') ||
    PRODUCTS.find((p) => p.isHero) ||
    PRODUCTS[0];

  // Real Customer Reviews State
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const testimonials = [
    {
      id: 1,
      quote:
        'During my 2nd trimester, I suffered from severe fatigue and leg cramps. The Multigrain Laddu became my mandatory 4 PM ritual. Knowing it is reviewed by obstetricians and made with pure bilona ghee gave me total peace of mind.',
      author: 'Pooja Sharma',
      role: 'Mother of twin boys · 2nd Trimester Care',
      city: 'New Delhi',
      rating: 5,
      productName: 'Multigrain Laddu (Mom-to-Be)',
      productSlug: 'multigrain-laddu',
    },
    {
      id: 2,
      quote:
        'Finding pure, unadulterated Gond Laddus for my Jaapa was impossible until I found Maa Mitahara. The crunch of edible gum, freshness, and absence of white sugar made my 40-day recovery smooth and deeply restorative.',
      author: 'Sneha Reddy',
      role: 'Postpartum Mother · 40-Day Jaapa Journey',
      city: 'Bengaluru',
      rating: 5,
      productName: 'Gond Giri Laddu',
      productSlug: 'gond-giri-laddu',
    },
    {
      id: 3,
      quote:
        'First trimester nausea made almost all prenatal tablets unbearable. The Orange & Cacao Laddu was gentle on my palate, settled my early morning reflex, and provided sustained energy without sudden crashes.',
      author: 'Dr. Ananya Mathur',
      role: 'Expectant Mother & Dental Surgeon · 1st Trimester',
      city: 'Mumbai',
      rating: 5,
      productName: 'Orange & Cacao Laddu',
      productSlug: 'orange-and-cacao-laddu',
    },
  ];

  return (
    <div className="flex flex-col bg-[#FAF6F0] text-[#26211E] overflow-hidden selection:bg-[#244235] selection:text-white">
      {/* ────────────────────────────────────────────────────────────
          1. PEAK FULL-WIDTH EDITORIAL HERO (Wellness Rhythm)
      ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#FAF6F0] py-14 sm:py-20 lg:py-24 border-b border-[#E8DFD3] overflow-hidden">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Active Trimester Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F3D8CD] bg-[#F8EBE6] px-3.5 py-1 text-xs font-semibold text-[#26211E] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#C86D51] animate-pulse" />
                <span>Trimester Guidance</span>
                <span className="text-[#DBCEBF]">·</span>
                <span className="text-[#C86D51] font-bold">
                  {currentStageDef.title} ({currentStageDef.weekRange})
                </span>
              </div>

              {/* Headline with Flux Clean Modern Display Typography */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#26211E] leading-[1.12]">
                Fuel your body. <br />
                Nourish your <span className="underline decoration-[#E89D82] decoration-4 underline-offset-8 font-normal text-[#C86D51]">journey</span>.
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#574D45] leading-relaxed max-w-2xl font-normal">
                Doctor-reviewed Ayurvedic recipes handcrafted for every gestational trimester and the 40-day postpartum Jaapa recovery. Slow-roasted in certified A2 Bilona cow ghee, whole dry fruits, and zero refined sugar.
              </p>

              {/* Dual CTA Action Row - Motherly 13px radius buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2.5 rounded-[13px] bg-[#244235] hover:bg-[#172B22] text-white px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wide shadow-xs hover:shadow transition-all group"
                >
                  <Sparkles className="w-4 h-4 text-[#A1C3B2] group-hover:rotate-12 transition-transform" />
                  <span>Find My Trimester Plan (2 Mins)</span>
                </Link>

                <button
                  type="button"
                  onClick={openSelector}
                  className="inline-flex items-center justify-center gap-2 rounded-[13px] border border-[#C86D51] bg-[#F8EBE6] hover:bg-[#F3D8CD] text-[#C86D51] px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wide shadow-xs transition-all"
                >
                  <span>Explore 6 Stages</span>
                  <ChevronRight className="w-4 h-4 text-[#C86D51]" />
                </button>
              </div>

              {/* Purity Guarantee Trust Chips */}
              <div className="pt-4 border-t border-[#E8DFD3] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#776B61]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#244235]" />
                  <span>Obstetrician Safety Reviewed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#244235]" />
                  <span>0% White Sugar · Jaggery Sweetened</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#244235]" />
                  <span>Fresh Fortnightly Small Batches</span>
                </div>
              </div>
            </div>

            {/* Right: Motherly Blush Hero Merchandising Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-[20px] border border-[#F3D8CD] bg-gradient-to-b from-[#F8EBE6] to-[#FAF6F0] shadow-sm p-7 sm:p-9 flex flex-col justify-between min-h-[440px]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C86D51] px-3 py-1 rounded-full bg-white border border-[#F3D8CD] inline-block shadow-xs">
                      Spotlight Formulation
                    </span>
                    <span className="text-xs font-semibold text-[#C86D51]">
                      1st Trimester Gentle Start
                    </span>
                  </div>

                  <div className="font-display text-2xl sm:text-3xl font-bold text-[#26211E] leading-snug">
                    Gentle Citrus &amp; Raw Cacao. <br />
                    <span className="underline decoration-[#E89D82] decoration-2 underline-offset-4 font-normal text-[#C86D51]">Morning stomach ease.</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#574D45] leading-relaxed">
                    Formulated specifically for early gestational nausea, sensitive palates, and cellular magnesium support.
                  </p>
                </div>

                {/* Interactive Anchor Card */}
                <div className="p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E8DFD3] shadow-xs flex items-center justify-between mt-6">
                  <div className="min-w-0 pr-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#244235] block">
                      Recommended Formulation
                    </span>
                    <h3 className="font-display text-sm font-bold text-[#26211E] mt-0.5 truncate">
                      Orange &amp; Cacao Laddu
                    </h3>
                    <p className="text-[11px] text-[#776B61]">
                      ₹190 (Trial) · 0% Preservatives
                    </p>
                  </div>
                  <Link
                    href="/product/orange-and-cacao-laddu"
                    className="p-2.5 rounded-full bg-[#244235] text-white hover:bg-[#172B22] transition-colors shrink-0 shadow-xs"
                    aria-label="View product details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          2. PEAK DIETARY & BOTANICAL ICONS STRIP (Peak Visual Reference)
      ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-6 border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            <div className="p-3 rounded-card bg-[#FAF7F2] border border-[#E6DFD5] flex flex-col items-center justify-center">
              <Leaf className="w-5 h-5 text-[#1E3A2F] mb-1.5" />
              <span className="text-xs font-bold text-[#211D1A]">A2 Cow Ghee</span>
              <span className="text-[10px] text-[#776D66]">Bilona Churned</span>
            </div>
            <div className="p-3 rounded-card bg-[#FAF7F2] border border-[#E6DFD5] flex flex-col items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#1E3A2F] mb-1.5" />
              <span className="text-xs font-bold text-[#211D1A]">0% White Sugar</span>
              <span className="text-[10px] text-[#776D66]">Jaggery &amp; Dates</span>
            </div>
            <div className="p-3 rounded-card bg-[#FAF7F2] border border-[#E6DFD5] flex flex-col items-center justify-center">
              <Stethoscope className="w-5 h-5 text-[#1E3A2F] mb-1.5" />
              <span className="text-xs font-bold text-[#211D1A]">Doctor Reviewed</span>
              <span className="text-[10px] text-[#776D66]">Certified Obstetricians</span>
            </div>
            <div className="p-3 rounded-card bg-[#FAF7F2] border border-[#E6DFD5] flex flex-col items-center justify-center">
              <Truck className="w-5 h-5 text-[#1E3A2F] mb-1.5" />
              <span className="text-xs font-bold text-[#211D1A]">Fresh Batches</span>
              <span className="text-[10px] text-[#776D66]">Fortnightly Small Batches</span>
            </div>
            <div className="p-3 rounded-card bg-[#FAF7F2] border border-[#E6DFD5] flex flex-col items-center justify-center">
              <Wheat className="w-5 h-5 text-[#1E3A2F] mb-1.5" />
              <span className="text-xs font-bold text-[#211D1A]">Whole Millets</span>
              <span className="text-[10px] text-[#776D66]">Ragi, Jowar, Wheat</span>
            </div>
            <div className="p-3 rounded-card bg-[#FAF7F2] border border-[#E6DFD5] flex flex-col items-center justify-center">
              <Award className="w-5 h-5 text-[#1E3A2F] mb-1.5" />
              <span className="text-xs font-bold text-[#211D1A]">Central FSSAI</span>
              <span className="text-[10px] text-[#776D66]">Strict Food Safety</span>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          3. STAGE CARDS (PRD Stage-First Hierarchy: STAGE -> NEED -> PRODUCT)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                Stage-First Discovery
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1D] tracking-tight">
                Where are you in your <span className="underline decoration-[#9DBDA6] decoration-4 underline-offset-8 font-normal text-[#1E3A2F]">journey</span>?
              </h2>
            </div>
            <button
              onClick={openSelector}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F] hover:underline"
            >
              <span>Switch Active Stage Window</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STAGE_LIST.map((s) => (
              <Link
                key={s.key}
                href={`/stage/${s.slug}`}
                onClick={() => setStage(s.key)}
                className={`group rounded-[14px] border bg-white p-6 transition-all duration-300 hover:shadow-md hover:border-[#1E3A2F] flex flex-col justify-between ${
                  s.key === activeStageKey
                    ? 'ring-2 ring-[#1E3A2F] border-[#1E3A2F]'
                    : 'border-[#E6DFD5]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#776D66] border border-[#E6DFD5]">
                      {s.weekRange}
                    </span>
                    {s.key === activeStageKey && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F] bg-[#EEF3EF] px-2 py-0.5 rounded-full">
                        Active Stage
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#1D1D1D] group-hover:text-[#1E3A2F] transition-colors">
                    {s.title}
                  </h3>

                  <p className="text-xs text-[#66615D] mt-2 leading-relaxed line-clamp-2">
                    {s.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E6DFD5] flex items-center justify-between text-xs font-semibold text-[#1E3A2F]">
                  <span>Explore Stage Formulations</span>
                  <ChevronRight className="w-4 h-4 text-[#D9CDBF] group-hover:text-[#1E3A2F] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          4. SPLIT EDITORIAL INGREDIENT & NUTRITION STORY (Peak Style)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Craft Card */}
            <div className="lg:col-span-5">
              <div className="rounded-[16px] border border-[#D9CDBF] bg-[#FAF7F2] p-8 sm:p-10 space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3A2F] px-3 py-1 rounded-full bg-white border border-[#D9CDBF] inline-block">
                  Sacred Sourcing
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1D1D1D] leading-snug">
                  Pure Bilona Cow Ghee. <br />
                  <span className="underline decoration-[#9DBDA6] decoration-4 underline-offset-8 font-normal text-[#1E3A2F]">Slow-roasted whole seeds.</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#574F49] leading-relaxed">
                  We reject chemical preservatives and hydrogenated fats. Each formulation is slow-roasted in curd-churned A2 desi cow ghee to ensure optimal bioavailability of fat-soluble vitamins for mother and baby.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs text-[#1D1D1D] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#1E3A2F] shrink-0" />
                    <span>Traditional Brass &amp; Iron Vessel Roasting</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#1D1D1D] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#1E3A2F] shrink-0" />
                    <span>0% Refined Sugar, Boora or High-Fructose Syrup</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#1D1D1D] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#1E3A2F] shrink-0" />
                    <span>NABL Lab Re-Validation on Raw Sourcing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Story & Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block">
                Ayurvedic Maternal Science
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1D] tracking-tight leading-tight">
                Pure ingredients. <br />
                <span className="underline decoration-[#9DBDA6] decoration-4 underline-offset-8 font-normal text-[#1E3A2F]">Simple rituals.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#574F49] leading-relaxed">
                Traditional Indian postpartum and prenatal wisdom understood maternal recovery long before modern packaged snacks existed. We restore that sacred knowledge with clinical obstetrician governance.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-[12px] border border-[#E6DFD5] bg-[#FAF7F2]">
                  <h4 className="font-display font-bold text-sm text-[#1D1D1D]">Steady Energy</h4>
                  <p className="text-xs text-[#776D66] mt-1">
                    Complex whole millets prevent sugar spikes and afternoon fatigue.
                  </p>
                </div>
                <div className="p-4 rounded-[12px] border border-[#E6DFD5] bg-[#FAF7F2]">
                  <h4 className="font-display font-bold text-sm text-[#1D1D1D]">Pelvic Strength</h4>
                  <p className="text-xs text-[#776D66] mt-1">
                    Pure Acacia Gond (edible gum) lubricates joints and lower back recovery.
                  </p>
                </div>
                <div className="p-4 rounded-[12px] border border-[#E6DFD5] bg-[#FAF7F2]">
                  <h4 className="font-display font-bold text-sm text-[#1D1D1D]">Gentle Digestion</h4>
                  <p className="text-xs text-[#776D66] mt-1">
                    Cardamom and light dry fruits respect sensitive gastric balance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          5. NUTRITION FINDER HERO MODULE (Peak Guided Interactive Experience)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="rounded-[16px] border border-[#D9CDBF] bg-white p-8 sm:p-12 shadow-xs relative overflow-hidden">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF3EF] px-3.5 py-1 text-xs font-bold text-[#1E3A2F]">
                <Sparkles className="w-3.5 h-3.5 text-[#1E3A2F]" />
                <span>Personal Nutrition Finder · PRD Clinical Engine</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1D] tracking-tight leading-tight">
                2 Minutes. 5 Questions. <span className="underline decoration-[#9DBDA6] decoration-4 underline-offset-8 font-normal text-[#1E3A2F]">Zero guesswork.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#574F49] leading-relaxed">
                Every pregnancy is biologically unique. Rather than generic multivitamins, our algorithm assesses your gestational week, nausea tolerance, iron levels, and dietary flags to generate a doctor-reviewed nutritional protocol.
              </p>

              {/* 4-Step Process Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-3.5 rounded-[10px] bg-[#FAF7F2] border border-[#E6DFD5]">
                  <span className="text-[10px] font-bold text-[#1E3A2F] block">STEP 1</span>
                  <div className="font-bold text-xs text-[#1D1D1D] mt-0.5">Motherhood Stage</div>
                  <p className="text-[10px] text-[#776D66] mt-0.5">Weeks 1 to 40+ or Jaapa</p>
                </div>

                <div className="p-3.5 rounded-[10px] bg-[#FAF7F2] border border-[#E6DFD5]">
                  <span className="text-[10px] font-bold text-[#1E3A2F] block">STEP 2</span>
                  <div className="font-bold text-xs text-[#1D1D1D] mt-0.5">Primary Symptoms</div>
                  <p className="text-[10px] text-[#776D66] mt-0.5">Nausea, fatigue, cramps</p>
                </div>

                <div className="p-3.5 rounded-[10px] bg-[#FAF7F2] border border-[#E6DFD5]">
                  <span className="text-[10px] font-bold text-[#1E3A2F] block">STEP 3</span>
                  <div className="font-bold text-xs text-[#1D1D1D] mt-0.5">Clinical Safety</div>
                  <p className="text-[10px] text-[#776D66] mt-0.5">Gestational diabetes &amp; allergens</p>
                </div>

                <div className="p-3.5 rounded-[10px] bg-[#FAF7F2] border border-[#E6DFD5]">
                  <span className="text-[10px] font-bold text-[#1E3A2F] block">STEP 4</span>
                  <div className="font-bold text-xs text-[#1D1D1D] mt-0.5">Doctor Plan</div>
                  <p className="text-[10px] text-[#776D66] mt-0.5">Daily routine &amp; serving advice</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 rounded-[13px] bg-[#1E3A2F] hover:bg-[#152820] text-white px-8 py-3.5 text-xs sm:text-sm font-bold tracking-wide shadow-sm hover:shadow transition-all"
                >
                  <span>Start Nutrition Finder (Free)</span>
                  <ArrowRight className="w-4 h-4 text-[#9DBDA6]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          6. RECOMMENDED PRODUCTS (Peak Merchandising Grid)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                Trimester-Matched Formulations
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1D] tracking-tight">
                Start with <span className="underline decoration-[#9DBDA6] decoration-4 underline-offset-8 font-normal text-[#1E3A2F]">one</span>. Build from <span className="underline decoration-[#9DBDA6] decoration-4 underline-offset-8 font-normal text-[#1E3A2F]">there</span>.
              </h2>
            </div>

            {/* Collection Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[#E6DFD5] pb-2 md:pb-0">
              <button
                onClick={() => setActiveCollectionTab('stage')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCollectionTab === 'stage'
                    ? 'bg-[#1E3A2F] text-white shadow-sm'
                    : 'bg-[#FAF7F2] text-[#66615D] hover:text-[#211D1A]'
                }`}
              >
                {currentStageDef.title} Fits
              </button>
              <button
                onClick={() => setActiveCollectionTab('bestsellers')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCollectionTab === 'bestsellers'
                    ? 'bg-[#1E3A2F] text-white shadow-sm'
                    : 'bg-[#FAF7F2] text-[#66615D] hover:text-[#211D1A]'
                }`}
              >
                Bestsellers
              </button>
              <button
                onClick={() => setActiveCollectionTab('jaapa')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCollectionTab === 'jaapa'
                    ? 'bg-[#1E3A2F] text-white shadow-sm'
                    : 'bg-[#FAF7F2] text-[#66615D] hover:text-[#211D1A]'
                }`}
              >
                Postpartum Jaapa
              </button>
              <button
                onClick={() => setActiveCollectionTab('nausea')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCollectionTab === 'nausea'
                    ? 'bg-[#1E3A2F] text-white shadow-sm'
                    : 'bg-[#FAF7F2] text-[#66615D] hover:text-[#211D1A]'
                }`}
              >
                1st Tri Nausea
              </button>
            </div>
          </div>

          {/* 4-Column Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tabProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                userStageKey={activeStageKey}
              />
            ))}
          </div>

          {/* Bottom Discovery Link */}
          <div className="mt-12 text-center">
            <Link
              href={`/stage/${currentStageDef.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#211D1A] bg-white hover:bg-[#FAF7F2] text-[#211D1A] px-8 py-3 text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <span>View All {currentStageDef.title} Formulations</span>
              <ArrowRight className="w-4 h-4 text-[#776D66]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          7. CLINICAL SAFETY MATRIX (Peak Comparison Table Style)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
              Foundational Standards
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1D] tracking-tight">
              Why <span className="underline decoration-[#9DBDA6] decoration-4 underline-offset-8 font-normal text-[#1E3A2F]">Maa Mitahara</span> is different.
            </h2>
            <p className="text-xs sm:text-sm text-[#574F49] mt-2">
              Comparing authentic clinical maternal nutrition against commercial synthetics and unstandardized preparations.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="rounded-[14px] border border-[#E6DFD5] bg-white overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E6DFD5] bg-[#FAF7F2]">
                    <th className="py-4 px-5 font-bold text-[#1D1D1D] w-2/5 font-display">
                      Clinical Standard &amp; Formulation Metric
                    </th>
                    <th className="py-4 px-5 font-bold text-[#1E3A2F] bg-[#EEF3EF] w-1/5 text-center font-display">
                      Maa Mitahara
                    </th>
                    <th className="py-4 px-5 font-semibold text-[#66615D] w-1/5 text-center font-display">
                      Commercial Brands
                    </th>
                    <th className="py-4 px-5 font-semibold text-[#66615D] w-1/5 text-center font-display">
                      Market Laddus
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6DFD5]">
                  <tr>
                    <td className="py-3.5 px-5 font-medium text-[#1D1D1D]">
                      1. Trimester-Specific Stage Differentiation
                    </td>
                    <td className="py-3.5 px-5 text-center bg-[#EEF3EF]/50 font-bold text-[#1E3A2F]">
                      ✓ Exact 6 Gestational Stages
                    </td>
                    <td className="py-3.5 px-5 text-center text-[#776D66]">
                      ✗ Generic All-Trimester
                    </td>
                    <td className="py-3.5 px-5 text-center text-[#776D66]">
                      ~ Postpartum Only
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3.5 px-5 font-medium text-[#1D1D1D]">
                      2. Refined Sugar &amp; Artificial Sweeteners
                    </td>
                    <td className="py-3.5 px-5 text-center bg-[#EEF3EF]/50 font-bold text-[#1E3A2F]">
                      ✓ 0% Refined Sugar
                    </td>
                    <td className="py-3.5 px-5 text-center text-[#776D66]">
                      ✗ High White Sugar / Maltodextrin
                    </td>
                    <td className="py-3.5 px-5 text-center text-[#776D66]">
                      ✗ High Boora / Sugar
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3.5 px-5 font-medium text-[#1D1D1D]">
                      3. Cow Ghee Grade &amp; Purity Base
                    </td>
                    <td className="py-3.5 px-5 text-center bg-[#EEF3EF]/50 font-bold text-[#1E3A2F]">
                      ✓ 100% A2 Desi Cow Bilona Ghee
                    </td>
                    <td className="py-3.5 px-5 text-center text-[#776D66]">
                      ✗ Palm Oil / Hydrogenated Fats
                    </td>
                    <td className="py-3.5 px-5 text-center text-[#776D66]">
                      ~ Variable Market Ghee
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3.5 px-5 font-medium text-[#1D1D1D]">
                      4. Obstetrician Safety &amp; Dosage Verification
                    </td>
                    <td className="py-3.5 px-5 text-center bg-[#EEF3EF]/50 font-bold text-[#1E3A2F]">
                      ✓ Evaluated by Named Doctors
                    </td>
                    <td className="py-3.5 px-5 text-center text-[#776D66]">
                      ✗ Marketing Claims Only
                    </td>
                    <td className="py-3.5 px-5 text-center text-[#776D66]">
                      ✗ Unmeasured Dosages
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          8. TRUST & MEDICAL ADVISORY (Doctor Sign-Offs)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                Clinical Safety Governance
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1D1D1D] tracking-tight">
                Our Medical <span className="underline decoration-[#9DBDA6] decoration-4 underline-offset-8 font-normal text-[#1E3A2F]">Advisory</span> Panel.
              </h2>
            </div>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F] hover:underline"
            >
              <span>View Full Clinical Protocol &amp; Sign-Offs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DOCTORS.map((doc) => (
              <div
                key={doc.id}
                className="rounded-[14px] border border-[#E6DFD5] bg-[#FAF7F2] p-6 space-y-4 hover:border-[#1E3A2F] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#1E3A2F] text-white font-display font-bold text-base flex items-center justify-center shrink-0">
                    {doc.name.split(' ')[1]?.charAt(0) || 'D'}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-[#1D1D1D]">
                      {doc.name}
                    </h3>
                    <div className="text-[11px] font-semibold text-[#1E3A2F]">
                      {doc.qualification}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#574F49] leading-relaxed">
                  {doc.bio}
                </div>

                <div className="pt-3 border-t border-[#E6DFD5] text-[11px] text-[#776D66]">
                  <span className="font-bold text-[#1D1D1D] block font-display">Clinical Review Scope:</span>
                  <span>{doc.reviewScope}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          9. REAL CUSTOMER STORIES ("In Their Own Words")
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                Real Mother Experiences
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1D] tracking-tight">
                In their <span className="underline decoration-[#9DBDA6] decoration-4 underline-offset-8 font-normal text-[#1E3A2F]">own</span> words.
              </h2>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveTestimonialIdx((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))
                }
                className="w-9 h-9 rounded-full border border-[#D9CDBF] bg-white hover:bg-[#FAF7F2] flex items-center justify-center text-[#211D1A] transition-colors shadow-xs"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveTestimonialIdx((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))
                }
                className="w-9 h-9 rounded-full border border-[#D9CDBF] bg-white hover:bg-[#FAF7F2] flex items-center justify-center text-[#211D1A] transition-colors shadow-xs"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={t.id}
                className={`rounded-[14px] border bg-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  activeTestimonialIdx === idx
                    ? 'border-[#1E3A2F] shadow-sm ring-1 ring-[#1E3A2F]/20'
                    : 'border-[#E6DFD5]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1 text-[#D9943B] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current text-[#D9943B]" />
                    ))}
                    <span className="text-[11px] font-bold text-[#211D1A] ml-1">5.0</span>
                    <span className="text-[10px] text-[#776D66] ml-auto bg-[#EEF3EF] text-[#1E3A2F] px-2 py-0.5 rounded-full font-bold">
                      Verified Purchase
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[#1D1D1D] leading-relaxed">
                    “{t.quote}”
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E6DFD5] space-y-1">
                  <div className="font-bold text-xs text-[#1D1D1D] font-display">{t.author}</div>
                  <div className="text-[11px] text-[#776D66]">{t.role} · {t.city}</div>
                  <div className="text-[11px] text-[#1E3A2F] font-semibold pt-1">
                    Purchased: {t.productName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          10. FOUNDER STORY (Heritage, Roots & Tradition)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Craft Card */}
            <div className="lg:col-span-5">
              <div className="rounded-[16px] border border-[#D9CDBF] bg-gradient-to-br from-[#FAF7F2] to-[#EAE3D6] shadow-xs p-8 sm:p-10 flex flex-col justify-between min-h-[360px]">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3A2F] px-3 py-1 rounded-full bg-white border border-[#D9CDBF] inline-block">
                    Living Heritage
                  </span>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-[#1D1D1D] leading-snug">
                    “Care that honors traditional recipes and maternal safety.”
                  </div>
                </div>
                <div className="pt-6 border-t border-[#D9CDBF]/60 text-xs text-[#776D66] space-y-1">
                  <div className="font-bold text-[#1D1D1D] font-display">Handcrafted to order</div>
                  <div>Small batches · 100% Traditional Bilona Cow Ghee</div>
                </div>
              </div>
            </div>

            {/* Right Story Copy */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block">
                Founding Journey
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1D] tracking-tight leading-tight">
                “I started Maa Mitahara for the <span className="underline decoration-[#9DBDA6] decoration-4 underline-offset-8 font-normal text-[#1E3A2F]">care</span> I couldn’t find.”
              </h2>
              <p className="text-sm text-[#574F49] leading-relaxed">
                When I became a mother, I discovered a heartbreaking gap: traditional postpartum wisdom was slipping away into fading memory, while modern market shelves were overflowing with synthetic capsules and high-sugar commercial products.
              </p>
              <p className="text-sm text-[#574F49] leading-relaxed">
                Together with certified obstetricians, Ayurvedic physicians, and regional gaushalas, we standardized my grandmother’s handwritten Jaapa recipes. Today, every laddu is handcrafted to order in small batches—preserving traditional sacred nourishment with the clinical rigor every mother deserves.
              </p>
              <div className="pt-2">
                <Link
                  href="/our-story"
                  className="inline-flex items-center gap-2 rounded-[13px] border border-[#1D1D1D] bg-white hover:bg-[#FAF7F2] text-[#1D1D1D] px-7 py-3 text-xs font-bold tracking-wide shadow-xs transition-all"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4 text-[#776D66]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          11. FINAL CTA (Guided Next Step)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#FAF7F2] border-b border-[#E6DFD5] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#1E3A2F]">
            Begin Your Maternal Care Journey
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#1D1D1D] tracking-tight leading-tight">
            Nourish yourself with <span className="underline decoration-[#9DBDA6] decoration-4 underline-offset-8 font-normal text-[#1E3A2F]">reverence</span> and clinical rigour.
          </h2>
          <p className="text-sm sm:text-base text-[#574F49] max-w-xl mx-auto leading-relaxed">
            Take our two-minute Nutrition Finder to receive your personalized trimester protocol, or browse doctor-reviewed formulations matched to your current gestational stage.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 rounded-[13px] bg-[#1E3A2F] hover:bg-[#152820] text-white px-8 py-3.5 text-xs sm:text-sm font-bold tracking-wide shadow-sm hover:shadow transition-all group"
            >
              <Sparkles className="w-4 h-4 text-[#9DBDA6] group-hover:rotate-12 transition-transform" />
              <span>Take Free Nutrition Quiz</span>
            </Link>

            <button
              type="button"
              onClick={openSelector}
              className="inline-flex items-center justify-center gap-2 rounded-[13px] border border-[#1D1D1D] bg-white hover:bg-[#FAF7F2] text-[#1D1D1D] px-8 py-3.5 text-xs sm:text-sm font-bold tracking-wide shadow-xs transition-all"
            >
              <span>Explore By Trimester</span>
              <ChevronRight className="w-4 h-4 text-[#776D66]" />
            </button>
          </div>
        </div>
      </section>

      {/* Render Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
