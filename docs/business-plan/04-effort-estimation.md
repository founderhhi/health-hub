# 04 — Effort Estimation

**Health Hub Business Plan | Restored Long-Form Effort Model**
**Version:** 1.2 | **Date:** March 2026

> This document restores the explanatory layer behind the effort model and applies the approved correction to the remaining web effort, the fixed Android quote, and the parallel operating-work assumption.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Revised Effort Stack](#2-revised-effort-stack)
3. [How the Team Capacity Model Works](#3-how-the-team-capacity-model-works)
4. [Effort by Phase](#4-effort-by-phase)
5. [Why the Timelines Did Not Collapse](#5-why-the-timelines-did-not-collapse)
6. [Interpretation by Investment Level](#6-interpretation-by-investment-level)

---

## 1. Executive Summary

The previous modeling pass overestimated the remaining web work. The founder supplied a better external estimate, and that correction is now locked in. The restored effort model therefore uses a smaller web effort number while keeping the larger company-building effort visible.

### 1.1 Current Remaining Effort Basis

- Remaining web product work: **720-770 hours**
- Expected case used in modeling: **745 hours**
- Android APK: **480 hours** (fixed external quote)
- Additional hardening and operating setup work: **660 hours**
- Combined effort basis: **~1,885 hours**

This is a healthier model because it distinguishes between:

- feature/build effort,
- hardening effort,
- launch-readiness effort,
- operating-system effort for the business itself.

---

## 2. Revised Effort Stack

| Workstream | Hours | Why It Exists |
| --- | --- | --- |
| Web hardening and remaining product completion | 745 | Remaining prototype-to-production-safe web work |
| Android APK | 480 | Patient mobile build, fixed quote |
| QA, DevOps, security hardening | 220 | Release discipline, monitoring, hardening |
| Doctor/admin training and SOP design | 180 | Operations cannot remain informal if the pilots are live |
| Provider onboarding and partner tooling | 140 | Clinics and partner teams need practical operating material |
| Launch analytics, reporting, release governance | 120 | Needed for production readiness and investor-quality reporting |

### 2.1 Technical vs Non-Technical Split

| Effort Type | Hours | Interpretation |
| --- | --- | --- |
| Pure product build / hardening | 1,445 | Android + web + QA / DevOps / security |
| Operations setup and launch governance | 440 | Training, partner tooling, analytics, release governance |

The distinction matters because the thinner rewrite effectively treated the second bucket as invisible overhead. It is not invisible. It is part of what makes the business runnable.

---

## 3. How the Team Capacity Model Works

### 3.1 Team Capacity Assumptions

| Level | Productive Technical Capacity | Meaning |
| --- | --- | --- |
| Level 1 | ~210 hrs/month | Lean use of the part-time team; slower throughput and more sequencing |
| Level 2 | ~320 hrs/month | Balanced baseline planning case |
| Level 3 | ~480 hrs/month | Full effective use of the part-time team |

### 3.2 Why Raw Hours Are Not the Same as Productive Hours

The team is part-time and cross-functional. Real output loses time to:

- coordination,
- testing,
- rework,
- product decisions,
- partner and ops interruptions,
- live issue handling once pilots begin.

That is why the model uses productive planning capacity rather than naïve calendar hours.

---

## 4. Effort by Phase

The effort stack is not consumed evenly.

| Phase | Approx. Effort Focus | Explanation |
| --- | --- | --- |
| Pre-Pilot | Heaviest technical concentration | Architecture freeze, backlog lock, Android start, major hardening, SOP draft creation |
| Pilot 1 | Mixed technical and operating load | Live fixes, support setup, callback refinement, doctor/admin refreshers |
| Pilot 2 | Mixed scale-up load | Reporting, staffing calibration, partner onboarding, partial automation |
| Production Readiness | Hardening and governance heavy | Monitoring, release freeze, launch checklists, support schedule, compliance closeout |

### 4.1 Practical Interpretation

- **Pre-Pilot** consumes the largest single block of deep engineering time.
- **Pilot 1** introduces real support and operating interruptions.
- **Pilot 2** shifts significant effort into reliability, reporting, and staffing maturity.
- **Production Readiness** is less about net-new feature work and more about making the current surface safe to launch.

---

## 5. Why the Timelines Did Not Collapse

This was the main misunderstanding created by the shorter rewrite. The timeline did shorten, but not in direct proportion to the reduced web hours, because the business still must build:

- doctor training materials,
- admin callback processes,
- support runbooks,
- reporting discipline,
- launch governance,
- production release confidence.

If those are not modeled, the plan becomes artificially optimistic.

### 5.1 What Actually Happened in This Revision

- The web estimate came down materially.
- Android stayed fixed and clearer.
- The saved product time was partly reallocated into real hardening and operating work.
- The result is a more believable timeline rather than a falsely compressed one.

---

## 6. Interpretation by Investment Level

| Level | Effort Experience |
| --- | --- |
| Level 1 | More sequencing, more founder switching cost, more reliance on manual handoff |
| Level 2 | Balanced concurrency, enough capacity for both build and operating prep |
| Level 3 | More true parallelism, earlier partner and support maturity, faster production hardening |

### 6.1 Best Current Reading

The most balanced effort-to-outcome ratio still sits in **Level 2** paths, especially `S3-O2-I2`, because they preserve realism without assuming the company can absorb corporate-level speed at every layer.

---

## Closing Note

The restored effort model is intentionally explicit because the company is not only finishing software. It is converting a broad prototype into a disciplined healthcare operation. The build hours matter, but they are only one part of the work.
