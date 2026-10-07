# Maa Mitahara — Frontend Architecture & Technical Design

**Document Version:** 1.0.0  
**Governing Document:** Maa Mitahara Website PRD v2 (Oct 6, 2026)  
**Implementation Model:** High-Fidelity Strategic Experience Prototype (Next.js / TypeScript / Tailwind CSS)

---

## 1. Architectural Philosophy & Constraints

1. **Strategic UX First, Clean Decoupled Mocks for Commerce Infrastructure:**
   - E-commerce operations (Shopify checkout, payment gateways, live subscription recurring charges, live WhatsApp Business Cloud API webhooks) are exposed through **modular service interfaces** (`/src/services/mock/`).
   - The user experience behaves identically to production without hard-coding proprietary backend dependencies.
2. **Safety-First Clinical Recommendations:**
   - Any product query for quiz plans or stage recommendations routes through the `SafetyGate`:
     $$\text{isRecommended} \iff (\text{clinicalReviewStatus} === \text{'approved'}) \land (\neg \text{hasExcludedAllergen}) \land (\neg \text{contraindicated})$$
   - Products with `clinicalReviewStatus: 'pending'` or `'not_for_pregnancy'` are automatically excluded from automated plans and badging.
3. **Canonical Data with Non-Destructive Duplicate Mapping:**
   - All 55 source catalogue items are preserved with their original SKUs and labels.
   - A `canonicalGroupId` bridges duplicate listings (e.g. Dryfruit Laddu Mom to Be vs Postnatal) into unified records without deleting historical data.

---

## 2. Directory Structure

```
maa-mitahara/
├── BUILD_STATUS.md             # Implementation tracking
├── OPEN_DECISIONS.md           # Clinical & commercial open questions
├── PRODUCT_DATA_STATUS.md      # Catalogue status & PDP field audit
├── CLAIMS_REGISTER.md          # FSSAI/ASCI claims matrix
├── DESIGN_SYSTEM.md            # Palette, typography & tokens
├── ARCHITECTURE.md             # System design (this file)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── src/
    ├── app/                    # Next.js App Router
    │   ├── layout.tsx          # Root layout with font injection & StageProvider
    │   ├── page.tsx            # Redesigned Homepage (Stage-first hero, pillars)
    │   ├── stage/
    │   │   └── [slug]/page.tsx # Stage Hubs (TTC, 1st, 2nd, 3rd, Postpartum)
    │   ├── need/
    │   │   └── [slug]/page.tsx # Need Hubs (Iron, Energy, Digestion, etc.)
    │   ├── product/
    │   │   └── [slug]/page.tsx # Structured 10-layer PDP
    │   ├── quiz/               # Stage Quiz & Plan Generator (Phase 2)
    │   ├── doctors/page.tsx    # Doctor Panel & Clinical Scope
    │   ├── quality/page.tsx    # Ingredients, Sourcing, FSSAI & Lab Testing
    │   ├── kits/page.tsx       # Stage Starter Kits & Programmes
    │   ├── learn/page.tsx      # Stage guides & Recipes
    │   ├── our-story/page.tsx  # Brand heritage & founder journey
    │   └── where-to-buy/page.tsx # D2C focus + secondary Amazon links
    ├── components/
    │   ├── ui/                 # Atomic UI (Button, Badge, Modal, Drawer, Tabs)
    │   ├── layout/             # Header, Navigation, Footer, StagePersistenceChip
    │   ├── stage/              # StageSelectorModal, StagePreviewCard, StageBanner
    │   ├── product/            # ProductCard, PricePer100g, NutritionTable, AllergenPanel
    │   ├── trust/              # DoctorCard, TrustStrip, ClaimsModule, LabReportCard
    │   └── safety/             # MedicalDisclaimer, ClinicalStatusBadge
    ├── context/
    │   └── StageContext.tsx    # Persistent stage state (localStorage, 90-day retention)
    ├── data/
    │   ├── catalog.ts          # Structured products + canonical duplicate mappings
    │   ├── stages.ts           # Controlled stage definitions & week thresholds
    │   ├── needs.ts            # Controlled need taxonomy
    │   ├── doctors.ts          # Verified doctor profiles (Dr. Ritu, Dr. Neha, Dr. Archana)
    │   ├── claims.ts           # Active claims data
    │   └── redirects.ts        # 301 legacy URL mapping table
    ├── services/
    │   └── mock/
    │       ├── shopifyService.ts       # Cart & session abstraction
    │       ├── whatsAppService.ts      # Automated message templates & opt-in
    │       ├── subscriptionService.ts  # Delivery intervals & stage-swap logic
    │       └── analyticsService.ts     # Funnel telemetry dispatch
    └── types/
        └── index.ts            # Core TypeScript interfaces
```

---

## 3. Core Data Flow & State Management

```
                      ┌───────────────────────────────┐
                      │    StageContext (Client)      │
                      │  • stage: StageKey | null     │
                      │  • weekNumber: number | null  │
                      │  • selectedNeeds: string[]    │
                      │  • restrictions: object       │
                      │  • 90-day localStorage sync   │
                      └──────────────┬────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐
│ Header & Stage Chip │   │ Stage Hub Routing   │   │ Recommendation      │
│ "Showing: 2nd Tri"  │   │ /stage/second-tri   │   │ Engine (SafetyGate) │
└─────────────────────┘   └─────────────────────┘   └──────────┬──────────┘
                                                               │
                                                               ▼
                                                    ┌─────────────────────┐
                                                    │ Verified Approved   │
                                                    │ Products Only       │
                                                    └─────────────────────┘
```

---

## 4. Decoupled Service Interfaces (Mock Layer)

1. **`ShopifyStorefrontService`**:
   - `getCart()`, `addToCart(variantId, quantity, isSubscription)`, `applyDiscount(code)`.
   - Enforces PRD `PU-4`: Single active offer gate (Quiz discount unlocks, free shipping at ₹999).
2. **`SubscriptionService`**:
   - `createSubscription(planId, intervalWeeks)`, `previewStageSwap(currentStage, nextStage)`.
   - Simulates automated trimester upgrade prompts.
3. **`WhatsAppService`**:
   - `sendPlanSummary(phone, planId)`, `scheduleReorderReminder(orderId, runDays)`.
   - Strictly enforces opt-in timestamp logging and 1-message-per-week promotional cap (`RT-2`, `SF-5`).
4. **`AnalyticsService`**:
   - `trackEvent(eventName, payload)`: Standardized event dispatching for funnel tracking (`stage_selected`, `quiz_started`, `plan_viewed`, `kit_added_to_cart`).
