import React from 'react';
import Link from 'next/link';
import { STAGE_KITS } from '@/data/catalog';
import { Gift, Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/safety/MedicalDisclaimer';

export default function KitsPage() {
  return (
    <div className="bg-[#FAF7F2] text-[#211D1A] min-h-screen">
      {/* 1. Header Banner */}
      <div className="border-b border-[#E6DFD5] bg-white py-12 sm:py-16">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] px-3.5 py-1 text-xs font-semibold text-[#1E3A2F]">
              <Gift className="w-4 h-4 text-[#1E3A2F]" />
              <span>Stage Starter Kits & Curated Programmes</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#211D1A]">
              Complete Stage Routines & <span className="italic font-normal text-[#1E3A2F]">Jaapa</span> Programmes.
            </h1>
            <p className="text-sm sm:text-base text-[#66615D] leading-relaxed">
              Curated stage kits designed to take the friction out of daily nutrition. Each starter kit includes an eating schedule, trial pack sizes to assess taste and digestive tolerance, and genuine bundle savings over individual products.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 space-y-16">
        {/* 2. Stage Starter Kits Grid */}
        <div>
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-1">
              Curated Trimester Boxes
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1A]">
              Stage Starter Kits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {STAGE_KITS.map((kit) => (
              <div
                key={kit.id}
                className="rounded-card border border-[#E6DFD5] bg-white p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#1E3A2F] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-[#1E3A2F] bg-[#EEF3EF] border border-[#BFD3C4] px-3 py-1 rounded-full uppercase tracking-wider">
                      {kit.stageKey.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-semibold text-[#8A3B26] bg-[#FDF6F3] border border-[#F2D7CB] px-2.5 py-0.5 rounded-full">
                      Save ₹{kit.sizes[0].rupeeSaving} on Trial
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#211D1A]">
                    {kit.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#66615D] leading-relaxed">
                    {kit.description}
                  </p>

                  <div className="mt-5 rounded-lg bg-[#FAF7F2] p-4 border border-[#E6DFD5] text-xs text-[#211D1A]">
                    <span className="font-bold text-[#1E3A2F] block mb-1 uppercase tracking-wider text-[10px]">
                      Recommended Daily Routine:
                    </span>
                    <p className="text-[#66615D]">{kit.dailyGuide}</p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E6DFD5] flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-[#211D1A]">
                      From ₹{kit.sizes[0].price}
                    </span>
                    <span className="block text-[11px] text-[#776D66] line-through">
                      Regular: ₹{kit.sizes[0].regularPrice}
                    </span>
                  </div>
                  <Link
                    href={`/stage/${kit.stageKey.replace('_', '-')}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <span>View Stage Box</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Postpartum Programmes */}
        <div className="rounded-card border border-[#E6DFD5] bg-white p-8 sm:p-12 space-y-8 shadow-sm">
          <div>
            <span className="text-[11px] font-bold text-[#1E3A2F] uppercase tracking-wider block mb-1">
              Specialised Jaapa Care
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1A]">
              Jannani & Prasavitri Postpartum Programmes
            </h2>
            <p className="text-xs sm:text-sm text-[#66615D] mt-2 max-w-2xl leading-relaxed">
              Dedicated multi-week traditional recovery regimens structured for sacred maternal recuperation after childbirth. Handcrafted fresh small-batch dispatches with doctor check-ins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-card bg-[#FAF7F2] border border-[#E6DFD5] p-6 space-y-3">
              <span className="text-[10px] font-bold text-[#A84D35] uppercase tracking-wider bg-[#FDF6F3] border border-[#F2D7CB] px-2.5 py-0.5 rounded-full inline-block">
                30-Day Recovery
              </span>
              <h3 className="font-serif text-xl font-bold text-[#211D1A]">
                Jannani 30-Day Jaapa Care Programme
              </h3>
              <p className="text-xs text-[#66615D] leading-relaxed">
                Stage-wise delivery of Gond Giri, Saunth Jaapa, Dana Methi, and restorative Panjiris calibrated for the first month post-delivery.
              </p>
              <div className="pt-2 text-xs font-medium text-[#1E3A2F]">
                ✓ Includes weekly WhatsApp recovery check-in and feeding support guide.
              </div>
            </div>

            <div className="rounded-card bg-[#FAF7F2] border border-[#E6DFD5] p-6 space-y-3">
              <span className="text-[10px] font-bold text-[#A84D35] uppercase tracking-wider bg-[#FDF6F3] border border-[#F2D7CB] px-2.5 py-0.5 rounded-full inline-block">
                40-Day Sacred Jaapa
              </span>
              <h3 className="font-serif text-xl font-bold text-[#211D1A]">
                Prasavitri 40-Day Traditional Programme
              </h3>
              <p className="text-xs text-[#66615D] leading-relaxed">
                The full traditional 40-day postpartum regimen incorporating uterine involution herbs, pelvic bone support, and nourishing galactagogue laddus.
              </p>
              <div className="pt-2 text-xs font-medium text-[#1E3A2F]">
                ✓ Includes dedicated doctor Q&A access and customized packaging.
              </div>
            </div>
          </div>
        </div>

        <MedicalDisclaimer />
      </div>
    </div>
  );
}
