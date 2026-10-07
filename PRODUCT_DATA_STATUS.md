# Maa Mitahara — Product Catalogue & Clinical Review Status

**Document Version:** 1.0.0  
**Governing Document:** Maa Mitahara Website PRD v2 (Oct 6, 2026), Section 10  
**Status:** Audit of 55 source catalogue records, duplicate groups, and clinical review status.  
**Strict Rule:** *No fabricated data.* Any missing nutrition value, ingredient proportion, serving guidance, or clinical approval is explicitly marked as `Information pending`, `Clinical review pending`, or `To be confirmed`.

---

## 1. Catalogue Overview Summary

- **Total Source Listings Today:** 55 items
  - Single Products: 44 (24 pregnancy-labelled, 20 postpartum including 2 DIY mixes)
  - Gift Boxes: 8 (7 lean postpartum, 1 general)
  - Postpartum Programmes: 2 (Jannani 30-day, Prasavitri 40-day)
  - Samplers: 1 (Wellness Sample Laddu)
- **Target Consolidated Listings:** ~45 items once 8 duplicate groups (18 listings) are resolved.
- **Current Canonical Status:** Source records preserved in data layer with a `canonicalGroupId` mapping to avoid destructive premature deletions.

---

## 2. Duplicate Resolution Matrix (18 Listings across 8 Groups)

| Group | Source Listings Today | Current State | Proposed Canonical Handling | Status |
| :--- | :--- | :--- | :--- | :--- |
| **GRP-01: Dryfruit** | 1. "Dryfruit Laddu" (Mom to Be)<br>2. "DryFruits Laddu" (Postnatal) | 2 listings, separate collections | Map to canonical `dryfruit-laddu`. If recipe is identical, apply both `pregnancy` and `postpartum` stage tags with stage-specific serving guidance. | **Configurable in Data Layer** |
| **GRP-02: Multigrain** | 1. Multigrain Laddu (Mom to Be)<br>2. Multigrain Laddu (Postnatal)<br>3. Healthy Delights Multigrain Laddu | 3 separate listings | Map to canonical `multigrain-laddu`. Verify whether Healthy Delights uses a different sweetener or batch. | **Configurable in Data Layer** |
| **GRP-03: Ragi** | 1. Ragi Laddu (All Trimester)<br>2. Ragi Laddu (Postnatal)<br>3. Healthy Delights Ragi Laddu<br>4. Puffed Ragi Laddu | 4 listings (Puffed Ragi is distinct texture) | Keep `puffed-ragi-laddu` separate. Consolidate Ragi Laddu listings if formulation matches. | **Configurable in Data Layer** |
| **GRP-04: Oats** | 1. Oats Laddu (Mom to Be)<br>2. Healthy Delights Oats Laddu | 2 listings | Map to canonical `oats-laddu`. Confirm recipe distinction. | **Configurable in Data Layer** |
| **GRP-05: Dhaniya** | 1. Dhaniya Laddu (Mom to Be)<br>2. Healthy Delights Dhaniya Laddu | 2 listings | Map to canonical `dhaniya-laddu`. Confirm recipe distinction. | **Configurable in Data Layer** |
| **GRP-06: Dana Methi** | 1. Dana Methi Laddu (Standard)<br>2. Healthy Delights Dana Methi Laddu | 2 listings | Postpartum recovery/lactation product. Verify formulation difference. | **Configurable in Data Layer** |
| **GRP-07: Gond Giri** | 1. Gond Giri Laddu (Standard, ₹490)<br>2. Healthy Delights Gond Giri Laddu (₹690) | 2 listings with ₹200 price discrepancy | Retain price and pack weight audit. Check if premium line contains saffron/dry fruits. | **Price audit pending** |
| **GRP-08: Nari Kalyan**| 1. Nari Kalyan Panjiri (Standard)<br>2. Healthy Delights Nari Kalyan Panjiri | 2 listings | Postpartum restorative panjiri. Verify recipe difference. | **Configurable in Data Layer** |

---

## 3. High-Priority Hero Products & Stage Kits Status

| Product / Kit Name | Intended Stage | Primary Need | Ingredients / Nutrition Status | Clinical Review Status | Recommendation Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1st Trimester Gentle Start Kit** | 1st Trimester | Nausea, Morning Cravings | Orange & Cacao + Gentle Items (pending) | **Review Pending** | Held from automatic plan |
| **Orange and Cacao Laddu** | 1st Trimester | Nausea & Cravings | Lab sheet verification pending | **Review Pending** | Default 1st Tri Hero (Provisional) |
| **2nd Trimester Energy Kit** | 2nd Trimester | Energy & Protein, Calcium | Multigrain + Vanilla Cacao + Ragi Mix | **Review Pending** | Held from automatic plan |
| **Multigrain Laddu** | 2nd Trimester | Sustained Energy | Nutrition table pending lab source | **Review Pending** | To be confirmed |
| **3rd Trimester Vitality Kit** | 3rd Trimester | Vitality, Iron & Preparation | Dryfruit + Seeds Mix + Puffed Ragi | **Review Pending** | Coffee item excluded |
| **Dryfruit Laddu** | 3rd Trimester / Postpartum | Iron & Healthy Fats | Full ingredient percentages pending | **Review Pending** | Standard Hero candidate |
| **Coffee and Badam Laddu** | 3rd Trimester (Audit issue X3) | Energy | Caffeine level unverified | **Clinical Review Pending (Caffeine Risk)** | **STRICTLY EXCLUDED from plans** |
| **Postpartum Recovery Kit** | Postpartum (Days 1–40) | Uterine Recovery & Healing | Gond Giri, Nari Kalyan Panjiri, Saunth Jaapa, Dana Methi | **Review Pending for acute post-birth** | Postpartum plan candidate |
| **Gond Giri Laddu** | Postpartum | Bone strength & Recovery | Traditional edible gum + ghee | **Review Pending** | Postpartum Hero candidate |
| **Dana Methi Laddu** | Postpartum | Lactation support | Fenugreek, spices | **Review Pending** | Postpartum candidate |
| **Healthy Delights Ashwagandha Laddu** | Antenatal (Audit issue X1) | Stress / Vitality | Ashwagandha root content | **NOT FOR PREGNANCY (Clinical Review Gate)** | **STRICTLY EXCLUDED from pregnancy** |
| **Healthy Delights Safed Musli Laddu** | Antenatal (Audit issue X1) | Strength | Safed Musli root content | **NOT FOR PREGNANCY (Clinical Review Gate)** | **STRICTLY EXCLUDED from pregnancy** |
| **Jannani 30-Day Programme** | Postpartum | 30-day comprehensive care | Kit breakdown & daily schedule to confirm | **Review Pending** | Dedicated programme page |
| **Prasavitri 40-Day Programme**| Postpartum | 40-day traditional Jaapa | Kit breakdown & daily schedule to confirm | **Review Pending** | Dedicated programme page |

---

## 4. PDP Data Field Audit & Verification Rules

Every product record in the data layer must declare the status of each mandatory field:

```
[FIELD]                          [STATUS]
Product Name                     Canonicalized; no bracketed "(1st Trimester)" hardcoded in title
Stage Tags                       Array of controlled vocabularies; requires Clinical Review approval
Need Tags                        Array of user-centric needs (iron, energy, digestion, etc.)
Ingredients with %               Information pending (awaiting packaging spec sheet)
Nutrition per Serving / 100g     Information pending (awaiting NABL lab certificate)
Allergen Panel                   Flags for nuts, dairy/ghee, gluten, sesame, seeds (Information pending)
Serving Guidance by Stage        Mandatory: quantity, timing, with what, duration (Clinical review pending)
Shelf Life & Storage             Mandatory: best before & storage instructions (Information pending)
FSSAI License                    To be confirmed with brand QA
Doctor Review Block              Reviewer name, hospital, qualification, scope, date (Pending sign-off)
Price per 100g                   Calculated dynamically from pack size and variant price
```

*Note: In the prototype, whenever any field above lacks verified source documentation, the UI explicitly displays `"Information pending"` or `"Clinical review pending"` with neutral styling rather than generating filler content.*
