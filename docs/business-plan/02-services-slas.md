# 02 -- Services & SLAs

**Health Hub Business Plan -- Document 2 of 15**
**Last updated: 2026-03-18**

---

## 1. Executive Summary

Health Hub is a multi-tenant health technology platform designed for the East African healthcare market, beginning with Ethiopia. The platform connects patients, general practitioners (GPs), specialists, pharmacies, diagnostic labs, and facility administrators through a unified digital workflow. As of March 2026, the core patient-to-GP consultation pipeline, specialist referral routing, pharmacy claim-to-dispense workflow, and administrative user management are functional at demo-ready quality, while video consultations, payments (M-Pesa/Stripe), mobile applications, and multi-language support remain partially built or unstarted.

This document defines the complete service catalog across all seven tenant types, establishes SLA targets for each of the four deployment phases (Pre-Pilot, Pilot 1, Pilot 2, Production), and maps service availability against all 21 scenario-and-funding combinations from the Health Hub planning framework. It also specifies what Health Hub expects from partner facilities, patients, technology vendors, and regulators at each phase.

The overarching principle is progressive hardening: services launch at best-effort quality during internal testing, graduate to monitored SLAs during pilot phases, and reach enterprise-grade commitments only at production scale. This approach protects both Health Hub and its early partners from over-commitment while building trust through measurable improvement.

---

## 2. Methodology & Assumptions

### 2.1 Scenario Framework

The business plan models 21 distinct funding and timing combinations across three dimensions:

| Dimension | Options |
|-----------|---------|
| **Investor Timing (Scenario)** | S1: Fully self-funded / S2: Investor joins at Pilot 2 transition / S3: Investor joins right after Pilot 1 |
| **Our Funding Level** | L1: Bootstrapped ($500/mo) / L2: Ideal ($1,000/mo) / L3: Fully funded ($2,000/mo) |
| **Investor Level** | I1: Modest ($25K) / I2: Standard ($75K) / I3: Aggressive ($150K+) |

S1 has 3 combinations (L1, L2, L3). S2 and S3 each have 9 combinations (L1-L3 x I1-I3), totaling 21.

### 2.2 Phase Definitions

| Phase | Duration | Users | Purpose |
|-------|----------|-------|---------|
| **Pre-Pilot** | Months 0-2 | Internal team (5-10) | Stabilize codebase, fix audit issues, harden auth and data |
| **Pilot 1** | Months 3-5 | 1-2 facilities, 50-200 users | First external validation in Ethiopia, core workflows only |
| **Pilot 2** | Months 6-9 | 3-5 facilities, 1K-5K users | Broader validation, payments, diagnostics, initial revenue |
| **Production** | Month 10+ | 10+ facilities, 5K-50K users | Full commercial launch, enterprise SLAs, multi-country |

### 2.3 Key Assumptions

- All infrastructure runs on Render (Starter plan for pilots, Standard/Pro for production).
- Video consultations use Daily.co; pricing scales with concurrent rooms.
- Payment integration targets M-Pesa (Safaricom/Telebirr) as primary, Stripe as secondary for card payments.
- Mobile app refers to an Android-first PWA or Capacitor wrapper; native iOS follows later.
- SLA measurements begin only when monitoring tooling is in place for that phase.
- "Working" means the feature is functional end-to-end in the current codebase with demo data; it does not imply production-hardened.

---

## 3. Service Catalog

### 3.1 Patient Services

| Service | Description | Current State | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|---------|-------------|---------------|-----------|---------|---------|------------|
| Account registration & login | Email/password signup with password policy enforcement, JWT auth, refresh tokens | Working | Hardened (rate limiting, lockout) | Stable | + Social login option | + SSO for facility employees |
| GP consultation request | Submit symptoms, join GP queue, receive triage | Working | Bug fixes, queue ordering | Live with real patients | + Priority queuing | Full SLA-backed |
| Video consultation | Daily.co-based video call with join-link generation, room cleanup | Partial (scaffold + join-link API) | Complete integration, test calls | 720p minimum, 1:1 calls | + Group calls, recording | HD, <200ms p95 latency |
| AI health triage chat | Claude-powered symptom checker with conversation history | Partial (API + basic UI) | Improve prompts, add disclaimers | Beta with consent flow | + Amharic support | Full clinical-grade guardrails |
| Prescription viewing | View prescriptions issued by GP or specialist | Working | UI polish | Live | + PDF download | + Prescription history export |
| Pharmacy status tracking | Track prescription claim and dispense status | Working | Real-time WebSocket updates | Live | + Push notifications | + SMS notifications |
| Lab results viewing | View lab orders and completed results | Partial (basic order/result API) | Complete results display UI | Live with partner labs | + PDF reports | + Historical trends |
| Payment (M-Pesa / card) | Pay for consultations, prescriptions, lab orders | Not built (Stripe scaffold only) | Stripe test mode | M-Pesa sandbox | M-Pesa live + Stripe live | Full payment reconciliation |
| Notifications | Push, email, SMS alerts for appointments, results, prescriptions | In-app only | + Email (SendGrid) | + SMS (Africa's Talking) | + Push (FCM) | Full multi-channel |
| Profile & billing management | Edit personal details, manage payment methods, view transactions | Working | Bug fixes | Live | + Insurance info | + Family profiles |
| Mobile app (Android) | Native-like mobile experience | Not built (web responsive only) | PWA manifest + install prompt | PWA live | Capacitor wrapper on Play Store | Native-quality Android app |
| Appointment scheduling | Book future consultation slots | Not built | -- | -- | Basic slot booking | Full calendar integration |
| Medical records access | View consolidated health history | Not built | -- | -- | Basic history view | Full EHR-lite |

### 3.2 GP Services

| Service | Description | Current State | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|---------|-------------|---------------|-----------|---------|---------|------------|
| Patient queue management | View, accept, and manage incoming patient consultations | Working | Performance tuning, WebSocket reliability | Live | + Queue analytics | + Auto-routing |
| Patient history view | Access patient consultation history and prior notes | Working | UI improvements | Live | + Filterable history | + Full EHR integration |
| Consultation status updates | Mark consultations as in-progress, completed, referred | Working | Bug fixes | Live | Stable | SLA-backed |
| Prescription issuance | Create and submit prescriptions to pharmacy network | Working | Validation rules, drug database stub | Live with real formulary | + Drug interaction checks | Full formulary + e-prescribing |
| Specialist referral creation | Refer patients to specialists with clinical notes | Working | Referral template improvements | Live | + Urgency levels, auto-routing | + Referral analytics |
| Video consultation (GP side) | Join video call with patient | Partial | Complete integration | Live 1:1 | + Screen sharing | HD + recording |
| Chat with patient | In-consultation messaging | Working (basic) | Reliability improvements | Live | + File attachments | + Persistent chat history |
| Dashboard & analytics | Overview of daily workload, metrics | Partial (basic dashboard) | Complete key metrics | Live | + Weekly reports | + Benchmarking |

### 3.3 Specialist Services

| Service | Description | Current State | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|---------|-------------|---------------|-----------|---------|---------|------------|
| Referral inbox | View and manage incoming referrals from GPs | Working | UI polish, filtering | Live | + Priority sorting | + Auto-accept rules |
| Referral accept/decline | Accept or decline referrals with notes | Working | Validation improvements | Live | Stable | SLA-backed |
| Request more info | Request additional clinical information from referring GP | Partial (API exists, UI scaffold) | Complete UI flow | Live | + Structured info templates | + Auto-reminders |
| Consultation from referral | Create consultation linked to accepted referral | Working | Linking reliability | Live | + Scheduling | + Multi-session consults |
| Video consultation (specialist) | Join video call with referred patient | Partial | Complete integration | Live | + Recording, notes | HD + transcription |
| Lab order creation | Order diagnostic tests for patients | Working (basic) | + Order templates | Live with partner labs | + Auto-routing to nearest lab | + Results auto-import |
| Prescription issuance | Issue specialist prescriptions | Working | Validation rules | Live | Stable | Full formulary |
| Specialist dashboard | Overview of referrals, consultations, pending actions | Working | Performance improvements | Live | + Analytics | + Benchmarking |

### 3.4 Pharmacy Services

| Service | Description | Current State | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|---------|-------------|---------------|-----------|---------|---------|------------|
| Prescription lookup | Search and view incoming prescriptions | Working | Search improvements | Live | + Barcode/QR scan | + Auto-notifications |
| Prescription claim | Claim a prescription for fulfillment | Working | Concurrency handling | Live | + Multi-pharmacy routing | + Priority claims |
| Dispense workflow | Mark prescriptions as dispensed, update patient status | Working | Status transition validation | Live | + Partial dispense | + Substitution workflow |
| Inventory management | Track drug stock levels | Not built | -- | Basic stock tracking | + Low-stock alerts | + Auto-reorder suggestions |
| Payment collection | Collect payment for dispensed prescriptions | Not built | -- | Manual recording | M-Pesa integration | Full POS integration |
| Pharmacy dashboard | Overview of claims, dispenses, pending actions | Partial | Complete UI | Live | + Daily reports | + Analytics |
| Patient notification | Notify patient when prescription is ready | Partial (in-app only) | + Email | + SMS | + Push | Multi-channel |

### 3.5 Diagnostics / Lab Services

| Service | Description | Current State | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|---------|-------------|---------------|-----------|---------|---------|------------|
| Order reception | Receive and view lab orders from GPs/specialists | Working (basic) | UI improvements, tab navigation fix | Live | + Priority ordering | + Auto-accept |
| Sample tracking | Track sample collection and processing status | Not built | -- | Basic status updates | + Barcode tracking | + Full LIMS-lite |
| Result entry | Enter and submit lab results | Working (basic) | + Structured result templates | Live | + Image/file upload | + Auto-validation |
| Result delivery | Deliver results to ordering provider and patient | Partial | Complete notification flow | Live | + PDF generation | + HL7 FHIR export |
| Lab dashboard | Overview of orders, pending results, turnaround times | Partial | Complete UI | Live | + TAT analytics | + Benchmarking |
| Equipment management | Track lab equipment and calibration | Not built | -- | -- | -- | Basic tracking |

### 3.6 Admin Services

| Service | Description | Current State | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|---------|-------------|---------------|-----------|---------|---------|------------|
| User management | View, create, enable/disable user accounts | Working | + Bulk operations | Live | + Role assignment UI | + RBAC editor |
| Activity monitoring | View platform activity logs | Working | + Filtering, export | Live | + Real-time feed | + Alerting |
| Workflow tracking | Track and manage clinical workflows across facility | Working | Bug fixes | Live | + Custom workflows | + SLA monitoring |
| Facility management | Configure facility settings, departments, hours | Not built | Basic config | Live | + Multi-facility | + Franchise model |
| Reporting & analytics | Generate operational and clinical reports | Not built | -- | Basic reports | + Scheduled reports | + Custom dashboards |
| Audit trail | Immutable log of all clinical and admin actions | Not built | -- | Basic logging | + Searchable audit | + Compliance export |
| Billing & invoicing | Manage facility billing, generate invoices | Not built | -- | -- | Basic invoicing | + Auto-billing |

### 3.7 Platform Services (Cross-Cutting)

| Service | Description | Current State | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|---------|-------------|---------------|-----------|---------|---------|------------|
| Authentication & authorization | JWT-based auth, role guards, route protection | Working | Hardened (ISS-01 through ISS-09 fixes) | Stable | + MFA option | + SSO / OAuth2 |
| Real-time messaging (WebSocket) | Live updates for queues, notifications, chat | Working | Reconnection, heartbeat improvements | Stable | + Presence indicators | + Typing indicators |
| AI services (Claude) | Triage chat, clinical decision support | Partial | Prompt engineering, safety guardrails | Beta | + Multi-language | + Clinical summaries |
| API gateway & rate limiting | Express rate limiting, health endpoints | Working | Rate-limit exemptions, proxy config | Stable | + API key management | + Usage quotas |
| Data encryption | SSL in transit, PostgreSQL encryption at rest | Working | Verify encryption config | Compliant | + Field-level encryption | + Key rotation |
| Backup & recovery | Database backups | Render automated daily | + Verification scripts | + Point-in-time recovery | + Cross-region backup | + RPO < 1hr |
| Monitoring & alerting | Health checks, structured logging | Partial | + UptimeRobot, structured logs | Active monitoring | + APM (Sentry/Datadog) | + PagerDuty on-call |
| Internationalization (i18n) | Multi-language UI support | Not built | -- | English only | + Amharic (UI strings) | + Swahili, Oromo |
| Analytics & telemetry | Usage tracking, funnel analysis | Not built | -- | Basic event logging | + Mixpanel/PostHog | + Custom dashboards |
| CDN & performance | Static asset delivery, caching | Render default | + Cache headers | Stable | + Cloudflare CDN | + Edge caching |

---

## 4. SLA Definitions by Phase

### 4.1 Pre-Pilot SLAs (Internal Testing -- Months 0-2)

These are internal targets, not contractual commitments. They establish a baseline for hardening.

| Metric | Target | Measurement Method | Escalation |
|--------|--------|--------------------|------------|
| Uptime | 95% during business hours (Mon-Fri 08:00-18:00 EAT) | Manual monitoring + Render dashboard | Internal Slack alert |
| API response time (p95) | < 2,000ms | Server-side structured logging | Developer investigation within 24hrs |
| Video call quality | Best-effort; calls connect and sustain 5+ minutes | Manual QA sessions | Known limitation, not escalated |
| Data loss prevention | Daily automated backups (Render) | Render backup dashboard | Verify weekly |
| Critical bug fix | 48 hours from report to fix deployed | Internal issue tracker | Escalate to lead developer |
| Major bug fix | 1 week from report | Internal issue tracker | Batched in weekly release |
| Security incident | Respond within 4 hours | Manual detection | Immediate team notification |
| Support channel | Internal team only | Slack workspace | N/A |
| Planned maintenance window | Any time with 1-hour internal notice | Slack announcement | N/A |

### 4.2 Pilot 1 SLAs (First External Users -- Months 3-5)

These are commitments to pilot partner facilities. They are documented in the pilot agreement but carry no financial penalties.

| Metric | Target | Measurement Method | Escalation |
|--------|--------|--------------------|------------|
| Uptime | 98% (measured monthly, excluding planned maintenance) | UptimeRobot (1-minute checks) | WhatsApp alert to facility liaison within 30 min |
| API response time (p95) | < 1,500ms | Structured logging with percentile calculation | Investigate within 12 hours |
| Video call quality | 720p minimum, < 200ms latency for Addis Ababa users | Daily.co analytics dashboard | Known limitation outside Addis |
| Data loss prevention | Automated daily backups + manual weekly verification | Render backup + verification script | RPO: 24 hours |
| Critical bug fix | 24 hours from report to fix deployed | Issue tracker (GitHub Issues) | Direct call to lead developer |
| Major bug fix | 72 hours from report | Issue tracker | Included in next scheduled release |
| Minor bug fix | 2 weeks from report | Issue tracker | Batched |
| Security incident | Respond within 2 hours, resolve within 24 hours | UptimeRobot + manual reporting | Immediate team + facility notification |
| Support hours | Mon-Fri 08:00-18:00 EAT | WhatsApp group + email | After-hours: emergency WhatsApp only |
| Support response time | < 4 hours during support hours | WhatsApp timestamps | Escalate if > 4hrs |
| User onboarding | Guided setup for each facility (in-person or video) | Onboarding checklist | Complete within 1 week of go-live |
| Data privacy | Patient data encrypted in transit (TLS 1.2+) and at rest | SSL certificate monitoring + DB config audit | Immediate remediation |
| Planned maintenance | Saturdays 02:00-06:00 EAT with 48-hour notice | Email to facility admins | Reschedule if objected |

### 4.3 Pilot 2 SLAs (Broader Pilot -- Months 6-9)

These are tighter commitments reflecting growing user base and revenue generation. Service credits may apply for sustained outages.

| Metric | Target | Measurement Method | Escalation |
|--------|--------|--------------------|------------|
| Uptime | 99.0% (measured monthly) | UptimeRobot + Render metrics | Auto-alert within 5 min; status page update within 15 min |
| API response time (p95) | < 1,000ms | APM tool (Sentry or Datadog) | Auto-alert if sustained > 1,000ms for 5 min |
| API response time (p99) | < 2,000ms | APM tool | Investigation within 4 hours |
| Video call quality | 720p, < 150ms latency, < 1% packet loss | Daily.co analytics + custom monitoring | Fallback to audio-only if degraded |
| Concurrent video calls | 20 simultaneous | Daily.co plan + load testing | Queuing system if at capacity |
| Data loss prevention | Automated backups every 6 hours, point-in-time recovery | Render + custom backup verification | RPO: 6 hours; RTO: 2 hours |
| Critical bug fix | 12 hours | Issue tracker + PagerDuty | On-call developer paged |
| Major bug fix | 48 hours | Issue tracker | Prioritized in sprint |
| Security incident | Respond within 1 hour, contain within 4 hours, resolve within 24 hours | Automated detection + manual reporting | Incident commander assigned |
| Support hours | Mon-Sat 07:00-20:00 EAT | WhatsApp + email + in-app help | Sunday: emergency only |
| Support response time | < 2 hours during support hours | Ticketing system | Auto-escalate if > 2hrs |
| Data privacy | HIPAA-equivalent controls; encryption at rest and in transit | Quarterly security audit | Immediate remediation |
| Planned maintenance | Sundays 02:00-05:00 EAT with 72-hour notice | Email + in-app banner | Max 4 hours/month |
| Service credit | 5% monthly fee credit per 0.1% below 99.0% uptime | Automated calculation | Cap at 30% monthly fee |

### 4.4 Production SLAs (Full Launch -- Month 10+)

Full enterprise-grade commitments with contractual SLA penalties.

| Metric | Target | Measurement Method | Escalation |
|--------|--------|--------------------|------------|
| Uptime | 99.5% (measured monthly) | Multi-region monitoring (UptimeRobot + Datadog Synthetics) | Auto-alert within 2 min; status page within 5 min |
| API response time (p95) | < 500ms | Datadog APM with distributed tracing | Auto-scale trigger at 80% threshold |
| API response time (p99) | < 1,500ms | Datadog APM | Investigation within 2 hours |
| Video call quality | 1080p available, 720p guaranteed, < 100ms latency | Daily.co analytics + custom QoS monitoring | Auto-fallback to 480p, then audio |
| Concurrent video calls | 100+ simultaneous | Daily.co scale plan + horizontal scaling | Load balancing across regions |
| Data loss prevention | Continuous replication, cross-region backup | Multi-region PostgreSQL + WAL archival | RPO: 1 hour; RTO: 30 minutes |
| Critical bug fix (P0) | 4 hours to mitigate, 24 hours to resolve | PagerDuty + incident management | Incident commander + war room |
| Major bug fix (P1) | 24 hours | Sprint prioritization | Pulled into current sprint |
| Minor bug fix (P2) | 1 week | Standard backlog | Next sprint |
| Security incident | Respond within 30 min, contain within 2 hours, resolve within 12 hours | SIEM + automated detection | Security team + legal notification |
| Support hours | 24/7 for critical; Mon-Sat 07:00-22:00 EAT for standard | Multi-channel: in-app, phone, email, WhatsApp | Tiered escalation matrix |
| Support response time | < 30 min critical, < 2 hours major, < 8 hours minor | Ticketing SLA tracking | Auto-escalate with management notification |
| Data privacy | Full regulatory compliance (Ethiopia FDRE data protection, Kenya DPA 2019) | Annual third-party audit + continuous monitoring | Legal and compliance team involvement |
| Planned maintenance | Zero-downtime deployments; maintenance windows only for major migrations | Blue-green deployment verification | Max 2 hours planned downtime/month |
| Service credit | 10% monthly fee credit per 0.1% below 99.5% uptime | Automated calculation + monthly reporting | Cap at 50% monthly fee |
| Disaster recovery | Full DR plan tested quarterly | DR drill documentation | RTO: 30 min; RPO: 1 hour |

---

## 5. Service Expectations from Partners & Users

### 5.1 Pilot Facilities

| Expectation | Details | Phase |
|-------------|---------|-------|
| Dedicated liaison | Assign one staff member as primary Health Hub contact | Pilot 1+ |
| Testing participation | Minimum 2 hours/week of active platform usage during pilot | Pilot 1 |
| Feedback sessions | Bi-weekly 30-minute video calls to review issues and priorities | Pilot 1 |
| Data quality | Enter accurate patient and clinical data; no test data in production | Pilot 1+ |
| Internet connectivity | Minimum 5 Mbps stable connection for video consultations | Pilot 1+ |
| Device requirements | Modern browser (Chrome 90+, Safari 14+) on desktop or Android 10+ | Pilot 1+ |
| Staff training | Ensure all staff complete onboarding training (provided by Health Hub) | Pilot 1+ |
| Issue reporting | Report bugs and usability issues within 24 hours via designated channel | Pilot 1+ |
| Regulatory compliance | Maintain valid medical licenses and facility registrations | All phases |
| Data migration | Provide structured historical data if migrating from existing systems | Pilot 2+ |

### 5.2 Pilot Patients

| Expectation | Details | Phase |
|-------------|---------|-------|
| Consent | Provide informed consent for pilot participation and data handling | Pilot 1+ |
| Accurate information | Enter truthful personal and medical information | Pilot 1+ |
| Feedback | Complete monthly satisfaction surveys (< 5 minutes) | Pilot 1+ |
| Bug reporting | Report technical issues via in-app feedback button | Pilot 1+ |
| Device requirements | Android 10+ with Chrome, or any modern desktop browser | Pilot 1+ |
| Internet | Minimum 2 Mbps for chat; 5 Mbps for video consultations | Pilot 1+ |

### 5.3 Technology Partners

| Partner | Expectation | Fallback |
|---------|-------------|----------|
| **Daily.co** | 99.9% API uptime, < 200ms global media relay latency | Audio-only fallback; pre-recorded consultation option |
| **Render** | 99.95% platform uptime, automated backups, zero-downtime deploys | Manual deployment to backup region; local backup scripts |
| **Stripe** | 99.99% API uptime for payment processing | Offline payment recording; manual reconciliation |
| **M-Pesa / Telebirr** | API availability per telco SLA (typically 99.5%) | Alternative payment method prompt; manual payment recording |
| **Anthropic (Claude)** | API availability for AI triage features | Graceful degradation to symptom checklist; human triage queue |
| **SendGrid** | 99.95% email delivery uptime | In-app notification fallback; SMS backup |
| **Africa's Talking** | SMS delivery within 30 seconds for 95% of messages | In-app notification fallback; email backup |

### 5.4 Regulatory Bodies

| Expectation | Details | Relevant Body |
|-------------|---------|---------------|
| Timely guidance | Clear guidelines on digital health platform requirements | Ethiopia FDA, MoH |
| Registration process | Defined and accessible process for health tech platform registration | Ethiopia Investment Commission |
| Data protection clarity | Published rules on patient data handling, storage, and cross-border transfer | FDRE Information Network Security Administration |
| Licensing framework | Clear requirements for telemedicine platform licensing | Medical practitioners' licensing bodies |
| Payment regulation | Approval for digital health payments via mobile money | National Bank of Ethiopia |

---

## 6. Scenario Analysis -- All 21 Combinations

### Legend

- **Phase notation**: PP = Pre-Pilot, P1 = Pilot 1, P2 = Pilot 2, Prod = Production
- **Service tiers**: Core (auth + GP + queue), Extended (+ specialist + pharmacy), Full (+ diagnostics + payments + mobile), Enterprise (+ analytics + i18n + integrations)
- **SLA tiers**: Internal (Pre-Pilot targets), Basic (Pilot 1 targets), Standard (Pilot 2 targets), Full (Production targets)

---

### Scenario 1: Fully Self-Funded

No external investment. All services funded from personal capital and early revenue.

#### S1-L1: Bootstrapped ($500/month)

| Phase | Timeline | Services Available | SLA Tier | Key Limitations |
|-------|----------|--------------------|----------|-----------------|
| Pre-Pilot | M0-M3 | Core only: patient registration, GP queue, basic chat | Internal | No video, no payments, no mobile, web only, single developer |
| Pilot 1 | M4-M8 | + Specialist referrals, basic pharmacy lookup | Basic | No video (Daily.co cost deferred), no lab integration, manual onboarding |
| Pilot 2 | M9-M14 | + Diagnostics tab, M-Pesa sandbox, in-app notifications | Basic+ | No live payments, limited concurrent users (~50), no i18n |
| Production | M15+ | + M-Pesa live, PWA, email notifications | Standard | No SMS, no analytics, no admin reporting, limited to 2-3 facilities |

**Key constraints at L1**: Video consultations delayed to Pilot 2 at earliest (Daily.co costs ~$50/mo for 25 concurrent). Mobile app limited to PWA. No dedicated support staff; founder handles all support. Revenue must begin by M9 to sustain operations.

#### S1-L2: Ideal ($1,000/month)

| Phase | Timeline | Services Available | SLA Tier | Key Limitations |
|-------|----------|--------------------|----------|-----------------|
| Pre-Pilot | M0-M2 | Core + specialist referral scaffold + pharmacy scaffold | Internal | Video in test mode only, no payments |
| Pilot 1 | M3-M5 | Core + specialist + pharmacy + basic video (1:1) | Basic | Video limited to 5 concurrent calls, no payments, web only |
| Pilot 2 | M6-M9 | + Diagnostics + M-Pesa sandbox + PWA + email notifications | Standard | M-Pesa not live, limited lab partnerships, no i18n |
| Production | M10-M12 | Full catalog minus i18n and advanced analytics | Full | English only, basic analytics, limited to 5-8 facilities |

**Key constraints at L2**: Comfortable pacing with video available at Pilot 1. M-Pesa integration begins Pilot 2 but goes live at Production. Part-time support staff feasible from Pilot 2. Can sustain 10-15 concurrent video calls by production.

#### S1-L3: Fully Funded ($2,000/month)

| Phase | Timeline | Services Available | SLA Tier | Key Limitations |
|-------|----------|--------------------|----------|-----------------|
| Pre-Pilot | M0-M2 | Core + specialist + pharmacy + video testing + AI triage beta | Internal | All features in test mode, no external users |
| Pilot 1 | M3-M4 | Extended: all clinical workflows + video + AI triage + email notifications | Basic | No M-Pesa live, no mobile app, English only |
| Pilot 2 | M5-M7 | Full: + diagnostics + M-Pesa sandbox + PWA + SMS notifications | Standard | M-Pesa sandbox only, basic analytics |
| Production | M8-M10 | Full catalog + M-Pesa live + Amharic UI + admin analytics | Full | Limited to East Africa, no iOS native app |

**Key constraints at L3**: Fastest self-funded path. Video and AI available from Pilot 1. Can hire part-time support from Pilot 1. Full service catalog achievable by M10. Main limitation is market expansion speed, not feature readiness.

---

### Scenario 2: Investor at Pilot 2 Transition

Self-funded through Pilot 1; investor capital arrives at the start of Pilot 2. Pre-investor phase mirrors S1 at the corresponding Our Level. Post-investor phase accelerates based on Investor Level.

#### S2-L1-I1: Bootstrapped + Modest Investor ($25K at Pilot 2)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M3) | $500/mo self | Core only | Internal | Same as S1-L1 |
| Pilot 1 (M4-M8) | $500/mo self | + Specialist referrals, basic pharmacy | Basic | Same as S1-L1 |
| Pilot 2 (M9-M12) | $500/mo + $25K | + Video (1:1), diagnostics, M-Pesa sandbox, email notifications | Standard | $25K buys ~6-8 months of enhanced ops; video limited to 10 concurrent |
| Production (M13+) | Revenue + remaining capital | + M-Pesa live, PWA, basic analytics | Standard+ | Must achieve revenue sustainability before capital runs out |

**Transition impact**: $25K enables video integration, one part-time hire, and M-Pesa development. Accelerates Pilot 2 services by ~2 months vs S1-L1.

#### S2-L1-I2: Bootstrapped + Standard Investor ($75K at Pilot 2)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M3) | $500/mo self | Core only | Internal | Same as S1-L1 |
| Pilot 1 (M4-M8) | $500/mo self | + Specialist referrals, basic pharmacy | Basic | Same as S1-L1 |
| Pilot 2 (M9-M11) | $500/mo + $75K | + Video, diagnostics, M-Pesa live, PWA, SMS + email notifications, AI triage | Standard | Rapid buildout; team grows to 2-3 developers |
| Production (M12+) | Revenue + remaining capital | Full catalog + Amharic UI + admin analytics + mobile app | Full | 12-18 months runway post-investment |

**Transition impact**: $75K funds a full development sprint, 2 hires, and infrastructure upgrade to Render Standard. Transforms service offering from minimal to near-complete within 3 months of investment.

#### S2-L1-I3: Bootstrapped + Aggressive Investor ($150K+ at Pilot 2)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M3) | $500/mo self | Core only | Internal | Same as S1-L1 |
| Pilot 1 (M4-M8) | $500/mo self | + Specialist referrals, basic pharmacy | Basic | Same as S1-L1 |
| Pilot 2 (M9-M10) | $500/mo + $150K | Full catalog: all workflows + video + payments + diagnostics + mobile + AI | Standard | Aggressive hiring and buildout; risk of execution debt |
| Production (M11+) | Revenue + remaining capital | Enterprise: + i18n + analytics + multi-facility + API marketplace | Full | 24+ months runway; Kenya expansion feasible |

**Transition impact**: $150K enables full team (4-5 people), enterprise infrastructure, and multi-market preparation. Risk: the slow Pilot 1 phase means limited user feedback before the capital-intensive Pilot 2 buildout.

#### S2-L2-I1: Ideal + Modest Investor ($25K at Pilot 2)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M2) | $1,000/mo self | Core + specialist + pharmacy scaffold | Internal | Same as S1-L2 |
| Pilot 1 (M3-M5) | $1,000/mo self | Core + specialist + pharmacy + basic video | Basic | Same as S1-L2 |
| Pilot 2 (M6-M9) | $1,000/mo + $25K | + Diagnostics + M-Pesa live + PWA + SMS notifications + basic analytics | Standard | $25K extends runway by ~6 months; incremental improvement over S1-L2 |
| Production (M10+) | Revenue + remaining capital | Full catalog minus i18n and advanced analytics | Full | Modest acceleration; similar endpoint to S1-L2 but with more financial cushion |

**Transition impact**: Marginal. S1-L2 is already on a reasonable trajectory. $25K primarily provides financial safety net rather than service acceleration.

#### S2-L2-I2: Ideal + Standard Investor ($75K at Pilot 2)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M2) | $1,000/mo self | Core + specialist + pharmacy scaffold | Internal | Same as S1-L2 |
| Pilot 1 (M3-M5) | $1,000/mo self | Core + specialist + pharmacy + basic video | Basic | Same as S1-L2 |
| Pilot 2 (M6-M8) | $1,000/mo + $75K | Full: all workflows + video (20 concurrent) + M-Pesa live + PWA + full notifications + AI triage + diagnostics | Standard | Team grows to 3 people; Pilot 2 compressed by 1 month |
| Production (M9-M11) | Revenue + remaining capital | Full catalog + Amharic UI + admin analytics + Android app on Play Store | Full | 18 months runway; comfortable path to profitability |

**Transition impact**: Strong combination. Solid Pilot 1 foundation + $75K enables rapid Pilot 2 expansion. Recommended path for most scenarios -- see Section 8.

#### S2-L2-I3: Ideal + Aggressive Investor ($150K+ at Pilot 2)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M2) | $1,000/mo self | Core + specialist + pharmacy scaffold | Internal | Same as S1-L2 |
| Pilot 1 (M3-M5) | $1,000/mo self | Core + specialist + pharmacy + basic video | Basic | Same as S1-L2 |
| Pilot 2 (M6-M7) | $1,000/mo + $150K | Full catalog + enterprise features: multi-facility, advanced analytics, API | Standard | Aggressive expansion; 4-5 person team |
| Production (M8-M10) | Revenue + remaining capital | Enterprise: + i18n (Amharic + Swahili) + Kenya pilot + iOS app + EHR integrations | Full | 24+ months runway; multi-country operations |

**Transition impact**: Enables enterprise-grade offering and multi-country expansion. The strong Pilot 1 foundation from L2 means the aggressive Pilot 2 investment is well-directed based on real user feedback.

#### S2-L3-I1: Fully Funded + Modest Investor ($25K at Pilot 2)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M2) | $2,000/mo self | Core + specialist + pharmacy + video testing + AI beta | Internal | Same as S1-L3 |
| Pilot 1 (M3-M4) | $2,000/mo self | Extended: all clinical workflows + video + AI + notifications | Basic | Same as S1-L3 |
| Pilot 2 (M5-M7) | $2,000/mo + $25K | Full: + diagnostics + M-Pesa live + PWA + SMS | Standard | Minimal incremental benefit; $25K provides 3-month buffer only |
| Production (M8-M10) | Revenue + remaining capital | Full catalog + Amharic UI + admin analytics | Full | Nearly identical to S1-L3 with slightly more financial comfort |

**Transition impact**: Minimal. Pre-investor phase at L3 already achieves strong service coverage. The $25K investment adds financial cushion but does not materially change the service roadmap. This is a redundant combination.

#### S2-L3-I2: Fully Funded + Standard Investor ($75K at Pilot 2)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M2) | $2,000/mo self | Core + specialist + pharmacy + video testing + AI beta | Internal | Same as S1-L3 |
| Pilot 1 (M3-M4) | $2,000/mo self | Extended: all clinical workflows + video + AI + notifications | Basic | Same as S1-L3 |
| Pilot 2 (M5-M7) | $2,000/mo + $75K | Full + enterprise prep: multi-facility admin, advanced analytics, i18n started | Standard | Team grows to 3-4; accelerated enterprise features |
| Production (M8-M10) | Revenue + remaining capital | Enterprise: + Amharic + Swahili + Kenya market prep + Android app | Full | 18+ months runway; strong position for Series A |

**Transition impact**: Moderate. Accelerates enterprise features and multi-market preparation by 2-3 months vs S1-L3.

#### S2-L3-I3: Fully Funded + Aggressive Investor ($150K+ at Pilot 2)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M2) | $2,000/mo self | Core + specialist + pharmacy + video testing + AI beta | Internal | Same as S1-L3 |
| Pilot 1 (M3-M4) | $2,000/mo self | Extended: all clinical workflows + video + AI + notifications | Basic | Same as S1-L3 |
| Pilot 2 (M5-M6) | $2,000/mo + $150K | Enterprise: full catalog + multi-facility + i18n + analytics + API marketplace | Standard | 5+ person team; rapid scaling |
| Production (M7-M9) | Revenue + remaining capital | Enterprise+: multi-country (Ethiopia + Kenya), iOS app, EHR integrations, B2B API | Full | 30+ months runway; positioned for Series A/B |

**Transition impact**: Maximum acceleration. Compresses timeline significantly. Risk: may outpace market readiness in East Africa. Best suited if there is confirmed demand from multiple facilities pre-investment.

---

### Scenario 3: Investor Right After Pilot 1

Self-funded through Pilot 1 completion; investor capital arrives immediately after, enabling an accelerated Pilot 2 with investment-grade infrastructure from the start.

#### S3-L1-I1: Bootstrapped + Modest Investor ($25K after Pilot 1)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M3) | $500/mo self | Core only | Internal | Same as S1-L1 |
| Pilot 1 (M4-M8) | $500/mo self | + Specialist referrals, basic pharmacy | Basic | Same as S1-L1; long pilot due to limited resources |
| Pilot 2 (M9-M11) | $25K lump + ongoing | + Video (1:1), diagnostics, M-Pesa sandbox, PWA, email + SMS notifications | Standard | Similar to S2-L1-I1 but investor involved earlier in Pilot 2 planning |
| Production (M12+) | Revenue + remaining capital | + M-Pesa live, basic analytics | Standard+ | Must reach revenue sustainability quickly |

**Transition impact**: Similar to S2-L1-I1. Early investor involvement means Pilot 2 can be better planned, but budget constraints are identical. Main benefit is investor guidance and network access during Pilot 2.

#### S3-L1-I2: Bootstrapped + Standard Investor ($75K after Pilot 1)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M3) | $500/mo self | Core only | Internal | Same as S1-L1 |
| Pilot 1 (M4-M8) | $500/mo self | + Specialist referrals, basic pharmacy | Basic | Same as S1-L1 |
| Pilot 2 (M9-M11) | $75K | Full: all workflows + video + M-Pesa live + PWA + diagnostics + AI triage + full notifications | Standard | Rapid buildout post-investment; 2-3 developers |
| Production (M12+) | Revenue + remaining capital | Full catalog + Amharic UI + admin analytics + mobile app | Full | 15+ months runway |

**Transition impact**: Strong acceleration. The longer bootstrapped Pilot 1 provides extensive user feedback; $75K investment is well-informed and efficiently deployed.

#### S3-L1-I3: Bootstrapped + Aggressive Investor ($150K+ after Pilot 1)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M3) | $500/mo self | Core only | Internal | Same as S1-L1 |
| Pilot 1 (M4-M8) | $500/mo self | + Specialist referrals, basic pharmacy | Basic | Same as S1-L1 |
| Pilot 2 (M9-M10) | $150K | Full catalog + enterprise: multi-facility, analytics, API | Standard | 4-5 person team; aggressive buildout |
| Production (M11+) | Revenue + remaining capital | Enterprise: + i18n + multi-country + iOS app | Full | 24+ months runway |

**Transition impact**: Maximum acceleration from a constrained start. Risk: the minimal Pilot 1 product provides limited data to guide the large investment. Recommend extended user research before deploying capital.

#### S3-L2-I1: Ideal + Modest Investor ($25K after Pilot 1)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M2) | $1,000/mo self | Core + specialist + pharmacy scaffold | Internal | Same as S1-L2 |
| Pilot 1 (M3-M5) | $1,000/mo self | Core + specialist + pharmacy + basic video | Basic | Same as S1-L2 |
| Pilot 2 (M6-M8) | $1,000/mo + $25K | + Diagnostics + M-Pesa sandbox + PWA + full notifications + basic analytics | Standard | Incremental improvement; $25K primarily extends runway |
| Production (M9-M11) | Revenue + remaining capital | Full catalog minus i18n | Full | Similar to S1-L2 with financial buffer |

**Transition impact**: Modest. The L2 self-funded base already delivers a solid Pilot 1. $25K smooths the Pilot 2 transition and reduces financial pressure.

#### S3-L2-I2: Ideal + Standard Investor ($75K after Pilot 1)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M2) | $1,000/mo self | Core + specialist + pharmacy scaffold | Internal | Same as S1-L2 |
| Pilot 1 (M3-M5) | $1,000/mo self | Core + specialist + pharmacy + basic video | Basic | Same as S1-L2 |
| Pilot 2 (M6-M8) | $1,000/mo + $75K | Full: all workflows + video (20 concurrent) + M-Pesa live + PWA + full notifications + AI triage + diagnostics + analytics | Standard | Team grows to 3; infrastructure upgraded |
| Production (M9-M10) | Revenue + remaining capital | Full catalog + Amharic UI + admin analytics + Android app | Full | 18 months runway; strong unit economics path |

**Transition impact**: Optimal combination of validated product (Pilot 1 with video) and sufficient capital to execute rapidly. Investor benefits from seeing real usage data before committing. This is the recommended scenario for most fundraising conversations.

#### S3-L2-I3: Ideal + Aggressive Investor ($150K+ after Pilot 1)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M2) | $1,000/mo self | Core + specialist + pharmacy scaffold | Internal | Same as S1-L2 |
| Pilot 1 (M3-M5) | $1,000/mo self | Core + specialist + pharmacy + basic video | Basic | Same as S1-L2 |
| Pilot 2 (M6-M7) | $1,000/mo + $150K | Enterprise: full catalog + multi-facility + i18n started + advanced analytics + API | Standard | 4-5 person team; rapid market expansion |
| Production (M8-M9) | Revenue + remaining capital | Enterprise+: multi-country + iOS + EHR integrations + B2B API | Full | 24+ months runway; Series A positioning |

**Transition impact**: Maximum impact. Strong Pilot 1 data justifies aggressive deployment. Fastest path to multi-country operations.

#### S3-L3-I1: Fully Funded + Modest Investor ($25K after Pilot 1)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M2) | $2,000/mo self | Core + specialist + pharmacy + video testing + AI beta | Internal | Same as S1-L3 |
| Pilot 1 (M3-M4) | $2,000/mo self | Extended: all clinical workflows + video + AI + notifications | Basic | Same as S1-L3 |
| Pilot 2 (M5-M7) | $2,000/mo + $25K | Full: + diagnostics + M-Pesa live + PWA + SMS | Standard | Minimal incremental benefit over S1-L3 |
| Production (M8-M10) | Revenue + remaining capital | Full catalog + Amharic UI + analytics | Full | Nearly identical to S1-L3 |

**Transition impact**: Negligible service impact. $25K adds ~3 months of financial cushion. Consider whether the dilution is worth the marginal benefit.

#### S3-L3-I2: Fully Funded + Standard Investor ($75K after Pilot 1)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M2) | $2,000/mo self | Core + specialist + pharmacy + video testing + AI beta | Internal | Same as S1-L3 |
| Pilot 1 (M3-M4) | $2,000/mo self | Extended: all clinical workflows + video + AI + notifications | Basic | Same as S1-L3 |
| Pilot 2 (M5-M6) | $2,000/mo + $75K | Full + enterprise: multi-facility, i18n (Amharic), advanced analytics | Standard | 3-4 person team; accelerated enterprise features |
| Production (M7-M9) | Revenue + remaining capital | Enterprise: + Swahili + Kenya pilot + Android app + API | Full | 18+ months runway |

**Transition impact**: Moderate acceleration of enterprise features. Good path if multi-country expansion is a priority.

#### S3-L3-I3: Fully Funded + Aggressive Investor ($150K+ after Pilot 1)

| Phase | Funding | Services Available | SLA Tier | Key Limitations |
|-------|---------|-------------------|----------|-----------------|
| Pre-Pilot (M0-M2) | $2,000/mo self | Core + specialist + pharmacy + video testing + AI beta | Internal | Same as S1-L3 |
| Pilot 1 (M3-M4) | $2,000/mo self | Extended: all clinical workflows + video + AI + notifications | Basic | Same as S1-L3 |
| Pilot 2 (M5-M6) | $2,000/mo + $150K | Enterprise+: full catalog + multi-country prep + i18n + analytics + API + iOS | Standard | 5+ person team; maximum velocity |
| Production (M7-M8) | Revenue + remaining capital | Full enterprise multi-country platform | Full | 30+ months runway; Series A/B ready |

**Transition impact**: Maximum acceleration from an already strong base. Fastest possible path to enterprise-grade multi-country platform. Risk of over-investment if East African market adoption is slower than projected.

---

## 7. Service Roadmap

The following table shows the target month when each key service becomes generally available (GA) under representative scenario combinations. "GA" means the service is live, monitored, and covered by the phase-appropriate SLA.

### 7.1 Core Service Availability by Scenario

| Service | S1-L1 | S1-L2 | S1-L3 | S2-L2-I2 | S3-L2-I2 | S3-L3-I3 |
|---------|-------|-------|-------|----------|----------|----------|
| Patient registration & login | M0 | M0 | M0 | M0 | M0 | M0 |
| GP consultation queue | M0 | M0 | M0 | M0 | M0 | M0 |
| GP prescription issuance | M0 | M0 | M0 | M0 | M0 | M0 |
| Specialist referral workflow | M4 | M3 | M2 | M3 | M3 | M2 |
| Pharmacy claim & dispense | M5 | M3 | M2 | M3 | M3 | M2 |
| Video consultation (1:1) | M9 | M4 | M3 | M4 | M4 | M3 |
| AI health triage chat | M12 | M6 | M3 | M6 | M6 | M3 |
| Diagnostics / lab orders | M10 | M6 | M5 | M6 | M6 | M5 |
| M-Pesa payments (sandbox) | M11 | M7 | M5 | M7 | M7 | M5 |
| M-Pesa payments (live) | M15 | M10 | M8 | M9 | M9 | M7 |
| PWA / mobile install | M13 | M7 | M5 | M7 | M7 | M5 |
| Android app (Play Store) | M18+ | M11 | M8 | M9 | M9 | M7 |
| Email notifications | M6 | M4 | M3 | M4 | M4 | M3 |
| SMS notifications | M14 | M8 | M5 | M7 | M7 | M5 |
| Push notifications (FCM) | M16 | M9 | M7 | M8 | M8 | M6 |
| i18n -- Amharic | M18+ | M12 | M8 | M10 | M9 | M6 |
| i18n -- Swahili | M20+ | M15 | M10 | M12 | M10 | M7 |
| Admin analytics dashboard | M16 | M10 | M8 | M8 | M8 | M6 |
| Multi-facility admin | M20+ | M14 | M10 | M10 | M9 | M6 |
| API marketplace / B2B | -- | M18+ | M14 | M14 | M12 | M8 |
| Kenya market launch | -- | -- | M16+ | M16 | M14 | M9 |

### 7.2 Full 21-Combo Service Availability (Appendix Reference)

The complete 21-combination service timeline is maintained as a companion spreadsheet. The table above shows the six most decision-relevant combinations:

- **S1-L1**: Worst case -- bootstrapped minimum
- **S1-L2**: Self-funded ideal -- the baseline plan
- **S1-L3**: Self-funded maximum -- best case without investors
- **S2-L2-I2**: Recommended investor path -- Pilot 2 transition
- **S3-L2-I2**: Recommended early investor path -- post-Pilot 1
- **S3-L3-I3**: Maximum acceleration -- best case with investors

---

## 8. Key Takeaways

### Scenario 1 (Self-Funded)

- **S1-L1 is survivable but slow**: Core clinical workflows are available early, but video, payments, and mobile are delayed 6-12 months beyond the ideal timeline. Revenue generation is constrained, creating a sustainability risk after M12.
- **S1-L2 is the baseline plan**: Delivers a credible multi-feature platform by Pilot 1 (M3) and a commercially viable offering by Production (M10). Tight but feasible.
- **S1-L3 reaches feature parity with investor-backed L1 scenarios**: The extra $1,000/month self-funding often delivers more value than a small ($25K) investment because it avoids dilution and maintains full control.
- **All S1 scenarios depend on revenue by M10-M15**: Without investment, the platform must generate enough facility subscription revenue to cover infrastructure costs ($200-500/month) by the end of Pilot 2.

### Scenario 2 (Investor at Pilot 2)

- **S2-L1-I1 is the weakest combination**: Both self-funding and investment are minimal. The long bootstrapped Pilot 1 produces limited data, and the modest investment only extends runway without transforming the service offering.
- **S2-L2-I2 is the recommended fundraising pitch**: Strong Pilot 1 with video demonstrates product-market fit; $75K investment efficiently expands to full catalog. Clear path to production in M9-M11.
- **S2-L3-I1 is redundant**: At $2,000/month self-funding, a $25K investment adds minimal value relative to the dilution cost. Not recommended unless the investor brings strategic value (network, partnerships) beyond capital.
- **Investor timing at Pilot 2 means 6-8 months of self-funded operation**: The founder must be financially prepared to sustain the bootstrapped phase, and the platform must show enough traction to attract investment at the transition point.

### Scenario 3 (Investor After Pilot 1)

- **S3 scenarios get capital working earlier**: The 2-3 month head start on investment deployment (vs S2) translates to 1-2 months faster Production launch for most combinations.
- **S3-L2-I2 is the optimal early-investor path**: Validated Pilot 1 product + $75K creates a highly efficient buildout. Recommended for investors who want to see a working product before committing.
- **S3-L1-I3 carries execution risk**: The jump from a minimal Pilot 1 (no video, limited features) to an aggressively funded Pilot 2 requires rapid hiring and architecture scaling. The limited user feedback from Pilot 1 may lead to misallocated investment.
- **S3-L3-I3 is the fastest possible path**: Production-ready enterprise platform by M7-M8. Only pursue if there is confirmed multi-facility demand and the founder can manage a 5+ person team from day one of investment.
- **Early investment de-risks the critical Pilot 2 phase**: By having capital in place before Pilot 2 begins, Health Hub avoids the mid-pilot fundraising distraction that threatens S2 scenarios.

---

## 9. Cross-References

| Document | Relevance |
|----------|-----------|
| **01-timeline.md** | Phase durations, milestone definitions, and go/no-go criteria for each transition |
| **04-effort-estimation.md** | Developer hours and team composition required to deliver each service by phase |
| **05-cost-model.md** | Infrastructure, vendor, and staffing costs that constrain service availability per scenario |
| **06-revenue-model.md** | Revenue projections that determine sustainability gates for self-funded scenarios |
| **competitor-analysis.md** | Market benchmarks for SLA standards and service expectations in East Africa |
| **Scenario files** (`scenarios/scenario-*-*.md`) | Detailed per-combination financial models, timelines, and risk analysis |
| **render.yaml** | Current infrastructure configuration defining deployment topology and environment |
| **CLAUDE.md** | Codebase audit results that define the "Current State" column in the service catalog |

---

*End of Document 2 -- Services & SLAs*
