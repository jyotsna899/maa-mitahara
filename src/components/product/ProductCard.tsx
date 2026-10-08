'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { PricePer100g } from './PricePer100g';
import { QuickViewModal } from './QuickViewModal';
import { shopifyService } from '@/services/mock/shopifyService';
import { ShieldAlert, ShoppingBag, Eye, Check, ChevronRight } from 'lucide-react';
import { getProductImages } from '@/utils/productImages';

interface ProductCardProps {
  product: Product;
  userStageKey?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, userStageKey }) => {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const currentVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const isExcludedFromPregnancy = product.clinicalReviewStatus === 'not_for_pregnancy';
  const images = getProductImages(product.slug);

  // Stage match calculation: Is this relevant to user's stage?
  const isRelevantToUserStage = userStageKey ? product.stageTags.includes(userStageKey as any) : true;

  // Canonical clean naming (removes duplicate brackets like "(Mom to Be)" in the primary title display)
  const cleanDisplayName = product.name.replace(/\s*\((Mom to Be|Postnatal Edition|Mom-to-Be)\)/gi, '').trim();

  // Primary need tag formatted
  const primaryNeed = product.needTags[0]
    ? product.needTags[0]
        .split('_')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' & ')
    : 'Stage Care';

  // Primary stage label
  const primaryStageTag = product.stageTags[0];
  const stageDisplayLabel = (() => {
    switch (primaryStageTag) {
      case 'first_trimester': return '1st Trimester';
      case 'second_trimester': return '2nd Trimester';
      case 'third_trimester': return '3rd Trimester';
      case 'postpartum': return 'Postpartum Jaapa';
      case 'trying_to_conceive': return 'Pre-Conception';
      default: return 'All Trimesters';
    }
  })();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isExcludedFromPregnancy) return;

    shopifyService.addToCart({
      productId: product.id,
      variantId: currentVariant.id,
      name: cleanDisplayName,
      sizeLabel: currentVariant.sizeLabel,
      price: currentVariant.price,
      quantity: 1,
      isSubscription: false,
      stageTag: product.stageTags[0],
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <div className="group relative flex flex-col justify-between rounded-card border border-[#E6DFD5] bg-white transition-all duration-300 hover:border-[#1E3A2F] hover:shadow-md overflow-hidden">
        {/* ────────────────────────────────────────────────────────────
            1. EURUS 3:4 PORTRAIT RATIO MEDIA CONTAINER
        ──────────────────────────────────────────────────────────── */}
        <div className="relative aspect-portrait w-full overflow-hidden bg-[#FAF7F2]">
          <Link href={`/product/${product.slug}`} className="block w-full h-full focus:outline-none">
            {images.primary ? (
              <img
                src={images.primary}
                alt={cleanDisplayName}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 ease-out"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#FBF9F5] to-[#EFEAE1] group-hover:scale-102 transition-transform duration-500">
                <div className="w-14 h-14 rounded-full bg-white border border-[#D9CDBF] flex items-center justify-center shadow-sm mb-3">
                  <span className="font-serif text-xl font-bold text-[#1E3A2F]">
                    {cleanDisplayName.charAt(0)}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#776D66] block">
                  {product.form.toUpperCase()}
                </span>
                <span className="font-serif text-xs font-semibold text-[#211D1A] mt-1 max-w-[150px] leading-snug line-clamp-2">
                  {cleanDisplayName}
                </span>
                <span className="text-[9px] text-[#1E3A2F] font-bold mt-2.5 px-2.5 py-0.5 rounded-full bg-white/80 border border-[#D9CDBF]">
                  Fresh Fortnightly Batch
                </span>
              </div>
            )}
          </Link>

          {/* Top-Left: Restrained Stage / Safety Gate Badge */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none flex flex-col gap-1 items-start">
            {isExcludedFromPregnancy ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-900/95 text-white px-2.5 py-0.5 text-[10px] font-bold backdrop-blur-sm shadow-sm">
                <ShieldAlert className="w-3 h-3 text-red-300" />
                Not for Pregnancy
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-white/95 text-[#1E3A2F] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm border border-[#E6DFD5]">
                {stageDisplayLabel}
              </span>
            )}
          </div>

          {/* Top-Right: Quick View Button on Hover */}
          <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={handleOpenQuickView}
              className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-[#211D1A] shadow-md flex items-center justify-center transition-all hover:scale-110"
              aria-label="Quick View"
              title="Quick view product specs"
            >
              <Eye className="w-3.5 h-3.5 text-[#211D1A]" />
            </button>
          </div>

          {/* Desktop Eurus Slide-Up Quick Add Bar */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hidden sm:block z-20">
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isExcludedFromPregnancy}
              className="w-full bg-[#1E3A2F] hover:bg-[#152820] text-white py-2.5 px-3 text-xs font-semibold rounded-[6px] tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#9DBEA0]" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Quick Add · ₹{currentVariant.price}</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Tap Action */}
          <div className="sm:hidden absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isExcludedFromPregnancy}
              className="w-8 h-8 rounded-full bg-[#1E3A2F] text-white shadow-md flex items-center justify-center disabled:opacity-50"
              aria-label="Quick add"
            >
              {added ? <Check className="w-3.5 h-3.5 text-[#9DBEA0]" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────
            2. PRODUCT INFORMATION LAYER (Answers the 5 core questions)
        ──────────────────────────────────────────────────────────── */}
        <div className="p-4 flex flex-col flex-1 justify-between bg-white">
          <div>
            {/* Question 2: What need is it associated with? */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#776D66] mb-1">
              <span className="text-[#C85A32] uppercase tracking-wider text-[10px]">
                {primaryNeed}
              </span>
              {product.canonicalGroupId && (
                <span className="text-[9px] text-[#A39A90] font-normal" title="Preserved source listing mapped to canonical group">
                  Canonical
                </span>
              )}
            </div>

            {/* Question 3: What is the product? */}
            <Link href={`/product/${product.slug}`} className="block focus:outline-none">
              <h3 className="font-serif text-sm sm:text-[15px] font-bold text-[#211D1A] group-hover:text-[#1E3A2F] transition-colors line-clamp-1 leading-snug">
                {cleanDisplayName}
              </h3>
            </Link>

            {/* Question 5: Why should I click it? (Concise benefit summary) */}
            <p className="mt-1 text-xs text-[#66615D] line-clamp-2 leading-relaxed">
              {product.stageBenefitSummary}
            </p>

            {/* Variant Size Selector (if multiple) */}
            {product.variants.length > 1 && (
              <div className="mt-2.5 pt-2 border-t border-[#F0EBE1] flex items-center flex-wrap gap-1.5">
                <span className="text-[10px] font-medium uppercase tracking-wider text-[#776D66] mr-0.5">
                  Pack:
                </span>
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedVariantIdx(idx);
                    }}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-all ${
                      selectedVariantIdx === idx
                        ? 'bg-[#1E3A2F] text-white border-[#1E3A2F]'
                        : 'bg-white text-[#211D1A] border-[#E6DFD5] hover:border-[#1E3A2F]'
                    }`}
                  >
                    {v.weightGrams ? `${v.weightGrams}g` : v.sizeLabel.split(' ')[0]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Question 4: What does it cost? */}
          <div className="mt-3 pt-2.5 border-t border-[#F0EBE1] flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#211D1A]">
                ₹{currentVariant.price}
              </span>
              {currentVariant.regularPrice && currentVariant.regularPrice > currentVariant.price && (
                <span className="text-xs text-[#776D66] line-through">
                  ₹{currentVariant.regularPrice}
                </span>
              )}
            </div>

            {currentVariant && (
              <PricePer100g
                price={currentVariant.price}
                weightGrams={currentVariant.weightGrams}
                className="text-[11px] text-[#776D66] font-medium"
              />
            )}
          </div>
        </div>
      </div>

      {/* Render Quick View Modal */}
      {quickViewOpen && (
        <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  );
};
