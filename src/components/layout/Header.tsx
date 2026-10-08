'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStage } from '@/context/StageContext';
import { STAGE_LIST } from '@/data/stages';
import { NEED_LIST } from '@/data/needs';
import { PRODUCTS, STAGE_KITS } from '@/data/catalog';
import { shopifyService, MockCart } from '@/services/mock/shopifyService';
import { CartDrawer } from './CartDrawer';
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Heart,
  SlidersHorizontal,
  User,
  HelpCircle,
} from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [cart, setCart] = useState<MockCart>(shopifyService.getCart());
  const { stage, setStage, openSelector } = useStage();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return shopifyService.subscribe((updated) => setCart({ ...updated }));
  }, []);

  const totalCartItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  // Filter products for quick search
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter((p) => {
        const matchesCategory =
          searchCategory === 'all' ||
          (searchCategory === 'pregnancy' && p.stageTags.some((s) => s.includes('trimester'))) ||
          (searchCategory === 'postpartum' && p.stageTags.includes('postpartum')) ||
          (searchCategory === 'baby' && p.form === 'diy_mix') ||
          (searchCategory === 'kits' && (p.form === 'programme' || p.form === 'gift_box'));

        const matchesQuery =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.stageBenefitSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.needTags.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesQuery;
      }).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F0] border-b border-[#E6DFD1] shadow-sm">
      {/* ────────────────────────────────────────────────────────────
          1. PEAK ANNOUNCEMENT / UTILITY BAR
      ──────────────────────────────────────────────────────────── */}
      <div className="bg-[#1E3A2F] text-[#FAF7F0] px-4 py-1.5 text-[11px] font-medium tracking-wide">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9DBDA6] animate-pulse" />
            <span className="font-semibold text-white">Free delivery to your door for orders over ₹999.</span>
            <span className="hidden md:inline text-[#6FA08C]">·</span>
            <span className="hidden md:inline text-[#E1ECE6]">Doctor-reviewed superfoods, zero refined sugar & zero preservatives!</span>
          </div>

          <div className="flex items-center gap-4 text-[#E1ECE6] text-[11px]">
            <Link href="/doctors" className="hover:text-white flex items-center gap-1 transition-colors">
              <HelpCircle className="w-3 h-3 text-[#9DBDA6]" />
              <span>Medical Help</span>
            </Link>
            <span className="text-[#3A6856]">|</span>
            <Link href="/quiz" className="hover:text-white flex items-center gap-1 transition-colors">
              <User className="w-3 h-3 text-[#9DBDA6]" />
              <span>My Plan</span>
            </Link>
            <span className="text-[#3A6856]">|</span>
            <span className="font-semibold text-white">India (INR ₹, EN)</span>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          2. PEAK MAIN SEARCH & LOGO ROW
      ──────────────────────────────────────────────────────────── */}
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="group flex flex-col focus:outline-none">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#211D1A] group-hover:text-[#1E3A2F] transition-colors">
                Maa Mitahara
              </span>
              <span className="text-[9px] tracking-widest text-[#776D66] uppercase font-semibold">
                Traditional Maternal Superfoods
              </span>
            </Link>
          </div>

          {/* Center: Peak Integrated Search Bar with Category Select */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4 relative">
            <div className="w-full flex items-center rounded-lg border border-[#D9CDBF] bg-white overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-[#1E3A2F] focus-within:border-[#1E3A2F] transition-all">
              {/* Category Selector */}
              <div className="relative border-r border-[#E6DFD1] bg-[#F7F6F5] px-2.5 py-2 text-xs font-semibold text-[#574F49]">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="bg-transparent text-xs text-[#423B36] font-semibold pr-4 focus:outline-none cursor-pointer appearance-none"
                  aria-label="Select product category"
                >
                  <option value="all">All Stages</option>
                  <option value="pregnancy">Pregnancy (Trimester 1-3)</option>
                  <option value="postpartum">Postpartum Jaapa</option>
                  <option value="baby">Baby & Toddler</option>
                  <option value="kits">Stage Kits</option>
                </select>
                <ChevronDown className="w-3 h-3 text-[#776D66] absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Text Input */}
              <input
                type="text"
                placeholder="What are you looking for? (e.g. Gond Laddu, Morning Sickness...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-full px-3 py-2 text-xs text-[#211D1A] placeholder-[#988F88] focus:outline-none bg-transparent"
              />

              {/* Search Icon / Clear */}
              <div className="pr-3 flex items-center">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[#988F88] hover:text-[#211D1A] p-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <Search className="w-4 h-4 text-[#776D66]" />
                )}
              </div>
            </div>

            {/* Peak Search Autocomplete Dropdown */}
            {searchFocused && searchQuery.trim() && (
              <div
                className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl border border-[#D9CDBF] bg-white p-3 shadow-xl animate-in fade-in duration-150"
                onMouseLeave={() => setSearchFocused(false)}
              >
                <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-[#776D66] mb-2 px-1">
                  <span>Suggested Formulations</span>
                  <Link
                    href={`/products?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => {
                      setSearchFocused(false);
                      setSearchQuery('');
                    }}
                    className="text-[#1E3A2F] hover:underline normal-case"
                  >
                    View All &rarr;
                  </Link>
                </div>
                {searchResults.length > 0 ? (
                  <div className="space-y-1.5">
                    {searchResults.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        onClick={() => {
                          setSearchFocused(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F3EFE6] transition-colors text-xs"
                      >
                        <div className="pr-3">
                          <div className="font-bold text-[#211D1A]">
                            {p.name.replace(/\s*\((Mom to Be|Postnatal Edition|Mom-to-Be)\)/gi, '').trim()}
                          </div>
                          <div className="text-[11px] text-[#776D66] line-clamp-1">
                            <span className="font-semibold text-[#1E3A2F]">{p.stageTags[0].replace('_', ' ')}</span> · {p.stageBenefitSummary}
                          </div>
                        </div>
                        <span className="font-bold text-[#1E3A2F] shrink-0">₹{p.variants[0].price}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-xs text-[#776D66]">
                    No formulations found for &ldquo;{searchQuery}&rdquo;.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Peak Preferences Pill & Utility Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Peak "MY PREFERENCES / Pick your stage" Pill Button */}
            <button
              onClick={openSelector}
              className="inline-flex items-center gap-2 rounded-full border border-[#C2B1A0] bg-white hover:bg-[#F3EFE6] px-3.5 py-1.5 text-xs font-bold text-[#211D1A] shadow-sm transition-all group"
            >
              <div className="w-5 h-5 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center shrink-0">
                <SlidersHorizontal className="w-2.5 h-2.5" />
              </div>
              <div className="text-left hidden lg:block">
                <span className="text-[9px] uppercase font-bold tracking-wider text-[#776D66] block leading-none">
                  Preferences
                </span>
                <span className="text-[11px] text-[#1E3A2F] font-bold block leading-tight">
                  {mounted && stage ? stage.replace('_', ' ').toUpperCase() : 'Pick Your Stage'}
                </span>
              </div>
            </button>

            {/* Cart Button with Count Badge */}
            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              className="relative p-2 rounded-full text-[#211D1A] hover:bg-[#E6DFD1] transition-colors"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#1E3A2F] text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#211D1A] hover:bg-[#E6DFD1]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          3. PEAK NAVIGATION MENU ROW (Sticky Horizontal Bar)
      ──────────────────────────────────────────────────────────── */}
      <div className="border-t border-[#E6DFD1] bg-[#FAF7F0] hidden lg:block">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <nav className="flex items-center justify-center gap-8 text-xs font-bold text-[#423B36] tracking-wide py-2.5">
            {/* 1. Shop by Stage (Mega Menu) */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('stage')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center gap-1.5 py-1.5 hover:text-[#1E3A2F] transition-colors">
                <span>Shop by Stage</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#776D66]" />
              </button>

              {activeMegaMenu === 'stage' && (
                <div className="absolute top-full -left-12 w-[720px] rounded-xl border border-[#D9CDBF] bg-white p-6 shadow-2xl animate-in fade-in duration-150 z-50">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-7 space-y-2">
                      <div className="text-[10px] uppercase font-bold text-[#776D66] tracking-wider mb-2">
                        Motherhood Gestational Stages
                      </div>
                      {STAGE_LIST.map((s) => (
                        <Link
                          key={s.key}
                          href={`/stage/${s.slug}`}
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center justify-between rounded-lg p-2.5 hover:bg-[#F3EFE6] border border-transparent hover:border-[#D9CDBF] transition-all group"
                        >
                          <div>
                            <div className="font-serif font-bold text-[#211D1A] group-hover:text-[#1E3A2F] text-sm">
                              {s.title}
                            </div>
                            <div className="text-[11px] text-[#776D66]">
                              {s.weekRange} · {s.shortDescription.slice(0, 48)}...
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#D9CDBF] group-hover:text-[#1E3A2F] transition-colors" />
                        </Link>
                      ))}
                    </div>

                    <div className="col-span-5 rounded-xl bg-[#FAF7F0] p-4 border border-[#E6DFD1] flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A84D35] block mb-1">
                          Doctor Curated
                        </span>
                        <h4 className="font-serif font-bold text-[#211D1A] text-base">
                          Stage Starter Kits
                        </h4>
                        <p className="text-xs text-[#574F49] mt-1 leading-relaxed">
                          Low-risk 7-day trials with routine eating guides and bundle savings.
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#E6DFD1]">
                        <Link
                          href="/kits"
                          onClick={() => setActiveMegaMenu(null)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F] hover:underline"
                        >
                          <span>Explore All Stage Kits</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Shop by Need (Mega Menu) */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('need')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center gap-1.5 py-1.5 hover:text-[#1E3A2F] transition-colors">
                <span>Shop by Need</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#776D66]" />
              </button>

              {activeMegaMenu === 'need' && (
                <div className="absolute top-full -left-20 w-[680px] rounded-xl border border-[#D9CDBF] bg-white p-6 shadow-2xl animate-in fade-in duration-150 z-50">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-7 space-y-1.5">
                      <div className="text-[10px] uppercase font-bold text-[#776D66] tracking-wider mb-2">
                        Targeted Maternal Concerns
                      </div>
                      {NEED_LIST.map((n) => (
                        <Link
                          key={n.key}
                          href={`/need/${n.slug}`}
                          onClick={() => setActiveMegaMenu(null)}
                          className="block rounded-lg p-2 hover:bg-[#F3EFE6] border border-transparent hover:border-[#D9CDBF] transition-all group"
                        >
                          <div className="font-serif font-bold text-[#211D1A] group-hover:text-[#1E3A2F] text-xs">
                            {n.title}
                          </div>
                          <div className="text-[10px] text-[#776D66]">
                            Addresses: {n.customerSymptom}
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="col-span-5 rounded-xl bg-[#EEF3EF] p-4 border border-[#BFD3C4] flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#486252] block mb-1">
                          Need Guidance?
                        </span>
                        <h4 className="font-serif font-bold text-[#211D1A] text-base">
                          Personal Nutrition Finder
                        </h4>
                        <p className="text-xs text-[#574F49] mt-1 leading-relaxed">
                          Answer 5 questions to receive your doctor-reviewed plan tailored to your stage.
                        </p>
                      </div>
                      <Link
                        href="/quiz"
                        onClick={() => setActiveMegaMenu(null)}
                        className="mt-4 rounded-lg bg-[#1E3A2F] text-white text-xs font-semibold py-2.5 px-3 text-center hover:bg-[#152820] transition-all"
                      >
                        Start 90s Plan Finder
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Products */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('products')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center gap-1.5 py-1.5 hover:text-[#1E3A2F] transition-colors">
                <span>Products</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#776D66]" />
              </button>

              {activeMegaMenu === 'products' && (
                <div className="absolute top-full left-0 w-64 rounded-xl border border-[#D9CDBF] bg-white p-3 shadow-xl animate-in fade-in duration-150 z-50">
                  <div className="text-[10px] uppercase font-bold text-[#776D66] tracking-wider px-2 py-1">
                    Catalogue Formats
                  </div>
                  <Link
                    href="/products"
                    onClick={() => setActiveMegaMenu(null)}
                    className="block rounded-lg px-3 py-2 text-xs font-bold text-[#1E3A2F] bg-[#EEF3EF] hover:bg-[#E3ECE5] mb-1"
                  >
                    All Formulations (Stage & Need)
                  </Link>
                  <Link
                    href="/stage/second-trimester"
                    onClick={() => setActiveMegaMenu(null)}
                    className="block rounded-lg px-3 py-2 text-xs font-semibold text-[#423B36] hover:bg-[#F3EFE6] hover:text-[#1E3A2F]"
                  >
                    Handcrafted Laddus
                  </Link>
                  <Link
                    href="/kits"
                    onClick={() => setActiveMegaMenu(null)}
                    className="block rounded-lg px-3 py-2 text-xs font-semibold text-[#423B36] hover:bg-[#F3EFE6] hover:text-[#1E3A2F]"
                  >
                    Stage Starter Kits
                  </Link>
                  <Link
                    href="/kits"
                    onClick={() => setActiveMegaMenu(null)}
                    className="block rounded-lg px-3 py-2 text-xs font-semibold text-[#423B36] hover:bg-[#F3EFE6] hover:text-[#1E3A2F]"
                  >
                    Postpartum 40-Day Care Bundles
                  </Link>
                  <Link
                    href="/where-to-buy"
                    onClick={() => setActiveMegaMenu(null)}
                    className="block rounded-lg px-3 py-2 text-xs font-semibold text-[#423B36] hover:bg-[#F3EFE6] hover:text-[#1E3A2F]"
                  >
                    Where to Buy (D2C & Amazon)
                  </Link>
                </div>
              )}
            </div>

            {/* 4. Find My Plan (Peak Highlight Pill) */}
            <Link
              href="/quiz"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#1E3A2F] text-white px-4 py-1 text-xs font-bold hover:bg-[#152820] shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9DBDA6]" />
              <span>Find My Plan</span>
            </Link>

            {/* 5. Clinical Advisory */}
            <Link href="/doctors" className="hover:text-[#1E3A2F] transition-colors py-1.5">
              Clinical Advisory
            </Link>

            {/* 6. Learn */}
            <Link href="/learn" className="hover:text-[#1E3A2F] transition-colors py-1.5">
              Maternal Journal
            </Link>

            {/* 7. Our Story */}
            <Link href="/our-story" className="hover:text-[#1E3A2F] transition-colors py-1.5">
              Our Story
            </Link>

            {/* 8. Where to Buy */}
            <Link href="/where-to-buy" className="hover:text-[#1E3A2F] transition-colors py-1.5">
              Where to Buy
            </Link>
          </nav>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          4. MOBILE SLIDE-OVER NAVIGATION
      ──────────────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E6DFD1] bg-white p-5 animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <div className="mb-4">
            <Link
              href="/quiz"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#1E3A2F] py-3 text-xs font-bold text-white shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#9DBDA6]" />
              <span>Find My Stage Plan (90 Seconds)</span>
            </Link>
          </div>

          <div className="space-y-4 pt-2 text-xs font-semibold text-[#423B36]">
            <div>
              <div className="text-[10px] uppercase font-bold text-[#776D66] tracking-wider mb-2">
                Shop by Stage
              </div>
              <div className="grid grid-cols-2 gap-2">
                {STAGE_LIST.map((s) => (
                  <Link
                    key={s.key}
                    href={`/stage/${s.slug}`}
                    onClick={() => {
                      setStage(s.key);
                      setMobileMenuOpen(false);
                    }}
                    className="rounded-lg bg-[#FAF7F0] p-2.5 border border-[#E6DFD1] text-[#211D1A]"
                  >
                    <div className="font-bold text-xs">{s.title}</div>
                    <div className="text-[10px] text-[#776D66]">{s.weekRange}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold text-[#776D66] tracking-wider mb-2">
                Shop by Need
              </div>
              <div className="space-y-1">
                {NEED_LIST.slice(0, 5).map((n) => (
                  <Link
                    key={n.key}
                    href={`/need/${n.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg bg-[#FAF7F0] border border-[#E6DFD1] text-xs"
                  >
                    <div className="font-bold text-[#211D1A]">{n.title}</div>
                    <div className="text-[10px] text-[#776D66]">{n.customerSymptom}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#E6DFD1] space-y-1.5">
              <Link
                href="/kits"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 rounded-lg bg-[#FAF7F0] border border-[#E6DFD1] font-semibold"
              >
                Stage Starter Kits & Jaapa Programmes
              </Link>
              <Link
                href="/doctors"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 rounded-lg bg-[#FAF7F0] border border-[#E6DFD1] font-semibold flex items-center justify-between"
              >
                <span>Medical Advisory Panel</span>
                <ShieldCheck className="w-4 h-4 text-[#4D826E]" />
              </Link>
              <Link
                href="/learn"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 rounded-lg bg-[#FAF7F0] border border-[#E6DFD1] font-semibold"
              >
                Maternal Journal & Articles
              </Link>
              <Link
                href="/our-story"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 rounded-lg bg-[#FAF7F0] border border-[#E6DFD1] font-semibold"
              >
                Our Story & Heritage
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
      />
    </header>
  );
};
