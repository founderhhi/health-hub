# Risk Register & Contingency Planning

**Health Hub Business Plan v2 — Document 13**
**Version:** 2.0 | **Date:** March 2026

> All assumptions, cost figures, timelines, and team parameters reference `params.md`.
> Risk scores use a standard 5x5 likelihood-impact matrix (score = L x I, max 25).

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Risk Framework](#2-risk-framework)
3. [Risk Categories](#3-risk-categories)
4. [Risk Register](#4-risk-register)
5. [Scenario-Specific Failure Modes](#5-scenario-specific-failure-modes)
6. [Downgrade Paths](#6-downgrade-paths)
7. [Contingency Playbooks](#7-contingency-playbooks)
8. [Risk Monitoring Cadence](#8-risk-monitoring-cadence)

---

## 1. Executive Summary

Health Hub operates at the intersection of several compounding risk domains: pre-revenue health technology, emerging-market regulatory frameworks, part-time distributed teams, dual-country expansion, and dependency on local payment and telecom infrastructure. None of these risks individually are fatal, but their interaction creates failure modes that a single-category risk register would miss.

This document catalogs 30 risks across 8 categories, assigns quantified likelihood and impact scores, maps each risk to a specific owner and trigger point, and provides detailed contingency playbooks for the top-severity scenarios. It is designed to serve three audiences:

- **Founders** — as a decision framework for when to pivot, downgrade, or escalate.
- **Investors** — as evidence that the team has systematically identified what can go wrong and has concrete plans, not just optimism.
- **Operational team** — as a reference for trigger-based action rather than reactive firefighting.

The risk profile is characteristic of a pre-revenue startup entering East Africa: the largest risks are not technical but operational and market-timing risks. The platform prototype exists and has been audited (19 issues identified and resolved). The primary threats are: funding timing mismatches, manual operations overload at scale, regulatory delay in Ethiopia, and key-person dependency across a fully part-time team.

**Overall risk posture:** Moderate-High. Manageable with disciplined scenario planning and pre-committed downgrade paths.

---

## 2. Risk Framework

### 2.1 Likelihood Scale

| Score | Label | Definition |
|-------|-------|------------|
| 1 | Rare | Less than 10% probability within planning horizon |
| 2 | Unlikely | 10-25% probability |
| 3 | Possible | 25-50% probability |
| 4 | Likely | 50-75% probability |
| 5 | Almost Certain | Greater than 75% probability |

### 2.2 Impact Scale

| Score | Label | Definition |
|-------|-------|------------|
| 1 | Negligible | Minor inconvenience; absorbed within current sprint. Cost impact < $500 |
| 2 | Minor | 1-2 week delay or $500-2,000 unplanned cost. Recoverable without plan change |
| 3 | Moderate | 1-2 month delay or $2,000-10,000 unplanned cost. Requires plan adjustment |
| 4 | Major | 3-6 month delay or $10,000-30,000 unplanned cost. Requires scenario downgrade |
| 5 | Critical | Project viability threatened. >6 month delay or >$30,000 unplanned cost. Requires pivot or shutdown decision |

### 2.3 Risk Score Interpretation

| Score Range | Level | Action Required |
|-------------|-------|-----------------|
| 1-4 | Low | Monitor quarterly |
| 5-9 | Medium | Monitor monthly; mitigation plan documented |
| 10-15 | High | Active mitigation in progress; escalation path defined |
| 16-25 | Critical | Immediate action required; contingency playbook activated |

### 2.4 Risk Ownership

| Owner Code | Role |
|------------|------|
| FOUNDER | Owner / Founder |
| FM1 | Founding Member 1 (Operations) |
| FM2 | Founding Member 2 (Technical Head) |
| ADV | Advisory Board |
| TEAM | Shared across core team |

---

## 3. Risk Categories

### 3.1 Category Definitions

| Category | Code | Scope |
|----------|------|-------|
| Funding | FUND | Capital availability, investor timing, cash flow, burn rate |
| Market | MKT | User adoption, demand validation, pricing acceptance, competitive entry |
| Regulatory | REG | Licensing, compliance, data protection, health authority approvals in Ethiopia and Kenya |
| Technical | TECH | Platform stability, security, integration failures, infrastructure |
| Team | TEAM | Key-person dependency, part-time fragmentation, hiring, burnout |
| Operational | OPS | Manual ops overload, staffing ladder, partner management, quality control |
| Geopolitical | GEO | Country-level instability, currency, sanctions, infrastructure |
| Competitive | COMP | Direct competitor entry, incumbent expansion, substitute products |

### 3.2 Category Heat Map Summary

| Category | Number of Risks | Average Score | Highest Score |
|----------|----------------|---------------|---------------|
| Funding | 4 | 14.0 | 20 |
| Market | 4 | 10.5 | 15 |
| Regulatory | 4 | 12.5 | 16 |
| Technical | 4 | 8.0 | 12 |
| Team | 4 | 13.3 | 16 |
| Operational | 5 | 12.4 | 16 |
| Geopolitical | 3 | 10.7 | 15 |
| Competitive | 2 | 10.0 | 12 |

---

## 4. Risk Register

### 4.1 Funding Risks

| ID | Category | Risk Description | L | I | Score | Mitigation Strategy | Trigger Point | Owner |
|----|----------|-----------------|---|---|-------|---------------------|---------------|-------|
| R-01 | FUND | **Investor pulls out after Pilot 1 / during transition.** Investor commits verbally but withdraws before capital is deployed, leaving the company mid-transition with elevated burn and no runway extension. | 3 | 5 | **15** | Maintain parallel conversations with 2-3 investor candidates. Never commit to spend levels that assume investor capital until funds are in the bank. Keep S1 downgrade path viable at all times. Structure term sheet with binding commitment milestones. | Verbal commitment not converted to signed term sheet within 45 days of Pilot 1 completion. | FOUNDER |
| R-02 | FUND | **Funding delay extends self-funded runway beyond capacity.** Investor timeline slips by 3-6 months. Founder capital depleted before external capital arrives. Monthly burn at Pilot 1 ($2,482 ops + $14,830 team + $270-520 infra = ~$17,582-17,832/mo per params.md) exhausts reserves. | 4 | 5 | **20** | Cap self-funded commitment at a fixed dollar ceiling (e.g., $60,000). Track burn weekly against ceiling. If 70% consumed without investor term sheet signed, trigger immediate downgrade to S1-L1. | Burn reaches 70% of founder capital ceiling without signed investor commitment. | FOUNDER |
| R-03 | FUND | **Revenue ramp slower than projected.** Pilot 1 revenue at $0-500/mo (per params.md) insufficient to offset any meaningful portion of burn. Pilot 2 at $500-3,000/mo still leaves a large gap. Investor evaluates traction as insufficient. | 4 | 3 | **12** | Set minimum viable traction metrics independent of revenue: active users, consultation completion rate, partner clinic retention. Frame investor pitch around engagement velocity, not revenue, during pilot phases. | Pilot 1 ends with <200 active users and <50 completed consultations despite 1,000 registrations. | FOUNDER |
| R-04 | FUND | **FX depreciation erodes purchasing power.** Ethiopian birr (ETB) or Kenyan shilling (KES) depreciates faster than the 10-15% buffer in params.md. Revenue collected in local currency buys less operational capacity. | 3 | 3 | **9** | Collect revenue in local currency but maintain cost base in USD/INR. Apply 15% depreciation buffer on ETB (already in params.md). Consider dynamic pricing that adjusts quarterly to FX movements. Hold operating reserves in USD. | ETB depreciates >20% against USD within any 6-month window. | ADV |

### 4.2 Market Risks

| ID | Category | Risk Description | L | I | Score | Mitigation Strategy | Trigger Point | Owner |
|----|----------|-----------------|---|---|-------|---------------------|---------------|-------|
| R-05 | MKT | **Ethiopia market does not respond.** Patient willingness to pay for telemedicine in Addis Ababa is lower than benchmarked. Cultural preference for in-person visits dominates. ETB 150-300 per GP consult (params.md) is seen as too expensive relative to free/subsidized government clinics. | 3 | 4 | **12** | Validate pricing with 50-user focus group before Pilot 1 launch. Offer first consultation free. Position platform as complementary to in-person (booking, follow-up, prescriptions) rather than replacement. Pivot to B2B clinic-management SaaS if B2C demand is weak. | <5% conversion rate from registration to first paid consultation after 60 days of Pilot 1. | FM1 |
| R-06 | MKT | **Partner clinic dropout.** Clinics, pharmacies, or labs that sign up for Pilot 1 disengage due to low patient volume, payment delays, or operational friction. Loss of 50%+ partners collapses the supply side. | 3 | 4 | **12** | Over-recruit partners (target 2x the minimum needed). Assign dedicated relationship manager (FM1). Provide monthly partner performance reports. Offer first 3 months commission-free to reduce partner risk. | More than 30% of signed partners inactive (zero transactions) for 30+ consecutive days during Pilot 1. | FM1 |
| R-07 | MKT | **Pricing undercut by competitors.** Free or heavily subsidized competitor enters the same geography, making Health Hub's consultation fees uncompetitive. | 2 | 3 | **6** | Differentiate on care coordination and admin-assisted model, not price alone. Build switching costs through patient history, prescription continuity, and relationship with assigned GP. Monitor competitor pricing quarterly. | Competitor launches free GP consultations in Addis Ababa or Nairobi with >1,000 users. | FOUNDER |
| R-08 | MKT | **Patient trust deficit.** Users register but do not complete consultations due to distrust of remote healthcare, concerns about doctor quality, or data privacy fears. | 3 | 4 | **12** | Display doctor credentials prominently. Offer video consultations (not just chat) to build face-to-face trust. Publish patient testimonials (with consent). Obtain visible endorsements from local medical associations if possible. | Consultation abandonment rate >40% (patient books but does not attend). | FM1 |

### 4.3 Regulatory Risks

| ID | Category | Risk Description | L | I | Score | Mitigation Strategy | Trigger Point | Owner |
|----|----------|-----------------|---|---|-------|---------------------|---------------|-------|
| R-09 | REG | **Ethiopia regulatory delay.** Ministry of Health or INSA (Information Network Security Agency) imposes new digital health licensing requirements mid-pilot. Approval process takes 6-12 months, forcing a pause on Ethiopian operations. | 3 | 5 | **15** | Engage regulatory advisor with MOH connections before Pilot 1. Operate Pilot 1 as a "research partnership" with a licensed clinic (clinic holds the license, Health Hub is the technology partner). Prepare all compliance documentation proactively. | MOH issues formal notice requiring digital health platform licensing that Health Hub does not hold. | ADV |
| R-10 | REG | **Kenya PPB/regulatory barrier.** Kenya's Pharmacy and Poisons Board or Health Act compliance requirements create barriers to pharmacy commission model or telemedicine operations. | 2 | 4 | **8** | Delay Kenya entry until Ethiopia pilot proves model. Engage Nairobi-based health-tech legal counsel during Pilot 2 to pre-clear regulatory path. Partner with a licensed Kenyan telemedicine provider for market entry. | Legal counsel advises that Health Hub's model requires a license Health Hub cannot obtain within 6 months. | ADV |
| R-11 | REG | **Data privacy / breach.** Patient health data is exposed through a security incident, triggering regulatory action, patient trust collapse, and potential legal liability. Ethiopia and Kenya have emerging but real data protection laws. | 2 | 5 | **10** | Encrypt all patient data at rest and in transit (already implemented in prototype). Conduct penetration testing before Pilot 1. Implement audit logging for all data access. Maintain incident response plan. Purchase cyber liability insurance if available. | Any unauthorized access to patient health records, regardless of scale. | FM2 |
| R-12 | REG | **Cross-border data residency requirements.** Ethiopia or Kenya requires patient data to be stored in-country, making the current Render (US-hosted) deployment non-compliant. | 3 | 4 | **12** | Research data residency requirements before Pilot 1 for both countries. Render supports regional deployments; evaluate Singapore or EU regions as intermediary. Plan for potential migration to local cloud provider (e.g., Safaricom Cloud in Kenya, or local data center in Ethiopia). | Government regulation explicitly requiring in-country data storage is enacted or enforced. | FM2 |

### 4.4 Technical Risks

| ID | Category | Risk Description | L | I | Score | Mitigation Strategy | Trigger Point | Owner |
|----|----------|-----------------|---|---|-------|---------------------|---------------|-------|
| R-13 | TECH | **APK development delays.** Android APK (480 hours, $7,200 per params.md) is delayed beyond Pilot 1 target. The patient-facing mobile app is the primary user interface for East Africa. | 3 | 4 | **12** | Track APK progress weekly with milestone checkpoints. Maintain web PWA as fallback for patient access if APK is delayed. Identify backup Android developer who can be onboarded in <2 weeks. | APK is less than 60% complete 4 weeks before Pilot 1 launch date. | FM2 |
| R-14 | TECH | **Platform stability under load.** Express 5 server or PostgreSQL database fails under Pilot 2 load (5,000-10,000 users per params.md). WebSocket connections drop, video calls fail, or API response times exceed 3 seconds. | 2 | 3 | **6** | Conduct load testing at 2x expected Pilot 1 traffic before launch. Implement horizontal scaling on Render. Add database connection pooling. Monitor with structured logging (already implemented). Set up alerting thresholds. | API p95 latency >2 seconds or >1% error rate during Pilot 1 operations. | FM2 |
| R-15 | TECH | **Payment infrastructure mismatch.** Stripe (identified as recommended payment SDK in params.md) does not support ETB or direct mobile money (Telebirr, M-Pesa) integration. Patients cannot pay through their preferred method. | 4 | 3 | **12** | Research and prototype Telebirr API integration before Pilot 1. For Kenya, evaluate M-Pesa Daraja API. Maintain manual payment reconciliation as interim (patient pays via mobile money, admin confirms receipt). Accept that Stripe is for international/card payments only, not primary EA channel. | No programmatic mobile money integration available 30 days before Pilot 1 launch. | FM2 |
| R-16 | TECH | **Daily.co video quality in EA.** Video consultation quality is unusable on typical East African internet connections (2G/3G prevalent outside major cities). Latency, drops, and bandwidth constraints make video impractical. | 3 | 2 | **6** | Implement audio-only fallback mode. Test Daily.co on throttled connections (simulating 3G). Design consultation flow to work with chat + audio as primary, video as upgrade. Consider WebRTC alternatives with better low-bandwidth performance. | >30% of video consultations fail or are abandoned due to connection quality during Pilot 1. | FM2 |

### 4.5 Team Risks

| ID | Category | Risk Description | L | I | Score | Mitigation Strategy | Trigger Point | Owner |
|----|----------|-----------------|---|---|-------|---------------------|---------------|-------|
| R-17 | TEAM | **Key-person dependency (Founder).** Founder holds 60% equity, all investor relationships, product vision, and strategic direction. Incapacitation, burnout, or departure collapses the company. No succession plan exists. | 4 | 4 | **16** | Document all investor contacts, strategic plans, and decision frameworks in shared repository. Grant FM1 and FM2 co-signatory authority on company accounts. Draft a basic continuity plan (who takes over which responsibilities). Founder should not be single point of contact for >2 critical relationships. | Founder unavailable for >2 consecutive weeks without prior delegation. | TEAM |
| R-18 | TEAM | **Part-time team fragmentation.** All 12 contributors work 4 hours/day (per params.md). Coordination overhead consumes 15-25% of productive time. Knowledge is fragmented across people who are never online simultaneously. Context-switching between Health Hub and other commitments degrades output quality. | 4 | 3 | **12** | Mandate 2-hour overlap window for all contributors. Use async-first communication (documented decisions, not verbal). Maintain comprehensive technical documentation. Pair contributors on critical tasks to reduce single-point knowledge. | Sprint velocity drops >30% for 2 consecutive sprints, or critical tasks are blocked >5 days waiting for a specific contributor. | FM2 |
| R-19 | TEAM | **Developer attrition.** One or more of the 7 part-time developers leaves (finds full-time employment, loses interest, personal reasons). Replacement takes 4-8 weeks, during which capacity drops by 12-14%. | 3 | 3 | **9** | Maintain documentation sufficient for new developer onboarding in <1 week. Keep a shortlist of 2-3 pre-vetted backup developers. Offer equity participation to key developers to increase retention. Ensure no single developer is the only person who understands a critical subsystem. | Any developer signals intent to leave, or becomes unresponsive for >1 week without prior notice. | FM2 |
| R-20 | TEAM | **Ops staff hiring difficulty.** MBBS doctors at INR 60,000/mo (per params.md) prove difficult to recruit for telemedicine in the required volume. Doctor quality varies, impacting patient satisfaction. | 3 | 4 | **12** | Begin doctor recruitment 2 months before Pilot 1. Partner with telemedicine staffing agencies. Offer performance bonuses tied to patient satisfaction scores. Develop structured training protocol so doctors can be productive within 1 week. Accept slightly higher salary (INR 70,000-75,000) if needed to secure quality. | <2 doctors recruited and trained 2 weeks before Pilot 1 launch. | FM1 |

### 4.6 Operational Risks

| ID | Category | Risk Description | L | I | Score | Mitigation Strategy | Trigger Point | Owner |
|----|----------|-----------------|---|---|-------|---------------------|---------------|-------|
| R-21 | OPS | **Manual operations overload.** The admin-assisted model (callbacks, manual prescription fulfillment, partner coordination) does not scale. 2 admin ops staff (Pilot 1 per params.md) are overwhelmed at 500+ active patients. Quality of care navigation degrades. | 4 | 4 | **16** | Define maximum patient-to-admin ratio (target: 250:1 for active patients). Track admin workload weekly. Automate the highest-volume manual tasks first (appointment confirmation, prescription routing). Hire additional admin ops ahead of demand, not after overload. | Average admin handling time per patient interaction >15 minutes, or admin backlog >50 unresolved callbacks. | FM1 |
| R-22 | OPS | **Doctor availability gaps.** With 2 doctors covering Pilot 1 (per params.md), any absence creates zero coverage. Patients requesting consultations during gaps receive no response, damaging trust. | 3 | 4 | **12** | Hire 3 doctors instead of 2 for Pilot 1 (one as buffer). Implement scheduling system that shows availability before patient books. Partner with a locum agency for emergency coverage. Clearly communicate operating hours to patients. | Any 4-hour window during published operating hours with zero doctor availability. | FM1 |
| R-23 | OPS | **Partner coordination failure.** Pharmacy or lab partners do not fulfill orders placed through the platform. Prescription sent to pharmacy goes unfilled; lab results not uploaded. Patients blame Health Hub, not the partner. | 3 | 4 | **12** | Implement SLA tracking per partner. Set up automated alerts when orders are not acknowledged within 2 hours. Maintain backup partner for each service category. Include SLA commitments in partner agreements. | >10% of pharmacy orders or lab orders unfulfilled within 24 hours during any week of Pilot 1. | FM1 |
| R-24 | OPS | **Training and SOP gaps.** Doctors or admin staff operate without adequate training, leading to inconsistent patient experiences, protocol violations, or medical errors. 750 hours of parallel operational workstreams (per params.md) not completed on time. | 3 | 4 | **12** | Prioritize training protocol completion as a gating criterion for Pilot 1 launch. No pilot launch without at minimum: doctor consultation protocol, admin callback SOP, and escalation tree. Track SOP completion as a project milestone, not a background task. | Pilot 1 launch date reached with <80% of critical SOPs complete. | FM1 |
| R-25 | OPS | **Quality control at scale.** As user base grows from Pilot 1 (1,000) to Pilot 2 (5,000-10,000), consultation quality, response times, and care coordination accuracy degrade. No systematic quality monitoring in place. | 3 | 3 | **9** | Implement patient satisfaction surveys after every consultation. Monitor key quality metrics: wait time, consultation duration, prescription accuracy, follow-up completion. Conduct monthly quality audits (random sample of 5% of consultations). Set minimum quality thresholds as scaling gates. | Patient satisfaction score drops below 3.5/5.0 average, or average wait time exceeds 30 minutes. | FM1 |

### 4.7 Geopolitical Risks

| ID | Category | Risk Description | L | I | Score | Mitigation Strategy | Trigger Point | Owner |
|----|----------|-----------------|---|---|-------|---------------------|---------------|-------|
| R-26 | GEO | **Internet/power reliability in Ethiopia.** Ethio Telecom network outages or power grid instability make the platform intermittently unreachable for patients. Ethiopia has experienced nationwide internet shutdowns. | 4 | 3 | **12** | Design the APK for offline-first where possible (cache patient history, queue consultation requests). Implement SMS-based appointment confirmation as fallback. Partner with clinics that have generator backup. Accept that uptime SLA in Ethiopia will be lower than Kenya. | >3 days of national or Addis Ababa-wide internet disruption within any month during pilot. | FM2 |
| R-27 | GEO | **Ethiopian birr severe depreciation or capital controls.** Government imposes stricter capital controls, making it difficult to repatriate revenue or convert ETB to USD. Birr drops >30% against USD, making local revenue nearly worthless in USD terms. | 3 | 5 | **15** | Maintain minimal ETB holdings (convert to USD or goods quickly). Price services with quarterly FX adjustment clause. Negotiate with partners for USD-denominated contracts where possible. Diversify to Kenya earlier to reduce single-currency dependency. | ETB depreciates >25% against USD in any 6-month period, or new capital controls restrict repatriation. | ADV |
| R-28 | GEO | **Political instability or conflict.** Civil unrest, ethnic conflict, or political crisis in Ethiopia or Kenya disrupts operations, partner relationships, or user access. Ethiopia has experienced significant internal conflict in recent years. | 2 | 5 | **10** | Maintain ability to operate the platform remotely (team is not physically in EA). Diversify across two countries so one market can sustain operations if the other is disrupted. Do not invest in physical infrastructure (offices, equipment) in EA until Production phase. | Active conflict or government-imposed restrictions affecting Addis Ababa or the primary operating region. | FOUNDER |

### 4.8 Competitive Risks

| ID | Category | Risk Description | L | I | Score | Mitigation Strategy | Trigger Point | Owner |
|----|----------|-----------------|---|---|-------|---------------------|---------------|-------|
| R-29 | COMP | **Safaricom or M-Pesa ecosystem launches health service.** Safaricom (Kenya) leverages its 33 million M-Pesa users to launch an integrated health platform. Instant distribution advantage that Health Hub cannot match. | 2 | 5 | **10** | Focus on Ethiopia first (where Safaricom is not dominant). In Kenya, position as a specialist/coordination layer on top of basic telemedicine, not a competitor to basic GP access. Build deep partner integrations that a telco platform would not replicate quickly. Consider partnership with Safaricom rather than competition. | Safaricom announces or launches a telemedicine/health platform in Kenya. | FOUNDER |
| R-30 | COMP | **mPharma, Helium Health, or funded health-tech expands to Ethiopia.** An established African health-tech company with >$10M in funding enters Addis Ababa with a similar model. | 2 | 4 | **8** | Move fast through Pilot 1 to establish first-mover relationships with clinics and pharmacies. Build partner lock-in through integration depth (not just listings). Monitor competitor fundraising and expansion announcements. Differentiate on admin-assisted care coordination model. | Funded competitor announces Ethiopia expansion or begins partner recruitment in Addis Ababa. | FOUNDER |

### 4.3 Risk Score Distribution Summary

| Score Range | Count | Risks |
|-------------|-------|-------|
| 16-25 (Critical) | 3 | R-02, R-17, R-21 |
| 10-15 (High) | 15 | R-01, R-03, R-05, R-06, R-08, R-09, R-12, R-13, R-15, R-18, R-20, R-22, R-23, R-24, R-26, R-27, R-29 |
| 5-9 (Medium) | 8 | R-04, R-07, R-10, R-11, R-14, R-16, R-19, R-25, R-28, R-30 |
| 1-4 (Low) | 0 | — |

**Top 5 risks by score:**

1. **R-02** (FUND, Score 20): Funding delay extends self-funded runway beyond capacity
2. **R-17** (TEAM, Score 16): Key-person dependency on Founder
3. **R-21** (OPS, Score 16): Manual operations overload
4. **R-01** (FUND, Score 15): Investor pulls out after Pilot 1
5. **R-09** (REG, Score 15): Ethiopia regulatory delay
5. **R-27** (GEO, Score 15): Ethiopian birr severe depreciation

---

## 5. Scenario-Specific Failure Modes

### 5.1 What If Pilot 1 Fails?

**Definition of failure:** <200 active users after 3 months, <50 completed consultations, >50% partner attrition, or patient satisfaction <3.0/5.0.

| Consequence | Impact | Response |
|------------|--------|----------|
| Investor narrative collapses | Cannot demonstrate product-market fit; S2 and S3 investor timelines become irrelevant | Pivot to B2B clinic-management SaaS model (sell the admin tools, not the patient marketplace). Requires 2-3 month repositioning |
| Team morale and retention | Part-time contributors question viability; attrition risk spikes | Honest post-mortem with team. Offer increased equity to remaining contributors. Reduce scope to single vertical (GP consultations only) |
| Founder capital exhausted on failed pilot | $25,000-40,000 spent with no traction | Pause all spending. Evaluate whether the product or the market was the problem. If product: fix and retry with remaining runway. If market: consider Kenya-first pivot |
| Partner trust destroyed | Clinics and pharmacies will not re-engage | Recruit new partners for retry; cannot use same clinic set |

**Recovery path:** Reduce to S1-L1. Strip scope to GP-only consultations in a single clinic partnership. Rebuild traction data over 3 months. If successful, re-approach investors with revised narrative.

### 5.2 What If the Investor Pulls Out Mid-Transition?

**Scenario:** Company is in S2 or S3. Investor has been in discussions for 2-3 months. Company has already committed to elevated burn (hired ops staff, expanded infrastructure). Investor withdraws.

| Consequence | Impact | Response |
|------------|--------|----------|
| Immediate cash crisis | Monthly burn at Pilot 1 level: ~$17,600/mo (per params.md). Founder reserves may cover 1-3 months at this rate | Trigger Emergency Downgrade Playbook (see Section 7.2). Cut burn to S1-L1 levels within 2 weeks |
| Ops staff layoffs | 2 doctors + 2 admin + 2 tech support must be reduced | Retain 1 doctor + 1 admin. Suspend tech support (FM2 absorbs). Reduce to 12-hour/day coverage |
| Development freeze | Cannot pay developer rates | Pause all non-critical development. Retain only 2 developers on equity-only basis for critical fixes |
| Morale collapse | Team sees project as dying | Founder must personally communicate plan and timeline for recovery. Transparency about runway is essential |

**Recovery path:** Immediately seek bridge funding (smaller amount, 3-6 month runway). Approach angel investors or accelerator programs. Simultaneously pursue alternative revenue (consulting, white-label licensing).

### 5.3 What If Regulatory Blocks Ethiopia?

**Scenario:** Ethiopian MOH or INSA issues a requirement that blocks Health Hub from operating without a license that takes 6-12 months to obtain.

| Consequence | Impact | Response |
|------------|--------|----------|
| Ethiopia operations paused | Cannot serve Ethiopian patients during licensing period | Pivot all operational resources to Kenya. Accelerate Kenya market entry from Pilot 2 to immediate |
| Revenue timeline shifts | Kenya has higher GDP per capita but different competitive landscape | Kenya revenue potential is higher per user but market is more competitive (Safaricom, M-Doc, MyDawa) |
| Sunk cost on Ethiopia-specific work | Partner relationships, Telebirr integration, ETB pricing — partially wasted | Some transferable (platform, training). Telebirr integration is not transferable. Budget $3,000-5,000 for Kenya-specific integrations (M-Pesa) |
| Investor perception | Regulatory risk materialized; investor may see this as vindication of caution | Frame as "regulatory validation of market importance" and pivot strength. Kenya market is better understood by international investors |

**Recovery path:** Operate through licensed clinic partner in Ethiopia (Health Hub as tech provider, not healthcare provider). Simultaneously pursue own license. Launch Kenya pilot within 60 days of Ethiopia block.

### 5.4 What If Ethiopia Market Does Not Respond?

**Scenario:** Pilot 1 launches successfully (technically), partners are engaged, doctors are available — but patients do not convert. Adoption is negligible despite marketing spend.

| Consequence | Impact | Response |
|------------|--------|----------|
| Demand hypothesis invalidated for Ethiopia | ~$25,000 spent on pilot with no traction | Conduct exit interviews with registered-but-inactive users. Identify: Is it pricing? Trust? Awareness? UX? |
| Ethiopia-first strategy questioned | Time and capital invested in the harder market first | If the problem is Ethiopia-specific (cultural, economic, infrastructure), pivot to Kenya-first. If the problem is product-level, it will persist in Kenya too |

**Decision tree:**
- If >500 registrations but <5% conversion: **Pricing or trust problem**. Test free consultations for 30 days. If conversion jumps, pricing model needs adjustment.
- If <200 registrations: **Awareness problem**. Marketing and distribution strategy failed, not the product. Double down on partner-led acquisition (clinics refer patients to platform).
- If registrations and conversions both low: **Product-market fit problem**. Requires fundamental rethink of value proposition for EA market.

---

## 6. Downgrade Paths

### 6.1 Downgrade Logic: S3 to S2 to S1

The scenario framework (per params.md) is designed to be traversable in reverse. The company can always move to a lower-cost, lower-speed scenario without losing the work already done.

```
S3 (Investor After Pilot 1)
  │
  │  Trigger: Investor delays >3 months past Pilot 1 completion
  │  OR: Pilot 1 traction insufficient for investor confidence
  ▼
S2 (Investor During Transition)
  │
  │  Trigger: No investor commitment by end of Pilot 2 month 3
  │  OR: Founder capital reaches 70% depletion
  ▼
S1 (Fully Self-Funded)
  │
  │  Trigger: No investor interest after 12+ months of operation
  │  OR: Founder decides to retain full equity
  ▼
S1-L1 (Survival Mode)
```

### 6.2 What Gets Cut First (Ordered)

When downgrading, cuts happen in this sequence:

| Priority | Item Cut | Monthly Savings | Impact |
|----------|----------|----------------|--------|
| 1st | Tech support staff (2 people) | $602/mo | Dev team absorbs L1 support; response times increase |
| 2nd | Admin ops (reduce from 2 to 1) | $217/mo | Callback capacity halved; some manual processes delayed |
| 3rd | Infrastructure tier downgrade | $100-300/mo | Slower performance; reduced monitoring; shared DB |
| 4th | Developer team (reduce from 7 to 4) | $2,640-3,520/mo | Feature velocity drops 40-50%; maintenance-only mode |
| 5th | Doctor staff (reduce from 2 to 1) | $720/mo | Coverage drops to single-shift; limited consultation hours |
| 6th | Advisory board compensation | $750/mo | Advisors continue informally or are released |
| 7th | Kenya expansion deferred indefinitely | $0 (future cost avoided) | Single-market focus reduces complexity but limits growth narrative |

### 6.3 What Is Preserved at All Costs

Even in S1-L1 survival mode, these must be maintained:

| Item | Monthly Cost | Why Non-Negotiable |
|------|-------------|-------------------|
| Minimum hosting (Render) | $50-80/mo | Platform must remain accessible |
| 1 MBBS doctor | $720/mo | Cannot operate a health platform with zero clinical coverage |
| 1 Admin ops person | $217/mo | Admin-assisted model is the core differentiator |
| 2 developers (equity-compensated) | $0 cash / equity | Must maintain ability to fix bugs and release updates |
| Founder time | $0 cash | Founder continues without compensation |

**S1-L1 survival burn rate:** ~$1,000-1,100/mo cash + equity obligations.

### 6.4 Upgrade Triggers (Moving Back Up)

| Current State | Upgrade To | Trigger |
|---------------|-----------|---------|
| S1-L1 | S1-L2 | Monthly revenue consistently >$500 for 3 months; or additional founder capital injected |
| S1-L2 | S2 | Investor term sheet signed; or monthly revenue >$2,000 |
| S2 | S3 | Investor capital deployed; monthly revenue trajectory supports expanded burn |

---

## 7. Contingency Playbooks

### 7.1 Playbook A — Funding Gap (Triggers: R-01, R-02)

**Scenario:** Investor capital does not arrive when expected. Self-funded runway is running out.

**Timeline:** Execute within 14 days of trigger.

| Day | Action | Owner | Deliverable |
|-----|--------|-------|-------------|
| 1-2 | Assess remaining runway in days at current burn rate | FOUNDER | Cash runway report |
| 2-3 | Notify all contributors of situation (transparent communication) | FOUNDER | Team communication |
| 3-5 | Execute cuts per Section 6.2 priority order until burn matches runway | FM1 | Revised budget |
| 5-7 | Contact 3-5 alternative funding sources (angels, accelerators, grants) | FOUNDER + ADV | Outreach list and initial conversations |
| 7-10 | Restructure developer compensation to equity-heavy (reduce cash component by 50%) | FOUNDER | Revised contributor agreements |
| 10-14 | Launch bridge funding round (target: 3-month runway at reduced burn) | FOUNDER + ADV | Bridge pitch deck |
| 14+ | Operate at reduced capacity; reassess monthly | TEAM | Monthly survival review |

**Exit criteria:** Bridge funding secured, or monthly revenue covers >50% of reduced burn, or new investor term sheet signed.

### 7.2 Playbook B — Emergency Downgrade (Trigger: R-02 at critical threshold)

**Scenario:** Founder capital at or below 15% of ceiling. No investor. Revenue insufficient.

**Timeline:** Execute within 7 days.

| Day | Action | Owner | Deliverable |
|-----|--------|-------|-------------|
| 1 | Freeze all non-essential spending immediately | FOUNDER | Spending freeze memo |
| 1-2 | Reduce ops staff to minimum (1 doctor, 1 admin, 0 tech support) | FM1 | Revised staffing plan |
| 2-3 | Downgrade all infrastructure to minimum tier | FM2 | Infrastructure change log |
| 3-5 | Convert remaining developers to equity-only or release with 2-week notice | FOUNDER | Revised team structure |
| 5-7 | Communicate to active users: reduced operating hours, ongoing commitment | FM1 | User communication |
| 7 | Operate at S1-L1 survival burn (~$1,000-1,100/mo) | TEAM | Survival mode active |

**Exit criteria:** New funding source identified, or revenue ramp makes S1-L2 viable.

### 7.3 Playbook C — Regulatory Block (Triggers: R-09, R-10)

**Scenario:** Regulatory authority in primary market (Ethiopia) blocks operations.

**Timeline:** Execute within 30 days.

| Day | Action | Owner | Deliverable |
|-----|--------|-------|-------------|
| 1-3 | Obtain formal written notice of regulatory requirement | ADV | Regulatory notice document |
| 3-7 | Engage local legal counsel to assess timeline for compliance | ADV + FOUNDER | Legal assessment |
| 7-14 | If compliance timeline >6 months: initiate Kenya pivot | FOUNDER | Kenya market entry plan |
| 7-14 | If compliance timeline <6 months: pursue compliance while maintaining partner relationships | ADV | Compliance roadmap |
| 14-21 | For Kenya pivot: begin M-Pesa integration, identify Nairobi clinic partners | FM1 + FM2 | Kenya partner pipeline |
| 21-30 | For Kenya pivot: adapt APK and web platform for KES pricing, Kenyan phone numbers | FM2 | Platform localization |
| 30+ | Launch Kenya Pilot 1 (reuse Ethiopia playbooks and SOPs) | TEAM | Kenya pilot launch |

**Exit criteria:** Operating legally in at least one East African market.

### 7.4 Playbook D — Pilot 1 Failure (Triggers: R-05, R-06, R-08)

**Scenario:** Pilot 1 produces insufficient traction after 90 days.

**Timeline:** 90-day assessment, then 30-day pivot decision.

| Day | Action | Owner | Deliverable |
|-----|--------|-------|-------------|
| 90 (Pilot 1 assessment) | Review all Pilot 1 metrics against defined thresholds | FOUNDER + FM1 | Pilot 1 post-mortem report |
| 91-95 | Conduct 20+ user interviews (active and inactive) | FM1 | User feedback synthesis |
| 95-100 | Identify root cause: pricing, trust, awareness, product, or market | TEAM | Root cause analysis |
| 100-110 | If pricing: design and launch 30-day free trial | FM1 | Revised pricing experiment |
| 100-110 | If awareness: partner-led acquisition push (clinics refer patients) | FM1 | Revised acquisition plan |
| 100-110 | If product: prioritize top 3 user-requested features for 60-day sprint | FM2 | Product sprint plan |
| 100-110 | If market: evaluate Kenya pivot per Playbook C | FOUNDER | Market pivot assessment |
| 120 | Decision point: retry Ethiopia, pivot to Kenya, or downgrade to S1-L1 | FOUNDER | Strategic decision document |

**Exit criteria:** Clear path to Pilot 1 re-attempt with revised approach, or Kenya pivot initiated, or controlled wind-down to survival mode.

### 7.5 Playbook E — Key Person Incapacitation (Trigger: R-17)

**Scenario:** Founder is unable to fulfill duties for >2 weeks (medical, personal, burnout).

**Timeline:** Immediate activation.

| Day | Action | Owner | Deliverable |
|-----|--------|-------|-------------|
| 1 | FM1 assumes operational leadership; FM2 assumes technical leadership | FM1 + FM2 | Leadership continuity confirmed |
| 1-3 | Access shared documentation for investor contacts, strategic plans, account credentials | FM1 | Access verification |
| 3-5 | Notify investors and key partners of temporary leadership change | FM1 | Stakeholder communication |
| 5-7 | Assess current phase and determine if any decisions can be deferred | FM1 + FM2 | Decision deferral list |
| 7+ | Operate in maintenance mode: no major strategic decisions, continue current phase execution | FM1 + FM2 | Weekly status updates to team |
| Ongoing | If >60 days: Board (advisors + founding team) decides on permanent leadership structure | ADV + FM1 + FM2 | Governance decision |

**Exit criteria:** Founder returns to duties, or permanent leadership transition completed.

---

## 8. Risk Monitoring Cadence

### 8.1 Regular Review Schedule

| Frequency | Activity | Owner | Output |
|-----------|----------|-------|--------|
| Weekly | Review top 5 risks (R-02, R-17, R-21, R-01, R-09) — status and score changes | FOUNDER | Weekly risk update (5 minutes in team sync) |
| Monthly | Full risk register review — re-score all 30 risks, add new risks, retire resolved risks | FOUNDER + ADV | Updated risk register |
| Per-phase transition | Comprehensive risk assessment before entering next phase | TEAM | Phase transition risk report |
| Trigger-based | Activate relevant playbook immediately when trigger condition is met | As defined per risk | Playbook execution log |

### 8.2 Risk Score Trend Tracking

Maintain a simple trend indicator for each risk:

| Indicator | Meaning |
|-----------|---------|
| Rising | Risk score increased since last review; requires escalated attention |
| Stable | Risk score unchanged; current mitigation is holding |
| Falling | Risk score decreased; mitigation is working or external conditions improved |
| New | Risk identified since last review |
| Retired | Risk no longer applicable (e.g., regulatory approval obtained) |

### 8.3 Escalation Protocol

| Condition | Action |
|-----------|--------|
| Any risk reaches score 20+ | Immediate founder review; playbook activation within 48 hours |
| Any risk increases by 5+ points in a single review | Root cause analysis required before next action |
| 3+ risks in same category all at "High" or above | Category-level strategic review (is the entire approach flawed?) |
| Playbook activated but not resolving within stated timeline | Escalate to advisory board for external perspective |

---

*End of Document 13 — Risk Register & Contingency Planning*
*All figures reference params.md. Risk scores should be re-evaluated monthly and at each phase transition.*
