'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/catalog';
import { STAGE_LIST, STAGES } from '@/data/stages';
import { NEED_LIST } from '@/data/needs';
import { ProductCard } from '@/components/product/ProductCard';
import { Product, StageKey } from '@/types';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  RotateCcw,
} from 'lucide-react';

export default function AllProductsPage() {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedNeed, setSelectedNeed] = useState<string>('all');
  const [selectedForm, setSelectedForm] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Compute filtered & sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSummary = product.stageBenefitSummary?.toLowerCase().includes(query);
        const matchesIngredient = product.ingredients?.some((i) => i.name.toLowerCase().includes(query));
        if (!matchesName && !matchesSummary && !matchesIngredient) return false;
      }

      // 2. Stage Filter (PRD Stage-first hierarchy)
      if (selectedStage !== 'all') {
        if (!product.stageTags.includes(selectedStage as any)) return false;
      }

      // 3. Need Filter
      if (selectedNeed !== 'all') {
        if (!product.needTags.includes(selectedNeed as any)) return false;
      }

      // 4. Form Filter
      if (selectedForm !== 'all') {
        if (product.form !== selectedForm) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') {
        return (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0);
      }
      if (sortBy === 'price_high') {
        return (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0);
      }
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      // Default: Featured
      return (b.isHero ? 1 : 0) - (a.isHero ? 1 : 0);
    });
  }, [searchQuery, selectedStage, selectedNeed, selectedForm, sortBy]);

  const activeFilterCount =
    (selectedStage !== 'all' ? 1 : 0) +
    (selectedNeed !== 'all' ? 1 : 0) +
    (selectedForm !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStage('all');
    setSelectedNeed('all');
    setSelectedForm('all');
    setSortBy('featured');
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#211D1A]">
      {/* ────────────────────────────────────────────────────────────
          1. BREADCRUMBS & HERO HEADER
      ──────────────────────────────────────────────────────────── */}
      <div className="border-b border-[#E6DFD5] bg-white py-8 sm:py-12">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Breadcrumb path */}
          <nav className="flex items-center gap-2 text-xs text-[#776D66] mb-3">
            <Link href="/" className="hover:text-[#1E3A2F] transition-colors">Home</Link>
            <span>/</span>
            <span className="font-semibold text-[#211D1A]">All Formulations</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-1">
                Stage-First Product Catalogue
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1D1D1D]">
                Nourishment by <span className="italic font-normal text-[#1E3A2F]">Stage &amp; Need</span>.
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#66615D] max-w-2xl leading-relaxed">
                Explore doctor-reviewed Ayurvedic recipes handcrafted with A2 Bilona cow ghee, whole dry fruits, and zero refined sugar. Filter by gestational stage or physiological need.
              </p>
            </div>

            {/* Nutrition Quiz Prompt Pill */}
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm transition-all shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9DBEA0]" />
              <span>Find My Plan (2 Mins)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          2. STAGE PILL FAST SELECTOR (PRD Stage-first hierarchy)
      ──────────────────────────────────────────────────────────── */}
      <div className="border-b border-[#E6DFD5] bg-white sticky top-[68px] z-20 shadow-xs">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-xs font-bold uppercase tracking-wider text-[#776D66] mr-2 flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-[#1E3A2F]" />
              Stage:
            </span>
            <button
              onClick={() => setSelectedStage('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedStage === 'all'
                  ? 'bg-[#1E3A2F] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#66615D] hover:text-[#211D1A] hover:bg-[#F3EFE6]'
              }`}
            >
              All Stages ({PRODUCTS.length})
            </button>
            {STAGE_LIST.map((s) => {
              const count = PRODUCTS.filter((p) => p.stageTags.includes(s.key)).length;
              return (
                <button
                  key={s.key}
                  onClick={() => setSelectedStage(s.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedStage === s.key
                      ? 'bg-[#1E3A2F] text-white shadow-xs'
                      : 'bg-[#FAF7F2] text-[#66615D] hover:text-[#211D1A] hover:bg-[#F3EFE6]'
                  }`}
                >
                  {s.title} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          3. MAIN LAYOUT: FILTERS & PRODUCT GRID
      ──────────────────────────────────────────────────────────── */}
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12">
        {/* Controls Toolbar: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl border border-[#E6DFD5] shadow-xs">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#776D66] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search formulations, ingredients, or symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-lg border border-[#D9CDBF] bg-[#FAF7F2] text-xs text-[#211D1A] placeholder-[#8A8078] focus:outline-none focus:ring-2 focus:ring-[#1E3A2F] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#776D66] hover:text-[#211D1A]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#D9CDBF] bg-[#FAF7F2] text-xs font-bold text-[#211D1A]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#1E3A2F]" />
              <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#776D66] font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="px-3 py-2 rounded-lg border border-[#D9CDBF] bg-[#FAF7F2] text-xs font-semibold text-[#211D1A] focus:outline-none focus:ring-2 focus:ring-[#1E3A2F] cursor-pointer"
              >
                <option value="featured">Featured / Hero Formulations</option>
                <option value="rating">Highest Rated</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white p-6 rounded-card border border-[#E6DFD5] shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E6DFD5] pb-3">
              <span className="font-serif font-bold text-sm text-[#211D1A]">
                Refine by Need & Form
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-[#C85A32] hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {/* Filter Group: Maternal Need */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1E3A2F] block">
                Maternal Need / Symptom
              </label>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedNeed('all')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedNeed === 'all'
                      ? 'bg-[#EEF3EF] text-[#1E3A2F] font-bold'
                      : 'text-[#66615D] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <span>All Needs</span>
                  {selectedNeed === 'all' && <Check className="w-3.5 h-3.5" />}
                </button>
                {NEED_LIST.map((n) => (
                  <button
                    key={n.key}
                    onClick={() => setSelectedNeed(n.key)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedNeed === n.key
                        ? 'bg-[#EEF3EF] text-[#1E3A2F] font-bold'
                        : 'text-[#66615D] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>{n.title}</span>
                    {selectedNeed === n.key && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Recipe Form */}
            <div className="space-y-2.5 pt-4 border-t border-[#E6DFD5]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1E3A2F] block">
                Preparation Format
              </label>
              <div className="space-y-1.5">
                {[
                  { key: 'all', label: 'All Formats' },
                  { key: 'laddu', label: 'Handcrafted Laddus' },
                  { key: 'panjiri', label: 'Restorative Panjiri' },
                  { key: 'tea', label: 'Herbal Infusions & Teas' },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setSelectedForm(f.key)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedForm === f.key
                        ? 'bg-[#EEF3EF] text-[#1E3A2F] font-bold'
                        : 'text-[#66615D] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>{f.label}</span>
                    {selectedForm === f.key && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Preserved Duplicate Groups Transparency Note */}
            <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] text-[11px] text-[#776D66] leading-relaxed">
              <strong className="text-[#211D1A] block font-semibold mb-0.5">
                Canonical Mapping Note:
              </strong>
              Each distinct formulation is preserved. Products with stage-specific editions are organized by clinical gestational safety.
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <main className="lg:col-span-9">
            {/* Active Filters Pill Row */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-[#776D66] font-medium">Active Filters:</span>
                {selectedStage !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1E3A2F] text-white text-xs font-semibold">
                    Stage: {STAGES[selectedStage as StageKey]?.title || selectedStage}
                    <button onClick={() => setSelectedStage('all')}><X className="w-3 h-3 ml-1" /></button>
                  </span>
                )}
                {selectedNeed !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1E3A2F] text-white text-xs font-semibold">
                    Need: {NEED_LIST.find((n) => n.key === selectedNeed)?.title || selectedNeed}
                    <button onClick={() => setSelectedNeed('all')}><X className="w-3 h-3 ml-1" /></button>
                  </span>
                )}
                {selectedForm !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1E3A2F] text-white text-xs font-semibold">
                    Form: {selectedForm}
                    <button onClick={() => setSelectedForm('all')}><X className="w-3 h-3 ml-1" /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1E3A2F] text-white text-xs font-semibold">
                    &ldquo;{searchQuery}&rdquo;
                    <button onClick={() => setSearchQuery('')}><X className="w-3 h-3 ml-1" /></button>
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#C85A32] font-bold hover:underline ml-2"
                >
                  Reset All
                </button>
              </div>
            )}

            {/* Results Counter */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs text-[#776D66] font-semibold">
                Showing {filteredProducts.length} doctor-reviewed formulation{filteredProducts.length === 1 ? '' : 's'}
              </span>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    userStageKey={selectedStage !== 'all' ? selectedStage : undefined}
                  />
                ))}
              </div>
            ) : (
              /* High-Craft Empty State */
              <div className="rounded-card border border-[#E6DFD5] bg-white p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#D9CDBF] flex items-center justify-center mx-auto text-[#776D66]">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#211D1A]">
                  No matching formulations found
                </h3>
                <p className="text-xs sm:text-sm text-[#66615D] max-w-md mx-auto leading-relaxed">
                  We could not find formulations matching your active filters. Try clearing your search query or selecting a different gestational stage.
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 rounded-full bg-[#1E3A2F] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#152820] transition-colors"
                  >
                    View All Products
                  </button>
                  <Link
                    href="/quiz"
                    className="px-6 py-2.5 rounded-full border border-[#211D1A] bg-white text-[#211D1A] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF7F2] transition-colors"
                  >
                    Take Nutrition Finder
                  </Link>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          4. MOBILE FILTERS MODAL / DRAWER
      ──────────────────────────────────────────────────────────── */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-[#211D1A]/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200">
          <div className="bg-white rounded-t-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#E6DFD5]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#1E3A2F]" />
                <span className="font-serif font-bold text-base text-[#211D1A]">
                  Filter Formulations
                </span>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-[#776D66] hover:text-[#211D1A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 overflow-y-auto space-y-6">
              {/* Stage Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                  Gestational Stage
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedStage('all')}
                    className={`p-2 rounded-lg text-xs font-semibold border text-left ${
                      selectedStage === 'all'
                        ? 'border-[#1E3A2F] bg-[#EEF3EF] text-[#1E3A2F]'
                        : 'border-[#E6DFD5] text-[#66615D]'
                    }`}
                  >
                    All Stages
                  </button>
                  {STAGE_LIST.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setSelectedStage(s.key)}
                      className={`p-2 rounded-lg text-xs font-semibold border text-left ${
                        selectedStage === s.key
                          ? 'border-[#1E3A2F] bg-[#EEF3EF] text-[#1E3A2F]'
                          : 'border-[#E6DFD5] text-[#66615D]'
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Need Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                  Maternal Need
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedNeed('all')}
                    className={`p-2 rounded-lg text-xs font-semibold border text-left ${
                      selectedNeed === 'all'
                        ? 'border-[#1E3A2F] bg-[#EEF3EF] text-[#1E3A2F]'
                        : 'border-[#E6DFD5] text-[#66615D]'
                    }`}
                  >
                    All Needs
                  </button>
                  {NEED_LIST.map((n) => (
                    <button
                      key={n.key}
                      onClick={() => setSelectedNeed(n.key)}
                      className={`p-2 rounded-lg text-xs font-semibold border text-left ${
                        selectedNeed === n.key
                          ? 'border-[#1E3A2F] bg-[#EEF3EF] text-[#1E3A2F]'
                          : 'border-[#E6DFD5] text-[#66615D]'
                      }`}
                    >
                      {n.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-[#E6DFD5] flex items-center gap-3 bg-[#FAF7F2]">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 rounded-full border border-[#D9CDBF] bg-white text-xs font-bold uppercase tracking-wider text-[#211D1A]"
              >
                Clear All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-full bg-[#1E3A2F] text-white text-xs font-bold uppercase tracking-wider shadow-sm"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
