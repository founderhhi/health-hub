# 04 — Effort Estimation

**Health Hub Business Plan v2 | Full Effort Model with Traceable Math**
**Version:** 2.0 | **Date:** March 2026

> All numbers in this document trace back to `params.md` (v2). When a figure says
> "per params," it means the Foundation Parameters document in this same directory.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Revised Effort Stack](#2-revised-effort-stack)
3. [Technical vs Non-Technical Split](#3-technical-vs-non-technical-split)
4. [Team Capacity Model](#4-team-capacity-model)
5. [Effort by Phase](#5-effort-by-phase)
6. [Why Timelines Did Not Collapse](#6-why-timelines-did-not-collapse)
7. [Interpretation by Investment Level](#7-interpretation-by-investment-level)

---

## 1. Executive Summary

The Health Hub v2 effort model provides a comprehensive, ground-up estimation of the total effort required to build and safely launch the platform. The model establishes a total effort baseline of **2,195 hours**, incorporating a direct team estimate for the remaining web platform work along with fixed Android API commitments, QA/DevOps hardening, and parallel operational workstreams.

A common mistake is to add only the two build workstreams (745 + 480 = 1,225 hours) and declare "that is all the work." It is not. The company is not shipping a side project. It is building a healthcare operation that requires training protocols, callback SOPs, partner onboarding kits, compliance documentation, launch analytics, and release governance. Those workstreams consume real hours from the same part-time team and are modeled explicitly.

### Combined Effort Basis

| Workstream Category | Hours |
|---------------------|-------|
| Web platform hardening | 745 |
| Android APK | 480 |
| QA, DevOps, security hardening | 220 |
| Parallel operational workstreams | 750 |
| **Total** | **2,195** |

This is the number the rest of the business plan builds timelines and costs against.

---

### Key Changes from v1

**The v1 Problem:**
The v1 effort model used a three-point estimate (optimistic / expected / pessimistic) for remaining web work, producing a range of 682-1,413 hours. That range was too wide to plan against, and the expected-case value overweighted the web platform relative to actual team assessment.

**What Changed:**
The development team provided a direct estimate: remaining web work is **150-160% of the Android effort** (per params.md, Section 6.1). With Android fixed at 480 hours, this yields a web estimate of 720-768 hours, modeled at **745 hours** (the 1.55x midpoint, rounded).

---

## 2. Revised Effort Stack

### 2.1 Full Workstream Table

| # | Workstream | Hours | Rate | Cost | Rationale |
|---|-----------|-------|------|------|-----------|
| 1 | Web platform hardening | 745 | $20/hr (senior) | $14,900 | 480 hrs Android x 1.55 multiplier = 744, rounded to 745. Covers security hardening, role-flow completion (GP, specialist, pharmacy, diagnostics, admin), SSR safety, auth hardening, rate limiting, API hardening, error handling, monitoring integration, performance optimization, and load testing. Per params.md Section 6. |
| 2 | Android APK | 480 | $15/hr (blended) | $7,200 | Fixed external quote, already contracted. Patient-facing mobile application covering registration, dashboard, consultation, video/audio/chat, prescriptions, lab results, notifications, payments. Per params.md Section 5. |
| 3 | QA, DevOps, security hardening | 220 | $20/hr (senior) | $4,400 | Release discipline, CI/CD pipeline maturity, monitoring stack, penetration testing, security audit remediation, load testing infrastructure, rollback procedures. Not included in the web or Android line items — this is cross-cutting infrastructure work. |
| 4 | Doctor/admin training and SOP design | 180 | $15/hr (blended) | $2,700 | Doctor training protocols and playbooks (120-160 hrs per params.md Section 17.1, midpoint 140) + admin callback SOPs and escalation trees (80-120 hrs, midpoint 100). Combined and de-duplicated to 180 hrs because training and SOPs share content overlap. |
| 5 | Provider onboarding and partner tooling | 140 | $15/hr (blended) | $2,100 | Partner onboarding kits for clinics, labs, pharmacies (80-120 hrs per params.md Section 17.1, midpoint 100) + staffing calibration and refresher training (40-60 hrs, midpoint 50). Combined to 140 hrs accounting for overlap. |
| 6 | Launch analytics and reporting | 120 | $15/hr (blended) | $1,800 | Launch analytics and reporting setup (60-80 hrs per params.md, midpoint 70) + release governance and rollback checklists (40-60 hrs, midpoint 50). Combined to 120 hrs. |
| 7 | Admin operational guidelines | 80 | $15/hr (blended) | $1,200 | Admin operational guidelines covering daily workflows (60-80 hrs per params.md Section 17.1). Modeled at 80 hrs (top of range) because these are live-ops documents that require iteration during pilots. |
| 8 | Compliance and regulatory documentation | 100 | $15/hr (blended) | $1,500 | Compliance and regulatory documentation (80-120 hrs per params.md Section 17.1, midpoint 100). Covers Ethiopia MOH requirements, Kenya PPB oversight, data protection documentation, and telehealth regulatory filings. |
| 9 | Technical support runbooks | 60 | $15/hr (blended) | $900 | Technical support runbooks (60-80 hrs per params.md Section 17.1). Modeled at 60 hrs (bottom of range) because much content derives from existing CLAUDE.md audit documentation and agent-state records. |
| 10 | Remaining parallel ops buffer | 70 | $15/hr (blended) | $1,050 | Residual operational effort to reach the 750-hour parallel ops total. Covers ad hoc founder time on investor materials, legal coordination, market research updates, and unforeseen operational setup tasks. |
| | **Total** | **2,195** | | **$37,750** | |

### 2.2 Workstream Grouping Summary

| Group | Workstreams | Hours | % of Total |
|-------|------------|-------|------------|
| Pure build (software) | #1 + #2 | 1,225 | 55.8% |
| Cross-cutting technical | #3 | 220 | 10.0% |
| Operational setup | #4 + #5 + #6 + #7 + #8 + #9 + #10 | 750 | 34.2% |
| **Total** | All | **2,195** | **100%** |

### 2.3 Cost Reconciliation

| Segment | Hours | Rate Basis | Cost |
|---------|-------|-----------|------|
| Web platform hardening | 745 | $20/hr (senior dev rate per params.md Section 3.1) | $14,900 |
| Android APK | 480 | $15/hr (blended rate per params.md Section 5) | $7,200 |
| QA/DevOps/security | 220 | $20/hr (senior dev rate — DevOps + Technical Head) | $4,400 |
| Parallel ops (all) | 750 | $15/hr (blended — mix of founder, founding team, advisors) | $11,250 |
| **Total** | **2,195** | | **$37,750** |

This matches the combined effort summary in params.md Section 17.3.

---

## 3. Technical vs Non-Technical Split

### 3.1 The Split

| Category | What It Includes | Hours | Cost |
|----------|-----------------|-------|------|
| Pure technical build and hardening | Web hardening (745) + Android APK (480) + QA/DevOps/security (220) | **1,445** | **$26,500** |
| Operations setup and launch governance | Training (180) + partner onboarding (140) + analytics/reporting (120) + admin ops guidelines (80) + compliance (100) + support runbooks (60) + ops buffer (70) | **750** | **$11,250** |
| **Total** | | **2,195** | **$37,750** |

### 3.2 Why the Split Matters

The 1,445 technical hours are what most software project estimates would include.
The 750 operational hours are what most software project estimates would miss.

Health Hub is not a consumer app that ships and self-serves. It is an
admin-assisted healthcare platform where:

- Doctors must be trained on the platform's consultation workflow before they see patients.
- Admin staff must follow documented callback SOPs or service quality collapses.
- Partner clinics, labs, and pharmacies need onboarding materials or they will not adopt the platform.
- Regulatory compliance documentation is a legal prerequisite in both Ethiopia and Kenya.
- Launch analytics must exist before Pilot 1 or the company flies blind through its first external test.

Excluding these workstreams produces a plan that is technically complete but
operationally unlaunchable.

### 3.3 Who Does What

| Category | Primary Contributors | Per Params.md |
|----------|---------------------|---------------|
| Web hardening | 2 web developers (DevOps + Full-stack) + 1 flex developer | Section 2.2 |
| Android APK | 3-4 Android/backend developers | Section 2.2 |
| QA/DevOps/security | Technical Head + DevOps engineer | Section 2.1, 2.2 |
| Training and SOPs | Founding Member 1 + Medical Advisor | Section 17.1 |
| Partner onboarding | Owner + Founding Member 1 | Section 17.1 |
| Analytics and governance | Technical Head | Section 17.1 |
| Compliance and regulatory | Owner + Advisors | Section 17.1 |

---

## 4. Team Capacity Model

### 4.1 Raw Capacity Math

Per params.md Section 2, the team consists of 12 part-time contributors, all
working approximately 4 hours/day, 22 working days/month = ~88 hours/month each.

| Group | People | Hours/Person/Month | Raw Group Capacity |
|-------|--------|-------------------|-------------------|
| Core team | 3 | 88 | 264 hrs/mo |
| Development team | 7 | 88 | 616 hrs/mo |
| Advisory board | 2 | 25 (avg) | 50 hrs/mo |
| **Total** | **12** | | **930 hrs/mo** |

### 4.2 Why Raw Hours Are Not Productive Hours

The 930 hrs/mo raw capacity is a theoretical ceiling. Real output is reduced by:

| Overhead Factor | Impact | Who It Affects |
|----------------|--------|---------------|
| Coordination and handoff | 10-15% loss | Everyone — part-time schedules mean frequent context switches and async handoffs |
| Testing and rework | 10-15% loss | Developers — bugs, failed builds, regression fixes |
| Product decisions and review | 5-10% loss | Core team + senior devs — design reviews, scope decisions, PR reviews |
| Partner and ops interruptions | 5-10% loss (grows after Pilot 1) | Core team — investor calls, partner meetings, live issue triage |
| Live issue handling | 0% (Pre-Pilot) to 15% (Pilot 2+) | Grows as real users create real support load |
| Role-switching cost | 5-10% loss | Founders who split time between build, ops, and business development |

**Combined overhead: 30-50% of raw hours**, depending on phase and investment level.

### 4.3 Productive Capacity by Investment Level

| Level | Label | Productive Hrs/Mo | Derivation |
|-------|-------|--------------------|-----------|
| L1 | Bootstrapped | ~320 hrs/mo | ~35% of 930 raw. Maximum constraint: more sequencing, founder time heavily split, lean utilization. Per params.md Section 2.4. |
| L2 | Ideal | ~480 hrs/mo | ~52% of 930 raw. Balanced baseline: enough concurrency for parallel build + operating prep. Per params.md Section 2.4. |
| L3 | Fully Funded | ~640 hrs/mo | ~69% of 930 raw. Full effective utilization: proper tooling, less context switching, dedicated roles. Per params.md Section 2.4. |

### 4.4 Months to Complete at Each Level

Using the total effort of 2,195 hours:

| Level | Productive Hrs/Mo | Months (2,195 / capacity) | Calendar Interpretation |
|-------|-------------------|---------------------------|------------------------|
| L1 | 320 | 6.9 months of pure work | ~8-10 calendar months (sequencing adds overhead) |
| L2 | 480 | 4.6 months of pure work | ~6-8 calendar months (balanced parallelism) |
| L3 | 640 | 3.4 months of pure work | ~5-6 calendar months (true parallelism, but floor exists) |

**Important caveat:** These are *effort-to-capacity* ratios, not phase-by-phase
timelines. The actual calendar schedule is longer because:

1. Not all work can be parallelized (dependencies exist between workstreams).
2. Pilot phases require elapsed calendar time for user feedback loops.
3. Operational workstreams (training, SOPs, compliance) cannot be front-loaded
   entirely — they require iteration during live pilots.
4. Staffing ramp-up for operational employees happens during pilots, not before.

The phase-by-phase timeline is modeled in the timeline document (05-timelines.md),
not here. This document establishes the effort inputs.

### 4.5 Capacity Split: Technical vs Operational

Not all productive hours go to code. The capacity model must serve both the
technical and operational workstreams simultaneously.

| Level | Total Productive | Technical Allocation | Ops Allocation | Reasoning |
|-------|-----------------|---------------------|----------------|-----------|
| L1 | 320 hrs/mo | ~220 hrs/mo | ~100 hrs/mo | At L1, ops is squeezed — founders handle both; sequencing required |
| L2 | 480 hrs/mo | ~320 hrs/mo | ~160 hrs/mo | Balanced: dev team runs build, core team runs ops with some overlap |
| L3 | 640 hrs/mo | ~420 hrs/mo | ~220 hrs/mo | Full utilization: dedicated ops effort, developers unblocked |

---

## 5. Effort by Phase

### 5.1 Phase Effort Distribution

The 2,195 total hours are not consumed evenly. Each phase has a different effort
profile based on what work is possible and necessary at that stage.

| Phase | Duration Range | Technical Hrs | Ops Hrs | Total Hrs | % of Total | Primary Character |
|-------|---------------|---------------|---------|-----------|-----------|-------------------|
| Pre-Pilot | 3-6 months | 650-750 | 150-200 | 800-950 | ~40% | Heaviest technical concentration |
| Pilot 1 | 2-3 months | 300-350 | 180-220 | 480-570 | ~24% | Mixed technical and operating load |
| Pilot 2 | 3-13 months | 250-300 | 200-250 | 450-550 | ~23% | Scale-up and operational maturity |
| Production Readiness | 4-12 months | 100-150 | 170-220 | 270-370 | ~13% | Hardening and governance |
| **Total** | | **~1,445** | **~750** | **~2,195** | **100%** | |

### 5.2 Pre-Pilot Effort Detail (~40% of total)

This is the most engineering-intensive phase. The team must convert the prototype
into something safe enough for external users.

| Workstream | Hours in Phase | Key Deliverables |
|-----------|---------------|-----------------|
| Web hardening | 350-400 | Architecture freeze, auth hardening, SSR safety, role-flow completion, API hardening, rate limiting |
| Android APK | 200-250 | Core patient journeys: registration, dashboard, consultation request, basic video/audio/chat |
| QA/DevOps | 100-120 | CI/CD pipeline, monitoring stack, staging environment, initial load testing |
| Training and SOPs | 80-100 | Draft doctor training protocols, initial admin callback SOPs, first-pass operational guidelines |
| Partner onboarding | 40-60 | Onboarding kit drafts for first pilot clinics, pharmacy partner agreements |
| Compliance | 30-40 | Ethiopia regulatory research, initial telehealth compliance documentation |

### 5.3 Pilot 1 Effort Detail (~24% of total)

The character of work shifts. Live users create support obligations. Bugs surface
that internal testing missed. The team must fix and build simultaneously.

| Workstream | Hours in Phase | Key Deliverables |
|-----------|---------------|-----------------|
| Web hardening | 150-180 | Live bug fixes, performance optimization under real load, feature completion for active role flows |
| Android APK | 150-180 | Full scope completion: notifications, payments, prescription viewing, lab results |
| QA/DevOps | 60-70 | Production monitoring, incident response procedures, security patching |
| Training and SOPs | 60-70 | Doctor refresher training based on real consult data, admin SOP refinement from live callbacks |
| Support runbooks | 30-40 | L1/L2 support documentation based on actual ticket patterns |
| Analytics | 30-40 | Initial reporting dashboards, user activity tracking, service quality metrics |

### 5.4 Pilot 2 Effort Detail (~23% of total)

Scale-up creates new problems. The platform serves 5,000-10,000 users. Staffing
ladder activates. Partner network expands.

| Workstream | Hours in Phase | Key Deliverables |
|-----------|---------------|-----------------|
| Web hardening | 150-180 | Scalability hardening, advanced reporting, partner admin tooling |
| Android APK | 80-100 | Polish, edge-case fixes, performance optimization for diverse Android devices |
| QA/DevOps | 40-50 | Load testing at scale, automated regression, security re-audit |
| Partner onboarding | 60-80 | Expanded partner onboarding (Kenya prep), lab and pharmacy network growth |
| Staffing calibration | 40-60 | Refresher training as operational staff onboard, shift pattern optimization |
| Analytics and reporting | 50-60 | Investor-quality reporting, unit economics tracking, LTV:CAC measurement |
| Compliance | 40-50 | Kenya regulatory documentation, cross-border data handling policies |

### 5.5 Production Readiness Effort Detail (~13% of total)

The least feature-heavy phase. The focus is on making what exists safe, governed,
and sustainable.

| Workstream | Hours in Phase | Key Deliverables |
|-----------|---------------|-----------------|
| Web hardening | 50-80 | Final security hardening, penetration test remediation, release freeze |
| QA/DevOps | 30-40 | Production release checklists, rollback procedures, disaster recovery testing |
| Compliance | 30-40 | Final regulatory submissions, data protection audit, compliance sign-off |
| Launch governance | 40-50 | Launch checklists, support schedules, escalation trees, on-call rotation |
| Support maturity | 30-40 | Full support runbook completion, L1/L2/L3 escalation documentation |
| Ops buffer | 30-40 | Final operational setup, staff training completion, go-live preparation |

---

## 6. Why Timelines Did Not Collapse

### 6.1 The Core Question

If v2 reduced web effort from the v1 expected case of ~1,050 hours to 745 hours
(a ~30% reduction), why didn't the overall timeline shrink by 30%?

### 6.2 The Answer in Three Parts

**Part 1: The web estimate went down, but total work did not shrink proportionally.**

| Component | v1 Model | v2 Model | Change |
|-----------|---------|---------|--------|
| Web effort | ~1,050 hrs (expected) | 745 hrs | -305 hrs (-29%) |
| Android effort | 440-640 hrs (range) | 480 hrs (fixed) | Clarified, not reduced |
| QA/DevOps/security | Implicit / partially hidden | 220 hrs (explicit) | Now visible |
| Parallel ops | Not modeled | 750 hrs (explicit) | Now visible |
| **Total** | **~1,885 (reconstructed)** | **2,195** | **+310 hrs (+16%)** |

The v2 total is actually *higher* than v1 because v1 did not model operational
workstreams. The web estimate came down, but the honest total went up.

**Part 2: The company still needs to build non-software systems.**

Even if coding finished tomorrow, Health Hub could not launch because:

- No doctor has been trained on the platform's consultation workflow.
- No admin has a documented callback SOP to follow.
- No partner clinic has an onboarding kit.
- No compliance documentation exists for Ethiopia or Kenya regulators.
- No launch analytics are in place to measure whether the pilot is working.
- No support runbook exists for the technical support staff the company must hire.

Each of these workstreams requires elapsed calendar time, iteration during pilots,
and real feedback loops. They cannot be parallelized away.

**Part 3: Timeline compression has a floor.**

Even at L3 (full utilization, 640 hrs/mo), the minimum calendar time is bounded by:

| Constraint | Minimum Elapsed Time | Why |
|-----------|---------------------|-----|
| Pilot 1 feedback loop | 2-3 months | Real users need time to use the platform and generate actionable data |
| Staff hiring and training | 1-2 months | Operational employees must be recruited, hired, and trained before they are effective |
| Regulatory submissions | 1-3 months | Government agencies have their own processing timelines |
| Partner activation | 1-2 months | Clinics, pharmacies, and labs have their own decision and integration cycles |
| Android APK completion | 2-4 months | 480 hours at 3-4 developers is not instant, especially with backend dependencies |

These constraints create a timeline floor that pure coding speed cannot break through.

### 6.3 What Did Compress

The timeline did get shorter in v2 — just not by 30%. The compression shows up as:

- Shorter Pre-Pilot phase (less web work to complete before first external users).
- Earlier Pilot 1 entry (product reaches minimum viable state sooner).
- More founder time freed for operational workstreams during build phase.
- Higher confidence in the web estimate (narrower range = less contingency padding).

---

## 7. Interpretation by Investment Level

### 7.1 Level 1 — Bootstrapped (~320 hrs/mo)

| Dimension | L1 Experience |
|-----------|-------------|
| Sequencing | Heavy. Android and web largely sequential. Ops work fits into gaps. |
| Founder load | Maximum. Founders split between build oversight, ops, partner work, and investor relations. |
| Phase duration | Longest. Pre-Pilot stretches to 5-6 months. Pilot 1 to 3 months. Total 22-34 months. |
| Risk | Highest. Slow pace means competitors or market shifts can erode first-mover advantage. |
| Effort math | 2,195 hrs / 320 hrs/mo = 6.9 months pure work. Calendar: ~10+ months with sequencing. |

**L1 effort allocation by month (illustrative):**

| Month | Technical | Ops | Total | Notes |
|-------|-----------|-----|-------|-------|
| 1-2 | 200 | 60 | 260 | Web hardening sprint, Android kickoff, initial SOP drafting |
| 3-4 | 220 | 80 | 300 | Android ramp-up, auth/security hardening, training protocol first draft |
| 5-6 | 200 | 100 | 300 | Feature completion push, partner onboarding starts, compliance research |
| 7-8 | 180 | 120 | 300 | Pilot 1 entry, live bug fixes, callback SOPs refined |
| 9-10 | 160 | 140 | 300 | Pilot 2 prep, analytics build, staffing calibration |

### 7.2 Level 2 — Ideal (~480 hrs/mo)

| Dimension | L2 Experience |
|-----------|-------------|
| Sequencing | Moderate. Android and web run in parallel. Ops work has dedicated time. |
| Founder load | Balanced. Founders can focus on ops and business while dev team handles build. |
| Phase duration | Moderate. Pre-Pilot at 3-4 months. Pilot 1 at 2-3 months. Total 16-24 months. |
| Risk | Moderate. Pace is fast enough to maintain momentum without burning the team. |
| Effort math | 2,195 hrs / 480 hrs/mo = 4.6 months pure work. Calendar: ~7-8 months with dependencies. |

**L2 is the baseline planning case.** The effort-to-outcome ratio is most
favorable here because the team can sustain concurrency without the coordination
cost exploding.

### 7.3 Level 3 — Fully Funded (~640 hrs/mo)

| Dimension | L3 Experience |
|-----------|-------------|
| Sequencing | Minimal. True parallelism across Android, web, and ops. |
| Founder load | Lightest. Founders can focus on strategy, investors, and market while team executes. |
| Phase duration | Shortest. Pre-Pilot at 3 months. Pilot 1 at 2 months. Total 12-20 months. |
| Risk | Lowest technical risk, but highest coordination cost. More people = more meetings. |
| Effort math | 2,195 hrs / 640 hrs/mo = 3.4 months pure work. Calendar: ~5-6 months with floor constraints. |

**L3 caveat:** Even at maximum capacity, the timeline cannot compress below the
floor constraints identified in Section 6.2. The extra capacity shows up as
*better quality* and *earlier operational readiness* rather than a proportionally
shorter calendar.

### 7.4 Comparative Summary

| Metric | L1 | L2 | L3 |
|--------|----|----|-----|
| Productive hrs/mo | 320 | 480 | 640 |
| Pure effort months | 6.9 | 4.6 | 3.4 |
| Realistic calendar months (to Pilot 1) | 7-9 | 5-6 | 4-5 |
| Realistic calendar months (to Production) | 22-34 | 16-24 | 12-20 |
| Monthly team cost (per params.md) | ~$14,830 | ~$14,830 | ~$14,830 |
| Cumulative team cost to Production | $326K-504K | $238K-356K | $178K-297K |
| Best-fit scenario codes | S1-L1, S2-O1-Ix | S2-O2-Ix, S3-O2-Ix | S1-L3, S2-O3-Ix, S3-Ox-I3 |

**Note on cost:** Monthly team cost is the same at all levels because the team is
fixed at 12 part-time people. The difference is *utilization rate*, not headcount.
L3 does not add people — it extracts more productive hours per person through
better tooling, fewer context switches, and dedicated role focus. The total cost
difference comes from timeline duration: shorter timelines mean fewer months of
burn.

---

## 8. Closing Note

The v2 effort model corrects two problems from v1:

1. **Web estimate accuracy.** The web effort is now anchored to a real team
   estimate (150-160% of Android) rather than a wide three-point spread. This
   produces a tighter, more plannable number.

2. **Operational effort visibility.** The 750 hours of parallel operational work
   are now explicitly modeled, line-itemized, and phase-allocated. This prevents
   the plan from appearing artificially optimistic about timelines while also
   making the non-engineering investment legible to investors.

The combined 2,195-hour model is the foundation for the timeline, cost, and
scenario documents that follow.

---

*All figures trace to params.md v2. For rate card details, see params.md Section 3.
For phase definitions, see params.md Section 13. For scenario codes, see params.md
Section 14.*
