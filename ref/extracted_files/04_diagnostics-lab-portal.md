# 04 — Diagnostics / Lab Portal
**Health Hub International (HHI) — Styling Implementation Guide**
> Routes: `/diagnostics/*`
> Theme: Light — `#F8FAFC` background
> SCSS Files: `diagnostics-orders.scss` (529 lines) · `diagnostics-order-details.scss` · `diagnostics-profile.scss` · `diagnostics-result-upload.scss`
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
| **Routes** | `/diagnostics/orders`, `/diagnostics/order-details`, `/diagnostics/result-upload`, `/diagnostics/profile` |
| **User** | Lab / Diagnostics Administrator |
| **Theme** | Light — `#F8FAFC` background |
| **Primary SCSS** | `diagnostics-orders.scss` — 529 lines |
| **Test Files** | None on nav selectors |
| **Bottom Nav** | ✅ Safe to migrate to `<app-bottom-nav [tabs]="DIAGNOSTICS_TABS">` |
| **Tab Config** | `DIAGNOSTICS_TABS` — predefined in `BottomNavComponent` |

---

## 2. Current State Summary

- Collapsible filter panel (4-column desktop, accordion mobile)
- Order cards with priority badges (NEW, URGENT, EMERGENCY, ROUTINE)
- Progress bar for in-progress orders (non-accessible `<div>`)
- Test item list with emerald bullet points
- Grid layout on tablet/desktop
- "DEMO" badge for mock data
- Result upload page (dropzone styling from `_provider-ui.scss` — no custom lab styling)
- Order detail view

---

## 3. Issues Found

| # | Issue | Detail | Severity |
|---|---|---|---|
| DX-1 | Collapsible filter animation jumpy | `max-height: 0 → 300px` with no content-aware height — causes a snap | 🟠 Medium |
| DX-2 | No timestamps on orders | `order-date` shows date but no time — critical in a lab context | 🔴 High |
| DX-3 | No status pipeline | Orders have statuses but no horizontal pipeline visualization (Received → In Progress → Completed) | 🔴 High |
| DX-4 | Progress bar not accessible | Pure `<div>` with no `aria` attributes — purely decorative | 🟠 Medium |
| DX-5 | Result upload no custom styling | Dropzone uses only `_provider-ui.scss` defaults — no lab-specific styling or upload feedback | 🟠 Medium |
| DX-6 | EMERGENCY badge visually alarming | All-caps `EMERGENCY` + red may cause unnecessary stress — soften with `.hhi-badge--urgent` | 🟠 Medium |
| DX-7 | No result range chart | Lab results are numbers — no normal range bar or trend line | 🟡 Low |
| DX-8 | Plain list — no visual prioritization | No distinction between urgent/pending vs complete orders visually | 🔴 High |
| DX-9 | Patient data masking looks like a bug | Masked phone `+254 ••• 1234` styled without intent — looks like failed data load | 🟠 Medium |
| DX-10 | Bottom nav is inline, duplicated | Inline `<nav>` in all 4 pages — should use `app-bottom-nav` | 🟠 Medium |
| DX-11 | No upload success animation | After result upload, no visual confirmation to admin | 🟠 Medium |

---

## 4. Comparative Analysis — Page by Page

### 4A. Orders List Page (`/diagnostics/orders`)

#### Filter Panel

| Element | Current | Proposed |
|---|---|---|
| Collapse animation | `max-height: 0 → 300px` snap | Use a JS-measured height or transition `opacity + translateY` instead |
| Filter layout | 4-column desktop / accordion mobile | Keep layout — fix animation only |

```scss
// Smooth accordion approach
.filter-panel {
  overflow: hidden;
  transition: opacity 200ms ease-in-out, transform 200ms ease-in-out;

  &.collapsed {
    opacity: 0;
    transform: translateY(-8px);
    pointer-events: none;
    height: 0;
  }

  &.expanded {
    opacity: 1;
    transform: translateY(0);
    height: auto;  // set via JS: panel.style.height = `${panel.scrollHeight}px`
  }
}
```

#### Order Cards — Visual Prioritization

| Element | Current | Proposed |
|---|---|---|
| Layout | Plain list — no visual weight difference | Kanban 3-column OR list with stronger visual triage |
| Priority badge | EMERGENCY / URGENT / NEW / ROUTINE in caps | Use `.hhi-badge--urgent` / `--warning` / `--ready` / `--inactive` |
| Status distinction | Poor — all cards look the same | Left-border color accent (same pattern as GP queue) |
| Patient identity | Name + masked phone | Avatar initials chip + name + 🔒 masked phone |
| Timestamps | Date only | Date + time + relative timestamp: `"2 hours ago"` |
| Progress bar | Non-accessible `<div>` | `<progress>` element with `aria-label` + styled with CSS |

**Status color system (3-column view or badge):**
- `#F59E0B` Amber = Pending
- `#3B82F6` Blue = In Progress
- `#2ECC71` Emerald = Results Ready

**Proposed Kanban Layout:**
```scss
.diagnostics-kanban {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Collapse to list on mobile
  }

  &__column-header {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 8px 0;
    margin-bottom: 12px;
    border-bottom: 2px solid;

    &--pending   { color: #F59E0B; border-color: #F59E0B; }
    &--progress  { color: #3B82F6; border-color: #3B82F6; }
    &--ready     { color: #2ECC71; border-color: #2ECC71; }
  }
}
```

> Reference: [Dribbble — Lab Dashboard UI](https://dribbble.com/search/laboratory-dashboard) · [Dribbble — Order Status Kanban Dark](https://dribbble.com/search/kanban+medical+dark) · [Octet Design — Lab Management UI](https://octet.design/blog/laboratory-information-management-system-design/)

---

#### Order Card Design

```scss
.order-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid transparent;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  transition: box-shadow 200ms ease-in-out;

  &:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.12); }

  &--pending   { border-left-color: #F59E0B; }
  &--progress  { border-left-color: #3B82F6; }
  &--ready     { border-left-color: #2ECC71; }
  &--urgent    { border-left-color: #EF4444; }

  &__patient {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  &__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(46,204,113,0.1);
    color: $green-400;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
  }

  &__masked-phone {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #A0AEC0;

    // Lock icon
    &::before {
      content: '🔒';
      font-size: 10px;
    }
  }

  &__test-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin: 8px 0;
  }

  &__test-chip {
    padding: 2px 8px;
    border-radius: 4px;
    background: rgba(46,204,113,0.08);
    color: $green-600;
    font-size: 11px;
    font-weight: 500;
  }

  &__time {
    font-size: 12px;
    color: #A0AEC0;
    display: flex;
    gap: 8px;
  }

  // Accessible progress bar
  progress.order-progress {
    width: 100%;
    height: 4px;
    border-radius: 9999px;
    border: none;
    background: #E2E8F0;
    margin-top: 8px;

    &::-webkit-progress-bar   { background: #E2E8F0; border-radius: 9999px; }
    &::-webkit-progress-value { background: $green-500; border-radius: 9999px; }
    &::-moz-progress-bar      { background: $green-500; border-radius: 9999px; }
  }
}
```

---

### 4B. Status Pipeline Component (Horizontal)

Add above order cards in the list and at the top of each order detail:

```scss
.status-pipeline {
  display: flex;
  align-items: center;
  padding: 12px 0;
  margin-bottom: 16px;

  &__step {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;

    &-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #E2E8F0;
      border: 2px solid #CBD5E1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      z-index: 1;
    }

    &-label {
      font-size: 10px;
      color: #94A3B8;
      margin-top: 4px;
      text-align: center;
    }

    &--complete &-icon {
      background: $green-500;
      border-color: $green-500;
      color: white;
    }

    &--active &-icon {
      border-color: #3B82F6;
      background: rgba(59,130,246,0.1);
      color: #3B82F6;
    }
  }

  &__connector {
    flex: 1;
    height: 2px;
    background: #E2E8F0;
    position: relative;
    top: -12px; // align with center of step icon
    &--complete { background: $green-500; }
  }
}
```

Steps: `Received → Sample Collected → In Lab → Results Ready`

> Reference: [Fullscript — Lab Order Tracking](https://fullscript.com/lab-testing) · [Codephusion — LIMS UX](https://codephusion.com/blog/lims-ux-dashboard-design-best-practices)

---

### 4C. Order Detail Page (`/diagnostics/order-details`)

| Element | Current | Proposed |
|---|---|---|
| Status | Badge only | Status pipeline at top (see §4B) |
| Results display | Numbers in a list | Normal-range bar chart per result + out-of-range flag |
| Timestamps | Date only | Full date + time + relative |
| Patient masking | Looks like bug | Avatar chip + `+254 ••• ••• 1234` with lock icon |
| Actions | Unknown | `hhi-button-primary` (Mark as Ready) + `hhi-button-ghost` (Request Retest) |

**Normal Range Bar:**
```scss
.result-range-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;

  &__track {
    flex: 1;
    height: 6px;
    border-radius: 9999px;
    background: #E2E8F0;
    position: relative;
  }

  &__normal-zone {
    position: absolute;
    height: 100%;
    background: rgba(46,204,113,0.3);
    border-radius: 9999px;
  }

  &__value-dot {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: $green-500;
    top: -2px;
    transform: translateX(-50%);

    &--out-of-range { background: #EF4444; }
  }

  &__labels {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #94A3B8;
    margin-top: 2px;
  }
}
```

> Reference: [LifePoint Health Lab Portal](https://lifepointhealth.net) · [Dribbble — Medical Results](https://dribbble.com/tags/medical-results)

---

### 4D. Result Upload Page (`/diagnostics/result-upload`)

| Element | Current | Proposed |
|---|---|---|
| Upload zone | Basic file input from `_provider-ui.scss` | Custom drag-and-drop zone with preview + progress indicator |
| Upload success | Nothing | Checkmark with green ripple animation |
| Upload progress | Nothing | Progress bar with percentage |

```scss
.upload-dropzone {
  border: 2px dashed rgba(46,204,113,0.4);
  border-radius: 12px;
  padding: 48px 24px;
  text-align: center;
  background: rgba(46,204,113,0.02);
  transition: border-color 200ms ease-in-out, background 200ms ease-in-out;
  cursor: pointer;

  &:hover, &.drag-over {
    border-color: $green-500;
    background: rgba(46,204,113,0.06);
  }

  &__icon { color: $green-400; width: 48px; height: 48px; margin: 0 auto 12px; }
  &__title { font-size: 16px; font-weight: 600; color: #1E293B; margin-bottom: 4px; }
  &__subtitle { font-size: 13px; color: #64748B; }
}

// Upload progress
.upload-progress {
  margin-top: 16px;

  &__bar {
    height: 4px;
    border-radius: 9999px;
    background: #E2E8F0;
    overflow: hidden;

    &-fill {
      height: 100%;
      background: $green-500;
      border-radius: 9999px;
      transition: width 200ms ease-in-out;
    }
  }

  &__label {
    font-size: 12px;
    color: #64748B;
    margin-top: 4px;
  }
}

// Upload success
@keyframes hhi-upload-success-ripple {
  0%   { transform: scale(1);   opacity: 0.6; }
  100% { transform: scale(1.8); opacity: 0; }
}

.upload-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;

  &__ripple {
    position: absolute;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: $green-500;
    animation: hhi-upload-success-ripple 800ms ease-out forwards;
  }

  &__icon {
    width: 48px;
    height: 48px;
    color: $green-500;
    animation: hhi-fade-in-up 300ms ease-out 100ms both; // from _mixins.scss
    position: relative;
    z-index: 1;
  }
}
```

> Reference: [Behance — File Upload UI Dark](https://www.behance.net/search/projects?search=file+upload+dark+ui)

---

### 4E. Patient Data Masking

| Current | Proposed |
|---|---|
| `+254 ••• 1234` — looks like failed data fetch | `+254 ••• ••• 1234` with lock icon 🔒 — intentional and styled |

```scss
.patient-masked-info {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #64748B;
  font-family: monospace; // Makes dot spacing consistent

  &__lock {
    font-size: 12px;
    color: #94A3B8;
  }
}
```

---

### 4F. Bottom Nav — Migration

| Current State | Proposed State |
|---|---|
| Inline `<nav>` in all 4 diagnostics HTML files | Replace with `<app-bottom-nav [tabs]="DIAGNOSTICS_TABS">` |

**Files to update (HTML):**
- `diagnostics-orders.html`
- `diagnostics-order-details.html`
- `diagnostics-result-upload.html`

**Files to update (TypeScript — add to `imports` array):**
- `diagnostics-orders.component.ts`
- `diagnostics-order-details.component.ts`
- `diagnostics-result-upload.component.ts`

**SCSS cleanup (remove duplicated `.bottom-nav` blocks from):**
- `diagnostics-orders.scss`
- `diagnostics-order-details.scss`

---

## 5. Step-by-Step Implementation Tasks

---

### TASK DX-1 — Add Timestamps (Date + Time) to Order Cards
**File:** `diagnostics-orders.scss` + templates
**Priority:** 🔴 Do Now

Update `order-date` display to include both absolute date+time and relative time label.

---

### TASK DX-2 — Implement Horizontal Status Pipeline
**File:** `diagnostics-orders.scss` + `diagnostics-order-details.scss`
**Priority:** 🔴 Do Now

Add `.status-pipeline` CSS (see §4B). Add to template above order list and at top of order detail page.

---

### TASK DX-3 — Replace Priority Badges with `.hhi-badge`
**File:** `diagnostics-orders.scss` — remove local badge definitions
**Priority:** 🔴 Do Now

```html
<!-- Replace: -->
<span class="badge-emergency">EMERGENCY</span>
<!-- With: -->
<span class="hhi-badge hhi-badge--urgent">Emergency</span>
```

**Note:** Remove ALL_CAPS from badge text — soften to Title Case.

---

### TASK DX-4 — Add Kanban 3-Column View
**File:** `diagnostics-orders.scss`
**Priority:** 🟡 Next Sprint

Add `.diagnostics-kanban` grid (see §4A). Add a view toggle button (List / Kanban) to the filter bar. On mobile, kanban collapses to list.

---

### TASK DX-5 — Fix Filter Panel Animation
**File:** `diagnostics-orders.scss` + template
**Priority:** 🟠 Medium

Replace `max-height` transition with opacity + JS height approach (see §4A filter panel code).

---

### TASK DX-6 — Replace `<div>` Progress Bar with `<progress>`
**File:** `diagnostics-orders.scss` + all templates with progress bars
**Priority:** 🟠 Medium

```html
<!-- Replace: -->
<div class="progress-bar"><div class="progress-fill" style="width: 60%"></div></div>
<!-- With: -->
<progress class="order-progress" value="60" max="100" aria-label="Order 60% complete"></progress>
```

---

### TASK DX-7 — Intentional Patient Data Masking
**File:** `diagnostics-orders.scss` + `diagnostics-order-details.scss`
**Priority:** 🟠 Medium

Apply `.patient-masked-info` styles (see §4E) to all patient phone/ID displays.

---

### TASK DX-8 — Add Patient Avatar Initials to Order Cards
**File:** `diagnostics-orders.scss`
**Priority:** 🟠 Medium

Apply `.order-card__avatar` (see §4A order card styles). Generate initials from patient first name.

---

### TASK DX-9 — Custom Upload Dropzone
**File:** `diagnostics-result-upload.scss`
**Priority:** 🟠 Medium (Later sprint)

Replace basic file input with `.upload-dropzone` component (see §4D). Add drag-over state via Angular host class binding. Show `.upload-progress` during upload, then `.upload-success` on completion.

---

### TASK DX-10 — Normal Range Bar Chart in Order Details
**File:** `diagnostics-order-details.scss`
**Priority:** 🟡 Low

Add `.result-range-bar` component (see §4C) to each numeric result in the order detail view.

---

### TASK DX-11 — Migrate Bottom Nav to `app-bottom-nav`
**Files:** 3 HTML + 3 TS files + 2 SCSS files
**Priority:** 🟠 Medium

Same pattern as Pharmacy migration (see TASK PH-1). Use `DIAGNOSTICS_TABS` config.

---

## 6. Reference Links

| Resource | What to Look At | URL |
|---|---|---|
| Dribbble — Lab Dashboard UI | Lab management dashboard shots — Kanban-style column workflows per test status | https://dribbble.com/search/laboratory-dashboard |
| Dribbble — LIMS Dashboard Dark | Dark LIMS UIs with status-tags for each test | https://dribbble.com/search/lims-dark |
| Dribbble — Order Status Kanban | Kanban order management patterns | https://dribbble.com/search/kanban+medical+dark |
| Dribbble — Medical Order Dark | Order management UI — status badges, timestamps, action buttons | https://dribbble.com/search/medical+order+dark+dashboard |
| Dribbble — Medical Results | Result presentation patterns | https://dribbble.com/tags/medical-results |
| Codephusion — LIMS UX Best Practices | Actionable tips for lab order management UI | https://codephusion.com/blog/lims-ux-dashboard-design-best-practices |
| Octet Design — Lab Management UI | Full case study on LIMS UX — card-based order management with status colors | https://octet.design/blog/laboratory-information-management-system-design/ |
| Fullscript — Lab Order Tracking | Order status with pipeline tracking | https://fullscript.com/lab-testing |
| LifePoint Health Lab Portal | Real patient-facing lab result portal with range bars | https://lifepointhealth.net |
| Sidekick Interactive — Healthcare Dashboard UX | Clinical data dashboards with role-based customization, real-time updates | https://sidekickinteractive.com/insights/healthcare-dashboard-design-ux-principles |
| Thinkitive — Healthcare Dashboard Examples | Multiple real-world healthcare backend dashboard examples | https://thinkitive.com/blog/healthcare-dashboard/ |
| Halo Lab — Dashboard Design Tips | Critical info placement, consistent color for urgency | https://halo-lab.com/blog/how-to-design-a-dashboard/ |
| BridgeInteract Lab Portal | Full-featured lab order management SaaS | https://www.bridgeinteract.io/lab-testing |
| Behance — File Upload UI Dark | Upload zone dark UI patterns | https://www.behance.net/search/projects?search=file+upload+dark+ui |
| Eleken — Lab Portal Case Study | UX analysis of a real diagnostics portal redesign | https://eleken.co/blog-posts/healthcare-ui-design-examples |

---

## 7. Final Recommendation

| Order | Task ID | Description | Priority |
|---|---|---|---|
| 1 | DX-1 | Add date + time + relative timestamps to order cards | 🔴 Do Now |
| 2 | DX-2 | Implement horizontal status pipeline | 🔴 Do Now |
| 3 | DX-3 | Replace priority badges with `.hhi-badge` (remove ALL_CAPS) | 🔴 Do Now |
| 4 | DX-7 | Intentional patient data masking styling | 🟠 Medium |
| 5 | DX-8 | Add patient avatar initials to order cards | 🟠 Medium |
| 6 | DX-5 | Fix filter panel collapse animation | 🟠 Medium |
| 7 | DX-6 | Replace `<div>` progress with `<progress>` + aria | 🟠 Medium |
| 8 | DX-11 | Migrate bottom nav to `<app-bottom-nav [tabs]="DIAGNOSTICS_TABS">` | 🟠 Medium |
| 9 | DX-9 | Custom drag-and-drop upload zone with success animation | 🟠 Later |
| 10 | DX-4 | Kanban 3-column view toggle | 🟡 Next Sprint |
| 11 | DX-10 | Normal range bar chart in order details | 🟡 Low |

---
*Document version: 1.0 | Source: HHI Styling Audit (Feb 2026)*
