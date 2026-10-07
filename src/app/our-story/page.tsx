import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, ShieldCheck, ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/safety/MedicalDisclaimer';

export default function OurStoryPage() {
  return (
    <div className="bg-[#FAF7F2] text-[#211D1A] min-h-screen">
      {/* 1. Header Banner */}
      <div className="border-b border-[#E6DFD5] bg-white py-12 sm:py-16">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] px-3.5 py-1 text-xs font-semibold text-[#1E3A2F]">
              <Heart className="w-4 h-4 text-[#A84D35]" />
              <span>Heritage, Roots & Maternal Science</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#211D1A]">
              Nourishing Mothers with <span className="italic font-normal text-[#1E3A2F]">Reverence</span> and Rigour.
            </h1>
            <p className="text-sm sm:text-base text-[#66615D] leading-relaxed">
              Maa Mitahara was born from a fundamental realization: across Indian homes, mothers and grandmothers have guarded traditional Jaapa recipes for centuries. Yet modern mothers faced an unfair binary—cold, synthetic pharmaceutical tablets on one side, and unstandardized, high-sugar street laddus on the other.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 space-y-16">
        {/* 2. Split Story & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[16px] overflow-hidden border border-[#E6DFD5] bg-[#F6F2EC] shadow-md aspect-portrait">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80"
                alt="Founder and Maternal Heritage"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block">
              Founding Realization
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#211D1A] tracking-tight">
              &ldquo;I started Maa Mitahara for the <span className="italic font-normal text-[#1E3A2F]">care</span> I couldn&apos;t find.&rdquo;
            </h2>
            <p className="text-xs sm:text-sm text-[#66615D] leading-relaxed">
              When I became a mother, I discovered a heartbreaking gap: traditional postpartum wisdom was slipping away into fading memory, while modern market shelves were overflowing with synthetic capsules and high-sugar commercial products.
            </p>
            <p className="text-xs sm:text-sm text-[#66615D] leading-relaxed">
              Together with certified obstetricians, Ayurvedic physicians, and regional gaushalas, we standardized my grandmother&apos;s handwritten Jaapa recipes. Today, every laddu is handcrafted to order in small batches—preserving traditional sacred nourishment with the clinical rigor every mother deserves.
            </p>

            <div className="pt-2">
              <Link
                href="/doctors"
                className="inline-flex items-center gap-2 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>Meet Our Medical Advisory Panel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Three Brand Pillars */}
        <div>
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-1">
              Foundational Standards
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1A]">
              Our Guiding Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-card border border-[#E6DFD5] bg-white p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] text-[#1E3A2F] flex items-center justify-center font-serif font-bold text-sm mb-4">
                01
              </div>
              <h3 className="font-serif font-bold text-[#211D1A] text-base mb-2">
                1. Stage-Matched Nutrition
              </h3>
              <p className="text-xs text-[#66615D] leading-relaxed">
                Recipes engineered to match your exact gestational trimester or postpartum phase. No one-size-fits-all laddus.
              </p>
            </div>

            <div className="rounded-card border border-[#E6DFD5] bg-white p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] text-[#1E3A2F] flex items-center justify-center font-serif font-bold text-sm mb-4">
                02
              </div>
              <h3 className="font-serif font-bold text-[#211D1A] text-base mb-2">
                2. Obstetrician Review
              </h3>
              <p className="text-xs text-[#66615D] leading-relaxed">
                Serving quantities, trimester safety restrictions, and glycemic suitability reviewed by qualified obstetricians and gynaecologists.
              </p>
            </div>

            <div className="rounded-card border border-[#E6DFD5] bg-white p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] text-[#1E3A2F] flex items-center justify-center font-serif font-bold text-sm mb-4">
                03
              </div>
              <h3 className="font-serif font-bold text-[#211D1A] text-base mb-2">
                3. Complete Purity Disclosure
              </h3>
              <p className="text-xs text-[#66615D] leading-relaxed">
                100% A2 Desi Bilona cow ghee, zero refined sugar, zero preservatives, and full disclosure of all allergens and ingredients.
              </p>
            </div>
          </div>
        </div>

        <MedicalDisclaimer />
      </div>
    </div>
  );
}
