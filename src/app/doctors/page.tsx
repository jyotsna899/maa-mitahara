import React from 'react';
import Link from 'next/link';
import { DOCTORS } from '@/data/doctors';
import { ShieldCheck, FileCheck, CheckCircle2, AlertCircle, ArrowRight, Stethoscope } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/safety/MedicalDisclaimer';

export default function DoctorsPage() {
  return (
    <div className="bg-[#FAF7F2] text-[#211D1A] min-h-screen">
      {/* 1. Header Banner */}
      <div className="border-b border-[#E6DFD5] bg-white py-12 sm:py-16">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] px-3.5 py-1 text-xs font-semibold text-[#1E3A2F]">
              <ShieldCheck className="w-4 h-4 text-[#1E3A2F]" />
              <span>Clinical Governance & Medical Advisory</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#211D1A]">
              Clinical Guidance, <span className="italic font-normal text-[#1E3A2F]">Not Marketing</span> Claims.
            </h1>
            <p className="text-sm sm:text-base text-[#66615D] leading-relaxed">
              At Maa Mitahara, traditional food is held to clinical scrutiny. We have permanently retired vague labels like &ldquo;Doctor Inspired&rdquo; and unqualified &ldquo;Doctor Recommended&rdquo;. Instead, every stage-tagged recipe and serving guideline is reviewed by named obstetricians and gynaecologists.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 space-y-16">
        {/* 2. Advisory Principles */}
        <div>
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-1">
              Scientific Framework
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1A]">
              Our Three Clinical Review Mandates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-card border border-[#E6DFD5] bg-white p-6 shadow-sm hover:border-[#1E3A2F] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] text-[#1E3A2F] flex items-center justify-center font-serif font-bold text-sm mb-4">
                01
              </div>
              <h3 className="font-serif font-bold text-[#211D1A] text-base mb-2">
                Stage-Fit Gestational Evaluation
              </h3>
              <p className="text-xs text-[#66615D] leading-relaxed">
                Doctors examine each recipe against gestational weeks. Traditional spices that induce pelvic heat or uterine contractions are barred from early pregnancy collections.
              </p>
            </div>

            <div className="rounded-card border border-[#E6DFD5] bg-white p-6 shadow-sm hover:border-[#1E3A2F] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] text-[#1E3A2F] flex items-center justify-center font-serif font-bold text-sm mb-4">
                02
              </div>
              <h3 className="font-serif font-bold text-[#211D1A] text-base mb-2">
                Clinical Exclusion Safety Gates
              </h3>
              <p className="text-xs text-[#66615D] leading-relaxed">
                Ingredients like Ashwagandha, Safed Musli, or uncalibrated caffeine are strictly flagged. When in doubt, products are withheld from pregnant mothers.
              </p>
            </div>

            <div className="rounded-card border border-[#E6DFD5] bg-white p-6 shadow-sm hover:border-[#1E3A2F] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] text-[#1E3A2F] flex items-center justify-center font-serif font-bold text-sm mb-4">
                03
              </div>
              <h3 className="font-serif font-bold text-[#211D1A] text-base mb-2">
                Exact Serving & Glycemic Limits
              </h3>
              <p className="text-xs text-[#66615D] leading-relaxed">
                Rather than generic advice (&ldquo;eat whenever you like&rdquo;), serving quantities and ideal times are calibrated per trimester to support glycemic balance and maternal comfort.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Doctor Panel Profiles */}
        <div>
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-1">
              Qualified Practitioners
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1A]">
              Our Medical Advisory Panel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DOCTORS.map((doctor) => (
              <div
                key={doctor.id}
                className="rounded-card border border-[#E6DFD5] bg-white p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-[#1E3A2F] transition-all"
              >
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#E6DFD5] flex items-center justify-center text-[#1E3A2F] font-serif font-bold text-2xl shadow-inner shrink-0">
                      {doctor.name.split(' ')[1]?.charAt(0) || 'D'}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-[#211D1A] text-lg">
                        {doctor.name}
                      </h3>
                      <p className="text-xs text-[#1E3A2F] font-medium mt-0.5">
                        {doctor.qualification}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#FAF7F2] p-3.5 border border-[#E6DFD5] mb-4">
                    <span className="block text-[10px] uppercase font-bold text-[#776D66] tracking-wider mb-1">
                      Scope of Review Agreement:
                    </span>
                    <p className="text-xs text-[#211D1A] font-semibold">
                      {doctor.reviewScope}
                    </p>
                  </div>

                  <p className="text-xs text-[#66615D] leading-relaxed">
                    {doctor.bio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E6DFD5] text-[11px] text-[#776D66]">
                  <span className="font-semibold text-[#211D1A]">Affiliation: </span>
                  {doctor.hospital}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Claims Register CTA Card */}
        <div className="rounded-card border border-[#E6DFD5] bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-lg font-bold text-[#211D1A]">
              View Our Complete Public Claims Register
            </h3>
            <p className="text-xs text-[#66615D]">
              Inspect active vs. permanently retired marketing statements, regulatory citations, and clinical evidence sources.
            </p>
          </div>
          <Link
            href="/claims"
            className="inline-flex items-center gap-2 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all shrink-0"
          >
            <span>Claims Register</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Universal Medical Disclaimer Banner */}
        <MedicalDisclaimer />
      </div>
    </div>
  );
}
