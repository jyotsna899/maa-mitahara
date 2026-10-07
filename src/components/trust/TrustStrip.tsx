import React from 'react';
import Link from 'next/link';
import { Star, ShieldCheck, FileCheck, Users, Sparkles } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  return (
    <div className="w-full border-y border-sand-200 bg-sand-100/70 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          {/* Trust Point 1: Star Rating */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="rounded-xl bg-white p-2.5 border border-sand-200 text-ochre-600 shadow-warm-sm">
              <Star className="w-5 h-5 fill-ochre-500 text-ochre-500" />
            </div>
            <div>
              <div className="font-serif font-bold text-charcoal-900 text-sm">
                4.9 Verified Rating
              </div>
              <div className="text-xs text-charcoal-500">
                5,000+ trimester-specific reviews
              </div>
            </div>
          </div>

          {/* Trust Point 2: Doctor Reviewed */}
          <Link
            href="/doctors"
            className="group flex flex-col md:flex-row items-center md:items-start gap-3 text-left focus:outline-none"
          >
            <div className="rounded-xl bg-white p-2.5 border border-sand-200 text-sage-700 shadow-warm-sm group-hover:border-sage-400 transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif font-bold text-charcoal-900 text-sm group-hover:text-terracotta-700 transition-colors flex items-center gap-1">
                <span>Doctor-Reviewed</span>
                <span className="text-[10px] text-sage-700 underline font-sans font-normal">View Panel</span>
              </div>
              <div className="text-xs text-charcoal-500">
                Led by named Obstetricians & Gynecologists
              </div>
            </div>
          </Link>

          {/* Trust Point 3: Clean & Lab Verified */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="rounded-xl bg-white p-2.5 border border-sand-200 text-terracotta-700 shadow-warm-sm">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif font-bold text-charcoal-900 text-sm">
                FSSAI & Lab Audited
              </div>
              <div className="text-xs text-charcoal-500">
                Zero synthetic preservatives or hidden sugars
              </div>
            </div>
          </div>

          {/* Trust Point 4: Whole Food Tradition */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="rounded-xl bg-white p-2.5 border border-sand-200 text-ochre-700 shadow-warm-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif font-bold text-charcoal-900 text-sm">
                Pure Cow Ghee & Millets
              </div>
              <div className="text-xs text-charcoal-500">
                Crafted fresh in hygienic small batches
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
