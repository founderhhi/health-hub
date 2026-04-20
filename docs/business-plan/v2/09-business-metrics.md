# 09 — Business Metrics

**Health Hub Business Plan v2 | Document 9**
**Version:** 2.0 | **Date:** March 2026

> All assumptions, rates, scenarios, and phase definitions in this document are
> sourced from [params.md](./params.md). Refer to that document for any
> parameter clarification.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Metric Definitions](#2-metric-definitions)
3. [Metrics by Phase](#3-metrics-by-phase)
4. [Metrics by Scenario](#4-metrics-by-scenario)
5. [Operational Metrics](#5-operational-metrics)
6. [Dashboard Design](#6-dashboard-design)
7. [Benchmarks](#7-benchmarks)
8. [Cross-References](#8-cross-references)

---

## 1. Executive Summary

This document defines the complete metrics framework for tracking Health Hub's
performance from pre-pilot internal testing through production-scale operations.
The framework is designed for three audiences: (1) founders making day-to-day
operational decisions, (2) investors evaluating traction and capital efficiency,
and (3) operations managers monitoring service quality.

Health Hub operates as both a technology platform and an admin-assisted healthcare
delivery operation (per params.md Section 1). This dual nature requires metrics
that span traditional SaaS KPIs (MRR, churn, LTV:CAC) and healthcare-specific
operational indicators (doctor utilization, consultation completion, callback
conversion). The framework tracks 15 core business metrics and 5 operational
metrics across all 4 phases and 21 scenario combinations.

**Key targets at steady-state production:**
- LTV:CAC ratio > 3x (per params.md Section 12)
- Doctor utilization rate > 60% during operational hours (per params.md Section 12)
- Monthly active patients > 1,000 by end of Pilot 2
- Monthly burn rate sustainable for 6+ months at any checkpoint
- Consultation completion rate > 85%
- DAU/MAU ratio > 25% (indicating strong engagement)

---

## 2. Metric Definitions

### 2.1 Customer Acquisition Cost (CAC)

| Attribute | Detail |
|-----------|--------|
| **Definition** | Total cost of acquiring one new paying user, including marketing spend, sales effort, onboarding cost, and partner activation cost |
| **Formula** | CAC = (Total acquisition spend in period) / (New paying users acquired in period) |
| **Includes** | Digital marketing, referral incentives, partner clinic activation, community health worker outreach, admin staff time spent on onboarding |
| **Excludes** | Product development costs, infrastructure, existing user retention spend |
| **Measurement frequency** | Monthly |
| **Why it matters** | In East African markets where willingness to pay is constrained ($28/year health expenditure per capita in Ethiopia per params.md Section 9.1), CAC must remain extremely low to achieve viable unit economics |

### 2.2 Lifetime Value (LTV)

| Attribute | Detail |
|-----------|--------|
| **Definition** | Total net revenue expected from a single user over their entire relationship with Health Hub |
| **Formula** | LTV = ARPU x Gross Margin % x (1 / Monthly Churn Rate) |
| **Components** | Consultation fees, pharmacy commissions, diagnostics commissions, premium subscription fees, care coordination fees |
| **Time horizon** | Modeled over 24-month expected user lifetime (conservative for emerging markets) |
| **Measurement frequency** | Quarterly (requires sufficient cohort data) |
| **Why it matters** | LTV determines maximum justifiable CAC and signals whether the business model generates surplus value per user |

### 2.3 LTV:CAC Ratio

| Attribute | Detail |
|-----------|--------|
| **Definition** | Ratio of user lifetime value to cost of acquiring that user |
| **Formula** | LTV:CAC = LTV / CAC |
| **Target** | > 3x by Production (per params.md Section 12) |
| **Healthy range** | 3x-5x is sustainable; < 2x is unsustainable; > 5x may indicate under-investment in growth |
| **Measurement frequency** | Quarterly |
| **Why it matters** | The single most important unit economics metric. Below 3x, the company burns capital faster than it creates value per user |

### 2.4 Churn Rate

| Attribute | Detail |
|-----------|--------|
| **Definition** | Percentage of active users who stop using the platform in a given period |
| **Formula** | Monthly Churn = (Users lost in month) / (Users at start of month) x 100 |
| **User types tracked** | Patient churn (primary), facility churn (B2B), doctor churn (supply-side) |
| **Measurement frequency** | Monthly |
| **Why it matters** | Healthcare platforms in emerging markets face high churn from connectivity issues, alternative care-seeking behavior, and price sensitivity. Churn directly compresses LTV |

### 2.5 Average Revenue Per User (ARPU)

| Attribute | Detail |
|-----------|--------|
| **Definition** | Average monthly revenue generated per active user |
| **Formula** | ARPU = Total monthly revenue / Monthly active users |
| **Segmented** | Patient ARPU, facility ARPU, blended ARPU |
| **Measurement frequency** | Monthly |
| **Why it matters** | Tracks monetization efficiency per user; critical for validating pricing corridors (params.md Section 11.2) |

### 2.6 Monthly Recurring Revenue (MRR)

| Attribute | Detail |
|-----------|--------|
| **Definition** | Predictable revenue received every month from subscriptions and recurring platform fees |
| **Formula** | MRR = (Number of subscribers x subscription price) + (Number of facilities x platform fee) |
| **Components** | Premium patient subscriptions (ETB 200-400/mo or KES 400-800/mo) + facility platform fees (ETB 2,000-5,000/mo or KES 5,000-10,000/mo) |
| **Measurement frequency** | Monthly |
| **Why it matters** | MRR provides revenue predictability. Until MRR exceeds fixed costs, the company depends on transactional revenue which is inherently volatile |

### 2.7 Annual Recurring Revenue (ARR)

| Attribute | Detail |
|-----------|--------|
| **Definition** | MRR annualized |
| **Formula** | ARR = MRR x 12 |
| **Measurement frequency** | Monthly (calculated) |
| **Why it matters** | Standard SaaS valuation metric. Investors benchmark Health Hub's ARR against comparable East African health tech companies |

### 2.8 Burn Rate

| Attribute | Detail |
|-----------|--------|
| **Definition** | Net cash consumed per month after revenue |
| **Formula** | Burn Rate = Total monthly outflow - Total monthly revenue |
| **Components** | Team cost ($14,830/mo per params.md Section 3.2) + ops staff ($0-$6,542/mo by phase per params.md Section 4.2) + infra ($65-$800/mo midpoint by phase per params.md Section 7.4) + one-time costs amortized |
| **Measurement frequency** | Monthly |
| **Why it matters** | Burn rate divided into remaining cash equals runway. For a self-funded company (S1), burn rate is the primary survival constraint |

### 2.9 Runway

| Attribute | Detail |
|-----------|--------|
| **Definition** | Number of months of operation remaining at current burn rate |
| **Formula** | Runway = Cash on hand / Monthly burn rate |
| **Critical threshold** | < 2 months triggers contingency actions |
| **Measurement frequency** | Monthly |
| **Why it matters** | The company dies when runway reaches zero. Per params.md Section 12, monthly burn rate must be sustainable for 6+ months at any point |

### 2.10 Gross Margin

| Attribute | Detail |
|-----------|--------|
| **Definition** | Revenue minus direct cost of delivering the service, expressed as a percentage |
| **Formula** | Gross Margin = (Revenue - COGS) / Revenue x 100 |
| **COGS includes** | Doctor salaries for employed doctors, video infrastructure (Daily.co), SMS/notification costs, payment processing fees |
| **COGS excludes** | Team salaries (below the line), marketing, admin overhead |
| **Measurement frequency** | Monthly |
| **Why it matters** | Gross margin must be positive before the business model is viable. Low gross margin in healthcare indicates mispriced services or excessive delivery costs |

### 2.11 Net Margin

| Attribute | Detail |
|-----------|--------|
| **Definition** | Total revenue minus all costs (COGS + operating expenses + team + infra), expressed as a percentage |
| **Formula** | Net Margin = (Revenue - All Costs) / Revenue x 100 |
| **Measurement frequency** | Monthly |
| **Why it matters** | Net margin positive = the company is self-sustaining. Expected to be deeply negative during Pilot phases and approach breakeven during Production |

### 2.12 DAU/MAU Ratio (Stickiness)

| Attribute | Detail |
|-----------|--------|
| **Definition** | Ratio of daily active users to monthly active users, measuring how often users return |
| **Formula** | DAU/MAU = Average daily active users / Monthly active users |
| **Target** | > 25% by Production |
| **Measurement frequency** | Daily (rolling 30-day MAU) |
| **Why it matters** | Healthcare apps typically have lower DAU/MAU than social apps but higher than banking apps. A ratio below 15% suggests the platform is used only for acute episodes, not as a primary care gateway |

### 2.13 Consultation Completion Rate

| Attribute | Detail |
|-----------|--------|
| **Definition** | Percentage of initiated consultations that reach a completed state (diagnosis + next-step issued) |
| **Formula** | Completion Rate = Completed consultations / Initiated consultations x 100 |
| **Excludes** | Cancelled before doctor assignment, test/demo consultations |
| **Target** | > 85% by Production |
| **Measurement frequency** | Weekly |
| **Why it matters** | Incomplete consultations represent failed service delivery. They generate no revenue, damage trust, and increase churn. Low completion rate signals tech issues (video drops), staffing gaps, or UX problems |

### 2.14 Doctor Utilization Rate

| Attribute | Detail |
|-----------|--------|
| **Definition** | Percentage of available doctor hours that are spent in active consultations |
| **Formula** | Utilization = (Hours in consultations) / (Total scheduled doctor hours) x 100 |
| **Target** | > 60% during operational hours (per params.md Section 12) |
| **Measurement frequency** | Daily |
| **Why it matters** | Employed doctors (INR 60,000/mo per params.md Section 4.1) are a fixed cost. Low utilization means overstaffing; high utilization (>85%) means patient wait times are unacceptable. 60-75% is the healthy band |

### 2.15 Net Promoter Score (NPS)

| Attribute | Detail |
|-----------|--------|
| **Definition** | Likelihood that a user would recommend Health Hub to others, measured on a 0-10 scale |
| **Formula** | NPS = % Promoters (9-10) - % Detractors (0-6) |
| **Collection method** | In-app survey after consultation completion; quarterly email survey for inactive users |
| **Target** | > 40 by Production (good); > 60 is excellent |
| **Measurement frequency** | Quarterly |
| **Why it matters** | In markets where word-of-mouth drives adoption more than digital marketing, NPS is a leading indicator of organic growth. Ethiopian and Kenyan healthcare decisions are heavily influenced by personal recommendations |

---

## 3. Metrics by Phase

### 3.1 Pre-Pilot Phase (Months 1-6, 100-200 internal users)

| Metric | Target Value | Rationale |
|--------|-------------|-----------|
| CAC | Not measured (internal users) | No external acquisition; users are team members, advisors, partner staff |
| LTV | Not measured | No revenue; testing phase |
| LTV:CAC | N/A | No revenue |
| Churn Rate | < 20% monthly | Internal users should stay engaged; high churn signals UX problems |
| ARPU | $0 | No monetization |
| MRR | $0 | No subscriptions active |
| ARR | $0 | No subscriptions active |
| Burn Rate | $14,830-$14,980/mo (team + infra) | Team $14,830 + infra $65-$150 (per params.md Sections 3.2, 7.4); no ops staff |
| Runway | Depends on starting capital | Must be > 6 months |
| Gross Margin | N/A | No revenue |
| Net Margin | N/A | No revenue |
| DAU/MAU | > 30% | Internal testers should be active daily; signals platform readiness |
| Consultation Completion Rate | > 70% | Lower target acceptable; focus is on identifying failure modes |
| Doctor Utilization | N/A | No employed doctors yet |
| NPS | > 30 (internal benchmark) | Team members providing honest feedback |

### 3.2 Pilot 1 Phase (Months 5-9, up to 1,000 users)

| Metric | Target Value | Rationale |
|--------|-------------|-----------|
| CAC | < $5 per user | Low-cost acquisition through partner clinics, community outreach; subsidized onboarding |
| LTV | $8-$15 (estimated) | Based on 6-12 month retention at subsidized pricing (ETB 150-300 per GP consult) |
| LTV:CAC | > 1.5x | Not yet at 3x target; proving directional viability |
| Churn Rate | < 15% monthly | Early users are curated; lower churn expected from engaged pilot cohort |
| ARPU | $0.50-$2.00/mo | Subsidized/symbolic pricing; $0-$500/mo total revenue across user base (per params.md Section 11.3) |
| MRR | $0-$100 | Subscriptions not yet active; any recurring revenue is a bonus |
| ARR | $0-$1,200 | Annualized from minimal MRR |
| Burn Rate | $17,312-$17,832/mo | Team $14,830 + ops staff $2,482 (per params.md Section 4.2) + infra $270 midpoint (per params.md Section 7.4) - revenue $0-$500 |
| Runway | Must remain > 6 months | Critical checkpoint before committing to Pilot 2 |
| Gross Margin | -50% to 0% | Revenue likely does not cover direct service delivery costs at subsidized rates |
| Net Margin | < -500% | Deeply negative; expected and acceptable during pilot |
| DAU/MAU | > 20% | Real users; healthcare usage is episodic. 20%+ signals meaningful engagement |
| Consultation Completion Rate | > 75% | Improving from Pre-Pilot; real patient consultations must complete reliably |
| Doctor Utilization | 30-50% | 2 employed doctors (per params.md Section 4.2); demand still building |
| NPS | > 35 | Early adopters tend to be more forgiving; baseline for improvement tracking |

### 3.3 Pilot 2 Phase (Months 8-18, 5,000-10,000 users)

| Metric | Target Value | Rationale |
|--------|-------------|-----------|
| CAC | < $3 per user | Economies of scale; word-of-mouth reducing paid acquisition share |
| LTV | $15-$35 | Pricing at 50% of target (per params.md Section 11.3); longer retention emerging |
| LTV:CAC | > 2.5x | Approaching the 3x target; unit economics becoming clear |
| Churn Rate | < 10% monthly | Users seeing real value; sticky workflows (prescriptions, lab results) reducing churn |
| ARPU | $2-$5/mo | 50% of target pricing active; specialist consults available |
| MRR | $200-$1,500 | Early premium subscriptions + some facility platform fees |
| ARR | $2,400-$18,000 | Meaningful ARR for investor narrative |
| Burn Rate | $19,191-$20,091/mo | Team $14,830 + ops staff $4,361 (per params.md Section 4.2) + infra $460 midpoint (per params.md Section 7.4) - revenue $500-$3,000 |
| Runway | Must remain > 6 months | Investor capital may have arrived (S2, S3); extends runway significantly |
| Gross Margin | 10-30% | Revenue beginning to cover direct delivery costs |
| Net Margin | -200% to -100% | Still negative but improving rapidly |
| DAU/MAU | > 22% | Growing user base with episodic but recurring healthcare needs |
| Consultation Completion Rate | > 80% | System reliability improving; operational SOPs in place |
| Doctor Utilization | 50-65% | 4 doctors (per params.md Section 4.2); approaching target utilization |
| NPS | > 40 | Service quality must be consistently good to sustain growth |

### 3.4 Production Phase (Months 16-34, full scale)

| Metric | Target Value | Rationale |
|--------|-------------|-----------|
| CAC | < $2 per user | Strong word-of-mouth; organic growth dominant; partner network driving referrals |
| LTV | $30-$60 | Full pricing active; 18-24 month expected lifetime; multiple revenue streams per user |
| LTV:CAC | > 3x (target per params.md Section 12) | Unit economics proven; growth investment justified |
| Churn Rate | < 8% monthly | Platform deeply integrated into user healthcare journey |
| ARPU | $5-$15/mo | Full pricing across GP, specialist, pharmacy, diagnostics; premium subscriptions |
| MRR | $3,000-$15,000 | Per params.md Section 11.3; subscriptions + facility fees providing stable base |
| ARR | $36,000-$180,000 | Meaningful ARR; basis for Series A narrative |
| Burn Rate | $18,830-$22,172/mo declining | Team $14,830 + ops staff $6,542 (per params.md Section 4.2) + infra $800 midpoint (per params.md Section 7.4) - revenue $3,000-$15,000 |
| Runway | > 12 months or self-sustaining | Approaching breakeven; burn rate declining as revenue scales |
| Gross Margin | 40-60% | Technology platform economics; marginal cost of additional consultation is low |
| Net Margin | -50% to +10% | Approaching breakeven; best-case paths achieve positive net margin |
| DAU/MAU | > 25% | Target engagement level; users treating Health Hub as primary care gateway |
| Consultation Completion Rate | > 85% | Mature operational processes; reliable technology; trained doctor pool |
| Doctor Utilization | > 60% (target per params.md Section 12) | 6 doctors (per params.md Section 4.2); scheduling optimized |
| NPS | > 50 | Market-leading satisfaction; drives organic growth |

### 3.5 Phase Progression Summary

| Metric | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|--------|-----------|---------|---------|------------|
| CAC | N/A | < $5 | < $3 | < $2 |
| LTV | N/A | $8-$15 | $15-$35 | $30-$60 |
| LTV:CAC | N/A | > 1.5x | > 2.5x | > 3x |
| Churn (monthly) | < 20% | < 15% | < 10% | < 8% |
| ARPU | $0 | $0.50-$2 | $2-$5 | $5-$15 |
| MRR | $0 | $0-$100 | $200-$1,500 | $3,000-$15,000 |
| ARR | $0 | $0-$1,200 | $2,400-$18,000 | $36,000-$180,000 |
| Burn Rate/mo | ~$14,900 | ~$17,600 | ~$19,600 | ~$20,500 declining |
| Gross Margin | N/A | -50% to 0% | 10-30% | 40-60% |
| Net Margin | N/A | < -500% | -200% to -100% | -50% to +10% |
| DAU/MAU | > 30% | > 20% | > 22% | > 25% |
| Consult Completion | > 70% | > 75% | > 80% | > 85% |
| Doctor Utilization | N/A | 30-50% | 50-65% | > 60% |
| NPS | > 30 | > 35 | > 40 | > 50 |

---

## 4. Metrics by Scenario

### 4.1 How Scenarios Affect Metrics

The 21 combinations (per params.md Section 15) affect metrics through three primary channels:

1. **Speed of user acquisition** — Higher investment levels (L2, L3) fund more marketing and partner activation, reducing CAC but increasing total spend
2. **Ops staff ramp** — Higher levels allow faster hiring of doctors, admin, and tech support, improving consultation completion and utilization
3. **Runway pressure** — Self-funded paths (S1) face constant pressure to reduce burn, which constrains growth investment and delays LTV:CAC maturity

### 4.2 Summary Table: Key Metrics Across All 21 Combinations at End of Pilot 2

| # | Code | CAC | LTV | LTV:CAC | Churn/mo | ARPU | MRR | Burn Rate/mo | Runway Risk |
|---|------|-----|-----|---------|----------|------|-----|-------------|-------------|
| 1 | S1-L1 | $6-$8 | $8-$12 | 1.2x | 18% | $1.00 | $50 | $8,700 | HIGH |
| 2 | S1-L2 | $4-$5 | $12-$20 | 2.5x | 12% | $2.50 | $400 | $17,600 | MEDIUM |
| 3 | S1-L3 | $3-$4 | $18-$30 | 5.0x | 9% | $4.00 | $1,200 | $28,000 | MEDIUM |
| 4 | S2-O1-I1 | $5-$7 | $10-$15 | 1.5x | 15% | $1.50 | $100 | $9,500 | MEDIUM |
| 5 | S2-O1-I2 | $4-$5 | $12-$22 | 3.0x | 11% | $2.50 | $400 | $17,600 | LOW |
| 6 | S2-O1-I3 | $3-$4 | $15-$28 | 4.5x | 9% | $3.50 | $900 | $26,000 | LOW |
| 7 | S2-O2-I1 | $4-$6 | $12-$18 | 2.0x | 13% | $2.00 | $250 | $12,500 | MEDIUM |
| 8 | S2-O2-I2 | $3-$4 | $15-$25 | 3.5x | 10% | $3.50 | $800 | $19,600 | LOW |
| 9 | S2-O2-I3 | $2-$3 | $18-$32 | 5.5x | 8% | $4.50 | $1,400 | $28,500 | LOW |
| 10 | S2-O3-I1 | $3-$5 | $15-$22 | 3.0x | 11% | $3.00 | $500 | $18,000 | MEDIUM |
| 11 | S2-O3-I2 | $2-$3 | $18-$30 | 5.0x | 9% | $4.00 | $1,100 | $24,000 | LOW |
| 12 | S2-O3-I3 | $2-$3 | $22-$35 | 6.0x | 7% | $5.00 | $1,800 | $32,000 | LOW |
| 13 | S3-O1-I1 | $5-$7 | $10-$15 | 1.5x | 15% | $1.50 | $100 | $9,500 | HIGH |
| 14 | S3-O1-I2 | $3-$5 | $14-$24 | 3.5x | 10% | $3.00 | $500 | $18,000 | LOW |
| 15 | S3-O1-I3 | $2-$4 | $18-$30 | 5.0x | 8% | $4.00 | $1,200 | $27,000 | LOW |
| 16 | S3-O2-I1 | $4-$6 | $12-$18 | 2.0x | 13% | $2.00 | $250 | $12,500 | MEDIUM |
| 17 | S3-O2-I2 | $3-$4 | $16-$28 | 4.0x | 9% | $3.50 | $900 | $20,000 | LOW |
| 18 | S3-O2-I3 | $2-$3 | $20-$33 | 5.5x | 7% | $4.50 | $1,500 | $29,000 | LOW |
| 19 | S3-O3-I1 | $3-$5 | $15-$22 | 3.0x | 11% | $3.00 | $500 | $18,000 | MEDIUM |
| 20 | S3-O3-I2 | $2-$3 | $20-$32 | 5.5x | 8% | $4.50 | $1,300 | $25,000 | LOW |
| 21 | S3-O3-I3 | $1-$2 | $25-$38 | 8.0x | 6% | $5.50 | $2,000 | $34,000 | LOW |

**Notes on the table:**
- S1-L1 burn rate reflects 40% of ideal spending level (per params.md Section 14.2), hence lower absolute burn but also lower service quality and slower growth
- Runway risk is HIGH when remaining runway at end of Pilot 2 is < 4 months; MEDIUM when 4-8 months; LOW when > 8 months or investor-backed
- LTV:CAC ratios above 5x in heavily funded paths reflect lower CAC from economies of scale, not necessarily higher absolute LTV

### 4.3 Scenario Group Patterns

**S1 (Self-Funded) — 3 combinations:**
- CAC remains high due to limited marketing budget
- LTV growth is constrained by slower user acquisition (smaller network effects)
- Runway is the binding constraint; metrics take a back seat to survival
- S1-L1 is the highest-risk path; S1-L3 requires significant founder capital but produces the best self-funded metrics

**S2 (Investor During Transition) — 9 combinations:**
- Investor capital arrives at the Pilot 1-to-Pilot 2 transition, providing a runway buffer
- Combinations where investor level >= O2 (e.g., S2-O1-I2, S2-O2-I2) represent the best capital-efficient paths
- S2-O2-I2 is the baseline recommended path: balanced own spending with ideal investor matching

**S3 (Investor After Pilot 1) — 9 combinations:**
- Earlier investor arrival accelerates all metrics but requires giving up equity sooner (per params.md Section 8.3)
- S3-O3-I3 produces the best absolute metrics (LTV:CAC 8x, highest ARPU) but requires the most capital and carries the highest absolute burn
- S3-O1-I1 is essentially a "small money early" path that provides modest improvement over S1

---

## 5. Operational Metrics

### 5.1 Callback Conversion Rate

| Attribute | Detail |
|-----------|--------|
| **Definition** | Percentage of admin callbacks that result in a booked consultation or completed service |
| **Formula** | Conversion = (Callbacks resulting in booked service) / (Total callbacks made) x 100 |
| **Target by phase** | Pre-Pilot: N/A; Pilot 1: > 25%; Pilot 2: > 35%; Production: > 45% |
| **Why it matters** | Health Hub's admin-assisted model (per params.md Section 1) depends on callbacks converting to revenue. Low conversion suggests poor targeting, wrong timing, or misaligned service offerings |

### 5.2 Average Response Time

| Attribute | Detail |
|-----------|--------|
| **Definition** | Time elapsed between a patient initiating a consultation request and receiving a response (doctor assignment or callback acknowledgment) |
| **Measurement** | Median response time (not mean, to avoid outlier distortion) |
| **Target by phase** | Pilot 1: < 30 minutes; Pilot 2: < 15 minutes; Production: < 10 minutes |
| **Why it matters** | Response time is the primary driver of patient satisfaction in telehealth. In East African markets where patients are accustomed to long clinic waits, fast response is a key differentiator |

### 5.3 Doctor Coverage Hours

| Attribute | Detail |
|-----------|--------|
| **Definition** | Percentage of target operating hours (e.g., 16 hours/day for 2-shift coverage) that have at least one doctor available |
| **Formula** | Coverage = (Hours with >= 1 doctor online) / (Target operating hours) x 100 |
| **Target by phase** | Pilot 1: > 80% (2 doctors, 2 shifts per params.md Section 4.4); Pilot 2: > 90%; Production: > 98% (near-24/7) |
| **Why it matters** | Coverage gaps mean patients encounter "no doctor available" — the fastest way to lose trust and drive churn |

### 5.4 Admin Resolution Time

| Attribute | Detail |
|-----------|--------|
| **Definition** | Average time for admin ops staff to resolve a patient issue (prescription fulfillment, lab booking, partner coordination, billing query) |
| **Measurement** | Median time from ticket creation to resolution |
| **Target by phase** | Pilot 1: < 4 hours; Pilot 2: < 2 hours; Production: < 1 hour |
| **Why it matters** | Admin staff are a direct cost ($217/mo per params.md Section 4.1); slow resolution means either understaffing or poor SOPs |

### 5.5 Support Ticket Volume

| Attribute | Detail |
|-----------|--------|
| **Definition** | Number of support tickets created per 100 active users per month |
| **Formula** | Volume = (Total tickets in month) / (MAU / 100) |
| **Target by phase** | Pilot 1: < 30 per 100 users; Pilot 2: < 20 per 100 users; Production: < 12 per 100 users |
| **Why it matters** | High ticket volume relative to user base signals UX problems, bugs, or confusing workflows. Declining ticket volume per user confirms platform maturity |

### 5.6 Operational Metrics Summary Table

| Metric | Pilot 1 | Pilot 2 | Production |
|--------|---------|---------|------------|
| Callback conversion rate | > 25% | > 35% | > 45% |
| Median response time | < 30 min | < 15 min | < 10 min |
| Doctor coverage hours | > 80% | > 90% | > 98% |
| Median admin resolution time | < 4 hrs | < 2 hrs | < 1 hr |
| Support tickets per 100 MAU | < 30 | < 20 | < 12 |

---

## 6. Dashboard Design

### 6.1 Design Principles

The metrics dashboard serves three distinct audiences with different update frequencies and depth requirements:

| Audience | Update Frequency | Primary Concern | View Type |
|----------|-----------------|-----------------|-----------|
| Founders | Daily | Burn rate, runway, active users, revenue | Executive summary + alerts |
| Investors | Monthly/Quarterly | LTV:CAC, MRR/ARR, churn, growth rate | Trend charts + cohort analysis |
| Operations managers | Real-time / Daily | Doctor utilization, response time, ticket volume, consultation completion | Operational dashboard |

### 6.2 Pre-Pilot Dashboard

| Panel | Metrics Shown | Visualization |
|-------|--------------|---------------|
| Build Progress | Feature completion %, bugs open/closed, test coverage | Progress bars |
| Internal Usage | DAU/MAU, sessions per user, feature adoption heatmap | Line chart + heatmap |
| Burn Tracker | Monthly spend vs budget, runway remaining | Countdown gauge |
| Consultation Testing | Completion rate, average duration, failure modes | Bar chart |

### 6.3 Pilot 1 Dashboard

| Panel | Metrics Shown | Visualization |
|-------|--------------|---------------|
| User Growth | Total registered, MAU, DAU, DAU/MAU ratio | Line chart with growth rate |
| Revenue | Total revenue, ARPU, transactions by type | Stacked bar chart |
| Unit Economics | CAC, estimated LTV, LTV:CAC trajectory | Trend line with target bands |
| Burn & Runway | Monthly burn rate, cash remaining, runway months | Gauge + forecast line |
| Operations | Doctor utilization, consultation completion rate, response time | Real-time gauges |
| Quality | NPS (if collected), support ticket volume, resolution time | Scorecard |

### 6.4 Pilot 2 Dashboard

| Panel | Metrics Shown | Visualization |
|-------|--------------|---------------|
| Growth & Retention | MAU growth rate, churn rate by cohort, reactivation rate | Cohort retention curves |
| Revenue | MRR, ARR, revenue by stream, ARPU by segment | Revenue waterfall + trend |
| Unit Economics | CAC by channel, LTV by cohort, LTV:CAC ratio, payback period | Scatter plot + trend |
| Burn & Runway | Burn rate trend, cash position, months to breakeven forecast | Dual-axis chart |
| Operational Health | Doctor utilization, coverage hours, callback conversion, admin resolution time | Multi-gauge dashboard |
| Market Metrics | Users by geography, facility partners onboarded, pharmacy/lab network size | Map + counters |
| Quality | NPS, CSAT, support ticket trend, consultation completion rate | Trend lines |

### 6.5 Production Dashboard

All Pilot 2 panels plus:

| Panel | Metrics Shown | Visualization |
|-------|--------------|---------------|
| P&L Summary | Revenue, COGS, gross margin, operating expenses, net margin | Monthly P&L waterfall |
| Investor View | ARR, ARR growth rate, LTV:CAC, burn multiple, months to profitability | KPI tiles with trend arrows |
| Predictive | Revenue forecast (3-month), churn prediction, CAC efficiency forecast | Forecast lines with confidence intervals |
| Compliance | Uptime %, data breach incidents, regulatory milestone tracker | Status indicators |

### 6.6 Alert Thresholds

| Alert | Trigger | Severity | Action |
|-------|---------|----------|--------|
| Runway critical | < 2 months remaining | CRITICAL | Trigger contingency plan (see Document 10) |
| Runway warning | < 4 months remaining | WARNING | Begin fundraising preparation or scope reduction |
| Churn spike | Monthly churn increases > 5 percentage points | WARNING | Root cause analysis within 48 hours |
| Utilization low | Doctor utilization < 30% for 2+ weeks | WARNING | Reduce doctor hours or increase marketing |
| Utilization high | Doctor utilization > 85% for 1+ week | WARNING | Add doctor shifts; patient wait times at risk |
| Completion drop | Consultation completion rate drops below 70% | CRITICAL | Technical investigation + ops review immediately |
| NPS decline | NPS drops > 15 points quarter-over-quarter | WARNING | User research and service review |

---

## 7. Benchmarks

### 7.1 East African Health Tech Benchmarks

These benchmarks are derived from publicly available data on comparable companies
operating in East Africa (M-TIBA, Babyl/Babylon Health Rwanda, MyDawa Kenya,
mPharma, Ilara Health) as of 2025-2026.

| Metric | East African Health Tech Range | Health Hub Target (Production) | Assessment |
|--------|-------------------------------|-------------------------------|------------|
| CAC | $3-$10 | < $2 | Aggressive but achievable via partner clinic channel and admin-assisted onboarding |
| LTV | $15-$50 | $30-$60 | Within range; higher end dependent on multi-service usage per user |
| LTV:CAC | 1.5x-4x | > 3x | Aligned with regional best performers |
| Monthly churn | 8-20% | < 8% | Ambitious; requires strong retention loops (prescriptions, follow-ups, callbacks) |
| ARPU | $1-$5/mo | $5-$15/mo | Higher than regional average; justified by multi-service platform + premium tier |
| Gross margin | 30-55% | 40-60% | Competitive; platform model should yield higher margins than clinic-heavy models |
| Doctor utilization | 35-55% | > 60% | Above regional average; requires excellent scheduling and demand management |
| DAU/MAU | 10-20% | > 25% | Significantly above regional average; requires strong daily engagement hooks |
| NPS | 25-45 | > 50 | Ambitious; top-quartile for healthcare in emerging markets |
| Consultation completion | 65-80% | > 85% | Above regional average; enabled by admin-assisted model and employed doctor pool |

### 7.2 Global Telehealth Benchmarks

These benchmarks are derived from publicly available data on global telehealth
platforms (Teladoc, Amwell, Doctor on Demand, Practo, KRY/Livi) as of 2025-2026.

| Metric | Global Telehealth Range | Health Hub Target (Production) | Assessment |
|--------|------------------------|-------------------------------|------------|
| CAC | $25-$150 | < $2 | Dramatically lower; reflects emerging market dynamics and organic/partner-driven acquisition |
| LTV | $200-$1,500 | $30-$60 | Much lower in absolute terms; reflects lower pricing corridors in East Africa |
| LTV:CAC | 3x-8x | > 3x | Within global healthy range |
| Monthly churn | 3-8% | < 8% | Higher churn acceptable given lower switching costs in emerging markets |
| ARPU | $15-$80/mo | $5-$15/mo | Lower ARPU offset by lower delivery costs (Indian ops staff per params.md Section 4.1) |
| Gross margin | 40-65% | 40-60% | Comparable; technology-platform economics are geography-neutral |
| Doctor utilization | 50-70% | > 60% | Within global healthy range |
| DAU/MAU | 15-30% | > 25% | Within global healthy range |
| NPS | 40-70 | > 50 | Within global healthy range |
| Consultation completion | 80-92% | > 85% | Within global healthy range |

### 7.3 Benchmark Positioning Summary

| Dimension | Health Hub vs East African Peers | Health Hub vs Global Telehealth |
|-----------|--------------------------------|-------------------------------|
| Acquisition cost | Lower CAC (partner-driven) | Dramatically lower (100x less) |
| Monetization | Higher ARPU (multi-service) | Lower ARPU (emerging market pricing) |
| Retention | More ambitious churn targets | Comparable churn expectations |
| Efficiency | Higher utilization targets | Comparable utilization |
| Satisfaction | Higher NPS targets | Comparable NPS |
| Margins | Comparable gross margins | Comparable gross margins |
| Overall positioning | Premium operator in the region | Emerging market adaptation of proven global model |

**Key insight:** Health Hub's competitive advantage is the combination of low CAC
(partner-driven, admin-assisted acquisition), multi-service ARPU (not just
consultations but pharmacy + diagnostics + care coordination), and low delivery
costs (India-based ops staff). This triangulation creates unit economics that are
competitive with global benchmarks despite dramatically lower absolute pricing.

---

## 8. Cross-References

| Topic | Document |
|-------|----------|
| Foundation parameters and assumptions | [params.md](./params.md) |
| Cost breakdown by phase and scenario | Document 03 — Cost Breakdown |
| Revenue modelling across 21 combinations | Document 05 — Revenue Modelling |
| Pricing strategy and corridors | Document 06 — Pricing Strategy |
| Customer acquisition strategy and channels | Document 08 — Customer Acquisition |
| Cash flow and runway analysis | [Document 10 — Cash Flow & Runway](./10-cash-flow-runway.md) |
| Competitive analysis and market positioning | Document 15 — Competitive Analysis |

---

*End of Document 09 — Business Metrics. All figures trace to params.md v2.*
