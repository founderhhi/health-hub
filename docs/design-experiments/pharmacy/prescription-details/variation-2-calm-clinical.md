# Prescription Details -- V2: Calm Clinical

## Design Direction

This variation optimizes the prescription details page for **pharmacist efficiency under pressure**. Shadows are minimal, spacing is generous but not wasteful, borders are soft, and the visual hierarchy guides the eye from prescription ID to medications to action without demanding attention. The dispensing flow feels routine and reliable -- no premium flourishes, just clarity.

## Visual Changes

### Colors
- Page background stays flat `$color-surface` -- no gradients
- Progress bar fill uses a single-color emerald (`$color-emerald`) instead of the emerald-to-lime gradient
- Prescriber card background lightens from `$color-surface-elevated` to `#F7F9FB` -- barely elevated
- Border colors throughout soften from `$color-border` (#E2E8F0) to `#EDF2F7`
- Medication card hover border uses `#BBF7D0` (success-border) instead of full emerald -- subtle
- Inline status error uses 8% danger opacity instead of default

### Typography
- All headings stay in Inter -- no serif
- Prescription ID drops to weight 600 (from 700)
- Section titles drop to weight 500
- Patient identifier color lightens to `$color-text-muted`
- Progress label font-size stays at `$font-size-sm` but `__count` uses weight 500 (down from medium)
- Body text line-height increases to 1.6

### Spacing
- Prescription container padding stays at `$space-md $space-lg` -- no increase
- Medications section gap increases from `$space-md` to 20px for breathing room
- Prescriber section margin-bottom increases from `$space-xl` to 36px
- Privacy section margin-bottom increases to 36px
- Sticky footer inner gap increases from `$space-md` to 20px

### Borders & Radius
- All borders use `#EDF2F7` instead of `$color-border`
- No radius increases -- keep existing `$radius-md` everywhere
- Medication card checkbox border lightens to `#D1D5DB`
- Progress bar track lightens to `#F1F5F9`

### Surface & Shadows
- Medication cards stay at `$shadow-sm` in all states
- Medication card hover adds no shadow increase -- border tint change only
- Dispensing progress card stays at `$shadow-sm`
- Prescriber card shadow removed entirely -- relies on background and border
- Sticky footer shadow softens: `0 -2px 8px rgba(15, 23, 42, 0.04)`
- Dialog (if any) uses `$shadow-md` only

### Status & Interactions
- "Complete Dispensing" button stays flat emerald (no gradient), with standard hover darken
- "Mark All as Dispensed" secondary button border lightens to `#EDF2F7`
- No transform animations on hover -- just color/background transitions
- Medication card hover is background-tint only (`#FAFBFC`), no border color change
- Focus states unchanged for accessibility

## SCSS Override Snippet

```scss
// V2: Calm Clinical -- Prescription Details

$border-calm: #EDF2F7;

.prescription-id {
  font-weight: v.$font-weight-semibold;
}

.patient-identifier {
  color: v.$color-text-muted;
  line-height: 1.6;
}

.section-title {
  font-weight: v.$font-weight-medium;
}

.dispensing-progress {
  border-color: $border-calm;
}

.progress-bar {
  background: #F1F5F9;
}

.progress-bar__fill {
  background: v.$color-emerald; // single color, no gradient
}

.progress-label__count {
  font-weight: v.$font-weight-medium;
}

.medications-section {
  gap: 20px;
}

.medication-card {
  border-color: $border-calm;

  &:hover {
    border-color: v.$color-success-border; // #BBF7D0
    box-shadow: v.$shadow-sm; // no escalation
    background: #FAFBFC;
  }

  &__checkbox {
    border-color: #D1D5DB;
  }
}

.prescriber-card {
  background: #F7F9FB;
  border-color: $border-calm;
  box-shadow: none;
}

.prescriber-section {
  margin-bottom: 36px;
}

.privacy-section {
  margin-bottom: 36px;
}

.sticky-footer {
  border-top-color: $border-calm;
  box-shadow: 0 -2px 8px rgba(15, 23, 42, 0.04);

  &__actions {
    gap: 20px;
  }
}

.action-button--secondary {
  border-color: $border-calm;
}

.inline-status--error {
  background: rgba(v.$color-danger, 0.08);
}
```

## Visual Description

The prescription details page is clean and unhurried. The prescription ID is Inter semibold at 24px -- clear but not loud. The progress bar uses a single emerald fill without gradient shimmer. Medication cards have light `#EDF2F7` borders and hover to a barely-there grey background without shadow escalation. The prescriber card sits on a `#F7F9FB` background with no shadow -- just structure. Section spacing is generous (36px between major sections). The sticky footer has a whisper-thin shadow (`0.04` opacity). Every surface is deliberately quiet, letting the pharmacist focus on the prescription content without visual competition.
