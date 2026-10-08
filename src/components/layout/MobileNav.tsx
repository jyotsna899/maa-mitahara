'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStage } from '@/context/StageContext';
import { Home, Sparkles, LayoutGrid, ShieldCheck } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { openSelector, stage } = useStage();

  const isHome = pathname === '/';
  const isDoctors = pathname.startsWith('/doctors');
  const isShop = pathname.startsWith('/stage') || pathname.startsWith('/product') || pathname.startsWith('/kits');

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-cream-200 bg-ivory-50/95 backdrop-blur-md px-3 py-1.5 shadow-peak-lg">
      <div className="grid grid-cols-4 gap-1">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1.5 rounded-peak transition-colors ${
            isHome ? 'text-earth-green-800 font-bold' : 'text-charcoal-500 hover:text-charcoal-900'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </Link>

        {/* 2. Stage Plan / Stage Selector */}
        <button
          onClick={openSelector}
          className="flex flex-col items-center justify-center py-1.5 rounded-peak text-earth-green-800 transition-colors active:scale-95"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-earth-green-800 mb-0.5" />
            {stage && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-sage-500 ring-2 ring-white" />
            )}
          </div>
          <span className="text-[10px] font-bold">
            {stage ? 'My Stage' : 'Set Stage'}
          </span>
        </button>

        {/* 3. Browse / Formulations */}
        <Link
          href="/products"
          className={`flex flex-col items-center justify-center py-1.5 rounded-peak transition-colors ${
            pathname.startsWith('/products') ? 'text-[#1E3A2F] font-bold' : 'text-[#776D66] hover:text-[#211D1A]'
          }`}
        >
          <LayoutGrid className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">All Products</span>
        </Link>

        {/* 4. Doctors */}
        <Link
          href="/doctors"
          className={`flex flex-col items-center justify-center py-1.5 rounded-peak transition-colors ${
            isDoctors ? 'text-earth-green-800 font-bold' : 'text-charcoal-500 hover:text-charcoal-900'
          }`}
        >
          <ShieldCheck className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Doctors</span>
        </Link>
      </div>
    </nav>
  );
};
