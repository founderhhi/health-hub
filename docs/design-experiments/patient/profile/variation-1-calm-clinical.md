# Profile/Billing -- Variation 1: Calm Clinical

## Design Direction
Soften the profile page with lighter form section borders, more generous form spacing, gentler tab bar styling, and a calmer billing section. The profile should feel like a safe, unhurried settings area.

## Visual Changes

### Colors
- `.avatar` background softened: `color-mix(in srgb, var(--accent-primary) 80%, white 20%)`.
- `.tab-btn--active` box-shadow reduced from `0 1px 4px rgba(0,0,0,0.08)` to `0 1px 3px rgba(0,0,0,0.05)`.
- `.form-section` border color lightened to `color-mix(in srgb, var(--border-color) 70%, transparent)`.
- `.quick-link:hover` background reduced from 5% to 3% accent mix.

### Typography
- `.user-name` weight from 700 to 600.
- `.form-section-title` line-height increased to 1.5.
- `.form-label` line-height set to 1.6.

### Spacing & Layout
- `.form-section` padding increased from 24px to 28px.
- `.form-section` gap increased from 16px to 20px.
- `.details-form` gap increased from 24px to 28px.
- `.form-group` gap from 6px to 8px.
- `.tab-bar` margin-bottom from 32px to 36px.

### Borders & Shadows
- `.form-section` border-radius stays at 16px (already soft).
- `.form-input` border-radius from 8px to 10px.
- `.billing-section` border color lightened.
- `.payment-card` border-radius from 12px to 14px.
- `.quick-links` border color lightened.

### Surface Treatment
- `.form-input:focus` shadow softened: `0 0 0 2px rgba(46, 204, 113, 0.3)` (from 0.4).
- `.btn-save` border-radius stays at 12px.

### Status & State Indicators
- `.default-badge` background from 15% to 10% accent mix.
- Transaction status pills unchanged (already subtle).

## SCSS Override Snippet
```scss
// Variation 1: Calm Clinical -- Profile/Billing

.avatar {
  background: color-mix(in srgb, var(--accent-primary) 80%, white 20%);
}

.user-name {
  font-weight: 600;
}

.tab-bar {
  margin-bottom: 36px;
}

.tab-btn--active {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.details-form {
  gap: 28px;
}

.form-section {
  padding: 28px;
  gap: 20px;
  border-color: color-mix(in srgb, var(--border-color) 70%, transparent);
}

.form-section-title {
  line-height: 1.5;
}

.form-group {
  gap: 8px;
}

.form-label {
  line-height: 1.6;
}

.form-input {
  border-radius: 10px;

  &:focus {
    box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.3);
  }
}

.billing-section {
  border-color: color-mix(in srgb, var(--border-color) 70%, transparent);
}

.payment-card {
  border-radius: 14px;
}

.quick-links {
  border-color: color-mix(in srgb, var(--border-color) 70%, transparent);
}

.quick-link:hover {
  background: color-mix(in srgb, var(--accent-primary) 3%, transparent);
}

.default-badge {
  background: color-mix(in srgb, var(--accent-primary) 10%, transparent);
}
```

## Visual Description
The profile page feels like a gentle settings area. Form sections have softer borders and more internal padding, making each field group feel spacious. Form labels and section titles have relaxed line-heights. Input fields have slightly rounder corners and a softer focus glow.

The avatar uses a lighter emerald tint, and the tab bar's active state has a barely-there shadow. Payment cards in the billing section have rounder corners. Quick links have an extremely subtle hover tint. The overall impression is of a profile page you can browse unhurriedly, with no visual urgency.
