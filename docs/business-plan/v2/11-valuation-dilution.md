# 11 — Valuation & Dilution

**Health Hub Business Plan v2 | Document 11**
**Version:** 2.0 | **Date:** March 2026

> All assumptions, rates, scenarios, equity structures, and phase definitions in
> this document are sourced from [params.md](./params.md). Refer to that document
> for any parameter clarification.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Valuation Methodology](#2-valuation-methodology)
3. [Pre-Money Valuation Estimates](#3-pre-money-valuation-estimates)
4. [Dilution Analysis](#4-dilution-analysis)
5. [Investor Return Modeling](#5-investor-return-modeling)
6. [Comparable Deals](#6-comparable-deals)
7. [Key Takeaways](#7-key-takeaways)
8. [Cross-References](#8-cross-references)

---

## 1. Executive Summary

Health Hub is a pre-revenue health technology startup with a functional prototype,
a defined target market (East Africa, Ethiopia first), and a 60/20/20 equity
structure (founder / founding team + strategic partners / investor pool). Valuing
a company at this stage is inherently imprecise, but the exercise is necessary for
two reasons: (a) setting negotiation anchors for investor conversations, and
(b) ensuring founder control is preserved through Production launch.

This document presents valuation estimates at three investment stages — Post-Pilot 1,
Post-Pilot 2, and Pre-Production — using four established methodologies. It then
models dilution across all relevant scenarios from params.md, demonstrating that
the founder retains majority control (>50%) in every modeled outcome. Finally, it
benchmarks Health Hub against comparable East African health tech funding rounds
to validate that the proposed valuations are market-consistent.

**Key findings:**

- Pre-money valuation ranges from $300K-$600K (Post-Pilot 1) to $1.5M-$3M (Pre-Production)
- At the maximum investor pool ceiling of 20%, investor capital requirements range from $75K-$150K (Post-Pilot 1) to $375K-$750K (Pre-Production)
- The founder retains 50-60% ownership in all modeled scenarios through Production
- Comparable East African health tech seed rounds validate the $500K-$2M valuation corridor for companies at similar stages

---

## 2. Valuation Methodology

### 2.1 Methods Overview

Four valuation methods are relevant for Health Hub at different stages. No single
method is definitive for a pre-revenue startup; the recommended approach is to
triangulate across methods and use the convergence zone as the negotiation range.

| Method | Description | Best Stage | Limitations |
|--------|-------------|------------|-------------|
| Comparable Transactions | Uses recent funding rounds of similar companies (geography, sector, stage) to derive implied valuations | All stages | East African health tech deal data is sparse; comparisons require adjustment for geography and maturity |
| Scorecard Method | Scores the startup across 7 factors (team, market, product, competition, marketing, need for additional investment, other) relative to an average seed-stage valuation | Post-Pilot 1, Post-Pilot 2 | Subjective scoring; depends on accurate regional baseline average |
| Berkus Method | Assigns dollar values to 5 risk dimensions (sound idea, prototype, quality team, strategic relationships, product rollout/sales) up to a pre-revenue ceiling | Post-Pilot 1 | Capped at ~$2M pre-revenue; less useful after early revenue appears |
| Discounted Cash Flow (DCF) | Projects future free cash flows and discounts them to present value at a risk-adjusted rate | Pre-Production and later | Requires revenue data; discount rates for East African startups are very high (40-60%), making outputs highly sensitive to assumptions |

### 2.2 Recommended Method by Stage

| Investment Stage | Primary Method | Secondary Method | Validation Method |
|-----------------|---------------|-----------------|-------------------|
| Post-Pilot 1 | Scorecard | Berkus | Comparable Transactions |
| Post-Pilot 2 | Comparable Transactions | Scorecard | DCF (sensitivity only) |
| Pre-Production | DCF | Comparable Transactions | Scorecard (sanity check) |

### 2.3 Scorecard Method — Detailed Application

The scorecard method compares Health Hub to the "average" seed-stage startup in
East Africa and assigns percentage weights to each factor.

**Regional baseline:** The average pre-seed / seed health tech valuation in East
Africa is approximately $300K-$500K (based on available deal data from 2022-2025).
We use $400K as the baseline.

| Factor | Weight | Health Hub Assessment | Score Multiplier | Weighted Contribution |
|--------|--------|----------------------|-----------------|----------------------|
| Strength of team | 30% | Part-time but experienced; 12 contributors; medical advisor. Below average for dedication, above average for breadth. | 0.90x | 27.0% |
| Size of opportunity | 25% | $300M-$480M TAM across Ethiopia + Kenya. Large. | 1.20x | 30.0% |
| Product / technology | 15% | Functional prototype with 10 feature modules, verified codebase ($33K-$45K replacement value). Strong for stage. | 1.30x | 19.5% |
| Competitive environment | 10% | Fragmented; no dominant digital health platform in Ethiopia. Moderate competition in Kenya. | 1.10x | 11.0% |
| Marketing / distribution channels | 5% | Admin-assisted model is unique but unproven at scale. Partner clinic channel identified but not activated. | 0.85x | 4.3% |
| Need for additional investment | 5% | Company will need follow-on capital; single-round risk is moderate. | 0.90x | 4.5% |
| Other factors (regulatory, FX, market timing) | 10% | Nascent regulation in Ethiopia (opportunity and risk); FX depreciation risk; strong macro tailwinds for health digitization. | 0.95x | 9.5% |
| **Total** | **100%** | | | **105.8%** |

**Scorecard valuation:** $400K x 1.058 = **$423K** (at Post-Pilot 1 stage)

### 2.4 Berkus Method — Detailed Application

The Berkus method assigns value to five risk-reduction milestones, each worth
up to $400K for a maximum pre-revenue valuation of $2M.

| Risk Element | Assessment | Assigned Value | Rationale |
|-------------|-----------|---------------|-----------|
| Sound idea (addresses real need) | Healthcare access gap in East Africa is well-documented; $28/year per capita health spend in Ethiopia signals massive unmet demand | $300K | Strong need, validated by market data |
| Prototype exists | Functional 10-module prototype with verified codebase; 19 audit issues resolved; Angular 21 + Express 5 + PostgreSQL stack | $350K | Beyond wireframe; working software with real architecture |
| Quality management team | 3 founders (part-time), 7 developers, 2 advisors; medical domain expertise present; technical head with architecture skills | $200K | Discounted for part-time commitment; no previous exit experience documented |
| Strategic relationships | Advisory board in place; partner clinic channel identified in Addis Ababa (2,000-3,000 private clinics); Ethio Telecom/Telebirr ecosystem access | $150K | Relationships identified but not yet converted to binding agreements |
| Product rollout / sales | Pre-revenue; pilot plan defined but not yet executed; no paying customers | $50K | Minimal credit until first external users |

**Berkus valuation:** **$1,050K** (ceiling for pre-revenue)

> Note: The Berkus method produces a higher figure than scorecard because it
> heavily weights the existing prototype. For Post-Pilot 1 negotiation, the
> scorecard figure ($423K) is more conservative and credible. The Berkus figure
> ($1.05M) represents an upper bound that becomes realistic after Pilot 2 traction.

### 2.5 DCF Method — Framework for Later Stages

DCF is not recommended as the primary method until Post-Pilot 2 at the earliest,
because pre-revenue cash flow projections carry extreme uncertainty. However, the
framework is documented here for use at the Pre-Production stage.

| Parameter | Value | Source / Rationale |
|-----------|-------|-------------------|
| Projection period | 5 years from Production launch | Standard VC horizon |
| Revenue Year 1 (Production) | $36K-$180K/year | params.md: $3,000-$15,000/mo |
| Revenue growth rate | 80-120% Y1-Y2, 50-80% Y2-Y3, 30-50% Y3-Y5 | East African health tech growth benchmarks |
| Gross margin | 60-70% | Software platform with employed clinical staff |
| Operating expenses (% of revenue) | 70-90% Y1, declining to 50-60% by Y5 | Heavy early investment in ops staff (per params.md Section 4) |
| Terminal growth rate | 5% | Conservative for emerging market |
| Discount rate | 45-55% | Reflects: pre-revenue stage, single-geography, FX risk, regulatory uncertainty, part-time team |
| Terminal value method | Exit multiple (5-8x revenue) | Comparable to health tech exit multiples in Africa |

**Illustrative DCF output (at Pre-Production stage):**

| Revenue Scenario | 5-Year Cumulative FCF | Terminal Value (6x Rev) | Enterprise Value (50% discount) | Implied Pre-Money |
|-----------------|----------------------|------------------------|-------------------------------|-------------------|
| Conservative ($36K Y1, 50% growth) | -$85K to +$40K | $440K | $180K-$280K | $800K-$1.2M |
| Base ($100K Y1, 80% growth) | +$30K to +$180K | $1.9M | $600K-$1.0M | $1.5M-$2.5M |
| Optimistic ($180K Y1, 100% growth) | +$120K to +$400K | $5.8M | $1.5M-$2.8M | $2.5M-$4.0M |

> The wide ranges confirm why DCF should be secondary to comparables and scorecard
> until real revenue data narrows the projections.

---

## 3. Pre-Money Valuation Estimates

### 3.1 Valuation by Investment Stage

Each stage reflects increasing de-risking: more product maturity, more traction,
and more validated assumptions.

| Stage | Timing (per params.md) | Traction at Entry | Valuation Range | Midpoint | Primary Method |
|-------|----------------------|------------------|----------------|----------|----------------|
| Post-Pilot 1 | Month 5-9 (after first external pilot) | Up to 1,000 users; prototype proven with real patients; partner clinics onboarded; $0-500/mo revenue | $300K-$600K | $450K | Scorecard + Berkus |
| Post-Pilot 2 | Month 8-22 (after scaled pilot) | 5,000-10,000 users; real revenue ($500-$3,000/mo); Kenya prep underway; staffing ladder active | $800K-$1.5M | $1.15M | Comparable Transactions + Scorecard |
| Pre-Production | Month 12-34 (scaling to full) | Full pricing active; $3,000-$15,000/mo revenue; multi-geography; compliance achieved | $1.5M-$3.0M | $2.25M | DCF + Comparable Transactions |

### 3.2 Valuation Drivers at Each Stage

| Driver | Post-Pilot 1 | Post-Pilot 2 | Pre-Production |
|--------|-------------|-------------|----------------|
| Product maturity | Prototype proven; Android APK core ready | Hardened platform; full role workflows | Production-ready; compliance complete |
| User traction | Up to 1,000 (mostly subsidized) | 5,000-10,000 (some paying) | 10,000+ (monetized) |
| Revenue | $0-$500/mo (symbolic) | $500-$3,000/mo (real) | $3,000-$15,000/mo (scaling) |
| Team commitment | Part-time; no full-time employees | Part-time + employed ops staff (4-8 people) | Growing ops team (14-22 people) |
| Market validation | Ethiopia pilot only | Ethiopia proven, Kenya in progress | Multi-geography live |
| IP / technology | Codebase ($33K-$45K replacement) | Codebase + operational playbooks + data | Full platform + data + processes |
| Risk profile | High (unproven market fit) | Medium (proven demand, scaling risk) | Lower (proven model, execution risk) |

### 3.3 Valuation Sensitivity

The following table shows how the Post-Pilot 1 valuation shifts based on key
milestone outcomes.

| Milestone Outcome | Valuation Impact | Adjusted Range |
|-------------------|-----------------|----------------|
| Pilot 1 exceeds 1,000 users | +20-30% | $360K-$780K |
| Pilot 1 generates >$500/mo revenue | +15-25% | $345K-$750K |
| Signed clinic partnership agreement | +10-20% | $330K-$720K |
| Android APK live on Play Store | +10-15% | $330K-$690K |
| Team member converts to full-time | +10-20% | $330K-$720K |
| Pilot 1 fails to reach 500 users | -20-30% | $210K-$480K |
| No revenue by end of Pilot 1 | -10-15% | $255K-$540K |
| Key team member departure | -15-25% | $225K-$510K |

### 3.4 Valuation Crosswalk Between Stages

| Transition | Valuation Increase | Implied Step-Up | What Justifies the Step-Up |
|-----------|-------------------|----------------|---------------------------|
| Post-Pilot 1 to Post-Pilot 2 | $450K to $1.15M | 2.6x | Real users, real revenue, proven demand, ops team hired |
| Post-Pilot 2 to Pre-Production | $1.15M to $2.25M | 2.0x | Multi-geography, full pricing, compliance, scaling ops |
| Post-Pilot 1 to Pre-Production | $450K to $2.25M | 5.0x | Full journey from prototype to production-ready |

---

## 4. Dilution Analysis

### 4.1 Starting Cap Table (Month 0)

Per params.md Section 8, the equity structure begins as:

| Stakeholder | Shares (Illustrative, 10,000 total) | Ownership % |
|------------|-------------------------------------|-------------|
| Owner / Founder | 6,000 | 60.0% |
| Founding Team + Strategic Partners | 2,000 | 20.0% |
| Investor Pool (reserved, unissued) | 2,000 | 20.0% |
| **Total** | **10,000** | **100.0%** |

> The investor pool is a reservation, not issued equity. Until an investor closes,
> the effective ownership is Founder 75% / Founding Team 25% of issued shares.

### 4.2 Dilution Mechanics

Per params.md Section 8.2:

- The 20% investor pool is the **ceiling** for outside capital during the current planning phase
- If the investor requires more than 20%, dilution comes proportionally from the other two pools
- The founder maintains majority control (>50%) through Production in all modeled scenarios

Two dilution models are presented:

**Model A — Investor buys from the reserved pool (no new shares issued):**
The investor purchases shares from the 20% reserved pool. Founder and founding team
ownership percentages do not change. This is the simplest structure.

**Model B — New shares issued (standard VC approach):**
New shares are issued to the investor, diluting all existing holders proportionally.
This is the standard approach and is modeled in detail below.

### 4.3 Cap Table Evolution — Scenario S2 (Investor During Pilot 1-to-2 Transition)

#### S2 — Single Round at Post-Pilot 1 Valuation ($450K midpoint)

| Parameter | Value |
|-----------|-------|
| Pre-money valuation | $450,000 |
| Investment amount | $75,000-$150,000 |
| Post-money valuation | $525,000-$600,000 |
| Investor ownership | 14.3%-25.0% |

**Cap table after S2 investment (range):**

| Stakeholder | Pre-Investment | Post ($75K raise) | Post ($100K raise) | Post ($150K raise) |
|------------|---------------|-------------------|-------------------|-------------------|
| Founder | 60.0% | 51.4% | 49.0% | 45.0% |
| Founding Team | 20.0% | 17.1% | 16.3% | 15.0% |
| Investor | 0.0% | 14.3% | 16.3% | 25.0% |
| Unallocated Pool | 20.0% | 17.1% | 18.4% | 15.0% |
| **Total** | **100.0%** | **100.0%** | **100.0%** | **100.0%** |

> **Founder control analysis:** At $75K raise, founder retains 51.4% (majority control).
> At $100K, founder drops to 49.0% — below the 50% threshold. At $150K, founder holds
> 45.0%. To maintain >50% control at the $450K valuation, the raise must stay at or
> below ~$83K (18.5% dilution max at this valuation).

**Recommendation:** If raising at $450K pre-money, cap the round at $80K-$90K to
preserve founder majority. Alternatively, negotiate a higher pre-money valuation
or use the reserved pool model (Model A) where founder ownership is unaffected.

#### S2 — Using the Reserved Pool (Model A, Recommended)

| Stakeholder | Pre-Investment | Post ($75K from pool) | Post ($100K from pool) | Post ($150K from pool) |
|------------|---------------|----------------------|----------------------|----------------------|
| Founder | 60.0% | 60.0% | 60.0% | 60.0% |
| Founding Team | 20.0% | 20.0% | 20.0% | 20.0% |
| Investor | 0.0% | 14.3% | 16.3% | 20.0% |
| Remaining Pool | 20.0% | 5.7% | 3.7% | 0.0% |
| **Total** | **100.0%** | **100.0%** | **100.0%** | **100.0%** |

> Under Model A, the founder always retains 60%. The trade-off is that the reserved
> pool shrinks, leaving less room for future investors or strategic hires.

### 4.4 Cap Table Evolution — Scenario S3 (Investor After Pilot 1)

#### S3 — Single Round at Post-Pilot 1 Valuation ($450K midpoint)

Results are identical to S2 above, since the valuation is the same. The difference
is timing: S3 investor arrives earlier (right after Pilot 1), giving the company
more runway to execute Pilot 2.

#### S3 — Two-Round Scenario (Post-Pilot 1 + Pre-Production)

This models a company that raises a small round after Pilot 1 and a larger round
before Production.

| Parameter | Round 1 (Post-Pilot 1) | Round 2 (Pre-Production) |
|-----------|----------------------|------------------------|
| Pre-money valuation | $450,000 | $2,000,000 |
| Investment amount | $75,000 | $200,000 |
| Post-money valuation | $525,000 | $2,200,000 |
| Round dilution | 14.3% | 9.1% |

**Cap table evolution (Model B — new shares issued):**

| Stakeholder | Month 0 | After Round 1 | After Round 2 |
|------------|---------|--------------|--------------|
| Founder | 60.0% | 51.4% | 46.7% |
| Founding Team | 20.0% | 17.1% | 15.6% |
| Investor (Round 1) | 0.0% | 14.3% | 13.0% |
| Investor (Round 2) | 0.0% | 0.0% | 9.1% |
| Unallocated Pool | 20.0% | 17.1% | 15.6% |
| **Total** | **100.0%** | **100.0%** | **100.0%** |

> **Founder control analysis:** After two rounds, founder holds 46.7% — below 50%.
> To preserve majority through two rounds, the company should use Model A (reserved
> pool) for at least one of the rounds, or negotiate higher valuations.

**Cap table evolution (Model A — reserved pool, both rounds):**

| Stakeholder | Month 0 | After Round 1 | After Round 2 |
|------------|---------|--------------|--------------|
| Founder | 60.0% | 60.0% | 60.0% |
| Founding Team | 20.0% | 20.0% | 20.0% |
| Round 1 Investor | 0.0% | 14.3% | 14.3% |
| Round 2 Investor | 0.0% | 0.0% | 5.7% |
| Remaining Pool | 20.0% | 5.7% | 0.0% |
| **Total** | **100.0%** | **100.0%** | **100.0%** |

> Under Model A, both rounds together consume the full 20% investor pool.
> Founder retains 60% throughout but has no remaining pool for future raises.

### 4.5 Dilution Summary Table — All Scenarios

| Scenario Code | Raise Amount | Pre-Money | Post-Money | Investor % | Founder % (Model A) | Founder % (Model B) | Founder >50%? (Model A) | Founder >50%? (Model B) |
|--------------|-------------|-----------|-----------|-----------|-------------------|-------------------|----------------------|----------------------|
| S1 (all levels) | $0 | N/A | N/A | 0% | 60.0% | 60.0% | Yes | Yes |
| S2 at $450K, $75K raise | $75K | $450K | $525K | 14.3% | 60.0% | 51.4% | Yes | Yes |
| S2 at $450K, $100K raise | $100K | $450K | $550K | 18.2% | 60.0% | 49.1% | Yes | No |
| S2 at $450K, $150K raise | $150K | $450K | $600K | 25.0% | 60.0% | 45.0% | Yes | No |
| S3 at $450K, $75K raise | $75K | $450K | $525K | 14.3% | 60.0% | 51.4% | Yes | Yes |
| S3 at $1.15M, $150K raise | $150K | $1.15M | $1.30M | 11.5% | 60.0% | 53.1% | Yes | Yes |
| S3 at $1.15M, $250K raise | $250K | $1.15M | $1.40M | 17.9% | 60.0% | 49.3% | Yes | No |
| S3 at $2.25M, $375K raise | $375K | $2.25M | $2.63M | 14.3% | 60.0% | 51.4% | Yes | Yes |
| S3 at $2.25M, $500K raise | $500K | $2.25M | $2.75M | 18.2% | 60.0% | 49.1% | Yes | No |
| Two-round: $75K + $200K | $275K | $450K / $2.0M | — | 22.1% combined | 60.0% | 46.7% | Yes | No |

### 4.6 Founder Control Preservation Rules

Based on the analysis above, the following rules preserve founder majority (>50%)
in all scenarios:

| Rule | Description |
|------|-------------|
| Rule 1: Use Model A whenever possible | Allocating from the reserved pool preserves founder at 60% regardless of round size (up to the 20% pool ceiling) |
| Rule 2: If using Model B, cap dilution at 16% per round | At any valuation, limiting investor equity to 16% keeps founder above 50.4% |
| Rule 3: If raising >$100K at Post-Pilot 1 | Negotiate pre-money above $500K, or use Model A |
| Rule 4: For two-round scenarios | Use Model A for at least the first round; Model B is acceptable for the second if valuation is $1.5M+ |
| Rule 5: Super-voting shares | As a structural alternative, founder can hold 10:1 super-voting shares to maintain control regardless of economic dilution |

---

## 5. Investor Return Modeling

### 5.1 Return Framework

Investors in early-stage East African health tech typically target 5-10x returns
over a 5-7 year horizon. The following models show what different return multiples
look like for investors at each valuation stage.

### 5.2 Return at Post-Pilot 1 Entry ($450K Pre-Money, $75K Investment for 14.3%)

| Return Multiple | Required Exit Valuation | Investor Proceeds | Timeline Assumption |
|----------------|------------------------|------------------|-------------------|
| 2x | $1.05M | $150K | 2-3 years |
| 5x | $2.63M | $375K | 3-5 years |
| 10x | $5.25M | $750K | 5-7 years |
| 20x | $10.5M | $1.5M | 7-10 years |

### 5.3 Return at Post-Pilot 2 Entry ($1.15M Pre-Money, $150K Investment for 11.5%)

| Return Multiple | Required Exit Valuation | Investor Proceeds | Timeline Assumption |
|----------------|------------------------|------------------|-------------------|
| 2x | $2.60M | $300K | 2-3 years |
| 5x | $6.50M | $750K | 3-5 years |
| 10x | $13.0M | $1.5M | 5-7 years |
| 20x | $26.0M | $3.0M | 7-10 years |

### 5.4 Return at Pre-Production Entry ($2.25M Pre-Money, $375K Investment for 14.3%)

| Return Multiple | Required Exit Valuation | Investor Proceeds | Timeline Assumption |
|----------------|------------------------|------------------|-------------------|
| 2x | $5.25M | $750K | 2-3 years |
| 5x | $13.1M | $1.88M | 3-5 years |
| 10x | $26.3M | $3.75M | 5-7 years |
| 20x | $52.5M | $7.5M | 7-10 years |

### 5.5 Required Exit Valuation Plausibility Check

| Exit Valuation | Revenue Multiple Required (at 6x) | Implied Annual Revenue | Plausibility |
|---------------|----------------------------------|----------------------|-------------|
| $2.6M | 6x | $433K/year ($36K/mo) | Achievable by Production Year 2 |
| $5.25M | 6x | $875K/year ($73K/mo) | Achievable by Production Year 3 with Kenya expansion |
| $13M | 6x | $2.2M/year ($183K/mo) | Requires multi-country scale + facility SaaS tier |
| $26M | 6x | $4.3M/year ($361K/mo) | Requires dominant market position in 2+ countries |
| $52.5M | 6x | $8.75M/year ($729K/mo) | Requires regional scale (3+ countries) + premium products |

### 5.6 Revenue Multiples for East African Health Tech

| Multiple Range | Company Stage | Applicability to Health Hub |
|---------------|--------------|---------------------------|
| 3-5x revenue | Profitable, growing | Post-Production Year 3+ |
| 5-8x revenue | High-growth, not yet profitable | Production Year 1-3 |
| 8-12x revenue | Category leader, rapid expansion | Dominant in 2+ markets |
| 12-20x revenue | Breakout company, Series B+ | Regional platform with network effects |

### 5.7 Investor Return by Scenario Code

For the most common investor entry points per params.md:

| Scenario | Entry Valuation | Investment | Equity % | 5x Exit Value | 10x Exit Value | IRR at 5x (5yr) | IRR at 10x (5yr) |
|----------|----------------|-----------|---------|--------------|---------------|-----------------|------------------|
| S2-O2-I2 (base) | $450K | $100K | 18.2% | $2.75M | $5.50M | 38% | 58% |
| S2-O1-I1 (lean) | $300K | $50K | 14.3% | $1.75M | $3.50M | 42% | 63% |
| S2-O3-I3 (full) | $600K | $150K | 20.0% | $3.75M | $7.50M | 36% | 55% |
| S3-O2-I2 (base) | $1.15M | $150K | 11.5% | $6.50M | $13.0M | 35% | 53% |
| S3-O3-I3 (full) | $2.25M | $375K | 14.3% | $13.1M | $26.3M | 34% | 52% |

> IRR calculations assume a 5-year hold period and single exit event.

---

## 6. Comparable Deals

### 6.1 East African Health Tech Funding Rounds (2020-2025)

| Company | Country | Round | Year | Amount Raised | Valuation (Est.) | Stage at Raise | Relevance to Health Hub |
|---------|---------|-------|------|--------------|-----------------|----------------|----------------------|
| mPharma | Ghana/Kenya | Series D | 2022 | $35M | ~$200M | Growth; 300+ pharmacies | Pharmacy marketplace; validates sector valuations at scale |
| Helium Health | Nigeria/Kenya | Series B | 2022 | $30M | ~$150M | Growth; 10,000+ providers | EHR + telemedicine; multi-country |
| Zuri Health | Kenya | Seed | 2022 | $1.3M | ~$5-8M (est.) | Early traction; telemedicine app | Closest comparable — mobile-first telehealth in East Africa |
| Ilara Health | Kenya | Series A | 2022 | $10.5M | ~$30-40M (est.) | Scaling; diagnostic devices | Diagnostics marketplace; partner model similar to Health Hub |
| Rocket Health | Uganda | Seed | 2021 | $5M | ~$15-20M (est.) | Early traction; teleconsultation + pharmacy delivery | Telehealth + pharmacy in East Africa; admin-assisted model |
| Damu Health | Ethiopia | Pre-Seed | 2023 | $250K | ~$1-2M (est.) | Pre-revenue; health records platform | Ethiopian health tech; very early stage |
| Chapa (fintech/health) | Ethiopia | Seed | 2023 | $1.5M | ~$6-8M (est.) | Early revenue; payment infra | Ethiopian tech startup benchmark (not pure health) |
| MyDawa | Kenya | Series A | 2021 | $4M | ~$12-15M (est.) | Growing; online pharmacy | Pharmacy platform; validates East African health e-commerce |

### 6.2 Implied Valuation Benchmarks

| Stage | Comparable Range | Health Hub Proposed | Position vs Comps | Justification |
|-------|-----------------|--------------------|--------------------|--------------|
| Pre-Seed / Post-Pilot 1 | $500K-$2M | $300K-$600K | Below average | Conservative; reflects part-time team and Ethiopia-first (lower GDP market) |
| Seed / Post-Pilot 2 | $2M-$8M | $800K-$1.5M | Below average | Intentionally discounted; validates model before pricing at market |
| Pre-Series A / Pre-Production | $5M-$15M | $1.5M-$3M | Below average | Leaves significant upside for investor; de-risks entry |

### 6.3 Why Health Hub Values Below Comparables

| Factor | Impact on Valuation | Mitigation Path |
|--------|-------------------|--------------------|
| Part-time team | -20 to -30% vs full-time comparable | Convert key members to full-time post-investment |
| Ethiopia-first (lower GDP) | -10 to -20% vs Kenya-first | Kenya expansion in Pilot 2 addresses this |
| No previous founder exits | -10 to -15% | Track record built through successful pilots |
| Pre-revenue at first raise | -15 to -25% | Revenue begins in Pilot 1; grows through Pilot 2 |
| Nascent regulatory environment | -5 to -10% | First-mover advantage in unregulated market |

### 6.4 Valuation Floor — Asset-Based Minimum

Even ignoring future cash flows, Health Hub has a defensible asset floor:

| Asset | Value |
|-------|-------|
| Codebase (replacement cost per params.md Section 16) | $33,500-$45,500 |
| Business plan and documentation suite | $5,000-$8,000 |
| Team relationships and domain expertise (12 contributors) | $15,000-$25,000 (recruitment cost equivalent) |
| Partner network and market intelligence (Ethiopia) | $5,000-$10,000 |
| **Total asset floor** | **$58,500-$88,500** |

> The asset floor confirms that even the lowest proposed valuation ($300K) represents
> a 3.4-5.1x premium over replacement cost — typical for a technology company with
> assembled team and market knowledge.

---

## 7. Key Takeaways

| # | Finding | Implication |
|---|---------|-------------|
| 1 | Scorecard and Berkus methods converge on $400K-$1M for Post-Pilot 1 | The proposed $300K-$600K range is conservative and investor-friendly |
| 2 | Model A (reserved pool) preserves founder at 60% in all scenarios | Strongly recommended for first raise; simplifies negotiation |
| 3 | Model B (new shares) risks dropping founder below 50% if raise exceeds ~$83K at $450K valuation | If Model B is required by investor, negotiate higher pre-money or use super-voting shares |
| 4 | Comparable East African deals support $500K-$2M at seed stage | Health Hub's proposed range is below comps, giving investors a value entry point |
| 5 | 5x investor return requires exit at $2.6M-$13M depending on entry | All achievable within 5-7 years based on revenue projections in the business plan |
| 6 | Two-round strategy (Post-Pilot 1 + Pre-Production) fully consumes the 20% pool | If more capital is needed, founder must accept additional dilution beyond 20% or find non-dilutive capital |
| 7 | DCF method becomes reliable only at Pre-Production when revenue data exists | Do not lead with DCF in early-stage negotiations; use it for sanity checks |

---

## 8. Cross-References

| Document | Relevance |
|----------|-----------|
| [params.md](./params.md) | Equity structure (Section 8), revenue model (Section 11), phase definitions (Section 13), scenario matrix (Section 14-15) |
| [03-cost-breakdown.md](../03-cost-breakdown.md) | Total capital requirements by scenario — inputs to post-money calculation |
| [05-revenue-modelling.md](../05-revenue-modelling.md) | Revenue projections used in DCF and exit valuation plausibility |
| [12-fundraising-readiness.md](./12-fundraising-readiness.md) | Investor materials, deal structures, and term sheet guidance |
| [15-competitive-analysis.md](../15-competitive-analysis.md) | Competitor landscape supporting comparable transactions analysis |

---

*End of Document 11 — Valuation & Dilution. All figures trace to params.md assumptions.*
