# Shared Assumptions & Scenario Definitions

**Health Hub Business Plan | Foundation Document**
**Version:** 1.1 | **Date:** March 2026 | **Status:** Updated Working Draft

> This document is the single source of truth for the revised team model, rate card, capacity assumptions, equity pools, and phase logic used across the Health Hub business plan.

## 1. Company Overview

Health Hub is a multi-role health technology platform for Ethiopia-first and Kenya-next care coordination. The current codebase already covers patient, GP, specialist, pharmacy, diagnostics, admin, AI triage, payments, chat, and video. The planning problem is therefore not greenfield invention; it is disciplined hardening, mobile completion, operating setup, and commercialization.

| Attribute | Detail |
| --- | --- |
| Primary market | Ethiopia (Addis Ababa) |
| Secondary market | Kenya (Nairobi) |
| Tech stack | Angular 21 SSR + Express 5 + PostgreSQL 16 |
| Mobile plan | Patient Android APK only in this planning cycle |
| Current state | Working multi-role web prototype; investor-demo-ready, not production-ready |

## 2. Team & Rate Card

### 2.1 Organization Model

| Group | Count | Working Pattern | Planning Interpretation |
| --- | --- | --- | --- |
| Core team | 3 | Part-time, ~4 hours/day each | 1 owner/founder + 2 founding members; one acts as technical head / product-testing lead |
| Developers | 7 | Part-time, ~4 hours/day each | Includes Android/backend contributors plus explicit full-stack and DevOps capacity |
| Advisory board | 2 | Fractional | Friendly experts counted at economic value, not treated as free |

All labor is counted at market-value economic cost even if cash payment is deferred, subsidized, or fulfilled through friendly networks.

### 2.2 Rate Card

| Rate Category | USD/hr | INR/hr | Applied To |
| --- | --- | --- | --- |
| Junior developer | $10 | ~INR 830 | Routine implementation, QA assistance, polish |
| Senior developer | $20 | ~INR 1,660 | Full-stack ownership, architecture, DevOps, complex debugging |
| Management / technical head | $20 | ~INR 1,660 | Founder office, product management, testing coordination |
| Everyone else | $15 | ~INR 1,245 | Android team average, design, ops support, general contributors |

### 2.3 Effective Delivery Capacity

| Parameter | Value |
| --- | --- |
| Raw part-time technical capacity | ~560 hrs/mo (7 developers × ~80 hrs) |
| Conservative productive planning capacity | **~480 hrs/mo** |
| Level 1 utilization | ~210 productive hrs/mo |
| Level 2 utilization | ~320 productive hrs/mo |
| Level 3 utilization | ~480 productive hrs/mo |

## 3. Android Mobile App

| Parameter | Value |
| --- | --- |
| Workstream | Separate paid Android team |
| Fixed effort | **480 hours total** |
| Fixed average rate | **$15/hr** |
| Fixed economic cost | **$7,200 / INR 597,600** |
| Delivery intent | APK should be ready by Pilot 1 where possible, and by Pilot 2 at the latest |

## 4. Remaining Web / Hardening Effort

| Parameter | Value |
| --- | --- |
| Remaining web product effort | **720-770 hours** |
| Expected case used in modeling | **745 hours** |
| Logic | Sized to ~150%-160% of Android effort, per revised team estimate |

Additional parallel effort counted separately:

| Workstream | Hours |
| --- | --- |
| QA, DevOps, security hardening | 220 |
| Doctor/admin training and SOP design | 180 |
| Provider onboarding and partner tooling | 140 |
| Launch analytics, reporting, release governance | 120 |

## 5. Operating Staffing Ladder

| Phase | Doctors | Admin Ops | Technical Support | Notes |
| --- | --- | --- | --- | --- |
| Pre-Pilot | 0 employed | 0 employed | 0 employed | Training and SOP drafting only |
| Pilot 1 | 2 | 2 | 2 | Minimum employed coverage alongside partner clinics |
| Pilot 2 | 4 | 4 | 2 | Added callback and care-ops depth |
| Production Readiness | 6 | 6 | 3 | Near-24/7 staffed coverage model |

### 5.1 Salary Benchmarks Used

| Role | Planning Benchmark | Basis |
| --- | --- | --- |
| MBBS doctor | INR 60,000/month | Official NHM Assam Medical Officer (MBBS) remuneration band around INR 54,625-57,881/month, uplifted slightly to fit private retention and shift flexibility |
| Admin ops / callback staff | INR 18,000/month | NCS customer-support and back-office role ranges roughly INR 13,000-22,000/month |
| Technical support | INR 25,000/month | NCS technical-support role ranges roughly INR 18,000-28,000/month |

## 6. Infrastructure, Phones, and Tools

The prior infrastructure assumption was increased to reflect operational reality: phones for admin workflows, callback telecom costs, SMS/email tooling, monitoring, and production-support software are now bundled into the phase-cost model.

| Phase | Modeled Monthly Range |
| --- | --- |
| Pre-Pilot | $350-$500 |
| Pilot 1 | $700-$1,100 |
| Pilot 2 | $1,100-$1,600 |
| Production readiness | $1,500-$2,200 |

## 7. Currency Policy

- Base modeling currency: **USD**
- Cost and investment reporting: **USD + INR**
- Pricing and revenue interpretation: **USD + ETB + KES**
- FX conversion used here: **1 USD = 83 INR**

## 8. Equity Pools

| Pool | Share | Notes |
| --- | --- | --- |
| Owner / founder pool | 60% | Held by the single owner/founder |
| Founding + strategic pool | 20% | Shared pool for founding members and future strategic partners |
| Investor pool | 20% | Dedicated pool for outside capital; modeled as the ceiling during this planning phase |

In investor scenarios, modeled dilution is drawn from the dedicated 20% investor pool rather than from the founder or founding-team pools.

## 9. Phase Definitions

| Phase | Description |
| --- | --- |
| Pre-Pilot | Internal rehearsals, hardening, APK start, doctor/admin training drafts, callback SOP setup |
| Pilot 1 | Ethiopia-first live pilot with manual but staffed callbacks, minimum employed coverage, and partner clinics |
| Pilot 2 | Larger growth pilot with stronger reporting, refreshed training, deeper staffing, and partial automation |
| Production Readiness | Production-safe release prep with support schedule, compliance closeout, and launch playbooks |

## 10. Scenario Definitions

- **Scenario 1:** fully self-funded to Production.
- **Scenario 2:** self-funded through Pilot 1 and transition, investor before Production.
- **Scenario 3:** investor arrives right after Pilot 1.
- **Level 1:** constrained capital deployment; lean utilization, slower rollout, higher dependence on manual staging.
- **Level 2:** ideal baseline; balanced utilization and disciplined staffing.
- **Level 3:** fully funded / corporate posture; highest parallelism and earliest staffing depth.

## 11. 21-Combination Summary Matrix

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

## 12. Baseline Reference Point

The updated ideal planning baseline is the balanced primary path: **S3-O2-I2**, modeled at **$276,996 / INR 22,990,668** through Production, with **$95,000 / INR 7,885,000** before outside funding and **$120,000 / INR 9,960,000** from a core pre-seed style round.

## 13. Assumption Notes and Source Basis

- NHM Assam Medical Officer (MBBS) remuneration approval was used as the primary formal reference for doctor salary anchoring.
- National Career Service role ranges were used for admin/callback staff and technical-support benchmarking.
- Friendly clinics, lawyers, and accountants may reduce near-term cash cost, but all such work is still counted at economic value in this pack.
