# Maa Mitahara — Design System & Visual Guidelines (Ignite — Peak Architecture)

**Document Version:** 2.0.0  
**Design Reference:** Shopify Ignite — Peak Preset ([Shopify Themes Reference](https://themes.shopify.com/themes/ignite/presets/peak))  
**Governing Hierarchy:**
- **LEVEL 1 — BUSINESS (Governing):** Maa Mitahara PRD v2 (Customer, stage architecture, needs, quiz, recommendation logic, clinical safeguards, retention, product data).
- **LEVEL 2 — DESIGN ARCHITECTURE:** Shopify Ignite — Peak (Layout, section structure, navigation style, product merchandising, cards, spacing, visual hierarchy, PDP composition, ecommerce interactions).
- **LEVEL 3 — BRAND:** Maa Mitahara (Proprietary natural Indian palette, warm typography, authentic photography, nourishing tone).

---

## 1. Proprietary Color Palette (Peak Restraint + Indian Natural Purity)

The palette embodies: *Indian + Natural + Premium + Nutritional + Trustworthy*  
(Strictly avoids: Ayurvedic kitsch, neon pinks, clinical pharma whites, or cluttered marketplace aesthetics).

| Token | Hex Value | Role in Architecture |
| :--- | :--- | :--- |
| **`ivory-50` (Primary Canvas)** | `#FBF9F5` | Main background; warm, breathable ivory tone for high-end wellness feel. |
| **`cream-100` (Cards & Containers)** | `#F3EFE6` | Surface for product cards, section panels, mega menu containers. |
| **`cream-200` (Borders & Dividers)** | `#E6DFD1` | Crisp architectural dividers, border lines, subtle tab borders. |
| **`earth-green-800` (Main Brand & Primary CTA)** | `#1E3A2F` | Deep earthy botanical green; authoritative, grounded, natural luxury. |
| **`earth-green-900` (Dark Contrast)** | `#152820` | Hover states, high-contrast button states. |
| **`sage-500` (Secondary Brand)** | `#5B7B68` | Subheadings, feature iconography, secondary badges. |
| **`sage-50` (Botanical Tint)** | `#EEF3EF` | Clinical quotes, doctor review badges, safety confirmations. |
| **`terracotta-600` (Warm Accent)** | `#A84D35` | Warm Indian spice accent, interactive focus rings, active stage highlights. |
| **`peach-100` (Highlight)** | `#F5E6DD` | Trial pack banners, subtle promo tags, notification badges. |
| **`charcoal-900` (Primary Typography)** | `#211D1A` | Deep charcoal/brown; editorial clarity with high legibility. |
| **`charcoal-600` (Secondary Copy)** | `#574F49` | Nutritional metadata, serving descriptions, price per 100g. |

---

## 2. Peak Navigation & Header Architecture

1. **Sticky Header with Announcement Utility**:
   - Top banner: Trust statement, FSSAI verification note, free shipping threshold (₹999).
   - Primary Bar: Logo, Mega Menu Navigation, Persistent Stage Chip, Search Trigger, Cart Drawer Counter.
2. **Standardized Navigation Structure**:
   `Shop by Stage | Shop by Need | Products | Find My Plan | Learn | Our Story`
3. **Mega-Menu Merchandising**:
   - Multi-column layout with category breakdown and direct promotional hero tiles.
   - Stage mega-menu includes gestational week markers + direct links to Stage Starter Kits.
4. **Mobile Navigation Drawer**:
   - Slide-over drawer with expandable category trees and direct bottom stage switcher.

---

## 3. Peak Product Card System

A focused, uncluttered hierarchy displaying essential merchandising data:
```
┌──────────────────────────────────────────────┐
│ [Product Image Container]                    │
│   • Top Left: Stage Badge (e.g. 2nd Tri)     │
│   • Top Right: Trial Pack Available (Peach)  │
│   • Hover: Subtle zoom / secondary angle     │
├──────────────────────────────────────────────┤
│ Product Name (Font-serif, bold)              │
│ Primary Need Tag (e.g. Energy & Iron)        │
│ Short Nutritional Cue (Sprouted Ragi & Ghee) │
│ Price (₹490) + Price per 100g (₹245/100g)   │
│ Rating & Stage Review Count (4.9 ★ · 388)    │
├──────────────────────────────────────────────┤
│ [ Quick Add to Plan / View Product CTA ]     │
└──────────────────────────────────────────────┘
```

---

## 4. Peak PDP Architecture

Merchandising layout following Peak's proven conversion composition:
- **Left Column**: High-resolution gallery with image thumbnails and botanical highlight badges.
- **Right Column**:
  - Stage indicator badge (`2nd Trimester`)
  - Product title & one-line stage positioning
  - Price & Pack Size Selector (Trial pack, 200g, 500g) with calculated price per 100g
  - Subscribe & Stage Transition toggle (Save 10%, auto-swaps at trimester boundary)
  - Primary Add to Cart CTA with Free Shipping progress cue
  - "Why It's in Your Plan" clinical rationale highlights
  - **Peak-Style Accordion Tabs**:
    1. *Nutritional Values per Serving & 100g*
    2. *Full Ingredients & Whole Food Sourcing*
    3. *Declared Allergens & Medical Cautions*
    4. *How to Consume & Stage-Specific Serving Limits*
    5. *Clinical Review Scope (Doctor Sign-off)*
- **Bottom Sections**:
  - Customer Proof (Stage and week-filtered reviews)
  - "You May Also Need" (Pairs Well With from the stage plan)
  - Next-Stage progression module

---

## 5. Homepage Merchandising Rhythm (13 Sections)

1. **Hero**: High-impact editorial hero with clear dual CTA and trust indicators.
2. **Where are you in your journey?**: Interactive stage tabs and role entry points.
3. **Find My Plan**: 90-second Stage Quiz banner with personal diet routine teaser.
4. **Shop by Stage**: 5 Gestational hubs with week ranges and Starter Kit highlights.
5. **Why Maa Mitahara**: 4-pillar value proposition in a clean Peak grid.
6. **Featured / Hero Products**: Merchandised product showcase with Peak card system.
7. **Shop by Need**: 7 Customer symptom hubs.
8. **Doctor / Expert Trust**: Medical panel profiles and clinical review agreements.
9. **Nutrition & Ingredients**: Purity and whole-food sourcing transparency.
10. **Customer Proof**: Trimester-specific verified review cards.
11. **Educational Content**: Diet charts, Jaapa guide, and Ayurvedic nutrition articles.
12. **Next-Stage Journey**: Progression timeline from conception to postpartum recovery.
13. **Final CTA**: Full-width high-converting banner leading directly into the Stage Quiz.
