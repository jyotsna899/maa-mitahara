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
} from 'lucide-react';

export default function HomePage() {
  const { stage, setStage, openSelector } = useStage();

  // Active stage display logic
  const activeStageKey: StageKey = stage || 'second_trimester';
  const currentStageDef = STAGES[activeStageKey];

  // Quick View modal state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Tabbed Collection State ("Start with one. Build from there.")
  const [activeCollectionTab, setActiveCollectionTab] = useState<'stage' | 'bestsellers' | 'jaapa' | 'nausea'>('stage');

  // Filter products for the tabbed collection
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

  // Real Customer Reviews State
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const testimonials = [
    {
      id: 1,
      quote: "During my 2nd trimester, I suffered from severe fatigue and leg cramps. The Multigrain Laddu became my mandatory 4 PM ritual. Knowing it's reviewed by obstetricians and made with pure bilona ghee gave me total peace of mind.",
      author: "Pooja Sharma",
      role: "Mother of twin boys · 2nd Trimester Care",
      city: "New Delhi",
      rating: 5,
      productName: "Multigrain Laddu (Mom-to-Be)",
      productSlug: "multigrain-laddu",
    },
    {
      id: 2,
      quote: "Finding pure, unadulterated Gond Laddus in Bangalore for my Jaapa was impossible until I found Maa Mitahara. The texture, freshness, and absence of white sugar made my 40-day recovery so smooth.",
      author: "Sneha Reddy",
      role: "Postpartum Mother · 40-Day Jaapa Journey",
      city: "Bengaluru",
      rating: 5,
      productName: "Gond Giri & Meva Laddu",
      productSlug: "gond-giri-laddu",
    },
    {
      id: 3,
      quote: "First trimester nausea made almost all prenatal vitamins and powders unbearable. The Orange & Cacao Laddu was gentle on my palate and settled my morning gastric reflex wonderfully.",
      author: "Dr. Ananya Mathur",
      role: "Expectant Mother & Dental Surgeon · 1st Trimester",
      city: "Mumbai",
      rating: 5,
      productName: "Orange & Cacao Laddu",
      productSlug: "orange-and-cacao-laddu",
    },
  ];

  return (
    <div className="flex flex-col bg-[#FAF7F2] text-[#211D1A] overflow-hidden selection:bg-[#1E3A2F] selection:text-white">
      {/* ────────────────────────────────────────────────────────────
          1. HERO / CORE PROPOSITION
      ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#FAF7F2] py-12 sm:py-20 lg:py-24 border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Micro Stage Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CDBF] bg-white px-3.5 py-1 text-xs font-semibold text-[#211D1A] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#1E3A2F] animate-pulse" />
                <span>Active Trimester Guidance</span>
                <span className="text-[#D9CDBF]">·</span>
                <span className="text-[#1E3A2F] font-bold">
                  {currentStageDef.title} ({currentStageDef.weekRange})
                </span>
              </div>

              {/* Large Headline with Signature Editorial Italic Word */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#211D1A] leading-[1.12]">
                The sacred <span className="italic font-normal text-[#1E3A2F]">ritual</span> your body’s been asking for.
              </h1>

              {/* Body Subtitle */}
              <p className="text-sm sm:text-base text-[#66615D] leading-relaxed max-w-2xl">
                Doctor-reviewed Ayurvedic superfoods formulated for every gestational trimester and the 40-day postpartum Jaapa journey. Handcrafted with A2 Bilona cow ghee, whole dry fruits, and zero refined sugar.
              </p>

              {/* Dual CTA Action Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md transition-all group"
                >
                  <Sparkles className="w-4 h-4 text-[#9DBDA6] group-hover:rotate-12 transition-transform" />
                  <span>Find My Plan (2 Mins)</span>
                </Link>

                <button
                  type="button"
                  onClick={openSelector}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#211D1A] bg-white hover:bg-[#FAF7F2] text-[#211D1A] px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all"
                >
                  <span>Explore 6 Stages</span>
                  <ChevronRight className="w-4 h-4 text-[#776D66]" />
                </button>
              </div>

              {/* Hero Clinical Proof Micro-Points */}
              <div className="pt-4 border-t border-[#E6DFD5] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#776D66]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />
                  <span>Verified by Senior Obstetricians</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />
                  <span>Central FSSAI Registered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />
                  <span>Fresh Fortnightly Small Batches</span>
                </div>
              </div>
            </div>

            {/* Right Craft Presentation Card (Zero Stock Photography) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[16px] overflow-hidden border border-[#D9CDBF] bg-gradient-to-br from-[#FAF7F2] to-[#EFE9DF] shadow-xl p-8 sm:p-10 flex flex-col justify-between min-h-[420px]">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3A2F] px-3 py-1 rounded-full bg-white border border-[#D9CDBF] inline-block shadow-sm">
                    Ayurvedic Maternal Science
                  </span>
                  <div className="font-serif text-2xl sm:text-3xl font-medium text-[#211D1A] leading-snug">
                    Pure nourishment. <br />
                    <span className="italic font-normal text-[#1E3A2F]">Zero shortcuts.</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66615D] leading-relaxed">
                    Prepared in traditional brass and cast-iron vessels with certified A2 Desi cow bilona ghee and nutrient-dense botanicals.
                  </p>
                </div>

                {/* Floating Stage Card Anchor */}
                <div className="p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E6DFD5] shadow-md flex items-center justify-between mt-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F] block">
                      Recommended For {currentStageDef.title}
                    </span>
                    <h3 className="font-serif text-sm font-bold text-[#211D1A] mt-0.5">
                      Gond Giri & Dryfruit Laddu
                    </h3>
                    <p className="text-[11px] text-[#776D66]">
                      For Pelvic Strength & Bone Density · ₹540
                    </p>
                  </div>
                  <Link
                    href="/product/gond-giri-laddu"
                    className="p-2.5 rounded-full bg-[#1E3A2F] text-white hover:bg-[#152820] transition-colors shrink-0 shadow-sm"
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
          2. FIND MY PLAN + SHOP BY STAGE (6 Pillars)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                Stage-First Architecture
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#211D1A] tracking-tight">
                Where are you in your <span className="italic font-normal text-[#1E3A2F]">journey</span>?
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
                className={`group rounded-card border bg-[#FAF7F2] p-6 transition-all duration-300 hover:bg-white hover:shadow-md hover:border-[#1E3A2F] flex flex-col justify-between ${
                  s.key === activeStageKey ? 'ring-2 ring-[#1E3A2F] border-[#1E3A2F] bg-white' : 'border-[#E6DFD5]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-[#776D66] border border-[#E6DFD5]">
                      {s.weekRange}
                    </span>
                    {s.key === activeStageKey && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F] bg-[#EEF3EF] px-2 py-0.5 rounded-full">
                        Active Stage
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#211D1A] group-hover:text-[#1E3A2F] transition-colors">
                    {s.title}
                  </h3>

                  <p className="text-xs text-[#66615D] mt-2 leading-relaxed line-clamp-2">
                    {s.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E6DFD5] flex items-center justify-between text-xs font-semibold text-[#1E3A2F]">
                  <span>Explore Stage Products</span>
                  <ChevronRight className="w-4 h-4 text-[#D9CDBF] group-hover:text-[#1E3A2F] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          3. SHOP BY NEED (5 Targeted Maternal Needs)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
              Symptom-Targeted Nutrition
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#211D1A] tracking-tight">
              What does your body <span className="italic font-normal text-[#1E3A2F]">need</span> today?
            </h2>
            <p className="text-xs sm:text-sm text-[#66615D] mt-2">
              Address specific physiological symptoms with doctor-curated natural food remedies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NEED_LIST.slice(0, 6).map((need) => (
              <Link
                key={need.key}
                href={`/need/${need.slug}`}
                className="group rounded-card border border-[#E6DFD5] bg-white p-5 hover:border-[#1E3A2F] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif text-base font-bold text-[#211D1A] group-hover:text-[#1E3A2F] transition-colors">
                    {need.title}
                  </h3>
                  <div className="mt-1 text-[11px] font-semibold text-[#C85A32]">
                    Addresses: {need.customerSymptom}
                  </div>
                  <p className="mt-2 text-xs text-[#66615D] leading-relaxed line-clamp-2">
                    {need.clinicalRationale}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E6DFD5] flex items-center justify-between text-xs font-semibold text-[#1E3A2F]">
                  <span>View Targeted Formulations</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9CDBF] group-hover:text-[#1E3A2F] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          4. NUTRITION FINDER HERO MODULE (PRD Clinical Engine Anchor)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="rounded-[16px] border border-[#D9CDBF] bg-[#FAF7F2] p-8 sm:p-12 shadow-sm relative overflow-hidden">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF3EF] px-3.5 py-1 text-xs font-bold text-[#1E3A2F]">
                <Sparkles className="w-3.5 h-3.5 text-[#1E3A2F]" />
                <span>Personal Nutrition Finder · PRD Clinical Engine</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211D1A] tracking-tight leading-tight">
                2 Minutes. 5 Questions. <span className="italic font-normal text-[#1E3A2F]">Zero guesswork.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#66615D] leading-relaxed">
                Every pregnancy is biologically distinct. Rather than one-size-fits-all supplements, our algorithm assesses your gestational week, nausea tolerance, iron levels, and dietary flags to generate a doctor-reviewed nutritional protocol.
              </p>

              {/* 4-Step Process Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-3.5 rounded-lg bg-white border border-[#E6DFD5]">
                  <span className="text-[10px] font-bold text-[#1E3A2F] block">STEP 1</span>
                  <div className="font-bold text-xs text-[#211D1A] mt-0.5">Motherhood Stage</div>
                  <p className="text-[10px] text-[#776D66] mt-0.5">Weeks 1 to 40+ or Postpartum</p>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-[#E6DFD5]">
                  <span className="text-[10px] font-bold text-[#1E3A2F] block">STEP 2</span>
                  <div className="font-bold text-xs text-[#211D1A] mt-0.5">Primary Symptoms</div>
                  <p className="text-[10px] text-[#776D66] mt-0.5">Nausea, fatigue, cramps, digestion</p>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-[#E6DFD5]">
                  <span className="text-[10px] font-bold text-[#1E3A2F] block">STEP 3</span>
                  <div className="font-bold text-xs text-[#211D1A] mt-0.5">Clinical Safety</div>
                  <p className="text-[10px] text-[#776D66] mt-0.5">Gestational diabetes & allergens</p>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-[#E6DFD5]">
                  <span className="text-[10px] font-bold text-[#1E3A2F] block">STEP 4</span>
                  <div className="font-bold text-xs text-[#211D1A] mt-0.5">Doctor Plan</div>
                  <p className="text-[10px] text-[#776D66] mt-0.5">Daily routine & serving advice</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md transition-all"
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
          5. RECOMMENDED PRODUCTS (Trimester-Matched Collection)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                Trimester-Matched Formulations
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#211D1A] tracking-tight">
                Start with <span className="italic font-normal text-[#1E3A2F]">one</span>. Build from <span className="italic font-normal text-[#1E3A2F]">there</span>.
              </h2>
            </div>

            {/* Collection Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[#E6DFD5] pb-2 md:pb-0">
              <button
                onClick={() => setActiveCollectionTab('stage')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCollectionTab === 'stage'
                    ? 'bg-[#1E3A2F] text-white shadow-sm'
                    : 'bg-white text-[#66615D] hover:text-[#211D1A]'
                }`}
              >
                {currentStageDef.title} Fits
              </button>
              <button
                onClick={() => setActiveCollectionTab('bestsellers')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCollectionTab === 'bestsellers'
                    ? 'bg-[#1E3A2F] text-white shadow-sm'
                    : 'bg-white text-[#66615D] hover:text-[#211D1A]'
                }`}
              >
                Bestsellers
              </button>
              <button
                onClick={() => setActiveCollectionTab('jaapa')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCollectionTab === 'jaapa'
                    ? 'bg-[#1E3A2F] text-white shadow-sm'
                    : 'bg-white text-[#66615D] hover:text-[#211D1A]'
                }`}
              >
                Postpartum Jaapa
              </button>
              <button
                onClick={() => setActiveCollectionTab('nausea')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCollectionTab === 'nausea'
                    ? 'bg-[#1E3A2F] text-white shadow-sm'
                    : 'bg-white text-[#66615D] hover:text-[#211D1A]'
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
          6. WHY MAA MITAHARA (Clinical Matrix & Pure Food Principles)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
              Foundational Standards
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#211D1A] tracking-tight">
              Why <span className="italic font-normal text-[#1E3A2F]">Maa Mitahara</span> is different.
            </h2>
            <p className="text-xs sm:text-sm text-[#66615D] mt-2">
              Comparing authentic clinical maternal nutrition against commercial synthetics and unstandardized preparations.
            </p>
          </div>

          {/* 4 Pillars Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <div className="p-5 rounded-card border border-[#E6DFD5] bg-[#FAF7F2]">
              <Leaf className="w-5 h-5 text-[#1E3A2F] mb-3" />
              <h4 className="font-serif font-bold text-sm text-[#211D1A]">0% Refined Sugar</h4>
              <p className="text-xs text-[#776D66] mt-1">Sweetened only with organic jaggery, dates, or natural sugar-free recipes.</p>
            </div>
            <div className="p-5 rounded-card border border-[#E6DFD5] bg-[#FAF7F2]">
              <Award className="w-5 h-5 text-[#1E3A2F] mb-3" />
              <h4 className="font-serif font-bold text-sm text-[#211D1A]">Pure A2 Bilona Ghee</h4>
              <p className="text-xs text-[#776D66] mt-1">Grass-fed desi cow ghee slow-churned in traditional clay pots.</p>
            </div>
            <div className="p-5 rounded-card border border-[#E6DFD5] bg-[#FAF7F2]">
              <ShieldCheck className="w-5 h-5 text-[#1E3A2F] mb-3" />
              <h4 className="font-serif font-bold text-sm text-[#211D1A]">Obstetrician Reviewed</h4>
              <p className="text-xs text-[#776D66] mt-1">Every recipe evaluated by certified doctors for stage suitability.</p>
            </div>
            <div className="p-5 rounded-card border border-[#E6DFD5] bg-[#FAF7F2]">
              <Truck className="w-5 h-5 text-[#1E3A2F] mb-3" />
              <h4 className="font-serif font-bold text-sm text-[#211D1A]">Fortnightly Fresh</h4>
              <p className="text-xs text-[#776D66] mt-1">Handcrafted in small batches without artificial chemical shelf-life extenders.</p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="rounded-card border border-[#E6DFD5] bg-[#FAF7F2] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E6DFD5] bg-white">
                    <th className="py-4 px-5 font-bold text-[#211D1A] w-2/5">
                      Clinical Standard & Formulation Metric
                    </th>
                    <th className="py-4 px-5 font-bold text-[#1E3A2F] bg-[#EEF3EF] w-1/5 text-center">
                      Maa Mitahara
                    </th>
                    <th className="py-4 px-5 font-semibold text-[#66615D] w-1/5 text-center">
                      Commercial Brands
                    </th>
                    <th className="py-4 px-5 font-semibold text-[#66615D] w-1/5 text-center">
                      Market Laddus
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6DFD5]">
                  <tr>
                    <td className="py-3.5 px-5 font-medium text-[#211D1A]">
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
                    <td className="py-3.5 px-5 font-medium text-[#211D1A]">
                      2. Refined Sugar & Artificial Sweeteners
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
                    <td className="py-3.5 px-5 font-medium text-[#211D1A]">
                      3. Cow Ghee Grade & Purity Base
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
                    <td className="py-3.5 px-5 font-medium text-[#211D1A]">
                      4. Obstetrician Safety & Dosage Verification
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
          7. TRUST / EXPERT CREDIBILITY (Doctor Advisory Panel)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                Clinical Safety Governance
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#211D1A] tracking-tight">
                Our Medical <span className="italic font-normal text-[#1E3A2F]">Advisory</span> Panel.
              </h2>
            </div>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F] hover:underline"
            >
              <span>View Full Clinical Protocol & Sign-Offs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DOCTORS.map((doc) => (
              <div
                key={doc.id}
                className="rounded-card border border-[#E6DFD5] bg-white p-6 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#1E3A2F] text-white font-serif font-bold text-base flex items-center justify-center shrink-0">
                    {doc.name.split(' ')[1]?.charAt(0) || 'D'}
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#211D1A]">
                      {doc.name}
                    </h3>
                    <div className="text-[11px] font-semibold text-[#1E3A2F]">
                      {doc.qualification}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#66615D] leading-relaxed">
                  {doc.bio}
                </div>

                <div className="pt-3 border-t border-[#E6DFD5] text-[11px] text-[#776D66]">
                  <span className="font-bold text-[#211D1A] block">Clinical Review Scope:</span>
                  <span>{doc.reviewScope}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          8. REAL CUSTOMER FEEDBACK ("In Their Own Words")
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                Real Mother Experiences
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#211D1A] tracking-tight">
                In their <span className="italic font-normal text-[#1E3A2F]">own</span> words.
              </h2>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveTestimonialIdx((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))
                }
                className="w-9 h-9 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] hover:bg-white flex items-center justify-center text-[#211D1A] transition-colors shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveTestimonialIdx((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))
                }
                className="w-9 h-9 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] hover:bg-white flex items-center justify-center text-[#211D1A] transition-colors shadow-sm"
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
                className={`rounded-card border bg-[#FAF7F2] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  activeTestimonialIdx === idx
                    ? 'border-[#1E3A2F] shadow-md ring-1 ring-[#1E3A2F]/20 bg-white'
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

                  <p className="font-serif text-sm sm:text-base text-[#211D1A] leading-relaxed italic">
                    “{t.quote}”
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E6DFD5] space-y-1">
                  <div className="font-bold text-xs text-[#211D1A]">{t.author}</div>
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
          9. FOUNDER STORY (Heritage, Roots & Tradition)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Craft Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[16px] overflow-hidden border border-[#D9CDBF] bg-gradient-to-br from-white to-[#EFE9DF] shadow-md p-8 sm:p-10 flex flex-col justify-between min-h-[360px]">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3A2F] px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#D9CDBF] inline-block">
                    Living Heritage
                  </span>
                  <div className="font-serif text-2xl sm:text-3xl font-medium text-[#211D1A] leading-snug">
                    “Care that honors traditional recipes and maternal safety.”
                  </div>
                </div>
                <div className="pt-6 border-t border-[#D9CDBF]/60 text-xs text-[#776D66] space-y-1">
                  <div className="font-bold text-[#211D1A]">Handcrafted to order</div>
                  <div>Small batches · 100% Traditional Bilona Cow Ghee</div>
                </div>
              </div>
            </div>

            {/* Right Story Copy */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block">
                Founding Journey
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211D1A] tracking-tight leading-tight">
                “I started Maa Mitahara for the <span className="italic font-normal text-[#1E3A2F]">care</span> I couldn’t find.”
              </h2>
              <p className="text-sm text-[#66615D] leading-relaxed">
                When I became a mother, I discovered a heartbreaking gap: traditional postpartum wisdom was slipping away into fading memory, while modern market shelves were overflowing with synthetic capsules and high-sugar commercial products.
              </p>
              <p className="text-sm text-[#66615D] leading-relaxed">
                Together with certified obstetricians, Ayurvedic physicians, and regional gaushalas, we standardized my grandmother’s handwritten Jaapa recipes. Today, every laddu is handcrafted to order in small batches—preserving traditional sacred nourishment with the clinical rigor every mother deserves.
              </p>
              <div className="pt-2">
                <Link
                  href="/our-story"
                  className="inline-flex items-center gap-2 rounded-full border border-[#211D1A] bg-white hover:bg-[#FAF7F2] text-[#211D1A] px-7 py-3 text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
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
          10. EDUCATIONAL CONTENT ("Slow Reading for Motherhood")
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                Maternal Knowledge & Science
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#211D1A] tracking-tight">
                Slow reading for <span className="italic font-normal text-[#1E3A2F]">motherhood</span>.
              </h2>
            </div>
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F] hover:underline"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/learn"
              className="group rounded-card border border-[#E6DFD5] bg-[#FAF7F2] overflow-hidden hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-6 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F] bg-white px-2.5 py-0.5 rounded-full border border-[#E6DFD5] inline-block">
                  Clinical Guide · 5 Min Read
                </span>
                <h3 className="font-serif text-base font-bold text-[#211D1A] group-hover:text-[#1E3A2F] transition-colors leading-snug">
                  The Truth About Gond in Trimester 1 vs Trimester 3
                </h3>
                <p className="text-xs text-[#66615D] leading-relaxed line-clamp-3">
                  Why traditional heating bioactives must be timed carefully around embryonic development and pelvic preparation.
                </p>
              </div>
              <div className="px-6 pb-6 pt-2 flex items-center text-xs font-bold text-[#1E3A2F]">
                <span>Read Guide</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/learn"
              className="group rounded-card border border-[#E6DFD5] bg-[#FAF7F2] overflow-hidden hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-6 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F] bg-white px-2.5 py-0.5 rounded-full border border-[#E6DFD5] inline-block">
                  Traditional Science · 7 Min Read
                </span>
                <h3 className="font-serif text-base font-bold text-[#211D1A] group-hover:text-[#1E3A2F] transition-colors leading-snug">
                  The 40-Day Postpartum Jaapa Protocol Explained
                </h3>
                <p className="text-xs text-[#66615D] leading-relaxed line-clamp-3">
                  How sequential nutrition facilitates lochia clearance, uterine contraction, and prolactin stimulation.
                </p>
              </div>
              <div className="px-6 pb-6 pt-2 flex items-center text-xs font-bold text-[#1E3A2F]">
                <span>Read Guide</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/learn"
              className="group rounded-card border border-[#E6DFD5] bg-[#FAF7F2] overflow-hidden hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-6 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F] bg-white px-2.5 py-0.5 rounded-full border border-[#E6DFD5] inline-block">
                  Nutritional Research · 4 Min Read
                </span>
                <h3 className="font-serif text-base font-bold text-[#211D1A] group-hover:text-[#1E3A2F] transition-colors leading-snug">
                  Why A2 Bilona Ghee is the Ideal Vehicle for Fat-Soluble Vitamins
                </h3>
                <p className="text-xs text-[#66615D] leading-relaxed line-clamp-3">
                  Understanding traditional Lipophilic drug delivery and maternal micronutrient absorption in Indian postpartum care.
                </p>
              </div>
              <div className="px-6 pb-6 pt-2 flex items-center text-xs font-bold text-[#1E3A2F]">
                <span>Read Guide</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
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
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#211D1A] tracking-tight leading-tight">
            Nourish yourself with <span className="italic font-normal text-[#1E3A2F]">reverence</span> and clinical rigour.
          </h2>
          <p className="text-sm sm:text-base text-[#66615D] max-w-xl mx-auto leading-relaxed">
            Take our two-minute Nutrition Finder to receive your personalized trimester protocol, or browse doctor-reviewed formulations matched to your current gestational stage.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md transition-all group"
            >
              <Sparkles className="w-4 h-4 text-[#9DBDA6] group-hover:rotate-12 transition-transform" />
              <span>Take Free Nutrition Quiz</span>
            </Link>

            <button
              type="button"
              onClick={openSelector}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#211D1A] bg-white hover:bg-[#FAF7F2] text-[#211D1A] px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all"
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
