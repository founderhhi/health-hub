# 06 -- Pricing Strategy

**Health Hub Business Plan v2 | Document 6 of 15**
**Version:** 2.0 | **Date:** March 2026 | **Status:** Working Draft
**Covers:** All 21 scenario x level combinations

> All assumptions, rates, scenarios, and phase definitions in this document are
> sourced from [params.md](./params.md). Refer to that document for any
> parameter clarification. Competitor pricing benchmarks are drawn from
> [15-competitive-analysis.md](../15-competitive-analysis.md). Revenue projections
> derived from this pricing strategy feed into [05-revenue-modelling.md](./05-revenue-modelling.md).

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Methodology](#2-methodology)
3. [Pricing Model Options Analysis](#3-pricing-model-options-analysis)
4. [Price Sensitivity by Market](#4-price-sensitivity-by-market)
5. [Pricing Evolution by Phase](#5-pricing-evolution-by-phase)
6. [Unit Economics](#6-unit-economics)
7. [Scenario Analysis -- All 21 Combinations](#7-scenario-analysis--all-21-combinations)
8. [Pricing Comparison vs Competitors](#8-pricing-comparison-vs-competitors)
9. [Pricing Risks](#9-pricing-risks)
10. [Key Takeaways](#10-key-takeaways)
11. [Cross-References](#11-cross-references)

---

## 1. Executive Summary

Health Hub's pricing strategy is engineered around a single overriding constraint:
the East African consumer's ability and willingness to pay for digital healthcare
through mobile money. In Ethiopia, GDP per capita stands at approximately $1,020
and annual health expenditure per person is roughly $28. A GP consultation priced
above ETB 300 ($5.25) risks excluding the majority of the addressable market. In
Kenya, where GDP per capita reaches $2,100 and health expenditure is $84/year, the
ceiling is higher but still binding -- a GP consultation above KES 800 ($6.15)
faces meaningful resistance from the middle-income target segment.

The recommended model is a **Hybrid Freemium + Pay-Per-Use** structure:

- **Free tier** covers registration, AI triage (limited), prescription/lab result
  viewing, health content (HealWell videos), and notifications. This maximizes
  user acquisition and data collection during pilot phases while creating a habit
  loop that drives conversion.
- **Pay-per-use** charges per consultation (GP: ETB 150-300 / KES 300-500;
  Specialist: ETB 300-600 / KES 500-1,000), with video consultations carrying a
  modest premium over text/audio. This mirrors the existing mental model of paying
  per clinic visit, which is deeply embedded in East African healthcare behavior.
- **Premium subscription** (optional, production phase) offers bundled
  consultations, priority queuing, and family accounts at ETB 200-400 /
  KES 400-800 per month. This is positioned as incremental MRR upside, not a
  primary revenue driver.
- **B2B facility pricing** transitions from free onboarding during pilots to
  monthly platform fees (ETB 2,000-5,000) plus 10-15% commission on routed
  consultations at production scale. Enterprise hospital groups negotiate custom
  terms.

Unit economics are exceptionally favorable because Health Hub operates as a
marketplace connecting patients to existing facility-based providers rather than
employing doctors directly for most consultations. The company does employ a small
team of MBBS doctors (per params.md Section 4) for minimum clinical coverage and
continuity, but the marketplace model keeps marginal costs low. Platform margins
on consultations range from 91-96% before fixed cost allocation, with marginal
costs of only ETB 9-35 ($0.16-0.61) per consultation. The critical variable is
volume: at production-phase pricing, breakeven on monthly infrastructure requires
approximately 80-120 consultations per month, achievable with 200-300 active
patients.

This document models pricing across all 21 scenario combinations from params.md,
analyzing how funding level and investor timing affect pricing aggressiveness,
payment infrastructure readiness, and time-to-revenue. The baseline plan
(S2-O2-I2) targets full pricing by Month 10-12, with cumulative revenue exceeding
cumulative capital investment by Month 18-24 from production launch.

---

### Key Changes from v1

| Parameter | v1 Value | v2 Value | Reason |
|-----------|----------|----------|--------|
| Cost-to-serve model | Marketplace only | Marketplace + employed doctors (INR 60K/mo each) | params.md Section 4 discloses employed MBBS doctors for minimum coverage |
| Infrastructure costs | $30-400/mo | $65-1,500/mo by phase | v2 includes phones, telecom, callback tooling, devices |
| Development rate card | $24-36/hr blended | $10-20/hr by role | Founder-approved rate card with junior/senior split |
| Team composition | "Small team" | 3 core + 7 devs + 2 advisors (all part-time) | Real team disclosed |
| Parallel operational costs | Not modeled | 750 hours ($11,250) | SOPs, training, partner onboarding now tracked |
| B2B pricing | Mentioned | Fully phased with commission tiers | Facility economics now detailed |

---

## 2. Methodology

### 2.1 Competitive Benchmarking

Pricing was benchmarked against six categories of competitors (detailed in
Document 15):

| Category | Examples | GP Consult Range | Relevance to Health Hub |
|----------|----------|-----------------|------------------------|
| East African digital health | Access Afya, mDoc, MyDawa | $2-8 | Direct competitors in target geography; most relevant price anchors |
| South/Southeast Asian telehealth | Practo, Halodoc, 1mg | $2-15 | Similar income levels and mobile-first adoption patterns |
| African health tech infrastructure | mPharma, Helium Health | Custom B2B | Infrastructure competitors who could pivot to B2C |
| Global telehealth (premium) | Teladoc, Babylon/eMed | $50-100+ | Upper bound; not directly comparable but informs investor expectations |
| Government-funded models | Babylon Rwanda, NHS 111 | Free (gov't subsidized) | Demonstrates subsidy-dependent model risk |
| Walk-in clinic alternatives | Physical clinics in Addis/Nairobi | $2-15 | Offline substitutes that Health Hub must undercut on total cost (price + transport + time) |

### 2.2 Willingness-to-Pay Analysis

Willingness-to-pay estimates are derived from three complementary inputs:

1. **Current out-of-pocket health spending.** Ethiopia spends $28/year per capita
   and Kenya $84/year per capita (per params.md Section 9). Urban populations
   (Addis Ababa, Nairobi) spend 2-3x the national average, yielding estimated
   urban health budgets of $60-80/year (Ethiopia) and $150-200/year (Kenya).
   A single GP consultation must fit comfortably within a monthly healthcare
   budget of $5-7 (Ethiopia) or $12-17 (Kenya).

2. **Mobile money transaction behavior.** The median mobile money transaction in
   Kenya is KES 1,000-2,000 ($7.70-15.40) via M-Pesa, and in Ethiopia
   ETB 200-500 ($3.50-8.75) via Telebirr/M-Pesa. These ranges establish the
   "comfort zone" for single digital payments. Health Hub's target consultation
   prices (ETB 150-300, KES 300-500) fall within or below these medians,
   minimizing payment friction.

3. **Competitor price points.** Access Afya charges $2-5 for walk-in consultations
   in Nairobi. Practo charges $3-15 in India (GDP/capita ~$2,500, comparable to
   Kenya). Halodoc charges $2-8 in Indonesia (GDP/capita ~$4,300). Health Hub's
   target pricing of $2.50-5.25 for GP consultations is competitive with all
   relevant benchmarks.

### 2.3 Mobile Money Transaction Constraints

| Provider | Market | Minimum Transaction | Fee Structure | Implication for Health Hub |
|----------|--------|-------------------|---------------|--------------------------|
| Telebirr | Ethiopia | ETB 10 ($0.18) | ~1% | No floor constraint at target prices |
| M-Pesa (Safaricom Ethiopia) | Ethiopia | ETB 10 ($0.18) | ~1-2% | No floor constraint |
| M-Pesa (Safaricom Kenya) | Kenya | KES 10 ($0.08) | Free for small amounts, tiered above | No floor constraint |

**Conclusion:** Mobile money does not impose a binding minimum for Health Hub's
target price range (ETB 100+ / KES 300+). However, symbolic pricing below
ETB 50 ($0.88) during pilots may encounter user friction from low perceived
value rather than technical constraints.

### 2.4 Unit Economics Requirement

Every price point must satisfy the inequality:

```
Price >= Marginal cost + Transaction fee + Contribution to fixed costs
```

Where marginal cost includes per-consultation infrastructure (compute, video
minutes, AI API calls) and transaction fees are 1-2% for mobile money. Fixed cost
contribution targets are phase-dependent, starting at zero during pilots and
reaching full allocation at production. The employed doctor cost (per params.md
Section 4) is treated as a fixed operational cost, not a per-consultation marginal
cost, because doctors are salaried regardless of consultation volume.

---

## 3. Pricing Model Options Analysis

### 3.1 Pure Subscription Model

| Parameter | Assessment |
|-----------|------------|
| **How it works** | Patient pays a fixed monthly fee (ETB 200-400 / KES 400-800) for access to a bundle of services (e.g., 2-3 GP consultations, unlimited AI triage, priority queue) |
| **Pros** | Predictable MRR; encourages usage through sunk cost effect; higher lifetime value per patient; enables accurate revenue forecasting |
| **Cons** | High initial barrier in price-sensitive markets; ETB 200-400/month represents 4-7% of urban Ethiopian household income, which is a significant recurring commitment; churn risk if patients do not use enough services to justify the fee; requires robust recurring billing infrastructure (M-Pesa standing orders have low adoption in East Africa) |
| **Fit for East Africa** | Poor as primary model. Ethiopian consumers view healthcare as episodic (emergency-driven) rather than preventive. Monthly subscription conflicts with this mental model. May work as an optional premium tier for the upper 30% income segment at production scale. |
| **M-Pesa compatibility** | Moderate -- M-Pesa supports recurring debits (standing orders) but consumer adoption of auto-debit is low in East Africa compared to developed markets |
| **Revenue predictability** | High if adoption succeeds; low if churn is high |
| **Verdict** | **Not recommended as primary model.** Viable as optional premium tier at production phase. |

### 3.2 Pure Pay-Per-Use (Transactional)

| Parameter | Assessment |
|-----------|------------|
| **How it works** | Patient pays a fixed fee each time they request a GP or specialist consultation. No ongoing commitment. |
| **Pros** | Low barrier to entry; pay-as-you-go matches East African consumer behavior; no commitment anxiety; simple to understand; aligns with existing clinic visit payment model |
| **Cons** | Unpredictable revenue month-to-month; no recurring commitment from patients; revenue is f(consultations) which varies with seasonality, competition, and retention; higher per-transaction payment friction vs subscription |
| **Fit for East Africa** | Strong. Mirrors how patients currently pay for physical clinic visits. Telebirr and M-Pesa are optimized for single transactions. |
| **M-Pesa compatibility** | Excellent -- single transaction per service, no recurring billing complexity |
| **Revenue predictability** | Low -- driven by consultation volume, which fluctuates |
| **Verdict** | **Strong as primary revenue mechanism.** But misses user acquisition opportunity that a free tier provides. |

### 3.3 Freemium + Pay-Per-Use (Hybrid) -- RECOMMENDED

| Parameter | Assessment |
|-----------|------------|
| **How it works** | Core services (registration, AI triage, result viewing, health content) are free; premium services (GP/specialist consultations, video, priority queue) require per-use payment. Optional subscription bundle at production scale. |
| **Pros** | Maximum user acquisition velocity from free tier; free users provide data, engagement, and word-of-mouth even without payment; pay-per-use for consultations aligns with existing behavior; conversion funnel is measurable and optimizable; subscription as optional upside preserves MRR potential |
| **Cons** | Conversion risk -- industry benchmarks show 2-5% freemium-to-paid conversion in emerging markets; free users consume infrastructure resources (compute, storage, support) without generating revenue; dual-tier experience can create confusion if not clearly communicated |
| **Fit for East Africa** | Excellent. Free tier removes the trust barrier for first-time digital health users. Pay-per-use for consultations mirrors existing behavior. The combination maximizes both adoption and monetization. |
| **M-Pesa compatibility** | Excellent -- payments only triggered when patient opts into premium services |
| **Revenue predictability** | Moderate -- depends on conversion rate, but conversion rate is empirically determinable during pilots |
| **Verdict** | **Recommended model.** Best balance of user acquisition, monetization, and market fit for East Africa. |

### 3.4 B2B SaaS (Facility Platform Fee)

| Parameter | Assessment |
|-----------|------------|
| **How it works** | Health facilities (clinics, pharmacies, labs) pay a monthly platform fee for access to Health Hub's patient routing, scheduling, and management tools. Commission on consultations routed through the platform. |
| **Pros** | B2B revenue is more predictable than B2C; facilities are less price-sensitive than individual patients; long contract cycles reduce churn; creates network effects as more facilities join |
| **Cons** | Requires meaningful patient volume before facilities see value; slow sales cycle (3-6 months); requires dedicated partner management capacity; facility IT readiness varies widely in East Africa |
| **Fit for East Africa** | Moderate as primary model; strong as supplementary revenue stream. Most East African clinics are small (1-5 doctors) with limited willingness to pay for technology. Hospital groups and pharmacy chains are more viable B2B targets. |
| **Revenue predictability** | High per-facility, but dependent on number of onboarded facilities |
| **Verdict** | **Not viable as primary model in early phases.** Strong supplementary revenue from Pilot 2 onward, scaling to a significant share of total revenue at production. |

### 3.5 Model Comparison Summary

| Criterion | Pure Subscription | Pure Pay-Per-Use | Freemium + Pay-Per-Use | B2B SaaS |
|-----------|------------------|-----------------|----------------------|----------|
| Barrier to entry | High | Medium | Low (free tier) | N/A (B2B) |
| Revenue predictability | High | Low | Moderate | High |
| East African consumer fit | Poor | Strong | Excellent | Moderate |
| User acquisition speed | Slow | Medium | Fast | Slow |
| Infrastructure requirement | Recurring billing | Per-transaction | Per-transaction + free tier | CRM + sales |
| Recommended role | Optional premium tier | Core revenue mechanism | **Primary model** | Supplementary stream |

---

## 4. Price Sensitivity by Market

### 4.1 Ethiopia (Primary Market)

| Factor | Detail |
|--------|--------|
| GDP per capita (2025) | ~$1,020 (per params.md Section 9.1) |
| Health expenditure per capita | ~$28/year (~$2.30/month) |
| Urban health expenditure (Addis Ababa, estimated) | ~$60-80/year (~$5-7/month) |
| Urban household income range | ETB 5,700-22,800/month ($100-400/month) |
| Typical physical clinic GP visit | ETB 100-500 ($1.75-8.75) |
| Specialist clinic visit | ETB 300-1,500 ($5.25-26.30) |
| Transport cost to clinic | ETB 20-50 ($0.35-0.88) each way |
| Time cost per clinic visit | 2-4 hours (travel + waiting) |
| Smartphone penetration (urban) | 35-45% (per params.md Section 9.1) |
| Digital payment adoption | Growing -- Telebirr 40M+ users; M-Pesa (Safaricom Ethiopia) launched 2022 |
| Price ceiling for GP consultation | ETB 200-300 ($3.50-5.25) -- must be cheaper than physical alternative after accounting for transport and time savings |
| Price ceiling for specialist | ETB 400-600 ($7.00-10.50) -- significant savings vs. in-person specialist |
| Key behavioral insight | Ethiopian consumers are extremely price-sensitive. Even middle-class Addis residents view healthcare spending as an emergency cost, not a routine budget item. Digital healthcare adoption requires a compelling price advantage over physical alternatives, not merely convenience. The value proposition must be framed as "save ETB 50-150 per visit (transport + time) while getting the same doctor quality." |

#### 4.1.1 Ethiopian Urban Income Segmentation and Price Ladder

| Segment (Urban Addis) | Monthly Income (ETB) | Monthly Income (USD) | Max Monthly Healthcare Budget | Max Single Consultation | Health Hub Target Tier |
|------------------------|---------------------|---------------------|------------------------------|------------------------|----------------------|
| Bottom 30% | < 5,700 | < $100 | ETB 100-200 ($1.75-3.50) | ETB 100 ($1.75) | Free tier only; potential pay-per-use at ETB 50-100 for subsidized GP |
| Middle 40% | 5,700-17,100 | $100-300 | ETB 200-500 ($3.50-8.75) | ETB 200-300 ($3.50-5.25) | **Primary target segment**: GP at ETB 150-250, occasional specialist |
| Upper 30% | > 17,100 | > $300 | ETB 500-1,500 ($8.75-26.30) | ETB 400-600 ($7.00-10.50) | Full service: GP, specialist, video premium, subscription candidate |

#### 4.1.2 Ethiopian Healthcare Spending Patterns

| Pattern | Implication for Pricing |
|---------|----------------------|
| Healthcare treated as emergency expense, not budgeted | Pay-per-use is natural; subscription is counterintuitive |
| Strong preference for in-person doctor visits (trust factor) | Video premium must be justified by accessibility, not just convenience |
| Price comparison is done informally via word-of-mouth | Pricing must be "shareable" -- simple, round numbers in ETB |
| Telebirr adoption driven by utility bill payments | Healthcare payment via Telebirr is a new behavior; frictionless UX is critical |
| Government clinics are free but overcrowded with long waits | Health Hub competes on wait time and convenience, not against free |

### 4.2 Kenya (Secondary Market)

| Factor | Detail |
|--------|--------|
| GDP per capita (2025) | ~$2,100 (per params.md Section 9.2) |
| Health expenditure per capita | ~$84/year (~$7/month) |
| Urban health expenditure (Nairobi, estimated) | ~$150-200/year (~$12-17/month) |
| Urban household income range | KES 26,000-104,000/month ($200-800/month) |
| Typical physical clinic GP visit | KES 500-2,000 ($3.85-15.40) |
| Specialist clinic visit | KES 2,000-8,000 ($15.40-61.50) |
| Transport cost to clinic | KES 50-200 ($0.38-1.54) each way |
| Smartphone penetration (urban) | 55-65% (per params.md Section 9.2) |
| Digital payment adoption | Very high -- M-Pesa processes ~$300B annually; 96% of Kenyans over 15 have used mobile money |
| Price ceiling for GP consultation | KES 500-800 ($3.85-6.15) |
| Price ceiling for specialist | KES 1,000-2,000 ($7.70-15.40) |
| Key behavioral insight | Kenyan consumers are far more comfortable with digital transactions and already pay for telecom-adjacent services via M-Pesa. The barrier is perceived value, not payment infrastructure. Health Hub must differentiate from free government clinics and cheap informal providers on quality, speed, and specialist access. |

#### 4.2.1 Kenyan Urban Income Segmentation and Price Ladder

| Segment (Urban Nairobi) | Monthly Income (KES) | Monthly Income (USD) | Max Monthly Healthcare Budget | Max Single Consultation | Health Hub Target Tier |
|--------------------------|---------------------|---------------------|------------------------------|------------------------|----------------------|
| Bottom 30% | < 26,000 | < $200 | KES 500-1,000 ($3.85-7.70) | KES 300-500 ($2.30-3.85) | Free tier + occasional subsidized GP |
| Middle 40% | 26,000-78,000 | $200-600 | KES 1,000-3,000 ($7.70-23.10) | KES 500-1,000 ($3.85-7.70) | **Primary target**: GP at KES 300-600, specialist at KES 800-1,200 |
| Upper 30% | > 78,000 | > $600 | KES 3,000-10,000 ($23.10-77.00) | KES 1,000-2,000 ($7.70-15.40) | Full service including video, subscription, family plans |

### 4.3 Cross-Market Comparison

| Service | Ethiopia Target Price | Ethiopia (USD) | Kenya Target Price | Kenya (USD) | USD Ratio (Kenya/Ethiopia) | Notes |
|---------|----------------------|----------------|-------------------|-------------|--------------------------|-------|
| GP consultation (text/audio) | ETB 200 | $3.50 | KES 500 | $3.85 | 1.10x | Near parity in USD; Kenya slightly higher |
| Specialist consultation | ETB 400 | $7.00 | KES 800 | $6.15 | 0.88x | Ethiopia higher due to specialist scarcity premium |
| Video premium add-on | ETB 75 | $1.32 | KES 150 | $1.15 | 0.87x | Similar perceived value |
| Monthly subscription | ETB 300 | $5.25 | KES 600 | $4.62 | 0.88x | Kenya lower as % of income |
| Lab facilitation fee | ETB 75 | $1.32 | KES 150 | $1.15 | 0.87x | Comparable |
| Facility platform fee (monthly) | ETB 3,000 | $52.63 | KES 7,000 | $53.85 | 1.02x | Near parity in USD for B2B |

### 4.4 Total Cost of Care Comparison (Patient Perspective)

This comparison shows why Health Hub's pricing, while not "cheap" in absolute
terms, represents strong value when the full cost of a clinic visit is considered.

| Cost Component | Physical Clinic (Ethiopia) | Health Hub (Ethiopia) | Savings |
|----------------|--------------------------|----------------------|---------|
| Consultation fee | ETB 200-400 | ETB 150-300 | ETB 50-100 |
| Transport (round trip) | ETB 40-100 | ETB 0 | ETB 40-100 |
| Time cost (2-4 hrs at avg wage) | ETB 50-150 | ETB 15-30 (15-20 min) | ETB 35-120 |
| Waiting room risk (infection exposure) | Unquantified | ETB 0 | Avoided |
| **Total effective cost** | **ETB 290-650** | **ETB 165-330** | **ETB 125-320 (43-49% savings)** |

| Cost Component | Physical Clinic (Kenya) | Health Hub (Kenya) | Savings |
|----------------|------------------------|-------------------|---------|
| Consultation fee | KES 500-1,500 | KES 300-500 | KES 200-1,000 |
| Transport (round trip) | KES 100-400 | KES 0 | KES 100-400 |
| Time cost (2-4 hrs at avg wage) | KES 150-500 | KES 50-100 | KES 100-400 |
| **Total effective cost** | **KES 750-2,400** | **KES 350-600** | **KES 400-1,800 (53-75% savings)** |

---

## 5. Pricing Evolution by Phase

### 5.1 Master Pricing Schedule

| Phase | Timeline (per params.md) | Patient Pricing | Facility Pricing | Strategy | Payment Method |
|-------|--------------------------|----------------|-----------------|----------|----------------|
| Pre-Pilot | M0-M3 to M6 (100-200 internal users) | FREE (all services) | FREE | Internal testing; no revenue; no payment integration needed | None |
| Pilot 1 | +2-3 months (up to 1,000 users) | Symbolic: ETB 50-100 / KES 100-200 for GP | FREE | Habit formation; test payment flow; collect WTP data; behavioral validation | Manual M-Pesa/Telebirr (Till number + confirmation code) |
| Pilot 2 | +3-13 months (5,000-10,000 users) | 50% of target: GP ETB 100-150 / KES 250-350 | FREE or ETB 500/mo | Validate WTP; A/B test price points; first real revenue; price elasticity measurement | M-Pesa/Telebirr API integration (Daraja API / Telebirr SDK) |
| Production | +4-12 months (full scale) | Full pricing: GP ETB 200-300 / KES 500-700; Specialist ETB 400-600 / KES 800-1,200 | ETB 2,000-5,000/mo + 10-15% commission | Full revenue operations; margin optimization; subscription tier launch | M-Pesa + Telebirr + Stripe (card fallback) |

### 5.2 Detailed Pricing Table by Service and Phase

#### 5.2.1 Ethiopia (ETB)

| Service | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|---------|-----------|---------|---------|------------|
| GP consultation (text/audio) | FREE | ETB 50-100 ($0.88-1.75) | ETB 100-150 ($1.75-2.63) | ETB 150-300 ($2.63-5.25) |
| Specialist consultation (text/audio) | FREE | ETB 100-200 ($1.75-3.50) | ETB 200-300 ($3.50-5.25) | ETB 300-600 ($5.25-10.50) |
| Video consultation premium (add-on) | FREE | FREE | ETB 25-50 ($0.44-0.88) | ETB 50-100 ($0.88-1.75) |
| Lab order facilitation | FREE | FREE | ETB 25-50 ($0.44-0.88) | ETB 50-100 ($0.88-1.75) |
| Prescription delivery coordination | FREE | FREE | ETB 15-30 ($0.26-0.53) | ETB 30-50 ($0.53-0.88) |
| Urgent/priority queue surcharge | N/A | N/A | ETB 25-50 ($0.44-0.88) | ETB 50-100 ($0.88-1.75) |
| AI triage (beyond free 5/month) | FREE | FREE | ETB 10-20 ($0.18-0.35) | ETB 15-30 ($0.26-0.53) |
| Premium subscription (monthly) | N/A | N/A | N/A (testing only) | ETB 200-400 ($3.50-7.00) |
| Family member add-on (per member) | N/A | N/A | N/A | ETB 100-150 ($1.75-2.63) |

#### 5.2.2 Kenya (KES)

| Service | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|---------|-----------|---------|---------|------------|
| GP consultation (text/audio) | FREE | KES 100-200 ($0.77-1.54) | KES 250-350 ($1.92-2.69) | KES 300-500 ($2.30-3.85) |
| Specialist consultation (text/audio) | FREE | KES 200-400 ($1.54-3.08) | KES 400-600 ($3.08-4.62) | KES 500-1,000 ($3.85-7.70) |
| Video consultation premium (add-on) | FREE | FREE | KES 50-100 ($0.38-0.77) | KES 100-200 ($0.77-1.54) |
| Lab order facilitation | FREE | FREE | KES 50-100 ($0.38-0.77) | KES 100-200 ($0.77-1.54) |
| Prescription delivery coordination | FREE | FREE | KES 30-60 ($0.23-0.46) | KES 50-100 ($0.38-0.77) |
| Urgent/priority queue surcharge | N/A | N/A | KES 50-100 ($0.38-0.77) | KES 100-200 ($0.77-1.54) |
| AI triage (beyond free 5/month) | FREE | FREE | KES 20-40 ($0.15-0.31) | KES 30-60 ($0.23-0.46) |
| Premium subscription (monthly) | N/A | N/A | N/A (testing only) | KES 400-800 ($3.08-6.15) |
| Family member add-on (per member) | N/A | N/A | N/A | KES 200-300 ($1.54-2.30) |

#### 5.2.3 USD Equivalent Summary

| Service | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|---------|-----------|---------|---------|------------|
| GP consultation | $0.00 | $0.88-1.75 | $1.75-2.63 | $2.63-5.25 |
| Specialist consultation | $0.00 | $1.75-3.50 | $3.50-5.25 | $5.25-10.50 |
| Video premium | $0.00 | $0.00 | $0.44-0.88 | $0.88-1.75 |
| Lab facilitation | $0.00 | $0.00 | $0.44-0.88 | $0.88-1.75 |
| Rx delivery | $0.00 | $0.00 | $0.26-0.53 | $0.53-0.88 |
| Priority surcharge | N/A | N/A | $0.44-0.88 | $0.88-1.75 |
| Premium subscription/mo | N/A | N/A | N/A | $3.50-7.00 |

### 5.3 B2B Facility Pricing by Phase

| Phase | Monthly Platform Fee | Commission on Consultations | Pharmacy/Lab Take-Rate | Notes |
|-------|---------------------|----------------------------|----------------------|-------|
| Pre-Pilot | FREE | 0% | 0% | Internal testing only |
| Pilot 1 | FREE | 0% | 0% | Incentivize onboarding; demonstrate value; no revenue from facilities |
| Pilot 2 | FREE or ETB 500/mo ($8.75) | 5% introductory | 5-8% | Relationship building; value demonstration |
| Production | ETB 2,000-5,000/mo ($35-88) | 10-15% | 8-12% | Full commercial terms |
| Enterprise (hospital groups) | Custom: ETB 10,000+/mo ($175+) | 8-12% (volume discount) | 6-10% (volume discount) | Negotiated per contract |

### 5.4 Pilot Pricing Rationale

**Pilot 1: Symbolic Pricing (ETB 50-100)**

During Pilot 1, the primary objective is **behavioral validation, not revenue**.
Charging even a symbolic fee serves four critical purposes:

1. **Payment flow testing:** Validates that manual M-Pesa collection works
   end-to-end before investing in API integration.
2. **Willingness-to-pay signal:** Patients who pay even ETB 50 demonstrate
   genuine demand, filtering out curiosity users. This creates a behavioral
   baseline for Pilot 2 price increases.
3. **Perceived value anchoring:** Completely free services are often perceived as
   low quality in East African healthcare markets. A nominal fee signals
   professional clinical service and creates a trust anchor.
4. **Payment habit formation:** Establishing a payment habit during Pilot 1 makes
   the Pilot 2 price increase (to ETB 100-150) feel like an adjustment rather
   than a new imposition.

**Pilot 2: 50% Discounted Pricing (ETB 100-150)**

The Pilot 2 discount serves as a **price discovery mechanism**:

- A/B testing of 3-4 price points (e.g., ETB 75, 100, 125, 150 for GP) across
  randomized user cohorts.
- Elasticity measurement: tracking consultation volume changes as price increases
  from symbolic to discounted.
- Conversion funnel analysis: what percentage of free-tier users convert to
  paid at each price point.
- The 50% discount baseline can be raised or lowered based on real data without
  resetting user expectations.

---

## 6. Unit Economics

### 6.1 Per-Consultation Economics -- Ethiopia (Production Phase)

| Metric | GP (Text/Audio) | GP (Video) | Specialist (Text/Audio) | Specialist (Video) |
|--------|----------------|-----------|------------------------|-------------------|
| **Patient pays** | **ETB 200 ($3.50)** | **ETB 275 ($4.82)** | **ETB 400 ($7.00)** | **ETB 500 ($8.77)** |
| M-Pesa/Telebirr fee (1.5%) | ETB 3 ($0.05) | ETB 4 ($0.07) | ETB 6 ($0.11) | ETB 8 ($0.14) |
| Platform compute (Render) | ETB 3 ($0.05) | ETB 5 ($0.09) | ETB 5 ($0.09) | ETB 8 ($0.14) |
| Daily.co video cost | ETB 0 | ETB 8 ($0.14) | ETB 0 | ETB 15 ($0.26) |
| AI API cost (Claude triage) | ETB 2 ($0.04) | ETB 2 ($0.04) | ETB 3 ($0.05) | ETB 3 ($0.05) |
| SMS/notification | ETB 1 ($0.02) | ETB 1 ($0.02) | ETB 1 ($0.02) | ETB 1 ($0.02) |
| **Total marginal cost** | **ETB 9 ($0.16)** | **ETB 20 ($0.36)** | **ETB 15 ($0.27)** | **ETB 35 ($0.61)** |
| **Gross margin (ETB)** | **ETB 191 ($3.34)** | **ETB 255 ($4.46)** | **ETB 385 ($6.73)** | **ETB 465 ($8.16)** |
| **Gross margin (%)** | **95.5%** | **92.7%** | **96.3%** | **93.0%** |

### 6.2 Per-Consultation Economics -- Kenya (Production Phase)

| Metric | GP (Text/Audio) | GP (Video) | Specialist (Text/Audio) | Specialist (Video) |
|--------|----------------|-----------|------------------------|-------------------|
| **Patient pays** | **KES 500 ($3.85)** | **KES 650 ($5.00)** | **KES 800 ($6.15)** | **KES 1,000 ($7.70)** |
| M-Pesa fee (1.5%) | KES 8 ($0.06) | KES 10 ($0.08) | KES 12 ($0.09) | KES 15 ($0.12) |
| Platform compute | KES 7 ($0.05) | KES 12 ($0.09) | KES 12 ($0.09) | KES 18 ($0.14) |
| Daily.co video cost | KES 0 | KES 18 ($0.14) | KES 0 | KES 34 ($0.26) |
| AI API cost | KES 5 ($0.04) | KES 5 ($0.04) | KES 7 ($0.05) | KES 7 ($0.05) |
| SMS/notification | KES 3 ($0.02) | KES 3 ($0.02) | KES 3 ($0.02) | KES 3 ($0.02) |
| **Total marginal cost** | **KES 23 ($0.17)** | **KES 48 ($0.37)** | **KES 34 ($0.25)** | **KES 77 ($0.59)** |
| **Gross margin (KES)** | **KES 477 ($3.68)** | **KES 602 ($4.63)** | **KES 766 ($5.90)** | **KES 923 ($7.11)** |
| **Gross margin (%)** | **95.4%** | **92.6%** | **95.8%** | **92.3%** |

### 6.3 Fixed Cost Allocation and Breakeven

High per-consultation gross margins do not translate directly to profitability
because fixed costs must be absorbed by consultation volume.

#### 6.3.1 Fixed Cost Ladder by Phase

| Fixed Cost Category | Monthly: Pilot 1 | Monthly: Pilot 2 | Monthly: Production |
|--------------------|------------------|------------------|-------------------|
| Tech infrastructure (Render, DB, CDN) | $80-150 | $150-300 | $300-500 |
| Daily.co base fee | $0 (free tier) | $0-50 | $0-99 (Growth tier) |
| Claude AI API base usage | $5-15 | $10-30 | $30-100 |
| SMS/email service | $5-10 | $10-30 | $20-80 |
| Domain, SSL, CDN | $5 | $5-10 | $10-20 |
| Ops infrastructure (phones, telecom, tools) | $110-220 | $160-320 | $200-400 |
| **Subtotal: Tech + Ops infra** | **$205-400** | **$335-740** | **$560-1,199** |
| Employed doctors (per params.md Sec. 4) | $1,440 (2 doctors) | $2,880 (4 doctors) | $4,320-5,760 (6-8 doctors) |
| Admin ops staff | $434 (2 staff) | $868 (4 staff) | $1,302-1,736 (6-8 staff) |
| Technical support | $602 (2 staff) | $602 (2 staff) | $903 (3 staff) |
| **Subtotal: Employed staff** | **$2,476** | **$4,350** | **$6,525-8,399** |
| **Total monthly fixed** | **$2,681-2,876** | **$4,685-5,090** | **$7,085-9,598** |

#### 6.3.2 Breakeven Consultation Volume

| Phase | Total Fixed Costs/mo | Avg Margin/Consultation (USD) | Breakeven Consultations/mo | Breakeven Active Patients (at 1.5 consults/mo) |
|-------|---------------------|------------------------------|---------------------------|-----------------------------------------------|
| Pilot 1 (symbolic pricing, $0.50 avg margin) | $2,780 | $0.50 | ~5,560 (not viable -- pilot is pre-revenue) | N/A -- pilot is subsidized |
| Pilot 2 (50% pricing, $1.75 avg margin) | $4,890 | $1.75 | ~2,794 | ~1,863 |
| Production (full pricing, $3.50 avg margin) | $8,340 | $3.50 | ~2,383 | ~1,589 |
| Production (full pricing, $4.50 avg margin -- optimistic) | $8,340 | $4.50 | ~1,853 | ~1,236 |

**Critical insight:** When employed staff costs are included (per params.md), the
breakeven volume is significantly higher than a pure-marketplace model would
suggest. The platform needs approximately 1,200-1,600 active patients at
production to cover all fixed costs including employed clinical and operational
staff. This is achievable within the production user target of 10,000+ but
requires meaningful traction.

#### 6.3.3 Breakeven Excluding Employed Staff (Infrastructure-Only)

For investors and scenario analysis, it is useful to see the breakeven when only
technology infrastructure costs are considered (employed staff costs are treated
as a separate operating decision):

| Phase | Infra-Only Fixed Costs/mo | Avg Margin/Consultation | Breakeven Consultations/mo | Breakeven Active Patients |
|-------|--------------------------|------------------------|---------------------------|--------------------------|
| Pilot 2 | $540 | $1.75 | ~309 | ~206 |
| Production (low) | $700 | $3.50 | ~200 | ~133 |
| Production (mid) | $900 | $4.00 | ~225 | ~150 |
| Production (high) | $1,200 | $4.50 | ~267 | ~178 |

This infrastructure-only breakeven of 130-180 active patients is the threshold at
which the platform's technology costs are self-sustaining, independent of the
staffing decision.

### 6.4 Subscription Unit Economics (Production Phase)

| Parameter | Ethiopia | Kenya |
|-----------|----------|-------|
| Monthly subscription price (avg) | ETB 300 ($5.25) | KES 600 ($4.62) |
| Included GP consultations | 2-3/month | 2-3/month |
| Expected consultations used per subscriber | 1.5-2.0/month | 1.5-2.0/month |
| Marginal cost of 2 consultations | ETB 18-30 ($0.32-0.53) | KES 46-70 ($0.35-0.54) |
| Subscription gross margin | ETB 270-282 ($4.72-4.93) | KES 530-554 ($4.08-4.26) |
| Subscription gross margin % | 90-94% | 88-92% |
| Breakeven vs pay-per-use | More profitable if subscriber uses < 1.5 consults/mo; comparable at 1.5-2.0; less profitable above 2.5 | Similar crossover point |

---

## 7. Scenario Analysis -- All 21 Combinations

This section models how pricing strategy varies across all 21 combinations
defined in params.md Section 15. Three variables differentiate the combinations:

1. **Payment infrastructure readiness:** Lower funding delays M-Pesa API
   integration, limiting pricing options and delaying revenue.
2. **Price point aggressiveness:** Better-funded combinations can sustain lower
   introductory prices longer, building volume before raising prices.
3. **Time to full pricing:** Higher investment levels reach production pricing
   faster due to faster development, earlier payment integration, and more
   marketing-driven user acquisition.

### 7.1 Scenario 1: Fully Self-Funded (3 Combinations)

No external investor at any point. All costs borne by founders. Pricing must be
more aggressive (higher) sooner because there is no investor capital to subsidize
a growth phase.

---

#### S1-L1: Bootstrapped Self-Funded (~$500/mo)

**Pricing constraint:** Cannot afford M-Pesa API integration until Pilot 2 at
earliest. Payment collection during Pilot 1 is manual (patient sends M-Pesa to
a Till number, confirms via screenshot or code). Development capacity is limited,
delaying feature delivery and limiting pricing justification.

| Phase | Timeline | GP (ETB) | GP (USD) | Specialist (ETB) | Specialist (USD) | Facility Fee | Revenue Strategy |
|-------|----------|----------|----------|------------------|------------------|--------------|-----------------|
| Pre-Pilot | M0-M4 | FREE | $0.00 | FREE | $0.00 | FREE | No revenue; cannot invest in payment flow |
| Pilot 1 | M4-M10 | 50-100 | $0.88-1.75 | 100-200 | $1.75-3.50 | FREE | Manual payment; test willingness; minimal revenue |
| Pilot 2 | M10-M18 | 100-150 | $1.75-2.63 | 200-300 | $3.50-5.25 | FREE | First real revenue; delayed M-Pesa API |
| Production | M18-M24+ | 150-200 | $2.63-3.50 | 300-400 | $5.25-7.00 | ETB 2,000/mo | Full pricing at lower end of range |

**Production revenue estimate (M18+):**

| Stream | Calculation | Monthly (ETB) | Monthly (USD) |
|--------|-------------|---------------|---------------|
| Patient consultations | 200 patients x 1.5 consults x ETB 175 avg | 52,500 | $921 |
| Video premium | 30% video x 90 consults x ETB 75 | 6,750 | $118 |
| Lab/Rx facilitation | 100 orders x ETB 60 avg | 6,000 | $105 |
| Facility fees | 3 facilities x ETB 2,000 | 6,000 | $105 |
| Facility commission | 300 consults x ETB 175 x 10% | 5,250 | $92 |
| **Total** | | **76,500** | **$1,341** |

**Assessment:** Revenue barely covers ongoing infrastructure costs. Extremely slow
path to ROI. Pricing is constrained by late payment infrastructure and small user
base. Employed staff costs ($2,476+/mo at Pilot 1) far exceed revenue capacity.

---

#### S1-L2: Ideal Self-Funded (~$1,000/mo)

**Pricing constraint:** M-Pesa API integration feasible during Pilot 1
(Month 4-6). More features justify slightly higher pricing. Budget for A/B price
testing during Pilot 2.

| Phase | Timeline | GP (ETB) | GP (USD) | Specialist (ETB) | Specialist (USD) | Facility Fee | Revenue Strategy |
|-------|----------|----------|----------|------------------|------------------|--------------|-----------------|
| Pre-Pilot | M0-M3 | FREE | $0.00 | FREE | $0.00 | FREE | No revenue |
| Pilot 1 | M3-M7 | 50-100 | $0.88-1.75 | 100-200 | $1.75-3.50 | FREE | M-Pesa sandbox; test real payments |
| Pilot 2 | M7-M13 | 100-175 | $1.75-3.07 | 200-350 | $3.50-6.14 | ETB 500/mo | A/B price testing; first material revenue |
| Production | M13-M18+ | 175-250 | $3.07-4.39 | 350-500 | $6.14-8.77 | ETB 3,000/mo | Full pricing, mid-range |

**Production revenue estimate (M13+):**

| Stream | Calculation | Monthly (ETB) | Monthly (USD) |
|--------|-------------|---------------|---------------|
| Patient consultations | 400 patients x 1.5 consults x ETB 210 avg | 126,000 | $2,211 |
| Video premium | 35% video x 210 consults x ETB 75 | 15,750 | $276 |
| Lab/Rx facilitation | 200 orders x ETB 70 avg | 14,000 | $246 |
| Facility fees | 5 facilities x ETB 3,000 | 15,000 | $263 |
| Facility commission | 600 consults x ETB 210 x 12% | 15,120 | $265 |
| **Total** | | **185,870** | **$3,261** |

**Assessment:** Healthy trajectory. Covers ongoing infrastructure costs with
margin but does not fully cover employed staff costs at production scale without
continued self-funding. Path to ROI milestone within 18-24 months of production.

---

#### S1-L3: Fully Funded Self-Funded (~$2,000/mo)

**Pricing constraint:** Full development capacity means earlier feature delivery,
earlier payment integration, and a more competitive product that justifies premium
pricing. Can sustain slightly lower prices during Pilot 2 to build volume.

| Phase | Timeline | GP (ETB) | GP (USD) | Specialist (ETB) | Specialist (USD) | Facility Fee | Revenue Strategy |
|-------|----------|----------|----------|------------------|------------------|--------------|-----------------|
| Pre-Pilot | M0-M2 | FREE | $0.00 | FREE | $0.00 | FREE | No revenue |
| Pilot 1 | M2-M5 | 50-100 | $0.88-1.75 | 100-200 | $1.75-3.50 | FREE | M-Pesa live in sandbox by M3 |
| Pilot 2 | M5-M9 | 125-200 | $2.19-3.50 | 250-400 | $4.39-7.00 | ETB 500-1,000/mo | Aggressive A/B testing; subscription beta |
| Production | M9-M14+ | 200-300 | $3.50-5.25 | 400-600 | $7.00-10.50 | ETB 3,500-5,000/mo | Full pricing at upper range |

**Production revenue estimate (M9+):**

| Stream | Calculation | Monthly (ETB) | Monthly (USD) |
|--------|-------------|---------------|---------------|
| Patient consultations | 600 patients x 1.5 consults x ETB 250 avg | 225,000 | $3,947 |
| Video premium | 40% video x 360 consults x ETB 85 | 30,600 | $537 |
| Subscriptions | 100 subscribers x ETB 300/mo | 30,000 | $526 |
| Lab/Rx facilitation | 350 orders x ETB 80 avg | 28,000 | $491 |
| Facility fees | 8 facilities x ETB 4,000 | 32,000 | $561 |
| Facility commission | 900 consults x ETB 250 x 12% | 27,000 | $474 |
| **Total** | | **372,600** | **$6,536** |

**Assessment:** Strong revenue position. Premium features justify higher pricing.
Fastest self-funded path to ROI. Subscription tier viable at this scale.

---

### 7.2 Scenario 2: Investor Arrives at Pilot 1-to-Pilot 2 Transition (9 Combinations)

Self-funded from Month 0 through Pilot 1 and into the transition. Investor capital
enables payment infrastructure investment, marketing-driven user acquisition, and
the ability to sustain lower introductory prices longer to build volume.

**Pre-investor pricing** matches the corresponding S1-LX combination. Post-
investor pricing is shaped by the investor level (I1, I2, I3), which determines
how aggressively the platform can invest in growth vs. revenue extraction.

---

#### S2-O1-I1: Minimal Self-Fund + Minimal Investor (~$500/mo + $25-40K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M4 | FREE | FREE | FREE | Matches S1-L1 |
| Pilot 1 | M4-M10 | 50-100 | 100-200 | FREE | Manual payment; matches S1-L1 |
| Pilot 2 (post-investor) | M10-M16 | 100-150 | 200-300 | FREE | Investor funds M-Pesa integration; 50% discount |
| Production | M16-M22+ | 150-200 | 300-400 | ETB 2,000/mo | Modest investor capital exhausted; revenue-dependent |

**Production revenue:** ~$1,500-1,800/mo. Investor capital extends runway by
6-8 months but does not fundamentally change pricing power. Pricing converges
with S1-L1 at production.

---

#### S2-O1-I2: Minimal Self-Fund + Ideal Investor (~$500/mo + $75-100K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M4 | FREE | FREE | FREE | Matches S1-L1 |
| Pilot 1 | M4-M10 | 50-100 | 100-200 | FREE | Matches S1-L1 |
| Pilot 2 (post-investor) | M10-M14 | 75-125 | 150-250 | FREE | Full payment infra + marketing funded |
| Production | M14-M20+ | 175-250 | 350-500 | ETB 3,000/mo | Marketing-driven volume enables mid-range pricing |

**Production revenue:** ~$2,800-3,500/mo. Proper payment infrastructure and user
acquisition funded by investor. Strong path to ROI.

---

#### S2-O1-I3: Minimal Self-Fund + Full Investor (~$500/mo + $150-250K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M4 | FREE | FREE | FREE | Matches S1-L1 |
| Pilot 1 | M4-M10 | 50-100 | 100-200 | FREE | Matches S1-L1 (manual payment) |
| Pilot 2 (post-investor) | M10-M13 | 50-100 | 100-200 | FREE | Lowest Pilot 2 prices; heavy marketing spend |
| Production | M13-M18+ | 200-300 | 400-600 | ETB 4,000-5,000/mo | Volume-driven premium pricing |

**Production revenue:** ~$5,000-7,000/mo. Full investor backing transforms
strategy from revenue-extraction to volume-building. Lower Pilot 2 prices build
a larger base; production prices are higher because product quality justifies
premium positioning.

---

#### S2-O2-I1: Steady Self-Fund + Modest Investor (~$1,000/mo + $25-40K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M3 | FREE | FREE | FREE | Matches S1-L2 |
| Pilot 1 | M3-M7 | 50-100 | 100-200 | FREE | M-Pesa sandbox ready |
| Pilot 2 (post-investor) | M7-M12 | 100-175 | 200-350 | ETB 500/mo | Modest top-up extends Pilot 2 runway |
| Production | M12-M18+ | 175-225 | 350-450 | ETB 2,500-3,000/mo | Near S1-L2 production pricing |

**Production revenue:** ~$2,400-3,000/mo. Modest investor provides 3-5 months
additional runway but does not materially change pricing power.

---

#### S2-O2-I2: Steady Self-Fund + Ideal Investor -- BASELINE PLAN (~$1,000/mo + $75-100K)

This is the **recommended baseline scenario** for operational planning.

| Phase | Timeline | GP (ETB) | GP (USD) | Specialist (ETB) | Specialist (USD) | Facility Fee | Notes |
|-------|----------|----------|----------|------------------|------------------|--------------|-------|
| Pre-Pilot | M0-M3 | FREE | $0.00 | FREE | $0.00 | FREE | Core product hardening |
| Pilot 1 | M3-M7 | 50-100 | $0.88-1.75 | 100-200 | $1.75-3.50 | FREE | M-Pesa integration; WTP testing |
| Pilot 2 (post-investor) | M7-M11 | 100-175 | $1.75-3.07 | 200-350 | $3.50-6.14 | ETB 500/mo | A/B price testing; first real revenue |
| Production | M11-M16+ | 200-275 | $3.50-4.82 | 400-550 | $7.00-9.65 | ETB 3,000-4,000/mo + 12% | Full commercial operations |

**Production revenue projection (M11+):**

| Stream | Calculation | Monthly (ETB) | Monthly (USD) |
|--------|-------------|---------------|---------------|
| Patient consultations | 500 patients x 1.5 consults x ETB 235 avg | 176,250 | $3,092 |
| Video premium | 35% video x 262 consults x ETB 80 | 20,960 | $368 |
| Subscriptions | 75 subscribers x ETB 300/mo | 22,500 | $395 |
| Lab/Rx facilitation | 280 orders x ETB 75 avg | 21,000 | $368 |
| Facility fees | 7 facilities x ETB 3,500 | 24,500 | $430 |
| Facility commission | 750 consults x ETB 235 x 12% | 21,150 | $371 |
| **Total** | | **286,360** | **$5,024** |

**Assessment:** The baseline plan reaches ~$5,000/mo at production. With total
capital invested of ~$7,000 (7 months self-fund) + $75,000-100,000 (investor) =
$82,000-107,000, the ROI milestone is projected at Month 28-36 from project
start, or Month 17-25 from production launch.

---

#### S2-O2-I3: Steady Self-Fund + Full Investor (~$1,000/mo + $150-250K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M3 | FREE | FREE | FREE | Matches S1-L2 |
| Pilot 1 | M3-M7 | 50-100 | 100-200 | FREE | Matches S1-L2 |
| Pilot 2 (post-investor) | M7-M10 | 75-125 | 150-250 | FREE | Lower prices longer; heavy user acquisition |
| Production | M10-M15+ | 200-300 | 400-600 | ETB 4,000-5,000/mo + 15% | Premium product; volume-driven |

**Production revenue:** ~$6,000-8,000/mo. Full investor backing enables aggressive
marketing during Pilot 2, building larger base for premium production pricing.

---

#### S2-O3-I1: Full Self-Fund + Modest Investor (~$2,000/mo + $25-40K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M2 | FREE | FREE | FREE | Matches S1-L3 |
| Pilot 1 | M2-M5 | 50-100 | 100-200 | FREE | Matches S1-L3 |
| Pilot 2 (post-investor) | M5-M8 | 125-200 | 250-400 | ETB 500-1,000/mo | Marginal investor impact; pricing near S1-L3 |
| Production | M8-M13+ | 200-275 | 400-550 | ETB 3,000-4,000/mo | Converges with S1-L3 |

**Production revenue:** ~$4,500-5,500/mo. Nearly identical to S1-L3 since the
modest investor adds limited incremental capability.

---

#### S2-O3-I2: Full Self-Fund + Ideal Investor (~$2,000/mo + $75-100K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M2 | FREE | FREE | FREE | Matches S1-L3 |
| Pilot 1 | M2-M5 | 50-100 | 100-200 | FREE | Matches S1-L3 |
| Pilot 2 (post-investor) | M5-M8 | 100-175 | 200-350 | ETB 500/mo | Ideal investor enables marketing + lower prices |
| Production | M8-M12+ | 200-300 | 400-600 | ETB 3,500-5,000/mo + 12% | Strong product + marketing = premium pricing |

**Production revenue:** ~$6,500-8,000/mo. Fast feature delivery (L3) plus ideal
investor marketing produces the strongest product at earliest date.

---

#### S2-O3-I3: Full Self-Fund + Full Investor -- Maximum S2 (~$2,000/mo + $150-250K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M2 | FREE | FREE | FREE | Matches S1-L3 |
| Pilot 1 | M2-M5 | 50-100 | 100-200 | FREE | Matches S1-L3 |
| Pilot 2 (post-investor) | M5-M8 | 75-125 | 150-250 | FREE | Aggressive volume play; lowest Pilot 2 prices |
| Production | M8-M11+ | 225-325 | 450-650 | ETB 5,000+/mo + 15% | Maximum S2; premium positioning |

**Production revenue:** ~$8,000-11,000/mo. Full resources on both sides enable the
longest runway of below-market pricing during pilots, building the largest user
base for premium production pricing.

---

### 7.3 Scenario 3: Investor Arrives Right After Pilot 1 (9 Combinations)

Self-funded only from Month 0 through early Pilot 1 (~3 months). Investor capital
arrives earlier than S2, enabling earlier payment infrastructure, earlier real
pricing, and a longer subsidized growth period during the entirety of Pilot 2.

**Key pricing difference from S2:** Investor capital is available during the
entirety of Pilot 2 (not just the transition), meaning pricing can be more
patient (lower for longer) and payment infrastructure is ready sooner.

---

#### S3-O1-I1: Minimal Bridge + Minimal Investor (~$500/mo + $25-40K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M4 | FREE | FREE | FREE | Matches S1-L1 |
| Pilot 1 | M4-M7 | 50-100 | 100-200 | FREE | Shortened Pilot 1; manual payment |
| Pilot 2 (post-investor) | M7-M14 | 75-150 | 150-300 | FREE | M-Pesa integration funded; price testing |
| Production | M14-M20+ | 150-200 | 300-400 | ETB 2,000/mo | Modest pricing; small user base |

**Production revenue:** ~$1,500-2,000/mo. Earlier investor arrival means M-Pesa
integrated sooner, but small injection limits marketing reach.

---

#### S3-O1-I2: Minimal Bridge + Ideal Investor (~$500/mo + $75-100K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M4 | FREE | FREE | FREE | Matches S1-L1 |
| Pilot 1 | M4-M7 | 50-100 | 100-200 | FREE | Shortened by investor anticipation |
| Pilot 2 (post-investor) | M7-M12 | 75-125 | 150-250 | FREE | Full payment infra; lower prices for volume |
| Production | M12-M17+ | 175-250 | 350-500 | ETB 3,000/mo + 12% | Strong pricing from larger user base |

**Production revenue:** ~$3,000-4,000/mo. Longer subsidized Pilot 2 builds
larger base that supports mid-to-upper-range production pricing.

---

#### S3-O1-I3: Minimal Bridge + Full Investor (~$500/mo + $150-250K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M4 | FREE | FREE | FREE | Matches S1-L1 |
| Pilot 1 | M4-M7 | 50-100 | 100-200 | FREE | Short self-funded phase |
| Pilot 2 (post-investor) | M7-M11 | 50-100 | 100-200 | FREE | Aggressive volume; lowest viable prices |
| Production | M11-M16+ | 200-300 | 400-600 | ETB 4,000-5,000/mo + 15% | Premium pricing from large base |

**Production revenue:** ~$5,500-7,500/mo. Full investor backing from early in
Pilot 2 enables most aggressive growth pricing despite minimal self-fund phase.

---

#### S3-O2-I1: Steady Bridge + Modest Investor (~$1,000/mo + $25-40K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M3 | FREE | FREE | FREE | Matches S1-L2 |
| Pilot 1 | M3-M5 | 50-100 | 100-200 | FREE | M-Pesa sandbox by M4 |
| Pilot 2 (post-investor) | M5-M10 | 100-150 | 200-300 | ETB 500/mo | Modest top-up extends runway |
| Production | M10-M16+ | 175-225 | 350-450 | ETB 2,500-3,000/mo | Near S1-L2 pricing |

**Production revenue:** ~$2,500-3,200/mo.

---

#### S3-O2-I2: Steady Bridge + Ideal Investor (~$1,000/mo + $75-100K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M3 | FREE | FREE | FREE | Matches S1-L2 |
| Pilot 1 | M3-M5 | 50-100 | 100-200 | FREE | Shortened Pilot 1 |
| Pilot 2 (post-investor) | M5-M9 | 75-150 | 150-300 | FREE | Full Pilot 2 with investor backing |
| Production | M9-M14+ | 200-275 | 400-550 | ETB 3,000-4,000/mo + 12% | Strong pricing from ideal combination |

**Production revenue:** ~$4,500-5,500/mo. Earlier investor arrival accelerates
production by 2-3 months vs baseline (S2-O2-I2).

---

#### S3-O2-I3: Steady Bridge + Full Investor (~$1,000/mo + $150-250K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M3 | FREE | FREE | FREE | Matches S1-L2 |
| Pilot 1 | M3-M5 | 50-100 | 100-200 | FREE | Short self-funded bridge |
| Pilot 2 (post-investor) | M5-M8 | 50-100 | 100-200 | FREE | Most aggressive growth pricing in S3-O2 family |
| Production | M8-M12+ | 225-325 | 450-650 | ETB 4,000-5,000/mo + 15% | Premium product + large base |

**Production revenue:** ~$7,000-9,500/mo. Full investor capital from early in
the lifecycle enables the most aggressive growth strategy.

---

#### S3-O3-I1: Full Bridge + Modest Investor (~$2,000/mo + $25-40K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M2 | FREE | FREE | FREE | Matches S1-L3 |
| Pilot 1 | M2-M4 | 50-100 | 100-200 | FREE | Quick Pilot 1 at full capacity |
| Pilot 2 (post-investor) | M4-M7 | 125-200 | 250-400 | ETB 500-1,000/mo | Marginal investor impact |
| Production | M7-M12+ | 200-275 | 400-550 | ETB 3,000-4,000/mo | Near S1-L3 pricing |

**Production revenue:** ~$4,800-5,800/mo. Nearly identical to S1-L3.

---

#### S3-O3-I2: Full Bridge + Ideal Investor (~$2,000/mo + $75-100K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M2 | FREE | FREE | FREE | Matches S1-L3 |
| Pilot 1 | M2-M4 | 50-100 | 100-200 | FREE | Quick Pilot 1 |
| Pilot 2 (post-investor) | M4-M7 | 75-150 | 150-300 | FREE | Investor enables marketing-driven growth |
| Production | M7-M10+ | 225-325 | 450-650 | ETB 4,000-5,000/mo + 12% | Premium pricing + scale |

**Production revenue:** ~$7,000-9,000/mo. Strong combination: fast product
delivery from L3 self-fund plus ideal investor marketing capital.

---

#### S3-O3-I3: Full Bridge + Full Investor -- Maximum Scenario (~$2,000/mo + $150-250K)

| Phase | Timeline | GP (ETB) | Specialist (ETB) | Facility Fee | Notes |
|-------|----------|----------|------------------|--------------|-------|
| Pre-Pilot | M0-M2 | FREE | FREE | FREE | Full development capacity |
| Pilot 1 | M2-M4 | 50-100 | 100-200 | FREE | Fastest possible Pilot 1 |
| Pilot 2 (post-investor) | M4-M6 | 50-100 | 100-200 | FREE | Maximum growth subsidy; lowest prices |
| Production | M6-M10+ | 250-350 | 500-700 | ETB 5,000+/mo + 15% | Maximum premium positioning |

**Production revenue projection (M6+):**

| Stream | Calculation | Monthly (ETB) | Monthly (USD) |
|--------|-------------|---------------|---------------|
| Patient consultations | 1,000 patients x 1.5 consults x ETB 300 avg | 450,000 | $7,895 |
| Video premium | 45% video x 675 consults x ETB 90 | 60,750 | $1,066 |
| Subscriptions | 200 subscribers x ETB 350/mo | 70,000 | $1,228 |
| Lab/Rx facilitation | 500 orders x ETB 85 avg | 42,500 | $746 |
| Facility fees | 12 facilities x ETB 5,000 | 60,000 | $1,053 |
| Facility commission | 1,500 consults x ETB 300 x 15% | 67,500 | $1,184 |
| **Total** | | **750,750** | **$13,172** |

**Assessment:** Theoretical maximum. Fastest path to production (Month 6-7),
highest user base, strongest pricing power. Total invested: ~$6,000 (3 months
self-fund) + $150,000-250,000 = $156,000-256,000. At $13,000/mo revenue, ROI
milestone at Month 18-26 from start.

---

### 7.4 Cross-Scenario Summary Tables

#### 7.4.1 Production-Phase GP Consultation Pricing (ETB)

| | S1 (Self-Funded) | S2-I1 ($25-40K) | S2-I2 ($75-100K) | S2-I3 ($150-250K) | S3-I1 ($25-40K) | S3-I2 ($75-100K) | S3-I3 ($150-250K) |
|---|---|---|---|---|---|---|---|
| **O1 (~$500/mo)** | 150-200 | 150-200 | 175-250 | 200-300 | 150-200 | 175-250 | 200-300 |
| **O2 (~$1,000/mo)** | 175-250 | 175-225 | **200-275*** | 200-300 | 175-225 | 200-275 | 225-325 |
| **O3 (~$2,000/mo)** | 200-300 | 200-275 | 200-300 | 225-325 | 200-275 | 225-325 | 250-350 |

*Baseline plan (S2-O2-I2)

#### 7.4.2 Estimated Monthly Production Revenue (USD)

| | S1 | S2-I1 | S2-I2 | S2-I3 | S3-I1 | S3-I2 | S3-I3 |
|---|---|---|---|---|---|---|---|
| **O1** | $1,341 | $1,500-1,800 | $2,800-3,500 | $5,000-7,000 | $1,500-2,000 | $3,000-4,000 | $5,500-7,500 |
| **O2** | $3,261 | $2,400-3,000 | **$5,024*** | $6,000-8,000 | $2,500-3,200 | $4,500-5,500 | $7,000-9,500 |
| **O3** | $6,536 | $4,500-5,500 | $6,500-8,000 | $8,000-11,000 | $4,800-5,800 | $7,000-9,000 | $13,172 |

*Baseline plan

#### 7.4.3 Months to Production Launch (from M0)

| | S1 | S2-I1 | S2-I2 | S2-I3 | S3-I1 | S3-I2 | S3-I3 |
|---|---|---|---|---|---|---|---|
| **O1** | M18+ | M16+ | M14+ | M13+ | M14+ | M12+ | M11+ |
| **O2** | M13+ | M12+ | **M11+*** | M10+ | M10+ | M9+ | M8+ |
| **O3** | M9+ | M8+ | M8+ | M8+ | M7+ | M7+ | M6+ |

*Baseline plan

#### 7.4.4 Payment Infrastructure Readiness (Month When M-Pesa API is Live)

| | S1 | S2-I1 | S2-I2 | S2-I3 | S3-I1 | S3-I2 | S3-I3 |
|---|---|---|---|---|---|---|---|
| **O1** | M10-12 | M10-12 | M10-12 | M10-12 | M7-9 | M7-9 | M7-9 |
| **O2** | M5-7 | M5-7 | M5-7 | M5-7 | M5-6 | M5-6 | M5-6 |
| **O3** | M3-5 | M3-5 | M3-5 | M3-5 | M3-4 | M3-4 | M3-4 |

**Insight:** Payment infrastructure readiness is primarily driven by the self-fund
level (O1/O2/O3), not the investor level, because payment integration must be
built before the investor arrives. In S3 scenarios, the earlier investor arrival
enables going live with the API sooner (post-sandbox).

---

## 8. Pricing Comparison vs Competitors

### 8.1 Comprehensive Competitor Pricing Table

| Platform | HQ / Primary Market | GP Consultation | Specialist | Monthly Subscription | Model | Pharmacy | Lab Ordering | Status |
|----------|-------------------|----------------|------------|---------------------|-------|----------|-------------|--------|
| **Health Hub (target)** | Ethiopia / Kenya | $2.63-5.25 | $5.25-10.50 | $3.50-7.00/mo | Freemium + PPU | 8-12% take | 10-15% take | Pre-revenue |
| **Access Afya** | Kenya | $2-5 (walk-in) | Limited | None | Walk-in clinics + basic digital | In-clinic only | In-clinic only | Active; 30+ locations |
| **MyDawa** | Kenya | N/A | N/A | None | E-pharmacy only | Own margin | N/A | Active; pharmacy delivery |
| **mDoc** | Nigeria | Custom B2B | Custom B2B | $5-15/mo (employer) | B2B chronic care SaaS | N/A | Partner labs | Active; B2B focus |
| **Halodoc** | Indonesia | $2-8 | $5-15 | None | Pay-per-use marketplace | Integrated | Integrated | Active; 20M+ users |
| **Practo** | India | $3-15 | $8-25 | $5-10/mo | Hybrid marketplace | Partner pharmacies | Partner labs | Active; market leader in India |
| **1mg / Tata Health** | India | $2-5 | $5-12 | $4-8/mo | Hybrid marketplace | Own e-pharmacy | Partner labs | Active; Tata-backed |
| **Babylon / eMed** | UK / Rwanda | Free (Rwanda, gov't funded) | N/A | $150-300/yr (UK, now eMed) | B2G + B2C | N/A | N/A | Restructured; Rwanda contract ended |
| **Teladoc** | USA / Global | $50-75 | $75-100+ | $5-15 PEPM (B2B) | B2B employer-sponsored | N/A | N/A | Active; global leader |
| **mPharma** | Ghana / Pan-African | N/A (pharmacy focused) | N/A | None | Pharmacy supply chain | Own model | N/A | Active; could pivot to telehealth |
| **Helium Health** | Nigeria / Pan-African | N/A (EHR focused) | N/A | B2B SaaS | Hospital management SaaS | N/A | N/A | Active; could add patient-facing layer |

### 8.2 Pricing Position Analysis

| Dimension | Health Hub Position | Rationale |
|-----------|-------------------|-----------|
| vs. Physical clinics (Ethiopia) | 20-40% cheaper on total cost | ETB 165-330 total (Health Hub) vs ETB 290-650 (clinic + transport + time) |
| vs. Physical clinics (Kenya) | 30-50% cheaper on total cost | KES 350-600 total (Health Hub) vs KES 750-2,400 (clinic + transport + time) |
| vs. Access Afya (Kenya) | Comparable price, superior convenience | $3-5 for both; Health Hub adds video, specialist referral, digital pharmacy |
| vs. Halodoc (Indonesia) | Comparable but lower-income market | Similar $2-8 range; adjusted for lower East African purchasing power |
| vs. Practo (India) | Lower end of range; appropriate | India GDP/capita (~$2,500) is 2.4x Ethiopia; pricing reflects this gap |
| vs. Babylon Rwanda | Higher (Babylon was gov't-funded = free) | Health Hub's model must be self-sustaining without government subsidy |
| vs. Teladoc | 90-95% cheaper | Entirely different market; not directly competing |
| vs. mDoc (Nigeria) | Comparable B2B; lower B2C | mDoc targets employers; Health Hub targets individual patients first |

### 8.3 Competitive Differentiation Justifying Pricing

| Feature | Health Hub | Access Afya | Halodoc | Practo | mDoc |
|---------|-----------|-------------|---------|--------|------|
| GP consultations | Video + audio + text | Walk-in only | Video + text | Video + text | B2B only |
| Specialist referral | Integrated (GP to specialist on-platform) | Manual referral | Separate marketplace | Separate marketplace | N/A |
| Pharmacy integration | Digital Rx routing + delivery coordination | In-clinic dispensing | Integrated marketplace | Partner pharmacies | N/A |
| Lab ordering | Digital order + result delivery | In-clinic only | Integrated | Partner labs | Partner labs |
| AI triage | Included (Claude-powered) | None | Basic symptom checker | Basic symptom checker | None |
| Care coordination | Admin-assisted callbacks (human + digital) | Walk-in only | Automated only | Automated only | Health coaches |
| Multi-country | Ethiopia + Kenya | Kenya only | Indonesia only | India + global | Nigeria |

---

## 9. Pricing Risks

### 9.1 Currency Depreciation (ETB/KES)

| Parameter | Assessment |
|-----------|------------|
| **Risk** | ETB devaluation against USD reduces real value of revenue. The ETB has experienced 40%+ devaluation events in 2023-2024. KES is more stable but still volatile. |
| **Severity** | High |
| **Probability** | High (Ethiopia) / Medium (Kenya) |
| **Impact** | Revenue in USD terms declines while infrastructure and staff costs (partially USD-denominated) remain stable. A 20% ETB devaluation reduces ETB-denominated revenue to ~83% of projected USD value. |
| **Mitigation** | (1) 10-15% FX buffer applied to all projections per params.md Section 10. (2) Quarterly ETB price adjustments to maintain USD-equivalent targets. (3) Kenya (KES) revenue provides partial currency hedge. (4) Consider pegging internal price targets to USD with local conversion at transaction time (requires clear UX). (5) Long-term: diversify to more stable currency markets (Kenya, potentially Tanzania/Rwanda). |

### 9.2 Willingness-to-Pay Overestimation

| Parameter | Assessment |
|-----------|------------|
| **Risk** | Actual willingness to pay is lower than modeled, particularly in Ethiopia where digital payment habits are still forming and healthcare is treated as an emergency expense. |
| **Severity** | High |
| **Probability** | Medium |
| **Impact** | Revenue projections are 30-50% below modeled figures. Production breakeven takes 6-12 months longer than planned. |
| **Mitigation** | (1) Pilot 1 and 2 include explicit A/B price testing across cohorts -- WTP is empirically validated before production pricing is set. (2) Free tier ensures user acquisition is not gated on WTP. (3) Price floor of ETB 100 ($1.75) for GP is well below physical clinic alternative, preserving value proposition even at reduced WTP. (4) 25% revenue buffer in all financial projections. (5) Maintain the ability to lower production prices to Pilot 2 levels if needed. |

### 9.3 Regulatory Price Caps

| Parameter | Assessment |
|-----------|------------|
| **Risk** | Ethiopian or Kenyan government imposes price controls on telehealth consultations, capping fees below Health Hub's target. |
| **Severity** | Critical |
| **Probability** | Low (currently no regulatory framework for telehealth pricing in either market) |
| **Impact** | Must comply; may destroy B2C unit economics if cap is below ETB 100. |
| **Mitigation** | (1) Monitor regulatory developments through local legal counsel and advisory board. (2) Marginal cost of ETB 9-35 per consultation means even a 50% price reduction preserves positive contribution margin. (3) If B2C price controls are imposed, shift revenue emphasis to B2B facility fees and commissions, which are less likely to face regulation. (4) Participate in industry associations to influence regulatory design. |

### 9.4 Competitor Undercutting

| Parameter | Assessment |
|-----------|------------|
| **Risk** | A well-funded competitor (mPharma, Helium Health, or a local entrant backed by telco or bank) launches telehealth in Ethiopia/Kenya at below-cost pricing to capture market share. Alternatively, Safaricom/Ethio Telecom bundles telehealth with mobile subscription. |
| **Severity** | High |
| **Probability** | Medium |
| **Impact** | Price war erodes margins; must match or differentiate. If a telco bundles free telehealth, Health Hub's B2C model faces existential pressure. |
| **Mitigation** | (1) Integrated platform (GP + specialist + pharmacy + lab + AI triage) is difficult to replicate quickly -- compete on breadth. (2) Build switching costs through prescription history, family accounts, and facility relationships. (3) If price war occurs, temporarily lower GP price to marginal cost (ETB 10-15) while maintaining specialist and B2B streams. (4) For telco bundling risk: partner rather than compete; offer white-label platform to telecoms. (5) Speed to market and early facility partnerships create defensible network effects. |

### 9.5 Payment Infrastructure Delays

| Parameter | Assessment |
|-----------|------------|
| **Risk** | M-Pesa/Telebirr API integration takes longer or costs more than estimated. Ethiopia's payment API ecosystem is less mature than Kenya's. Regulatory approvals for payment processing may add months. |
| **Severity** | Medium |
| **Probability** | Medium-High (especially Ethiopia) |
| **Impact** | Revenue start delayed by 2-4 months. Manual payment workaround limits scale during Pilot 1. |
| **Mitigation** | (1) Manual M-Pesa payment (Till number + confirmation code) serves as Pilot 1 fallback -- revenue collection works, just not automated. (2) Integrate Kenya M-Pesa (Daraja API, well-documented) first as the simpler path; Ethiopia Telebirr/M-Pesa second. (3) Budget 110-155 development hours for payment integration (see Appendix C). (4) Stripe as card-payment fallback for higher-income users. |

### 9.6 Low Subscription Conversion

| Parameter | Assessment |
|-----------|------------|
| **Risk** | Premium subscription conversion rate is below the modeled 5-8%, reducing predictable MRR. Emerging market freemium-to-paid conversion benchmarks show 2-5%, and healthcare may be even lower due to episodic usage patterns. |
| **Severity** | Medium |
| **Probability** | Medium-High |
| **Impact** | MRR component underperforms; total revenue remains viable from pay-per-use but loses the predictability benefit. |
| **Mitigation** | (1) Subscription is positioned as optional upside, not primary revenue driver. Base-case projections work even at 0% subscription conversion. (2) Test subscription willingness during late Pilot 2 before investing in recurring billing infrastructure. (3) Offer 30-day free trial to lower conversion friction. (4) Consider family/household plans which may resonate more strongly than individual subscriptions in East African family structures. |

### 9.7 Employed Staff Cost Overrun

| Parameter | Assessment |
|-----------|------------|
| **Risk** | The employed doctor and admin staff costs (per params.md Section 4) grow faster than revenue, creating a structural deficit. Doctor utilization may be low in early phases when patient volume is insufficient to fill shifts. |
| **Severity** | High |
| **Probability** | Medium (especially in Pilot 1-2 when volume is low) |
| **Impact** | Monthly burn rate exceeds projections by $1,000-3,000/mo during pilot phases. |
| **Mitigation** | (1) Phase staff hiring tightly to patient volume (params.md Section 4.2 defines the ladder). (2) Use shift-based scheduling rather than full-time contracts for employed doctors -- pay per shift, not per month, during pilots. (3) Partner-clinic doctors handle overflow; employed doctors handle minimum coverage baseline. (4) Cross-train admin ops staff to handle multiple functions during low-volume periods. |

### 9.8 Risk Severity Matrix

| Risk | Probability | Impact | Combined Severity | Primary Mitigation |
|------|------------|--------|-------------------|-------------------|
| Currency depreciation (ETB) | High | High | **Critical** | FX buffer + quarterly price adjustment |
| WTP overestimation | Medium | High | **High** | A/B testing in pilots; 25% revenue buffer |
| Competitor undercutting | Medium | High | **High** | Integrated platform differentiation |
| Payment infra delays | Medium-High | Medium | **High** | Manual fallback; Kenya-first integration |
| Employed staff cost overrun | Medium | High | **High** | Phased hiring; shift-based contracts |
| Low subscription conversion | Medium-High | Medium | **Medium** | Subscription as optional upside only |
| Regulatory price caps | Low | Critical | **Medium** | B2B revenue shift; industry engagement |

---

## 10. Key Takeaways

### 10.1 Model Selection

**Hybrid freemium + pay-per-use is the right model for East Africa.** Pure
subscription is too high a barrier for price-sensitive Ethiopian consumers. Pure
pay-per-use misses the user acquisition velocity that a free tier provides. The
hybrid model acquires users at zero cost through the free tier and monetizes
through consultation fees that align with the existing mental model of paying per
clinic visit.

### 10.2 Unit Economics

**Per-consultation margins are exceptionally favorable (91-96%), but the total
cost picture is more nuanced than a pure marketplace.** When employed clinical and
operational staff costs are included (per params.md), the all-in breakeven
requires approximately 1,200-1,600 active patients at production pricing.
Infrastructure-only breakeven requires only 130-180 active patients. The gap
between these two numbers is the "operating company premium" -- the cost of being
a healthcare delivery operation, not just a technology platform.

### 10.3 Pricing Sensitivity to Funding, Not Price Level

**Pricing strategy is more sensitive to investor timing than to price level.**
The difference between GP consultation pricing at ETB 200 vs ETB 250 matters less
than whether M-Pesa integration is ready in Month 5 vs Month 10. Across all 21
combinations, the primary pricing differentiator is how quickly the platform
delivers payment infrastructure, which correlates directly with self-fund level
and investor timing.

### 10.4 Recommended Pricing Posture by Scenario Family

| Scenario Family | Pricing Posture | Rationale |
|----------------|----------------|-----------|
| **S1 (Self-Funded)** | Conservative: move to paid pricing early, price at mid-range, prioritize revenue over volume | No investor cushion means revenue must cover costs sooner; cannot afford extended low-price growth phase |
| **S2 (Investor at P2 transition)** | Balanced: symbolic Pilot 1, discounted Pilot 2, full production pricing with investor-funded marketing | Investor capital enables A/B testing and marketing-driven volume; pricing can be data-driven by production |
| **S3 (Investor after P1)** | Aggressive growth: keep prices low through Pilot 2, build maximum user base, premium production pricing | Earliest investor capital arrival enables longest subsidized growth period; largest user base supports highest production prices |
| **L1 combinations** | Price-taker: accept lower prices and slower growth; manual payment workarounds | Limited development capacity constrains payment infra and feature delivery |
| **L2 combinations** | Price-setter: enough capacity to build payment infra, test prices, and iterate | Balanced; enough resources to be data-driven about pricing |
| **L3 combinations** | Premium positioning: fastest feature delivery justifies higher prices; subscription viable | Full product quality enables premium pricing; subscription tier is realistic |

### 10.5 Baseline Plan Revenue Target

**The baseline plan (S2-O2-I2) targets ~$5,000/month at production scale** with
500 active patients and 7 onboarded facilities. The ROI milestone (cumulative
revenue >= cumulative investment) is projected at Month 28-36 from project start.
Ethiopia and Kenya require separate price schedules in local currency but converge
to approximately $3-5 per GP consultation in USD equivalent.

### 10.6 Critical Success Factors for Pricing

1. **M-Pesa/Telebirr integration speed** -- the single largest determinant of
   time-to-revenue across all scenarios.
2. **Pilot 2 A/B testing quality** -- production pricing must be informed by
   real elasticity data, not assumptions.
3. **Facility partner density** -- B2B revenue (platform fees + commissions) is
   a critical diversifier against B2C pricing risk.
4. **Employed staff utilization** -- keeping doctor utilization above 60% during
   operational hours is essential for cost structure sustainability.
5. **FX management** -- quarterly ETB price adjustments prevent gradual margin
   erosion from currency depreciation.

---

## 11. Cross-References

| Document | Relationship |
|----------|-------------|
| [params.md](./params.md) | Source of all scenario definitions, phase timelines, FX rates, team costs, employed staff models, and infrastructure costs |
| [05-revenue-modelling.md](./05-revenue-modelling.md) | Revenue projections built on the pricing models defined here |
| [15-competitive-analysis.md](../15-competitive-analysis.md) | Competitor pricing benchmarks that inform Health Hub's pricing position |
| [02-services-slas.md](./02-services-slas.md) | Service definitions and phase availability that determine what is priced at each stage |
| [04-effort-estimation.md](./04-effort-estimation.md) | Development hours for payment infrastructure that constrain pricing timeline |
| [07-scenario-modelling.md](./07-scenario-modelling.md) | Full financial models for all 21 combinations that consume pricing inputs from this document |

---

## Appendix A: Kenya Production Pricing -- All 21 Combinations

Kenya pricing is derived from Ethiopia ETB pricing using the purchasing-power-
adjusted ratio (approximately 2.3x KES per ETB equivalent in USD terms) and
validated against Kenyan market benchmarks.

### A.1 Scenario 1 (Self-Funded) -- Kenya

| Combo | GP (KES) | GP (USD) | Specialist (KES) | Specialist (USD) | Subscription (KES/mo) |
|-------|----------|----------|------------------|------------------|-----------------------|
| S1-L1 | 350-450 | $2.70-3.45 | 650-900 | $5.00-6.90 | N/A |
| S1-L2 | 400-550 | $3.10-4.25 | 800-1,100 | $6.15-8.45 | 500-700 |
| S1-L3 | 450-650 | $3.45-5.00 | 900-1,300 | $6.90-10.00 | 550-800 |

### A.2 Scenario 2 (Investor at P2 Transition) -- Kenya

| Combo | GP (KES) | GP (USD) | Specialist (KES) | Specialist (USD) | Subscription (KES/mo) |
|-------|----------|----------|------------------|------------------|-----------------------|
| S2-O1-I1 | 350-450 | $2.70-3.45 | 650-900 | $5.00-6.90 | N/A |
| S2-O1-I2 | 400-550 | $3.10-4.25 | 800-1,100 | $6.15-8.45 | 450-650 |
| S2-O1-I3 | 450-650 | $3.45-5.00 | 900-1,300 | $6.90-10.00 | 500-750 |
| S2-O2-I1 | 400-500 | $3.10-3.85 | 800-1,000 | $6.15-7.70 | N/A |
| S2-O2-I2* | 450-600 | $3.45-4.62 | 900-1,200 | $6.90-9.25 | 550-750 |
| S2-O2-I3 | 450-650 | $3.45-5.00 | 900-1,300 | $6.90-10.00 | 600-800 |
| S2-O3-I1 | 450-600 | $3.45-4.62 | 900-1,200 | $6.90-9.25 | 500-700 |
| S2-O3-I2 | 450-650 | $3.45-5.00 | 900-1,300 | $6.90-10.00 | 600-800 |
| S2-O3-I3 | 500-700 | $3.85-5.38 | 1,000-1,400 | $7.70-10.75 | 650-900 |

*Baseline plan

### A.3 Scenario 3 (Investor After P1) -- Kenya

| Combo | GP (KES) | GP (USD) | Specialist (KES) | Specialist (USD) | Subscription (KES/mo) |
|-------|----------|----------|------------------|------------------|-----------------------|
| S3-O1-I1 | 350-450 | $2.70-3.45 | 650-900 | $5.00-6.90 | N/A |
| S3-O1-I2 | 400-550 | $3.10-4.25 | 800-1,100 | $6.15-8.45 | 450-650 |
| S3-O1-I3 | 450-650 | $3.45-5.00 | 900-1,300 | $6.90-10.00 | 500-750 |
| S3-O2-I1 | 400-500 | $3.10-3.85 | 800-1,000 | $6.15-7.70 | N/A |
| S3-O2-I2 | 450-600 | $3.45-4.62 | 900-1,200 | $6.90-9.25 | 550-750 |
| S3-O2-I3 | 500-700 | $3.85-5.38 | 1,000-1,400 | $7.70-10.75 | 650-900 |
| S3-O3-I1 | 450-600 | $3.45-4.62 | 900-1,200 | $6.90-9.25 | 500-700 |
| S3-O3-I2 | 500-700 | $3.85-5.38 | 1,000-1,400 | $7.70-10.75 | 650-850 |
| S3-O3-I3 | 550-750 | $4.25-5.77 | 1,100-1,500 | $8.45-11.55 | 700-950 |

---

## Appendix B: Price Elasticity Assumptions

The following elasticity assumptions underpin the revenue projections in Section 7.
These are estimates to be validated during Pilot 2 A/B testing.

| Price Change | Estimated Volume Impact | Estimated Net Revenue Impact | Confidence |
|-------------|------------------------|----------------------------|------------|
| -50% (deep discount) | +80-120% volume | +40-60% revenue (volume-driven) | Low -- untested |
| -25% (moderate discount) | +30-50% volume | +5-25% revenue | Low-Medium |
| Base price (0%) | Baseline volume | Baseline revenue | Medium (anchored to competitor data) |
| +25% (moderate increase) | -20-30% volume | -5-10% revenue | Low-Medium |
| +50% (premium increase) | -35-50% volume | -15-25% revenue | Low |

**GP consultations** are relatively elastic in the ETB 100-300 range because
physical clinic substitutes are readily available. Above ETB 300, demand becomes
more inelastic as remaining patients have higher WTP and stronger preference for
digital convenience.

**Specialist consultations** show lower elasticity because the physical
alternative is significantly more expensive, harder to access, and involves longer
wait times. Patients who need specialist care have fewer substitutes.

**Video premium add-on** elasticity is unknown -- no comparable data exists for
East African telehealth video pricing. The ETB 50-100 premium is set
conservatively at ~25-35% of the base consultation fee.

---

## Appendix C: M-Pesa/Telebirr Integration Cost and Timeline

| Phase | Integration Level | Dev Hours | Cost (at $15-20/hr blended) | Payment Capability |
|-------|------------------|----------|----------------------------|-------------------|
| Pilot 1 | Manual (Till number + screenshot/code confirmation) | 10-15 hrs | $150-300 | Basic payment collection; no automated reconciliation |
| Pilot 2 | Sandbox/Live API (Daraja API for M-Pesa Kenya; Telebirr SDK for Ethiopia) | 60-80 hrs | $900-1,600 | Automated STK push; real-time confirmation; basic reconciliation |
| Production | Full API (live M-Pesa + Telebirr + Stripe card fallback + refunds) | 40-60 hrs | $600-1,200 | Full payment lifecycle; refunds; multi-currency; reconciliation dashboard |
| **Total** | | **110-155 hrs** | **$1,650-3,100** | |

**Note:** v2 uses the actual rate card from params.md ($15-20/hr) rather than
the v1 estimate of $30/hr, reducing the total payment integration cost estimate
from $3,300-4,650 to $1,650-3,100.

This development investment is a prerequisite for transitioning from free to
paid pricing. In lower-funded combinations (O1), the payment integration timeline
is the primary bottleneck for revenue generation.

---

## Appendix D: Employed Doctor Cost Impact on Pricing Floor

Per params.md Section 4, Health Hub employs MBBS doctors at INR 60,000/month
(~$720/month each). This creates a pricing floor consideration that pure
marketplace models do not face.

| Phase | Employed Doctors | Monthly Doctor Cost (USD) | Consultations Needed to Cover Doctor Cost (at $3.50/consult margin) | Patients Needed (at 1.5 consults/mo) |
|-------|-----------------|-------------------------|------------------------------------------------------------------|--------------------------------------|
| Pilot 1 | 2 | $1,440 | 411 | 274 |
| Pilot 2 | 4 | $2,880 | 823 | 549 |
| Production | 6-8 | $4,320-5,760 | 1,234-1,646 | 823-1,097 |

**Implication:** The employed doctor cost means Health Hub needs 800-1,100 active
patients at production just to cover its clinical staff. This is the primary
argument for ensuring marketing investment (via investor capital) drives sufficient
user acquisition before scaling the clinical team.

**Alternative model:** During Pilot 1-2, employed doctors can be hired on
shift-based contracts rather than monthly salaries, reducing the fixed cost
commitment until patient volume justifies full employment.

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2026-03-18 | 1.0 | Initial document -- full 21-combination pricing analysis |
| 2026-03-19 | 2.0 | v2 rewrite: incorporated params.md v2 rate card ($10-20/hr vs $24-36), employed staff costs, operational infrastructure, B2B SaaS model analysis, total cost of care comparison, detailed breakeven with/without employed staff, risk severity matrix, pricing posture recommendations by scenario family, Appendix D (doctor cost impact) |

---

*End of 06-pricing-strategy.md*
