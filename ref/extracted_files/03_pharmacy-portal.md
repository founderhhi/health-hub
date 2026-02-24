# 03 — Pharmacy Portal
**Health Hub International (HHI) — Styling Implementation Guide**
> Routes: `/pharmacy/*`
> Theme: Light — `#F8FAFC` background
> SCSS Files: `pharmacy-scanner.scss` (583 lines) · `pharmacy-profile.scss` · `pharmacy-history.scss` · `prescription-details.scss`
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
| **Routes** | `/pharmacy/scanner`, `/pharmacy/history`, `/pharmacy/profile`, `/pharmacy/prescription-details` |
| **User** | Pharmacist |
| **Theme** | Light — `#F8FAFC` background |
| **Primary SCSS** | `pharmacy-scanner.scss` — 583 lines |
| **Test Files** | None on nav selectors |
| **Bottom Nav** | ✅ Safe to migrate to `<app-bottom-nav [tabs]="PHARMACY_TABS">` |
| **Tab Config** | `PHARMACY_TABS` — predefined in `BottomNavComponent` |

---

## 2. Current State Summary

- 280×280px QR scanner frame with dashed emerald border
- Animated scan line using bio-lime gradient (local `@keyframes scan`)
- Corner markers (4 emerald bars at frame corners)
- Manual entry fallback with code input + lookup button
- Recent scans list with icon wrappers
- Inline bottom nav (to be migrated to `app-bottom-nav`)
- Prescription details dialog/modal
- Pharmacy history list
- Pharmacy profile page

---

## 3. Issues Found

| # | Issue | Detail | Severity |
|---|---|---|---|
| PH-1 | Scanner desktop layout | `max-width: 480px; margin: 0 auto` — scanner looks small/odd on desktop | 🟠 Medium |
| PH-2 | Camera placeholder jarring | Dark `$color-dark-bg` rectangle in middle of a light page | 🟠 Medium |
| PH-3 | No scan success animation | On scan success, no confirmation animation defined in CSS | 🔴 High |
| PH-4 | Toast position conflict | `.toast-message` is `position: fixed; left: 50%` — overlaps bottom nav on mobile | 🟠 Medium |
| PH-5 | Generic scan icons in history | All recent scans show the same green pill icon — no prescription type differentiation | 🟡 Low |
| PH-6 | Dialog lacks backdrop blur | Prescription details overlay is `rgba(0,0,0,0.5)` — no `backdrop-filter: blur` | 🟠 Medium |
| PH-7 | Bottom nav is inline, duplicated | Inline `<nav>` in all 4 pages — should use `app-bottom-nav` | 🟠 Medium |
| PH-8 | Local `@keyframes scan` | Defined in `pharmacy-scanner.scss` and `_provider-ui.scss` — duplicated | 🟡 Low |
| PH-9 | No desktop 2-column layout | Scanner + recent scans stacked vertically on all viewports | 🟠 Medium |

---

## 4. Comparative Analysis — Page by Page

### 4A. Pharmacy Scanner Page (`/pharmacy/scanner`)

#### Scanner Frame

| Element | Current | Proposed |
|---|---|---|
| Scanner size | 280×280px centered | 280×280px on mobile; 320×320px on desktop |
| Camera placeholder | Dark `$color-dark-bg` block (jarring on light page) | Semi-transparent dark with subtle vignette: `background: rgba(11,15,20,0.85)` |
| Corner markers | 4 emerald bars | Keep — they work well |
| Scan line animation | Bio-lime gradient `@keyframes scan` (local) | Keep visual — move `@keyframes` to `_mixins.scss` (Task G-7 in Global doc) |
| Frame border | `2px dashed` emerald | Keep |
| Torch/flashlight toggle | Not defined | Add a small torch icon button inside the bottom of the frame |

#### Scan Success Animation

| Element | Current | Proposed |
|---|---|---|
| On scan success | Nothing | Green ring pulse + checkmark scale-in animation |

```scss
@keyframes hhi-scan-success-ring {
  0%   { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.4); opacity: 0; }
}

.scan-success-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  &__ring {
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid $green-500;
    animation: hhi-scan-success-ring 600ms ease-out forwards;
  }

  &__check {
    width: 40px;
    height: 40px;
    color: $green-500;
    animation: hhi-fade-in-up 300ms ease-out 200ms both; // from _mixins.scss
  }
}
```

#### Manual Entry Fallback

| Element | Current | Proposed |
|---|---|---|
| Input styling | Unknown | Apply `hhi-input` standard |
| Lookup button | Unknown | Apply `hhi-button-primary` (44px height) |

#### Desktop 2-Column Layout

| Current | Proposed |
|---|---|
| Stacked: scanner above history list | 2-column CSS Grid: scanner (left) + recent scans (right) |

```scss
@media (min-width: 768px) {
  .pharmacy-scanner-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }
}
```

> Reference: [Dribbble — QR Scanner UI](https://dribbble.com/tags/qr-scanner) · [Dribbble — Pharmacy App](https://dribbble.com/tags/pharmacy-app)

---

### 4B. Toast Message

| Element | Current | Proposed |
|---|---|---|
| Position | `position: fixed; left: 50%` — overlaps bottom nav | `bottom: calc(64px + 16px)` — sits above the bottom nav height |
| Style | Unknown | Keep existing style; fix positioning only |

```scss
.toast-message {
  position: fixed;
  bottom: calc(64px + 16px); // 64px = bottom nav height
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
}
```

---

### 4C. Recent Scans List (History Icons)

| Element | Current | Proposed |
|---|---|---|
| Icon per scan | Same green pill icon for all | Color-coded icon by prescription type: 💊 Tablet = emerald · 💉 Injectable = blue · 🌿 Topical = teal |
| Time display | Unknown | Add relative timestamp: `"2 hours ago"` |
| Card hover | Unknown | `background: $color-surface-2` lift on hover |

```scss
.scan-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &--tablet   { background: rgba(46,204,113,0.1); color: $green-400; }
  &--inject   { background: rgba(59,130,246,0.1);  color: #60A5FA; }
  &--topical  { background: rgba(20,184,166,0.1);  color: #2DD4BF; }
}
```

---

### 4D. Prescription Details Dialog

| Element | Current | Proposed |
|---|---|---|
| Overlay backdrop | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.5)` + `backdrop-filter: blur(8px)` |
| Dialog elevation | Unknown | `background: $color-surface-3` (#243044) — Level 3 modal elevation |
| Dialog border-radius | Unknown | `border-radius: 12px` — modal radius rule |
| Close button | Unknown | Positioned top-right, 44px touch target |

```scss
.prescription-dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  z-index: 400;
  display: flex;
  align-items: center;
  justify-content: center;
}

.prescription-dialog {
  background: $color-surface-3;
  border-radius: 12px;
  padding: 24px;
  max-width: 480px;
  width: calc(100% - 32px);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
}
```

> Reference: [Dribbble — Medical Prescription](https://dribbble.com/tags/prescription)

---

### 4E. Pharmacy History Page (`/pharmacy/history`)

| Element | Current | Proposed |
|---|---|---|
| List layout | Unknown — thin SCSS | Use `hhi-card` elevation on each history item |
| Status badges | Unknown | Use global `.hhi-badge` system |
| Empty state | Unknown | Illustrated empty state with CTA |
| Date grouping | Unknown | Group by date with a sticky date header |

```scss
.history-date-header {
  position: sticky;
  top: 0;
  padding: 8px 16px;
  background: rgba(248, 250, 252, 0.9);
  backdrop-filter: blur(4px);
  font-size: 12px;
  font-weight: 600;
  color: #A0AEC0;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  z-index: 10;
}
```

---

### 4F. Pharmacy Profile Page (`/pharmacy/profile`)

| Element | Current | Proposed |
|---|---|---|
| Layout | Thin SCSS — likely scaffold | `hhi-card` elevation system |
| Inputs | Unknown | `hhi-input` / `hhi-label` standards |
| Buttons | Unknown | `hhi-button-primary` / `hhi-button-ghost` |
| Profile avatar | Unknown | Initials avatar with emerald background as fallback |

---

### 4G. Bottom Nav — Migration

| Current State | Proposed State |
|---|---|
| Inline `<nav>` in all 4 pharmacy HTML files with duplicated markup | Replace with `<app-bottom-nav [tabs]="PHARMACY_TABS">` |

**Files to update (HTML):**
- `pharmacy-scanner.html`
- `pharmacy-history.html`
- `pharmacy-profile.html`
- `prescription-details.html`

**Files to update (TypeScript — add to `imports` array):**
- `pharmacy-scanner.component.ts`
- `pharmacy-history.component.ts`
- `pharmacy-profile.component.ts`
- `prescription-details.component.ts`

**SCSS cleanup (remove duplicated `.bottom-nav` / `.nav-item` blocks from):**
- `pharmacy-scanner.scss`
- `pharmacy-history.scss`
- `prescription-details.scss`

---

## 5. Step-by-Step Implementation Tasks

---

### TASK PH-1 — Migrate Bottom Nav to `app-bottom-nav`
**Files:** All 4 pharmacy HTML files + 4 TS component files + 3 SCSS files
**Priority:** 🟠 Medium

Step 1 — In each pharmacy HTML file, replace:
```html
<!-- Old inline nav -->
<nav class="bottom-nav">
  <button class="nav-item">...</button>
  ...
</nav>
```
With:
```html
<app-bottom-nav [tabs]="PHARMACY_TABS"></app-bottom-nav>
```

Step 2 — In each `.component.ts`, add to `imports`:
```typescript
import { BottomNavComponent } from '@shared/components/bottom-nav/bottom-nav.component';
// Add to @Component imports: [BottomNavComponent]
```

Step 3 — In each `.scss`, remove the local `.bottom-nav`, `.nav-item` style blocks.

**Verify:** Open `/pharmacy/scanner` → bottom nav shows Scan / Prescriptions / History with correct active highlight.

---

### TASK PH-2 — Add Scan Success Animation
**File:** `pharmacy-scanner.scss`
**Priority:** 🔴 Do Now

Add `.scan-success-overlay` CSS (see §4A). In the component TypeScript, add/remove class `scan-success-visible` on scan success event.

---

### TASK PH-3 — Fix Toast Position Above Bottom Nav
**File:** `pharmacy-scanner.scss`
**Priority:** 🟠 Medium

```diff
- .toast-message { bottom: 16px; }
+ .toast-message { bottom: calc(64px + 16px); }
```

---

### TASK PH-4 — Add Backdrop Blur to Prescription Dialog
**File:** `prescription-details.scss`
**Priority:** 🟠 Medium

```diff
- .prescription-dialog-overlay { background: rgba(0,0,0,0.5); }
+ .prescription-dialog-overlay {
+   background: rgba(0,0,0,0.5);
+   backdrop-filter: blur(8px);
+ }
```

---

### TASK PH-5 — Softened Camera Placeholder
**File:** `pharmacy-scanner.scss`
**Priority:** 🟠 Medium

```diff
- .scanner-camera-placeholder { background: $color-dark-bg; }
+ .scanner-camera-placeholder {
+   background: rgba(11, 15, 20, 0.85);
+   border-radius: 6px;
+   position: relative;
+   &::after {
+     content: '';
+     position: absolute;
+     inset: 0;
+     background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%);
+   }
+ }
```

---

### TASK PH-6 — Desktop 2-Column Scanner Layout
**File:** `pharmacy-scanner.scss`
**Priority:** 🟠 Medium

Add grid layout (see §4A Desktop 2-Column section). Wrap scanner frame and recent scans list in a container `<div class="pharmacy-scanner-layout">` in the HTML.

---

### TASK PH-7 — Color-Coded Recent Scan Icons
**File:** `pharmacy-scanner.scss`
**Priority:** 🟡 Low

Add `.scan-icon` variants (see §4C). Update template to conditionally apply `--tablet`, `--inject`, or `--topical` modifier based on prescription type from data.

---

### TASK PH-8 — Move `@keyframes scan` to `_mixins.scss`
**File:** `pharmacy-scanner.scss` — remove local definition; use `@include animation-scan` from `_mixins.scss`
**Priority:** 🟡 Low (coordinate with Task G-7 in Global doc)

---

### TASK PH-9 — Standardize Prescription Dialog Elevation
**File:** `prescription-details.scss`
**Priority:** 🟠 Medium

Apply `$color-surface-3` background and `border-radius: 12px` to dialog (see §4D).

---

### TASK PH-10 — History Page Improvements
**File:** `pharmacy-history.scss`
**Priority:** 🟡 Low

Add sticky date group headers, card hover elevation, and `.hhi-empty-state` for empty history.

---

## 6. Reference Links

| Resource | What to Look At | URL |
|---|---|---|
| Dribbble — Pharmacy App | Pharmacy dashboard + QR scanner UI concepts | https://dribbble.com/tags/pharmacy-app |
| Dribbble — QR Scanner UI | Mobile scanner frame animation patterns | https://dribbble.com/tags/qr-scanner |
| Dribbble — Medical Prescription | Prescription card + detail view patterns | https://dribbble.com/tags/prescription |
| UIHut — Pharmacy Dashboard | Pharmacy prescription management UI kit | https://uihut.com/ui-kits |
| CapMinds — Pharmacy App UX | Design analysis of prescription management apps | https://www.capminds.com/blog/pharmacy-app-development/ |
| Multipurpose Themes — MedRx | Pharmacy + prescription admin template | https://multipurposethemes.com |
| Behance — File Upload UI Dark | Upload zone dark UI patterns | https://www.behance.net/search/projects?search=file+upload+dark+ui |
| ShadCN Input | Dark form input standard | https://ui.shadcn.com/docs/components/input |

---

## 7. Final Recommendation

| Order | Task ID | Description | Priority |
|---|---|---|---|
| 1 | PH-2 | Add scan success animation (ring pulse + checkmark) | 🔴 Do Now |
| 2 | PH-1 | Migrate all 4 pages to `<app-bottom-nav [tabs]="PHARMACY_TABS">` | 🟠 Medium |
| 3 | PH-3 | Fix toast position above bottom nav | 🟠 Medium |
| 4 | PH-4 | Add backdrop blur to prescription details dialog | 🟠 Medium |
| 5 | PH-5 | Soften camera placeholder for light page context | 🟠 Medium |
| 6 | PH-6 | Desktop 2-column layout for scanner page | 🟠 Medium |
| 7 | PH-9 | Standardize prescription dialog elevation | 🟠 Medium |
| 8 | PH-7 | Color-code recent scan icons by prescription type | 🟡 Low |
| 9 | PH-10 | History page improvements (date groups, empty state) | 🟡 Low |
| 10 | PH-8 | Move `@keyframes scan` to `_mixins.scss` | 🟡 Low |

---
*Document version: 1.0 | Source: HHI Styling Audit (Feb 2026)*
