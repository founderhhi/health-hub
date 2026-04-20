# 10 — Cash Flow & Runway

**Health Hub Business Plan v2 | Document 10**
**Version:** 2.0 | **Date:** March 2026

> All assumptions, rates, scenarios, and phase definitions in this document are
> sourced from [params.md](./params.md). Refer to that document for any
> parameter clarification.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Monthly Cash Flow Model](#2-monthly-cash-flow-model)
3. [Runway Analysis](#3-runway-analysis)
4. [Cash-Out Risk Points](#4-cash-out-risk-points)
5. [Minimum Cash Reserve Thresholds](#5-minimum-cash-reserve-thresholds)
6. [Investor Impact on Runway](#6-investor-impact-on-runway)
7. [Contingency Actions](#7-contingency-actions)
8. [Cross-References](#8-cross-references)

---

## 1. Executive Summary

This document projects Health Hub's monthly cash position from Month 0 through
Month 34 (the maximum timeline per params.md Section 13) across all 21 scenario
combinations. The analysis answers the fundamental survival question: **when does
the money run out for each path, and what can be done about it?**

**Key findings:**

- **S1-L1 (bootstrapped, minimal spend):** Lowest absolute burn (~$8,700/mo in early
  phases) but the slowest revenue ramp. Cash-out risk at Month 10-12 with $80K
  starting capital. Requires $105-$130K total to reach Production.

- **S1-L2 (self-funded, ideal spend):** The recommended self-funded baseline.
  Burns ~$14,900-$19,600/mo by phase. Requires ~$200-$260K in founder capital
  to reach Production without external investment. Cash-out risk at Month 12-14
  with $200K starting capital.

- **S2-O2-I2 (ideal own spend, ideal investor at transition):** The recommended
  balanced path. Self-funded burn of ~$14,900-$17,600/mo through Pilot 1, then
  investor capital of $50-$80K extends runway through Pilot 2 and into Production.
  Cash-out risk effectively eliminated if investor arrives on schedule.

- **S3-O2-I2 (ideal own spend, ideal investor after Pilot 1):** Earlier investor
  arrival reduces self-funded requirement to ~$60-$90K. Investor provides $50-$80K
  at Month 5-8. Combined runway reaches 20+ months.

- **Across all 21 paths:** The critical danger zone is Month 8-14 for self-funded
  paths, when Pilot 1 ops costs begin but revenue has not yet materialized. Every
  path that does not secure external capital or achieve early revenue faces a
  cash crunch in this window.

---

## 2. Monthly Cash Flow Model

### 2.1 Cost Assumptions (from params.md)

| Cost Component | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|---------------|-----------|---------|---------|------------|
| Team cost | $14,830/mo | $14,830/mo | $14,830/mo | $14,830/mo |
| Ops staff | $0/mo | $2,482/mo | $4,361/mo | $6,542/mo |
| Infra (midpoint) | $65/mo | $270/mo | $460/mo | $800/mo |
| **Total outflow** | **$14,895/mo** | **$17,582/mo** | **$19,651/mo** | **$22,172/mo** |

**Notes:**
- Team cost is fixed at $14,830/mo across all phases (per params.md Section 3.2)
- Ops staff ramps per params.md Section 4.2: 0 in Pre-Pilot, then 2 doctors + 2 admin + 2 tech support in Pilot 1, scaling up
- Infra uses midpoint of ranges from params.md Section 7.4
- One-time equipment costs (phones $200-$300 in Pre-Pilot, laptops $400-$600 in Pilot 1, expansion $300-$500 in Pilot 2 per params.md Section 7.3) are included in the month they occur

**Investment level adjustments:**
- L1 (Bootstrapped): 40% of ideal = costs multiplied by 0.40 for team; ops and infra at minimum of ranges
- L2 (Ideal): 100% of baseline = costs as shown above
- L3 (Fully Funded): 150-200% of ideal = costs multiplied by 1.50-1.75 for team; ops and infra at maximum of ranges

### 2.2 Revenue Assumptions (from params.md Section 11.3)

| Phase | Monthly Revenue Range | Midpoint Used in Model |
|-------|----------------------|----------------------|
| Pre-Pilot | $0 | $0 |
| Pilot 1 | $0-$500 | $150 |
| Pilot 2 | $500-$3,000 | $1,500 |
| Production | $3,000-$15,000 | $7,500 |

### 2.3 Path A: S1-L2 (Self-Funded, Ideal Spend)

**Starting capital:** $200,000 (founder-provided)
**Phase durations:** Pre-Pilot 4 months, Pilot 1 3 months, Pilot 2 6 months, Production 8 months = 21 months total

| Month | Phase | Team | Ops Staff | Infra | One-Time | Total Outflow | Revenue | Net Cash Flow | Cumulative Cash |
|-------|-------|------|-----------|-------|----------|---------------|---------|---------------|----------------|
| 1 | Pre-Pilot | $14,830 | $0 | $65 | $250 | $15,145 | $0 | -$15,145 | $184,855 |
| 2 | Pre-Pilot | $14,830 | $0 | $65 | $0 | $14,895 | $0 | -$14,895 | $169,960 |
| 3 | Pre-Pilot | $14,830 | $0 | $65 | $0 | $14,895 | $0 | -$14,895 | $155,065 |
| 4 | Pre-Pilot | $14,830 | $0 | $65 | $0 | $14,895 | $0 | -$14,895 | $140,170 |
| 5 | Pilot 1 | $14,830 | $2,482 | $270 | $500 | $18,082 | $50 | -$18,032 | $122,138 |
| 6 | Pilot 1 | $14,830 | $2,482 | $270 | $0 | $17,582 | $100 | -$17,482 | $104,656 |
| 7 | Pilot 1 | $14,830 | $2,482 | $270 | $0 | $17,582 | $200 | -$17,382 | $87,274 |
| 8 | Pilot 2 | $14,830 | $4,361 | $460 | $400 | $20,051 | $500 | -$19,551 | $67,723 |
| 9 | Pilot 2 | $14,830 | $4,361 | $460 | $0 | $19,651 | $800 | -$18,851 | $48,872 |
| 10 | Pilot 2 | $14,830 | $4,361 | $460 | $0 | $19,651 | $1,100 | -$18,551 | $30,321 |
| 11 | Pilot 2 | $14,830 | $4,361 | $460 | $0 | $19,651 | $1,500 | -$18,151 | $12,170 |
| 12 | Pilot 2 | $14,830 | $4,361 | $460 | $0 | $19,651 | $1,800 | -$17,851 | **-$5,681** |
| 13 | Pilot 2 | $14,830 | $4,361 | $460 | $0 | $19,651 | $2,200 | -$17,451 | -$23,132 |
| 14 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $3,000 | -$19,172 | -$42,304 |
| 15 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $4,000 | -$18,172 | -$60,476 |
| 16 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $5,500 | -$16,672 | -$77,148 |
| 17 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $7,000 | -$15,172 | -$92,320 |
| 18 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $8,500 | -$13,672 | -$105,992 |
| 19 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $10,000 | -$12,172 | -$118,164 |
| 20 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $12,000 | -$10,172 | -$128,336 |
| 21 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $14,000 | -$8,172 | -$136,508 |

**Cash-out month: Month 12.** S1-L2 with $200K starting capital runs out of cash
during Pilot 2 unless additional capital is injected or revenue accelerates beyond
projections.

**Total capital required for 21 months: ~$336,500** ($200K starting + ~$136.5K shortfall)

### 2.4 Path B: S2-O2-I2 (Ideal Own Spend, Ideal Investor at Transition)

**Starting capital:** $100,000 (founder-provided)
**Investor capital:** $75,000 arriving at Month 8 (Pilot 1 to Pilot 2 transition)
**Phase durations:** Pre-Pilot 4 months, Pilot 1 3 months, Pilot 2 5 months, Production 8 months = 20 months total

| Month | Phase | Team | Ops Staff | Infra | One-Time | Total Outflow | Revenue | Investor | Net Cash Flow | Cumulative Cash |
|-------|-------|------|-----------|-------|----------|---------------|---------|----------|---------------|----------------|
| 1 | Pre-Pilot | $14,830 | $0 | $65 | $250 | $15,145 | $0 | $0 | -$15,145 | $84,855 |
| 2 | Pre-Pilot | $14,830 | $0 | $65 | $0 | $14,895 | $0 | $0 | -$14,895 | $69,960 |
| 3 | Pre-Pilot | $14,830 | $0 | $65 | $0 | $14,895 | $0 | $0 | -$14,895 | $55,065 |
| 4 | Pre-Pilot | $14,830 | $0 | $65 | $0 | $14,895 | $0 | $0 | -$14,895 | $40,170 |
| 5 | Pilot 1 | $14,830 | $2,482 | $270 | $500 | $18,082 | $50 | $0 | -$18,032 | $22,138 |
| 6 | Pilot 1 | $14,830 | $2,482 | $270 | $0 | $17,582 | $100 | $0 | -$17,482 | $4,656 |
| 7 | Pilot 1 | $14,830 | $2,482 | $270 | $0 | $17,582 | $200 | $0 | -$17,382 | -$12,726 |
| 8 | Pilot 2 | $14,830 | $4,361 | $460 | $400 | $20,051 | $500 | **$75,000** | +$55,449 | $42,723 |
| 9 | Pilot 2 | $14,830 | $4,361 | $460 | $0 | $19,651 | $800 | $0 | -$18,851 | $23,872 |
| 10 | Pilot 2 | $14,830 | $4,361 | $460 | $0 | $19,651 | $1,200 | $0 | -$18,451 | $5,421 |
| 11 | Pilot 2 | $14,830 | $4,361 | $460 | $0 | $19,651 | $1,600 | $0 | -$18,051 | -$12,630 |
| 12 | Pilot 2 | $14,830 | $4,361 | $460 | $0 | $19,651 | $2,000 | $0 | -$17,651 | -$30,281 |
| 13 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $3,500 | $0 | -$18,672 | -$48,953 |
| 14 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $5,000 | $0 | -$17,172 | -$66,125 |
| 15 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $7,000 | $0 | -$15,172 | -$81,297 |
| 16 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $9,000 | $0 | -$13,172 | -$94,469 |
| 17 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $11,000 | $0 | -$11,172 | -$105,641 |
| 18 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $13,000 | $0 | -$9,172 | -$114,813 |
| 19 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $14,500 | $0 | -$7,672 | -$122,485 |
| 20 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $15,000 | $0 | -$7,172 | -$129,657 |

**Cash-out month: Month 7** (briefly negative before investor arrival at Month 8).
This path requires either a bridge arrangement for the Month 7 gap or earlier
investor commitment. With $125K founder capital instead of $100K, the gap disappears.

**With $125K founder capital:** Cash-out shifts to Month 11 (post-investor). Total
additional capital needed: ~$129.7K beyond the $100K founder + $75K investor = $54.7K shortfall.

**Realistic assessment:** S2-O2-I2 requires ~$100-$125K founder capital + $75-$100K
investor capital + revenue acceleration or a second smaller raise to sustain through
Production.

### 2.5 Path C: S3-O2-I2 (Ideal Own Spend, Ideal Investor After Pilot 1)

**Starting capital:** $75,000 (founder-provided)
**Investor capital:** $75,000 arriving at Month 5 (after Pilot 1 begins, earlier than S2)
**Phase durations:** Pre-Pilot 3 months, Pilot 1 2 months, Pilot 2 5 months, Production 8 months = 18 months total

| Month | Phase | Team | Ops Staff | Infra | One-Time | Total Outflow | Revenue | Investor | Net Cash Flow | Cumulative Cash |
|-------|-------|------|-----------|-------|----------|---------------|---------|----------|---------------|----------------|
| 1 | Pre-Pilot | $14,830 | $0 | $65 | $250 | $15,145 | $0 | $0 | -$15,145 | $59,855 |
| 2 | Pre-Pilot | $14,830 | $0 | $65 | $0 | $14,895 | $0 | $0 | -$14,895 | $44,960 |
| 3 | Pre-Pilot | $14,830 | $0 | $65 | $0 | $14,895 | $0 | $0 | -$14,895 | $30,065 |
| 4 | Pilot 1 | $14,830 | $2,482 | $270 | $500 | $18,082 | $50 | $0 | -$18,032 | $12,033 |
| 5 | Pilot 1 | $14,830 | $2,482 | $270 | $0 | $17,582 | $150 | **$75,000** | +$57,568 | $69,601 |
| 6 | Pilot 2 | $14,830 | $4,361 | $460 | $400 | $20,051 | $500 | $0 | -$19,551 | $50,050 |
| 7 | Pilot 2 | $14,830 | $4,361 | $460 | $0 | $19,651 | $900 | $0 | -$18,751 | $31,299 |
| 8 | Pilot 2 | $14,830 | $4,361 | $460 | $0 | $19,651 | $1,300 | $0 | -$18,351 | $12,948 |
| 9 | Pilot 2 | $14,830 | $4,361 | $460 | $0 | $19,651 | $1,800 | $0 | -$17,851 | -$4,903 |
| 10 | Pilot 2 | $14,830 | $4,361 | $460 | $0 | $19,651 | $2,500 | $0 | -$17,151 | -$22,054 |
| 11 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $4,000 | $0 | -$18,172 | -$40,226 |
| 12 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $6,000 | $0 | -$16,172 | -$56,398 |
| 13 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $8,000 | $0 | -$14,172 | -$70,570 |
| 14 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $10,000 | $0 | -$12,172 | -$82,742 |
| 15 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $12,000 | $0 | -$10,172 | -$92,914 |
| 16 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $14,000 | $0 | -$8,172 | -$101,086 |
| 17 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $15,000 | $0 | -$7,172 | -$108,258 |
| 18 | Production | $14,830 | $6,542 | $800 | $0 | $22,172 | $15,000 | $0 | -$7,172 | -$115,430 |

**Cash-out month: Month 9.** Even with $75K investor capital arriving at Month 5,
the cash runs out during Pilot 2.

**Total capital required for 18 months: ~$190.4K** ($75K founder + $75K investor + ~$40.4K shortfall).

**With $100K founder capital:** Cash-out shifts to Month 10. Still requires either
revenue acceleration, scope reduction, or a second raise.

### 2.6 Cash Flow Summary Across Three Representative Paths

| Metric | S1-L2 | S2-O2-I2 | S3-O2-I2 |
|--------|-------|----------|----------|
| Founder capital | $200,000 | $100,000 | $75,000 |
| Investor capital | $0 | $75,000 | $75,000 |
| Total capital | $200,000 | $175,000 | $150,000 |
| Cash-out month | Month 12 | Month 7 (pre-investor) | Month 9 |
| Total capital needed (full timeline) | ~$336,500 | ~$304,700 | ~$265,400 |
| Capital gap | ~$136,500 | ~$54,700 | ~$40,400 |
| Monthly burn at peak | $22,172 | $22,172 | $22,172 |
| Months to potential breakeven | 24-28 | 22-26 | 20-24 |
| Revenue at breakeven | ~$22,000/mo | ~$22,000/mo | ~$22,000/mo |

---

## 3. Runway Analysis

### 3.1 Investment Level Cost Multipliers

| Investment Level | Team Cost Multiplier | Ops Staff | Infra | Monthly Burn (Pre-Pilot) | Monthly Burn (Pilot 1) | Monthly Burn (Pilot 2) | Monthly Burn (Production) |
|-----------------|---------------------|-----------|-------|------------------------|----------------------|----------------------|--------------------------|
| L1 (Bootstrapped, 40%) | 0.40 | Minimum of range | Minimum of range | $6,027 | $8,621 | $10,593 | $12,992 |
| L2 (Ideal, 100%) | 1.00 | Midpoint of range | Midpoint of range | $14,895 | $17,582 | $19,651 | $22,172 |
| L3 (Fully Funded, 175%) | 1.75 | Maximum of range | Maximum of range | $26,103 | $31,467 | $35,468 | $40,858 |

**L1 calculation detail:**
- Team: $14,830 x 0.40 = $5,932/mo
- Ops staff: $0 / $1,440 / $2,612 / $3,840 (minimum of ranges, fewer staff, lower salaries)
- Infra: $65 / $160 / $300 / $600 (minimum of ranges per params.md Section 7.4)
- One-time costs: $200 / $400 / $300 (minimum of ranges per params.md Section 7.3)

**L3 calculation detail:**
- Team: $14,830 x 1.75 = $25,953/mo
- Ops staff: $0 / $3,524 / $6,110 / $10,458 (maximum of ranges, full staffing per params.md Section 4.2)
- Infra: $150 / $520 / $920 / $1,500 (maximum of ranges per params.md Section 7.4)
- One-time costs: $400 / $600 / $600 (maximum of ranges per params.md Section 7.3)

### 3.2 Assumed Starting Capital by Combination

| Scenario | Our Level | Assumed Founder Capital | Investor Capital | Investor Timing | Total Available |
|----------|-----------|------------------------|-----------------|----------------|----------------|
| S1-L1 | L1 | $80,000 | $0 | Never | $80,000 |
| S1-L2 | L2 | $200,000 | $0 | Never | $200,000 |
| S1-L3 | L3 | $400,000 | $0 | Never | $400,000 |
| S2-O1-Ix | L1 | $50,000 | Varies | Transition | $50K + investor |
| S2-O2-Ix | L2 | $100,000 | Varies | Transition | $100K + investor |
| S2-O3-Ix | L3 | $200,000 | Varies | Transition | $200K + investor |
| S3-O1-Ix | L1 | $30,000 | Varies | After Pilot 1 | $30K + investor |
| S3-O2-Ix | L2 | $75,000 | Varies | After Pilot 1 | $75K + investor |
| S3-O3-Ix | L3 | $150,000 | Varies | After Pilot 1 | $150K + investor |

**Investor capital by level:**

| Investor Level | Capital Provided |
|---------------|-----------------|
| I1 (Bootstrapped) | $30,000-$40,000 |
| I2 (Ideal) | $75,000-$100,000 |
| I3 (Fully Funded) | $150,000-$250,000 |

### 3.3 Runway at Key Checkpoints — All 21 Combinations

**Checkpoint definitions:**
- CP1: End of Pre-Pilot (Month 4-6 depending on path)
- CP2: End of Pilot 1 (Month 6-9 depending on path)
- CP3: End of Pilot 2 (Month 11-18 depending on path)
- CP4: 6 months into Production

| # | Code | Runway at CP1 | Runway at CP2 | Runway at CP3 | Runway at CP4 | Status |
|---|------|--------------|--------------|--------------|--------------|--------|
| 1 | S1-L1 | 9.2 mo | 5.8 mo | 1.2 mo | DEPLETED | CRITICAL |
| 2 | S1-L2 | 9.4 mo | 5.0 mo | DEPLETED | DEPLETED | CRITICAL |
| 3 | S1-L3 | 9.6 mo | 5.2 mo | DEPLETED | DEPLETED | CRITICAL |
| 4 | S2-O1-I1 | 4.1 mo | 1.2 mo + $35K inv = 5.1 mo | 3.8 mo | 1.2 mo | AT RISK |
| 5 | S2-O1-I2 | 4.1 mo | 1.2 mo + $85K inv = 11.0 mo | 6.5 mo | 3.8 mo | VIABLE |
| 6 | S2-O1-I3 | 4.1 mo | 1.2 mo + $200K inv = 24.0 mo | 14.2 mo | 9.5 mo | STRONG |
| 7 | S2-O2-I1 | 6.7 mo | 2.5 mo + $35K inv = 4.3 mo | 2.1 mo | DEPLETED | AT RISK |
| 8 | S2-O2-I2 | 6.7 mo | 2.5 mo + $85K inv = 7.0 mo | 3.5 mo | 1.4 mo | VIABLE |
| 9 | S2-O2-I3 | 6.7 mo | 2.5 mo + $200K inv = 12.8 mo | 8.6 mo | 5.2 mo | STRONG |
| 10 | S2-O3-I1 | 5.1 mo | 1.8 mo + $35K inv = 2.8 mo | DEPLETED | DEPLETED | CRITICAL |
| 11 | S2-O3-I2 | 5.1 mo | 1.8 mo + $85K inv = 4.5 mo | 2.0 mo | DEPLETED | AT RISK |
| 12 | S2-O3-I3 | 5.1 mo | 1.8 mo + $200K inv = 7.5 mo | 3.8 mo | 1.5 mo | VIABLE |
| 13 | S3-O1-I1 | 2.5 mo + $35K inv = 6.5 mo | 4.8 mo | 2.5 mo | DEPLETED | AT RISK |
| 14 | S3-O1-I2 | 2.5 mo + $85K inv = 12.3 mo | 9.8 mo | 5.5 mo | 2.8 mo | VIABLE |
| 15 | S3-O1-I3 | 2.5 mo + $200K inv = 25.6 mo | 20.5 mo | 14.0 mo | 9.2 mo | STRONG |
| 16 | S3-O2-I1 | 3.4 mo + $35K inv = 5.2 mo | 3.8 mo | 1.5 mo | DEPLETED | AT RISK |
| 17 | S3-O2-I2 | 3.4 mo + $85K inv = 7.7 mo | 5.5 mo | 2.8 mo | 0.8 mo | AT RISK |
| 18 | S3-O2-I3 | 3.4 mo + $200K inv = 13.6 mo | 10.2 mo | 6.0 mo | 3.2 mo | VIABLE |
| 19 | S3-O3-I1 | 2.6 mo + $35K inv = 3.5 mo | 2.0 mo | DEPLETED | DEPLETED | CRITICAL |
| 20 | S3-O3-I2 | 2.6 mo + $85K inv = 5.0 mo | 3.2 mo | 1.0 mo | DEPLETED | AT RISK |
| 21 | S3-O3-I3 | 2.6 mo + $200K inv = 7.8 mo | 5.2 mo | 2.5 mo | 0.5 mo | AT RISK |

**Status definitions:**
- STRONG: Runway > 6 months at all checkpoints through CP4
- VIABLE: Runway > 3 months at most checkpoints; manageable with revenue growth
- AT RISK: Runway drops below 3 months at one or more checkpoints; requires action
- CRITICAL: Runway depletes before reaching Production; path is not viable without additional capital

### 3.4 Key Observations

1. **No self-funded path (S1) reaches Production without additional capital** at
   modeled burn rates and revenue assumptions. S1-L1 survives longest in calendar
   time due to lowest burn but produces the weakest product and growth.

2. **High own-spend levels (O3) paired with low investor levels (I1) are worse than
   moderate paths.** S2-O3-I1 and S3-O3-I1 burn through founder capital quickly
   and the small investor injection does not compensate.

3. **The optimal capital efficiency paths are S2-O1-I2, S2-O2-I2, S3-O1-I2, and
   S3-O2-I2** — moderate own spending paired with ideal investor capital.

4. **Only paths with I3 (fully funded investor) provide comfortable runway through
   Production.** All other paths require either revenue to materialize faster than
   projected, a second raise, or contingency actions.

---

## 4. Cash-Out Risk Points

### 4.1 Definition

A **cash-out risk point** is the month at which cumulative cash position reaches $0
assuming no new capital injection beyond the initial plan and revenue follows the
midpoint projection from params.md Section 11.3.

### 4.2 Cash-Out Month by Combination

| # | Code | Founder Capital | Investor Capital | Investor Month | Cash-Out Month | Months of Operation |
|---|------|----------------|-----------------|----------------|---------------|-------------------|
| 1 | S1-L1 | $80,000 | $0 | — | Month 13 | 13 |
| 2 | S1-L2 | $200,000 | $0 | — | Month 12 | 12 |
| 3 | S1-L3 | $400,000 | $0 | — | Month 12 | 12 |
| 4 | S2-O1-I1 | $50,000 | $35,000 | 8 | Month 14 | 14 |
| 5 | S2-O1-I2 | $50,000 | $85,000 | 8 | Month 19 | 19 |
| 6 | S2-O1-I3 | $50,000 | $200,000 | 8 | Month 32+ | 32+ |
| 7 | S2-O2-I1 | $100,000 | $35,000 | 8 | Month 12 | 12 |
| 8 | S2-O2-I2 | $100,000 | $85,000 | 8 | Month 14 | 14 |
| 9 | S2-O2-I3 | $100,000 | $200,000 | 8 | Month 22 | 22 |
| 10 | S2-O3-I1 | $200,000 | $35,000 | 8 | Month 10 | 10 |
| 11 | S2-O3-I2 | $200,000 | $85,000 | 8 | Month 12 | 12 |
| 12 | S2-O3-I3 | $200,000 | $200,000 | 8 | Month 16 | 16 |
| 13 | S3-O1-I1 | $30,000 | $35,000 | 5 | Month 12 | 12 |
| 14 | S3-O1-I2 | $30,000 | $85,000 | 5 | Month 18 | 18 |
| 15 | S3-O1-I3 | $30,000 | $200,000 | 5 | Month 30+ | 30+ |
| 16 | S3-O2-I1 | $75,000 | $35,000 | 5 | Month 10 | 10 |
| 17 | S3-O2-I2 | $75,000 | $85,000 | 5 | Month 13 | 13 |
| 18 | S3-O2-I3 | $75,000 | $200,000 | 5 | Month 20 | 20 |
| 19 | S3-O3-I1 | $150,000 | $35,000 | 5 | Month 9 | 9 |
| 20 | S3-O3-I2 | $150,000 | $85,000 | 5 | Month 11 | 11 |
| 21 | S3-O3-I3 | $150,000 | $200,000 | 5 | Month 15 | 15 |

### 4.3 Cash-Out Risk Heatmap

| | I1 (Bootstrapped Investor) | I2 (Ideal Investor) | I3 (Fully Funded Investor) |
|---|---|---|---|
| **S1 (No Investor)** | L1: Mo 13; L2: Mo 12; L3: Mo 12 | N/A | N/A |
| **S2-O1 (Bootstrap Own)** | Mo 14 | Mo 19 | Mo 32+ |
| **S2-O2 (Ideal Own)** | Mo 12 | Mo 14 | Mo 22 |
| **S2-O3 (Full Own)** | Mo 10 | Mo 12 | Mo 16 |
| **S3-O1 (Bootstrap Own)** | Mo 12 | Mo 18 | Mo 30+ |
| **S3-O2 (Ideal Own)** | Mo 10 | Mo 13 | Mo 20 |
| **S3-O3 (Full Own)** | Mo 9 | Mo 11 | Mo 15 |

**Pattern:** Higher own-spending levels burn cash faster and shorten runway even
when investor capital is constant. The most capital-efficient paths are those with
modest own spending (O1) paired with strong investor capital (I2 or I3).

### 4.4 Paths That Survive to Production (Month 16+)

Only 7 of 21 combinations reach Month 16+ before cash-out:

| # | Code | Cash-Out Month | Reaches Production? | Margin |
|---|------|---------------|-------------------|--------|
| 5 | S2-O1-I2 | Month 19 | Yes | 3 months buffer |
| 6 | S2-O1-I3 | Month 32+ | Yes | 16+ months buffer |
| 9 | S2-O2-I3 | Month 22 | Yes | 6 months buffer |
| 12 | S2-O3-I3 | Month 16 | Barely | 0 months buffer |
| 14 | S3-O1-I2 | Month 18 | Yes | 2 months buffer |
| 15 | S3-O1-I3 | Month 30+ | Yes | 14+ months buffer |
| 18 | S3-O2-I3 | Month 20 | Yes | 4 months buffer |

**Conclusion:** Reaching Production requires either (a) fully funded investor
capital (I3 = $150K-$250K), or (b) bootstrapped own spending with ideal investor
capital (O1-I2), or (c) revenue exceeding projections by 50%+, or (d) a second
funding round.

---

## 5. Minimum Cash Reserve Thresholds

### 5.1 Threshold Framework

| Threshold Level | Remaining Runway | Cash Position Trigger | Status |
|----------------|-----------------|----------------------|--------|
| GREEN | > 6 months | > 6x monthly burn | Normal operations |
| YELLOW | 4-6 months | 4-6x monthly burn | Begin contingency planning |
| ORANGE | 2-4 months | 2-4x monthly burn | Execute contingency actions (see Section 7) |
| RED | < 2 months | < 2x monthly burn | Emergency mode; survival actions only |

### 5.2 Threshold Values by Phase

| Phase | Monthly Burn (L2) | GREEN Threshold | YELLOW Threshold | ORANGE Threshold | RED Threshold |
|-------|------------------|----------------|-----------------|-----------------|--------------|
| Pre-Pilot | $14,895 | > $89,370 | $59,580-$89,370 | $29,790-$59,580 | < $29,790 |
| Pilot 1 | $17,582 | > $105,492 | $70,328-$105,492 | $35,164-$70,328 | < $35,164 |
| Pilot 2 | $19,651 | > $117,906 | $78,604-$117,906 | $39,302-$78,604 | < $39,302 |
| Production | $22,172 | > $133,032 | $88,688-$133,032 | $44,344-$88,688 | < $44,344 |

### 5.3 Threshold Values by Investment Level

| Level | Peak Monthly Burn | RED Threshold (< 2 months) |
|-------|------------------|---------------------------|
| L1 | $12,992 (Production) | < $25,984 |
| L2 | $22,172 (Production) | < $44,344 |
| L3 | $40,858 (Production) | < $81,716 |

### 5.4 Monitoring Protocol

| Frequency | Action | Responsible |
|-----------|--------|-------------|
| Weekly | Review cash position against thresholds | Founder |
| Monthly | Update cash flow projections with actuals | Founding Member 1 |
| Quarterly | Full runway review with scenario re-modeling | Founder + Advisors |
| On threshold change | Immediate notification to all founders and advisors | Automated alert |

### 5.5 Threshold Transition Actions

| Transition | Immediate Action |
|-----------|-----------------|
| GREEN to YELLOW | Begin identifying contingency levers; update investor materials; start informal investor conversations if S2/S3 path |
| YELLOW to ORANGE | Activate contingency plan (Section 7); reduce non-essential spend; accelerate revenue initiatives; begin active fundraising |
| ORANGE to RED | Emergency mode: freeze all non-critical hiring; cut infra to minimum; defer all non-essential development; pursue bridge financing or revenue advance |
| Any level to GREEN | Resume normal operations; document lessons learned; adjust projections |

---

## 6. Investor Impact on Runway

### 6.1 Runway Extension Formula

For each investor dollar received, the runway extension depends on the current burn rate:

| Monthly Burn | Runway Extension per $10K Invested | Per $50K | Per $100K | Per $200K |
|-------------|----------------------------------|----------|-----------|-----------|
| $8,700 (L1, Pilot 1) | 1.15 months | 5.7 mo | 11.5 mo | 23.0 mo |
| $17,600 (L2, Pilot 1) | 0.57 months | 2.8 mo | 5.7 mo | 11.4 mo |
| $19,650 (L2, Pilot 2) | 0.51 months | 2.5 mo | 5.1 mo | 10.2 mo |
| $22,170 (L2, Production) | 0.45 months | 2.3 mo | 4.5 mo | 9.0 mo |
| $31,500 (L3, Pilot 1) | 0.32 months | 1.6 mo | 3.2 mo | 6.3 mo |
| $40,860 (L3, Production) | 0.24 months | 1.2 mo | 2.4 mo | 4.9 mo |

**Key insight:** Investor capital is most impactful when the burn rate is low. A
$75K investment at L1 burn extends runway by 8.6 months; the same $75K at L3 burn
extends runway by only 1.8 months at Production.

### 6.2 Scenario S2: Investor During Pilot 1-to-Pilot 2 Transition

**Context:** The investor arrives when Health Hub has completed Pilot 1 and
demonstrated initial traction (up to 1,000 users, first revenue, consultation
completion data). Equity given: 15-20% (per params.md Section 8.3).

| Own Level | Investor Level | Investor Capital | Runway Before Investor | Runway After Investor (additional months) | Total Remaining Runway |
|-----------|---------------|-----------------|----------------------|----------------------------------------|----------------------|
| O1 | I1 | $35,000 | 1.2 mo | +4.1 mo | 5.3 mo |
| O1 | I2 | $85,000 | 1.2 mo | +9.9 mo | 11.1 mo |
| O1 | I3 | $200,000 | 1.2 mo | +23.2 mo | 24.4 mo |
| O2 | I1 | $35,000 | 2.5 mo | +2.0 mo | 4.5 mo |
| O2 | I2 | $85,000 | 2.5 mo | +4.8 mo | 7.3 mo |
| O2 | I3 | $200,000 | 2.5 mo | +11.4 mo | 13.9 mo |
| O3 | I1 | $35,000 | 1.8 mo | +1.1 mo | 2.9 mo |
| O3 | I2 | $85,000 | 1.8 mo | +2.7 mo | 4.5 mo |
| O3 | I3 | $200,000 | 1.8 mo | +6.4 mo | 8.2 mo |

### 6.3 Scenario S3: Investor After Pilot 1

**Context:** The investor arrives earlier (right after Pilot 1), which means less
traction data but earlier capital. The earlier arrival means the burn rate at the
time of investment is lower (still in Pilot 1 / early Pilot 2 transition).

| Own Level | Investor Level | Investor Capital | Runway Before Investor | Runway After Investor (additional months) | Total Remaining Runway |
|-----------|---------------|-----------------|----------------------|----------------------------------------|----------------------|
| O1 | I1 | $35,000 | 2.5 mo | +4.1 mo | 6.6 mo |
| O1 | I2 | $85,000 | 2.5 mo | +9.9 mo | 12.4 mo |
| O1 | I3 | $200,000 | 2.5 mo | +23.2 mo | 25.7 mo |
| O2 | I1 | $35,000 | 3.4 mo | +2.0 mo | 5.4 mo |
| O2 | I2 | $85,000 | 3.4 mo | +4.8 mo | 8.2 mo |
| O2 | I3 | $200,000 | 3.4 mo | +11.4 mo | 14.8 mo |
| O3 | I1 | $35,000 | 2.6 mo | +1.1 mo | 3.7 mo |
| O3 | I2 | $85,000 | 2.6 mo | +2.7 mo | 5.3 mo |
| O3 | I3 | $200,000 | 2.6 mo | +6.4 mo | 9.0 mo |

### 6.4 Investor Timing Sensitivity

| Timing Factor | S2 (During Transition) | S3 (After Pilot 1) | Difference |
|--------------|----------------------|-------------------|------------|
| Month of arrival | Month 7-8 | Month 5-6 | S3 is 2-3 months earlier |
| Traction data available | Pilot 1 complete; 1,000 users | Pilot 1 in-progress; 300-500 users | S2 has stronger data |
| Burn rate at arrival | $17,582-$19,651/mo | $14,895-$17,582/mo | S3 burn is lower = capital goes further |
| Equity expected | 15-20% | 18-20% | S3 may require more equity for same capital due to less traction |
| Fundraising difficulty | Moderate (traction proven) | Higher (traction unproven) | S2 is easier to close |

**Recommendation:** S2 timing is preferred when investor capital > $75K because
the stronger traction data makes the raise easier to close. S3 timing is preferred
when the founder's self-funded runway is < 5 months at Pilot 1 start, making an
earlier raise a survival necessity.

### 6.5 Minimum Viable Investor Capital

What is the minimum investor capital that makes each path viable (defined as
reaching at least Month 16 with positive cash)?

| Path | Minimum Investor Capital | Context |
|------|-------------------------|---------|
| S2-O1 | $65,000 | Modest own spend; investor covers Pilot 2 + early Production |
| S2-O2 | $130,000 | Ideal own spend; investor must cover the higher burn differential |
| S2-O3 | $200,000+ | High own spend burns through capital quickly; even large raises barely suffice |
| S3-O1 | $55,000 | Earlier arrival means capital stretches further |
| S3-O2 | $120,000 | Similar to S2 but slightly less needed due to earlier timing |
| S3-O3 | $180,000+ | High own spend is problematic regardless of investor timing |

---

## 7. Contingency Actions

### 7.1 Contingency Action Framework

Contingency actions are organized by severity level and by the type of lever
being pulled. The goal is to extend runway while preserving maximum optionality.

### 7.2 Tier 1: Scope Reduction (YELLOW threshold, 4-6 months runway)

| Action | Monthly Savings | Impact | Reversibility |
|--------|----------------|--------|---------------|
| Defer Kenya launch preparation | $500-$1,000 | Delays second-market entry by 3-6 months; Ethiopia focus remains | High — can restart at any time |
| Reduce Android team from 4 to 2 developers | $1,760-$2,640 | APK timeline extends by 2-3 months; core features still delivered | Medium — rehiring takes 2-4 weeks |
| Pause specialist consultation feature development | $1,000-$1,500 | Limits platform to GP consults only in near term | High — code is preserved |
| Defer analytics/reporting dashboard work | $800-$1,200 | Manual reporting continues; no self-serve investor dashboards | High |
| Reduce advisory board engagement to quarterly | $500-$750 | Fewer strategic inputs; acceptable during execution phases | High |

**Total Tier 1 savings: $4,560-$7,090/mo** (reduces L2 burn from ~$17,600 to ~$10,500-$13,000 during Pilot 1)

### 7.3 Tier 2: Hiring Deferral (ORANGE threshold, 2-4 months runway)

| Action | Monthly Savings | Impact | Reversibility |
|--------|----------------|--------|---------------|
| Defer ops staff hiring by 1 phase | $2,482-$4,361 | Service coverage reduced; longer patient wait times; manual callback load on founders | Medium — hiring takes 2-4 weeks in India |
| Reduce doctor coverage from 2-shift to 1-shift | $720 | Coverage drops from ~16 hrs/day to ~8 hrs/day; limits service to daytime only | Medium |
| Defer tech support hiring; founders absorb L1 support | $301-$602 | Founder time diverted from strategic work; acceptable short-term | High |
| Reduce infra to bare minimum tier | $100-$300 | Performance degradation; acceptable for < 500 active users | High |
| Pause all non-critical one-time equipment purchases | $0-$500 (amortized) | Use personal devices temporarily | High |

**Total Tier 2 savings: $3,603-$5,963/mo** (combined with Tier 1: burn can drop to ~$5,000-$8,000/mo)

### 7.4 Tier 3: Bridge Financing (ORANGE to RED threshold)

| Action | Amount | Timeline to Close | Terms |
|--------|--------|-------------------|-------|
| Founder bridge loan | $10,000-$30,000 | Immediate | Interest-free; converted to equity at next round's valuation |
| Friends & family note | $10,000-$50,000 | 2-4 weeks | Convertible note; 20% discount at next round |
| Revenue advance / pre-sale | $5,000-$15,000 | 2-6 weeks | Sell annual facility subscriptions at discount; pre-sell consultation packages |
| Grant / competition prize | $5,000-$25,000 | 4-12 weeks | Non-dilutive; many East African health tech grant programs available |
| Strategic partner advance | $10,000-$30,000 | 4-8 weeks | Clinic chain or pharmacy network pays upfront for platform access |

### 7.5 Tier 4: Emergency Survival (RED threshold, < 2 months runway)

| Action | Monthly Savings | Impact | Reversibility |
|--------|----------------|--------|---------------|
| Reduce team to founders only (3 people) | $9,550 | All development pauses; maintenance mode only; ops continue manually | Low — team dissolution is hard to reverse |
| Convert all team payments to deferred equity | $14,830 | Cash burn drops to ops + infra only; team works on equity promise | Low — risky; team may leave |
| Pause all ops staff; founders handle callbacks manually | $2,482-$6,542 | Service quality drops dramatically; only viable with < 200 active users | Medium |
| Shut down non-essential infrastructure | $200-$600 | Reduced to single server; video consultations may be unavailable | Medium |
| Seek acqui-hire or strategic merger | N/A | Company survives as part of larger entity; founder loses majority control | Irreversible |

**Total Tier 4 savings: up to $25,000/mo** (reduces burn to $2,000-$5,000/mo — survival mode only)

### 7.6 Contingency Decision Matrix

| Cash Runway | First Action | If Still Declining | If Stabilized |
|-------------|-------------|-------------------|---------------|
| 6 months | Monitor weekly | Begin Tier 1 scope cuts | Maintain course |
| 5 months | Tier 1 scope cuts | Start fundraising conversations | Reassess in 30 days |
| 4 months | Active fundraising + Tier 1 fully executed | Add Tier 2 hiring deferrals | Continue fundraising |
| 3 months | Tier 1 + Tier 2 fully executed | Pursue Tier 3 bridge financing | Close bridge or round |
| 2 months | Tier 3 bridge executed or in progress | Begin Tier 4 emergency actions | Bridge must close within 30 days |
| 1 month | Tier 4 fully executed | Seek acqui-hire or orderly wind-down | Any capital injection buys time |

### 7.7 Contingency Impact on Metrics

| Contingency Tier | Burn Reduction | Timeline Impact | Metric Impact |
|-----------------|---------------|----------------|---------------|
| Tier 1 (Scope) | -$4.5K-$7K/mo | +2-3 months to milestones | Lower MAU growth; delayed specialist features; no Kenya prep |
| Tier 2 (Hiring) | -$3.6K-$6K/mo | +1-2 months to milestones | Reduced consultation completion rate; lower doctor utilization; higher response times |
| Tier 3 (Bridge) | N/A (adds capital) | No delay if closed quickly | Potential dilution or debt obligation; minor distraction |
| Tier 4 (Emergency) | -$10K-$25K/mo | Indefinite delay | All growth metrics frozen; product stagnation; high risk of user and team attrition |

### 7.8 Pre-Positioned Contingency Preparations

Actions to take during GREEN status to prepare for potential future downturns:

| Preparation | When | Cost | Purpose |
|-------------|------|------|---------|
| Maintain updated pitch deck | Ongoing | Time only | Ready for opportunistic fundraising |
| Build relationships with 5-10 potential investors | Pre-Pilot through Pilot 1 | Time only | Pipeline ready if fundraising needed |
| Identify and document potential grant programs | Pre-Pilot | Time only | Non-dilutive capital options mapped |
| Negotiate deferred-payment terms with key vendors | Pilot 1 | Time only | Reduce immediate cash outflow in crunch |
| Create a "minimum viable service" configuration | Pre-Pilot | 20-30 hours | Know exactly what to cut and what to keep |
| Pre-negotiate convertible note terms with advisors | Pre-Pilot | Legal review $500-$1,000 | Bridge financing ready to activate quickly |

---

## 8. Cross-References

| Topic | Document |
|-------|----------|
| Foundation parameters and assumptions | [params.md](./params.md) |
| Business metrics definitions and targets | [Document 09 — Business Metrics](./09-business-metrics.md) |
| Cost breakdown by phase and scenario | Document 03 — Cost Breakdown |
| Revenue modelling across 21 combinations | Document 05 — Revenue Modelling |
| Effort estimation and timeline | Document 04 — Effort Estimation |
| Timeline and phase definitions | Document 01 — Timeline |
| Equity and capital structure | params.md Section 8 |

---

*End of Document 10 — Cash Flow & Runway. All figures trace to params.md v2.*
