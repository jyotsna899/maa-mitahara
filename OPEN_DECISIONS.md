# Maa Mitahara — Open Decisions & Clinical/Commercial Register

**Document Version:** 1.0.0  
**Governing Document:** Maa Mitahara Website PRD v2 (Oct 6, 2026)  
**Status:** Maintained as an active register of open clinical, commercial, and technical decisions.

---

## 1. Clinical & Medical Governance Decisions

| Decision ID | Item / Topic | Current Situation | Options / Impact | Status |
| :--- | :--- | :--- | :--- | :--- |
| **DEC-CL-01** | Doctor Sign-off Governance & Timelines | Dr. Ritu Dhand, Dr. Neha, and Dr. Archana Shukla are identified in PRD Section 12, but formal timestamped review forms are not yet recorded for all 55 products. | • Option A: Prioritize Hero Products + Trimester 1 items for Phase 1 sign-off.<br>• Option B: Block all stage badging until 100% of products are reviewed.<br>*Impact:* Phase 1 release gate depends on this. | **Pending Clinical Sign-off** (Default: show "Clinical review pending") |
| **DEC-CL-02** | Ashwagandha & Safed Musli in Pregnancy | Currently marketed under "Healthy Delights" with Antenatal label. Traditional herbs carry contraindications in early gestation. | • Decision: Hold from Trimester 1 & 2 recommendations until explicit OB/GYN sign-off.<br>*Impact:* Safety-first principle requires exclusion from active plans. | **Exclusion Enforced** |
| **DEC-CL-03** | Coffee & Badam Laddu Caffeine Limits | Product contains coffee and is currently tagged to pregnancy/3rd trimester vitality. | • Option A: Doctor establishes acceptable caffeine threshold ($<200$mg/day) and adds disclaimer.<br>• Option B: Remove from 3rd-trimester starter kit and place in general range. | **Under Review** |
| **DEC-CL-04** | Trimester Boundaries Definition | PRD proposes standard boundaries: 1st Trimester ($\le 13$ weeks), 2nd Trimester (14–27 weeks), 3rd Trimester (28 weeks–delivery). | Clinical reviewer must confirm boundary thresholds for automatic transition logic. | **Provisional (Doctor confirmation required)** |
| **DEC-CL-05** | Postpartum Recovery vs. Lactation Cut-off | Need separation between immediate post-birth recovery herbs (Gond, Saunth, Ajwain) and lactation support (Dana Methi, Shatavari). | Clinical reviewer must specify postpartum week boundary between acute recovery and ongoing lactation. | **Under Review** |

---

## 2. Product Catalogue & Formulation Decisions

| Decision ID | Item / Topic | Current Situation | Options / Impact | Status |
| :--- | :--- | :--- | :--- | :--- |
| **DEC-CT-01** | Status of "Healthy Delights" Line | 5 products exist in duplicate (Multigrain, Ragi, Oats, Dhaniya, Dana Methi) across standard and Healthy Delights lines. | • Option A: Treat as separate line with lower sugar/alternative sweetener (must explain on PDP).<br>• Option B: Merge into standard products with shared recipe if formulation is identical.<br>*Impact:* Catalogue count changes from 55 to 45. | **Configurable in Data Layer (Not merged permanently yet)** |
| **DEC-CT-02** | Resolution of 8 Duplicate Groups | 18 listings in 8 groups (Dryfruit, Multigrain, Ragi, Oats, Dhaniya, Dana Methi, Gond Giri, Nari Kalyan Panjiri). | Must conduct duplicate-resolution workshop with founder and quality head before applying permanent 301 redirects. | **Preserved with Canonical Group ID** |
| **DEC-CT-03** | Trimester 1 Assortment Gap | Only 1 or 2 products (Orange & Cacao Laddu) currently approved for 1st trimester. PRD rule `DS-3` forbids single-product pages. | • Strategy: Feature 1st Trimester Starter Kit + transparent note explaining why early pregnancy nutrition is intentionally gentle and light. | **Enforced via Rule DS-3** |
| **DEC-CT-04** | Nourishing Gift Box & Pregnancy Gift Kit | 7 of 8 current gift boxes lean postpartum. Only 1 general box exists. | Formulate dedicated "Pregnancy Care Gift Kit" with greeting card and trimester-safe curation. | **Pending Product Ops** |

---

## 3. Commercial & Pricing Decisions

| Decision ID | Item / Topic | Current Situation | Options / Impact | Status |
| :--- | :--- | :--- | :--- | :--- |
| **DEC-CM-01** | Subscribe & Save Discount Percentage | PRD specifies a discount for recurring 2-week and 4-week deliveries, but value is not fixed. | Recommended starting baseline: 10% or 15% recurring discount, subject to finance sign-off. | **Configurable Value (Provisional: 10%)** |
| **DEC-CM-02** | Stage Starter Kit Bundle Savings | Kits are required to show honest rupee savings over buying items separately (`PU-1`). | Finance must set kit bundle discount (e.g. ₹100–₹250 off separate pack totals). | **Configurable Value** |
| **DEC-CM-03** | 7-Day Trial Pack Feasibility | PRD specifies 7-day trial packs for each core stage kit and hero laddu (`PU-6`). | Production team must verify whether small 70g/100g sample packaging lines are operational for all core laddus. | **Pending Production Confirmation** |
| **DEC-CM-04** | Free Shipping Threshold | Free shipping currently at ₹999 (`PU-4`). | Keep ₹999 as standard baseline with cart progress indicator. | **Set to ₹999 (Configurable)** |
| **DEC-CM-05** | Return & Guarantee Policy | PRD `TR-5` specifies a visible satisfaction promise on first kit (7-day replacement/refund). | Legal & Finance must finalize food-safety compliant terms. | **Provisional (Show explicit terms)** |

---

## 4. Technical & Platform Architecture Decisions

| Decision ID | Item / Topic | Current Situation | Options / Impact | Status |
| :--- | :--- | :--- | :--- | :--- |
| **DEC-TC-01** | Frontend Prototype vs Production Commerce | Prototype must demonstrate complete strategic UX without premature production overhead. | Build Next.js / TypeScript interactive prototype with modular mock service interfaces for Shopify, WhatsApp, and Subscriptions. | **Adopted for Prototype** |
| **DEC-TC-02** | Customer Health Data & DPDP 2023 Compliance | Stage quiz captures sensitive personal info (due date, pregnancy status, gestational diabetes). | Explicit, unbundled consent checkbox at quiz step 6; self-serve data deletion mechanism; no health data passed to external ad pixels. | **Architected into Data Model** |
