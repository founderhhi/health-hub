# 08 — Customer Acquisition

**Health Hub Business Plan | Document 8 of 15**
**Date:** March 2026 | **Covers:** All 21 scenario x level combinations

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Customer Segments](#2-customer-segments)
3. [Acquisition Channels](#3-acquisition-channels)
4. [CAC (Customer Acquisition Cost) Model](#4-cac-customer-acquisition-cost-model)
5. [LTV (Lifetime Value) Model](#5-ltv-lifetime-value-model)
6. [Acquisition Funnel](#6-acquisition-funnel)
7. [Scenario Analysis — All 21 Combinations](#7-scenario-analysis--all-21-combinations)
8. [Retention and Churn Strategy](#8-retention-and-churn-strategy)
9. [Key Metrics Dashboard](#9-key-metrics-dashboard)
10. [Acquisition Comparison by Combo](#10-acquisition-comparison-by-combo)
11. [Key Takeaways](#11-key-takeaways)
12. [Cross-References](#12-cross-references)

---

## 1. Executive Summary

Health Hub's customer acquisition strategy operates across two distinct axes:
B2B acquisition of healthcare facilities (clinics, hospitals, pharmacies,
diagnostic labs) and B2C acquisition of patients who use the platform to access
care. In the East African market, these two axes are tightly coupled: patients
follow their providers onto digital platforms, making facility onboarding the
highest-leverage acquisition activity in early phases.

This document models acquisition costs, channels, funnels, and LTV:CAC ratios
across all 21 scenario x level combinations defined in params.md. The central
finding is that facility-driven patient acquisition dominates all other channels
through Pilot 2, with blended B2C CAC remaining below $1.00 in founder-led
phases. Paid digital acquisition becomes viable only after investor capital
arrives (Scenarios 2 and 3) or at L3 self-funding levels.

The baseline plan (S2-L2-I2) projects a blended CAC of $1.50 at Pilot 2 and
$2.50 at Production, with LTV:CAC ratios exceeding 5x once subscription
revenue stabilizes. Even the most constrained combination (S1-L1) achieves
viable unit economics through zero-cost organic channels, albeit at
significantly slower growth rates.

Key strategic principles:

- **Facility-first**: Every onboarded facility generates 50-200 patient
  registrations organically, making B2B acquisition the primary growth lever.
- **Mobile-money native**: Payment friction is the largest barrier to
  conversion in East Africa. M-Pesa and Telebirr integration removes this
  barrier at the infrastructure level.
- **WhatsApp as distribution**: With 40M+ WhatsApp users across Ethiopia and
  Kenya, community-based distribution through WhatsApp groups is the
  highest-ROI digital channel for B2C acquisition.
- **Android-first timing**: The Android app launch (mid-Pilot 1) unlocks
  Play Store distribution, which becomes the dominant B2C channel by Pilot 2.

---

## 2. Customer Segments

### 2.1 B2B: Healthcare Facilities

| Segment | Description | Acquisition Strategy | Decision Maker | Est. Facilities in Addis Ababa | Priority |
|---------|-------------|---------------------|----------------|-------------------------------|----------|
| Private clinics (small, 1-5 doctors) | Primary target for pilots. High density in urban areas, owner-operated, fast decision cycles. | Direct outreach, founder-led sales, warm introductions from existing network | Clinic owner/manager | 2,000-3,000 | Highest |
| Private hospitals (6+ doctors) | Secondary target. Higher patient volume per facility but longer sales cycles and procurement processes. | Referral from onboarded clinics, partnership proposals, conference networking | Hospital administrator / CTO | 200-400 | High |
| Pharmacy chains | Pharmacy module users. Often co-located with or adjacent to clinics, creating natural bundling opportunities. | Bundle with clinic onboarding, direct outreach to chain owners | Pharmacy owner / chain operations manager | 3,000-5,000 | Medium |
| Diagnostic laboratories | Lab module users. Referral-dependent business model aligns naturally with platform marketplace. | Bundle with clinic onboarding, referral partnerships with onboarded GPs | Lab manager / owner | 500-800 | Medium |
| Public/NGO facilities | Extension phase only. Government procurement cycles are 6-18 months. NGO partnerships require compliance documentation. | Government health department partnerships, NGO grant proposals, WHO/UNICEF channels | Government health department / NGO program director | 50-100 (major facilities) | Low (Extension) |

**B2B segmentation notes:**

- The 5-10 warm leads identified in the current pipeline are a mix of private
  clinics and small hospitals in Addis Ababa. These represent the Pilot 1
  onboarding pool.
- Pharmacy and lab acquisition is most efficient when bundled with clinic
  onboarding: a clinic that adopts Health Hub naturally drives prescriptions
  and lab orders through the platform, pulling pharmacies and labs into the
  ecosystem.
- Public facility acquisition is deferred to Extension phase due to regulatory
  complexity and long procurement timelines. The exception is NGO-funded
  clinics, which may adopt faster if the platform aligns with their digital
  health mandates.

### 2.2 B2C: Patients

| Segment | Description | Acquisition Strategy | Key Channel | Est. Addressable Population (Addis) | ARPU Estimate |
|---------|-------------|---------------------|-------------|-------------------------------------|---------------|
| Urban professionals (25-45) | Primary segment. Smartphone users with disposable income, already paying for private healthcare out-of-pocket. Health-conscious, time-constrained. | Digital marketing, app store optimization, social media content | Social media (Facebook, Instagram), Google Play Store | 400,000-600,000 | $2.00-4.00/mo |
| Urban families | Secondary segment. Driven by children's and elderly relatives' healthcare needs. Larger household spending on health but more price-sensitive per transaction. | Referral from onboarded facilities, family health content marketing | Facility recommendation, WhatsApp family groups | 300,000-500,000 | $1.50-3.00/mo |
| Students/young adults (18-25) | Early adopters with high digital literacy but lower ability to pay. Valuable for viral growth and social proof. | Social media campaigns, campus outreach through university health centers, peer referrals | WhatsApp, TikTok, Instagram | 200,000-350,000 | $0.50-1.50/mo |
| Rural-accessible | Extension phase. Patients within 1-2 hours of urban centers who travel for specialist care. Telemedicine value proposition is strongest for this segment. | Community health worker networks, SMS campaigns, radio advertising | Word of mouth, SMS, community health workers | 500,000-1,000,000 | $0.25-1.00/mo |

**B2C segmentation notes:**

- In the Ethiopian context, the urban professional segment overlaps
  significantly with the existing private healthcare market. These patients
  already pay ETB 200-500 per GP visit out-of-pocket, making the platform's
  ETB 200 ($3.50) GP consultation price competitive.
- Family acquisition follows a "household gateway" pattern: one family member
  registers, then books appointments for children or elderly relatives. The
  platform must support dependent profiles to capture this behavior.
- Student acquisition is a long-term play: low immediate ARPU but high
  lifetime value as students enter the workforce and their healthcare
  spending increases.

---

## 3. Acquisition Channels

### 3.1 B2B Channels

| Channel | Cash Cost | Time Cost | Effectiveness | Phase | Scalability | Notes |
|---------|-----------|-----------|--------------|-------|-------------|-------|
| Founder-led direct sales | $0 cash | 20-40 hrs/facility | Highest for pilots | Pre-Pilot, Pilot 1 | Low (founder time is finite) | In-person demos at facility. Requires travel budget in Pilot 1 ($50-150/trip within Addis). |
| Warm network introductions | $0 | 5-10 hrs/intro | Very High | Pre-Pilot, Pilot 1 | Low | 5-10 existing warm leads. Conversion rate estimated at 40-60%. |
| Referral from onboarded facilities | $0 (incentive: free months) | 2-5 hrs/referral | High | Pilot 1+ | Medium | Each onboarded facility knows 3-5 peer facilities. Offer 1 free month for successful referral. |
| Healthcare industry events | $500-2,000/event | 20-30 hrs/event | Medium | Pilot 2+ | Medium | Ethiopian Medical Association conferences, East Africa Health Summit. 2-3 events/year. |
| Healthcare associations | $200-500/yr membership | 10-15 hrs/quarter | Medium-High | Pilot 2+ | Medium | Ethiopian Medical Association, Kenya Medical Practitioners & Dentists Council. Access to member directories. |
| Cold outreach (email/WhatsApp) | $0 cash | 10-15 hrs/batch of 50 | Low-Medium | All phases | High | Response rate estimated at 5-10%. Best used to supplement warm channels. |
| Government/NGO partnerships | $0-2,000 (legal/compliance) | 40-80 hrs/partnership | High for scale | Production+ | High | Requires regulatory compliance documentation, data protection agreements. 6-18 month sales cycle. |
| Digital B2B marketing | $200-500/mo | 10-15 hrs/mo | Medium | Pilot 2+ | High | LinkedIn, targeted Google Ads for "clinic management software Ethiopia." Only viable with marketing budget. |

### 3.2 B2C Channels

| Channel | CAC Estimate | Phase | Scalability | Notes |
|---------|-------------|-------|-------------|-------|
| Facility-driven (patients register through onboarded clinic) | $0-0.50 | All phases | Tied to B2B growth | Highest quality leads. Clinic staff assist with registration. Each facility generates 50-200 patient registrations in first 3 months. |
| WhatsApp groups/communities | $0-0.25 | Pilot 1+ | High in East Africa | Create health tip groups. Share appointment booking links. Ethiopia has 20M+ WhatsApp users, Kenya 20M+. |
| Social media organic (Facebook, Instagram, TikTok) | $0.50-1.00 | Pilot 1+ | Medium | Health content marketing. Testimonial videos from pilot patients. Facebook dominates in Ethiopia (15M+ users). |
| Social media paid ads (Facebook, Instagram) | $1.00-5.00 | Pilot 2+ | High | Requires marketing budget. CPM in Ethiopia is $2-5 (significantly cheaper than Western markets). Targeting: urban, 25-45, health interests. |
| Google Play Store (ASO) | $0.50-2.00 | Post-Android launch | High | App store optimization: keywords ("doctor Ethiopia," "clinic Addis Ababa"), screenshots, ratings. Organic installs scale with ratings. |
| SMS campaigns | $0.10-0.30/SMS | Pilot 2+ | High | Partnership with Ethio Telecom (Telebirr) or Safaricom. Bulk SMS rates: $0.02-0.05/SMS in East Africa. |
| Community health workers (CHWs) | $1.00-3.00/referral | Production | High (rural) | Ethiopia has 38,000+ Health Extension Workers. Incentive model: $1-2 per registered patient who completes first consultation. |
| Radio/local media | $200-1,000/campaign | Production | Very High | FM radio reaches 70%+ of urban Ethiopia. 30-second spots on health programs. Amharic-language campaigns. |
| Referral program (patient-to-patient) | $0.50-1.50 | Pilot 2+ | High | In-app referral: give ETB 50 credit, get ETB 50 credit per successful referral. Viral coefficient target: 0.3-0.5. |
| University/campus outreach | $0.25-0.75 | Pilot 2+ | Medium | Addis Ababa University (50K+ students), University of Nairobi (70K+ students). Partner with campus health centers. |
| Telecom bundling | $0.10-0.50 | Production | Very High | Partner with Ethio Telecom or Safaricom to bundle Health Hub with data plans. Requires corporate partnership agreement. |

---

## 4. CAC (Customer Acquisition Cost) Model

### 4.1 B2B CAC by Phase

| Phase | Facilities Target | Primary Acquisition Method | Est. Cost per Facility | Total B2B CAC Budget | Key Assumptions |
|-------|-------------------|---------------------------|----------------------|---------------------|-----------------|
| Pre-Pilot | 2-3 (internal/friends) | Personal network, warm introductions | $0 (time only) | $0 | Founders' existing relationships. No travel costs (local). |
| Pilot 1 | 3-5 (from warm leads) | Founder-led sales + local travel | $300-500 | $900-2,500 | 5-10 warm leads with 40-60% conversion. Travel within Addis: $50-150/trip. Demo preparation: 10 hrs/facility. |
| Pilot 2 | 10-20 | Sales + referrals + events + cold outreach | $200-400 | $2,000-8,000 | 30% from referrals ($0 cash cost), 40% from direct sales ($300-500), 30% from events/outreach ($200-400). |
| Production | 50-100+ | Full mix (sales + digital + partnerships + referrals) | $150-300 | $7,500-30,000 | At scale, referral channel grows to 40-50% of new facilities. Digital B2B marketing supplements direct sales. |

**B2B CAC dynamics:**

- CAC per facility decreases over time as referral networks mature and brand
  recognition reduces the sales cycle.
- The most expensive facilities to acquire are the first 3-5 (Pilot 1), where
  every onboarding requires extensive hand-holding, custom training, and
  relationship building.
- At Production scale, the target is a blended B2B CAC of $150-300 per
  facility, with referral-acquired facilities at $0-50 subsidizing the higher
  cost of event-sourced and cold-outreach facilities.

### 4.2 B2C CAC by Phase

| Phase | Users Target | Primary Channel | Est. CAC | Total B2C Cost | Channel Mix |
|-------|-------------|----------------|---------|---------------|-------------|
| Pre-Pilot | 100-200 | Internal (team, friends, family) | $0 | $0 | 100% organic/internal |
| Pilot 1 | 1,000 | Facility-driven + WhatsApp | $0.25-0.75 | $250-750 | 60% facility-driven ($0), 25% WhatsApp ($0.25), 15% social organic ($0.75) |
| Pilot 2 | 5,000-10,000 | Social + ads + referral + Play Store | $0.50-2.00 | $2,500-20,000 | 35% facility-driven, 20% Play Store, 20% social paid, 15% referral, 10% WhatsApp |
| Production | 10,000-50,000 | Full channel mix | $1.00-3.00 | $10,000-150,000 | 25% facility-driven, 20% Play Store, 15% social paid, 15% referral, 10% radio/SMS, 10% CHW, 5% telecom |

**B2C CAC dynamics:**

- Facility-driven acquisition is the dominant channel through Pilot 2. Each
  onboarded facility generates patients at near-zero marginal cost because
  clinic staff naturally direct patients to register on the platform.
- The shift from organic to paid channels occurs at Pilot 2 when the platform
  needs to grow beyond the patient base of onboarded facilities.
- Play Store ASO becomes a major channel after the Android app launches
  (mid-Pilot 1). Organic Play Store installs are the most cost-efficient
  scaled channel at $0.50-2.00 per install.
- At Production scale, the blended CAC rises to $1.00-3.00 as the platform
  exhausts low-cost organic channels and must invest in paid acquisition to
  reach new geographic areas and demographics.

### 4.3 Blended CAC (B2B + B2C Combined)

| Phase | Total Acquisition Spend | Total Users Acquired | Blended CAC | Notes |
|-------|------------------------|---------------------|-------------|-------|
| Pre-Pilot | $0 | 200 | $0 | Internal only |
| Pilot 1 | $1,150-3,250 | 1,000 | $1.15-3.25 | Dominated by B2B facility acquisition cost |
| Pilot 2 | $4,500-28,000 | 10,000 | $0.45-2.80 | CAC drops as facility-driven patients scale |
| Production | $17,500-180,000 | 50,000 | $0.35-3.60 | Wide range reflects scenario/level variation |

---

## 5. LTV (Lifetime Value) Model

### 5.1 Revenue per User Assumptions

Revenue sources per user per month, based on pricing in params.md:

| Revenue Component | Conservative | Moderate | Optimistic | Basis |
|-------------------|-------------|----------|-----------|-------|
| Consultation fees (GP at ETB 200) | $0.30 | $0.70 | $1.40 | 1 consult/3mo vs. 1/2mo vs. 1/mo at $3.50 |
| Consultation fees (Specialist at ETB 400) | $0.00 | $0.25 | $0.60 | 0 vs. 1/4mo vs. 1/3mo at $7.00 |
| Premium subscription (ETB 300/mo) | $0.10 | $0.20 | $0.40 | 2% vs. 4% vs. 8% of users subscribe at $5.26/mo |
| Pharmacy/lab commissions | $0.05 | $0.05 | $0.05 | Platform commission on orders routed through marketplace |
| Other (data, B2B pass-through) | $0.05 | $0.05 | $0.05 | Negligible in early phases |
| **Total ARPU/mo** | **$0.50** | **$1.25** | **$2.50** |  |

### 5.2 Lifetime Value Calculation

| Metric | Conservative | Moderate | Optimistic |
|--------|-------------|----------|-----------|
| Average revenue per user per month (ARPU) | $0.50 | $1.25 | $2.50 |
| Average customer lifespan (months) | 6 | 12 | 24 |
| Gross LTV (ARPU x lifespan) | $3.00 | $15.00 | $60.00 |
| Gross margin | 90% | 92% | 95% |
| **LTV (margin-adjusted)** | **$2.70** | **$13.80** | **$57.00** |
| Monthly churn rate (implied) | 16.7% | 8.3% | 4.2% |

**LTV assumptions:**

- Gross margin is high (90-95%) because Health Hub is a software platform with
  minimal per-transaction costs. The primary variable costs are payment
  processing fees (1-2%) and Daily.co video minutes.
- Customer lifespan varies significantly by segment: urban professionals
  average 12-18 months, students 4-8 months, families 18-36 months.
- The conservative case assumes high early churn typical of new health apps
  in emerging markets (60-70% of users churn within 3 months).

### 5.3 LTV:CAC Ratios by Phase and Channel

| Phase | Channel | CAC | LTV (Moderate) | LTV:CAC | Verdict |
|-------|---------|-----|----------------|---------|---------|
| Pilot 1 | Facility-driven | $0.00 | $13.80 | Infinite | Best channel |
| Pilot 1 | WhatsApp | $0.25 | $13.80 | 55.2x | Excellent |
| Pilot 1 | Social organic | $0.75 | $13.80 | 18.4x | Excellent |
| Pilot 2 | Facility-driven | $0.00 | $13.80 | Infinite | Best channel |
| Pilot 2 | Play Store (ASO) | $1.00 | $13.80 | 13.8x | Very Good |
| Pilot 2 | Social paid | $3.00 | $13.80 | 4.6x | Good |
| Pilot 2 | Referral program | $1.00 | $13.80 | 13.8x | Very Good |
| Production | Facility-driven | $0.50 | $13.80 | 27.6x | Excellent |
| Production | Play Store (ASO) | $1.50 | $13.80 | 9.2x | Very Good |
| Production | Social paid | $4.00 | $13.80 | 3.5x | Acceptable |
| Production | Radio/SMS | $2.00 | $13.80 | 6.9x | Good |
| Production | CHW referral | $2.50 | $13.80 | 5.5x | Good |
| Production | Telecom bundling | $0.30 | $13.80 | 46.0x | Excellent |

**LTV:CAC benchmark:** A ratio of 3x or higher is considered healthy for
venture-backed startups. Below 3x requires either CAC reduction or ARPU
increase to achieve sustainable unit economics.

---

## 6. Acquisition Funnel

### 6.1 Funnel Stages

| Stage | Conversion Rate | Metric | Notes |
|-------|----------------|--------|-------|
| Awareness to App Download/Visit | 5-15% | Impressions to installs/visits | Lower end for social media ads, higher end for WhatsApp/referral |
| Download to Registration | 40-60% | Install to signup complete | Mobile money-linked signup increases conversion vs. card-only |
| Registration to First Consultation | 15-30% | Signup to first paid use | Critical activation metric. Onboarding tutorial and first-consult discount drive this. |
| First Use to Monthly Active User | 30-50% | First use to MAU (30-day active) | Push notifications and appointment reminders are key retention levers. |
| MAU to Paying User | 10-25% | Free users to transacting users | Freemium model: basic triage free, consultation paid. |
| Paying User to Premium Subscriber | 5-15% | Transactional to ETB 300/mo subscription | Subscription offers unlimited GP consults + priority booking. |

### 6.2 Funnel Metrics by Phase

| Metric | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|--------|-----------|---------|---------|------------|
| Top of funnel (awareness) | 500 | 5,000 | 50,000 | 250,000+ |
| App downloads/visits | 250 | 1,500 | 15,000 | 75,000 |
| Registrations | 200 | 1,000 | 10,000 | 50,000 |
| First consultation | 50 | 250 | 2,500 | 12,500 |
| Monthly active users | 100 | 350 | 3,500 | 17,500 |
| Paying users | 20 | 70 | 700 | 4,375 |
| Premium subscribers | 2 | 10 | 100 | 650 |

### 6.3 Funnel Optimization Priorities by Phase

| Phase | Bottleneck | Optimization | Expected Lift |
|-------|-----------|-------------|---------------|
| Pre-Pilot | Registration to first use | Onboarding tutorial, demo consultation | +10-15% activation |
| Pilot 1 | Awareness (top of funnel) | Facility-driven distribution, WhatsApp | 3-5x awareness reach |
| Pilot 2 | MAU to paying | Push notifications, appointment reminders, consult quality | +5-10% conversion |
| Production | Download to registration | Simplified signup, mobile-money-first flow | +10-20% registration rate |

---

## 7. Scenario Analysis — All 21 Combinations

### 7.1 Scenario 1: Fully Self-Funded

No external investor at any point. All marketing spend comes from founders'
monthly self-funding budget. Growth is constrained by the portion of monthly
budget that can be allocated to acquisition after development and infrastructure
costs.

---

#### S1-L1 (Bootstrapped — $500/mo)

**Marketing budget allocation:** $0/mo Pre-Pilot through Pilot 1. $50/mo
available from Pilot 2 onward (10% of total budget after dev + infra costs).

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 (personal network) | 150 (internal) | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-8) | 6 mo | $0/mo | 4 (warm leads, slow pace) | 400 (facility-driven) | $0 (time only) | $0 (facility-driven) | $0 | N/A |
| Pilot 2 (M8-18) | 10 mo | $50/mo ($500 total) | 6 | 2,000 | $100 | $0.20 | $0.31 | 44.5x |
| Production (M18+) | Ongoing | $100/mo | 8 | 5,000 | $150 | $0.50 | $0.60 | 23.0x |

**Acquisition channels (S1-L1):**
- 100% organic and facility-driven through Pilot 1
- Pilot 2: WhatsApp groups ($0), social organic ($0), $50/mo for targeted
  Facebook boosts
- Production: $100/mo split between Facebook ads ($60) and SMS ($40)

**Constraints:** No paid advertising budget through Pilot 1. Growth is entirely
dependent on facility onboarding rate and organic word-of-mouth. Timeline to
5,000 users: 18-24 months.

**Growth bottleneck:** Limited marketing spend = slow user growth = slow
revenue = extended timeline to success metric.

---

#### S1-L2 (Steady — $1,000/mo)

**Marketing budget allocation:** $0/mo Pre-Pilot. $100/mo from Pilot 1.
$200/mo from Pilot 2. $300/mo at Production.

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $100/mo ($300 total) | 5 (warm leads) | 700 | $60 | $0.15 | $0.43 | 32.1x |
| Pilot 2 (M5-10) | 5 mo | $200/mo ($1,000 total) | 10 | 4,000 | $200 | $0.30 | $0.40 | 34.5x |
| Production (M10+) | Ongoing | $300/mo | 20 | 12,000 | $250 | $0.75 | $0.85 | 16.2x |

**Acquisition channels (S1-L2):**
- Pilot 1: Founder sales + $100/mo for WhatsApp promotions and basic social
- Pilot 2: Facebook ads ($100/mo), Play Store ASO ($50/mo), referral program
  credits ($50/mo)
- Production: Facebook/Instagram ads ($150/mo), SMS campaigns ($50/mo),
  referral credits ($50/mo), Play Store ASO ($50/mo)

---

#### S1-L3 (Full Self-Fund — $2,000/mo)

**Marketing budget allocation:** $0/mo Pre-Pilot. $200/mo from Pilot 1.
$500/mo from Pilot 2. $700/mo at Production.

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 3 | 200 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $200/mo ($600 total) | 5 | 900 | $120 | $0.25 | $0.67 | 20.6x |
| Pilot 2 (M5-10) | 5 mo | $500/mo ($2,500 total) | 15 | 7,000 | $200 | $0.40 | $0.44 | 31.4x |
| Production (M10+) | Ongoing | $700/mo | 35 | 20,000 | $200 | $1.00 | $1.05 | 13.1x |

**Acquisition channels (S1-L3):**
- Pilot 1: Founder sales + WhatsApp + social ($200/mo)
- Pilot 2: Facebook ads ($200/mo), Play Store ASO ($100/mo), referral program
  ($100/mo), industry event ($500 one-time)
- Production: Full digital mix ($400/mo) + referral ($150/mo) + SMS ($100/mo)
  + one industry event per quarter ($500)

---

### 7.2 Scenario 2: Investor Arrives at Pilot 2 Transition

Self-funded from Month 0 through Pilot 1. Investor capital arrives before or
during Pilot 2, unlocking marketing budget for scaled acquisition. Pre-investor
phases use the same acquisition approach as the corresponding S1 level.

---

#### S2-L1-I1 (Minimal Self-Fund + Minimal Investor — $500/mo then $25-40K)

**Pre-investor:** Identical to S1-L1 through Pilot 1.
**Post-investor marketing allocation:** 20-25% of $25-40K = $5,000-10,000
for acquisition over 12-18 months ($400-700/mo).

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-8) | 6 mo | $0/mo | 4 | 400 | $0 | $0 | $0 | N/A |
| Pilot 2 (M8-14) | 6 mo | $400/mo ($2,400 total) | 10 | 4,000 | $250 | $0.60 | $0.72 | 19.2x |
| Production (M14+) | Ongoing | $500/mo | 18 | 10,000 | $250 | $1.00 | $1.10 | 12.5x |

**Total marketing spend to Production:** $8,400
**Acquisition unlock:** Investor capital enables paid social ads and referral
program that were not affordable at L1 self-funding.

---

#### S2-L1-I2 (Minimal Self-Fund + Ideal Investor — $500/mo then $75-100K)

**Pre-investor:** Identical to S1-L1 through Pilot 1.
**Post-investor marketing allocation:** 20-25% of $75-100K = $15,000-25,000
for acquisition ($1,000-1,500/mo).

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-8) | 6 mo | $0/mo | 4 | 400 | $0 | $0 | $0 | N/A |
| Pilot 2 (M8-14) | 6 mo | $1,200/mo ($7,200 total) | 15 | 7,000 | $200 | $1.00 | $1.04 | 13.3x |
| Production (M14+) | Ongoing | $1,500/mo | 30 | 20,000 | $200 | $1.50 | $1.55 | 8.9x |

**Total marketing spend to Production:** $22,200

---

#### S2-L1-I3 (Minimal Self-Fund + Full Investor — $500/mo then $150-250K)

**Pre-investor:** Identical to S1-L1 through Pilot 1.
**Post-investor marketing allocation:** 20-25% of $150-250K = $30,000-62,500
for acquisition ($2,000-3,500/mo).

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-8) | 6 mo | $0/mo | 4 | 400 | $0 | $0 | $0 | N/A |
| Pilot 2 (M8-14) | 6 mo | $2,500/mo ($15,000 total) | 20 | 10,000 | $250 | $1.50 | $1.53 | 9.0x |
| Production (M14+) | Ongoing | $3,500/mo | 50 | 35,000 | $200 | $2.00 | $2.03 | 6.8x |

**Total marketing spend to Production:** $57,000

---

#### S2-L2-I1 (Steady Self-Fund + Minimal Investor — $1,000/mo then $25-40K)

**Pre-investor:** Identical to S1-L2 through Pilot 1.
**Post-investor marketing allocation:** $5,000-10,000 total ($400-700/mo),
supplementing ongoing $200/mo from self-funding.

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $100/mo ($300 total) | 5 | 700 | $60 | $0.15 | $0.43 | 32.1x |
| Pilot 2 (M5-10) | 5 mo | $600/mo ($3,000 total) | 12 | 5,000 | $250 | $0.60 | $0.66 | 20.9x |
| Production (M10+) | Ongoing | $700/mo | 22 | 15,000 | $250 | $1.00 | $1.05 | 13.1x |

**Total marketing spend to Production:** $10,300

---

#### S2-L2-I2 (Baseline Plan — $1,000/mo then $75-100K)

**This is the baseline plan for Health Hub.** Pre-investor: S1-L2 pacing.
Post-investor: marketing budget of $15,000-25,000 ($1,200-1,500/mo).

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $100/mo ($300 total) | 5 | 700 | $60 | $0.15 | $0.43 | 32.1x |
| Pilot 2 (M5-10) | 5 mo | $1,500/mo ($7,500 total) | 15 | 8,000 | $200 | $1.00 | $1.02 | 13.5x |
| Production (M10+) | Ongoing | $2,000/mo | 35 | 25,000 | $200 | $1.50 | $1.53 | 9.0x |

**Total marketing spend to Production:** $23,800

**Channel mix at Production (S2-L2-I2):**
- Facebook/Instagram paid: $600/mo (30%)
- Google Play Store ASO + paid: $300/mo (15%)
- Referral program credits: $300/mo (15%)
- SMS campaigns: $200/mo (10%)
- WhatsApp promotions: $100/mo (5%)
- Industry events: $200/mo amortized (10%)
- B2B direct sales travel: $150/mo (7.5%)
- Content marketing: $150/mo (7.5%)

---

#### S2-L2-I3 (Steady Self-Fund + Full Investor — $1,000/mo then $150-250K)

**Pre-investor:** S1-L2 pacing. **Post-investor:** $30,000-62,500 marketing
budget ($2,500-3,500/mo).

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $100/mo ($300 total) | 5 | 700 | $60 | $0.15 | $0.43 | 32.1x |
| Pilot 2 (M5-10) | 5 mo | $3,000/mo ($15,000 total) | 20 | 10,000 | $250 | $1.50 | $1.53 | 9.0x |
| Production (M10+) | Ongoing | $4,000/mo | 60 | 40,000 | $200 | $2.50 | $2.50 | 5.5x |

**Total marketing spend to Production:** $63,300

---

#### S2-L3-I1 (Full Self-Fund + Minimal Investor — $2,000/mo then $25-40K)

**Pre-investor:** Identical to S1-L3 through Pilot 1. The $25-40K investor
injection adds limited incremental marketing on top of already-robust L3
self-funding.

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 3 | 200 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $200/mo ($600 total) | 5 | 900 | $120 | $0.25 | $0.67 | 20.6x |
| Pilot 2 (M5-10) | 5 mo | $700/mo ($3,500 total) | 15 | 7,500 | $200 | $0.50 | $0.55 | 25.1x |
| Production (M10+) | Ongoing | $900/mo | 30 | 22,000 | $200 | $1.00 | $1.05 | 13.1x |

**Total marketing spend to Production:** $12,100
**Note:** Behaves very similarly to S1-L3 because the I1 investor injection
adds only $5,000-10,000 in marketing capacity.

---

#### S2-L3-I2 (Full Self-Fund + Ideal Investor — $2,000/mo then $75-100K)

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 3 | 200 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $200/mo ($600 total) | 5 | 900 | $120 | $0.25 | $0.67 | 20.6x |
| Pilot 2 (M5-10) | 5 mo | $2,000/mo ($10,000 total) | 20 | 10,000 | $250 | $1.00 | $1.06 | 13.0x |
| Production (M10+) | Ongoing | $2,500/mo | 45 | 30,000 | $200 | $1.50 | $1.53 | 9.0x |

**Total marketing spend to Production:** $35,600

---

#### S2-L3-I3 (Full Self-Fund + Full Investor — $2,000/mo then $150-250K)

**Maximum Scenario 2 configuration.** Robust self-funded base plus full
investor marketing budget.

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 3 | 200 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $200/mo ($600 total) | 5 | 900 | $120 | $0.25 | $0.67 | 20.6x |
| Pilot 2 (M5-10) | 5 mo | $4,000/mo ($20,000 total) | 25 | 12,000 | $250 | $1.70 | $1.72 | 8.0x |
| Production (M10+) | Ongoing | $5,000/mo | 75 | 50,000 | $200 | $2.50 | $2.50 | 5.5x |

**Total marketing spend to Production:** $81,600

---

### 7.3 Scenario 3: Investor Arrives Right After Pilot 1

Self-funded only from Month 0 through early Pilot 1 (0-3 months). Investor
capital arrives immediately after Pilot 1, funding the entire Pilot 2 and
Production journey. This is the fastest path to scaled acquisition.

---

#### S3-L1-I1 (Minimal Bridge + Minimal Investor — $500/mo for 3 mo, then $25-40K)

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $0/mo | 3 | 300 | $0 | $0 | $0 | N/A |
| Pilot 2 (M5-10) | 5 mo | $500/mo ($2,500 total) | 8 | 4,000 | $300 | $0.60 | $0.69 | 20.0x |
| Production (M10+) | Ongoing | $600/mo | 15 | 10,000 | $250 | $1.00 | $1.05 | 13.1x |

**Total marketing spend to Production:** $8,500

---

#### S3-L1-I2 (Minimal Bridge + Ideal Investor — $500/mo for 3 mo, then $75-100K)

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $0/mo | 3 | 300 | $0 | $0 | $0 | N/A |
| Pilot 2 (M5-10) | 5 mo | $1,500/mo ($7,500 total) | 15 | 8,000 | $200 | $1.00 | $1.00 | 13.8x |
| Production (M10+) | Ongoing | $2,000/mo | 35 | 25,000 | $200 | $1.50 | $1.53 | 9.0x |

**Total marketing spend to Production:** $25,500

---

#### S3-L1-I3 (Minimal Bridge + Full Investor — $500/mo for 3 mo, then $150-250K)

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $0/mo | 3 | 300 | $0 | $0 | $0 | N/A |
| Pilot 2 (M5-10) | 5 mo | $3,000/mo ($15,000 total) | 20 | 10,000 | $250 | $1.50 | $1.53 | 9.0x |
| Production (M10+) | Ongoing | $4,000/mo | 60 | 40,000 | $200 | $2.50 | $2.50 | 5.5x |

**Total marketing spend to Production:** $63,000

---

#### S3-L2-I1 (Steady Bridge + Minimal Investor — $1,000/mo for 3 mo, then $25-40K)

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $100/mo ($300 total) | 5 | 600 | $60 | $0.15 | $0.50 | 27.6x |
| Pilot 2 (M5-10) | 5 mo | $600/mo ($3,000 total) | 12 | 5,000 | $250 | $0.60 | $0.66 | 20.9x |
| Production (M10+) | Ongoing | $700/mo | 22 | 15,000 | $250 | $1.00 | $1.05 | 13.1x |

**Total marketing spend to Production:** $10,300

---

#### S3-L2-I2 (Steady Bridge + Ideal Investor — $1,000/mo for 3 mo, then $75-100K)

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $100/mo ($300 total) | 5 | 600 | $60 | $0.15 | $0.50 | 27.6x |
| Pilot 2 (M5-10) | 5 mo | $1,500/mo ($7,500 total) | 18 | 9,000 | $200 | $1.00 | $1.03 | 13.4x |
| Production (M10+) | Ongoing | $2,500/mo | 40 | 30,000 | $200 | $1.50 | $1.53 | 9.0x |

**Total marketing spend to Production:** $27,800

---

#### S3-L2-I3 (Steady Bridge + Full Investor — $1,000/mo for 3 mo, then $150-250K)

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 2 | 150 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $100/mo ($300 total) | 5 | 600 | $60 | $0.15 | $0.50 | 27.6x |
| Pilot 2 (M5-10) | 5 mo | $3,500/mo ($17,500 total) | 25 | 12,000 | $250 | $1.50 | $1.52 | 9.1x |
| Production (M10+) | Ongoing | $5,000/mo | 70 | 50,000 | $200 | $2.50 | $2.50 | 5.5x |

**Total marketing spend to Production:** $73,800

---

#### S3-L3-I1 (Full Bridge + Minimal Investor — $2,000/mo for 3 mo, then $25-40K)

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 3 | 200 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $200/mo ($600 total) | 5 | 800 | $120 | $0.25 | $0.75 | 18.4x |
| Pilot 2 (M5-10) | 5 mo | $700/mo ($3,500 total) | 15 | 7,000 | $200 | $0.50 | $0.55 | 25.1x |
| Production (M10+) | Ongoing | $900/mo | 28 | 20,000 | $200 | $1.00 | $1.05 | 13.1x |

**Total marketing spend to Production:** $12,100

---

#### S3-L3-I2 (Full Bridge + Ideal Investor — $2,000/mo for 3 mo, then $75-100K)

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 3 | 200 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $200/mo ($600 total) | 5 | 800 | $120 | $0.25 | $0.75 | 18.4x |
| Pilot 2 (M5-10) | 5 mo | $2,500/mo ($12,500 total) | 22 | 11,000 | $250 | $1.20 | $1.23 | 11.2x |
| Production (M10+) | Ongoing | $3,000/mo | 50 | 35,000 | $200 | $1.50 | $1.53 | 9.0x |

**Total marketing spend to Production:** $41,100

---

#### S3-L3-I3 (Maximum Scenario — $2,000/mo for 3 mo, then $150-250K)

**This is the theoretical maximum configuration.** Full self-funded bridge
with the largest investor injection. Fastest path to scale.

| Phase | Duration | Marketing Budget | Facilities Acquired (Cumul.) | Patients Acquired (Cumul.) | B2B CAC | B2C CAC | Blended CAC | LTV:CAC (Moderate) |
|-------|----------|-----------------|------------------------------|---------------------------|---------|---------|-------------|-------------------|
| Pre-Pilot (M0-2) | 2 mo | $0/mo | 3 | 200 | $0 | $0 | $0 | N/A |
| Pilot 1 (M2-5) | 3 mo | $200/mo ($600 total) | 5 | 800 | $120 | $0.25 | $0.75 | 18.4x |
| Pilot 2 (M5-10) | 5 mo | $5,000/mo ($25,000 total) | 30 | 15,000 | $250 | $1.70 | $1.72 | 8.0x |
| Production (M10+) | Ongoing | $6,000/mo | 100 | 60,000 | $200 | $3.00 | $3.00 | 4.6x |

**Total marketing spend to Production:** $97,600

**Channel mix at Production (S3-L3-I3):**
- Facebook/Instagram paid: $1,500/mo (25%)
- Google Ads (Play Store + Search): $900/mo (15%)
- Referral program credits: $600/mo (10%)
- SMS/Telecom campaigns: $600/mo (10%)
- Radio advertising: $500/mo (8%)
- Industry events: $400/mo amortized (7%)
- B2B sales team (part-time): $500/mo (8%)
- Content marketing (video, blog): $400/mo (7%)
- Community health worker incentives: $300/mo (5%)
- WhatsApp promotions: $200/mo (3%)
- Reserve/testing: $100/mo (2%)

---

## 8. Retention and Churn Strategy

Acquisition without retention is a leaking bucket. The strategies below are
sequenced by phase to match resource availability and user base maturity.

### 8.1 Retention Strategies by Phase

| Strategy | Phase | Implementation Cost | Expected Impact on Retention | Dependencies |
|----------|-------|--------------------|-----------------------------|-------------|
| Onboarding tutorial (in-app walkthrough) | Pilot 1+ | $0 (dev time) | +15% activation rate (registration to first use) | Android app or web app |
| Push notifications for upcoming appointments | Pilot 1+ | $0 (dev time, Firebase free tier) | +10% 30-day retention | Android app, notification service |
| WhatsApp appointment reminders | Pilot 1+ | $0.02-0.05/message | +20% return visit rate | WhatsApp Business API integration |
| Email health tips and appointment summaries | Pilot 1+ | $0 (SendGrid free tier) | +5% monthly retention | Email service |
| Referral rewards (give ETB 50, get ETB 50) | Pilot 2+ | $1.75/successful referral | +25% organic acquisition, +10% referrer retention | Payment system, referral tracking |
| Premium subscription benefits (unlimited GP, priority) | Pilot 2+ | $0 (feature gating) | -30% churn for subscribers vs. free users | Subscription billing |
| Gamification (health score, streaks, badges) | Pilot 2+ | $0 (dev time) | +15% DAU/MAU ratio | Frontend development |
| Loyalty program (points per consultation) | Production | $0.10-0.25/point redeemed | -20% overall churn | Points system, redemption flow |
| Family/dependent accounts | Production | $0 (dev time) | +30% household retention (multi-user lock-in) | Dependent profile feature |
| Offline mode (cached health records) | Production | $0 (dev time) | +10% retention in low-connectivity areas | Service worker, local storage |

### 8.2 Churn Analysis

| Churn Trigger | Frequency | Mitigation | Measurement |
|--------------|-----------|-----------|-------------|
| Poor first experience (long wait, tech issues) | High in Pilot 1 | Onboarding tutorial, test consultations, quality monitoring | First-session drop-off rate |
| No perceived need (healthy user, no appointments) | Ongoing | Health tips, preventive care reminders, seasonal health content | Days since last activity |
| Price sensitivity | High for students, rural | Freemium tier, consultation discounts, subscription value | Free-to-paid conversion rate |
| Provider quality concerns | Medium | Provider ratings, quality metrics, feedback loops | Post-consultation NPS |
| Competitor offering | Low (early market) | Feature velocity, network effects, switching costs | Competitive win/loss tracking |
| App performance/UX issues | Medium | Performance monitoring, crash reporting, iterative UX improvement | App store rating, crash rate |

### 8.3 Target Retention Metrics

| Metric | Pilot 1 Target | Pilot 2 Target | Production Target | Industry Benchmark |
|--------|---------------|---------------|-------------------|-------------------|
| D1 retention (day after registration) | 40% | 50% | 55% | 25-35% (health apps) |
| D7 retention | 25% | 30% | 35% | 15-20% |
| D30 retention | 15% | 20% | 25% | 8-12% |
| Monthly churn (paying users) | 15% | 10% | 7% | 5-10% (SaaS) |
| Net promoter score (NPS) | 20 | 35 | 50 | 30-40 (health tech) |

---

## 9. Key Metrics Dashboard

### 9.1 Core Metrics by Phase

| Metric | Pre-Pilot | Pilot 1 | Pilot 2 | Production |
|--------|-----------|---------|---------|------------|
| Total registered users | 200 | 1,000 | 10,000 | 50,000 |
| Monthly active users (MAU) | 100 | 350 | 3,500 | 17,500 |
| Daily active users (DAU) | 20 | 70 | 700 | 5,000 |
| DAU/MAU ratio | 20% | 20% | 20% | 29% |
| B2B facilities onboarded | 3 | 5 | 15 | 50 |
| Patients per facility | 67 | 200 | 667 | 1,000 |
| Blended CAC | $0 | $0.75 | $1.50 | $2.50 |
| ARPU (monthly) | $0 | $0.50 | $1.00 | $1.50 |
| LTV (moderate) | N/A | $6.00 | $12.00 | $18.00 |
| LTV:CAC | N/A | 8.0x | 8.0x | 7.2x |
| Monthly churn | N/A | 15% | 10% | 7% |
| Viral coefficient | 0 | 0.1 | 0.3 | 0.5 |

### 9.2 Channel Performance Tracking

| Channel | Primary Metric | Secondary Metric | Tracking Method |
|---------|---------------|-----------------|-----------------|
| Facility-driven | Registrations per facility per month | Activation rate of facility-referred users | UTM parameter on facility-specific signup links |
| WhatsApp | Click-through rate on shared links | Registrations from WhatsApp UTM | UTM tracking, WhatsApp Business analytics |
| Social media (organic) | Engagement rate, link clicks | Cost per registration (time-adjusted) | Meta Business Suite, TikTok analytics |
| Social media (paid) | CPC, CPI (cost per install) | ROAS (return on ad spend) | Meta Ads Manager, attribution |
| Play Store | Organic installs, keyword ranking | Install-to-registration conversion | Google Play Console, Firebase |
| Referral program | Referrals sent per user, conversion rate | Viral coefficient | In-app referral tracking |
| SMS | Delivery rate, click-through rate | Cost per registration | SMS gateway analytics |

### 9.3 North Star Metrics

| Phase | North Star Metric | Target | Rationale |
|-------|-------------------|--------|-----------|
| Pre-Pilot | Completed test consultations | 50 | Validates core flow works end-to-end |
| Pilot 1 | Facilities with 100+ registered patients | 3 | Proves facility-driven acquisition model |
| Pilot 2 | Paying users (at least 1 paid consultation) | 700 | Validates willingness to pay at scale |
| Production | Monthly revenue | $5,000+ | Path to success metric (revenue >= investment) |

---

## 10. Acquisition Comparison by Combo

### 10.1 Summary Table — All 21 Combinations

| Combo | Scenario | Our Level | Investor Level | Total Marketing Spend to Production | Facilities at Production | Users at Production | Blended CAC | LTV:CAC (Moderate) | Time to 10K Users |
|-------|----------|-----------|---------------|-------------------------------------|------------------------|--------------------|--------------|--------------------|-------------------|
| S1-L1 | Self-Funded | L1 | N/A | $1,400 | 8 | 5,000 | $0.60 | 23.0x | 24+ mo |
| S1-L2 | Self-Funded | L2 | N/A | $3,900 | 20 | 12,000 | $0.85 | 16.2x | 14 mo |
| S1-L3 | Self-Funded | L3 | N/A | $9,100 | 35 | 20,000 | $1.05 | 13.1x | 10 mo |
| S2-L1-I1 | Investor at P2 | L1 | I1 | $8,400 | 18 | 10,000 | $1.10 | 12.5x | 14 mo |
| S2-L1-I2 | Investor at P2 | L1 | I2 | $22,200 | 30 | 20,000 | $1.55 | 8.9x | 12 mo |
| S2-L1-I3 | Investor at P2 | L1 | I3 | $57,000 | 50 | 35,000 | $2.03 | 6.8x | 10 mo |
| S2-L2-I1 | Investor at P2 | L2 | I1 | $10,300 | 22 | 15,000 | $1.05 | 13.1x | 12 mo |
| **S2-L2-I2** | **Investor at P2** | **L2** | **I2** | **$23,800** | **35** | **25,000** | **$1.53** | **9.0x** | **10 mo** |
| S2-L2-I3 | Investor at P2 | L2 | I3 | $63,300 | 60 | 40,000 | $2.50 | 5.5x | 8 mo |
| S2-L3-I1 | Investor at P2 | L3 | I1 | $12,100 | 30 | 22,000 | $1.05 | 13.1x | 10 mo |
| S2-L3-I2 | Investor at P2 | L3 | I2 | $35,600 | 45 | 30,000 | $1.53 | 9.0x | 9 mo |
| S2-L3-I3 | Investor at P2 | L3 | I3 | $81,600 | 75 | 50,000 | $2.50 | 5.5x | 7 mo |
| S3-L1-I1 | Investor at P1 | L1 | I1 | $8,500 | 15 | 10,000 | $1.05 | 13.1x | 12 mo |
| S3-L1-I2 | Investor at P1 | L1 | I2 | $25,500 | 35 | 25,000 | $1.53 | 9.0x | 10 mo |
| S3-L1-I3 | Investor at P1 | L1 | I3 | $63,000 | 60 | 40,000 | $2.50 | 5.5x | 8 mo |
| S3-L2-I1 | Investor at P1 | L2 | I1 | $10,300 | 22 | 15,000 | $1.05 | 13.1x | 12 mo |
| S3-L2-I2 | Investor at P1 | L2 | I2 | $27,800 | 40 | 30,000 | $1.53 | 9.0x | 9 mo |
| S3-L2-I3 | Investor at P1 | L2 | I3 | $73,800 | 70 | 50,000 | $2.50 | 5.5x | 7 mo |
| S3-L3-I1 | Investor at P1 | L3 | I1 | $12,100 | 28 | 20,000 | $1.05 | 13.1x | 10 mo |
| S3-L3-I2 | Investor at P1 | L3 | I2 | $41,100 | 50 | 35,000 | $1.53 | 9.0x | 8 mo |
| S3-L3-I3 | Investor at P1 | L3 | I3 | $97,600 | 100 | 60,000 | $3.00 | 4.6x | 6 mo |

### 10.2 Efficiency Analysis

**Most capital-efficient combinations (highest users per dollar spent):**

| Rank | Combo | Users per $1 Marketing | Notes |
|------|-------|----------------------|-------|
| 1 | S1-L1 | 3.57 users/$1 | Almost entirely organic; time-intensive but capital-efficient |
| 2 | S1-L2 | 3.08 users/$1 | Good balance of spend and organic leverage |
| 3 | S1-L3 | 2.20 users/$1 | Self-funded efficiency before paid channels dominate |
| 4 | S2-L2-I1 | 1.46 users/$1 | Modest investor keeps CAC low |
| 5 | S2-L1-I1 | 1.19 users/$1 | Tight budget, still organic-heavy |

**Fastest to 10,000 users:**

| Rank | Combo | Time to 10K Users | Total Marketing Spend |
|------|-------|-------------------|----------------------|
| 1 | S3-L3-I3 | 6 months | $97,600 |
| 2 | S3-L2-I3 / S2-L3-I3 | 7 months | $73,800 / $81,600 |
| 3 | S3-L1-I3 / S2-L2-I3 / S3-L3-I2 | 8 months | $63,000 / $63,300 / $41,100 |
| 4 | S3-L2-I2 / S2-L3-I2 | 9 months | $27,800 / $35,600 |
| 5 | S2-L2-I2 (Baseline) / S3-L1-I2 / S1-L3 / S2-L3-I1 | 10 months | $23,800 / $25,500 / $9,100 / $12,100 |

### 10.3 LTV:CAC Risk Zones

| LTV:CAC Range | Verdict | Combos in This Range |
|---------------|---------|---------------------|
| 13x+ | Excellent (organic-dominated, high efficiency) | S1-L1, S1-L2, S1-L3, S2-L2-I1, S2-L3-I1, S3-L1-I1, S3-L2-I1, S3-L3-I1 |
| 8x-13x | Very Good (balanced paid + organic) | S2-L1-I2, S2-L2-I2, S2-L3-I2, S3-L1-I2, S3-L2-I2, S3-L3-I2 |
| 5x-8x | Good (paid channels scaling) | S2-L1-I3, S2-L2-I3, S2-L3-I3, S3-L1-I3, S3-L2-I3 |
| 3x-5x | Acceptable (approaching efficiency floor) | S3-L3-I3 |
| Below 3x | Warning (CAC exceeds sustainable threshold) | None |

**Key insight:** No combination falls below the 3x LTV:CAC threshold. Even the
maximum-spend scenario (S3-L3-I3) maintains a 4.6x ratio because the East
African digital advertising market is significantly cheaper than Western
markets, and facility-driven acquisition provides a zero-cost base layer that
keeps blended CAC manageable.

---

## 11. Key Takeaways

1. **Facility-first acquisition is the highest-leverage strategy.** Each
   onboarded healthcare facility generates 50-200 patient registrations at
   near-zero marginal cost. Through Pilot 2, facility-driven acquisition
   accounts for 35-60% of all users across every combination. The B2B sales
   motion (founder-led, then referral-driven) is the single most important
   go-to-market activity.

2. **All 21 combinations achieve viable unit economics.** LTV:CAC ratios range
   from 4.6x (S3-L3-I3, maximum spend) to 23x+ (S1-L1, maximum efficiency).
   No combination enters the sub-3x danger zone because East African digital
   advertising costs are 3-5x cheaper than Western markets, and the organic
   acquisition base keeps blended CAC low.

3. **The baseline plan (S2-L2-I2) balances speed and efficiency.** At $23,800
   total marketing spend to Production, the baseline achieves 25,000 users
   and 35 facilities with a 9.0x LTV:CAC ratio. This is the recommended
   acquisition plan for investor conversations: it demonstrates both capital
   discipline and a credible path to scale.

4. **WhatsApp and Play Store ASO are the two highest-ROI scaled channels.**
   WhatsApp communities cost $0-0.25 per acquired user and leverage existing
   social networks. Play Store ASO (post-Android launch) costs $0.50-2.00
   per install and scales with app store ratings. Both channels should receive
   disproportionate attention relative to paid social advertising.

5. **Retention is the multiplier.** A 5-percentage-point improvement in monthly
   retention (e.g., from 10% churn to 5% churn) doubles average customer
   lifespan and therefore doubles LTV. Investment in push notifications,
   WhatsApp reminders, and premium subscription value delivers higher ROI
   than equivalent spending on top-of-funnel acquisition. The retention
   strategy should be prioritized alongside, not after, the acquisition
   strategy.

---

## 12. Cross-References

| Document | Relevance to Customer Acquisition |
|----------|----------------------------------|
| [params.md](params.md) | Scenario definitions, investment levels, phase timelines, market parameters, FX rates |
| [06-pricing-strategy.md](06-pricing-strategy.md) | Consultation pricing (ETB 200 GP, ETB 400 Specialist), subscription pricing (ETB 300/mo), and their impact on ARPU and LTV calculations |
| [05-revenue-modelling.md](05-revenue-modelling.md) | Revenue projections by phase that depend on user acquisition targets modeled in this document |
| [09-key-business-metrics.md](09-key-business-metrics.md) | KPI definitions, metric tracking frameworks, and dashboard specifications that operationalize the metrics defined here |
| [04-effort-estimation.md](04-effort-estimation.md) | Development effort required for acquisition-enabling features (referral system, push notifications, Play Store ASO, WhatsApp integration) |
| [02-services-slas.md](02-services-slas.md) | Service quality commitments that directly impact retention and churn rates |
| [15-competitive-analysis.md](15-competitive-analysis.md) | Competitor acquisition strategies and channel positioning in the East African health tech market |

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2026-03-18 | 1.0 | Initial document creation covering all 21 scenario x level combinations |

---

*End of 08-customer-acquisition.md*
