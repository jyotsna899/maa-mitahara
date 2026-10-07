import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { STAGE_LIST, STAGES } from '@/data/stages';
import { PRODUCTS, STAGE_KITS } from '@/data/catalog';
import { NEED_LIST } from '@/data/needs';
import { ProductCard } from '@/components/product/ProductCard';
import { ShieldCheck, Calendar, ArrowRight, HelpCircle, ChevronRight, Info } from 'lucide-react';

interface StagePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return STAGE_LIST.map((s) => ({ slug: s.slug }));
}

export default function StagePage({ params }: StagePageProps) {
  const stageDef = STAGE_LIST.find((s) => s.slug === params.slug);

  if (!stageDef) {
    notFound();
  }

  // Filter products matching this stage
  const matchingProducts = PRODUCTS.filter((p) => p.stageTags.includes(stageDef.key));
  const starterKit = STAGE_KITS.find((k) => k.stageKey === stageDef.key);
  const nextStageDef = stageDef.nextStageKey ? STAGES[stageDef.nextStageKey] : null;

  return (
    <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 space-y-12">
      {/* 1. STAGE HERO BANNER (PRD Section 8) */}
      <div className="rounded-[16px] border border-[#E6DFD5] bg-white p-6 sm:p-12 relative overflow-hidden shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] px-3 py-1 text-xs font-semibold text-[#211D1A] mb-4">
            <Calendar className="w-3.5 h-3.5 text-[#1E3A2F]" />
            <span>{stageDef.weekRange}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#211D1A] tracking-tight">
            {stageDef.title} Nutrition
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#66615D] leading-relaxed font-medium">
            {stageDef.shortDescription}
          </p>

          {/* "What your body needs now" box written with named doctor */}
          <div className="mt-6 rounded-card border border-[#BFD3C4] bg-[#EEF3EF] p-5 shadow-sm">
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

      {/* 2. STAGE STARTER KIT (PRD PU-1, DS-3) */}
      {starterKit && (
        <div className="rounded-[16px] border border-[#E6DFD5] bg-[#FAF7F2] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F] bg-white border border-[#E6DFD5] px-3 py-0.5 rounded-full">
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
              className="rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white px-6 py-3 text-xs font-semibold shadow-md transition-all uppercase tracking-wider"
            >
              Order Starter Kit
            </Link>
          </div>
        </div>
      )}

      {/* 3. ASSORTMENT & NEED-GROUPED PRODUCTS (PRD DS-3, ST-2) */}
      <div>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#211D1A]">
              Doctor-Approved Single Preparations
            </h2>
            <p className="text-xs text-[#776D66] mt-1">
              Filtered strictly for suitability in {stageDef.title}.
            </p>
          </div>
          <span className="text-xs font-medium text-[#776D66]">
            Showing {matchingProducts.length} approved preparations
          </span>
        </div>

        {matchingProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchingProducts.map((p) => (
              <ProductCard key={p.id} product={p} userStageKey={stageDef.key} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-sand-200 bg-sand-50 p-8 text-center">
            <Info className="w-8 h-8 text-ochre-600 mx-auto mb-2" />
            <h3 className="font-serif font-bold text-charcoal-800">
              Clinical Review Pending for This Stage
            </h3>
            <p className="text-xs text-charcoal-500 max-w-md mx-auto mt-1">
              Our obstetric panel is reviewing formulations for this category. Products with unverified stage compatibility are withheld.
            </p>
          </div>
        )}

        {/* PRD DS-3 Assortment note if fewer than 3 products */}
        {matchingProducts.length < 3 && (
          <div className="mt-6 rounded-xl border border-sand-200 bg-sand-100/60 p-4 text-xs text-charcoal-600 flex items-start gap-3">
            <Info className="w-4 h-4 text-ochre-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-charcoal-800">Assortment Policy (PRD DS-3): </span>
              In early developmental stages, safety precedes choice. We never compromise clinical safety to artificially inflate catalogue variety.
            </div>
          </div>
        )}
      </div>

      {/* 4. STAGE FAQS (PRD Section 8) */}
      <div className="rounded-3xl border border-sand-200 bg-white p-6 sm:p-10 shadow-warm-sm">
        <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-6 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-terracotta-600" />
          <span>Stage Safety & Consumption Guidance</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stageDef.stageFaqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl border border-sand-200 bg-sand-50/60 p-5">
              <h3 className="font-serif font-bold text-charcoal-900 text-sm mb-2">
                {faq.question}
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. NEXT STAGE PREVIEW (PRD Section 8, RT-1) */}
      {nextStageDef && (
        <div className="rounded-2xl border border-sand-200 bg-sand-100/50 p-6 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider">
              Upcoming Trimester Journey
            </span>
            <h3 className="font-serif font-bold text-charcoal-900 text-base mt-0.5">
              Next Stage: {nextStageDef.title} ({nextStageDef.weekRange})
            </h3>
            <p className="text-xs text-charcoal-500 mt-1">
              Your nutrition evolves automatically as fetal demands change.
            </p>
          </div>
          <Link
            href={`/stage/${nextStageDef.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-sand-300 bg-white px-4 py-2 text-xs font-semibold text-charcoal-800 hover:text-terracotta-700 shadow-warm-sm"
          >
            <span>Preview Next Stage</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
