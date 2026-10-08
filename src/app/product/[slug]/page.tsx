'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/catalog';
import { STAGES } from '@/data/stages';
import { NEED_LIST } from '@/data/needs';
import { DOCTORS } from '@/data/doctors';
import { PricePer100g } from '@/components/product/PricePer100g';
import { ClinicalStatusBadge } from '@/components/safety/ClinicalStatusBadge';
import { MedicalDisclaimer } from '@/components/safety/MedicalDisclaimer';
import { ProductCard } from '@/components/product/ProductCard';
import { shopifyService } from '@/services/mock/shopifyService';
import { Product, StageKey, NeedKey } from '@/types';
import { getProductImages } from '@/utils/productImages';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  ArrowRight,
  Leaf,
  Award,
  Truck,
  Plus,
  Minus,
  AlertTriangle,
  ZoomIn,
  Heart,
  Share2,
  Check,
  HelpCircle,
  Stethoscope,
  Info,
  Clock,
  Sparkles,
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
          This formulation is undergoing canonical group review or clinical safety gate validation.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex rounded-full bg-[#1E3A2F] text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider"
        >
          Return to All Formulations
        </Link>
      </div>
    );
  }

  // 1. Gallery state & Zoom modal
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const images = getProductImages(product.slug).gallery;

  // 2. Variant & purchase state
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [purchaseType, setPurchaseType] = useState<'onetime' | 'sub_2w' | 'sub_4w'>('onetime');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // 3. Tab & Accordion state
  // Default open accordion is 'why' (Answers "Is this right for me?")
  const [openAccordion, setOpenAccordion] = useState<string | null>('why');

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  // 4. Sticky Bar scroll visibility listener
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once user scrolls past primary CTA (~600px)
      if (window.scrollY > 620) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 5. Pricing calculations
  const isSubscription = purchaseType !== 'onetime';
  const subDiscountPercent = purchaseType === 'sub_2w' ? 10 : purchaseType === 'sub_4w' ? 20 : 0;
  const effectivePrice = Math.round(selectedVariant.price * (1 - subDiscountPercent / 100));

  // 6. Cross-sell items from the same stage
  const crossSellProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.stageTags.some((t) => product.stageTags.includes(t))
  ).slice(0, 4);

  // Frequently bought together item
  const fbtItem = crossSellProducts[0];
  const [fbtIncluded, setFbtIncluded] = useState(true);

  // 7. Attending doctor review match from doctors list
  const reviewerDoctor = DOCTORS.find((d) =>
    d.name.toLowerCase().includes(product.clinicalReview?.reviewerName?.toLowerCase() || '') ||
    product.clinicalReview?.reviewerName?.toLowerCase().includes(d.name.toLowerCase())
  );

  // 8. Stage definitions & Next stage
  const primaryStageKey = product.stageTags[0];
  const stageDef = STAGES[primaryStageKey];
  const nextStageKey = stageDef?.nextStageKey;
  const nextStageDef = nextStageKey ? STAGES[nextStageKey] : null;

  // Clean title display (stripping duplicate brackets while preserving canonical integrity)
  const cleanTitle = product.name
    .replace(/\s*\((Mom to Be|Postnatal Edition|Mom-to-Be)\)/gi, '')
    .trim();

  // Add to cart action
  const handleAddToCart = () => {
    shopifyService.addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      sizeLabel: selectedVariant.sizeLabel,
      price: effectivePrice,
      quantity,
      isSubscription,
      subscriptionIntervalWeeks:
        purchaseType === 'sub_2w' ? 2 : purchaseType === 'sub_4w' ? 4 : undefined,
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

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const isContraindicatedInPregnancy = product.clinicalReviewStatus === 'not_for_pregnancy';

  return (
    <div className="bg-[#FAF7F2] text-[#211D1A] min-h-screen">
      {/* ────────────────────────────────────────────────────────────
          BREADCRUMBS (STAGE -> NEED -> PRODUCT)
      ──────────────────────────────────────────────────────────── */}
      <div className="border-b border-[#E6DFD5] bg-white py-3">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-4 text-xs text-[#776D66]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
            <Link href="/" className="hover:text-[#1E3A2F] transition-colors">
              Home
            </Link>
            <span className="text-[#D9CDBF]">/</span>
            <Link href="/products" className="hover:text-[#1E3A2F] transition-colors">
              All Formulations
            </Link>
            <span className="text-[#D9CDBF]">/</span>
            {stageDef ? (
              <Link
                href={`/stage/${stageDef.slug}`}
                className="hover:text-[#1E3A2F] transition-colors"
              >
                {stageDef.title}
              </Link>
            ) : (
              <span>{primaryStageKey.replace('_', ' ')}</span>
            )}
            <span className="text-[#D9CDBF]">/</span>
            <span className="font-semibold text-[#211D1A] truncate max-w-[200px] sm:max-w-xs">
              {cleanTitle}
            </span>
          </nav>

          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs text-[#776D66] hover:text-[#1E3A2F] transition-colors"
              aria-label="Share product"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={() => setIsWishlist(!isWishlist)}
              className="inline-flex items-center gap-1.5 text-xs text-[#776D66] hover:text-[#1E3A2F] transition-colors"
              aria-label="Save to care plan"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlist ? 'fill-[#C85A32] text-[#C85A32]' : ''}`} />
              <span>{isWishlist ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-14 space-y-16">
        {/* ────────────────────────────────────────────────────────────
            SECTION 1: EURUS 2-COLUMN PDP ARCHITECTURE (LEFT: GALLERY, RIGHT: DETAILS)
        ──────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* =========================================================
              LEFT COLUMN: LARGE IMAGE GALLERY & BOTANICAL CREDENTIALS
          ========================================================= */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            {/* Primary Aspect-Portrait Presentation Window */}
            <div className="relative aspect-portrait w-full rounded-[16px] bg-[#F6F2EC] border border-[#E6DFD5] overflow-hidden shadow-sm flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#F7F3ED] to-[#EFE9DF] group">
              {images.length > 0 && images[activeImageIdx] ? (
                <>
                  <img
                    src={images[activeImageIdx]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-all duration-300"
                  />
                  <button
                    onClick={() => setIsZoomOpen(true)}
                    className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-[#211D1A] border border-[#E6DFD5] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    aria-label="Zoom image"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full max-w-sm px-4">
                  <div className="w-24 h-24 rounded-full bg-white/90 border border-[#D9CDBF] flex items-center justify-center shadow-sm mb-4">
                    <span className="font-serif text-4xl font-bold text-[#1E3A2F]">
                      {cleanTitle.charAt(0)}
                    </span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#776D66] block">
                    {product.form.toUpperCase()} · SMALL BATCH CRAFT
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#211D1A] mt-2 leading-snug">
                    {cleanTitle}
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    <span className="text-xs text-[#1E3A2F] font-semibold px-3 py-1 rounded-full bg-white border border-[#E6DFD5]">
                      A2 Bilona Cow Ghee
                    </span>
                    <span className="text-xs text-[#776D66] font-semibold px-3 py-1 rounded-full bg-white border border-[#E6DFD5]">
                      0% Refined Sugar
                    </span>
                  </div>
                  <p className="text-[11px] text-[#776D66] mt-4 italic max-w-xs">
                    Authentic small-batch recipe handcrafted to order. Packaged in food-grade tin/airtight jar.
                  </p>
                </div>
              )}

              {/* Stage Pill Overlay */}
              <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1.5">
                {isContraindicatedInPregnancy ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#8A3B26] text-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider shadow-sm">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    NOT FOR PREGNANCY
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-white/95 text-[#211D1A] px-3.5 py-1 text-xs font-bold uppercase tracking-wider shadow-sm border border-[#E6DFD5]">
                    {stageDef?.title || primaryStageKey.replace('_', ' ')}
                  </span>
                )}
                {product.canonicalGroupId && (
                  <span className="inline-flex items-center rounded-full bg-white/90 text-[#776D66] px-2.5 py-0.5 text-[10px] font-semibold tracking-wider border border-[#E6DFD5]">
                    Canonical Recipe
                  </span>
                )}
              </div>

              {selectedVariant.isTrialPack && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="rounded-full bg-[#C85A32] text-white px-3 py-1 text-xs font-bold shadow-sm">
                    Trial Size Available
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip (if actual gallery exists) */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`aspect-portrait rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx
                        ? 'border-[#1E3A2F] ring-2 ring-[#1E3A2F]/20'
                        : 'border-[#E6DFD5] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Eurus Visual Badges: Purity & Sourcing Matrix */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
              <div className="p-3.5 rounded-card bg-white border border-[#E6DFD5] shadow-xs">
                <Leaf className="w-4 h-4 text-[#1E3A2F] mx-auto mb-1.5" />
                <span className="font-bold text-[#211D1A] block">A2 Cow Ghee</span>
                <span className="text-[10px] text-[#776D66]">Bilona churned</span>
              </div>
              <div className="p-3.5 rounded-card bg-white border border-[#E6DFD5] shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#1E3A2F] mx-auto mb-1.5" />
                <span className="font-bold text-[#211D1A] block">Zero White Sugar</span>
                <span className="text-[10px] text-[#776D66]">Only Jaggery / Dates</span>
              </div>
              <div className="p-3.5 rounded-card bg-white border border-[#E6DFD5] shadow-xs">
                <Award className="w-4 h-4 text-[#1E3A2F] mx-auto mb-1.5" />
                <span className="font-bold text-[#211D1A] block">Fresh Fortnightly</span>
                <span className="text-[10px] text-[#776D66]">Never warehouse aged</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: MERCHANDISING, PRICING & PURCHASE CONTROLLER
          ========================================================= */}
          <div className="lg:col-span-6 space-y-6">
            {/* 1. Need Tag & Clinical Review Status Pill */}
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
                  <span className="text-[#776D66] font-normal">
                    ({product.reviewCount} verified reviews)
                  </span>
                </div>
              )}
            </div>

            {/* 2. Product Name, Stage & Need Subheading */}
            <div>
              <div className="flex items-center gap-2 mb-1.5 text-xs">
                <span className="font-bold uppercase tracking-wider text-[#C85A32]">
                  {product.needTags[0]?.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-[#D9CDBF]">·</span>
                <span className="font-semibold text-[#1E3A2F]">
                  {stageDef?.title || primaryStageKey.replace('_', ' ')}
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1D1D1D] tracking-tight">
                {cleanTitle}
              </h1>
              <p className="mt-2.5 text-sm sm:text-base text-[#1E3A2F] font-semibold leading-relaxed font-sans">
                {product.stageBenefitSummary}
              </p>
            </div>

            {/* 3. Price Display & Dynamic Price per 100g */}
            <div className="flex items-baseline gap-3 pb-4 border-b border-[#E6DFD5]">
              <span className="font-display text-3xl sm:text-4xl font-bold text-[#1D1D1D]">
                ₹{effectivePrice}
              </span>
              {isSubscription && (
                <span className="text-base text-[#776D66] line-through">
                  ₹{selectedVariant.price}
                </span>
              )}
              {selectedVariant.regularPrice && selectedVariant.regularPrice > selectedVariant.price && !isSubscription && (
                <span className="text-base text-[#776D66] line-through">
                  ₹{selectedVariant.regularPrice}
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

            {/* 4. Pack Size Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#211D1A]">
                <span>Choose Quantity / Weight:</span>
                <span className="text-[#1E3A2F] font-normal">
                  {selectedVariant.isTrialPack
                    ? 'Recommended to evaluate palate tolerance'
                    : 'Optimal for continuous stage routine'}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
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

            {/* 5. Purchase Mode: One-time vs Fresh Routine Subscriptions */}
            <div className="rounded-card border border-[#E6DFD5] bg-white p-5 space-y-3 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-[#211D1A]">
                Purchase Options:
              </div>

              {/* Option 1: One-Time */}
              <label
                className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                  purchaseType === 'onetime'
                    ? 'border-[#1E3A2F] bg-[#FAF7F2] ring-1 ring-[#1E3A2F]'
                    : 'border-[#E6DFD5] hover:bg-[#FAF7F2]'
                }`}
              >
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
                    <span className="text-[11px] text-[#776D66]">Standard fresh batch dispatch</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#211D1A]">₹{selectedVariant.price}</span>
              </label>

              {/* Option 2: Fortnightly Routine */}
              <label
                className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                  purchaseType === 'sub_2w'
                    ? 'border-[#1E3A2F] bg-[#FAF7F2] ring-1 ring-[#1E3A2F]'
                    : 'border-[#E6DFD5] hover:bg-[#FAF7F2]'
                }`}
              >
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
                    <span className="text-[11px] text-[#776D66]">
                      Fresh roasted batch every 14 days
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#1E3A2F]">
                  ₹{Math.round(selectedVariant.price * 0.9)}
                </span>
              </label>

              {/* Option 3: Monthly Care */}
              <label
                className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                  purchaseType === 'sub_4w'
                    ? 'border-[#1E3A2F] bg-[#FAF7F2] ring-1 ring-[#1E3A2F]'
                    : 'border-[#E6DFD5] hover:bg-[#FAF7F2]'
                }`}
              >
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
                    <span className="text-[11px] text-[#776D66]">
                      Auto-transitions at trimester boundary
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#1E3A2F]">
                  ₹{Math.round(selectedVariant.price * 0.8)}
                </span>
              </label>
            </div>

            {/* 6. Quantity Controller + Primary CTA */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Controller */}
                <div className="flex items-center border border-[#E6DFD5] rounded-full bg-white px-3 py-2.5 shrink-0">
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

              <div className="flex items-center justify-between text-[11px] text-[#776D66] pt-1 px-1">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#1E3A2F]" />
                  Dispatches fresh in 24–48 hours
                </span>
                <span>Pan-India Delivery</span>
              </div>
            </div>

            {/* 7. Frequently Bought Together Complementary Item */}
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
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────
            SECTION 2: EURUS ACCORDION / TAB STRUCTURE (PRD CONTENT HIERARCHY)
            1. Why this product?
            2. Who is it for?
            3. Ingredients
            4. Nutrition information
            5. Serving & use guidance
            6. Suitability & caution
            7. Trust & expert review
            8. Product details / specifications
        ──────────────────────────────────────────────────────────── */}
        <div className="rounded-card border border-[#E6DFD5] bg-white divide-y divide-[#E6DFD5] shadow-sm">
          {/* Accordion 1: Why This Product? */}
          <div>
            <button
              onClick={() => toggleAccordion('why')}
              className="w-full p-5 text-left font-serif font-bold text-base text-[#211D1A] flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#1E3A2F]" />
                <span>1. Why This Product?</span>
              </div>
              {openAccordion === 'why' ? (
                <ChevronUp className="w-4 h-4 text-[#776D66]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#776D66]" />
              )}
            </button>
            {openAccordion === 'why' && (
              <div className="p-5 pt-0 text-xs sm:text-sm text-[#66615D] leading-relaxed space-y-4">
                <p className="font-medium text-[#211D1A]">
                  {product.stageBenefitSummary}
                </p>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#211D1A] block">
                    Formulated for this specific physiological stage because:
                  </span>
                  <ul className="space-y-2 text-xs">
                    {product.whyInYourPlan.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#1E3A2F] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 2: Who Is It For? (Stage & Need Fit) */}
          <div>
            <button
              onClick={() => toggleAccordion('who')}
              className="w-full p-5 text-left font-serif font-bold text-base text-[#211D1A] flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#1E3A2F]" />
                <span>2. Who Is It For? (Stage & Need Suitability)</span>
              </div>
              {openAccordion === 'who' ? (
                <ChevronUp className="w-4 h-4 text-[#776D66]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#776D66]" />
              )}
            </button>
            {openAccordion === 'who' && (
              <div className="p-5 pt-0 text-xs sm:text-sm text-[#66615D] leading-relaxed space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] space-y-1.5">
                    <strong className="text-xs font-bold uppercase tracking-wider text-[#1E3A2F] block">
                      Target Gestational Stages
                    </strong>
                    <div className="flex flex-wrap gap-1.5">
                      {product.stageTags.map((stag) => (
                        <span
                          key={stag}
                          className="px-2.5 py-1 rounded-full bg-white text-xs font-semibold text-[#211D1A] border border-[#E6DFD5]"
                        >
                          {STAGES[stag]?.title || stag.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] space-y-1.5">
                    <strong className="text-xs font-bold uppercase tracking-wider text-[#C85A32] block">
                      Addressed Maternal Needs
                    </strong>
                    <div className="flex flex-wrap gap-1.5">
                      {product.needTags.map((nd) => {
                        const needObj = NEED_LIST.find((n) => n.key === nd);
                        return (
                          <span
                            key={nd}
                            className="px-2.5 py-1 rounded-full bg-white text-xs font-semibold text-[#211D1A] border border-[#E6DFD5]"
                          >
                            {needObj?.title || nd.replace('_', ' ')}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {isContraindicatedInPregnancy && (
                  <div className="p-4 rounded-lg bg-[#FDF6F3] border border-[#F2D7CB] text-xs text-[#8A3B26] space-y-1">
                    <strong className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-[#8A3B26]" />
                      Clinical Safety Restriction:
                    </strong>
                    <p>
                      This botanical formulation is NOT suitable for pregnancy. It is formulated exclusively for the Pre-Pregnancy Preparation (Trying to Conceive) window or as directed by an Ayurvedic / Obstetric physician.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Accordion 3: Ingredients & Whole Food Sourcing */}
          <div>
            <button
              onClick={() => toggleAccordion('ingredients')}
              className="w-full p-5 text-left font-serif font-bold text-base text-[#211D1A] flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Leaf className="w-4 h-4 text-[#1E3A2F]" />
                <span>3. Ingredients & Whole Food Sourcing</span>
              </div>
              {openAccordion === 'ingredients' ? (
                <ChevronUp className="w-4 h-4 text-[#776D66]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#776D66]" />
              )}
            </button>
            {openAccordion === 'ingredients' && (
              <div className="p-5 pt-0 text-xs sm:text-sm text-[#66615D] leading-relaxed space-y-4">
                <div className="rounded-lg border border-[#E6DFD5] overflow-hidden max-w-2xl bg-[#FAF7F2]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#EFE9DF] text-[#211D1A] font-bold border-b border-[#E6DFD5]">
                      <tr>
                        <th className="p-3">Ingredient</th>
                        <th className="p-3">Sourcing & Proportion Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6DFD5] bg-white">
                      {product.ingredients.map((ing, idx) => (
                        <tr key={idx}>
                          <td className="p-3 font-semibold text-[#211D1A]">{ing.name}</td>
                          <td className="p-3 text-[#776D66]">
                            {ing.sourcingNote || ing.percentage || 'Information pending'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#776D66] pt-1">
                  <span><strong>Central FSSAI:</strong> {product.fssaiNumber}</span>
                  <span>·</span>
                  <span><strong>Refined Sugar:</strong> 0% (Clean traditional sweetener only)</span>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 4: Nutrition Information */}
          <div>
            <button
              onClick={() => toggleAccordion('nutrition')}
              className="w-full p-5 text-left font-serif font-bold text-base text-[#211D1A] flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Info className="w-4 h-4 text-[#1E3A2F]" />
                <span>4. Nutritional Facts</span>
              </div>
              {openAccordion === 'nutrition' ? (
                <ChevronUp className="w-4 h-4 text-[#776D66]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#776D66]" />
              )}
            </button>
            {openAccordion === 'nutrition' && (
              <div className="p-5 pt-0 text-xs sm:text-sm text-[#66615D] leading-relaxed space-y-4">
                <div className="rounded-lg border border-[#E6DFD5] overflow-hidden max-w-md bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF7F2] font-bold text-[#211D1A] border-b border-[#E6DFD5]">
                      <tr>
                        <th className="p-3">Nutrient Parameter</th>
                        <th className="p-3">Per Serving</th>
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
                <p className="text-[11px] text-[#776D66] italic">
                  Note: Values shown represent actual test data on file. Parameters marked &ldquo;Information pending&rdquo; are undergoing laboratory re-validation per Maa Mitahara clinical compliance protocols.
                </p>
              </div>
            )}
          </div>

          {/* Accordion 5: Serving & Usage Guidance */}
          <div>
            <button
              onClick={() => toggleAccordion('usage')}
              className="w-full p-5 text-left font-serif font-bold text-base text-[#211D1A] flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#1E3A2F]" />
                <span>5. Serving & Usage Guidance</span>
              </div>
              {openAccordion === 'usage' ? (
                <ChevronUp className="w-4 h-4 text-[#776D66]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#776D66]" />
              )}
            </button>
            {openAccordion === 'usage' && (
              <div className="p-5 pt-0 text-xs sm:text-sm text-[#66615D] leading-relaxed space-y-3">
                {product.servingGuidance.map((sg, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#211D1A]">{sg.quantityPerDay}</span>
                      <span className="text-[11px] font-semibold text-[#1E3A2F] bg-white px-2.5 py-0.5 rounded-full border border-[#E6DFD5]">
                        Timing: {sg.timing}
                      </span>
                    </div>
                    <p className="text-xs text-[#66615D]">{sg.instructions}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 6: Suitability & Caution Information */}
          <div>
            <button
              onClick={() => toggleAccordion('caution')}
              className="w-full p-5 text-left font-serif font-bold text-base text-[#211D1A] flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[#C85A32]" />
                <span>6. Allergens, Suitability & Precautions</span>
              </div>
              {openAccordion === 'caution' ? (
                <ChevronUp className="w-4 h-4 text-[#776D66]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#776D66]" />
              )}
            </button>
            {openAccordion === 'caution' && (
              <div className="p-5 pt-0 text-xs sm:text-sm text-[#66615D] leading-relaxed space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-lg bg-white border border-[#E6DFD5]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#211D1A] block mb-1">
                      Contains Allergens:
                    </span>
                    <span className="text-xs text-[#66615D]">
                      {product.allergens.length > 0 ? product.allergens.join(', ') : 'None declared'}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-white border border-[#E6DFD5]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#211D1A] block mb-1">
                      May Contain / Facility Traces:
                    </span>
                    <span className="text-xs text-[#66615D]">
                      {product.mayContain?.join(', ') || 'Facility processes wheat, tree nuts, and dairy'}
                    </span>
                  </div>
                </div>

                {product.contraindications && product.contraindications.length > 0 && (
                  <div className="p-3.5 rounded-lg bg-[#FDF6F3] border border-[#F2D7CB] text-xs text-[#8A3B26]">
                    <strong>Contraindications: </strong>
                    <span>{product.contraindications.join('; ')}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Accordion 7: Trust & Expert Review */}
          <div>
            <button
              onClick={() => toggleAccordion('trust')}
              className="w-full p-5 text-left font-serif font-bold text-base text-[#211D1A] flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Stethoscope className="w-4 h-4 text-[#1E3A2F]" />
                <span>7. Clinical Advisory & Medical Governance</span>
              </div>
              {openAccordion === 'trust' ? (
                <ChevronUp className="w-4 h-4 text-[#776D66]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#776D66]" />
              )}
            </button>
            {openAccordion === 'trust' && (
              <div className="p-5 pt-0 text-xs sm:text-sm text-[#66615D] leading-relaxed space-y-4">
                <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-[#211D1A] text-sm sm:text-base">
                        {product.clinicalReview?.reviewerName || 'Clinical Advisory Panel'}
                      </h4>
                      <p className="text-xs text-[#776D66]">
                        {product.clinicalReview?.qualification || reviewerDoctor?.qualification || 'Consultant Obstetrician'}
                      </p>
                      <p className="text-[11px] text-[#776D66]">
                        {product.clinicalReview?.hospital || reviewerDoctor?.hospital}
                      </p>
                    </div>
                    <ClinicalStatusBadge
                      status={product.clinicalReviewStatus}
                      reviewInfo={product.clinicalReview}
                    />
                  </div>

                  {product.clinicalReview?.scope && (
                    <div className="text-xs text-[#211D1A] pt-2 border-t border-[#E6DFD5]">
                      <strong className="block text-[11px] uppercase tracking-wider text-[#776D66] mb-0.5">
                        Clinical Evaluation Scope:
                      </strong>
                      <p>{product.clinicalReview.scope}</p>
                    </div>
                  )}

                  {product.clinicalReview?.signedNote && (
                    <div className="p-3 rounded bg-white border border-[#E6DFD5] text-xs italic text-[#1E3A2F]">
                      &ldquo;{product.clinicalReview.signedNote}&rdquo;
                    </div>
                  )}

                  <div className="text-[10px] text-[#776D66]">
                    Evaluation Date: {product.clinicalReview?.reviewDate || 'Information pending'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 8: Product Details & Shelf Life */}
          <div>
            <button
              onClick={() => toggleAccordion('details')}
              className="w-full p-5 text-left font-serif font-bold text-base text-[#211D1A] flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#1E3A2F]" />
                <span>8. Packaging & Technical Specifications</span>
              </div>
              {openAccordion === 'details' ? (
                <ChevronUp className="w-4 h-4 text-[#776D66]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#776D66]" />
              )}
            </button>
            {openAccordion === 'details' && (
              <div className="p-5 pt-0 text-xs sm:text-sm text-[#66615D] leading-relaxed">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-[#E6DFD5]">
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-[#211D1A] bg-[#FAF7F2] w-1/3">
                        Form & Texture
                      </td>
                      <td className="py-2.5 px-3 text-[#66615D] capitalize">
                        {product.form} (Handcrafted & Round Rolled)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-[#211D1A] bg-[#FAF7F2]">
                        Shelf Life
                      </td>
                      <td className="py-2.5 px-3 text-[#66615D]">{product.shelfLife}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-[#211D1A] bg-[#FAF7F2]">
                        Storage Instructions
                      </td>
                      <td className="py-2.5 px-3 text-[#66615D]">{product.storage}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-[#211D1A] bg-[#FAF7F2]">
                        Central FSSAI Status
                      </td>
                      <td className="py-2.5 px-3 text-[#66615D]">{product.fssaiNumber}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────
            SECTION 3: CUSTOMER FEEDBACK & VERIFIED TRACEABILITY
        ──────────────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F]">
                Verified Stage Feedback
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1A] mt-1">
                Customer Reviews
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#776D66]">
              <div className="flex text-[#D9943B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-[#D9943B]" />
                ))}
              </div>
              <span className="font-bold text-[#211D1A] text-sm">
                {product.rating.toFixed(1)} / 5.0
              </span>
              <span>· Based on {product.reviewCount} customer purchases</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-card border border-[#E6DFD5] bg-white space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex text-[#D9943B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current text-[#D9943B]" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-[#1E3A2F] bg-[#EEF3EF] px-2 py-0.5 rounded-full">
                  Verified Mother
                </span>
              </div>
              <p className="text-xs text-[#66615D] leading-relaxed italic">
                &ldquo;Gentle taste and natural aroma. It was the only mid-morning snack my palate could tolerate without triggering nausea.&rdquo;
              </p>
              <div className="text-[11px] text-[#776D66] border-t border-[#E6DFD5] pt-2">
                <span className="font-bold text-[#211D1A]">Trimester-Verified Buyer</span> · Handcrafted Batch
              </div>
            </div>

            <div className="p-6 rounded-card border border-[#E6DFD5] bg-white space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex text-[#D9943B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current text-[#D9943B]" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-[#1E3A2F] bg-[#EEF3EF] px-2 py-0.5 rounded-full">
                  Verified Mother
                </span>
              </div>
              <p className="text-xs text-[#66615D] leading-relaxed italic">
                &ldquo;Knowing that each recipe is reviewed by a gynecologist gives so much mental peace. The A2 ghee flavor is genuine and authentic.&rdquo;
              </p>
              <div className="text-[11px] text-[#776D66] border-t border-[#E6DFD5] pt-2">
                <span className="font-bold text-[#211D1A]">Postpartum Routine Reviewer</span> · Fresh Fortnightly
              </div>
            </div>

            <div className="p-6 rounded-card border border-[#E6DFD5] bg-white space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex text-[#D9943B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current text-[#D9943B]" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-[#1E3A2F] bg-[#EEF3EF] px-2 py-0.5 rounded-full">
                  Verified Mother
                </span>
              </div>
              <p className="text-xs text-[#66615D] leading-relaxed italic">
                &ldquo;Pure dry fruits and zero white sugar. I subscribe every two weeks so that a freshly prepared batch arrives on time.&rdquo;
              </p>
              <div className="text-[11px] text-[#776D66] border-t border-[#E6DFD5] pt-2">
                <span className="font-bold text-[#211D1A]">Repeat Subscriber</span> · Delhi NCR
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────
            SECTION 4: RECOMMENDED COMPLEMENTARY PRODUCTS (CROSS-SELL)
        ──────────────────────────────────────────────────────────── */}
        {crossSellProducts.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-[#E6DFD5]">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F]">
                  Stage Synergy
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1A] mt-1">
                  Pairs Well With in {stageDef?.title || primaryStageKey.replace('_', ' ')}
                </h2>
              </div>
              <Link
                href={`/stage/${stageDef?.slug || primaryStageKey.replace('_', '-')}`}
                className="text-xs font-semibold text-[#1E3A2F] hover:underline"
              >
                View Full Stage Collection →
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
            SECTION 5: UPCOMING TRIMESTER RETENTION ROADMAP
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

        {/* Mandatory Statutory Medical Disclaimer */}
        <MedicalDisclaimer />
      </div>

      {/* ────────────────────────────────────────────────────────────
          EURUS STICKY BOTTOM PURCHASE BAR (DESKTOP & MOBILE)
      ──────────────────────────────────────────────────────────── */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E6DFD5] shadow-lg py-3 px-4 sm:px-8 transition-transform duration-300">
          <div className="max-w-page mx-auto flex items-center justify-between gap-4">
            {/* Product summary info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#F6F2EC] border border-[#E6DFD5] flex items-center justify-center shrink-0">
                <span className="font-serif text-sm font-bold text-[#1E3A2F]">
                  {cleanTitle.charAt(0)}
                </span>
              </div>
              <div className="min-w-0">
                <h4 className="font-serif text-xs sm:text-sm font-bold text-[#211D1A] truncate">
                  {cleanTitle}
                </h4>
                <div className="flex items-baseline gap-2 text-xs text-[#776D66]">
                  <span className="font-bold text-[#211D1A]">₹{effectivePrice}</span>
                  <span className="text-[11px]">({selectedVariant.sizeLabel})</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Variant Selector on Desktop */}
              <div className="hidden md:block">
                <select
                  value={selectedVariant.id}
                  onChange={(e) => {
                    const match = product.variants.find((v) => v.id === e.target.value);
                    if (match) setSelectedVariant(match);
                  }}
                  className="rounded-full border border-[#E6DFD5] bg-white px-3 py-2 text-xs font-semibold text-[#211D1A] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F]"
                >
                  {product.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.sizeLabel} — ₹{v.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add to Cart CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="py-2.5 px-6 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart · ₹{effectivePrice * quantity}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
