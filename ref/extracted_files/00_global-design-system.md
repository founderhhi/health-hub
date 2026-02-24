# 00 — Global Design System
**Health Hub International (HHI) — Styling Implementation Guide**
> Scope: Shared tokens, elevation, color scale, components, and animation system that apply across **all portals**.
> Read this document first before opening any portal-specific document.

---

## Table of Contents
1. [Current Token State](#1-current-token-state)
2. [Global Issues Found](#2-global-issues-found)
3. [Comparative Analysis — Current vs Proposed](#3-comparative-analysis--current-vs-proposed)
4. [Step-by-Step Implementation Tasks](#4-step-by-step-implementation-tasks)
5. [Design Principles — Rules for Every Portal](#5-design-principles--rules-for-every-portal)
6. [Reference Links](#6-reference-links)
7. [Final Recommendation](#7-final-recommendation)

---

## 1. Current Token State

**File:** `src/app/shared/styles/_variables.scss`

| Category | Current Value | Status |
|---|---|---|
| **Primary / Emerald** | `#2ECC71` | ✅ Keep — brand anchor |
| **Accent / Bio-Lime** | `#AEEA00` | ⚠️ Use sparingly — jarring at scale |
| **Background** | `#0B0F14` | ✅ Keep |
| **Card** | `#121826` | ⚠️ All cards are the same depth — needs elevation levels |
| **Border** | `#1E293B` | ✅ OK |
| **Text Primary** | `#FFFFFF` | ⚠️ Too harsh — soften to `#F0F4F8` |
| **Text Secondary** | `#A0AEC0` | ✅ Keep |
| **Font** | Inter | ✅ Keep |
| **Focus Ring** | `#2ECC71` 2px | ⚠️ Invisible on green buttons — needs white on green |
| **Spacing Base** | 8px | ✅ Keep |
| **Radius** | sm:4px → full:9999px | ✅ Keep |
| **Type Scale** | xs:11px → 3xl:32px (8 steps) | ✅ Keep |
| **Breakpoints** | xs:480 / sm:640 / md:768 / lg:1024 / xl:1280 / 2xl:1440 | ✅ Keep |

**Naming Convention:**
- Shared classes use `.hhi-*` BEM prefix (e.g., `.hhi-card`, `.hhi-button-primary`)
- Component-level SCSS uses unprefixed local class names
- This **two-tier naming system** causes developer confusion — should be documented and enforced

---

## 2. Global Issues Found

| # | Issue | Severity | Affects |
|---|---|---|---|
| G-1 | No CSS Custom Property toggle for dark/light mode — only `prefers-color-scheme` | 🔴 High | All portals |
| G-2 | Hardcoded hex values throughout all component SCSS instead of SCSS variables | 🔴 High | All portals |
| G-3 | Bottom nav is copy-pasted into 5+ SCSS files with slightly different implementations | 🟠 Medium | GP, Specialist, Pharmacy, Diagnostics, Patient |
| G-4 | No loading skeleton / shimmer states in design system | 🟠 Medium | All portals |
| G-5 | No centralized animation system — `@keyframes` defined locally in each file | 🟡 Low | 5+ files |
| G-6 | Inconsistent button heights: landing=48px, provider=44px, patient=40px | 🟠 Medium | All portals |
| G-7 | No focus-trap or accessible modal system | 🟠 Medium | All portals |
| G-8 | Inter font loaded via `@import` in styles.scss — blocks rendering | 🟡 Low | All pages |
| G-9 | All cards use the same `#121826` — no elevation hierarchy | 🔴 High | All portals |
| G-10 | Only one shade of green used — no tonal scale | 🔴 High | All portals |
| G-11 | Logo uses `--hhi-link` (blue `#1D4ED8`) not `--hhi-emerald` | 🔴 High | Header, Auth card |
| G-12 | No skip-to-main-content link | 🟠 Medium | Accessibility |

---

## 3. Comparative Analysis — Current vs Proposed

### 3A. Color Elevation System

| Level | Current | Proposed | Usage |
|---|---|---|---|
| Level 0 — Page BG | `#0B0F14` | `#0B0F14` — no change | Page backgrounds |
| Level 1 — Card | `#121826` (used everywhere) | `#111827` | Standard cards |
| Level 2 — Raised Card | `#121826` (same as card) | `#1C2535` | Hover / selected states |
| Level 3 — Modal/Overlay | `#121826` (same as card) | `#243044` | Modals and dropdowns |
| Level 4 — Tooltip | `#121826` (same as card) | `#2D3D54` | Tooltips |

> **Why this matters:** In dark mode you cannot use drop shadows for elevation — you must use progressively lighter backgrounds. Right now every surface feels the same depth. Reference: [Material Design Dark Theme](https://m2.material.io/design/color/dark-theme.html)

---

### 3B. Green Tonal Scale

| Token | Current | Proposed | Usage |
|---|---|---|---|
| `green-50` | Not defined | `#F0FDF4` | Light backgrounds for success alerts |
| `green-100` | Not defined | `#DCFCE7` | Subtle tinted backgrounds |
| `green-300` | Not defined | `#86EFAC` | Hover states |
| `green-400` | Not defined | `#4ADE80` | Brighter accent / text on dark cards |
| `green-500` | `#2ECC71` ✅ | `#2ECC71` — keep | PRIMARY brand |
| `green-600` | Not defined | `#16A34A` | Pressed / active state |
| `green-700` | Not defined | `#15803D` | Dark-on-green text |
| `green-900/30` | Not defined | `rgba(46,204,113,0.15)` | Subtle tinted card backgrounds |

> Reference: [Tailwind Emerald Scale](https://tailwindcss.com/docs/customizing-colors) · [Ant Design Color System](https://ant.design/docs/spec/introduce)

---

### 3C. Logo Color

| Element | Current | Proposed |
|---|---|---|
| `.hhi-app-logo` background | `var(--hhi-link)` = blue `#1D4ED8` | `var(--hhi-emerald)` = `#2ECC71` |
| `.hhi-auth-card__logo` background | `var(--hhi-link)` = blue `#1D4ED8` | `var(--hhi-emerald)` = `#2ECC71` |

---

### 3D. Buttons

| Variant | Current | Proposed |
|---|---|---|
| Primary | Flat `#2ECC71` fill | Subtle gradient `#2ECC71 → #16A34A` (5° hue tilt) |
| Ghost/Outline | Basic border | `border: 1px solid rgba(46,204,113,0.5)` + `background: rgba(46,204,113,0.05)` |
| Danger | Not consistently defined | `#EF4444` hover deepens to `#DC2626` |
| Focus ring (on green button) | `outline: 2px solid #2ECC71` — invisible on green | `outline: 2px solid white; outline-offset: 2px` |
| Height (all portals) | 48px / 44px / 40px — inconsistent | **Standardize to 44px** (provider) / 48px (patient mobile) |

> Reference: [ShadCN Dark Buttons](https://ui.shadcn.com) · [Ant Design Buttons](https://ant.design/docs/spec/introduce)

---

### 3E. Form Inputs (Dark Mode)

| Property | Current | Proposed |
|---|---|---|
| Input background | Unspecified / inherits | `#1C2535` (Level 2 elevation) |
| Input border | Unspecified | `#2D3D54` |
| Focus border | Emerald full opacity | `#2ECC71` at 70% opacity |
| Focus shadow | None | `box-shadow: 0 0 0 3px rgba(46,204,113,0.15)` |
| Label color | White / unspecified | `#94A3B8` |

> Reference: [ShadCN Input Dark Variant](https://ui.shadcn.com/docs/components/input)

---

### 3F. Status Badge System

| State | Current | Background | Text | Border |
|---|---|---|---|---|
| 🔴 High/Urgent | Ad hoc per portal | `rgba(239,68,68,0.15)` | `#FC8181` | `rgba(239,68,68,0.3)` |
| 🟡 Warning/Pending | Ad hoc per portal | `rgba(245,158,11,0.15)` | `#FCD34D` | `rgba(245,158,11,0.3)` |
| 🟢 Normal/Ready | Ad hoc per portal | `rgba(46,204,113,0.15)` | `#4ADE80` | `rgba(46,204,113,0.3)` |
| ⚪ Inactive/Unknown | Ad hoc per portal | `rgba(148,163,184,0.1)` | `#94A3B8` | `rgba(148,163,184,0.2)` |

> This badge system must be implemented once in `_provider-ui.scss` and used everywhere — never re-implemented per portal.

---

### 3G. Loading States (Skeleton Screens)

| Current | Proposed |
|---|---|
| Basic spinners or nothing | Skeleton shimmer screens for all list/card areas |
| No animation system | `background: linear-gradient(90deg, #121826 25%, #1c2535 50%, #121826 75%)` animated left-to-right |

> Reference: [ShadCN Skeleton](https://ui.shadcn.com/docs/components/skeleton)

---

### 3H. Animation System — Centralize `@keyframes`

| Animation | Currently Defined In | Proposed Location |
|---|---|---|
| `@keyframes spin` | `login.scss`, `practitioner.scss` | `_mixins.scss` as `@mixin animation-spin` |
| `@keyframes fadeInUp` | `dashboard.component.scss` | `_mixins.scss` as `@mixin animation-fade-in-up` |
| `@keyframes haptic-pulse` | `landing-page.scss` | `_mixins.scss` as `@mixin animation-haptic-pulse` |
| `@keyframes scan` | `pharmacy-scanner.scss`, `_provider-ui.scss` | `_mixins.scss` as `@mixin animation-scan` |

---

### 3I. Font Loading

| Current | Proposed |
|---|---|
| `@import` in `styles.scss` — render-blocking | `<link rel="preconnect">` + `display=swap` in `index.html` |

---

### 3J. Empty States

| Current | Proposed |
|---|---|
| Generic emoji or just text | Illustrated icon (Lucide/Phosphor styled emerald) + primary message + sub-message + CTA button |

> Reference: [Lucide Icons](https://lucide.dev) · [Phosphor Icons](https://phosphoricons.com)

---

## 4. Step-by-Step Implementation Tasks

> Tasks are ordered by dependency — complete them top to bottom. Portal-specific tasks are in their own documents.

---

### TASK G-1 — Fix Logo Color
**File:** `src/app/shared/_provider-ui.scss`
**Priority:** 🔴 Do Now

```diff
- .hhi-app-logo { background: var(--hhi-link); }
+ .hhi-app-logo { background: var(--hhi-emerald); }

- .hhi-auth-card__logo { background: var(--hhi-link); }
+ .hhi-auth-card__logo { background: var(--hhi-emerald); }
```

**Verify:** Open `/gp` → header logo square must be green, not blue.

---

### TASK G-2 — Add Color Elevation Tokens
**File:** `src/app/shared/styles/_variables.scss`
**Priority:** 🔴 Do Now

```scss
// Dark elevation surfaces (use instead of hardcoded #121826 everywhere)
$color-surface-0: #0B0F14;   // Page background
$color-surface-1: #111827;   // Standard card
$color-surface-2: #1C2535;   // Raised card / hover
$color-surface-3: #243044;   // Modal / dropdown
$color-surface-4: #2D3D54;   // Tooltip
```

---

### TASK G-3 — Add Green Tonal Scale Tokens
**File:** `src/app/shared/styles/_variables.scss`
**Priority:** 🔴 Do Now

```scss
$green-50:  #F0FDF4;
$green-100: #DCFCE7;
$green-300: #86EFAC;
$green-400: #4ADE80;
$green-500: #2ECC71;   // PRIMARY — existing brand color
$green-600: #16A34A;
$green-700: #15803D;
$green-900-30: rgba(46, 204, 113, 0.15);
```

---

### TASK G-4 — Define Unified Status Badge Classes
**File:** `src/app/shared/_provider-ui.scss`
**Priority:** 🔴 Do Now

```scss
.hhi-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid transparent;

  &--urgent {
    background: rgba(239, 68, 68, 0.15);
    color: #FC8181;
    border-color: rgba(239, 68, 68, 0.3);
  }
  &--warning {
    background: rgba(245, 158, 11, 0.15);
    color: #FCD34D;
    border-color: rgba(245, 158, 11, 0.3);
  }
  &--ready {
    background: rgba(46, 204, 113, 0.15);
    color: #4ADE80;
    border-color: rgba(46, 204, 113, 0.3);
  }
  &--inactive {
    background: rgba(148, 163, 184, 0.1);
    color: #94A3B8;
    border-color: rgba(148, 163, 184, 0.2);
  }
}
```

---

### TASK G-5 — Standardize Button Styles
**File:** `src/app/shared/_provider-ui.scss`
**Priority:** 🟠 Medium

```scss
.hhi-button-primary {
  height: 44px;
  background: linear-gradient(135deg, #2ECC71, #16A34A);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  transition: opacity 200ms ease-in-out, transform 200ms ease-in-out;
  &:hover { opacity: 0.9; transform: translateY(-1px); }
  &:active { transform: translateY(0); }
  &:focus-visible { outline: 2px solid white; outline-offset: 2px; }
}

.hhi-button-ghost {
  height: 44px;
  background: rgba(46, 204, 113, 0.05);
  border: 1px solid rgba(46, 204, 113, 0.5);
  border-radius: 8px;
  color: $green-400;
  transition: background 200ms ease-in-out;
  &:hover { background: rgba(46, 204, 113, 0.1); }
}

.hhi-button-danger {
  height: 44px;
  background: #EF4444;
  border-radius: 8px;
  color: white;
  &:hover { background: #DC2626; }
}
```

---

### TASK G-6 — Standardize Form Inputs
**File:** `src/app/shared/_provider-ui.scss`
**Priority:** 🟠 Medium

```scss
.hhi-input {
  background: $color-surface-2;      // #1C2535
  border: 1px solid $color-surface-3; // #2D3D54
  border-radius: 8px;
  color: #F0F4F8;
  height: 44px;
  padding: 0 12px;
  transition: border-color 200ms ease-in-out, box-shadow 200ms ease-in-out;

  &:focus {
    outline: none;
    border-color: rgba(46, 204, 113, 0.7);
    box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.15);
  }
}

.hhi-label {
  color: #94A3B8;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
  display: block;
}
```

---

### TASK G-7 — Centralize Animations in `_mixins.scss`
**File:** `src/app/shared/styles/_mixins.scss`
**Priority:** 🟡 Low (but do before per-file cleanup)

```scss
@keyframes hhi-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@mixin animation-spin($duration: 1s) {
  animation: hhi-spin $duration linear infinite;
}

@keyframes hhi-fade-in-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@mixin animation-fade-in-up($delay: 0ms) {
  animation: hhi-fade-in-up 400ms ease-out $delay both;
}

@keyframes hhi-haptic-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}
@mixin animation-haptic-pulse {
  animation: hhi-haptic-pulse 2s ease-in-out infinite;
}

@keyframes hhi-scan {
  0% { top: 0; }
  100% { top: 100%; }
}
@mixin animation-scan {
  animation: hhi-scan 2s linear infinite;
}

@keyframes hhi-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@mixin skeleton-shimmer {
  background: linear-gradient(90deg, #121826 25%, #1c2535 50%, #121826 75%);
  background-size: 200% 100%;
  animation: hhi-shimmer 1.5s ease-in-out infinite;
}
```

After adding — **remove** the local `@keyframes` from: `login.scss`, `practitioner.scss`, `dashboard.component.scss`, `landing-page.scss`, `pharmacy-scanner.scss`, `_provider-ui.scss`.

---

### TASK G-8 — Fix Font Loading
**File:** `src/index.html`
**Priority:** 🟡 Low

Remove `@import url('https://fonts.googleapis.com/...')` from `styles.scss`.

Add to `<head>` in `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

### TASK G-9 — Add Skeleton Component
**File:** `src/app/shared/_provider-ui.scss`
**Priority:** 🟠 Medium

```scss
.hhi-skeleton {
  border-radius: 8px;
  @include skeleton-shimmer;

  &--text { height: 14px; width: 60%; }
  &--title { height: 20px; width: 40%; }
  &--card { height: 80px; width: 100%; }
  &--avatar { height: 40px; width: 40px; border-radius: 50%; }
}
```

---

### TASK G-10 — Add Skip-to-Content Link
**File:** `src/index.html` and each portal's root template
**Priority:** 🟠 Medium — Accessibility

```html
<a href="#main-content" class="hhi-skip-link">Skip to main content</a>
```

```scss
.hhi-skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  z-index: 9999;
  padding: 8px 16px;
  background: $green-500;
  color: white;
  border-radius: 0 0 8px 8px;
  font-weight: 600;
  &:focus { top: 0; }
}
```

---

### TASK G-11 — Consolidate Bottom Nav
See individual portal documents for page-level HTML changes.

**Summary:** `app-bottom-nav` (`BottomNavComponent`) already exists at `src/app/shared/components/bottom-nav/`. It has `PATIENT_TABS`, `SPECIALIST_TABS`, `PHARMACY_TABS`, `DIAGNOSTICS_TABS` predefined. None of the 12 feature pages currently use it.

**Pages to migrate (no test coverage on nav):** Patient (5 pages), Pharmacy (4 pages), Diagnostics (4 pages)
**Pages to leave as-is (test coverage exists):** GP/Practitioner, Specialist dashboard, Specialist referral-details

---

## 5. Design Principles — Rules for Every Portal

These must be applied consistently without exception:

1. **Never use pure white `#FFFFFF` for body text** → use `#F0F4F8`
2. **Never use pure black for dark backgrounds** → `#0B0F14` minimum
3. **Every interactive element must have 3 states:** default → hover → active/pressed
4. **`#2ECC71` (brand green) must never be used as text on dark cards** → use `#4ADE80` for legibility
5. **Border-radius rules:** 4px on badges/chips · 8px on inputs/cards · 12px on modals
6. **Minimum 44px touch target** for all interactive elements on mobile
7. **All transitions:** `200ms ease-in-out` — no element jumps without animation
8. **Spacing:** 4px base unit · 16px internal card padding · 24px section gaps
9. **Text Primary:** `#F0F4F8` (not `#FFFFFF`) — reduces eye strain on dark backgrounds
10. **Replace all hardcoded hex values** in component SCSS with SCSS variable references

---

## 6. Reference Links

| Resource | What to Look At | URL |
|---|---|---|
| ShadCN/UI Dark Mode | Best dark component library — card shadows, input borders, button styles | https://ui.shadcn.com |
| Material UI Dark Theme | Elevation hierarchy using lighter backgrounds in dark mode | https://mui.com/material-ui/customization/dark-mode/ |
| Material Design Dark Theme Guide | Definitive reference for layering dark surfaces with dp elevation | https://m2.material.io/design/color/dark-theme.html |
| Ant Design Color System | 10-tint-per-color system — apply to `#2ECC71` | https://ant.design/docs/spec/introduce |
| Tailwind Emerald Scale | Exact tint/shade scale for emerald green | https://tailwindcss.com/docs/customizing-colors |
| HealthCare.gov Design System | Production healthcare design system with dark mode accessibility tokens | https://design.cms.gov |
| UX Design CC — Dark Mode Guide | Practical dark UI pitfalls — why pure white on dark causes eye strain | https://uxdesign.cc/dark-mode-ui-design-the-definitive-guide-part-1-color-53dcfaea5129 |
| ShadCN Skeleton | Skeleton loading component pattern | https://ui.shadcn.com/docs/components/skeleton |
| ShadCN Input | Dark variant form input pattern | https://ui.shadcn.com/docs/components/input |
| Lucide Icons | Icon library for empty states — style with emerald | https://lucide.dev |
| Phosphor Icons | Alternative icon library for empty states | https://phosphoricons.com |
| Dribbble — Healthcare Login Dark | Creative login screen designs for healthcare apps in dark mode | https://dribbble.com/search/healthcare+login+dark |
| Apple HIG — Tab Bars | Definitive mobile tab bar design guidance | https://developer.apple.com/design/human-interface-guidelines/tab-bars |

---

## 7. Final Recommendation

**Do in this exact order:**

| Order | Task | Files Changed | Priority |
|---|---|---|---|
| 1 | Fix logo color (blue → emerald) | `_provider-ui.scss` | 🔴 Do Now |
| 2 | Add elevation tokens to `_variables.scss` | `_variables.scss` | 🔴 Do Now |
| 3 | Add green tonal scale to `_variables.scss` | `_variables.scss` | 🔴 Do Now |
| 4 | Implement unified status badge system | `_provider-ui.scss` | 🔴 Do Now |
| 5 | Standardize button styles | `_provider-ui.scss` | 🟠 Medium |
| 6 | Standardize form inputs | `_provider-ui.scss` | 🟠 Medium |
| 7 | Consolidate bottom nav (see portal docs) | 13 HTML files | 🟠 Medium |
| 8 | Add skeleton shimmer mixin | `_mixins.scss` | 🟠 Medium |
| 9 | Centralize `@keyframes` animations | `_mixins.scss` | 🟡 Low |
| 10 | Fix font loading (preconnect) | `index.html` | 🟡 Low |
| 11 | Add skip-to-content link | `index.html` | 🟠 Medium |
| 12 | Replace all hardcoded hex values | All component SCSS | 🔴 Do Now |

> Tasks 1–4 are the most impactful: they cascade improvement across every portal simultaneously. Complete the Global document before touching any portal-specific files.

---
*Document version: 1.0 | Source: HHI Styling Audit (Feb 2026) | 43 SCSS files audited across 10 feature modules*
