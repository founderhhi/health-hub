# Health Hub International (HHI) - Provider-Side Frontend Specification

**Version:** 1.0  
**Last Updated:** January 30, 2026  
**Status:** Implementation Ready  
**Scope:** All provider interfaces (GP, Specialist, Pharmacy, Diagnostics, Operations)

---

## Document Purpose

This document serves as the **definitive frontend specification** for all provider-facing interfaces in the Health Hub International application. It is intended for:
- Backend/DevOps teams building the API and infrastructure
- Frontend developers implementing the UI components
- Product teams validating functionality

**CRITICAL:** This document excludes all patient-facing interfaces. Only provider portals, dashboards, and workflows are documented here.

---

## Table of Contents

1. [Provider Roles Overview](#provider-roles-overview)
2. [Universal Authentication & Login](#universal-authentication--login)
3. [General Practitioner (GP) Portal](#general-practitioner-gp-portal)
4. [Specialist Portal](#specialist-portal)
5. [Pharmacy Admin Portal](#pharmacy-admin-portal)
6. [Diagnostics Admin Portal](#diagnostics-admin-portal)
7. [Operations Admin Portal](#operations-admin-portal)
8. [Shared Components Library](#shared-components-library)
9. [Business Logic & Rules](#business-logic--rules)
10. [Future Considerations](#future-considerations)

---

## Provider Roles Overview

### 1. General Practitioner (GP)
- **Primary Function:** Conduct online consultations, triage patients, issue prescriptions, create referrals
- **Interaction Type:** Web-based (optimized for laptop/desktop use, mobile-responsive)
- **Capacity Model:** Maximum 2 active sessions; maximum 1 live video call at a time
- **Session Duration:** 15 minutes baseline; extends to 25 minutes if referral created during session
- **Work Model:** Fixed scheduled hours (no self-scheduling needed)

### 2. Specialist
- **Primary Function:** Receive and manage referred cases, conduct consultations, propose procedures
- **Interaction Type:** Web-based (laptop/desktop primary)
- **Case Access:** Only referred cases + self-service signups (self-service not available in MVP; UI shows disabled state)
- **Documentation Required:** Post-consultation form after every session

### 3. Pharmacy Admin
- **Primary Function:** Scan prescription QR codes, verify and dispense medications
- **Interaction Type:** Mobile web-based (scanner app)
- **Data Access:** Item list only - NO patient PII (only first name + prescription reference)
- **Privacy Rule:** Zero PII in UI; medication items displayed only

### 4. Diagnostics Admin
- **Primary Function:** Receive lab orders, upload test results
- **Interaction Type:** Web-based dashboard (mobile according to final decision)
- **Data Access:** Minimum PII (patient name, order ID, test list, masked phone)

### 5. Operations Admin (Low Priority - Future Phase)
- **Primary Function:** Manage rosters, partner onboarding, escalations, booking coordination
- **Interaction Type:** Web-based control board (heavy interaction, options-focused)
- **Data Access:** Metadata only by default; PHI access requires reason and audit

---

## Universal Authentication & Login

### Login Screen

**Route:** `/login`  
**Access:** All provider types use the same login interface  
**Component:** `LoginPageComponent`

#### UI Structure

```
┌─────────────────────────────────────┐
│  [Health Hub Logo - Large]          │
│                                      │
│  Provider Login                      │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ Phone Number                    │ │
│  │ [Country Code] [Phone Input]    │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ Password                        │ │
│  │ [Password Input] [Show/Hide]    │ │
│  └────────────────────────────────┘ │
│                                      │
│  [ ] Remember Me                    │
│  [Forgot Password?]                 │
│                                      │
│  [    Login Button - Primary    ]   │
│                                      │
│  Need Help? Contact Support         │
└─────────────────────────────────────┘
```

#### Components Used
- `AuthCardComponent` (organism) - Main container
- `AppLogoComponent` (atom) - size: 'large' (80-96px)
- `AppInputComponent` (atom) - Phone input
- `PhoneInputComponent` (molecule) - With country code selector
- `PasswordInputComponent` (molecule) - With show/hide toggle
- `CheckboxComponent` (atom) - Remember me
- `TextLinkComponent` (atom) - Forgot password link
- `AppButtonComponent` (atom) - variant: 'primary', fullWidth: true
- `ToastComponent` (molecule) - Error/success messages

#### Login Flow Logic

1. **Input Validation**
   - Phone: Required, valid format based on country code
   - Password: Required, minimum 8 characters
   - Show inline error messages on blur

2. **Authentication Process**
   ```
   User enters credentials
   ↓
   Frontend validates format
   ↓
   POST /api/auth/provider-login
   {
     phone: "+254XXXXXXXXX",
     password: "hashed_password",
     remember: boolean
   }
   ↓
   Backend verifies credentials + role
   ↓
   Returns: { token, user_id, role, name, facility_id }
   ↓
   Store token in secure storage
   ↓
   Redirect based on role:
   - GP → /gp/dashboard
   - Specialist → /specialist/dashboard
   - Pharmacy → /pharmacy/scanner
   - Diagnostics → /diagnostics/orders
   - Ops → /ops/dashboard
   ```

3. **Error States**
   - Invalid credentials: "Phone number or password incorrect"
   - Account locked: "Account temporarily locked. Contact support."
   - System error: "Unable to connect. Please try again."
   - Show toast notification at top of screen

4. **Success State**
   - Show brief success toast
   - Redirect within 500ms to role-specific landing page

#### States
- **Initial:** Empty form, Login button enabled
- **Validating:** Show inline validation on field blur
- **Submitting:** Login button shows loading spinner, inputs disabled
- **Error:** Show error toast, re-enable form
- **Success:** Brief success toast, redirect

---

## General Practitioner (GP) Portal

### GP Dashboard (Home/Landing Page)

**Route:** `/gp/dashboard`  
**Component:** `GPDashboardComponent`  
**Layout:** Responsive (Mobile: Vertical stack, Tablet/Desktop: Split layout)

#### Desktop Layout (Primary Use Case)

```
┌─────────────────────────────────────────────────────────────┐
│ [Header: Logo, Notifications, Profile]                      │
├──────────────────────────┬──────────────────────────────────┤
│                          │                                   │
│  CONSULT QUEUE (Left)    │  PERSONAL DASHBOARD (Right)      │
│  (70% width)             │  (30% width)                      │
│                          │                                   │
│  [Queue List Items]      │  [Stats Cards]                    │
│  - Patient 1             │  - Active Sessions: 1/2           │
│  - Patient 2             │  - Completed Today: 7             │
│  - Patient 3             │  - Avg Session: 12m               │
│  ...                     │  - This Week: 34                  │
│                          │                                   │
│  [Load More]             │  [Quick Links]                    │
│                          │  - View Schedule                  │
│                          │  - Documentation                  │
│                          │                                   │
└──────────────────────────┴──────────────────────────────────┘
```

#### Mobile Layout

```
┌──────────────────────┐
│ [Header]             │
├──────────────────────┤
│ PERSONAL DASHBOARD   │
│ (Top - Collapsible)  │
│                      │
│ [Stats Summary]      │
│ 1/2 Active | 7 Today│
│                      │
├──────────────────────┤
│                      │
│ CONSULT QUEUE        │
│ (Bottom - Main)      │
│                      │
│ [Queue Item 1]       │
│ [Queue Item 2]       │
│ [Queue Item 3]       │
│ ...                  │
│                      │
└──────────────────────┘
```

### Personal Dashboard Section (Right/Top)

#### Components & Metrics

**Container:** `PersonalDashboardCardComponent` (organism)

**Metrics Displayed:**

1. **Active Sessions Counter**
   ```
   ┌─────────────────────┐
   │ Active Sessions     │
   │     1 / 2          │
   │ [Green if <2]      │
   └─────────────────────┘
   ```
   - Shows current active consultations / maximum allowed (2)
   - Color coding:
     - 0/2: Gray
     - 1/2: Green
     - 2/2: Amber (capacity full)

2. **Completed Consultations Today**
   ```
   ┌─────────────────────┐
   │ Completed Today     │
   │        7           │
   └─────────────────────┘
   ```
   - Count of closed consultations since 00:00 today
   - Resets daily

3. **Average Session Time**
   ```
   ┌─────────────────────┐
   │ Avg Session Time    │
   │      12 min        │
   └─────────────────────┘
   ```
   - Rolling average of last 10 completed sessions
   - Format: Minutes (round to nearest minute)

4. **Weekly Consultations**
   ```
   ┌─────────────────────┐
   │ This Week          │
   │       34           │
   │   [Small Chart]    │
   └─────────────────────┘
   ```
   - Count from Monday 00:00 to current time
   - Optional: Simple bar chart showing daily distribution

**Component Structure:**
```javascript
<PersonalDashboardCard>
  <MetricCard icon="users" label="Active Sessions" value="1/2" status="available" />
  <MetricCard icon="check" label="Completed Today" value="7" />
  <MetricCard icon="clock" label="Avg Session Time" value="12 min" />
  <MetricCard icon="calendar" label="This Week" value="34" showChart={true} />
</PersonalDashboardCard>
```

### Consult Queue Section (Left/Bottom)

**Container:** `ConsultQueueComponent` (organism)

#### Queue Header
```
┌─────────────────────────────────────────┐
│ Consult Queue (3 waiting)               │
│ [Filter: All ▼] [Sort: Priority ▼]     │
└─────────────────────────────────────────┘
```

#### Queue Item Structure

Each patient in queue displays as a card:

```
┌─────────────────────────────────────────────┐
│ 🔴 John Doe                    [14:32 ago]  │
│ ─────────────────────────────────────────   │
│ Type: Video Call | Priority: Normal         │
│                                              │
│ AI Intake Summary:                           │
│ • Chief complaint: Persistent headache       │
│ • Duration: 3 days                          │
│ • Red flags: None                           │
│                                              │
│ [Accept] [View Full Details] [Skip]         │
└─────────────────────────────────────────────┘
```

**Data Displayed Per Queue Item:**
1. **Status Indicator:**
   - 🔴 Red: Red flag present in AI intake
   - 🟡 Amber: Waiting >15 minutes
   - 🟢 Green: Normal priority

2. **Patient Name:** First name + Last name (full)

3. **Wait Time:** Elapsed time since consultation request (format: "14m ago", "1h 23m ago")

4. **Consultation Type:**
   - "Video Call" (primary)
   - "Voice Call" (if video unavailable)
   - "Chat Only" (if patient requested or technical limitations)

5. **Priority Indicator:**
   - "High" (red flags from AI intake)
   - "Normal" (no red flags)

6. **AI Intake Summary (Collapsed):**
   - Chief complaint (1 line)
   - Duration/onset
   - Red flags indicator (Yes/No)
   - "View Full Details" expands to show complete AI intake

7. **Action Buttons:**
   - **Accept:** Start consultation with this patient
   - **View Full Details:** Opens modal with complete AI intake summary
   - **Skip:** Move to next patient (requires reason, logged)

#### Queue Item Component
```javascript
<QueueItemCard>
  <StatusIndicator priority="high|normal" waitTime={minutes} />
  <PatientName name="John Doe" />
  <ConsultType type="video|voice|chat" />
  <AIIntakeSummary 
    complaint="Persistent headache"
    duration="3 days"
    redFlags={false}
    collapsed={true}
  />
  <ActionButtons>
    <Button variant="primary">Accept</Button>
    <Button variant="outline">View Full Details</Button>
    <Button variant="ghost">Skip</Button>
  </ActionButtons>
</QueueItemCard>
```

#### Queue Logic & Behavior

**Sorting Options:**
- **Priority** (default): Red flags first, then by wait time
- **Wait Time:** Longest waiting first
- **Type:** Group by video/voice/chat

**Filtering Options:**
- **All** (default)
- **High Priority Only** (red flags)
- **Video Calls Only**
- **Waiting >15 min**

**Auto-Refresh:**
- Queue updates every 10 seconds
- New patients appear with notification badge
- Assigned patients disappear from queue

**Empty State:**
```
┌─────────────────────────────┐
│    No Patients Waiting      │
│                             │
│   [Icon: Calendar Check]    │
│                             │
│  All caught up! New         │
│  consultations will appear  │
│  here automatically.        │
└─────────────────────────────┘
```

### AI Intake Details Modal

**Triggered By:** "View Full Details" button in queue item  
**Component:** `AIIntakeDetailModalComponent`

```
┌─────────────────────────────────────────────┐
│ AI Intake Summary                    [×]    │
├─────────────────────────────────────────────┤
│                                              │
│ Patient: John Doe                           │
│ Requested: 14:32 ago                        │
│                                              │
│ CHIEF COMPLAINT                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│ Persistent headache                         │
│                                              │
│ SYMPTOM DETAILS                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│ • Onset: 3 days ago                         │
│ • Location: Frontal, bilateral              │
│ • Severity: 7/10                            │
│ • Character: Throbbing                      │
│ • Triggers: Bright lights                   │
│ • Relief: None tried yet                    │
│                                              │
│ ASSOCIATED SYMPTOMS                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│ • Nausea: Yes                               │
│ • Photophobia: Yes                          │
│ • Fever: No                                 │
│                                              │
│ RED FLAGS                                    │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│ ⚠️  None detected                           │
│                                              │
│ MEDICAL HISTORY                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│ • Medications: None                         │
│ • Allergies: None reported                  │
│ • Previous conditions: None                 │
│                                              │
│         [Accept Consultation]               │
│                                              │
└─────────────────────────────────────────────┘
```

**Components:**
- `ModalComponent` (organism) - Full-screen on mobile
- `IntakeSectionComponent` (molecule) - Each collapsible section
- `RedFlagIndicatorComponent` (molecule) - Warning if red flags present
- `AppButtonComponent` (atom) - Accept button

---

### Active Consultation Screen

**Route:** `/gp/consultation/:consultId`  
**Component:** `GPActiveConsultationComponent`  
**Layout:** Split-screen (Desktop), Tabbed (Mobile)

#### Desktop Layout

```
┌───────────────────────────────────────────────────────────────┐
│ [Header] Patient: John Doe | Session: 12:34 / 15:00     [End]│
├──────────────────────────┬────────────────────────────────────┤
│                          │                                     │
│ PATIENT INFO & CHAT      │ VIDEO/CALL WINDOW                  │
│ (40% width)              │ (60% width)                         │
│                          │                                     │
│ ┌──────────────────────┐ │ ┌────────────────────────────────┐│
│ │ AI Intake Summary    │ │ │                                ││
│ │ [Collapsed by dflt]  │ │ │    [Video Stream]              ││
│ └──────────────────────┘ │ │    or                          ││
│                          │ │    [Voice Call Waveform]       ││
│ ┌──────────────────────┐ │ │                                ││
│ │ Patient History      │ │ └────────────────────────────────┘│
│ │ • Last visit: 2mo    │ │                                     │
│ │ • Conditions: None   │ │ [Mute] [Camera] [End Call]         │
│ └──────────────────────┘ │                                     │
│                          │                                     │
│ CHAT THREAD              │ CONSULTATION NOTES                  │
│ ─────────────────────    │ ─────────────────────────────────  │
│ [Message from patient]   │ [Text area for GP notes]           │
│ [Message from GP]        │ • Diagnosis:                       │
│ ...                      │ • Treatment Plan:                  │
│                          │ • Follow-up:                       │
│ [Type message...]        │                                     │
│                          │ [Quick Actions]                     │
│                          │ • Issue Prescription               │
│                          │ • Create Referral                  │
│                          │ • Request Diagnostics              │
│                          │                                     │
└──────────────────────────┴────────────────────────────────────┘
```

#### Consultation Timer

**Position:** Top header, always visible  
**Component:** `ConsultTimerComponent`

```
Session Time: 12:34 / 15:00
[Green progress bar: 84%]
```

**Timer Logic:**
- Starts at 00:00 when consultation accepted
- Baseline cap: 15:00 (15 minutes)
- Warning at 13:00 (2 minutes remaining)
  - Progress bar turns amber
  - Toast notification: "2 minutes remaining"
- **Referral Extension:** If GP creates referral during session:
  - Cap extends to 25:00 (25 minutes total)
  - Message appears: "Session extended to 25 minutes (referral created)"
  - Timer color returns to green
- At time limit:
  - Gentle prompt: "Session time reached. Please wrap up."
  - Does NOT force-end call
  - GP can manually end when appropriate

**States:**
- 0-13 minutes: Green, normal
- 13-15 minutes: Amber, warning
- 15+ minutes (no referral): Red, urgent wrap-up
- 15-25 minutes (with referral): Green, extended session

#### Left Panel: Patient Info & Chat

**Components:**

1. **AI Intake Summary (Collapsible)**
   - Same content as queue detail modal
   - Collapsed by default
   - Click header to expand

2. **Patient History Card**
   ```
   ┌──────────────────────┐
   │ Patient History      │
   │ ──────────────────── │
   │ Last Visit: 2 months │
   │ Conditions: None     │
   │ Medications: None    │
   │ Allergies: None      │
   └──────────────────────┘
   ```

3. **Chat Thread**
   - **Component:** `ChatMessagesComponent` (organism)
   - Real-time message thread
   - Messages persist after consultation
   - Auto-scroll to latest
   
   **Message Types:**
   - System messages (gray): "Consultation started", "Prescription issued"
   - Patient messages (left, blue bubble)
   - GP messages (right, green bubble)
   - File attachments (images, documents)
   
   **Chat Input:**
   - Text input with emoji picker
   - Attachment button (images, PDFs)
   - Send button
   - Character limit: 2000 chars per message

#### Right Panel: Video/Voice Interface

**Component:** `VideoCallComponent` (organism)

**Video Call Mode:**
```
┌────────────────────────────────┐
│                                │
│   [Patient Video Stream]       │
│   (main, centered)             │
│                                │
│   ┌──────┐                     │
│   │ GP   │  (PIP, bottom-right)│
│   └──────┘                     │
└────────────────────────────────┘

Controls:
[🎤 Mute] [📹 Camera] [🔊 Speaker] [📞 End Call]
```

**Voice Call Mode:**
```
┌────────────────────────────────┐
│         [Patient Avatar]       │
│                                │
│          John Doe              │
│                                │
│      ●●●●●●●●●●●              │
│   [Audio Waveform Animation]   │
│                                │
│         12:34 elapsed          │
│                                │
└────────────────────────────────┘

Controls:
[🎤 Mute] [🔊 Speaker] [📞 End Call]
```

**Call States:**
- **Connecting:** "Connecting to patient..." (loading spinner)
- **Connected:** Video/voice interface active
- **Poor Connection:** Warning banner "Connection unstable"
- **Reconnecting:** "Reconnecting..." overlay
- **Ended:** Transition to post-consultation screen

#### Consultation Notes Area

**Component:** `ConsultationNotesComponent` (molecule)

```
┌────────────────────────────────┐
│ Consultation Notes             │
│ ────────────────────────────── │
│                                │
│ Diagnosis:                     │
│ [Text area]                    │
│                                │
│ Treatment Plan:                │
│ [Text area]                    │
│                                │
│ Follow-up Required:            │
│ [ ] Yes  [×] No               │
│ If yes: [Date picker]          │
│                                │
│ Additional Notes:              │
│ [Text area]                    │
│                                │
└────────────────────────────────┘
```

**Auto-save:** Every 30 seconds while consultation active

#### Quick Actions Panel

**Component:** `QuickActionsComponent` (molecule)

```
┌────────────────────────────────┐
│ Quick Actions                  │
│ ────────────────────────────── │
│                                │
│ [💊 Issue Prescription]        │
│                                │
│ [🏥 Create Referral]           │
│                                │
│ [🔬 Order Lab Tests]           │
│                                │
│ [📋 Add to Health Record]      │
│                                │
└────────────────────────────────┘
```

**Action Behaviors:**

1. **Issue Prescription**
   - Opens prescription modal (overlay)
   - GP fills medication details
   - Generates QR code for pharmacy
   - Posts to chat thread automatically
   - Patient sees in their app instantly

2. **Create Referral**
   - Opens referral modal
   - GP selects:
     - Specialist type (Cardiology, Neurology, etc.)
     - Urgency (Routine, Urgent, Emergency)
     - Notes for specialist
   - Options presented:
     - 3 Local in-person specialists (curated)
     - Online specialist (from available roster)
   - **IMPORTANT:** Extends session timer to 25 minutes
   - Patient confirms selection in their interface
   - Appointment booking initiated

3. **Order Lab Tests**
   - Opens diagnostics order modal
   - GP selects tests from catalog
   - Adds instructions
   - Patient notified in their app + external notification
   - Lab partner receives order

---

### Prescription Modal

**Component:** `PrescriptionModalComponent` (organism)

```
┌─────────────────────────────────────────────┐
│ Issue Prescription                   [×]    │
├─────────────────────────────────────────────┤
│                                              │
│ Medication 1                                │
│ ┌─────────────────────────────────────────┐│
│ │ Drug Name: [Search/Select]              ││
│ │ Dosage: [Input] [Unit ▼]               ││
│ │ Frequency: [Dropdown]                   ││
│ │   □ Once daily  □ Twice daily           ││
│ │   □ Three times □ As needed             ││
│ │ Duration: [Number] [Days/Weeks ▼]      ││
│ │ Instructions: [Text area]               ││
│ │                      [Remove Medication]││
│ └─────────────────────────────────────────┘│
│                                              │
│ [+ Add Another Medication]                  │
│                                              │
│ General Instructions:                        │
│ ┌─────────────────────────────────────────┐│
│ │ [Text area - 500 char limit]            ││
│ └─────────────────────────────────────────┘│
│                                              │
│ Substitution Policy:                         │
│ ○ No substitutions                          │
│ ● Generic OK                                │
│ ○ Pharmacist discretion                     │
│                                              │
│         [Cancel]  [Issue Prescription]      │
│                                              │
└─────────────────────────────────────────────┘
```

**Prescription Issue Flow:**
1. GP completes form
2. Click "Issue Prescription"
3. System generates:
   - Prescription ID (e.g., RX-2024-001)
   - QR code token (server-side hash)
   - PDF version
4. Prescription posted to chat thread with:
   - Medication list summary
   - "View Full Prescription" link
   - QR code (for pharmacy scan)
5. Patient receives notification
6. Prescription available in patient's app

**Validation Rules:**
- At least 1 medication required
- Drug name required
- Dosage + frequency required
- Duration required

---

### Referral Modal

**Component:** `ReferralModalComponent` (organism)

```
┌─────────────────────────────────────────────┐
│ Create Referral                      [×]    │
├─────────────────────────────────────────────┤
│                                              │
│ Referral Type:                              │
│ ● Specialist Consultation                   │
│ ○ Diagnostic Procedure                      │
│                                              │
│ ──────────────────────────────────────────  │
│                                              │
│ Specialty Required: [Dropdown ▼]            │
│ ☐ Cardiology                                │
│ ☐ Neurology                                 │
│ ☐ Orthopedics                               │
│ ☐ Ophthalmology                             │
│ ... (full specialty list)                   │
│                                              │
│ Urgency:                                    │
│ ○ Routine (within 2 weeks)                 │
│ ● Urgent (within 3 days)                   │
│ ○ Emergency (within 24 hours)              │
│                                              │
│ Clinical Summary for Specialist:            │
│ ┌─────────────────────────────────────────┐│
│ │ [Text area - 1000 char limit]           ││
│ │                                          ││
│ │ Auto-populated with:                     ││
│ │ - AI Intake Summary                      ││
│ │ - GP consultation notes                  ││
│ │ (Editable)                               ││
│ └─────────────────────────────────────────┘│
│                                              │
│ Attachments: (optional)                      │
│ [Upload Files] - Images, PDFs, Lab results  │
│                                              │
│ ☑ Share patient consent obtained           │
│                                              │
│ SPECIALIST OPTIONS (GP Curates)             │
│ ──────────────────────────────────────────  │
│                                              │
│ Local In-Person (3 options):                │
│ ┌─────────────────────────────────────────┐│
│ │ ○ Dr. Sarah Kimani - Nairobi Heart Ctr  ││
│ │   ⭐ 4.8 | Available: Tomorrow          ││
│ │ ○ Dr. James Ochieng - City Hospital    ││
│ │   ⭐ 4.9 | Available: 3 days            ││
│ │ ○ Dr. Grace Mwangi - Metro Clinic      ││
│ │   ⭐ 4.7 | Available: 1 week            ││
│ └─────────────────────────────────────────┘│
│                                              │
│ OR                                          │
│                                              │
│ Online Specialist:                           │
│ ┌─────────────────────────────────────────┐│
│ │ ○ Next available online specialist      ││
│ │   (May be local or international)        ││
│ │   Typical wait: <24 hours               ││
│ └─────────────────────────────────────────┘│
│                                              │
│ NOTE: Session will extend to 25 minutes     │
│ to allow patient selection and booking.     │
│                                              │
│         [Cancel]  [Create Referral]         │
│                                              │
└─────────────────────────────────────────────┘
```

**Referral Creation Flow:**
1. GP completes referral form
2. Selects 3 local specialists OR online option
3. Click "Create Referral"
4. System:
   - Extends consultation timer to 25 minutes
   - Posts referral options to patient's chat thread
   - Patient sees specialist options as cards with [Select] buttons
5. Patient selects preferred option
6. System creates appointment (status: 'booked' or 'pending')
7. GP sees confirmation in chat
8. Specialist receives referral packet (with consent)

**Procedure Referral Option:**
If "Diagnostic Procedure" selected instead:
- Additional fields:
  - Procedure type (Inpatient/Outpatient)
  - Location preference (Local/International)
  - Estimated complexity
  - Special requirements
- Same curated options approach
- Specialist portal shows procedure proposals (future phase)

---

### Lab Order Modal

**Component:** `LabOrderModalComponent` (organism)

```
┌─────────────────────────────────────────────┐
│ Order Lab Tests                      [×]    │
├─────────────────────────────────────────────┤
│                                              │
│ Diagnostic Partner: [Dropdown ▼]            │
│ ☐ CityLab Diagnostics                       │
│ ☐ HealthCheck Labs                          │
│ ☐ Metro Lab Services                        │
│                                              │
│ Test Selection:                              │
│ ┌─────────────────────────────────────────┐│
│ │ [Search tests...]                        ││
│ └─────────────────────────────────────────┘│
│                                              │
│ Selected Tests:                              │
│ ☑ Complete Blood Count (CBC)               │
│ ☑ Lipid Profile                            │
│ ☑ Fasting Blood Glucose                    │
│ [ ] Thyroid Function (TSH, T3, T4)         │
│ [ ] Liver Function Tests                   │
│ ... (show full catalog)                     │
│                                              │
│ Urgency:                                    │
│ ○ Routine (results in 24-48h)             │
│ ● Standard (results in 48-72h)            │
│                                              │
│ Clinical Indication:                         │
│ ┌─────────────────────────────────────────┐│
│ │ [Text area - Why these tests needed]    ││
│ └─────────────────────────────────────────┘│
│                                              │
│ Special Instructions for Lab:                │
│ ┌─────────────────────────────────────────┐│
│ │ [Text area - Fasting required, etc.]    ││
│ └─────────────────────────────────────────┘│
│                                              │
│ Patient will receive:                        │
│ • Order confirmation                         │
│ • Lab location & hours                      │
│ • Preparation instructions                   │
│                                              │
│         [Cancel]  [Place Order]             │
│                                              │
└─────────────────────────────────────────────┘
```

**Lab Order Flow:**
1. GP selects tests from catalog
2. Adds clinical indication
3. Submits order
4. System:
   - Creates lab_order record
   - Sends to diagnostics partner (minimal PII)
   - Notifies patient with lab details
   - Posts order summary to chat thread
5. Lab completes tests → uploads results
6. Patient + GP receive notification
7. Results appear in patient's health record

---

### End Consultation Flow

**Trigger:** GP clicks "End Call" or "End Consultation" button

```
┌─────────────────────────────────────────────┐
│ End Consultation?                    [×]    │
├─────────────────────────────────────────────┤
│                                              │
│ Before ending, please confirm:              │
│                                              │
│ ☑ Diagnosis recorded                        │
│ ☑ Treatment plan documented                 │
│ ☑ Prescriptions issued (if needed)          │
│ ☑ Referrals created (if needed)             │
│ ☑ Follow-up scheduled (if needed)           │
│                                              │
│ Session Duration: 14:23 / 15:00             │
│                                              │
│ Additional notes before closing:             │
│ ┌─────────────────────────────────────────┐│
│ │ [Optional text area]                     ││
│ └─────────────────────────────────────────┘│
│                                              │
│         [Cancel]  [End Consultation]        │
│                                              │
└─────────────────────────────────────────────┘
```

**Post-Consultation Actions:**
1. Consultation status → 'closed'
2. Final notes saved
3. Chat thread remains accessible (read-only for patient)
4. Video/voice connection terminated
5. GP returned to dashboard
6. Patient sees consultation summary screen
7. System message posted: "Consultation ended - Thank you"

**Auto-Wrap Behavior:**
- At 15 minutes (no referral): Gentle prompt shown, not forced
- At 25 minutes (with referral): More urgent prompt
- GP always controls when to end (no hard cut-off)

---

## Specialist Portal

### Specialist Dashboard

**Route:** `/specialist/dashboard`  
**Component:** `SpecialistDashboardComponent`  
**Layout:** Similar to GP but focused on referred cases

#### Dashboard Layout

```
┌─────────────────────────────────────────────────────────────┐
│ [Header: Logo, Notifications, Profile]                      │
├──────────────────────────┬──────────────────────────────────┤
│                          │                                   │
│  REFERRED CASES (Left)   │  PERSONAL DASHBOARD (Right)      │
│  (70% width)             │  (30% width)                      │
│                          │                                   │
│  Tabs:                   │  [Stats Cards]                    │
│  [Pending] [Upcoming]    │  - Cases Pending: 4               │
│  [Completed]             │  - Today's Appts: 2               │
│                          │  - Awaiting Docs: 1               │
│  [Case List]             │                                   │
│  - Patient A (New)       │                                   │
│  - Patient B (Tomorrow)  │  [Quick Links]                    │
│  - Patient C (Review)    │  - View Schedule                  │
│  ...                     │  - Documentation Queue            │
│                          │  - Clinical Resources             │
└──────────────────────────┴──────────────────────────────────┘
```

### Personal Dashboard Metrics

**Metrics Displayed:**

1. **Referred Cases Pending Review**
   ```
   ┌─────────────────────┐
   │ Pending Review      │
   │        4           │
   └─────────────────────┘
   ```
   - New referrals not yet reviewed

2. **Today's Appointments**
   ```
   ┌─────────────────────┐
   │ Today's Appts      │
   │        2           │
   │ Next: 14:30        │
   └─────────────────────┘
   ```
   - Scheduled consultations for today
   - Shows time of next appointment

3. **Cases Awaiting Documentation**
   ```
   ┌─────────────────────┐
   │ Awaiting Docs      │
   │        1           │
   └─────────────────────┘
   ```
   - Completed consultations missing post-consult form

### Referred Cases List

**Component:** `ReferredCasesListComponent` (organism)

#### Tabs

1. **Pending** - New referrals requiring review
2. **Upcoming** - Scheduled appointments
3. **Completed** - Past consultations

#### Case Card Structure

```
┌─────────────────────────────────────────────┐
│ [NEW] Mary Johnson              [Yesterday] │
│ ─────────────────────────────────────────── │
│ Referred by: Dr. John Smith (GP)            │
│ Specialty: Cardiology                        │
│ Urgency: Urgent (within 3 days)             │
│                                              │
│ Chief Complaint: Chest pain, shortness of   │
│ breath on exertion                          │
│                                              │
│ [View Full Referral] [Accept Case]          │
└─────────────────────────────────────────────┘
```

**Data Per Case:**
- **NEW badge:** If case not yet reviewed
- **Patient name**
- **Referral date**
- **Referring GP name**
- **Specialty category**
- **Urgency level** (with color coding)
- **Chief complaint** (summary, 2 lines max)
- **Actions:** View details, Accept/Schedule

### Self-Service Signup Cases (Future/Disabled State)

```
┌─────────────────────────────────────────────┐
│ 🔒 Self-Service Signups                     │
│ ─────────────────────────────────────────── │
│                                              │
│ This feature is currently unavailable.       │
│ All new cases come through GP referrals.    │
│                                              │
│ [Learn More]                                │
│                                              │
└─────────────────────────────────────────────┘
```

**UI Note:** Show this as a disabled/grayed section in the dashboard to indicate the feature exists but is not active in MVP.

---

### Referral Detail View

**Triggered by:** Click on case card or "View Full Referral"  
**Component:** `ReferralDetailComponent` (organism)

```
┌─────────────────────────────────────────────┐
│ ← Back to Cases                      [×]    │
├─────────────────────────────────────────────┤
│                                              │
│ REFERRAL DETAILS                             │
│                                              │
│ Patient: Mary Johnson                        │
│ Age: 45 | Gender: Female                    │
│ Referred: January 28, 2026                  │
│ Referring GP: Dr. John Smith                │
│ Urgency: Urgent (within 3 days)             │
│                                              │
│ ──────────────────────────────────────────  │
│                                              │
│ CHIEF COMPLAINT                              │
│ Chest pain and shortness of breath on        │
│ exertion for the past 2 weeks.              │
│                                              │
│ GP CLINICAL SUMMARY                          │
│ ┌─────────────────────────────────────────┐│
│ │ Patient presents with chest tightness    ││
│ │ during physical activity. Pain is        ││
│ │ substernal, non-radiating. Associated    ││
│ │ with mild dyspnea. No orthopnea or PND.  ││
│ │                                          ││
│ │ Risk factors: Hypertension (controlled), ││
│ │ family history of CAD.                   ││
│ │                                          ││
│ │ Initial assessment: Possible stable      ││
│ │ angina. Requires cardiology evaluation   ││
│ │ and possible stress testing.             ││
│ └─────────────────────────────────────────┘│
│                                              │
│ AI INTAKE SUMMARY                            │
│ [Collapsed - Click to expand]               │
│                                              │
│ PATIENT HISTORY                              │
│ • Conditions: Hypertension                   │
│ • Medications: Amlodipine 5mg daily         │
│ • Allergies: None                           │
│ • Previous consultations: 3                  │
│                                              │
│ ATTACHMENTS (2)                              │
│ 📄 Recent BP readings (PDF)                 │
│ 📄 ECG from GP visit (Image)                │
│                                              │
│ ──────────────────────────────────────────  │
│                                              │
│ ACTIONS                                      │
│                                              │
│ [Schedule Appointment]                       │
│ [Order Pre-Appointment Tests]                │
│ [Send Message to Patient]                    │
│ [Decline Referral] (with reason)            │
│                                              │
└─────────────────────────────────────────────┘
```

**Available Actions:**

1. **Schedule Appointment**
   - Opens scheduling interface
   - Specialist selects available slot
   - Patient receives confirmation
   - Case moves to "Upcoming" tab

2. **Order Pre-Appointment Tests**
   - Similar to GP lab order modal
   - Tests completed before consultation
   - Results available at appointment time

3. **Send Message to Patient**
   - Opens chat thread
   - For clarifications before appointment
   - Patient receives notification

4. **Decline Referral**
   - Requires reason (dropdown + text)
   - Notifies referring GP
   - Suggests alternative specialist (optional)

---

### Specialist Active Consultation

**Route:** `/specialist/consultation/:consultId`  
**Component:** `SpecialistActiveConsultationComponent`

**Layout:** Very similar to GP consultation screen with these differences:

1. **Referral Packet Always Visible**
   - GP's clinical summary pinned at top of left panel
   - Pre-appointment test results (if ordered)
   - Complete patient history

2. **Additional Quick Actions:**
   - [💊 Issue Prescription] (same as GP)
   - [🏥 Refer to Another Specialist] (same as GP)
   - [🔬 Order Lab Tests] (same as GP)
   - **[🏥 Propose Procedure]** (NEW - specific to specialist)

3. **No Timer Restrictions:**
   - Specialists not subject to 15/25 minute caps
   - Session duration based on appointment length
   - Timer shows elapsed time only

---

### Procedure Proposal Modal

**Component:** `ProcedureProposalModalComponent` (organism)

```
┌─────────────────────────────────────────────┐
│ Propose Procedure                    [×]    │
├─────────────────────────────────────────────┤
│                                              │
│ Procedure Type:                              │
│ ● Inpatient (hospital admission required)   │
│ ○ Outpatient (day procedure)                │
│                                              │
│ Procedure Name: [Search/Select]             │
│ □ Coronary Angiography                      │
│ □ Echocardiography                          │
│ □ Stress Test                               │
│ ... (specialty-specific catalog)            │
│                                              │
│ Location Preference:                         │
│ ● Local facility                            │
│ ○ International facility (advanced care)    │
│                                              │
│ ──────────────────────────────────────────  │
│                                              │
│ IF LOCAL SELECTED:                           │
│                                              │
│ Facility Options (up to 3):                 │
│ ┌─────────────────────────────────────────┐│
│ │ ☑ Nairobi Heart Institute               ││
│ │   Est. Cost: KES 45,000 - 60,000        ││
│ │   Wait Time: 1-2 weeks                   ││
│ │                                          ││
│ │ ☑ Aga Khan University Hospital          ││
│ │   Est. Cost: KES 55,000 - 70,000        ││
│ │   Wait Time: 2-3 weeks                   ││
│ │                                          ││
│ │ ☑ Kenyatta National Hospital            ││
│ │   Est. Cost: KES 30,000 - 45,000        ││
│ │   Wait Time: 3-4 weeks                   ││
│ └─────────────────────────────────────────┘│
│                                              │
│ OR                                          │
│                                              │
│ IF INTERNATIONAL SELECTED:                   │
│                                              │
│ Country: [Dropdown ▼]                       │
│ ○ India (Recommended for advanced care)     │
│ ○ Other                                     │
│                                              │
│ Facility: [Dropdown based on country]       │
│ □ Apollo Hospitals, Hyderabad               │
│ □ Fortis Memorial, New Delhi                │
│ □ Manipal Hospital, Bangalore               │
│                                              │
│ ──────────────────────────────────────────  │
│                                              │
│ Estimated Timeline: [Input] weeks/months    │
│                                              │
│ Preparation Required:                        │
│ ┌─────────────────────────────────────────┐│
│ │ [Text area - Pre-procedure tests,        ││
│ │  medications to stop, fasting, etc.]     ││
│ └─────────────────────────────────────────┘│
│                                              │
│ Clinical Justification:                      │
│ ┌─────────────────────────────────────────┐│
│ │ [Text area - Why this procedure needed] ││
│ └─────────────────────────────────────────┘│
│                                              │
│ Estimated Costs: (itemized)                 │
│ • Procedure: [Amount]                       │
│ • Hospital stay: [Amount]                   │
│ • Tests: [Amount]                           │
│ • Total: [Calculated]                       │
│                                              │
│ The patient will receive these options as   │
│ cards in their app to review and select.    │
│                                              │
│         [Cancel]  [Propose Procedure]       │
│                                              │
└─────────────────────────────────────────────┘
```

**Procedure Proposal Flow:**
1. Specialist completes procedure details
2. Curates facility options (local or international)
3. Submits proposal
4. System posts procedure options to patient's chat thread
5. Patient reviews options with:
   - Facility name
   - Cost breakdown
   - Timeline
   - Preparation requirements
6. Patient selects preferred option
7. Operations team coordinates booking
8. Confirmations sent via chat + notifications
9. All steps auditable

---

### Post-Consultation Documentation Form

**Triggered:** Automatically after specialist ends consultation  
**Component:** `PostConsultDocumentationFormComponent` (organism)  
**Note:** This is REQUIRED - specialist cannot close consultation without completing

```
┌─────────────────────────────────────────────┐
│ Post-Consultation Documentation             │
│ Patient: Mary Johnson                       │
├─────────────────────────────────────────────┤
│                                              │
│ 1. Primary Diagnosis                         │
│ ┌─────────────────────────────────────────┐│
│ │ [Text area - Required]                   ││
│ │                                          ││
│ │ Example: Stable angina pectoris,         ││
│ │ likely due to coronary artery disease    ││
│ └─────────────────────────────────────────┘│
│                                              │
│ 2. Treatment Plan & Recommendations          │
│ ┌─────────────────────────────────────────┐│
│ │ [Text area - Required]                   ││
│ │                                          ││
│ │ Example: Initiate antiplatelet therapy,  ││
│ │ optimize BP control, coronary angiogram  ││
│ │ scheduled for next week.                 ││
│ └─────────────────────────────────────────┘│
│                                              │
│ 3. Follow-up Required                        │
│ ○ Yes   ● No                                │
│                                              │
│ If Yes:                                     │
│ Timeframe: [2 weeks ▼]                      │
│ Reason: [Text area]                         │
│                                              │
│ 4. Medications Prescribed/Modified           │
│ ┌─────────────────────────────────────────┐│
│ │ [Text area - Optional]                   ││
│ │                                          ││
│ │ Example: Started aspirin 81mg daily,     ││
│ │ increased atorvastatin to 40mg          ││
│ └─────────────────────────────────────────┘│
│                                              │
│ 5. Additional Clinical Notes                 │
│ ┌─────────────────────────────────────────┐│
│ │ [Text area - Optional]                   ││
│ │                                          ││
│ │ Any additional observations, patient     ││
│ │ education provided, lifestyle advice     ││
│ └─────────────────────────────────────────┘│
│                                              │
│ This documentation will be added to the     │
│ patient's health record and visible to      │
│ future providers.                            │
│                                              │
│    [Save as Draft]  [Submit & Close]        │
│                                              │
└─────────────────────────────────────────────┘
```

**Form Validation:**
- Questions 1, 2, 3 are REQUIRED
- Cannot submit without completing required fields
- Can save as draft and return later
- Once submitted:
  - Consultation marked as 'completed'
  - Documentation added to patient's health record
  - Referring GP receives summary notification
  - Patient sees consultation summary in their app

**Auto-save:** Every 60 seconds while form is open

---

## Pharmacy Admin Portal

### Pharmacy Scanner Interface

**Route:** `/pharmacy/scanner`  
**Component:** `PharmacyScannerComponent`  
**Device:** Mobile web-based (smartphone/tablet optimized)  
**Authentication:** Same login as all roles

#### Scanner Home Screen

```
┌──────────────────────┐
│ [Logo] Health Hub    │
│                      │
│ ┌──────────────────┐ │
│ │                  │ │
│ │   Scan QR Code   │ │
│ │                  │ │
│ │  [Camera Feed]   │ │
│ │                  │ │
│ │   [Scan Frame]   │ │
│ │                  │ │
│ └──────────────────┘ │
│                      │
│ Point camera at the  │
│ prescription QR code │
│                      │
│ [Enter Code Manually]│
│                      │
│ Recent Scans (3)     │
│ • RX-2024-156 ✓      │
│ • RX-2024-155 ✓      │
│ • RX-2024-153 ✓      │
│                      │
│ [View All History]   │
└──────────────────────┘
```

**Components:**
- `QRScannerComponent` (organism) - Camera-based scanner
- `ManualCodeInputComponent` (molecule) - Fallback for poor camera quality
- `RecentScansListComponent` (molecule) - Quick access to last 3 scans

#### Scanner States

1. **Ready to Scan**
   - Camera active
   - Scan frame visible
   - Instructions shown

2. **Scanning**
   - Processing QR code
   - Loading indicator

3. **Success**
   - Beep/vibration feedback
   - Transition to prescription details

4. **Error**
   - Invalid QR code: "This QR code is not valid"
   - Already claimed: "This prescription has already been dispensed"
   - QR disabled: "This prescription QR has been disabled. Patient used PDF download."
   - System error: "Connection error. Please try again."

---

### Prescription Details Screen (Post-Scan)

**Triggered by:** Successful QR scan  
**Component:** `PrescriptionDetailsComponent` (organism)

```
┌──────────────────────────────────────┐
│ ← Back                               │
├──────────────────────────────────────┤
│                                       │
│ Prescription: RX-2024-156             │
│ Patient: Mary J.                     │
│ Reference: #8472                     │
│ Issued: Jan 28, 2026                │
│                                       │
│ ────────────────────────────────────  │
│                                       │
│ MEDICATION ITEMS                      │
│                                       │
│ ┌───────────────────────────────────┐│
│ │ 1. Amoxicillin 500mg Capsules     ││
│ │    Quantity: 21 capsules          ││
│ │    Dosage: 1 capsule 3x daily     ││
│ │    Duration: 7 days               ││
│ │    Instructions: Take with food   ││
│ │                                   ││
│ │    [ ] Item Dispensed             ││
│ └───────────────────────────────────┘│
│                                       │
│ ┌───────────────────────────────────┐│
│ │ 2. Paracetamol 500mg Tablets      ││
│ │    Quantity: 20 tablets           ││
│ │    Dosage: 1-2 tablets as needed  ││
│ │    Max: 8 tablets per day         ││
│ │    Instructions: For pain/fever   ││
│ │                                   ││
│ │    [ ] Item Dispensed             ││
│ └───────────────────────────────────┘│
│                                       │
│ General Instructions:                 │
│ Complete full course of antibiotic    │
│ even if feeling better.               │
│                                       │
│ Substitution: Generic OK ✓           │
│                                       │
│ ────────────────────────────────────  │
│                                       │
│ Items to Dispense: 2                 │
│ Items Checked: 0                     │
│                                       │
│ [Mark All as Dispensed]               │
│                                       │
│ [Complete Dispensing]                 │
│                                       │
└──────────────────────────────────────┘
```

**CRITICAL PRIVACY RULES:**
- **Patient Name:** First name + last initial ONLY (e.g., "Mary J.")
- **NO phone number**
- **NO address**
- **NO date of birth**
- **NO patient ID**
- Only show:
  - Prescription reference number
  - Date issued
  - Medication items
  - Dosing instructions

**Interaction Flow:**

1. **Review Items**
   - Pharmacist reviews medication list
   - Checks availability
   - Verifies dosing instructions

2. **Mark Items Dispensed**
   - Check box for each item as dispensed
   - Can mark items individually or use "Mark All"

3. **Complete Dispensing**
   - Click "Complete Dispensing" button
   - Confirmation modal appears:

```
┌──────────────────────────────┐
│ Confirm Dispensing           │
├──────────────────────────────┤
│                              │
│ All 2 items dispensed?       │
│                              │
│ This action cannot be undone │
│                              │
│ [Cancel] [Confirm]           │
│                              │
└──────────────────────────────┘
```

4. **Post-Confirmation**
   - Prescription claim recorded in system
   - Status updated: 'dispensed'
   - Patient receives notification
   - Scanner returns to home screen
   - Success toast: "Prescription RX-2024-156 dispensed ✓"

**Validation Rules:**
- All items must be checked before "Complete Dispensing" is enabled
- First verified pharmacy claim wins (subsequent scans blocked)
- If QR already claimed by another pharmacy: Show error

---

### Pharmacy History/Records

**Route:** `/pharmacy/history`  
**Component:** `PharmacyHistoryComponent`

```
┌──────────────────────────────────────┐
│ ← Dashboard        [Date Filter ▼]   │
├──────────────────────────────────────┤
│                                       │
│ Dispensing History                    │
│                                       │
│ Today (3)                            │
│ ┌───────────────────────────────────┐│
│ │ RX-2024-156 | 14:32               ││
│ │ Items: 2 | Status: Dispensed ✓   ││
│ └───────────────────────────────────┘│
│ ┌───────────────────────────────────┐│
│ │ RX-2024-155 | 11:18               ││
│ │ Items: 3 | Status: Dispensed ✓   ││
│ └───────────────────────────────────┘│
│ ┌───────────────────────────────────┐│
│ │ RX-2024-153 | 09:45               ││
│ │ Items: 1 | Status: Dispensed ✓   ││
│ └───────────────────────────────────┘│
│                                       │
│ Yesterday (5)                        │
│ [Collapsed - Click to expand]        │
│                                       │
│ [Load More]                          │
│                                       │
└──────────────────────────────────────┘
```

**Features:**
- View all dispensed prescriptions
- Filter by date range
- Search by prescription reference
- No detailed patient info (privacy)
- Export daily summary (for reconciliation)

---

## Diagnostics Admin Portal

### Diagnostics Dashboard

**Route:** `/diagnostics/orders`  
**Component:** `DiagnosticsOrdersComponent`  
**Device:** Web-based (laptop/desktop primary, mobile responsive)

#### Order Queue Screen

```
┌─────────────────────────────────────────────────────────────┐
│ [Header: Logo, Notifications, Profile]                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ Lab Orders Queue                     [Filter ▼] [Sort ▼]    │
│                                                              │
│ Tabs: [Pending] [In Progress] [Completed]                   │
│                                                              │
│ ──────────────────────────────────────────────────────────  │
│                                                              │
│ PENDING ORDERS (4)                                          │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Order: LAB-2024-089            [NEW]       [Urgent]    │ │
│ │ Patient: Sarah K.                                       │ │
│ │ Reference: #3847                                        │ │
│ │ Ordered: Jan 28, 2026 - 2 hours ago                    │ │
│ │                                                         │ │
│ │ Tests Ordered (3):                                      │ │
│ │ • Complete Blood Count (CBC)                           │ │
│ │ • Lipid Profile                                        │ │
│ │ • Fasting Blood Glucose                                │ │
│ │                                                         │ │
│ │ Clinical Indication: Routine health screening          │ │
│ │                                                         │ │
│ │ [View Details] [Start Processing]                      │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Order: LAB-2024-088                        [Standard]  │ │
│ │ Patient: John M.                                        │ │
│ │ Reference: #3846                                        │ │
│ │ Ordered: Jan 27, 2026 - 1 day ago                      │ │
│ │                                                         │ │
│ │ Tests Ordered (2):                                      │ │
│ │ • Thyroid Function (TSH, T3, T4)                       │ │
│ │ • Vitamin D                                            │ │
│ │                                                         │ │
│ │ [View Details] [Start Processing]                      │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                              │
│ [Load More Orders]                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**PRIVACY: Minimal PII Shown**
- Patient: First name + last initial only
- Reference number (for patient verification)
- Order ID
- Test list
- NO phone, address, full DOB, or medical history

**Order Card Components:**
- Order ID + Status badge
- Patient identifier (minimal)
- Order date + elapsed time
- Test list
- Urgency indicator
- Action buttons

**Filtering Options:**
- All orders
- Urgent only
- By test type
- Date range

**Sorting Options:**
- Urgency (urgent first)
- Date ordered (oldest first)
- Test type

---

### Lab Order Detail View

**Triggered by:** Click "View Details" or order card  
**Component:** `LabOrderDetailComponent` (organism)

```
┌─────────────────────────────────────────────┐
│ ← Back to Queue                      [×]    │
├─────────────────────────────────────────────┤
│                                              │
│ Order: LAB-2024-089                         │
│ Status: Pending                             │
│                                              │
│ ──────────────────────────────────────────  │
│                                              │
│ PATIENT INFORMATION (Minimal)                │
│ Name: Sarah K.                              │
│ Reference: #3847                            │
│ Contact: +254 XXX XXX 847 (masked)          │
│                                              │
│ ──────────────────────────────────────────  │
│                                              │
│ ORDER DETAILS                                │
│ Ordered by: Dr. Mary Kamau (Specialist)     │
│ Order Date: January 28, 2026 at 11:45      │
│ Urgency: Urgent (results in 24-48h)        │
│                                              │
│ ──────────────────────────────────────────  │
│                                              │
│ TESTS REQUESTED (3)                          │
│                                              │
│ ☐ Complete Blood Count (CBC)               │
│    Sample: Blood (5ml, EDTA tube)           │
│    Fasting: Not required                     │
│                                              │
│ ☐ Lipid Profile                             │
│    Sample: Blood (5ml, serum tube)          │
│    Fasting: Required (12 hours)             │
│                                              │
│ ☐ Fasting Blood Glucose                     │
│    Sample: Blood (2ml, fluoride tube)       │
│    Fasting: Required (8-12 hours)           │
│                                              │
│ ──────────────────────────────────────────  │
│                                              │
│ CLINICAL INDICATION                          │
│ Routine health screening for patient with    │
│ family history of diabetes and heart disease │
│                                              │
│ SPECIAL INSTRUCTIONS                         │
│ Patient will arrive fasted. Please          │
│ prioritize lipid panel.                      │
│                                              │
│ ──────────────────────────────────────────  │
│                                              │
│ [Mark as In Progress] [Cancel Order]        │
│                                              │
└─────────────────────────────────────────────┘
```

**Actions:**

1. **Mark as In Progress**
   - Moves order to "In Progress" tab
   - Timestamp recorded
   - Patient notified: "Your lab order is being processed"

2. **Cancel Order** (rare)
   - Requires reason
   - Notifies ordering doctor
   - Patient receives cancellation notice

---

### Result Upload Interface

**Triggered by:** Order in "In Progress" status  
**Route:** `/diagnostics/order/:orderId/upload`  
**Component:** `ResultUploadComponent` (organism)

```
┌─────────────────────────────────────────────┐
│ Upload Results - LAB-2024-089               │
│ Patient: Sarah K. | Reference: #3847        │
├─────────────────────────────────────────────┤
│                                              │
│ Tests Completed:                             │
│                                              │
│ ☑ Complete Blood Count (CBC)                │
│ ☑ Lipid Profile                             │
│ ☑ Fasting Blood Glucose                     │
│                                              │
│ ──────────────────────────────────────────  │
│                                              │
│ TEST TYPE                                    │
│ [Select Test ▼]                             │
│ ☐ Complete Blood Count (CBC)                │
│ ● Lipid Profile                             │
│ ☐ Fasting Blood Glucose                     │
│                                              │
│ ──────────────────────────────────────────  │
│                                              │
│ UPLOAD RESULT FILE                           │
│                                              │
│ ┌─────────────────────────────────────────┐│
│ │  [📁 Drag & Drop File Here]             ││
│ │                                          ││
│ │  or [Browse Files]                       ││
│ │                                          ││
│ │  Supported: PDF, JPG, PNG               ││
│ │  Max size: 10 MB                         ││
│ └─────────────────────────────────────────┘│
│                                              │
│ Selected File: lipid_profile_089.pdf        │
│ [×] Remove                                  │
│                                              │
│ ──────────────────────────────────────────  │
│                                              │
│ COMPLETION DATE                              │
│ [Date Picker] January 29, 2026              │
│ [Time Picker] 15:30                         │
│                                              │
│ ──────────────────────────────────────────  │
│                                              │
│ TECHNICIAN NOTES (Optional)                  │
│ ┌─────────────────────────────────────────┐│
│ │ Sample quality good. All tests completed ││
│ │ successfully. Results within normal      ││
│ │ limits.                                  ││
│ └─────────────────────────────────────────┘│
│                                              │
│ ──────────────────────────────────────────  │
│                                              │
│ [Upload Another Test] [Complete Upload]     │
│                                              │
└─────────────────────────────────────────────┘
```

**Upload Flow:**

1. **Select Test Type**
   - Choose which test this result is for
   - If multiple tests, can upload separately or as combined report

2. **Upload File**
   - Drag & drop or browse
   - Accepted formats: PDF, JPG, PNG
   - Max size: 10 MB
   - File preview shown after upload

3. **Set Completion Date**
   - When test was completed
   - Defaults to current date/time

4. **Add Notes** (Optional)
   - Any relevant technician observations
   - Sample quality notes

5. **Submit**
   - **Upload Another Test:** Add results for next test in order
   - **Complete Upload:** Finalize all results

**Post-Upload Actions:**
- File uploaded to secure storage
- Result linked to order
- Order status updated
- Patient receives notification: "Your lab results are ready"
- Ordering specialist notified
- Result visible in patient's health record
- Result appears in diagnostics "Completed" tab

---

### Completed Orders

**Tab:** Completed  
**Component:** `CompletedOrdersComponent`

```
┌─────────────────────────────────────────────┐
│ Completed Orders                [Filter ▼]  │
│                                              │
│ Today (2)                                    │
│ ┌──────────────────────────────────────────┐│
│ │ LAB-2024-089 | 15:45                     ││
│ │ Patient: Sarah K. | Tests: 3 ✓          ││
│ │ [View Results]                           ││
│ └──────────────────────────────────────────┘│
│ ┌──────────────────────────────────────────┐│
│ │ LAB-2024-087 | 10:22                     ││
│ │ Patient: James N. | Tests: 2 ✓          ││
│ │ [View Results]                           ││
│ └──────────────────────────────────────────┘│
│                                              │
│ Yesterday (5)                                │
│ [Collapsed - Click to expand]               │
│                                              │
│ [Export Daily Report]                        │
│                                              │
└─────────────────────────────────────────────┘
```

**Features:**
- View all completed orders
- Click to see uploaded results
- Export daily completion report (for records)
- Search by order ID or patient reference

---

## Operations Admin Portal

### Overview

**Status:** Low Priority - Future Phase  
**Route:** `/ops/dashboard`  
**Component:** `OpsDashboardComponent`

The Operations Admin portal is planned for post-MVP implementation. Below is a high-level outline of intended functionality:

#### Planned Modules

1. **Roster Management**
   - GP & Specialist availability schedules
   - Capacity monitoring (sessions, appointments)
   - Staffing alerts

2. **Partner Onboarding**
   - Pharmacy verification workflow
   - Diagnostics lab credentialing
   - Specialist approval process
   - Document collection & verification

3. **Booking Coordination**
   - Appointment calendar oversight
   - Referral tracking
   - Conflict resolution
   - Rescheduling interface

4. **Escalation Management**
   - Support ticket queue
   - Issue categorization & routing
   - Resolution tracking
   - SLA monitoring

5. **Analytics & Reporting**
   - Consultation metrics
   - Prescription volumes
   - Referral patterns
   - Partner performance

**Data Access Rules:**
- Metadata only by default (no PHI)
- Purpose-gated access for troubleshooting
- All actions audited with reason codes
- MFA required for PHI unmasking

**Note to Developers:** Operations portal will be specified in detail in a future phase. Backend should prepare:
- Purpose-based access control framework
- Audit logging infrastructure
- Restricted view definitions (RLS policies)
- Admin role hierarchy

---

## Shared Components Library

These components are reusable across multiple provider interfaces:

### Core Atoms

1. **AppLogoComponent**
   - Sizes: small (28-32px), large (80-96px)
   - Variants: full, mark, icon
   - Used in all headers

2. **AppButtonComponent**
   - Variants: primary, secondary, outline, ghost
   - States: default, hover, active, disabled, loading
   - Sizes: small, medium, large
   - Full-width option

3. **AppInputComponent**
   - Types: text, email, tel, password
   - With icon support (left/right)
   - Error state with message
   - Character count (optional)

4. **BadgeComponent**
   - Status indicators: success, warning, error, info
   - Sizes: small, medium, large
   - Used for priority, urgency, status

5. **AvatarComponent**
   - User/doctor avatars
   - Initials fallback
   - Status indicator (online/offline)

### Core Molecules

1. **PhoneInputComponent**
   - Country code selector
   - Phone format validation
   - International number support

2. **PasswordInputComponent**
   - Show/hide toggle
   - Strength indicator (optional)
   - Requirements checklist

3. **CheckboxComponent**
   - Standard checkbox
   - Label support
   - Indeterminate state

4. **SelectComponent**
   - Dropdown select
   - Searchable option
   - Multi-select option

5. **DatePickerComponent**
   - Calendar interface
   - Date range selection
   - Time picker option

6. **ToastComponent**
   - Types: success, error, warning, info
   - Auto-dismiss option
   - Action button support

### Core Organisms

1. **AuthCardComponent**
   - Login container
   - Centered layout
   - Responsive design

2. **AppHeaderComponent**
   - Logo, notifications, profile menu
   - Consistent across all portals
   - Role-specific navigation

3. **ModalComponent**
   - Full-screen on mobile
   - Overlay with backdrop
   - Close button
   - Scroll handling

4. **VideoCallComponent**
   - WebRTC video interface
   - Controls (mute, camera, end)
   - Connection status
   - PIP support

5. **ChatMessagesComponent**
   - Message thread
   - Real-time updates
   - Typing indicators
   - File attachments

6. **ChatInputComponent**
   - Text input with auto-resize
   - Emoji picker
   - File attachment button
   - Send button

---

## Business Logic & Rules

### Consultation Capacity Rules

**GP Capacity Model:**
- Maximum 2 active online sessions per GP
- Maximum 1 live video call at a time
- Other session slot for:
  - Pre/post-consult documentation
  - Asynchronous chat responses
  - Prescription/referral creation

**Session Duration:**
- Baseline: 15 minutes
- Warning at: 13 minutes (2 min remaining)
- Extension: +10 minutes if referral created (25 min total)
- No hard cut-off (GP controls end time)

**Specialist Capacity:**
- No session limit (appointment-based)
- Duration based on booked appointment length
- Post-consult documentation required

### Prescription QR Logic

**QR Code Behavior:**
- Generated server-side with secure token
- Enabled by default: `qr_enabled = true`
- **Disable trigger:** Patient downloads PDF
  - On first PDF download: `qr_enabled = false` permanently
  - Prevents duplicate dispensing
  - Patient sees disclaimer before PDF download

**Pharmacy Claim Rules:**
- First verified pharmacy claim wins
- Subsequent scans of same QR: Rejected with error message
- If QR disabled (PDF downloaded):
  - Scan shows error: "QR code disabled, patient used PDF"
  - No claim possible
- Pharmacist sees medication items only (zero PII in UI)

### Referral Extension Logic

**Automatic Timer Extension:**
- When GP creates referral during consult:
  - Session cap extends from 15 min → 25 min
  - Notification shown: "Session extended for referral"
  - Timer color returns to green
  - Allows time for patient to select specialist option
- Extension only applies if referral created during active session
- Extension is one-time per session

### Data Privacy Tiers

**Full Access:**
- GPs: Assigned consultation only
- Specialists: Referred cases only
- Patient: Own data only

**Minimal PII:**
- Pharmacy: First name + last initial, prescription reference, date
- Diagnostics: First name + last initial, order ID, test list, masked phone

**Metadata Only:**
- Operations: No PHI by default
- Requires purpose + audit for PHI access

### Notifications (Future Implementation)

**In-App Notifications:**
- Real-time for critical events
- Badge count on notification icon
- Notification panel with list

**External Notifications:**
- Not specified in MVP (no external channel integration in scope)
- Placeholder for future integration
- Will be determined based on backend/channel decisions

**Trigger Events:**
- GP: New patient in queue, message from patient
- Specialist: New referral, appointment reminder
- Pharmacy: [None in MVP]
- Diagnostics: New order received

---

## Technical Specifications

### Routes Summary

**Authentication:**
- `/login` - Universal provider login

**GP Routes:**
- `/gp/dashboard` - Dashboard with queue + personal stats
- `/gp/consultation/:consultId` - Active consultation interface

**Specialist Routes:**
- `/specialist/dashboard` - Referred cases + personal stats
- `/specialist/consultation/:consultId` - Active consultation interface

**Pharmacy Routes:**
- `/pharmacy/scanner` - QR scanner home
- `/pharmacy/history` - Dispensing history

**Diagnostics Routes:**
- `/diagnostics/orders` - Order queue dashboard
- `/diagnostics/order/:orderId/upload` - Result upload interface

**Operations Routes (Future):**
- `/ops/dashboard` - Operations control board
- `/ops/roster` - Staff management
- `/ops/partners` - Partner onboarding
- `/ops/escalations` - Issue resolution

### API Endpoints (Expected by Frontend)

**Authentication:**
- `POST /api/auth/provider-login` - Provider authentication
  - Request: `{ phone, password, remember }`
  - Response: `{ token, user_id, role, name, facility_id }`

**GP Endpoints:**
- `GET /api/gp/dashboard` - Dashboard metrics + queue
- `GET /api/gp/queue` - Current queue with AI intake summaries
- `POST /api/gp/consultation/:consultId/accept` - Accept consultation
- `POST /api/gp/consultation/:consultId/end` - End consultation
- `POST /api/gp/prescription` - Issue prescription
- `POST /api/gp/referral` - Create referral
- `POST /api/gp/lab-order` - Order lab tests

**Specialist Endpoints:**
- `GET /api/specialist/dashboard` - Dashboard metrics + referred cases
- `GET /api/specialist/referrals` - List of referred cases
- `GET /api/specialist/referral/:referralId` - Referral detail
- `POST /api/specialist/consultation/:consultId/document` - Post-consult form
- `POST /api/specialist/procedure-proposal` - Propose procedure

**Pharmacy Endpoints:**
- `POST /api/pharmacy/scan` - Validate QR code
  - Request: `{ qr_token }`
  - Response: `{ prescription_id, items[], patient_name_masked }`
- `POST /api/pharmacy/claim` - Claim prescription
  - Request: `{ prescription_id, items_dispensed[] }`
  - Response: `{ success, claim_id }`
- `GET /api/pharmacy/history` - Dispensing history

**Diagnostics Endpoints:**
- `GET /api/diagnostics/orders` - Order queue
- `POST /api/diagnostics/order/:orderId/start` - Mark in progress
- `POST /api/diagnostics/order/:orderId/upload` - Upload result
  - Request: Multipart form with file + metadata
  - Response: `{ success, result_id }`
- `GET /api/diagnostics/completed` - Completed orders

**Shared Endpoints:**
- `GET /api/chat/messages/:consultId` - Get consultation messages
- `POST /api/chat/messages` - Send message
- `GET /api/notifications` - Get notifications (future)

### State Management

**Recommended Approach:**
- React Context for global state (user, auth)
- React Query for server state (API data)
- Local component state for UI state

**Key State Items:**
- `authState`: { token, userId, role, name }
- `consultationState`: { activeConsultId, timer, videoStatus }
- `queueState`: { patients[], filters, sorting }
- `notificationState`: { unreadCount, items[] }

### Real-Time Features

**WebSocket Connections (if implemented):**
- GP Queue: Auto-refresh every 10 seconds (or WebSocket)
- Chat Messages: Real-time message delivery
- Video Calls: WebRTC peer connections
- Notifications: Real-time push

**Polling Fallback:**
- If WebSocket unavailable, poll every 10-30 seconds
- Exponential backoff on errors

### Security Considerations

**Authentication:**
- JWT tokens stored in httpOnly cookies (preferred) or secure localStorage
- Token refresh mechanism
- Session timeout after 8 hours (configurable)

**Authorization:**
- Role-based access control (RBAC)
- Frontend route guards based on role
- Backend validates all requests with RLS policies

**Data Protection:**
- HTTPS only
- No PHI in URL parameters
- Sanitize all user inputs
- No PII in logs or error messages

**Pharmacy Scanner:**
- Camera permissions requested explicitly
- QR data never stored client-side
- Token validated server-side only

---

## Future Considerations

### Notifications System

**Implementation Status:** Not in MVP scope  
**Planned Features:**
- In-app notification panel
- Push notifications (browser/mobile)
- External notification channel (TBD)

**GP Notifications:**
- New patient added to queue
- Patient sent message during consultation
- Referral accepted by specialist
- Lab results received for referred patient

**Specialist Notifications:**
- New referral received
- Appointment reminder (1 day before, 1 hour before)
- Lab results uploaded (if ordered)
- Patient message received

**Pharmacy Notifications:**
- New prescription issued nearby (geo-based, optional)

**Diagnostics Notifications:**
- New order received
- Urgent order flagged

### Self-Service Specialist Booking

**Implementation Status:** Not available in MVP  
**UI Placeholder:** Shown as disabled with message:
> "Self-Service Signups  
> This feature is currently unavailable.  
> All new cases come through GP referrals."

**Future Implementation:**
- Patients can directly book specialists (without GP referral)
- Specialist dashboard shows separate tab for self-service bookings
- Requires additional screening/triage flow
- Payment integration needed

### Operations Portal Full Build

**Phase 2 Priority:** After GP, Specialist, Pharmacy, Diagnostics are stable

**Key Modules to Build:**
1. Real-time capacity dashboard (GP availability, session count)
2. Partner onboarding workflow (pharmacy, diagnostics, specialist)
3. Appointment coordination calendar
4. Escalation & support ticket system
5. Analytics & reporting dashboards

**Access Control:**
- Tiered permissions (Ops Admin, Super Admin)
- Purpose-based PHI access with audit trail
- MFA required for sensitive actions

---

## Appendix: Component Hierarchy Examples

### GP Dashboard Component Tree

```
GPDashboardComponent
├── AppHeaderComponent
│   ├── AppLogoComponent
│   ├── NotificationBellComponent
│   └── UserAvatarMenuComponent
├── DashboardLayoutComponent
│   ├── PersonalDashboardSection
│   │   ├── MetricCard (Active Sessions)
│   │   ├── MetricCard (Completed Today)
│   │   ├── MetricCard (Avg Session Time)
│   │   └── MetricCard (This Week)
│   └── ConsultQueueSection
│       ├── QueueHeaderComponent
│       │   ├── FilterDropdown
│       │   └── SortDropdown
│       └── QueueItemCard (repeated)
│           ├── StatusIndicator
│           ├── PatientInfoDisplay
│           ├── ConsultTypeTag
│           ├── AIIntakeSummary (collapsed)
│           └── ActionButtonGroup
│               ├── AcceptButton
│               ├── ViewDetailsButton
│               └── SkipButton
```

### Specialist Referral Detail Component Tree

```
ReferralDetailComponent
├── BackButton
├── ReferralHeaderSection
│   ├── PatientInfoDisplay (minimal PII)
│   ├── ReferralMetadata (date, urgency, referring GP)
│   └── UrgencyBadge
├── ClinicalSummarySection
│   ├── ChiefComplaintCard
│   ├── GPClinicalSummaryCard (collapsible)
│   └── AIIntakeSummaryCard (collapsible)
├── PatientHistorySection
│   ├── ConditionsCard
│   ├── MedicationsCard
│   ├── AllergiesCard
│   └── PreviousConsultsCard
├── AttachmentsSection
│   └── AttachmentCard (repeated)
│       ├── FileIcon
│       ├── FileName
│       └── ViewButton
└── ActionButtonGroup
    ├── ScheduleAppointmentButton
    ├── OrderPreTestsButton
    ├── SendMessageButton
    └── DeclineReferralButton
```

### Pharmacy Scanner Component Tree

```
PharmacyScannerComponent
├── ScannerHeader
│   └── AppLogoComponent
├── QRScannerView
│   ├── CameraFeedComponent
│   ├── ScanFrameOverlay
│   └── InstructionsText
├── ManualEntryButton
└── RecentScansSection
    └── RecentScanItem (repeated)
        ├── PrescriptionReference
        ├── StatusIcon
        └── QuickAccessButton

// After successful scan:

PrescriptionDetailsComponent
├── BackButton
├── PrescriptionHeaderSection
│   ├── PrescriptionID
│   ├── PatientNameMasked (First name + initial only)
│   ├── ReferenceNumber
│   └── DateIssued
├── MedicationItemsList
│   └── MedicationItemCard (repeated)
│       ├── DrugName
│       ├── DosageInfo
│       ├── QuantityInfo
│       ├── Instructions
│       └── DispensedCheckbox
├── GeneralInstructionsCard
├── SubstitutionPolicyTag
├── DispensingProgressBar
└── CompleteDispensingButton
```

---

## Document Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | Jan 30, 2026 | Initial comprehensive specification | HHI Product Team |

---

## Sign-Off

This document represents the complete provider-side frontend specification for Health Hub International MVP.

**Document Status:** ✅ Implementation Ready  
**Review Status:** Pending Backend/DevOps Team Review  
**Next Steps:** 
1. Backend team reviews API endpoint requirements
2. Frontend team reviews component architecture
3. DevOps reviews infrastructure needs
4. Begin sprint planning

---

**END OF DOCUMENT**
