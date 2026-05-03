# 03 — Cost Breakdown

**Health Hub Business Plan | Restored Long-Form Cost Model**
**Version:** 1.2 | **Date:** March 2026

> This version restores the assumption detail behind the cost model and then applies the revised team, staffing, infrastructure, and equity-related cost interpretation.

---

## Table of Contents

1. [What Changed in This Revision](#1-what-changed-in-this-revision)
2. [Costing Methodology](#2-costing-methodology)
3. [Revised Role and Salary Assumptions](#3-revised-role-and-salary-assumptions)
4. [Monthly Phase Cost Logic](#4-monthly-phase-cost-logic)
5. [Scenario Cost Matrix](#5-scenario-cost-matrix)
6. [Interpretation](#6-interpretation)

---

## 1. What Changed in This Revision

The restored model incorporates the founder-approved changes that materially affect total economic cost:

- the previous team abstraction has been replaced with `3 core team + 7 part-time developers + 2 advisors`,
- the rate card is now role-specific rather than overly blended,
- the Android APK is treated as a fixed quoted workstream,
- remaining web effort is lower than before,
- explicit doctors, admin ops, and technical-support costs are now added during pilots,
- infrastructure now includes phones, telecom, callback tooling, and operational devices,
- all friendly-network support is still counted at real economic value.

---

## 2. Costing Methodology

### 2.1 Two Cost Lenses

Every number in this plan should be understood through two lenses:

1. **Economic cost** — the full market-value cost of the business being built and operated,
2. **Cash spend** — the portion that may actually be paid out immediately, which may be lower due to deferred founder comp, discounted legal/accounting support, or partner assistance.

This document models the **economic cost** layer because that is what matters for capital planning and investor conversations.

### 2.2 Capital vs Pre-Launch Operating Spend

For this planning cycle:

- **Capital expenditure through Production** includes software completion, hardening, launch prep, devices, systems, and the operating build-out that is needed before Production.
- **Pre-launch operating expenditure** includes the live support, callbacks, doctor/admin/support payroll, partner operations, and other running costs required to keep the pilots alive before Production begins.

---

## 3. Revised Role and Salary Assumptions

### 3.1 Product and Delivery Rates

| Role Category | USD/hr | INR/hr | Use Case |
| --- | --- | --- | --- |
| Junior developer | $10 | ~INR 830 | Routine implementation, test support |
| Senior developer | $20 | ~INR 1,660 | Full-stack ownership, DevOps, hardening |
| Management / technical head | $20 | ~INR 1,660 | Founder office, testing oversight, product management |
| Everyone else | $15 | ~INR 1,245 | Android blended team, design, general contributors |

### 3.2 Employed Ops Salary Benchmarks

| Role | INR / month | USD / month | Basis |
| --- | --- | --- | --- |
| MBBS doctor | 60,000 | ~723 | NHM Assam Medical Officer band anchor, slightly uplifted |
| Admin ops / callback staff | 18,000 | ~217 | Indian customer support and back-office benchmarks |
| Technical support | 25,000 | ~301 | Indian technical support benchmarks |

### 3.3 Minimum Employed Coverage Ladder

| Phase | Doctors | Admin Ops | Technical Support | Monthly INR | Monthly USD |
| --- | --- | --- | --- | --- | --- |
| Pilot 1 | 2 | 2 | 2 | 206,000 | ~2,482 |
| Pilot 2 | 4 | 4 | 2 | 362,000 | ~4,361 |
| Production Readiness | 6 | 6 | 3 | 543,000 | ~6,542 |

---

## 4. Monthly Phase Cost Logic

### 4.1 Fixed Founder-Office Layer

The founder office is deliberately held visible because it represents real business-building labor.

| Phase | Fixed Founder Office |
| --- | --- |
| Pre-Pilot | $5,200 / month |
| Pilot 1 | $5,200 / month |
| Pilot 2 | $5,200 / month |
| Production Readiness | $5,200 / month |

### 4.2 Adjustable Product / Infra / Tooling Layer

| Phase | Typical Components |
| --- | --- |
| Pre-Pilot | Remaining web work, Android spend, QA, legal, rehearsal tooling |
| Pilot 1 | QA, support setup, partner tooling, telecom, launch support tools |
| Pilot 2 | Reporting, infra growth, telecom, partner support, partial automation |
| Production Readiness | Final hardening, monitoring, support schedule tooling, devices, launch systems |

### 4.3 Explicit Employed Ops Layer

| Phase | Explicit Employed Ops |
| --- | --- |
| Pre-Pilot | None employed yet; training and SOP design only |
| Pilot 1 | 2 doctors + 2 admin + 2 support |
| Pilot 2 | 4 doctors + 4 admin + 2 support |
| Production Readiness | 6 doctors + 6 admin + 3 support |

### 4.4 Infrastructure and Telecom Ranges

| Phase | Range |
| --- | --- |
| Pre-Pilot | $350-$500/month |
| Pilot 1 | $700-$1,100/month |
| Pilot 2 | $1,100-$1,600/month |
| Production Readiness | $1,500-$2,200/month |

These ranges now explicitly include:

- hosting,
- monitoring,
- admin phones,
- callback telecom spend,
- support tooling,
- live-ops devices and software.

---

## 5. Scenario Cost Matrix

| Scenario | Economic Cost | CapEx Through Production | Pre-Launch OpEx | Founder Capital | Investor Capital |
| --- | --- | --- | --- | --- | --- |
| S1-L1 | $451,751 | $240,994 | $210,757 | $240,000 | None |
| S1-L2 | $353,794 | $190,100 | $163,694 | $185,000 | None |
| S1-L3 | $281,931 | $152,696 | $129,235 | $150,000 | None |
| S2-O1-I1 | $400,716 | $214,506 | $186,210 | $120,000 | $140,000 |
| S2-O1-I2 | $363,656 | $197,511 | $166,145 | $120,000 | $145,000 |
| S2-O1-I3 | $326,066 | $180,334 | $145,732 | $120,000 | $245,000 |
| S2-O2-I1 | $382,548 | $200,890 | $181,658 | $110,000 | $135,000 |
| S2-O2-I2 | $331,570 | $176,805 | $154,765 | $110,000 | $120,000 |
| S2-O2-I3 | $307,898 | $166,718 | $141,180 | $110,000 | $240,000 |
| S2-O3-I1 | $362,708 | $187,914 | $174,794 | $110,000 | $110,000 |
| S2-O3-I2 | $311,316 | $163,649 | $147,667 | $110,000 | $100,000 |
| S2-O3-I3 | $272,646 | $146,004 | $126,642 | $110,000 | $205,000 |
| S3-O1-I1 | $349,636 | $186,639 | $162,997 | $95,000 | $150,000 |
| S3-O1-I2 | $297,910 | $162,304 | $135,606 | $95,000 | $140,000 |
| S3-O1-I3 | $258,804 | $144,568 | $114,236 | $95,000 | $255,000 |
| S3-O2-I1 | $329,136 | $173,255 | $155,881 | $95,000 | $125,000 |
| S3-O2-I2 | $276,996 | $148,740 | $128,256 | $95,000 | $120,000 |
| S3-O2-I3 | $251,808 | $138,094 | $113,714 | $95,000 | $250,000 |
| S3-O3-I1 | $308,804 | $159,949 | $148,855 | $95,000 | $105,000 |
| S3-O3-I2 | $256,250 | $135,254 | $120,996 | $95,000 | $100,000 |
| S3-O3-I3 | $230,522 | $124,374 | $106,148 | $95,000 | $225,000 |

### 5.1 Baseline Composition Reference — S3-O2-I2

| Workstream | Economic Cost | Notes |
| --- | --- | --- |
| Product and founder office | $104,000 | 3 core team members + advisory support at market value |
| Web platform hardening | $21,380 | Remaining web scope normalized to 745 hours expected |
| Patient APK build | $7,200 | Fixed 480-hour Android quote |
| QA, DevOps, security | $10,270 | Hardening, monitoring, release discipline |
| Admin and care operations | $83,458 | Doctors, admin callback staff, technical support ladder |
| Partner onboarding and provider success | $9,990 | SOP writing, onboarding, training refreshers |
| Legal, accounting, compliance | $5,890 | Friendly-network pricing counted at economic value |
| Infrastructure, phones, and tools | $22,950 | Hosting, telecom, devices, live-ops tooling |
| Marketing, travel, rehearsals | $11,865 | Lean but explicit commercial and preparation spend |

---

## 6. Interpretation

### 6.1 What the Cost Model Now Says More Honestly

The business is not just “a platform with some hosting cost.” It is:

- a software hardening program,
- a manual-assisted care operation,
- a partner-management business,
- a support and callback system,
- a launch program.

### 6.2 Why the Revised Model Is Better Than the Thin Overwrite

The shorter overwrite preserved the totals but lost the reason those totals existed. This restored version keeps the revised totals **and** restores the explanation:

- why doctors/admin/support must exist,
- why founder office time compounds over long timelines,
- why Android got cheaper while total business realism increased,
- why infrastructure needed to be lifted.

### 6.3 Most Important Cost Insight

Long self-funded paths are expensive not only because of elapsed months, but because each extra month keeps alive:

- founder office cost,
- manual operating cost,
- support burden,
- partner coordination burden.

That is why some seemingly “lean” paths still become economically expensive.
