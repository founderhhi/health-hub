# Shared Assumptions and Scenario Definitions

**Health Hub Business Plan | Assumption Foundation Document**
**Version:** 1.2 | **Date:** March 2026 | **Status:** Restored Long-Form Working Draft

> This document is the governing assumption layer for the Health Hub business-plan pack. It restores the longer-form context behind the numbers, then applies the approved revised team model, rate card, staffing ladder, and equity structure.

---

## Table of Contents

1. [Purpose and Scope](#1-purpose-and-scope)
2. [Codebase-Grounded Starting Point](#2-codebase-grounded-starting-point)
3. [Strategic Operating Frame](#3-strategic-operating-frame)
4. [Geography, Language, and Payments](#4-geography-language-and-payments)
5. [Revised Team Model and Rate Card](#5-revised-team-model-and-rate-card)
6. [Delivery Capacity and Build Assumptions](#6-delivery-capacity-and-build-assumptions)
7. [Operating Staffing Ladder](#7-operating-staffing-ladder)
8. [Infrastructure, Devices, and Tooling](#8-infrastructure-devices-and-tooling)
9. [Capital, Equity, and Valuation Logic](#9-capital-equity-and-valuation-logic)
10. [Scenario and Investment-Level Definitions](#10-scenario-and-investment-level-definitions)
11. [Full 21-Combination Summary Matrix](#11-full-21-combination-summary-matrix)
12. [Baseline Recommendation](#12-baseline-recommendation)
13. [Benchmark and Assumption Notes](#13-benchmark-and-assumption-notes)

---

## 1. Purpose and Scope

This document exists to do three jobs:

1. lock the shared assumptions used across the business-plan pack,
2. make explicit which assumptions come from the actual Health Hub codebase and which are market or operating assumptions, and
3. normalize the revised parameters approved by the founder for the current modeling pass.

It is intentionally more detailed than a summary sheet because the later documents depend on it for staffing logic, timeline logic, cost translation, and financing interpretation.

---

## 2. Codebase-Grounded Starting Point

Health Hub is not being modeled as an idea-stage app. The repository already supports a broad multi-role prototype that materially changes both effort and business assumptions.

### 2.1 What the Current Product Already Proves

| Area | Evidence in Repository | Planning Implication |
| --- | --- | --- |
| Multi-role web platform | Patient, GP, specialist, pharmacy, diagnostics, and admin flows exist in the Angular app and API structure | The planning problem is hardening, operating setup, and commercialization, not inventing these flows from scratch |
| Backend and data model | Existing API endpoints and PostgreSQL workflow tables cover consultations, referrals, prescriptions, labs, chat, notifications, payments, and admin workflows | Workflow breadth is already present; remaining work is reliability, integration discipline, mobile parity, and operational fit |
| Platform posture | SSR, health checks, rate limiting, readiness endpoints, and internal audit artifacts exist | The product is real enough for investor demonstration and internal rehearsal, but not yet production-safe |
| Admin handoffs | The prototype already contains admin-style callback and workflow management behavior | Manual operations during pilots are supported by the current product shape rather than being an artificial workaround |

### 2.2 What the Current Product Does **Not** Yet Prove

| Gap | Modeling Treatment |
| --- | --- |
| Tenant-isolated facility hierarchy | Explicitly out of scope for this planning cycle |
| Localized East Africa payment rails | Required before full production scale, but can be bridged early with invoicing and manual coordination |
| Production-grade mobile experience | Addressed through the patient APK workstream |
| Fully automated pharmacy/diagnostics/travel fulfillment | Not required for Pilot 1 or most of Pilot 2; manual admin-led fulfillment remains acceptable |

---

## 3. Strategic Operating Frame

The founder-approved business logic for this plan is:

- **Ethiopia first, Kenya second.** Ethiopia is the primary launch and pilot market. Kenya is the next market and a pricing/payment benchmark.
- **Patients are local; much of the operating and support network is global.** Pilot patients are concentrated in Addis Ababa first, then Nairobi second. Many operators, technical contributors, and provider-support functions may sit in India or other remote locations.
- **The patient APK is the mobile priority.** Provider-side users remain on web during this planning cycle.
- **All major flows matter.** Teleconsultation, referrals, pharmacy, diagnostics, AI triage, HealWell content, travel care, and admin workflows are all within the intended service surface. The variable by scenario is not whether these flows exist at all, but how polished, automated, and scalable they are by each checkpoint.
- **Manual operations are acceptable through most of the pilots.** This is both founder-approved and market-congruent for East Africa.

### 3.1 Production Definition Used in This Plan

For this core planning cycle, **Production** means:

- the product is technically ready to launch in another country on relatively short notice,
- the current prototype scope has been hardened into a production-safe release posture,
- the patient APK exists in a usable, launchable state,
- operational SOPs, training, staffing, support, and fallback processes are documented and functional,
- Ethiopia is launch-ready, and Kenya is either soft-launched or operationally ready for near-term rollout.

---

## 4. Geography, Language, and Payments

### 4.1 Market Scope

| Item | Decision |
| --- | --- |
| Primary launch geography | Ethiopia |
| Secondary expansion geography | Kenya |
| Pilot concentration | Addis Ababa first, Nairobi second |
| Pilot weighting | Approximately 60/40 Ethiopia/Kenya over the broader pilot horizon |

### 4.2 Language Scope

| Phase | Supported Language |
| --- | --- |
| Pre-Pilot | English |
| Pilot 1 | English |
| Pilot 2 | English |
| Production in this planning cycle | English |
| Post-Production extension | Local-language expansion can begin afterward |

### 4.3 Payment Interpretation

| Market | Early-Phase Payment Logic | Production-Ready Direction |
| --- | --- | --- |
| Ethiopia | Digital invoicing, manual confirmation, assisted collection where needed | Local digital rails and cleaner reconciliation before scale |
| Kenya | Digital invoicing first, then M-Pesa-native localization | Strong mobile-money integration expected earlier than Ethiopia |

### 4.4 Currency Policy

- Base modeling currency: **USD**
- Cost and investment presentation: **USD + INR**
- Revenue and pricing interpretation: **USD + ETB + KES**
- FX planning reference used in current pass: **1 USD = 83 INR**

---

## 5. Revised Team Model and Rate Card

### 5.1 Organization Model Approved for This Revision

| Group | Count | Working Pattern | Interpretation |
| --- | --- | --- | --- |
| Owner / founder + founding team | 3 | Part-time, roughly 4 hours/day each | One idea owner/founder, two founding members, with one acting as technical-head / product-testing lead |
| Developers | 7 | Part-time, roughly 4 hours/day each | Includes Android/backend contributors plus explicit full-stack and DevOps support |
| Advisory board | 2 | Fractional | Friendly experts counted at economic value |

Important modeling rule: **all labor is counted at market-value economic cost**, even if cash payment is delayed, subsidized, discounted, or contributed through friendly networks.

### 5.2 Revised Rate Card

| Rate Category | USD/hr | INR/hr | Usage |
| --- | --- | --- | --- |
| Junior developer | $10 | ~INR 830 | Routine build, QA support, implementation |
| Senior developer | $20 | ~INR 1,660 | Full-stack ownership, DevOps, architecture, hardening |
| Management / technical head | $20 | ~INR 1,660 | Product management, testing oversight, founder-office execution |
| Everyone else | $15 | ~INR 1,245 | Android blended team rate, design, ops support, general contributors |

### 5.3 Android Exception Rule

The patient APK is modeled as a **fixed quoted workstream** rather than being recalculated through the new role-specific rate card.

| Parameter | Value |
| --- | --- |
| Fixed Android effort | 480 hours total |
| Fixed Android blended rate | $15/hr |
| Fixed Android economic cost | $7,200 / INR 597,600 |

---

## 6. Delivery Capacity and Build Assumptions

### 6.1 Capacity Logic

| Parameter | Value |
| --- | --- |
| Raw part-time technical capacity | ~560 hrs/month (7 developers x ~80 hrs) |
| Conservative productive planning capacity | **~480 hrs/month** |
| Level 1 effective utilization | ~210 productive hrs/month |
| Level 2 effective utilization | ~320 productive hrs/month |
| Level 3 effective utilization | ~480 productive hrs/month |

### 6.2 Remaining Product and Hardening Effort

The founder approved that the previous web-effort assumption was too high and should be reduced based on real team estimates.

| Workstream | Approved Assumption |
| --- | --- |
| Remaining web product completion + hardening | **720-770 hours** |
| Expected case used in modeling | **745 hours** |
| Logic | Roughly 150%-160% of the Android effort |

### 6.3 Parallel Non-Feature Workstreams That Still Consume Time

| Workstream | Hours | Why It Stays in the Model |
| --- | --- | --- |
| QA, DevOps, security hardening | 220 | Prevents the false assumption that shipping code equals launch readiness |
| Doctor/admin training and SOP design | 180 | Required because operations remain partially manual |
| Provider onboarding and partner tooling | 140 | Necessary for facility activation and internal handoffs |
| Launch analytics, reporting, release governance | 120 | Needed for production readiness, reporting, and escalation discipline |

### 6.4 Total Remaining Effort Basis

| Category | Hours |
| --- | --- |
| Android APK | 480 |
| Remaining web / hardening | 745 |
| Parallel hardening + operations setup | 660 |
| **Combined effort basis** | **1,885 hours** |

---

## 7. Operating Staffing Ladder

The revised model explicitly adds employed clinical, admin, and technical-support capacity during pilots instead of assuming the product can operate only through founder effort and partner goodwill.

### 7.1 Minimum Employed Coverage Ladder

| Phase | Doctors | Admin Ops | Technical Support | Notes |
| --- | --- | --- | --- | --- |
| Pre-Pilot | 0 employed | 0 employed | 0 employed | Training, SOP drafting, and rehearsals only |
| Pilot 1 | 2 | 2 | 2 | Minimum live coverage plus callbacks and exception handling |
| Pilot 2 | 4 | 4 | 2 | Stronger callback loops, partner coordination, and reporting |
| Production Readiness | 6 | 6 | 3 | Near-24/7 coverage posture with deeper support schedule |

### 7.2 Salary Benchmarks Used

| Role | Monthly Benchmark | USD Equivalent | Basis |
| --- | --- | --- | --- |
| MBBS doctor | INR 60,000 | ~$723 | Anchored from NHM Assam Medical Officer (MBBS) remuneration band, slightly uplifted for private retention and flexibility |
| Admin ops / callback staff | INR 18,000 | ~$217 | Anchored from National Career Service customer-support / back-office ranges |
| Technical support | INR 25,000 | ~$301 | Anchored from National Career Service technical-support ranges |

### 7.3 Monthly Employed Ops Cost by Phase

| Phase | INR / month | USD / month |
| --- | --- | --- |
| Pilot 1 | INR 206,000 | ~$2,482 |
| Pilot 2 | INR 362,000 | ~$4,361 |
| Production Readiness | INR 543,000 | ~$6,542 |

---

## 8. Infrastructure, Devices, and Tooling

The prior infrastructure assumption was too light for the real operating model. The revised model now includes devices and telecom for admin-led callbacks and manual coordination.

| Phase | Modeled Monthly Range | Included Items |
| --- | --- | --- |
| Pre-Pilot | $350-$500 | Hosting, QA tooling, monitoring, basic comms |
| Pilot 1 | $700-$1,100 | Hosting, admin phones, call spend, monitoring, support tooling |
| Pilot 2 | $1,100-$1,600 | Higher volume telecom, reporting tools, monitoring, partner-support tools |
| Production Readiness | $1,500-$2,200 | Launch tooling, support systems, expanded monitoring, devices, telecom |

---

## 9. Capital, Equity, and Valuation Logic

### 9.1 Equity Pools

| Pool | Share | Notes |
| --- | --- | --- |
| Owner / founder pool | 60% | Held by the single idea owner / founder |
| Founding + strategic pool | 20% | Shared pool for founding members and future strategic partners |
| Investor pool | 20% | Dedicated outside-capital pool used as the planning ceiling in this phase |

### 9.2 Financing Interpretation Rules

- Founder dilution is **not** modeled as being redrawn from scratch each time.
- Investor dilution is drawn from the dedicated investor pool.
- Small outside checks should usually be read as **bridge / angel / SAFE** money, not as a classic institutional seed.
- Checks in the low-to-mid six figures are the most defensible external story for the current product state.

### 9.3 Round-Class Logic Used in This Pass

| Round Class | Interpretation |
| --- | --- |
| Self-funded | No outside investor before Production |
| Bridge | Small relief capital; timing support, not a full institutional financing story |
| Core pre-seed | Best-fit outside round for the current stage |
| Acceleration | Larger outside check justified by stronger partner value-add and earlier staffing depth |

---

## 10. Scenario and Investment-Level Definitions

### 10.1 Timing Scenarios

| Scenario | Definition |
| --- | --- |
| Scenario 1 | Fully self-funded to Production |
| Scenario 2 | Self-funded through Pilot 1 and into transition; investor before Production |
| Scenario 3 | Investor arrives right after Pilot 1 |

### 10.2 Investment Levels

| Level | Label | Interpretation |
| --- | --- | --- |
| Level 1 | Ad Hoc / Bootstrapped | Lean spend, higher manual burden, slower rollout |
| Level 2 | Ideal / Basic | Baseline planning case, balanced staffing and delivery discipline |
| Level 3 | Fully Funded / Corporate | Highest parallelism, earlier staffing depth, faster hardening |

### 10.3 What Changes By Level

The key change across levels is **not whether the core flows exist**. The key changes are:

- how much of the current prototype is hardened by each checkpoint,
- how fast the APK reaches parity,
- how quickly manual ops become disciplined rather than improvised,
- how early staffing, reporting, and support become formalized,
- how much runway exists for marketing and partner growth.

---

## 11. Full 21-Combination Summary Matrix

| Combination | Months to Production | Economic Cost | Founder Capital | Investor Capital | Round Class |
| --- | --- | --- | --- | --- | --- |
| S1-L1 | 34 | $451,751 | $240,000 | None | self-funded |
| S1-L2 | 26 | $353,794 | $185,000 | None | self-funded |
| S1-L3 | 20 | $281,931 | $150,000 | None | self-funded |
| S2-O1-I1 | 30 | $400,716 | $120,000 | $140,000 | core pre-seed |
| S2-O1-I2 | 27 | $363,656 | $120,000 | $145,000 | core pre-seed |
| S2-O1-I3 | 24 | $326,066 | $120,000 | $245,000 | core pre-seed |
| S2-O2-I1 | 28 | $382,548 | $110,000 | $135,000 | core pre-seed |
| S2-O2-I2 | 24 | $331,570 | $110,000 | $120,000 | core pre-seed |
| S2-O2-I3 | 22 | $307,898 | $110,000 | $240,000 | core pre-seed |
| S2-O3-I1 | 26 | $362,708 | $110,000 | $110,000 | core pre-seed |
| S2-O3-I2 | 22 | $311,316 | $110,000 | $100,000 | core pre-seed |
| S2-O3-I3 | 19 | $272,646 | $110,000 | $205,000 | core pre-seed |
| S3-O1-I1 | 26 | $349,636 | $95,000 | $150,000 | core pre-seed |
| S3-O1-I2 | 22 | $297,910 | $95,000 | $140,000 | core pre-seed |
| S3-O1-I3 | 19 | $258,804 | $95,000 | $255,000 | acceleration |
| S3-O2-I1 | 24 | $329,136 | $95,000 | $125,000 | core pre-seed |
| S3-O2-I2 | 20 | $276,996 | $95,000 | $120,000 | core pre-seed |
| S3-O2-I3 | 18 | $251,808 | $95,000 | $250,000 | acceleration |
| S3-O3-I1 | 22 | $308,804 | $95,000 | $105,000 | core pre-seed |
| S3-O3-I2 | 18 | $256,250 | $95,000 | $100,000 | core pre-seed |
| S3-O3-I3 | 16 | $230,522 | $95,000 | $225,000 | core pre-seed |

---

## 12. Baseline Recommendation

The restored baseline recommendation remains:

- **Primary path:** `S3-O2-I2`
- **Timeline:** `20 months`
- **Economic cost:** `$276,996 / INR 22,990,668`
- **Founder capital before investor:** `$95,000 / INR 7,885,000`
- **Investor capital:** `$120,000 / INR 9,960,000`
- **Why it remains primary:** it is the cleanest balance between timing, staffing realism, founder burden, and dilution discipline.

Fallback and upside references:

- **Fallback:** `S2-O2-I2`
- **Upside:** `S3-O2-I3`

---

## 13. Benchmark and Assumption Notes

### 13.1 Market Benchmarks Incorporated

- Ethiopia GP pricing corridor derived from Tenadoc, TenaFirst Plus, and Medanit public signals.
- Kenya GP pricing corridor derived from Zuri Health, ConnectMed / Access Afya, and Kenyatta National Hospital tariff references.
- Financing guardrails informed by Africa health-tech comparables and broader private-market seed dilution references.

### 13.2 Operating Assumptions Explicitly Approved By Founder

- No tenant-isolated redesign in this cycle.
- Provider web remains the main provider interface.
- Patient APK is required by Pilot 1 where possible and no later than Pilot 2.
- English is sufficient for the current planning horizon.
- Manual callbacks and admin-led fulfillment remain acceptable through most of the pilot period.
- Labor hours already being contributed by friendly or part-time contributors are still counted as real business cost.

### 13.3 Interpretation Caution

This document is the normalized assumption layer for the revised pass. Some of the longer topical working papers in the pack were drafted under earlier shorthand or pre-normalization scenario language. Where there is any conflict, **this document and the updated scenario files should govern the current revised numbers**.
