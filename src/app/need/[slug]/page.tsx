import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NEED_LIST } from '@/data/needs';
import { PRODUCTS } from '@/data/catalog';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/safety/MedicalDisclaimer';

interface NeedPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return NEED_LIST.map((n) => ({ slug: n.slug }));
}

export default function NeedPage({ params }: NeedPageProps) {
  const needDef = NEED_LIST.find((n) => n.slug === params.slug);

  if (!needDef) {
    notFound();
  }

  const matchingProducts = PRODUCTS.filter((p) => p.needTags.includes(needDef.key));

  return (
    <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 space-y-12">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A2F] hover:underline mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="rounded-[16px] border border-[#E6DFD5] bg-white p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider block mb-2">
              Nutritional Need & Symptom Guide
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#211D1A] tracking-tight">
              {needDef.title}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#1E3A2F] font-semibold">
              Addresses: {needDef.customerSymptom}
            </p>

            <div className="mt-6 rounded-card bg-[#FAF7F2] border border-[#E6DFD5] p-5 shadow-sm">
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

      <div>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#211D1A]">
              Formulations Supporting This Need
            </h2>
            <p className="text-xs text-[#776D66] mt-0.5">
              Ensure you check stage compatibility before purchasing.
            </p>
          </div>
          <span className="text-xs text-[#776D66] font-medium">
            {matchingProducts.length} items
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {matchingProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      <MedicalDisclaimer />
    </div>
  );
}
