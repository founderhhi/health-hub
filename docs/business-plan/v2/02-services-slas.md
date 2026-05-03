# 02 -- Services & SLAs

**Health Hub Business Plan v2 -- Document 2 of 15**
**Version:** 2.0 | **Date:** March 2026

---

## 1. Executive Summary

Health Hub is a multi-tenant health technology platform targeting East Africa (Ethiopia first, Kenya second), connecting patients, GPs, specialists, pharmacies, diagnostic labs, and facility administrators through integrated digital workflows. The platform runs on Angular 21 SSR + Express 5 + PostgreSQL 16 + WebSocket + Daily.co video, deployed on Render.

**Current state: demo-ready, not production-ready.** As of March 2026, the platform has completed a comprehensive 19-issue codebase audit (all P0, P1, and P2 issues resolved), producing functional end-to-end workflows for patient-to-GP consultations, specialist referral routing, pharmacy claim-to-dispense, and administrative user management. Video consultation infrastructure is scaffolded with Daily.co join-link generation. Payment integration (Stripe/M-Pesa/Telebirr) remains at scaffold stage only. The Android APK is under separate construction (480 hours, contracted).

**The v2 operating model is admin-assisted.** Unlike a pure-software platform, Health Hub employs doctors (MBBS telemedicine), admin ops staff (callbacks, manual fulfilment, exception handling, partner coordination), and technical support personnel. This staffing ladder scales from zero in Pre-Pilot to 6 doctors + 6 admin + 3 tech support at Production Readiness. Services described in this document reflect both the technology platform and the human operational layer that surrounds it.

**Progressive hardening approach.** Services launch at best-effort quality during internal testing, graduate to monitored SLAs during pilot phases, and reach enterprise-grade commitments only at production scale. SLA tiers advance from 96% uptime (Pre-Pilot) through 97% (Pilot 1) and 98.2% (Pilot 2) to 99.2% (Production). This protects Health Hub and its early partners from over-commitment while building trust through measurable improvement at each gate.

This document defines:
- The complete service catalog across all seven stakeholder types (Section 2)
- SLA definitions across four progressive tiers (Section 3)
- Partner and user expectations at each phase (Section 4)
- Service availability impact across all 21 scenario combinations (Section 5)
- Service roadmap timelines for representative combinations (Section 6)

All parameters reference `params.md` v2.0 unless otherwise noted.

---

## 2. Service Catalog

Each service is described with its current codebase state and evolution targets across the four phases defined in params.md (Pre-Pilot: 100-200 internal users, 3-6 months; Pilot 1: up to 1,000 users, 2-3 months; Pilot 2: 5,000-10,000 users, 3-13 months; Production Readiness: full scale, 4-12 months).

### 2.1 Patient Services

| Service | Description | Current State (Mar 2026) | Pre-Pilot Target | Pilot 1 Target | Pilot 2 Target | Production Target |
|---------|-------------|--------------------------|------------------|----------------|----------------|-------------------|
| Account registration & login | Email/password signup with password policy enforcement, JWT auth, refresh tokens | Working (ISS-11 password UX fix applied) | Rate limiting on login, account lockout, bcrypt-hashed passwords verified | Stable, real patient signups | + Social login option, forgot-password flow | + SSO for facility employees, MFA option |
| GP consultation request | Submit symptoms, join GP queue, receive triage via admin-assisted callback | Working (queue, history, status APIs returning 200) | Bug fixes, queue ordering, callback SOP integration | Live with real patients; admin ops staff handle callback scheduling | + Priority queuing, admin queue dashboard | Full SLA-backed, automated + admin hybrid triage |
| Admin-assisted callback | Admin ops staff call patient back to confirm appointment, collect details, handle exceptions | Process designed, not yet in platform | Callback SOP drafted, admin phone provisioned | Live: 2 admin ops staff handling callbacks via phone + platform notes | 4 admin ops staff, basic CRM/ticketing integration | 6 admin ops staff, call center software, full audit trail |
| Video consultation | Daily.co-based video call with join-link generation, room cleanup | Partial (scaffold + join-link API; ISS-13 coming-soon placeholder) | Complete Daily.co integration, test calls with team | 720p minimum for Addis Ababa users, 1:1 calls, 2 employed doctors available | + Audio-only fallback, 4 employed doctors on roster | HD target, <200ms p95 latency, 6 employed doctors, recording option |
| AI health triage chat | Claude-powered symptom checker with conversation history | Partial (API + basic UI) | Improve prompts, add medical disclaimers, safety guardrails | Beta with consent flow, English only | + Amharic support experiment | Full clinical-grade guardrails, multi-language |
| Prescription viewing | View prescriptions issued by GP or specialist | Working | UI polish | Live | + PDF download | + Prescription history export |
| Pharmacy status tracking | Track prescription claim and dispense status in real time | Working (ISS-15, ISS-16 fixes applied) | Real-time WebSocket updates verified | Live with partner pharmacies | + Push notifications via FCM | + SMS notifications (Africa's Talking) |
| Lab results viewing | View lab orders and completed results | Partial (basic order/result API) | Complete results display UI | Live with partner labs | + PDF reports, structured result display | + Historical trend charts |
| Payment (M-Pesa / Telebirr / Stripe) | Pay for consultations, prescriptions, lab orders | Scaffold only (Stripe-compatible UI, no SDK installed) | Stripe test mode integration | M-Pesa/Telebirr sandbox testing | M-Pesa/Telebirr live (Ethiopia), Stripe live (card) | Full payment reconciliation, refund workflows |
| Notifications | Push, email, SMS alerts for appointments, results, prescriptions | In-app only (WebSocket-based) | + Email via SendGrid | + SMS via Africa's Talking (pilot facilities) | + Push via FCM (Android APK) | Full multi-channel with preference management |
| Profile & billing management | Edit personal details, manage payment methods, view transactions | Working (migration 009 applied: patient_payment_methods, payment_transactions tables) | Bug fixes, field validation | Live | + Insurance information fields | + Family profiles, dependents |
| Mobile app (Android) | Native patient-facing mobile experience | Not built (480-hr APK contract in progress) | PWA manifest + install prompt on web | APK core ready: registration, dashboard, consultation request | Full APK: video/audio/chat, prescriptions, lab results, payments, notifications | Play Store listing, auto-update, crash reporting |
| Appointment scheduling | Book future consultation slots with employed or partner doctors | Not built | -- | Basic slot booking (admin-managed calendar) | Patient self-service slot selection | Full calendar integration with doctor availability |
| Medical records access | View consolidated health history across consultations | Not built | -- | -- | Basic history view (consultation list) | EHR-lite: consolidated timeline across all providers |
| Care coordination / travel | Admin-assisted coordination for travel patients (tourism, medical travel) | Not built | SOP design, workflow mapping | Pilot with 1-2 travel cases (manual process) | Admin-managed coordination with partner facilities | Systematic workflow: booking, follow-up, documentation |

### 2.2 GP Services

| Service | Description | Current State (Mar 2026) | Pre-Pilot Target | Pilot 1 Target | Pilot 2 Target | Production Target |
|---------|-------------|--------------------------|------------------|----------------|----------------|-------------------|
| Patient queue management | View, accept, and manage incoming patient consultations | Working (ISS-03 schema fix applied) | Performance tuning, WebSocket reliability, queue auto-refresh | Live with real patients (employed + partner GPs) | + Queue analytics, wait-time estimates | + Auto-routing by specialty, load balancing |
| Patient history view | Access patient consultation history and prior notes | Working | UI improvements, filtering | Live | + Filterable by date, condition, provider | + Full EHR integration readiness |
| Consultation status updates | Mark consultations as in-progress, completed, referred | Working | Bug fixes, status transition validation | Live | Stable, audited transitions | SLA-backed, auto-escalation on stale consults |
| Prescription issuance | Create and submit prescriptions to pharmacy network | Working | Validation rules, drug database stub | Live with real formulary (partner pharmacy list) | + Drug interaction checks (basic) | Full formulary + e-prescribing standards |
| Specialist referral creation | Refer patients to specialists with clinical notes | Working (ISS-12 referral-to-consultation linking fixed) | Referral template improvements, urgency levels | Live with partner specialists | + Auto-routing by specialty and availability | + Referral analytics, turnaround tracking |
| Video consultation (GP side) | Join video call with patient | Partial (Daily.co scaffold) | Complete integration, GP-side UI | Live 1:1 calls | + Screen sharing for lab results | HD + optional recording |
| Chat with patient | In-consultation real-time messaging | Working (basic WebSocket chat) | Reliability improvements, message persistence | Live | + File/image attachments | + Persistent chat history across sessions |
| Dashboard & analytics | Overview of daily workload, consultation metrics | Partial (basic dashboard exists) | Complete key metric cards | Live | + Weekly/monthly reports | + Benchmarking against peer GPs |

### 2.3 Specialist Services

| Service | Description | Current State (Mar 2026) | Pre-Pilot Target | Pilot 1 Target | Pilot 2 Target | Production Target |
|---------|-------------|--------------------------|------------------|----------------|----------------|-------------------|
| Referral inbox | View and manage incoming referrals from GPs | Working (ISS-07 role contract drift fixed) | UI polish, priority filtering | Live | + Auto-sort by urgency and wait time | + Auto-accept rules for trusted GPs |
| Referral accept/decline | Accept or decline referrals with clinical notes | Working | Validation improvements | Live | Stable | SLA-backed (response time targets) |
| Request more info | Request additional clinical information from referring GP | Working (ISS-14 request-info form implemented) | UI refinement, notification to GP | Live | + Structured info request templates | + Auto-reminders after 24hrs |
| Consultation from referral | Create consultation linked to accepted referral | Working (ISS-12 linking verified) | Linking reliability, status propagation | Live | + Scheduling for future slots | + Multi-session consultation tracking |
| Video consultation (specialist) | Join video call with referred patient | Partial (ISS-13 coming-soon placeholder) | Complete Daily.co integration | Live 1:1 | + Recording with consent, clinical notes overlay | HD + transcription option |
| Lab order creation | Order diagnostic tests for patients | Working (basic) | + Order templates by specialty | Live with partner labs | + Auto-routing to nearest partner lab | + Results auto-import and notification |
| Prescription issuance | Issue specialist prescriptions | Working | Validation rules | Live | Stable | Full formulary with specialty-specific drugs |
| Specialist dashboard | Overview of referrals, consultations, pending actions | Working | Performance improvements | Live | + Analytics (referral volume, turnaround) | + Benchmarking, utilization reports |

### 2.4 Pharmacy Services

| Service | Description | Current State (Mar 2026) | Pre-Pilot Target | Pilot 1 Target | Pilot 2 Target | Production Target |
|---------|-------------|--------------------------|------------------|----------------|----------------|-------------------|
| Prescription lookup | Search and view incoming prescriptions | Working | Search improvements, notification on new Rx | Live | + Barcode/QR scan from APK | + Auto-notifications, batch processing |
| Prescription claim | Claim a prescription for fulfillment | Working (ISS-15 endpoint alignment fixed) | Concurrency handling (prevent double-claim) | Live | + Multi-pharmacy routing (patient choice) | + Priority claims for urgent Rx |
| Dispense workflow | Mark prescriptions as dispensed, update patient status | Working (ISS-16 UI copy fixed) | Status transition validation, partial dispense | Live | + Substitution workflow with doctor approval | + Full state machine with audit trail |
| Manual fulfilment (admin-assisted) | Admin ops staff coordinate fulfilment for patients unable to visit pharmacy | Process designed | SOP drafted | Pilot with select cases (admin calls pharmacy, arranges delivery) | Admin dashboard for fulfilment tracking | Systematic workflow with delivery partner integration |
| Inventory management | Track drug stock levels | Not built | -- | Basic stock tracking (manual entry) | + Low-stock alerts to pharmacy admin | + Auto-reorder suggestions |
| Payment collection | Collect payment for dispensed prescriptions | Not built | -- | Manual recording in platform | M-Pesa/Telebirr integration | Full POS integration, split payments |
| Pharmacy dashboard | Overview of claims, dispenses, pending actions | Partial | Complete UI, daily summary | Live | + Daily/weekly reports | + Analytics, revenue tracking |
| Patient notification | Notify patient when prescription is ready for pickup/delivery | Partial (in-app only) | + Email notification | + SMS notification | + Push notification (APK) | Multi-channel with delivery ETA |

### 2.5 Diagnostics / Lab Services

| Service | Description | Current State (Mar 2026) | Pre-Pilot Target | Pilot 1 Target | Pilot 2 Target | Production Target |
|---------|-------------|--------------------------|------------------|----------------|----------------|-------------------|
| Order reception | Receive and view lab orders from GPs/specialists | Working (ISS-17 bottom-nav route fix, ISS-18 input fix applied) | UI improvements, tab navigation verified | Live | + Priority ordering by urgency | + Auto-accept for standard panels |
| Sample tracking | Track sample collection and processing status | Not built | -- | Basic status updates (received/processing/complete) | + Barcode tracking for sample IDs | + Full LIMS-lite workflow |
| Result entry | Enter and submit lab results | Working (basic; ISS-19 demo fallback removed) | + Structured result templates by test type | Live | + Image/file upload for scans, pathology | + Auto-validation against reference ranges |
| Result delivery | Deliver results to ordering provider and patient | Partial | Complete notification flow (in-app + email) | Live | + PDF generation with facility branding | + HL7 FHIR export readiness |
| Lab dashboard | Overview of orders, pending results, turnaround times | Partial | Complete UI | Live | + TAT analytics, bottleneck identification | + Benchmarking against industry standards |
| Equipment management | Track lab equipment and calibration schedules | Not built | -- | -- | -- | Basic tracking (manual entry) |

### 2.6 Admin Services

| Service | Description | Current State (Mar 2026) | Pre-Pilot Target | Pilot 1 Target | Pilot 2 Target | Production Target |
|---------|-------------|--------------------------|------------------|----------------|----------------|-------------------|
| User management | View, create, enable/disable user accounts | Working (ISS-09 disable enforcement at auth layer) | + Bulk operations, CSV import | Live | + Role assignment UI, permission editor | + RBAC editor with custom roles |
| Activity monitoring | View platform activity logs | Working | + Filtering by user, action, time range | Live | + Real-time activity feed | + Alerting on anomalous patterns |
| Workflow tracking | Track and manage clinical workflows across facility | Working | Bug fixes | Live | + Custom workflow templates | + SLA monitoring per workflow step |
| Callback management | Admin dashboard for managing patient callbacks, scheduling, and follow-up | Not built | Basic callback log (spreadsheet/notes) | In-platform callback queue for admin ops staff | + Callback scheduling, auto-reminders, outcome tracking | Full callback CRM with analytics |
| Facility management | Configure facility settings, departments, operating hours | Not built | Basic config (single facility) | Live | + Multi-facility management | + Franchise model support |
| Reporting & analytics | Generate operational and clinical reports | Not built | -- | Basic reports (consultation volume, wait times) | + Scheduled reports (daily/weekly email) | + Custom dashboards, export to CSV/PDF |
| Audit trail | Immutable log of all clinical and admin actions | Not built | -- | Basic logging (consultation events) | + Searchable audit with filters | + Compliance export, tamper-proof storage |
| Billing & invoicing | Manage facility billing, generate invoices | Not built | -- | -- | Basic invoicing (manual generation) | + Auto-billing, recurring invoices, payment tracking |
| Staff scheduling | Manage employed doctor and admin ops schedules | Not built | Manual scheduling (spreadsheet) | Basic in-platform scheduling | + Shift management, availability calendar | + Auto-scheduling with demand prediction |

### 2.7 Platform Services (Cross-Cutting)

| Service | Description | Current State (Mar 2026) | Pre-Pilot Target | Pilot 1 Target | Pilot 2 Target | Production Target |
|---------|-------------|--------------------------|------------------|----------------|----------------|-------------------|
| Authentication & authorization | JWT-based auth, role guards, route protection, SSR safety | Working (ISS-01 through ISS-09 all resolved) | Hardened: rate limiting on login, MFA design | Stable, real-user tested | + MFA option for admin/doctor roles | + SSO / OAuth2, session management |
| Real-time messaging (WebSocket) | Live updates for queues, notifications, chat | Working (reconnection, error handling, heartbeat implemented) | Stress testing, connection pool tuning | Stable under Pilot 1 load | + Presence indicators, typing indicators | + Horizontal scaling, message persistence |
| AI services (Claude) | Triage chat, clinical decision support | Partial (API + basic UI) | Prompt engineering, safety guardrails, disclaimer framework | Beta with informed consent | + Multi-language experiment | + Clinical summaries, decision support |
| API gateway & rate limiting | Express rate limiting, health endpoints exempt (ISS-05) | Working (trust proxy=1, ISS-06 resolved) | API documentation (OpenAPI spec draft) | Stable | + API key management for partners | + Usage quotas, throttling tiers |
| Data encryption | TLS 1.2+ in transit, PostgreSQL encryption at rest | Working | Verify encryption config, SSL cert monitoring | Compliant for pilot | + Field-level encryption for PII | + Key rotation policy, annual audit |
| Backup & recovery | Database backups | Render automated daily | + Verification scripts, restore testing | + Point-in-time recovery verification | + Cross-region backup option | + RPO < 1hr, RTO < 30min, quarterly DR drills |
| Monitoring & alerting | Health checks (/api/healthz, /api/ready), structured logging | Working (ISS-05 rate-limit exempt) | + UptimeRobot external monitoring, structured log aggregation | Active monitoring with alerting | + APM (Sentry or Datadog), error tracking | + PagerDuty on-call rotation, incident playbooks |
| Internationalization (i18n) | Multi-language UI support | Not built | -- | English only | + Amharic UI strings (patient-facing) | + Swahili, Oromo; RTL readiness |
| Analytics & telemetry | Usage tracking, funnel analysis, operational metrics | Not built | -- | Basic event logging (consultation start/end, Rx issued) | + Mixpanel or PostHog integration | + Custom dashboards, cohort analysis |
| CDN & performance | Static asset delivery, caching, SSR optimization | Render default (ISS-02 SSR auth fix applied) | + Cache headers, asset fingerprinting | Stable | + Cloudflare CDN for static assets | + Edge caching, image optimization |
| Telecom / callback infrastructure | Phone systems, VoIP, call routing for admin-assisted operations | Not built | Admin phones provisioned (2 devices, ~$200-300 one-time) | Phone top-ups active ($30-60/mo), basic VoIP ($50-100/mo) | + Call center software ($50-100/mo), 4-6 devices | Full CRM-integrated telephony, call recording, analytics |

---

## 3. SLA Definitions by Phase

SLA tiers are progressive. Each phase builds on the commitments of the prior phase. Targets reflect the reality that Health Hub is an admin-assisted healthcare platform with part-time staff (all team members at ~4 hrs/day per params.md) and East African infrastructure constraints.

### 3.1 Tier 1: Pre-Pilot (Internal Testing -- 3-6 Months, 100-200 Users)

These are internal targets for the development team and early internal testers. No contractual commitments exist at this tier. The goal is to establish baselines and identify gaps before external exposure.

**Employed operations staff:** None (core team handles all testing and support internally).

| Metric | Target | Measurement Method | Escalation |
|--------|--------|--------------------|------------|
| **Uptime** | **96%** during business hours (Mon-Fri 08:00-18:00 EAT) | Render dashboard + UptimeRobot (free tier, 5-min checks) | Internal Slack/WhatsApp alert; developer investigation within 24hrs |
| API response time (p95) | < 2,000ms | Server-side structured logging (Express middleware) | Developer investigation within 48hrs |
| API response time (p99) | < 4,000ms | Structured logging | Logged, not escalated |
| Video call quality | Best-effort; calls connect and sustain 5+ minutes in test | Manual QA sessions (weekly) | Known limitation; documented for Pilot 1 planning |
| Video concurrent capacity | 2-3 simultaneous test calls | Daily.co free/starter tier | N/A |
| Data loss prevention | Daily automated backups (Render) | Render backup dashboard, weekly manual verification | Alert if backup missed |
| Critical bug fix (system down) | 48 hours from report to fix deployed | Internal issue tracker (GitHub Issues) | Escalate to Technical Head |
| Major bug fix (workflow broken) | 1 week from report | Internal issue tracker | Batched in weekly release cycle |
| Minor bug fix (UI/cosmetic) | 2 weeks from report | Internal issue tracker | Batched |
| Security incident response | Respond within 4 hours during business hours | Manual detection + structured logging review | Immediate team notification via WhatsApp |
| Support channel | Internal team only (WhatsApp group + GitHub Issues) | N/A | N/A |
| Planned maintenance window | Any time with 1-hour internal notice | Slack/WhatsApp announcement | N/A |
| Data privacy | TLS 1.2+ in transit; PostgreSQL encryption at rest; no patient data in logs | SSL cert check + log audit (monthly) | Immediate remediation |
| Callback operations | N/A (no external patients) | N/A | N/A |

### 3.2 Tier 2: Pilot 1 (First External Users -- 2-3 Months, Up to 1,000 Users)

These are commitments to pilot partner facilities (clinics, labs, pharmacies). Documented in the pilot partnership agreement but carrying no financial penalties. The admin-assisted model is live: 2 employed doctors, 2 admin ops staff, and 2 technical support staff (per params.md Section 4.2).

**Employed operations staff:** 2 doctors ($1,440/mo) + 2 admin ops ($434/mo) + 2 tech support ($602/mo) = ~$2,482/mo total.

| Metric | Target | Measurement Method | Escalation |
|--------|--------|--------------------|------------|
| **Uptime** | **97%** (measured monthly, excluding planned maintenance) | UptimeRobot (1-minute checks) + Render metrics | WhatsApp alert to facility liaison within 30 min of confirmed outage |
| API response time (p95) | < 1,500ms | Structured logging with percentile calculation | Investigate within 12 hours |
| API response time (p99) | < 3,000ms | Structured logging | Investigate within 24 hours |
| Video call quality | 720p minimum for Addis Ababa users, < 200ms p95 latency | Daily.co analytics dashboard | Known limitation outside Addis; audio-only fallback |
| Video concurrent capacity | 5-10 simultaneous calls | Daily.co paid starter plan ($50-100/mo per params.md) | Queue patients if at capacity; admin calls to reschedule |
| Data loss prevention | Automated daily backups + weekly manual verification | Render backup dashboard + verification script | RPO: 24 hours |
| Critical bug fix (system down) | 24 hours from report to fix deployed | GitHub Issues + direct WhatsApp escalation | Direct call to Technical Head |
| Major bug fix (workflow broken) | 72 hours from report | GitHub Issues | Included in next scheduled release |
| Minor bug fix (UI/cosmetic) | 2 weeks from report | GitHub Issues | Batched |
| Security incident response | Respond within 2 hours; contain within 12 hours; resolve within 24 hours | UptimeRobot + manual reporting + structured log review | Immediate team + facility admin notification |
| Support hours | Mon-Fri 08:00-18:00 EAT (covered by 2 tech support staff) | WhatsApp group + email + in-app feedback | After-hours: emergency WhatsApp only (Technical Head) |
| Support response time | < 4 hours during support hours | WhatsApp/email timestamps | Escalate to Technical Head if > 4hrs |
| Callback response time | Patient callback within 2 hours of consultation request (during business hours) | Admin ops log in platform | Escalate to Founding Member 1 if > 2hrs |
| Doctor availability | Minimum 1 employed doctor available Mon-Fri 08:00-18:00 EAT | Shift schedule (2 doctors, split shifts) | Partner GP backup if both unavailable |
| User onboarding | Guided setup for each facility (in-person or video call) | Onboarding checklist completion | Complete within 1 week of facility go-live |
| Data privacy | Patient data encrypted in transit (TLS 1.2+) and at rest; no data sharing without consent | SSL cert monitoring + DB config audit (monthly) | Immediate remediation of any gap |
| Planned maintenance | Saturdays 02:00-06:00 EAT with 48-hour email notice to facility admins | Email notification | Reschedule if facility objects |
| Service credits | None (pilot phase; no financial penalties) | N/A | N/A |

### 3.3 Tier 3: Pilot 2 (Broader Validation -- 3-13 Months, 5,000-10,000 Users)

Tighter commitments reflecting a growing user base, real revenue generation (params.md: $500-3,000/mo), and expanded admin-assisted operations. Service credits may apply for sustained outages on facility platform fees.

**Employed operations staff:** 4 doctors ($2,880/mo) + 4 admin ops ($868/mo) + 2 tech support ($602/mo) = ~$4,361/mo total.

| Metric | Target | Measurement Method | Escalation |
|--------|--------|--------------------|------------|
| **Uptime** | **98.2%** (measured monthly) | UptimeRobot + Render metrics + APM tool | Auto-alert within 5 min; status page update within 15 min |
| API response time (p95) | < 1,000ms | APM tool (Sentry or Datadog) | Auto-alert if sustained > 1,000ms for 5 min |
| API response time (p99) | < 2,500ms | APM tool | Investigation within 4 hours |
| Video call quality | 720p guaranteed, < 150ms p95 latency, < 1% packet loss | Daily.co analytics + custom QoS monitoring | Auto-fallback to 480p, then audio-only |
| Video concurrent capacity | 20 simultaneous calls | Daily.co paid plan ($100-200/mo per params.md) | Queuing system if at capacity; admin ops staff manage overflow |
| Data loss prevention | Automated backups every 6 hours; point-in-time recovery tested | Render + custom backup verification + quarterly restore test | RPO: 6 hours; RTO: 2 hours |
| Critical bug fix (system down) | 12 hours from report to mitigation deployed | GitHub Issues + PagerDuty (or equivalent) | On-call developer paged; incident commander assigned |
| Major bug fix (workflow broken) | 48 hours from report | GitHub Issues + sprint prioritization | Pulled into current sprint |
| Minor bug fix (UI/cosmetic) | 1 week from report | GitHub Issues | Next sprint |
| Security incident response | Respond within 1 hour; contain within 4 hours; resolve within 24 hours | Automated log-based detection + manual reporting | Incident commander + facility notification within 2 hours |
| Support hours | Mon-Sat 07:00-20:00 EAT (2 tech support staff, staggered shifts) | WhatsApp + email + in-app help desk | Sunday: emergency WhatsApp only |
| Support response time | < 2 hours during support hours | Ticketing system (basic CRM, $50-100/mo per params.md) | Auto-escalate if > 2hrs |
| Callback response time | Patient callback within 1 hour of consultation request (during support hours) | Admin ops platform log + CRM | Escalate to shift supervisor if > 1hr |
| Doctor availability | Minimum 2 employed doctors available during 2-shift coverage (07:00-22:00 EAT) | Shift schedule (4 doctors, 2 per shift) | Admin ops staff triage and reschedule if gap |
| Admin ops coverage | 4 admin ops staff covering Mon-Sat 07:00-20:00 EAT for callbacks, fulfilment, exceptions | Shift schedule + CRM activity log | Escalate to Founding Member 1 for coverage gaps |
| Data privacy | HIPAA-equivalent controls; encryption at rest and in transit; access logging | Quarterly security self-audit | Immediate remediation; facility notification for any breach |
| Planned maintenance | Sundays 02:00-05:00 EAT with 72-hour notice via email + in-app banner | Email + in-app notification | Max 4 hours total planned downtime/month |
| **Service credits** | **5% monthly facility fee credit per 0.1% below 98.2% uptime target** | Automated calculation from UptimeRobot data | Cap at 25% of monthly facility fee |

### 3.4 Tier 4: Production (Full Launch -- 4-12 Months, Full Scale)

Enterprise-grade commitments with contractual SLA penalties. Full admin-assisted operations with near-24/7 coverage. All monitoring, incident management, and escalation tooling in place.

**Employed operations staff:** 6 doctors ($4,320/mo) + 6 admin ops ($1,302/mo) + 3 tech support ($903/mo) = ~$6,542/mo total (Production Readiness per params.md; scales to 8-10 doctors + 8 admin + 4 tech support for full Production).

| Metric | Target | Measurement Method | Escalation |
|--------|--------|--------------------|------------|
| **Uptime** | **99.2%** (measured monthly) | Multi-probe monitoring (UptimeRobot + Datadog Synthetics) | Auto-alert within 2 min; public status page update within 5 min |
| API response time (p95) | < 500ms | Datadog APM with distributed tracing | Auto-scale trigger at 80% capacity threshold |
| API response time (p99) | < 1,500ms | Datadog APM | Investigation within 2 hours; root cause analysis within 24hrs |
| Video call quality | 1080p available, 720p guaranteed, < 100ms p95 latency, < 0.5% packet loss | Daily.co analytics + custom QoS dashboard | Auto-fallback cascade: 1080p -> 720p -> 480p -> audio-only |
| Video concurrent capacity | 50+ simultaneous calls (scaling to 100+) | Daily.co scale plan ($200-400/mo per params.md) | Load balancing; admin ops overflow management |
| Data loss prevention | Continuous WAL replication; cross-region backup option | Multi-region PostgreSQL + WAL archival + monthly restore drill | RPO: 1 hour; RTO: 30 minutes |
| Critical bug fix (P0: system down) | 4 hours to mitigate; 24 hours to full resolution | PagerDuty + incident management platform | Incident commander + war room; post-mortem within 48hrs |
| Major bug fix (P1: workflow broken) | 24 hours to mitigate | Sprint prioritization | Pulled into current sprint immediately |
| Minor bug fix (P2: degraded experience) | 1 week | Standard backlog | Next sprint |
| Low priority (P3: cosmetic/enhancement) | 2 weeks | Standard backlog | Batched |
| Security incident response | Respond within 30 min; contain within 2 hours; resolve within 12 hours | SIEM + automated anomaly detection + manual reporting | Security lead + legal notification; facility and regulator notification per policy |
| Support hours | **24/7 for critical issues**; Mon-Sat 06:00-22:00 EAT for standard (3 tech support, 3-shift rotation) | Multi-channel: in-app, phone, email, WhatsApp | Tiered escalation matrix with management notification |
| Support response time | < 15 min critical; < 1 hour major; < 4 hours minor | Ticketing system SLA tracking | Auto-escalate with management notification at each threshold |
| Callback response time | Patient callback within 30 min of consultation request (during operating hours) | CRM + call center software with SLA tracking | Auto-escalate to shift supervisor at 20 min; to operations lead at 30 min |
| Doctor availability | **3-shift near-24/7 coverage** (6 doctors minimum; scaling to 8-10) | Automated shift management + availability dashboard | Backup doctor roster; admin triage if no doctor available within 15 min |
| Admin ops coverage | 6 admin ops staff covering 3 shifts for near-24/7 callback, fulfilment, and exception handling | CRM activity log + shift management | Escalate coverage gaps to operations lead |
| Data privacy | Full regulatory compliance: Ethiopia FDRE data protection law, Kenya DPA 2019 | Annual third-party security audit + continuous monitoring | Legal and compliance team involvement; mandatory breach notification |
| Planned maintenance | Zero-downtime deployments preferred; maintenance windows only for major database migrations | Blue-green deployment; pre-announced windows (1 week notice) | Max 2 hours planned downtime/month |
| **Service credits** | **10% monthly fee credit per 0.1% below 99.2% uptime target** | Automated calculation + monthly SLA report to facility admins | Cap at 50% of monthly fee; credited on next invoice |
| Disaster recovery | Full DR plan tested quarterly; documented recovery procedures | Quarterly DR drill with documented results | RTO: 30 min; RPO: 1 hour; DR drill report shared with enterprise clients |

### 3.5 SLA Progression Summary

| Metric | Pre-Pilot (Tier 1) | Pilot 1 (Tier 2) | Pilot 2 (Tier 3) | Production (Tier 4) |
|--------|--------------------|--------------------|--------------------|--------------------|
| Uptime target | 96% (business hours) | 97% (monthly) | 98.2% (monthly) | 99.2% (monthly) |
| Max monthly downtime | ~29 hrs (biz hrs only) | ~22 hrs | ~13 hrs | ~5.8 hrs |
| API p95 response | < 2,000ms | < 1,500ms | < 1,000ms | < 500ms |
| API p99 response | < 4,000ms | < 3,000ms | < 2,500ms | < 1,500ms |
| Video quality floor | Best-effort | 720p (urban) | 720p (guaranteed) | 720p (guaranteed), 1080p available |
| Video latency (p95) | Unmeasured | < 200ms | < 150ms | < 100ms |
| Video concurrent | 2-3 (test) | 5-10 | 20 | 50-100+ |
| Critical bug fix | 48 hrs | 24 hrs | 12 hrs | 4 hrs mitigate / 24 hrs resolve |
| Major bug fix | 1 week | 72 hrs | 48 hrs | 24 hrs |
| Security incident response | 4 hrs | 2 hrs | 1 hr | 30 min |
| Support hours | Internal only | Mon-Fri 08-18 EAT | Mon-Sat 07-20 EAT | 24/7 critical; Mon-Sat 06-22 standard |
| Support response | N/A | < 4 hrs | < 2 hrs | < 15 min (critical) |
| Callback SLA | N/A | < 2 hrs | < 1 hr | < 30 min |
| Doctor coverage | N/A | 1 doctor (biz hrs) | 2 doctors (2 shifts) | 3+ doctors (3 shifts, near-24/7) |
| Admin ops staff | 0 | 2 | 4 | 6 (scaling to 8) |
| Service credits | None | None | 5% per 0.1% miss (cap 25%) | 10% per 0.1% miss (cap 50%) |
| Data privacy | Basic encryption | TLS + at-rest | HIPAA-equivalent | Full regulatory compliance + annual audit |
| Maintenance windows | Anytime (1hr notice) | Sat 02-06 EAT (48hr notice) | Sun 02-05 EAT (72hr notice) | Zero-downtime preferred (1wk notice) |

---

## 4. Partner and User Expectations

Health Hub's admin-assisted model requires active cooperation from all participants. This section defines what Health Hub requires from each partner category, organized by phase.

### 4.1 Pilot Facilities (Clinics, Labs, Pharmacies)

| Expectation | Details | Phase Introduced | Ongoing Through |
|-------------|---------|------------------|-----------------|
| **Dedicated liaison** | Assign one staff member as primary Health Hub contact for issue reporting, feedback, and coordination | Pilot 1 | Production |
| **Testing participation** | Minimum 2 hours/week of active platform usage by facility staff during pilot | Pilot 1 | Pilot 2 |
| **Feedback sessions** | Bi-weekly 30-minute video or phone calls to review issues, priorities, and workflow fit | Pilot 1 | Pilot 2 |
| **Data quality commitment** | Enter accurate patient and clinical data; no test data in production environment | Pilot 1 | Production |
| **Internet connectivity** | Minimum 5 Mbps stable connection for video consultations; 2 Mbps for text/chat workflows | Pilot 1 | Production |
| **Device requirements** | Modern browser (Chrome 90+, Safari 14+) on desktop/laptop; Android 10+ for mobile | Pilot 1 | Production |
| **Staff training completion** | All staff who will use the platform must complete Health Hub onboarding training (provided by Health Hub; ~2 hours) | Pilot 1 | Production |
| **Issue reporting discipline** | Report bugs and usability issues within 24 hours via designated channel (WhatsApp group or in-app) | Pilot 1 | Production |
| **Regulatory compliance** | Maintain valid medical licenses, facility registrations, and pharmacy permits as applicable | All phases | Production |
| **Data migration cooperation** | Provide structured historical data (CSV/spreadsheet) if migrating from existing paper or digital systems | Pilot 2 | Production |
| **Callback cooperation** | Respond to Health Hub admin ops staff calls within 1 hour during operating hours (for prescription fulfilment, lab coordination, patient routing) | Pilot 1 | Production |
| **Operating hour alignment** | Communicate operating hours and closures to Health Hub at least 1 week in advance; update platform availability calendar | Pilot 1 | Production |
| **Payment integration readiness** | Register for M-Pesa/Telebirr merchant accounts (for pharmacies) or provide bank details for settlement | Pilot 2 | Production |

### 4.2 Patients

| Expectation | Details | Phase Introduced |
|-------------|---------|------------------|
| **Informed consent** | Provide informed consent for platform participation, data handling, and telemedicine consultation (digital consent form) | Pilot 1 |
| **Accurate personal and medical information** | Enter truthful personal details, medical history, and symptoms; inaccurate information may compromise clinical safety | Pilot 1 |
| **Callback availability** | Be reachable at the provided phone number for admin ops callbacks within 2 hours of consultation request (during operating hours) | Pilot 1 |
| **Feedback participation** | Complete monthly satisfaction surveys (< 3 minutes) during pilot phases | Pilot 1 |
| **Bug reporting** | Report technical issues via in-app feedback button or WhatsApp support channel | Pilot 1 |
| **Device requirements** | Android 10+ with Chrome browser (web), or Android APK when available; desktop: any modern browser | Pilot 1 |
| **Internet connectivity** | Minimum 2 Mbps for text/chat consultations; 5 Mbps for video consultations | Pilot 1 |
| **Payment readiness** | Have active M-Pesa/Telebirr account (Ethiopia) or debit/credit card for consultations and prescriptions | Pilot 2 |
| **Appointment adherence** | Show up for scheduled consultations (video/audio) within 10 minutes of scheduled time; notify via app if unable to attend | Pilot 2 |

### 4.3 Technology Vendors

| Vendor | Service | SLA Expected from Vendor | Health Hub Fallback | Phase Relevant |
|--------|---------|--------------------------|---------------------|----------------|
| **Daily.co** | Video consultation infrastructure (TURN/STUN servers, room management, recording) | 99.9% API uptime; < 200ms global media relay latency; support response < 4hrs | Audio-only phone consultation via admin callback; reschedule video | Pilot 1+ |
| **Render** | Hosting (web service, PostgreSQL, environment management, automated backups) | 99.95% platform uptime; automated daily backups; zero-downtime deploys | Manual deployment to backup environment; local backup restoration scripts | All phases |
| **Stripe** | Card payment processing (international cards, subscription billing) | 99.99% API uptime; PCI-DSS Level 1 compliance | Offline payment recording; admin manual reconciliation; M-Pesa/Telebirr as primary | Pilot 2+ |
| **M-Pesa (Safaricom)** | Mobile money payments -- Kenya market | 99.5% API availability (per Safaricom SLA) | Alternative payment prompt; admin manual payment recording | Pilot 2+ (Kenya) |
| **Telebirr (Ethio Telecom)** | Mobile money payments -- Ethiopia market (40M+ users per params.md) | API availability per Ethio Telecom published SLA | Cash payment option at partner pharmacy/clinic; admin records manually | Pilot 1+ (Ethiopia) |
| **Anthropic (Claude API)** | AI triage chat, clinical decision support prompts | API availability per Anthropic published SLA | Graceful degradation to static symptom checklist; human triage queue via admin callback | Pilot 1+ |
| **SendGrid** | Transactional email delivery (notifications, reports, password reset) | 99.95% email delivery uptime | In-app notification fallback; SMS backup via Africa's Talking | Pilot 1+ |
| **Africa's Talking** | SMS delivery for notifications, OTP, appointment reminders | 95% delivery within 30 seconds | In-app notification fallback; email backup; admin phone call for critical messages | Pilot 1+ |
| **UptimeRobot** | External uptime monitoring and alerting | 99.9% monitoring uptime | Secondary monitoring via Render health checks + manual checks | Pre-Pilot+ |

### 4.4 Regulators

| Expectation from Regulators | Details | Relevant Body | Phase Critical |
|-----------------------------|---------|---------------|----------------|
| **Timely guidance on digital health requirements** | Published rules or guidance on what constitutes a compliant telemedicine platform in Ethiopia | Ethiopia Ministry of Health (MoH), Ethiopian Food and Drug Authority (EFDA) | Pre-Pilot (for compliance design) |
| **Registration process clarity** | Defined, accessible process for health technology company / platform registration | Ethiopia Investment Commission; Kenya ICT Authority | Pilot 1 (for legal operation) |
| **Data protection rules** | Published regulations on patient data handling, storage location, cross-border transfer, and breach notification | FDRE Information Network Security Administration (Ethiopia); Office of the Data Protection Commissioner (Kenya, DPA 2019) | Pilot 1+ |
| **Telemedicine licensing framework** | Clear requirements for platforms facilitating remote medical consultations, including employed vs. contracted doctor models | Medical practitioners' licensing bodies (Ethiopia Medical Board; Kenya Medical Practitioners and Dentists Council) | Pilot 1+ |
| **Digital payment approval** | Regulatory clearance for collecting healthcare payments via mobile money and card processing | National Bank of Ethiopia; Central Bank of Kenya | Pilot 2 (for revenue collection) |
| **Pharmacy regulation alignment** | Rules on digital prescription transmission, remote dispensing coordination, and cross-pharmacy routing | Respective pharmacy boards | Pilot 2+ |

---

## 5. Scenario Impact on Services

This section maps how each of the 21 scenario combinations (from params.md Section 15) affects service depth and availability. The admin-assisted model means that service availability depends on both technology readiness and operational staffing, which in turn depends on funding level.

### 5.1 Service Tier Definitions

| Tier | Label | Services Included | Staffing Required |
|------|-------|-------------------|-------------------|
| T1 | **Core** | Patient registration, GP queue, basic chat, prescription viewing, admin user management, platform auth | 0 employed staff (founders handle) |
| T2 | **Extended** | T1 + specialist referrals, pharmacy claim/dispense, email notifications, admin-assisted callbacks (manual) | 2 doctors + 2 admin ops + 2 tech support |
| T3 | **Full** | T2 + video consultations, diagnostics/lab, M-Pesa/Telebirr payments, SMS notifications, PWA/APK, AI triage, admin dashboards | 4 doctors + 4 admin ops + 2 tech support |
| T4 | **Enterprise** | T3 + multi-facility admin, i18n (Amharic/Swahili), advanced analytics, API marketplace, multi-country, iOS app, EHR integrations | 6+ doctors + 6+ admin ops + 3+ tech support |

### 5.2 Scenario 1: Fully Self-Funded (3 Combinations)

No external investment. All costs borne by founders. Technology budget and operational staffing are constrained by self-funding level.

| Combo | Our Level | Pre-Pilot | Pilot 1 | Pilot 2 | Production | Notes |
|-------|-----------|-----------|---------|---------|------------|-------|
| **S1-L1** | Bootstrapped | T1 (Core) | T1+ (Core + specialist referrals) | T2 (Extended) | T2+ (Extended + basic video) | Video deferred to Pilot 2; no employed doctors until Pilot 2; admin callbacks by founders only; mobile limited to PWA; no live payments until Production |
| **S1-L2** | Ideal | T1+ (Core + scaffolds) | T2 (Extended + basic video) | T3 (Full) | T3+ (Full - i18n) | Video at Pilot 1 with 5 concurrent; employed staff from Pilot 1; M-Pesa live at Production; Android APK at Production |
| **S1-L3** | Fully Funded | T2 (Extended + video test) | T2+ (Extended + video + AI beta) | T3 (Full) | T4- (Enterprise - multi-country) | Fastest self-funded path; full employed staff ladder from Pilot 1; all core services by Pilot 2; enterprise features (minus multi-country) at Production |

#### S1 Service Availability Detail

| Service | S1-L1 Pilot 1 | S1-L1 Production | S1-L2 Pilot 1 | S1-L2 Production | S1-L3 Pilot 1 | S1-L3 Production |
|---------|---------------|------------------|---------------|------------------|---------------|------------------|
| GP consultation | Yes | Yes | Yes | Yes | Yes | Yes |
| Admin callbacks | Founder-only | 2 admin ops | 2 admin ops | 4 admin ops | 2 admin ops | 6 admin ops |
| Employed doctors | No | 2 | 2 | 4 | 2 | 6 |
| Video consult | No | Basic (1:1) | Basic (5 concurrent) | 20 concurrent | 10 concurrent | 50+ concurrent |
| Specialist referral | Basic | Full | Full | Full + analytics | Full | Full + auto-routing |
| Pharmacy dispense | Lookup only | Claim + dispense | Claim + dispense | Full + M-Pesa | Full | Full + POS |
| Diagnostics/lab | No | Basic | Basic | Full | Full | Full + LIMS-lite |
| M-Pesa/Telebirr | No | Sandbox | Sandbox | Live | Live | Live + reconciliation |
| Android APK | No | PWA only | PWA | APK on Play Store | PWA | APK + auto-update |
| AI triage | No | No | Beta | Full | Beta | Full + multi-lang |
| i18n (Amharic) | No | No | No | No | No | Yes |
| Multi-facility | No | No | No | No | No | Basic |

### 5.3 Scenario 2: Investor at Pilot 1-to-Pilot 2 Transition (9 Combinations)

Self-funded through Pilot 1; investor capital arrives at the Pilot 1-to-Pilot 2 transition. Pre-investor phase mirrors S1 at the corresponding "Our Level." Post-investor phase accelerates based on "Investor Level."

| Combo | Our Level | Investor Level | Pre-Pilot | Pilot 1 | Pilot 2 | Production | Transition Impact |
|-------|-----------|----------------|-----------|---------|---------|------------|-------------------|
| **S2-O1-I1** | Bootstrapped | Bootstrapped | T1 | T1+ | T2 | T2+ | Minimal; investor adds financial runway but not service transformation |
| **S2-O1-I2** | Bootstrapped | Ideal | T1 | T1+ | T3 | T3+ | Strong; $75K-equivalent enables full service catalog jump at Pilot 2 |
| **S2-O1-I3** | Bootstrapped | Fully Funded | T1 | T1+ | T3+ | T4 | Maximum; risk of executing on limited Pilot 1 feedback |
| **S2-O2-I1** | Ideal | Bootstrapped | T1+ | T2 | T2+ | T3 | Marginal; L2 already on good trajectory; modest investor extends runway |
| **S2-O2-I2** | Ideal | Ideal | T1+ | T2 | T3 | T4- | **Recommended path**: solid Pilot 1 foundation + efficient Pilot 2 expansion |
| **S2-O2-I3** | Ideal | Fully Funded | T1+ | T2 | T4- | T4 | Aggressive; enables enterprise features and multi-country prep |
| **S2-O3-I1** | Fully Funded | Bootstrapped | T2 | T2+ | T3 | T3+ | Redundant; L3 self-funding already achieves strong coverage |
| **S2-O3-I2** | Fully Funded | Ideal | T2 | T2+ | T3+ | T4 | Moderate acceleration of enterprise features |
| **S2-O3-I3** | Fully Funded | Fully Funded | T2 | T2+ | T4 | T4+ | Maximum acceleration; multi-country by Production |

### 5.4 Scenario 3: Investor Right After Pilot 1 (9 Combinations)

Self-funded through Pilot 1 completion; investor capital arrives immediately after. Capital starts working 2-3 months earlier than S2, enabling better-planned Pilot 2.

| Combo | Our Level | Investor Level | Pre-Pilot | Pilot 1 | Pilot 2 | Production | Transition Impact |
|-------|-----------|----------------|-----------|---------|---------|------------|-------------------|
| **S3-O1-I1** | Bootstrapped | Bootstrapped | T1 | T1+ | T2 | T2+ | Similar to S2-O1-I1; earlier investor means slightly better Pilot 2 planning |
| **S3-O1-I2** | Bootstrapped | Ideal | T1 | T1+ | T3 | T3+ | Strong; earlier capital means Pilot 2 starts at full speed |
| **S3-O1-I3** | Bootstrapped | Fully Funded | T1 | T1+ | T4- | T4 | Maximum; earlier deployment of capital; still limited by thin Pilot 1 data |
| **S3-O2-I1** | Ideal | Bootstrapped | T1+ | T2 | T2+ | T3 | Modest benefit; primarily financial cushion |
| **S3-O2-I2** | Ideal | Ideal | T1+ | T2 | T3+ | T4- | **Optimal early-investor path**: validated Pilot 1 product + well-timed capital |
| **S3-O2-I3** | Ideal | Fully Funded | T1+ | T2 | T4- | T4 | Rapid enterprise buildout from strong foundation |
| **S3-O3-I1** | Fully Funded | Bootstrapped | T2 | T2+ | T3 | T3+ | Negligible service impact; $25K adds cushion only |
| **S3-O3-I2** | Fully Funded | Ideal | T2 | T2+ | T4- | T4 | Accelerates enterprise features by 2-3 months vs S1-L3 |
| **S3-O3-I3** | Fully Funded | Fully Funded | T2 | T2+ | T4 | T4+ | **Fastest possible path**: enterprise multi-country platform by M7-M8 |

### 5.5 Operational Staffing by Scenario at Pilot 2

The admin-assisted model means service depth depends on staffing, which depends on funding. This table shows the employed operations team achievable at Pilot 2 entry for each scenario group.

| Scenario Group | Effective Funding at Pilot 2 | Doctors | Admin Ops | Tech Support | Monthly Ops Cost | Service Tier Achievable |
|----------------|------------------------------|---------|-----------|-------------|-----------------|------------------------|
| S1-L1, S2-O1-I1, S3-O1-I1 | Bootstrapped equivalent | 0-1 | 0-1 | 1 | $0-1,000 | T2 (Extended, limited callbacks) |
| S1-L2, S2-O2-I1, S3-O2-I1, S2-O1-I2 | Ideal equivalent | 2 | 2 | 2 | ~$2,482 | T2+ to T3- (approaching Full) |
| S1-L3, S2-O3-I1, S3-O3-I1, S2-O2-I2, S3-O2-I2, S2-O1-I3, S3-O1-I2 | Fully Funded or better | 4 | 4 | 2 | ~$4,361 | T3 (Full) |
| S2-O3-I2, S3-O3-I2, S2-O2-I3, S3-O2-I3, S2-O1-I3, S3-O1-I3 | Well above Fully Funded | 4-6 | 4-6 | 2-3 | $4,361-6,542 | T3+ to T4- (approaching Enterprise) |
| S2-O3-I3, S3-O3-I3 | Maximum | 6+ | 6+ | 3+ | $6,542+ | T4 (Enterprise) |

### 5.6 SLA Tier Achievable by Scenario at Each Phase

The SLA tier a combination can support depends on whether monitoring, staffing, and infrastructure investments have been made. Lower-funded combinations may remain at a lower SLA tier longer.

| Combo Group | Pre-Pilot SLA | Pilot 1 SLA | Pilot 2 SLA | Production SLA | Notes |
|-------------|---------------|-------------|-------------|----------------|-------|
| L1/O1-I1 combos (bootstrapped throughout) | Tier 1 (96%) | Tier 1+ (96-97%) | Tier 2 (97%) | Tier 2+ (97-98%) | Cannot afford APM tooling or on-call; SLA remains at Pilot 1 level through Pilot 2 |
| L2/moderate combos | Tier 1 (96%) | Tier 2 (97%) | Tier 3 (98.2%) | Tier 3+ (98.2-99%) | Full SLA progression; monitoring tooling in place by Pilot 2 |
| L3/well-funded combos | Tier 1 (96%) | Tier 2 (97%) | Tier 3 (98.2%) | Tier 4 (99.2%) | Full SLA progression on schedule; enterprise tooling at Production |
| Maximum combos (O3-I3) | Tier 1 (96%) | Tier 2+ (97-98%) | Tier 3+ (98.2-99%) | Tier 4 (99.2%) | Can afford to over-invest in monitoring early; may exceed tier targets |

---

## 6. Service Roadmap

### 6.1 Core Service GA Timeline by Representative Combination

The following table shows the target month when each key service becomes generally available (GA) -- meaning live, monitored, and covered by the phase-appropriate SLA. Month 0 is project start. Timelines are derived from params.md phase definitions and the effort/cost models.

| Service | S1-L1 | S1-L2 | S1-L3 | S2-O2-I2 | S3-O2-I2 | S3-O3-I3 |
|---------|-------|-------|-------|-----------|-----------|-----------|
| Patient registration & login | M0 | M0 | M0 | M0 | M0 | M0 |
| GP consultation queue | M0 | M0 | M0 | M0 | M0 | M0 |
| GP prescription issuance | M0 | M0 | M0 | M0 | M0 | M0 |
| **Admin-assisted callbacks** | M6 (founder-only) | M3 (2 admin) | M3 (2 admin) | M3 (2 admin) | M3 (2 admin) | M3 (2 admin) |
| **Employed doctor on roster** | M9 (1 doctor) | M3 (2 doctors) | M3 (2 doctors) | M3 (2 doctors) | M3 (2 doctors) | M3 (2 doctors) |
| Specialist referral workflow | M5 | M3 | M2 | M3 | M3 | M2 |
| Pharmacy claim & dispense | M6 | M3 | M2 | M3 | M3 | M2 |
| Video consultation (1:1) | M10 | M4 | M3 | M4 | M4 | M3 |
| Video consultation (20+ concurrent) | M18+ | M10 | M7 | M8 | M8 | M6 |
| AI health triage chat | M14 | M7 | M4 | M7 | M6 | M4 |
| Diagnostics / lab orders | M11 | M6 | M5 | M6 | M6 | M5 |
| M-Pesa/Telebirr (sandbox) | M12 | M7 | M5 | M7 | M6 | M5 |
| M-Pesa/Telebirr (live) | M17+ | M10 | M8 | M9 | M8 | M7 |
| PWA / mobile install prompt | M14 | M7 | M5 | M7 | M6 | M5 |
| Android APK (Play Store) | M20+ | M11 | M8 | M9 | M9 | M7 |
| Email notifications (SendGrid) | M7 | M4 | M3 | M4 | M4 | M3 |
| SMS notifications (Africa's Talking) | M15 | M8 | M5 | M7 | M7 | M5 |
| Push notifications (FCM) | M18+ | M10 | M7 | M8 | M8 | M6 |
| **Admin callback CRM/ticketing** | M16+ | M8 | M5 | M7 | M7 | M5 |
| **Call center software** | -- | M10 | M7 | M8 | M8 | M6 |
| i18n -- Amharic | M20+ | M13 | M9 | M10 | M9 | M6 |
| i18n -- Swahili | -- | M16+ | M11 | M13 | M11 | M8 |
| Admin analytics dashboard | M18+ | M11 | M8 | M9 | M8 | M6 |
| Multi-facility admin | -- | M15+ | M11 | M11 | M10 | M7 |
| API marketplace / B2B | -- | M20+ | M14 | M14 | M12 | M9 |
| Kenya market launch | -- | -- | M17+ | M16+ | M14 | M10 |
| **Near-24/7 doctor coverage (6 docs)** | -- | M14 | M10 | M10 | M9 | M7 |
| **Full admin ops (6 staff)** | -- | M14 | M10 | M10 | M9 | M7 |

### 6.2 Phase Transition Service Gates

Each phase transition requires specific service milestones to be met before advancing. These gates protect against premature scaling.

| Gate | Required Services (Must Be GA) | Required Staffing | Required SLA Tier |
|------|-------------------------------|-------------------|-------------------|
| **Pre-Pilot -> Pilot 1** | Patient registration, GP queue, specialist referrals, pharmacy basic, auth hardened, WebSocket stable, callback SOP completed, admin phones provisioned | 2 doctors + 2 admin ops + 2 tech support hired and trained | Tier 1 baselines met for 2 consecutive weeks |
| **Pilot 1 -> Pilot 2** | All Pilot 1 services stable under real load, video consultation working (1:1), basic diagnostics live, email notifications active, callback process validated with real patients, at least 1 partner facility onboarded | Staffing ladder to 4 doctors + 4 admin ops + 2 tech support | Tier 2 targets met for 1 full month |
| **Pilot 2 -> Production** | Full service catalog (T3) live, M-Pesa/Telebirr live, Android APK on Play Store, APM monitoring active, incident management process tested, admin callback CRM operational, quarterly DR drill completed | Staffing ladder to 6 doctors + 6 admin ops + 3 tech support | Tier 3 targets met for 2 consecutive months |

### 6.3 Representative Combination Profiles

**Six decision-relevant combinations** (matching params.md analysis):

**S1-L1 (Worst case -- bootstrapped minimum)**
- Slowest path. Core services only at Pilot 1. Video, payments, and mobile delayed 6-12 months beyond ideal. No employed operations staff until Pilot 2 at earliest. Admin callbacks handled exclusively by founders. Revenue must begin by M12 to sustain operations. Production-grade SLAs likely not achievable within 24 months.

**S1-L2 (Self-funded ideal -- the baseline plan)**
- Balanced pacing. Extended services at Pilot 1 (video, referrals, pharmacy). Full employed staff ladder active from Pilot 1. Full service catalog (T3) by Pilot 2. Production by M10-M12 with near-complete feature set. English-only limitation persists through Production; i18n follows.

**S1-L3 (Self-funded maximum -- best case without investors)**
- Fastest self-funded path. Extended services plus video and AI triage at Pilot 1. Full service catalog by Pilot 2 (M5-M7). Enterprise features (minus multi-country) achievable at Production (M8-M10). Reaches feature parity with moderately-invested scenarios without dilution.

**S2-O2-I2 (Recommended investor path -- Pilot 2 transition)**
- Solid Pilot 1 foundation with video proves product-market fit. Investment at Pilot 2 transition enables rapid expansion to full catalog. Clear path to Production in M9-M11. Recommended for investor conversations: demonstrates validated product before capital deployment.

**S3-O2-I2 (Recommended early-investor path -- post-Pilot 1)**
- Optimal early-investor combination. Validated Pilot 1 product + well-timed capital creates efficient Pilot 2 buildout. Investor benefits from seeing real usage data. 1-2 months faster to Production than S2-O2-I2. De-risks the critical Pilot 2 phase by having capital in place before it begins.

**S3-O3-I3 (Maximum acceleration -- best case with investors)**
- Fastest possible path to enterprise multi-country platform (Production by M7-M8). Full staffing ladder from Pilot 1. All services including i18n, multi-facility, and API marketplace within 10 months. Risk: may outpace East African market readiness and absorptive capacity. Best suited when confirmed multi-facility demand exists pre-investment.

### 6.4 Critical Path Services

Certain services gate multiple downstream capabilities. Delays in these critical-path items cascade across the service catalog:

| Critical Path Service | Blocks | Impact of 1-Month Delay |
|----------------------|--------|-------------------------|
| Auth hardening (ISS-01 through ISS-09) | All external-facing services | Pilot 1 delayed 1 month; all downstream phases shift |
| Daily.co video integration | Video consultation for patients, GPs, specialists; care coordination | Pilot 1 downgrades to chat-only; reduces perceived value for facility partners |
| M-Pesa/Telebirr integration | Revenue collection, pharmacy payments, consultation fees | Revenue start delayed; extends burn runway requirement by 1-2 months |
| Android APK delivery (480 hrs) | Mobile patient experience; Play Store presence; push notifications | Patient acquisition limited to web; urban-only reach (desktop/laptop users) |
| Admin callback SOP + staffing | Admin-assisted consultation flow, exception handling, manual fulfilment | Core operating model not functional; reverts to pure self-service (not the v2 model) |
| DB schema stability (ISS-03, ISS-04) | All API endpoints; GP queue; admin user management | All backend services unreliable; blocks Pilot 1 entirely |

---

## 7. Key Takeaways

### 7.1 The Admin-Assisted Model Changes Everything

Unlike v1 (which modeled a pure-software platform), v2 recognizes that Health Hub must employ doctors, admin ops staff, and technical support to deliver a credible healthcare service. This means:

- **Service availability is a function of both technology and staffing.** A perfectly working platform with zero employed doctors cannot deliver consultations.
- **Funding level directly determines operational capacity.** The difference between L1 and L3 is not just feature speed -- it is whether callbacks happen, whether doctors are available, and whether support exists.
- **Staffing costs dominate at scale.** At Production Readiness, employed operations staff cost ~$6,542/month -- more than technology infrastructure (~$800-1,500/month) and approaching total team economic cost (~$14,830/month).

### 7.2 Progressive Hardening Is Non-Negotiable

- SLA commitments advance from 96% (internal baseline) to 99.2% (production) across four tiers.
- Service credits begin only at Pilot 2 (5% per 0.1% miss, cap 25%) and increase at Production (10% per 0.1% miss, cap 50%).
- No financial penalties exist during Pilot 1. This protects Health Hub during the highest-risk learning phase while still providing documented commitments to partner facilities.

### 7.3 Scenario Sensitivity

- **Bootstrapped combinations (L1/O1-I1)** cannot sustain the full admin-assisted model. They revert to founder-operated callbacks and delayed staffing, which degrades the patient experience and limits scale.
- **The ideal sweet spot is L2 self-funding + I2 investment (S2-O2-I2 or S3-O2-I2)**. These combinations fund the full staffing ladder, deliver the complete service catalog, and reach Production within 9-11 months.
- **Over-investment (O3-I3 combinations) compresses timelines but increases execution risk.** The East African market may not absorb services as fast as the platform can deliver them.

### 7.4 Investor Talking Points

For investor conversations, the service and SLA framework demonstrates:

1. **Mature operating model**: The admin-assisted approach with defined staffing ladders shows this is not a "build it and they will come" technology bet.
2. **Progressive risk management**: Four SLA tiers with specific metrics show disciplined commitment escalation.
3. **21-combination scenario modeling**: Every funding scenario has a defined service outcome, giving investors clarity on what their capital achieves.
4. **Clear service gates**: Phase transitions require specific milestones, preventing premature scaling.
5. **Realistic cost structure**: India-based operations staff at verified market rates ($720/mo doctors, $217/mo admin, $301/mo tech support) deliver significant labor arbitrage for an East Africa-focused service.

---

## 8. Cross-References

| Document | Relevance to This Document |
|----------|---------------------------|
| **params.md** | All assumptions: team composition, staffing ladder, phase definitions, scenario matrix, infrastructure costs, revenue timing |
| **01-timeline.md** | Phase durations, milestone definitions, and go/no-go criteria for each transition that determine when services reach GA |
| **04-effort-estimation.md** | Developer hours and team capacity required to deliver each service by phase |
| **05-cost-model.md** | Infrastructure, vendor, and staffing costs that constrain service availability per scenario |
| **06-revenue-model.md** | Revenue projections that determine sustainability gates for self-funded scenarios |
| **CLAUDE.md** | Codebase audit results (19 issues, all resolved) that define the "Current State" column in the service catalog |
| **render.yaml** | Current Render deployment configuration defining infrastructure baseline |
| **db/migrations/** | 12 migration files defining current schema state; referenced in DB-dependent service descriptions |

---

*End of Document 2 -- Services & SLAs (v2.0, March 2026)*
