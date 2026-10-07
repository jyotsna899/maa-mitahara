'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStage } from '@/context/StageContext';
import { STAGE_LIST, STAGES } from '@/data/stages';
import { NEED_LIST } from '@/data/needs';
import { PRODUCTS, STAGE_KITS } from '@/data/catalog';
import { DOCTORS } from '@/data/doctors';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { shopifyService } from '@/services/mock/shopifyService';
import { Product, StageKey } from '@/types';
import { getProductImages } from '@/utils/productImages';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Check,
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  Heart,
  Truck,
  Award,
  Leaf,
  FileCheck,
  Calendar,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export default function HomePage() {
  const { stage, setStage, openSelector } = useStage();

  // Active stage display logic
  const activeStageKey: StageKey = stage || 'second_trimester';
  const currentStageDef = STAGES[activeStageKey];

  // Quick View modal state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // 1. Tabbed Collection State ("Start with one. Build from there.")
  const [activeCollectionTab, setActiveCollectionTab] = useState<'stage' | 'bestsellers' | 'jaapa' | 'nausea'>('stage');

  // Filter products for the tabbed collection
  const getTabProducts = () => {
    switch (activeCollectionTab) {
      case 'stage':
        return PRODUCTS.filter((p) => p.stageTags.includes(activeStageKey)).slice(0, 4);
      case 'bestsellers':
        return [
          PRODUCTS.find((p) => p.slug === 'gond-giri-laddu') || PRODUCTS[0],
          PRODUCTS.find((p) => p.slug === 'orange-and-cacao-laddu') || PRODUCTS[1],
          PRODUCTS.find((p) => p.slug === 'multigrain-laddu') || PRODUCTS[2],
          PRODUCTS.find((p) => p.slug === 'dryfruit-laddu') || PRODUCTS[3],
        ];
      case 'jaapa':
        return PRODUCTS.filter((p) => p.stageTags.includes('postpartum')).slice(0, 4);
      case 'nausea':
        return PRODUCTS.filter((p) => p.stageTags.includes('first_trimester')).slice(0, 4);
      default:
        return PRODUCTS.slice(0, 4);
    }
  };

  const tabProducts = getTabProducts();

  // 2. Interactive Bioactive Ingredient Science Tabs
  const [activeIngredientTab, setActiveIngredientTab] = useState<number>(0);
  const ingredientResearchData = [
    {
      num: '01',
      title: 'Gond (Acacia Nilotica)',
      tagline: 'Pelvic Restoration & Spinal Strength',
      botanicalName: 'Acacia Arabica / Senegalia Senegal',
      mechanism: 'Natural water-soluble prebiotic arabinogalactan polymer that provides gradual thermal nourishment to maternal connective tissues.',
      clinicalPurpose: 'Traditionally prescribed from the 2nd week postpartum to support pelvic ligament contraction, lubricate joints under relaxin decline, and provide sustained energy without glycemic spikes.',
      sourcing: 'Hand-picked crystalline gum from wild Rajasthan groves, gently puffed in pure A2 bilona cow ghee.',
      serving: '1–2 Laddus daily with warm milk during morning hours.',
      safeStages: 'Third Trimester (Week 34+) & Postpartum Jaapa (Days 1–40)',
      contraindication: 'Early 1st Trimester (due to warming properties)',
      linkedProductSlug: 'gond-giri-laddu',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    },
    {
      num: '02',
      title: 'Methi (Trigonella Foenum-Graecum)',
      tagline: 'Natural Galactagogue & Blood Sugar Regulation',
      botanicalName: 'Trigonella Foenum-Graecum (Fenugreek)',
      mechanism: 'Phytoestrogenic diosgenin compounds naturally stimulate prolactin receptor activity while galactomannan soluble fiber moderates carbohydrate digestion.',
      clinicalPurpose: 'Clinically documented to increase maternal breast milk output within 48–72 hours while preventing postpartum insulin swings.',
      sourcing: 'Slow-roasted micro-ground seeds steeped in cow ghee to neutralize traditional bitterness.',
      serving: '1 Laddu in the mid-afternoon with lukewarm water.',
      safeStages: 'Postpartum Jaapa & Nursing Mothers',
      contraindication: 'During Pregnancy (restricted due to mild uterine tone stimulation)',
      linkedProductSlug: 'gond-dana-methi-laddu',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    },
    {
      num: '03',
      title: 'Kamarkas (Butea Frondosa)',
      tagline: 'Spinal Support & Musculoskeletal Rehabilitation',
      botanicalName: 'Butea Monosperma (Flame of the Forest Resin)',
      mechanism: 'Astringent resin packed with natural bio-tannins and gallic acid that tightens relaxed postpartum pelvic floor and abdominal musculature.',
      clinicalPurpose: 'Revered in traditional Indian midwifery as the primary lumbar tonic ("Kamar-kas" translates literally to "strengthening the lower back").',
      sourcing: 'Wild harvested pure crimson tree exudate, traditionally roasted.',
      serving: 'Incorporated into postpartum Panjiri and Gond Laddus.',
      safeStages: 'Postpartum Jaapa Exclusively',
      contraindication: 'Not suitable during pregnancy',
      linkedProductSlug: 'dryfruit-laddu',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    },
    {
      num: '04',
      title: 'Ajwain & Saunth (Carom & Dry Ginger)',
      tagline: 'Gastric Agni & Uterine Involution',
      botanicalName: 'Trachyspermum Ammi & Zingiber Officinale',
      mechanism: 'Thymol essential oils promote bile acid synthesis and ease progesterone-induced gastric hypomotility.',
      clinicalPurpose: 'Accelerates uterine involution (natural return to pre-pregnancy size) while alleviating maternal colic, gas, and abdominal distension.',
      sourcing: 'Whole Sun-dried carom seeds and unbleached dried ginger rhizome.',
      serving: 'Infused as a warm digestive brew or blended into gentle postpartum snacks.',
      safeStages: 'Late 3rd Trimester & Postpartum Recovery',
      contraindication: 'Severe hyperacidity in 1st trimester',
      linkedProductSlug: 'gond-giri-laddu',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // 3. Build Your Custom Jaapa Box (Interactive Bundle Builder)
  const [bundleFilter, setBundleFilter] = useState<'all' | 'laddus' | 'panjiri' | 'teas'>('all');
  const [bundleItems, setBundleItems] = useState<Product[]>([
    PRODUCTS.find((p) => p.slug === 'gond-giri-laddu') || PRODUCTS[0],
    PRODUCTS.find((p) => p.slug === 'multigrain-laddu') || PRODUCTS[1],
  ]);

  const toggleBundleProduct = (prod: Product) => {
    if (bundleItems.some((i) => i.id === prod.id)) {
      setBundleItems(bundleItems.filter((i) => i.id !== prod.id));
    } else {
      setBundleItems([...bundleItems, prod]);
    }
  };

  const bundleTotal = bundleItems.reduce((sum, item) => sum + (item.variants[0]?.price || 490), 0);
  const bundleDiscountPercent = bundleItems.length >= 5 ? 15 : bundleItems.length >= 3 ? 10 : 0;
  const bundleDiscountSavings = Math.round((bundleTotal * bundleDiscountPercent) / 100);
  const bundleFinalPrice = bundleTotal - bundleDiscountSavings;

  const handleAddBundleToCart = () => {
    bundleItems.forEach((item) => {
      shopifyService.addToCart({
        productId: item.id,
        variantId: item.variants[0].id,
        name: `[Custom Jaapa Box] ${item.name}`,
        sizeLabel: item.variants[0].sizeLabel,
        price: item.variants[0].price,
        quantity: 1,
        isSubscription: false,
        stageTag: item.stageTags[0],
      });
    });
    alert(`Success: Added ${bundleItems.length} items to your Custom Jaapa Box!`);
  };

  // 4. Testimonials Carousel State
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const testimonials = [
    {
      id: 1,
      quote: "During my 2nd trimester, I suffered from severe fatigue and leg cramps. The Multigrain Laddu became my mandatory 4 PM ritual. Knowing it's reviewed by obstetricians and made with pure bilona ghee gave me total peace of mind.",
      author: "Pooja Sharma",
      role: "Mother of twin boys · 2nd Trimester Care",
      city: "New Delhi",
      rating: 5,
      productName: "Multigrain Laddu (Mom-to-Be)",
      productSlug: "multigrain-laddu",
    },
    {
      id: 2,
      quote: "Finding pure, unadulterated Gond Laddus in Bangalore for my Jaapa was impossible until I found Maa Mitahara. The texture, freshness, and absence of white sugar made my 40-day recovery so smooth.",
      author: "Sneha Reddy",
      role: "Postpartum Mother · 40-Day Jaapa Journey",
      city: "Bengaluru",
      rating: 5,
      productName: "Gond Giri & Meva Laddu",
      productSlug: "gond-giri-laddu",
    },
    {
      id: 3,
      quote: "First trimester nausea made almost all prenatal vitamins and powders unbearable. The Orange & Cacao Laddu was gentle on my palate and settled my morning gastric reflex wonderfully.",
      author: "Dr. Ananya Mathur",
      role: "Expectant Mother & Dental Surgeon · 1st Trimester",
      city: "Mumbai",
      rating: 5,
      productName: "Orange & Cacao Laddu",
      productSlug: "orange-and-cacao-laddu",
    },
  ];

  return (
    <div className="flex flex-col bg-[#FAF7F2] text-[#211D1A] overflow-hidden selection:bg-[#1E3A2F] selection:text-white">
      {/* ────────────────────────────────────────────────────────────
          1. TOP TRUST MICRO-STRIP (Eurus Trust Strip Below Header)
      ──────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E6DFD5] py-3.5">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="flex items-center justify-center gap-2 p-1">
              <Award className="w-4 h-4 text-[#1E3A2F] shrink-0" />
              <div className="text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#211D1A] block leading-none">
                  Well Trusted
                </span>
                <span className="text-[11px] text-[#776D66] mt-0.5 block leading-tight">
                  25,000+ Indian Mothers
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 p-1 border-l border-[#E6DFD5]">
              <Truck className="w-4 h-4 text-[#1E3A2F] shrink-0" />
              <div className="text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#211D1A] block leading-none">
                  Express Delivery
                </span>
                <span className="text-[11px] text-[#776D66] mt-0.5 block leading-tight">
                  Pan-India Fresh Dispatch
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 p-1 md:border-l border-[#E6DFD5]">
              <ShieldCheck className="w-4 h-4 text-[#1E3A2F] shrink-0" />
              <div className="text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#211D1A] block leading-none">
                  Expert Care
                </span>
                <span className="text-[11px] text-[#776D66] mt-0.5 block leading-tight">
                  Obstetrician Reviewed
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 p-1 border-l border-[#E6DFD5]">
              <Leaf className="w-4 h-4 text-[#1E3A2F] shrink-0" />
              <div className="text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#211D1A] block leading-none">
                  0% Refined Sugar
                </span>
                <span className="text-[11px] text-[#776D66] mt-0.5 block leading-tight">
                  A2 Desi Cow Bilona Ghee
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          2. EDITORIAL HERO (Eurus Modernist Proportions & Italic Accent)
      ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#FAF7F2] py-12 sm:py-20 lg:py-24 border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Micro Stage Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CDBF] bg-white px-3.5 py-1 text-xs font-semibold text-[#211D1A] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#1E3A2F] animate-pulse" />
                <span>Active Trimester Guidance</span>
                <span className="text-[#D9CDBF]">·</span>
                <span className="text-[#1E3A2F] font-bold">
                  {currentStageDef.title} ({currentStageDef.weekRange})
                </span>
              </div>

              {/* Large Headline with Signature Editorial Italic Word */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#211D1A] leading-[1.12]">
                The sacred <span className="italic font-normal text-[#1E3A2F]">ritual</span> your body’s been asking for.
              </h1>

              {/* Body Subtitle */}
              <p className="text-sm sm:text-base text-[#66615D] leading-relaxed max-w-2xl">
                Doctor-reviewed Ayurvedic superfoods formulated for every gestational trimester and the 40-day postpartum Jaapa journey. Handcrafted with A2 Bilona cow ghee, whole dry fruits, and zero refined sugar.
              </p>

              {/* Dual CTA Action Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md transition-all group"
                >
                  <Sparkles className="w-4 h-4 text-[#9DBDA6] group-hover:rotate-12 transition-transform" />
                  <span>Take Nutrition Quiz (2 Mins)</span>
                </Link>

                <button
                  type="button"
                  onClick={openSelector}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#211D1A] bg-white hover:bg-[#FAF7F2] text-[#211D1A] px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all"
                >
                  <span>Explore 6 Stages</span>
                  <ChevronRight className="w-4 h-4 text-[#776D66]" />
                </button>
              </div>

              {/* Hero Clinical Proof Micro-Points */}
              <div className="pt-4 border-t border-[#E6DFD5] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#776D66]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />
                  <span>Verified by Senior Obstetricians</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />
                  <span>Central FSSAI Registered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />
                  <span>Fortnightly Fresh Small Batches</span>
                </div>
              </div>
            </div>

            {/* Right Merchandising Packshot Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[16px] overflow-hidden border border-[#E6DFD5] bg-[#F6F2EC] shadow-xl aspect-portrait">
                <img
                  src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80"
                  alt="Maa Mitahara Traditional Maternal Nutrition Preparation"
                  className="w-full h-full object-cover object-center"
                />

                {/* Floating Stage Card Overlay */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E6DFD5] shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F] block">
                      Featured Stage Recommendation
                    </span>
                    <h3 className="font-serif text-sm font-bold text-[#211D1A] mt-0.5">
                      Gond Giri & Dryfruit Laddu
                    </h3>
                    <p className="text-[11px] text-[#776D66]">
                      For Pelvic Strength & Bone Density · ₹540
                    </p>
                  </div>
                  <Link
                    href="/product/gond-giri-laddu"
                    className="p-2.5 rounded-full bg-[#1E3A2F] text-white hover:bg-[#152820] transition-colors shrink-0 shadow-sm"
                    aria-label="View product details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          3. TABBED FEATURED COLLECTION ("Start with one. Build from there.")
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                Trimester-Matched Formulations
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#211D1A] tracking-tight">
                Start with <span className="italic font-normal text-[#1E3A2F]">one</span>. Build from <span className="italic font-normal text-[#1E3A2F]">there</span>.
              </h2>
            </div>

            {/* Collection Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[#E6DFD5] pb-2 md:pb-0">
              <button
                onClick={() => setActiveCollectionTab('stage')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCollectionTab === 'stage'
                    ? 'bg-[#1E3A2F] text-white shadow-sm'
                    : 'bg-[#FAF7F2] text-[#66615D] hover:text-[#211D1A]'
                }`}
              >
                {currentStageDef.title} Fits
              </button>
              <button
                onClick={() => setActiveCollectionTab('bestsellers')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCollectionTab === 'bestsellers'
                    ? 'bg-[#1E3A2F] text-white shadow-sm'
                    : 'bg-[#FAF7F2] text-[#66615D] hover:text-[#211D1A]'
                }`}
              >
                Bestsellers
              </button>
              <button
                onClick={() => setActiveCollectionTab('jaapa')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCollectionTab === 'jaapa'
                    ? 'bg-[#1E3A2F] text-white shadow-sm'
                    : 'bg-[#FAF7F2] text-[#66615D] hover:text-[#211D1A]'
                }`}
              >
                Postpartum Jaapa
              </button>
              <button
                onClick={() => setActiveCollectionTab('nausea')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCollectionTab === 'nausea'
                    ? 'bg-[#1E3A2F] text-white shadow-sm'
                    : 'bg-[#FAF7F2] text-[#66615D] hover:text-[#211D1A]'
                }`}
              >
                1st Tri Nausea
              </button>
            </div>
          </div>

          {/* 4-Column Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tabProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                userStageKey={activeStageKey}
              />
            ))}
          </div>

          {/* Bottom Discovery Link */}
          <div className="mt-12 text-center">
            <Link
              href={`/stage/${currentStageDef.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#211D1A] bg-white hover:bg-[#FAF7F2] text-[#211D1A] px-8 py-3 text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <span>View All {currentStageDef.title} Formulations</span>
              <ArrowRight className="w-4 h-4 text-[#776D66]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          4. INFINITE CERTIFICATIONS & MEDICAL PURITY MARQUEE
      ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#211D1A] text-white py-4 overflow-hidden border-y border-[#332C27]">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee text-xs font-semibold tracking-wider uppercase">
          <div className="flex items-center gap-2 text-[#FAF7F2]">
            <ShieldCheck className="w-4 h-4 text-[#9DBDA6]" />
            <span>FSSAI Central License Verified</span>
          </div>
          <span className="text-[#66615D]">·</span>
          <div className="flex items-center gap-2 text-[#FAF7F2]">
            <Leaf className="w-4 h-4 text-[#9DBDA6]" />
            <span>0% Refined Sugar & 0% Artificial Preservatives</span>
          </div>
          <span className="text-[#66615D]">·</span>
          <div className="flex items-center gap-2 text-[#FAF7F2]">
            <Award className="w-4 h-4 text-[#9DBDA6]" />
            <span>100% Traditional A2 Desi Cow Bilona Ghee</span>
          </div>
          <span className="text-[#66615D]">·</span>
          <div className="flex items-center gap-2 text-[#FAF7F2]">
            <CheckCircle2 className="w-4 h-4 text-[#9DBDA6]" />
            <span>Certified Obstetrician Formulations</span>
          </div>
          <span className="text-[#66615D]">·</span>
          <div className="flex items-center gap-2 text-[#FAF7F2]">
            <ShieldCheck className="w-4 h-4 text-[#9DBDA6]" />
            <span>Rigorous Lab Purity & Heavy Metal Tested</span>
          </div>
          <span className="text-[#66615D]">·</span>
          <div className="flex items-center gap-2 text-[#FAF7F2]">
            <Truck className="w-4 h-4 text-[#9DBDA6]" />
            <span>Freshly Handcrafted in Fortnightly Small Batches</span>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          5. NUTRITION QUIZ HERO BANNER ("2 Minutes · 5 Questions · Zero Guesswork")
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="rounded-[16px] border border-[#D9CDBF] bg-white p-8 sm:p-12 shadow-md relative overflow-hidden">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF3EF] px-3.5 py-1 text-xs font-bold text-[#1E3A2F]">
                <Sparkles className="w-3.5 h-3.5 text-[#1E3A2F]" />
                <span>Personal Nutrition Finder · PRD Clinical Engine</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211D1A] tracking-tight leading-tight">
                2 Minutes. 5 Questions. <span className="italic font-normal text-[#1E3A2F]">Zero guesswork.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#66615D] leading-relaxed">
                Every pregnancy is biologically distinct. Rather than one-size-fits-all supplements, our algorithm assesses your gestational week, nausea tolerance, iron levels, and dietary flags to generate a doctor-reviewed nutritional protocol.
              </p>

              {/* 4-Step Process Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5]">
                  <span className="text-[10px] font-bold text-[#1E3A2F] block">STEP 1</span>
                  <div className="font-bold text-xs text-[#211D1A] mt-0.5">Motherhood Stage</div>
                  <p className="text-[10px] text-[#776D66] mt-0.5">Weeks 1 to 40+ or Postpartum</p>
                </div>

                <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5]">
                  <span className="text-[10px] font-bold text-[#1E3A2F] block">STEP 2</span>
                  <div className="font-bold text-xs text-[#211D1A] mt-0.5">Primary Symptoms</div>
                  <p className="text-[10px] text-[#776D66] mt-0.5">Nausea, fatigue, cramps, digestion</p>
                </div>

                <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5]">
                  <span className="text-[10px] font-bold text-[#1E3A2F] block">STEP 3</span>
                  <div className="font-bold text-xs text-[#211D1A] mt-0.5">Clinical Safety</div>
                  <p className="text-[10px] text-[#776D66] mt-0.5">Gestational diabetes & allergens</p>
                </div>

                <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5]">
                  <span className="text-[10px] font-bold text-[#1E3A2F] block">STEP 4</span>
                  <div className="font-bold text-xs text-[#211D1A] mt-0.5">Doctor Plan</div>
                  <p className="text-[10px] text-[#776D66] mt-0.5">Daily routine & serving advice</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md transition-all"
                >
                  <span>Start Nutrition Finder (Free)</span>
                  <ArrowRight className="w-4 h-4 text-[#9DBDA6]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          6. BIOACTIVE INGREDIENT RESEARCH TABS ("The Research Behind Every Ingredient")
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
              Ayurvedic Science & Bioactives
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#211D1A] tracking-tight">
              The research behind <span className="italic font-normal text-[#1E3A2F]">every</span> ingredient.
            </h2>
            <p className="text-sm text-[#66615D] mt-2 max-w-2xl">
              We never use unstandardized herbs or synthetic extracts. Every botanical active in Maa Mitahara recipes is selected for its clinical safety profile and traditional postpartum efficacy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Tab Selector (4 Bioactives) */}
            <div className="lg:col-span-5 space-y-3">
              {ingredientResearchData.map((item, idx) => (
                <button
                  key={item.num}
                  type="button"
                  onClick={() => setActiveIngredientTab(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-card border transition-all ${
                    activeIngredientTab === idx
                      ? 'bg-[#FAF7F2] border-[#1E3A2F] shadow-sm'
                      : 'bg-white border-[#E6DFD5] hover:border-[#D9CDBF]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#776D66] tracking-wider uppercase">
                      {item.num} · Bioactive
                    </span>
                    {activeIngredientTab === idx && (
                      <span className="w-2 h-2 rounded-full bg-[#1E3A2F]" />
                    )}
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#211D1A] mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#66615D] mt-0.5">
                    {item.tagline}
                  </p>
                </button>
              ))}
            </div>

            {/* Right Interactive Detail Card */}
            {(() => {
              const activeItem = ingredientResearchData[activeIngredientTab];
              return (
                <div className="lg:col-span-7 rounded-card border border-[#E6DFD5] bg-[#FAF7F2] p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6DFD5] pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F]">
                        Botanical Name
                      </span>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#211D1A]">
                        {activeItem.botanicalName}
                      </h4>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-white border border-[#E6DFD5] px-3 py-1 text-xs font-bold text-[#211D1A]">
                      {activeItem.safeStages}
                    </span>
                  </div>

                  {/* Biological Mechanism */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#776D66]">
                      Bioactive Mechanism
                    </span>
                    <p className="text-xs sm:text-sm text-[#211D1A] leading-relaxed">
                      {activeItem.mechanism}
                    </p>
                  </div>

                  {/* Clinical & Traditional Purpose */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#776D66]">
                      Clinical Purpose in Motherhood
                    </span>
                    <p className="text-xs sm:text-sm text-[#211D1A] leading-relaxed">
                      {activeItem.clinicalPurpose}
                    </p>
                  </div>

                  {/* Sourcing & Serving Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-3.5 rounded-lg bg-white border border-[#E6DFD5]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#776D66] block">
                        Pure Sourcing
                      </span>
                      <p className="text-xs text-[#211D1A] mt-1 leading-snug">
                        {activeItem.sourcing}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-white border border-[#E6DFD5]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#776D66] block">
                        Doctor Serving Rule
                      </span>
                      <p className="text-xs text-[#211D1A] mt-1 leading-snug">
                        {activeItem.serving}
                      </p>
                    </div>
                  </div>

                  {/* Safety & Contraindication Note */}
                  <div className="p-3.5 rounded-lg bg-[#FDF6F3] border border-[#F2D7CB] flex items-start gap-2.5 text-xs text-[#8A3B26]">
                    <AlertCircle className="w-4 h-4 shrink-0 text-[#C85A32] mt-0.5" />
                    <div>
                      <strong>Safety Protocol: </strong>
                      <span>{activeItem.contraindication}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/product/${activeItem.linkedProductSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F] hover:underline"
                    >
                      <span>Explore products formulated with {activeItem.title.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          7. TYPOGRAPHIC PHILOSOPHY STATEMENT ANCHOR
      ──────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#E6DFD5] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#776D66]">
            The Maa Mitahara Philosophy
          </span>
          <blockquote className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-[#211D1A] leading-tight">
            “Nourishment is not a luxury during motherhood. It is your <span className="italic font-normal text-[#1E3A2F]">first</span> medicine.”
          </blockquote>
          <p className="text-xs sm:text-sm text-[#776D66] uppercase tracking-wider font-semibold">
            — Rooted in Charaka Samhita Garbhini Paricharya · Standardized for the Modern Mother
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          8. SPLIT BUNDLE SHOWCASE ("The 40-Day Postpartum Jaapa Box")
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Image Packshot */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[16px] overflow-hidden border border-[#E6DFD5] bg-[#F6F2EC] shadow-md aspect-portrait">
                <img
                  src="https://images.unsplash.com/photo-1508061252445-5350f31cf363?auto=format&fit=crop&w=1200&q=80"
                  alt="40-Day Postpartum Jaapa Care Box"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="rounded-full bg-[#1E3A2F] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm">
                    Flagship Care Programme
                  </span>
                </div>
              </div>
            </div>

            {/* Right Detailed Merchandising Card */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                  Complete Postpartum Rehabilitation
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1A] tracking-tight">
                  The 40-Day Postpartum <span className="italic font-normal text-[#1E3A2F]">Jaapa</span> Box
                </h2>
                <p className="text-sm text-[#66615D] mt-3 leading-relaxed">
                  A structured four-phase nutritional roadmap engineered for the critical postpartum healing window. Curated with sequential traditional recipes to support uterine involution, prolactin flow, and bone restoration.
                </p>
              </div>

              {/* 4 Sequential Phases */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5]">
                  <span className="w-6 h-6 rounded-full bg-[#1E3A2F] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-serif text-xs font-bold text-[#211D1A]">
                      Days 1–10: Digestive Cleansing & Uterine Warming
                    </h4>
                    <p className="text-[11px] text-[#776D66]">
                      Saunth, Ajwain tea & gentle Harira soup mixes to expel lochia and restore gastric agni.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5]">
                  <span className="w-6 h-6 rounded-full bg-[#1E3A2F] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-serif text-xs font-bold text-[#211D1A]">
                      Days 11–20: Lactation & Milk Flow Establishment
                    </h4>
                    <p className="text-[11px] text-[#776D66]">
                      Methi laddus & Shatavari halim seeds to naturally stimulate rich breast milk production.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5]">
                  <span className="w-6 h-6 rounded-full bg-[#1E3A2F] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-serif text-xs font-bold text-[#211D1A]">
                      Days 21–30: Pelvic & Spinal Restorative Strengthening
                    </h4>
                    <p className="text-[11px] text-[#776D66]">
                      Gond Giri & Kamarkas laddus with pure bilona ghee to support pelvic floor ligament repair.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5]">
                  <span className="w-6 h-6 rounded-full bg-[#1E3A2F] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="font-serif text-xs font-bold text-[#211D1A]">
                      Days 31–40: Micronutrient Stamina & Long-Term Vitality
                    </h4>
                    <p className="text-[11px] text-[#776D66]">
                      Meva Panjiri & Dryfruit Makhana energy mixes to sustain continuous postpartum mothering.
                    </p>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#E6DFD5]">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-[#211D1A]">₹4,490</span>
                    <span className="text-sm text-[#776D66] line-through">₹5,200</span>
                    <span className="text-xs font-bold text-[#C85A32]">(Save 14%)</span>
                  </div>
                  <span className="text-[11px] text-[#776D66]">
                    Complete 40-Day Sequential Kit · Express Pan-India Delivery
                  </span>
                </div>

                <Link
                  href="/kits"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white px-7 py-3 text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Explore Jaapa Box</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          9. SHOP BY GESTATIONAL STAGE (6 Pillars)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                Stage-First Architecture
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#211D1A] tracking-tight">
                Where are you in your <span className="italic font-normal text-[#1E3A2F]">journey</span>?
              </h2>
            </div>
            <button
              onClick={openSelector}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F] hover:underline"
            >
              <span>Switch Active Stage Window</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STAGE_LIST.map((s) => (
              <Link
                key={s.key}
                href={`/stage/${s.slug}`}
                onClick={() => setStage(s.key)}
                className={`group rounded-card border bg-white p-6 transition-all duration-300 hover:shadow-md hover:border-[#1E3A2F] flex flex-col justify-between ${
                  s.key === activeStageKey ? 'ring-2 ring-[#1E3A2F] border-[#1E3A2F]' : 'border-[#E6DFD5]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#776D66] border border-[#E6DFD5]">
                      {s.weekRange}
                    </span>
                    {s.key === activeStageKey && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F] bg-[#EEF3EF] px-2 py-0.5 rounded-full">
                        Active Stage
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#211D1A] group-hover:text-[#1E3A2F] transition-colors">
                    {s.title}
                  </h3>

                  <p className="text-xs text-[#66615D] mt-2 leading-relaxed line-clamp-2">
                    {s.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E6DFD5] flex items-center justify-between text-xs font-semibold text-[#1E3A2F]">
                  <span>Explore Stage Products</span>
                  <ChevronRight className="w-4 h-4 text-[#D9CDBF] group-hover:text-[#1E3A2F] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          10. SHOP BY MATERNAL NEED (5 Targeted Solutions)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
              Symptom-Targeted Nutrition
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#211D1A] tracking-tight">
              What does your body <span className="italic font-normal text-[#1E3A2F]">need</span> today?
            </h2>
            <p className="text-xs sm:text-sm text-[#66615D] mt-2">
              Address specific physiological challenges with doctor-curated natural food remedies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NEED_LIST.slice(0, 6).map((need) => (
              <Link
                key={need.key}
                href={`/need/${need.slug}`}
                className="group rounded-card border border-[#E6DFD5] bg-[#FAF7F2] p-5 hover:bg-white hover:border-[#1E3A2F] hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif text-base font-bold text-[#211D1A] group-hover:text-[#1E3A2F] transition-colors">
                    {need.title}
                  </h3>
                  <div className="mt-1 text-[11px] font-semibold text-[#C85A32]">
                    Addresses: {need.customerSymptom}
                  </div>
                  <p className="mt-2 text-xs text-[#66615D] leading-relaxed line-clamp-2">
                    {need.clinicalRationale}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E6DFD5] flex items-center justify-between text-xs font-semibold text-[#1E3A2F]">
                  <span>View Targeted Formulations</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9CDBF] group-hover:text-[#1E3A2F] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          11. CLINICAL COMPARISON MATRIX TABLE ("Where The Science Shows")
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
              Clinical Transparency
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#211D1A] tracking-tight">
              Where the <span className="italic font-normal text-[#1E3A2F]">science</span> shows.
            </h2>
            <p className="text-xs sm:text-sm text-[#66615D] mt-2">
              Comparing authentic clinical maternal nutrition against commercial synthetics and unstandardized homemade preparations.
            </p>
          </div>

          <div className="rounded-card border border-[#E6DFD5] bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E6DFD5] bg-[#FAF7F2]">
                    <th className="py-4 px-5 font-bold text-[#211D1A] w-2/5">
                      Clinical Standard & Formulation Metric
                    </th>
                    <th className="py-4 px-5 font-bold text-[#1E3A2F] bg-[#EEF3EF] w-1/5 text-center">
                      Maa Mitahara
                    </th>
                    <th className="py-4 px-5 font-semibold text-[#66615D] w-1/5 text-center">
                      Commercial Packaged Brands
                    </th>
                    <th className="py-4 px-5 font-semibold text-[#66615D] w-1/5 text-center">
                      Traditional Homemade Laddus
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6DFD5]">
                  <tr>
                    <td className="py-4 px-5 font-medium text-[#211D1A]">
                      1. Trimester-Specific Stage Differentiation
                    </td>
                    <td className="py-4 px-5 text-center bg-[#EEF3EF]/50 font-bold text-[#1E3A2F]">
                      ✓ Exact 6 Gestational Stages
                    </td>
                    <td className="py-4 px-5 text-center text-[#776D66]">
                      ✗ Generic All-Trimester
                    </td>
                    <td className="py-4 px-5 text-center text-[#776D66]">
                      ~ Postpartum Only
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-5 font-medium text-[#211D1A]">
                      2. Refined Sugar & Chemical Sweetener Policy
                    </td>
                    <td className="py-4 px-5 text-center bg-[#EEF3EF]/50 font-bold text-[#1E3A2F]">
                      ✓ 0% Refined Sugar (Jaggery / Dates / Sugar-Free)
                    </td>
                    <td className="py-4 px-5 text-center text-[#776D66]">
                      ✗ High Refined Sugar / Maltodextrin
                    </td>
                    <td className="py-4 px-5 text-center text-[#776D66]">
                      ✗ High Boora / White Sugar
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-5 font-medium text-[#211D1A]">
                      3. Cow Ghee Grade & Purity Base
                    </td>
                    <td className="py-4 px-5 text-center bg-[#EEF3EF]/50 font-bold text-[#1E3A2F]">
                      ✓ 100% A2 Desi Cow Bilona Ghee
                    </td>
                    <td className="py-4 px-5 text-center text-[#776D66]">
                      ✗ Palm Oil / Hydrogenated Fats
                    </td>
                    <td className="py-4 px-5 text-center text-[#776D66]">
                      ~ Variable Market Ghee
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-5 font-medium text-[#211D1A]">
                      4. Obstetrician Safety & Dosage Verification
                    </td>
                    <td className="py-4 px-5 text-center bg-[#EEF3EF]/50 font-bold text-[#1E3A2F]">
                      ✓ Evaluated by Named Doctors
                    </td>
                    <td className="py-4 px-5 text-center text-[#776D66]">
                      ✗ Marketing Claims Only
                    </td>
                    <td className="py-4 px-5 text-center text-[#776D66]">
                      ✗ Unmeasured Dosages
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-5 font-medium text-[#211D1A]">
                      5. Gestational Diabetes (GDM) Safety Gates
                    </td>
                    <td className="py-4 px-5 text-center bg-[#EEF3EF]/50 font-bold text-[#1E3A2F]">
                      ✓ Explicit Glycemic Exclusions
                    </td>
                    <td className="py-4 px-5 text-center text-[#776D66]">
                      ✗ No Safety Warnings
                    </td>
                    <td className="py-4 px-5 text-center text-[#776D66]">
                      ✗ Risk of Blood Sugar Spikes
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-5 font-medium text-[#211D1A]">
                      6. Freshness & Preservative Standard
                    </td>
                    <td className="py-4 px-5 text-center bg-[#EEF3EF]/50 font-bold text-[#1E3A2F]">
                      ✓ Fresh Fortnightly Batches (0 Preservatives)
                    </td>
                    <td className="py-4 px-5 text-center text-[#776D66]">
                      ✗ 6–12 Month Chemical Shelf Life
                    </td>
                    <td className="py-4 px-5 text-center text-[#776D66]">
                      ✓ Freshly Made
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          12. BUILD YOUR CUSTOM JAAPA BOX (Interactive Bundle Builder)
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                Interactive Custom Curation
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#211D1A] tracking-tight">
                Build your custom <span className="italic font-normal text-[#1E3A2F]">Jaapa</span> box.
              </h2>
              <p className="text-xs sm:text-sm text-[#66615D] mt-1">
                Select your favorite traditional recipes. Unlock 10% savings on 3 items, or 15% on 5+ items!
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBundleFilter('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  bundleFilter === 'all'
                    ? 'bg-[#1E3A2F] text-white'
                    : 'bg-[#FAF7F2] text-[#66615D] hover:text-[#211D1A]'
                }`}
              >
                All Items
              </button>
              <button
                onClick={() => setBundleFilter('laddus')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  bundleFilter === 'laddus'
                    ? 'bg-[#1E3A2F] text-white'
                    : 'bg-[#FAF7F2] text-[#66615D] hover:text-[#211D1A]'
                }`}
              >
                Laddus
              </button>
              <button
                onClick={() => setBundleFilter('teas')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  bundleFilter === 'teas'
                    ? 'bg-[#1E3A2F] text-white'
                    : 'bg-[#FAF7F2] text-[#66615D] hover:text-[#211D1A]'
                }`}
              >
                Digestive Teas
              </button>
            </div>
          </div>

          {/* Builder Product Slider & Interactive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.slice(0, 4).map((p) => {
              const isSelected = bundleItems.some((item) => item.id === p.id);
              return (
                <div
                  key={p.id}
                  className={`rounded-card border p-4 bg-white transition-all duration-300 flex flex-col justify-between ${
                    isSelected ? 'border-[#1E3A2F] ring-2 ring-[#1E3A2F]/20 shadow-md' : 'border-[#E6DFD5]'
                  }`}
                >
                  <div>
                    <div className="relative aspect-portrait w-full rounded-lg overflow-hidden bg-[#FAF7F2] mb-3">
                      <img
                        src={getProductImages(p.slug).primary}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center shadow-sm">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <h3 className="font-serif text-sm font-bold text-[#211D1A] line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-[11px] text-[#776D66] mt-0.5 line-clamp-1">
                      {p.stageBenefitSummary}
                    </p>
                    <div className="mt-2 font-bold text-xs text-[#211D1A]">
                      ₹{p.variants[0]?.price || 490} ({p.variants[0]?.sizeLabel.split(' ')[0]})
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleBundleProduct(p)}
                    className={`mt-3 w-full py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#1E3A2F] text-white'
                        : 'border border-[#211D1A] bg-white text-[#211D1A] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Included in Box</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Box</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Sticky Progress Drawer / Calculation Bar */}
          <div className="mt-8 rounded-card border border-[#E6DFD5] bg-[#FAF7F2] p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="font-serif font-bold text-base text-[#211D1A]">
                  Box Contents: {bundleItems.length} Recipes
                </span>
                {bundleDiscountPercent > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1E3A2F] text-white text-[10px] font-bold">
                    Tier Discount: {bundleDiscountPercent}% OFF
                  </span>
                )}
              </div>
              <p className="text-xs text-[#776D66]">
                {bundleItems.length < 3
                  ? `Add ${3 - bundleItems.length} more item(s) to unlock 10% bundle discount!`
                  : bundleItems.length < 5
                  ? `Add ${5 - bundleItems.length} more item(s) to unlock 15% VIP bundle discount!`
                  : `🎉 Maximum 15% Bundle Discount applied!`}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-baseline gap-2 justify-end">
                  <span className="font-serif text-xl font-bold text-[#211D1A]">
                    ₹{bundleFinalPrice}
                  </span>
                  {bundleDiscountSavings > 0 && (
                    <span className="text-xs text-[#776D66] line-through">
                      ₹{bundleTotal}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-[#1E3A2F] font-semibold">
                  Free Pan-India Delivery Included
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddBundleToCart}
                disabled={bundleItems.length === 0}
                className="py-3 px-6 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Custom Box to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          13. CUSTOMER PROOF & VERIFIED REVIEWS CAROUSEL ("In Their Own Words")
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                Real Mother Experiences
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#211D1A] tracking-tight">
                In their <span className="italic font-normal text-[#1E3A2F]">own</span> words.
              </h2>
            </div>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveTestimonialIdx((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))
                }
                className="w-9 h-9 rounded-full border border-[#D9CDBF] bg-white hover:bg-[#FAF7F2] flex items-center justify-center text-[#211D1A] transition-colors shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveTestimonialIdx((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))
                }
                className="w-9 h-9 rounded-full border border-[#D9CDBF] bg-white hover:bg-[#FAF7F2] flex items-center justify-center text-[#211D1A] transition-colors shadow-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={t.id}
                className={`rounded-card border bg-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  activeTestimonialIdx === idx
                    ? 'border-[#1E3A2F] shadow-md ring-1 ring-[#1E3A2F]/20'
                    : 'border-[#E6DFD5]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1 text-[#D9943B] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current text-[#D9943B]" />
                    ))}
                    <span className="text-[11px] font-bold text-[#211D1A] ml-1">5.0</span>
                    <span className="text-[10px] text-[#776D66] ml-auto bg-[#EEF3EF] text-[#1E3A2F] px-2 py-0.5 rounded-full font-bold">
                      Verified Purchase
                    </span>
                  </div>

                  <p className="font-serif text-sm sm:text-base text-[#211D1A] leading-relaxed italic">
                    “{t.quote}”
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E6DFD5] space-y-1">
                  <div className="font-bold text-xs text-[#211D1A]">{t.author}</div>
                  <div className="text-[11px] text-[#776D66]">{t.role} · {t.city}</div>
                  <div className="text-[11px] text-[#1E3A2F] font-semibold pt-1">
                    Purchased: {t.productName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          14. MEDICAL ADVISORY BOARD & DOCTOR VERIFICATION
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                Clinical Safety Governance
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#211D1A] tracking-tight">
                Our Medical <span className="italic font-normal text-[#1E3A2F]">Advisory</span> Panel.
              </h2>
            </div>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F] hover:underline"
            >
              <span>View Full Clinical Protocol & Sign-Offs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DOCTORS.map((doc) => (
              <div
                key={doc.id}
                className="rounded-card border border-[#E6DFD5] bg-[#FAF7F2] p-6 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#1E3A2F] text-white font-serif font-bold text-base flex items-center justify-center shrink-0">
                    {doc.name.split(' ')[1]?.charAt(0) || 'D'}
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#211D1A]">
                      {doc.name}
                    </h3>
                    <div className="text-[11px] font-semibold text-[#1E3A2F]">
                      {doc.qualification}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#66615D] leading-relaxed">
                  {doc.bio}
                </div>

                <div className="pt-3 border-t border-[#E6DFD5] text-[11px] text-[#776D66]">
                  <span className="font-bold text-[#211D1A] block">Clinical Review Scope:</span>
                  <span>{doc.reviewScope}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          15. FOUNDER JOURNEY & AYURVEDIC HERITAGE SPLIT BANNER
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[16px] overflow-hidden border border-[#E6DFD5] bg-[#F6F2EC] shadow-md aspect-portrait">
                <img
                  src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=80"
                  alt="Founder preparing traditional recipes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Story Copy */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block">
                Founding Journey
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211D1A] tracking-tight leading-tight">
                “I started Maa Mitahara for the <span className="italic font-normal text-[#1E3A2F]">care</span> I couldn’t find.”
              </h2>
              <p className="text-sm text-[#66615D] leading-relaxed">
                When I became a mother, I discovered a heartbreaking gap: traditional postpartum wisdom was slipping away into fading memory, while modern market shelves were overflowing with synthetic capsules and high-sugar commercial products.
              </p>
              <p className="text-sm text-[#66615D] leading-relaxed">
                Together with certified obstetricians, Ayurvedic physicians, and regional gaushalas, we standardized my grandmother’s handwritten Jaapa recipes. Today, every laddu is handcrafted to order in small batches—preserving traditional sacred nourishment with the clinical rigor every mother deserves.
              </p>
              <div className="pt-2">
                <Link
                  href="/our-story"
                  className="inline-flex items-center gap-2 rounded-full border border-[#211D1A] bg-white hover:bg-[#FAF7F2] text-[#211D1A] px-7 py-3 text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4 text-[#776D66]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          16. SUBSCRIPTION & TRIMESTER CARE PROGRAMME
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="rounded-[16px] border border-[#D9CDBF] bg-[#FAF7F2] p-8 sm:p-12">
            <div className="max-w-3xl space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block">
                Continuous Maternal Care
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#211D1A] tracking-tight">
                Trimester delivery with <span className="italic font-normal text-[#1E3A2F]">benefits</span>.
              </h2>
              <p className="text-sm text-[#66615D] leading-relaxed">
                Never run out of essential gestational nutrition. Our flexible subscription ensures freshly roasted fortnightly deliveries that automatically transition to match your advancing trimester.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-[#E6DFD5]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A2F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-[#211D1A]">15% Discount on Every Order</strong>
                    <p className="text-[11px] text-[#776D66]">Enjoy member-tier pricing with zero hidden subscription fees.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-[#E6DFD5]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A2F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-[#211D1A]">Automated Trimester Transitions</strong>
                    <p className="text-[11px] text-[#776D66]">Formulations auto-swap when your gestational stage advances.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-[#E6DFD5]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A2F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-[#211D1A]">WhatsApp Nutritionist Access</strong>
                    <p className="text-[11px] text-[#776D66]">Direct dietary consultation for symptom and craving guidance.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-[#E6DFD5]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A2F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-[#211D1A]">Pause or Cancel Anytime</strong>
                    <p className="text-[11px] text-[#776D66]">Full flexibility with 1-click controls before each dispatch.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white px-7 py-3 text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                >
                  <span>Build Trimester Plan</span>
                  <ArrowRight className="w-4 h-4 text-[#9DBDA6]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          17. EDITORIAL MATERNAL JOURNAL ("Slow Reading for Motherhood")
      ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2F] block mb-2">
                Maternal Knowledge & Science
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#211D1A] tracking-tight">
                Slow reading for <span className="italic font-normal text-[#1E3A2F]">motherhood</span>.
              </h2>
            </div>
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F] hover:underline"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/learn"
              className="group rounded-card border border-[#E6DFD5] bg-white overflow-hidden hover:shadow-md transition-all"
            >
              <div className="aspect-[16/10] w-full bg-[#F6F2EC] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=600&q=80"
                  alt="Ayurvedic herbs guide"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F]">
                  Clinical Guide · 5 Min Read
                </span>
                <h3 className="font-serif text-base font-bold text-[#211D1A] group-hover:text-[#1E3A2F] transition-colors leading-snug">
                  The Truth About Gond in Trimester 1 vs Trimester 3
                </h3>
                <p className="text-xs text-[#66615D] line-clamp-2 leading-relaxed">
                  Why traditional heating bioactives must be timed carefully around embryonic development and pelvic preparation.
                </p>
              </div>
            </Link>

            <Link
              href="/learn"
              className="group rounded-card border border-[#E6DFD5] bg-white overflow-hidden hover:shadow-md transition-all"
            >
              <div className="aspect-[16/10] w-full bg-[#F6F2EC] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80"
                  alt="Postpartum Jaapa food"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F]">
                  Traditional Science · 7 Min Read
                </span>
                <h3 className="font-serif text-base font-bold text-[#211D1A] group-hover:text-[#1E3A2F] transition-colors leading-snug">
                  The 40-Day Postpartum Jaapa Protocol Explained
                </h3>
                <p className="text-xs text-[#66615D] line-clamp-2 leading-relaxed">
                  How sequential nutrition facilitates lochia clearance, uterine contraction, and prolactin stimulation.
                </p>
              </div>
            </Link>

            <Link
              href="/learn"
              className="group rounded-card border border-[#E6DFD5] bg-white overflow-hidden hover:shadow-md transition-all"
            >
              <div className="aspect-[16/10] w-full bg-[#F6F2EC] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=600&q=80"
                  alt="Maternal nutrition"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2F]">
                  Nutritional Research · 4 Min Read
                </span>
                <h3 className="font-serif text-base font-bold text-[#211D1A] group-hover:text-[#1E3A2F] transition-colors leading-snug">
                  Why A2 Bilona Ghee is the Ideal Vehicle for Fat-Soluble Vitamins
                </h3>
                <p className="text-xs text-[#66615D] line-clamp-2 leading-relaxed">
                  Understanding traditional Lipophilic drug delivery and maternal micronutrient absorption.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          18. BRAND GUARANTEES STRIP
      ──────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-[#E6DFD5]">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1.5 p-2">
              <Leaf className="w-5 h-5 text-[#1E3A2F] mx-auto" />
              <h4 className="font-serif font-bold text-xs text-[#211D1A] uppercase tracking-wider">
                100% Natural Raw Food
              </h4>
              <p className="text-[11px] text-[#776D66]">Zero chemical isolates or stabilizers</p>
            </div>

            <div className="space-y-1.5 p-2 border-l border-[#E6DFD5]">
              <Award className="w-5 h-5 text-[#1E3A2F] mx-auto" />
              <h4 className="font-serif font-bold text-xs text-[#211D1A] uppercase tracking-wider">
                Small-Batch Handcrafted
              </h4>
              <p className="text-[11px] text-[#776D66]">Roasted in pure brass and cast iron kadhais</p>
            </div>

            <div className="space-y-1.5 p-2 md:border-l border-[#E6DFD5]">
              <ShieldCheck className="w-5 h-5 text-[#1E3A2F] mx-auto" />
              <h4 className="font-serif font-bold text-xs text-[#211D1A] uppercase tracking-wider">
                Heavy Metal Tested
              </h4>
              <p className="text-[11px] text-[#776D66]">Certified lead, mercury & arsenic safe</p>
            </div>

            <div className="space-y-1.5 p-2 border-l border-[#E6DFD5]">
              <Truck className="w-4 h-4 text-[#1E3A2F] mx-auto" />
              <h4 className="font-serif font-bold text-xs text-[#211D1A] uppercase tracking-wider">
                Direct To Your Door
              </h4>
              <p className="text-[11px] text-[#776D66]">Freshly prepared within 48h of dispatch</p>
            </div>
          </div>
        </div>
      </section>

      {/* Render Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
