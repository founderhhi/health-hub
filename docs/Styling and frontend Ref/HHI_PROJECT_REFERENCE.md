# Health Hub International (HHI) - Project Reference Guide

> **Document Purpose:** Comprehensive reference for features, flows, and user journeys  
> **Platform:** Angular web application (responsive, dynamic to all screen sizes)  
> **Architecture:** Single codebase with Role-Based Access Control (RBAC)  
> **Brand:** Health Hub International | Tagline: "Trusted Care, Anywhere"

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [User Roles & Access](#2-user-roles--access)
3. [Universal Authentication](#3-universal-authentication)
4. [Patient Portal](#4-patient-portal)
5. [GP Portal](#5-gp-portal)
6. [Specialist Portal](#6-specialist-portal)
7. [Pharmacy Portal](#7-pharmacy-portal)
8. [Diagnostics Portal](#8-diagnostics-portal)
9. [Business Rules & Logic](#9-business-rules--logic)
10. [Branding & Design System](#10-branding--design-system)
11. [Coming Soon / Future Features](#11-coming-soon--future-features)
12. [What's NOT in Scope (MVP)](#12-whats-not-in-scope-mvp)
13. [Key Decisions Summary](#13-key-decisions-summary)

---

## 1. Project Overview

### Vision
Health Hub International (HHI) is a Healthcare-as-a-Service (HaaS) platform delivering integrated telehealth services across Africa and beyond. The platform connects patients with healthcare providers through a unified digital ecosystem.

### Platform Architecture
- **Framework:** Angular web application
- **Responsiveness:** Fully responsive, dynamic to all screen sizes
- **Optimization:** 
  - Patient portal: Mobile-first
  - GP & Specialist portals: Desktop AND mobile optimized
  - Pharmacy & Diagnostics portals: Mobile web-based
- **Codebase:** Single application with RBAC (NOT separate portals)
- **Routing:** Role-based redirect after universal login

### Core Service Pillars
1. **GP Consultation** - On-demand primary care via video/audio/chat
2. **Specialist Consultation** - Referred care from GP or active referrals
3. **Heal Well at Home** - Health education video library
4. **Pharmacy Services** - Digital prescription fulfillment
5. **Diagnostics & Lab Tests** - Specialist-ordered lab work (self-booking is future feature)

---

## 2. User Roles & Access

| Role | Access Level | Primary Device | Portal |
|------|-------------|----------------|--------|
| **Patient** | Own health data, consultations, prescriptions | Mobile (primary), Desktop | Patient Portal |
| **GP (General Practitioner)** | Assigned patient consultations, prescriptions, referrals | Desktop + Mobile | GP Portal |
| **Specialist** | Referred patients, lab orders, prescriptions, specialist referrals | Desktop + Mobile | Specialist Portal |
| **Pharmacy Admin** | Prescription claims, dispensing | Mobile web | Pharmacy Portal |
| **Diagnostics Admin** | Lab orders, result uploads | Mobile web | Diagnostics Portal |
| **Operations Admin** | Roster, partners, analytics (metadata only) | Desktop | Operations Portal (Future) |

### Privacy Tiers
- **Full PHI Access:** GPs and Specialists (for assigned patients only)
- **Minimal PII:** Pharmacy and Diagnostics (first name + last initial, order details)
- **Metadata Only:** Operations (aggregated data, purpose-gated PHI access with audit)

---

## 3. Universal Authentication

### Onboarding Flow (1-2 Screens Maximum)

**Screen 1: Welcome / Introduction**
- Health Hub logo and branding
- Brief introduction to Health Hub
- Marketing tagline: "Trusted Care, Anywhere"

**Screen 2 (Optional): Care Ecosystem Overview**
- Visual overview of all services (GP, Specialist, Pharmacy, Diagnostics, Heal Well)
- Single-screen summary of the complete care ecosystem

**From Onboarding → Login Selection:**
- Two clear options:
  - **Patient Login** → Patient Home Dashboard
  - **Provider Login** → Provider Dashboard (role-based redirect)

### Login Mechanisms
- **Patient:** Phone + Password (or other auth method)
- **Provider:** Phone + Password (or other identifier + password)
- **Role Detection:** System determines user type and redirects accordingly

---

## 4. Patient Portal

### Bottom Navigation (4 Tabs)
| Tab | Icon | Function |
|-----|------|----------|
| **Home** | 🏠 | Main dashboard, service access |
| **My Appointments** | 📅 | Upcoming & past appointments |
| **Health Records/Locker** | 📁 | Consultations, prescriptions, lab results, documents |
| **Profile** | 👤 | Personal info, settings |

### 4.1 Home Dashboard

**Header:**
- Health Hub logo
- Notification bell
- User avatar

**Greeting Section:**
- Time-based greeting ("Good morning")
- User's first name

**Health Tip Card (Optional):**
- Daily rotating health tips

**Services Grid:**

| Service | Status | Description |
|---------|--------|-------------|
| GP Consultation | Active | Talk to a doctor now |
| Specialist | Active | View referrals, specialty grid |
| Heal Well at Home | Active | Health video library |
| Pharmacy | Active | View prescriptions, find pharmacy |
| Diagnostics | Active | View lab orders |
| Travel & Insurance | Coming Soon | Locked/grayed out |
| Community Health | Coming Soon | Locked/grayed out |

**Upcoming Appointment Card (if exists):**
- Doctor name, specialty, date/time
- Quick action to view details

---

### 4.2 GP Consultation Flow

#### Entry Screen (Single Page - Merged)
**Contains both symptom intake AND consultation type selection:**

**Symptom Intake Section (3-4 Questions):**
1. Common symptom selection (Fever, Cold, Headache, Stomach Pain, Skin Issue, Fatigue, Other)
2. Brief description textarea (optional)
3. Duration selection (Today, 2-3 days, Week+, Month+)
4. Any additional relevant quick question

**Consultation Type Selection:**
- Video Call (Recommended badge)
- Audio Call
- Chat

**CTA Button:** "Start Consultation" or "Find Available Doctor"

**Important:** NO pricing details shown on this screen

---

#### Waiting Room
**Elements:**
- Doctor card (photo, name, credentials, rating)
- Queue position or estimated wait time (show ranges, not exact times)
- Connection status indicator
- Cancel option

**NOT Included:**
- Educational health cards
- Health tips carousel

---

#### Active Consultation
**Interface:**
- Video/Audio/Chat based on selection
- Doctor video (dominant) or chat interface
- Self-view (PiP for video)
- Session timer visible throughout
- Controls: Mute, Camera toggle, Chat overlay, End call

**Communication Modes Available:**
- Video
- Audio
- Chat (with file sharing capability)

---

#### End Consultation Flow
1. **End Consultation** - User or doctor ends session
2. **Checklist Completion** - System validates required items
3. **Auto-Save to Records** - Consultation summary saved automatically (MANDATORY, no option)
4. **Send Summary to Patient** - Summary also saved to patient's Health Records

---

#### Post-Consultation Screens

**1. Completion Success Message**
- Consultation completed confirmation
- Brief thank you message

**2. Doctor Rating**
- Star rating for the GP
- Optional feedback text

**3. GP Summary Card**
- Doctor name and photo
- Consultation date/time
- Diagnosis/assessment
- Medical advice given
- Any red flags identified

**Prescription Handling:**
- If GP prescribed medication → Prescription appears as **ACTIVE** in patient's Pharmacy page
- Patient can choose to use or ignore the prescription
- NO call-to-action buttons for pharmacy
- NO follow-up recommendations shown

**Mandatory Actions:**
- Everything is automatically saved to Health Records (no opt-out)

---

### 4.3 Specialist Consultation

#### Specialist Tab/Page Content

**GP Referral Notice:**
- Explanation that specialists are accessed via GP referral
- CTA: "Consult a GP First"

**Specialty Grid:**
- Visual grid of all specialties (Cardiology, Neurology, Ophthalmology, etc.)
- Icons for each specialty
- Tapping shows "Coming Soon" or referral prompt

**Active Referrals Section:**
- If patient has active referrals from GP or another specialist
- Displayed similar to active prescriptions in Pharmacy
- Shows: Specialist type, referring doctor, reason, urgency, status
- Patient can view details and track referral status

**Self-Service Booking:** Currently DISABLED (future feature)
- Shows disabled state / coming soon indicator

---

### 4.4 Heal Well at Home

**Video Library Categories:**
- Nutrition & Diet
- Exercise & Fitness
- Mental Wellness
- Chronic Disease Management
- Preventive Care

**Interface:**
- Category-based navigation
- Video cards with thumbnail, title, duration
- Progress tracking per video
- Video player with standard controls

**Content Management:**
- Videos hosted on YouTube (MVP)
- Embedded in app
- Admin dashboard for content management (basic)
- Future: Self-hosted videos

---

### 4.5 Pharmacy Services

**My Prescriptions:**
- List of prescriptions (Active / Past tabs)
- Active prescriptions show QR code for pharmacy scanning
- Prescription details: Medications, dosage, instructions, prescribing doctor

**Find Nearby Pharmacy:**
- Google Maps integration
- List of partner pharmacies
- Distance, hours, contact info

**QR Code Behavior:**
- QR enabled by default
- First pharmacy to scan claims the prescription
- Once claimed, QR becomes inactive for other pharmacies

---

### 4.6 Diagnostics & Lab Tests

**Current State:**
- View lab orders from specialists
- Track order status (Ordered → In Progress → Results Ready)
- View and download results

**Self-Booking:** LOCKED / Future Feature
- Shows "Coming Soon" or disabled state
- All lab tests currently come from specialist orders only

---

### 4.7 My Appointments

**Tabs:**
- **Upcoming:** Future scheduled appointments
- **Past:** Completed consultations

**Appointment Card Details:**
- Doctor name, specialty, photo
- Date & time
- Consultation type (Video/Audio/Chat)
- Status indicator
- Actions: View details, Cancel/Reschedule (for upcoming)

---

### 4.8 Health Records / Locker

**Categories:**
- **Consultations:** All consultation summaries (GP & Specialist)
- **Prescriptions:** All prescriptions issued
- **Lab Results:** All diagnostic results
- **Documents:** Uploaded health documents

**Features:**
- Date-sorted listing
- Search/filter capability
- Download options
- Everything auto-saved from consultations (mandatory)

---

### 4.9 Profile & Settings

**Personal Information:**
- Name, phone, email
- Date of birth
- Gender
- Address

**Medical Information:**
- Allergies
- Current medications
- Medical conditions
- Emergency contact

**App Settings:**
- Notification preferences
- Language selection
- Dark/Light mode

**Account Actions:**
- Change password
- Sign out
- Delete account

---

## 5. GP Portal

### Bottom Navigation / Menu
For desktop: Side navigation or top menu
For mobile: Bottom navigation with same options

| Section | Function |
|---------|----------|
| **Dashboard** | Queue + personal stats |
| **Queue** | Waiting patients list |
| **Profile** | Personal info, certifications, stats |

### 5.1 Dashboard

**Layout:** Split view (Desktop: 70% queue / 30% stats)

**Personal Statistics Panel:**
- Active sessions (e.g., 1/2 capacity)
- Completed today
- Average session time
- Weekly consultations
- Patient rating

**Consultation Queue Panel:**
- List of waiting patients
- Priority sorting
- Auto-refresh every 10 seconds

---

### 5.2 Queue Management

**Queue Item Card Shows:**
- Patient name
- Wait time
- Consultation type (Video/Audio/Chat)
- AI intake summary preview
- Priority indicator (Urgent/Routine)

**Actions:**
- View AI Intake Details (modal)
- Start Consultation

---

### 5.3 AI Intake Details Modal

**Patient Information:**
- Name, age, gender
- Medical history summary
- Known allergies
- Current medications

**Symptom Summary:**
- Chief complaint
- Duration
- Severity assessment
- AI-identified red flags (highlighted)

**Note:** This same format (with additional elements) is used for Specialist patient details.

---

### 5.4 Active Consultation Screen

**Layout:** Split-screen
- Left/Main: Patient info + Chat/Video window
- Right: Patient context + Action buttons

**Session Timer:**
- 15-minute baseline visible throughout
- Warning at 13 minutes
- If referral created, extends to 25 minutes total

**Communication Options:**
- Video call
- Audio call
- Chat messaging

---

### 5.5 GP Actions During Consultation

#### Prescription Modal
- Multi-medication form
- Drug name, dosage, frequency, duration
- Instructions for patient
- Substitution policy (generic allowed/brand only)
- Generate QR code for prescription

#### Referral Modal
- Specialty selection
- Urgency level (Routine/Urgent/Emergency)
- Clinical summary for specialist
- Reason for referral

**Important GP Limitations:**
- GP **CANNOT** order lab tests
- GP **CANNOT** directly select pharmacy, specialist, or lab partners
- GP can only **SUGGEST** (suggestions appear as notifications to patient)
- Patient can choose to ignore suggestions
- GP **CANNOT** suggest lab tests at all

---

### 5.6 End Consultation Flow (GP)

1. **End Consultation** - GP clicks end
2. **Checklist** - System confirms:
   - Notes saved?
   - Prescription created (if needed)?
   - Referral created (if needed)?
3. **Auto-Save** - Consultation saved to patient's health records
4. **Send Summary** - Summary automatically sent to patient (also in their records)

---

### 5.7 GP Profile

**Personal Information:**
- Name, credentials, photo
- Specialization
- Years of experience
- Location

**Certifications & Licenses:**
- Medical license number
- Valid until date
- Certifications list

**Statistics:**
- Monthly consultations
- Average rating
- Total patients served

---

## 6. Specialist Portal

### Bottom Navigation (4 Tabs)

| Tab | Icon | Function |
|-----|------|----------|
| **Home/Dashboard** | 🏠 | Stats, today's appointments, quick actions |
| **Requests** | 📋 | Incoming referrals (with notification badge) |
| **My Patients** | 👥 | ALL patients (active + past) |
| **Profile** | 👤 | Personal info, stats |

---

### 6.1 Home Dashboard

**Greeting Section:**
- Time-based greeting
- Doctor name and specialty
- Today's appointment count

**Stats Cards (2x2 Grid):**
- Today's Schedule (completed/total)
- Pending Requests (with "New" badge)
- Patient Rating
- My Patients quick link

**Today's Appointments:**
- List of scheduled appointments for today
- Patient name, age, time, duration
- Visit number indicator
- "View Details" button

---

### 6.2 Requests Tab

**Filter Options:**
- All
- GP Referrals
- Specialist Referrals (from other specialists)

**Referral Card Shows:**
- Patient name, age
- Requested date/time
- Consultation type
- Referred by (GP/Specialist name)
- Chief complaint
- Urgency indicator
- Time since request

**Actions:**
- Accept → Patient moves to "My Patients"
- Decline (with reason)
- View full referral details

---

### 6.3 Referral Detail View

**Format:** Similar to AI Intake Modal but expanded

**Patient Information:**
- Name, age, gender
- Contact details (masked)
- Medical history

**Referral Details:**
- Referring doctor (GP or Specialist)
- Referral reason
- Clinical summary
- Urgency level
- Attachments (if any)

**Previous Consultation Notes:**
- Summary from referring doctor

---

### 6.4 My Patients Tab

**Shows ALL Patients:**
- Both active and past patients in one list
- No separate tabs for active/past

**Patient Card Shows:**
- Name, age
- Next appointment (if scheduled)
- Consultation type
- Visit count
- Last visit date
- Current condition

**Actions:**
- View Details → Patient Detail Screen
- Reschedule (if has appointment)

---

### 6.5 Patient Detail Screen

**Accessible from:** My Patients or Today's Appointments

**Patient Info Card:**
- Photo placeholder, name, age, gender
- Total visits, last visit date

**Sections:**
- Next Appointment (if any)
- Current Condition
- Quick Actions:
  - View Full Medical History
  - View All Medications
  - View Previous Consultations → Links to Profile/Past consultations

---

### 6.6 Active Consultation Interface

**Layout:** Similar to GP but appointment-based

**Patient Context Panel:**
- Visit number
- Last visit date
- Current condition
- Allergies
- Collapsed/expandable

**Action Buttons (Equal Priority):**

1. **Order Lab Tests**
   - Test selection
   - Clinical indication
   - Urgency
   - Partner selection (if applicable)

2. **Write Prescription**
   - Multi-medication form
   - Dosage, frequency, duration
   - Instructions
   - Substitution policy
   - Generate QR

3. **Create Referral** (to another specialist)
   - Specialty selection
   - Urgency level
   - Clinical summary
   - Referral reason
   - Goes to other specialist's "Requests" tab
   - Original specialist KEEPS access to patient

---

### 6.7 Post-Consultation Documentation

**REQUIRED** - Cannot close consultation without completing:

- Diagnosis
- Treatment plan
- Follow-up recommendations
- Medications prescribed (if any)
- Lab orders (if any)
- Referrals made (if any)

---

### 6.8 Specialist Profile

**Personal Information:**
- Name, photo, credentials
- Specialty
- Years of experience
- Location

**Certifications & Licenses:**
- Medical license details
- Specialty certifications

**Monthly Stats:**
- Consultations completed
- Average rating
- Lab orders issued
- Referrals made (to other specialists)

---

## 7. Pharmacy Portal

### Bottom Navigation (2 Tabs)

| Tab | Function |
|-----|----------|
| **Home** | QR Scanner / Prescription ID input |
| **Profile** | Personal details + Completed orders |

---

### 7.1 Home Screen

**Central Feature:** Prescription Lookup

**Options:**
1. **QR Scanner** - Camera button to scan prescription QR
2. **Manual Input** - Text field for prescription code

**Visual:**
- Large pharmacy icon
- Clear CTA: "Scan Prescription" or "Enter prescription code"

**Instructions Panel:**
- Simple steps: Scan → View details → Dispense → Complete

---

### 7.2 Prescription Details Screen

**Privacy:** Minimal PII only
- Patient: First name + Last initial only
- No full name, phone, or address visible

**Prescription Information:**
- Prescription ID
- Medication list with:
  - Drug name
  - Dosage
  - Quantity
  - Instructions
  - Substitution policy (Generic OK / Brand Only)

**Actions:**
- Mark items as dispensed (checkbox per item)
- Complete Dispensing → Confirmation → Goes to Completed

**Claim Logic:**
- First pharmacy to scan and claim wins
- Subsequent scans show "Already claimed" error

---

### 7.3 Profile Screen

**Business Information:**
- Pharmacy name
- Partner status
- Location

**Today's Summary:**
- Prescriptions filled
- In progress

**Completed Orders:**
- Recent orders list
- Order ID, patient (first name + initial), date/time
- Status indicator

**Sign Out Button**

---

## 8. Diagnostics Portal

### Bottom Navigation (2 Tabs)

| Tab | Function |
|-----|----------|
| **Home** | Order code input / QR scanner |
| **Profile** | Personal details + Completed orders |

---

### 8.1 Home Screen

**Central Feature:** Lab Order Lookup

**Options:**
1. **QR/Code Scanner** - Camera button
2. **Manual Input** - Text field for lab order code

**Today's Appointments (if applicable):**
- List of scheduled patient visits
- Patient name (minimal PII), time, tests ordered, status

---

### 8.2 Order Details Screen

**Privacy:** Minimal PII
- Patient: First name + Last initial
- Order ID
- Masked phone (for contact if needed)

**Test Information:**
- List of ordered tests
- Ordering specialist
- Clinical indication
- Urgency

**Workflow:**
- Update status: Pending → Sample Collected → Processing → Completed
- Upload results (for completed tests)

---

### 8.3 Result Upload Interface

**For Each Test:**
- Test name
- File upload (PDF, JPG, PNG - max 10MB)
- Completion date
- Technician notes (optional)

**Actions:**
- Save progress
- Mark as complete → Notify patient and specialist

---

### 8.4 Profile Screen

**Center Information:**
- Diagnostic center name
- Partner status
- Location

**Today's Summary:**
- Tests completed
- In progress

**Recent Tests:**
- Completed orders list
- Patient (first name + initial), test type, status, date

**Sign Out Button**

---

## 9. Business Rules & Logic

### GP Capacity Model
| Rule | Value |
|------|-------|
| Max active sessions | 2 simultaneous |
| Max live video | 1 at a time |
| Session baseline | 15 minutes |
| Warning threshold | 13 minutes |
| Extended session (with referral) | 25 minutes total |

### Prescription QR Rules
| Condition | Behavior |
|-----------|----------|
| Default | QR enabled |
| First claim | Pharmacy that scans first wins |
| Post-claim | QR inactive for others |
| PDF download | Permanently disables QR |

### Referral Flow
| Referral Type | From | To | Appears In |
|---------------|------|----|-----------| 
| GP → Specialist | GP | Specialist | Specialist's Requests tab |
| Specialist → Specialist | Specialist | Another Specialist | Other Specialist's Requests tab |

- Original referring provider retains access to patient
- Referral format consistent (clinical summary, urgency, reason)

### Patient Notifications
- GP suggestions (pharmacy, specialist) appear as notifications
- Patient can choose to act on or ignore
- GP cannot force selection of partners

### Lab Test Ordering
| Role | Can Order Labs? |
|------|----------------|
| GP | ❌ No |
| Specialist | ✅ Yes |
| Patient (self-book) | ❌ No (future feature) |

### Data Persistence
- All consultation data automatically saved to Health Records
- No opt-out for patients
- Summaries sent automatically post-consultation

---

## 10. Branding & Design System

### Logo Suite
- **Main Logo:** Horizontal (600px) and Stacked (200px)
- **Alternative Logo:** Text-only "Health Hub" (limited space)
- **Icon Mark:** Tree symbol (256px, 64px, 32px, 16px)
- **Tagline:** "Trusted Care, Anywhere"

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Emerald Green** | #2ECC71 | Primary - Trust, vitality, CTAs |
| **Bio-Lime** | #AEEA00 | Accent - Energy, attention, highlights |
| **Soft Charcoal** | #34495E | Secondary - Text, contrast |
| **Dark Background** | #0B0F14 | App background |
| **Card Background** | #121826 | Cards, panels |
| **Border** | #1E293B | Dividers, borders |
| **Text Primary** | #FFFFFF | Main text |
| **Text Secondary** | #A0AEC0 | Subdued text |

### Typography
- **Font Family:** Inter (Sans-serif)
- **H1:** 32px Bold
- **H2:** 24px SemiBold
- **H3:** 18px SemiBold
- **Body:** 16px Regular
- **Caption:** 14px Regular
- **Small:** 12px Regular

### Design Tokens

**Spacing:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

**Border Radius:**
- sm: 4px
- md: 8px
- lg: 12px
- xl: 16px
- full: 9999px

### Accessibility
- Emerald on White: 4.5:1 (WCAG AA ✓)
- Bio-Lime on Dark: 4.5:1 (WCAG AA ✓)
- Color-blind tested (Deuteranopia, Protanopia, Tritanopia)

---

## 11. Coming Soon / Future Features

### Patient Portal
- **Travel & Insurance** - Placeholder page only
- **Community Health** - Placeholder page only
- **Self-service specialist booking** - Disabled state shown
- **Self-service lab test booking** - Locked feature

### Provider Portals
- **Operations Admin Portal** - Future phase
  - Roster management
  - Partner onboarding
  - Booking coordination
  - Escalation management
  - Analytics dashboard

### Platform Features
- Self-hosted video content (currently YouTube)
- Advanced analytics
- Multi-language support expansion
- Offline support (not in MVP)

---

## 12. What's NOT in Scope (MVP)

| Category | Exclusion |
|----------|-----------|
| **Video Infrastructure** | In-app video hosting - using external SDK |
| **Payments** | In-app payment processing - external only |
| **Subscriptions** | No pricing, plan upgrades, or subscription UI |
| **Travel Services** | Integration disabled - coming soon only |
| **Offline Support** | Not required for MVP |
| **Patient Lab Booking** | Self-service lab tests disabled |
| **GP Lab Orders** | GPs cannot order lab tests |
| **Operations Portal** | Deferred to future phase |

---

## 13. Key Decisions Summary

| Decision Area | Choice |
|---------------|--------|
| **Platform** | Web-only responsive Angular app |
| **Codebase** | Single app with RBAC (not separate portals) |
| **GP/Specialist Optimization** | Desktop AND Mobile |
| **Patient Optimization** | Mobile-first |
| **Video Consultation** | External SDK (TBD vendor), not WhatsApp |
| **Payments** | External processing, not in-app |
| **Subscriptions/Pricing** | Not shown in app |
| **Pharmacy Integration** | API-based for Phase 1 |
| **Diagnostics Integration** | API-based for Phase 1 |
| **Travel Services** | Coming Soon placeholder only |
| **Maps** | Google Maps for pharmacy/diagnostics |
| **Health Videos** | YouTube-hosted, admin-managed |
| **Lab Test Ordering** | Specialist only (GP cannot, Patient future) |
| **Onboarding** | 1-2 screens max, then patient/provider login split |
| **Patient Bottom Nav** | Home \| Appointments \| Records \| Profile |
| **Specialist Bottom Nav** | Dashboard \| Requests \| My Patients \| Profile |
| **Pharmacy/Diagnostics Nav** | Home \| Profile (2 tabs) |

---

## Appendix: Screen Inventory

### Patient Portal Screens
1. Onboarding (1-2 screens)
2. Login / Signup
3. Home Dashboard
4. GP Consultation Entry (merged symptom + type)
5. Waiting Room
6. Active Consultation (Video/Audio/Chat)
7. Consultation Summary + Rating
8. Specialist Tab (referral notice + active referrals)
9. Heal Well at Home (categories + video player)
10. Pharmacy (prescriptions + find pharmacy)
11. Diagnostics (view orders)
12. My Appointments (upcoming/past)
13. Health Records/Locker
14. Profile & Settings
15. Coming Soon pages (Travel, Community)

### GP Portal Screens
1. Login
2. Dashboard (queue + stats)
3. AI Intake Details Modal
4. Active Consultation
5. Prescription Modal
6. Referral Modal
7. End Consultation Flow
8. Profile

### Specialist Portal Screens
1. Login
2. Home Dashboard
3. Requests (with filters)
4. Referral Detail View
5. My Patients (all patients)
6. Patient Detail Screen
7. Active Consultation
8. Lab Order Modal
9. Prescription Modal
10. Referral Modal (to other specialist)
11. Post-Consultation Documentation
12. Profile

### Pharmacy Portal Screens
1. Login
2. Home (QR scanner / code input)
3. Prescription Details
4. Profile (with completed orders)

### Diagnostics Portal Screens
1. Login
2. Home (order lookup)
3. Order Details
4. Result Upload
5. Profile (with completed orders)

---

*Document Version: 1.0*  
*Last Updated: January 2026*  
*Project: Health Hub International (HHI)*
