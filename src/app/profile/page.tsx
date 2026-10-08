'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStage } from '@/context/StageContext';
import { STAGES } from '@/data/stages';
import { PRODUCTS } from '@/data/catalog';
import { shopifyService } from '@/services/mock/shopifyService';
import {
  userProfileService,
  UserProfileData,
  PurchasedProductItem,
} from '@/services/mock/userProfileService';
import { ProductCard } from '@/components/product/ProductCard';
import {
  User,
  Calendar,
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit3,
  SlidersHorizontal,
  Stethoscope,
  ArrowRight,
  Package,
  Award,
  Leaf,
  Check,
  X,
  TrendingUp,
} from 'lucide-react';

export default function ProfilePage() {
  const { stage, setStage } = useStage();
  const [profile, setProfile] = useState<UserProfileData>(userProfileService.getProfile());
  const [activeTab, setActiveTab] = useState<'journey' | 'orders' | 'guidelines' | 'settings'>('journey');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [reorderAddedId, setReorderAddedId] = useState<string | null>(null);

  // Edit form temporary state
  const [editForm, setEditForm] = useState<Partial<UserProfileData>>({});

  useEffect(() => {
    return userProfileService.subscribe((updated) => setProfile({ ...updated }));
  }, []);

  // Current Stage Definition
  const currentStageKey = profile.stageKey || stage || 'second_trimester';
  const currentStageDef = STAGES[currentStageKey] || STAGES.second_trimester;

  // Next Stage logic for stage progression
  const getNextStageKey = () => {
    switch (currentStageKey) {
      case 'trying_to_conceive': return 'first_trimester';
      case 'first_trimester': return 'second_trimester';
      case 'second_trimester': return 'third_trimester';
      case 'third_trimester': return 'postpartum';
      case 'postpartum': return 'postpartum';
      default: return 'third_trimester';
    }
  };

  const nextStageKey = getNextStageKey();
  const nextStageDef = STAGES[nextStageKey];

  // Next Stage Recommended Products
  const nextStageProducts = PRODUCTS.filter((p) => p.stageTags.includes(nextStageKey as any)).slice(0, 3);

  // Calculate Pregnancy Advancement Percentage
  const weekProgressPercent = Math.min(100, Math.max(5, Math.round((profile.gestationalWeek / 40) * 100)));

  const handleOpenEditModal = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
      age: profile.age,
      gender: profile.gender,
      stageKey: currentStageKey,
      gestationalWeek: profile.gestationalWeek,
      expectedDueDate: profile.expectedDueDate,
      dietaryNotes: profile.dietaryNotes,
      healthConditions: profile.healthConditions,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEditModal = (e: React.FormEvent) => {
    e.preventDefault();
    userProfileService.updateProfile(editForm);
    if (editForm.stageKey) {
      setStage(editForm.stageKey as any, editForm.gestationalWeek, editForm.expectedDueDate);
    }
    setIsEditModalOpen(false);
  };

  const handleReorder = (item: PurchasedProductItem) => {
    shopifyService.addToCart({
      productId: item.productSlug,
      variantId: `var-${item.productSlug}`,
      name: item.productName,
      sizeLabel: item.packSize,
      price: item.price,
      quantity: 1,
      isSubscription: false,
      stageTag: item.stageTag,
    });

    setReorderAddedId(item.id);
    setTimeout(() => setReorderAddedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#26211E] py-8 sm:py-12 selection:bg-[#244235] selection:text-white">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-8">
        {/* ────────────────────────────────────────────────────────────
            1. USER PROFILE HERO HEADER CARD
        ──────────────────────────────────────────────────────────── */}
        <div className="rounded-[24px] bg-gradient-to-r from-[#244235] via-[#1C362A] to-[#2B4E3E] text-white p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-80 h-80 rounded-full bg-[#C86D51]/10 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* User Avatar & Basic Info */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF6F0] text-[#244235] flex items-center justify-center font-display font-bold text-2xl sm:text-3xl shadow-md shrink-0 border-2 border-[#C86D51]">
                {profile.name.charAt(0)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    {profile.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C86D51] text-white text-[10px] font-bold uppercase tracking-wider">
                    {profile.gender} · {profile.age} Yrs
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#A1C3B2] font-medium">
                  {profile.email}
                </p>

                <div className="flex items-center gap-3 pt-1 text-xs text-white/80 flex-wrap">
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#C86D51]" />
                    Due Date: {profile.expectedDueDate}
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#A1C3B2]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Doctor-Reviewed Plan
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 shrink-0 self-stretch sm:self-auto justify-end">
              <button
                type="button"
                onClick={handleOpenEditModal}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[12px] bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all shadow-xs"
              >
                <Edit3 className="w-4 h-4 text-[#A1C3B2]" />
                <span>Edit Profile</span>
              </button>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[12px] bg-[#C86D51] hover:bg-[#B05B41] text-white text-xs font-bold transition-all shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Formulations</span>
              </Link>
            </div>
          </div>

          {/* Active Stage & Gestational Advancement Bar */}
          <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A1C3B2]">
                Active Motherhood Stage
              </span>
              <div className="font-display text-lg font-bold text-white flex items-center gap-2">
                <span>{currentStageDef.title}</span>
                <span className="text-xs font-semibold text-[#F3D8CD]">
                  ({currentStageDef.weekRange})
                </span>
              </div>
            </div>

            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#C86D51]" />
                  <span>Gestational Progress: Week {profile.gestationalWeek} of 40</span>
                </span>
                <span className="text-[#A1C3B2]">{weekProgressPercent}% Completed</span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-3 rounded-full bg-black/40 p-0.5 border border-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#A1C3B2] via-[#C86D51] to-[#E89D82] transition-all duration-1000 shadow-sm"
                  style={{ width: `${weekProgressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────
            2. PROFILE SECTION TAB NAVIGATION
        ──────────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 border-b border-[#E8DFD3] pb-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('journey')}
            className={`px-5 py-3 rounded-t-[14px] text-xs font-bold transition-all shrink-0 flex items-center gap-2 border-b-2 ${
              activeTab === 'journey'
                ? 'bg-white text-[#244235] border-[#244235] shadow-xs'
                : 'text-[#574D45] border-transparent hover:text-[#26211E]'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#C86D51]" />
            <span>Stage Progression &amp; Next Stage</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-3 rounded-t-[14px] text-xs font-bold transition-all shrink-0 flex items-center gap-2 border-b-2 ${
              activeTab === 'orders'
                ? 'bg-white text-[#244235] border-[#244235] shadow-xs'
                : 'text-[#574D45] border-transparent hover:text-[#26211E]'
            }`}
          >
            <Package className="w-4 h-4 text-[#C86D51]" />
            <span>Purchased Products ({profile.purchasedProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('guidelines')}
            className={`px-5 py-3 rounded-t-[14px] text-xs font-bold transition-all shrink-0 flex items-center gap-2 border-b-2 ${
              activeTab === 'guidelines'
                ? 'bg-white text-[#244235] border-[#244235] shadow-xs'
                : 'text-[#574D45] border-transparent hover:text-[#26211E]'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-[#C86D51]" />
            <span>Daily Consumption Guidelines</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-3 rounded-t-[14px] text-xs font-bold transition-all shrink-0 flex items-center gap-2 border-b-2 ${
              activeTab === 'settings'
                ? 'bg-white text-[#244235] border-[#244235] shadow-xs'
                : 'text-[#574D45] border-transparent hover:text-[#26211E]'
            }`}
          >
            <User className="w-4 h-4 text-[#C86D51]" />
            <span>Profile Details &amp; Health Notes</span>
          </button>
        </div>

        {/* ────────────────────────────────────────────────────────────
            TAB 1: STAGE PROGRESSION & NEXT STAGE RECOMMENDATIONS
        ──────────────────────────────────────────────────────────── */}
        {activeTab === 'journey' && (
          <div className="space-y-8">
            {/* Stage Advancement Alert Box */}
            <div className="rounded-[20px] bg-white border border-[#E8DFD3] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DFD3] pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51] block mb-1">
                    Stage Progression Alert
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[#26211E]">
                    Current Status: {currentStageDef.title} (Week {profile.gestationalWeek})
                  </h2>
                </div>
                <div className="px-4 py-2 rounded-xl bg-[#E8F1EC] border border-[#C8DCD1] text-xs text-[#244235] font-bold shrink-0">
                  Next Transition: {nextStageDef.title}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#574D45] leading-relaxed">
                {currentStageDef.bodyNeedsSummary}
              </p>

              {/* Biological Timeline Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                {[
                  { key: 'trying_to_conceive', title: 'Pre-Conception', weeks: 'Pre-pregnancy' },
                  { key: 'first_trimester', title: '1st Trimester', weeks: 'Wks 1 - 13' },
                  { key: 'second_trimester', title: '2nd Trimester', weeks: 'Wks 14 - 27' },
                  { key: 'third_trimester', title: '3rd Trimester', weeks: 'Wks 28 - Delivery' },
                  { key: 'postpartum', title: 'Postpartum Jaapa', weeks: 'Day 1 - 12 Mos' },
                ].map((sStep) => {
                  const isCurrent = sStep.key === currentStageKey;
                  return (
                    <div
                      key={sStep.key}
                      className={`p-3.5 rounded-card border text-center transition-all ${
                        isCurrent
                          ? 'bg-[#244235] text-white border-[#244235] shadow-sm ring-2 ring-[#244235]/30'
                          : 'bg-[#FAF6F0] border-[#E8DFD3] text-[#574D45]'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">
                        {sStep.weeks}
                      </span>
                      <span className="font-display text-xs font-bold mt-1 block">
                        {sStep.title}
                      </span>
                      {isCurrent && (
                        <span className="mt-2 inline-block px-2 py-0.5 rounded-full bg-[#C86D51] text-white text-[9px] font-bold uppercase">
                          Active Now
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Stage Products Recommendation Banner */}
            <div className="rounded-[20px] bg-[#F8EBE6] border border-[#F3D8CD] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51] block mb-1">
                    Upcoming Stage Guidance
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#26211E]">
                    Recommended Formulations for {nextStageDef.title}
                  </h3>
                </div>
                <Link
                  href={`/stage/${nextStageDef.slug}`}
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#C86D51] hover:underline"
                >
                  <span>Explore Full {nextStageDef.title} Protocol</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-[#574D45] leading-relaxed">
                As your pregnancy advances into {nextStageDef.title}, your nutritional requirements will transition. Here are the doctor-reviewed formulations prepared for your next phase:
              </p>

              {/* Next Stage Recommended Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {nextStageProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    userStageKey={nextStageKey}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────
            TAB 2: PURCHASED PRODUCTS & ORDER HISTORY
        ──────────────────────────────────────────────────────────── */}
        {activeTab === 'orders' && (
          <div className="rounded-[20px] bg-white border border-[#E8DFD3] p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51] block mb-1">
                Order History &amp; Subscriptions
              </span>
              <h2 className="font-display text-2xl font-bold text-[#26211E]">
                Products Bought by {profile.name}
              </h2>
              <p className="text-xs text-[#574D45] mt-1">
                Track delivery statuses, active stage subscriptions, and reorder packs with one click.
              </p>
            </div>

            <div className="space-y-4">
              {profile.purchasedProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-[16px] border border-[#E8DFD3] bg-[#FAF6F0] hover:bg-white transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-[12px] bg-white border border-[#E8DFD3] p-1 shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-display text-sm font-bold text-[#26211E]">
                          {item.productName}
                        </h4>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            item.status === 'Active Subscription'
                              ? 'bg-[#E8F1EC] text-[#244235] border border-[#C8DCD1]'
                              : 'bg-[#F8EBE6] text-[#C86D51] border border-[#F3D8CD]'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <div className="text-xs text-[#574D45] flex items-center gap-3">
                        <span>Order #{item.orderNumber}</span>
                        <span>·</span>
                        <span>Date: {item.orderDate}</span>
                      </div>

                      <span className="text-xs font-semibold text-[#244235] block">
                        {item.packSize} · ₹{item.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleReorder(item)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] bg-[#244235] hover:bg-[#172B22] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      {reorderAddedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#A1C3B2]" />
                          <span>Added to Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Reorder Pack</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────
            TAB 3: DAILY CONSUMPTION GUIDELINES & ROUTINE
        ──────────────────────────────────────────────────────────── */}
        {activeTab === 'guidelines' && (
          <div className="rounded-[20px] bg-white border border-[#E8DFD3] p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51] block mb-1">
                Doctor Guidelines &amp; Daily Dose Schedule
              </span>
              <h2 className="font-display text-2xl font-bold text-[#26211E]">
                Daily Consumption Rituals for {profile.name}
              </h2>
              <p className="text-xs text-[#574D45] mt-1">
                Doctor-reviewed serving schedules customized for {currentStageDef.title}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.dailyReminders.map((rem, rIdx) => (
                <div
                  key={rIdx}
                  className="rounded-[16px] border border-[#E8DFD3] bg-[#FAF6F0] p-5 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-[#E8DFD3] pb-2">
                    <span className="text-xs font-bold text-[#C86D51] flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#C86D51]" />
                      {rem.time}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white text-[#244235] border border-[#E8DFD3]">
                      {rem.label}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-[#26211E]">
                    {rem.productName}
                  </h3>

                  <div className="p-3 rounded-xl bg-white border border-[#E8DFD3] text-xs text-[#574D45] space-y-1">
                    <strong className="font-bold text-[#244235] block">
                      Serving Instructions:
                    </strong>
                    <p>{rem.instructions}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Doctor Safety Protocol Box */}
            <div className="p-4 sm:p-5 rounded-[16px] bg-[#E8F1EC] border border-[#C8DCD1] text-xs text-[#244235] flex items-start gap-3">
              <Stethoscope className="w-5 h-5 shrink-0 text-[#244235] mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold text-[#244235]">
                  Clinical Governance &amp; Purity Safety Gate:
                </strong>
                <p className="text-[#244235]/90">
                  All Maa Mitahara formulations are slow-roasted in pure A2 bilona desi cow ghee with 0% refined white sugar. Always consume at room temperature with lukewarm water or cow ghee as advised by your obstetrician.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────
            TAB 4: PROFILE SETTINGS & HEALTH NOTES
        ──────────────────────────────────────────────────────────── */}
        {activeTab === 'settings' && (
          <div className="rounded-[20px] bg-white border border-[#E8DFD3] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#E8DFD3] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51] block mb-1">
                  Personal Information
                </span>
                <h2 className="font-display text-2xl font-bold text-[#26211E]">
                  Customer Profile Details
                </h2>
              </div>

              <button
                type="button"
                onClick={handleOpenEditModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] bg-[#244235] text-white text-xs font-bold hover:bg-[#172B22] transition-colors shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD3]">
                <span className="text-[10px] font-bold text-[#776B61] uppercase block">Full Name</span>
                <span className="font-bold text-sm text-[#26211E] mt-0.5 block">{profile.name}</span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD3]">
                <span className="text-[10px] font-bold text-[#776B61] uppercase block">Email Address</span>
                <span className="font-bold text-sm text-[#26211E] mt-0.5 block">{profile.email}</span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD3]">
                <span className="text-[10px] font-bold text-[#776B61] uppercase block">Age &amp; Gender</span>
                <span className="font-bold text-sm text-[#26211E] mt-0.5 block">{profile.age} Years · {profile.gender}</span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD3]">
                <span className="text-[10px] font-bold text-[#776B61] uppercase block">Current Stage</span>
                <span className="font-bold text-sm text-[#C86D51] mt-0.5 block">{currentStageDef.title} (Week {profile.gestationalWeek})</span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD3]">
                <span className="text-[10px] font-bold text-[#776B61] uppercase block">Expected Due Date</span>
                <span className="font-bold text-sm text-[#26211E] mt-0.5 block">{profile.expectedDueDate}</span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD3]">
                <span className="text-[10px] font-bold text-[#776B61] uppercase block">Emergency Doctor Contact</span>
                <span className="font-bold text-sm text-[#26211E] mt-0.5 block">{profile.emergencyDoctorContact}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD3] space-y-1 text-xs">
              <span className="text-[10px] font-bold text-[#776B61] uppercase block">Dietary &amp; Health Notes</span>
              <p className="text-[#26211E] font-medium leading-relaxed">{profile.dietaryNotes}</p>
              <p className="text-[#574D45]">{profile.healthConditions}</p>
            </div>
          </div>
        )}
      </div>

      {/* ────────────────────────────────────────────────────────────
          EDIT PROFILE MODAL
      ──────────────────────────────────────────────────────────── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border border-[#E8DFD3] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E8DFD3] pb-3">
              <h3 className="font-display text-xl font-bold text-[#26211E] flex items-center gap-2">
                <User className="w-5 h-5 text-[#C86D51]" />
                Edit Profile Details
              </h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FAF6F0] hover:bg-[#E8DFD3] text-[#26211E] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditModal} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#26211E] block mb-1">Customer Full Name</label>
                <input
                  type="text"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD3] bg-[#FAF6F0] text-[#26211E] focus:outline-none focus:ring-2 focus:ring-[#244235]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#26211E] block mb-1">Age</label>
                  <input
                    type="number"
                    value={editForm.age || ''}
                    onChange={(e) => setEditForm({ ...editForm, age: parseInt(e.target.value) || 28 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD3] bg-[#FAF6F0] text-[#26211E] focus:outline-none focus:ring-2 focus:ring-[#244235]"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#26211E] block mb-1">Gender</label>
                  <select
                    value={editForm.gender || 'Female'}
                    onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD3] bg-[#FAF6F0] text-[#26211E] focus:outline-none focus:ring-2 focus:ring-[#244235]"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#26211E] block mb-1">Motherhood Stage</label>
                  <select
                    value={editForm.stageKey || 'second_trimester'}
                    onChange={(e) => setEditForm({ ...editForm, stageKey: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD3] bg-[#FAF6F0] text-[#26211E] focus:outline-none focus:ring-2 focus:ring-[#244235]"
                  >
                    <option value="trying_to_conceive">Pre-Conception</option>
                    <option value="first_trimester">1st Trimester</option>
                    <option value="second_trimester">2nd Trimester</option>
                    <option value="third_trimester">3rd Trimester</option>
                    <option value="postpartum">Postpartum Jaapa</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#26211E] block mb-1">Gestational Week (1-40)</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={editForm.gestationalWeek || 20}
                    onChange={(e) => setEditForm({ ...editForm, gestationalWeek: parseInt(e.target.value) || 20 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD3] bg-[#FAF6F0] text-[#26211E] focus:outline-none focus:ring-2 focus:ring-[#244235]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#26211E] block mb-1">Expected Due Date</label>
                <input
                  type="date"
                  value={editForm.expectedDueDate || '2027-01-15'}
                  onChange={(e) => setEditForm({ ...editForm, expectedDueDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD3] bg-[#FAF6F0] text-[#26211E] focus:outline-none focus:ring-2 focus:ring-[#244235]"
                />
              </div>

              <div>
                <label className="font-bold text-[#26211E] block mb-1">Dietary Preferences &amp; Notes</label>
                <textarea
                  rows={2}
                  value={editForm.dietaryNotes || ''}
                  onChange={(e) => setEditForm({ ...editForm, dietaryNotes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD3] bg-[#FAF6F0] text-[#26211E] focus:outline-none focus:ring-2 focus:ring-[#244235]"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-[#E8DFD3] font-bold text-[#574D45] hover:bg-[#FAF6F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#244235] hover:bg-[#172B22] text-white font-bold shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
