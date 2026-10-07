import React from 'react';
import Link from 'next/link';
import { STAGE_LIST } from '@/data/stages';
import { BookOpen, Calendar, ArrowRight, ShieldCheck, Clock, Bookmark } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/safety/MedicalDisclaimer';

export default function LearnPage() {
  const editorialArticles = [
    {
      id: 'art-1',
      tag: 'Clinical Guide · 5 Min Read',
      title: 'The Truth About Gond in Trimester 1 vs Trimester 3',
      summary: 'Why traditional heating bioactives must be timed carefully around embryonic development and pelvic preparation.',
      slug: 'stage/first-trimester',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'art-2',
      tag: 'Traditional Science · 7 Min Read',
      title: 'The 40-Day Postpartum Jaapa Protocol Explained',
      summary: 'How sequential traditional recipes facilitate lochia clearance, uterine contraction, and prolactin stimulation.',
      slug: 'stage/postpartum',
      image: 'https://images.unsplash.com/photo-1508061252445-5350f31cf363?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'art-3',
      tag: 'Nutritional Research · 4 Min Read',
      title: 'Why A2 Bilona Ghee is the Ideal Vehicle for Fat-Soluble Vitamins',
      summary: 'Understanding traditional lipophilic drug delivery and maternal micronutrient absorption in Indian postpartum care.',
      slug: 'quality',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="bg-[#FAF7F2] text-[#211D1A] min-h-screen">
      {/* 1. Header Banner */}
      <div className="border-b border-[#E6DFD5] bg-white py-12 sm:py-16">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] px-3.5 py-1 text-xs font-semibold text-[#1E3A2F]">
              <BookOpen className="w-4 h-4 text-[#1E3A2F]" />
              <span>Maternal Nutrition Library & Clinical Guides</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#211D1A]">
              Slow Reading for <span className="italic font-normal text-[#1E3A2F]">Motherhood</span>.
            </h1>
            <p className="text-sm sm:text-base text-[#66615D] leading-relaxed">
              Obstetrician-reviewed guides bridging centuries of traditional Indian nutritional wisdom with modern clinical evidence across pregnancy and postpartum recovery.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 space-y-16">
        {/* 2. Featured Articles Grid */}
        <div>
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-1">
              Editorial Deep Dives
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1A]">
              Featured Clinical Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {editorialArticles.map((art) => (
              <div
                key={art.id}
                className="group rounded-card border border-[#E6DFD5] bg-white overflow-hidden shadow-sm hover:border-[#1E3A2F] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] w-full p-6 bg-gradient-to-br from-[#FAF7F2] to-[#EFE9DF] border-b border-[#E6DFD5] flex flex-col justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#776D66] bg-white/80 self-start px-2.5 py-0.5 rounded-full border border-[#D9CDBF]">
                      {art.tag.split('·')[0].trim()}
                    </span>
                    <div className="font-serif text-xl italic font-normal text-[#1E3A2F]">
                      Maa Mitahara Journal
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                      {art.tag}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#211D1A] group-hover:text-[#1E3A2F] transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#66615D] mt-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-[#FAF7F2]">
                  <Link
                    href={`/${art.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F] hover:underline"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Stage Nutrition Guides Directory */}
        <div>
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-1">
              Trimester-Wise Guidance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1A]">
              Stage Nutrition Charts & Diet Schedules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STAGE_LIST.map((stage) => (
              <div
                key={stage.key}
                className="rounded-card border border-[#E6DFD5] bg-white p-6 flex flex-col justify-between shadow-sm hover:border-[#1E3A2F] transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#1E3A2F] bg-[#EEF3EF] border border-[#BFD3C4] px-2.5 py-1 rounded-full w-fit mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{stage.weekRange}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#211D1A]">
                    {stage.title} Nutrition Protocol
                  </h3>
                  <p className="mt-2 text-xs text-[#66615D] leading-relaxed">
                    {stage.bodyNeedsSummary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E6DFD5]">
                  <Link
                    href={`/stage/${stage.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F] hover:underline"
                  >
                    <span>View Stage Nutrition Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <MedicalDisclaimer />
      </div>
    </div>
  );
}
