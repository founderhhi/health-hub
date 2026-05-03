# 08 — Customer Acquisition

**Health Hub Business Plan v2 | Document 8 of 15**
**Version:** 2.0 | **Date:** March 2026 | **Covers:** All 21 scenario x level combinations

> All assumptions, rates, phase definitions, and scenario codes in this document
> trace back to [params.md](params.md). When this document says "per params.md,"
> it means the v2 shared assumptions document.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Customer Segments](#2-customer-segments)
3. [Acquisition Channels](#3-acquisition-channels)
4. [CAC Model](#4-cac-model)
5. [LTV Model](#5-ltv-model)
6. [Acquisition Funnel](#6-acquisition-funnel)
7. [Scenario Analysis — All 21 Combinations](#7-scenario-analysis--all-21-combinations)
8. [Retention and Churn Strategy](#8-retention-and-churn-strategy)
9. [Key Metrics Dashboard](#9-key-metrics-dashboard)
10. [Key Takeaways](#10-key-takeaways)

---

## 1. Executive Summary

Health Hub's customer acquisition strategy is built on a single structural
insight: in East Africa, patients follow providers. The facility — the clinic,
the hospital, the pharmacy, the lab — is the unit of distribution.
Onboarding one facility delivers 50-200 patients at near-zero marginal cost.
This makes B2B facility acquisition the highest-leverage go-to-market activity
through Pilot 2, and a persistent organic base layer even at Production scale.

This document models acquisition costs, channels, funnels, and LTV:CAC ratios
across all 21 scenario x level combinations defined in params.md. It
introduces a key v2 addition: **admin ops staff as a manual acquisition and
conversion channel**. Health Hub's operating model employs admin ops staff
(per params.md Section 4) who handle callbacks, patient onboarding assistance,
and inquiry-to-customer conversion. This human layer — unique among health tech
platforms in the region — functions as a high-touch acquisition channel with
measurable CAC and conversion rates.

### Central findings

- **Facility-first acquisition** dominates all channels through Pilot 2.
  Each onboarded facility generates 50-200 patient registrations organically.
- **Admin ops callbacks** convert 30-50% of inbound inquiries into registered
  users, functioning as a low-CAC manual acquisition channel from Pilot 1
  onward.
- **Blended B2C CAC** remains below $1.00 in founder-led phases (Pre-Pilot
  through Pilot 1), rises to $1-3 at Pilot 2, and $2-5 at Production as paid
  channels scale.
- **All 21 combinations achieve viable unit economics.** LTV:CAC ratios range
  from 4.6x (S3-L3-I3, maximum spend) to 23x+ (S1-L1, maximum efficiency).
  No combination enters the sub-3x danger zone.
- **The baseline plan (S2-O2-I2)** projects a blended CAC of $1.50 at Pilot 2
  and $2.50 at Production, with LTV:CAC exceeding 5x once subscription
  revenue stabilizes.

### Strategic principles

| Principle | Rationale |
|-----------|-----------|
| Facility-first | Every onboarded facility generates 50-200 patient registrations organically, making B2B acquisition the primary growth lever |
| Admin-assisted conversion | Employed admin ops staff handle callbacks and onboarding, converting inquiries at 30-50% — a manual channel unique to Health Hub |
| Mobile-money native | M-Pesa (Kenya) and Telebirr (Ethiopia) integration removes payment friction, the largest barrier to conversion in East Africa |
| WhatsApp as distribution | 40M+ WhatsApp users across Ethiopia and Kenya; community-based distribution is the highest-ROI digital B2C channel |
| Android-first timing | Android app launch (mid-Pilot 1) unlocks Play Store distribution, which becomes the dominant scaled B2C channel by Pilot 2 |
| Retention over acquisition | A 5-point churn reduction doubles LTV, delivering higher ROI than equivalent top-of-funnel spend |

---

## 2. Customer Segments

### 2.1 B2B: Healthcare Facilities

| Segment | Description | Acquisition Strategy | Decision Maker | Est. Facilities in Addis Ababa | Priority |
|---------|-------------|---------------------|----------------|-------------------------------|----------|
| Private clinics (1-5 doctors) | Primary target. High density in urban areas, owner-operated, fast decision cycles (~2-4 weeks). Represent 70-80% of private healthcare delivery in Ethiopia. | Founder-led direct sales, warm introductions, admin ops follow-up calls | Clinic owner / managing doctor | 2,000-3,000 | Highest — Pilot 1 onward |
| Private hospitals (6+ doctors) | Secondary target. Higher patient volume per facility (500-2,000 patients/mo) but longer sales cycles (4-8 weeks) and procurement processes. | Referral from onboarded clinics, partnership proposals, conference networking, admin ops relationship management | Hospital administrator / CTO / medical director | 200-400 | High — Pilot 2 onward |
| Pharmacy chains (2+ outlets) | Pharmacy module users. Often co-located with or adjacent to clinics, creating natural bundling opportunities. Revenue via take-rate on order value. | Bundle with clinic onboarding, direct outreach to chain owners, admin ops coordination for prescription routing | Pharmacy owner / chain operations manager | 3,000-5,000 (total pharmacies; ~200-300 chains) | Medium — Pilot 1 onward |
| Diagnostic laboratories | Lab module users. Referral-dependent business model aligns naturally with platform marketplace. Revenue via take-rate on lab orders. | Bundle with clinic onboarding, referral partnerships with onboarded GPs, admin ops lab order coordination | Lab manager / owner | 500-800 | Medium — Pilot 2 onward |
| Public / NGO facilities | Extension phase only. Government procurement cycles are 6-18 months. NGO partnerships require compliance documentation and data protection agreements. | Government health department partnerships, NGO grant proposals, WHO/UNICEF/USAID digital health channels | Government health department / NGO program director | 50-100 (major facilities) | Low — Production onward |

**B2B segmentation notes:**

- The 5-10 warm leads in the current pipeline are private clinics and small
  hospitals in Addis Ababa — the Pilot 1 onboarding pool.
- Pharmacy and lab acquisition is most efficient when bundled with clinic
  onboarding: a clinic that adopts Health Hub naturally drives prescriptions
  and lab orders through the platform, pulling pharmacies and labs into the
  ecosystem.
- Admin ops staff play a critical role in B2B relationship management from
  Pilot 1 onward: handling callback scheduling with facility managers,
  coordinating technical onboarding, and managing ongoing partner communications.
- Public facility acquisition is deferred to Production/Extension due to
  regulatory complexity and long procurement timelines. The exception is
  NGO-funded clinics, which may adopt faster if the platform aligns with
  their digital health mandates.

### 2.2 B2C: Patients

| Segment | Description | Acquisition Strategy | Key Channel | Est. Addressable Population (Addis Ababa) | ARPU Estimate | Priority |
|---------|-------------|---------------------|-------------|------------------------------------------|---------------|----------|
| Urban professionals (25-45) | Primary segment. Smartphone users with disposable income, already paying for private healthcare out-of-pocket. Health-conscious, time-constrained. Value convenience and quality. | Digital marketing, app store optimization, social media, admin ops callback for inquiries | Social media (Facebook, Instagram), Play Store, admin ops callbacks | 400,000-600,000 | $2.00-4.00/mo | Highest |
| Urban families | Secondary segment. Driven by children's and elderly relatives' healthcare needs. Larger household spending but more price-sensitive per transaction. Multi-user lock-in opportunity. | Facility recommendation, family health content, admin ops onboarding assistance for dependents | Facility referral, WhatsApp family groups, admin ops | 300,000-500,000 | $1.50-3.00/mo | High |
| Students / young adults (18-25) | Early adopters with high digital literacy but lower ability to pay. Valuable for viral growth and social proof. Campus health center partnerships. | Social media campaigns, campus outreach, peer referrals, Play Store organic | WhatsApp, TikTok, Instagram, campus health centers | 200,000-350,000 | $0.50-1.50/mo | Medium |
| Rural-accessible | Extension phase. Patients within 1-2 hours of urban centers who travel for specialist care. Telemedicine value proposition is strongest for this segment. | Community health worker networks, SMS campaigns, radio advertising, admin ops triage and scheduling | Word of mouth, SMS, CHWs, admin ops callbacks | 500,000-1,000,000 | $0.25-1.00/mo | Low (Production) |

**B2C segmentation notes:**

- In Ethiopia, the urban professional segment overlaps with the existing private
  healthcare market. These patients already pay ETB 200-500 per GP visit
  out-of-pocket, making the platform's ETB 200 ($3.50) GP consultation price
  competitive.
- Family acquisition follows a "household gateway" pattern: one family member
  registers, then books for children or elderly relatives. The platform must
  support dependent profiles to capture this.
- Student acquisition is a long-term play: low immediate ARPU but high lifetime
  value as students enter the workforce and their healthcare spending increases.
- Admin ops staff handle callback-based onboarding for all segments: a patient
  who calls in or submits a web inquiry is called back by admin ops, walked
  through registration, and booked for their first consultation. This manual
  touch point is a conversion accelerator unique to Health Hub's model.

---

## 3. Acquisition Channels

### 3.1 Channel Ranking by Phase

Channels are ranked in descending order of priority within each phase. The
ranking reflects expected ROI, feasibility, and resource availability.

#### Pre-Pilot (M0-M3/M6, 100-200 internal users)

| Rank | Channel | Type | Cash Cost | Time Cost | Expected Yield | Notes |
|------|---------|------|-----------|-----------|---------------|-------|
| 1 | Personal network | B2B + B2C | $0 | 20-40 hrs total | 2-3 facilities, 100-150 users | Founders' existing relationships in Addis Ababa |
| 2 | Founder-led outreach | B2B | $0 cash ($50-150 travel) | 20-40 hrs/facility | 1-2 additional facilities from cold/warm approaches | In-person demos at facility. Local travel within Addis. |
| 3 | Internal team testing | B2C | $0 | Embedded in dev cycle | 50-100 test users | Team members, friends, family as beta testers |

#### Pilot 1 (up to 1,000 users, 3-5 facilities)

| Rank | Channel | Type | Cash Cost | Time Cost | Expected Yield | Notes |
|------|---------|------|-----------|-----------|---------------|-------|
| 1 | Facility-driven onboarding | B2C | $0 marginal | 10-20 hrs/facility setup | 50-200 patients per facility | Clinic staff assist patients with registration at point of care |
| 2 | Admin ops callbacks | B2C | $0.30-0.80/conversion (staff time) | Ongoing (staff hours) | 30-50% conversion of inbound inquiries | Admin ops staff (2 from Pilot 1, per params.md) call back every inquiry, walk through registration, book first consultation |
| 3 | Founder-led facility sales | B2B | $50-150/trip | 20-40 hrs/facility | 3-5 facilities from warm leads | 5-10 warm leads with 40-60% conversion rate |
| 4 | WhatsApp groups | B2C | $0 | 5-10 hrs/mo | 50-150 users | Create health tip communities; share booking links |
| 5 | Word of mouth | B2C | $0 | $0 | 50-100 users | Organic spread from satisfied pilot patients |
| 6 | Social media organic | B2C | $0 | 5-10 hrs/mo | 20-50 users | Facebook page, health content posts. Ethiopia has 15M+ Facebook users. |

#### Pilot 2 (5,000-10,000 users, 10-20 facilities)

| Rank | Channel | Type | Cash Cost | Time Cost | Expected Yield | Notes |
|------|---------|------|-----------|-----------|---------------|-------|
| 1 | Facility-driven onboarding | B2C | $0 marginal | Ongoing | 35% of new users | Still the largest single channel |
| 2 | Google Play Store (ASO) | B2C | $0.50-2.00/install | 10-15 hrs/mo (ASO work) | 20% of new users | Android app published. Keywords: "doctor Ethiopia," "clinic Addis Ababa." Organic installs scale with ratings. |
| 3 | Admin ops callbacks | B2C | $0.30-0.80/conversion | Ongoing (4 staff from Pilot 2) | 10-15% of new users | Expanded admin team handles higher inquiry volume; callback-to-registration pipeline matures |
| 4 | Social media paid (light) | B2C | $1.00-5.00/user | 10-15 hrs/mo | 10-15% of new users | CPM in Ethiopia is $2-5 (3-5x cheaper than Western markets). Facebook/Instagram targeting: urban, 25-45, health interests. |
| 5 | Referral program | B2C | $0.50-1.50/referral | 5 hrs/mo (management) | 10-15% of new users | In-app referral: give ETB 50 credit, get ETB 50 credit per successful referral. Target viral coefficient: 0.3. |
| 6 | WhatsApp communities | B2C | $0-0.25/user | 5-10 hrs/mo | 5-10% of new users | Scale existing groups; health content calendar |
| 7 | Community health workers | B2C | $1.00-3.00/referral | 10-15 hrs setup | 2-5% of new users (testing) | Pilot CHW referral incentive in 1-2 areas outside central Addis |
| 8 | Facility referral (B2B) | B2B | $0 (free month incentive) | 2-5 hrs/referral | 5-8 new facilities | Each onboarded facility knows 3-5 peer facilities |
| 9 | Healthcare events | B2B | $500-2,000/event | 20-30 hrs/event | 2-3 facilities per event | Ethiopian Medical Association conferences. 1-2 events/year. |

#### Production (10,000-50,000 users, 50-100+ facilities)

| Rank | Channel | Type | Cash Cost | Time Cost | Expected Yield | Notes |
|------|---------|------|-----------|-----------|---------------|-------|
| 1 | Google Play Store (ASO + paid) | B2C | $1.00-3.00/install | 15-20 hrs/mo | 20-25% of new users | Organic + Google Ads for app installs |
| 2 | Facility-driven onboarding | B2C | $0 marginal | Ongoing | 20-25% of new users | Base layer; share decreases as other channels scale |
| 3 | Social media paid | B2C | $2.00-5.00/user | 15-20 hrs/mo | 15-20% of new users | Full Facebook/Instagram/TikTok campaigns |
| 4 | Admin ops callbacks + outbound | B2C | $0.50-1.00/conversion | Ongoing (6-8 staff) | 8-12% of new users | Mature callback operation; some outbound follow-up for lapsed users |
| 5 | Referral program | B2C | $1.00-2.00/referral | 5-10 hrs/mo | 10-15% of new users | Viral coefficient target: 0.5 |
| 6 | SMS / telecom campaigns | B2C | $0.10-0.30/SMS | 5-10 hrs/campaign | 5-10% of new users | Bulk SMS via Ethio Telecom/Safaricom partnerships |
| 7 | Community health workers | B2C | $1.00-3.00/referral | 10-15 hrs/mo | 5-8% of new users | Scaled CHW incentive program |
| 8 | Radio / local media | B2C | $200-1,000/campaign | 10-15 hrs/campaign | 3-5% of new users | FM radio reaches 70%+ of urban Ethiopia. Amharic-language spots. |
| 9 | Telecom bundling | B2C | $0.10-0.50/user | 40-80 hrs (partnership) | 2-5% of new users | Bundle Health Hub with Ethio Telecom data plans |
| 10 | Digital B2B marketing | B2B | $200-500/mo | 10-15 hrs/mo | 3-5 facilities/mo | LinkedIn, Google Ads for "clinic management software Ethiopia" |
| 11 | Healthcare associations | B2B | $200-500/yr | 10-15 hrs/quarter | 2-3 facilities/quarter | Ethiopian Medical Association member directories |

### 3.2 Admin Ops as an Acquisition Channel (v2 Addition)

Health Hub's operating model includes employed admin ops staff (per params.md
Section 4). While their primary function is operational — callbacks, exception
handling, partner coordination — they also serve as a measurable acquisition
and conversion channel.

**How admin ops drive acquisition:**

| Function | Acquisition Impact | Phase | Staffing |
|----------|-------------------|-------|----------|
| Inbound inquiry callbacks | Patient calls in or submits web form; admin ops calls back within 2 hours, walks through registration, books first consultation | Pilot 1+ | 2 admin ops (Pilot 1), 4 (Pilot 2), 6-8 (Production) |
| Facility onboarding support | Admin ops coordinates technical setup, staff training, and go-live for new facilities — reducing founder time per facility from 40 hrs to 10-15 hrs | Pilot 1+ | Shared with above |
| Lapsed user re-engagement | Admin ops calls users who registered but never booked, or who have not returned in 60+ days | Pilot 2+ | Shared with above |
| Travel/tourism patient coordination | Admin ops handles care navigation for patients traveling from outside Addis or international medical tourists — a high-value manual conversion | Pilot 2+ | 1-2 dedicated |
| Partner coordination | Admin ops maintains relationships with pharmacies and labs, ensuring prescription/lab order fulfillment, which drives patient satisfaction and retention | Pilot 1+ | Shared with above |

**Admin ops acquisition economics:**

| Metric | Pilot 1 | Pilot 2 | Production |
|--------|---------|---------|------------|
| Admin ops staff | 2 | 4 | 6-8 |
| Monthly salary cost (total) | $434 (2 x $217) | $868 (4 x $217) | $1,302-1,736 |
| Hours/mo available for acquisition activities | ~80 (50% of capacity) | ~160 | ~240-320 |
| Inquiries handled/mo | 50-100 | 200-400 | 500-1,000 |
| Conversion rate (inquiry to registered user) | 30% | 40% | 50% |
| New registrations via admin ops/mo | 15-30 | 80-160 | 250-500 |
| Effective CAC per admin-acquired user | $14.50-29.00 (salary allocation) | $5.40-10.90 | $2.60-6.90 |
| Adjusted CAC (admin handles multiple functions) | $0.30-0.80 (20% of time on acquisition) | $0.30-0.80 | $0.50-1.00 |

**Key insight:** The adjusted CAC for admin-acquired users is low ($0.30-1.00)
because admin ops staff are salaried employees whose acquisition work is one of
several functions. The marginal cost of each additional conversion is near zero
once the staff are employed. This makes admin ops one of the most
capital-efficient acquisition channels from Pilot 1 through Production.

---

## 4. CAC Model

### 4.1 B2B CAC by Phase

| Phase | Facilities Target | Primary Acquisition Method | Est. Cost per Facility | Total B2B CAC Budget | Key Assumptions |
|-------|-------------------|---------------------------|----------------------|---------------------|-----------------|
| Pre-Pilot | 2-3 (internal/friends) | Personal network, warm introductions | $0 (time only) | $0 | Founders' existing relationships. No travel costs (local). |
| Pilot 1 | 3-5 (from warm leads) | Founder-led sales + admin ops follow-up + local travel | $300-500 | $900-2,500 | 5-10 warm leads with 40-60% conversion. Travel within Addis: $50-150/trip. Admin ops handles scheduling and follow-up. |
| Pilot 2 | 10-20 | Sales + referrals + events + admin ops coordination | $200-400 | $2,000-8,000 | 30% from referrals ($0 cash), 40% direct sales ($300-500), 30% events/outreach ($200-400). Admin ops reduces founder time per facility. |
| Production | 50-100+ | Full mix (sales + digital + partnerships + referrals) | $150-300 | $7,500-30,000 | Referral channel grows to 40-50% of new facilities. Digital B2B marketing supplements direct sales. Dedicated B2B sales capacity. |

**B2B CAC dynamics:**

- CAC per facility decreases over time as referral networks mature and brand
  recognition shortens the sales cycle.
- The most expensive facilities to acquire are the first 3-5 (Pilot 1), where
  every onboarding requires extensive hand-holding, custom training, and
  relationship building.
- At Production scale, the target is a blended B2B CAC of $150-300 per
  facility, with referral-acquired facilities at $0-50 subsidizing the higher
  cost of event-sourced and cold-outreach facilities.
- Admin ops staff reduce B2B CAC by absorbing partner coordination work that
  would otherwise consume founder time (valued at $20/hr per params.md).

### 4.2 B2C CAC by Phase

| Phase | Users Target | Primary Channel | Est. CAC | Total B2C Cost | Channel Mix |
|-------|-------------|----------------|---------|---------------|-------------|
| Pre-Pilot | 100-200 | Internal (team, friends, family) | ~$0 | $0 | 100% organic/internal |
| Pilot 1 | 1,000 | Facility-driven + admin ops + WhatsApp | $0.25-0.75 | $250-750 | 50% facility-driven ($0), 15% admin ops callbacks ($0.50), 20% WhatsApp ($0.25), 15% social organic ($0.75) |
| Pilot 2 | 5,000-10,000 | Social + ads + referral + Play Store + admin ops | $1.00-3.00 | $5,000-30,000 | 30% facility-driven, 20% Play Store, 15% admin ops, 15% social paid, 10% referral, 10% WhatsApp |
| Production | 10,000-50,000 | Full channel mix | $2.00-5.00 | $20,000-250,000 | 22% Play Store, 20% facility-driven, 15% social paid, 10% admin ops, 10% referral, 8% SMS, 7% CHW, 5% radio, 3% telecom |

### 4.3 Blended CAC by Phase and Scenario Family

| Phase | S1 (Self-Funded) | S2 (Investor at P2) | S3 (Investor after P1) |
|-------|-----------------|--------------------|-----------------------|
| Pre-Pilot | ~$0 | ~$0 | ~$0 |
| Pilot 1 | $0.15-0.75 | $0.15-0.75 | $0-0.50 |
| Pilot 2 | $0.20-1.05 | $0.60-2.50 | $0.60-2.50 |
| Production | $0.50-1.50 | $1.00-3.00 | $1.00-3.50 |

**Blended CAC interpretation:** The wide ranges reflect the L1-L3 investment
level variation. At L1 (bootstrapped), acquisition is almost entirely organic
and facility-driven, yielding very low CAC but slow growth. At L3 (fully
funded), paid channels are activated earlier and at higher budgets, raising CAC
but accelerating user growth.

### 4.4 CAC by Channel (Detailed Breakdown)

| Channel | Pilot 1 CAC | Pilot 2 CAC | Production CAC | Cost Trend | Volume Trend |
|---------|------------|------------|---------------|-----------|-------------|
| Facility-driven | $0 | $0 | $0-0.50 | Flat | Grows with B2B |
| Admin ops callbacks | $0.30-0.80 | $0.30-0.80 | $0.50-1.00 | Slight increase | Grows with staff |
| WhatsApp communities | $0-0.25 | $0-0.25 | $0.25-0.50 | Slight increase | Moderate growth |
| Social media organic | $0.50-1.00 | $0.50-1.00 | $0.75-1.50 | Slight increase | Moderate growth |
| Google Play Store (ASO) | N/A (pre-launch) | $0.50-2.00 | $1.00-3.00 | Increase | High growth |
| Social media paid | N/A | $1.00-5.00 | $2.00-5.00 | Stable | High growth |
| Referral program | N/A | $0.50-1.50 | $1.00-2.00 | Slight increase | High growth |
| SMS campaigns | N/A | $0.10-0.30/SMS | $0.10-0.30/SMS | Flat | Moderate growth |
| Community health workers | N/A | $1.00-3.00 | $1.00-3.00 | Flat | High growth (rural) |
| Radio / local media | N/A | N/A | $2.00-5.00 (est.) | Unknown | Mass reach |
| Telecom bundling | N/A | N/A | $0.10-0.50 | Very low | Very high |

---

## 5. LTV Model

### 5.1 Revenue per User per Month (ARPU)

Revenue sources per user per month, based on pricing corridors in params.md
Section 11.2:

| Revenue Component | Conservative | Moderate | Optimistic | Basis |
|-------------------|-------------|----------|-----------|-------|
| GP consultation fees (ETB 200 / $3.50) | $0.30 | $0.70 | $1.40 | 1 consult/3mo vs. 1/2mo vs. 1/mo |
| Specialist consultation fees (ETB 400 / $7.00) | $0.00 | $0.25 | $0.60 | 0 vs. 1/4mo vs. 1/3mo |
| Premium subscription (ETB 300/mo / $5.26) | $0.10 | $0.20 | $0.40 | 2% vs. 4% vs. 8% of users subscribe |
| Pharmacy / lab commissions (8-12% take-rate) | $0.05 | $0.10 | $0.20 | Commission on orders routed through marketplace |
| Care coordination / travel fees | $0.00 | $0.05 | $0.15 | Per-case fees for travel/tourism patients (Pilot 2+) |
| Other (facility pass-through, data) | $0.05 | $0.05 | $0.05 | Negligible in early phases |
| **Total ARPU/mo** | **$0.50** | **$1.35** | **$2.80** | |

### 5.2 LTV by Scenario Case

| Metric | Conservative | Moderate | Optimistic |
|--------|-------------|----------|-----------|
| Average revenue per user per month (ARPU) | $0.50 | $1.35 | $2.80 |
| Average customer lifespan (months) | 6 | 12 | 24 |
| Gross LTV (ARPU x lifespan) | $3.00 | $16.20 | $67.20 |
| Gross margin | 90% | 92% | 95% |
| **LTV (margin-adjusted)** | **$2.70** | **$14.90** | **$63.85** |
| Monthly churn rate (implied) | 16.7% | 8.3% | 4.2% |

### 5.3 LTV by Customer Segment

| Segment | Avg. Consults/Mo | Avg. ARPU/Mo | Avg. Lifespan (Mo) | Segment LTV | Churn Rate |
|---------|-----------------|-------------|-------------------|-------------|-----------|
| Urban professionals (25-45) | 0.5-1.0 | $2.00-4.00 | 12-18 | $24.00-72.00 | 6-8% |
| Urban families | 0.3-0.7 | $1.50-3.00 | 18-36 | $27.00-108.00 | 3-6% |
| Students / young adults | 0.2-0.4 | $0.50-1.50 | 4-8 | $2.00-12.00 | 15-25% |
| Rural-accessible | 0.1-0.3 | $0.25-1.00 | 6-12 | $1.50-12.00 | 10-15% |
| Travel / tourism patients | 1-3 (episodic) | $10.00-25.00 | 1-3 (episodic) | $10.00-75.00 | N/A (project-based) |

### 5.4 LTV:CAC Ratios by Phase and Channel

| Phase | Channel | CAC | LTV (Moderate) | LTV:CAC | Verdict |
|-------|---------|-----|----------------|---------|---------|
| Pilot 1 | Facility-driven | $0.00 | $14.90 | Infinite | Best channel |
| Pilot 1 | Admin ops callbacks | $0.50 | $14.90 | 29.8x | Excellent |
| Pilot 1 | WhatsApp | $0.25 | $14.90 | 59.6x | Excellent |
| Pilot 1 | Social organic | $0.75 | $14.90 | 19.9x | Excellent |
| Pilot 2 | Facility-driven | $0.00 | $14.90 | Infinite | Best channel |
| Pilot 2 | Admin ops callbacks | $0.50 | $14.90 | 29.8x | Excellent |
| Pilot 2 | Play Store (ASO) | $1.00 | $14.90 | 14.9x | Very Good |
| Pilot 2 | Social paid | $3.00 | $14.90 | 5.0x | Good |
| Pilot 2 | Referral program | $1.00 | $14.90 | 14.9x | Very Good |
| Production | Facility-driven | $0.50 | $14.90 | 29.8x | Excellent |
| Production | Admin ops callbacks | $0.75 | $14.90 | 19.9x | Excellent |
| Production | Play Store (ASO) | $1.50 | $14.90 | 9.9x | Very Good |
| Production | Social paid | $4.00 | $14.90 | 3.7x | Acceptable |
| Production | Radio/SMS | $2.00 | $14.90 | 7.5x | Good |
| Production | CHW referral | $2.50 | $14.90 | 6.0x | Good |
| Production | Telecom bundling | $0.30 | $14.90 | 49.7x | Excellent |

**LTV:CAC benchmark:** A ratio of 3x or higher is considered healthy for
venture-backed startups. Below 3x requires either CAC reduction or ARPU
increase to achieve sustainable unit economics. All channels at all phases
exceed the 3x threshold.

---

## 6. Acquisition Funnel

### 6.1 Funnel Stages and Conversion Rates

| Stage | Definition | Conversion Rate | Key Driver | Measurement |
|-------|-----------|----------------|-----------|-------------|
| Awareness | User hears about Health Hub (ad impression, word of mouth, clinic poster, admin ops mention) | Baseline (top of funnel) | Channel reach | Impressions, reach, brand recall |
| App Download / Site Visit | User downloads Android app or visits web platform | 5-15% of awareness | Channel quality, creative, ASO | Install count, unique visits |
| Registration | User completes signup (name, phone, password) | 40-60% of downloads | Mobile-money-linked signup, simplified flow, admin ops assisted registration | Registered accounts |
| First Consultation | User completes first paid or free consultation | 15-30% of registrations | Onboarding tutorial, first-consult discount, admin ops booking assist | Completed consultations |
| Repeat Use (MAU) | User returns within 30 days | 30-50% of first-use users | Push notifications, appointment reminders, WhatsApp reminders | 30-day active users |
| Paying User | User completes at least 1 paid transaction | 25-40% of MAU | Consultation quality, pricing, payment ease | Transacting users |
| Premium Subscriber | User subscribes to monthly plan (ETB 300/mo) | 5-15% of paying users | Subscription value proposition, unlimited GP, priority booking | Subscription count |

### 6.2 Funnel Metrics by Phase

| Metric | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|--------|-----------|---------|---------|------------|
| Top of funnel (awareness) | 500 | 5,000 | 50,000 | 250,000+ |
| App downloads / site visits | 250 | 1,500 | 15,000 | 75,000 |
| Registrations | 200 | 1,000 | 10,000 | 50,000 |
| First consultation | 50 | 250 | 2,500 | 15,000 |
| Monthly active users (MAU) | 100 | 350 | 3,500 | 17,500 |
| Paying users | 20 | 100 | 1,000 | 5,000 |
| Premium subscribers | 2 | 10 | 100 | 750 |
| **Overall funnel conversion (awareness to paying)** | **4.0%** | **2.0%** | **2.0%** | **2.0%** |
| **Registration to first consult** | **25%** | **25%** | **25%** | **30%** |
| **MAU to paying** | **20%** | **29%** | **29%** | **29%** |

### 6.3 Admin Ops Impact on Funnel Conversion

Admin ops staff improve conversion rates at two critical funnel stages:

| Funnel Stage | Without Admin Ops | With Admin Ops | Lift | Mechanism |
|-------------|------------------|---------------|------|-----------|
| Download to Registration | 40% | 55% | +15pp | Admin ops calls back users who started but did not complete registration |
| Registration to First Consultation | 15% | 25% | +10pp | Admin ops proactively books first consultation for new registrants within 48 hours |
| Lapsed user re-engagement | 0% (no mechanism) | 5-10% reactivation | +5-10pp | Admin ops calls users who registered 30+ days ago with no activity |

### 6.4 Funnel Optimization Priorities by Phase

| Phase | Bottleneck | Optimization | Expected Lift | Owner |
|-------|-----------|-------------|---------------|-------|
| Pre-Pilot | Registration to first use | Onboarding tutorial, demo consultation, admin ops test calls | +10-15% activation | Product + Admin Ops |
| Pilot 1 | Awareness (top of funnel) | Facility-driven distribution, WhatsApp, admin ops callbacks | 3-5x awareness reach | Founders + Admin Ops |
| Pilot 2 | MAU to paying | Push notifications, appointment reminders, consult quality, admin ops follow-up | +5-10% conversion | Product + Admin Ops |
| Production | Download to registration | Simplified signup, mobile-money-first flow, admin ops assisted registration | +10-20% registration rate | Product + Admin Ops |

---

## 7. Scenario Analysis — All 21 Combinations

### 7.1 Scenario 1: Fully Self-Funded (S1)

No external investor at any point. All marketing spend comes from founders'
monthly self-funding budget. Growth is constrained by the portion of monthly
budget allocable to acquisition after development, infrastructure, and
operational staffing costs.

---

#### S1-L1 (Bootstrapped — ~$500/mo total budget)

**Marketing budget allocation:** $0/mo Pre-Pilot through Pilot 1. ~$50/mo
available from Pilot 2 onward (10% of total budget after dev + infra + ops).

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-8) | 6 mo | $0/mo | 4 | 400 | $0 | $0 | $0 | N/A |
| Pilot 2 (M8-18) | 10 mo | $50/mo ($500 total) | 6 | 2,000 | $100 | $0.20 | $0.31 | 48.1x |
| Production (M18+) | Ongoing | $100/mo | 8 | 5,000 | $150 | $0.50 | $0.60 | 24.8x |

**Channels:** 100% organic and facility-driven through Pilot 1. Pilot 2: WhatsApp ($0),
admin ops callbacks (salaried), $50/mo Facebook boosts. Production: $60/mo Facebook,
$40/mo SMS. Admin ops staff handle inquiry conversion at all phases.

**Constraints:** No paid advertising budget through Pilot 1. Growth entirely dependent
on facility onboarding rate, admin ops callbacks, and organic word-of-mouth. Timeline
to 5,000 users: 18-24 months.

---

#### S1-L2 (Ideal — ~$1,000/mo total budget)

**Marketing budget allocation:** $0/mo Pre-Pilot. $100/mo from Pilot 1.
$200/mo from Pilot 2. $300/mo at Production.

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $100/mo ($300) | 5 | 700 | $60 | $0.15 | $0.43 | 34.7x |
| Pilot 2 (M5-10) | 5 mo | $200/mo ($1,000) | 10 | 4,000 | $200 | $0.30 | $0.40 | 37.3x |
| Production (M10+) | Ongoing | $300/mo | 20 | 12,000 | $250 | $0.75 | $0.85 | 17.5x |

**Channels:** Pilot 1: Founder sales + $100/mo WhatsApp/social + admin ops callbacks.
Pilot 2: Facebook ($100/mo), Play Store ASO ($50/mo), referral credits ($50/mo), admin
ops expanded to 4 staff. Production: Facebook/Instagram ($150/mo), SMS ($50/mo),
referral ($50/mo), ASO ($50/mo).

---

#### S1-L3 (Fully Funded — ~$2,000/mo total budget)

**Marketing budget allocation:** $0/mo Pre-Pilot. $200/mo from Pilot 1.
$500/mo from Pilot 2. $700/mo at Production.

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 3 | 200 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $200/mo ($600) | 5 | 900 | $120 | $0.25 | $0.67 | 22.2x |
| Pilot 2 (M5-10) | 5 mo | $500/mo ($2,500) | 15 | 7,000 | $200 | $0.40 | $0.44 | 33.9x |
| Production (M10+) | Ongoing | $700/mo | 35 | 20,000 | $200 | $1.00 | $1.05 | 14.2x |

**Channels:** Pilot 1: Founder sales + WhatsApp + social ($200/mo) + admin ops.
Pilot 2: Facebook ($200/mo), ASO ($100/mo), referral ($100/mo), industry event
($500 one-time). Production: Full digital mix ($400/mo) + referral ($150/mo) +
SMS ($100/mo) + quarterly events ($500).

---

### 7.2 Scenario 2: Investor Arrives at Pilot 2 Transition (S2)

Self-funded from Month 0 through Pilot 1. Investor capital arrives before or
during Pilot 2, unlocking marketing budget for scaled acquisition. Pre-investor
phases use the same acquisition approach as the corresponding S1 level.

---

#### S2-O1-I1 (Bootstrapped Self + Bootstrapped Investor)

**Pre-investor:** Identical to S1-L1 through Pilot 1.
**Post-investor marketing allocation:** 20-25% of $25-40K = $5,000-10,000
over 12-18 months (~$400-700/mo).

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-8) | 6 mo | $0/mo | 4 | 400 | $0 | $0 | $0 | N/A |
| Pilot 2 (M8-14) | 6 mo | $400/mo ($2,400) | 10 | 4,000 | $250 | $0.60 | $0.72 | 20.7x |
| Production (M14+) | Ongoing | $500/mo | 18 | 10,000 | $250 | $1.00 | $1.10 | 13.5x |

**Total marketing spend to Production:** ~$8,400

---

#### S2-O1-I2 (Bootstrapped Self + Ideal Investor)

**Pre-investor:** Identical to S1-L1 through Pilot 1.
**Post-investor marketing allocation:** 20-25% of $75-100K = $15,000-25,000
(~$1,000-1,500/mo).

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-8) | 6 mo | $0/mo | 4 | 400 | $0 | $0 | $0 | N/A |
| Pilot 2 (M8-14) | 6 mo | $1,200/mo ($7,200) | 15 | 7,000 | $200 | $1.00 | $1.04 | 14.3x |
| Production (M14+) | Ongoing | $1,500/mo | 30 | 20,000 | $200 | $1.50 | $1.55 | 9.6x |

**Total marketing spend to Production:** ~$22,200

---

#### S2-O1-I3 (Bootstrapped Self + Full Investor)

**Pre-investor:** Identical to S1-L1 through Pilot 1.
**Post-investor marketing allocation:** 20-25% of $150-250K = $30,000-62,500
(~$2,000-3,500/mo).

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-8) | 6 mo | $0/mo | 4 | 400 | $0 | $0 | $0 | N/A |
| Pilot 2 (M8-14) | 6 mo | $2,500/mo ($15,000) | 20 | 10,000 | $250 | $1.50 | $1.53 | 9.7x |
| Production (M14+) | Ongoing | $3,500/mo | 50 | 35,000 | $200 | $2.00 | $2.03 | 7.3x |

**Total marketing spend to Production:** ~$57,000

---

#### S2-O2-I1 (Ideal Self + Bootstrapped Investor)

**Pre-investor:** Identical to S1-L2 through Pilot 1.
**Post-investor marketing allocation:** $5,000-10,000 total (~$400-700/mo),
supplementing ongoing $200/mo from self-funding.

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $100/mo ($300) | 5 | 700 | $60 | $0.15 | $0.43 | 34.7x |
| Pilot 2 (M5-10) | 5 mo | $600/mo ($3,000) | 12 | 5,000 | $250 | $0.60 | $0.66 | 22.6x |
| Production (M10+) | Ongoing | $700/mo | 22 | 15,000 | $250 | $1.00 | $1.05 | 14.2x |

**Total marketing spend to Production:** ~$10,300

---

#### S2-O2-I2 (Baseline Plan — Ideal Self + Ideal Investor)

**This is the baseline plan for Health Hub.** Pre-investor: S1-L2 pacing.
Post-investor: marketing budget of $15,000-25,000 (~$1,200-1,500/mo).

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $100/mo ($300) | 5 | 700 | $60 | $0.15 | $0.43 | 34.7x |
| Pilot 2 (M5-10) | 5 mo | $1,500/mo ($7,500) | 15 | 8,000 | $200 | $1.00 | $1.02 | 14.6x |
| Production (M10+) | Ongoing | $2,000/mo | 35 | 25,000 | $200 | $1.50 | $1.53 | 9.7x |

**Total marketing spend to Production:** ~$23,800

**Channel mix at Production (S2-O2-I2):**

| Channel | Monthly Budget | Share | Est. Users/Mo |
|---------|---------------|-------|---------------|
| Facebook / Instagram paid | $600 | 30% | 150-200 |
| Google Play Store (ASO + paid) | $300 | 15% | 150-300 |
| Referral program credits | $300 | 15% | 150-200 |
| SMS campaigns | $200 | 10% | 200-400 |
| Admin ops callbacks (salaried, allocated) | $0 incremental | Embedded | 80-120 |
| Industry events (amortized) | $200 | 10% | 10-20 (B2B leads) |
| B2B sales travel | $150 | 7.5% | 1-2 facilities |
| Content marketing | $150 | 7.5% | 50-100 |
| WhatsApp promotions | $100 | 5% | 50-100 |

---

#### S2-O2-I3 (Ideal Self + Full Investor)

**Pre-investor:** S1-L2 pacing. **Post-investor:** $30,000-62,500 marketing
budget (~$2,500-3,500/mo).

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $100/mo ($300) | 5 | 700 | $60 | $0.15 | $0.43 | 34.7x |
| Pilot 2 (M5-10) | 5 mo | $3,000/mo ($15,000) | 20 | 10,000 | $250 | $1.50 | $1.53 | 9.7x |
| Production (M10+) | Ongoing | $4,000/mo | 60 | 40,000 | $200 | $2.50 | $2.50 | 6.0x |

**Total marketing spend to Production:** ~$63,300

---

#### S2-O3-I1 (Full Self + Bootstrapped Investor)

**Pre-investor:** Identical to S1-L3 through Pilot 1. The $25-40K investor
injection adds limited incremental marketing on top of already-robust L3
self-funding.

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 3 | 200 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $200/mo ($600) | 5 | 900 | $120 | $0.25 | $0.67 | 22.2x |
| Pilot 2 (M5-10) | 5 mo | $700/mo ($3,500) | 15 | 7,500 | $200 | $0.50 | $0.55 | 27.1x |
| Production (M10+) | Ongoing | $900/mo | 30 | 22,000 | $200 | $1.00 | $1.05 | 14.2x |

**Total marketing spend to Production:** ~$12,100

---

#### S2-O3-I2 (Full Self + Ideal Investor)

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 3 | 200 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $200/mo ($600) | 5 | 900 | $120 | $0.25 | $0.67 | 22.2x |
| Pilot 2 (M5-10) | 5 mo | $2,000/mo ($10,000) | 20 | 10,000 | $250 | $1.00 | $1.06 | 14.1x |
| Production (M10+) | Ongoing | $2,500/mo | 45 | 30,000 | $200 | $1.50 | $1.53 | 9.7x |

**Total marketing spend to Production:** ~$35,600

---

#### S2-O3-I3 (Full Self + Full Investor — Maximum S2)

**Maximum Scenario 2 configuration.** Robust self-funded base plus full
investor marketing budget.

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 3 | 200 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $200/mo ($600) | 5 | 900 | $120 | $0.25 | $0.67 | 22.2x |
| Pilot 2 (M5-10) | 5 mo | $4,000/mo ($20,000) | 25 | 12,000 | $250 | $1.70 | $1.72 | 8.7x |
| Production (M10+) | Ongoing | $5,000/mo | 75 | 50,000 | $200 | $2.50 | $2.50 | 6.0x |

**Total marketing spend to Production:** ~$81,600

---

### 7.3 Scenario 3: Investor Arrives Right After Pilot 1 (S3)

Self-funded only from Month 0 through early Pilot 1 (0-3 months self-funded
runway). Investor capital arrives immediately after Pilot 1, funding the entire
Pilot 2 and Production journey. This is the fastest path to scaled acquisition.

---

#### S3-O1-I1 (Bootstrapped Bridge + Bootstrapped Investor)

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $0/mo | 3 | 300 | $0 | $0 | $0 | N/A |
| Pilot 2 (M5-10) | 5 mo | $500/mo ($2,500) | 8 | 4,000 | $300 | $0.60 | $0.69 | 21.6x |
| Production (M10+) | Ongoing | $600/mo | 15 | 10,000 | $250 | $1.00 | $1.05 | 14.2x |

**Total marketing spend to Production:** ~$8,500

---

#### S3-O1-I2 (Bootstrapped Bridge + Ideal Investor)

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $0/mo | 3 | 300 | $0 | $0 | $0 | N/A |
| Pilot 2 (M5-10) | 5 mo | $1,500/mo ($7,500) | 15 | 8,000 | $200 | $1.00 | $1.00 | 14.9x |
| Production (M10+) | Ongoing | $2,000/mo | 35 | 25,000 | $200 | $1.50 | $1.53 | 9.7x |

**Total marketing spend to Production:** ~$25,500

---

#### S3-O1-I3 (Bootstrapped Bridge + Full Investor)

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $0/mo | 3 | 300 | $0 | $0 | $0 | N/A |
| Pilot 2 (M5-10) | 5 mo | $3,000/mo ($15,000) | 20 | 10,000 | $250 | $1.50 | $1.53 | 9.7x |
| Production (M10+) | Ongoing | $4,000/mo | 60 | 40,000 | $200 | $2.50 | $2.50 | 6.0x |

**Total marketing spend to Production:** ~$63,000

---

#### S3-O2-I1 (Ideal Bridge + Bootstrapped Investor)

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $100/mo ($300) | 5 | 600 | $60 | $0.15 | $0.50 | 29.8x |
| Pilot 2 (M5-10) | 5 mo | $600/mo ($3,000) | 12 | 5,000 | $250 | $0.60 | $0.66 | 22.6x |
| Production (M10+) | Ongoing | $700/mo | 22 | 15,000 | $250 | $1.00 | $1.05 | 14.2x |

**Total marketing spend to Production:** ~$10,300

---

#### S3-O2-I2 (Ideal Bridge + Ideal Investor)

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $100/mo ($300) | 5 | 600 | $60 | $0.15 | $0.50 | 29.8x |
| Pilot 2 (M5-10) | 5 mo | $1,500/mo ($7,500) | 18 | 9,000 | $200 | $1.00 | $1.03 | 14.5x |
| Production (M10+) | Ongoing | $2,500/mo | 40 | 30,000 | $200 | $1.50 | $1.53 | 9.7x |

**Total marketing spend to Production:** ~$27,800

---

#### S3-O2-I3 (Ideal Bridge + Full Investor)

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $100/mo ($300) | 5 | 600 | $60 | $0.15 | $0.50 | 29.8x |
| Pilot 2 (M5-10) | 5 mo | $3,500/mo ($17,500) | 25 | 12,000 | $250 | $1.50 | $1.52 | 9.8x |
| Production (M10+) | Ongoing | $5,000/mo | 70 | 50,000 | $200 | $2.50 | $2.50 | 6.0x |

**Total marketing spend to Production:** ~$73,800

---

#### S3-O3-I1 (Full Bridge + Bootstrapped Investor)

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 3 | 200 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $200/mo ($600) | 5 | 800 | $120 | $0.25 | $0.75 | 19.9x |
| Pilot 2 (M5-10) | 5 mo | $700/mo ($3,500) | 15 | 7,000 | $200 | $0.50 | $0.55 | 27.1x |
| Production (M10+) | Ongoing | $900/mo | 28 | 20,000 | $200 | $1.00 | $1.05 | 14.2x |

**Total marketing spend to Production:** ~$12,100

---

#### S3-O3-I2 (Full Bridge + Ideal Investor)

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 3 | 200 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $200/mo ($600) | 5 | 800 | $120 | $0.25 | $0.75 | 19.9x |
| Pilot 2 (M5-10) | 5 mo | $2,500/mo ($12,500) | 22 | 11,000 | $250 | $1.20 | $1.23 | 12.1x |
| Production (M10+) | Ongoing | $3,000/mo | 50 | 35,000 | $200 | $1.50 | $1.53 | 9.7x |

**Total marketing spend to Production:** ~$41,100

---

#### S3-O3-I3 (Maximum Configuration — Full Bridge + Full Investor)

**This is the theoretical maximum configuration.** Full self-funded bridge
with the largest investor injection. Fastest path to scale.

| Phase | Duration | Marketing Budget | Facilities (Cumul.) | Patients (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC |
|-------|----------|-----------------|--------------------|--------------------|---------|---------|-------------|---------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 3 | 200 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $200/mo ($600) | 5 | 800 | $120 | $0.25 | $0.75 | 19.9x |
| Pilot 2 (M5-10) | 5 mo | $5,000/mo ($25,000) | 30 | 15,000 | $250 | $1.70 | $1.72 | 8.7x |
| Production (M10+) | Ongoing | $6,000/mo | 100 | 60,000 | $200 | $3.00 | $3.00 | 5.0x |

**Total marketing spend to Production:** ~$97,600

**Channel mix at Production (S3-O3-I3):**

| Channel | Monthly Budget | Share | Est. Users/Mo |
|---------|---------------|-------|---------------|
| Facebook / Instagram paid | $1,500 | 25% | 300-500 |
| Google Ads (Play Store + Search) | $900 | 15% | 300-600 |
| Referral program credits | $600 | 10% | 300-400 |
| SMS / Telecom campaigns | $600 | 10% | 600-1,200 |
| Radio advertising | $500 | 8% | 200-400 (est.) |
| B2B sales team (part-time) | $500 | 8% | 3-5 facilities |
| Content marketing (video, blog) | $400 | 7% | 100-200 |
| Industry events (amortized) | $400 | 7% | 2-3 facilities |
| Community health worker incentives | $300 | 5% | 100-200 |
| WhatsApp promotions | $200 | 3% | 100-200 |
| Admin ops callbacks (salaried) | $0 incremental | Embedded | 200-400 |
| Reserve / testing | $100 | 2% | Experimental |

---

### 7.4 Summary Table — All 21 Combinations

| # | Combo | Our Level | Investor Level | Total Mktg Spend to Prod. | Facilities at Prod. | Users at Prod. | Blended CAC | LTV:CAC | Time to 10K Users |
|---|-------|-----------|---------------|--------------------------|--------------------|--------------------|-------------|---------|-------------------|
| 1 | S1-L1 | Bootstrapped | None | $1,400 | 8 | 5,000 | $0.60 | 24.8x | 24+ mo |
| 2 | S1-L2 | Ideal | None | $3,900 | 20 | 12,000 | $0.85 | 17.5x | 14 mo |
| 3 | S1-L3 | Fully Funded | None | $9,100 | 35 | 20,000 | $1.05 | 14.2x | 10 mo |
| 4 | S2-O1-I1 | Bootstrapped | Bootstrapped | $8,400 | 18 | 10,000 | $1.10 | 13.5x | 14 mo |
| 5 | S2-O1-I2 | Bootstrapped | Ideal | $22,200 | 30 | 20,000 | $1.55 | 9.6x | 12 mo |
| 6 | S2-O1-I3 | Bootstrapped | Fully Funded | $57,000 | 50 | 35,000 | $2.03 | 7.3x | 10 mo |
| 7 | S2-O2-I1 | Ideal | Bootstrapped | $10,300 | 22 | 15,000 | $1.05 | 14.2x | 12 mo |
| 8 | **S2-O2-I2** | **Ideal** | **Ideal** | **$23,800** | **35** | **25,000** | **$1.53** | **9.7x** | **10 mo** |
| 9 | S2-O2-I3 | Ideal | Fully Funded | $63,300 | 60 | 40,000 | $2.50 | 6.0x | 8 mo |
| 10 | S2-O3-I1 | Fully Funded | Bootstrapped | $12,100 | 30 | 22,000 | $1.05 | 14.2x | 10 mo |
| 11 | S2-O3-I2 | Fully Funded | Ideal | $35,600 | 45 | 30,000 | $1.53 | 9.7x | 9 mo |
| 12 | S2-O3-I3 | Fully Funded | Fully Funded | $81,600 | 75 | 50,000 | $2.50 | 6.0x | 7 mo |
| 13 | S3-O1-I1 | Bootstrapped | Bootstrapped | $8,500 | 15 | 10,000 | $1.05 | 14.2x | 12 mo |
| 14 | S3-O1-I2 | Bootstrapped | Ideal | $25,500 | 35 | 25,000 | $1.53 | 9.7x | 10 mo |
| 15 | S3-O1-I3 | Bootstrapped | Fully Funded | $63,000 | 60 | 40,000 | $2.50 | 6.0x | 8 mo |
| 16 | S3-O2-I1 | Ideal | Bootstrapped | $10,300 | 22 | 15,000 | $1.05 | 14.2x | 12 mo |
| 17 | S3-O2-I2 | Ideal | Ideal | $27,800 | 40 | 30,000 | $1.53 | 9.7x | 9 mo |
| 18 | S3-O2-I3 | Ideal | Fully Funded | $73,800 | 70 | 50,000 | $2.50 | 6.0x | 7 mo |
| 19 | S3-O3-I1 | Fully Funded | Bootstrapped | $12,100 | 28 | 20,000 | $1.05 | 14.2x | 10 mo |
| 20 | S3-O3-I2 | Fully Funded | Ideal | $41,100 | 50 | 35,000 | $1.53 | 9.7x | 8 mo |
| 21 | S3-O3-I3 | Fully Funded | Fully Funded | $97,600 | 100 | 60,000 | $3.00 | 5.0x | 6 mo |

### 7.5 Efficiency Analysis

**Most capital-efficient combinations (highest users per dollar of marketing spend):**

| Rank | Combo | Users per $1 Marketing | Notes |
|------|-------|----------------------|-------|
| 1 | S1-L1 | 3.57 users/$1 | Almost entirely organic + admin ops; time-intensive but capital-efficient |
| 2 | S1-L2 | 3.08 users/$1 | Good balance of spend and organic leverage |
| 3 | S1-L3 | 2.20 users/$1 | Self-funded efficiency before paid channels dominate |
| 4 | S2-O2-I1 / S3-O2-I1 | 1.46 users/$1 | Modest investor keeps CAC low |
| 5 | S2-O3-I1 / S3-O3-I1 | 1.65-1.82 users/$1 | Robust self-fund base with minimal investor increment |

**Fastest to 10,000 users:**

| Rank | Combo(s) | Time to 10K Users | Total Marketing Spend |
|------|----------|-------------------|----------------------|
| 1 | S3-O3-I3 | 6 months | $97,600 |
| 2 | S3-O2-I3, S2-O3-I3 | 7 months | $73,800 / $81,600 |
| 3 | S3-O1-I3, S2-O2-I3, S3-O3-I2 | 8 months | $63,000 / $63,300 / $41,100 |
| 4 | S3-O2-I2, S2-O3-I2 | 9 months | $27,800 / $35,600 |
| 5 | S2-O2-I2 (Baseline), S3-O1-I2, S1-L3, S2-O3-I1 | 10 months | $23,800 / $25,500 / $9,100 / $12,100 |

### 7.6 LTV:CAC Risk Zones

| LTV:CAC Range | Verdict | Combos in This Range |
|---------------|---------|---------------------|
| 14x+ | Excellent (organic-dominated, high efficiency) | S1-L1, S1-L2, S1-L3, S2-O2-I1, S2-O3-I1, S3-O1-I1, S3-O2-I1, S3-O3-I1, S2-O1-I2 |
| 9x-14x | Very Good (balanced paid + organic) | S2-O2-I2, S2-O3-I2, S3-O1-I2, S3-O2-I2, S3-O3-I2, S2-O1-I3 |
| 5x-9x | Good (paid channels scaling) | S2-O2-I3, S2-O3-I3, S3-O1-I3, S3-O2-I3, S2-O1-I1, S3-O3-I3 |
| 3x-5x | Acceptable (approaching efficiency floor) | None in current model |
| Below 3x | Warning (CAC exceeds sustainable threshold) | None |

**Key insight:** No combination falls below the 5x LTV:CAC threshold. Even the
maximum-spend scenario (S3-O3-I3) maintains a 5.0x ratio because (a) East
African digital advertising is 3-5x cheaper than Western markets, (b) facility-
driven acquisition provides a zero-cost base layer, and (c) admin ops
callbacks add a low-CAC manual conversion channel that buffers blended CAC
even as paid channels scale.

---

## 8. Retention and Churn Strategy

### 8.1 Monthly Churn Targets

| Metric | Pilot 1 | Pilot 2 | Production (Early) | Production (Mature) | Industry Benchmark |
|--------|---------|---------|-------------------|--------------------|--------------------|
| Monthly churn (overall) | 15% | 10% | 7% | 5% | 5-10% (health SaaS) |
| Monthly churn (premium subscribers) | 10% | 7% | 5% | 3% | 3-5% (subscription) |
| D1 retention (day after registration) | 40% | 50% | 55% | 60% | 25-35% (health apps) |
| D7 retention | 25% | 30% | 35% | 40% | 15-20% |
| D30 retention | 15% | 20% | 25% | 30% | 8-12% |
| NPS (Net Promoter Score) | 20 | 35 | 45 | 50+ | 30-40 (health tech) |

### 8.2 Retention Tactics by Phase

| Strategy | Phase | Implementation Cost | Expected Impact | Dependencies |
|----------|-------|--------------------|-----------------------------|-------------|
| Onboarding tutorial (in-app walkthrough) | Pilot 1+ | $0 (dev time) | +15% activation rate | Android/web app |
| Admin ops onboarding callback (within 48 hrs of registration) | Pilot 1+ | $0 incremental (salaried staff) | +10% first-use conversion | Admin ops staff |
| Push notifications for appointments | Pilot 1+ | $0 (Firebase free tier) | +10% 30-day retention | Android app |
| WhatsApp appointment reminders | Pilot 1+ | $0.02-0.05/message | +20% return visit rate | WhatsApp Business API |
| Email health tips and summaries | Pilot 1+ | $0 (SendGrid free tier) | +5% monthly retention | Email service |
| Admin ops lapsed-user callbacks | Pilot 2+ | $0 incremental (salaried staff) | +5-10% reactivation of 30-day lapsed users | Admin ops staff |
| Referral rewards (give ETB 50, get ETB 50) | Pilot 2+ | $1.75/successful referral | +10% referrer retention | Payment system |
| Premium subscription benefits | Pilot 2+ | $0 (feature gating) | -30% churn vs. free users | Subscription billing |
| Gamification (health score, streaks) | Pilot 2+ | $0 (dev time) | +15% DAU/MAU ratio | Frontend dev |
| Loyalty program (points per consultation) | Production | $0.10-0.25/point redeemed | -20% overall churn | Points system |
| Family/dependent accounts | Production | $0 (dev time) | +30% household retention | Dependent profile feature |
| Offline mode (cached health records) | Production | $0 (dev time) | +10% retention in low-connectivity | Service worker |

### 8.3 Churn Analysis

| Churn Trigger | Frequency | Mitigation | Measurement |
|--------------|-----------|-----------|-------------|
| Poor first experience (long wait, tech issues) | High in Pilot 1 | Onboarding tutorial, test consultations, quality monitoring, admin ops quality callback | First-session drop-off rate |
| No perceived need (healthy user) | Ongoing | Health tips, preventive care reminders, seasonal content | Days since last activity |
| Price sensitivity | High for students, rural | Freemium tier, consultation discounts, subscription value | Free-to-paid conversion rate |
| Provider quality concerns | Medium | Provider ratings, quality metrics, feedback loops, admin ops follow-up | Post-consultation NPS |
| Competitor offering | Low (early market) | Feature velocity, network effects, switching costs | Competitive win/loss |
| App performance / UX issues | Medium | Performance monitoring, crash reporting, iterative UX | App store rating, crash rate |
| Admin ops unavailability (callbacks missed) | Medium in Pilot 1 | Expand admin ops staffing per params.md ladder, SLA on callback time | Callback response time, missed callback rate |

### 8.4 Retention Economics

| Improvement | Impact on LTV | Equivalent Marketing Spend |
|-------------|-------------|--------------------------|
| Reduce monthly churn from 15% to 10% | +50% customer lifespan (6.7 mo to 10 mo) | Equivalent to $5,000-10,000 in new user acquisition |
| Reduce monthly churn from 10% to 7% | +43% customer lifespan (10 mo to 14.3 mo) | Equivalent to $8,000-15,000 in new user acquisition |
| Reduce monthly churn from 7% to 5% | +40% customer lifespan (14.3 mo to 20 mo) | Equivalent to $10,000-25,000 in new user acquisition |
| Increase ARPU from $1.35 to $1.80 | +33% LTV | Requires ~4% more users on premium subscription |

---

## 9. Key Metrics Dashboard

### 9.1 Core Metrics by Phase (Baseline Plan: S2-O2-I2)

| Metric | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|--------|-----------|---------|---------|------------|
| Total registered users | 200 | 1,000 | 10,000 | 50,000 |
| Monthly active users (MAU) | 100 | 350 | 3,500 | 17,500 |
| Daily active users (DAU) | 20 | 70 | 700 | 5,000 |
| DAU/MAU ratio | 20% | 20% | 20% | 29% |
| B2B facilities onboarded | 3 | 5 | 15 | 35 |
| Patients per facility | 67 | 200 | 667 | 1,429 |
| Blended CAC | $0 | $0.43 | $1.02 | $1.53 |
| ARPU (monthly) | $0 | $0.50 | $1.00 | $1.50 |
| LTV (moderate) | N/A | $6.00 | $12.00 | $18.00 |
| LTV:CAC | N/A | 14.0x | 11.8x | 11.8x |
| Monthly churn (overall) | N/A | 15% | 10% | 7% |
| Monthly churn (premium) | N/A | 10% | 7% | 5% |
| Viral coefficient | 0 | 0.1 | 0.3 | 0.5 |
| Payback period (months) | N/A | <1 | 1 | 1-2 |
| Admin ops conversions/mo | 0 | 15-30 | 80-160 | 250-500 |

### 9.2 CAC, LTV, and Payback by Phase

| Phase | Blended CAC | LTV (Moderate) | LTV:CAC | Payback Period | Notes |
|-------|-------------|---------------|---------|---------------|-------|
| Pre-Pilot | $0 | N/A | N/A | N/A | Internal users only |
| Pilot 1 | $0.43 | $6.00 | 14.0x | <1 month | Organic/facility-driven dominates |
| Pilot 2 | $1.02 | $12.00 | 11.8x | ~1 month | Paid channels entering mix |
| Production | $1.53 | $18.00 | 11.8x | 1-2 months | Paid channels at scale |

### 9.3 Channel Performance Tracking

| Channel | Primary Metric | Secondary Metric | Tracking Method |
|---------|---------------|-----------------|-----------------|
| Facility-driven | Registrations per facility/mo | Activation rate of facility-referred users | UTM on facility-specific signup links |
| Admin ops callbacks | Callback-to-registration conversion rate | Time-to-first-consultation for admin-acquired users | CRM / call center software tracking |
| WhatsApp | Click-through rate on shared links | Registrations from WhatsApp UTM | UTM tracking, WhatsApp Business analytics |
| Social media organic | Engagement rate, link clicks | Cost per registration (time-adjusted) | Meta Business Suite |
| Social media paid | CPC, CPI (cost per install) | ROAS (return on ad spend) | Meta Ads Manager |
| Play Store | Organic installs, keyword ranking | Install-to-registration conversion | Google Play Console, Firebase |
| Referral program | Referrals sent/user, conversion rate | Viral coefficient | In-app referral tracking |
| SMS | Delivery rate, CTR | Cost per registration | SMS gateway analytics |

### 9.4 North Star Metrics

| Phase | North Star Metric | Target | Rationale |
|-------|-------------------|--------|-----------|
| Pre-Pilot | Completed test consultations | 50 | Validates core flow works end-to-end |
| Pilot 1 | Facilities with 100+ registered patients | 3 | Proves facility-driven acquisition model |
| Pilot 2 | Paying users (at least 1 paid consultation) | 1,000 | Validates willingness to pay at scale |
| Production | Monthly revenue | $5,000+ | Path to success metric (revenue >= investment) |

### 9.5 Viral Coefficient Progression

| Phase | Viral Coefficient | Meaning | Driver |
|-------|------------------|---------|--------|
| Pre-Pilot | 0.0 | No organic spread | Internal testing only |
| Pilot 1 | 0.1 | Each 10 users generate 1 new user | Word of mouth from satisfied pilot patients |
| Pilot 2 | 0.3 | Each 10 users generate 3 new users | Referral program + WhatsApp sharing + admin ops-prompted referrals |
| Production | 0.5 | Each 10 users generate 5 new users | Mature referral program + social proof + network effects |

**Note:** A viral coefficient of 1.0 would mean self-sustaining growth. Health
apps rarely achieve this. The 0.5 target at Production is ambitious but
achievable with strong referral incentives and admin ops prompting satisfied
patients to refer friends/family.

---

## 10. Key Takeaways

1. **Facility-first acquisition is the highest-leverage strategy.** Each
   onboarded healthcare facility generates 50-200 patient registrations at
   near-zero marginal cost. Through Pilot 2, facility-driven acquisition
   accounts for 30-50% of all users across every combination. The B2B sales
   motion — founder-led, then referral-driven, then admin ops-supported — is
   the single most important go-to-market activity.

2. **Admin ops staff are a unique acquisition channel.** Unlike pure-play tech
   platforms, Health Hub employs admin ops staff who handle callbacks,
   onboarding assistance, and inquiry conversion. This manual channel delivers
   users at $0.30-1.00 effective CAC and improves funnel conversion at the
   two most critical stages (registration and first consultation). No
   competitor in the East African health tech space operates this model.

3. **All 21 combinations achieve viable unit economics.** LTV:CAC ratios range
   from 5.0x (S3-O3-I3, maximum spend) to 24.8x (S1-L1, maximum efficiency).
   No combination enters the sub-3x danger zone because East African digital
   advertising costs are 3-5x cheaper than Western markets, facility-driven
   acquisition provides a zero-cost base layer, and admin ops callbacks add
   a low-CAC manual conversion channel.

4. **The baseline plan (S2-O2-I2) balances speed and efficiency.** At $23,800
   total marketing spend to Production, the baseline achieves 25,000 users
   and 35 facilities with a 9.7x LTV:CAC ratio. This is the recommended
   acquisition plan for investor conversations: it demonstrates both capital
   discipline and a credible path to scale.

5. **WhatsApp and Play Store ASO are the two highest-ROI scaled channels.**
   WhatsApp communities cost $0-0.25 per acquired user and leverage existing
   social networks. Play Store ASO (post-Android launch) costs $0.50-2.00
   per install and scales with app store ratings. Both should receive
   disproportionate attention relative to paid social advertising.

6. **Retention is the multiplier.** A 5-percentage-point improvement in monthly
   churn (e.g., from 10% to 5%) doubles average customer lifespan and doubles
   LTV. Investment in push notifications, WhatsApp reminders, admin ops
   follow-up calls, and premium subscription value delivers higher ROI than
   equivalent spending on top-of-funnel acquisition.

7. **Payback period is under 2 months in all phases.** Because blended CAC
   stays in the $0-3 range and monthly ARPU reaches $1-1.50 at scale, the
   time to recover acquisition cost from a single user is consistently short.
   This allows aggressive reinvestment of early revenue into growth.

8. **The admin ops acquisition channel scales with staffing, not with budget.**
   Unlike paid digital channels where CAC rises with competition, admin ops
   conversion capacity scales linearly with headcount at a fixed per-staff
   cost ($217/mo per params.md). This creates a predictable, budget-insulated
   acquisition pathway.

---

## Cross-References

| Document | Relevance to Customer Acquisition |
|----------|----------------------------------|
| [params.md](params.md) | Scenario definitions, investment levels, phase timelines, market parameters, FX rates, admin ops staffing and salary benchmarks |
| 06-pricing-strategy | Consultation pricing (ETB 200 GP, ETB 400 Specialist), subscription pricing (ETB 300/mo), impact on ARPU and LTV |
| 05-revenue-modelling | Revenue projections by phase dependent on user acquisition targets modeled here |
| 04-effort-estimation | Development effort for acquisition-enabling features (referral system, push notifications, ASO, WhatsApp integration) |
| 02-services-slas | Service quality commitments that directly impact retention and churn rates |

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2026-03 | 2.0 | v2 rewrite: added admin ops as acquisition channel, updated LTV model with care coordination revenue, revised all 21 scenario tables with v2 params, added funnel impact analysis for admin ops, expanded retention economics |

---

*End of 08-customer-acquisition.md (v2)*
