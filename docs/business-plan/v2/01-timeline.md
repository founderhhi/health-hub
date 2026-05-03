# 01 — Timeline

**Health Hub Business Plan v2 | Comprehensive Timeline and Phase Execution Plan**
**Version:** 2.0 | **Date:** March 2026

> This document maps the full journey from prototype to production across all 21
> scenario-investment combinations. It incorporates the v2 parameter set: a 12-person
> part-time team (3 core + 7 developers + 2 advisors), 745 hours of remaining web
> work, a fixed 480-hour Android APK contract, 750 hours of parallel operational
> workstreams, and an employed operations staff ladder that begins at Pilot 1.
> All assumptions trace to `params.md`.

---

## Table of Contents

1. [Timeline Philosophy](#1-timeline-philosophy)
2. [Shared Parallel Workstreams](#2-shared-parallel-workstreams)
3. [Phase-by-Phase Objectives and Internal Gates](#3-phase-by-phase-objectives-and-internal-gates)
4. [Timeline Matrix Across All 21 Paths](#4-timeline-matrix-across-all-21-paths)
5. [How to Interpret the Timing Differences](#5-how-to-interpret-the-timing-differences)
6. [Recommended Timeline View](#6-recommended-timeline-view)

---

## 1. Timeline Philosophy

Three principles govern this timeline. They have not changed from the earlier
planning cycle; v2 sharpens the numbers behind them without altering the logic.

### Principle 1 — The Phase Order Stays Intact

Pre-Pilot, Pilot 1, Pilot 2, Production Readiness. This sequence is non-negotiable.
Each phase exists because it validates a distinct class of risk:

| Phase | Risk Class Resolved |
|-------|-------------------|
| Pre-Pilot | Technical stability, internal rehearsal, scope lock |
| Pilot 1 | Live-user viability, callback discipline, first partner activation |
| Pilot 2 | Scale readiness, staffing ladder, revenue learning, market expansion prep |
| Production Readiness | Compliance, full-stack hardening, launch governance, support schedule |

No amount of funding or team capacity can safely skip a phase. The phases can
compress in duration, but they cannot be reordered or eliminated.

### Principle 2 — Lower Coding Effort Does Not Erase Operating Work

The v2 parameter set reduced the web platform estimate from v1's 682-1,413 hour
three-point range to a tighter 720-768 hour band (modeled at 745 hours). That is
a real correction based on a real team estimate. But the company must still build:

- A patient-facing Android APK (480 hours, contracted)
- A callback-enabled operating layer with trained doctors and admin staff
- Doctor training protocols, admin SOPs, escalation trees, and partner kits
- Release governance, compliance documentation, and production support systems

These parallel workstreams total 750 hours of effort (per params.md Section 17).
They consume founder and founding-team time directly, which means the engineering
calendar is not the only constraint on the timeline. Even if the web platform were
finished tomorrow, the company would not be ready to launch.

### Principle 3 — The APK Is a Parallel Critical Path

The Android APK is not a "later nice-to-have." In the East African market context
(35-45% urban smartphone penetration in Ethiopia, mobile-first user behavior), the
APK is the primary patient access channel. The 480-hour APK workstream runs on a
dedicated 3-4 person sub-team and must hit two milestones:

| APK Milestone | Target Phase | Scope |
|--------------|-------------|-------|
| Core patient journeys functional | Pilot 1 | Registration, dashboard, consultation request, basic video/chat, notifications |
| Full patient scope complete | Pilot 2 | Prescription viewing, lab results, payments, full video/audio/chat, offline resilience |

The APK schedule constrains the Pilot 1 gate independently of web progress. If the
APK slips, Pilot 1 cannot proceed even if the web platform is ready, because the
primary patient interface would be missing.

---

## 2. Shared Parallel Workstreams

These workstreams run alongside software development throughout the entire build
cycle. They are not optional add-ons; they are the difference between shipping a
product and launching a healthcare operation.

### 2.1 Workstream Overview

| # | Parallel Track | Starts | Ends | Est. Hours | Primary Owner | Why It Matters |
|---|---------------|--------|------|-----------|---------------|----------------|
| W1 | Doctor training protocols and playbooks | Pre-Pilot | Production Readiness | 120-160 | Founding Member 1 + Medical Advisor | Care quality cannot depend on informal verbal handoff; employed doctors (starting Pilot 1) need structured onboarding and clinical guidelines for tele-consultation |
| W2 | Admin callback SOPs and escalation trees | Pre-Pilot | Production Readiness | 80-120 | Founding Member 1 | Travel, diagnostics, pharmacy, and exception cases remain partly manual; admin staff (starting Pilot 1) need documented decision paths for every callback type |
| W3 | Admin operational guidelines (daily workflows) | Pre-Pilot | Pilot 2 | 60-80 | Founding Member 1 | Day-to-day workflows (shift handoff, queue management, partner escalation) must be written before admin headcount scales beyond 2 |
| W4 | Technical support runbooks | Pilot 1 | Production Readiness | 60-80 | Technical Head | Live users create real issue-response obligations; the dev team cannot absorb L1/L2 support and still build |
| W5 | Partner onboarding kits (clinics, labs, pharmacies) | Pre-Pilot | Pilot 2 | 80-120 | Owner + Founding Member 1 | Clinics, labs, and pharmacies need operational materials, agreements, and integration guides — not just login credentials |
| W6 | Release governance and rollback checklists | Pre-Pilot | Production Readiness | 40-60 | Technical Head | Essential for a part-time team where no single person monitors releases 24/7; rollback must be mechanical, not heroic |
| W7 | Staffing calibration and refresher training | Pilot 1 | Production Readiness | 40-60 | Founding Member 1 | Coverage quality must grow with user volume; calibration cycles review shift adequacy, callback response times, and doctor utilization |
| W8 | Launch analytics and reporting setup | Pilot 2 | Production Readiness | 60-80 | Technical Head | Investor-grade reporting, operational dashboards, and KPI tracking require dedicated setup beyond code instrumentation |
| W9 | Compliance and regulatory documentation | Pre-Pilot | Production Readiness | 80-120 | Owner + Advisors | Ethiopia and Kenya have distinct regulatory environments; documentation must be prepared before each market entry |

**Total parallel operational effort:** 620-880 hours (modeled at **750 hours** expected case per params.md)

### 2.2 Workstream Phasing Chart

This chart shows which workstreams are active in each phase. Shaded cells indicate
active effort.

| Workstream | Pre-Pilot | Pilot 1 | Pilot 2 | Prod Readiness |
|-----------|-----------|---------|---------|----------------|
| W1: Doctor training | DRAFT | DELIVER + ITERATE | REFRESH | FINALIZE |
| W2: Admin callback SOPs | DRAFT | DELIVER + ITERATE | REFRESH | FINALIZE |
| W3: Admin daily workflows | DRAFT | DELIVER | FINALIZE | — |
| W4: Tech support runbooks | — | DRAFT + DELIVER | ITERATE | FINALIZE |
| W5: Partner onboarding kits | DRAFT | DELIVER BATCH 1 | DELIVER BATCH 2 | — |
| W6: Release governance | DRAFT v1 | ITERATE | ITERATE | FINALIZE |
| W7: Staffing calibration | — | INITIAL BASELINE | CALIBRATE | FINALIZE |
| W8: Analytics and reporting | — | — | BUILD + ITERATE | FINALIZE |
| W9: Compliance and regulatory | RESEARCH | ETHIOPIA PREP | KENYA PREP | CLOSEOUT |

### 2.3 Founder Time Allocation Impact

These workstreams compete for the same founder and founding-team hours that also
go toward investor relations, product decisions, partner meetings, and strategic
oversight. At Level 1, where effective capacity is ~320 hours/month, the
operational workstreams consume a disproportionate share of available time,
which is the primary driver of timeline stretch at lower investment levels.

| Investment Level | Technical Hours/Mo | Ops Workstream Hours/Mo (est.) | Remaining for Strategy/BD |
|-----------------|-------------------|-------------------------------|--------------------------|
| L1 (Bootstrapped) | ~320 | ~40-60 | ~30-50 |
| L2 (Ideal) | ~480 | ~50-70 | ~50-80 |
| L3 (Fully Funded) | ~640 | ~60-80 | ~80-120 |

---

## 3. Phase-by-Phase Objectives and Internal Gates

### 3.1 Pre-Pilot

| Dimension | Detail |
|-----------|--------|
| **Timing band** | M0 to M3 (L3) through M0 to M6 (L1), depending on team capacity |
| **User scale** | 100-200 internal users (team members, advisors, selected friends/family) |
| **Technical focus** | Architecture freeze. Bug triage from audit (19 issues, all resolved). Role-flow completion for GP, specialist, pharmacy, diagnostics, admin. APK backlog lock and sprint 0. Core security hardening (auth, SSR safety, rate limiting). Web platform: ~200-280 hours of the 745-hour budget consumed here. APK: ~100-160 hours of the 480-hour budget consumed here (project setup, core scaffolding, auth flow, basic navigation). |
| **Operating focus** | Draft doctor training playbooks (W1). Draft admin callback SOPs and escalation trees (W2). Draft admin daily workflow guidelines (W3). Draft partner onboarding kit templates (W5). Release governance v1 (W6). Begin compliance research for Ethiopia (W9). Internal rehearsal loops: 2 cycles minimum, simulating real patient flows with team members acting as patients, doctors, and admin. |
| **Commercial focus** | Warm-network partner grooming (1-3 clinics in Addis Ababa identified and relationship-building started). Demo readiness for investor conversations. Early pricing rehearsal using Ethiopia benchmarks (ETB 150-300 GP consult, ETB 300-600 specialist). No revenue expected ($0/mo per params.md). |
| **Infrastructure** | Tech infra: $65-130/mo (hosting, DB, minimal video). Ops infra: $0-20/mo. One-time: $200-300 for initial admin phones (2 devices). No employed ops staff yet. |

**Internal Minor Checkpoints:**

| Checkpoint | Timing (relative to phase) | Criteria |
|-----------|---------------------------|----------|
| CP-1: Architecture freeze | Week 2-3 | All major technical decisions documented; no further framework/library changes |
| CP-2: Rehearsal cycle 1 | 40% through phase | One complete patient journey (registration through consultation) tested end-to-end by team |
| CP-3: Issue burn-down check | 60% through phase | All P0 and P1 audit issues verified closed; no regression |
| CP-4: Rehearsal cycle 2 | 80% through phase | All six role flows (patient, GP, specialist, pharmacy, diagnostics, admin) tested with realistic scenarios |
| CP-5: Runbook v1 signoff | 90% through phase | Doctor playbook draft, admin SOP draft, and release governance v1 reviewed by founding team |

**Gate Criteria to Advance to Pilot 1:**

- [ ] Core web role flows stable (GP queue, specialist referral, pharmacy lookup, diagnostics tab navigation, admin user management)
- [ ] APK scope locked and sprint plan confirmed with Android team
- [ ] APK core scaffolding complete (auth, navigation, basic dashboard)
- [ ] 2 internal rehearsal cycles passed with documented findings and fixes
- [ ] Doctor training playbook v1 drafted and reviewed
- [ ] Admin callback SOP v1 drafted and reviewed
- [ ] Partner onboarding kit template ready
- [ ] At least 1 partner clinic relationship warm and ready for Pilot 1 activation
- [ ] Release governance checklist v1 in place
- [ ] Ethiopia regulatory research summary completed
- [ ] No unresolved P0 or P1 technical issues

---

### 3.2 Pilot 1

| Dimension | Detail |
|-----------|--------|
| **Timing band** | 2-3 months duration |
| **User scale** | Up to 1,000 users (first external users in Ethiopia) |
| **Technical focus** | Stable provider web platform. Core patient APK journey functional (registration, dashboard, consultation request, basic video/chat, notifications). Incident handling and monitoring. Callback visibility in admin dashboard. Web platform: ~150-200 hours consumed. APK: ~200-240 hours consumed (core patient journeys, video integration, notification system). |
| **Operating focus** | **Employed staff activate:** 2 doctors + 2 admin ops + 2 tech support (monthly cost: ~$2,482 per params.md). Live callback operations begin. Doctor training delivered and first iteration based on real cases (W1). Admin SOPs delivered and iterated with real callback data (W2). Admin daily workflows delivered (W3). Tech support runbooks drafted and delivered (W4). Partner onboarding batch 1 executed (W5). Staffing baseline established (W7). |
| **Commercial focus** | First real partner usage (1-3 clinics active). First paid consultation experiments at subsidized pricing ($0-500/mo revenue expected per params.md). Live service feedback collection. Partner satisfaction baseline. |
| **Infrastructure** | Tech infra: $160-300/mo. Ops infra: $110-220/mo (phone top-ups, VoIP, support ticketing). One-time: $400-600 for laptops/workstations, $200-300 misc office setup. |

**Internal Minor Checkpoints:**

| Checkpoint | Timing (relative to phase) | Criteria |
|-----------|---------------------------|----------|
| CP-6: Partner onboarding batch 1 | Week 1-2 | At least 1 clinic fully onboarded, staff trained, able to receive referrals |
| CP-7: First live consultations | Week 2-3 | At least 5 real patient consultations completed end-to-end |
| CP-8: Callback backlog review | Mid-phase | Callback queue metrics reviewed; average response time under 4 hours |
| CP-9: Doctor training refresh | 60% through phase | Training updated based on first 2-4 weeks of real case patterns |
| CP-10: First paid consults | 70% through phase | At least 1 paid consultation (even at subsidized rate) successfully processed |
| CP-11: APK core milestone check | End of phase | APK core patient journeys functional and tested with real users |

**Gate Criteria to Advance to Pilot 2:**

- [ ] Live Ethiopia pilot ran for minimum 1 month (2 months preferred) with real patients
- [ ] Measurable throughput: at least 50 consultations completed
- [ ] Callback discipline demonstrated: documented SOP followed, response times tracked
- [ ] Escalation handling tested: at least 3 escalation scenarios handled per documented procedure
- [ ] Doctor utilization tracked and reported (target: >30% during operating hours)
- [ ] APK core patient journeys confirmed functional with real users
- [ ] Tech support handled live issues without requiring dev team intervention for L1/L2
- [ ] Partner feedback collected and documented from all active clinics
- [ ] No unresolved critical (P0) technical issues
- [ ] Revenue experiment data collected (even if revenue is minimal)

---

### 3.3 Pilot 2

| Dimension | Detail |
|-----------|--------|
| **Timing band** | 3-13 months depending on scenario and investment level |
| **User scale** | 5,000-10,000 users |
| **Technical focus** | Full APK scope complete (prescription viewing, lab results, payments, full video/audio/chat, offline resilience). Web analytics and partner reporting dashboards. Partial automation of manual processes. Release process tightening. Performance optimization. Web platform: ~200-265 hours consumed (remainder of 745 budget, including hardening and analytics). APK: ~120-180 hours consumed (remaining scope, polish, payment integration). QA/DevOps/security: ~120-180 hours of the 220-hour budget consumed. |
| **Operating focus** | **Staffing ladder deepens:** 4 doctors + 4 admin ops + 2 tech support (monthly cost: ~$4,361 per params.md). Admin daily workflow guidelines finalized (W3). Tech support runbooks iterated (W4). Partner onboarding batch 2 (W5). Staffing calibration cycle 1 (W7). Launch analytics setup begins (W8). Kenya regulatory prep (W9). Reporting loops established: weekly ops review, monthly staffing review. |
| **Commercial focus** | Larger user acquisition push via targeted marketing in Addis Ababa. Stronger partner proof points (5+ clinics active). Revenue at 50% of target pricing ($500-3,000/mo per params.md). Kenya market prep package assembled. Investor reporting pack v1 if external capital is active. |
| **Infrastructure** | Tech infra: $300-600/mo. Ops infra: $160-320/mo (call center software, expanded devices). One-time: $300-600 for additional admin phones/tablets. |

**Internal Minor Checkpoints:**

| Checkpoint | Timing (relative to phase) | Criteria |
|-----------|---------------------------|----------|
| CP-12: Reporting pack v1 | 20% through phase | Operational and financial reporting template delivered to founding team and investors (if applicable) |
| CP-13: Staffing ladder activation | 30% through phase | Doctor and admin headcount increased per ladder; shift coverage confirmed |
| CP-14: APK full scope milestone | 40% through phase | All patient-facing APK features functional and in testing |
| CP-15: Payment/process review | 50% through phase | Payment flow end-to-end tested; process automation candidates identified |
| CP-16: Kenya prep package | 70% through phase | Regulatory summary, partner targets, market entry plan documented |
| CP-17: Staffing calibration cycle 1 | 80% through phase | Shift adequacy, callback response times, doctor utilization reviewed and adjustments made |
| CP-18: Scale readiness assessment | 90% through phase | Platform load tested for 10,000 concurrent users; ops team confirmed ready |

**Gate Criteria to Advance to Production Readiness:**

- [ ] 5,000-10,000 user-capable operation exists with documented support processes
- [ ] Reporting established: weekly ops metrics, monthly financial summary
- [ ] Service consistency measurable: callback response SLA met >80% of the time
- [ ] Doctor utilization >50% during operating hours
- [ ] Full APK scope complete and stable
- [ ] Web platform hardening complete (all 745 hours consumed or remaining items de-risked)
- [ ] Kenya market entry plan documented with regulatory pathway identified
- [ ] Monthly active patients >1,000 (secondary success metric per params.md)
- [ ] Revenue learning sufficient to validate pricing corridor
- [ ] No unresolved P0 or P1 technical issues
- [ ] Staffing calibration completed with documented findings

---

### 3.4 Production Readiness

| Dimension | Detail |
|-----------|--------|
| **Timing band** | 4-12 months depending on path |
| **User scale** | Transitioning to full scale |
| **Technical focus** | Final hardening pass. Monitoring and alerting maturity. Release freeze window. Production support schedule formalized. Security audit closeout. Performance benchmarks documented. Remaining QA/DevOps budget consumed (~40-100 hours). |
| **Operating focus** | **Full staffing ladder:** 6 doctors + 6 admin ops + 3 tech support (monthly cost: ~$6,542 per params.md). Doctor training finalized (W1). Admin SOPs finalized (W2). Tech support runbooks finalized (W4). Release governance finalized (W6). Staffing calibration finalized (W7). Analytics and reporting finalized (W8). Compliance closeout for Ethiopia; Kenya compliance in progress (W9). Launch playbooks written and rehearsed. Support schedule with shift coverage confirmed. Fallback operations documented (what happens if a system goes down). |
| **Commercial focus** | Production pricing posture established (full pricing corridors per params.md). Partner maturity: contracts formalized, SLAs in place. Launch communication readiness (marketing materials, partner announcements). Revenue target: $3,000-15,000/mo per params.md. LTV:CAC tracking initiated (target: >3x per params.md). |
| **Infrastructure** | Tech infra: $600-1,100/mo. Ops infra: $200-400/mo. Moving toward production steady-state: $800-1,500/mo combined. |

**Internal Minor Checkpoints:**

| Checkpoint | Timing (relative to phase) | Criteria |
|-----------|---------------------------|----------|
| CP-19: Launch playbook signoff | 25% through phase | Complete launch playbook reviewed and approved by all founding team members |
| CP-20: Support coverage signoff | 40% through phase | 2-shift or 3-shift coverage confirmed; all staff trained and scheduled |
| CP-21: Security audit closeout | 50% through phase | All identified security issues resolved; penetration test findings addressed |
| CP-22: Compliance closeout (Ethiopia) | 60% through phase | All Ethiopia regulatory requirements documented and satisfied |
| CP-23: Production release dress rehearsal | 75% through phase | Full production deployment simulated end-to-end including rollback |
| CP-24: Production release signoff | 95% through phase | Founding team signs off on production readiness across all dimensions |

**Gate Criteria for Production Launch:**

- [ ] Current prototype scope is production-safe across web and patient mobile
- [ ] Trained staff in place with documented schedules and escalation paths
- [ ] Fallback operations documented and rehearsed
- [ ] Compliance requirements met for launch geography (Ethiopia)
- [ ] Kenya launch plan ready (even if Kenya launch is post-production)
- [ ] Release governance fully operational with rollback tested
- [ ] Monitoring and alerting covering all critical paths
- [ ] Support schedule covering operating hours with documented handoff procedures
- [ ] Revenue at production pricing for at least 1 month
- [ ] Monthly burn rate sustainable for 6+ months (per params.md success metric)
- [ ] LTV:CAC tracking in place with initial data

---

## 4. Timeline Matrix Across All 21 Paths

### 4.1 Calculation Methodology

The timeline for each path is derived from the total effort required, team
capacity at each investment level, and the sequential dependencies between phases.

**Total effort to be scheduled:**

| Category | Hours | Notes |
|----------|-------|-------|
| Web platform hardening | 745 | Runs Pre-Pilot through Pilot 2; senior-rate work |
| Android APK | 480 | Parallel workstream on dedicated sub-team; Pre-Pilot through Pilot 2 |
| QA, DevOps, security | 220 | Spread across all phases with concentration in Pilot 2 and Prod Readiness |
| Parallel ops workstreams | 750 | Consumed by founders/founding team; runs Pre-Pilot through Prod Readiness |
| **Total** | **2,195** | Per params.md Section 17.3 |

**Monthly capacity by investment level (per params.md Section 2.4):**

| Level | Technical Hours/Mo | Effective Split: Web | Effective Split: APK | Effective Split: QA/DevOps |
|-------|-------------------|---------------------|---------------------|---------------------------|
| L1 | 320 | ~120-140 | ~100-120 | ~30-40 |
| L2 | 480 | ~175-200 | ~150-170 | ~50-60 |
| L3 | 640 | ~230-260 | ~200-220 | ~70-80 |

**Operational workstream throughput** is bounded by founder/founding-team
availability, not developer capacity. At all levels, ops workstream throughput
is approximately 40-80 hours/month (constrained by the 3 core team members
splitting time across ops, strategy, investor relations, and product oversight).

**Key constraint:** Phase advancement requires both technical gates AND operational
gates to be met. The binding constraint is whichever takes longer.

### 4.2 Phase Duration Logic

**Pre-Pilot duration** is driven by: (a) web hardening to reach core stability
(~200-280 hours), (b) APK sprint 0 and core scaffolding (~100-160 hours),
(c) operational workstream drafting (~80-120 hours), and (d) 2 rehearsal cycles
requiring calendar time regardless of team size. Minimum calendar time: 3 months
(L3), maximum: 6 months (L1).

**Pilot 1 duration** is relatively fixed at 2-3 months because it is bounded
by the need to run a live pilot for at least 1 month with real patients.
Calendar time dominates over effort here.

**Pilot 2 duration** is the most variable phase. It absorbs the remaining
technical work, the staffing ladder scale-up, the analytics build-out, and
the Kenya prep. At L1 without investor capital, this phase stretches to 13
months. At L3 with full funding, it compresses to 5 months.

**Production Readiness duration** scales with the depth of hardening required
and the maturity of operational systems entering the phase. Paths that
formalized operations earlier (L3) need less production readiness time.

### 4.3 Full 21-Path Timeline Matrix

| # | Scenario | Family | Pre-Pilot | Pilot 1 | Pilot 2 | Prod Readiness | Total Months |
|---|----------|--------|-----------|---------|---------|----------------|-------------|
| 1 | S1-L1 | Self-funded, bootstrapped | M0-M6 | M6-M9 | M9-M22 | M22-M34 | **34** |
| 2 | S1-L2 | Self-funded, ideal | M0-M5 | M5-M7 | M7-M16 | M16-M26 | **26** |
| 3 | S1-L3 | Self-funded, fully funded | M0-M4 | M4-M6 | M6-M12 | M12-M20 | **20** |
| 4 | S2-O1-I1 | Inv. during transition, bootstrap/bootstrap | M0-M6 | M6-M9 | M9-M18 | M18-M30 | **30** |
| 5 | S2-O1-I2 | Inv. during transition, bootstrap/ideal | M0-M6 | M6-M9 | M9-M17 | M17-M27 | **27** |
| 6 | S2-O1-I3 | Inv. during transition, bootstrap/full | M0-M6 | M6-M9 | M9-M15 | M15-M24 | **24** |
| 7 | S2-O2-I1 | Inv. during transition, ideal/bootstrap | M0-M5 | M5-M7 | M7-M16 | M16-M27 | **27** |
| 8 | S2-O2-I2 | Inv. during transition, ideal/ideal | M0-M5 | M5-M7 | M7-M14 | M14-M24 | **24** |
| 9 | S2-O2-I3 | Inv. during transition, ideal/full | M0-M5 | M5-M7 | M7-M13 | M13-M21 | **21** |
| 10 | S2-O3-I1 | Inv. during transition, full/bootstrap | M0-M4 | M4-M6 | M6-M14 | M14-M25 | **25** |
| 11 | S2-O3-I2 | Inv. during transition, full/ideal | M0-M4 | M4-M6 | M6-M12 | M12-M22 | **22** |
| 12 | S2-O3-I3 | Inv. during transition, full/full | M0-M4 | M4-M6 | M6-M11 | M11-M19 | **19** |
| 13 | S3-O1-I1 | Inv. after Pilot 1, bootstrap/bootstrap | M0-M5 | M5-M8 | M8-M16 | M16-M26 | **26** |
| 14 | S3-O1-I2 | Inv. after Pilot 1, bootstrap/ideal | M0-M5 | M5-M8 | M8-M14 | M14-M22 | **22** |
| 15 | S3-O1-I3 | Inv. after Pilot 1, bootstrap/full | M0-M5 | M5-M8 | M8-M13 | M13-M20 | **20** |
| 16 | S3-O2-I1 | Inv. after Pilot 1, ideal/bootstrap | M0-M4 | M4-M6 | M6-M14 | M14-M24 | **24** |
| 17 | S3-O2-I2 | Inv. after Pilot 1, ideal/ideal | M0-M4 | M4-M6 | M6-M12 | M12-M20 | **20** |
| 18 | S3-O2-I3 | Inv. after Pilot 1, ideal/full | M0-M4 | M4-M6 | M6-M11 | M11-M18 | **18** |
| 19 | S3-O3-I1 | Inv. after Pilot 1, full/bootstrap | M0-M3 | M3-M5 | M5-M12 | M12-M22 | **22** |
| 20 | S3-O3-I2 | Inv. after Pilot 1, full/ideal | M0-M3 | M3-M5 | M5-M10 | M10-M18 | **18** |
| 21 | S3-O3-I3 | Inv. after Pilot 1, full/full | M0-M3 | M3-M5 | M5-M9 | M9-M16 | **16** |

### 4.4 Summary Statistics

| Metric | Value |
|--------|-------|
| Shortest path | S3-O3-I3: **16 months** |
| Longest path | S1-L1: **34 months** |
| Median path | **22 months** |
| Mean path | **23.0 months** |
| Primary recommended (S3-O2-I2) | **20 months** |

### 4.5 Phase Duration Ranges Across All Paths

| Phase | Shortest | Longest | Median | Notes |
|-------|----------|---------|--------|-------|
| Pre-Pilot | 3 months | 6 months | 4-5 months | Bounded by rehearsal cycles and APK sprint 0 |
| Pilot 1 | 2 months | 3 months | 2 months | Bounded by minimum live-pilot duration |
| Pilot 2 | 4 months | 13 months | 7 months | Most variable; absorbs funding timing impact |
| Production Readiness | 7 months | 12 months | 8-10 months | Scales with ops maturity entering the phase |

### 4.6 Effort Consumption by Phase (Expected Case, L2 Baseline)

| Phase | Web Hours | APK Hours | QA/DevOps Hours | Ops Hours | Total Hours | Duration |
|-------|-----------|-----------|----------------|-----------|-------------|----------|
| Pre-Pilot | 240 | 130 | 30 | 100 | 500 | 4-5 months |
| Pilot 1 | 175 | 220 | 40 | 120 | 555 | 2 months |
| Pilot 2 | 250 | 130 | 100 | 300 | 780 | 6-8 months |
| Prod Readiness | 80 | 0 | 50 | 230 | 360 | 8 months |
| **Total** | **745** | **480** | **220** | **750** | **2,195** | **20-23 months** |

---

## 5. How to Interpret the Timing Differences

### 5.1 Why Level 1 Paths Stretch

Level 1 paths (bootstrapped, ~320 hrs/mo technical capacity) do not stretch only
because "code is slower." They stretch because of compounding constraints:

**Founder time fragmentation.** At L1, the 3 core team members are the primary
contributors to both technical work and operational workstreams. With only ~264
hours/month of core team capacity and ~572 hours of developer capacity at reduced
utilization (~56%), the founders must context-switch constantly between code
review, SOP writing, partner meetings, investor outreach, and product decisions.
Each switch carries a productivity tax.

**Manual operations stay informal longer.** Without the budget to formalize SOPs
early or hire ops staff ahead of schedule, L1 paths run Pilot 1 with informal
verbal procedures. This works for 100 users but creates bottlenecks at 500+,
forcing a pause to document what should have been documented earlier.

**Staffing formalization happens later.** The employed ops staff ladder (doctors,
admin, tech support) starts at Pilot 1 in all scenarios, but at L1, the onboarding
is less structured and the staff have less documentation to work from, leading to
slower ramp-up and more founder intervention.

**Partner onboarding becomes a bottleneck.** At L1, the partner onboarding kit
is often incomplete or ad hoc, meaning each new clinic requires custom hand-holding
rather than a repeatable process. This slows Pilot 2 scaling.

**Quantified impact:** L1 adds 8-14 months versus L3 across the full timeline.
The majority of this stretch (60-70%) occurs in Pilot 2 and Production Readiness,
not in Pre-Pilot.

### 5.2 Why Level 3 Paths Shorten

Level 3 paths (~640 hrs/mo technical capacity) compress the timeline through
several mechanisms:

**More parallelism is safe.** With enough developer bandwidth, the web team and
APK team can work truly independently without founders acting as shared
bottlenecks. The web DevOps engineer and full-stack developer can handle
hardening while the Android sub-team builds the APK, while the flex developer
bridges gaps — all without contention.

**Operations formalize earlier.** At L3, there is enough founding-team bandwidth
to write SOPs, train staff, and build partner kits concurrently with development.
This means the operational gates are met earlier, rather than becoming the
binding constraint after technical work completes.

**Hardening and launch prep do not queue behind features.** At L1-L2, security
hardening, load testing, and production readiness tasks often wait in the backlog
behind feature work. At L3, these can be tackled in parallel, eliminating the
sequential bottleneck.

**Quantified impact:** L3 saves 8-14 months versus L1. The savings are distributed
across all phases but are most pronounced in Pilot 2 (4-8 months shorter) and
Production Readiness (2-4 months shorter).

### 5.3 Why Timelines Do Not Collapse to Half Despite Reduced Web Hours

This is the most important interpretive point for investors evaluating the plan.

The v2 parameter set reduced the web platform estimate from v1's broad range to
a tight 745-hour expected case. This is a real improvement. But the total effort
budget is 2,195 hours, of which web is only 34%. The remaining 66% is:

| Non-Web Category | Hours | % of Total | Compressible by More Devs? |
|-----------------|-------|-----------|---------------------------|
| Android APK | 480 | 22% | Partially (dedicated team, but parallelism has limits) |
| QA/DevOps/Security | 220 | 10% | Partially (requires web + APK to be testable first) |
| Parallel ops workstreams | 750 | 34% | No (bounded by founder/founding-team bandwidth and calendar time) |

The parallel ops workstreams are the key. They are bounded by:

1. **Founder availability** — not developer headcount
2. **Calendar time** — doctor training requires actual doctors to be hired, trained, and observed over weeks; SOPs require real operational data to iterate on; compliance research requires regulatory engagement cycles
3. **Sequential dependencies** — you cannot finalize a tech support runbook before the tech support team exists (Pilot 1); you cannot calibrate staffing before you have staffing data (Pilot 2)

This is why doubling developer capacity from L1 to L2 does not halve the timeline.
It compresses the technical phases but leaves the operational floor intact.

### 5.4 Impact of Investor Timing (S2 vs S3)

The difference between S2 (investor during Pilot 1-to-Pilot 2 transition) and S3
(investor after Pilot 1) is typically 2-4 months.

S3 paths are slightly shorter because:
- Earlier capital injection enables earlier staffing ladder activation
- Pilot 2 begins with full resources rather than ramping up mid-phase
- The investor confidence signal (earlier commitment) reduces founder time spent on fundraising

However, S2 paths have a strategic advantage: the company has more operating proof
by the time capital arrives, which may enable better terms and lower dilution.

### 5.5 The Investor Level Matters More Than Investor Timing

Across the matrix, moving from I1 to I3 (within the same scenario) typically saves
4-8 months. Moving from S2 to S3 (within the same investment level) saves only
2-4 months. This means the quality and size of the investment matters more than
its timing, within reasonable bounds.

| Comparison | Average Months Saved |
|-----------|---------------------|
| I1 to I2 (same scenario) | 3-4 months |
| I2 to I3 (same scenario) | 2-3 months |
| S2 to S3 (same investment level) | 2-3 months |
| O1 to O2 (same scenario) | 3-4 months |
| O2 to O3 (same scenario) | 2-3 months |

---

## 6. Recommended Timeline View

### 6.1 Primary Recommendation: S3-O2-I2

| Attribute | Value |
|-----------|-------|
| **Scenario** | S3 — Investor after Pilot 1 |
| **Our spend level** | O2 — Ideal (480 hrs/mo technical capacity) |
| **Investor level** | I2 — Ideal |
| **Total duration** | **20 months** |
| **Pre-Pilot** | M0-M4 (4 months) |
| **Pilot 1** | M4-M6 (2 months) |
| **Pilot 2** | M6-M12 (6 months) |
| **Production Readiness** | M12-M20 (8 months) |

**Rationale:** This path balances three critical factors:

1. **Proof before capital.** By self-funding through Pilot 1 at ideal capacity, the company demonstrates live-user viability, callback discipline, and first revenue before asking for outside capital. This creates a stronger negotiating position and reduces dilution risk.

2. **Financing timing aligns with the cost escalation curve.** The employed ops staff ladder ($2,482/mo at Pilot 1, scaling to $6,542/mo at Production Readiness) and infrastructure costs ($270-520/mo at Pilot 1, scaling to $800-1,500/mo at Production) create a cost inflection at Pilot 2. Investor capital arriving at exactly this point prevents the founders from bearing the scaling burden alone.

3. **Operational maturity has time to develop.** 20 months provides enough calendar time for the 750 hours of parallel operational workstreams to be completed without rushing. Doctor training gets real iteration cycles. Admin SOPs get real data. The staffing ladder scales with genuine operational learning.

### 6.2 Fallback: S2-O2-I2

| Attribute | Value |
|-----------|-------|
| **Scenario** | S2 — Investor during Pilot 1-to-Pilot 2 transition |
| **Our spend level** | O2 — Ideal |
| **Investor level** | I2 — Ideal |
| **Total duration** | **24 months** |
| **Pre-Pilot** | M0-M5 (5 months) |
| **Pilot 1** | M5-M7 (2 months) |
| **Pilot 2** | M7-M14 (7 months) |
| **Production Readiness** | M14-M24 (10 months) |

**Rationale:** If outside capital lands later than hoped (during the transition
rather than immediately after Pilot 1), this path preserves operating discipline.
The 4 additional months versus the primary path are absorbed primarily in Pilot 2
(+1 month) and Production Readiness (+2 months), where the delayed funding means
slower staffing ladder activation and more sequential hardening work.

This is the "plan B" that does not require changing strategy — only adjusting the
timeline expectation. The same work gets done; it just takes longer because the
cost scaling starts later.

### 6.3 Upside: S3-O2-I3

| Attribute | Value |
|-----------|-------|
| **Scenario** | S3 — Investor after Pilot 1 |
| **Our spend level** | O2 — Ideal |
| **Investor level** | I3 — Fully Funded |
| **Total duration** | **18 months** |
| **Pre-Pilot** | M0-M4 (4 months) |
| **Pilot 1** | M4-M6 (2 months) |
| **Pilot 2** | M6-M11 (5 months) |
| **Production Readiness** | M11-M18 (7 months) |

**Rationale:** If an investor provides fully-funded-level capital after Pilot 1,
the company can compress Pilot 2 by 1 month and Production Readiness by 1 month.
The savings come from:

- Faster staffing ladder activation (full complement hired and trained earlier)
- More parallel technical work (hardening, analytics, and Kenya prep done concurrently)
- Reduced founder fundraising burden (more time for operational oversight)

This path is fast but still defensible. The 18-month timeline preserves all four
phases and all gate criteria. It does not skip operational maturation — it
accelerates it through better resourcing.

**Caution:** This path requires investor quality, not just investor quantity.
"Fully funded" means the investor understands the healthcare operations model
and does not pressure the company to skip operational readiness in favor of
faster user growth. A poorly aligned L3 investor could be worse than a
well-aligned L2 investor.

### 6.4 Recommended View Summary

| Path | Scenario | Duration | Monthly Burn at Peak | Key Risk |
|------|----------|----------|---------------------|----------|
| **Primary** | S3-O2-I2 | **20 months** | ~$21,000-24,000 | Investor timing must align with Pilot 1 completion |
| **Fallback** | S2-O2-I2 | **24 months** | ~$19,000-22,000 | Longer self-funded runway increases founder cash burden |
| **Upside** | S3-O2-I3 | **18 months** | ~$25,000-30,000 | Requires high-quality, mission-aligned investor |

---

## Appendix A: Key Differences from v1 Timeline

| Parameter | v1 Value | v2 Value | Impact on Timeline |
|-----------|----------|----------|-------------------|
| Team model | "Small team of 3" abstraction | 12 part-time people with explicit capacity | Phase durations now grounded in real throughput math |
| Web effort | 682-1,413 hrs (3-point) | 745 hrs (team estimate) | Pre-Pilot and Pilot 2 technical work tightened by ~15-20% |
| APK effort | 440-640 hrs (range) | 480 hrs (contracted) | APK milestone timing now deterministic |
| Ops workstreams | Mentioned but not quantified | 750 hours explicitly modeled | Explains why timeline floor exists regardless of dev speed |
| Employed staff | Not explicitly modeled | Ladder starting at Pilot 1 ($2,482/mo) | Pilot 1 gate now includes staffing readiness |
| Ops infrastructure | Not modeled | Phones, VoIP, call center software | Pre-Pilot and Pilot 1 have real setup requirements |
| Capacity levels | Implied | L1=320, L2=480, L3=640 hrs/mo | Phase durations derived from explicit math, not estimates |
| Total effort | Not summed | 2,195 hours | Single number enables cross-path comparison |

## Appendix B: Glossary of Timeline Notation

| Term | Meaning |
|------|---------|
| M0 | Month zero; project start |
| M0-M4 | Phase runs from month 0 through month 4 |
| S1/S2/S3 | Scenario 1 (self-funded), Scenario 2 (investor during transition), Scenario 3 (investor after Pilot 1) |
| O1/O2/O3 | Our spend level: bootstrapped / ideal / fully funded |
| I1/I2/I3 | Investor spend level: bootstrapped / ideal / fully funded |
| L1/L2/L3 | Investment level (used for S1 where there is only one spend level) |
| CP-XX | Checkpoint number (internal minor gate) |
| W1-W9 | Parallel operational workstream number |

---

*End of 01-timeline.md — this document is the phase-order source of truth for the
Health Hub v2 business plan. All downstream documents reference this file for
phase timing and gate criteria.*
