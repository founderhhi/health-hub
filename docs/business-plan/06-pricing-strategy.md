# 06 — Pricing Strategy

**Health Hub Business Plan | Document 6 of 15**
**Version:** 1.0 | **Date:** March 2026 | **Status:** Working Draft
**Covers:** All 21 scenario x level combinations

> All assumptions, rates, scenarios, and phase definitions in this document are
> sourced from [params.md](./params.md). Refer to that document for any
> parameter clarification. Competitor pricing benchmarks are drawn from
> [15-competitive-analysis.md](./15-competitive-analysis.md). Revenue projections
> derived from this pricing strategy feed into 05-revenue-modelling.md.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Methodology](#2-methodology)
3. [Pricing Model Options Analysis](#3-pricing-model-options-analysis)
4. [Price Sensitivity by Market](#4-price-sensitivity-by-market)
5. [Pricing Evolution by Phase](#5-pricing-evolution-by-phase)
6. [Unit Economics](#6-unit-economics)
7. [Scenario Analysis — All 21 Combinations](#7-scenario-analysis--all-21-combinations)
8. [Pricing Comparison vs Competitors](#8-pricing-comparison-vs-competitors)
9. [Pricing Risks](#9-pricing-risks)
10. [Key Takeaways](#10-key-takeaways)
11. [Cross-References](#11-cross-references)

---

## 1. Executive Summary

Health Hub's pricing strategy is designed around a single constraint that
dominates all others: the East African consumer's ability and willingness to pay
for digital healthcare through mobile money. In Ethiopia, where GDP per capita
is approximately $1,020 and annual health expenditure per person is roughly $28,
a GP consultation priced above ETB 300 ($5.25) risks pricing out the majority
of the addressable market. In Kenya, higher incomes and mature M-Pesa
infrastructure support slightly higher ceilings, but a GP consultation above
KES 800 ($6.15) still faces resistance.

The recommended model is a **Hybrid Freemium + Pay-Per-Use** structure:

- **Free tier** covers registration, AI triage (limited), prescription/lab
  result viewing, health content, and notifications. This maximizes user
  acquisition and data collection during pilot phases.
- **Pay-per-use** charges per consultation (GP: ETB 150-300 / KES 300-500;
  Specialist: ETB 300-600 / KES 500-1,000), with video consultations carrying
  a modest premium over text/audio.
- **Premium subscription** (optional, production phase) offers bundled
  consultations, priority queuing, and family accounts at ETB 200-400 /
  KES 400-800 per month.
- **B2B facility pricing** transitions from free onboarding during pilots to
  monthly platform fees (ETB 2,000-5,000) plus 10-15% commission on routed
  consultations at production scale.

Unit economics are favorable because Health Hub operates as a marketplace
connecting patients to existing facility-based providers rather than employing
doctors directly. Platform margins on consultations range from 91-96% before
fixed cost allocation. The critical variable is volume: at production-phase
pricing, breakeven on monthly infrastructure requires approximately 80-120
consultations per month, a threshold achievable with 200-300 active patients.

This document models pricing across all 21 scenario combinations, showing how
funding level and investor timing affect pricing aggressiveness, payment
infrastructure readiness, and time-to-revenue. The baseline plan (S2-L2-I2)
targets full pricing by Month 10-12, with cumulative revenue exceeding
cumulative capital investment by Month 18-24.

---

## 2. Methodology

### 2.1 Competitive Benchmarking

Pricing was benchmarked against six categories of competitors (detailed in
Document 15):

| Category | Examples | GP Consult Range | Relevance |
|----------|----------|-----------------|-----------|
| East African digital health | Access Afya, mDoc, MyDawa | $2-8 | Direct competitors in target geography |
| South/Southeast Asian telehealth | Practo, Halodoc, 1mg | $2-15 | Similar income levels, mobile-first |
| African health tech (broader) | mPharma, Helium Health | Custom B2B | Infrastructure competitors |
| Global telehealth (premium) | Teladoc, Babylon/eMed | $50-100+ | Upper bound; not directly comparable |
| Government-funded models | Babylon Rwanda, NHS 111 | Free (gov't) | Demonstrates subsidy-dependent model |
| Walk-in clinic alternatives | Physical clinics in Addis/Nairobi | $2-15 | Offline substitutes Health Hub must undercut on convenience |

### 2.2 Willingness-to-Pay Analysis

Willingness-to-pay estimates are derived from three inputs:

1. **Current out-of-pocket health spending** in Ethiopia ($28/year per capita)
   and Kenya ($84/year per capita), adjusted for urban populations who spend
   2-3x the national average.
2. **M-Pesa/Telebirr transaction data** showing that the median mobile money
   transaction in Kenya is KES 1,000-2,000 ($7.70-15.40) and in Ethiopia is
   ETB 200-500 ($3.50-8.75), establishing a comfort range for digital payments.
3. **Competitor price points** for comparable services in similar markets
   (Section 8).

### 2.3 M-Pesa Minimum Viable Transaction Size

Mobile money providers impose practical minimums on transaction sizes due to
fee structures:

| Provider | Minimum Transaction | Minimum Fee | Implication |
|----------|-------------------|-------------|-------------|
| M-Pesa (Kenya) | KES 10 ($0.08) | KES 0 (free for small) | No floor constraint |
| Telebirr (Ethiopia) | ETB 10 ($0.18) | ~1% | Floor at ETB 10 |
| M-Pesa (Safaricom Ethiopia) | ETB 10 ($0.18) | ~1-2% | Floor at ETB 10 |

Conclusion: Mobile money does not impose a binding minimum for Health Hub's
target price range (ETB 100+ / KES 300+). However, symbolic pricing below
ETB 50 ($0.88) during pilots may encounter user friction from low perceived
value rather than technical constraints.

### 2.4 Unit Economics Requirement

Every price point must satisfy:

```
Price >= Marginal cost + Transaction fee + Contribution to fixed costs
```

Where marginal cost includes per-consultation infrastructure (compute, video
minutes, API calls) and transaction fees are 1-2% for mobile money. Fixed cost
contribution targets are phase-dependent, starting at zero during pilots and
reaching full allocation at production.

---

## 3. Pricing Model Options Analysis

### 3.1 Pay-Per-Consultation (Transactional)

| Parameter | Value |
|-----------|-------|
| **How it works** | Patient pays a fixed fee each time they request a GP or specialist consultation |
| **Pros** | Low barrier to entry; pay-as-you-go matches East African consumer behavior; no commitment anxiety; simple to understand |
| **Cons** | Unpredictable revenue month-to-month; no recurring commitment from patients; higher per-transaction payment friction |
| **Best for** | Early phases (Pilot 1-2) when user base is small and trust is being established |
| **M-Pesa compatibility** | Excellent — single transaction per service, no recurring billing complexity |
| **Revenue predictability** | Low — revenue = f(consultations), which varies with seasonality, competition, and user retention |

### 3.2 Monthly Subscription

| Parameter | Value |
|-----------|-------|
| **How it works** | Patient pays a fixed monthly fee for access to a bundle of services (e.g., 2-3 consultations, unlimited AI triage, priority queue) |
| **Pros** | Predictable MRR; encourages usage (sunk cost effect); higher lifetime value per patient; enables forecasting |
| **Cons** | Higher initial barrier in price-sensitive markets; churn risk if patients do not use enough services to justify the fee; requires robust recurring billing infrastructure |
| **Best for** | Production phase with loyal, proven user base; employers/insurers purchasing on behalf of employees |
| **M-Pesa compatibility** | Good — M-Pesa supports recurring mobile debits (standing orders), though consumer adoption of auto-debit is lower in East Africa than in developed markets |
| **Revenue predictability** | High — MRR directly observable and forecastable |

### 3.3 Freemium + Premium

| Parameter | Value |
|-----------|-------|
| **How it works** | Core services (registration, AI triage, result viewing, health content) are free; premium features (consultations, video, priority queue, family accounts) require payment |
| **Pros** | Maximum user acquisition velocity; free tier provides data and engagement even without payment; reduces barrier to platform adoption |
| **Cons** | Conversion risk — industry benchmarks show 2-5% freemium-to-paid conversion in emerging markets; free users consume infrastructure resources without generating revenue |
| **Best for** | All phases — free tier drives growth, premium tier drives revenue |
| **M-Pesa compatibility** | Good — payments only triggered when patient opts into premium services |
| **Revenue predictability** | Moderate — depends on conversion rate, which must be empirically determined |

### 3.4 Recommended Model: Hybrid Freemium + Pay-Per-Use

After evaluating all three models against East African market realities, the
recommended approach is a **hybrid** that combines freemium user acquisition
with transactional revenue:

#### Free Tier (Available from Pilot 1)

| Service | Included | Rationale |
|---------|----------|-----------|
| Patient registration and profile | Yes | Zero-friction onboarding |
| AI health triage | Limited (5 queries/month) | Demonstrates platform value; drives consultation conversion |
| View prescriptions and lab results | Yes | Utility that keeps patients returning |
| In-app notifications | Yes | Engagement and retention driver |
| Basic health content (HealWell videos) | Yes | Content marketing and health literacy |
| Appointment reminders | Yes | Reduces no-show rates for facilities |

#### Pay-Per-Use (Available from Pilot 2)

| Service | Ethiopia (ETB) | Ethiopia (USD) | Kenya (KES) | Kenya (USD) |
|---------|---------------|----------------|-------------|-------------|
| GP consultation (text/audio) | 150-300 | $2.63-5.25 | 300-500 | $2.30-3.85 |
| Specialist consultation (text/audio) | 300-600 | $5.25-10.50 | 500-1,000 | $3.85-7.70 |
| Video consultation premium (added to base) | +50-100 | +$0.88-1.75 | +100-200 | +$0.77-1.54 |
| Lab order facilitation fee | 50-100 | $0.88-1.75 | 100-200 | $0.77-1.54 |
| Prescription delivery coordination | 30-50 | $0.53-0.88 | 50-100 | $0.38-0.77 |
| Urgent/priority queue surcharge | +50-100 | +$0.88-1.75 | +100-200 | +$0.77-1.54 |

#### Premium Subscription (Available from Production)

| Parameter | Ethiopia (ETB) | Ethiopia (USD) | Kenya (KES) | Kenya (USD) |
|-----------|---------------|----------------|-------------|-------------|
| Monthly fee | 200-400 | $3.50-7.00 | 400-800 | $3.08-6.15 |
| Included GP consultations/month | 2-3 | — | 2-3 | — |
| Unlimited AI triage | Yes | — | Yes | — |
| Priority queue access | Yes | — | Yes | — |
| Family member add-on (per member) | +100-150 | +$1.75-2.63 | +200-300 | +$1.54-2.30 |
| Annual plan discount | 20% off monthly rate | — | 20% off monthly rate | — |

#### B2B Facility Pricing

| Phase | Monthly Platform Fee | Commission on Consultations | Notes |
|-------|---------------------|----------------------------|-------|
| Pre-Pilot | FREE | 0% | Internal testing only |
| Pilot 1 | FREE | 0% | Incentivize onboarding; no revenue from facilities |
| Pilot 2 | FREE or ETB 500/mo ($8.75) | 5% introductory | Build relationship; demonstrate value |
| Production | ETB 2,000-5,000/mo ($35-88) | 10-15% | Full commercial terms |
| Enterprise (hospital groups) | Custom (ETB 10,000+/mo) | 8-12% (volume discount) | Negotiated per contract |

---

## 4. Price Sensitivity by Market

### 4.1 Ethiopia (Primary Market)

| Factor | Detail |
|--------|--------|
| GDP per capita (2025) | ~$1,020 |
| Health expenditure per capita | ~$28/year (~$2.30/month) |
| Urban health expenditure (Addis Ababa, estimated) | ~$60-80/year (~$5-7/month) |
| Urban household income range | $100-400/month |
| Typical physical clinic visit cost | ETB 100-500 ($1.75-8.75) |
| Specialist clinic visit cost | ETB 300-1,500 ($5.25-26.30) |
| Digital payment adoption | Low but growing — Telebirr reached 40M+ users by 2025; M-Pesa (Safaricom Ethiopia) launched 2022 |
| Price ceiling for GP consultation | ETB 200-300 ($3.50-5.25) — must be cheaper than physical alternative |
| Price ceiling for specialist | ETB 400-600 ($7.00-10.50) — significant savings vs. in-person specialist |
| Key insight | Ethiopian consumers are extremely price-sensitive. Even middle-class Addis residents view healthcare spending as an emergency cost, not a routine budget item. Pricing must feel like a bargain compared to physical clinic visits, factoring in saved transport costs (ETB 20-50) and time (2-4 hours). |

#### 4.1.1 Ethiopian Price Ladder

| Percentile (Urban Addis) | Monthly Income (ETB) | Max Healthcare Budget | Max Single Consultation |
|--------------------------|---------------------|----------------------|------------------------|
| Bottom 30% | < 5,700 ($100) | ETB 100-200 ($1.75-3.50) | ETB 100 ($1.75) |
| Middle 40% | 5,700-17,100 ($100-300) | ETB 200-500 ($3.50-8.75) | ETB 200-300 ($3.50-5.25) |
| Upper 30% | > 17,100 ($300+) | ETB 500-1,500 ($8.75-26.30) | ETB 400-600 ($7.00-10.50) |

Health Hub's target segment is the **middle 40%**, with the upper 30% as
aspirational upsell for specialist and subscription products.

### 4.2 Kenya (Secondary Market)

| Factor | Detail |
|--------|--------|
| GDP per capita (2025) | ~$2,100 |
| Health expenditure per capita | ~$84/year (~$7/month) |
| Urban health expenditure (Nairobi, estimated) | ~$150-200/year (~$12-17/month) |
| Urban household income range | $200-800/month |
| Typical physical clinic visit cost | KES 500-2,000 ($3.85-15.40) |
| Specialist clinic visit cost | KES 2,000-8,000 ($15.40-61.50) |
| Digital payment adoption | Very high — M-Pesa processes ~$300B annually; 96% of Kenyans over 15 have used mobile money |
| Price ceiling for GP consultation | KES 500-800 ($3.85-6.15) |
| Price ceiling for specialist | KES 1,000-2,000 ($7.70-15.40) |
| Key insight | Kenyan consumers are more familiar with digital transactions and already pay for telecom-adjacent services via M-Pesa. The barrier is not payment infrastructure but perceived value. Health Hub must differentiate from free government clinics and cheap informal providers on quality and convenience. |

#### 4.2.1 Kenyan Price Ladder

| Percentile (Urban Nairobi) | Monthly Income (KES) | Max Healthcare Budget | Max Single Consultation |
|---------------------------|---------------------|----------------------|------------------------|
| Bottom 30% | < 26,000 ($200) | KES 500-1,000 ($3.85-7.70) | KES 300-500 ($2.30-3.85) |
| Middle 40% | 26,000-78,000 ($200-600) | KES 1,000-3,000 ($7.70-23.10) | KES 500-1,000 ($3.85-7.70) |
| Upper 30% | > 78,000 ($600+) | KES 3,000-10,000 ($23.10-77.00) | KES 1,000-2,000 ($7.70-15.40) |

### 4.3 Cross-Market Price Comparison

| Service | Ethiopia Target | Kenya Target | Ratio (KES/ETB in USD) | Notes |
|---------|----------------|-------------|----------------------|-------|
| GP consultation | ETB 200 ($3.50) | KES 500 ($3.85) | 1.10x | Near parity in USD — Kenya slightly higher |
| Specialist consultation | ETB 400 ($7.00) | KES 800 ($6.15) | 0.88x | Ethiopia slightly higher due to scarcity premium |
| Video premium | ETB 75 ($1.32) | KES 150 ($1.15) | 0.87x | Similar perceived value for video |
| Monthly subscription | ETB 300 ($5.25) | KES 600 ($4.62) | 0.88x | Kenya slightly lower as % of income |

---

## 5. Pricing Evolution by Phase

### 5.1 Phase-by-Phase Pricing Summary

| Phase | Timeline | Patient Pricing | Facility Pricing | Strategy | Payment Method |
|-------|----------|----------------|-----------------|----------|----------------|
| Pre-Pilot | M0-2 | FREE (all services) | FREE | Internal testing; no revenue; no payment integration | None |
| Pilot 1 | M2-5 | FREE or symbolic (ETB 10-50 / KES 20-100) | FREE | Habit formation; test payment flow; collect WTP data | Manual M-Pesa + confirmation code |
| Pilot 2 | M5-10 | Discounted (50% of target: GP ETB 100 / KES 250) | FREE or ETB 500/mo | Validate WTP; A/B test price points; first real revenue | M-Pesa API integration |
| Production | M10+ | Full pricing (GP ETB 200 / KES 500; Specialist ETB 400 / KES 800) | ETB 3,000/mo + 12% commission | Full revenue operations; margin optimization | M-Pesa + Telebirr + Stripe (card) |
| Extension | M24+ | Dynamic pricing; loyalty discounts; corporate packages | Tiered enterprise plans | Revenue optimization; geographic expansion pricing | All methods + insurance billing |

### 5.2 Pilot Pricing Rationale

During Pilot 1, the primary objective is **behavioral validation, not revenue**.
Charging even a symbolic fee (ETB 10-50) serves critical purposes:

1. **Payment flow testing**: Validates that M-Pesa integration works end-to-end
   before scaling.
2. **Willingness-to-pay signal**: Patients who pay even ETB 10 demonstrate
   genuine demand, filtering out curiosity users.
3. **Perceived value**: Completely free services are often perceived as low
   quality in East African healthcare markets. A nominal fee signals
   professional service.
4. **Behavioral baseline**: Establishes a payment habit that makes the Pilot 2
   price increase feel like an adjustment rather than a new imposition.

During Pilot 2, the 50% discount serves as a **price discovery mechanism**:

- A/B testing of 3-4 price points (e.g., ETB 100, 150, 200, 250 for GP)
  across user cohorts.
- Elasticity measurement: tracking consultation volume changes as price
  increases from symbolic to discounted to full.
- Conversion funnel analysis: what percentage of free-tier users convert to
  paid at each price point.

---

## 6. Unit Economics

### 6.1 Per-Consultation Unit Economics (Ethiopia, Production Phase)

| Metric | GP Consultation | Specialist Consultation | Video GP | Video Specialist |
|--------|----------------|------------------------|----------|-----------------|
| Patient pays | ETB 200 ($3.50) | ETB 400 ($7.00) | ETB 275 ($4.82) | ETB 500 ($8.77) |
| M-Pesa/Telebirr fee (1.5%) | ETB 3 ($0.05) | ETB 6 ($0.11) | ETB 4 ($0.07) | ETB 8 ($0.14) |
| Platform compute cost | ETB 3 ($0.05) | ETB 5 ($0.09) | ETB 5 ($0.09) | ETB 8 ($0.14) |
| Daily.co video cost | ETB 0 ($0.00) | ETB 0 ($0.00) | ETB 8 ($0.14) | ETB 15 ($0.26) |
| Claude AI API cost (triage) | ETB 2 ($0.04) | ETB 3 ($0.05) | ETB 2 ($0.04) | ETB 3 ($0.05) |
| SMS/notification cost | ETB 1 ($0.02) | ETB 1 ($0.02) | ETB 1 ($0.02) | ETB 1 ($0.02) |
| **Total marginal cost** | **ETB 9 ($0.16)** | **ETB 15 ($0.27)** | **ETB 20 ($0.36)** | **ETB 35 ($0.61)** |
| **Gross margin (ETB)** | **ETB 191 ($3.34)** | **ETB 385 ($6.73)** | **ETB 255 ($4.46)** | **ETB 465 ($8.16)** |
| **Gross margin (%)** | **95.5%** | **96.3%** | **92.7%** | **93.0%** |

### 6.2 Per-Consultation Unit Economics (Kenya, Production Phase)

| Metric | GP Consultation | Specialist Consultation | Video GP | Video Specialist |
|--------|----------------|------------------------|----------|-----------------|
| Patient pays | KES 500 ($3.85) | KES 800 ($6.15) | KES 650 ($5.00) | KES 1,000 ($7.70) |
| M-Pesa fee (1.5%) | KES 8 ($0.06) | KES 12 ($0.09) | KES 10 ($0.08) | KES 15 ($0.12) |
| Platform compute cost | KES 7 ($0.05) | KES 12 ($0.09) | KES 12 ($0.09) | KES 18 ($0.14) |
| Daily.co video cost | KES 0 ($0.00) | KES 0 ($0.00) | KES 18 ($0.14) | KES 34 ($0.26) |
| Claude AI API cost | KES 5 ($0.04) | KES 7 ($0.05) | KES 5 ($0.04) | KES 7 ($0.05) |
| SMS/notification cost | KES 3 ($0.02) | KES 3 ($0.02) | KES 3 ($0.02) | KES 3 ($0.02) |
| **Total marginal cost** | **KES 23 ($0.17)** | **KES 34 ($0.25)** | **KES 48 ($0.37)** | **KES 77 ($0.59)** |
| **Gross margin (KES)** | **KES 477 ($3.68)** | **KES 766 ($5.90)** | **KES 602 ($4.63)** | **KES 923 ($7.11)** |
| **Gross margin (%)** | **95.4%** | **95.8%** | **92.6%** | **92.3%** |

### 6.3 Fixed Cost Allocation

High per-consultation gross margins do not translate directly to profitability
because fixed costs must be absorbed by consultation volume:

| Fixed Cost Category | Monthly Cost (Pilot 2) | Monthly Cost (Production) |
|--------------------|----------------------|--------------------------|
| Infrastructure (Render, DB) | $80-150 | $150-400 |
| Daily.co base fee | $0 (free tier) | $0-99 (Growth tier) |
| Claude API base usage | $10-30 | $30-100 |
| SMS/email service | $5-20 | $20-80 |
| Domain, SSL, CDN | $5 | $10-20 |
| **Total monthly fixed** | **$100-205** | **$210-699** |

### 6.4 Breakeven Volume

| Phase | Fixed Costs/mo | Avg Margin/Consultation | Breakeven Consultations/mo |
|-------|---------------|------------------------|---------------------------|
| Pilot 2 | $150 | $3.00 | ~50 |
| Production (low) | $300 | $3.50 | ~86 |
| Production (mid) | $500 | $4.00 | ~125 |
| Production (high) | $700 | $4.50 | ~156 |

At production scale with 500+ active patients averaging 1.5 consultations per
month, the platform would process ~750 consultations/month, generating roughly
$2,600-3,400 in gross revenue — well above the fixed cost breakeven threshold.

### 6.5 Subscription Unit Economics

| Parameter | Value |
|-----------|-------|
| Monthly subscription price (avg) | ETB 300 ($5.25) |
| Expected consultations used per subscriber | 1.5-2.0/month |
| Cost of 2 consultations at marginal rate | ETB 18-30 ($0.32-0.53) |
| Subscription gross margin | ETB 270-282 ($4.72-4.93) |
| Subscription gross margin % | 90-94% |
| Breakeven vs pay-per-use | Subscriber is more profitable if they use fewer than 1.5 consultations/month; comparable at 1.5-2.0; less profitable above 2.5 |

---

## 7. Scenario Analysis — All 21 Combinations

This section models how pricing strategy varies across all 21 combinations
defined in params.md. The key variables that change between combinations are:

- **Payment infrastructure readiness**: Lower funding levels delay M-Pesa API
  integration, limiting pricing options.
- **Price point aggressiveness**: Better-funded combinations can sustain lower
  introductory prices longer, building volume before raising prices.
- **Time to full pricing**: Higher investment levels reach production pricing
  faster.
- **B2B pricing leverage**: More facilities onboarded (correlated with funding)
  creates network effects that justify B2B fees.

### 7.1 Scenario 1: Fully Self-Funded (3 Combinations)

No external investor at any point. All revenue must eventually cover all costs.
Pricing is more aggressive (higher) sooner because there is no investor capital
to subsidize growth.

---

#### S1-L1: Bootstrapped Self-Funded ($500/mo)

**Pricing constraint:** Cannot afford M-Pesa API integration until Pilot 2 at
earliest. Payment collection during Pilot 1 is manual (patient sends M-Pesa to
a Till number, confirms via screenshot or code).

| Phase | Timeline | GP Price (ETB) | GP Price (USD) | Specialist (ETB) | Specialist (USD) | Facility Fee | Revenue Strategy |
|-------|----------|---------------|----------------|------------------|------------------|-------------|-----------------|
| Pre-Pilot | M0-4 | FREE | $0.00 | FREE | $0.00 | FREE | No revenue; cannot invest in payment flow |
| Pilot 1 | M4-10 | 10-50 (symbolic) | $0.18-0.88 | 50-100 (symbolic) | $0.88-1.75 | FREE | Manual payment; test willingness; minimal revenue |
| Pilot 2 | M10-18 | 100-150 (50% disc.) | $1.75-2.63 | 200-300 (50% disc.) | $3.50-5.25 | FREE | First real revenue; delayed M-Pesa API |
| Production | M18-24+ | 150-200 | $2.63-3.50 | 300-400 | $5.25-7.00 | ETB 2,000/mo | Full pricing, lower end of range |

**Monthly revenue projection at production (M18+):**

| Revenue Stream | Calculation | Monthly (ETB) | Monthly (USD) |
|----------------|-------------|---------------|---------------|
| Patient consultations | 200 patients x 1.5 consults x ETB 175 avg | 52,500 | $920 |
| Video premium | 30% video x 90 consults x ETB 75 | 6,750 | $118 |
| Lab/Rx facilitation | 100 orders x ETB 60 avg | 6,000 | $105 |
| Facility fees | 3 facilities x ETB 2,000 | 6,000 | $105 |
| Facility commission | 300 consults x ETB 175 x 10% | 5,250 | $92 |
| **Total** | | **76,500** | **$1,340** |

**Assessment:** Revenue barely covers ongoing costs ($500/mo self-fund +
$200-400/mo infra). Extremely slow path to ROI milestone. Pricing is
constrained by late payment infrastructure and small user base.

---

#### S1-L2: Ideal Self-Funded ($1,000/mo)

**Pricing constraint:** M-Pesa API integration feasible during Pilot 1 (Month
4-6). More features justify slightly higher pricing. Can invest in A/B price
testing during Pilot 2.

| Phase | Timeline | GP Price (ETB) | GP Price (USD) | Specialist (ETB) | Specialist (USD) | Facility Fee | Revenue Strategy |
|-------|----------|---------------|----------------|------------------|------------------|-------------|-----------------|
| Pre-Pilot | M0-3 | FREE | $0.00 | FREE | $0.00 | FREE | No revenue |
| Pilot 1 | M3-7 | 25-75 (symbolic) | $0.44-1.32 | 50-150 (symbolic) | $0.88-2.63 | FREE | M-Pesa sandbox; test real payments |
| Pilot 2 | M7-13 | 100-175 (50% disc.) | $1.75-3.07 | 200-350 (50% disc.) | $3.50-6.14 | ETB 500/mo | Active A/B testing; real revenue |
| Production | M13-18+ | 175-250 | $3.07-4.39 | 350-500 | $6.14-8.77 | ETB 3,000/mo | Full pricing, mid-range |

**Monthly revenue projection at production (M13+):**

| Revenue Stream | Calculation | Monthly (ETB) | Monthly (USD) |
|----------------|-------------|---------------|---------------|
| Patient consultations | 400 patients x 1.5 consults x ETB 210 avg | 126,000 | $2,210 |
| Video premium | 35% video x 210 consults x ETB 75 | 15,750 | $276 |
| Lab/Rx facilitation | 200 orders x ETB 70 avg | 14,000 | $246 |
| Facility fees | 5 facilities x ETB 3,000 | 15,000 | $263 |
| Facility commission | 600 consults x ETB 210 x 12% | 15,120 | $265 |
| **Total** | | **185,870** | **$3,260** |

**Assessment:** Healthy revenue trajectory. Covers ongoing costs with margin.
Path to ROI milestone within 18-24 months of production launch.

---

#### S1-L3: Fully Funded Self-Funded ($2,000/mo)

**Pricing constraint:** Full development capacity means earlier feature
delivery, earlier payment integration, and more competitive pricing. Can afford
to keep prices lower longer to build volume.

| Phase | Timeline | GP Price (ETB) | GP Price (USD) | Specialist (ETB) | Specialist (USD) | Facility Fee | Revenue Strategy |
|-------|----------|---------------|----------------|------------------|------------------|-------------|-----------------|
| Pre-Pilot | M0-2 | FREE | $0.00 | FREE | $0.00 | FREE | No revenue |
| Pilot 1 | M2-5 | 25-100 (symbolic) | $0.44-1.75 | 75-200 (symbolic) | $1.32-3.50 | FREE | M-Pesa live in sandbox by M3 |
| Pilot 2 | M5-9 | 125-200 (discounted) | $2.19-3.50 | 250-400 (discounted) | $4.39-7.00 | ETB 500-1,000/mo | Aggressive A/B testing; subscription beta |
| Production | M9-14+ | 200-300 | $3.50-5.25 | 400-600 | $7.00-10.50 | ETB 3,500-5,000/mo | Full pricing, upper range (premium product) |

**Monthly revenue projection at production (M9+):**

| Revenue Stream | Calculation | Monthly (ETB) | Monthly (USD) |
|----------------|-------------|---------------|---------------|
| Patient consultations | 600 patients x 1.5 consults x ETB 250 avg | 225,000 | $3,947 |
| Video premium | 40% video x 360 consults x ETB 85 | 30,600 | $537 |
| Subscriptions | 100 subscribers x ETB 300/mo | 30,000 | $526 |
| Lab/Rx facilitation | 350 orders x ETB 80 avg | 28,000 | $491 |
| Facility fees | 8 facilities x ETB 4,000 | 32,000 | $561 |
| Facility commission | 900 consults x ETB 250 x 12% | 27,000 | $474 |
| **Total** | | **372,600** | **$6,536** |

**Assessment:** Strong revenue position. Premium product features justify
higher pricing. Fastest self-funded path to ROI milestone. Subscription tier
viable at this scale.

---

### 7.2 Scenario 2: Investor Arrives at Pilot 2 Transition (9 Combinations)

Self-funded from Month 0 through Pilot 1 and into the Pilot 1-to-Pilot 2
transition. Investor capital enables payment infrastructure investment,
marketing-driven user acquisition, and the ability to sustain lower prices
longer to build volume.

**Pre-investor pricing** matches the corresponding S1-LX combination. Post-
investor pricing is shaped by the investor level (I1, I2, I3), which determines
how aggressively the platform can invest in growth vs. revenue extraction.

---

#### S2-L1-I1: Minimal Self-Fund + Minimal Investor ($500/mo + $25-40K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-4 | FREE | FREE | FREE | Matches S1-L1 |
| Pilot 1 | M4-10 | 10-50 | 50-100 | FREE | Manual payment; matches S1-L1 |
| Pilot 2 (post-investor) | M10-16 | 100-150 | 200-300 | FREE | Investor funds M-Pesa integration; 50% discount |
| Production | M16-22+ | 150-200 | 300-400 | ETB 2,000/mo | Modest investor capital exhausted; revenue-dependent |

**Production revenue:** ~$1,500-1,800/mo. Investor capital ($25-40K) extends
runway by 6-8 months but does not fundamentally change pricing power. Pricing
converges with S1-L1 at production.

---

#### S2-L1-I2: Minimal Self-Fund + Ideal Investor ($500/mo + $75-100K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-4 | FREE | FREE | FREE | Matches S1-L1 |
| Pilot 1 | M4-10 | 10-50 | 50-100 | FREE | Matches S1-L1 |
| Pilot 2 (post-investor) | M10-14 | 75-125 | 150-250 | FREE | Investor funds full payment infra + marketing |
| Production | M14-20+ | 175-250 | 350-500 | ETB 3,000/mo | Marketing-driven volume enables mid-range pricing |

**Production revenue:** ~$2,800-3,500/mo. Ideal investor capital funds proper
payment infrastructure and user acquisition, enabling competitive pricing and
meaningful volume. Strong path to ROI.

---

#### S2-L1-I3: Minimal Self-Fund + Full Investor ($500/mo + $150-250K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-4 | FREE | FREE | FREE | Matches S1-L1 |
| Pilot 1 | M4-10 | 10-50 | 50-100 | FREE | Matches S1-L1 (payment infra still manual) |
| Pilot 2 (post-investor) | M10-13 | 50-100 | 100-200 | FREE | Can afford lower prices longer; heavy marketing |
| Production | M13-18+ | 200-300 | 400-600 | ETB 4,000-5,000/mo | Volume-driven premium pricing; full feature set |

**Production revenue:** ~$5,000-7,000/mo. Full investor backing transforms
pricing strategy from revenue-extraction to volume-building. Lower Pilot 2
prices drive adoption; production prices are higher because product quality
justifies premium positioning.

---

#### S2-L2-I1: Steady Self-Fund + Modest Investor ($1,000/mo + $25-40K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-3 | FREE | FREE | FREE | Matches S1-L2 |
| Pilot 1 | M3-7 | 25-75 | 50-150 | FREE | M-Pesa sandbox ready |
| Pilot 2 (post-investor) | M7-12 | 100-175 | 200-350 | ETB 500/mo | Modest top-up extends Pilot 2 timeline |
| Production | M12-18+ | 175-225 | 350-450 | ETB 2,500-3,000/mo | Near S1-L2 production pricing |

**Production revenue:** ~$2,400-3,000/mo. The modest investor injection ($25-40K)
provides 3-5 months of additional runway but does not materially change pricing
power compared to S1-L2. Main benefit is reduced founder cash pressure, not
pricing flexibility.

---

#### S2-L2-I2: Steady Self-Fund + Ideal Investor — BASELINE PLAN ($1,000/mo + $75-100K)

This is the **recommended baseline scenario** for operational planning.

| Phase | Timeline | GP Price (ETB) | GP (USD) | Specialist (ETB) | Specialist (USD) | Facility Fee | Notes |
|-------|----------|---------------|----------|------------------|------------------|-------------|-------|
| Pre-Pilot | M0-3 | FREE | $0.00 | FREE | $0.00 | FREE | Core product hardening |
| Pilot 1 | M3-7 | 25-75 | $0.44-1.32 | 50-150 | $0.88-2.63 | FREE | M-Pesa integration; WTP testing |
| Pilot 2 (post-investor) | M7-11 | 100-175 | $1.75-3.07 | 200-350 | $3.50-6.14 | ETB 500/mo | A/B price testing; first real revenue |
| Production | M11-16+ | 200-275 | $3.50-4.82 | 400-550 | $7.00-9.65 | ETB 3,000-4,000/mo + 12% | Full commercial operations |

**Monthly revenue projection at production (M11+):**

| Revenue Stream | Calculation | Monthly (ETB) | Monthly (USD) |
|----------------|-------------|---------------|---------------|
| Patient consultations | 500 patients x 1.5 consults x ETB 235 avg | 176,250 | $3,092 |
| Video premium | 35% video x 262 consults x ETB 80 | 20,960 | $368 |
| Subscriptions | 75 subscribers x ETB 300/mo | 22,500 | $395 |
| Lab/Rx facilitation | 280 orders x ETB 75 avg | 21,000 | $368 |
| Facility fees | 7 facilities x ETB 3,500 | 24,500 | $430 |
| Facility commission | 750 consults x ETB 235 x 12% | 21,150 | $371 |
| **Total** | | **286,360** | **$5,024** |

**Assessment:** The baseline plan reaches $5,000/mo revenue at production
scale. With total capital invested of $6,000 (6 months self-fund) + $75,000-
100,000 (investor) = $81,000-106,000, the ROI milestone (cumulative revenue
>= cumulative investment) is projected at Month 28-36 from project start, or
Month 17-25 from production launch.

---

#### S2-L2-I3: Steady Self-Fund + Full Investor ($1,000/mo + $150-250K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-3 | FREE | FREE | FREE | Matches S1-L2 |
| Pilot 1 | M3-7 | 25-75 | 50-150 | FREE | Matches S1-L2 |
| Pilot 2 (post-investor) | M7-10 | 75-125 | 150-250 | FREE | Lower prices longer; heavy user acquisition |
| Production | M10-15+ | 200-300 | 400-600 | ETB 4,000-5,000/mo + 15% | Premium product; volume-driven |

**Production revenue:** ~$6,000-8,000/mo. Full investor backing enables
aggressive marketing spend during Pilot 2, building a larger user base that
supports premium production pricing. Subscription tier launched at Pilot 2
with full investor support.

---

#### S2-L3-I1: Full Self-Fund + Modest Investor ($2,000/mo + $25-40K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-2 | FREE | FREE | FREE | Matches S1-L3 |
| Pilot 1 | M2-5 | 25-100 | 75-200 | FREE | Matches S1-L3 |
| Pilot 2 (post-investor) | M5-8 | 125-200 | 250-400 | ETB 500-1,000/mo | Marginal investor top-up; pricing near S1-L3 |
| Production | M8-13+ | 200-275 | 400-550 | ETB 3,000-4,000/mo | Converges with S1-L3 pricing |

**Production revenue:** ~$4,500-5,500/mo. Behaves nearly identically to S1-L3
since the modest investor injection adds limited incremental capability beyond
what full self-funding already provides.

---

#### S2-L3-I2: Full Self-Fund + Ideal Investor ($2,000/mo + $75-100K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-2 | FREE | FREE | FREE | Matches S1-L3 |
| Pilot 1 | M2-5 | 25-100 | 75-200 | FREE | Matches S1-L3 |
| Pilot 2 (post-investor) | M5-8 | 100-175 | 200-350 | ETB 500/mo | Ideal investor enables marketing + lower prices |
| Production | M8-12+ | 200-300 | 400-600 | ETB 3,500-5,000/mo + 12% | Strong product + marketing = premium pricing |

**Production revenue:** ~$6,500-8,000/mo. The combination of full self-funded
development (fast feature delivery) and ideal investor capital (marketing +
infrastructure) produces the strongest product at an earlier date, supporting
premium pricing.

---

#### S2-L3-I3: Full Self-Fund + Full Investor — Maximum S2 ($2,000/mo + $150-250K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-2 | FREE | FREE | FREE | Matches S1-L3 |
| Pilot 1 | M2-5 | 25-100 | 75-200 | FREE | Matches S1-L3 |
| Pilot 2 (post-investor) | M5-8 | 75-125 | 150-250 | FREE | Aggressive volume play; lowest Pilot 2 prices |
| Production | M8-11+ | 225-325 | 450-650 | ETB 5,000+/mo + 15% | Maximum S2 scenario; premium positioning |

**Production revenue:** ~$8,000-11,000/mo. Full resources on both self-fund
and investor sides enable the longest runway of below-market pricing during
pilots, building the largest user base. Production pricing is premium because
the product is feature-complete, well-marketed, and has strong network effects.

---

### 7.3 Scenario 3: Investor Arrives Right After Pilot 1 (9 Combinations)

Self-funded only from Month 0 through early Pilot 1 (approximately 3 months).
Investor capital arrives earlier than S2, enabling earlier payment infrastructure,
earlier real pricing, and a longer subsidized growth period.

**Key pricing difference from S2:** Investor capital is available during the
entirety of Pilot 2 (not just the transition), meaning pricing can be more
patient (lower for longer) and payment infrastructure is ready sooner.

---

#### S3-L1-I1: Minimal Bridge + Minimal Investor ($500/mo + $25-40K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-4 | FREE | FREE | FREE | Matches S1-L1 |
| Pilot 1 | M4-7 | 10-50 | 50-100 | FREE | Shortened Pilot 1; manual payment |
| Pilot 2 (post-investor) | M7-14 | 75-150 | 150-300 | FREE | M-Pesa integration funded; price testing |
| Production | M14-20+ | 150-200 | 300-400 | ETB 2,000/mo | Modest pricing; small user base |

**Production revenue:** ~$1,500-2,000/mo. Earlier investor arrival (vs S2-L1-I1)
means M-Pesa is integrated sooner, but the small injection limits marketing
reach. Pricing converges with S2-L1-I1 at production.

---

#### S3-L1-I2: Minimal Bridge + Ideal Investor ($500/mo + $75-100K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-4 | FREE | FREE | FREE | Matches S1-L1 |
| Pilot 1 | M4-7 | 10-50 | 50-100 | FREE | Shortened by investor anticipation |
| Pilot 2 (post-investor) | M7-12 | 75-125 | 150-250 | FREE | Full payment infra; lower prices to build volume |
| Production | M12-17+ | 175-250 | 350-500 | ETB 3,000/mo + 12% | Strong pricing enabled by larger user base |

**Production revenue:** ~$3,000-4,000/mo. Earlier investor arrival enables
longer Pilot 2 at subsidized prices, building a larger user base that supports
mid-to-upper-range production pricing.

---

#### S3-L1-I3: Minimal Bridge + Full Investor ($500/mo + $150-250K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-4 | FREE | FREE | FREE | Matches S1-L1 |
| Pilot 1 | M4-7 | 10-50 | 50-100 | FREE | Short self-funded phase |
| Pilot 2 (post-investor) | M7-11 | 50-100 | 100-200 | FREE | Aggressive volume; lowest viable prices |
| Production | M11-16+ | 200-300 | 400-600 | ETB 4,000-5,000/mo + 15% | Premium pricing from large base |

**Production revenue:** ~$5,500-7,500/mo. Full investor backing from early in
Pilot 2 enables the most aggressive growth pricing. The product is feature-rich
earlier (despite minimal self-fund phase) because investor capital accelerates
development.

---

#### S3-L2-I1: Steady Bridge + Modest Investor ($1,000/mo + $25-40K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-3 | FREE | FREE | FREE | Matches S1-L2 |
| Pilot 1 | M3-5 | 25-75 | 50-150 | FREE | M-Pesa sandbox by M4 |
| Pilot 2 (post-investor) | M5-10 | 100-150 | 200-300 | ETB 500/mo | Modest top-up extends runway |
| Production | M10-16+ | 175-225 | 350-450 | ETB 2,500-3,000/mo | Near S1-L2 pricing |

**Production revenue:** ~$2,500-3,200/mo.

---

#### S3-L2-I2: Steady Bridge + Ideal Investor ($1,000/mo + $75-100K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-3 | FREE | FREE | FREE | Matches S1-L2 |
| Pilot 1 | M3-5 | 25-75 | 50-150 | FREE | Shortened Pilot 1 |
| Pilot 2 (post-investor) | M5-9 | 75-150 | 150-300 | FREE | Full Pilot 2 with investor backing |
| Production | M9-14+ | 200-275 | 400-550 | ETB 3,000-4,000/mo + 12% | Strong pricing from ideal combination |

**Production revenue:** ~$4,500-5,500/mo. Earlier investor arrival (vs S2-L2-I2
baseline) accelerates production by 2-3 months. The pricing strategy is
similar to the baseline plan but reaches full pricing sooner.

---

#### S3-L2-I3: Steady Bridge + Full Investor ($1,000/mo + $150-250K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-3 | FREE | FREE | FREE | Matches S1-L2 |
| Pilot 1 | M3-5 | 25-75 | 50-150 | FREE | Short self-funded bridge |
| Pilot 2 (post-investor) | M5-8 | 50-100 | 100-200 | FREE | Most aggressive growth pricing |
| Production | M8-12+ | 225-325 | 450-650 | ETB 4,000-5,000/mo + 15% | Premium product + large base |

**Production revenue:** ~$7,000-9,500/mo. Full investor capital from early
in the project lifecycle enables the most aggressive growth strategy with
the highest eventual production pricing.

---

#### S3-L3-I1: Full Bridge + Modest Investor ($2,000/mo + $25-40K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-2 | FREE | FREE | FREE | Matches S1-L3 |
| Pilot 1 | M2-4 | 25-100 | 75-200 | FREE | Quick Pilot 1 at full capacity |
| Pilot 2 (post-investor) | M4-7 | 125-200 | 250-400 | ETB 500-1,000/mo | Marginal investor impact |
| Production | M7-12+ | 200-275 | 400-550 | ETB 3,000-4,000/mo | Near S1-L3 |

**Production revenue:** ~$4,800-5,800/mo. Nearly identical to S1-L3 because
the full self-fund level already provides strong capability and the modest
investor adds marginal benefit.

---

#### S3-L3-I2: Full Bridge + Ideal Investor ($2,000/mo + $75-100K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-2 | FREE | FREE | FREE | Matches S1-L3 |
| Pilot 1 | M2-4 | 25-100 | 75-200 | FREE | Quick Pilot 1 |
| Pilot 2 (post-investor) | M4-7 | 75-150 | 150-300 | FREE | Investor enables marketing-driven growth |
| Production | M7-10+ | 225-325 | 450-650 | ETB 4,000-5,000/mo + 12% | Premium pricing + scale |

**Production revenue:** ~$7,000-9,000/mo. Strong combination: fast product
delivery from L3 self-fund plus ideal investor marketing capital produces
early production launch with competitive pricing power.

---

#### S3-L3-I3: Full Bridge + Full Investor — Maximum Scenario ($2,000/mo + $150-250K)

| Phase | Timeline | GP Price (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|---------------|------------------|-------------|-------|
| Pre-Pilot | M0-2 | FREE | FREE | FREE | Full development capacity |
| Pilot 1 | M2-4 | 25-100 | 75-200 | FREE | Fastest possible Pilot 1 |
| Pilot 2 (post-investor) | M4-6 | 50-100 | 100-200 | FREE | Maximum growth subsidy; lowest prices |
| Production | M6-10+ | 250-350 | 500-700 | ETB 5,000+/mo + 15% | Maximum premium positioning |

**Monthly revenue projection at production (M6+):**

| Revenue Stream | Calculation | Monthly (ETB) | Monthly (USD) |
|----------------|-------------|---------------|---------------|
| Patient consultations | 1,000 patients x 1.5 consults x ETB 300 avg | 450,000 | $7,895 |
| Video premium | 45% video x 675 consults x ETB 90 | 60,750 | $1,066 |
| Subscriptions | 200 subscribers x ETB 350/mo | 70,000 | $1,228 |
| Lab/Rx facilitation | 500 orders x ETB 85 avg | 42,500 | $746 |
| Facility fees | 12 facilities x ETB 5,000 | 60,000 | $1,053 |
| Facility commission | 1,500 consults x ETB 300 x 15% | 67,500 | $1,184 |
| **Total** | | **750,750** | **$13,172** |

**Assessment:** The theoretical maximum scenario. Fastest path to production
(Month 6-7), highest user base, strongest pricing power, and earliest ROI
milestone. Total capital invested: $6,000 (3 months self-fund) + $150,000-
250,000 = $156,000-256,000. At $13,000/mo revenue, ROI milestone reached in
Month 18-26 from project start.

---

### 7.4 Cross-Scenario Pricing Comparison Summary

#### Production-Phase GP Consultation Pricing (ETB)

| | S1 (Self-Funded) | S2-I1 ($25-40K) | S2-I2 ($75-100K) | S2-I3 ($150-250K) | S3-I1 ($25-40K) | S3-I2 ($75-100K) | S3-I3 ($150-250K) |
|---|---|---|---|---|---|---|---|
| **L1 ($500/mo)** | 150-200 | 150-200 | 175-250 | 200-300 | 150-200 | 175-250 | 200-300 |
| **L2 ($1,000/mo)** | 175-250 | 175-225 | 200-275* | 200-300 | 175-225 | 200-275 | 225-325 |
| **L3 ($2,000/mo)** | 200-300 | 200-275 | 200-300 | 225-325 | 200-275 | 225-325 | 250-350 |

*Baseline plan (S2-L2-I2)

#### Monthly Production Revenue (USD, Estimated)

| | S1 | S2-I1 | S2-I2 | S2-I3 | S3-I1 | S3-I2 | S3-I3 |
|---|---|---|---|---|---|---|---|
| **L1** | $1,340 | $1,500-1,800 | $2,800-3,500 | $5,000-7,000 | $1,500-2,000 | $3,000-4,000 | $5,500-7,500 |
| **L2** | $3,260 | $2,400-3,000 | $5,024* | $6,000-8,000 | $2,500-3,200 | $4,500-5,500 | $7,000-9,500 |
| **L3** | $6,536 | $4,500-5,500 | $6,500-8,000 | $8,000-11,000 | $4,800-5,800 | $7,000-9,000 | $13,172 |

*Baseline plan

#### Months to Production Launch

| | S1 | S2-I1 | S2-I2 | S2-I3 | S3-I1 | S3-I2 | S3-I3 |
|---|---|---|---|---|---|---|---|
| **L1** | M18 | M16 | M14 | M13 | M14 | M12 | M11 |
| **L2** | M13 | M12 | M11* | M10 | M10 | M9 | M8 |
| **L3** | M9 | M8 | M8 | M8 | M7 | M7 | M6 |

*Baseline plan

---

## 8. Pricing Comparison vs Competitors

### 8.1 Direct Competitor Pricing

| Platform | Market | GP Consult | Specialist | Subscription | Model | Status |
|----------|--------|-----------|------------|-------------|-------|--------|
| **Health Hub (target)** | Ethiopia/Kenya | $2.50-5.25 | $5.25-10.50 | $3.50-7/mo | Freemium + pay-per-use | Pre-revenue |
| **Access Afya** | Kenya | $2-5 (walk-in) | N/A | No | Walk-in + basic digital | Active |
| **MyDawa** | Kenya | N/A (pharmacy only) | N/A | No | E-pharmacy | Active |
| **mDoc** | Nigeria | Custom | Custom | $5-15/mo | B2B chronic care | Active |
| **Halodoc** | Indonesia | $2-8 | $5-15 | No | Pay-per-use | Active |
| **Practo** | India | $3-15 | $8-25 | $5-10/mo | Hybrid | Active |
| **1mg/Tata Health** | India | $2-5 | $5-12 | $4-8/mo | Hybrid | Active |
| **Babylon/eMed** | UK/Rwanda | Free (Rwanda, gov't) | N/A | $150-300/yr (UK) | B2G + B2C | Restructured |
| **Teladoc** | USA/Global | $50-75 | $75-100+ | $5-15 PEPM (B2B) | B2B employer | Active |

### 8.2 Pricing Position Analysis

Health Hub's target pricing positions it as follows:

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| vs. Physical clinics (Ethiopia) | 20-40% cheaper when transport + time saved | ETB 200 vs ETB 250-500 + transport |
| vs. Physical clinics (Kenya) | 30-50% cheaper when transport included | KES 500 vs KES 800-2,000 + transport |
| vs. Access Afya (Kenya) | Comparable price, superior convenience | $3-5 for both; Health Hub adds video + digital |
| vs. Halodoc (Indonesia) | Comparable but lower-income market | Similar $2-8 range; adjusted for purchasing power |
| vs. Practo (India) | Lower end of range, appropriate for income gap | India GDP/capita ~2x Ethiopia |
| vs. Teladoc/Babylon (global) | 90-95% cheaper | Not competing on same dimension; different market |

### 8.3 Competitive Pricing Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Access Afya launches digital consultations at lower price | Medium | High | Focus on specialist referral and full workflow — features Access Afya lacks |
| Government-subsidized telehealth program undercuts all private pricing | Low-Medium | Critical | Pivot to B2G model; offer platform as infrastructure to government program |
| mPharma or Helium Health enters East African telehealth | Medium | High | Speed to market; network effects from integrated pharmacy + lab + specialist |
| Safaricom/Ethio Telecom bundles telehealth with mobile subscription | Low | Critical | Partner rather than compete; offer white-label platform to telecoms |

---

## 9. Pricing Risks

### 9.1 Willingness-to-Pay Risk

**Risk:** Actual willingness to pay is lower than modeled, particularly in
Ethiopia where digital payment habits are still forming.

| Severity | Probability | Impact |
|----------|------------|--------|
| High | Medium | Revenue projections are 30-50% lower than modeled |

**Mitigation:**
- Pilot 1 and 2 include explicit A/B price testing across multiple cohorts.
- Free tier ensures user acquisition is not gated on willingness to pay.
- Price floor of ETB 100 ($1.75) for GP consultation is below the physical
  clinic alternative, creating a clear value proposition.
- Build in a 25% revenue buffer in all financial projections.

### 9.2 Mobile Money Transaction Minimums

**Risk:** M-Pesa or Telebirr impose minimum transaction amounts or fee
structures that make micro-pricing (under ETB 50) unviable.

| Severity | Probability | Impact |
|----------|------------|--------|
| Medium | Low | Symbolic pilot pricing may not be feasible via mobile money |

**Mitigation:**
- Pilot 1 symbolic pricing can use manual M-Pesa (till number + confirmation)
  rather than API integration.
- Target prices at production (ETB 150+) are well above any known transaction
  minimum.
- Consider bundled payments (pre-pay for 3 consultations) if per-transaction
  fees are prohibitive at low price points.

### 9.3 Competitor Undercutting

**Risk:** A well-funded competitor (mPharma, Helium Health, or a local entrant)
launches telehealth in Ethiopia/Kenya at below-cost pricing to capture market
share.

| Severity | Probability | Impact |
|----------|------------|--------|
| High | Medium | Price war erodes margins; must match or differentiate |

**Mitigation:**
- Health Hub's integrated platform (GP + specialist + pharmacy + lab + AI triage)
  is difficult to replicate quickly. Compete on breadth, not price alone.
- Build switching costs through prescription history, family accounts, and
  facility relationships.
- If a price war occurs, temporarily lower GP consultation price to cost
  (ETB 10-15) while maintaining specialist and B2B revenue streams.

### 9.4 Currency Devaluation

**Risk:** ETB devaluation against USD reduces the real value of revenue
collected in local currency. The ETB has experienced significant devaluation
events (40%+ in 2023-2024).

| Severity | Probability | Impact |
|----------|------------|--------|
| High | High (Ethiopia) / Medium (Kenya) | Revenue in USD terms declines; costs (infra, team) remain USD-denominated |

**Mitigation:**
- Include a 10-15% FX buffer in all revenue projections (per params.md).
- Adjust ETB prices upward quarterly to maintain USD-equivalent revenue.
- Diversify revenue geographically: Kenya (KES) provides a more stable
  currency hedge against ETB volatility.
- Consider pricing anchor in USD with local currency conversion at transaction
  time (requires careful UX to avoid confusing patients).

### 9.5 Regulatory Price Controls

**Risk:** Ethiopian or Kenyan government imposes price controls on telehealth
consultations, capping fees below Health Hub's target pricing.

| Severity | Probability | Impact |
|----------|------------|--------|
| Critical | Low | Must comply; may destroy unit economics |

**Mitigation:**
- Monitor regulatory developments through local legal counsel.
- Maintain a cost structure where even a 50% price reduction preserves
  positive unit economics (marginal cost is only ETB 9-35 per consultation).
- If price controls are imposed, shift revenue emphasis to B2B facility fees
  and commissions, which are less likely to be regulated.

### 9.6 Payment Infrastructure Delays

**Risk:** M-Pesa API integration takes longer or costs more than anticipated,
delaying the transition from free to paid services.

| Severity | Probability | Impact |
|----------|------------|--------|
| Medium | Medium | Revenue start delayed by 2-4 months |

**Mitigation:**
- Manual M-Pesa payment (till number + confirmation code) serves as a fallback
  during Pilot 1.
- Telebirr and M-Pesa (Ethiopia) APIs have different maturity levels; integrate
  whichever is ready first.
- Budget 80-120 development hours for payment integration (per
  04-effort-estimation.md).

### 9.7 Low Subscription Conversion

**Risk:** Premium subscription conversion rate is below the modeled 5-8%,
reducing predictable MRR.

| Severity | Probability | Impact |
|----------|------------|--------|
| Medium | Medium | MRR component underperforms; total revenue still viable from pay-per-use |

**Mitigation:**
- Subscription is positioned as an optional upside, not a primary revenue
  driver. Pay-per-use revenue alone must sustain the platform.
- Test subscription willingness during Pilot 2 before committing to production
  infrastructure for recurring billing.
- Offer a 30-day free trial for subscriptions to lower conversion friction.

---

## 10. Key Takeaways

1. **Hybrid freemium + pay-per-use is the right model for East Africa.** Pure
   subscription is too high a barrier for price-sensitive Ethiopian consumers;
   pure free-tier is unsustainable without deep venture funding. The hybrid
   model acquires users at zero cost and monetizes through consultation fees,
   which align with the existing mental model of paying per clinic visit.

2. **Unit economics are exceptionally favorable.** As a marketplace connecting
   patients to existing facility-based providers, Health Hub's marginal cost
   per consultation is only ETB 9-35 ($0.16-0.61), yielding 91-96% gross
   margins. The critical challenge is volume, not margin. At 80-125
   consultations per month, the platform covers its fixed infrastructure costs.

3. **Pricing strategy is more sensitive to investor timing than to price level.**
   The difference between GP consultation pricing at ETB 200 vs ETB 250 matters
   less than whether M-Pesa integration is ready in Month 5 vs Month 10. Across
   all 21 combinations, the primary pricing differentiator is how quickly the
   platform can deliver payment infrastructure, which is directly correlated
   with funding level and investor timing.

4. **The baseline plan (S2-L2-I2) targets $5,000/month at production.** At
   steady-state production pricing (GP ETB 200-275, Specialist ETB 400-550),
   with 500 active patients and 7 onboarded facilities, the platform generates
   approximately $5,000/month in gross revenue. This reaches the ROI milestone
   (cumulative revenue >= cumulative investment) within 17-25 months of
   production launch.

5. **Ethiopia and Kenya require separate pricing schedules but converge in USD
   terms.** Despite significant differences in income levels, payment
   infrastructure maturity, and consumer behavior, the target GP consultation
   price in both markets is approximately $3-5 in USD equivalent. The pricing
   difference is expressed in local currency (ETB 200 vs KES 500) rather than
   in real purchasing power. Kenya's higher digital payment maturity makes it
   the better market for testing pricing aggressiveness.

---

## 11. Cross-References

| Document | Relationship |
|----------|-------------|
| [params.md](./params.md) | Source of all scenario definitions, phase timelines, FX rates, and team costs |
| [05-revenue-modelling.md](./05-revenue-modelling.md) | Revenue projections are built on the pricing models defined here |
| [15-competitive-analysis.md](./15-competitive-analysis.md) | Competitor pricing benchmarks that inform Health Hub's pricing position |
| [02-services-slas.md](./02-services-slas.md) | Service definitions and phase availability that determine what is priced at each stage |
| [04-effort-estimation.md](./04-effort-estimation.md) | Development hours for payment infrastructure that constrain pricing timeline |

---

## Appendix A: Kenya Pricing Tables (Production Phase)

For completeness, production-phase pricing for all 21 combinations is provided
in KES for the Kenya market. Kenya pricing is derived from the Ethiopia ETB
pricing using the purchasing-power-adjusted ratio of approximately 2.3x
(KES per ETB equivalent in USD terms).

### A.1 Scenario 1 (Self-Funded) — Kenya

| Combo | GP (KES) | GP (USD) | Specialist (KES) | Specialist (USD) | Subscription (KES/mo) |
|-------|----------|----------|------------------|------------------|-----------------------|
| S1-L1 | 350-450 | $2.70-3.45 | 650-900 | $5.00-6.90 | N/A |
| S1-L2 | 400-550 | $3.10-4.25 | 800-1,100 | $6.15-8.45 | 500-700 |
| S1-L3 | 450-650 | $3.45-5.00 | 900-1,300 | $6.90-10.00 | 550-800 |

### A.2 Scenario 2 (Investor at P2) — Kenya

| Combo | GP (KES) | Specialist (KES) | Subscription (KES/mo) |
|-------|----------|------------------|-----------------------|
| S2-L1-I1 | 350-450 | 650-900 | N/A |
| S2-L1-I2 | 400-550 | 800-1,100 | 450-650 |
| S2-L1-I3 | 450-650 | 900-1,300 | 500-750 |
| S2-L2-I1 | 400-500 | 800-1,000 | N/A |
| S2-L2-I2* | 450-600 | 900-1,200 | 550-750 |
| S2-L2-I3 | 450-650 | 900-1,300 | 600-800 |
| S2-L3-I1 | 450-600 | 900-1,200 | 500-700 |
| S2-L3-I2 | 450-650 | 900-1,300 | 600-800 |
| S2-L3-I3 | 500-700 | 1,000-1,400 | 650-900 |

*Baseline plan

### A.3 Scenario 3 (Investor at P1) — Kenya

| Combo | GP (KES) | Specialist (KES) | Subscription (KES/mo) |
|-------|----------|------------------|-----------------------|
| S3-L1-I1 | 350-450 | 650-900 | N/A |
| S3-L1-I2 | 400-550 | 800-1,100 | 450-650 |
| S3-L1-I3 | 450-650 | 900-1,300 | 500-750 |
| S3-L2-I1 | 400-500 | 800-1,000 | N/A |
| S3-L2-I2 | 450-600 | 900-1,200 | 550-750 |
| S3-L2-I3 | 500-700 | 1,000-1,400 | 650-900 |
| S3-L3-I1 | 450-600 | 900-1,200 | 500-700 |
| S3-L3-I2 | 500-700 | 1,000-1,400 | 650-850 |
| S3-L3-I3 | 550-750 | 1,100-1,500 | 700-950 |

---

## Appendix B: Price Elasticity Assumptions

The following elasticity assumptions underpin the revenue projections in
Section 7. These are estimates to be validated during Pilot 2 A/B testing.

| Price Change | Volume Impact (Estimated) | Net Revenue Impact |
|-------------|--------------------------|-------------------|
| -50% (deep discount) | +80-120% volume | +40-60% revenue (volume-driven) |
| -25% (moderate discount) | +30-50% volume | +5-25% revenue |
| Base price (0% change) | Baseline volume | Baseline revenue |
| +25% (moderate increase) | -20-30% volume | -5-10% revenue |
| +50% (premium increase) | -35-50% volume | -15-25% revenue |

These estimates assume the GP consultation demand curve is relatively elastic
in the ETB 100-300 range, reflecting the availability of physical clinic
substitutes. Above ETB 300, demand becomes more inelastic as the remaining
patients are those with higher willingness-to-pay and stronger preference for
digital convenience.

Specialist consultations show lower elasticity because the physical alternative
(specialist clinic visit) is significantly more expensive, harder to access,
and involves longer wait times. Patients who need specialist care have fewer
substitutes.

---

## Appendix C: M-Pesa Integration Cost and Timeline

| Phase | Integration Level | Development Hours | Cost ($30/hr) | Payment Capability |
|-------|------------------|-------------------|---------------|-------------------|
| Pilot 1 | Manual (Till number + screenshot confirmation) | 10-15 hrs | $300-450 | Basic payment collection; no automated reconciliation |
| Pilot 2 | Sandbox API (Daraja API for M-Pesa Kenya; Telebirr API) | 60-80 hrs | $1,800-2,400 | Automated STK push; real-time confirmation; basic reconciliation |
| Production | Full API (live M-Pesa + Telebirr + Stripe fallback) | 40-60 hrs (incremental) | $1,200-1,800 | Full payment lifecycle; refunds; reconciliation; multi-currency |
| **Total** | | **110-155 hrs** | **$3,300-4,650** | |

This development investment is a prerequisite for transitioning from free to
paid pricing. In lower-funded combinations (L1), the payment integration
timeline is the primary bottleneck for revenue generation.

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2026-03-18 | 1.0 | Initial document creation — full 21-combination pricing analysis |

---

*End of 06-pricing-strategy.md*
