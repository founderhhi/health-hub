# 01 — GP / Practitioner Portal
**Health Hub International (HHI) — Styling Implementation Guide**
> Route: `/gp` and `/gp/profile`
> Theme: Light — `#F8FAFC` background
> Primary SCSS: `src/app/features/dashboard/components/practitioner/practitioner.scss` (1335 lines)
> Supporting SCSS: `src/app/features/dashboard/components/gp-profile/gp-profile.scss`
> Shared: `src/app/shared/_provider-ui.scss`

> ⚠️ **Prerequisite:** Complete all tasks in `00_global-design-system.md` before starting this document.

---

## Table of Contents
1. [Portal Overview](#1-portal-overview)
2. [Current State Summary](#2-current-state-summary)
3. [Issues Found](#3-issues-found)
4. [Comparative Analysis — Page by Page](#4-comparative-analysis--page-by-page)
5. [Step-by-Step Implementation Tasks](#5-step-by-step-implementation-tasks)
6. [Reference Links](#6-reference-links)
7. [Final Recommendation](#7-final-recommendation)

---

## 1. Portal Overview

| Property | Value |
|---|---|
| **Route** | `/gp`, `/gp/profile` |
| **User** | GP / General Practitioner |
| **Theme** | Light — `#F8FAFC` background |
| **Primary SCSS** | `practitioner.scss` — 1335 lines (largest in project) |
| **Test Files** | `practitioner.spec.ts` — 3 tests on bottom nav selector `.bottom-nav button.nav-item` |
| **Bottom Nav** | ⚠️ Must stay as inline `<nav>` — test coverage exists on its selectors |

---

## 2. Current State Summary

The GP dashboard is the most feature-rich and largest SCSS file in the project. It contains:

- Light `#F8FAFC` background
- 4-column stats row: Waiting / Active / Completed / Avg Time
- Stat cards with colored icon squares (emerald, blue, lime, slate)
- Patient queue panel (left 70%) — left-border accent cards (green/amber/red by priority)
- AI summary section per patient card (light green background)
- Sidebar (right 30%) — quick actions + daily schedule
- Embedded consultation session: video + chat
- History section
- Bottom navigation (inline `<nav>`)

---

## 3. Issues Found

| # | Issue | Detail | Severity |
|---|---|---|---|
| GP-1 | 1335-line SCSS file | Massive file — many class names duplicate `_provider-ui.scss` (e.g., `.btn-primary`, `.sidebar-card`) | 🟠 Medium |
| GP-2 | Priority badge styling fragile | `.priority-emergency` uses hardcoded `background: #FEE2E2` — not using SCSS variable | 🔴 High |
| GP-3 | Queue number hidden on mobile | `.queue-number { display: none }` on mobile — loses useful triage info | 🟠 Medium |
| GP-4 | No smooth collapse animation | Unavailable notice dismisses instantly with no transition | 🟡 Low |
| GP-5 | Stats card layout looks dated | Icon-left layout — modern dashboards use icon top-right with large number left | 🟠 Medium |
| GP-6 | No data charts in stats | All 4 stats are plain numbers — no sparklines or progress rings | 🟡 Low |
| GP-7 | Sidebar too narrow | 30% right sidebar is very narrow — stacked vertically, hard to use | 🟠 Medium |
| GP-8 | No active consultation banner | No persistent visual banner when a consultation is live | 🟠 Medium |
| GP-9 | Queue cards too flat | No visual urgency — cards all feel the same weight | 🔴 High |
| GP-10 | Timer not dramatic enough | Progress bar blends with other greens — no visual urgency near 13-min limit | 🟡 Low |
| GP-11 | Quick Action buttons too similar | Prescription / Referral / Labs all look identical — hard to differentiate under stress | 🟠 Medium |
| GP-12 | Stats sidebar feels generic | Just stacked numbers — no "vital signs" feel | 🟠 Medium |

---

## 4. Comparative Analysis — Page by Page

### 4A. GP Dashboard — Stats Row (4 Cards at Top)

| Element | Current | Proposed |
|---|---|---|
| Layout | Icon on left, number on right | Icon top-right corner, large number top-left, mini sparkline at bottom |
| Content | Plain number text | Number + label + mini progress ring or sparkline |
| Visual weight | All 4 feel identical | Each card has a distinct accent color (emerald, blue, lime, slate) |
| Active Sessions | `1/2` text ratio | Donut chart showing proportion |

> Reference: [Dribbble — Doctor Stats Dark Widget](https://dribbble.com/search/medical+stats+dark) · [Aufait UX — Remote Patient Monitoring](https://aufaitux.com/blog/remote-patient-monitoring-dashboard)

---

### 4B. Patient Queue — Left Panel (70%)

| Element | Current | Proposed |
|---|---|---|
| Queue card priority signal | Left-border accent (exists but minimal) | 3–4px colored left border: 🔴 red = high priority, 🟡 amber = >15 min wait, 🟢 green = normal |
| Waiting indicator | Static dot | Pulsing dot animation for patients waiting >15 min |
| AI Intake summary | Same card background | Slightly lighter block `#1A2535` inside card — creates visual nesting |
| Queue number on mobile | `display: none` | Make visible — reduce font size instead of hiding |
| Card elevation | Flat — all same depth | Use `$color-surface-2` on hover to lift card |
| Priority badge | Hardcoded `#FEE2E2` | Use global `.hhi-badge--urgent` / `--warning` / `--ready` |

> Reference: [doxy.me Waiting Room UX](https://doxy.me/features) · [Dribbble — Appointment Queue UI](https://dribbble.com/search/patient+queue) · [Dribbble — Dark Theme Patients Dashboard](https://dribbble.com/shots/25085685-Dark-Theme-Patients-Dashboard-UI)

---

### 4C. Stats Sidebar — Right Panel (30%)

| Element | Current | Proposed |
|---|---|---|
| Layout | Stacked plain numbers | Metric cards with micro-charts (small sparkline or ring per card) |
| Active Sessions | `1/2` text | Donut chart |
| Visual feel | Plain admin data | "Vital signs monitor" aesthetic |
| Card width | 30% column, very narrow | Keep 30% — but improve internal card layout to use space better |

> Reference: [Dribbble — Doctor Stats Dark Widget](https://dribbble.com/search/medical+stats+dark) · [Dribbble — Medical Dashboard](https://dribbble.com/tags/medical-dashboard)

---

### 4D. Active Consultation Session Timer

| Element | Current | Proposed |
|---|---|---|
| Timer type | Flat progress bar | Circular countdown ring |
| 13-min warning | No change in UI | Header section shifts to subtle amber gradient background |
| 15-min warning | No change in UI | Pulsing red animation on timer ring |
| Visibility | Blends with other greens | Circular ring creates contrast — more visceral and glanceable |

> Reference: [Dribbble — SynthCare Telemedicine Doctor Panel](https://dribbble.com/tags/telemedicine_dashboard)

---

### 4E. Quick Actions Panel (Prescription / Referral / Labs)

| Element | Current | Proposed |
|---|---|---|
| Prescription button | Generic button style | Distinct icon color: 💊 Emerald `#2ECC71` |
| Referral button | Generic button style | Distinct icon color: 🏥 Blue `#3B82F6` |
| Labs button | Generic button style | Distinct icon color: 🔬 Purple `#8B5CF6` |
| Button heights | Inconsistent | Standardize to 44px (see Global doc) |

> Reference: [Ant Design — Action Button Patterns](https://ant.design/docs/spec/introduce)

---

### 4F. Active Consultation Banner

| Element | Current | Proposed |
|---|---|---|
| Active session indicator | None — no banner when session is live | Persistent top banner: `"● Live Consultation — Dr. [name] with [patient]"` with green pulsing dot |
| Banner style | N/A | `background: rgba(46,204,113,0.1); border-bottom: 1px solid rgba(46,204,113,0.3)` |

---

### 4G. GP Profile Page (`/gp/profile`)

| Element | Current | Proposed |
|---|---|---|
| Layout | Unknown — thin SCSS | Use standard `hhi-card` elevation system |
| Buttons | Unknown | Apply standardized `hhi-button-primary` / `hhi-button-ghost` |
| Form inputs | Unknown | Apply standardized `hhi-input` / `hhi-label` |

---

## 5. Step-by-Step Implementation Tasks

> ⚠️ Do NOT replace the inline `<nav>` on GP pages — `practitioner.spec.ts` tests query `.bottom-nav button.nav-item` and must stay green.

---

### TASK GP-1 — Fix Priority Badge Hardcoded Colors
**File:** `practitioner.scss`
**Priority:** 🔴 Do Now

Find all instances of:
```scss
.priority-emergency { background: #FEE2E2; }
.priority-urgent    { background: #FEF3C7; }
.priority-normal    { background: #D1FAE5; }
```

Replace with global badge classes from `_provider-ui.scss`:
```html
<!-- In template, change: -->
<span class="priority-emergency">Emergency</span>
<!-- To: -->
<span class="hhi-badge hhi-badge--urgent">Emergency</span>
```

**Verify:** Queue cards show consistent badge colors matching the global system.

---

### TASK GP-2 — Queue Card Left-Border Urgency Triage
**File:** `practitioner.scss`
**Priority:** 🔴 Do Now

```scss
.queue-card {
  border-left: 4px solid transparent;
  transition: border-color 200ms ease-in-out;

  &--high    { border-left-color: #EF4444; }  // Red — emergency
  &--warning { border-left-color: #F59E0B; }  // Amber — >15 min wait
  &--normal  { border-left-color: #2ECC71; }  // Green — normal
}
```

---

### TASK GP-3 — Add Pulsing Dot for Long-Wait Patients
**File:** `practitioner.scss`
**Priority:** 🔴 Do Now

```scss
.queue-card__wait-indicator--overdue {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #F59E0B;
  animation: hhi-haptic-pulse 1.5s ease-in-out infinite; // from _mixins.scss
}
```

---

### TASK GP-4 — AI Intake Summary Visual Nesting
**File:** `practitioner.scss`
**Priority:** 🟠 Medium

```scss
.queue-card__ai-summary {
  background: #1A2535;          // Slightly lighter than card bg
  border-radius: 6px;
  padding: 8px 12px;
  margin-top: 8px;
  font-size: 13px;
  color: #A0AEC0;
  border-left: 2px solid rgba(46, 204, 113, 0.4);
}
```

---

### TASK GP-5 — Show Queue Number on Mobile
**File:** `practitioner.scss`
**Priority:** 🟠 Medium

```diff
- .queue-number { display: none; }   // mobile breakpoint
+ .queue-number { font-size: 11px; opacity: 0.6; }   // shrink, don't hide
```

---

### TASK GP-6 — Redesign Stat Cards
**File:** `practitioner.scss`
**Priority:** 🟡 Next Sprint

```scss
.stat-card {
  position: relative;
  padding: 16px;
  background: $color-surface-1;
  border-radius: 8px;

  &__icon {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__value {
    font-size: 28px;
    font-weight: 700;
    color: #F0F4F8;
    margin-top: 4px;
  }

  &__label {
    font-size: 12px;
    color: #A0AEC0;
    margin-bottom: 12px;
  }

  // Sparkline area at bottom of each card
  &__sparkline {
    height: 32px;
    margin-top: 8px;
    opacity: 0.6;
  }
}
```

---

### TASK GP-7 — Active Consultation Top Banner
**File:** `practitioner.scss`
**Priority:** 🟠 Medium

```scss
.consultation-live-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(46, 204, 113, 0.08);
  border-bottom: 1px solid rgba(46, 204, 113, 0.25);
  font-size: 14px;
  font-weight: 500;
  color: $green-400;

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $green-500;
    animation: hhi-haptic-pulse 2s ease-in-out infinite;
  }
}
```

---

### TASK GP-8 — Quick Actions Distinct Icon Colors
**File:** `practitioner.scss`
**Priority:** 🟠 Medium

```scss
.quick-action {
  &--prescription .quick-action__icon { color: #2ECC71; background: rgba(46,204,113,0.1); }
  &--referral     .quick-action__icon { color: #3B82F6; background: rgba(59,130,246,0.1); }
  &--labs         .quick-action__icon { color: #8B5CF6; background: rgba(139,92,246,0.1); }
}
```

---

### TASK GP-9 — Circular Session Timer
**File:** `practitioner.scss`
**Priority:** 🟡 Next Sprint

Replace flat `<div class="timer-bar">` with an SVG circular ring:

```scss
.session-timer-ring {
  position: relative;
  width: 60px;
  height: 60px;

  svg circle {
    stroke: $green-500;
    stroke-dasharray: 163; // circumference of r=26
    stroke-linecap: round;
    transition: stroke-dashoffset 1s linear, stroke 500ms ease;
  }

  &--warning svg circle { stroke: #F59E0B; }
  &--danger  svg circle {
    stroke: #EF4444;
    animation: hhi-haptic-pulse 1s ease-in-out infinite;
  }
}

// Header shifts at warning state
.session-header--warning {
  background: linear-gradient(90deg, rgba(245,158,11,0.08), transparent);
  transition: background 500ms ease;
}
```

---

### TASK GP-10 — Split SCSS File (Maintenance)
**Priority:** 🟡 Lower Priority — refactoring

Split `practitioner.scss` (1335 lines) into:
- `gp-stats.scss` — stat cards (top row)
- `gp-queue.scss` — patient queue cards
- `gp-sidebar.scss` — quick actions + schedule sidebar
- `gp-history.scss` — consultation history
- `gp-session.scss` — active consultation / video / timer

Import all into `practitioner.scss` or the component's style reference.

---

### TASK GP-11 — Unavailable Notice Dismiss Transition
**File:** `practitioner.scss`
**Priority:** 🟡 Low

```scss
.unavailable-notice {
  overflow: hidden;
  max-height: 200px;
  transition: max-height 300ms ease-in-out, opacity 300ms ease-in-out;

  &.dismissed {
    max-height: 0;
    opacity: 0;
  }
}
```

---

## 6. Reference Links

| Resource | What to Look At | URL |
|---|---|---|
| doxy.me — Waiting Room & Dashboard | Best-in-class waiting room UX — minimal queue card, single green "Admit" CTA | https://doxy.me/features |
| doxy.me — New Navigation Sidebar (2024) | Redesigned sidebar navigation — minimal and clean | https://doxy.me/blog/what-is-new-in-doxy-me-video-appointments-update |
| Dribbble — SynthCare Telemedicine Panel | 2024 trends for dark clinical UI with side-by-side video + notes layout | https://dribbble.com/tags/telemedicine_dashboard |
| Dribbble — Medical Dashboard Dark Mode | Dark medical dashboards with emerald/green accents | https://dribbble.com/search/medical-dashboard-dark |
| Dribbble — Dark Theme Patients Dashboard | Cards with glows and status dots | https://dribbble.com/shots/25085685-Dark-Theme-Patients-Dashboard-UI |
| Dribbble — Doctor Dashboard | 200+ doctor dashboard concepts | https://dribbble.com/tags/doctor-dashboard |
| Dribbble — Appointment Queue UI | Queue card patterns | https://dribbble.com/search/patient+queue |
| Dribbble — Doctor Stats Dark Widget | Micro-charts and metric card patterns | https://dribbble.com/search/medical+stats+dark |
| Aufait UX — Remote Patient Monitoring | Real stat cards with charts | https://aufaitux.com/blog/remote-patient-monitoring-dashboard |
| Ant Design — Action Button Patterns | Distinct icon-color action buttons | https://ant.design/docs/spec/introduce |
| KoruUX — Telehealth Case Studies | Real telehealth dashboards — patient data display in clinical workflows | https://www.koruux.com/work/ |
| Doclinic Admin Template | Full GP + hospital admin UI kit | https://multipurposethemes.com/products/doctor-medical-admin-dashboard-template/ |
| Fuselab Creative — Healthcare Dashboards | Data visualization + hierarchy guide | https://fuselabcreative.com/healthcare-dashboard-design/ |
| NHS App Dashboard | Production-grade patient/GP portal | https://www.nhs.uk/nhs-app/ |
| Setproduct Design System — Healthcare | Healthcare-specific design system components | https://www.setproduct.com |

---

## 7. Final Recommendation

| Order | Task ID | Description | Priority |
|---|---|---|---|
| 1 | GP-1 | Fix priority badge hardcoded colors → use global `.hhi-badge` | 🔴 Do Now |
| 2 | GP-2 | Queue card left-border urgency triage (3 colors) | 🔴 Do Now |
| 3 | GP-3 | Pulsing dot for patients waiting >15 min | 🔴 Do Now |
| 4 | GP-4 | AI intake summary visual nesting | 🟠 Medium |
| 5 | GP-7 | Active consultation live banner | 🟠 Medium |
| 6 | GP-8 | Quick Actions distinct icon colors | 🟠 Medium |
| 7 | GP-5 | Show queue number on mobile (shrink, don't hide) | 🟠 Medium |
| 8 | GP-6 | Redesign stat cards (icon top-right, sparkline) | 🟡 Next Sprint |
| 9 | GP-9 | Circular session timer with warning states | 🟡 Next Sprint |
| 10 | GP-11 | Unavailable notice smooth dismiss transition | 🟡 Low |
| 11 | GP-10 | Split practitioner.scss into 5 files | 🟡 Low — maintenance |

> **Critical constraint:** Never touch the inline `<nav>` HTML in `practitioner.component.html`. The test `practitioner.spec.ts` queries `.bottom-nav button.nav-item` and must stay green.

---
*Document version: 1.0 | Source: HHI Styling Audit (Feb 2026)*
