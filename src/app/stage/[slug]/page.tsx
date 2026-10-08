'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { STAGE_LIST, STAGES } from '@/data/stages';
import { PRODUCTS, STAGE_KITS } from '@/data/catalog';
import { NEED_LIST } from '@/data/needs';
import { ProductCard } from '@/components/product/ProductCard';
import { ShieldCheck, Calendar, ArrowRight, HelpCircle, ChevronRight, Info, Filter } from 'lucide-react';

interface StagePageProps {
  params: {
    slug: string;
  };
}

export default function StagePage({ params }: StagePageProps) {
  const stageDef = STAGE_LIST.find((s) => s.slug === params.slug);

  if (!stageDef) {
    notFound();
  }

  // State for sub-filtering by maternal need within this stage
  const [selectedNeed, setSelectedNeed] = useState<string>('all');

  // Filter products matching this stage
  const allStageProducts = PRODUCTS.filter((p) => p.stageTags.includes(stageDef.key));
  const displayedProducts = selectedNeed === 'all'
    ? allStageProducts
    : allStageProducts.filter((p) => p.needTags.includes(selectedNeed as any));

  const starterKit = STAGE_KITS.find((k) => k.stageKey === stageDef.key);
  const nextStageDef = stageDef.nextStageKey ? STAGES[stageDef.nextStageKey] : null;

  // Needs relevant to products in this stage
  const relevantNeeds = NEED_LIST.filter((n) =>
    allStageProducts.some((p) => p.needTags.includes(n.key))
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#211D1A]">
      {/* ────────────────────────────────────────────────────────────
          1. BREADCRUMBS & STAGE HERO BANNER (PRD Section 8)
      ──────────────────────────────────────────────────────────── */}
      <div className="border-b border-[#E6DFD5] bg-white py-8 sm:py-12">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#776D66] mb-3">
            <Link href="/" className="hover:text-[#1E3A2F]">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#1E3A2F]">Shop by Stage</Link>
            <span>/</span>
            <span className="font-semibold text-[#211D1A]">{stageDef.title}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] px-3.5 py-1 text-xs font-semibold text-[#211D1A] mb-4">
              <Calendar className="w-3.5 h-3.5 text-[#1E3A2F]" />
              <span>{stageDef.weekRange}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#211D1A] tracking-tight">
              {stageDef.title} <span className="italic font-normal text-[#1E3A2F]">Nutrition</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-[#66615D] leading-relaxed font-medium">
              {stageDef.shortDescription}
            </p>

            {/* "What your body needs now" box reviewed with named doctor */}
            <div className="mt-6 rounded-card border border-[#BFD3C4] bg-[#EEF3EF] p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A2F] uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-[#1E3A2F]" />
                <span>What Your Body Needs Now · Reviewed by {stageDef.doctorReviewerName}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#211D1A] leading-relaxed">
                {stageDef.bodyNeedsSummary}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 space-y-12">
        {/* ────────────────────────────────────────────────────────────
            2. STAGE STARTER KIT (Low-risk trial routine)
        ──────────────────────────────────────────────────────────── */}
        {starterKit && (
          <div className="rounded-[16px] border border-[#E6DFD5] bg-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F] bg-[#EEF3EF] px-3 py-0.5 rounded-full">
                Recommended Stage Routine
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#211D1A]">
                {starterKit.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#66615D] max-w-xl">
                {starterKit.description}
              </p>
              <div className="text-xs text-[#776D66] font-medium pt-1">
                Daily Eating Routine: {starterKit.dailyGuide}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-baseline sm:items-center gap-4 shrink-0">
              <div className="text-right">
                <span className="text-xl font-bold text-[#211D1A]">
                  From ₹{starterKit.sizes[0].price}
                </span>
                <span className="block text-xs text-[#C85A32] font-semibold">
                  Save ₹{starterKit.sizes[0].rupeeSaving} on trial
                </span>
              </div>
              <Link
                href="/kits"
                className="rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white px-6 py-3 text-xs font-semibold shadow-xs transition-all uppercase tracking-wider"
              >
                Order Starter Kit
              </Link>
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────
            3. HIERARCHY: STAGE → NEED FILTERING → PRODUCT GRID
        ──────────────────────────────────────────────────────────── */}
        <div>
          {/* Need-Based Subfilter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E6DFD5]">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#211D1A]">
                Doctor-Approved Single Preparations
              </h2>
              <p className="text-xs text-[#776D66] mt-0.5">
                Filtered strictly for stage safety in {stageDef.title}.
              </p>
            </div>

            {/* Filter by Need within stage */}
            {relevantNeeds.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#776D66] shrink-0">
                  Target Need:
                </span>
                <button
                  onClick={() => setSelectedNeed('all')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                    selectedNeed === 'all'
                      ? 'bg-[#1E3A2F] text-white'
                      : 'bg-white border border-[#E6DFD5] text-[#66615D] hover:text-[#211D1A]'
                  }`}
                >
                  All Needs ({allStageProducts.length})
                </button>
                {relevantNeeds.map((n) => {
                  const count = allStageProducts.filter((p) => p.needTags.includes(n.key)).length;
                  return (
                    <button
                      key={n.key}
                      onClick={() => setSelectedNeed(n.key)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                        selectedNeed === n.key
                          ? 'bg-[#1E3A2F] text-white'
                          : 'bg-white border border-[#E6DFD5] text-[#66615D] hover:text-[#211D1A]'
                      }`}
                    >
                      {n.title} ({count})
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Product Cards Grid */}
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProducts.map((p) => (
                <ProductCard key={p.id} product={p} userStageKey={stageDef.key} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#E6DFD5] bg-white p-8 text-center">
              <Info className="w-8 h-8 text-[#A84D35] mx-auto mb-2" />
              <h3 className="font-serif font-bold text-[#211D1A]">
                Clinical Review Pending for This Selection
              </h3>
              <p className="text-xs text-[#776D66] max-w-md mx-auto mt-1">
                Our medical panel is verifying ingredient tolerance for this combination. Products without verified clinical compatibility are held back.
              </p>
            </div>
          )}

          {/* PRD DS-3 Assortment note if fewer than 3 products */}
          {displayedProducts.length < 3 && (
            <div className="mt-6 rounded-xl border border-[#E6DFD5] bg-[#FAF7F2] p-4 text-xs text-[#66615D] flex items-start gap-3">
              <Info className="w-4 h-4 text-[#1E3A2F] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#211D1A]">Assortment Policy (PRD DS-3): </span>
                In early gestational stages, safety precedes choice. We never compromise clinical safety to artificially inflate catalogue variety.
              </div>
            </div>
          )}
        </div>

        {/* ────────────────────────────────────────────────────────────
            4. NEXT STAGE RETENTION BRIDGE (PRD Section 8)
        ──────────────────────────────────────────────────────────── */}
        {nextStageDef && (
          <div className="rounded-[16px] border border-[#E6DFD5] bg-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#776D66] tracking-wider block">
                Next In Your Journey
              </span>
              <h3 className="font-serif text-xl font-bold text-[#211D1A] mt-0.5">
                {nextStageDef.title} ({nextStageDef.weekRange})
              </h3>
              <p className="text-xs text-[#66615D] mt-1">
                {nextStageDef.shortDescription}
              </p>
            </div>
            <Link
              href={`/stage/${nextStageDef.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#211D1A] bg-white hover:bg-[#FAF7F2] text-[#211D1A] px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all shrink-0"
            >
              <span>Preview Next Stage</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────
            5. STAGE SAFETY & CONSUMPTION GUIDANCE
        ──────────────────────────────────────────────────────────── */}
        <div className="rounded-[16px] border border-[#E6DFD5] bg-white p-6 sm:p-10 shadow-xs">
          <h2 className="font-serif text-2xl font-bold text-[#211D1A] mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#1E3A2F]" />
            <span>Stage Safety & Consumption Guidance</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#66615D] leading-relaxed">
            <div className="space-y-2 p-4 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5]">
              <strong className="text-[#211D1A] block font-serif text-sm">
                How many laddus can I consume per day?
              </strong>
              <p>
                As standard dietary guidance, 1 laddu daily (~33g) provides sufficient slow-burn energy and essential fatty acids. If taking prescribed prenatal iron or calcium supplements, consume the laddu at an alternating hour to maximize mineral absorption.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5]">
              <strong className="text-[#211D1A] block font-serif text-sm">
                What if I am diagnosed with Gestational Diabetes?
              </strong>
              <p>
                Traditional preparations containing organic jaggery should be replaced with sugar-free recipes or consumed strictly under medical supervision. Always check the glycemic exclusion flag in our Nutrition Finder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
