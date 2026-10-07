'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { PricePer100g } from './PricePer100g';
import { QuickViewModal } from './QuickViewModal';
import { shopifyService } from '@/services/mock/shopifyService';
import { Star, ShieldAlert, ShoppingBag, Eye, Check, Heart } from 'lucide-react';
import { getProductImages } from '@/utils/productImages';

interface ProductCardProps {
  product: Product;
  userStageKey?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const currentVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const isExcludedFromPregnancy = product.clinicalReviewStatus === 'not_for_pregnancy';

  // Format stage tags
  const stageLabel = product.stageTags
    .map((tag) => {
      switch (tag) {
        case 'first_trimester': return '1st Tri';
        case 'second_trimester': return '2nd Tri';
        case 'third_trimester': return '3rd Tri';
        case 'postpartum': return 'Postpartum Jaapa';
        case 'trying_to_conceive': return 'Pre-Conception';
        default: return (tag as string);
      }
    })
    .join(' · ');

  // Primary need tag
  const primaryNeed = product.needTags[0]
    ? product.needTags[0]
        .split('_')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' & ')
    : 'Stage Care';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isExcludedFromPregnancy) return;

    shopifyService.addToCart({
      productId: product.id,
      variantId: currentVariant.id,
      name: product.name,
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

  const images = getProductImages(product.slug);
  const hasDiscount = currentVariant.regularPrice && currentVariant.regularPrice > currentVariant.price;
  const discountPercent = hasDiscount
    ? Math.round(((currentVariant.regularPrice! - currentVariant.price) / currentVariant.regularPrice!) * 100)
    : 0;

  return (
    <>
      <div className="group relative flex flex-col justify-between rounded-card border border-[#E6DFD5] bg-white transition-all duration-300 hover:border-[#211D1A] hover:shadow-lg overflow-hidden">
        {/* ────────────────────────────────────────────────────────────
            1. EURUS 3:4 PORTRAIT IMAGE CONTAINER
        ──────────────────────────────────────────────────────────── */}
        <div className="relative aspect-portrait w-full overflow-hidden bg-[#F6F2EC]">
          <Link href={`/product/${product.slug}`} className="block w-full h-full focus:outline-none">
            <img
              src={images.primary}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 group-hover:opacity-0 transition-all duration-500 ease-out"
              loading="lazy"
            />
            <img
              src={images.secondary}
              alt={`${product.name} alternate view`}
              className="absolute inset-0 w-full h-full object-cover object-center scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"
              loading="lazy"
            />
          </Link>

          {/* Top-Left: Stage / Safety Badge */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none flex flex-col gap-1 items-start">
            {isExcludedFromPregnancy ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-900/90 text-white px-2.5 py-0.5 text-[10px] font-bold backdrop-blur-sm shadow-sm">
                <ShieldAlert className="w-3 h-3 text-red-300" />
                Not for Pregnancy
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-white/95 text-[#211D1A] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm border border-[#E6DFD5]/60">
                {product.isHero ? `☆ ${stageLabel}` : stageLabel}
              </span>
            )}

            {hasDiscount && (
              <span className="inline-flex items-center rounded-full bg-[#C85A32] text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-sm">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Top-Right: Wishlist / Save Button */}
          <div className="absolute top-3 right-3 z-10">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsWishlisted(!isWishlisted);
              }}
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#211D1A] shadow-sm flex items-center justify-center transition-all hover:scale-110"
              aria-label="Save product"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isWishlisted ? 'fill-[#C85A32] text-[#C85A32]' : 'text-[#776D66]'
                }`}
              />
            </button>
          </div>

          {/* Desktop Eurus Slide-Up Quick Add Bar */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hidden sm:block z-20">
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isExcludedFromPregnancy}
              className="w-full bg-[#211D1A] hover:bg-[#1E3A2F] text-white py-2.5 px-3 text-xs font-semibold rounded-[6px] tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#9DBEA0]" />
                  <span>Added to Plan</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Floating Action Icons (Single Tap) */}
          <div className="sm:hidden absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleOpenQuickView}
              className="w-8 h-8 rounded-full bg-white/95 text-[#211D1A] shadow-md flex items-center justify-center"
              aria-label="Quick view"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isExcludedFromPregnancy}
              className="w-8 h-8 rounded-full bg-[#211D1A] text-white shadow-md flex items-center justify-center disabled:opacity-50"
              aria-label="Quick add"
            >
              {added ? <Check className="w-3.5 h-3.5 text-[#9DBEA0]" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────
            2. PRODUCT INFORMATION LAYER
        ──────────────────────────────────────────────────────────── */}
        <div className="p-4 flex flex-col flex-1 justify-between bg-white">
          <div>
            {/* Star Rating & Reviews */}
            <div className="flex items-center gap-1.5 mb-1.5 text-xs">
              <div className="flex items-center text-[#D9943B]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating || 5)
                        ? 'fill-current text-[#D9943B]'
                        : 'text-[#D9CDBF]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-[#211D1A]">
                {product.rating?.toFixed(1) || '4.9'}
              </span>
              <span className="text-[11px] text-[#776D66]">
                ({product.reviewCount || 48})
              </span>
            </div>

            {/* Product Title */}
            <Link href={`/product/${product.slug}`} className="block focus:outline-none">
              <h3 className="font-serif text-sm sm:text-[15px] font-bold text-[#211D1A] group-hover:text-[#1E3A2F] transition-colors line-clamp-1 leading-snug">
                {product.name}
              </h3>
            </Link>

            {/* Stage / Need Line */}
            <div className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#776D66]">
              <span className="text-[#1E3A2F] font-semibold">{primaryNeed}</span>
              <span>·</span>
              <span className="line-clamp-1">{product.stageBenefitSummary}</span>
            </div>

            {/* In-Card Packaging Size Pill Selector */}
            {product.variants.length > 1 && (
              <div className="mt-2.5 pt-2 border-t border-[#F0EBE1] flex items-center flex-wrap gap-1.5">
                <span className="text-[10px] font-medium uppercase tracking-wider text-[#776D66] mr-0.5">
                  Size:
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
                        ? 'bg-[#211D1A] text-white border-[#211D1A]'
                        : 'bg-white text-[#211D1A] border-[#E6DFD5] hover:border-[#211D1A]'
                    }`}
                  >
                    {v.weightGrams ? `${v.weightGrams}g` : v.sizeLabel.split(' ')[0]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pricing & Unit Price */}
          <div className="mt-3 pt-2.5 border-t border-[#F0EBE1] flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#211D1A]">
                ₹{currentVariant.price}
              </span>
              {hasDiscount && (
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
