# Specialist Dashboard -- V3: Vezeeta-Inspired

## Design Direction
Inspired by Vezeeta's doctor portal patterns: clinic management efficiency, appointment-centric hierarchy, multi-clinic awareness, and confirmation-driven booking flows. Vezeeta's doctor app emphasizes schedule management, patient database access, and no-show reduction through confirmation messaging. This variation brings that booking-management DNA into Health Hub's specialist dashboard.

## Competitor Reference
**Vezeeta for Doctors** (Egypt, Saudi Arabia, Kenya, Nigeria):
- Appointment schedule as the primary dashboard view, not a secondary section
- Patient database management with quick access to records
- Multi-clinic management support with clinic switching
- Confirmation message system to reduce no-shows
- Clean list-based appointment view with time slots as primary anchor
- Treatment plan delivery integrated into patient flow
- 500k+ patient platform with doctor profile visibility metrics

**Key Patterns Adopted:**
1. **Appointment-first hierarchy**: Today's appointments promoted above referrals, matching Vezeeta's schedule-first approach
2. **Confirmation status indicators**: Added visual confirmation states on appointment cards (confirmed/unconfirmed/no-response)
3. **Patient count metric**: Monthly patient stat styled as a growth indicator (matching Vezeeta's practice growth metrics)
4. **Compact schedule view**: Time-slot anchored appointment list with left time column, matching Vezeeta's schedule management pattern
5. **Profile visibility hint**: Subtle "practice visibility" stat echoing Vezeeta's doctor profile metrics

## Visual Changes

### Colors
- Stat cards: use a colored top border (3px) instead of icon backgrounds -- emerald for referrals, blue for appointments, amber for consultations, green for patients (Vezeeta uses category-color coding on cards)
- Appointment cards: add left-border color coding by confirmation status -- `#22C55E` confirmed, `#F59E0B` pending, `#94A3B8` unconfirmed
- Tab filters: use underline-style tabs instead of pill buttons (more like a web portal tab bar)
- Active tab: bottom border `3px solid #2ECC71` instead of filled background

### Typography
- Page title: `22px` / `600` weight, more compact than current (Vezeeta uses functional, not decorative, headings)
- Stat values: `28px` / `700` with the stat label directly below at `12px` / `500` uppercase
- Appointment time column: `16px` / `700` monospace for schedule clarity
- Patient name in appointment cards: `15px` / `600` (slightly smaller than referral cards, matching Vezeeta's compact schedule rows)

### Spacing
- Overall tighter vertical rhythm: section gaps `20px` (from `32px`)
- Stat cards: `16px` padding, compact `88px` min-height
- Appointment cards: `12px 16px` padding for schedule-density
- Referral cards: `16px 20px` padding
- Tab bar: no gap between tabs, connected underline style with `1px` bottom border on the row

### Borders & Radius
- Stat cards: `8px` radius with `3px` colored top border, no left border
- Referral cards: `8px` radius, keep `4px` left border
- Appointment cards: `8px` radius with `3px` left border (confirmation status color)
- Tab bar: `0px` radius on tabs (rectangular underline tabs)

### Surface & Shadow
- Stat cards: flat, no shadow -- `border: 1px solid #E2E8F0` only (Vezeeta-style flat cards)
- Referral cards: minimal shadow `0 1px 2px rgba(15, 23, 42, 0.04)`
- Appointment cards: no shadow, border only (schedule-tool feel)
- Connected tab bar: `border-bottom: 1px solid #E2E8F0` on the container, active tab overlaps with emerald bottom border

### Status
- Confirmation badges on appointments: three states -- "Confirmed" (green chip), "Pending" (amber chip), "No Response" (gray chip) -- inspired by Vezeeta's confirmation message tracking
- Referral badges: keep current styling but tighten to `4px` radius
- Add a small "Patients reached" or "This month" label under the patients stat, echoing Vezeeta's practice metrics

## SCSS Override Snippet

```scss
// V3: Vezeeta-Inspired -- Specialist Dashboard

.stats-grid {
  gap: 12px;
  margin-bottom: v.$space-lg;
}

.stat-card {
  border-radius: v.$radius-md;
  padding: v.$space-md;
  min-height: 88px;
  box-shadow: none;
  border: 1px solid v.$color-border;
  border-top: 3px solid v.$color-border;
  position: relative;

  &:nth-child(1) { border-top-color: v.$color-emerald; }
  &:nth-child(2) { border-top-color: v.$color-info; }
  &:nth-child(3) { border-top-color: v.$color-warning; }
  &:nth-child(4) { border-top-color: v.$color-success; }

  .stat-value {
    font-size: 28px;
    color: v.$color-text-primary;
  }

  .stat-label {
    font-size: v.$font-size-sm;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-weight: v.$font-weight-medium;
  }

  .stat-icon {
    display: none; // Remove floating icons, use top-border color instead
  }
}

.tab-filters {
  gap: 0;
  border-bottom: 1px solid v.$color-border;
  padding-bottom: 0;
  margin-bottom: v.$space-lg;

  &::after {
    display: none; // Remove fade gradient
  }

  .tab-filter {
    border-radius: 0;
    border: none;
    border-bottom: 3px solid transparent;
    background: transparent;
    padding: v.$space-sm v.$space-lg v.$space-md;
    color: v.$color-text-muted;
    font-size: v.$font-size-base;

    &--active {
      border-bottom-color: v.$color-emerald;
      color: v.$color-text-primary;
      background: transparent;
      font-weight: v.$font-weight-semibold;
    }

    &:hover {
      background: transparent;
      color: v.$color-text-primary;
      border-bottom-color: v.$color-border;
    }

    .tab-count-badge {
      background: v.$color-surface-elevated;
      color: v.$color-text-secondary;
      font-weight: v.$font-weight-semibold;
    }
  }
}

.section-title {
  font-size: v.$font-size-md;
  font-weight: v.$font-weight-semibold;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: v.$color-text-secondary;
}

.referral-card {
  border-radius: v.$radius-md;
  padding: v.$space-md 20px;
  margin-bottom: 12px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.appointment-card {
  border-radius: v.$radius-md;
  padding: 12px v.$space-md;
  box-shadow: none;
  border: 1px solid v.$color-border;
  border-left: 3px solid v.$color-text-light;
  margin-bottom: v.$space-sm;

  .appointment-time {
    font-family: v.$font-family-mono;
    font-size: v.$font-size-md;
    font-weight: v.$font-weight-bold;
    min-width: 72px;
  }

  .appointment-patient {
    font-size: 15px;
  }
}

.hhi-page-header .hhi-page-title {
  font-size: 22px;
  font-weight: v.$font-weight-semibold;
}
```

## Visual Description
The dashboard adopts a portal-management aesthetic inspired by Vezeeta's doctor app. Stat cards are flat and bordered with a 3px colored top-stripe (emerald, blue, amber, green) replacing the floating icon backgrounds -- cleaner and more web-app-like. Tabs switch from pill buttons to an underline tab bar with a connected bottom border, the active tab marked by a solid emerald underline. Section titles are smaller, uppercase, and secondary-colored -- functional headers rather than visual anchors. Appointment cards use a compact schedule-row layout with monospace time on the left and a 3px left-border indicating confirmation status. The overall density is higher and the aesthetic is more tool-like -- this feels like a clinic management portal rather than a consumer product, which aligns with how Vezeeta positions its doctor-facing experience.
