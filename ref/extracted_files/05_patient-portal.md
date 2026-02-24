# 05 — Patient Portal
**Health Hub International (HHI) — Styling Implementation Guide**
> Routes: `/patient/*`
> Theme: **Dark** — `#0B0F14` background (only dark-themed portal)
> SCSS Files: `dashboard.component.scss` (821 lines) · `appointments.component.scss` · `records.component.scss` · `profile.component.scss` · `waiting.scss` · `notifications.scss`
> Shared: `src/app/shared/_provider-ui.scss`

> ⚠️ **Prerequisite:** Complete all tasks in `00_global-design-system.md` before starting this document.
> ⚠️ **Theme Note:** This is the ONLY dark portal. Provider portals are light. The dark/light theme collision (Issue G-1 in Global doc) must be resolved globally before patient-specific work starts.

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
| **Routes** | `/patient/dashboard`, `/patient/appointments`, `/patient/records`, `/patient/profile`, `/patient/waiting`, `/patient/notifications` |
| **User** | Patient |
| **Theme** | **Dark** — `#0B0F14` background — only dark portal in the app |
| **Primary SCSS** | `dashboard.component.scss` — 821 lines |
| **Test Files** | None on nav selectors |
| **Bottom Nav** | ✅ Safe to migrate to `<app-bottom-nav [tabs]="PATIENT_TABS">` |
| **Tab Config** | `PATIENT_TABS` — predefined in `BottomNavComponent` |

---

## 2. Current State Summary

- Dark theme (`#0B0F14` background, `#FFFFFF` text)
- Horizontal scroll health summary cards (`.summary-card`)
- 2×3 service grid cards with hover lift + green shadow
- Bio-lime "Most Popular" badge
- Payment card with gradient (`linear-gradient(135deg, #0F172A, #1A2332)`)
- Dark bottom nav (`#121826` background — hardcoded)
- Animated service cards (`fadeInUp` with stagger — local `@keyframes`)

---

## 3. Issues Found

| # | Issue | Detail | Severity |
|---|---|---|---|
| PT-1 | Dark/Light theme collision | Provider portals are light — patient portal is dark. System dark mode ON inverts provider portals but they still use light values — very buggy | 🔴 High |
| PT-2 | Summary cards no scroll indicator | Horizontal scroll but no fade edge — users don't know more cards exist | 🟠 Medium |
| PT-3 | 2-column service grid cramped on mobile | Cards feel cramped at 375px — consider 1 column on xs breakpoint | 🟠 Medium |
| PT-4 | Bottom nav uses hardcoded `#121826` | Should use `$color-surface-1` variable | 🟠 Medium |
| PT-5 | Payment card looks like an ad | "Free Beta" card section inside dashboard — looks like an ad, not a feature | 🟠 Medium |
| PT-6 | No health data visualization | Summary shows only counts (3, 2, 1) with no charts or trend lines | 🟡 Low |
| PT-7 | Notification badge height conflict | `width: 8px; height: 8px` overridden by `height: 16px` — inconsistent | 🟠 Medium |
| PT-8 | Local `@keyframes fadeInUp` | Defined locally — should use `_mixins.scss` mixin | 🟡 Low |
| PT-9 | QR prescription not premium | QR code display lacks the premium feel appropriate for this key brand moment | 🔴 High |
| PT-10 | Onboarding screens generic | Icon + text without strong visual identity | 🟡 Next Sprint |
| PT-11 | Waiting room anxiety-inducing | Queue position screen with no distraction UX | 🟡 Later |
| PT-12 | Health Records empty state | New users see an empty 5-tab locker with no guidance | 🟠 Medium |
| PT-13 | Pure white text on dark | Body text uses `#FFFFFF` — harsh on dark background | 🟠 Medium |

---

## 4. Comparative Analysis — Page by Page

### 4A. Patient Dashboard (`/patient/dashboard`)

#### Health Summary Horizontal Scroll Row

| Element | Current | Proposed |
|---|---|---|
| Scroll indicator | None | Right fade gradient edge + optional dot indicators |
| Card content | Count numbers only (3, 2, 1) | Add mini sparkline or ring progress per card |
| Card background | `#121826` (hardcoded) | `$color-surface-1` |
| Hover state | Unknown | `$color-surface-2` + subtle glow |

```scss
.summary-scroll-container {
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 64px;
    height: 100%;
    background: linear-gradient(to right, transparent, #0B0F14);
    pointer-events: none;
    z-index: 5;
  }
}

.summary-card {
  background: $color-surface-1;      // #111827
  border-radius: 8px;
  padding: 16px;
  min-width: 140px;
  transition: background 200ms ease-in-out, box-shadow 200ms ease-in-out;

  &:hover {
    background: $color-surface-2;    // #1C2535
    box-shadow: 0 0 0 1px rgba(46,204,113,0.2);
  }

  &__value {
    font-size: 24px;
    font-weight: 700;
    color: #F0F4F8;                  // Softer than pure white
  }

  &__label {
    font-size: 12px;
    color: #A0AEC0;
    margin-top: 2px;
  }
}
```

> Reference: [Dribbble — Patient Dashboard Dark](https://dribbble.com/tags/patient-dashboard) · [Dribbble — Health Tracking Dark](https://dribbble.com/tags/health-tracking)

---

#### Service Grid Cards (2×3)

| Element | Current | Proposed |
|---|---|---|
| Grid | 2 columns on mobile | 1 column on xs (<480px) · 2 columns on sm+ |
| Card style | Text + description, hover lift | Icon-forward cards with gradient left-border accent |
| "Most Popular" badge | Bio-lime flat chip | Gradient ribbon using `linear-gradient(135deg, #2ECC71, #16A34A)` |
| Stagger animation | Local `@keyframes fadeInUp` | Use `@include animation-fade-in-up($delay)` from `_mixins.scss` |
| Card background | `$color-surface-1` | Keep — add `border-left: 3px solid rgba(46,204,113,0.4)` |

```scss
.service-card {
  background: $color-surface-1;
  border-radius: 8px;
  padding: 20px 16px;
  border-left: 3px solid rgba(46,204,113,0.25);
  transition: border-color 200ms ease-in-out, background 200ms ease-in-out, box-shadow 200ms ease-in-out;

  @include animation-fade-in-up(var(--stagger-delay, 0ms)); // delay via CSS var

  &:hover {
    border-left-color: $green-500;
    background: $color-surface-2;
    box-shadow: 0 4px 16px rgba(46,204,113,0.08);
  }

  &__icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: rgba(46,204,113,0.1);
    color: $green-400;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
  }

  &__title { font-size: 15px; font-weight: 600; color: #F0F4F8; }
  &__desc  { font-size: 13px; color: #A0AEC0; margin-top: 4px; }
}

.service-card--popular {
  .service-card__badge {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 9999px;
    background: linear-gradient(135deg, #2ECC71, #16A34A);
    color: white;
    font-size: 11px;
    font-weight: 700;
    margin-bottom: 8px;
  }
}

@media (max-width: 479px) {
  .service-grid { grid-template-columns: 1fr; }
}
```

> Reference: [Forward Health service tiles](https://www.forward.com) · [Dribbble — Telemedicine Patient App](https://dribbble.com/tags/telemedicine)

---

#### Payment / Free Beta Card

| Current | Proposed |
|---|---|
| Inside main dashboard — looks like an ad | Move to a dedicated Settings / Billing page or collapse into a slim banner at bottom of dashboard |

---

#### Notification Badge Fix

| Current | Proposed |
|---|---|
| `width: 8px; height: 8px` overridden to `height: 16px` | Single value: `width: 16px; height: 16px; border-radius: 50%` |

```scss
.hhi-header-icon__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #EF4444;
  color: white;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid $color-surface-0; // separates from header bg
}
```

---

### 4B. QR Prescription Screen

| Element | Current | Proposed |
|---|---|---|
| QR card background | Unknown | Pure white card on dark background — maximum scan contrast |
| QR card glow | None | `box-shadow: 0 0 32px rgba(46,204,113,0.2)` behind the white card |
| QR card padding | Unknown | Generous padding: 24px all sides minimum |
| Medication list | Plain list | Clean chips/tags below QR code |
| Download action | None or text link | Ghost button with cloud-download icon: "Download PDF" |

```scss
.qr-prescription-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 32px;
  max-width: 300px;
  margin: 0 auto;
  box-shadow: 0 0 0 1px rgba(46,204,113,0.15),
              0 0 32px rgba(46,204,113,0.2);

  &__qr-code {
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }

  &__patient-name {
    font-size: 14px;
    font-weight: 600;
    color: #1E293B;
    text-align: center;
    margin-top: 16px;
  }
}

.qr-medication-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;

  .chip {
    padding: 4px 12px;
    border-radius: 9999px;
    background: rgba(46,204,113,0.1);
    color: $green-600;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid rgba(46,204,113,0.25);
  }
}
```

> Reference: [Dribbble — QR Code Prescription Screen](https://dribbble.com/search/prescription+qr+dark) · [Dribbble — QR Code UI Premium Dark](https://dribbble.com/search/qr+code+card+dark)

---

### 4C. Appointments Page (`/patient/appointments`)

| Element | Current | Proposed |
|---|---|---|
| Appointment cards | Unknown — thin SCSS | `$color-surface-1` card with status badge + time + doctor name |
| Status badges | Unknown | Global `.hhi-badge` system |
| Empty state | Unknown | `.hhi-empty-state` with illustrated icon + CTA |
| Bottom nav | Inline `<nav>` | `<app-bottom-nav [tabs]="PATIENT_TABS">` |

---

### 4D. Health Records Page (`/patient/records`)

| Element | Current | Proposed |
|---|---|---|
| 5-tab layout | Exists | Keep — add count badge per tab |
| Empty state (new users) | Minimal | Illustrated: `"Your health story starts here"` with subtle animation |
| Document cards | Unknown | Icon-forward with document type, date, source |
| Tab scroll | Unknown | If tabs overflow mobile, add scroll edge fade |
| Bottom nav | Inline `<nav>` | `<app-bottom-nav [tabs]="PATIENT_TABS">` |

```scss
// Records empty state
.records-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 24px;
  text-align: center;

  &__icon {
    width: 80px;
    height: 80px;
    color: $green-400;
    opacity: 0.5;
    margin-bottom: 20px;
    animation: hhi-haptic-pulse 4s ease-in-out infinite; // from _mixins.scss
  }

  &__headline {
    font-size: 20px;
    font-weight: 700;
    color: #F0F4F8;
    margin-bottom: 8px;
  }

  &__sub {
    font-size: 14px;
    color: #A0AEC0;
    max-width: 260px;
    margin-bottom: 24px;
  }
}
```

> Reference: [Dribbble — Health Records Mobile Dark](https://dribbble.com/search/health+records+mobile+dark) · [Dribbble — Empty State Healthcare Dark](https://dribbble.com/search/empty+state+healthcare)

---

### 4E. Profile Page (`/patient/profile`)

| Element | Current | Proposed |
|---|---|---|
| Layout | Unknown | `$color-surface-1` card sections |
| Inputs | Unknown | `hhi-input` / `hhi-label` dark pattern |
| Buttons | Unknown | `hhi-button-primary` / `hhi-button-ghost` |
| Avatar | Unknown | Initials avatar with `$green-900-30` background and `$green-400` text |
| Bottom nav | Inline `<nav>` | `<app-bottom-nav [tabs]="PATIENT_TABS">` |

---

### 4F. Waiting Room Screen (`/patient/waiting`)

| Element | Current | Proposed |
|---|---|---|
| Queue position | Plain number | Number in a styled ring with pulsing heartbeat wave behind it |
| Wait time estimate | Unknown | `"Estimated wait: ~5 min"` + small progress ring that updates |
| Distraction UX | None | Auto-scrolling rotating health tip cards |
| Animation | None | Subtle pulsing wave animation (heartbeat pattern) behind position indicator |

```scss
.waiting-position {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px auto;

  &__ring {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 3px solid rgba(46,204,113,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    // Pulsing outer ring
    &::before {
      content: '';
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      border: 2px solid rgba(46,204,113,0.15);
      animation: hhi-haptic-pulse 2s ease-in-out infinite;
    }
  }

  &__number {
    font-size: 36px;
    font-weight: 800;
    color: $green-400;
  }
}

// Rotating health tips
.health-tips-carousel {
  overflow: hidden;

  .tip-card {
    background: $color-surface-1;
    border-radius: 8px;
    padding: 16px;
    border-left: 3px solid $green-500;
    animation: hhi-fade-in-up 400ms ease-out;
  }
}
```

> Reference: [Dribbble — Medical App Waiting Room UX](https://dribbble.com/search/waiting-room-medical-app) · [Dribbble — Virtual Waiting Room UX](https://dribbble.com/search/virtual+waiting+room)

---

### 4G. Onboarding Screens

| Element | Current | Proposed |
|---|---|---|
| Background | Plain dark | Full-bleed illustration or animated Lottie background per screen |
| Icon | Generic | Distinct illustration per "chapter" |
| Motion | None | Subtle Lottie animation (healthcare themed) |
| Progress | Unknown | Dot pagination with emerald active dot |

> Reference: [Dribbble — Health App Onboarding Dark](https://dribbble.com/search/health-app-onboarding-dark) · [LottieFiles Healthcare Pack](https://lottiefiles.com/free-animations/healthcare) · [Cadabra Studio — Health App UX](https://cadabra.studio/cases/health-app)

---

### 4H. Bottom Nav — Migration (All Patient Pages)

| Current State | Proposed State |
|---|---|
| Inline `<nav>` in all patient HTML files with duplicated markup | Replace with `<app-bottom-nav [tabs]="PATIENT_TABS">` |

**Files to update (HTML):**
- `dashboard.component.html`
- `appointments.component.html`
- `records.component.html`
- `profile.component.html`

**Files to update (TypeScript):**
- Each matching `.component.ts` — add `BottomNavComponent` to `imports`

**SCSS cleanup:**
- `dashboard.component.scss`
- `appointments.component.scss`
- `records.component.scss`
- `profile.component.scss`

---

## 5. Step-by-Step Implementation Tasks

---

### TASK PT-1 — Fix Body Text Color (White → Soft White)
**File:** `dashboard.component.scss` + all patient SCSS files
**Priority:** 🟠 Medium

```diff
- color: #FFFFFF;
+ color: #F0F4F8;
```

---

### TASK PT-2 — Fix Bottom Nav Hardcoded Color
**File:** `dashboard.component.scss`
**Priority:** 🟠 Medium

```diff
- .bottom-nav { background: #121826; }
+ .bottom-nav { background: $color-surface-1; }
```

(This line will be removed entirely after TASK PT-7 migrates to `app-bottom-nav`.)

---

### TASK PT-3 — Fix Notification Badge Height Conflict
**File:** `dashboard.component.scss` or `_provider-ui.scss`
**Priority:** 🟠 Medium

Apply single consistent `.hhi-header-icon__badge` rule (see §4A).

---

### TASK PT-4 — Add Scroll Fade Edge to Summary Cards
**File:** `dashboard.component.scss`
**Priority:** 🟠 Medium

Wrap summary scroll in `.summary-scroll-container` with `::after` fade (see §4A).

---

### TASK PT-5 — Fix Service Grid for Small Mobile
**File:** `dashboard.component.scss`
**Priority:** 🟠 Medium

```scss
@media (max-width: 479px) {
  .service-grid { grid-template-columns: 1fr; }
}
```

---

### TASK PT-6 — Upgrade Service Cards
**File:** `dashboard.component.scss`
**Priority:** 🟠 Medium

Apply icon-forward card styles with gradient left-border (see §4A service card CSS). Update stagger animation to use `@include animation-fade-in-up` from `_mixins.scss`.

---

### TASK PT-7 — Migrate All 4 Patient Pages to `app-bottom-nav`
**Files:** 4 HTML + 4 TS + 4 SCSS files
**Priority:** 🟠 Medium

Same pattern as Pharmacy migration. Use `PATIENT_TABS` config.

---

### TASK PT-8 — Upgrade QR Prescription Screen
**File:** Patient prescription SCSS (verify file path) + template
**Priority:** 🔴 Do Now

Apply `.qr-prescription-card` and `.qr-medication-chips` styles (see §4B). Add ghost "Download PDF" button below QR card.

---

### TASK PT-9 — Health Records Empty State
**File:** `records.component.scss` + template
**Priority:** 🟠 Medium

Apply `.records-empty` styles (see §4D). Add illustrated icon from Lucide/Phosphor with emerald color.

---

### TASK PT-10 — Move `@keyframes fadeInUp` to `_mixins.scss`
**File:** `dashboard.component.scss` — remove local definition; use `@include animation-fade-in-up`
**Priority:** 🟡 Low (coordinate with Task G-7 in Global doc)

---

### TASK PT-11 — Waiting Room UX Improvements
**File:** `waiting.scss`
**Priority:** 🟡 Later Sprint

Add `.waiting-position` ring + pulse animation. Add `.health-tips-carousel` rotating tip cards.

---

### TASK PT-12 — Onboarding Screens Visual Upgrade
**Priority:** 🟡 Next Sprint

Integrate Lottie animations from [LottieFiles Healthcare](https://lottiefiles.com/free-animations/healthcare). Add full-bleed illustration backgrounds. Add dot pagination component.

---

### TASK PT-13 — Move Payment Card to Billing Page
**Priority:** 🟠 Medium — UX

Remove "Free Beta" card from dashboard. Create `/patient/settings` or `/patient/billing` route. This is primarily a template + routing change, not SCSS.

---

## 6. Reference Links

| Resource | What to Look At | URL |
|---|---|---|
| Forward Health | Premium health service card layout — glossy image-backed tiles | https://www.forward.com |
| Zocdoc — Patient Booking Flow | Doctor cards, filters, CTA layout | https://www.zocdoc.com |
| Oscar Health — Member Portal | Health summary cards, clean navigation, warm color palette | https://www.hioscar.com |
| Dribbble — Patient Dashboard Dark | Dark-mode patient portal concepts | https://dribbble.com/tags/patient-dashboard |
| Dribbble — Health Tracking Dark | Dark health metric cards | https://dribbble.com/tags/health-tracking |
| Dribbble — QR Code Prescription Screen | Premium QR display — gradients, clear typography | https://dribbble.com/search/prescription+qr+dark |
| Dribbble — QR Code UI Premium Dark | QR card premium dark treatment | https://dribbble.com/search/qr+code+card+dark |
| Dribbble — Health App Onboarding Dark | Animation-forward onboarding screens for health apps | https://dribbble.com/search/health-app-onboarding-dark |
| Dribbble — Medical App Waiting Room UX | Creative approaches to reducing patient anxiety | https://dribbble.com/search/waiting-room-medical-app |
| Dribbble — Health Records Mobile Dark | Tab-based health record displays — empty states, document icons | https://dribbble.com/search/health+records+mobile+dark |
| Dribbble — Empty State Healthcare Dark | Empty state patterns for healthcare apps | https://dribbble.com/search/empty+state+healthcare |
| Dribbble — Telemedicine Patient App | Patient-facing mobile app UI concepts | https://dribbble.com/tags/telemedicine |
| LottieFiles Healthcare Pack | Free healthcare Lottie animations for onboarding | https://lottiefiles.com/free-animations/healthcare |
| Cadabra Studio — Health App UX | Full case study — patient journey patterns with screenshots | https://cadabra.studio/cases/health-app |
| KoruUX — Patient Portal UX | Complete UX analysis of patient portal design | https://koruux.com/blog/patient-portal-design/ |
| SpaceBerry Studio — Telemedicine UX | In-depth article on telemedicine patient UX patterns | https://spaceberry.studio/blog/telemedicine-app-ux |
| Multipurpose Themes — MedDash Dark | Premium dark theme healthcare template | https://multipurposethemes.com |
| NHS App | Clean, accessible, mobile-first patient portal | https://www.nhs.uk/nhs-app/ |

---

## 7. Final Recommendation

| Order | Task ID | Description | Priority |
|---|---|---|---|
| 1 | PT-8 | Upgrade QR prescription screen (white card, glow, chips) | 🔴 Do Now |
| 2 | PT-1 | Fix body text `#FFFFFF` → `#F0F4F8` across all patient SCSS | 🟠 Medium |
| 3 | PT-3 | Fix notification badge height conflict | 🟠 Medium |
| 4 | PT-4 | Add scroll fade edge to summary cards | 🟠 Medium |
| 5 | PT-5 | Fix service grid to 1 column on xs | 🟠 Medium |
| 6 | PT-6 | Upgrade service cards (icon-forward, gradient border) | 🟠 Medium |
| 7 | PT-7 | Migrate all 4 patient pages to `<app-bottom-nav>` | 🟠 Medium |
| 8 | PT-2 | Fix bottom nav hardcoded color (handled by PT-7 cleanup) | 🟠 Medium |
| 9 | PT-9 | Health Records illustrated empty state | 🟠 Medium |
| 10 | PT-13 | Move payment/Free Beta card off main dashboard | 🟠 Medium |
| 11 | PT-12 | Onboarding screen visual upgrade (Lottie) | 🟡 Next Sprint |
| 12 | PT-11 | Waiting room UX — tips carousel + pulse ring | 🟡 Later |
| 13 | PT-10 | Move `@keyframes fadeInUp` to `_mixins.scss` | 🟡 Low |

---
*Document version: 1.0 | Source: HHI Styling Audit (Feb 2026)*
