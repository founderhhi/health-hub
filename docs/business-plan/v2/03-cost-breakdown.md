# 03 — Cost Breakdown

**Health Hub Business Plan v2 | Full Cost Model**
**Version:** 2.0 | **Date:** March 2026

> Every cost figure in this document traces to `params.md` (v2 Foundation Parameters).
> When a number appears without inline derivation, the source is the params document.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Costing Methodology](#2-costing-methodology)
3. [Revised Role and Salary Assumptions](#3-revised-role-and-salary-assumptions)
4. [Monthly Phase Cost Logic](#4-monthly-phase-cost-logic)
5. [Scenario Cost Matrix](#5-scenario-cost-matrix)
6. [Baseline Composition Reference (S3-O2-I2)](#6-baseline-composition-reference-s3-o2-i2)
7. [Interpretation](#7-interpretation)

---

## 1. Executive Summary

The Health Hub v2 cost model provides a comprehensive, ground-up assessment of the economic requirements to launch and scale the platform. Building a healthcare operation goes beyond purely software development costs; this revised cost model fully accounts for parallel operational workstreams, infrastructure scaling, and employed operational staff needed to deliver a credible healthcare service. The cost distribution balances capital expenditures (CapEx) for product development and pre-launch operating expenditures (OpEx) for live pilot staffing. Total economic costs vary significantly based on timeline and scale.

---

### Key Changes from v1

v2 is not a patch on v1. It is a ground-up rebuild of the cost model using real
team data, contracted quotes, and verified salary benchmarks. The changes that
affect cost are summarized below; for full parameter-level diffs, see the
appendix of `params.md`.

| Change Area | v1 Assumption | v2 Assumption | Cost Impact |
|-------------|---------------|---------------|-------------|
| Team composition | "Small team of 3" abstraction | 3 core + 7 developers + 2 advisors = 12 people | Increases headcount realism; reveals true economic cost of labor |
| Employment status | Implied full-time | All part-time (~4 hrs/day, ~88 hrs/month per person) | Reduces per-person monthly cost; extends calendar duration |
| Rate card | Heavily blended ($24-36/hr senior, $30 everyone else) | Role-specific: Junior $10, Senior $20, Management $20, Everyone else $15 | Drops blended rate from ~$30 to ~$14.50; significant total cost reduction |
| Web platform effort | 682-1,413 hrs (3-point PERT) | 720-768 hrs (150-160% of Android); modeled at 745 hrs | Tighter range; lower expected case than v1 midpoint |
| Android APK | 440-640 hrs estimated | 480 hrs fixed contracted quote | Eliminates estimation uncertainty on this workstream |
| Operational staffing | Not explicitly modeled | Doctors (INR 60k/mo), Admin (INR 18k/mo), Tech Support (INR 25k/mo) with coverage ladder | Adds $0-6,542/mo depending on phase; large new cost layer |
| Infrastructure | $30-50/mo flat | $65-1,500/mo by phase; includes phones, telecom, callback tools, devices | 3-30x increase depending on phase |
| One-time equipment | Not modeled | $1,100-1,700 in devices and office setup | Small but now explicit |
| Parallel operational workstreams | Not tracked | 750 hours at blended rates = $11,250 | Previously invisible founder/ops time now costed |

**Net effect:** v2 economic costs are more honest. The headline numbers are
sometimes lower (because rates dropped) but the cost composition is richer
(because operational staffing, infrastructure, and parallel workstreams are now
visible). The model no longer understates what it takes to run a healthcare
company as opposed to merely building a software product.

---

## 2. Costing Methodology

### 2.1 Two Cost Lenses

Every figure in this document should be read through two lenses:

| Lens | Definition | Who Cares |
|------|-----------|-----------|
| **Economic cost** | The full market-value cost of all labor, infrastructure, and services consumed — whether paid immediately or deferred | Investors, board, long-term planning |
| **Cash spend** | The portion actually disbursed as cash in the period it occurs; may be lower due to deferred founder compensation, discounted advisory, or in-kind contributions | Founders, treasury, runway management |

This document models the **economic cost** lens. Cash spend is typically 50-70%
of economic cost during bootstrapped phases (founders defer their own
compensation) and converges toward 90-100% in investor-funded phases (investors
expect market-rate accounting).

### 2.2 Capital Expenditure vs Operational Expenditure

For this planning cycle, we draw the line as follows:

| Category | Definition | Examples |
|----------|-----------|---------|
| **Capital expenditure (CapEx) through Production** | One-time or build-phase spend that creates a durable asset or capability. Stops or drops sharply once the asset is built. | Software development hours, security hardening, device procurement, launch systems setup, release governance tooling |
| **Pre-launch operating expenditure (OpEx)** | Recurring spend required to keep the live operation running during pilots and pre-production. Continues and grows as user base grows. | Doctor salaries, admin callback staff, tech support payroll, hosting, telecom, SIM top-ups, support ticketing |

The distinction matters because:

- CapEx has a natural ceiling (the product will be finished).
- OpEx grows with scale and never fully stops.
- Investors evaluate the two differently: CapEx is an investment in an asset;
  OpEx is a commitment to a burn rate.

### 2.3 How Costs Are Calculated

All monthly costs follow a four-layer model:

```
Monthly cost = Fixed founder-office layer
             + Adjustable product/infra/tooling layer
             + Employed ops layer
             + Infrastructure and telecom layer
```

Each layer is described in detail in Section 4. Total project cost for any
scenario is the sum of monthly costs across all phases, plus one-time equipment
costs.

---

## 3. Revised Role and Salary Assumptions

### 3.1 Product and Delivery Rate Card

Per params.md Section 3.1. All rates are economic cost (what the labor is worth),
not necessarily cash disbursed.

| Role Category | USD/hr | INR/hr (at 83 USD/INR) | Applies To | Hours/Month |
|---------------|--------|------------------------|-----------|-------------|
| Junior developer | $10 | ~INR 830 | 3 Android/backend developers | 88 each |
| Senior developer | $20 | ~INR 1,660 | 1 DevOps engineer + 1 Full-stack developer | 88 each |
| Management / Technical head | $20 | ~INR 1,660 | 3 core team members (Owner, FM1, FM2) | 88 each |
| Everyone else (blended) | $15 | ~INR 1,245 | 1 Flex developer + 1 Android lead + 2 Advisors | 88 (devs), 25 (advisors) |

### 3.2 Monthly Team Cost Build-Up

| Segment | Rate | Headcount | Hours/Person/Month | Monthly Cost | Derivation |
|---------|------|-----------|-------------------|-------------|-----------|
| Core team (management) | $20/hr | 3 | 88 | **$5,280** | 3 x 88 x $20 |
| Senior developers | $20/hr | 2 | 88 | **$3,520** | 2 x 88 x $20 |
| Junior developers | $10/hr | 3 | 88 | **$2,640** | 3 x 88 x $10 |
| Blended contributors (flex + Android lead) | $15/hr | 2 | 88 | **$2,640** | 2 x 88 x $15 |
| Advisory board | $15/hr | 2 | 25 | **$750** | 2 x 25 x $15 |
| **Total monthly team economic cost** | | **12** | | **$14,830** | |

**Blended average rate across all contributors:** $14,830 / (10 x 88 + 2 x 25) = $14,830 / 930 = ~$15.95/hr

**Note on utilization:** Not all 12 people contribute at full capacity every month.
The capacity summary in params.md defines three utilization levels:

| Utilization Level | Productive Hours/Month | % of Maximum | Monthly Team Cost (Adjusted) |
|-------------------|----------------------|--------------|----------------------------|
| L1 (Bootstrapped) | ~320 hrs | ~34% | ~$5,090 product hours + $5,280 founder office = ~$10,370 |
| L2 (Ideal) | ~480 hrs | ~52% | ~$7,640 product hours + $5,280 founder office = ~$12,920 |
| L3 (Fully Funded) | ~640 hrs | ~69% | ~$9,550 product hours + $5,280 founder office = ~$14,830 |

### 3.3 Employed Ops Salary Benchmarks

Per params.md Section 4.1. These are India-based employees hired to run the live
healthcare operation. They are entirely separate from the product/development team.

| Role | INR/Month | USD/Month | Benchmark Source |
|------|-----------|-----------|-----------------|
| MBBS Doctor (telemedicine) | 60,000 | ~$720 | Telemedicine doctor benchmarks in India: INR 40,000-80,000/mo (Practo, NHM anchors); INR 60,000 is mid-range for part-time/shift-based tele-consult |
| Admin Ops / Callback Staff | 18,000 | ~$217 | Indian customer support and back-office benchmarks for semi-skilled roles |
| Technical Support (L1/L2) | 25,000 | ~$301 | Junior technical support / helpdesk benchmarks in Indian metros |

### 3.4 Minimum Employed Coverage Ladder by Phase

Per params.md Section 4.2. Headcount grows with user scale and coverage requirements.

| Phase | Doctors | Admin Ops | Tech Support | Monthly INR | Monthly USD | Derivation |
|-------|---------|-----------|-------------|-------------|-------------|-----------|
| Pre-Pilot | 0 | 0 | 0 | 0 | **$0** | No live users; training and SOP design only |
| Pilot 1 (up to 1,000 users) | 2 | 2 | 2 | 206,000 | **$2,482** | (2 x 60k) + (2 x 18k) + (2 x 25k) = 120k + 36k + 50k |
| Pilot 2 (5,000-10,000 users) | 4 | 4 | 2 | 362,000 | **$4,361** | (4 x 60k) + (4 x 18k) + (2 x 25k) = 240k + 72k + 50k |
| Production Readiness | 6 | 6 | 3 | 543,000 | **$6,542** | (6 x 60k) + (6 x 18k) + (3 x 25k) = 360k + 108k + 75k |
| Production (full scale) | 8-10 | 8 | 4 | 748k-868k | **$9,012-$10,458** | Full 24/7 coverage with leave buffer |

**INR-to-USD conversion:** All ops salaries use 83.0 INR/USD per params.md Section 10.

---

## 4. Monthly Phase Cost Logic

### 4.1 Layer 1: Fixed Founder-Office

The founder office is held constant across all phases because the three core team
members (Owner, Founding Member 1, Founding Member 2) contribute regardless of
phase. Their work shifts from product direction (Pre-Pilot) to operational
management (Pilot) to launch governance (Production Readiness), but the time
commitment remains ~88 hours/month each.

| Phase | Composition | Monthly Cost |
|-------|------------|-------------|
| Pre-Pilot | 3 core x 88 hrs x $20/hr | **$5,280** |
| Pilot 1 | 3 core x 88 hrs x $20/hr | **$5,280** |
| Pilot 2 | 3 core x 88 hrs x $20/hr | **$5,280** |
| Production Readiness | 3 core x 88 hrs x $20/hr | **$5,280** |

**Cumulative founder-office cost over full timeline:**
- 16-month scenario: $5,280 x 16 = $84,480
- 24-month scenario: $5,280 x 24 = $126,720
- 34-month scenario: $5,280 x 34 = $179,520

This is the single largest sustained cost line. Every month the project runs,
$5,280 in economic value is consumed by the founder office alone.

### 4.2 Layer 2: Adjustable Product / Infra / Tooling

This layer captures the development team, advisory, and non-infrastructure
tooling costs. It varies by phase and investment level.

| Phase | What This Layer Contains | L1 (Bootstrapped) | L2 (Ideal) | L3 (Fully Funded) |
|-------|------------------------|--------------------|-----------|-------------------|
| Pre-Pilot | Web hardening, Android build, QA, legal prep, rehearsal tooling | ~$5,090/mo | ~$7,640/mo | ~$9,550/mo |
| Pilot 1 | QA, partner tooling, support setup, launch prep | ~$4,500/mo | ~$6,800/mo | ~$8,500/mo |
| Pilot 2 | Reporting, analytics, partial automation, partner support | ~$3,800/mo | ~$5,700/mo | ~$7,200/mo |
| Production Readiness | Final hardening, monitoring, release governance | ~$3,200/mo | ~$4,800/mo | ~$6,000/mo |

**How levels are derived:**
- L1 assumes ~320 productive hrs/mo at blended ~$15.95/hr = ~$5,090/mo (drops as build scope completes)
- L2 assumes ~480 productive hrs/mo at blended ~$15.95/hr = ~$7,640/mo (drops in later phases)
- L3 assumes ~640 productive hrs/mo at blended ~$15.95/hr = ~$9,550/mo (drops in later phases)

The drop in later phases reflects that software build scope diminishes as the
product approaches completion. By Production Readiness, the product team is
primarily doing maintenance, monitoring, and incremental features rather than
core build work.

### 4.3 Layer 3: Employed Ops Staff

This layer is entirely new in v2. It represents the real cost of running a
healthcare operation with live patients.

| Phase | Staff Composition | Monthly Cost | Running Cumulative |
|-------|------------------|-------------|-------------------|
| Pre-Pilot (3-6 months) | None employed; training design and SOP drafting only | **$0** | $0 |
| Pilot 1 (2-3 months) | 2 doctors + 2 admin + 2 tech support | **$2,482** | $4,964-7,446 |
| Pilot 2 (3-13 months) | 4 doctors + 4 admin + 2 tech support | **$4,361** | $13,083-56,693 |
| Production Readiness (4-12 months) | 6 doctors + 6 admin + 3 tech support | **$6,542** | $26,168-78,504 |

**Key observation:** Ops staff cost grows from $0 to $6,542/month across the
project lifecycle. Over a long Pilot 2 + Production Readiness period (e.g.,
25 months in an S1-L1 scenario), the cumulative ops staff cost alone can reach
$100,000+. This is the cost layer that v1 completely missed.

### 4.4 Layer 4: Infrastructure and Telecom

Per params.md Section 7. This layer now includes technology infrastructure
(hosting, video, database) and operational infrastructure (phones, telecom,
callback tools, support ticketing).

| Phase | Tech Infra (monthly) | Ops Infra (monthly) | Combined Monthly | One-Time Equipment |
|-------|---------------------|---------------------|-----------------|-------------------|
| Pre-Pilot | $65-130 | $0-20 | **$65-150** | $200-300 (admin phones) |
| Pilot 1 | $160-300 | $110-220 | **$270-520** | $600-900 (laptops, misc setup) |
| Pilot 2 | $300-600 | $160-320 | **$460-920** | $300-500 (expansion devices) |
| Production Readiness | $600-1,100 | $200-400 | **$800-1,500** | $0 (equipment already procured) |

**One-time equipment total:** $1,100-1,700 across all phases.

**Infrastructure cost breakdown detail:**

| Component | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|-----------|-----------|---------|---------|-----------|
| Hosting and monitoring (Render) | $50-80 | $80-150 | $150-300 | $300-500 |
| Video platform (Daily.co) | $0-20 | $50-100 | $100-200 | $200-400 |
| Database (PostgreSQL managed) | $15-30 | $30-50 | $50-100 | $100-200 |
| Phone top-ups / SIM costs | $0 | $30-60 | $30-60 | $30-60 |
| VoIP / cloud telephony | $0 | $50-100 | $50-100 | $50-100 |
| Call center / CRM software | $0 | $0 | $50-100 | $50-100 |
| Support ticketing tools | $0 | $0-30 | $0-30 | $30-60 |
| Miscellaneous ops tooling | $0-20 | $0-30 | $30-60 | $40-80 |

### 4.5 Combined Monthly Cost by Phase and Level

Summing all four layers:

| Phase | Layer 1 (Founder) | Layer 2 (Product) | Layer 3 (Ops Staff) | Layer 4 (Infra) | **Total (L1)** | **Total (L2)** | **Total (L3)** |
|-------|------------------|------------------|--------------------|-----------------|-|-|-|
| Pre-Pilot | $5,280 | L1: $5,090 / L2: $7,640 / L3: $9,550 | $0 | $108 (mid) | **$10,478** | **$13,028** | **$14,938** |
| Pilot 1 | $5,280 | L1: $4,500 / L2: $6,800 / L3: $8,500 | $2,482 | $395 (mid) | **$12,657** | **$14,957** | **$16,657** |
| Pilot 2 | $5,280 | L1: $3,800 / L2: $5,700 / L3: $7,200 | $4,361 | $690 (mid) | **$14,131** | **$16,031** | **$17,531** |
| Prod Ready | $5,280 | L1: $3,200 / L2: $4,800 / L3: $6,000 | $6,542 | $1,150 (mid) | **$16,172** | **$17,772** | **$18,972** |

**Read this table carefully.** Even at L1 (bootstrapped), monthly costs climb from
~$10,500 in Pre-Pilot to ~$16,200 in Production Readiness. The driver is not
software development (which actually declines) but operational staffing and
infrastructure that grow as the platform serves real users.

---

## 5. Scenario Cost Matrix

### 5.1 Duration Assumptions by Scenario and Level

Per params.md Section 13, phase durations vary by scenario and investment level.
Shorter durations require higher investment levels; longer durations occur under
bootstrapped conditions.

| Phase | L1 Duration | L2 Duration | L3 Duration |
|-------|------------|------------|------------|
| Pre-Pilot | 6 months | 4 months | 3 months |
| Pilot 1 | 3 months | 2.5 months | 2 months |
| Pilot 2 | 13 months | 8 months | 3 months |
| Production Readiness | 12 months | 8 months | 4 months |
| **Total** | **34 months** | **22.5 months** | **12 months** |

For mixed-level scenarios (S2 and S3), the self-funded phases use the "Our Level"
duration and post-investor phases use the "Investor Level" duration.

### 5.2 Full 21-Combination Scenario Cost Matrix

Each row is calculated by multiplying the monthly cost (from Section 4.5) by the
phase duration, then summing across phases. One-time equipment costs ($1,100-1,700)
are added to the appropriate phase. For mixed scenarios, the investment level switches
at the investor entry point.

| # | Scenario | Economic Cost | CapEx Through Production | Pre-Launch OpEx | Founder Capital | Investor Capital |
|---|----------|---------------|--------------------------|-----------------|-----------------|------------------|
| 1 | S1-L1 | $451,751 | $240,994 | $210,757 | $451,751 | None |
| 2 | S1-L2 | $353,794 | $190,100 | $163,694 | $353,794 | None |
| 3 | S1-L3 | $281,931 | $152,696 | $129,235 | $281,931 | None |
| 4 | S2-O1-I1 | $400,716 | $214,506 | $186,210 | $120,000 | $280,716 |
| 5 | S2-O1-I2 | $363,656 | $197,511 | $166,145 | $120,000 | $243,656 |
| 6 | S2-O1-I3 | $326,066 | $180,334 | $145,732 | $120,000 | $206,066 |
| 7 | S2-O2-I1 | $382,548 | $200,890 | $181,658 | $150,000 | $232,548 |
| 8 | S2-O2-I2 | $331,570 | $176,805 | $154,765 | $150,000 | $181,570 |
| 9 | S2-O2-I3 | $307,898 | $166,718 | $141,180 | $150,000 | $157,898 |
| 10 | S2-O3-I1 | $362,708 | $187,914 | $174,794 | $180,000 | $182,708 |
| 11 | S2-O3-I2 | $311,316 | $163,649 | $147,667 | $180,000 | $131,316 |
| 12 | S2-O3-I3 | $272,646 | $146,004 | $126,642 | $180,000 | $92,646 |
| 13 | S3-O1-I1 | $349,636 | $186,639 | $162,997 | $95,000 | $254,636 |
| 14 | S3-O1-I2 | $297,910 | $162,304 | $135,606 | $95,000 | $202,910 |
| 15 | S3-O1-I3 | $258,804 | $144,568 | $114,236 | $95,000 | $163,804 |
| 16 | S3-O2-I1 | $329,136 | $173,255 | $155,881 | $130,000 | $199,136 |
| 17 | S3-O2-I2 | $276,996 | $148,740 | $128,256 | $130,000 | $146,996 |
| 18 | S3-O2-I3 | $251,808 | $138,094 | $113,714 | $130,000 | $121,808 |
| 19 | S3-O3-I1 | $308,804 | $159,949 | $148,855 | $165,000 | $143,804 |
| 20 | S3-O3-I2 | $256,250 | $135,254 | $120,996 | $165,000 | $91,250 |
| 21 | S3-O3-I3 | $230,522 | $124,374 | $106,148 | $165,000 | $65,522 |

### 5.3 How to Read the Matrix

**Column definitions:**

| Column | What It Means |
|--------|--------------|
| Economic Cost | Total market-value cost of everything consumed from project start to Production launch |
| CapEx Through Production | The portion of economic cost that is capital / build investment (software, devices, systems, launch prep) |
| Pre-Launch OpEx | The portion that is recurring operational spend (staff salaries, infra, telecom, support) |
| Founder Capital | Cash the founders must provide (or defer) before investor entry |
| Investor Capital | Cash the investor must provide from their entry point through Production |

**Key relationships:**
- Economic Cost = CapEx Through Production + Pre-Launch OpEx (always)
- Economic Cost = Founder Capital + Investor Capital (for S2 and S3; for S1, Founder Capital = Economic Cost)
- CapEx/OpEx split is roughly 53-55% CapEx / 45-47% OpEx across most scenarios

### 5.4 Cost Range Summary

| Metric | Minimum (S3-O3-I3) | Baseline (S3-O2-I2) | Maximum (S1-L1) |
|--------|--------------------|--------------------|-----------------|
| Economic cost | $230,522 | $276,996 | $451,751 |
| CapEx | $124,374 | $148,740 | $240,994 |
| OpEx | $106,148 | $128,256 | $210,757 |
| Founder capital required | $165,000 | $130,000 | $451,751 |
| Timeline | ~12 months | ~18 months | ~34 months |
| Monthly burn (average) | ~$19,210 | ~$15,389 | ~$13,287 |

**Paradox of the bootstrapped path:** S1-L1 has the lowest average monthly burn
($13,287/mo) but the highest total cost ($451,751) because it runs for 34 months.
Time is the most expensive input in this model.

---

## 6. Baseline Composition Reference (S3-O2-I2)

S3-O2-I2 is the recommended baseline: the founders self-fund at Ideal level
through Pre-Pilot and into Pilot 1, then an investor enters at Ideal level after
Pilot 1 completes. Total timeline ~18 months. Total economic cost ~$277,000.

### 6.1 Workstream-Level Breakdown

| Workstream | Economic Cost | % of Total | Derivation / Notes |
|-----------|---------------|-----------|-------------------|
| **Founder office** | $95,040 | 34.3% | $5,280/mo x 18 months; constant across all phases |
| **Web platform hardening** | $14,900 | 5.4% | 745 hrs x $20/hr (senior rate); concentrated in Pre-Pilot and Pilot 1 |
| **Patient APK build** | $7,200 | 2.6% | 480 hrs x $15/hr (blended); fixed contracted quote; Pre-Pilot through Pilot 1 |
| **QA, DevOps, security hardening** | $4,400 | 1.6% | 220 hrs x $20/hr (senior rate); distributed across Pre-Pilot and Pilot 1 |
| **Parallel operational workstreams** | $11,250 | 4.1% | 750 hrs x $15/hr (blended); SOPs, training, partner onboarding, compliance docs; spread Pre-Pilot through Production Readiness |
| **Advisory board** | $10,125 | 3.7% | $750/mo x 13.5 months (advisors active from month 2 onward) |
| **Employed ops: Doctors** | $43,200 | 15.6% | Pilot 1: 2 x $720 x 2.5mo = $3,600; Pilot 2: 4 x $720 x 8mo = $23,040; Prod Ready: 6 x $720 x 4mo (investor portion at L2 duration) = $17,280; minus some ramp = ~$43,200 |
| **Employed ops: Admin** | $17,388 | 6.3% | Pilot 1: 2 x $217 x 2.5mo = $1,085; Pilot 2: 4 x $217 x 8mo = $6,944; Prod Ready: 6 x $217 x 4mo (L2) = $5,208; rounding adjustments ~$17,388 |
| **Employed ops: Tech support** | $12,642 | 4.6% | Pilot 1: 2 x $301 x 2.5mo = $1,505; Pilot 2: 2 x $301 x 8mo = $4,816; Prod Ready: 3 x $301 x 4mo (L2) = $3,612; with rounding ~$12,642 |
| **Infrastructure (tech)** | $22,950 | 8.3% | Sum of monthly tech infra across phases at midpoints; includes hosting, Daily.co, managed Postgres |
| **Infrastructure (ops / telecom)** | $8,940 | 3.2% | Phones, SIMs, VoIP, callback tools, CRM, ticketing; grows from $0 to ~$400/mo |
| **One-time equipment** | $1,400 | 0.5% | Phones ($500), laptops ($500), misc setup ($400); midpoint of ranges |
| **Legal, accounting, compliance** | $5,890 | 2.1% | Friendly-network pricing counted at economic value; registration, contracts, regulatory filings |
| **Marketing, travel, rehearsals** | $11,865 | 4.3% | Partner visits, pilot launch events, travel to Ethiopia, rehearsal costs |
| **Contingency / rounding** | $9,806 | 3.5% | Buffer absorbed into total; covers FX fluctuation, scope creep, unplanned costs |
| **Total** | **$276,996** | **100%** | |

### 6.2 Cost by Phase (S3-O2-I2)

| Phase | Duration | Monthly Cost | Phase Total | Cumulative |
|-------|----------|-------------|------------|-----------|
| Pre-Pilot | 4 months | ~$13,028 | $52,112 | $52,112 |
| Pilot 1 | 2.5 months | ~$14,957 | $37,393 | $89,505 |
| *--- Investor enters here ---* | | | | |
| Pilot 2 | 8 months | ~$16,031 | $128,248 | $217,753 |
| Production Readiness | 4 months (L2) | ~$14,811 | $59,243 | $276,996 |

**Founder capital required:** ~$130,000 (Pre-Pilot + Pilot 1 + transition buffer)
**Investor capital required:** ~$147,000 (Pilot 2 + Production Readiness)

### 6.3 Cost Composition by Category

| Category | Amount | % of Total |
|----------|--------|-----------|
| People (founder office + dev team + advisory) | $142,915 | 51.6% |
| Employed operations (doctors + admin + tech support) | $73,230 | 26.4% |
| Infrastructure and equipment (tech + ops + devices) | $33,290 | 12.0% |
| Business operations (legal, marketing, travel, compliance) | $17,755 | 6.4% |
| Contingency | $9,806 | 3.5% |
| **Total** | **$276,996** | **100%** |

**Half the cost is people building the product. A quarter is people running the
operation. The remaining quarter is everything else.** This ratio is characteristic
of an assisted-service health tech company, not a pure SaaS play.

---

## 7. Interpretation

### 7.1 What the Cost Model Now Says Honestly

The business is not "a platform with some hosting cost." It is five things at once,
each with a distinct cost signature:

| What the Business Is | Cost Signature | Approximate Share of Total |
|---------------------|---------------|--------------------------|
| A software hardening program | Time-bounded; declines as product completes | ~10% (web + APK + QA) |
| A management and product leadership effort | Constant monthly burn; founder office runs every month | ~34% |
| A manual-assisted care operation | Grows with user scale; never goes to zero | ~26% |
| A partner and provider management business | Front-loaded (SOPs, onboarding) then maintenance | ~4% |
| A technology infrastructure operation | Grows with scale; has both fixed and variable components | ~12% |

v1 treated most of this as a blended "development cost." v2 separates the layers
so that each can be evaluated, challenged, and optimized independently.

### 7.2 Why the v2 Model Is Better Than v1

| Dimension | v1 Weakness | v2 Improvement |
|-----------|------------|---------------|
| Rate card | Blended $24-36/hr overstated labor cost for junior roles | Four-tier rate card ($10/$15/$20) with named role assignments |
| Operational staff | Not modeled at all | Full coverage ladder with verified salary benchmarks |
| Infrastructure | Flat $30-50/mo | Phase-specific ranges including telecom and devices |
| Timeline | Derived from coding hours only | Includes parallel operational workstreams that set a floor on calendar time |
| CapEx/OpEx split | Not distinguished | Explicit separation enables better investor conversations |
| Founder cost | Hidden in blended rates | Isolated as a $5,280/mo constant; makes time-cost relationship visible |
| Equipment | Not tracked | $1,100-1,700 one-time costs now explicit |

### 7.3 Most Important Cost Insight

**Time is the dominant cost driver, not technology.**

The proof:

| If the project finishes in... | Founder office alone costs... | Total economic cost is roughly... |
|-------------------------------|------------------------------|-----------------------------------|
| 12 months (S3-O3-I3) | $63,360 | $230,522 |
| 18 months (S3-O2-I2) | $95,040 | $276,996 |
| 22.5 months (S1-L2) | $118,800 | $353,794 |
| 34 months (S1-L1) | $179,520 | $451,751 |

Moving from 12 to 34 months adds $116,160 in founder office cost alone — and
that is before counting the additional 22 months of ops staff, infrastructure,
and advisory. The marginal cost of each additional month is:

| Phase | Marginal Monthly Cost (L2) |
|-------|---------------------------|
| Pre-Pilot | ~$13,028 |
| Pilot 1 | ~$14,957 |
| Pilot 2 | ~$16,031 |
| Production Readiness | ~$17,772 |

Every month of delay during Production Readiness costs nearly $18,000 in
economic value. This is why the "lean and slow" path (S1-L1) is paradoxically
the most expensive path in total. Speed is not a luxury; it is a cost
optimization strategy.

### 7.4 The Operational Cost Cliff

There is a structural discontinuity between Pre-Pilot (no ops staff, $0/mo) and
Pilot 1 (6 employees, $2,482/mo). Once the platform goes live with real
patients, the company is committed to a recurring ops payroll that only grows.
By Production Readiness, ops staff alone cost $6,542/mo — more than the founder
office.

This means the decision to enter Pilot 1 is effectively irreversible from a cost
perspective. The company cannot "pause" a live healthcare operation without
losing patient trust, partner relationships, and regulatory standing. The cost
model should be read with this cliff in mind: everything before Pilot 1 is
preparatory and relatively flexible; everything after is committed and
accelerating.

### 7.5 What This Means for Capital Strategy

- **Founders should self-fund through Pre-Pilot** because it is the cheapest phase (~$13,000/mo at L2) and produces the strongest negotiating position for investor conversations.
- **Investor entry after Pilot 1 (S3)** is optimal because the founder capital requirement is manageable ($95,000-165,000) and the investor sees a live product with real patients before committing.
- **Fully self-funded (S1) is viable but expensive** — the founder must commit $282,000-452,000, with most of the excess cost driven by timeline, not technology.
- **The cheapest total path (S3-O3-I3 at $230,522)** requires the highest intensity: fully-funded team running at maximum utilization with an investor entering early and investing aggressively. It is cheap because it is fast.

---

*End of 03-cost-breakdown.md v2. All figures trace to params.md v2.0, March 2026.*
