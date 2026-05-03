# 07 — ROI Analysis

**Health Hub Business Plan v2 | Return on Investment Analysis**
**Version:** 2.0 | **Date:** March 2026

> All assumptions, cost figures, revenue projections, and scenario definitions in
> this document trace back to [params.md](./params.md). Revenue trajectories
> reference [05-revenue-modelling](../05-revenue-modelling.md) and cost data
> references [03-cost-breakdown](../03-cost-breakdown.md). Where a number appears
> without inline citation, it is derived from those sources.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Methodology](#2-methodology)
3. [Investment Totals by Scenario](#3-investment-totals-by-scenario)
4. [Revenue Projections Summary](#4-revenue-projections-summary)
5. [Break-Even Analysis](#5-break-even-analysis)
6. [ROI by Scenario Family](#6-roi-by-scenario-family)
7. [Payback Period Analysis](#7-payback-period-analysis)
8. [Sensitivity Analysis](#8-sensitivity-analysis)
9. [Non-Financial ROI](#9-non-financial-roi)
10. [Key Takeaways](#10-key-takeaways)

---

## 1. Executive Summary

This document presents a comprehensive return-on-investment analysis for Health
Hub across all 21 scenario combinations defined in params.md. The analysis is
designed for a pre-revenue health technology startup targeting East Africa
(Ethiopia first, Kenya second) and therefore differs from traditional ROI
frameworks in several important ways:

- **No historical revenue baseline exists.** All revenue figures are forward
  projections based on bottom-up user modelling and top-down market sizing.
- **Capital investment is a mix of economic cost and cash outlay.** Founder labor
  is counted at market-equivalent rates ($10-$20/hr per params.md), not at zero.
- **The time horizon matters more than a single ROI number.** A 36-month view is
  required because revenue collection does not begin until Pilot 2 (Month 5-10
  depending on path), and cumulative crossover occurs even later.

### Key Findings

| Finding | Detail |
|---------|--------|
| Highest capital-efficiency ROI at M24 | S1-L3 (self-funded, fully resourced): 92% cumulative Rev/CapEx ratio |
| Fastest absolute payback (investor paths) | S3-L3-I1 and S3-L2-I1: success metric reached at M18-M22 |
| Baseline plan (S2-O2-I2) ROI at M36 | Projected 170-220% cumulative ROI for combined capital |
| Best risk-adjusted path | S3-O2-I2: 20-month timeline, $215K total capital, strong growth curve |
| Paths to avoid | S2-O1-I3 and S3-O1-I3: large capital sits idle during slow L1 development |
| Investor IRR range (36-month) | 15-85% depending on scenario, with S3-L3-I2 offering the best investor-specific return |
| Founder ROI advantage | Self-funded paths (S1) deliver highest percentage ROI but lowest absolute returns |

### Framework for Reading This Document

ROI is presented across three return horizons for each scenario family:

- **12 months post-production launch** — early traction signal
- **24 months post-production launch** — medium-term validation
- **36 months post-production launch** — strategic return horizon

For investor-involved scenarios (S2 and S3), founder ROI and investor ROI are
tracked separately because their capital enters at different times, at different
amounts, and their ownership stakes differ.

---

## 2. Methodology

### 2.1 ROI Formula

The primary ROI calculation used throughout this document:

```
ROI = (Cumulative Revenue - Cumulative Investment) / Cumulative Investment x 100%
```

Where:
- **Cumulative Revenue** = total platform revenue collected from all streams
  (GP consults, specialist consults, pharmacy commissions, diagnostics commissions,
  platform fees, subscriptions) from project start through the measurement date.
- **Cumulative Investment** = total capital deployed (founder capital + investor
  capital where applicable) through the measurement date.

### 2.2 Dual ROI Tracking

For scenarios involving outside investors (S2 and S3), two separate ROI
calculations are maintained:

**Founder ROI:**
```
Founder ROI = (Founder Share of Cumulative Revenue - Founder Capital Invested) / Founder Capital Invested x 100%
```

Where "Founder Share of Cumulative Revenue" is the founder's pro-rata equity
percentage (60% in S1, 55-60% in S2/S3 per params.md Section 8.3) multiplied
by cumulative revenue. This is a simplification that assumes revenue accrues to
equity holders proportionally — in practice, founder returns would be realized
through salary, dividends, or exit events.

**Investor ROI:**
```
Investor ROI = (Investor Share of Cumulative Revenue - Investor Capital) / Investor Capital x 100%
```

Where "Investor Share of Cumulative Revenue" is the investor's equity percentage
(10-20% drawn from the investor pool per params.md Section 8.2) multiplied by
cumulative revenue.

### 2.3 Economic Cost vs Cash ROI

This document calculates ROI against **economic cost** (full market-value cost
of all labor, infrastructure, and operations) rather than cash-only spend. This
is the conservative approach because:

- It produces lower ROI numbers than cash-only analysis
- It reflects the true cost of building the business, including founder sweat equity
- It is the basis investors will use to evaluate the opportunity

Per params.md, the total economic cost ranges from $230,522 (S3-O3-I3) to
$451,751 (S1-L1), while founder capital (cash deployed) ranges from $95,000
to $240,000.

### 2.4 Revenue Attribution

Revenue is attributed to the period in which it is collected. Per the revenue
model (05-revenue-modelling):

- **Pre-Pilot and Pilot 1:** $0 revenue (free or symbolic pricing)
- **Pilot 2:** Revenue at 50% of target pricing, beginning Month 5-10 depending on path
- **Production:** Revenue at full pricing, beginning Month 9-22 depending on path
- **Post-Production extension (Year 3+):** Projected based on 15% monthly growth
  rate (moderate assumption) with 7% monthly churn

### 2.5 Important Caveats

1. All revenue projections use the **moderate** assumption set unless otherwise
   stated. Conservative and optimistic bounds are provided in the sensitivity
   analysis (Section 8).
2. ROI calculations do not account for the time value of money. A discounted
   ROI analysis would reduce all figures by approximately 10-15% at a 10%
   discount rate over 36 months.
3. "Revenue" in this context means gross platform revenue before operating
   expenses. The platform's blended margin is 91-96% on B2C transactions
   (per 05-revenue-modelling), so net revenue closely tracks gross revenue.
4. Exit-based ROI (e.g., company sale or Series A valuation) is not modeled.
   The ROI figures here reflect organic revenue returns only.

---

## 3. Investment Totals by Scenario

### 3.1 Complete Investment Matrix — All 21 Combinations

| # | Code | Founder Capital | Investor Capital | Total Capital | Economic Cost | Timeline (Months) | Cash vs Economic Gap |
|---|------|----------------|-----------------|---------------|---------------|-------------------|---------------------|
| 1 | S1-L1 | $240,000 | $0 | $240,000 | $451,751 | 34 | $211,751 |
| 2 | S1-L2 | $185,000 | $0 | $185,000 | $353,794 | 26 | $168,794 |
| 3 | S1-L3 | $150,000 | $0 | $150,000 | $281,931 | 20 | $131,931 |
| 4 | S2-O1-I1 | $120,000 | $140,000 | $260,000 | $400,716 | 30 | $140,716 |
| 5 | S2-O1-I2 | $120,000 | $145,000 | $265,000 | $363,656 | 28 | $98,656 |
| 6 | S2-O1-I3 | $120,000 | $245,000 | $365,000 | $326,066 | 24 | -$38,934 |
| 7 | S2-O2-I1 | $110,000 | $135,000 | $245,000 | $382,548 | 28 | $137,548 |
| 8 | S2-O2-I2 | $110,000 | $120,000 | $230,000 | $331,570 | 24 | $101,570 |
| 9 | S2-O2-I3 | $110,000 | $240,000 | $350,000 | $307,898 | 22 | -$42,102 |
| 10 | S2-O3-I1 | $110,000 | $110,000 | $220,000 | $362,708 | 26 | $142,708 |
| 11 | S2-O3-I2 | $110,000 | $100,000 | $210,000 | $311,316 | 24 | $101,316 |
| 12 | S2-O3-I3 | $110,000 | $205,000 | $315,000 | $272,646 | 20 | -$42,354 |
| 13 | S3-O1-I1 | $95,000 | $150,000 | $245,000 | $349,636 | 26 | $104,636 |
| 14 | S3-O1-I2 | $95,000 | $140,000 | $235,000 | $297,910 | 24 | $62,910 |
| 15 | S3-O1-I3 | $95,000 | $255,000 | $350,000 | $258,804 | 20 | -$91,196 |
| 16 | S3-O2-I1 | $95,000 | $125,000 | $220,000 | $329,136 | 24 | $109,136 |
| 17 | S3-O2-I2 | $95,000 | $120,000 | $215,000 | $276,996 | 20 | $61,996 |
| 18 | S3-O2-I3 | $95,000 | $250,000 | $345,000 | $251,808 | 18 | -$93,192 |
| 19 | S3-O3-I1 | $95,000 | $105,000 | $200,000 | $308,804 | 22 | $108,804 |
| 20 | S3-O3-I2 | $95,000 | $100,000 | $195,000 | $256,250 | 20 | $61,250 |
| 21 | S3-O3-I3 | $95,000 | $225,000 | $320,000 | $230,522 | 16 | -$89,478 |

### 3.2 Reading the Cash vs Economic Gap

The "Cash vs Economic Gap" column shows the difference between total capital
deployed (cash) and the full economic cost of the business. A positive gap means
the economic cost exceeds cash invested — the difference is absorbed through
deferred founder compensation, friendly-network discounts, and sweat equity.
A negative gap means more cash is raised than the economic cost, providing
working capital runway beyond what is strictly needed for build-out.

### 3.3 Capital Intensity by Scenario Family

| Scenario Family | Avg Founder Capital | Avg Investor Capital | Avg Total Capital | Avg Economic Cost |
|----------------|--------------------|--------------------|------------------|------------------|
| S1 (self-funded, 3 paths) | $191,667 | $0 | $191,667 | $362,492 |
| S2 (investor at transition, 9 paths) | $113,333 | $160,000 | $273,333 | $339,914 |
| S3 (investor after Pilot 1, 9 paths) | $95,000 | $163,333 | $258,333 | $284,429 |

---

## 4. Revenue Projections Summary

### 4.1 Revenue Streams and Pricing Corridors

| Revenue Stream | Pilot 2 Price (50%) | Production Price (100%) | Margin |
|---------------|--------------------|-----------------------|--------|
| GP consultation | $1.50-$2.63 | $2.60-$5.25 | 89-94% |
| Specialist consultation | $2.63-$5.25 | $5.25-$10.50 | 94-96% |
| Pharmacy commission | 4-6% of order | 8-12% of order | 94-97% |
| Diagnostics commission | 5-7.5% of order | 10-15% of order | 94-97% |
| Video premium add-on | N/A | $1.15-$1.32/session | 86-92% |
| Lab facilitation | N/A | $1.15-$1.32/order | 94-97% |
| Rx coordination | N/A | $0.62-$0.70/order | 91-95% |
| Premium subscription | $2.31-$2.63/mo | $4.62-$5.26/mo | 78-88% |
| Facility platform fee | N/A | $52.63/mo | ~95% |
| Facility commission | N/A | 12% of consult fees | ~95% |

### 4.2 ARPU by Phase (Moderate Assumptions)

| Phase | ARPU/Active User/Month | Active User Definition |
|-------|----------------------|----------------------|
| Pilot 2 | $2.65 | 35% of registered users, net of 7% monthly churn |
| Production | $5.54 | 35% of registered users, net of 7% monthly churn |

### 4.3 Revenue Trajectory by Representative Path

The following table shows monthly revenue at key milestones for representative
paths within each scenario family. All figures in USD, moderate assumptions.

| Combo | M6 Rev | M9 Rev | M12 Rev | M15 Rev | M18 Rev | M21 Rev | M24 Rev | Cum Rev M24 |
|-------|--------|--------|---------|---------|---------|---------|---------|-------------|
| S1-L1 | $0 | $0 | $173 | $398 | $1,128 | $1,828 | $2,773 | $16,155 |
| S1-L2 | $124 | $317 | $1,167 | $1,955 | $3,048 | $4,541 | $6,484 | $45,525 |
| S1-L3 | $355 | $1,400 | $2,514 | $4,065 | $6,228 | $9,189 | $13,085 | $96,094 |
| S2-O2-I2 | $148 | $511 | $1,910 | $3,578 | $6,152 | $9,855 | $14,920 | $94,812 |
| S2-O3-I3 | $254 | $2,587 | $5,498 | $10,209 | $17,669 | $28,138 | $41,882 | $264,949 |
| S3-O2-I2 | $310 | $1,372 | $2,680 | $5,095 | $8,834 | $14,462 | $22,378 | $132,724 |
| S3-O3-I3 | $687 | $2,812 | $5,448 | $9,746 | $16,502 | $26,631 | $40,927 | $262,113 |

### 4.4 Revenue Comparison — All 21 Combinations at M24

| # | Code | Monthly Rev M12 | Monthly Rev M18 | Monthly Rev M24 | Cum Rev M24 | CapEx M24 |
|---|------|----------------|----------------|----------------|-------------|-----------|
| 1 | S1-L1 | $173 | $1,128 | $2,773 | $16,155 | $12,500 |
| 2 | S1-L2 | $1,167 | $3,048 | $6,484 | $45,525 | $25,000 |
| 3 | S1-L3 | $2,514 | $6,228 | $13,085 | $96,094 | $50,000 |
| 4 | S2-O1-I1 | $275 | $2,054 | $5,543 | $33,908 | $54,500 |
| 5 | S2-O1-I2 | $483 | $3,599 | $10,602 | $62,596 | $117,500 |
| 6 | S2-O1-I3 | $603 | $5,432 | $17,669 | $107,579 | $255,000 |
| 7 | S2-O2-I1 | $1,452 | $4,581 | $10,143 | $72,316 | $57,500 |
| 8 | S2-O2-I2 | $1,910 | $6,152 | $14,920 | $94,812 | $126,500 |
| 9 | S2-O2-I3 | $3,383 | $12,959 | $35,076 | $233,280 | $260,000 |
| 10 | S2-O3-I1 | $2,835 | $7,271 | $14,679 | $105,399 | $85,000 |
| 11 | S2-O3-I2 | $3,761 | $11,127 | $24,213 | $163,062 | $146,000 |
| 12 | S2-O3-I3 | $5,498 | $17,669 | $41,882 | $264,949 | $274,000 |
| 13 | S3-O1-I1 | $1,405 | $4,118 | $9,152 | $61,256 | $59,500 |
| 14 | S3-O1-I2 | $2,319 | $7,658 | $19,632 | $116,967 | $126,000 |
| 15 | S3-O1-I3 | $4,058 | $14,006 | $36,386 | $209,204 | $264,000 |
| 16 | S3-O2-I1 | $1,818 | $5,271 | $11,729 | $76,655 | $62,500 |
| 17 | S3-O2-I2 | $2,680 | $8,834 | $22,378 | $132,724 | $129,500 |
| 18 | S3-O2-I3 | $5,039 | $17,669 | $44,494 | $266,975 | $270,000 |
| 19 | S3-O3-I1 | $2,835 | $7,271 | $15,213 | $103,519 | $70,000 |
| 20 | S3-O3-I2 | $4,541 | $14,006 | $32,720 | $199,342 | $138,000 |
| 21 | S3-O3-I3 | $5,448 | $16,502 | $40,927 | $262,113 | $270,000 |

---

## 5. Break-Even Analysis

### 5.1 Definition of Break-Even Milestones

Three distinct break-even points are tracked for each combination:

1. **First Revenue Month (FRM):** The month in which the platform collects its
   first non-zero revenue. This occurs at the start of Pilot 2 when 50% pricing
   is activated.
2. **Monthly Cash-Flow Positive (MCFP):** The month in which monthly revenue
   first exceeds monthly burn rate (operating expenses for that month).
3. **Cumulative Break-Even (CBE):** The month in which cumulative total revenue
   first exceeds cumulative total capital invested. This is the primary success
   metric defined in params.md Section 12.

### 5.2 Break-Even Milestones — S1 (Self-Funded)

| Code | First Revenue Month | Monthly Burn at FRM | Monthly Rev > Monthly Burn | Cumulative Break-Even |
|------|--------------------|--------------------|---------------------------|----------------------|
| S1-L1 | M10 | $13,379/mo | M18 ($6,307 rev vs $13,379 burn) — not yet; projected M28-M30 | M30-M36 |
| S1-L2 | M6 | $11,832/mo | M13 ($6,643 rev vs $13,711 burn) — not yet; projected M21-M23 | M22-M24 |
| S1-L3 | M5 | $13,918/mo | M9 ($1,400 rev vs $15,191 burn) — not yet; projected M15-M17 | M14-M16 |

Note: For S1 scenarios, the monthly burn rate during Pilot 2 and Production
includes founder-office cost ($5,200/mo), employed ops staff ($2,482-$6,542/mo),
infrastructure ($270-$1,500/mo), and ongoing development. Revenue must surpass
this entire monthly cost stack to achieve MCFP.

### 5.3 Break-Even Milestones — S2 (Investor During Transition)

| Code | First Revenue Month | Investor Arrival | Monthly Rev > Monthly Burn | Cumulative Break-Even |
|------|--------------------|-----------------|-----------------------------|----------------------|
| S2-O1-I1 | M10 | M9 | M26-M28 | M28-M32 |
| S2-O1-I2 | M10 | M9 | M22-M24 | M30-M34 |
| S2-O1-I3 | M10 | M9 | M18-M20 | M30-M36 |
| S2-O2-I1 | M6 | M7 | M20-M22 | M22-M26 |
| S2-O2-I2 | M6 | M7 | M18-M20 | M26-M30 |
| S2-O2-I3 | M6 | M7 | M14-M16 | M24-M28 |
| S2-O3-I1 | M5 | M6 | M15-M17 | M20-M24 |
| S2-O3-I2 | M5 | M6 | M13-M15 | M22-M24 |
| S2-O3-I3 | M5 | M6 | M10-M12 | M22-M26 |

### 5.4 Break-Even Milestones — S3 (Investor After Pilot 1)

| Code | First Revenue Month | Investor Arrival | Monthly Rev > Monthly Burn | Cumulative Break-Even |
|------|--------------------|-----------------|-----------------------------|----------------------|
| S3-O1-I1 | M6 | M3 | M20-M22 | M22-M26 |
| S3-O1-I2 | M5 | M3 | M16-M18 | M24-M28 |
| S3-O1-I3 | M5 | M3 | M13-M15 | M26-M30 |
| S3-O2-I1 | M5 | M3 | M18-M20 | M18-M22 |
| S3-O2-I2 | M5 | M3 | M15-M17 | M24-M26 |
| S3-O2-I3 | M5 | M3 | M11-M13 | M24-M26 |
| S3-O3-I1 | M5 | M3 | M15-M17 | M18-M22 |
| S3-O3-I2 | M5 | M3 | M12-M14 | M22-M24 |
| S3-O3-I3 | M5 | M3 | M10-M12 | M24-M25 |

### 5.5 Break-Even Summary Heat Map

The following table ranks all 21 combinations by cumulative break-even speed,
from fastest to slowest:

| Rank | Code | CBE Month Range | Total Capital at CBE | Category |
|------|------|----------------|---------------------|----------|
| 1 | S1-L3 | M14-M16 | $30,000-$34,000 | Fastest: low capital, fast build |
| 2 | S1-L2 | M16-M18 | $17,000-$19,000 | Fast: very low capital base |
| 3 | S3-O2-I1 | M18-M22 | $52,000-$62,500 | Fast: modest investor, good pace |
| 4 | S3-O3-I1 | M18-M22 | $54,000-$67,500 | Fast: full bridge, modest investor |
| 5 | S2-O3-I1 | M20-M24 | $67,000-$85,000 | Good: strong self-fund, small investor |
| 6 | S1-L1 | M22-M24 | $11,500-$12,500 | Good: tiny capital base, slow growth |
| 7 | S2-O2-I1 | M22-M26 | $49,000-$57,500 | Good: moderate total capital |
| 8 | S2-O3-I2 | M22-M24 | $122,000-$146,000 | Good: strong growth overcomes CapEx |
| 9 | S3-O1-I1 | M22-M26 | $49,000-$59,500 | Moderate: constrained start |
| 10 | S3-O3-I2 | M22-M24 | $120,000-$138,000 | Moderate: high growth |
| 11 | S2-O3-I3 | M22-M26 | $242,000-$274,000 | Moderate: massive revenue overcomes massive CapEx |
| 12 | S3-O2-I2 | M24-M26 | $114,500-$129,500 | Moderate: baseline investor path |
| 13 | S3-O3-I3 | M24-M25 | $268,000-$270,000 | Moderate: maximum scenario, near M24 crossover |
| 14 | S3-O2-I3 | M24-M26 | $253,000-$270,000 | Moderate: heavy investor |
| 15 | S3-O1-I2 | M24-M28 | $112,000-$126,000 | Slower: constrained start, moderate investor |
| 16 | S2-O2-I2 | M26-M30 | $119,000-$126,500 | Slower: baseline plan |
| 17 | S3-O1-I3 | M26-M30 | $243,000-$264,000 | Slower: large CapEx from weak base |
| 18 | S2-O1-I1 | M28-M32 | $50,500-$54,500 | Slow: constrained both sides |
| 19 | S2-O1-I2 | M30-M34 | $108,000-$117,500 | Slow: late revenue start |
| 20 | S2-O1-I3 | M30-M36 | $240,000-$255,000 | Slowest: large capital, late revenue |
| 21 | S1-L1 (extended) | M30-M36 | $15,500-$18,500 | Slowest by elapsed time |

---

## 6. ROI by Scenario Family

### 6.1 S1 — Self-Funded (3 Paths)

In self-funded scenarios, founder ROI is the only relevant metric. The founder
bears 100% of the economic cost and retains 60% equity (with 20% held by the
founding team and 20% reserved but unissued).

ROI is measured at 12, 24, and 36 months after production launch begins
(not from project start).

#### S1 Production Launch Timing

| Code | Production Starts | M+12 Post-Prod | M+24 Post-Prod | M+36 Post-Prod |
|------|------------------|----------------|----------------|----------------|
| S1-L1 | M22 | M34 | M46 | M58 |
| S1-L2 | M16 | M28 | M40 | M52 |
| S1-L3 | M12 | M24 | M36 | M48 |

#### S1 ROI at Post-Production Milestones

| Code | Founder Capital | Cum Rev at Prod+12 | Cum Rev at Prod+24 | Cum Rev at Prod+36 | ROI at Prod+12 | ROI at Prod+24 | ROI at Prod+36 |
|------|----------------|-------------------|-------------------|-------------------|----------------|----------------|----------------|
| S1-L1 | $240,000 | $53,399 | $175,000-$210,000 | $380,000-$460,000 | -78% | -27% to -12% | +58% to +92% |
| S1-L2 | $185,000 | $65,246 | $195,000-$240,000 | $420,000-$520,000 | -65% | +5% to +30% | +127% to +181% |
| S1-L3 | $150,000 | $96,094 | $290,000-$360,000 | $620,000-$780,000 | -36% | +93% to +140% | +313% to +420% |

#### S1 Interpretation

- **S1-L1** is the slowest path. Its 34-month build timeline means that even
  12 months post-production, cumulative revenue is still well below cumulative
  founder investment. Positive ROI does not arrive until approximately 30 months
  post-production (Month 52 from project start). However, the capital base is
  the lowest ($240,000), so the downside risk is also the lowest.

- **S1-L2** is the balanced self-funded path. It reaches positive ROI around
  18-24 months post-production. By Year 3 post-production (Month 40+), ROI
  reaches 127-181%, delivering a solid return for founder patience.

- **S1-L3** delivers the strongest percentage ROI among all S1 paths. The
  accelerated timeline means revenue compounds earlier and longer. By 36 months
  post-production, the founder has generated $620K-$780K in cumulative revenue
  against a $150K investment — a 313-420% ROI.

### 6.2 S2 — Investor During Transition (9 Paths)

In S2 scenarios, the founder self-funds through Pre-Pilot and Pilot 1, then an
investor arrives during the Pilot 1 to Pilot 2 transition. Founder and investor
ROI are tracked separately.

**Equity assumptions for S2 (per params.md Section 8.3):**
- Founder retains 55-60% post-raise
- Founding team retains 18-20% post-raise
- Investor receives 15-20% from the investor pool

For modeling purposes, we use: Founder 58%, Founding Team 19%, Investor 18%
(midpoint of ranges), with the remaining 5% reserved.

#### S2 Founder ROI (at 24mo and 36mo post-production launch)

| Code | Founder Capital | Founder Equity | Cum Rev Prod+24 | Founder Share Prod+24 | Founder ROI Prod+24 | Cum Rev Prod+36 | Founder Share Prod+36 | Founder ROI Prod+36 |
|------|----------------|---------------|----------------|----------------------|--------------------|-----------------|-----------------------|---------------------|
| S2-O1-I1 | $120,000 | 58% | $130,000-$160,000 | $75,400-$92,800 | -37% to -23% | $310,000-$400,000 | $179,800-$232,000 | +50% to +93% |
| S2-O1-I2 | $120,000 | 58% | $210,000-$260,000 | $121,800-$150,800 | +2% to +26% | $480,000-$600,000 | $278,400-$348,000 | +132% to +190% |
| S2-O1-I3 | $120,000 | 58% | $350,000-$430,000 | $203,000-$249,400 | +69% to +108% | $780,000-$980,000 | $452,400-$568,400 | +277% to +374% |
| S2-O2-I1 | $110,000 | 58% | $220,000-$270,000 | $127,600-$156,600 | +16% to +42% | $500,000-$620,000 | $290,000-$359,600 | +164% to +227% |
| S2-O2-I2 | $110,000 | 58% | $300,000-$370,000 | $174,000-$214,600 | +58% to +95% | $680,000-$850,000 | $394,400-$493,000 | +259% to +348% |
| S2-O2-I3 | $110,000 | 58% | $600,000-$750,000 | $348,000-$435,000 | +216% to +295% | $1,200,000-$1,500,000 | $696,000-$870,000 | +533% to +691% |
| S2-O3-I1 | $110,000 | 58% | $310,000-$390,000 | $179,800-$226,200 | +63% to +106% | $680,000-$850,000 | $394,400-$493,000 | +259% to +348% |
| S2-O3-I2 | $110,000 | 58% | $470,000-$580,000 | $272,600-$336,400 | +148% to +206% | $1,020,000-$1,280,000 | $591,600-$742,400 | +438% to +575% |
| S2-O3-I3 | $110,000 | 58% | $730,000-$910,000 | $423,400-$527,800 | +285% to +380% | $1,500,000-$1,900,000 | $870,000-$1,102,000 | +691% to +902% |

#### S2 Investor ROI (at 24mo and 36mo post-production launch)

| Code | Investor Capital | Investor Equity | Investor Share Prod+24 | Investor ROI Prod+24 | Investor Share Prod+36 | Investor ROI Prod+36 |
|------|-----------------|----------------|----------------------|---------------------|-----------------------|---------------------|
| S2-O1-I1 | $140,000 | 18% | $23,400-$28,800 | -83% to -79% | $55,800-$72,000 | -60% to -49% |
| S2-O1-I2 | $145,000 | 18% | $37,800-$46,800 | -74% to -68% | $86,400-$108,000 | -40% to -26% |
| S2-O1-I3 | $245,000 | 18% | $63,000-$77,400 | -74% to -68% | $140,400-$176,400 | -43% to -28% |
| S2-O2-I1 | $135,000 | 18% | $39,600-$48,600 | -71% to -64% | $90,000-$111,600 | -33% to -17% |
| S2-O2-I2 | $120,000 | 18% | $54,000-$66,600 | -55% to -45% | $122,400-$153,000 | +2% to +28% |
| S2-O2-I3 | $240,000 | 18% | $108,000-$135,000 | -55% to -44% | $216,000-$270,000 | -10% to +13% |
| S2-O3-I1 | $110,000 | 18% | $55,800-$70,200 | -49% to -36% | $122,400-$153,000 | +11% to +39% |
| S2-O3-I2 | $100,000 | 18% | $84,600-$104,400 | -15% to +4% | $183,600-$230,400 | +84% to +130% |
| S2-O3-I3 | $205,000 | 18% | $131,400-$163,800 | -36% to -20% | $270,000-$342,000 | +32% to +67% |

### 6.3 S3 — Investor After Pilot 1 (9 Paths)

In S3 scenarios, the founder self-funds only through Pre-Pilot and into Pilot 1
(0-3 months of self-funding). The investor arrives right after Pilot 1 completes,
funding Pilot 2 and Production.

**Equity assumptions for S3 (per params.md Section 8.3):**
- Founder retains 52-58% post-raise
- Founding team retains 17-19% post-raise
- Investor receives 18-20% from the investor pool

For modeling purposes, we use: Founder 55%, Founding Team 18%, Investor 19%
(midpoint reflecting slightly higher investor leverage in S3 due to earlier entry).

#### S3 Founder ROI (at 24mo and 36mo post-production launch)

| Code | Founder Capital | Founder Equity | Cum Rev Prod+24 | Founder Share Prod+24 | Founder ROI Prod+24 | Cum Rev Prod+36 | Founder Share Prod+36 | Founder ROI Prod+36 |
|------|----------------|---------------|----------------|----------------------|--------------------|-----------------|-----------------------|---------------------|
| S3-O1-I1 | $95,000 | 55% | $200,000-$250,000 | $110,000-$137,500 | +16% to +45% | $460,000-$580,000 | $253,000-$319,000 | +166% to +236% |
| S3-O1-I2 | $95,000 | 55% | $370,000-$460,000 | $203,500-$253,000 | +114% to +166% | $800,000-$1,000,000 | $440,000-$550,000 | +363% to +479% |
| S3-O1-I3 | $95,000 | 55% | $600,000-$750,000 | $330,000-$412,500 | +247% to +334% | $1,250,000-$1,560,000 | $687,500-$858,000 | +624% to +803% |
| S3-O2-I1 | $95,000 | 55% | $250,000-$310,000 | $137,500-$170,500 | +45% to +79% | $560,000-$700,000 | $308,000-$385,000 | +224% to +305% |
| S3-O2-I2 | $95,000 | 55% | $410,000-$510,000 | $225,500-$280,500 | +137% to +195% | $900,000-$1,120,000 | $495,000-$616,000 | +421% to +548% |
| S3-O2-I3 | $95,000 | 55% | $740,000-$920,000 | $407,000-$506,000 | +328% to +433% | $1,500,000-$1,880,000 | $825,000-$1,034,000 | +768% to +988% |
| S3-O3-I1 | $95,000 | 55% | $310,000-$390,000 | $170,500-$214,500 | +79% to +126% | $680,000-$850,000 | $374,000-$467,500 | +294% to +392% |
| S3-O3-I2 | $95,000 | 55% | $580,000-$720,000 | $319,000-$396,000 | +236% to +317% | $1,250,000-$1,560,000 | $687,500-$858,000 | +624% to +803% |
| S3-O3-I3 | $95,000 | 55% | $750,000-$930,000 | $412,500-$511,500 | +334% to +438% | $1,550,000-$1,940,000 | $852,500-$1,067,000 | +797% to +1023% |

#### S3 Investor ROI (at 24mo and 36mo post-production launch)

| Code | Investor Capital | Investor Equity | Investor Share Prod+24 | Investor ROI Prod+24 | Investor Share Prod+36 | Investor ROI Prod+36 |
|------|-----------------|----------------|----------------------|---------------------|-----------------------|---------------------|
| S3-O1-I1 | $150,000 | 19% | $38,000-$47,500 | -75% to -68% | $87,400-$110,200 | -42% to -27% |
| S3-O1-I2 | $140,000 | 19% | $70,300-$87,400 | -50% to -38% | $152,000-$190,000 | +9% to +36% |
| S3-O1-I3 | $255,000 | 19% | $114,000-$142,500 | -55% to -44% | $237,500-$296,400 | -7% to +16% |
| S3-O2-I1 | $125,000 | 19% | $47,500-$58,900 | -62% to -53% | $106,400-$133,000 | -15% to +6% |
| S3-O2-I2 | $120,000 | 19% | $77,900-$96,900 | -35% to -19% | $171,000-$212,800 | +43% to +77% |
| S3-O2-I3 | $250,000 | 19% | $140,600-$174,800 | -44% to -30% | $285,000-$357,200 | +14% to +43% |
| S3-O3-I1 | $105,000 | 19% | $58,900-$74,100 | -44% to -29% | $129,200-$161,500 | +23% to +54% |
| S3-O3-I2 | $100,000 | 19% | $110,200-$136,800 | +10% to +37% | $237,500-$296,400 | +138% to +196% |
| S3-O3-I3 | $225,000 | 19% | $142,500-$176,700 | -37% to -21% | $294,500-$368,600 | +31% to +64% |

---

## 7. Payback Period Analysis

### 7.1 Definition

**Payback period** is the number of months from the time capital is deployed
until the cumulative revenue attributable to that stakeholder (based on their
equity share) equals their capital contribution.

For founders, the clock starts at M0 (project kickoff). For investors, the clock
starts at the month they deploy capital.

### 7.2 Founder Payback Period — All 21 Combinations

| # | Code | Founder Capital | Founder Equity Share | Months to Payback | Calendar Month |
|---|------|----------------|--------------------|--------------------|----------------|
| 1 | S1-L1 | $240,000 | 60% | 46-52 | M46-M52 |
| 2 | S1-L2 | $185,000 | 60% | 34-40 | M34-M40 |
| 3 | S1-L3 | $150,000 | 60% | 24-30 | M24-M30 |
| 4 | S2-O1-I1 | $120,000 | 58% | 36-42 | M36-M42 |
| 5 | S2-O1-I2 | $120,000 | 58% | 30-36 | M30-M36 |
| 6 | S2-O1-I3 | $120,000 | 58% | 24-28 | M24-M28 |
| 7 | S2-O2-I1 | $110,000 | 58% | 28-34 | M28-M34 |
| 8 | S2-O2-I2 | $110,000 | 58% | 24-30 | M24-M30 |
| 9 | S2-O2-I3 | $110,000 | 58% | 18-22 | M18-M22 |
| 10 | S2-O3-I1 | $110,000 | 58% | 22-28 | M22-M28 |
| 11 | S2-O3-I2 | $110,000 | 58% | 20-24 | M20-M24 |
| 12 | S2-O3-I3 | $110,000 | 58% | 16-20 | M16-M20 |
| 13 | S3-O1-I1 | $95,000 | 55% | 28-34 | M28-M34 |
| 14 | S3-O1-I2 | $95,000 | 55% | 22-26 | M22-M26 |
| 15 | S3-O1-I3 | $95,000 | 55% | 18-22 | M18-M22 |
| 16 | S3-O2-I1 | $95,000 | 55% | 24-28 | M24-M28 |
| 17 | S3-O2-I2 | $95,000 | 55% | 20-24 | M20-M24 |
| 18 | S3-O2-I3 | $95,000 | 55% | 16-18 | M16-M18 |
| 19 | S3-O3-I1 | $95,000 | 55% | 22-26 | M22-M26 |
| 20 | S3-O3-I2 | $95,000 | 55% | 18-22 | M18-M22 |
| 21 | S3-O3-I3 | $95,000 | 55% | 14-18 | M14-M18 |

### 7.3 Investor Payback Period — S2 and S3 Combinations

| # | Code | Investor Capital | Investor Equity | Investor Entry | Months to Payback (from entry) | Calendar Month |
|---|------|-----------------|----------------|---------------|-------------------------------|----------------|
| 4 | S2-O1-I1 | $140,000 | 18% | M9 | 40-48+ | M49-M57+ |
| 5 | S2-O1-I2 | $145,000 | 18% | M9 | 36-44 | M45-M53 |
| 6 | S2-O1-I3 | $245,000 | 18% | M9 | 36-44 | M45-M53 |
| 7 | S2-O2-I1 | $135,000 | 18% | M7 | 34-42 | M41-M49 |
| 8 | S2-O2-I2 | $120,000 | 18% | M7 | 28-36 | M35-M43 |
| 9 | S2-O2-I3 | $240,000 | 18% | M7 | 30-38 | M37-M45 |
| 10 | S2-O3-I1 | $110,000 | 18% | M6 | 26-34 | M32-M40 |
| 11 | S2-O3-I2 | $100,000 | 18% | M6 | 22-28 | M28-M34 |
| 12 | S2-O3-I3 | $205,000 | 18% | M6 | 26-32 | M32-M38 |
| 13 | S3-O1-I1 | $150,000 | 19% | M3 | 38-46 | M41-M49 |
| 14 | S3-O1-I2 | $140,000 | 19% | M3 | 30-36 | M33-M39 |
| 15 | S3-O1-I3 | $255,000 | 19% | M3 | 32-40 | M35-M43 |
| 16 | S3-O2-I1 | $125,000 | 19% | M3 | 30-36 | M33-M39 |
| 17 | S3-O2-I2 | $120,000 | 19% | M3 | 26-32 | M29-M35 |
| 18 | S3-O2-I3 | $250,000 | 19% | M3 | 28-34 | M31-M37 |
| 19 | S3-O3-I1 | $105,000 | 19% | M3 | 24-30 | M27-M33 |
| 20 | S3-O3-I2 | $100,000 | 19% | M3 | 20-26 | M23-M29 |
| 21 | S3-O3-I3 | $225,000 | 19% | M3 | 24-30 | M27-M33 |

### 7.4 Payback Period Key Findings

| Finding | Detail |
|---------|--------|
| Fastest founder payback | S3-O3-I3: 14-18 months (founder invests $95K, gets a fully funded operation that generates revenue fast) |
| Fastest investor payback | S3-O3-I2: 20-26 months from investor entry (investor puts in $100K for 19% equity in a well-funded, fast-growing operation) |
| Slowest founder payback | S1-L1: 46-52 months (long self-funded grind with slow revenue ramp) |
| Slowest investor payback | S2-O1-I1: 40-48+ months (investor enters late after slow build, revenue growth is modest) |
| Best investor capital efficiency | S2-O3-I2 and S3-O3-I2: $100K invested, payback in 20-28 months — the ideal "right-sized" investor |
| Worst investor capital efficiency | S2-O1-I3: $245K invested into a slow-build operation, payback 36-44 months |

---

## 8. Sensitivity Analysis

### 8.1 Scenario Definitions

ROI projections are stress-tested under three revenue assumption sets:

| Parameter | Pessimistic (50% Rev) | Baseline (100% Rev) | Optimistic (150% Rev) |
|-----------|----------------------|--------------------|--------------------|
| Revenue multiplier | 0.5x of moderate projection | 1.0x (moderate) | 1.5x of moderate projection |
| Monthly user growth | 7.5% | 15% | 22.5% |
| Active user rate | 17.5% of registered | 35% of registered | 52.5% of registered |
| ARPU (Production) | $2.77 | $5.54 | $8.31 |
| Monthly churn | 10% | 7% | 4% |

Costs are held constant across all three scenarios — the investment is already
committed regardless of revenue performance.

### 8.2 Sensitivity Matrix — S1 (Self-Funded) at M36 Post-Production

| Code | Pessimistic Cum Rev | Pessimistic ROI | Baseline Cum Rev | Baseline ROI | Optimistic Cum Rev | Optimistic ROI |
|------|--------------------|-----------------|-----------------|--------------|--------------------|----------------|
| S1-L1 | $95,000-$115,000 | -60% to -52% | $190,000-$230,000 | -21% to -4% | $285,000-$345,000 | +19% to +44% |
| S1-L2 | $210,000-$260,000 | +14% to +41% | $420,000-$520,000 | +127% to +181% | $630,000-$780,000 | +241% to +322% |
| S1-L3 | $310,000-$390,000 | +107% to +160% | $620,000-$780,000 | +313% to +420% | $930,000-$1,170,000 | +520% to +680% |

### 8.3 Sensitivity Matrix — S2 Representative Paths at M36 Post-Production (Combined ROI)

| Code | Pessimistic ROI | Baseline ROI | Optimistic ROI |
|------|----------------|-------------|----------------|
| S2-O1-I1 | -65% to -55% | -10% to +10% | +40% to +70% |
| S2-O2-I2 | -30% to -15% | +50% to +80% | +140% to +190% |
| S2-O3-I2 | +10% to +30% | +110% to +150% | +220% to +290% |
| S2-O3-I3 | +30% to +50% | +170% to +220% | +330% to +420% |

### 8.4 Sensitivity Matrix — S3 Representative Paths at M36 Post-Production (Combined ROI)

| Code | Pessimistic ROI | Baseline ROI | Optimistic ROI |
|------|----------------|-------------|----------------|
| S3-O1-I1 | -55% to -40% | +5% to +25% | +60% to +100% |
| S3-O2-I2 | -15% to +5% | +70% to +100% | +170% to +230% |
| S3-O3-I2 | +20% to +40% | +140% to +190% | +280% to +370% |
| S3-O3-I3 | +25% to +45% | +160% to +210% | +310% to +410% |

### 8.5 Sensitivity — Impact of Key Variables on Baseline (S2-O2-I2)

The following table isolates the impact of changing a single variable while
holding all others at baseline:

| Variable Changed | Direction | Impact on M36 Cumulative Revenue | Impact on Combined ROI |
|-----------------|-----------|--------------------------------|----------------------|
| ARPU +25% | Positive | +$85,000 to +$120,000 | +25 to +35 pp |
| ARPU -25% | Negative | -$85,000 to -$120,000 | -25 to -35 pp |
| Monthly growth rate +5pp | Positive | +$150,000 to +$200,000 | +45 to +60 pp |
| Monthly growth rate -5pp | Negative | -$100,000 to -$140,000 | -30 to -45 pp |
| Churn rate +3pp | Negative | -$70,000 to -$100,000 | -20 to -30 pp |
| Churn rate -3pp | Positive | +$90,000 to +$130,000 | +25 to +40 pp |
| Production launch delayed 3mo | Negative | -$50,000 to -$80,000 | -15 to -25 pp |
| Production launch accelerated 3mo | Positive | +$60,000 to +$90,000 | +18 to +28 pp |
| FX depreciation +10% | Negative | -$30,000 to -$50,000 | -10 to -15 pp |
| Facility onboarding +50% | Positive | +$40,000 to +$60,000 | +12 to +18 pp |

### 8.6 Breakeven Probability by Scenario (36-month window)

Based on the sensitivity ranges, the estimated probability of achieving
cumulative breakeven within 36 months of project start:

| Code | Pessimistic | Baseline | Optimistic |
|------|------------|----------|-----------|
| S1-L1 | 15% | 55% | 85% |
| S1-L2 | 60% | 90% | 98% |
| S1-L3 | 85% | 98% | >99% |
| S2-O2-I2 | 35% | 75% | 95% |
| S2-O3-I3 | 60% | 90% | 98% |
| S3-O2-I2 | 45% | 80% | 95% |
| S3-O3-I2 | 65% | 92% | 98% |
| S3-O3-I3 | 55% | 88% | 97% |

---

## 9. Non-Financial ROI

### 9.1 Strategic Value Assets

Beyond direct revenue returns, Health Hub generates strategic value that is
difficult to quantify in percentage terms but materially affects the company's
long-term positioning and exit potential.

#### Market Position Value

| Asset | Description | Strategic Significance |
|-------|-------------|----------------------|
| First-mover advantage in Ethiopia digital health | No established digital health marketplace exists in Ethiopia at scale | Regulatory relationships, clinic partnerships, and patient trust are defensible moats that take years to replicate |
| Multi-stakeholder platform architecture | Serves patients, GPs, specialists, pharmacies, diagnostics, and admins simultaneously | Network effects create exponential value — each new stakeholder type increases value for all others |
| Dual-country operating capability | Ethiopia + Kenya provides geographic diversification and proof of cross-border scalability | Significantly increases attractiveness for Series A investors who require evidence of market expansion |
| Regulatory pathway documentation | Compliance and regulatory documentation developed during Pre-Pilot and Pilot phases | Reduces time-to-market for subsequent country entries from 12-18 months to 6-8 months |

#### Data Asset Value

| Data Type | When Accumulated | Strategic Use |
|-----------|-----------------|--------------|
| Patient health interaction patterns | Pilot 1+ | AI triage development, predictive health, personalized care pathways |
| Facility utilization and capacity data | Pilot 2+ | Supply-side optimization, dynamic pricing, capacity planning |
| Treatment outcome tracking | Production+ | Evidence-based care protocols, quality scoring, outcomes-based contracting |
| Regional disease prevalence patterns | Production+ | Public health partnerships, insurance product design, pharmaceutical partnerships |
| Payment and affordability data | Pilot 2+ | Pricing optimization, micro-insurance product design, credit scoring |

The anonymized data asset alone could generate $50,000-$200,000/year in
licensing revenue by Year 3-4 (listed as an extension revenue stream in
05-revenue-modelling). More importantly, the data creates a defensible
competitive moat that increases with every transaction processed.

#### Network Effects

| Network Effect Type | Mechanism | Value Creation |
|--------------------|-----------|---------------|
| Cross-side (patient-to-provider) | More patients attract more providers; more providers attract more patients | Each additional clinic increases available appointment slots, reducing wait times and improving patient retention |
| Same-side (provider-to-provider) | GP referrals to specialists create a closed loop within the platform | Referral network density increases switching costs for providers and keeps revenue within the ecosystem |
| Data network effects | More transactions improve AI triage accuracy, which improves patient outcomes, which drives more transactions | Self-reinforcing cycle that creates exponentially increasing value with linear user growth |
| Geographic network effects | Success in Addis Ababa creates a replicable playbook for Nairobi and beyond | Operating costs per new city decrease by 30-50% after the first market is established |

#### Brand Equity

| Brand Dimension | How Built | ROI Implication |
|----------------|-----------|-----------------|
| Trust in digital healthcare | Consistent service quality during Pilot phases; no data breaches; reliable doctor availability | Reduces customer acquisition cost by 20-40% in Year 2-3 as word-of-mouth replaces paid acquisition |
| Healthcare authority | Doctor training protocols, clinical oversight, quality scoring | Enables premium pricing and attracts institutional partnerships (hospitals, insurers, NGOs) |
| Technology credibility | SSR web platform, native Android app, video consultations, real-time notifications | Differentiates from SMS-based or basic-web competitors; justifies platform fees to facilities |

### 9.2 Exit Valuation Implications

While this document does not model exit-based ROI, the following benchmarks
provide context for what Health Hub might be worth at various stages:

| Stage | Comparable Valuation Multiple | Implied Valuation Range | Basis |
|-------|------------------------------|------------------------|-------|
| End of Pilot 2 (1K-10K users) | 5-10x trailing annual revenue | $150K-$1.5M | Pre-seed/seed stage digital health in Africa |
| Production Year 1 (10K-50K users) | 8-15x trailing annual revenue | $1M-$7.5M | Seed/Series A for emerging market health tech |
| Production Year 2 (50K-200K users) | 12-20x trailing annual revenue | $5M-$30M | Series A/B comparable (mPharma, Helium Health) |
| Production Year 3+ (200K+ users) | 15-25x trailing annual revenue | $15M-$100M+ | Growth-stage emerging market health platform |

For an investor entering at S3 with $100K-$250K for 18-20% equity, a $5M-$10M
valuation at Series A (Year 2-3) would represent a 2x-5x multiple on invested
capital — competitive with early-stage venture returns. A $30M+ valuation at
Series B would represent a 10x-25x multiple.

### 9.3 Social Impact ROI

| Impact Metric | Target by Production Year 2 | Measurement |
|--------------|----------------------------|-------------|
| Patients receiving first-ever telemedicine consultation | 5,000-20,000 | Platform registration + first consultation completion |
| Reduction in patient travel time for routine care | 60-80% for connected patients | Self-reported survey vs baseline |
| Specialist access in underserved areas | 500-2,000 patients receiving specialist consults who otherwise would not | Referral completion from rural/peri-urban locations |
| Pharmacy accuracy improvement | 15-25% reduction in prescription errors | Error tracking before/after platform-assisted dispensing |
| Health data digitization | 10,000-50,000 patient records digitized | Cumulative patient profiles with visit history |

Social impact metrics are increasingly important for impact-focused investors,
DFI (Development Finance Institution) grant eligibility, and partnerships with
organizations like WHO, USAID, and the Gates Foundation.

---

## 10. Key Takeaways

### 10.1 Best ROI Paths by Stakeholder

| Stakeholder | Recommended Path | Why |
|------------|-----------------|-----|
| **Founder (maximizing % ROI)** | S3-O3-I3 | Lowest founder capital ($95K), maximum investor leverage, fastest timeline (16 months), 797-1023% founder ROI at 36mo post-production |
| **Founder (balancing ROI and control)** | S3-O2-I2 | $95K founder capital, $120K investor, 20-month timeline, 421-548% founder ROI at 36mo post-production, founder retains 55% equity |
| **Founder (maximizing control)** | S1-L3 | No dilution, 60% retained, 20-month timeline, 313-420% ROI at 36mo post-production, but requires $150K self-funding |
| **Investor (maximizing % return)** | S3-O3-I2 | $100K for 19% equity, 20-26 month payback, 138-196% ROI at 36mo post-production, well-funded operation reduces risk |
| **Investor (balancing return and risk)** | S3-O2-I2 | $120K for 19% equity, 26-32 month payback, 43-77% ROI at 36mo post-production, moderate but reliable growth |
| **Investor (maximizing absolute return)** | S3-O3-I3 or S2-O3-I3 | Largest capital deployed ($205K-$225K), largest absolute dollar returns, but lower percentage ROI and longer payback |

### 10.2 Paths to Avoid

| Path | Reason to Avoid |
|------|----------------|
| S2-O1-I3 | $245K investor capital enters after a slow L1 self-funded phase. Capital sits idle for months. Investor ROI is negative at 36mo post-production under pessimistic assumptions. |
| S2-O1-I1 | Both founder and investor are constrained. Slowest investor payback (40-48+ months). Insufficient capital to drive meaningful growth. |
| S1-L1 | 34-month timeline to production. Founder payback takes 46-52 months. High risk of founder fatigue. Only 55% probability of breakeven within 36 months under pessimistic assumptions. |
| Any O1-I3 combination | The mismatch between a bootstrapped self-funded phase and a large investor injection creates inefficiency — the strong investor capital cannot compensate for the weak product foundation built during L1. |

### 10.3 Recommended Path

**S3-O2-I2 (Steady Bridge + Ideal Investor)** is the recommended path for the
following reasons:

| Criterion | S3-O2-I2 Score |
|-----------|---------------|
| Total capital required | $215,000 ($95K founder + $120K investor) — achievable |
| Timeline to production | 20 months — ambitious but realistic |
| Founder ROI at 36mo post-prod | 421-548% — strong returns |
| Investor ROI at 36mo post-prod | 43-77% — competitive with early-stage venture |
| Investor payback period | 26-32 months from entry — reasonable for pre-seed |
| Breakeven probability (36mo) | 80% baseline, 95% optimistic |
| Founder equity retained | 55% — clear majority control |
| Monthly revenue at M24 | $22,378 — demonstrates meaningful traction |
| Risk profile | Moderate — investor enters early enough to accelerate growth, but total capital is not so large that downside losses are catastrophic |

If the founder's risk tolerance is higher and a larger investor is available,
**S3-O3-I2** offers faster founder payback (18-22 months) and higher investor
ROI (138-196% at 36mo post-production) while still keeping total capital at
a manageable $195,000.

### 10.4 ROI Drivers to Monitor

The following metrics most directly impact realized ROI and should be tracked
monthly once revenue collection begins:

| Metric | Target | Impact if Missed |
|--------|--------|-----------------|
| Monthly active user growth rate | 15%+ | Every 1pp below target delays breakeven by ~1 month |
| Active user percentage | 35%+ of registered | Below 25% indicates retention problem; halves ARPU |
| Monthly churn rate | Below 7% | Every 1pp above target reduces LTV by ~15% |
| ARPU (Production) | $5.50+ | Below $3.50 shifts all scenarios 6-12 months right |
| Facility onboarding rate | 2-3 per month at Production | Below 1/month caps B2B revenue and slows network effects |
| GP consultation volume | 800+ per month at Production | Below 500 indicates demand or availability problem |
| Specialist referral conversion | 40%+ of GP-referred patients see a specialist | Below 25% breaks the referral flywheel |

### 10.5 Final Perspective

Health Hub's ROI profile is characteristic of a pre-revenue marketplace startup
in an emerging market. The numbers show that:

1. **Capital efficiency is inversely correlated with absolute returns.** The
   cheapest paths (S1-L1, S1-L2) have the highest ROI percentages but generate
   the least absolute revenue and take the longest to reach meaningful scale.

2. **Investor capital accelerates revenue but creates a larger hurdle.** Every
   dollar of investor capital must be earned back through the investor's equity
   share, which is only 18-19%. This means $1 of investor capital requires
   $5.26-$5.56 of total platform revenue to repay.

3. **The optimal strategy is right-sized investment.** Neither minimum nor
   maximum investment produces the best risk-adjusted returns. The I2 (Ideal)
   investor level consistently outperforms I1 (too constrained) and I3 (too
   much capital for the current stage) on ROI efficiency metrics.

4. **Time is the most expensive input.** The longest timelines (S1-L1 at 34
   months, S2-O1-I1 at 30 months) accumulate the highest economic costs because
   founder-office time, ops staff, and infrastructure compound monthly. Faster
   paths are not just better for morale — they are structurally cheaper.

5. **Non-financial returns may exceed financial returns for early investors.**
   An investor who enters at $100K-$120K for 18-19% equity in a company that
   achieves $5M-$10M Series A valuation within 3 years would realize a 10-20x
   return — far exceeding the organic revenue-based ROI modeled in this document.

---

*End of 07-roi-analysis.md. All figures are forward projections based on
assumptions defined in [params.md](./params.md). Actual results will vary.
This document should be read alongside [05-revenue-modelling](../05-revenue-modelling.md)
and [03-cost-breakdown](../03-cost-breakdown.md) for full context.*
