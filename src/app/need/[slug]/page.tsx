'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NEED_LIST } from '@/data/needs';
import { STAGE_LIST } from '@/data/stages';
import { PRODUCTS } from '@/data/catalog';
import { ProductCard } from '@/components/product/ProductCard';
import { Sparkles, ShieldCheck, Filter } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/safety/MedicalDisclaimer';

interface NeedPageProps {
  params: {
    slug: string;
  };
}

export default function NeedPage({ params }: NeedPageProps) {
  const needDef = NEED_LIST.find((n) => n.slug === params.slug);

  if (!needDef) {
    notFound();
  }

  // Filter state for gestational stage
  const [selectedStage, setSelectedStage] = useState<string>('all');

  const allNeedProducts = PRODUCTS.filter((p) => p.needTags.includes(needDef.key));
  const displayedProducts = selectedStage === 'all'
    ? allNeedProducts
    : allNeedProducts.filter((p) => p.stageTags.includes(selectedStage as any));

  // Stages represented in this need's products
  const representedStages = STAGE_LIST.filter((s) =>
    allNeedProducts.some((p) => p.stageTags.includes(s.key))
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#211D1A]">
      {/* ────────────────────────────────────────────────────────────
          1. BREADCRUMBS & NEED HERO BANNER
      ──────────────────────────────────────────────────────────── */}
      <div className="border-b border-[#E6DFD5] bg-white py-8 sm:py-12">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#776D66] mb-3">
            <Link href="/" className="hover:text-[#1E3A2F]">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#1E3A2F]">Shop by Need</Link>
            <span>/</span>
            <span className="font-semibold text-[#211D1A]">{needDef.title}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider block mb-2">
              Nutritional Need & Symptom Guide
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#211D1A] tracking-tight">
              {needDef.title}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#C85A32] font-semibold">
              Addresses: {needDef.customerSymptom}
            </p>

            <div className="mt-6 rounded-card bg-[#FAF7F2] border border-[#E6DFD5] p-5 shadow-xs">
              <span className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider block mb-1">
                Clinical Rationale:
              </span>
              <p className="text-xs sm:text-sm text-[#211D1A] leading-relaxed">
                {needDef.clinicalRationale}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 space-y-12">
        {/* ────────────────────────────────────────────────────────────
            2. STAGE-FIRST HIERARCHY FILTER BAR
        ──────────────────────────────────────────────────────────── */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E6DFD5]">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#211D1A]">
                Formulations for {needDef.title}
              </h2>
              <p className="text-xs text-[#776D66] mt-0.5">
                Always ensure the formulation matches your current gestational trimester.
              </p>
            </div>

            {/* Stage filter pills */}
            {representedStages.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#776D66] shrink-0">
                  Filter Stage:
                </span>
                <button
                  onClick={() => setSelectedStage('all')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                    selectedStage === 'all'
                      ? 'bg-[#1E3A2F] text-white'
                      : 'bg-white border border-[#E6DFD5] text-[#66615D] hover:text-[#211D1A]'
                  }`}
                >
                  All Stages ({allNeedProducts.length})
                </button>
                {representedStages.map((s) => {
                  const count = allNeedProducts.filter((p) => p.stageTags.includes(s.key)).length;
                  return (
                    <button
                      key={s.key}
                      onClick={() => setSelectedStage(s.key)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                        selectedStage === s.key
                          ? 'bg-[#1E3A2F] text-white'
                          : 'bg-white border border-[#E6DFD5] text-[#66615D] hover:text-[#211D1A]'
                      }`}
                    >
                      {s.title} ({count})
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                userStageKey={selectedStage !== 'all' ? selectedStage : undefined}
              />
            ))}
          </div>
        </div>

        <MedicalDisclaimer />
      </div>
    </div>
  );
}
