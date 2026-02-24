# 06 — Shared Components & Video Consultation
**Health Hub International (HHI) — Styling Implementation Guide**
> Scope: Header · Footer · Bottom Nav Component · Video Room · Consultation Shell · Landing Page · Auth Pages
> SCSS Files: `_provider-ui.scss` (1424 lines) · `header.scss` · `footer.scss` · `bottom-nav.component.scss` · `video-room.scss` · `consult-shell.scss` · `landing-page.scss` · `login.scss` · `signup.scss` · `forgot-password.scss`

> ⚠️ **Prerequisite:** Complete all tasks in `00_global-design-system.md` before starting this document.
> This document covers elements that render across ALL portals and are therefore the highest-impact changes in the entire codebase.

---

## Table of Contents
1. [Components Overview](#1-components-overview)
2. [Issues Found — All Shared Components](#2-issues-found--all-shared-components)
3. [Comparative Analysis — Component by Component](#3-comparative-analysis--component-by-component)
4. [Step-by-Step Implementation Tasks](#4-step-by-step-implementation-tasks)
5. [Reference Links](#5-reference-links)
6. [Final Recommendation](#6-final-recommendation)

---

## 1. Components Overview

| Component | File(s) | Renders In |
|---|---|---|
| **Header** | `header.scss`, `_provider-ui.scss` (`.hhi-app-logo`) | All portals |
| **Footer** | `footer.scss` | Landing + Auth |
| **Bottom Nav Component** | `bottom-nav.component.scss` | Patient, Pharmacy, Diagnostics (after migration) |
| **Video Room** | `video-room.scss`, `_provider-ui.scss` (`.hhi-video-container`, `.hhi-session-timer`) | GP, Specialist |
| **Consultation Shell** | `consult-shell.scss` | GP, Specialist |
| **Landing Page** | `landing-page.scss` (684 lines) | `/landing` |
| **Auth Pages** | `login.scss`, `signup.scss`, `forgot-password.scss` + shared `.hhi-auth-card` | `/auth/*` |

---

## 2. Issues Found — All Shared Components

| # | Component | Issue | Severity |
|---|---|---|---|
| SH-1 | Header | Logo uses `--hhi-link` (blue) — contradicts brand | 🔴 High |
| SH-2 | Header | `.hhi-app-logo` 36px — very compact, hard to read | 🟠 Medium |
| SH-3 | Header | No notification badge component on icon | 🟠 Medium |
| SH-4 | Header | No skip-to-main-content link | 🟠 Medium — Accessibility |
| SH-5 | Footer | Extremely minimal — just copyright + links | 🟡 Low |
| SH-6 | Bottom Nav | Defined in 5+ separate SCSS files — not canonical | 🟠 Medium |
| SH-7 | Video Room | PiP window is 120px — too small | 🟠 Medium |
| SH-8 | Video Room | No mute/camera toggle CSS | 🟠 Medium |
| SH-9 | Video Room | Chat bubbles use hardcoded colors `#F1F5F9`, `#DBEAFE` | 🟠 Medium |
| SH-10 | Video Room | Session timer `position: fixed` on mobile — overlaps content | 🟠 Medium |
| SH-11 | Video Room | No end-call confirmation UI / modal | 🟠 Medium |
| SH-12 | Video Room | No network quality indicator | 🟡 Low |
| SH-13 | Landing Page | Bio-lime tagline `rgba(174,234,0,0.8)` fails WCAG AA | 🔴 High |
| SH-14 | Landing Page | Local variable duplication — re-declares design tokens | 🟠 Medium |
| SH-15 | Landing Page | No sticky nav header | 🟡 Low |
| SH-16 | Landing Page | CTA `max-width: 220px` too narrow on desktop | 🟠 Medium |
| SH-17 | Landing Page | No hero illustration, screenshot, or social proof | 🟡 Low |
| SH-18 | Auth Pages | Logo color `--hhi-link` (blue) — not emerald | 🔴 High |
| SH-19 | Auth Pages | Plain white card on white background — generic B2B feel | 🟡 Low |
| SH-20 | Auth Pages | No role selection visual on signup | 🟠 Medium |
| SH-21 | Auth Pages | No password strength indicator | 🟡 Low |
| SH-22 | Local `@keyframes haptic-pulse` | Defined in `landing-page.scss` — should be in `_mixins.scss` | 🟡 Low |

---

## 3. Comparative Analysis — Component by Component

### 3A. Header

| Element | Current | Proposed |
|---|---|---|
| Logo background | `var(--hhi-link)` = blue `#1D4ED8` | `var(--hhi-emerald)` = `#2ECC71` |
| Logo size | 36×36px | Increase to 40×40px with subtle drop shadow |
| Notification icon | No badge | Add `.hhi-header-icon__badge` count bubble (see Patient Portal doc §4A) |
| Skip link | Missing | Add `.hhi-skip-link` (see Global doc TASK G-10) |
| Sticky behavior | Unknown | Ensure `position: sticky; top: 0; z-index: 100; backdrop-filter: blur(8px)` |

```scss
.hhi-header {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
  background: rgba(248, 250, 252, 0.9);  // Light portals
  border-bottom: 1px solid #E2E8F0;
  transition: box-shadow 200ms ease-in-out;

  &--scrolled {
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
}

// Dark header variant for patient portal
.hhi-header--dark {
  background: rgba(11, 15, 20, 0.9);
  border-bottom-color: #1E293B;
}

.hhi-app-logo {
  width: 40px;
  height: 40px;
  background: var(--hhi-emerald);  // WAS: var(--hhi-link) — blue
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(46, 204, 113, 0.3);
}
```

> Reference: [Linear.app Header](https://linear.app) · [Notion Header](https://www.notion.so) · [Dribbble — Healthcare Header](https://dribbble.com/tags/healthcare-header)

---

### 3B. Bottom Nav Component (`app-bottom-nav`)

The `BottomNavComponent` is already built at `src/app/shared/components/bottom-nav/bottom-nav.component.ts`. It has tab configs for all portals. The component just isn't being used anywhere yet.

| Element | Current (`bottom-nav.component.scss`) | Proposed |
|---|---|---|
| Background | Unknown | `$color-surface-1` for dark portals · `white` for light portals |
| Active tab indicator | Unknown | Emerald color + filled icon + label |
| Inactive tab | Unknown | `#A0AEC0` color + outlined icon |
| Touch target | Unknown | Minimum 44px per tab |
| Safe area | Unknown | `padding-bottom: env(safe-area-inset-bottom)` for iOS |

```scss
// bottom-nav.component.scss — canonical styles
.hhi-bottom-nav {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  padding-bottom: env(safe-area-inset-bottom);
  background: $color-surface-1;
  border-top: 1px solid #1E293B;
  z-index: 100;

  // Light portal variant
  &--light {
    background: white;
    border-top-color: #E2E8F0;
  }

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    min-height: 44px;    // Touch target
    color: #A0AEC0;
    transition: color 200ms ease-in-out;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;

    &--active {
      color: $green-500;
    }

    &--disabled {
      color: #475569;
      pointer-events: none;
      opacity: 0.5;
    }
  }

  &__icon { width: 22px; height: 22px; }
  &__label { font-size: 10px; font-weight: 500; }
}
```

> Reference: [Apple HIG — Tab Bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars) · [Dribbble — Bottom Navigation](https://dribbble.com/tags/bottom-navigation)

---

### 3C. Video Room (`/gp` active consultation, `/specialist`)

#### PiP Window

| Element | Current | Proposed |
|---|---|---|
| PiP size | 120px wide | 160–180px with drag handle affordance |
| PiP style | Unknown | Rounded card `border-radius: 12px` with emerald border |
| Drag handle | None | Visual handle indicator at top-center |

```scss
.hhi-pip-window {
  width: 180px;
  border-radius: 12px;
  border: 2px solid $green-500;
  overflow: hidden;
  position: absolute;
  bottom: 80px;
  right: 16px;
  cursor: grab;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  transition: transform 200ms ease-in-out;

  &:hover { transform: scale(1.02); }
  &:active { cursor: grabbing; }

  &__handle {
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.3);

    &::before {
      content: '';
      width: 32px;
      height: 3px;
      border-radius: 9999px;
      background: rgba(255,255,255,0.5);
    }
  }
}
```

#### Video Controls

| Element | Current | Proposed |
|---|---|---|
| Mute button | No CSS defined | Circular button 44px, dark bg, white icon — active state = red bg |
| Camera toggle | No CSS defined | Same as mute |
| End call | No CSS defined | Circular 44px, `#EF4444` bg, white phone icon |

```scss
.video-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px;

  &__btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background: rgba(255,255,255,0.15);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 200ms ease-in-out, transform 200ms ease-in-out;

    &:hover { background: rgba(255,255,255,0.25); transform: scale(1.05); }

    &--active { background: #EF4444; }  // Muted = red

    &--end-call {
      background: #EF4444;
      width: 52px;
      height: 52px;
      &:hover { background: #DC2626; }
    }
  }
}
```

#### Chat Bubbles

| Element | Current | Proposed |
|---|---|---|
| Patient bubble | `#F1F5F9` hardcoded | `$color-surface-2` or CSS variable |
| Provider bubble | `#DBEAFE` hardcoded | `rgba(59,130,246,0.15)` with variable |

```scss
.chat-bubble {
  max-width: 75%;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;

  &--patient {
    background: $color-surface-2;
    color: #F0F4F8;
    border-bottom-left-radius: 4px;
    align-self: flex-start;
  }

  &--provider {
    background: rgba(59,130,246,0.2);
    color: #BFDBFE;
    border-bottom-right-radius: 4px;
    align-self: flex-end;
  }
}
```

#### Session Timer — Mobile Fix

| Current | Proposed |
|---|---|
| `position: fixed` — overlaps content on mobile | `position: sticky` within the consultation scroll container on mobile |

```scss
.hhi-session-timer {
  position: fixed;        // Desktop — keep fixed at top
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;

  @media (max-width: 768px) {
    position: sticky;     // Mobile — scrolls with content, doesn't overlay
    top: 0;
  }
}
```

#### Network Quality Indicator

```scss
.network-quality {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 16px;

  span {
    width: 4px;
    border-radius: 2px;
    background: rgba(255,255,255,0.3);
    transition: background 200ms ease-in-out;

    &:nth-child(1) { height: 4px; }
    &:nth-child(2) { height: 8px; }
    &:nth-child(3) { height: 12px; }
    &:nth-child(4) { height: 16px; }
  }

  &--good span { background: $green-500; }
  &--fair span:nth-child(-n+3) { background: #F59E0B; }
  &--fair span:nth-child(4) { background: rgba(255,255,255,0.3); }
  &--poor span:nth-child(1) { background: #EF4444; }
  &--poor span:nth-child(n+2) { background: rgba(255,255,255,0.3); }
}
```

#### End-Call Confirmation

```scss
.end-call-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(8px);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;

  &__card {
    background: $color-surface-3;
    border-radius: 12px;
    padding: 32px 24px;
    max-width: 320px;
    width: calc(100% - 32px);
    text-align: center;
  }

  &__title { font-size: 18px; font-weight: 600; color: #F0F4F8; margin-bottom: 8px; }
  &__sub   { font-size: 14px; color: #A0AEC0; margin-bottom: 24px; }

  &__actions {
    display: flex;
    gap: 12px;
    justify-content: center;

    .btn-cancel { @extend .hhi-button-ghost; flex: 1; }
    .btn-end    { @extend .hhi-button-danger; flex: 1; }
  }
}
```

> Reference: [Teladoc Health](https://www.teladochealth.com) · [Zoom for Healthcare](https://zoom.us/healthcare) · [Dribbble — Telemedicine Video UI](https://dribbble.com/tags/telemedicine) · [Cloverleaf — Virtual Waiting Room](https://cloverleaf.me) · [Eleken — Telehealth UX](https://eleken.co/blog-posts/telehealth-app-ux)

---

### 3D. Landing Page (`/landing`)

#### Tagline — WCAG AA Fix

| Element | Current | Proposed |
|---|---|---|
| `.tagline` color | `rgba(174,234,0,0.8)` — bio-lime at 80% on white — fails WCAG AA | `color: #34495E` (charcoal) + bio-lime background pill |

```diff
- .tagline { color: rgba(174, 234, 0, 0.8); }
+ .tagline {
+   color: #34495E;
+   background: rgba(174, 234, 0, 0.15);
+   display: inline-block;
+   padding: 4px 12px;
+   border-radius: 9999px;
+ }
```

#### Other Landing Issues

| Element | Current | Proposed |
|---|---|---|
| CTA max-width | `220px` — too narrow on desktop | `min-width: 220px; max-width: 320px` |
| Local variables | `$bg-primary: #FFFFFF` etc. re-declared | Remove — use shared `_variables.scss` tokens |
| Sticky nav | None | Add sticky nav with logo + Login / Sign Up buttons |
| Hero | Minimal | Add social proof row: `"12,000+ patients · 500+ GPs · Available 24/7"` |
| `@keyframes haptic-pulse` | Local | Move to `_mixins.scss` (Task G-7 in Global doc) |

```scss
// Sticky landing nav
.landing-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

// Social proof strip
.social-proof {
  display: flex;
  gap: 24px;
  justify-content: center;
  padding: 12px 0;
  font-size: 13px;
  font-weight: 600;
  color: #64748B;

  span { display: flex; align-items: center; gap: 6px; }
  .dot { width: 4px; height: 4px; border-radius: 50%; background: $green-500; }
}
```

> Reference: [One Medical](https://www.onemedical.com) · [Maven Clinic](https://www.mavenclinic.com) · [Zocdoc](https://www.zocdoc.com) · [Dribbble — Healthcare Landing](https://dribbble.com/tags/healthcare-landing-page) · [Framer Healthcare Templates](https://framer.com/templates/?q=healthcare) · [Eleken — Healthcare UI Examples](https://eleken.co/blog-posts/healthcare-ui-design-examples)

---

### 3E. Auth Pages (`/auth/login`, `/auth/signup`, `/auth/forgot-password`)

| Element | Current | Proposed |
|---|---|---|
| Logo color | `--hhi-link` (blue) | `--hhi-emerald` (green) — fix in `_provider-ui.scss` |
| Login card background | Plain white on white | Add subtle green glow: `box-shadow: 0 0 0 1px rgba(46,204,113,0.15)` on focus |
| Layout | Centered card only | Split-screen: brand illustration/quote (left) + form (right) on desktop |
| Signup role selector | No visual guide | Animated role selector: Patient / Doctor / Pharmacy / Lab |
| Password strength | No visual | Password strength bar under password field |
| Logo size | Unknown | 80px with subtle drop shadow |
| Background | Plain dark | Abstract emerald geometric shape or soft gradient blob (blurred) |

```scss
// Auth split-screen layout
.hhi-auth-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Form only on mobile
  }

  &__brand-panel {
    background: linear-gradient(135deg, #0B0F14, #111827);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px;
    position: relative;
    overflow: hidden;

    // Abstract background blob
    &::before {
      content: '';
      position: absolute;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(46,204,113,0.15) 0%, transparent 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__form-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 32px;
    background: white;
  }
}

// Auth card
.hhi-auth-card {
  width: 100%;
  max-width: 420px;

  &__logo {
    width: 80px;
    height: 80px;
    background: var(--hhi-emerald);  // WAS: var(--hhi-link) — blue
    border-radius: 16px;
    margin: 0 auto 24px;
    box-shadow: 0 8px 24px rgba(46,204,113,0.3);
  }
}

// Role selector (signup)
.role-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;

  &__option {
    padding: 16px;
    border-radius: 8px;
    border: 2px solid #E2E8F0;
    text-align: center;
    cursor: pointer;
    transition: border-color 200ms ease-in-out, background 200ms ease-in-out;

    &:hover { border-color: rgba(46,204,113,0.4); background: rgba(46,204,113,0.02); }

    &.selected {
      border-color: $green-500;
      background: rgba(46,204,113,0.05);
    }

    &__icon { font-size: 24px; margin-bottom: 6px; display: block; }
    &__label { font-size: 13px; font-weight: 600; color: #1E293B; }
  }
}

// Password strength bar
.password-strength {
  margin-top: 6px;
  height: 4px;
  border-radius: 9999px;
  background: #E2E8F0;
  overflow: hidden;

  &__fill {
    height: 100%;
    border-radius: 9999px;
    transition: width 300ms ease-in-out, background 300ms ease-in-out;
    &.weak   { width: 25%; background: #EF4444; }
    &.fair   { width: 50%; background: #F59E0B; }
    &.strong { width: 75%; background: #3B82F6; }
    &.great  { width: 100%; background: $green-500; }
  }
}
```

> Reference: [Dribbble — Medical Login](https://dribbble.com/tags/medical-login) · [Dribbble — Healthcare Signup](https://dribbble.com/tags/healthcare-signup) · [Linear App Login](https://linear.app) · [Notion Login](https://www.notion.so/login) · [UX Planet — Login Form Best Practices](https://uxplanet.org/designing-ux-login-form-and-process-best-practices-d6cc1d9b81f9) · [Eleken — Healthcare Login UX](https://eleken.co/blog-posts/healthcare-ux-design) · [Dribbble — Healthcare Login Dark](https://dribbble.com/search/healthcare+login+dark)

---

### 3F. Footer

| Element | Current | Proposed |
|---|---|---|
| Content | Copyright + links only | Brand logo + short tagline + navigation links + social icons |
| Visual weight | Very thin | More substantial — at least 2 rows |

> Reference: [Dribbble — Footer Healthcare](https://dribbble.com/search/healthcare+footer)

---

## 4. Step-by-Step Implementation Tasks

---

### TASK SH-1 — Fix Header Logo Color (Blue → Emerald)
**File:** `src/app/shared/_provider-ui.scss`
**Priority:** 🔴 Do Now

```diff
- .hhi-app-logo { background: var(--hhi-link); }
+ .hhi-app-logo { background: var(--hhi-emerald); box-shadow: 0 2px 8px rgba(46,204,113,0.3); }
```

**Verify:** Open any portal → header logo square must be green.

---

### TASK SH-2 — Fix Auth Card Logo Color
**File:** `src/app/shared/_provider-ui.scss`
**Priority:** 🔴 Do Now

```diff
- .hhi-auth-card__logo { background: var(--hhi-link); }
+ .hhi-auth-card__logo { background: var(--hhi-emerald); width: 80px; height: 80px; box-shadow: 0 8px 24px rgba(46,204,113,0.3); }
```

**Verify:** Open `/auth/login` → logo square must be green and 80px.

---

### TASK SH-3 — Fix Landing Page Tagline WCAG Contrast
**File:** `src/app/features/landing/components/landing-page/landing-page.scss`
**Priority:** 🔴 Do Now

Apply the diff from §3D tagline section. Verify using browser DevTools accessibility checker — contrast ratio must be ≥ 4.5:1.

---

### TASK SH-4 — Standardize Bottom Nav Component Styles
**File:** `src/app/shared/components/bottom-nav/bottom-nav.component.scss`
**Priority:** 🟠 Medium

Apply canonical `.hhi-bottom-nav` styles (see §3B). This is the single source of truth — all inline nav CSS in individual portal files must be deleted after migration.

---

### TASK SH-5 — Add Notification Badge to Header Icon
**File:** `header.scss` + `_provider-ui.scss`
**Priority:** 🟠 Medium

Add `.hhi-header-icon__badge` (see Patient Portal doc §4A) to the notification icon wrapper. Wire to a notification count from the component.

---

### TASK SH-6 — Add Sticky Header with Backdrop Blur
**File:** `header.scss`
**Priority:** 🟠 Medium

Apply `.hhi-header` sticky + backdrop-filter styles (see §3A).

---

### TASK SH-7 — Fix PiP Window Size and Style
**File:** `video-room.scss` / `_provider-ui.scss`
**Priority:** 🟠 Medium

Replace current PiP with `.hhi-pip-window` at 180px with drag handle and emerald border (see §3C).

---

### TASK SH-8 — Add Video Control Bar CSS
**File:** `video-room.scss`
**Priority:** 🟠 Medium

Add `.video-controls` with mute / camera / end-call button styles (see §3C).

---

### TASK SH-9 — Fix Chat Bubble Hardcoded Colors
**File:** `video-room.scss` / `_provider-ui.scss`
**Priority:** 🟠 Medium

Replace `#F1F5F9` and `#DBEAFE` with variable-driven `.chat-bubble--patient` and `.chat-bubble--provider` styles (see §3C).

---

### TASK SH-10 — Fix Session Timer Position on Mobile
**File:** `_provider-ui.scss` / `consult-shell.scss`
**Priority:** 🟠 Medium

Apply `position: sticky` on mobile breakpoint for `.hhi-session-timer` (see §3C).

---

### TASK SH-11 — Add End-Call Confirmation Modal
**File:** `video-room.scss`
**Priority:** 🟠 Medium

Add `.end-call-modal` CSS (see §3C). Wire to a `showEndCallModal` boolean in the video room component.

---

### TASK SH-12 — Add Network Quality Indicator
**File:** `video-room.scss`
**Priority:** 🟡 Low

Add `.network-quality` CSS (see §3C). Wire to WebRTC connection quality stats.

---

### TASK SH-13 — Fix Landing Page Local Variable Duplication
**File:** `landing-page.scss`
**Priority:** 🟠 Medium

Remove local `$bg-primary`, `$text-primary`, etc. Replace with shared `_variables.scss` tokens throughout the file.

---

### TASK SH-14 — Add Sticky Nav to Landing Page
**File:** `landing-page.scss` + `landing-page.component.html`
**Priority:** 🟡 Low

Add `.landing-nav` (see §3D) to top of landing page template. Include Logo + Login + Sign Up buttons.

---

### TASK SH-15 — Fix Landing CTA Width
**File:** `landing-page.scss`
**Priority:** 🟠 Medium

```diff
- .cta-button { max-width: 220px; }
+ .cta-button { min-width: 220px; max-width: 320px; }
```

---

### TASK SH-16 — Auth Split-Screen Layout
**File:** `login.scss`, `signup.scss`, `forgot-password.scss`
**Priority:** 🟡 Low — Polish

Add `.hhi-auth-layout` split-screen grid (see §3E). Brand panel on left with abstract emerald blob background. Form panel on right. Collapses to single column on mobile.

---

### TASK SH-17 — Add Role Selector to Signup
**File:** `signup.scss` + `signup.component.html`
**Priority:** 🟠 Medium

Add `.role-selector` grid (see §3E). 4 options: Patient / Doctor / Pharmacy / Lab. Store selection and conditionally show relevant form fields.

---

### TASK SH-18 — Add Password Strength Bar
**File:** `login.scss`, `signup.scss`
**Priority:** 🟡 Low

Add `.password-strength` bar (see §3E). Wire to a password strength utility function in the component.

---

### TASK SH-19 — Move `@keyframes haptic-pulse` to `_mixins.scss`
**File:** `landing-page.scss` — remove local definition; use `@include animation-haptic-pulse`
**Priority:** 🟡 Low (coordinate with Task G-7 in Global doc)

---

## 5. Reference Links

| Resource | What to Look At | URL |
|---|---|---|
| Linear.app Header | Clean sticky header with icon badges | https://linear.app |
| Notion Header | Excellent accessibility-focused nav | https://www.notion.so |
| Dribbble — Healthcare Header | Medical app header concepts | https://dribbble.com/tags/healthcare-header |
| Dribbble — Bottom Navigation | Mobile bottom nav patterns | https://dribbble.com/tags/bottom-navigation |
| Apple HIG — Tab Bars | Definitive mobile tab bar design guidance | https://developer.apple.com/design/human-interface-guidelines/tab-bars |
| Teladoc Health | Industry leader telemedicine platform | https://www.teladochealth.com |
| Zoom for Healthcare | Video UI with accessibility & clinical compliance | https://zoom.us/healthcare |
| Dribbble — Telemedicine Video UI | Video call layouts for healthcare | https://dribbble.com/tags/telemedicine |
| Cloverleaf — Virtual Waiting Room | Virtual waiting room feature design | https://cloverleaf.me |
| Metal Agency — Telehealth UX | Design guide for telemedicine pre/during/post session | https://metalagency.com |
| Eleken — Telehealth UX | Telehealth UX case study + best practices | https://eleken.co/blog-posts/telehealth-app-ux |
| One Medical | Clean green theme, minimal hero, trust signals | https://www.onemedical.com |
| Maven Clinic | Modern healthcare landing, bold typography, strong CTA | https://www.mavenclinic.com |
| Zocdoc | Search-first hero, feature grid, provider logos | https://www.zocdoc.com |
| Dribbble — Healthcare Landing | 700+ healthcare landing UI concepts | https://dribbble.com/tags/healthcare-landing-page |
| Framer Healthcare Templates | Modern animated healthcare landing templates | https://framer.com/templates/?q=healthcare |
| Eleken — Healthcare UI Examples | 20 real-world healthcare UI examples | https://eleken.co/blog-posts/healthcare-ui-design-examples |
| Dribbble — Medical Login | 200+ healthcare login/signup concepts | https://dribbble.com/tags/medical-login |
| Dribbble — Healthcare Signup | Role-selection signup flows | https://dribbble.com/tags/healthcare-signup |
| UX Planet — Login Form Best Practices | Research-backed form design guide | https://uxplanet.org/designing-ux-login-form-and-process-best-practices-d6cc1d9b81f9 |
| Dribbble — Healthcare Login Dark | Creative dark login screen designs | https://dribbble.com/search/healthcare+login+dark |
| Linear App Login | Excellent minimal split-screen login reference | https://linear.app |
| Notion Login | Clean, trustworthy, minimal login reference | https://www.notion.so/login |

---

## 6. Final Recommendation

| Order | Task ID | Description | Priority |
|---|---|---|---|
| 1 | SH-1 | Fix header logo blue → emerald | 🔴 Do Now |
| 2 | SH-2 | Fix auth card logo blue → emerald (80px) | 🔴 Do Now |
| 3 | SH-3 | Fix landing tagline WCAG AA contrast | 🔴 Do Now |
| 4 | SH-4 | Canonicalize bottom nav component styles | 🟠 Medium |
| 5 | SH-6 | Add sticky header with backdrop blur | 🟠 Medium |
| 6 | SH-5 | Add notification badge to header icon | 🟠 Medium |
| 7 | SH-7 | Fix PiP window (180px + drag handle) | 🟠 Medium |
| 8 | SH-8 | Add video control bar CSS | 🟠 Medium |
| 9 | SH-9 | Fix chat bubble hardcoded colors | 🟠 Medium |
| 10 | SH-10 | Fix session timer position on mobile | 🟠 Medium |
| 11 | SH-11 | Add end-call confirmation modal | 🟠 Medium |
| 12 | SH-15 | Fix landing CTA width | 🟠 Medium |
| 13 | SH-13 | Remove landing page local variable duplication | 🟠 Medium |
| 14 | SH-17 | Add role selector to signup | 🟠 Medium |
| 15 | SH-16 | Auth split-screen layout | 🟡 Low — Polish |
| 16 | SH-14 | Add sticky nav to landing page | 🟡 Low |
| 17 | SH-12 | Add network quality indicator | 🟡 Low |
| 18 | SH-18 | Add password strength bar | 🟡 Low |
| 19 | SH-19 | Move `@keyframes haptic-pulse` to `_mixins.scss` | 🟡 Low |

---
*Document version: 1.0 | Source: HHI Styling Audit (Feb 2026)*
