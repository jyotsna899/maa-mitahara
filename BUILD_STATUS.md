# Maa Mitahara Website — Build Status & Prototype Roadmap

**Document Version:** 1.0.0  
**Last Updated:** October 6, 2026  
**Governing PRD:** Maa Mitahara Website PRD v2 (Oct 6, 2026)  
**Current Milestone:** Phase 0 + Prototype Slice (Foundations, Stage Discovery, Architecture)

---

## 1. Executive Summary & Objective

The objective is to establish the strategic and technical foundation for the redesigned D2C website of **Maa Mitahara** without prematurely deploying commercial backend infrastructure (Shopify checkout, payment gateways, live WhatsApp Cloud API, live subscription engines).

The prototype demonstrates a **stage-first, doctor-reviewed traditional Indian nutrition customer journey**:
`Discover → Stage → Need → Trust → Product → Plan → Purchase Intent → Retention → Next Stage`

---

## 2. Milestone Tracking

| Milestone | Target Scope | Audit Issues Addressed | Status |
| :--- | :--- | :--- | :--- |
| **Phase 0 (Peak Exact Replication)** | • Exact replication of Shopify Ignite — Peak preset (25 modular sections)<br>• 3-Row Header (Announcement, Search with Category Select, Preferences Pill, Sticky Nav)<br>• Product Card System (Square ratio, image rollover, Quick View modal, Quick Add)<br>• Embedded Homepage PDP, Hotspot Explorer, Countdown Timer, Comparison Table<br>• Deep-Green Peak Footer with disclaimers and newsletter<br>• Structured Data Layer (canonical + duplicates mapping, clinical gates) | S1–S5, C1–C2, N1–N7, D1–D7, T1–T3, DS-1–DS-5 | **COMPLETE & VERIFIED** |
| **Phase 1: Foundations** | • Complete Clinical Review Gate for Core Products<br>• Claims Register compliance & PDP data field completion<br>• Allergen panels, shelf-life, serving guidance<br>• URL 301 redirection maps for 8 duplicate groups | K1–K5, PD-1–PD-6, PD-10, MS-2, MS-3, SF-1–SF-5 | Queued (Pending Clinical Sign-offs) |
| **Phase 2: Discovery & Trust** | • 5-Question Stage Quiz & Plan Generation Algorithm<br>• 3-Tap Need Picker & 3-Product Compare View<br>• Stage Hub Pages (`/stage/[slug]`) & Need Pages (`/need/[slug]`)<br>• Doctor Panel profiles & Quality Hub | D2, D3, D8, D9, DS-1–DS-5, QZ-1–QZ-5, TR-1–TR-4 | In Prototype (`/quiz`, `/stage/[slug]`, `/doctors`) |
| **Phase 3: Conversion & Retention** | • Stage Starter Kits (Trial vs 30-day)<br>• Subscribe & Save engine mock & Trimester Transition prompts<br>• Smart Cart Drawer (Free shipping progress ₹999, bundle suggestions)<br>• Jannani & Prasavitri Programme pages | PU-1–PU-8, CT-6, CT-7, RT-1, RT-2, RT-4, RT-5 | Mock Layer In Place |
| **Phase 4: Expansion** | • Referral credits & loyalty loops<br>• Monthly Doctor Q&A Hub<br>• Waitlist capture (TTC, PCOS, Menopause)<br>• Regional language expansion (Hindi) | RT-3, RT-6, ST-5, IA-6, CT-8, SF-6 | Queued |

---

## 3. Scope of Current Prototype Slice

### Built in This Slice:
1. **Core Architectural Artifacts**:
   - `BUILD_STATUS.md` (this file)
   - `OPEN_DECISIONS.md`
   - `PRODUCT_DATA_STATUS.md`
   - `CLAIMS_REGISTER.md`
   - `DESIGN_SYSTEM.md`
   - `ARCHITECTURE.md`
2. **Data & Schema Engine**:
   - Canonical Product Data Store with unmerged source catalog records.
   - Duplicate group mapping table (8 groups, 18 listings) with configurable merge states.
   - Controlled stage, need, form, and clinical status vocabularies.
   - Recommendation safety filter (strictly blocks unapproved/pending items).
3. **Mock Service Interfaces**:
   - `ShopifyStorefrontService` (Cart, Checkout session mock)
   - `WhatsAppService` (Template preview, opt-in consent logger mock)
   - `SubscriptionService` (Cycle intervals, trimester-swap logic mock)
   - `AnalyticsService` (Event dispatching for funnel tracking)
4. **Interactive UI & Client Experience**:
   - Dynamic Header with 5-item IA + Stage Persistence Chip (`Showing: 2nd Trimester [Change]`).
   - Sticky mobile navigation & quick stage switcher.
   - Homepage redesign featuring:
     - Stage-first hero with direct stage selectors.
     - Trust strip with verified review metrics & Doctor panel preview.
     - "Why Stage-Matched Traditional Nutrition" category explainer.
     - Dynamic stage-filtered product showcase based on active stage chip.
     - Stage Hub preview cards (1st, 2nd, 3rd Trimester, Postpartum, TTC).
     - Need-based discovery shortcuts ("Shop by Need").
     - Brand vision & waitlist module for TTC / PCOS / Menopause.
     - Standardized footer with transparent compliance disclaimers.

---

## 4. Verification & Testing Matrix

- [ ] Mobile viewport validation (375px, 390px, 412px) - Touch targets $\ge 48$px, no horizontal overflow.
- [ ] Desktop viewport validation (1280px, 1440px) - Balanced grid, high contrast, typography hierarchy.
- [ ] Stage Persistence test - Setting stage on Homepage updates Stage Chip across reloads.
- [ ] Safety Gate test - Verify products with `clinicalReviewStatus: 'pending'` do not display unverified claims or pregnancy badges.
- [ ] No Fabricated Data check - Unconfirmed ingredients, prices, or doctor approvals explicitly display `"Clinical review pending"` or `"To be confirmed"`.
