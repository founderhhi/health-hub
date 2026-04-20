# Pharmacy Scanner -- V2: Calm Clinical

## Design Direction

This variation strips back visual noise to create a **quiet, functional workspace** optimized for pharmacist efficiency. Shadows are reduced, borders softened, spacing opens up, and the scanner frame feels less like a hero moment and more like a calm, reliable tool. The emphasis is on clarity over flourish -- every element serves the workflow without demanding attention.

## Visual Changes

### Colors
- Page background remains `$color-surface` (#F8FAFC) with no gradient
- Scanner frame border softens from emerald dashed to a lighter `#BBF7D0` (success-border) dashed line
- Scanner frame background stays white
- Corner markers lighten to `#86EFAC` (green-300) -- present but not dominant
- Scan line opacity reduces slightly (0.5 shadow opacity instead of 0.6)
- Recent scan icon wrapper uses an even lighter tint: `#F7FFF7` instead of `$color-success-light`
- Inline messages use softer background tints (8% opacity instead of 12%)

### Typography
- All text stays in Inter (no serif moments)
- Page title drops to weight 600 (from 700) for a calmer presence
- Page subtitle gets slightly lighter color: `$color-text-muted` instead of `$color-text-secondary`
- Section headers use weight 500 instead of 600
- Scanner instructions use `$font-size-sm` (12px) instead of `$font-size-base` (14px) -- less prominent
- Body text line-height increases from 1.5 to 1.6

### Spacing
- Scanner container top padding increases from `$space-lg` to 28px
- Manual input section padding increases from `$space-md` to 20px
- Gap between sections increases from `$space-lg` to 28px
- Recent scan items gain 2px extra vertical padding (18px total)
- Dialog sections (`__meta`, `__section`) margin-top increases from `$space-md` to 20px

### Borders & Radius
- All border colors soften from `$color-border` (#E2E8F0) to `#EDF2F7`
- Scanner frame radius stays at `$radius-xl` (16px) -- no increase
- Manual input section border lightens to `#EDF2F7`
- Recent scans list border lightens to `#EDF2F7`
- No radius changes -- keep existing values for consistency

### Surface & Shadows
- Scanner frame shadow reduces from `$shadow-md` to `$shadow-sm` -- minimal depth
- Manual input card shadow stays at `$shadow-sm`
- Recent scans list shadow stays at `$shadow-sm`
- Dialog shadow softens: `0 16px 32px rgba(0, 0, 0, 0.24)` (from 0.4)
- Toast message shadow reduces to `$shadow-sm`
- No hover shadow escalation on recent scan items -- just background tint change

### Status & Interactions
- Lookup button stays flat emerald (no gradient), but gains 1px more padding horizontal
- Status badges use tinted backgrounds at lower opacity (10% instead of default)
- Scan success overlay background becomes pure white at 0.9 opacity (from 0.95)
- Hover states are subtle: background tint only, no transforms or shadow changes
- Focus states remain unchanged for accessibility

## SCSS Override Snippet

```scss
// V2: Calm Clinical -- Pharmacy Scanner
// Overlay on top of existing pharmacy-scanner.scss

$border-calm: #EDF2F7;

.scanner-container {
  gap: 28px;
  padding-top: 28px;
}

.page-title {
  font-weight: v.$font-weight-semibold; // 600 instead of 700
}

.page-subtitle {
  color: v.$color-text-muted;
}

.scanner-frame {
  border-color: v.$color-success-border; // #BBF7D0
  box-shadow: v.$shadow-sm;
}

.corner-marker {
  background: v.$green-300; // #86EFAC -- softer
}

.scan-line {
  box-shadow: 0 0 8px rgba(v.$color-bio-lime, 0.5); // reduced glow
}

.scanner-instructions {
  font-size: v.$font-size-sm;
  color: v.$color-text-muted;
}

.manual-input-section {
  border-color: $border-calm;
  padding: 20px;
}

.manual-input-title {
  font-weight: v.$font-weight-medium; // 500
}

.lookup-button {
  padding: 0 20px; // slightly wider
}

.recent-scans-section .section-header {
  font-weight: v.$font-weight-medium;
}

.recent-scans-list {
  border-color: $border-calm;
}

.recent-scan-item {
  padding: 18px v.$space-md;
  border-bottom-color: $border-calm;

  &:hover {
    background: #FAFBFC; // barely-there hover
  }

  &__icon-wrapper {
    background: #F7FFF7;
  }
}

.inline-message {
  background: rgba(v.$color-danger, 0.08);

  &--info {
    background: rgba(v.$color-info, 0.08);
  }
}

.details-dialog {
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.24);

  &__meta,
  &__section {
    margin-top: 20px;
    padding-top: 20px;
    border-top-color: $border-calm;
  }
}

.scan-success-overlay {
  background: rgba(255, 255, 255, 0.9);
}

.toast-message {
  box-shadow: v.$shadow-sm;
}
```

## Visual Description

The scanner page feels like a clean, well-lit pharmacy workspace. There is no gradient wash or dramatic shadows -- just a soft neutral surface with lightened borders throughout. The scanner frame has a gentle green dashed border and minimal shadow, functioning as a tool rather than a showpiece. Corner markers are a softer green-300 tone. All headings use Inter at weight 500-600 instead of bold, reducing visual hierarchy pressure. The manual input card and recent scans list have barely-there borders in `#EDF2F7`. Hover states are limited to subtle background tints. The overall impression is a pharmacist-friendly density with no wasted visual energy -- calm, functional, and easy to scan (pun intended) at a glance during a busy shift.
