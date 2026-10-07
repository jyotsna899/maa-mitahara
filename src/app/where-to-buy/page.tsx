import React from 'react';
import Link from 'next/link';
import { ExternalLink, ShoppingBag, Sparkles, CheckCircle2, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/safety/MedicalDisclaimer';

export default function WhereToBuyPage() {
  return (
    <div className="bg-[#FAF7F2] text-[#211D1A] min-h-screen">
      {/* 1. Header Banner */}
      <div className="border-b border-[#E6DFD5] bg-white py-12 sm:py-16">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] px-3.5 py-1 text-xs font-semibold text-[#1E3A2F]">
              <ShoppingBag className="w-4 h-4 text-[#1E3A2F]" />
              <span>Official Purchasing Channels</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#211D1A]">
              Where to Buy <span className="italic font-normal text-[#1E3A2F]">Maa Mitahara</span>.
            </h1>
            <p className="text-sm sm:text-base text-[#66615D] leading-relaxed">
              For guaranteed freshness, personalized stage routines, and automatic trimester subscription transitions, ordering directly through our website is recommended.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Channel 1: Official Website */}
          <div className="rounded-card border-2 border-[#1E3A2F] bg-white p-8 space-y-6 shadow-md flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EEF3EF] text-[#1E3A2F]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended Route (Direct D2C)</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1A]">
                Maa Mitahara Official Platform
              </h2>
              <p className="text-xs sm:text-sm text-[#66615D] leading-relaxed">
                Fresh small-batch preparations dispatched every fortnight directly from our central certified kitchen.
              </p>

              <ul className="space-y-2.5 text-xs text-[#211D1A] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A2F] shrink-0" />
                  <span>Full 4-Step Personal Nutrition Finder & Diet Routine</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A2F] shrink-0" />
                  <span>Subscribe & Save with automatic trimester swap</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A2F] shrink-0" />
                  <span>Free doorstep delivery on orders above ₹999</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A2F] shrink-0" />
                  <span>Temperature-managed, food-safe eco packaging</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Link
                href="/kits"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
              >
                <span>Explore Stage Starter Kits</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Channel 2: Amazon India */}
          <div className="rounded-card border border-[#E6DFD5] bg-white p-8 space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FAF7F2] text-[#776D66] border border-[#E6DFD5]">
                Authorized Marketplace
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1A]">
                Amazon India Storefront
              </h2>
              <p className="text-xs sm:text-sm text-[#66615D] leading-relaxed">
                Select single trial packs and popular samplers are also available on Amazon Prime for urgent same-day or next-day delivery in metro cities.
              </p>

              <div className="rounded-lg bg-[#FAF7F2] p-4 border border-[#E6DFD5] text-xs text-[#66615D] space-y-1">
                <span className="font-bold text-[#211D1A] block">Important Note:</span>
                Personalized gestational diet plans, recurring automated trimester progressions, and custom Jaapa box builder discounts are available exclusively through our official website.
              </div>
            </div>

            <div className="pt-6">
              <a
                href="https://amazon.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full border border-[#211D1A] hover:bg-[#FAF7F2] text-[#211D1A] py-3.5 text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>Visit Amazon India Storefront</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <MedicalDisclaimer />
      </div>
    </div>
  );
}
