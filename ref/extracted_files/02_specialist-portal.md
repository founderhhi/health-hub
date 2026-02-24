# 02 — Specialist Portal
**Health Hub International (HHI) — Styling Implementation Guide**
> Routes: `/specialist/*`
> Theme: Light — `#F8FAFC` background
> SCSS Files: `specialist-dashboard.scss` (493 lines) · `specialist-profile.scss` · `referral-details.scss`
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
| **Routes** | `/specialist`, `/specialist/referral-details`, `/specialist/profile` |
| **User** | Specialist Physician |
| **Theme** | Light — `#F8FAFC` background |
| **Primary SCSS** | `specialist-dashboard.scss` — 493 lines |
| **Test Files** | `specialist-dashboard.spec.ts` — 2 tests on `.hhi-bottom-nav__item.hhi-bottom-nav__item--disabled` |
| | `referral-details.spec.ts` — selector on disabled nav item |
| **Bottom Nav** | ⚠️ Must stay as inline `hhi-bottom-nav__*` markup — test coverage exists on disabled state selectors |
| **Note** | Better SCSS variable usage than GP dashboard — good baseline |

---

## 2. Current State Summary

- 2×2 → 4×1 responsive stats grid at top
- Pill-shaped tab filters (horizontal scroll on mobile)
- Referral cards with left-border priority accent (green/amber/red)
- Appointment cards with time + patient + status badge
- Bottom nav (inline — must stay)
- Referral detail view per referral

---

## 3. Issues Found

| # | Issue | Detail | Severity |
|---|---|---|---|
| SP-1 | Stats: all values same color | Stat values use `$color-text-primary` — no emerald emphasis | 🟠 Medium |
| SP-2 | Referral cards: no avatar | Patient cards have no avatar/initials circle — hard to scan quickly | 🟠 Medium |
| SP-3 | Tab filters: no count badges | "New Referrals" tab shows no count — user doesn't know what they're walking into | 🔴 High |
| SP-4 | Appointment card status badge full-width on mobile | `.appointment-status { width: 100% }` on mobile looks broken | 🟠 Medium |
| SP-5 | Empty state too plain | Just small icon + text — no illustration or CTA | 🟠 Medium |
| SP-6 | No referral timeline | No visual timeline showing where a referral is in its lifecycle | 🟠 Medium |
| SP-7 | No scroll edge on tab filters | Horizontal scroll on mobile has no fade gradient to indicate more tabs | 🟡 Low |
| SP-8 | Referral card: no timestamp on mobile | Date is cut off at small viewport — critical clinical info | 🟠 Medium |

---

## 4. Comparative Analysis — Page by Page

### 4A. Specialist Dashboard — Stats Grid (4 Cards)

| Element | Current | Proposed |
|---|---|---|
| Value text color | `$color-text-primary` (same as body text) | `$green-400` (`#4ADE80`) for emphasis |
| Card layout | Flat numbers | Keep layout — add colored accent dot per card type |
| Responsive | 2×2 → 4×1 | Keep — this is good |
| Hover state | None | `background: $color-surface-2` lift on hover |

> Reference: [Dribbble — Telemedicine Dashboard](https://dribbble.com/tags/telemedicine-dashboard)

---

### 4B. Tab Filters (Horizontal Pill Tabs)

| Element | Current | Proposed |
|---|---|---|
| Count on tabs | None | Add count badge chip: `New Referrals (4)` |
| Scroll edge | No indicator | Add right fade gradient: `linear-gradient(to right, transparent, #F8FAFC)` |
| Active state | Pill fill | Keep — it works |
| Mobile overflow | Horizontal scroll | Keep — add scroll edge fade |

```scss
// Count badge inside tab
.tab-count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9999px;
  background: $green-500;
  color: white;
  font-size: 11px;
  font-weight: 700;
  margin-left: 6px;
}
```

> Reference: [Dribbble — Appointment Management](https://dribbble.com/tags/appointment-management)

---

### 4C. Referral Cards

| Element | Current | Proposed |
|---|---|---|
| Patient identity | Name only (text) | Avatar initials circle + name chip |
| Left-border accent | Exists (green/amber/red) | Keep — already good |
| Priority badge | Text only | Use global `.hhi-badge--urgent` / `--warning` / `--ready` |
| Timestamp | Absolute date only | Add relative time: `"3 hours ago"` alongside absolute date |
| Hover state | Unknown | `background: $color-surface-2; box-shadow: 0 2px 8px rgba(0,0,0,0.1)` |

```scss
// Patient avatar initials
.referral-card__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: $green-900-30;
  color: $green-400;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}
```

> Reference: [Dribbble — Telemedicine Dashboard](https://dribbble.com/tags/telemedicine-dashboard) · [Phreesia — Referral Management](https://www.phreesia.com/solutions/referral-management/)

---

### 4D. Appointment Cards

| Element | Current | Proposed |
|---|---|---|
| Status badge on mobile | `width: 100%` — looks broken | `width: auto; align-self: flex-start` |
| Time display | Absolute only | Add day label: `"Today, 2:30 PM"` |
| Card actions | Unknown | Add quick-action icon buttons (confirm, reschedule) visible on hover |
| Status badge style | Ad hoc | Use global `.hhi-badge--urgent` / `--warning` / `--ready` |

---

### 4E. Referral Detail View (`/specialist/referral-details`)

| Element | Current | Proposed |
|---|---|---|
| Referral lifecycle | No visual | Add horizontal stepper/timeline: `Received → Reviewed → Scheduled → Completed` |
| Status indicator | Text badge only | Status badge + timeline position |
| Patient summary | Likely text list | Use card sections with consistent `hhi-card` elevation |
| Actions (accept/decline) | Unknown | Prominent CTAs: `hhi-button-primary` (Accept) + `hhi-button-ghost` (Request More Info) |
| Bottom nav | ⚠️ Inline `hhi-bottom-nav__*` | Keep as-is — test coverage |

```scss
// Referral lifecycle stepper
.referral-stepper {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 16px 0;

  &__step {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;

    &-dot {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: $color-surface-2;
      border: 2px solid $color-surface-3;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &--complete .referral-stepper__step-dot {
      background: $green-500;
      border-color: $green-500;
    }

    &--active .referral-stepper__step-dot {
      border-color: $green-500;
      box-shadow: 0 0 0 4px $green-900-30;
    }

    &-label {
      font-size: 11px;
      color: #A0AEC0;
      margin-top: 4px;
      text-align: center;
    }
  }

  &__line {
    flex: 1;
    height: 2px;
    background: $color-surface-3;
    &--complete { background: $green-500; }
  }
}
```

> Reference: [Dribbble — Appointment Management](https://dribbble.com/tags/appointment-management) · [ReferralPoint](https://referralpoint.com) · [LeadSquared Healthcare CRM](https://www.leadsquared.com/industries/healthcare/)

---

### 4F. Empty States

| Element | Current | Proposed |
|---|---|---|
| Empty referral list | Small icon + text | Illustrated Lucide/Phosphor icon (emerald-styled) + headline + sub-message + CTA button |
| Empty appointments | Small icon + text | Same pattern |

```scss
.hhi-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;

  &__icon {
    width: 64px;
    height: 64px;
    color: $green-400;
    margin-bottom: 16px;
    opacity: 0.7;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
    color: #F0F4F8;
    margin-bottom: 8px;
  }

  &__subtitle {
    font-size: 14px;
    color: #A0AEC0;
    max-width: 280px;
    margin-bottom: 24px;
  }
}
```

> Reference: [Lucide Icons](https://lucide.dev) · [Phosphor Icons](https://phosphoricons.com)

---

### 4G. Specialist Profile Page (`/specialist/profile`)

| Element | Current | Proposed |
|---|---|---|
| Layout | Thin SCSS — likely scaffold-level | Use `hhi-card` elevation system |
| Inputs | Unknown | Apply `hhi-input` / `hhi-label` standards |
| Buttons | Unknown | Apply `hhi-button-primary` / `hhi-button-ghost` |
| Profile image | Unknown | Add initials-avatar fallback with emerald background |

---

## 5. Step-by-Step Implementation Tasks

> ⚠️ Do NOT replace the inline `hhi-bottom-nav__*` nav HTML on specialist pages — `specialist-dashboard.spec.ts` and `referral-details.spec.ts` query `.hhi-bottom-nav__item.hhi-bottom-nav__item--disabled`.

---

### TASK SP-1 — Add Count Badges to Tab Filters
**File:** `specialist-dashboard.scss` + template HTML
**Priority:** 🔴 Do Now

Add `.tab-count-badge` class (defined above in §4B) to the tab template.

In HTML:
```html
<button class="tab-pill tab-pill--active">
  New Referrals
  <span class="tab-count-badge">{{ newReferralCount }}</span>
</button>
```

---

### TASK SP-2 — Add Patient Initials Avatar to Referral Cards
**File:** `specialist-dashboard.scss`
**Priority:** 🟠 Medium

Add `.referral-card__avatar` (see §4C) to card header layout. In template:
```html
<div class="referral-card__avatar">{{ patient.firstName[0] }}{{ patient.lastName[0] }}</div>
```

---

### TASK SP-3 — Replace Ad Hoc Priority Badges with Global `.hhi-badge`
**File:** `specialist-dashboard.scss` — remove local badge definitions
**Template:** Replace local badge markup with:
```html
<span class="hhi-badge hhi-badge--urgent">Urgent</span>
<span class="hhi-badge hhi-badge--warning">Pending</span>
<span class="hhi-badge hhi-badge--ready">Scheduled</span>
```
**Priority:** 🔴 Do Now

---

### TASK SP-4 — Fix Appointment Status Badge on Mobile
**File:** `specialist-dashboard.scss`
**Priority:** 🟠 Medium

```diff
- .appointment-status { width: 100%; }  // @media mobile
+ .appointment-status { width: auto; align-self: flex-start; }
```

---

### TASK SP-5 — Add Stat Card Value Emphasis
**File:** `specialist-dashboard.scss`
**Priority:** 🟠 Medium

```diff
- .stat-card__value { color: $color-text-primary; }
+ .stat-card__value { color: $green-400; }
```

---

### TASK SP-6 — Add Scroll Edge Fade to Tab Filters
**File:** `specialist-dashboard.scss`
**Priority:** 🟡 Low

```scss
.tabs-scroll-container {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 48px;
    height: 100%;
    background: linear-gradient(to right, transparent, #F8FAFC);
    pointer-events: none;
  }
}
```

---

### TASK SP-7 — Add Relative Timestamps to Referral Cards
**File:** Template only (no SCSS change)
**Priority:** 🟡 Low

Display both: `"Mar 15, 2026"` and `"3 hours ago"` using Angular date pipe + a relative time pipe.

---

### TASK SP-8 — Add Referral Timeline Stepper to Detail View
**File:** `referral-details.scss`
**Priority:** 🟠 Medium

Add `.referral-stepper` component styles (see §4E). Add to `referral-details.component.html` above the referral body content:
```html
<div class="referral-stepper">
  <div class="referral-stepper__step referral-stepper__step--complete">...</div>
  <div class="referral-stepper__line referral-stepper__line--complete"></div>
  <div class="referral-stepper__step referral-stepper__step--active">...</div>
  ...
</div>
```

---

### TASK SP-9 — Implement Empty State Component
**File:** `specialist-dashboard.scss`
**Priority:** 🟠 Medium

Add `.hhi-empty-state` styles (see §4F). Replace all placeholder empty state markup with the standardized empty state template.

---

### TASK SP-10 — Add Card Hover Elevation
**File:** `specialist-dashboard.scss`
**Priority:** 🟡 Low

```scss
.referral-card, .appointment-card {
  transition: background 200ms ease-in-out, box-shadow 200ms ease-in-out;
  &:hover {
    background: $color-surface-2;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
```

---

## 6. Reference Links

| Resource | What to Look At | URL |
|---|---|---|
| Phreesia — Referral Management | Real-world referral dashboard — card layout, status, actions | https://www.phreesia.com/solutions/referral-management/ |
| ReferralPoint | Purpose-built referral coordination product | https://referralpoint.com |
| LeadSquared Healthcare CRM | Referral funnel + specialist workflow | https://www.leadsquared.com/industries/healthcare/ |
| Dribbble — Telemedicine Dashboard | Appointment + referral UI concepts | https://dribbble.com/tags/telemedicine-dashboard |
| Dribbble — Appointment Management | Modern appointment card designs | https://dribbble.com/tags/appointment-management |
| Fuselab Creative — Referral Dashboards | KPI + referral analytics visualization | https://fuselabcreative.com/healthcare-dashboard-design/ |
| Lucide Icons | Empty state illustrated icons | https://lucide.dev |
| Phosphor Icons | Alternative icon library | https://phosphoricons.com |

---

## 7. Final Recommendation

| Order | Task ID | Description | Priority |
|---|---|---|---|
| 1 | SP-1 | Add count badges to tab filters | 🔴 Do Now |
| 2 | SP-3 | Replace local priority badges with `.hhi-badge` | 🔴 Do Now |
| 3 | SP-2 | Add patient initials avatar to referral cards | 🟠 Medium |
| 4 | SP-4 | Fix appointment status badge width on mobile | 🟠 Medium |
| 5 | SP-5 | Add stat value emphasis color | 🟠 Medium |
| 6 | SP-8 | Add referral timeline stepper in detail view | 🟠 Medium |
| 7 | SP-9 | Implement empty state component | 🟠 Medium |
| 8 | SP-10 | Add card hover elevation | 🟡 Low |
| 9 | SP-6 | Add scroll edge fade on tab filters | 🟡 Low |
| 10 | SP-7 | Add relative timestamps to cards | 🟡 Low |

> **Critical constraint:** Never replace the inline `hhi-bottom-nav__*` nav HTML on any specialist page. Both `specialist-dashboard.spec.ts` and `referral-details.spec.ts` test `.hhi-bottom-nav__item--disabled` and must stay green.

---
*Document version: 1.0 | Source: HHI Styling Audit (Feb 2026)*
