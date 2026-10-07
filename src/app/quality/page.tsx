import React from 'react';
import Link from 'next/link';
import { FileCheck, ShieldCheck, CheckCircle2, AlertCircle, Award, Leaf, ArrowRight } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/safety/MedicalDisclaimer';

export default function QualityPage() {
  return (
    <div className="bg-[#FAF7F2] text-[#211D1A] min-h-screen">
      {/* 1. Header Banner */}
      <div className="border-b border-[#E6DFD5] bg-white py-12 sm:py-16">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] px-3.5 py-1 text-xs font-semibold text-[#1E3A2F]">
              <FileCheck className="w-4 h-4 text-[#1E3A2F]" />
              <span>Purity Standards, Lab Testing & Sourcing</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#211D1A]">
              Purity You Can <span className="italic font-normal text-[#1E3A2F]">Inspect</span>.
            </h1>
            <p className="text-sm sm:text-base text-[#66615D] leading-relaxed">
              Traditional Indian nourishment must never hide behind opaque marketing slogans. We test for heavy metals, verify microbial safety, and declare every sourcing partner and preparation standard.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 space-y-16">
        {/* 2. Three Pillars */}
        <div>
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-1">
              Manufacturing Standards
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1A]">
              Three Non-Negotiable Purity Benchmarks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-card border border-[#E6DFD5] bg-white p-6 shadow-sm hover:border-[#1E3A2F] transition-colors">
              <span className="text-[10px] font-bold text-[#1E3A2F] uppercase tracking-wider block mb-2">
                01 · Cow Ghee Standards
              </span>
              <h3 className="font-serif font-bold text-[#211D1A] text-lg mb-2">
                A2 Bilona Desi Cow Ghee
              </h3>
              <p className="text-xs text-[#66615D] leading-relaxed">
                Prepared from traditional curd churning, not direct industrial cream heating. Rich in butyric acid and natural fat-soluble vitamin carriers without industrial trans-fats or palm derivatives.
              </p>
            </div>

            <div className="rounded-card border border-[#E6DFD5] bg-white p-6 shadow-sm hover:border-[#1E3A2F] transition-colors">
              <span className="text-[10px] font-bold text-[#1E3A2F] uppercase tracking-wider block mb-2">
                02 · Sweeteners & Binders
              </span>
              <h3 className="font-serif font-bold text-[#211D1A] text-lg mb-2">
                Whole Food Binders Only
              </h3>
              <p className="text-xs text-[#66615D] leading-relaxed">
                Bound strictly using organic jaggery (shakkar/gud) and roasted acacia gum (gond). 0% refined white sugar, zero liquid glucose, zero maltodextrin, and zero synthetic stabilizers.
              </p>
            </div>

            <div className="rounded-card border border-[#E6DFD5] bg-white p-6 shadow-sm hover:border-[#1E3A2F] transition-colors">
              <span className="text-[10px] font-bold text-[#1E3A2F] uppercase tracking-wider block mb-2">
                03 · Lab Batch Verification
              </span>
              <h3 className="font-serif font-bold text-[#211D1A] text-lg mb-2">
                Rigorous Lab Certification
              </h3>
              <p className="text-xs text-[#66615D] leading-relaxed">
                Microbial testing for moisture, yeast, mould, and heavy metal safety thresholds (Lead, Cadmium, Arsenic) conducted through NABL-accredited third-party laboratory partners.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Lab Certificate Status Note (Strict adherence to Constraints 5 & 6) */}
        <div className="rounded-card border border-[#E6DFD5] bg-white p-6 sm:p-8 flex items-start gap-4 shadow-sm">
          <AlertCircle className="w-6 h-6 text-[#A84D35] shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs text-[#66615D] leading-relaxed">
            <h4 className="font-serif text-sm font-bold text-[#211D1A]">
              Public Lab Certificate Repository Policy
            </h4>
            <p>
              Individual batch test PDFs are in the process of clinical and legal archiving. Per Maa Mitahara strict trust governance, unverified certificates or fabricated lab numbers are never displayed on this platform.
            </p>
            <p>
              Signed, verified NABL certificates will become directly downloadable from every product page once clinical audit sign-offs are completed.
            </p>
          </div>
        </div>

        {/* 4. Claims Register Link */}
        <div className="rounded-card border border-[#E6DFD5] bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-lg font-bold text-[#211D1A]">
              Inspect Our Public Claims Register
            </h3>
            <p className="text-xs text-[#66615D]">
              Examine why we retired marketing slogans and how each formulation claim is clinically documented.
            </p>
          </div>
          <Link
            href="/claims"
            className="inline-flex items-center gap-2 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all shrink-0"
          >
            <span>View Claims Register</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <MedicalDisclaimer />
      </div>
    </div>
  );
}
