import React from 'react';
import Link from 'next/link';
import { STAGE_LIST } from '@/data/stages';
import { NEED_LIST } from '@/data/needs';
import { MessageSquare, ShieldCheck, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#211D1A] text-[#FAF7F2] pt-16 pb-12 border-t border-[#332C27]">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Eurus 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#332C27]">
          {/* Col 1 & 2: Brand Mission & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block focus:outline-none">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white block">
                Maa Mitahara
              </span>
              <span className="text-[10px] tracking-widest text-[#9DBDA6] uppercase font-semibold">
                Traditional Maternal Superfoods
              </span>
            </Link>

            <p className="text-xs text-[#A09890] leading-relaxed max-w-sm">
              At Maa Mitahara, our mission is to consistently bring you doctor-formulated, nutritious, high-quality traditional food at transparent prices — making healthy eating simple, safe, and nurturing across every stage of motherhood.
            </p>

            <div className="pt-2">
              <span className="text-xs font-bold text-white block mb-2">
                Join 25,000+ mothers for stage diet updates & 10% off
              </span>
              <div className="flex max-w-sm rounded-lg overflow-hidden border border-[#443B35] bg-[#1A1715]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-xs bg-transparent text-white placeholder-[#776D66] focus:outline-none"
                />
                <button
                  type="button"
                  className="bg-white text-[#211D1A] px-4 py-2 text-xs font-bold hover:bg-[#FAF7F2] transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <Send className="w-3 h-3 text-[#1E3A2F]" />
                </button>
              </div>
            </div>
          </div>

          {/* Col 3: Shop by Stage */}
          <div>
            <h5 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Shop by Stage
            </h5>
            <ul className="space-y-2 text-xs text-[#A09890]">
              {STAGE_LIST.map((s) => (
                <li key={s.key}>
                  <Link href={`/stage/${s.slug}`} className="hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/kits" className="text-[#9DBDA6] font-bold hover:underline">
                  Stage Starter Kits →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Shop by Need */}
          <div>
            <h5 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Shop by Need
            </h5>
            <ul className="space-y-2 text-xs text-[#A09890]">
              {NEED_LIST.slice(0, 6).map((n) => (
                <li key={n.key}>
                  <Link href={`/need/${n.slug}`} className="hover:text-white transition-colors">
                    {n.title}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/quiz" className="text-[#9DBDA6] font-bold hover:underline">
                  Take Nutrition Quiz →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Trust & Advisory */}
          <div>
            <h5 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Trust & Advisory
            </h5>
            <ul className="space-y-2 text-xs text-[#A09890]">
              <li>
                <Link href="/doctors" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#9DBDA6]" />
                  <span>Medical Advisory Panel</span>
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-white transition-colors">
                  Maternal Journal & Guides
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-white transition-colors">
                  Founder’s Story & Heritage
                </Link>
              </li>
              <li>
                <Link href="/where-to-buy" className="hover:text-white transition-colors">
                  Where to Buy
                </Link>
              </li>
              <li>
                <Link href="/claims" className="hover:text-white transition-colors">
                  Public Claims Register
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#332C27] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#443B35] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#9DBDA6]" />
                  <span>WhatsApp Care</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Universal Medical Disclaimer */}
        <div className="py-6 border-b border-[#332C27]">
          <div className="rounded-xl bg-[#1A1715] p-4 border border-[#332C27] text-[11px] text-[#A09890] leading-relaxed">
            <p>
              <strong className="text-white">Statutory & Medical Notice:</strong> Maa Mitahara preparations are handcrafted traditional food products and are not intended to diagnose, treat, cure, or prevent any clinical disease. Nutritional requirements vary during pregnancy and lactation. Always consult your obstetrician or pediatrician before starting any new dietary regimen. Information pending where clinical review is in progress.
            </p>
          </div>
        </div>

        {/* Bottom Rights & Region */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#776D66]">
          <p>
            © {new Date().getFullYear()} Maa Mitahara. FSSAI Central Registration. All rights reserved. Handcrafted in India.
          </p>

          <div className="flex items-center gap-4 text-white">
            <Link href="/claims" className="hover:underline text-[#A09890]">
              Claims Register
            </Link>
            <span className="text-[#443B35]">·</span>
            <Link href="/doctors" className="hover:underline text-[#A09890]">
              Doctor Sign-Offs
            </Link>
            <span className="text-[#443B35]">·</span>
            <span className="font-bold text-[#FAF7F2]">India (INR ₹, EN)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
