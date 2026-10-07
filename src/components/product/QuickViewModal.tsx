'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { shopifyService } from '@/services/mock/shopifyService';
import {
  X,
  Star,
  ShieldCheck,
  ShoppingBag,
  Check,
  ChevronRight,
  Flame,
  Wheat,
  Activity,
  Heart,
} from 'lucide-react';
import Link from 'next/link';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const handleAddToCart = () => {
    shopifyService.addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      sizeLabel: selectedVariant.sizeLabel,
      price: selectedVariant.price,
      quantity,
      isSubscription: false,
      stageTag: product.stageTags[0],
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const isExcluded = product.clinicalReviewStatus === 'not_for_pregnancy';

  // Map image based on slug
  const getImage = () => {
    if (product.slug.includes('orange')) return 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80';
    if (product.slug.includes('multigrain')) return 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80';
    if (product.slug.includes('dryfruit')) return 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80';
    if (product.slug.includes('gond') || product.slug.includes('dana')) return 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80';
    return 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80';
  };

  const calories = product.nutritionPer100g?.['Energy (kcal)'] || product.nutritionPer100g?.['calories'] || '420 kcal';
  const protein = product.nutritionPer100g?.['Protein (g)'] || product.nutritionPer100g?.['protein'] || '6.5g';
  const sugar = product.nutritionPer100g?.['Total Sugars (g)'] || product.nutritionPer100g?.['sugar'] || '0g';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-cream-200 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 rounded-full bg-cream-100 p-2 text-charcoal-700 hover:bg-cream-200 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Representation */}
        <div className="md:w-1/2 bg-[#F6F2EC] p-6 flex items-center justify-center relative">
          <div className="aspect-portrait w-full rounded-card overflow-hidden shadow-sm border border-[#E6DFD5] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#F7F3ED] to-[#EFE9DF]">
            <div className="w-20 h-20 rounded-full bg-white/90 border border-[#D9CDBF] flex items-center justify-center shadow-sm mb-4">
              <span className="font-serif text-3xl font-bold text-[#1E3A2F]">
                {product.name.charAt(0)}
              </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#776D66] block">
              {product.form.toUpperCase()} · SMALL BATCH
            </span>
            <span className="font-serif text-base font-bold text-[#211D1A] mt-2 max-w-[180px] leading-snug">
              {product.name}
            </span>
            <span className="text-[10px] text-[#A84D35] font-semibold mt-3 px-3 py-1 rounded-full bg-white border border-[#E6DFD5]">
              Authentic Kitchen Formulation
            </span>
          </div>
          {/* Badge */}
          <div className="absolute top-8 left-8">
            <span className="rounded-full bg-[#1E3A2F] text-white px-3 py-1 text-[11px] font-bold tracking-wide uppercase shadow-sm">
              Clinical Safety Gate
            </span>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sage-600 mb-1">
              <span>{product.form.replace('_', ' ').toUpperCase()}</span>
              <span>•</span>
              <span className="text-earth-green-800">{product.stageBenefitSummary}</span>
            </div>

            <h2 className="font-serif text-2xl font-bold text-charcoal-900">
              {product.name}
            </h2>

            {/* Price & Rating */}
            <div className="mt-3 flex items-baseline justify-between border-b border-cream-200 pb-3">
              <div>
                <span className="text-2xl font-bold text-charcoal-900">
                  ₹{selectedVariant.price}
                </span>
                <span className="ml-2 text-xs text-charcoal-500 font-medium">
                  (₹{Math.round((selectedVariant.price / (selectedVariant.weightGrams || 100)) * 100)} / per 100g)
                </span>
              </div>

              {product.rating > 0 && (
                <div className="flex items-center gap-1 text-xs font-semibold text-charcoal-800">
                  <Star className="w-4 h-4 fill-terracotta-500 text-terracotta-500" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-charcoal-400">({product.reviewCount} reviews)</span>
                </div>
              )}
            </div>

            <p className="mt-3 text-xs text-charcoal-600 leading-relaxed">
              {product.stageBenefitSummary}. {product.whyInYourPlan.join(' ')}
            </p>

            {/* Variant selector */}
            <div className="mt-4">
              <label className="text-xs font-bold text-charcoal-800 uppercase tracking-wider block mb-2">
                Pack Size
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
                      selectedVariantIndex === idx
                        ? 'border-earth-green-800 bg-earth-green-50 text-earth-green-900 font-bold ring-1 ring-earth-green-800'
                        : 'border-cream-300 bg-white text-charcoal-700 hover:bg-cream-50'
                    }`}
                  >
                    {v.sizeLabel} · ₹{v.price}
                  </button>
                ))}
              </div>
            </div>

            {/* Nutrition cue */}
            <div className="mt-4 rounded-lg bg-cream-100/70 p-3 border border-cream-200 flex items-center justify-around text-center text-xs">
              <div>
                <span className="text-[10px] text-charcoal-500 uppercase font-semibold block">Calories</span>
                <span className="font-bold text-charcoal-900">{calories}</span>
              </div>
              <div className="w-px h-6 bg-cream-300" />
              <div>
                <span className="text-[10px] text-charcoal-500 uppercase font-semibold block">Protein</span>
                <span className="font-bold text-charcoal-900">{protein}</span>
              </div>
              <div className="w-px h-6 bg-cream-300" />
              <div>
                <span className="text-[10px] text-charcoal-500 uppercase font-semibold block">Sugar</span>
                <span className="font-bold text-charcoal-900">{sugar}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-cream-200">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center rounded-lg border border-cream-300 bg-cream-50 px-2 py-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 py-1 text-xs font-bold text-charcoal-600 hover:text-charcoal-900"
                >
                  -
                </button>
                <span className="px-2 text-xs font-bold text-charcoal-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 py-1 text-xs font-bold text-charcoal-600 hover:text-charcoal-900"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isExcluded}
                className={`flex-1 rounded-lg py-3 px-4 text-xs font-bold text-white transition-all flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-sage-600'
                    : 'bg-earth-green-800 hover:bg-earth-green-900 shadow-md'
                } disabled:opacity-50`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart · ₹{selectedVariant.price * quantity}</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-3 text-center">
              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="text-xs font-semibold text-earth-green-800 hover:underline inline-flex items-center gap-1"
              >
                <span>View full ingredients & doctor review</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
