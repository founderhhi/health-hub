# Health Hub Master Business Plan

**Version:** 1.2 | **Date:** March 2026 | **Status:** Restored Long-Form Working Draft

> This master plan restores the broader narrative and decision context that was lost in the shortened overwrite. It keeps the current revised numbers, but places them back inside a fuller operating, commercialization, and financing story.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Code-Grounded Starting Position](#2-code-grounded-starting-position)
3. [Strategic Thesis for Ethiopia and Kenya](#3-strategic-thesis-for-ethiopia-and-kenya)
4. [What Changed in the Revised Modeling Pass](#4-what-changed-in-the-revised-modeling-pass)
5. [Phase Architecture and Major Gates](#5-phase-architecture-and-major-gates)
6. [How Capital Level Changes Output Quality](#6-how-capital-level-changes-output-quality)
7. [Scenario Family Narratives](#7-scenario-family-narratives)
8. [Scenario Comparison Matrix](#8-scenario-comparison-matrix)
9. [Operating Model and Team Economics](#9-operating-model-and-team-economics)
10. [Commercial Model Summary](#10-commercial-model-summary)
11. [Financing and Dilution Logic](#11-financing-and-dilution-logic)
12. [Risk Register Summary and Downgrade Paths](#12-risk-register-summary-and-downgrade-paths)
13. [Recommendation Framework](#13-recommendation-framework)
14. [Cross-Reference Map](#14-cross-reference-map)

---

## 1. Executive Summary

Health Hub already has a genuine multi-role product foundation in code. The current web prototype covers patient journeys, GP and specialist workflows, pharmacy and diagnostics coordination, admin callbacks, payments, notifications, chat, and video. That means the central business-planning challenge is **not** whether the product idea is broad enough. The challenge is whether the company can harden, operate, staff, localize, and finance that breadth responsibly.

The revised model keeps the founder-approved strategic direction intact:

- Ethiopia first, Kenya second.
- Patients local, many operations global.
- Patient APK as the mobile priority.
- Provider-side activity remains on web.
- Manual operations are acceptable through most of the pilot period.
- Revenue is transactional first; subscriptions come later only when usage density justifies them.

The main correction in this pass is that the plan now treats Health Hub as a **real operating company**, not only as a software build. The updated model explicitly counts:

- three part-time founder/founding members,
- seven part-time developers,
- two fractional advisors,
- fixed Android APK economics,
- reduced but still real remaining web-hardening effort,
- explicit employed doctors, admin ops, and technical-support staff through the pilots,
- devices, telecom, callback tooling, and support systems.

That change raises realism and removes a major weakness in the earlier compressed summaries: they had lost the deeper story of how software, manual operations, partner networks, and capital timing fit together.

---

## 2. Code-Grounded Starting Position

Health Hub is better understood as a prototype ecosystem than as a single teleconsultation app.

### 2.1 What the Product Already Contains

| Product Surface | Current Reality | Why It Matters to the Plan |
| --- | --- | --- |
| Patient interface | Registration, dashboard, consult request logic, notifications, content, payment placeholders, and workflow continuity | Supports a credible path to a patient APK rather than requiring a fresh mobile product definition |
| Clinical workflows | GP queueing, specialist referral logic, consultation state handling | Means clinical workflow design already exists and should be hardened rather than reinvented |
| Pharmacy and diagnostics | Workflow surfaces exist, with admin visibility and coordination logic | Fits the founder-approved manual-fulfillment model for pilots |
| Admin layer | Callback and exception-handling behavior already exists in the product shape | Validates the assisted-service model needed in Ethiopia-first operations |
| Platform layer | API surface, schema depth, SSR, health checks, and readiness endpoints exist | Supports phased hardening toward production instead of speculative architecture planning |

### 2.2 What Is Still Missing or Incomplete

| Gap | Planning Treatment |
| --- | --- |
| Tenant isolation | Not part of this planning cycle |
| East Africa-native payment rails | Required before scale, but not mandatory for initial live pilots |
| Production-grade patient mobile | Covered by the fixed Android APK workstream |
| Full automation of downstream logistics | Deferred; admin-led workflows remain valid through most pilots |

The practical result is that Health Hub can be modeled as a **hardening-and-operations program** rather than as a greenfield engineering problem.

---

## 3. Strategic Thesis for Ethiopia and Kenya

### 3.1 Why Ethiopia First Still Makes Sense

The competitor work shows that Ethiopia remains more manual, more operator-driven, and less price-transparent than Kenya. That is not a reason to avoid it. It is one reason Health Hub's assisted-care and admin-heavy operating model can fit the market.

Key implications:

- callback-led and admin-supported workflows are acceptable,
- assisted conversion from inquiry to consult is commercially normal,
- a partner-clinic operating model is more realistic than assuming a pure self-serve digital-health path,
- pricing must remain conservative and visibly below premium private alternatives for routine GP care.

### 3.2 Why Kenya Still Matters Early

Kenya is the cleaner benchmark market for:

- mobile-money behavior,
- digital-health price discovery,
- partner expectations around online consultations,
- future automation of payment and coordination loops.

Kenya therefore acts as the **pricing and payment benchmark market**, even while Ethiopia remains the primary early operating market.

### 3.3 Product-Market Thesis

Health Hub should not be framed as a narrow telemedicine app. The more accurate business narrative is:

- a patient entry point,
- a clinician and partner operating layer,
- an admin-assisted care-navigation system,
- a transaction-first health marketplace that can deepen over time.

That thesis is consistent with both the codebase and the market comparison work.

---

## 4. What Changed in the Revised Modeling Pass

The following updates are now incorporated into the planning baseline.

### 4.1 Team and Rate Changes

| Item | Updated Assumption |
| --- | --- |
| Core team | 3 part-time members at ~4 hours/day each |
| Developer pool | 7 part-time developers |
| Advisors | 2 fractional advisors |
| Junior dev rate | $10/hr |
| Senior dev rate | $20/hr |
| Management / technical-head rate | $20/hr |
| Everyone-else rate | $15/hr |

### 4.2 Build-Effort Changes

| Item | Updated Assumption |
| --- | --- |
| Android APK | 480 hours total at fixed $15/hr average |
| Remaining web hardening | 720-770 hours, modeled at 745 |
| Additional hardening / training / launch setup | 660 hours |
| Conservative productive technical capacity | 480 hrs/month |

### 4.3 Operations Changes

| Phase | Doctors | Admin Ops | Technical Support |
| --- | --- | --- | --- |
| Pilot 1 | 2 | 2 | 2 |
| Pilot 2 | 4 | 4 | 2 |
| Production Readiness | 6 | 6 | 3 |

### 4.4 Equity and Capital Structure Changes

| Pool | Share |
| --- | --- |
| Owner / founder | 60% |
| Founding + strategic | 20% |
| Investor pool | 20% |

These changes are not small formatting edits. They materially alter cost realism, staffing realism, and dilution interpretation. The master plan therefore has to explain the operational logic behind them, not just swap the numbers.

---

## 5. Phase Architecture and Major Gates

The major phase order remains the same, but the restored framing makes clear that each phase includes both software work and non-software operating work.

| Phase | Strategic Purpose | Technical Focus | Operating Focus | Gate to Advance |
| --- | --- | --- | --- | --- |
| Pre-Pilot | Turn prototype behavior into repeatable internal workflows | Architecture freeze, backlog lock, APK start, web hardening, rehearsal fixes | Doctor training draft, admin callback SOPs, support scripts, escalation trees | Core workflows stable; rehearsals pass; first runbooks versioned |
| Pilot 1 | Prove external live operation in Ethiopia | Core patient APK journey, stable provider web, issue handling | Live callbacks, doctor playbooks, admin refreshers, manual pharmacy/diagnostics handling | 1-2 months of live throughput with measured callback and escalation discipline |
| Pilot 2 | Expand user load and commercial learning | Stronger APK, partner reporting, cleaner analytics, partial automation | Staffing ladder deepens, refresh training, tighter reporting, partner-service operations | 5k-10k user-capable operations with documented support and reporting discipline |
| Production Readiness | Convert pilot-capable product into production-safe release | Final hardening, release freeze, monitoring, support posture, launch controls | Compliance closeout, launch playbooks, support schedule, fallback operations | Current prototype scope is production-safe across web and mobile |

### 5.1 Parallel Workstreams That Must Be Visible

The earlier compressed rewrite hid these, which is one reason it felt too thin.

- Doctor training protocols
- Admin callback and fulfilment SOPs
- Technical-support runbooks
- Partner onboarding and activation kits
- Launch analytics and reporting logic
- Release governance and rollback procedures

These tasks are part of the company-building effort and explain why lower coding hours do not automatically collapse the timeline.

---

## 6. How Capital Level Changes Output Quality

A key founder instruction is that every scenario should still be tied to realistic output quality, not just to a cash number.

### 6.1 Common Rule Across All Levels

All core service lines still exist conceptually:

- teleconsultation,
- specialist referral,
- pharmacy workflow,
- diagnostics workflow,
- AI triage,
- HealWell content,
- travel care,
- admin callbacks and manual fulfilment.

What changes by capital level is the depth and safety of delivery.

### 6.2 Output Interpretation by Level

| Level | Output Character |
| --- | --- |
| Level 1 | Manual-heavy, thinner reporting, slower hardening, more founder/ops burden, later polish |
| Level 2 | Balanced, commercially usable, staffed enough to learn responsibly, best baseline planning case |
| Level 3 | Faster hardening, earlier staffing depth, stronger reporting and release discipline, but higher fixed-cost risk if demand lags |

### 6.3 APK Boundary by Phase

The founder explicitly asked that the APK boundary not be treated as globally fixed across every path. The correct interpretation is:

- by Pilot 1, the best-funded and balanced paths should already have the core patient APK live,
- by Pilot 2, every viable serious path should have the APK covering the major patient journeys,
- by Production, the current prototype scope should be represented properly in the patient-facing mobile experience.

---

## 7. Scenario Family Narratives

### 7.1 Scenario 1: Fully Self-Funded

This is the endurance path. It is viable only if founder capital and disciplined cost control can absorb the time drag created by manual operations and slower staff formalization. The main hidden cost in this path is not cloud spend; it is the compounded burden of founder office time and delayed operational maturity.

### 7.2 Scenario 2: Investor During Transition

This is the operational fallback. It preserves the self-funded proof period through Pre-Pilot and Pilot 1, but expects outside capital before Production. This path is often the most realistic if investor timing slips but the company still wants to preserve a responsible pilot-to-production ramp.

### 7.3 Scenario 3: Investor Right After Pilot 1

This remains the cleanest primary story. It lets the company prove live external use before the investor arrives, while still bringing outside capital in early enough to professionalize staffing, reporting, hardening, and launch operations before Production.

---

## 8. Scenario Comparison Matrix

| Combination | Months to Production | Economic Cost | Founder Capital | Investor Capital | Main Interpretation |
| --- | --- | --- | --- | --- | --- |
| S1-L1 | 34 | $451,751 | $240,000 | None | Pure survival path; highest founder burden |
| S1-L2 | 26 | $353,794 | $185,000 | None | Self-funded but more operationally coherent |
| S1-L3 | 20 | $281,931 | $150,000 | None | Fastest self-funded path, but still heavy founder exposure |
| S2-O1-I1 | 30 | $400,716 | $120,000 | $140,000 | Transition path with slower hardening |
| S2-O1-I2 | 27 | $363,656 | $120,000 | $145,000 | Lean founder stage plus standard outside support |
| S2-O1-I3 | 24 | $326,066 | $120,000 | $245,000 | Founder-lean start with stronger outside acceleration |
| S2-O2-I1 | 28 | $382,548 | $110,000 | $135,000 | Balanced founder stage, lighter investor finish |
| S2-O2-I2 | 24 | $331,570 | $110,000 | $120,000 | Strong fallback baseline |
| S2-O2-I3 | 22 | $307,898 | $110,000 | $240,000 | Faster fallback with stronger outside capital |
| S2-O3-I1 | 26 | $362,708 | $110,000 | $110,000 | More front-loaded founder capacity, lighter investor finish |
| S2-O3-I2 | 22 | $311,316 | $110,000 | $100,000 | Faster transition case |
| S2-O3-I3 | 19 | $272,646 | $110,000 | $205,000 | High-speed transition story |
| S3-O1-I1 | 26 | $349,636 | $95,000 | $150,000 | Earliest investor timing but still lean pre-round execution |
| S3-O1-I2 | 22 | $297,910 | $95,000 | $140,000 | Good founder relief, still disciplined |
| S3-O1-I3 | 19 | $258,804 | $95,000 | $255,000 | Acceleration path after Pilot 1 |
| S3-O2-I1 | 24 | $329,136 | $95,000 | $125,000 | Balanced founder period with modest investor layer |
| S3-O2-I2 | 20 | $276,996 | $95,000 | $120,000 | **Primary recommendation** |
| S3-O2-I3 | 18 | $251,808 | $95,000 | $250,000 | **Upside acceleration recommendation** |
| S3-O3-I1 | 22 | $308,804 | $95,000 | $105,000 | Fast founder-led pre-round execution |
| S3-O3-I2 | 18 | $256,250 | $95,000 | $100,000 | High-efficiency upside path |
| S3-O3-I3 | 16 | $230,522 | $95,000 | $225,000 | Fastest upside path, but not automatically the most fundable story |

---

## 9. Operating Model and Team Economics

### 9.1 Why the Team Model Matters More Than Before

The old short-form rewrite made the business feel lighter than it really is. The restored logic is:

- founders are not free,
- part-time contributors still create real cost,
- partner clinics reduce risk but do not eliminate the need for employed coverage,
- technical support and admin callbacks are not optional overhead once live pilots begin.

### 9.2 Explicit Operating Burden

| Cost Layer | Why It Must Be Counted |
| --- | --- |
| Founder office | Product oversight, testing, decision-making, partner management, and day-to-day orchestration |
| Admin ops | Callback handling, exceptions, tourism/travel follow-up, partner coordination, manual fulfilment |
| Doctors | Minimum employed coverage needed for continuity and service confidence |
| Technical support | Live issue handling, lower-tier support, internal escalation |
| Devices and telecom | Necessary because the operating model is partly call-driven and admin-assisted |

### 9.3 What This Means Financially

The plan becomes more credible because it no longer assumes that:

- all delivery can happen inside unpaid founder time,
- live healthcare operations can run without employed support staff,
- a broad platform can reach production readiness only by counting coding hours.

---

## 10. Commercial Model Summary

### 10.1 Revenue Logic

The revenue model remains transactional-first:

- GP consult fees,
- specialist consult fees,
- pharmacy commissions,
- diagnostics commissions,
- care-coordination fees,
- later subscription layers once usage density exists.

### 10.2 Pricing Logic

The competitive work supports conservative East Africa pricing rather than premium placeholder pricing.

| Service | Ethiopia Corridor | Kenya Corridor | Interpretation |
| --- | --- | --- | --- |
| GP consult | ETB 460-620 | KSh 580-710 | Production-oriented benchmark corridor |
| Specialist consult | ETB 1,250-1,700 | KSh 1,300-1,700 | Referral and specialist tier |
| Pharmacy take-rate | 8%-12% | 8%-12% | Marketplace-oriented monetization |
| Diagnostics take-rate | 10%-15% | 10%-15% | Coordination-heavy commission layer |
| Travel/care coordination | $8-$18 equivalent | $8-$18 equivalent | High-touch, low-volume add-on |

### 10.3 Acquisition Logic

The stronger interpretation from the acquisition work is:

- facility-first and warm-network acquisition dominate early,
- patients follow trusted providers and referrals before they follow ads,
- WhatsApp, facility-driven onboarding, and later Play Store discovery matter more than expensive early paid performance marketing,
- CAC stays low early largely because partner-driven acquisition substitutes for paid growth.

---

## 11. Financing and Dilution Logic

### 11.1 Preferred Funding Story

The current plan still supports a staged financing story rather than an all-or-nothing raise:

- founder-funded proving period,
- outside round after meaningful pilot evidence,
- investor dilution drawn from the dedicated 20% investor pool,
- small checks treated as bridge-class capital rather than over-described as institutional seed.

### 11.2 Cap Table Logic Used Here

| Pool | Share | Interpretation |
| --- | --- | --- |
| Owner / founder | 60% | Idea ownership and control pool |
| Founding + strategic | 20% | Founding members and future strategic partnerships |
| Investor | 20% | Ceiling pool for outside capital in this planning phase |

### 11.3 Why the Primary Recommendation Is Still S3-O2-I2

It remains the best overall story because it combines:

- enough founder-funded proof to de-risk the raise,
- investor timing early enough to avoid a sloppy pilot-to-production gap,
- a moderate six-figure round size that is easier to defend than both tiny bridge-like asks and overly aggressive early seed posture,
- disciplined dilution inside the dedicated investor pool.

---

## 12. Risk Register Summary and Downgrade Paths

| Risk | Why It Matters | Main Mitigation |
| --- | --- | --- |
| Funding delay | Outside money may arrive later than hoped | Keep Scenario 2 as the active fallback operating plan |
| Manual ops overload | Callbacks and fulfilment can swamp the team before systems mature | Add admin capacity before adding feature breadth |
| Regulatory delay | Healthcare operations and cross-border structures remain sensitive | Continue partner-license model with real legal/accounting support budgeted |
| Payment mismatch | Stripe-only logic is not enough for East Africa | Use invoicing first, localize rails before scale |
| Team fragmentation | Part-time contributors increase coordination risk | Technical-head / product-testing function becomes essential |
| Premature fixed-cost expansion | Fast staffing without proven demand can create burn | Treat Level 3 as an acceleration option, not a default virtue |

### 12.1 Downgrade Logic

If a stronger scenario loses financing support, the company should degrade to the next viable path operationally rather than collapse into confusion:

- Scenario 3 can degrade into Scenario 2 by stretching Pilot 2 and slowing staffing formalization.
- Scenario 2 can degrade into Scenario 1 only if founder reserve, in-kind support, or grant support can absorb the longer runway.
- The first cuts should usually be in growth speed, automation timing, and reporting polish, **not** in core doctor/admin/support coverage.

---

## 13. Recommendation Framework

### 13.1 Primary Path

- **Scenario:** `S3-O2-I2`
- **Why:** best balance of speed, realism, staffing adequacy, and financing credibility

### 13.2 Fallback Path

- **Scenario:** `S2-O2-I2`
- **Why:** preserves operational discipline if outside funding timing slips

### 13.3 Upside Path

- **Scenario:** `S3-O2-I3`
- **Why:** acceleration path if the investor is genuinely strategic and the organization can absorb earlier staffing depth without losing discipline

### 13.4 What Not to Misread

- The cheapest monthly path is not automatically the safest.
- The fastest path is not automatically the best fundraising narrative.
- The most polished product path still fails if doctor/admin/support operations are underbuilt.

---

## 14. Cross-Reference Map

| Topic | Primary Document |
| --- | --- |
| Shared assumptions | [params.md](./params.md) |
| Timeline logic | [01-timeline.md](./01-timeline.md) |
| Services and SLAs | [02-services-slas.md](./02-services-slas.md) |
| Cost detail | [03-cost-breakdown.md](./03-cost-breakdown.md) |
| Effort model | [04-effort-estimation.md](./04-effort-estimation.md) |
| Revenue detail | [05-revenue-modelling.md](./05-revenue-modelling.md) |
| Pricing | [06-pricing-strategy.md](./06-pricing-strategy.md) |
| Acquisition and CAC | [08-customer-acquisition.md](./08-customer-acquisition.md) |
| Competitor benchmark layer | [competitor-analysis.md](./competitor-analysis.md) and [15-competitive-analysis.md](./15-competitive-analysis.md) |
| Financing normalization | [investor-pack/financing-normalization.md](./investor-pack/financing-normalization.md) |

---

## Closing Note

This restored version is intentionally longer because the shorter overwrite hid too much of the real logic. The business only makes sense when product hardening, admin-led operations, staffing ladders, pricing realism, and financing timing are all visible together.
