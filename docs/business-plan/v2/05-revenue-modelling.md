# 05 -- Revenue Modelling

**Health Hub Business Plan v2 | Document 5 of 15**
**Version:** 2.0 | **Date:** March 2026 | **Status:** Working Draft
**Covers:** All 21 scenario x level combinations

> All assumptions, rates, scenarios, and phase definitions in this document are
> sourced from [params.md](./params.md). Pricing corridors and unit economics
> are sourced from [06-pricing-strategy.md](./06-pricing-strategy.md). Phase
> timelines are sourced from [01-timeline.md](./01-timeline.md). Monthly cost
> figures are sourced from [03-cost-breakdown.md](./03-cost-breakdown.md).
> All currency conversions use 83.0 USD/INR, 57.0 USD/ETB, and 130.0 USD/KES
> per params.md Section 10.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Methodology](#2-methodology)
3. [Revenue Streams](#3-revenue-streams)
4. [Market Sizing](#4-market-sizing)
5. [Revenue Model Assumptions](#5-revenue-model-assumptions)
6. [Scenario Analysis -- All 21 Combinations](#6-scenario-analysis----all-21-combinations)
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
fees (GP and specialist), pharmacy take-rates (8-12%), diagnostics take-rates
(10-15%), video premium add-ons, lab facilitation fees, prescription coordination
fees, and -- at production scale -- facility platform fees and optional premium
patient subscriptions. Revenue collection begins during Pilot 1 at symbolic
pricing ($0-500/mo per params.md Section 11.3), transitions to discounted
pricing during Pilot 2 ($500-3,000/mo), and reaches full production pricing
($3,000-15,000/mo) thereafter.

The total addressable market for digital health across urban Ethiopia and Kenya
is estimated at $300M-$480M annually, driven by 15-16 million smartphone users
with growing willingness to pay for convenient healthcare access. Health Hub's
serviceable obtainable market begins at $15K-$200K in Year 1 of Production
(0.01-0.05% of SAM) and scales to $300K-$4.0M by Year 3-4 (0.2-1.0% of SAM),
reflecting realistic adoption curves for a new digital health entrant in
emerging markets where trust-building and regulatory navigation are critical
gatekeeping factors.

Across all 21 scenario and investment combinations, the model projects first
meaningful revenue between Month 5 (best case: S3-O3-I3 per 01-timeline.md)
and Month 9 (worst case: S1-L1). The primary recommended path (S3-O2-I2, per
01-timeline.md Section 6.1) reaches first revenue at approximately Month 6
and achieves monthly revenue of $3,000-15,000/mo at production scale. The
success metric -- cumulative total revenue exceeding cumulative total capital
investment -- is projected between Month 20 and Month 30 depending on the
scenario, with the primary path targeting Month 24-28.

---

### Key Changes from v1

The v2 revenue model differs from v1 in five material ways:

| Dimension | v1 Approach | v2 Approach |
|-----------|-------------|-------------|
| Cost-to-serve basis | Pure marketplace model | Marketplace + employed doctors (INR 60,000/mo each per params.md Section 4.1) + admin ops (INR 18,000/mo) + tech support (INR 25,000/mo) |
| Team composition | "Small team of 3" abstraction | 3 core + 7 devs + 2 advisors, all part-time, with role-specific rates ($10-$20/hr per params.md Section 3.1) |
| Revenue timing | Revenue assumed from Pilot 2 at ~M5-M10 | Revenue timing now derived from v2 phase durations: Pre-Pilot 3-6 months, Pilot 1 2-3 months (per 01-timeline.md Section 4.3) |
| Operational costs in overlay | Not modeled | Full ops staff ladder ($2,482-$6,542/mo per params.md Section 4.2) included in revenue-vs-cost analysis |
| Scenario notation | S1-L1 through S3-L3-I3 (simple) | S1-L1 through S3-O3-I3 with explicit O (our level) and I (investor level) separation |

---

## 2. Methodology

### 2.1 Dual Estimation Approach

Revenue projections are constructed through two complementary methods:

**Bottom-up model:**
- Registered users x monthly active rate x consultations per active user x average fee
- Pharmacy orders x average order value x take-rate (8-12% per params.md Section 11.2)
- Diagnostics orders x average order value x take-rate (10-15% per params.md Section 11.2)
- Facilities onboarded x platform fee x payment rate
- Premium subscribers x subscription price

**Top-down model:**
- Total addressable market (TAM) for East Africa digital health
- Serviceable addressable market (SAM) filtered by geography, smartphone access, and income
- Serviceable obtainable market (SOM) based on realistic market penetration curves

The bottom-up model drives the month-by-month projections in Section 6. The
top-down model provides a sanity check and ceiling validation in Section 4.

### 2.2 Conservatism Principles

All projections in this document follow these conservatism rules:

1. **No revenue during Pre-Pilot** -- Pre-Pilot is internal testing only.
   Revenue tables show $0 for this phase (per params.md Section 11.3).

2. **$0-500/mo during Pilot 1** -- Symbolic/subsidized pricing only. Revenue
   in this phase represents payment flow testing, not meaningful monetization.
   (Per params.md Section 11.3: "subsidized/symbolic pricing, learning phase.")

3. **$500-3,000/mo during Pilot 2** -- Target prices applied at 50% discount.
   Real monetization experiments begin here but pricing is introductory.
   (Per params.md Section 11.3: "50% of target pricing, real monetization
   experiments.")

4. **$3,000-15,000/mo at Production** -- Full pricing corridors from
   06-pricing-strategy.md applied. All revenue streams active.

5. **10-15% FX buffer applied** -- All ETB/KES-to-USD conversions include a
   downward adjustment to account for currency depreciation risk (per params.md
   Section 10: ETB buffer 10-15%, KES buffer 10%).

6. **Transaction fees deducted** -- M-Pesa/Telebirr fees (1-2%) are netted
   from revenue figures.

7. **Churn modeled explicitly** -- Monthly user churn is subtracted from growth
   to produce net user counts.

8. **Employed staff costs are fixed** -- Doctor salaries (INR 60,000/mo =
   ~$723/mo per params.md Section 4.1) are treated as fixed operational cost,
   not per-consultation marginal cost, because doctors are salaried regardless
   of consultation volume.

### 2.3 Scenario-Specific Revenue Drivers

Revenue timing and magnitude vary across scenarios because investment level
and investor timing directly affect:

| Driver | How It Varies | Source |
|--------|--------------|--------|
| Time to Pilot 1 (first symbolic revenue) | Pre-Pilot duration: 3 months (L3) to 6 months (L1) | 01-timeline.md Section 4.3 |
| Time to Pilot 2 (first real revenue) | Pilot 1 start + 2-3 months: M5 (fastest) to M9 (slowest) | 01-timeline.md Section 4.3 |
| Feature completeness at launch | L1: MVP only; L2: core + video; L3: full platform | params.md Section 2.4 |
| Marketing budget | L1: $0; L2: $50-100/mo; L3: $200-500/mo | Derived from 03-cost-breakdown.md |
| Facility onboarding pace | L1: 2-3 facilities; L2: 5-8; L3: 10-15 | 06-pricing-strategy.md Section 5.3 |
| Payment infrastructure readiness | L1: manual M-Pesa; L2: API by Pilot 1; L3: API by Pre-Pilot end | 06-pricing-strategy.md Section 7 |
| ARPU (more features = higher willingness to pay) | L1: lowest; L3: highest | 06-pricing-strategy.md Section 6 |

### 2.4 v2-Specific Phase Duration Mapping

All revenue projections use the v2 timeline from 01-timeline.md Section 4.3.
The phase boundaries for each of the 21 paths are critical inputs to the
revenue model because they determine when each revenue stream activates.

| Phase | Revenue Expectation | Duration Range (01-timeline.md) |
|-------|--------------------|---------------------------------|
| Pre-Pilot | $0/mo | 3-6 months |
| Pilot 1 | $0-500/mo | 2-3 months |
| Pilot 2 | $500-3,000/mo | 4-13 months |
| Production Readiness | $3,000-15,000/mo | 7-12 months |

---

## 3. Revenue Streams

### 3.1 Revenue Stream Overview

| Stream | Type | Revenue Model | Phase Available | ETB Price (Production) | KES Price (Production) | USD Equiv. |
|--------|------|--------------|----------------|----------------------|----------------------|------------|
| GP Consultation Fees | B2C | Per-transaction | Pilot 1+ (symbolic), Pilot 2+ (discounted), Production (full) | ETB 150-300 | KES 300-500 | $2.63-5.25 / $2.30-3.85 |
| Specialist Consultation Fees | B2C | Per-transaction | Pilot 2+ | ETB 300-600 | KES 500-1,000 | $5.25-10.50 / $3.85-7.70 |
| Pharmacy Commission | B2B | Take-rate on order value | Pilot 1+ (symbolic), Pilot 2+ | 8-12% | 8-12% | Variable |
| Diagnostics Commission | B2B | Take-rate on order value | Pilot 1+ (symbolic), Pilot 2+ | 10-15% | 10-15% | Variable |
| Video Premium Add-on | B2C | Per-transaction | Production | +ETB 50-100 | +KES 100-200 | +$0.88-1.75 |
| Lab Facilitation Fees | B2C | Per-transaction | Production | ETB 50-100 | KES 100-200 | $0.88-1.75 |
| Rx Coordination Fees | B2C | Per-transaction | Production | ETB 30-50 | KES 50-100 | $0.53-0.88 |
| Care Coordination / Travel | B2C | Per-case fee | Pilot 2+ | Variable | Variable | Variable |
| Facility Platform Fees | B2B | Monthly SaaS | Production | ETB 2,000-5,000/mo | KES 5,000-10,000/mo | $35-88/mo |
| Facility Commission | B2B | % of routed consultations | Production | 10-15% | 10-15% | 10-15% |
| Premium Patient Subscription | B2C | Monthly recurring | Production | ETB 200-400/mo | KES 400-800/mo | $3.50-7.00/mo |

*All pricing per params.md Section 11.2 and 06-pricing-strategy.md Sections 5.2-5.3.*

### 3.2 Revenue Stream Phasing

```
Pre-Pilot (3-6 months):  [FREE -- no revenue collection. Internal testing only.]
Pilot 1 (2-3 months):    [Symbolic: $0-500/mo. GP ETB 50-100. Manual M-Pesa. Data only.]
Pilot 2 (4-13 months):   [50% pricing: $500-3,000/mo. GP ETB 100-150. Specialist ETB 200-300.
                           Pharmacy 5-8% take-rate. Diagnostics 5-10% take-rate.
                           First real revenue.]
Production (7-12 months): [Full pricing: $3,000-15,000/mo. All streams active.
                           GP ETB 150-300. Specialist ETB 300-600.
                           Pharmacy 8-12%. Diagnostics 10-15%.
                           Facility fees + commissions. Premium subscriptions.]
```

### 3.3 Unit Economics Per Transaction (Production Phase)

Per 06-pricing-strategy.md Section 6. These margins drive the bottom-up revenue model.

| Stream | Gross Fee (USD) | M-Pesa/Telebirr Fee (1.5%) | Infra Cost | Net Margin | Margin % |
|--------|----------------|---------------------------|------------|------------|----------|
| GP Consultation (text/audio) | $3.50 avg (ETB 200) | $0.05 | $0.16 | $3.29 | 94.0% |
| GP Consultation (video) | $4.82 avg (ETB 275) | $0.07 | $0.36 | $4.39 | 91.1% |
| Specialist Consultation (text/audio) | $7.00 avg (ETB 400) | $0.11 | $0.27 | $6.62 | 94.6% |
| Specialist Consultation (video) | $8.77 avg (ETB 500) | $0.14 | $0.61 | $8.02 | 91.4% |
| Pharmacy Commission | Variable (8-12% of order) | Included in merchant fee | $0.02-0.05 | ~95% of take | ~95% |
| Diagnostics Commission | Variable (10-15% of order) | Included in merchant fee | $0.02-0.05 | ~95% of take | ~95% |
| Lab Facilitation | $1.32 avg | $0.02 | $0.05 | $1.25 | 94.7% |
| Rx Coordination | $0.70 avg | $0.01 | $0.05 | $0.64 | 91.4% |
| Premium Subscription | $5.25/mo avg (ETB 300) | $0.08 | $0.50-1.00 | $4.17-4.67 | 79-89% |

**Blended platform margin: 91-96% on B2C transactions.** The employed doctor
cost (INR 60,000/mo = ~$723/mo per params.md) is a fixed operational cost, not
a per-transaction variable. See Section 9 for the full-cost overlay.

### 3.4 Pharmacy and Diagnostics Revenue Detail

These streams were mentioned but not deeply modeled in v1. v2 treats them as
significant revenue contributors, consistent with the params.md pricing
corridors (pharmacy 8-12%, diagnostics 10-15%).

**Pharmacy Commission Model:**

| Parameter | Pilot 2 | Production |
|-----------|---------|------------|
| Take-rate | 5-8% (introductory) | 8-12% (full) |
| Average prescription order value (Ethiopia) | ETB 500-1,500 ($8.75-26.30) | ETB 500-1,500 ($8.75-26.30) |
| Average prescription order value (Kenya) | KES 1,000-3,000 ($7.70-23.10) | KES 1,000-3,000 ($7.70-23.10) |
| Revenue per order at 10% take-rate, ETB 1,000 avg | -- | ETB 100 ($1.75) |
| Estimated orders/month (Production, 1,000 active patients) | -- | 200-400 |
| Estimated monthly pharmacy revenue (Production) | -- | $350-700 |

**Diagnostics Commission Model:**

| Parameter | Pilot 2 | Production |
|-----------|---------|------------|
| Take-rate | 5-10% (introductory) | 10-15% (full) |
| Average lab order value (Ethiopia) | ETB 300-800 ($5.25-14.00) | ETB 300-800 ($5.25-14.00) |
| Average lab order value (Kenya) | KES 500-2,000 ($3.85-15.40) | KES 500-2,000 ($3.85-15.40) |
| Revenue per order at 12% take-rate, ETB 550 avg | -- | ETB 66 ($1.16) |
| Estimated orders/month (Production, 1,000 active patients) | -- | 150-300 |
| Estimated monthly diagnostics revenue (Production) | -- | $174-348 |

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
| Total population | ~130M (params.md Sec 9.1) | ~56M (params.md Sec 9.2) | ~186M |
| Urban population | ~28.6M (22%) | ~15.7M (28%) | ~44.3M |
| Smartphone users (urban) | 7.0-8.3M (35-45%, params.md) | 7.8-8.6M (55-65%, params.md) | 14.8-16.9M |
| Health expenditure per capita | ~$28/yr (params.md) | ~$84/yr (params.md) | -- |
| Digital health spend potential per capita | $10-$15/yr | $15-$30/yr | -- |
| **SAM** | **$70M-$125M/yr** | **$117M-$258M/yr** | **$187M-$383M/yr** |

Rounding to account for estimation uncertainty: **SAM = $150M-$400M/year.**

### 4.3 SOM (Serviceable Obtainable Market)

SOM is constrained by Health Hub's realistic ability to acquire and retain users
given its team size (12 part-time people per params.md Section 2), marketing
budget, and competitive landscape.

| Timeframe | SOM % of SAM | SOM Range (Annual) | Basis |
|-----------|-------------|-------------------|-------|
| Year 1 (Production) | 0.01-0.05% | $15K-$200K | Initial user base of 1K-10K active |
| Year 2 | 0.05-0.2% | $75K-$800K | Growth to 5K-30K active users |
| Year 3-4 | 0.2-1.0% | $300K-$4.0M | Network effects, brand recognition |
| Year 5+ (Extension) | 1.0-3.0% | $1.5M-$12M | Multi-country, enterprise contracts |

These SOM projections are deliberately conservative. Comparable digital health
platforms in emerging markets (mPharma, Helium Health, Vezeeta) achieved 0.5-2%
SAM penetration within 3-4 years of launch with $5M-$20M in funding -- far more
than Health Hub's projected investment range of $230K-$452K (per 03-cost-breakdown.md
Section 5.4).

### 4.4 Ethiopia vs Kenya Market Comparison

| Dimension | Ethiopia (Primary) | Kenya (Secondary) | Implication |
|-----------|-------------------|------------------|------------|
| GDP per capita | $1,020 | $2,100 | Kenya supports higher ARPU |
| Health spend per capita | $28/yr | $84/yr | Kenya 3x higher health budget per person |
| Smartphone penetration (urban) | 35-45% | 55-65% | Kenya has larger digital addressable base |
| Mobile money | Telebirr (40M users) | M-Pesa (33M users) | Both mature; Kenya more established |
| GP consult price ceiling | ETB 200-300 ($3.50-5.25) | KES 500-800 ($3.85-6.15) | Similar USD range despite income differences |
| Specialist price ceiling | ETB 400-600 ($7.00-10.50) | KES 1,000-2,000 ($7.70-15.40) | Kenya supports higher specialist pricing |
| Launch timing | First (Pilot 1) | Second (Pilot 2 or Production) | Ethiopia proves model; Kenya scales it |

---

## 5. Revenue Model Assumptions

### 5.1 Core Assumptions Table

| Parameter | Conservative | Moderate | Optimistic | Source |
|-----------|-------------|----------|-----------|--------|
| Consultations per active user per month | 0.5 | 1.0 | 2.0 | Ethiopian/Kenyan primary care frequency data |
| % of registered users who are "active" (monthly) | 20% | 35% | 50% | Mobile health app benchmarks (emerging markets) |
| Premium subscription conversion rate | 3% | 8% | 15% | Freemium conversion benchmarks |
| Average GP consultation fee -- Pilot 2 (USD) | $1.50 | $2.25 | $3.50 | 50% of production pricing per 06-pricing-strategy.md |
| Average GP consultation fee -- Production (USD) | $3.00 | $4.50 | $7.00 | Full pricing per params.md Section 11.2 |
| Average specialist fee -- Production (USD) | $6.00 | $8.00 | $10.50 | Full pricing per params.md Section 11.2 |
| Facilities paying platform fee (% of onboarded) | 30% | 50% | 80% | B2B SaaS adoption curves |
| Monthly user growth rate -- Pilot 2 | 15% | 25% | 40% | Mobile health app growth in Africa |
| Monthly user growth rate -- Production | 10% | 15% | 25% | Post-pilot organic + marketing growth |
| Monthly churn rate | 10% | 7% | 4% | Healthcare app retention benchmarks |
| Video premium attach rate | 5% | 15% | 30% | Video consult adoption in telemedicine |
| Lab facilitation attach rate | 10% | 20% | 35% | Post-consultation lab order rates |
| Rx coordination attach rate | 15% | 30% | 45% | Post-consultation Rx rates |
| Pharmacy take-rate (Production) | 8% | 10% | 12% | Per params.md Section 11.2 |
| Diagnostics take-rate (Production) | 10% | 12% | 15% | Per params.md Section 11.2 |
| Pharmacy orders as % of consultations | 30% | 45% | 60% | Clinical prescription rates |
| Diagnostics orders as % of consultations | 15% | 25% | 40% | Lab referral rates |

### 5.2 ARPU Buildup (Average Revenue Per Active User Per Month)

| Component | Pilot 2 (Moderate) | Production (Moderate) | Derivation |
|-----------|-------------------|----------------------|------------|
| Consultation revenue | 1.0 consult x $2.25 = $2.25 | 1.0 consult x $4.50 = $4.50 | Consults/active x avg fee |
| Pharmacy commission | 0.45 orders x $17.50 avg x 5% = $0.39 | 0.45 orders x $17.50 avg x 10% = $0.79 | Orders/consult x order value x take-rate |
| Diagnostics commission | 0.25 orders x $9.50 avg x 5% = $0.12 | 0.25 orders x $9.50 avg x 12% = $0.29 | Orders/consult x order value x take-rate |
| Video premium | -- | 15% x $1.32 = $0.20 | Attach rate x premium fee |
| Lab facilitation | -- | 20% x $1.32 = $0.26 | Attach rate x fee |
| Rx coordination | -- | 30% x $0.70 = $0.21 | Attach rate x fee |
| Premium sub (amortized) | 8% x $5.25 = $0.42 | 8% x $5.25 = $0.42 | Conversion rate x sub price |
| **ARPU** | **$3.18/mo** | **$6.67/mo** | Sum of components |

| Scenario | Pilot 2 ARPU | Production ARPU |
|----------|-------------|----------------|
| Conservative | $1.45/mo | $3.40/mo |
| Moderate | $3.18/mo | $6.67/mo |
| Optimistic | $6.80/mo | $14.20/mo |

**Key v2 difference from v1:** The v2 ARPU is higher than v1 ($3.18 vs $2.65
for Pilot 2, $6.67 vs $5.54 for Production) because pharmacy and diagnostics
commissions are now explicitly modeled as revenue streams, consistent with the
8-12% and 10-15% take-rates specified in params.md.

### 5.3 B2B Revenue Assumptions

| Parameter | Conservative | Moderate | Optimistic | Source |
|-----------|-------------|----------|-----------|--------|
| Facilities onboarded at Production launch | 5 | 10 | 20 | 06-pricing-strategy.md Section 5.3 |
| Facilities paying platform fee | 30% | 50% | 80% | B2B SaaS conversion |
| Platform fee per facility/month (USD) | $35 (ETB 2,000) | $53 (ETB 3,000) | $88 (ETB 5,000) | params.md Section 11.2 |
| Average consultations per facility/month | 50 | 100 | 200 | Clinic capacity estimates |
| Commission rate (Production) | 10% | 12% | 15% | params.md Section 11.2 |
| Avg consultation fee through facility | $3.50 | $4.50 | $6.00 | Weighted average |
| Commission per facility/month | $17.50 | $54.00 | $180.00 | Consults x fee x rate |

---

## 6. Scenario Analysis -- All 21 Combinations

The following sections present month-by-month revenue projections for all 21
scenario x investment combinations. Each projection uses the **moderate**
assumption set as the primary model. All figures are in USD. Phase timings
are derived from 01-timeline.md Section 4.3.

### Key Notation

- **Mn** = Month n from project start (M0 = project kickoff)
- **Reg** = Registered users (cumulative)
- **Active** = Monthly active users (35% of registered, net of churn)
- **Consults** = Total consultations in the month
- **B2C** = Patient-side revenue (consultations + premium + add-ons)
- **B2B** = Facility-side revenue (platform fees + commissions + pharmacy/diagnostics take)
- **Cum Rev** = Cumulative revenue to date
- **Cum Cost** = Cumulative economic cost to date (per 03-cost-breakdown.md)

### Phase-to-Month Mapping (from 01-timeline.md Section 4.3)

| # | Path | Pre-Pilot | Pilot 1 | Pilot 2 | Prod Readiness | Total |
|---|------|-----------|---------|---------|----------------|-------|
| 17 | S3-O2-I2 (Primary) | M0-M4 | M4-M6 | M6-M12 | M12-M20 | 20 |
| 8 | S2-O2-I2 (Fallback) | M0-M5 | M5-M7 | M7-M14 | M14-M24 | 24 |
| 18 | S3-O2-I3 (Upside) | M0-M4 | M4-M6 | M6-M11 | M11-M18 | 18 |

---

### 6.1 Recommended Path: S3-O2-I2 (Primary)

**Profile:** Founders self-fund at Ideal level (O2, ~480 hrs/mo) through
Pre-Pilot and into Pilot 1. Investor enters at Ideal level (I2, ~$75K-100K)
after Pilot 1 completes (~M6). Total timeline: 20 months. Total economic cost:
$276,996 (per 03-cost-breakdown.md, path #17).

**Monthly cost reference (from 03-cost-breakdown.md Section 4.5):**
- Pre-Pilot: ~$13,028/mo
- Pilot 1: ~$14,957/mo
- Pilot 2: ~$16,031/mo
- Production Readiness: ~$17,772/mo (adjusted to ~$14,811/mo for L2 Prod Ready per 03-cost-breakdown.md Section 6.2)

**Revenue trajectory:**

| Period | Month | Phase | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum Cost |
|--------|-------|-------|-----|--------|----------|---------|---------|-----------|---------|----------|
| Pre-Pilot | M0 | Pre-Pilot | 50 | 0 | 0 | $0 | $0 | $0 | $0 | $13,028 |
| Pre-Pilot | M1 | Pre-Pilot | 100 | 0 | 0 | $0 | $0 | $0 | $0 | $26,056 |
| Pre-Pilot | M2 | Pre-Pilot | 150 | 0 | 0 | $0 | $0 | $0 | $0 | $39,084 |
| Pre-Pilot | M3 | Pre-Pilot | 180 | 0 | 0 | $0 | $0 | $0 | $0 | $52,112 |
| Pilot 1 | M4 | Pilot 1 | 350 | 0 | 0 | $0 | $0 | $0 | $0 | $67,069 |
| Pilot 1 | M5 | Pilot 1 | 600 | 35 | 18 | $25 | $0 | $25 | $25 | $82,026 |
| --- Investor enters after Pilot 1 (~M6) --- | | | | | | | | | | |
| Pilot 2 | M6 | Pilot 2 | 900 | 225 | 113 | $254 | $18 | $272 | $297 | $98,057 |
| Pilot 2 | M7 | Pilot 2 | 1,200 | 336 | 168 | $378 | $30 | $408 | $705 | $114,088 |
| Pilot 2 | M8 | Pilot 2 | 1,600 | 476 | 238 | $536 | $48 | $584 | $1,289 | $130,119 |
| Pilot 2 | M9 | Pilot 2 | 2,100 | 654 | 327 | $736 | $72 | $808 | $2,097 | $146,150 |
| Pilot 2 | M10 | Pilot 2 | 2,800 | 882 | 441 | $993 | $102 | $1,095 | $3,192 | $162,181 |
| Pilot 2 | M11 | Pilot 2 | 3,600 | 1,152 | 576 | $1,296 | $142 | $1,438 | $4,630 | $178,212 |
| Production | M12 | Production | 4,500 | 1,463 | 878 | $2,636 | $398 | $3,034 | $7,664 | $192,823 |
| Production | M13 | Production | 5,500 | 1,815 | 1,089 | $3,269 | $508 | $3,777 | $11,441 | $207,434 |
| Production | M14 | Production | 6,800 | 2,278 | 1,367 | $4,104 | $655 | $4,759 | $16,200 | $222,045 |
| Production | M15 | Production | 8,300 | 2,822 | 1,693 | $5,083 | $825 | $5,908 | $22,108 | $236,656 |
| Production | M16 | Production | 10,100 | 3,484 | 2,090 | $6,274 | $1,035 | $7,309 | $29,417 | $251,267 |
| Production | M17 | Production | 12,200 | 4,270 | 2,562 | $7,693 | $1,286 | $8,979 | $38,396 | $265,878 |
| Production | M18 | Production | 14,700 | 5,218 | 3,131 | $9,400 | $1,594 | $10,994 | $49,390 | $276,996 |
| Production | M19 | Production | 17,500 | 6,300 | 3,780 | $11,349 | $1,948 | $13,297 | $62,687 | $277,889 |
| Production | M20 | Production | 20,800 | 7,592 | 4,555 | $13,678 | $2,370 | $16,048 | $78,735 | $278,782 |

**Notes on M19-M20:** Costs shown are estimated maintenance-mode costs (~$893/mo
for ongoing infrastructure and minimal ops) beyond the production readiness
build budget. By M20, the $276,996 economic cost envelope is exhausted and the
company operates on revenue.

**Annual summary:**

| Period | Revenue | Cumulative Rev | Cum Economic Cost | Gap |
|--------|---------|---------------|-------------------|-----|
| Year 1 (M0-M11) | $4,630 | $4,630 | $178,212 | -$173,582 |
| M12-M20 (Production) | $74,105 | $78,735 | $278,782 | -$200,047 |
| M21-M24 (projected) | ~$68,000 | ~$146,735 | ~$282,000 | -$135,265 |
| M25-M30 (projected) | ~$140,000 | ~$286,735 | ~$288,000 | ~ breakeven |

**Time to success metric:** ~M29-M32. Cumulative revenue crosses cumulative
economic cost around $277K-$287K.

**Monthly revenue at key milestones:**

| Milestone | Month | Monthly Revenue |
|-----------|-------|----------------|
| First revenue | M5 | $25 |
| Revenue > $500/mo | M8 | $584 |
| Revenue > $3,000/mo | M12 | $3,034 |
| Revenue > $5,000/mo | M15 | $5,908 |
| Revenue > $10,000/mo | M18 | $10,994 |
| Revenue > $15,000/mo | M20 | $16,048 |

---

### 6.2 Fallback Path: S2-O2-I2

**Profile:** Founders self-fund at Ideal level (O2) through Pre-Pilot and Pilot
1. Investor enters at Ideal level (I2) during Pilot 1-to-Pilot 2 transition
(~M7). Total timeline: 24 months. Total economic cost: $331,570 (per
03-cost-breakdown.md, path #8).

| Period | Month | Phase | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum Cost |
|--------|-------|-------|-----|--------|----------|---------|---------|-----------|---------|----------|
| Pre-Pilot | M0 | Pre-Pilot | 50 | 0 | 0 | $0 | $0 | $0 | $0 | $13,028 |
| Pre-Pilot | M1 | Pre-Pilot | 100 | 0 | 0 | $0 | $0 | $0 | $0 | $26,056 |
| Pre-Pilot | M2 | Pre-Pilot | 130 | 0 | 0 | $0 | $0 | $0 | $0 | $39,084 |
| Pre-Pilot | M3 | Pre-Pilot | 160 | 0 | 0 | $0 | $0 | $0 | $0 | $52,112 |
| Pre-Pilot | M4 | Pre-Pilot | 180 | 0 | 0 | $0 | $0 | $0 | $0 | $65,140 |
| Pilot 1 | M5 | Pilot 1 | 350 | 0 | 0 | $0 | $0 | $0 | $0 | $80,097 |
| Pilot 1 | M6 | Pilot 1 | 550 | 30 | 15 | $21 | $0 | $21 | $21 | $95,054 |
| --- Investor enters during transition (~M7) --- | | | | | | | | | | |
| Pilot 2 | M7 | Pilot 2 | 800 | 200 | 100 | $225 | $16 | $241 | $262 | $111,085 |
| Pilot 2 | M8 | Pilot 2 | 1,100 | 297 | 149 | $335 | $26 | $361 | $623 | $127,116 |
| Pilot 2 | M9 | Pilot 2 | 1,450 | 414 | 207 | $466 | $40 | $506 | $1,129 | $143,147 |
| Pilot 2 | M10 | Pilot 2 | 1,900 | 570 | 285 | $641 | $58 | $699 | $1,828 | $159,178 |
| Pilot 2 | M11 | Pilot 2 | 2,500 | 775 | 388 | $873 | $83 | $956 | $2,784 | $175,209 |
| Pilot 2 | M12 | Pilot 2 | 3,200 | 1,024 | 512 | $1,152 | $114 | $1,266 | $4,050 | $191,240 |
| Pilot 2 | M13 | Pilot 2 | 4,100 | 1,332 | 666 | $1,499 | $155 | $1,654 | $5,704 | $207,271 |
| Production | M14 | Production | 5,200 | 1,716 | 1,030 | $3,093 | $478 | $3,571 | $9,275 | $225,043 |
| Production | M15 | Production | 6,500 | 2,178 | 1,307 | $3,925 | $619 | $4,544 | $13,819 | $242,815 |
| Production | M16 | Production | 8,000 | 2,720 | 1,632 | $4,900 | $786 | $5,686 | $19,505 | $260,587 |
| Production | M17 | Production | 9,800 | 3,381 | 2,029 | $6,093 | $993 | $7,086 | $26,591 | $278,359 |
| Production | M18 | Production | 12,000 | 4,200 | 2,520 | $7,566 | $1,250 | $8,816 | $35,407 | $296,131 |
| Production | M19 | Production | 14,500 | 5,148 | 3,089 | $9,275 | $1,558 | $10,833 | $46,240 | $313,903 |
| Production | M20 | Production | 17,500 | 6,300 | 3,780 | $11,349 | $1,920 | $13,269 | $59,509 | $331,570 |
| Production | M21 | Production | 21,000 | 7,665 | 4,599 | $13,808 | $2,366 | $16,174 | $75,683 | $332,463 |
| Production | M22 | Production | 25,000 | 9,250 | 5,550 | $16,663 | $2,878 | $19,541 | $95,224 | $333,356 |
| Production | M23 | Production | 29,500 | 11,062 | 6,637 | $19,928 | $3,471 | $23,399 | $118,623 | $334,249 |
| Production | M24 | Production | 34,500 | 13,110 | 7,866 | $23,619 | $4,141 | $27,760 | $146,383 | $335,142 |

**Annual summary:**

| Period | Revenue | Cumulative Rev | Cum Economic Cost | Gap |
|--------|---------|---------------|-------------------|-----|
| Year 1 (M0-M11) | $2,784 | $2,784 | $175,209 | -$172,425 |
| Year 2 (M12-M24) | $143,599 | $146,383 | $335,142 | -$188,759 |
| Year 3 (M25-M36 projected) | ~$380,000 | ~$526,383 | ~$348,000 | +$178,383 |

**Time to success metric:** ~M31-M35. The larger total economic cost ($331,570
vs $276,996 for S3-O2-I2) requires longer to recover, but the revenue
trajectory remains strong.

---

### 6.3 Upside Path: S3-O2-I3

**Profile:** Founders self-fund at Ideal level (O2) through Pre-Pilot and into
Pilot 1. Investor enters at Fully Funded level (I3, ~$150K-250K) after Pilot 1
(~M6). Total timeline: 18 months. Total economic cost: $251,808 (per
03-cost-breakdown.md, path #18).

| Period | Month | Phase | Reg | Active | Consults | B2C Rev | B2B Rev | Total Rev | Cum Rev | Cum Cost |
|--------|-------|-------|-----|--------|----------|---------|---------|-----------|---------|----------|
| Pre-Pilot | M0 | Pre-Pilot | 50 | 0 | 0 | $0 | $0 | $0 | $0 | $13,028 |
| Pre-Pilot | M1 | Pre-Pilot | 100 | 0 | 0 | $0 | $0 | $0 | $0 | $26,056 |
| Pre-Pilot | M2 | Pre-Pilot | 150 | 0 | 0 | $0 | $0 | $0 | $0 | $39,084 |
| Pre-Pilot | M3 | Pre-Pilot | 180 | 0 | 0 | $0 | $0 | $0 | $0 | $52,112 |
| Pilot 1 | M4 | Pilot 1 | 400 | 0 | 0 | $0 | $0 | $0 | $0 | $67,069 |
| Pilot 1 | M5 | Pilot 1 | 700 | 42 | 21 | $30 | $0 | $30 | $30 | $82,026 |
| --- Investor enters after Pilot 1 (~M6) --- | | | | | | | | | | |
| Pilot 2 | M6 | Pilot 2 | 1,200 | 360 | 180 | $405 | $32 | $437 | $467 | $99,557 |
| Pilot 2 | M7 | Pilot 2 | 1,700 | 544 | 272 | $612 | $52 | $664 | $1,131 | $117,088 |
| Pilot 2 | M8 | Pilot 2 | 2,400 | 804 | 402 | $905 | $82 | $987 | $2,118 | $134,619 |
| Pilot 2 | M9 | Pilot 2 | 3,300 | 1,155 | 578 | $1,301 | $124 | $1,425 | $3,543 | $152,150 |
| Pilot 2 | M10 | Pilot 2 | 4,500 | 1,620 | 810 | $1,823 | $182 | $2,005 | $5,548 | $169,681 |
| Production | M11 | Production | 6,000 | 2,190 | 1,314 | $3,947 | $636 | $4,583 | $10,131 | $184,992 |
| Production | M12 | Production | 7,500 | 2,775 | 1,665 | $4,999 | $818 | $5,817 | $15,948 | $200,303 |
| Production | M13 | Production | 9,500 | 3,562 | 2,137 | $6,419 | $1,068 | $7,487 | $23,435 | $215,614 |
| Production | M14 | Production | 12,000 | 4,560 | 2,736 | $8,216 | $1,390 | $9,606 | $33,041 | $230,925 |
| Production | M15 | Production | 15,000 | 5,775 | 3,465 | $10,407 | $1,783 | $12,190 | $45,231 | $246,236 |
| Production | M16 | Production | 18,500 | 7,215 | 4,329 | $13,001 | $2,258 | $15,259 | $60,490 | $251,808 |
| Production | M17 | Production | 22,500 | 8,888 | 5,333 | $16,015 | $2,818 | $18,833 | $79,323 | $252,701 |
| Production | M18 | Production | 27,500 | 11,000 | 6,600 | $19,820 | $3,510 | $23,330 | $102,653 | $253,594 |

**Annual summary:**

| Period | Revenue | Cumulative Rev | Cum Economic Cost | Gap |
|--------|---------|---------------|-------------------|-----|
| M0-M11 | $10,131 | $10,131 | $184,992 | -$174,861 |
| M12-M18 | $92,522 | $102,653 | $253,594 | -$150,941 |
| M19-M24 (projected) | ~$185,000 | ~$287,653 | ~$259,000 | +$28,653 |

**Time to success metric:** ~M23-M26. The full investor backing accelerates
both user growth and feature delivery, driving faster revenue ramp. The lower
total economic cost ($251,808 vs $276,996) also reduces the target to cross.

**Monthly revenue at key milestones:**

| Milestone | Month | Monthly Revenue |
|-----------|-------|----------------|
| First revenue | M5 | $30 |
| Revenue > $1,000/mo | M8 | $987 |
| Revenue > $5,000/mo | M12 | $5,817 |
| Revenue > $10,000/mo | M15 | $12,190 |
| Revenue > $15,000/mo | M16 | $15,259 |
| Revenue > $20,000/mo | M18 | $23,330 |

---

### 6.4 Self-Funded Paths (S1): Three Combinations

#### S1-L1 -- Bootstrapped Self-Funded

**Profile:** Slowest path. ~320 hrs/mo capacity. No investor. Timeline: 34
months (per 01-timeline.md). Total economic cost: $451,751 (per 03-cost-breakdown.md).

| Period | Months | Reg (end) | Active (end) | Phase Rev/mo (avg) | Phase Rev Total | Cum Rev | Cum Cost |
|--------|--------|-----------|-------------|-------------------|----------------|---------|----------|
| Pre-Pilot | M0-M5 | 180 | 0 | $0 | $0 | $0 | $62,868 |
| Pilot 1 | M6-M8 | 600 | 35 | $60 | $180 | $180 | $100,739 |
| Pilot 2 | M9-M21 | 6,500 | 1,950 | $850 | $11,050 | $11,230 | $284,442 |
| Prod Ready | M22-M33 | 25,000 | 8,750 | $6,800 | $81,600 | $92,830 | $478,306 |

**Revenue at M24:** ~$4,200/mo. **Success metric:** ~M38-M42. This path has
the lowest monthly burn but the highest cumulative cost due to 34-month
duration. Revenue barely exceeds the production readiness cost rate by M30+.

#### S1-L2 -- Ideal Self-Funded

**Profile:** Moderate pace. ~480 hrs/mo capacity. No investor. Timeline: 26
months. Total economic cost: $353,794.

| Period | Months | Reg (end) | Active (end) | Phase Rev/mo (avg) | Phase Rev Total | Cum Rev | Cum Cost |
|--------|--------|-----------|-------------|-------------------|----------------|---------|----------|
| Pre-Pilot | M0-M4 | 200 | 0 | $0 | $0 | $0 | $65,140 |
| Pilot 1 | M5-M6 | 650 | 45 | $75 | $150 | $150 | $95,054 |
| Pilot 2 | M7-M15 | 7,500 | 2,625 | $1,200 | $10,800 | $10,950 | $239,333 |
| Prod Ready | M16-M25 | 28,000 | 9,800 | $8,200 | $82,000 | $92,950 | $417,053 |

**Revenue at M24:** ~$9,500/mo. **Success metric:** ~M32-M36.

#### S1-L3 -- Fully Funded Self-Funded

**Profile:** Fastest self-funded path. ~640 hrs/mo capacity. No investor.
Timeline: 20 months. Total economic cost: $281,931.

| Period | Months | Reg (end) | Active (end) | Phase Rev/mo (avg) | Phase Rev Total | Cum Rev | Cum Cost |
|--------|--------|-----------|-------------|-------------------|----------------|---------|----------|
| Pre-Pilot | M0-M3 | 200 | 0 | $0 | $0 | $0 | $59,752 |
| Pilot 1 | M4-M5 | 800 | 55 | $90 | $180 | $180 | $93,066 |
| Pilot 2 | M6-M11 | 5,000 | 1,750 | $1,400 | $8,400 | $8,580 | $198,252 |
| Prod Ready | M12-M19 | 22,000 | 7,700 | $7,500 | $60,000 | $68,580 | $349,828 |

**Revenue at M24:** ~$13,500/mo. **Success metric:** ~M26-M30.

---

### 6.5 Investor During Transition Paths (S2): Nine Combinations Summary

S2 paths self-fund through Pilot 1 into the Pilot 1-to-Pilot 2 transition.
Investor capital arrives before or during Pilot 2. The pre-investor revenue
phase mirrors S1 at the corresponding self-fund level.

| # | Path | Timeline | Econ Cost | First Rev Mo | Rev at M18/mo | Rev at M24/mo | Cum Rev M24 | Success Mo |
|---|------|----------|-----------|-------------|--------------|--------------|-------------|-----------|
| 4 | S2-O1-I1 | 30 mo | $400,716 | M9 | $1,600 | $4,800 | $28,500 | M36-M40 |
| 5 | S2-O1-I2 | 27 mo | $363,656 | M9 | $3,200 | $9,500 | $56,000 | M32-M36 |
| 6 | S2-O1-I3 | 24 mo | $326,066 | M9 | $5,800 | $16,000 | $98,000 | M28-M32 |
| 7 | S2-O2-I1 | 27 mo | $382,548 | M7 | $3,800 | $9,200 | $62,000 | M32-M36 |
| 8 | S2-O2-I2 | 24 mo | $331,570 | M7 | $8,816 | $27,760 | $146,383 | M31-M35 |
| 9 | S2-O2-I3 | 21 mo | $307,898 | M7 | $12,000 | $32,000 | $198,000 | M26-M30 |
| 10 | S2-O3-I1 | 25 mo | $362,708 | M5 | $6,500 | $13,500 | $96,000 | M28-M32 |
| 11 | S2-O3-I2 | 22 mo | $311,316 | M5 | $10,500 | $23,000 | $155,000 | M24-M28 |
| 12 | S2-O3-I3 | 19 mo | $272,646 | M5 | $17,000 | $40,000 | $260,000 | M22-M26 |

**Key observation:** Within S2, moving from I1 to I3 at the same self-fund
level roughly doubles monthly revenue at M24. The investor level has a larger
impact on revenue magnitude than the self-fund level, because investor capital
directly funds marketing-driven user acquisition.

---

### 6.6 Investor After Pilot 1 Paths (S3): Nine Combinations Summary

S3 paths self-fund only through Pre-Pilot and into Pilot 1 (~3-5 months).
Investor capital arrives immediately after Pilot 1, funding the entire Pilot 2
and Production Readiness journey.

| # | Path | Timeline | Econ Cost | First Rev Mo | Rev at M18/mo | Rev at M24/mo | Cum Rev M24 | Success Mo |
|---|------|----------|-----------|-------------|--------------|--------------|-------------|-----------|
| 13 | S3-O1-I1 | 26 mo | $349,636 | M7 | $3,500 | $8,500 | $55,000 | M32-M36 |
| 14 | S3-O1-I2 | 22 mo | $297,910 | M7 | $7,000 | $18,500 | $110,000 | M26-M30 |
| 15 | S3-O1-I3 | 20 mo | $258,804 | M7 | $13,500 | $35,000 | $200,000 | M24-M28 |
| 16 | S3-O2-I1 | 24 mo | $329,136 | M6 | $5,000 | $11,000 | $72,000 | M30-M34 |
| 17 | S3-O2-I2 | 20 mo | $276,996 | M6 | $10,994 | $16,048* | $78,735* | M29-M32 |
| 18 | S3-O2-I3 | 18 mo | $251,808 | M6 | $23,330 | $48,000+ | $287,000+ | M23-M26 |
| 19 | S3-O3-I1 | 22 mo | $308,804 | M5 | $6,800 | $14,500 | $98,000 | M26-M30 |
| 20 | S3-O3-I2 | 18 mo | $256,250 | M5 | $13,500 | $31,000 | $192,000 | M22-M24 |
| 21 | S3-O3-I3 | 16 mo | $230,522 | M5 | $16,500 | $40,000 | $258,000 | M24-M26 |

*S3-O2-I2 figures at M20 (production end, per 01-timeline.md); M24 figure is
a projection beyond the 20-month build period.

**Key observation:** S3 paths consistently reach the same revenue milestones
2-4 months earlier than S2 paths at the same investment level. The earlier
investor arrival funds Pilot 2 from day one, eliminating the ramp-up period
where S2 paths operate on bootstrapped user acquisition.

---

## 7. Revenue Comparison Summary

### 7.1 All 21 Combinations -- Key Metrics

| # | Combo | First Rev Mo | Rev at M12/mo | Rev at M18/mo | Rev at M24/mo | Cum Rev at M24 | Econ Cost | Months to Success |
|---|-------|-------------|--------------|--------------|--------------|----------------|-----------|------------------|
| 1 | S1-L1 | M9 | $350 | $1,600 | $4,200 | $22,000 | $451,751 | M38-M42 |
| 2 | S1-L2 | M7 | $1,100 | $3,800 | $9,500 | $58,000 | $353,794 | M32-M36 |
| 3 | S1-L3 | M6 | $2,500 | $7,500 | $13,500 | $88,000 | $281,931 | M26-M30 |
| 4 | S2-O1-I1 | M9 | $400 | $1,600 | $4,800 | $28,500 | $400,716 | M36-M40 |
| 5 | S2-O1-I2 | M9 | $650 | $3,200 | $9,500 | $56,000 | $363,656 | M32-M36 |
| 6 | S2-O1-I3 | M9 | $1,000 | $5,800 | $16,000 | $98,000 | $326,066 | M28-M32 |
| 7 | S2-O2-I1 | M7 | $1,300 | $3,800 | $9,200 | $62,000 | $382,548 | M32-M36 |
| 8 | **S2-O2-I2** | M7 | $1,266 | $8,816 | $27,760 | $146,383 | $331,570 | M31-M35 |
| 9 | S2-O2-I3 | M7 | $3,000 | $12,000 | $32,000 | $198,000 | $307,898 | M26-M30 |
| 10 | S2-O3-I1 | M5 | $2,500 | $6,500 | $13,500 | $96,000 | $362,708 | M28-M32 |
| 11 | S2-O3-I2 | M5 | $3,500 | $10,500 | $23,000 | $155,000 | $311,316 | M24-M28 |
| 12 | S2-O3-I3 | M5 | $5,000 | $17,000 | $40,000 | $260,000 | $272,646 | M22-M26 |
| 13 | S3-O1-I1 | M7 | $1,200 | $3,500 | $8,500 | $55,000 | $349,636 | M32-M36 |
| 14 | S3-O1-I2 | M7 | $2,200 | $7,000 | $18,500 | $110,000 | $297,910 | M26-M30 |
| 15 | S3-O1-I3 | M7 | $3,800 | $13,500 | $35,000 | $200,000 | $258,804 | M24-M28 |
| 16 | S3-O2-I1 | M6 | $1,600 | $5,000 | $11,000 | $72,000 | $329,136 | M30-M34 |
| 17 | **S3-O2-I2** | M6 | $3,034 | $10,994 | $16,048 | $78,735 | $276,996 | M29-M32 |
| 18 | **S3-O2-I3** | M6 | $5,817 | $23,330 | $48,000 | $287,000 | $251,808 | M23-M26 |
| 19 | S3-O3-I1 | M5 | $2,500 | $6,800 | $14,500 | $98,000 | $308,804 | M26-M30 |
| 20 | S3-O3-I2 | M5 | $4,200 | $13,500 | $31,000 | $192,000 | $256,250 | M22-M24 |
| 21 | S3-O3-I3 | M5 | $5,500 | $16,500 | $40,000 | $258,000 | $230,522 | M24-M26 |

### 7.2 Revenue Efficiency Ranking (Cumulative Revenue / Economic Cost at M24)

| Rank | Combo | Rev/Cost at M24 | Interpretation |
|------|-------|----------------|----------------|
| 1 | S3-O2-I3 | 1.14x | Fastest to cross; full investor + ideal self-fund |
| 2 | S3-O3-I3 | 1.12x | Maximum scenario; near breakeven by M24 |
| 3 | S2-O3-I3 | 0.95x | Full investment both sides; approaching breakeven |
| 4 | S3-O3-I2 | 0.75x | Strong growth trajectory |
| 5 | S2-O3-I2 | 0.50x | Moderate; needs more time |
| 6 | S3-O2-I2 | 0.28x | Primary recommendation; on track but needs M29+ |
| 7 | S2-O2-I2 | 0.44x | Fallback; needs M31+ |
| 8 | S1-L3 | 0.31x | Self-funded; steady growth |
| 9 | S1-L2 | 0.16x | Efficient but slow |
| 10 | S1-L1 | 0.05x | Extremely slow path |

### 7.3 Key Observations

**1. Higher investment levels produce higher absolute revenue but take longer
to recover the larger capital base.** S3-O3-I3 reaches $40,000/mo revenue at
M24 (highest absolute) but needs to recover $230,522 in economic cost. S1-L1
reaches only $4,200/mo but needs to recover a larger $451,751 over a much
longer timeline.

**2. S3 paths consistently outperform S2 paths at the same investment level.**
The earlier investor arrival (after Pilot 1 vs during transition) provides
2-4 months of additional investor-funded growth time, which compounds into
materially higher cumulative revenue by M24.

**3. The self-fund level (O) matters less than the investor level (I) for
revenue magnitude.** Within any scenario, moving from I1 to I3 roughly
triples M24 monthly revenue, while moving from O1 to O3 roughly doubles it.
This is because investor capital directly funds the marketing and user
acquisition that drives revenue.

**4. Pharmacy and diagnostics commissions add 15-25% to consultation-only
revenue.** The v2 model's explicit inclusion of 8-12% pharmacy take-rate and
10-15% diagnostics take-rate (per params.md) adds a meaningful B2B revenue
layer that v1 underweighted.

---

## 8. Revenue Sensitivity Analysis

### 8.1 Single-Variable Sensitivity (Primary Path S3-O2-I2 at M20)

Testing the impact of changing one variable at a time, holding all others at
moderate assumptions.

| Variable | -20% Change | Base Case | +20% Change | Impact on M20 Rev |
|----------|------------|-----------|-------------|------------------|
| Average consultation fee | $3.60 | $4.50 | $5.40 | +/-18% |
| Monthly user growth rate | 12% | 15% | 18% | +/-28% |
| Monthly churn rate | 8.4% | 7% | 5.6% | +/-19% |
| Active user % | 28% | 35% | 42% | +/-20% |
| Consultations per active user | 0.8 | 1.0 | 1.2 | +/-20% |
| Pharmacy take-rate | 8% | 10% | 12% | +/-3% |
| Diagnostics take-rate | 10% | 12% | 15% | +/-2% |
| Facility commission rate | 10% | 12% | 14% | +/-3% |
| Premium subscription conversion | 6.4% | 8% | 9.6% | +/-2% |

**Interpretation:** User growth rate is the single most sensitive variable (28%
impact from a 20% change), followed by churn rate (19%) and active user
percentage (20%). The B2B variables (take-rates, commissions) have low
individual sensitivity because they represent a smaller share of total revenue
in early phases. At production scale with larger facility bases, B2B sensitivity
increases.

### 8.2 Combined Scenario Sensitivity (S3-O2-I2)

| Scenario | Rev at M20/mo | Cum Rev at M20 | Success Month |
|----------|--------------|----------------|--------------|
| All variables at -20% (stress test) | $6,200 | $32,000 | M38-M42 |
| All variables at -10% | $10,800 | $53,000 | M33-M37 |
| Base case | $16,048 | $78,735 | M29-M32 |
| All variables at +10% | $22,500 | $108,000 | M25-M28 |
| All variables at +20% (bull case) | $30,500 | $144,000 | M22-M25 |

### 8.3 Critical Thresholds

The model identifies the following minimum values required for the primary path
(S3-O2-I2) to achieve the success metric within 36 months:

| Variable | Minimum Required | Moderate Assumption | Buffer |
|----------|-----------------|-------------------|--------|
| Monthly user growth (Production) | 8% | 15% | 1.88x |
| Active user percentage | 18% | 35% | 1.94x |
| Average consultation fee | $2.50 | $4.50 | 1.80x |
| Monthly churn rate | < 15% | 7% | 2.14x |
| Pharmacy take-rate | > 4% | 10% | 2.50x |

All critical thresholds have at least 1.8x buffer against the moderate
assumption, indicating the model is robust to significant underperformance
in any single variable.

### 8.4 Scenario-Specific Sensitivity

| Combo | Most Sensitive Variable | 20% Adverse Shift Impact |
|-------|------------------------|-------------------------|
| S1-L1 | User growth rate | Delays success metric by 6-8 months |
| S1-L2 | Churn rate | Delays success metric by 4-5 months |
| S3-O2-I2 (Primary) | User growth rate | Delays success metric by 4-5 months |
| S2-O2-I2 (Fallback) | User growth rate | Delays success metric by 4-6 months |
| S3-O2-I3 (Upside) | User growth rate | Delays success metric by 2-3 months |
| S3-O3-I3 (Maximum) | User growth rate | Delays success metric by 2-3 months |

**User growth rate is the single most impactful variable across all
combinations.** This underscores the importance of marketing budget allocation
and product-market fit validation during Pilot 1. The implication for capital
strategy is clear: investment that increases user acquisition velocity
(marketing, facility partnerships, referral programs) has higher revenue ROI
than investment in feature depth or pricing optimization.

---

## 9. Revenue vs Cost Overlay

### 9.1 Monthly Breakeven Analysis

Monthly operating costs are derived from 03-cost-breakdown.md Section 4.5. The
monthly breakeven point is when monthly revenue first exceeds monthly operating
cost (economic cost, not just cash spend).

**Monthly operating costs by phase (at L2 per 03-cost-breakdown.md):**

| Phase | Monthly Economic Cost |
|-------|---------------------|
| Pre-Pilot | $13,028 |
| Pilot 1 | $14,957 |
| Pilot 2 | $16,031 |
| Production Readiness | $17,772 (L2 full) or ~$14,811 (L2 adjusted per 03-cost-breakdown.md Sec 6.2) |

**When does monthly revenue cover monthly operating costs?**

| Combo | Monthly OpCost at Peak | First Month Rev > OpCost | Monthly Rev at That Point |
|-------|----------------------|-------------------------|--------------------------|
| S1-L1 | $16,172 (L1 Prod Ready) | Never within timeline | Max rev ~$4,200/mo at M24 |
| S1-L2 | $17,772 (L2 Prod Ready) | ~M30+ | ~$18,000 |
| S1-L3 | $18,972 (L3 Prod Ready) | ~M24-M26 | ~$19,000 |
| S2-O2-I2 (Fallback) | $17,772 | ~M22-M24 | ~$20,000-$28,000 |
| S3-O2-I2 (Primary) | $14,811 (adjusted) | M18-M19 | ~$11,000-$13,000 |
| S3-O2-I3 (Upside) | $17,531 (L3 Pilot 2) | M14-M15 | ~$10,000-$12,000 |
| S3-O3-I3 (Maximum) | $18,972 | M16-M17 | ~$16,000-$19,000 |

**Critical insight:** The primary path (S3-O2-I2) reaches monthly
revenue-to-cost parity around Month 18-19 -- roughly coinciding with the end of
Production Readiness. This means the company transitions from a capital-burning
build phase to a revenue-covering operating phase right as the build completes.
This alignment is not accidental; it reflects the v2 model's design where the
20-month build window is calibrated to produce a revenue-generating operation.

### 9.2 Cumulative Revenue vs Cumulative Cost (Success Metric)

The primary success metric from params.md Section 12 is:
**Cumulative total revenue exceeds cumulative total capital investment.**

| Combo | Cum Rev at M24 | Cum Economic Cost | Gap at M24 | Projected Crossover |
|-------|---------------|-------------------|-----------|-------------------|
| S1-L1 | $22,000 | $451,751 (at M34) | -$429,751 | M40+ |
| S1-L2 | $58,000 | $353,794 (at M26) | -$295,794 | M34-M38 |
| S1-L3 | $88,000 | $281,931 (at M20) | -$193,931 | M28-M32 |
| S2-O2-I2 | $146,383 | $331,570 (at M24) | -$185,187 | M31-M35 |
| S3-O2-I2 | $78,735 | $276,996 (at M20) | -$198,261 | M29-M32 |
| S3-O2-I3 | $287,000 | $251,808 (at M18) | +$35,192 | ~M23 |
| S3-O3-I3 | $258,000 | $230,522 (at M16) | +$27,478 | ~M24 |

### 9.3 When Does Revenue Cover Monthly Burn? (INR View)

For Indian ops staff costs, which represent a significant share of OpEx, the
INR perspective matters. At 83 USD/INR:

| Phase | Monthly Ops Staff (INR) | Monthly Ops Staff (USD) | Consultations Needed to Cover (at $4.50 avg margin) |
|-------|------------------------|------------------------|-----------------------------------------------------|
| Pilot 1 | INR 206,000 | $2,482 | ~552 consultations/mo |
| Pilot 2 | INR 362,000 | $4,361 | ~969 consultations/mo |
| Prod Ready | INR 543,000 | $6,542 | ~1,454 consultations/mo |
| Production | INR 748,000-868,000 | $9,012-$10,458 | ~2,003-2,324 consultations/mo |

At production pricing with 1.0 consultations per active user per month, this
translates to needing approximately 2,000-2,300 monthly active patients to
cover employed staff costs alone. The primary path (S3-O2-I2) reaches this
threshold around Month 14-15 (with ~2,278-2,822 active users per Section 6.1).

### 9.4 Revenue vs Cost Phase Comparison (S3-O2-I2 Primary Path)

| Phase | Duration | Total Revenue | Total Cost | Rev as % of Cost | Net Position |
|-------|----------|--------------|------------|-----------------|-------------|
| Pre-Pilot (M0-M3) | 4 months | $0 | $52,112 | 0% | -$52,112 |
| Pilot 1 (M4-M5) | 2 months | $25 | $29,914 | 0.1% | -$29,889 |
| Pilot 2 (M6-M11) | 6 months | $4,605 | $96,186 | 4.8% | -$91,581 |
| Prod Ready (M12-M20) | 9 months | $74,105 | $98,784 | 75.0% | -$24,679 |
| **Total** | **21 months** | **$78,735** | **$276,996** | **28.4%** | **-$198,261** |

**Key insight:** Revenue covers 75% of costs during Production Readiness but
only 4.8% during Pilot 2. The business transitions from heavily subsidized
(Pre-Pilot + Pilot 1: 0% revenue coverage) through partially subsidized
(Pilot 2: 5%) to nearly self-sustaining (Production: 75%+). By Month 20+, post
the build window, revenue exceeds ongoing costs and the cumulative gap begins
to close.

### 9.5 Cash Flow Milestones

| Milestone | S1-L1 | S1-L2 | S2-O2-I2 | S3-O2-I2 | S3-O2-I3 | S3-O3-I3 |
|-----------|-------|-------|----------|----------|----------|----------|
| First dollar of revenue | M9 | M7 | M7 | M5 | M5 | M5 |
| Monthly rev > $500/mo | M14 | M9 | M8 | M8 | M7 | M6 |
| Monthly rev > $3,000/mo | M20+ | M15 | M14 | M12 | M11 | M9 |
| Monthly rev > $5,000/mo | M24+ | M18 | M16 | M15 | M12 | M12 |
| Monthly rev > $10,000/mo | M30+ | M22 | M19 | M18 | M15 | M15 |
| Monthly rev > $15,000/mo | M36+ | M26+ | M22 | M20 | M16 | M17 |
| Monthly rev covers monthly cost | Never (in 34 mo) | M30+ | M22-M24 | M18-M19 | M14-M15 | M16-M17 |
| Cum rev covers cum cost | M40+ | M34-M38 | M31-M35 | M29-M32 | M23-M26 | M24-M26 |

### 9.6 Runway Analysis (Worst-Case Zero-Revenue)

For investor-backed scenarios, this shows how many months the total capital
would last at the post-investor burn rate if revenue were zero.

| Combo | Total Capital | Monthly Burn (post-inv, mid) | Zero-Revenue Runway |
|-------|-------------|---------------------------|-------------------|
| S2-O2-I2 | $331,570 | ~$16,000 | ~20.7 months |
| S3-O2-I2 | $276,996 | ~$15,400 | ~18.0 months |
| S3-O2-I3 | $251,808 | ~$17,500 | ~14.4 months |
| S3-O3-I3 | $230,522 | ~$18,900 | ~12.2 months |

**Trade-off:** Higher-investment paths (S3-O2-I3, S3-O3-I3) have shorter
zero-revenue runways because their burn rates are higher. However, they also
reach revenue milestones faster, so the zero-revenue scenario is increasingly
unlikely. The primary path (S3-O2-I2) has an 18-month zero-revenue runway,
which exceeds the 20-month build period only because revenue begins at Month 5,
significantly extending the effective runway.

---

## 10. Key Takeaways

### Takeaway 1: Revenue Begins During Pilot, Not After Production

Revenue collection starts during Pilot 1 (symbolic, M4-M6) and becomes
meaningful during Pilot 2 ($500-3,000/mo, starting M6-M9 depending on path).
No path generates zero revenue until Production launch. This means:
- The company has revenue learning data before the investor enters (in S3 paths)
- Pricing validation happens with real transactions, not surveys
- The zero-revenue runway is shorter than the full pre-production build period

### Takeaway 2: User Growth Rate Is the Dominant Revenue Lever

A 20% change in monthly user growth rate affects M20 revenue by 28% -- more
than any other single variable. This has three implications:
1. Marketing budget allocation has higher revenue ROI than feature development
2. Product-market fit validation during Pilot 1 is the highest-value activity
3. Facility partnerships that bring patient referrals are more valuable than
   pricing optimization

### Takeaway 3: Pharmacy and Diagnostics Add Meaningful Revenue

The v2 model explicitly includes pharmacy take-rate (8-12%) and diagnostics
take-rate (10-15%) per params.md Section 11.2. These streams add 15-25% to
consultation-only revenue at production scale, with virtually no additional
marginal cost (the platform already routes these orders). At $350-700/mo for
pharmacy and $174-348/mo for diagnostics (per 1,000 active patients), these
streams provide a meaningful supplementary revenue layer that was
underweighted in v1.

### Takeaway 4: The Primary Path Reaches Revenue-Cost Parity at M18-M19

The S3-O2-I2 primary path reaches monthly revenue parity with monthly operating
costs around Month 18-19, coinciding with the final months of the 20-month build
window. This means the company transitions from a capital-burning entity to a
revenue-covering entity right as the product build completes. Post-M20, revenue
continues to grow while costs stabilize, closing the cumulative gap.

### Takeaway 5: The Success Metric Is Achievable Within 30-32 Months for the Primary Path

The primary success metric (cumulative revenue exceeds cumulative economic cost)
is projected at Month 29-32 for S3-O2-I2. This is approximately 10 months after
the 20-month build window closes. During those 10 months, monthly revenue of
$16,000-$30,000 (growing at 15% monthly) accumulates the remaining ~$198,000
needed to close the gap.

For the upside path (S3-O2-I3), the success metric is achievable as early as
Month 23-26 due to both lower total economic cost ($251,808 vs $276,996) and
faster revenue growth from full investor backing.

### Takeaway 6: Avoid the Bootstrapped + Large Investor Trap

Combinations where founders self-fund at L1/O1 ($500/mo equivalent) but receive
large investors ($150K+) show the worst revenue efficiency. The slow O1
development phase delays revenue start by 2-4 months, meaning investor capital
sits idle during the extended Pre-Pilot. If bootstrapped self-funding is the
constraint, a smaller investor (I1 or I2) is more capital-efficient than I3.

### Takeaway 7: Kenya Adds 40-80% Revenue Uplift When Launched

Kenya's higher GDP per capita ($2,100 vs $1,020), higher health spending
($84/yr vs $28/yr per capita), and higher smartphone penetration (55-65% vs
35-45%) support higher ARPU and faster user acquisition. When Kenya launches
(targeted for Pilot 2 or early Production per 01-timeline.md), revenue from
the combined Ethiopia + Kenya operation is projected at 1.4-1.8x the
Ethiopia-only figure.

---

## 11. Cross-References

| Document | Relevance to Revenue Modelling |
|----------|-------------------------------|
| [params.md](./params.md) | All scenario definitions, rates, phase timing, market parameters, pricing corridors (Sections 9, 10, 11, 13, 14, 15) |
| [01-timeline.md](./01-timeline.md) | Phase durations and month boundaries for all 21 paths (Section 4.3) |
| [03-cost-breakdown.md](./03-cost-breakdown.md) | Monthly economic costs by phase and level (Sections 4.5, 5.2, 6) used in Section 9 overlay |
| [04-effort-estimation.md](./04-effort-estimation.md) | Development timeline driving revenue start dates |
| [06-pricing-strategy.md](./06-pricing-strategy.md) | Target prices used in all revenue calculations (Sections 5.2, 6); unit economics (Section 6); competitor benchmarks (Section 8) |
| [07-roi-analysis.md](./07-roi-analysis.md) | ROI calculations built on this document's projections |
| [08-customer-acquisition.md](./08-customer-acquisition.md) | User growth assumptions and marketing strategy |
| [09-business-metrics.md](./09-business-metrics.md) | KPIs including ARPU, churn, LTV:CAC derived from revenue model |
| [10-cash-flow-runway.md](./10-cash-flow-runway.md) | Cash flow projections that combine this document with cost model |

---

## Appendix A: Revenue Model Formulas

### A.1 Monthly B2C Revenue

```
B2C_Revenue = Active_Users x Consultations_Per_Active x Avg_Fee
            + Active_Users x Premium_Conversion x Subscription_Fee
            + Consultations x Video_Attach_Rate x Video_Fee
            + Consultations x Lab_Attach_Rate x Lab_Fee
            + Consultations x Rx_Attach_Rate x Rx_Fee
```

### A.2 Monthly B2B Revenue

```
B2B_Revenue = Paying_Facilities x Platform_Fee
            + Facility_Consultations x Commission_Rate x Avg_Fee
            + Pharmacy_Orders x Avg_Order_Value x Pharmacy_Take_Rate
            + Diagnostics_Orders x Avg_Order_Value x Diagnostics_Take_Rate
```

### A.3 Net User Growth

```
Users(t+1) = Users(t) x (1 + Growth_Rate) x (1 - Churn_Rate)
Active_Users = Registered_Users x Active_Rate
```

**Net monthly growth rate = (1 + Growth_Rate) x (1 - Churn_Rate) - 1**

At moderate assumptions: (1 + 0.15) x (1 - 0.07) - 1 = 1.15 x 0.93 - 1 = 0.0695 = 6.95% net monthly growth.

This means registered users roughly double every 10 months at moderate
assumptions, or every 7 months at optimistic assumptions.

### A.4 Success Metric

```
Success = Cumulative_Revenue(t) >= Cumulative_Economic_Cost(t)
where Cumulative_Revenue = SUM(Monthly_Revenue, M0..t)
and   Cumulative_Economic_Cost = SUM(Monthly_Economic_Cost, M0..t)
      per 03-cost-breakdown.md Section 5.2
```

### A.5 ARPU Formula

```
ARPU = B2C_Revenue_Per_Active_User + (B2B_Revenue / Active_Users)
     = (Consults/Active x Avg_Fee)
     + (Pharmacy_Orders/Active x Order_Value x Take_Rate)
     + (Diagnostics_Orders/Active x Order_Value x Take_Rate)
     + (Video_Attach_Rate x Video_Fee)
     + (Lab_Attach_Rate x Lab_Fee)
     + (Rx_Attach_Rate x Rx_Fee)
     + (Premium_Conversion x Sub_Fee)
```

---

## Appendix B: INR Conversion Reference

All revenue figures in this document are in USD. For Indian operations staff
cost comparisons (per params.md Section 4), the following INR equivalents
apply at 83.0 USD/INR:

| Revenue Milestone (USD/mo) | INR Equivalent (per mo) | What It Covers |
|---------------------------|------------------------|----------------|
| $500 | INR 41,500 | Less than 1 doctor salary (INR 60,000) |
| $2,482 | INR 205,986 | Pilot 1 ops staff (2 doctors + 2 admin + 2 tech) |
| $3,000 | INR 249,000 | Pilot 2 entry revenue target |
| $4,361 | INR 361,963 | Pilot 2 ops staff (4 doctors + 4 admin + 2 tech) |
| $6,542 | INR 542,986 | Prod Ready ops staff (6 doctors + 6 admin + 3 tech) |
| $10,000 | INR 830,000 | Approaching full ops staff + infrastructure coverage |
| $15,000 | INR 1,245,000 | Revenue covers full monthly economic cost at L2 ($14,811 per 03-cost-breakdown.md) |

---

## Appendix C: Key v1-to-v2 Revenue Model Differences

| Parameter | v1 Value | v2 Value | Impact on Revenue Model |
|-----------|----------|----------|------------------------|
| v1 baseline scenario | S2-L2-I2 | S3-O2-I2 (primary) | Different investor timing; S3 provides earlier capital |
| Phase durations | Derived from old effort model | Derived from v2 01-timeline.md with 2,195-hour total effort | More realistic phase boundaries |
| Ops staff in breakeven | Not modeled | INR 206,000-543,000/mo ($2,482-$6,542) | Higher breakeven consultation volume |
| Pharmacy/diagnostics revenue | Mentioned but not modeled | 8-12% and 10-15% take-rates explicitly modeled | +15-25% to consultation-only revenue |
| Monthly economic cost | $500-$2,000/mo abstraction | $10,478-$18,972/mo realistic (per 03-cost-breakdown.md) | Much higher bar for revenue to clear |
| Parallel ops workstreams | Not considered | 750 hours consuming founder time | Explains why Pre-Pilot is 3-6 months, not 1-2 |
| Equity structure | Not integrated | 60/20/20 (per params.md Section 8) | Investor capital expectations are bounded |
| Android APK | Vague | 480 hrs fixed at $15/hr = $7,200 | Patient channel availability affects user growth timing |
| Web platform | 682-1,413 hrs | 745 hrs at $20/hr = $14,900 | Tighter development timeline |
| Infrastructure costs | $30-50/mo flat | $65-$1,500/mo by phase | Realistic infrastructure breakeven |

---

*End of 05-revenue-modelling.md v2. All figures trace to params.md v2.0,
01-timeline.md v2.0, 03-cost-breakdown.md v2.0, and 06-pricing-strategy.md v2.0.
March 2026.*
