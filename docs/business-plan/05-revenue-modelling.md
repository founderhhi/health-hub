# 05 — Revenue Modelling

**Health Hub Business Plan | Document 5 of 15**
**Date:** March 2026 | **Covers:** All 21 scenario x level combinations

> All assumptions, rates, scenarios, and phase definitions in this document are
> sourced from [params.md](./params.md). Refer to that document for any
> parameter clarification.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Methodology](#2-methodology)
3. [Revenue Streams](#3-revenue-streams)
4. [Market Sizing](#4-market-sizing)
5. [Revenue Model Assumptions](#5-revenue-model-assumptions)
6. [Scenario Analysis — All 21 Combinations](#6-scenario-analysis--all-21-combinations)
7. [Revenue Comparison Summary](#7-revenue-comparison-summary)
8. [Revenue Sensitivity Analysis](#8-revenue-sensitivity-analysis)
9. [Revenue vs Cost Overlay](#9-revenue-vs-cost-overlay)
10. [Key Takeaways](#10-key-takeaways)
11. [Cross-References](#11-cross-references)

---

## 1. Executive Summary

Health Hub's revenue model is built on a dual-sided marketplace structure that
combines direct patient charges (B2C) with healthcare facility commissions and
platform fees (B2B). The platform generates revenue through per-consultation
fees, premium subscription plans, video add-ons, lab facilitation fees,
prescription coordination fees, and facility marketplace commissions. Revenue
collection begins during Pilot 2 at discounted rates and reaches full pricing
at Production scale, following a deliberate "grow first, monetize second"
approach that prioritizes network effects and user trust over early extraction.

The total addressable market for digital health across urban Ethiopia and Kenya
is estimated at $300M-$480M annually, driven by 15-16 million smartphone users
with growing willingness to pay for convenient healthcare access. Health Hub's
serviceable obtainable market begins at $15K-$24K in Year 1 of Production
(0.01-0.05% of SAM) and scales to $1.5M-$4.8M by Year 3-4 (0.2-1.0% of SAM),
reflecting realistic adoption curves for a new digital health entrant in
emerging markets where trust-building and regulatory navigation are critical
gatekeeping factors.

Across all 21 scenario and level combinations, the model projects first
meaningful revenue between Month 5 (best case: S3-L3-I3) and Month 12 (worst
case: S1-L1). The baseline plan (S2-L2-I2) reaches first revenue at Month 7
and achieves the success metric — cumulative total revenue exceeding cumulative
total capital investment — between Month 20 and Month 24. The fully self-funded
bootstrapped path (S1-L1) requires 30-36 months to reach the success metric,
while the maximum-acceleration path (S3-L3-I3) can reach it in 14-18 months,
though the latter requires $150K-$250K in investor capital and carries higher
burn risk if revenue assumptions prove optimistic.

---

## 2. Methodology

### 2.1 Dual Estimation Approach

Revenue projections are constructed through two complementary methods:

**Bottom-up model:**
- Registered users x monthly active rate x consultations per active user x average fee
- Facilities onboarded x platform fee x payment rate
- Facility transaction volume x commission percentage
- Premium subscribers x subscription price

**Top-down model:**
- Total addressable market (TAM) for East Africa digital health
- Serviceable addressable market (SAM) filtered by geography, smartphone access, and income
- Serviceable obtainable market (SOM) based on realistic market penetration curves

The bottom-up model drives the month-by-month projections in Section 6. The
top-down model provides a sanity check and ceiling validation in Section 4.

### 2.2 Conservatism Principles

All projections in this document follow these conservatism rules:

1. **No revenue before Pilot 2** — Pre-Pilot and Pilot 1 are free or symbolic
   pricing only. Revenue tables show $0 for these phases.
2. **50% pricing during Pilot 2** — Target prices are halved during the Pilot 2
   phase to reflect introductory/validation pricing.
3. **Full pricing at Production only** — Target prices from the pricing strategy
   (Document 06) are applied only from Production onward.
4. **10-15% FX buffer applied** — All ETB/KES-to-USD conversions include a
   downward adjustment to account for currency depreciation risk.
5. **Transaction fees deducted** — M-Pesa/Telebirr fees (1-2%) are netted from
   revenue figures. Stripe fees are not yet applicable.
6. **Churn modeled explicitly** — Monthly user churn is subtracted from growth
   to produce net user counts.

### 2.3 Scenario-Specific Revenue Drivers

Revenue timing and magnitude vary across scenarios because investment level
directly affects:

| Driver | How Investment Level Affects It |
|--------|-------------------------------|
| Time to Pilot 2 (first revenue) | L1: M8-10; L2: M5-7; L3: M4-5 |
| Feature completeness at launch | L1: MVP only; L2: core + video; L3: full platform |
| Marketing budget | L1: $0; L2: $50-100/mo; L3: $200-500/mo |
| Facility onboarding pace | L1: 2-3 facilities; L2: 5-8; L3: 10-15 |
| ARPU (more features = higher willingness to pay) | L1: lowest; L3: highest |

---

## 3. Revenue Streams

| Stream | Type | Revenue Model | Phase Available | ETB Price | KES Price | USD Equiv. |
|--------|------|--------------|----------------|-----------|-----------|------------|
| GP Consultation Fees | B2C | Per-transaction | Pilot 2+ | ETB 200 | KES 400 | $3.08-$3.50 |
| Specialist Consultation Fees | B2C | Per-transaction | Pilot 2+ | ETB 400 | KES 800 | $6.15-$7.00 |
| Video Premium | B2C | Per-transaction add-on | Production | +ETB 75 | +KES 150 | +$1.15-$1.32 |
| Lab Facilitation Fees | B2C | Per-transaction | Production | ETB 75 | KES 150 | $1.15-$1.32 |
| Rx Coordination Fees | B2C | Per-transaction | Production | ETB 40 | KES 80 | $0.62-$0.70 |
| Premium Subscriptions | B2C | Monthly recurring | Pilot 2+ | ETB 300/mo | KES 600/mo | $4.62-$5.26/mo |
| Facility Platform Fees | B2B | Monthly recurring | Production | ETB 3,000/mo | — | $52.63/mo |
| Facility Commission | B2B | 12% of consultation fees | Production | 12% | 12% | 12% |
| AI Triage Premium | B2C | Per-use or subscription add-on | Extension | TBD | TBD | TBD |
| Data/Analytics (anonymized) | B2B | License or per-report | Extension | TBD | TBD | TBD |

### 3.1 Revenue Stream Phasing

```
Pre-Pilot (M0-2):    [FREE — no revenue collection]
Pilot 1 (M2-5):      [FREE or symbolic ETB 10-50 — data collection only]
Pilot 2 (M5-10):     GP Consult (50%) | Specialist Consult (50%) | Premium Sub (50%)
Production (M10+):   All streams at full price
Extension (Year 3+): AI Triage Premium | Data/Analytics
```

### 3.2 Unit Economics Per Transaction

| Stream | Gross Fee (USD) | M-Pesa/Telebirr Fee (1.5%) | Infra Cost | Net Margin | Margin % |
|--------|----------------|---------------------------|------------|------------|----------|
| GP Consultation | $3.29 avg | $0.05 | $0.14-$0.32 | $2.92-$3.10 | 89-94% |
| Specialist Consultation | $6.58 avg | $0.10 | $0.14-$0.32 | $6.16-$6.34 | 94-96% |
| Video Premium | $1.24 avg | $0.02 | $0.08-$0.15 | $1.07-$1.14 | 86-92% |
| Lab Facilitation | $1.24 avg | $0.02 | $0.02-$0.05 | $1.17-$1.20 | 94-97% |
| Rx Coordination | $0.66 avg | $0.01 | $0.02-$0.05 | $0.60-$0.63 | 91-95% |
| Premium Subscription | $4.94/mo avg | $0.07 | $0.50-$1.00 | $3.87-$4.37 | 78-88% |

**Blended platform margin: 91-96% on B2C transactions.** This exceptionally
high margin is characteristic of software-mediated marketplace transactions
where the platform's marginal cost is primarily compute and API calls.

---

## 4. Market Sizing

### 4.1 TAM (Total Addressable Market)

| Market Layer | Estimated Value | Source/Basis |
|-------------|----------------|-------------|
| Global digital health market (2026) | $330-$380B | Grand View Research, Statista extrapolation |
| Africa digital health market (2026) | $8-$12B | Africa Health Business, WHO estimates |
| East Africa healthcare expenditure | $15-$20B | WHO Global Health Expenditure Database |
| East Africa digital health (addressable) | $1.5-$3.0B | 10-15% digital penetration of total health spend |

### 4.2 SAM (Serviceable Addressable Market)

Health Hub's SAM is defined by: urban populations in Ethiopia and Kenya with
smartphone access and sufficient income to pay for digital health services.

| Parameter | Ethiopia | Kenya | Combined |
|-----------|----------|-------|----------|
| Total population | 126M | 56M | 182M |
| Urban population | 27.7M (22%) | 15.7M (28%) | 43.4M |
| Smartphone users (urban) | 7.0-8.3M (25-30%) | 7.8-8.6M (50-55%) | 14.8-16.9M |
| Health expenditure per capita | ~$28/yr | ~$84/yr | — |
| Digital health spend potential per capita | $10-$15/yr | $15-$30/yr | — |
| **SAM** | **$70M-$125M/yr** | **$117M-$258M/yr** | **$187M-$383M/yr** |

Rounding to account for estimation uncertainty: **SAM = $150M-$400M/year.**

### 4.3 SOM (Serviceable Obtainable Market)

SOM is constrained by Health Hub's realistic ability to acquire and retain users
given its team size, marketing budget, and competitive landscape.

| Timeframe | SOM % of SAM | SOM Range (Annual) | Basis |
|-----------|-------------|-------------------|-------|
| Year 1 (Production) | 0.01-0.05% | $15K-$200K | Initial user base of 1K-10K active |
| Year 2 | 0.05-0.2% | $75K-$800K | Growth to 5K-30K active users |
| Year 3-4 | 0.2-1.0% | $300K-$4.0M | Network effects, brand recognition |
| Year 5+ (Extension) | 1.0-3.0% | $1.5M-$12M | Multi-country, enterprise contracts |

These SOM projections are deliberately conservative. Comparable digital health
platforms in emerging markets (mPharma, Helium Health, Vezeeta) achieved 0.5-2%
SAM penetration within 3-4 years of launch with $5M-$20M in funding — far more
than Health Hub's projected investment range.

---

## 5. Revenue Model Assumptions

### 5.1 Core Assumptions Table

| Parameter | Conservative | Moderate | Optimistic |
|-----------|-------------|----------|-----------|
| Consultations per active user per month | 0.5 | 1.0 | 2.0 |
| % of registered users who are "active" (monthly) | 20% | 35% | 50% |
| Premium subscription conversion rate | 3% | 8% | 15% |
| Average consultation fee — Pilot 2 (USD) | $1.50 | $2.25 | $3.50 |
| Average consultation fee — Production (USD) | $3.00 | $4.50 | $7.00 |
| Facilities paying platform fee (% of onboarded) | 30% | 50% | 80% |
| Monthly user growth rate — Pilot 2 | 15% | 25% | 40% |
| Monthly user growth rate — Production | 10% | 15% | 25% |
| Monthly churn rate | 10% | 7% | 4% |
| Video premium attach rate | 5% | 15% | 30% |
| Lab facilitation attach rate | 10% | 20% | 35% |
| Rx coordination attach rate | 15% | 30% | 45% |

### 5.2 ARPU Buildup (Average Revenue Per User Per Month)

The average revenue per active user varies by phase and assumption set:

| Component | Pilot 2 (Moderate) | Production (Moderate) |
|-----------|-------------------|----------------------|
| Consultation revenue | 1.0 consult x $2.25 = $2.25 | 1.0 consult x $4.50 = $4.50 |
| Video premium | — | 15% x $1.24 = $0.19 |
| Lab facilitation | — | 20% x $1.24 = $0.25 |
| Rx coordination | — | 30% x $0.66 = $0.20 |
| Premium sub (amortized across all active) | 8% x $4.94 = $0.40 | 8% x $4.94 = $0.40 |
| **ARPU** | **$2.65/mo** | **$5.54/mo** |

| Scenario | Pilot 2 ARPU | Production ARPU |
|----------|-------------|----------------|
| Conservative | $1.15/mo | $2.85/mo |
| Moderate | $2.65/mo | $5.54/mo |
| Optimistic | $5.80/mo | $12.10/mo |

### 5.3 B2B Revenue Assumptions

| Parameter | Conservative | Moderate | Optimistic |
|-----------|-------------|----------|-----------|
| Facilities onboarded at Production launch | 5 | 10 | 20 |
| Facilities paying platform fee | 30% | 50% | 80% |
| Platform fee per facility/month (USD) | $52.63 | $52.63 | $52.63 |
| Average consultations per facility/month | 50 | 100 | 200 |
| Commission rate | 12% | 12% | 12% |
| Avg consultation fee through facility | $4.50 | $4.50 | $4.50 |
| Commission per facility/month | $27.00 | $54.00 | $108.00 |

---

## 6. Scenario Analysis — All 21 Combinations

The following sections present month-by-month revenue projections for all 21
scenario x level combinations. Each projection uses the **moderate** assumption
set as the primary model, with conservative and optimistic bounds noted in
summary tables. All figures are in USD.

### Key Notation

- **Mn** = Month n from project start (M0 = project kickoff)
- **Reg** = Registered users (cumulative)
- **Active** = Monthly active users (35% of registered, net of churn)
- **Consults** = Total consultations in the month
- **B2C** = Patient-side revenue (consultations + premium + add-ons)
- **B2B** = Facility-side revenue (platform fees + commissions)
- **Cum Rev** = Cumulative revenue to date
- **Cum CapEx** = Cumulative capital invested to date

---

### 6.1 Scenario 1: Fully Self-Funded

No external investor at any point. All capital from founders' personal funds.
Revenue timing is driven entirely by development velocity, which is constrained
by monthly spending capacity.

---

#### S1-L1 — Bootstrapped ($500/mo, No Investor)

**Profile:** Slowest path. Single part-time developer. MVP features only.
Pre-Pilot through early Pilot 2 spans M0-M10. Revenue begins M10 at 50%
pricing. Production pricing from M16+. Success metric target: M30-M36.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M3 | 100-200 | 0 | 0 | $0 | $0 | $0 | $0 | $2,000 |
| Pilot 1 | M4-M6 | 200-400 | 0 | 0 | $0 | $0 | $0 | $0 | $3,500 |
| Pilot 1 | M7-M9 | 400-600 | 0 | 0 | $0 | $0 | $0 | $0 | $5,000 |
| Pilot 2 | M10 | 700 | 140 | 70 | $99 | $0 | $99 | $99 | $5,500 |
| Pilot 2 | M11 | 850 | 187 | 94 | $132 | $0 | $132 | $231 | $6,000 |
| Pilot 2 | M12 | 1,000 | 245 | 123 | $173 | $0 | $173 | $404 | $6,500 |
| Pilot 2 | M13 | 1,200 | 315 | 158 | $222 | $0 | $222 | $626 | $7,000 |
| Pilot 2 | M14 | 1,450 | 395 | 198 | $279 | $0 | $279 | $905 | $7,500 |
| Pilot 2 | M15 | 1,750 | 490 | 245 | $345 | $53 | $398 | $1,303 | $8,000 |
| Production | M16 | 2,100 | 600 | 360 | $665 | $105 | $770 | $2,073 | $8,500 |
| Production | M17 | 2,500 | 725 | 435 | $804 | $130 | $934 | $3,007 | $9,000 |
| Production | M18 | 3,000 | 875 | 525 | $970 | $158 | $1,128 | $4,135 | $9,500 |
| Production | M19 | 3,500 | 1,030 | 618 | $1,142 | $185 | $1,327 | $5,462 | $10,000 |
| Production | M20 | 4,100 | 1,210 | 726 | $1,342 | $216 | $1,558 | $7,020 | $10,500 |
| Production | M21 | 4,800 | 1,420 | 852 | $1,575 | $253 | $1,828 | $8,848 | $11,000 |
| Production | M22 | 5,500 | 1,640 | 984 | $1,818 | $290 | $2,108 | $10,956 | $11,500 |
| Production | M23 | 6,300 | 1,890 | 1,134 | $2,096 | $330 | $2,426 | $13,382 | $12,000 |
| Production | M24 | 7,200 | 2,160 | 1,296 | $2,395 | $378 | $2,773 | $16,155 | $12,500 |

**Annual summary:**

| Period | Revenue | Cumulative Rev | CapEx to Date | Rev vs CapEx |
|--------|---------|---------------|---------------|-------------|
| Year 1 (M0-M12) | $404 | $404 | $6,500 | -$6,096 |
| Year 2 (M13-M24) | $15,751 | $16,155 | $12,500 | +$3,655 |
| Year 3 (M25-M36) | $48,000-$65,000 | $64,155-$81,155 | $18,500 | +$45,655-$62,655 |

**Time to success metric:** ~M22-M24 (cumulative revenue crosses cumulative CapEx around $11K-$12K).

---

#### S1-L2 — Ideal ($1,000/mo, No Investor)

**Profile:** Moderate pace. 1.5 developers. Core features plus video. Revenue
begins M7 at 50% pricing. Production pricing from M12+. Success metric
target: M20-M24.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M2 | 150 | 0 | 0 | $0 | $0 | $0 | $0 | $3,000 |
| Pilot 1 | M3-M5 | 500 | 0 | 0 | $0 | $0 | $0 | $0 | $6,000 |
| Pilot 2 | M6 | 700 | 175 | 88 | $124 | $0 | $124 | $124 | $7,000 |
| Pilot 2 | M7 | 900 | 248 | 124 | $175 | $0 | $175 | $299 | $8,000 |
| Pilot 2 | M8 | 1,150 | 340 | 170 | $240 | $0 | $240 | $539 | $9,000 |
| Pilot 2 | M9 | 1,450 | 450 | 225 | $317 | $0 | $317 | $856 | $10,000 |
| Pilot 2 | M10 | 1,800 | 575 | 288 | $406 | $53 | $459 | $1,315 | $11,000 |
| Pilot 2 | M11 | 2,250 | 730 | 365 | $514 | $79 | $593 | $1,908 | $12,000 |
| Production | M12 | 2,800 | 910 | 546 | $1,009 | $158 | $1,167 | $3,075 | $13,000 |
| Production | M13 | 3,300 | 1,085 | 651 | $1,203 | $195 | $1,398 | $4,473 | $14,000 |
| Production | M14 | 3,900 | 1,290 | 774 | $1,431 | $237 | $1,668 | $6,141 | $15,000 |
| Production | M15 | 4,500 | 1,510 | 906 | $1,675 | $280 | $1,955 | $8,096 | $16,000 |
| Production | M16 | 5,200 | 1,760 | 1,056 | $1,952 | $330 | $2,282 | $10,378 | $17,000 |
| Production | M17 | 6,000 | 2,040 | 1,224 | $2,262 | $385 | $2,647 | $13,025 | $18,000 |
| Production | M18 | 6,900 | 2,350 | 1,410 | $2,606 | $442 | $3,048 | $16,073 | $19,000 |
| Production | M19 | 7,900 | 2,700 | 1,620 | $2,994 | $505 | $3,499 | $19,572 | $20,000 |
| Production | M20 | 9,000 | 3,080 | 1,848 | $3,415 | $580 | $3,995 | $23,567 | $21,000 |
| Production | M21 | 10,200 | 3,500 | 2,100 | $3,881 | $660 | $4,541 | $28,108 | $22,000 |
| Production | M22 | 11,500 | 3,960 | 2,376 | $4,391 | $745 | $5,136 | $33,244 | $23,000 |
| Production | M23 | 13,000 | 4,470 | 2,682 | $4,957 | $840 | $5,797 | $39,041 | $24,000 |
| Production | M24 | 14,500 | 5,000 | 3,000 | $5,544 | $940 | $6,484 | $45,525 | $25,000 |

**Annual summary:**

| Period | Revenue | Cumulative Rev | CapEx to Date | Rev vs CapEx |
|--------|---------|---------------|---------------|-------------|
| Year 1 (M0-M12) | $3,075 | $3,075 | $13,000 | -$9,925 |
| Year 2 (M13-M24) | $42,450 | $45,525 | $25,000 | +$20,525 |

**Time to success metric:** ~M16-M18 (cumulative revenue crosses $17K-$19K CapEx).

---

#### S1-L3 — Fully Funded ($2,000/mo, No Investor)

**Profile:** Fastest self-funded path. Full team. All features including video
and lab integration. Revenue begins M5 at 50% pricing. Production pricing
from M9+. Success metric target: M14-M18.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M1 | 200 | 0 | 0 | $0 | $0 | $0 | $0 | $4,000 |
| Pilot 1 | M2-M4 | 800 | 0 | 0 | $0 | $0 | $0 | $0 | $10,000 |
| Pilot 2 | M5 | 1,200 | 360 | 180 | $254 | $0 | $254 | $254 | $12,000 |
| Pilot 2 | M6 | 1,600 | 504 | 252 | $355 | $0 | $355 | $609 | $14,000 |
| Pilot 2 | M7 | 2,100 | 685 | 343 | $483 | $53 | $536 | $1,145 | $16,000 |
| Pilot 2 | M8 | 2,700 | 900 | 450 | $634 | $79 | $713 | $1,858 | $18,000 |
| Production | M9 | 3,400 | 1,120 | 672 | $1,242 | $158 | $1,400 | $3,258 | $20,000 |
| Production | M10 | 4,100 | 1,370 | 822 | $1,519 | $210 | $1,729 | $4,987 | $22,000 |
| Production | M11 | 4,900 | 1,650 | 990 | $1,830 | $265 | $2,095 | $7,082 | $24,000 |
| Production | M12 | 5,800 | 1,970 | 1,182 | $2,184 | $330 | $2,514 | $9,596 | $26,000 |
| Production | M13 | 6,800 | 2,330 | 1,398 | $2,584 | $395 | $2,979 | $12,575 | $28,000 |
| Production | M14 | 7,900 | 2,730 | 1,638 | $3,028 | $470 | $3,498 | $16,073 | $30,000 |
| Production | M15 | 9,100 | 3,170 | 1,902 | $3,515 | $550 | $4,065 | $20,138 | $32,000 |
| Production | M16 | 10,500 | 3,680 | 2,208 | $4,080 | $640 | $4,720 | $24,858 | $34,000 |
| Production | M17 | 12,000 | 4,230 | 2,538 | $4,690 | $740 | $5,430 | $30,288 | $36,000 |
| Production | M18 | 13,700 | 4,850 | 2,910 | $5,378 | $850 | $6,228 | $36,516 | $38,000 |
| Production | M19 | 15,600 | 5,540 | 3,324 | $6,143 | $970 | $7,113 | $43,629 | $40,000 |
| Production | M20 | 17,700 | 6,310 | 3,786 | $6,997 | $1,105 | $8,102 | $51,731 | $42,000 |
| Production | M21 | 20,000 | 7,160 | 4,296 | $7,939 | $1,250 | $9,189 | $60,920 | $44,000 |
| Production | M22 | 22,500 | 8,100 | 4,860 | $8,982 | $1,410 | $10,392 | $71,312 | $46,000 |
| Production | M23 | 25,200 | 9,120 | 5,472 | $10,112 | $1,585 | $11,697 | $83,009 | $48,000 |
| Production | M24 | 28,000 | 10,200 | 6,120 | $11,310 | $1,775 | $13,085 | $96,094 | $50,000 |

**Annual summary:**

| Period | Revenue | Cumulative Rev | CapEx to Date | Rev vs CapEx |
|--------|---------|---------------|---------------|-------------|
| Year 1 (M0-M12) | $9,596 | $9,596 | $26,000 | -$16,404 |
| Year 2 (M13-M24) | $86,498 | $96,094 | $50,000 | +$46,094 |

**Time to success metric:** ~M14-M16 (cumulative revenue crosses $30K-$34K CapEx).

---

### 6.2 Scenario 2: Investor at Pilot 2 Transition

Self-funded from M0 through Pilot 1 and into the P1-to-P2 transition. Investor
capital arrives before or during Pilot 2, unlocking marketing budget, additional
development capacity, and faster facility onboarding.

For each combination, the pre-investor phase mirrors the corresponding S1-LX
trajectory. Post-investor, user growth accelerates due to marketing spend and
the platform reaches Production faster with higher feature completeness.

**Investor arrival timing (moderate estimate):**
- L1 self-funded: Investor arrives ~M8-M10
- L2 self-funded: Investor arrives ~M6-M8
- L3 self-funded: Investor arrives ~M5-M6

---

#### S2-L1-I1 — Bootstrapped + Modest Investor ($500/mo + $25K-$40K)

**Profile:** Minimal self-fund through M8-10, then modest investor injection.
Investor capital extends runway by 5-8 months and enables moderate marketing.
Revenue begins M10 at 50% pricing. Production from M14+.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M3 | 200 | 0 | 0 | $0 | $0 | $0 | $0 | $2,000 |
| Pilot 1 | M4-M8 | 500 | 0 | 0 | $0 | $0 | $0 | $0 | $4,500 |
| Invest. | M9 | — | — | — | — | — | — | $0 | $37,000 |
| Pilot 2 | M10 | 800 | 200 | 100 | $141 | $0 | $141 | $141 | $39,000 |
| Pilot 2 | M11 | 1,050 | 290 | 145 | $204 | $0 | $204 | $345 | $41,000 |
| Pilot 2 | M12 | 1,350 | 390 | 195 | $275 | $0 | $275 | $620 | $43,000 |
| Pilot 2 | M13 | 1,750 | 520 | 260 | $366 | $53 | $419 | $1,039 | $45,000 |
| Production | M14 | 2,200 | 670 | 402 | $743 | $105 | $848 | $1,887 | $47,000 |
| Production | M15 | 2,750 | 850 | 510 | $943 | $140 | $1,083 | $2,970 | $49,000 |
| Production | M16 | 3,400 | 1,070 | 642 | $1,187 | $180 | $1,367 | $4,337 | $50,500 |
| Production | M17 | 4,100 | 1,310 | 786 | $1,453 | $225 | $1,678 | $6,015 | $51,000 |
| Production | M18 | 5,000 | 1,600 | 960 | $1,774 | $280 | $2,054 | $8,069 | $51,500 |
| Production | M20 | 7,000 | 2,310 | 1,386 | $2,561 | $410 | $2,971 | $14,011 | $52,500 |
| Production | M22 | 9,500 | 3,200 | 1,920 | $3,548 | $570 | $4,118 | $22,247 | $53,500 |
| Production | M24 | 12,500 | 4,300 | 2,580 | $4,768 | $775 | $5,543 | $33,908 | $54,500 |

**Time to success metric:** ~M28-M32. Investor capital creates a large CapEx hurdle ($37K+) that takes longer to recover despite faster growth.

---

#### S2-L1-I2 — Bootstrapped + Ideal Investor ($500/mo + $75K-$100K)

**Profile:** Same slow self-funded start, but larger investor injection enables
full team hire and significant marketing. Revenue starts M10, accelerates fast.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M3 | 200 | 0 | 0 | $0 | $0 | $0 | $0 | $2,000 |
| Pilot 1 | M4-M8 | 500 | 0 | 0 | $0 | $0 | $0 | $0 | $4,500 |
| Invest. | M9 | — | — | — | — | — | — | $0 | $92,000 |
| Pilot 2 | M10 | 1,000 | 300 | 150 | $211 | $0 | $211 | $211 | $95,000 |
| Pilot 2 | M11 | 1,400 | 430 | 215 | $303 | $0 | $303 | $514 | $98,000 |
| Pilot 2 | M12 | 1,900 | 610 | 305 | $430 | $53 | $483 | $997 | $101,000 |
| Production | M13 | 2,500 | 810 | 486 | $898 | $158 | $1,056 | $2,053 | $104,000 |
| Production | M14 | 3,200 | 1,050 | 630 | $1,164 | $210 | $1,374 | $3,427 | $106,000 |
| Production | M15 | 4,100 | 1,370 | 822 | $1,519 | $280 | $1,799 | $5,226 | $108,000 |
| Production | M16 | 5,200 | 1,760 | 1,056 | $1,952 | $360 | $2,312 | $7,538 | $109,500 |
| Production | M18 | 8,000 | 2,750 | 1,650 | $3,049 | $550 | $3,599 | $14,736 | $112,000 |
| Production | M20 | 12,000 | 4,150 | 2,490 | $4,602 | $830 | $5,432 | $25,600 | $114,000 |
| Production | M22 | 17,000 | 5,950 | 3,570 | $6,596 | $1,200 | $7,796 | $41,192 | $116,000 |
| Production | M24 | 23,000 | 8,100 | 4,860 | $8,982 | $1,620 | $10,602 | $62,596 | $117,500 |

**Time to success metric:** ~M30-M34. Large CapEx base ($92K+) requires sustained high-growth revenue.

---

#### S2-L1-I3 — Bootstrapped + Full Investor ($500/mo + $150K-$250K)

**Profile:** Maximum investor injection after minimal self-funded period. Largest
CapEx base to recover. Fastest post-investment growth due to full marketing and
team budget.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M8 | 500 | 0 | 0 | $0 | $0 | $0 | $0 | $4,500 |
| Invest. | M9 | — | — | — | — | — | — | $0 | $204,500 |
| Pilot 2 | M10-M12 | 2,500 | 780 | 390 | $550 | $53 | $603 | $1,610 | $218,500 |
| Production | M13 | 3,500 | 1,150 | 690 | $1,275 | $210 | $1,485 | $3,095 | $222,500 |
| Production | M15 | 6,000 | 2,020 | 1,212 | $2,240 | $395 | $2,635 | $8,365 | $230,000 |
| Production | M18 | 12,000 | 4,150 | 2,490 | $4,602 | $830 | $5,432 | $24,829 | $240,000 |
| Production | M21 | 22,000 | 7,800 | 4,680 | $8,649 | $1,560 | $10,209 | $55,476 | $248,000 |
| Production | M24 | 38,000 | 13,500 | 8,100 | $14,969 | $2,700 | $17,669 | $107,579 | $255,000 |

**Time to success metric:** ~M30-M36. Highest absolute revenue, but massive CapEx hurdle ($200K+).

---

#### S2-L2-I1 — Ideal + Modest Investor ($1,000/mo + $25K-$40K)

**Profile:** Steady self-funded development through M6-8, modest investor top-up.
Behaves nearly identically to S1-L2 with a slight acceleration post-investment.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M2 | 150 | 0 | 0 | $0 | $0 | $0 | $0 | $3,000 |
| Pilot 1 | M3-M5 | 500 | 0 | 0 | $0 | $0 | $0 | $0 | $6,000 |
| Pilot 2 | M6 | 700 | 175 | 88 | $124 | $0 | $124 | $124 | $7,000 |
| Invest. | M7 | — | — | — | — | — | — | $124 | $40,500 |
| Pilot 2 | M8 | 1,200 | 360 | 180 | $254 | $0 | $254 | $553 | $43,000 |
| Pilot 2 | M9 | 1,600 | 504 | 252 | $355 | $53 | $408 | $961 | $45,500 |
| Pilot 2 | M10 | 2,100 | 680 | 340 | $479 | $79 | $558 | $1,519 | $47,500 |
| Production | M11 | 2,700 | 890 | 534 | $987 | $158 | $1,145 | $2,664 | $49,000 |
| Production | M12 | 3,400 | 1,120 | 672 | $1,242 | $210 | $1,452 | $4,116 | $50,500 |
| Production | M14 | 5,000 | 1,690 | 1,014 | $1,874 | $330 | $2,204 | $8,524 | $52,500 |
| Production | M16 | 7,200 | 2,480 | 1,488 | $2,750 | $490 | $3,240 | $14,964 | $53,500 |
| Production | M18 | 10,000 | 3,500 | 2,100 | $3,881 | $700 | $4,581 | $23,525 | $54,500 |
| Production | M20 | 13,500 | 4,700 | 2,820 | $5,212 | $940 | $6,152 | $35,829 | $55,500 |
| Production | M22 | 17,500 | 6,150 | 3,690 | $6,818 | $1,230 | $8,048 | $52,025 | $56,500 |
| Production | M24 | 22,000 | 7,750 | 4,650 | $8,593 | $1,550 | $10,143 | $72,316 | $57,500 |

**Time to success metric:** ~M22-M26. Moderate CapEx hurdle (~$40K-$50K).

---

#### S2-L2-I2 — Ideal + Ideal Investor ($1,000/mo + $75K-$100K) [BASELINE PLAN]

**Profile:** This is the most probable path. Moderate self-funding for 6-7 months,
followed by a reasonable seed-stage investment. Strong product at investor entry
with validated pilot metrics. Full monthly detail follows.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0 | 50 | 0 | 0 | $0 | $0 | $0 | $0 | $1,000 |
| Pre-Pilot | M1 | 100 | 0 | 0 | $0 | $0 | $0 | $0 | $2,000 |
| Pre-Pilot | M2 | 150 | 0 | 0 | $0 | $0 | $0 | $0 | $3,000 |
| Pilot 1 | M3 | 250 | 0 | 0 | $0 | $0 | $0 | $0 | $4,000 |
| Pilot 1 | M4 | 400 | 0 | 0 | $0 | $0 | $0 | $0 | $5,000 |
| Pilot 1 | M5 | 600 | 0 | 0 | $0 | $0 | $0 | $0 | $6,000 |
| Pilot 2 | M6 | 800 | 210 | 105 | $148 | $0 | $148 | $148 | $7,000 |
| Invest. | M7 | — | — | — | — | — | — | $148 | $95,000 |
| Pilot 2 | M7 | 1,100 | 330 | 165 | $233 | $0 | $233 | $381 | $97,500 |
| Pilot 2 | M8 | 1,500 | 475 | 238 | $335 | $0 | $335 | $716 | $100,000 |
| Pilot 2 | M9 | 2,000 | 650 | 325 | $458 | $53 | $511 | $1,227 | $102,500 |
| Pilot 2 | M10 | 2,700 | 880 | 440 | $620 | $79 | $699 | $1,926 | $105,000 |
| Production | M11 | 3,500 | 1,160 | 696 | $1,286 | $210 | $1,496 | $3,422 | $107,500 |
| Production | M12 | 4,400 | 1,470 | 882 | $1,630 | $280 | $1,910 | $5,332 | $110,000 |
| Production | M13 | 5,400 | 1,830 | 1,098 | $2,029 | $355 | $2,384 | $7,716 | $112,000 |
| Production | M14 | 6,600 | 2,250 | 1,350 | $2,495 | $440 | $2,935 | $10,651 | $114,000 |
| Production | M15 | 8,000 | 2,740 | 1,644 | $3,038 | $540 | $3,578 | $14,229 | $116,000 |
| Production | M16 | 9,600 | 3,310 | 1,986 | $3,670 | $660 | $4,330 | $18,559 | $117,500 |
| Production | M17 | 11,400 | 3,950 | 2,370 | $4,380 | $790 | $5,170 | $23,729 | $119,000 |
| Production | M18 | 13,500 | 4,700 | 2,820 | $5,212 | $940 | $6,152 | $29,881 | $120,500 |
| Production | M19 | 15,800 | 5,530 | 3,318 | $6,133 | $1,105 | $7,238 | $37,119 | $121,500 |
| Production | M20 | 18,400 | 6,470 | 3,882 | $7,175 | $1,295 | $8,470 | $45,589 | $122,500 |
| Production | M21 | 21,300 | 7,530 | 4,518 | $8,350 | $1,505 | $9,855 | $55,444 | $123,500 |
| Production | M22 | 24,500 | 8,700 | 5,220 | $9,647 | $1,740 | $11,387 | $66,831 | $124,500 |
| Production | M23 | 28,000 | 9,980 | 5,988 | $11,066 | $1,995 | $13,061 | $79,892 | $125,500 |
| Production | M24 | 32,000 | 11,400 | 6,840 | $12,640 | $2,280 | $14,920 | $94,812 | $126,500 |

**Annual summary:**

| Period | Revenue | Cumulative Rev | CapEx to Date | Rev vs CapEx |
|--------|---------|---------------|---------------|-------------|
| Year 1 (M0-M12) | $5,332 | $5,332 | $110,000 | -$104,668 |
| Year 2 (M13-M24) | $89,480 | $94,812 | $126,500 | -$31,688 |
| Year 3 (M25-M36) proj. | $250,000-$350,000 | $345,000-$445,000 | $138,500 | +$206,500-$306,500 |

**Time to success metric:** ~M26-M30. The $88K investor capital creates a significant CapEx base, but strong post-investment growth drives revenue acceleration. At M24, monthly revenue of ~$15K growing at 15% monthly puts cumulative crossover within 2-6 months.

**Sensitivity range for S2-L2-I2:**

| Assumption Set | Monthly Rev at M24 | Cum Rev at M24 | Success Metric Month |
|---------------|-------------------|----------------|---------------------|
| Conservative | $8,200 | $52,000 | M32-M36 |
| Moderate (above) | $14,920 | $94,812 | M26-M30 |
| Optimistic | $28,500 | $175,000 | M22-M24 |

---

#### S2-L2-I3 — Ideal + Full Investor ($1,000/mo + $150K-$250K)

**Profile:** Moderate self-funded start, massive investor injection. Largest
marketing and team budget in S2. Highest growth potential but also highest
CapEx to recover.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M2 | 150 | 0 | 0 | $0 | $0 | $0 | $0 | $3,000 |
| Pilot 1 | M3-M5 | 600 | 0 | 0 | $0 | $0 | $0 | $0 | $6,000 |
| Pilot 2 | M6 | 800 | 210 | 105 | $148 | $0 | $148 | $148 | $7,000 |
| Invest. | M7 | — | — | — | — | — | — | $148 | $207,000 |
| Pilot 2 | M7-M9 | 3,000 | 900 | 450 | $634 | $53 | $687 | $2,896 | $218,000 |
| Production | M10 | 4,200 | 1,400 | 840 | $1,553 | $265 | $1,818 | $4,714 | $222,000 |
| Production | M12 | 7,500 | 2,600 | 1,560 | $2,883 | $500 | $3,383 | $11,480 | $230,000 |
| Production | M15 | 15,000 | 5,300 | 3,180 | $5,877 | $1,060 | $6,937 | $32,261 | $240,000 |
| Production | M18 | 28,000 | 9,900 | 5,940 | $10,979 | $1,980 | $12,959 | $69,918 | $248,000 |
| Production | M21 | 48,000 | 17,100 | 10,260 | $18,958 | $3,420 | $22,378 | $133,052 | $255,000 |
| Production | M24 | 75,000 | 26,800 | 16,080 | $29,716 | $5,360 | $35,076 | $233,280 | $260,000 |

**Time to success metric:** ~M24-M28. High absolute revenue overcomes the large CapEx base by Year 2 end.

---

#### S2-L3-I1 — Fully Funded + Modest Investor ($2,000/mo + $25K-$40K)

**Profile:** Near-identical to S1-L3 until M5-6 when modest investor arrives.
Minor acceleration only — the $25K-$40K adds limited value beyond what $2K/mo
self-funding already provides.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M1 | 200 | 0 | 0 | $0 | $0 | $0 | $0 | $4,000 |
| Pilot 1 | M2-M4 | 800 | 0 | 0 | $0 | $0 | $0 | $0 | $10,000 |
| Pilot 2 | M5 | 1,200 | 360 | 180 | $254 | $0 | $254 | $254 | $12,000 |
| Invest. | M6 | — | — | — | — | — | — | $254 | $47,000 |
| Pilot 2 | M6-M8 | 2,800 | 900 | 450 | $634 | $79 | $713 | $2,394 | $53,000 |
| Production | M9 | 3,600 | 1,190 | 714 | $1,320 | $175 | $1,495 | $3,889 | $55,000 |
| Production | M12 | 6,500 | 2,200 | 1,320 | $2,440 | $395 | $2,835 | $12,054 | $61,000 |
| Production | M15 | 10,500 | 3,650 | 2,190 | $4,047 | $660 | $4,707 | $24,375 | $67,000 |
| Production | M18 | 16,000 | 5,600 | 3,360 | $6,211 | $1,060 | $7,271 | $42,288 | $73,000 |
| Production | M21 | 23,000 | 8,100 | 4,860 | $8,982 | $1,550 | $10,532 | $68,884 | $79,000 |
| Production | M24 | 32,000 | 11,300 | 6,780 | $12,529 | $2,150 | $14,679 | $105,399 | $85,000 |

**Time to success metric:** ~M20-M24. CapEx is moderate (~$55K-$67K range) and revenue growth is strong.

---

#### S2-L3-I2 — Fully Funded + Ideal Investor ($2,000/mo + $75K-$100K)

**Profile:** Strong self-funded start combined with substantial investor injection.
Enables aggressive marketing and rapid scaling.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M1 | 200 | 0 | 0 | $0 | $0 | $0 | $0 | $4,000 |
| Pilot 1 | M2-M4 | 800 | 0 | 0 | $0 | $0 | $0 | $0 | $10,000 |
| Pilot 2 | M5 | 1,200 | 360 | 180 | $254 | $0 | $254 | $254 | $12,000 |
| Invest. | M6 | — | — | — | — | — | — | $254 | $100,000 |
| Pilot 2 | M6-M8 | 3,500 | 1,120 | 560 | $789 | $105 | $894 | $3,042 | $110,000 |
| Production | M9 | 4,500 | 1,500 | 900 | $1,663 | $265 | $1,928 | $4,970 | $113,000 |
| Production | M12 | 8,500 | 2,900 | 1,740 | $3,216 | $545 | $3,761 | $16,419 | $122,000 |
| Production | M15 | 15,000 | 5,250 | 3,150 | $5,822 | $1,000 | $6,822 | $33,184 | $128,000 |
| Production | M18 | 24,000 | 8,500 | 5,100 | $9,427 | $1,700 | $11,127 | $60,161 | $134,000 |
| Production | M21 | 36,000 | 12,800 | 7,680 | $14,194 | $2,560 | $16,754 | $102,423 | $140,000 |
| Production | M24 | 52,000 | 18,500 | 11,100 | $20,513 | $3,700 | $24,213 | $163,062 | $146,000 |

**Time to success metric:** ~M22-M24. Strong revenue growth matches moderate CapEx base.

---

#### S2-L3-I3 — Fully Funded + Full Investor ($2,000/mo + $150K-$250K) [MAXIMUM S2]

**Profile:** Maximum S2 combination. Full self-funded start plus large investor.
Highest total CapEx in S2 but also fastest growth.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M1 | 200 | 0 | 0 | $0 | $0 | $0 | $0 | $4,000 |
| Pilot 1 | M2-M4 | 800 | 0 | 0 | $0 | $0 | $0 | $0 | $10,000 |
| Pilot 2 | M5 | 1,200 | 360 | 180 | $254 | $0 | $254 | $254 | $12,000 |
| Invest. | M6 | — | — | — | — | — | — | $254 | $212,000 |
| Pilot 2 | M6-M8 | 4,500 | 1,440 | 720 | $1,015 | $158 | $1,173 | $4,773 | $226,000 |
| Production | M9 | 6,000 | 2,000 | 1,200 | $2,217 | $370 | $2,587 | $7,360 | $230,000 |
| Production | M12 | 12,000 | 4,200 | 2,520 | $4,658 | $840 | $5,498 | $23,854 | $242,000 |
| Production | M15 | 22,000 | 7,800 | 4,680 | $8,649 | $1,560 | $10,209 | $48,481 | $252,000 |
| Production | M18 | 38,000 | 13,500 | 8,100 | $14,969 | $2,700 | $17,669 | $90,488 | $260,000 |
| Production | M21 | 60,000 | 21,500 | 12,900 | $23,838 | $4,300 | $28,138 | $159,303 | $268,000 |
| Production | M24 | 90,000 | 32,000 | 19,200 | $35,482 | $6,400 | $41,882 | $264,949 | $274,000 |

**Time to success metric:** ~M22-M26. Very high CapEx ($212K+) but exponential revenue growth crosses the line by M24.

---

### 6.3 Scenario 3: Investor Right After Pilot 1

Self-funded only from M0 to approximately M3. Investor arrives immediately after
Pilot 1 completes, funding the entire Pilot 2 and Production journey. This is
the fastest path to revenue but requires Pilot 1 to produce compelling metrics
for early-stage fundraising.

**Investor arrival timing:** ~M3-M4 for all levels (end of Pilot 1).

---

#### S3-L1-I1 — Minimal Bridge + Modest Investor ($500/mo for 3 months + $25K-$40K)

**Profile:** Shortest self-funded period with smallest investor. Very tight
budget. Revenue starts M6-M7 at 50% pricing.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M2 | 150 | 0 | 0 | $0 | $0 | $0 | $0 | $1,500 |
| Invest. | M3 | — | — | — | — | — | — | $0 | $34,000 |
| Pilot 1/2 | M3-M5 | 500 | 0 | 0 | $0 | $0 | $0 | $0 | $40,000 |
| Pilot 2 | M6 | 750 | 188 | 94 | $132 | $0 | $132 | $132 | $42,000 |
| Pilot 2 | M7 | 1,000 | 280 | 140 | $197 | $0 | $197 | $329 | $44,000 |
| Pilot 2 | M8 | 1,350 | 400 | 200 | $282 | $0 | $282 | $611 | $46,000 |
| Pilot 2 | M9 | 1,750 | 530 | 265 | $373 | $53 | $426 | $1,037 | $47,500 |
| Production | M10 | 2,200 | 690 | 414 | $765 | $105 | $870 | $1,907 | $49,000 |
| Production | M12 | 3,400 | 1,100 | 660 | $1,220 | $185 | $1,405 | $4,717 | $51,500 |
| Production | M15 | 5,800 | 1,950 | 1,170 | $2,162 | $340 | $2,502 | $12,221 | $54,500 |
| Production | M18 | 9,200 | 3,200 | 1,920 | $3,548 | $570 | $4,118 | $22,857 | $56,500 |
| Production | M21 | 14,000 | 4,900 | 2,940 | $5,433 | $880 | $6,313 | $38,800 | $58,000 |
| Production | M24 | 20,000 | 7,100 | 4,260 | $7,872 | $1,280 | $9,152 | $61,256 | $59,500 |

**Time to success metric:** ~M22-M26. Moderate CapEx ($34K-$40K) with steady growth.

---

#### S3-L1-I2 — Minimal Bridge + Ideal Investor ($500/mo for 3 months + $75K-$100K)

**Profile:** Minimal self-fund bridged by substantial investor. Full team
enabled from M3.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M2 | 150 | 0 | 0 | $0 | $0 | $0 | $0 | $1,500 |
| Invest. | M3 | — | — | — | — | — | — | $0 | $89,000 |
| Pilot 1 | M3-M4 | 400 | 0 | 0 | $0 | $0 | $0 | $0 | $94,000 |
| Pilot 2 | M5 | 800 | 240 | 120 | $169 | $0 | $169 | $169 | $97,000 |
| Pilot 2 | M6 | 1,100 | 350 | 175 | $247 | $0 | $247 | $416 | $100,000 |
| Pilot 2 | M7 | 1,500 | 480 | 240 | $338 | $0 | $338 | $754 | $102,500 |
| Pilot 2 | M8 | 2,000 | 660 | 330 | $465 | $53 | $518 | $1,272 | $105,000 |
| Production | M9 | 2,600 | 870 | 522 | $965 | $158 | $1,123 | $2,395 | $107,000 |
| Production | M10 | 3,300 | 1,110 | 666 | $1,230 | $210 | $1,440 | $3,835 | $109,000 |
| Production | M12 | 5,200 | 1,780 | 1,068 | $1,974 | $345 | $2,319 | $8,573 | $112,000 |
| Production | M15 | 9,500 | 3,350 | 2,010 | $3,714 | $660 | $4,374 | $19,640 | $116,500 |
| Production | M18 | 16,500 | 5,850 | 3,510 | $6,488 | $1,170 | $7,658 | $37,636 | $120,000 |
| Production | M21 | 27,000 | 9,600 | 5,760 | $10,643 | $1,920 | $12,563 | $67,878 | $123,000 |
| Production | M24 | 42,000 | 15,000 | 9,000 | $16,632 | $3,000 | $19,632 | $116,967 | $126,000 |

**Time to success metric:** ~M24-M28. CapEx base of ~$89K-$100K overcome by strong growth.

---

#### S3-L1-I3 — Minimal Bridge + Full Investor ($500/mo for 3 months + $150K-$250K)

**Profile:** Maximum investor after minimal self-fund. Fastest possible ramp from
weakest starting position.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M2 | 150 | 0 | 0 | $0 | $0 | $0 | $0 | $1,500 |
| Invest. | M3 | — | — | — | — | — | — | $0 | $201,500 |
| Pilot 1 | M3-M4 | 500 | 0 | 0 | $0 | $0 | $0 | $0 | $210,000 |
| Pilot 2 | M5 | 1,200 | 360 | 180 | $254 | $0 | $254 | $254 | $215,000 |
| Pilot 2 | M7 | 2,500 | 800 | 400 | $564 | $53 | $617 | $1,435 | $225,000 |
| Production | M9 | 4,500 | 1,500 | 900 | $1,663 | $265 | $1,928 | $5,291 | $233,000 |
| Production | M12 | 9,000 | 3,100 | 1,860 | $3,438 | $620 | $4,058 | $17,327 | $243,000 |
| Production | M15 | 17,000 | 6,000 | 3,600 | $6,654 | $1,200 | $7,854 | $35,289 | $250,000 |
| Production | M18 | 30,000 | 10,700 | 6,420 | $11,866 | $2,140 | $14,006 | $68,147 | $255,000 |
| Production | M21 | 50,000 | 17,800 | 10,680 | $19,737 | $3,560 | $23,297 | $124,048 | $260,000 |
| Production | M24 | 78,000 | 27,800 | 16,680 | $30,826 | $5,560 | $36,386 | $209,204 | $264,000 |

**Time to success metric:** ~M26-M30. Very high CapEx ($200K+) but aggressive growth.

---

#### S3-L2-I1 — Steady Bridge + Modest Investor ($1,000/mo for 3 months + $25K-$40K)

**Profile:** Better initial product than L1 bridge, but investor injection is
modest. Slight advantage over S3-L1-I1.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M2 | 200 | 0 | 0 | $0 | $0 | $0 | $0 | $3,000 |
| Invest. | M3 | — | — | — | — | — | — | $0 | $35,500 |
| Pilot 1 | M3-M4 | 500 | 0 | 0 | $0 | $0 | $0 | $0 | $40,000 |
| Pilot 2 | M5 | 800 | 240 | 120 | $169 | $0 | $169 | $169 | $42,500 |
| Pilot 2 | M7 | 1,400 | 430 | 215 | $303 | $0 | $303 | $775 | $47,000 |
| Pilot 2 | M9 | 2,200 | 700 | 350 | $493 | $53 | $546 | $1,924 | $50,500 |
| Production | M10 | 2,800 | 920 | 552 | $1,020 | $158 | $1,178 | $3,102 | $52,000 |
| Production | M12 | 4,200 | 1,400 | 840 | $1,553 | $265 | $1,818 | $6,738 | $54,500 |
| Production | M15 | 7,200 | 2,500 | 1,500 | $2,772 | $475 | $3,247 | $14,250 | $57,500 |
| Production | M18 | 11,500 | 4,050 | 2,430 | $4,491 | $780 | $5,271 | $27,009 | $59,500 |
| Production | M21 | 17,500 | 6,200 | 3,720 | $6,875 | $1,200 | $8,075 | $47,021 | $61,000 |
| Production | M24 | 25,500 | 9,000 | 5,400 | $9,979 | $1,750 | $11,729 | $76,655 | $62,500 |

**Time to success metric:** ~M18-M22. Moderate CapEx (~$35K-$40K) crossed relatively quickly.

---

#### S3-L2-I2 — Steady Bridge + Ideal Investor ($1,000/mo for 3 months + $75K-$100K)

**Profile:** Good initial product bridged by substantial investment. Strong
growth trajectory comparable to baseline S2-L2-I2 but with earlier investor
entry.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M2 | 200 | 0 | 0 | $0 | $0 | $0 | $0 | $3,000 |
| Invest. | M3 | — | — | — | — | — | — | $0 | $91,000 |
| Pilot 1 | M3-M4 | 600 | 0 | 0 | $0 | $0 | $0 | $0 | $96,000 |
| Pilot 2 | M5 | 1,000 | 300 | 150 | $211 | $0 | $211 | $211 | $99,000 |
| Pilot 2 | M6 | 1,400 | 440 | 220 | $310 | $0 | $310 | $521 | $102,000 |
| Pilot 2 | M7 | 1,900 | 620 | 310 | $437 | $53 | $490 | $1,011 | $104,500 |
| Pilot 2 | M8 | 2,500 | 830 | 415 | $585 | $79 | $664 | $1,675 | $107,000 |
| Production | M9 | 3,200 | 1,070 | 642 | $1,187 | $185 | $1,372 | $3,047 | $109,000 |
| Production | M10 | 4,000 | 1,350 | 810 | $1,497 | $240 | $1,737 | $4,784 | $111,000 |
| Production | M12 | 6,000 | 2,070 | 1,242 | $2,295 | $385 | $2,680 | $10,144 | $114,500 |
| Production | M15 | 11,000 | 3,900 | 2,340 | $4,325 | $770 | $5,095 | $22,019 | $119,000 |
| Production | M18 | 19,000 | 6,750 | 4,050 | $7,484 | $1,350 | $8,834 | $42,892 | $123,000 |
| Production | M21 | 31,000 | 11,050 | 6,630 | $12,252 | $2,210 | $14,462 | $77,688 | $126,500 |
| Production | M24 | 48,000 | 17,100 | 10,260 | $18,958 | $3,420 | $22,378 | $132,724 | $129,500 |

**Time to success metric:** ~M24-M26. CapEx base of ~$91K-$100K with strong revenue trajectory.

---

#### S3-L2-I3 — Steady Bridge + Full Investor ($1,000/mo for 3 months + $150K-$250K)

**Profile:** Good product base plus maximum investor funding. Aggressive growth
with full marketing and team budget from M3.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M2 | 200 | 0 | 0 | $0 | $0 | $0 | $0 | $3,000 |
| Invest. | M3 | — | — | — | — | — | — | $0 | $203,000 |
| Pilot 1 | M3-M4 | 700 | 0 | 0 | $0 | $0 | $0 | $0 | $212,000 |
| Pilot 2 | M5 | 1,500 | 450 | 225 | $317 | $0 | $317 | $317 | $217,000 |
| Pilot 2 | M7 | 3,200 | 1,040 | 520 | $733 | $79 | $812 | $2,259 | $227,000 |
| Production | M9 | 5,500 | 1,850 | 1,110 | $2,051 | $345 | $2,396 | $7,051 | $235,000 |
| Production | M12 | 11,000 | 3,850 | 2,310 | $4,269 | $770 | $5,039 | $20,530 | $245,000 |
| Production | M15 | 21,000 | 7,500 | 4,500 | $8,316 | $1,500 | $9,816 | $42,878 | $253,000 |
| Production | M18 | 38,000 | 13,500 | 8,100 | $14,969 | $2,700 | $17,669 | $84,382 | $260,000 |
| Production | M21 | 63,000 | 22,500 | 13,500 | $24,947 | $4,500 | $29,447 | $155,493 | $265,000 |
| Production | M24 | 95,000 | 34,000 | 20,400 | $37,694 | $6,800 | $44,494 | $266,975 | $270,000 |

**Time to success metric:** ~M24-M26. Highest S3 revenue at Year 2 end.

---

#### S3-L3-I1 — Full Bridge + Modest Investor ($2,000/mo for 3 months + $25K-$40K)

**Profile:** Equivalent to S1-L3 for the first 3 months, then small investor
supplement. Similar to S2-L3-I1 but investor arrives earlier (M3 vs M6).

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M2 | 200 | 0 | 0 | $0 | $0 | $0 | $0 | $6,000 |
| Invest. | M3 | — | — | — | — | — | — | $0 | $38,500 |
| Pilot 1 | M3-M4 | 700 | 0 | 0 | $0 | $0 | $0 | $0 | $43,000 |
| Pilot 2 | M5 | 1,200 | 360 | 180 | $254 | $0 | $254 | $254 | $45,500 |
| Pilot 2 | M7 | 2,200 | 700 | 350 | $493 | $53 | $546 | $1,346 | $50,000 |
| Production | M9 | 3,800 | 1,260 | 756 | $1,397 | $210 | $1,607 | $4,499 | $54,000 |
| Production | M12 | 6,500 | 2,200 | 1,320 | $2,440 | $395 | $2,835 | $11,169 | $59,000 |
| Production | M15 | 10,500 | 3,650 | 2,190 | $4,047 | $660 | $4,707 | $22,383 | $62,000 |
| Production | M18 | 16,000 | 5,600 | 3,360 | $6,211 | $1,060 | $7,271 | $40,096 | $65,000 |
| Production | M21 | 23,500 | 8,350 | 5,010 | $9,259 | $1,580 | $10,839 | $67,253 | $67,500 |
| Production | M24 | 33,000 | 11,700 | 7,020 | $12,973 | $2,240 | $15,213 | $103,519 | $70,000 |

**Time to success metric:** ~M18-M22. Moderate CapEx (~$38K-$43K) and strong growth.

---

#### S3-L3-I2 — Full Bridge + Ideal Investor ($2,000/mo for 3 months + $75K-$100K)

**Profile:** Strong 3-month self-funded start plus substantial investor.
Excellent product readiness and marketing capability from M3.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M2 | 200 | 0 | 0 | $0 | $0 | $0 | $0 | $6,000 |
| Invest. | M3 | — | — | — | — | — | — | $0 | $94,000 |
| Pilot 1 | M3-M4 | 800 | 0 | 0 | $0 | $0 | $0 | $0 | $100,000 |
| Pilot 2 | M5 | 1,400 | 420 | 210 | $296 | $0 | $296 | $296 | $103,000 |
| Pilot 2 | M7 | 3,000 | 960 | 480 | $677 | $79 | $756 | $1,728 | $109,000 |
| Production | M9 | 5,200 | 1,740 | 1,044 | $1,929 | $310 | $2,239 | $5,723 | $114,000 |
| Production | M12 | 10,000 | 3,500 | 2,100 | $3,881 | $660 | $4,541 | $16,804 | $120,000 |
| Production | M15 | 18,000 | 6,350 | 3,810 | $7,041 | $1,250 | $8,291 | $36,048 | $125,000 |
| Production | M18 | 30,000 | 10,700 | 6,420 | $11,866 | $2,140 | $14,006 | $69,339 | $130,000 |
| Production | M21 | 47,000 | 16,800 | 10,080 | $18,628 | $3,360 | $21,988 | $121,311 | $134,000 |
| Production | M24 | 70,000 | 25,000 | 15,000 | $27,720 | $5,000 | $32,720 | $199,342 | $138,000 |

**Time to success metric:** ~M22-M24. CapEx of ~$94K-$100K crossed by strong revenue.

---

#### S3-L3-I3 — Full Bridge + Full Investor ($2,000/mo for 3 months + $150K-$250K) [MAXIMUM SCENARIO]

**Profile:** Theoretical maximum. Full self-funded bridge through Pilot 1 plus
largest possible investor injection. Fastest path to market dominance, but
requires $200K+ in total capital.

| Period | Month | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum CapEx |
|--------|-------|-----|--------|----------|---------|---------|-----------|---------|-----------|
| Pre-Pilot | M0-M2 | 200 | 0 | 0 | $0 | $0 | $0 | $0 | $6,000 |
| Invest. | M3 | — | — | — | — | — | — | $0 | $206,000 |
| Pilot 1 | M3-M4 | 1,000 | 0 | 0 | $0 | $0 | $0 | $0 | $216,000 |
| Pilot 2 | M5 | 2,000 | 600 | 300 | $423 | $0 | $423 | $423 | $221,000 |
| Pilot 2 | M6 | 2,800 | 900 | 450 | $634 | $53 | $687 | $1,110 | $226,000 |
| Pilot 2 | M7 | 3,800 | 1,250 | 625 | $881 | $105 | $986 | $2,096 | $231,000 |
| Pilot 2 | M8 | 5,000 | 1,680 | 840 | $1,184 | $158 | $1,342 | $3,438 | $236,000 |
| Production | M9 | 6,500 | 2,180 | 1,308 | $2,417 | $395 | $2,812 | $6,250 | $240,000 |
| Production | M10 | 8,000 | 2,720 | 1,632 | $3,016 | $500 | $3,516 | $9,766 | $243,000 |
| Production | M11 | 9,800 | 3,380 | 2,028 | $3,748 | $630 | $4,378 | $14,144 | $246,000 |
| Production | M12 | 12,000 | 4,200 | 2,520 | $4,658 | $790 | $5,448 | $19,592 | $249,000 |
| Production | M13 | 14,500 | 5,100 | 3,060 | $5,655 | $970 | $6,625 | $26,217 | $251,500 |
| Production | M14 | 17,500 | 6,200 | 3,720 | $6,875 | $1,180 | $8,055 | $34,272 | $254,000 |
| Production | M15 | 21,000 | 7,500 | 4,500 | $8,316 | $1,430 | $9,746 | $44,018 | $256,000 |
| Production | M16 | 25,000 | 8,950 | 5,370 | $9,924 | $1,710 | $11,634 | $55,652 | $258,000 |
| Production | M17 | 30,000 | 10,700 | 6,420 | $11,866 | $2,040 | $13,906 | $69,558 | $260,000 |
| Production | M18 | 35,500 | 12,700 | 7,620 | $14,082 | $2,420 | $16,502 | $86,060 | $262,000 |
| Production | M19 | 42,000 | 15,000 | 9,000 | $16,632 | $2,860 | $19,492 | $105,552 | $263,500 |
| Production | M20 | 49,000 | 17,600 | 10,560 | $19,515 | $3,350 | $22,865 | $128,417 | $265,000 |
| Production | M21 | 57,000 | 20,500 | 12,300 | $22,731 | $3,900 | $26,631 | $155,048 | $266,500 |
| Production | M22 | 66,000 | 23,700 | 14,220 | $26,279 | $4,520 | $30,799 | $185,847 | $268,000 |
| Production | M23 | 76,000 | 27,200 | 16,320 | $30,159 | $5,180 | $35,339 | $221,186 | $269,000 |
| Production | M24 | 88,000 | 31,500 | 18,900 | $34,927 | $6,000 | $40,927 | $262,113 | $270,000 |

**Annual summary:**

| Period | Revenue | Cumulative Rev | CapEx to Date | Rev vs CapEx |
|--------|---------|---------------|---------------|-------------|
| Year 1 (M0-M12) | $19,592 | $19,592 | $249,000 | -$229,408 |
| Year 2 (M13-M24) | $242,521 | $262,113 | $270,000 | -$7,887 |
| Year 3 (M25-M36) proj. | $650,000-$900,000 | $912,000-$1,162,000 | $282,000 | +$630,000-$880,000 |

**Time to success metric:** ~M24-M25. Revenue nearly matches CapEx by end of Year 2. Monthly revenue of $40K+ at M24 ensures crossover within 1-2 additional months.

---

## 7. Revenue Comparison Summary

### 7.1 All 21 Combinations — Key Metrics

| Combo | First Rev Month | Monthly Rev at M12 | Monthly Rev at M18 | Monthly Rev at M24 | Cum Rev at M24 | Total CapEx at M24 | Months to Success |
|-------|----------------|-------------------|-------------------|-------------------|----------------|-------------------|------------------|
| **S1-L1** | M10 | $173 | $1,128 | $2,773 | $16,155 | $12,500 | M22-M24 |
| **S1-L2** | M6 | $1,167 | $3,048 | $6,484 | $45,525 | $25,000 | M16-M18 |
| **S1-L3** | M5 | $2,514 | $6,228 | $13,085 | $96,094 | $50,000 | M14-M16 |
| **S2-L1-I1** | M10 | $275 | $2,054 | $5,543 | $33,908 | $54,500 | M28-M32 |
| **S2-L1-I2** | M10 | $483 | $3,599 | $10,602 | $62,596 | $117,500 | M30-M34 |
| **S2-L1-I3** | M10 | $603 | $5,432 | $17,669 | $107,579 | $255,000 | M30-M36 |
| **S2-L2-I1** | M6 | $1,452 | $4,581 | $10,143 | $72,316 | $57,500 | M22-M26 |
| **S2-L2-I2** | M6 | $1,910 | $6,152 | $14,920 | $94,812 | $126,500 | M26-M30 |
| **S2-L2-I3** | M6 | $3,383 | $12,959 | $35,076 | $233,280 | $260,000 | M24-M28 |
| **S2-L3-I1** | M5 | $2,835 | $7,271 | $14,679 | $105,399 | $85,000 | M20-M24 |
| **S2-L3-I2** | M5 | $3,761 | $11,127 | $24,213 | $163,062 | $146,000 | M22-M24 |
| **S2-L3-I3** | M5 | $5,498 | $17,669 | $41,882 | $264,949 | $274,000 | M22-M26 |
| **S3-L1-I1** | M6 | $1,405 | $4,118 | $9,152 | $61,256 | $59,500 | M22-M26 |
| **S3-L1-I2** | M5 | $2,319 | $7,658 | $19,632 | $116,967 | $126,000 | M24-M28 |
| **S3-L1-I3** | M5 | $4,058 | $14,006 | $36,386 | $209,204 | $264,000 | M26-M30 |
| **S3-L2-I1** | M5 | $1,818 | $5,271 | $11,729 | $76,655 | $62,500 | M18-M22 |
| **S3-L2-I2** | M5 | $2,680 | $8,834 | $22,378 | $132,724 | $129,500 | M24-M26 |
| **S3-L2-I3** | M5 | $5,039 | $17,669 | $44,494 | $266,975 | $270,000 | M24-M26 |
| **S3-L3-I1** | M5 | $2,835 | $7,271 | $15,213 | $103,519 | $70,000 | M18-M22 |
| **S3-L3-I2** | M5 | $4,541 | $14,006 | $32,720 | $199,342 | $138,000 | M22-M24 |
| **S3-L3-I3** | M5 | $5,448 | $16,502 | $40,927 | $262,113 | $270,000 | M24-M25 |

### 7.2 Revenue Efficiency Ranking (Cumulative Revenue / Cumulative CapEx at M24)

| Rank | Combo | Rev/CapEx Ratio at M24 | Interpretation |
|------|-------|----------------------|----------------|
| 1 | S1-L2 | 1.82x | Highest capital efficiency |
| 2 | S1-L3 | 1.92x | Strong efficiency at scale |
| 3 | S3-L3-I1 | 1.48x | Full bridge, modest investor |
| 4 | S1-L1 | 1.29x | Bootstrapped but efficient |
| 5 | S2-L2-I1 | 1.26x | Moderate investment, good return |
| 6 | S2-L3-I1 | 1.24x | Near-S1-L3 efficiency |
| 7 | S3-L2-I1 | 1.23x | Steady bridge, modest investor |
| 8 | S3-L3-I2 | 1.44x | Full bridge + ideal investor |
| 9 | S3-L1-I1 | 1.03x | Tight budget, borderline |
| 10 | S2-L3-I2 | 1.12x | Large investment, growing returns |
| 11 | S3-L2-I2 | 1.02x | Near breakeven at M24 |
| 12 | S3-L3-I3 | 0.97x | Nearly at breakeven |
| 13 | S3-L2-I3 | 0.99x | Nearly at breakeven |
| 14 | S2-L3-I3 | 0.97x | Nearly at breakeven |
| 15 | S3-L1-I2 | 0.93x | Growth catching up |
| 16 | S2-L2-I3 | 0.90x | High CapEx, high growth |
| 17 | S2-L2-I2 | 0.75x | Baseline — needs M26-30 |
| 18 | S3-L1-I3 | 0.79x | Large CapEx hurdle |
| 19 | S2-L1-I1 | 0.62x | Constrained both sides |
| 20 | S2-L1-I2 | 0.53x | Slow start, decent investor |
| 21 | S2-L1-I3 | 0.42x | Slow start, large CapEx |

### 7.3 Key Observations

**Capital efficiency vs absolute revenue:** The self-funded scenarios (S1) have
the highest revenue-to-CapEx ratios because the denominator is small ($12K-$50K).
However, their absolute monthly revenue at M24 ($2.7K-$13K) is far lower than
investor-backed scenarios ($10K-$41K). The right metric depends on the founder's
objective: capital efficiency favors S1, market capture speed favors S3-I3.

**The L1 investor trap:** Combinations where founders self-fund at L1 but
receive large investors (S2-L1-I3, S3-L1-I3) show the worst capital efficiency.
The slow L1 development phase delays revenue start, meaning the large investor
capital sits idle for months. These combinations should be avoided — if L1
self-funding is the constraint, a smaller investor (I1 or I2) is more efficient.

**The S2-L2-I2 baseline:** While not the most capital-efficient, the baseline
plan offers the best risk-adjusted path. It has moderate CapEx ($126K), reaches
$15K monthly revenue by M24, and achieves the success metric by M26-M30. The
revenue trajectory is steep enough that even with conservative assumptions,
breakeven occurs within 36 months.

---

## 8. Revenue Sensitivity Analysis

### 8.1 Single-Variable Sensitivity (Baseline S2-L2-I2)

Testing the impact of changing one variable at a time, holding all others at
moderate assumptions.

| Variable | -20% Change | Base Case | +20% Change | Impact on M24 Rev |
|----------|------------|-----------|-------------|------------------|
| Average consultation fee | $3.60 | $4.50 | $5.40 | +/-18% |
| Monthly user growth rate | 12% | 15% | 18% | +/-31% |
| Monthly churn rate | 8.4% | 7% | 5.6% | +/-22% |
| Active user % | 28% | 35% | 42% | +/-20% |
| Consultations per active user | 0.8 | 1.0 | 1.2 | +/-20% |
| Facility commission rate | 9.6% | 12% | 14.4% | +/-4% |
| Premium subscription conversion | 6.4% | 8% | 9.6% | +/-3% |

### 8.2 Combined Scenario Sensitivity

| Scenario | M24 Monthly Rev | Cum Rev at M24 | Success Month |
|----------|----------------|----------------|--------------|
| All variables at -20% (stress test) | $5,800 | $37,000 | M34-M40 |
| All variables at -10% | $9,900 | $62,000 | M30-M34 |
| Base case | $14,920 | $94,812 | M26-M30 |
| All variables at +10% | $21,500 | $134,000 | M22-M26 |
| All variables at +20% (bull case) | $30,200 | $186,000 | M20-M24 |

### 8.3 Critical Thresholds

The model identifies the following break-even thresholds — minimum values
required for the baseline plan to achieve the success metric within 36 months:

| Variable | Minimum Required | Moderate Assumption | Buffer |
|----------|-----------------|-------------------|--------|
| Monthly user growth (Production) | 8% | 15% | 1.88x |
| Active user percentage | 18% | 35% | 1.94x |
| Average consultation fee | $2.50 | $4.50 | 1.80x |
| Monthly churn rate | < 15% | 7% | 2.14x |

All critical thresholds have at least 1.8x buffer against the moderate
assumption, indicating the model is robust to significant underperformance
in any single variable.

### 8.4 Scenario-Specific Sensitivity

| Combo | Most Sensitive Variable | 20% Adverse Shift Impact |
|-------|------------------------|-------------------------|
| S1-L1 | User growth rate | Delays success metric by 6-8 months |
| S1-L2 | Churn rate | Delays success metric by 3-4 months |
| S1-L3 | Consultation fee | Delays success metric by 2-3 months |
| S2-L2-I2 | User growth rate | Delays success metric by 4-6 months |
| S3-L3-I3 | User growth rate | Delays success metric by 2-3 months |

**User growth rate is the single most impactful variable across all
combinations.** This underscores the importance of marketing budget allocation
and product-market fit validation during Pilot 1.

---

## 9. Revenue vs Cost Overlay

### 9.1 Monthly Breakeven Analysis (Revenue = Monthly Operating Costs)

Monthly operating costs include infrastructure, team compensation (ongoing),
and variable costs. This differs from the success metric (cumulative revenue
vs cumulative CapEx) by focusing on monthly cash flow sustainability.

| Combo | Monthly OpCost at Breakeven | Monthly Rev at Breakeven | Breakeven Month | Monthly Profit at M24 |
|-------|---------------------------|------------------------|----------------|---------------------|
| S1-L1 | $500 | $500 | M16 | +$2,273 |
| S1-L2 | $1,000 | $1,000 | M12-M13 | +$5,484 |
| S1-L3 | $2,000 | $2,000 | M10-M11 | +$11,085 |
| S2-L1-I1 | $2,000 | $2,000 | M15-M16 | +$3,543 |
| S2-L1-I2 | $2,500 | $2,500 | M14-M15 | +$8,102 |
| S2-L1-I3 | $4,000 | $4,000 | M14-M15 | +$13,669 |
| S2-L2-I1 | $2,500 | $2,500 | M13-M14 | +$7,643 |
| S2-L2-I2 | $3,000 | $3,000 | M13-M14 | +$11,920 |
| S2-L2-I3 | $5,000 | $5,000 | M12-M13 | +$30,076 |
| S2-L3-I1 | $3,000 | $3,000 | M11-M12 | +$11,679 |
| S2-L3-I2 | $4,000 | $4,000 | M11-M12 | +$20,213 |
| S2-L3-I3 | $5,500 | $5,500 | M10-M11 | +$36,382 |
| S3-L1-I1 | $2,000 | $2,000 | M14-M15 | +$7,152 |
| S3-L1-I2 | $2,500 | $2,500 | M12-M13 | +$17,132 |
| S3-L1-I3 | $4,000 | $4,000 | M11-M12 | +$32,386 |
| S3-L2-I1 | $2,500 | $2,500 | M12-M13 | +$9,229 |
| S3-L2-I2 | $3,000 | $3,000 | M11-M12 | +$19,378 |
| S3-L2-I3 | $5,000 | $5,000 | M10-M11 | +$39,494 |
| S3-L3-I1 | $3,000 | $3,000 | M11-M12 | +$12,213 |
| S3-L3-I2 | $4,000 | $4,000 | M10-M11 | +$28,720 |
| S3-L3-I3 | $5,500 | $5,500 | M9-M10 | +$35,427 |

### 9.2 Cash Flow Milestones

| Milestone | S1-L1 | S1-L2 | S2-L2-I2 | S3-L3-I3 |
|-----------|-------|-------|----------|----------|
| First dollar of revenue | M10 | M6 | M6 | M5 |
| Monthly rev covers monthly OpCost | M16 | M12 | M13 | M9 |
| Cumulative rev covers cumulative CapEx | M22 | M16 | M27 | M24 |
| Monthly rev > $5,000 | M23 | M18 | M17 | M12 |
| Monthly rev > $10,000 | M30+ | M22 | M21 | M15 |
| Monthly rev > $25,000 | M36+ | M30+ | M24+ | M20 |

### 9.3 Runway Analysis (Months Until Capital Exhaustion)

For investor-backed scenarios, this shows how many months the total capital
(self-funded + investor) would last at the post-investor burn rate if revenue
were $0 — a worst-case "what if revenue never comes" analysis.

| Combo | Total Capital | Monthly Burn (post-inv) | Zero-Revenue Runway |
|-------|-------------|----------------------|-------------------|
| S2-L1-I1 | $37,000 | $2,000 | 18.5 months |
| S2-L2-I2 | $95,000 | $3,000 | 31.7 months |
| S2-L2-I3 | $207,000 | $5,000 | 41.4 months |
| S3-L3-I3 | $206,000 | $5,500 | 37.5 months |

All investor-backed scenarios have 18+ months of zero-revenue runway, providing
substantial margin of safety.

---

## 10. Key Takeaways

1. **Revenue begins in Pilot 2 (M5-M10 depending on funding level).** No
   scenario generates meaningful revenue before Pilot 2. The pre-revenue
   period is 5-10 months, making initial capital adequacy the primary survival
   constraint. Founders should plan for 6-12 months of zero revenue regardless
   of scenario.

2. **User growth rate is the single most sensitive variable.** A 20% change
   in monthly user growth affects M24 revenue by 31% — more than any other
   factor. Investment in marketing, product-market fit, and facility partnerships
   has higher ROI than price optimization. The difference between 10% and 20%
   monthly growth is the difference between $5K and $15K monthly revenue at M24.

3. **Self-funded paths (S1) are the most capital-efficient but the slowest.**
   S1-L2 achieves a 1.82x revenue/CapEx ratio at M24 — the highest of all 21
   combinations — but its absolute monthly revenue ($6.5K) limits the platform's
   competitive positioning. For founders primarily optimizing for equity
   retention and capital efficiency, S1-L2 or S1-L3 are optimal. For founders
   optimizing for market speed and scale, S2 or S3 with I2 or I3 are necessary.

4. **The baseline plan (S2-L2-I2) reaches the success metric at M26-M30.**
   This represents a 2.2-2.5 year journey from project start to cumulative
   revenue exceeding cumulative investment. At that point, monthly revenue of
   $15K-$20K provides a self-sustaining business with strong growth trajectory.
   The model is robust: even at conservative assumptions (-20% on all variables),
   the success metric is reached by M34-M40.

5. **Avoid the L1 + large investor trap.** Combinations where founders self-fund
   at L1 ($500/mo) but bring on large investors ($150K+) show the worst capital
   efficiency (0.42x-0.79x at M24). The slow L1 development phase wastes
   investor capital through delayed revenue. If investor capital is available,
   self-funding should be at least L2 to maximize the return on combined capital.

---

## 11. Cross-References

| Document | Relevance to Revenue Modelling |
|----------|-------------------------------|
| [params.md](./params.md) | All scenario definitions, rates, phase timing, market parameters |
| [03-cost-breakdown.md](./03-cost-breakdown.md) | Monthly OpCost figures used in Section 9 overlay |
| [04-effort-estimation.md](./04-effort-estimation.md) | Development timeline driving revenue start dates |
| [06-pricing-strategy.md](./06-pricing-strategy.md) | Target prices used in all revenue calculations |
| [07-roi-analysis.md](./07-roi-analysis.md) | ROI calculations built on this document's projections |
| [scenarios/](./scenarios/) | Detailed per-combination scenario files with full financial models |

---

## Appendix A: Revenue Model Formulas

### A.1 Monthly B2C Revenue

```
B2C_Revenue = Active_Users × Consultations_Per_Active × Avg_Fee
            + Active_Users × Premium_Conversion × Subscription_Fee
            + Consultations × Video_Attach_Rate × Video_Fee
            + Consultations × Lab_Attach_Rate × Lab_Fee
            + Consultations × Rx_Attach_Rate × Rx_Fee
```

### A.2 Monthly B2B Revenue

```
B2B_Revenue = Paying_Facilities × Platform_Fee
            + Facility_Consultations × Commission_Rate × Avg_Fee
```

### A.3 Net User Growth

```
Users(t+1) = Users(t) × (1 + Growth_Rate) × (1 - Churn_Rate)
Active_Users = Registered_Users × Active_Rate
```

### A.4 Success Metric

```
Success = Cumulative_Revenue(t) >= Cumulative_CapEx(t)
where Cumulative_Revenue = SUM(Monthly_Revenue, M0..t)
and   Cumulative_CapEx = Self_Funded_Total + Investor_Total + Ongoing_OpCost_Total
```

---

## Appendix B: Currency Conversion Reference

All revenue projections use mid-point USD equivalents with 10% FX buffer applied.

| Local Price | Raw USD | After 10% FX Buffer | Used in Model |
|-------------|---------|---------------------|---------------|
| ETB 200 (GP) | $3.51 | $3.16 | $3.29 avg with KES |
| ETB 400 (Specialist) | $7.02 | $6.32 | $6.58 avg with KES |
| ETB 75 (Video/Lab) | $1.32 | $1.19 | $1.24 avg with KES |
| ETB 40 (Rx) | $0.70 | $0.63 | $0.66 avg with KES |
| ETB 300/mo (Premium) | $5.26 | $4.74 | $4.94 avg with KES |
| KES 400 (GP) | $3.08 | $2.77 | incl. in avg |
| KES 800 (Specialist) | $6.15 | $5.54 | incl. in avg |
| KES 150 (Video/Lab) | $1.15 | $1.04 | incl. in avg |
| KES 80 (Rx) | $0.62 | $0.56 | incl. in avg |
| KES 600/mo (Premium) | $4.62 | $4.16 | incl. in avg |
| ETB 3,000/mo (Facility) | $52.63 | $47.37 | $52.63 (B2B, USD-pegged) |

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2026-03-18 | 1.0 | Initial document creation — all 21 combinations modeled |

---

*End of 05-revenue-modelling.md*
