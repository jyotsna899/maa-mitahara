'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/catalog';
import { STAGES } from '@/data/stages';
import { PricePer100g } from '@/components/product/PricePer100g';
import { ClinicalStatusBadge } from '@/components/safety/ClinicalStatusBadge';
import { MedicalDisclaimer } from '@/components/safety/MedicalDisclaimer';
import { ProductCard } from '@/components/product/ProductCard';
import { shopifyService } from '@/services/mock/shopifyService';
import { Product } from '@/types';
import { getProductImages } from '@/utils/productImages';
import {
  Star,
  ShieldCheck,
  Clock,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  ArrowRight,
  Info,
  Check,
  Wheat,
  FileCheck,
  AlertTriangle,
  Leaf,
  Award,
  Truck,
  Plus,
  Minus,
  Heart,
  Share2,
} from 'lucide-react';

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-24 text-center">
        <h2 className="text-2xl font-serif font-bold text-[#211D1A]">
          Preparation Record Under Audit
        </h2>
        <p className="mt-2 text-sm text-[#776D66]">
          This product is undergoing duplicate group consolidation or clinical sign-off.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-[#1E3A2F] text-white px-6 py-3 text-xs font-semibold"
        >
          Return to Stage Discovery
        </Link>
      </div>
    );
  }

  // Gallery state
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const images = getProductImages(product.slug).gallery;

  // Variant & purchase state
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [purchaseType, setPurchaseType] = useState<'onetime' | 'sub_2w' | 'sub_4w'>('onetime');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>('benefits');

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  // Cross-sell items from the same stage
  const crossSellProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.stageTags.some((t) => product.stageTags.includes(t))
  ).slice(0, 4);

  // Frequently bought together item
  const fbtItem = crossSellProducts[0];
  const [fbtIncluded, setFbtIncluded] = useState(true);

  // Pricing calculations
  const isSubscription = purchaseType !== 'onetime';
  const subDiscountPercent = purchaseType === 'sub_2w' ? 10 : purchaseType === 'sub_4w' ? 20 : 0;
  const effectivePrice = Math.round(selectedVariant.price * (1 - subDiscountPercent / 100));

  const handleAddToCart = () => {
    shopifyService.addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      sizeLabel: selectedVariant.sizeLabel,
      price: effectivePrice,
      quantity,
      isSubscription,
      subscriptionIntervalWeeks: purchaseType === 'sub_2w' ? 2 : purchaseType === 'sub_4w' ? 4 : undefined,
      stageTag: product.stageTags[0],
    });

    if (fbtIncluded && fbtItem) {
      shopifyService.addToCart({
        productId: fbtItem.id,
        variantId: fbtItem.variants[0].id,
        name: fbtItem.name,
        sizeLabel: fbtItem.variants[0].sizeLabel,
        price: fbtItem.variants[0].price,
        quantity: 1,
        isSubscription: false,
        stageTag: fbtItem.stageTags[0],
      });
    }

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  // Next stage determination
  const primaryStageKey = product.stageTags[0];
  const nextStageKey = STAGES[primaryStageKey]?.nextStageKey;
  const nextStageDef = nextStageKey ? STAGES[nextStageKey] : null;

  return (
    <div className="bg-[#FAF7F2] text-[#211D1A]">
      {/* Breadcrumb Bar (Stage -> Need -> Product Hierarchy) */}
      <div className="border-b border-[#E6DFD5] bg-white py-3">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center gap-2 text-xs text-[#776D66] overflow-x-auto scrollbar-none">
          <Link href="/" className="hover:text-[#1E3A2F]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#1E3A2F]">All Formulations</Link>
          <span>/</span>
          <Link href={`/stage/${primaryStageKey.replace('_', '-')}`} className="hover:text-[#1E3A2F] whitespace-nowrap">
            {STAGES[primaryStageKey]?.title || primaryStageKey.replace('_', ' ')}
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#211D1A] truncate">
            {product.name.replace(/\s*\((Mom to Be|Postnatal Edition|Mom-to-Be)\)/gi, '').trim()}
          </span>
        </div>
      </div>

      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-14 space-y-16">
        {/* ────────────────────────────────────────────────────────────
            1. EURUS STICKY 2-COLUMN PDP LAYOUT
        ──────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Sticky Image Gallery & Botanical Badges */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            {/* Main 3:4 Aspect Portrait Presentation Container */}
            <div className="relative aspect-portrait w-full rounded-[16px] bg-[#F6F2EC] border border-[#E6DFD5] overflow-hidden shadow-sm flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#F7F3ED] to-[#EFE9DF]">
              {images.length > 0 && images[activeImageIdx] ? (
                <img
                  src={images[activeImageIdx]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-24 h-24 rounded-full bg-white/90 border border-[#D9CDBF] flex items-center justify-center shadow-sm mb-4">
                    <span className="font-serif text-4xl font-bold text-[#1E3A2F]">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#776D66] block">
                    {product.form.toUpperCase()} · SMALL BATCH
                  </span>
                  <span className="font-serif text-xl font-bold text-[#211D1A] mt-2 max-w-[260px] leading-snug">
                    {product.name}
                  </span>
                  <span className="text-xs text-[#A84D35] font-semibold mt-3 px-3.5 py-1 rounded-full bg-white border border-[#E6DFD5]">
                    A2 Bilona Cow Ghee & Whole Spices
                  </span>
                </div>
              )}

              {/* Stage Pill Overlay */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center rounded-full bg-white/95 text-[#211D1A] px-3.5 py-1 text-xs font-bold uppercase tracking-wider shadow-sm border border-[#E6DFD5]">
                  {product.stageTags[0].replace('_', ' ')}
                </span>
              </div>

              {selectedVariant.isTrialPack && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="rounded-full bg-[#C85A32] text-white px-3 py-1 text-xs font-bold shadow-sm">
                    Trial Size Available
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip (if gallery exists) */}
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`aspect-portrait rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx ? 'border-[#1E3A2F] ring-2 ring-[#1E3A2F]/20' : 'border-[#E6DFD5] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Purity & Sourcing Guarantee Strip */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
              <div className="p-3 rounded-card bg-white border border-[#E6DFD5]">
                <Leaf className="w-4 h-4 text-[#1E3A2F] mx-auto mb-1" />
                <span className="font-bold text-[#211D1A] block">A2 Cow Ghee</span>
                <span className="text-[10px] text-[#776D66]">Bilona churned</span>
              </div>
              <div className="p-3 rounded-card bg-white border border-[#E6DFD5]">
                <ShieldCheck className="w-4 h-4 text-[#1E3A2F] mx-auto mb-1" />
                <span className="font-bold text-[#211D1A] block">Zero White Sugar</span>
                <span className="text-[10px] text-[#776D66]">Refined sugar free</span>
              </div>
              <div className="p-3 rounded-card bg-white border border-[#E6DFD5]">
                <Award className="w-4 h-4 text-[#1E3A2F] mx-auto mb-1" />
                <span className="font-bold text-[#211D1A] block">Doctor Sign-Off</span>
                <span className="text-[10px] text-[#776D66]">Clinical evaluation</span>
              </div>
            </div>
          </div>

          {/* Right: Merchandising Details & Purchase Controller */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header Badges & Rating */}
            <div className="flex flex-wrap items-center gap-2">
              <ClinicalStatusBadge
                status={product.clinicalReviewStatus}
                reviewInfo={product.clinicalReview}
              />
              {product.rating > 0 && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#211D1A] bg-white px-3 py-1 rounded-full border border-[#E6DFD5]">
                  <div className="flex items-center text-[#D9943B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current text-[#D9943B]" />
                    ))}
                  </div>
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-[#776D66] font-normal">({product.reviewCount} reviews)</span>
                </div>
              )}
            </div>

            {/* Product Title & Stage Benefit */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">
                  {product.needTags[0]?.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-[#D9CDBF]">·</span>
                <span className="text-xs font-semibold text-[#1E3A2F]">
                  {STAGES[primaryStageKey]?.title || primaryStageKey}
                </span>
                {product.canonicalGroupId && (
                  <span className="text-[10px] text-[#776D66] bg-white px-2 py-0.5 rounded-full border border-[#E6DFD5]">
                    Canonical Recipe
                  </span>
                )}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1A] tracking-tight">
                {product.name.replace(/\s*\((Mom to Be|Postnatal Edition|Mom-to-Be)\)/gi, '').trim()}
              </h1>
              <p className="mt-2 text-sm text-[#1E3A2F] font-semibold leading-relaxed">
                {product.stageBenefitSummary}
              </p>
            </div>

            {/* Price & Price per 100g */}
            <div className="flex items-baseline gap-3 pb-4 border-b border-[#E6DFD5]">
              <span className="font-serif text-3xl font-bold text-[#211D1A]">
                ₹{effectivePrice}
              </span>
              {isSubscription && (
                <span className="text-base text-[#776D66] line-through">
                  ₹{selectedVariant.price}
                </span>
              )}
              <PricePer100g
                price={effectivePrice}
                weightGrams={selectedVariant.weightGrams}
                className="text-xs font-semibold text-[#776D66]"
              />
              <span className="text-xs text-[#776D66]">
                ({selectedVariant.sizeLabel})
              </span>
            </div>

            {/* Pack Size Selector Pills */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#211D1A]">
                <span>Select Packaging Size:</span>
                <span className="text-[#1E3A2F] font-normal">
                  {selectedVariant.isTrialPack ? 'Recommended to evaluate palate tolerance' : 'Recommended 1-month routine'}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`rounded-card border p-3 text-left transition-all ${
                      selectedVariant.id === variant.id
                        ? 'border-[#1E3A2F] bg-white shadow-sm ring-2 ring-[#1E3A2F]/20'
                        : 'border-[#E6DFD5] bg-white/60 hover:bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#211D1A]">
                      {variant.sizeLabel}
                    </div>
                    <div className="mt-1 flex items-baseline justify-between text-xs">
                      <span className="font-semibold text-[#211D1A]">₹{variant.price}</span>
                      <PricePer100g price={variant.price} weightGrams={variant.weightGrams} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Eurus Tiered Subscribe & Save Radio Box */}
            <div className="rounded-card border border-[#E6DFD5] bg-white p-5 space-y-3 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-[#211D1A]">
                Choose Purchase Option:
              </div>

              {/* Option 1: One-Time Purchase */}
              <label className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                purchaseType === 'onetime'
                  ? 'border-[#1E3A2F] bg-[#FAF7F2] ring-1 ring-[#1E3A2F]'
                  : 'border-[#E6DFD5] hover:bg-[#FAF7F2]'
              }`}>
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="purchase_type"
                    checked={purchaseType === 'onetime'}
                    onChange={() => setPurchaseType('onetime')}
                    className="text-[#1E3A2F] focus:ring-[#1E3A2F]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#211D1A] block">One-time Purchase</span>
                    <span className="text-[11px] text-[#776D66]">Standard order dispatch</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#211D1A]">₹{selectedVariant.price}</span>
              </label>

              {/* Option 2: Fortnightly Subscription (Save 10%) */}
              <label className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                purchaseType === 'sub_2w'
                  ? 'border-[#1E3A2F] bg-[#FAF7F2] ring-1 ring-[#1E3A2F]'
                  : 'border-[#E6DFD5] hover:bg-[#FAF7F2]'
              }`}>
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="purchase_type"
                    checked={purchaseType === 'sub_2w'}
                    onChange={() => setPurchaseType('sub_2w')}
                    className="text-[#1E3A2F] focus:ring-[#1E3A2F]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#211D1A] flex items-center gap-1.5">
                      Deliver Every 2 Weeks
                      <span className="px-1.5 py-0.5 rounded-full bg-[#C85A32] text-white text-[9px] font-bold">
                        SAVE 10%
                      </span>
                    </span>
                    <span className="text-[11px] text-[#776D66]">Fresh roasted batch every 14 days</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#1E3A2F]">
                  ₹{Math.round(selectedVariant.price * 0.9)}
                </span>
              </label>

              {/* Option 3: Monthly Subscription (Save 20%) */}
              <label className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                purchaseType === 'sub_4w'
                  ? 'border-[#1E3A2F] bg-[#FAF7F2] ring-1 ring-[#1E3A2F]'
                  : 'border-[#E6DFD5] hover:bg-[#FAF7F2]'
              }`}>
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="purchase_type"
                    checked={purchaseType === 'sub_4w'}
                    onChange={() => setPurchaseType('sub_4w')}
                    className="text-[#1E3A2F] focus:ring-[#1E3A2F]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#211D1A] flex items-center gap-1.5">
                      Deliver Every 4 Weeks (Monthly Care)
                      <span className="px-1.5 py-0.5 rounded-full bg-[#1E3A2F] text-white text-[9px] font-bold">
                        SAVE 20%
                      </span>
                    </span>
                    <span className="text-[11px] text-[#776D66]">Auto-transitions at trimester boundary</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#1E3A2F]">
                  ₹{Math.round(selectedVariant.price * 0.8)}
                </span>
              </label>
            </div>

            {/* Quantity + Add to Cart Actions */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Controller */}
                <div className="flex items-center border border-[#E6DFD5] rounded-full bg-white px-3 py-2 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#776D66] hover:text-[#211D1A] p-1"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-[#211D1A]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[#776D66] hover:text-[#211D1A] p-1"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add to Cart — ₹{effectivePrice * quantity}
                  </span>
                </button>
              </div>

              {addedToast && (
                <div className="rounded-lg bg-[#EEF3EF] border border-[#BFD3C4] p-3 text-xs font-semibold text-[#1E3A2F] text-center animate-in fade-in duration-150">
                  ✓ Added to your Stage Care cart! Orders over ₹999 unlock Free Delivery.
                </div>
              )}
            </div>

            {/* Frequently Bought Together Cross-Sell Widget */}
            {fbtItem && (
              <div className="rounded-card border border-[#E6DFD5] bg-white p-4 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block">
                  Frequently Bought Together
                </span>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={fbtIncluded}
                    onChange={(e) => setFbtIncluded(e.target.checked)}
                    className="w-4 h-4 text-[#1E3A2F] rounded border-[#D9CDBF] focus:ring-[#1E3A2F]"
                  />
                  <div className="w-12 h-14 rounded overflow-hidden bg-[#F6F2EC] shrink-0 border border-[#E6DFD5] flex flex-col items-center justify-center p-1.5 text-center bg-gradient-to-b from-[#FAF7F2] to-[#EFE9DF]">
                    <span className="font-serif text-xs font-bold text-[#1E3A2F]">
                      {fbtItem.name.charAt(0)}
                    </span>
                    <span className="text-[7px] uppercase tracking-wider text-[#776D66] font-bold">
                      Pair
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-xs font-bold text-[#211D1A]">
                      {fbtItem.name}
                    </h4>
                    <span className="text-[11px] text-[#776D66]">
                      +₹{fbtItem.variants[0]?.price || 490} · Stage Pairing
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* "Why It's in Your Stage Plan" */}
            <div className="pt-2 border-t border-[#E6DFD5]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#211D1A] block mb-2">
                Why it’s in your stage plan:
              </span>
              <ul className="space-y-1.5 text-xs text-[#66615D]">
                {product.whyInYourPlan.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3A2F] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────
            2. COLLAPSIBLE CLINICAL ACCORDIONS
        ──────────────────────────────────────────────────────────── */}
        <div className="rounded-card border border-[#E6DFD5] bg-white divide-y divide-[#E6DFD5] shadow-sm">
          {/* Accordion 1: Benefits */}
          <div>
            <button
              onClick={() => toggleAccordion('benefits')}
              className="w-full p-5 text-left font-serif font-bold text-base text-[#211D1A] flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
            >
              <span>Clinical Benefits & Stage Purpose</span>
              {openAccordion === 'benefits' ? <ChevronUp className="w-4 h-4 text-[#776D66]" /> : <ChevronDown className="w-4 h-4 text-[#776D66]" />}
            </button>
            {openAccordion === 'benefits' && (
              <div className="p-5 pt-0 text-xs sm:text-sm text-[#66615D] leading-relaxed space-y-3">
                <p>{product.stageBenefitSummary}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5]">
                    <strong className="text-xs font-bold text-[#211D1A] block mb-1">Target Need</strong>
                    <span>{product.needTags.join(', ').replace(/_/g, ' ')}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5]">
                    <strong className="text-xs font-bold text-[#211D1A] block mb-1">Stage Eligibility</strong>
                    <span>{product.stageTags.join(', ').replace(/_/g, ' ')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 2: Ingredients */}
          <div>
            <button
              onClick={() => toggleAccordion('ingredients')}
              className="w-full p-5 text-left font-serif font-bold text-base text-[#211D1A] flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
            >
              <span>Full Ingredients & Whole Food Sourcing</span>
              {openAccordion === 'ingredients' ? <ChevronUp className="w-4 h-4 text-[#776D66]" /> : <ChevronDown className="w-4 h-4 text-[#776D66]" />}
            </button>
            {openAccordion === 'ingredients' && (
              <div className="p-5 pt-0 text-xs sm:text-sm text-[#66615D] leading-relaxed space-y-3">
                <ul className="divide-y divide-[#E6DFD5] max-w-xl">
                  {product.ingredients.map((ing, idx) => (
                    <li key={idx} className="py-2.5 flex items-center justify-between">
                      <span className="font-semibold text-[#211D1A]">{ing.name}</span>
                      <span className="text-[#776D66]">
                        {ing.percentage || ing.sourcingNote || 'Information pending'}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="text-[11px] text-[#776D66] pt-1">
                  Central FSSAI Number: {product.fssaiNumber}
                </div>
              </div>
            )}
          </div>

          {/* Accordion 3: Nutrition */}
          <div>
            <button
              onClick={() => toggleAccordion('nutrition')}
              className="w-full p-5 text-left font-serif font-bold text-base text-[#211D1A] flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
            >
              <span>Nutritional Facts & Serving Size</span>
              {openAccordion === 'nutrition' ? <ChevronUp className="w-4 h-4 text-[#776D66]" /> : <ChevronDown className="w-4 h-4 text-[#776D66]" />}
            </button>
            {openAccordion === 'nutrition' && (
              <div className="p-5 pt-0 text-xs sm:text-sm text-[#66615D] leading-relaxed space-y-3">
                <div className="rounded-lg border border-[#E6DFD5] overflow-hidden max-w-md">
                  <table className="w-full text-left">
                    <thead className="bg-[#FAF7F2] font-bold text-[#211D1A] border-b border-[#E6DFD5]">
                      <tr>
                        <th className="p-3">Nutrient Parameter</th>
                        <th className="p-3">Amount per Serving</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6DFD5]">
                      {Object.entries(product.nutritionPerServing).map(([key, val]) => (
                        <tr key={key}>
                          <td className="p-3 capitalize font-medium text-[#211D1A]">{key}</td>
                          <td className="p-3 text-[#776D66]">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-[#776D66]">
                  Declared as per NABL-accredited laboratory test verification.
                </p>
              </div>
            )}
          </div>

          {/* Accordion 4: Doctor Serving Guidance */}
          <div>
            <button
              onClick={() => toggleAccordion('usage')}
              className="w-full p-5 text-left font-serif font-bold text-base text-[#211D1A] flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
            >
              <span>Doctor-Approved Consumption & Precautions</span>
              {openAccordion === 'usage' ? <ChevronUp className="w-4 h-4 text-[#776D66]" /> : <ChevronDown className="w-4 h-4 text-[#776D66]" />}
            </button>
            {openAccordion === 'usage' && (
              <div className="p-5 pt-0 text-xs sm:text-sm text-[#66615D] leading-relaxed space-y-3">
                {product.servingGuidance.map((sg, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] space-y-1">
                    <div className="font-bold text-[#211D1A]">{sg.quantityPerDay}</div>
                    <div className="text-[11px] text-[#1E3A2F] font-semibold">Timing: {sg.timing}</div>
                    <p className="text-xs text-[#66615D]">{sg.instructions}</p>
                  </div>
                ))}
                <div className="p-3.5 rounded-lg bg-[#FDF6F3] border border-[#F2D7CB] text-xs text-[#8A3B26]">
                  <strong>Medical Disclaimer: </strong>
                  <span>If experiencing gestational diabetes or high sensitivity, consult your obstetrician before introducing concentrated dry fruit sweets.</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────
            3. TECHNICAL SPECIFICATION MATRIX TABLE
        ──────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#211D1A]">
            Technical Formulation Specifications
          </h2>
          <div className="rounded-card border border-[#E6DFD5] bg-white overflow-hidden">
            <table className="w-full text-left text-xs sm:text-sm">
              <tbody className="divide-y divide-[#E6DFD5]">
                <tr>
                  <td className="py-3.5 px-5 font-bold text-[#211D1A] bg-[#FAF7F2] w-1/3">Form & Texture</td>
                  <td className="py-3.5 px-5 text-[#66615D] capitalize">{product.form} (Handcrafted & Round Rolled)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-[#211D1A] bg-[#FAF7F2]">Shelf Life</td>
                  <td className="py-3.5 px-5 text-[#66615D]">{product.shelfLife}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-[#211D1A] bg-[#FAF7F2]">Storage Instructions</td>
                  <td className="py-3.5 px-5 text-[#66615D]">{product.storage}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-[#211D1A] bg-[#FAF7F2]">Dietary Suitability</td>
                  <td className="py-3.5 px-5 text-[#66615D]">Vegetarian · 0% Refined Sugar · Preservative-Free</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-[#211D1A] bg-[#FAF7F2]">Allergen Disclosure</td>
                  <td className="py-3.5 px-5 text-[#66615D]">{product.allergens.join(', ')}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-[#211D1A] bg-[#FAF7F2]">FSSAI Central Status</td>
                  <td className="py-3.5 px-5 text-[#66615D]">{product.fssaiNumber}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────
            4. "WHAT TO EXPECT WITH THIS PRODUCT" (Timeline Roadmap)
        ──────────────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-1">
              Physiological Milestones
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1A]">
              What to expect with this <span className="italic font-normal text-[#1E3A2F]">product</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-card border border-[#E6DFD5] bg-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F] block">
                Weeks 1–2 · Immediate Adjustment
              </span>
              <h3 className="font-serif text-base font-bold text-[#211D1A]">
                Digestive Ease & Appetite Balance
              </h3>
              <p className="text-xs text-[#66615D] leading-relaxed">
                Initial reduction in mid-morning nausea and sweet cravings. Gentle warming spices help soothe stomach irritation without heavy gastric load.
              </p>
            </div>

            <div className="p-6 rounded-card border border-[#E6DFD5] bg-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F] block">
                Weeks 3–4 · Cellular Building
              </span>
              <h3 className="font-serif text-base font-bold text-[#211D1A]">
                Sustained Energy & Stamina
              </h3>
              <p className="text-xs text-[#66615D] leading-relaxed">
                Slow-release healthy fats from A2 cow ghee and roasted nuts establish sustained physical stamina and reduce afternoon maternal slumps.
              </p>
            </div>

            <div className="p-6 rounded-card border border-[#E6DFD5] bg-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F] block">
                Month 2+ · Long-Term Nourishment
              </span>
              <h3 className="font-serif text-base font-bold text-[#211D1A]">
                Optimal Structural Preparation
              </h3>
              <p className="text-xs text-[#66615D] leading-relaxed">
                Deep replenishment of maternal micronutrient stores supporting fetal growth, pelvic ligament tone, and postpartum healing reserve.
              </p>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────
            5. "PAIRS WELL WITH" (Cross-Selling Products)
        ──────────────────────────────────────────────────────────── */}
        {crossSellProducts.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-[#E6DFD5]">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F]">
                  Stage Synergy
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1A] mt-1">
                  Pairs Well With in {primaryStageKey.replace('_', ' ')}
                </h2>
              </div>
              <Link
                href={`/stage/${primaryStageKey.replace('_', '-')}`}
                className="text-xs font-semibold text-[#1E3A2F] hover:underline"
              >
                View Complete Stage Collection →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {crossSellProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* ────────────────────────────────────────────────────────────
            6. UPCOMING TRIMESTER ROADMAP
        ──────────────────────────────────────────────────────────── */}
        {nextStageDef && (
          <div className="rounded-[16px] border border-[#E6DFD5] bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#776D66] block">
                Upcoming Stage Roadmap
              </span>
              <h3 className="font-serif font-bold text-[#211D1A] text-lg mt-0.5">
                Next: {nextStageDef.title} ({nextStageDef.weekRange})
              </h3>
              <p className="text-xs text-[#66615D] mt-1">
                As your pregnancy advances, your routine automatically transitions to meet new physiological milestones.
              </p>
            </div>
            <Link
              href={`/stage/${nextStageDef.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#211D1A] bg-white px-5 py-2.5 text-xs font-bold text-[#211D1A] hover:bg-[#FAF7F2] shadow-sm shrink-0 uppercase tracking-wider"
            >
              <span>Preview Next Stage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <MedicalDisclaimer />
      </div>
    </div>
  );
}
