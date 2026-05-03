# Foundation Parameters

**Health Hub Business Plan v2 | Shared Assumptions Document**
**Version:** 2.0 | **Date:** March 2026

> Every number, timeline, and cost figure in the v2 business plan traces back to
> this document. When a downstream document says "per params.md," it means here.

---

## Table of Contents

1. [Company Overview](#1-company-overview)
2. [Team Composition and Capacity](#2-team-composition-and-capacity)
3. [Rate Card](#3-rate-card)
4. [Operational Staffing and Employed Coverage](#4-operational-staffing-and-employed-coverage)
5. [Android APK Scope](#5-android-apk-scope)
6. [Web Platform Scope](#6-web-platform-scope)
7. [Infrastructure and Operational Costs](#7-infrastructure-and-operational-costs)
8. [Equity and Capital Structure](#8-equity-and-capital-structure)
9. [East Africa Market Parameters](#9-east-africa-market-parameters)
10. [Currency and FX Assumptions](#10-currency-and-fx-assumptions)
11. [Revenue Model Assumptions](#11-revenue-model-assumptions)
12. [Success Metric](#12-success-metric)
13. [Phase Definitions](#13-phase-definitions)
14. [Scenario and Investment Level Definitions](#14-scenario-and-investment-level-definitions)
15. [Full Combination Matrix](#15-full-combination-matrix)
16. [Existing Asset Inventory](#16-existing-asset-inventory)
17. [Parallel Operational Workstreams](#17-parallel-operational-workstreams)

---

## 1. Company Overview

Health Hub is an international health technology company building a multi-tenant,
multi-stakeholder healthcare platform. The platform serves patients, GPs,
specialists, pharmacies, diagnostic labs, and administrators — each with dedicated
workflows, dashboards, and service layers.

**Current state:** Functional prototype (Angular 21 SSR + Express 5 + PostgreSQL 16
+ WebSocket + Daily.co video). The prototype can serve a limited number of users
with manual support. It is not yet hardened for security or scale.

**Primary launch geography:** East Africa (Ethiopia first, Kenya second).

**Business model:** Transaction-first health marketplace with admin-assisted
care navigation. The company operates as both a technology platform and an
assisted healthcare delivery operation.

---

## 2. Team Composition and Capacity

### 2.1 Core Team (3 Members)

| Role | Description | Hours/Day | Hours/Month | Status |
|------|-------------|-----------|-------------|--------|
| Owner / Founder | Idea owner, product vision, strategic decisions, investor relations | 4 | ~88 | Part-time |
| Founding Member 1 | Operations and management, partner relations, business development | 4 | ~88 | Part-time |
| Founding Member 2 | Technical head, product testing, architecture oversight, QA leadership | 4 | ~88 | Part-time |

**Core team monthly capacity:** ~264 hours (3 people x 88 hours)

### 2.2 Development Team (7 Part-Time Developers)

| Sub-team | Members | Roles | Hours/Day Each | Combined Hours/Month |
|----------|---------|-------|----------------|---------------------|
| Android / Backend team | 3-4 | Building the patient-facing Android APK and supporting backend work | 4 | ~308-352 |
| Web Platform team | 2 | 1 DevOps engineer + 1 Full-stack developer for web hardening | 4 | ~176 |
| Shared / Flex | 1 | Crosses between Android and web as needed | 4 | ~88 |

**Developer team monthly capacity:** ~572 hours (7 people x ~82 productive hours after coordination overhead)

### 2.3 Advisory Board (2 Members)

| Role | Contribution | Hours/Month |
|------|-------------|-------------|
| Advisor 1 | Finance, compliance, regulatory strategy | ~10-15 |
| Advisor 2 | Strategic review, market guidance, investor introductions | ~10-15 |

**Advisory monthly capacity:** ~20-30 hours

### 2.4 Capacity Summary

| Level | Total Productive Technical Hours/Month | Explanation |
|-------|---------------------------------------|-------------|
| Level 1 (Bootstrapped) | ~320 hrs/mo | Lean utilization; more sequencing, founder time split across responsibilities |
| Level 2 (Ideal) | ~480 hrs/mo | Balanced baseline; enough concurrency for build + operating prep |
| Level 3 (Fully Funded) | ~640 hrs/mo | Full effective utilization of all part-time contributors |

**Key rule:** For paired roles (e.g., 2 people sharing one function), capacity is
modeled as equivalent to a single full-time person. This reflects part-time
scheduling, handoff overhead, and coordination cost.

**Important:** No team member is a full-time employee. All contributors work
part-time (~4 hours/day, ~22 working days/month = ~88 hours/month per person).

---

## 3. Rate Card

### 3.1 Product and Delivery Rates

| Role Category | USD/hr | INR/hr | Use Case |
|---------------|--------|--------|----------|
| Junior developer | $10 | ~INR 830 | Routine implementation, test support, basic frontend/backend tasks |
| Senior developer | $20 | ~INR 1,660 | Full-stack ownership, DevOps, architecture, hardening, complex features |
| Management / Technical head | $20 | ~INR 1,660 | Founder office, product management, testing oversight, strategic work |
| Everyone else (blended) | $15 | ~INR 1,245 | Android team (blended), design, general contributors, advisory |

### 3.2 Blended Rate Calculation

| Team Segment | Rate | Members | Monthly Cost |
|-------------|------|---------|-------------|
| Core team (3 x management) | $20/hr | 3 | 3 x 88 x $20 = $5,280 |
| Senior developers (DevOps + Full-stack) | $20/hr | 2 | 2 x 88 x $20 = $3,520 |
| Junior developers (Android/backend) | $10/hr | 3 | 3 x 88 x $10 = $2,640 |
| Blended contributors (flex + Android lead) | $15/hr | 2 | 2 x 88 x $15 = $2,640 |
| Advisory board | $15/hr | 2 | 2 x 25 x $15 = $750 |

**Total monthly team economic cost:** ~$14,830/month

**Blended average across all contributors:** ~$14.50/hr

---

## 4. Operational Staffing and Employed Coverage

### 4.1 Salary Benchmarks (India-Based Ops Staff)

These are employees hired to run the live healthcare operation. They are separate
from the product/development team.

| Role | INR/Month | USD/Month | Basis |
|------|-----------|-----------|-------|
| MBBS Doctor (telemedicine) | 60,000 | ~$720 | Telemedicine doctor benchmarks in India: INR 40,000-80,000/mo (Practo, NHM anchors); INR 60,000 is mid-range for part-time/shift-based tele-consult doctors |
| Admin Ops / Callback Staff | 18,000 | ~$217 | Indian customer support and back-office benchmarks for semi-skilled roles |
| Technical Support (L1/L2) | 25,000 | ~$301 | Junior technical support / helpdesk benchmarks in Indian metros |

**Source:** Web research confirms MBBS telemedicine doctor salaries range from
INR 40,000-80,000/month in India (2025-2026 data from Practo benchmarks,
NHM Medical Officer bands, and health tech platform ranges). The INR 60,000
midpoint aligns with part-time / shift-based remote consultation work.

### 4.2 Minimum Employed Coverage Ladder

| Phase | Doctors | Admin Ops | Technical Support | Monthly INR | Monthly USD |
|-------|---------|-----------|-------------------|-------------|-------------|
| Pre-Pilot | 0 | 0 | 0 | 0 | $0 |
| Pilot 1 (up to 1,000 users) | 2 | 2 | 2 | 206,000 | ~$2,482 |
| Pilot 2 (5,000-10,000 users) | 4 | 4 | 2 | 362,000 | ~$4,361 |
| Production Readiness | 6 | 6 | 3 | 543,000 | ~$6,542 |
| Production (full scale) | 8-10 | 8 | 4 | 748,000-868,000 | ~$9,012-$10,458 |

### 4.3 Why These Staff Are Required

| Role | Why Required | What They Do |
|------|-------------|-------------|
| MBBS Doctors | Platform must guarantee minimum clinical coverage for continuity and service confidence, independent of partner-clinic doctors | Handle scheduled and on-demand tele-consultations, triage callbacks, clinical oversight |
| Admin Ops | The operating model is admin-assisted; callbacks, exception handling, and partner coordination cannot be automated in early phases | Callback handling, tourism/travel follow-up, manual prescription/lab fulfilment, partner coordination, patient onboarding assistance |
| Technical Support | Live users create real issue-response obligations; the dev team cannot absorb support load and still build | L1 issue triage, basic troubleshooting, escalation to dev team, live-ops monitoring, user guidance |

### 4.4 Coverage Math

For near-24/7 coverage (which production requires for a healthcare platform):

| Shift Pattern | Doctors Needed | Admin Needed | Tech Support Needed |
|--------------|----------------|-------------|-------------------|
| 8-hour shift, 7 days/week, 2 shifts/day | 4 minimum (2 per shift) | 4 minimum | 2 minimum |
| 3-shift 24/7 coverage | 6 minimum | 6 minimum | 3 minimum |
| 24/7 + buffer for leave/training | 8-10 | 8 | 4 |

---

## 5. Android APK Scope

| Parameter | Value |
|-----------|-------|
| Total hours | 480 hours |
| Team | 3-4 developers from the Android/backend sub-team |
| Average blended rate | $15/hr |
| Total cost | $7,200 |
| Status | Fixed external quote; already contracted |
| Scope | Patient-facing mobile application covering registration, dashboard, consultation request, video/audio/chat, prescription viewing, lab results, notifications, payments |
| Target | Core patient journeys ready by Pilot 1; full scope by Pilot 2 |

---

## 6. Web Platform Scope

### 6.1 Effort Estimation Basis

The remaining web platform work is estimated at **150-160% of Android effort**,
based on a real estimate from the development team.

| Parameter | Value | Derivation |
|-----------|-------|-----------|
| Android effort | 480 hours | Fixed quote |
| Web multiplier | 1.55x (midpoint of 1.5x-1.6x) | Real team estimate; web has more role surfaces but benefits from existing prototype |
| Remaining web effort | **744 hours** (range: 720-768) | 480 x 1.55 = 744 |
| Modeled expected case | **745 hours** | Rounded for planning |

### 6.2 What This Covers

The 745-hour web estimate includes:
- Security hardening and production-readiness fixes
- Role-flow completion (GP, specialist, pharmacy, diagnostics, admin)
- SSR safety, auth hardening, rate limiting
- Analytics, reporting dashboards, partner tooling
- API hardening, error handling, monitoring integration
- Performance optimization and load testing
- Release governance tooling

### 6.3 What This Does Not Cover

- Android APK (separate 480-hour workstream)
- Doctor/admin training content creation (see Section 17)
- SOP writing and operational documentation (see Section 17)
- Partner onboarding materials (see Section 17)

---

## 7. Infrastructure and Operational Costs

### 7.1 Technology Infrastructure

| Phase | Hosting & Monitoring | Video (Daily.co) | Database | Total Tech Infra |
|-------|---------------------|-------------------|----------|-----------------|
| Pre-Pilot | $50-80/mo | $0-20/mo | $15-30/mo | $65-130/mo |
| Pilot 1 | $80-150/mo | $50-100/mo | $30-50/mo | $160-300/mo |
| Pilot 2 | $150-300/mo | $100-200/mo | $50-100/mo | $300-600/mo |
| Production | $300-500/mo | $200-400/mo | $100-200/mo | $600-1,100/mo |

### 7.2 Operational Infrastructure (NEW in v2)

| Item | Phase Introduced | Monthly Cost | Notes |
|------|-----------------|-------------|-------|
| Admin phones (2-4 devices) | Pre-Pilot | $0 (one-time $200-400) | Android phones for admin staff to handle callbacks |
| Phone top-ups / SIM costs | Pilot 1 | $30-60/mo | Call minutes and data for admin callback operations |
| Telecom / VoIP for callbacks | Pilot 1 | $50-100/mo | Cloud telephony or VoIP for systematic callback management |
| Call center software (basic) | Pilot 2 | $50-100/mo | Basic CRM/ticketing for callback tracking |
| Additional devices for scaling | Pilot 2 | $0 (one-time $300-600) | More phones/tablets as admin team grows |
| Support ticketing tools | Pilot 1 | $0-30/mo | Free tier initially, paid as volume grows |

### 7.3 One-Time Equipment Costs

| Item | Cost | When |
|------|------|------|
| Admin phones (initial batch of 2) | $200-300 | Pre-Pilot |
| Admin phones (expansion to 4-6) | $300-500 | Pilot 2 |
| Laptops/workstations for support staff | $400-600 | Pilot 1 |
| Miscellaneous office/ops setup | $200-300 | Pilot 1 |

### 7.4 Combined Infrastructure Ranges (Monthly)

| Phase | Tech Infra | Ops Infra (recurring) | Combined Monthly |
|-------|-----------|----------------------|-----------------|
| Pre-Pilot | $65-130 | $0-20 | $65-150 |
| Pilot 1 | $160-300 | $110-220 | $270-520 |
| Pilot 2 | $300-600 | $160-320 | $460-920 |
| Production | $600-1,100 | $200-400 | $800-1,500 |

---

## 8. Equity and Capital Structure

### 8.1 Cap Table — Three Pools

| Pool | Share | Description |
|------|-------|-------------|
| Owner / Founder | 60% | Sole idea owner and primary decision maker. Controls voting majority. |
| Founding Team + Strategic Partners | 20% | 2 founding members + any future strategic partner (e.g., key clinic chain, technology partner). Vested over 3-4 years with 1-year cliff. |
| Investor Pool | 20% | Reserved ceiling for outside capital in this planning phase. Drawn from as investor rounds close. |

### 8.2 Dilution Logic

- The 20% investor pool is the **ceiling** for outside capital during the current
  planning phase (through Production launch).
- If the investor requires more than 20%, the dilution comes proportionally from
  the other two pools (founder and founding team).
- Anti-dilution: founder maintains majority control (>50%) through Production in
  all modeled scenarios.
- The founding team pool includes both current founding members and a small
  reserve (~3-5%) for future strategic hires or partnerships.

### 8.3 Equity Implications by Scenario

| Scenario | Founder Post-Raise | Founding Team Post-Raise | Investor Post-Raise |
|----------|-------------------|-------------------------|-------------------|
| S1 (no investor) | 60% | 20% | 0% (pool reserved) |
| S2 (investor during transition) | 55-60% | 18-20% | 15-20% |
| S3 (investor after Pilot 1) | 52-58% | 17-19% | 18-20% |
| If investor demands >20% | Negotiated | Negotiated | 20-30% max |

---

## 9. East Africa Market Parameters

### 9.1 Ethiopia

| Parameter | Value | Source |
|-----------|-------|--------|
| Population | ~130 million | World Bank 2025 |
| GDP per capita | ~$1,020 | World Bank 2025 |
| Health expenditure per capita | ~$28/year | WHO 2024 |
| Smartphone penetration (urban) | 35-45% | GSMA 2025 |
| Addis Ababa population | ~5.5 million | Census estimate |
| Private clinics in Addis | 2,000-3,000 | Ministry of Health estimates |
| Mobile money (Telebirr) users | ~40 million | Ethio Telecom reports |
| Regulatory environment | Telecom liberalization ongoing; health tech regulation nascent | MOH digital health strategy 2025 |

### 9.2 Kenya

| Parameter | Value | Source |
|-----------|-------|--------|
| Population | ~56 million | World Bank 2025 |
| GDP per capita | ~$2,100 | World Bank 2025 |
| Health expenditure per capita | ~$84/year | WHO 2024 |
| Smartphone penetration (urban) | 55-65% | GSMA 2025 |
| Nairobi population | ~5.0 million | Census estimate |
| M-Pesa users | ~33 million | Safaricom reports |
| Regulatory environment | More mature digital health regulation; PPB oversight | Kenya Health Act |

---

## 10. Currency and FX Assumptions

| Currency Pair | Rate Used | Buffer Applied | Notes |
|---------------|----------|----------------|-------|
| USD to INR | 83.0 | — | Stable corridor; used for Indian ops staff costing |
| USD to ETB | 57.0 | 10-15% downward | Ethiopian birr depreciating; buffer protects projections |
| USD to KES | 130.0 | 10% downward | More stable than ETB but still volatile |

All revenue figures in downstream documents are converted to USD with the
FX buffer applied to account for depreciation risk.

---

## 11. Revenue Model Assumptions

### 11.1 Revenue Streams

| Stream | Type | When Active |
|--------|------|-------------|
| GP consultation fees | Per-transaction (B2C) | Pilot 1 (subsidized) onward |
| Specialist consultation fees | Per-transaction (B2C) | Pilot 2 onward |
| Pharmacy commission | Take-rate on order value (B2B) | Pilot 1 onward |
| Diagnostics commission | Take-rate on order value (B2B) | Pilot 1 onward |
| Care coordination / travel | Per-case fee | Pilot 2 onward |
| Facility platform fees | Monthly SaaS (B2B) | Production onward |
| Premium patient subscription | Monthly (B2C) | Production onward |

### 11.2 Pricing Corridors

| Service | Ethiopia Benchmark | Kenya Benchmark |
|---------|-------------------|----------------|
| GP consult | ETB 150-300 ($2.60-5.25) | KES 300-500 ($2.30-3.85) |
| Specialist consult | ETB 300-600 ($5.25-10.50) | KES 500-1,000 ($3.85-7.70) |
| Pharmacy take-rate | 8-12% | 8-12% |
| Diagnostics take-rate | 10-15% | 10-15% |
| Facility platform fee | ETB 2,000-5,000/mo | KES 5,000-10,000/mo |
| Patient premium sub | ETB 200-400/mo | KES 400-800/mo |

### 11.3 Revenue Timing

| Phase | Revenue Expectation |
|-------|-------------------|
| Pre-Pilot | $0 — internal testing only |
| Pilot 1 | $0-500/mo — subsidized/symbolic pricing, learning phase |
| Pilot 2 | $500-3,000/mo — 50% of target pricing, real monetization experiments |
| Production | $3,000-15,000/mo — full pricing, scaling user base |

---

## 12. Success Metric

**Primary:** Cumulative total revenue exceeds cumulative total capital investment.

**Secondary metrics:**
- Monthly active patients > 1,000 by end of Pilot 2
- LTV:CAC ratio > 3x by Production
- Monthly burn rate sustainable for 6+ months at any point
- Doctor utilization rate > 60% during operational hours

---

## 13. Phase Definitions

| Phase | User Scale | Duration Range | Primary Focus |
|-------|-----------|----------------|---------------|
| Pre-Pilot | 100-200 (internal) | 3-6 months | Internal testing with mock and real team members. Android APK under construction. Web hardening. Doctor/admin training design. SOPs drafted. |
| Pilot 1 | Up to 1,000 | 2-3 months | First external pilot in Ethiopia. Live callbacks, real patients, partner clinics. Android APK core ready. |
| Pilot 2 | 5,000-10,000 | 3-13 months | Larger pilot via marketing. Application hardening in background. Kenya prep. Staffing ladder active. |
| Production Readiness | Full scale | 4-12 months | Final hardening, compliance, launch governance, support schedules, production release. |

**Total timeline range:** 16-34 months depending on scenario and investment level.

---

## 14. Scenario and Investment Level Definitions

### 14.1 Three Scenarios

| Scenario | Description | Self-Funded Runway |
|----------|-------------|-------------------|
| S1 — Fully Self-Funded | No external investor through Production. All costs from founders. | Month 0 through Production |
| S2 — Investor During Transition | Self-fund through Pilot 1 into Pilot 2 transition. Investor arrives during Pilot 1→2 transition or after Pilot 2. | 3-12 months |
| S3 — Investor After Pilot 1 | Self-fund only through Pre-Pilot and into Pilot 1. Investor arrives right after Pilot 1 completes. | 0-3 months |

### 14.2 Three Investment Levels

| Level | Label | Budget vs Ideal | Description |
|-------|-------|----------------|-------------|
| L1 | Bootstrapped / Ad Hoc | ~40% of ideal | Maximum constraint. Bare minimum spend. Slower everything. |
| L2 | Ideal / Basic | 100% (baseline) | Minimum viable investment. Just enough to meet milestones. Moderate breathing room. |
| L3 | Fully Funded / Corporate | 150-200%+ of ideal | Full corporate approach. Proper resourcing at every stage. |

### 14.3 Mix-and-Match Rule

For Scenarios 2 and 3, our own spend level and the investor's contribution level
can differ. This creates:

| Scenario | Combinations | Notation |
|----------|-------------|----------|
| S1 | 3 (our level only) | S1-L1, S1-L2, S1-L3 |
| S2 | 9 (our level x investor level) | S2-O1-I1 through S2-O3-I3 |
| S3 | 9 (our level x investor level) | S3-O1-I1 through S3-O3-I3 |
| **Total** | **21 combinations** | |

---

## 15. Full Combination Matrix

| # | Code | Our Level | Investor Level | Investor Timing |
|---|------|-----------|---------------|----------------|
| 1 | S1-L1 | Bootstrapped | None | Never |
| 2 | S1-L2 | Ideal | None | Never |
| 3 | S1-L3 | Fully Funded | None | Never |
| 4 | S2-O1-I1 | Bootstrapped | Bootstrapped | Pilot 1→2 transition |
| 5 | S2-O1-I2 | Bootstrapped | Ideal | Pilot 1→2 transition |
| 6 | S2-O1-I3 | Bootstrapped | Fully Funded | Pilot 1→2 transition |
| 7 | S2-O2-I1 | Ideal | Bootstrapped | Pilot 1→2 transition |
| 8 | S2-O2-I2 | Ideal | Ideal | Pilot 1→2 transition |
| 9 | S2-O2-I3 | Ideal | Fully Funded | Pilot 1→2 transition |
| 10 | S2-O3-I1 | Fully Funded | Bootstrapped | Pilot 1→2 transition |
| 11 | S2-O3-I2 | Fully Funded | Ideal | Pilot 1→2 transition |
| 12 | S2-O3-I3 | Fully Funded | Fully Funded | Pilot 1→2 transition |
| 13 | S3-O1-I1 | Bootstrapped | Bootstrapped | After Pilot 1 |
| 14 | S3-O1-I2 | Bootstrapped | Ideal | After Pilot 1 |
| 15 | S3-O1-I3 | Bootstrapped | Fully Funded | After Pilot 1 |
| 16 | S3-O2-I1 | Ideal | Bootstrapped | After Pilot 1 |
| 17 | S3-O2-I2 | Ideal | Ideal | After Pilot 1 |
| 18 | S3-O2-I3 | Ideal | Fully Funded | After Pilot 1 |
| 19 | S3-O3-I1 | Fully Funded | Bootstrapped | After Pilot 1 |
| 20 | S3-O3-I2 | Fully Funded | Ideal | After Pilot 1 |
| 21 | S3-O3-I3 | Fully Funded | Fully Funded | After Pilot 1 |

---

## 16. Existing Asset Inventory

### 16.1 Codebase (Verified from Repository)

| Asset | Detail | Replacement Value |
|-------|--------|------------------|
| Angular 21 SSR web application | 10 feature modules (auth, dashboard, patient, GP, specialist, pharmacy, diagnostics, admin, notifications, shared) | $18,000-24,000 |
| Express 5 API server | 16 API route files covering all roles + health endpoints | $6,000-8,000 |
| PostgreSQL schema | 12 migration files, comprehensive multi-role schema | $3,000-4,000 |
| WebSocket layer | Real-time notifications, queue updates, chat infrastructure | $2,000-3,000 |
| Daily.co video integration | Video consultation infrastructure (placeholder/scaffold) | $1,500-2,000 |
| Auth and security layer | JWT, bcrypt, role guards, interceptors, SSR safety | $2,000-3,000 |
| DevOps and deployment | Render config, health endpoints, rate limiting, structured logging | $1,000-1,500 |

**Total estimated replacement cost:** $33,500-$45,500

### 16.2 Documentation and Planning Assets

- CLAUDE.md audit system with 19 tracked issues (all resolved)
- 11-agent orchestration system for project management
- Business plan v1 (15 documents + scenarios + competitive analysis)
- Agent boundary configurations and task boards

---

## 17. Parallel Operational Workstreams

These workstreams run alongside software development and are a critical part of
building the company — not just the product. They explain why reduced coding
hours do not automatically collapse the timeline.

### 17.1 Workstream Inventory

| Workstream | Starts | Continues Through | Effort (Hours) | Owner |
|-----------|--------|-------------------|----------------|-------|
| Doctor training protocols and playbooks | Pre-Pilot | Production | 120-160 | Founding Member 1 + Medical Advisor |
| Admin callback SOPs and escalation trees | Pre-Pilot | Production | 80-120 | Founding Member 1 |
| Admin operational guidelines (daily workflows) | Pre-Pilot | Pilot 2 | 60-80 | Founding Member 1 |
| Technical support runbooks | Pilot 1 | Production | 60-80 | Technical Head |
| Partner onboarding kits (clinics, labs, pharmacies) | Pre-Pilot | Pilot 2 | 80-120 | Owner + Founding Member 1 |
| Release governance and rollback checklists | Pre-Pilot | Production | 40-60 | Technical Head |
| Staffing calibration and refresher training | Pilot 1 | Production | 40-60 | Founding Member 1 |
| Launch analytics and reporting setup | Pilot 2 | Production | 60-80 | Technical Head |
| Compliance and regulatory documentation | Pre-Pilot | Production | 80-120 | Owner + Advisors |

**Total parallel operational effort:** 620-880 hours (modeled at 750 hours expected)

### 17.2 Why This Matters for Timeline

The company is not only finishing software. It is converting a broad prototype
into a disciplined healthcare operation. The parallel workstreams consume
significant founder and founding-team time, which is why:

- Lower coding effort does not erase operating work
- Timeline compression has a floor determined by operational readiness
- The saved engineering time is partly consumed by QA, SOP writing, training,
  partner activation, and release governance

### 17.3 Combined Effort Summary

| Workstream Category | Hours | Cost at Blended Rates |
|-------------------|-------|----------------------|
| Web platform hardening | 745 | $14,900 (at $20/hr senior rate) |
| Android APK | 480 | $7,200 (at $15/hr blended) |
| QA, DevOps, security hardening | 220 | $4,400 (at $20/hr senior rate) |
| Parallel operational workstreams | 750 | $11,250 (at $15/hr blended) |
| **Total** | **2,195** | **$37,750** |

---

## Appendix: Key Differences from v1 Params

| Parameter | v1 Value | v2 Value | Reason for Change |
|-----------|----------|----------|------------------|
| Team size | "Small team of 3" abstraction | 3 core + 7 devs + 2 advisors = 12 | Real team composition disclosed |
| Employment status | Implied full-time | All part-time (~4 hrs/day) | Actual working arrangement |
| Junior dev rate | Not specified | $10/hr | Founder-approved rate card |
| Senior dev rate | $24-36/hr range | $20/hr | Founder-approved rate card |
| Management rate | Blended | $20/hr | Founder-approved rate card |
| Everyone else | Blended at $30 | $15/hr | Founder-approved rate card |
| Web effort | 682-1,413 hrs (3-point estimate) | 720-768 hrs (150-160% of Android) | Real team estimate |
| Android effort | 440-640 hrs | 480 hrs fixed | Contracted quote |
| MBBS doctor salary | INR 50,000-75,000 | INR 60,000 (mid-range) | Verified against telemedicine benchmarks |
| Infrastructure | $30-50/mo | $65-1,500/mo by phase | Added phones, telecom, callback tooling, devices |
| Equity split | Not detailed | 60/20/20 | Founder-defined three-pool structure |
| Operational staff | Not explicitly modeled | Doctors + Admin + Tech Support ladder | Required for operating a healthcare company |
| Parallel workstreams | Not tracked | 750 hours explicitly modeled | Company-building work beyond coding |

---

*End of params.md — all downstream v2 documents reference this file for assumptions.*
