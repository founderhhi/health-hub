# Profile/Billing -- Variation 2: Premium Guided

## Design Direction
Elevate the profile with Fraunces serif for the user name, richer form section framing, premium payment card presentation, and a more polished tab bar. The profile should feel like a premium account portal.

## Visual Changes

### Colors
- `.avatar` gets a subtle ring: `box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-primary) 20%, transparent)`.
- `.form-section` gets a very subtle background tint: `background: color-mix(in srgb, var(--bg-card) 97%, var(--accent-primary) 3%)`.
- `.btn-save` gradient: `linear-gradient(135deg, #2ECC71, #27AE60)`.

### Typography
- `.user-name` uses `'Fraunces', serif` at 22px bold.
- `.form-section-title` uses `'Fraunces', serif` at 16px.
- `.billing-section-title` uses `'Fraunces', serif`.
- `.modal-header h3` uses `'Fraunces', serif`.

### Spacing & Layout
- No major spacing changes -- premium feel comes from typography and surface treatment.

### Borders & Shadows
- `.form-section` gets `box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04)`.
- `.billing-section` gets `box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04)`.
- `.quick-links` gets `box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04)`.
- `.payment-card` gets `box-shadow: 0 1px 4px rgba(15, 23, 42, 0.04)`.
- `.btn-save` gets resting shadow: `box-shadow: 0 4px 12px color-mix(in srgb, var(--accent-primary) 20%, transparent)`.

### Surface Treatment
- `.btn-save:hover` gets deeper shadow and slight lift.
- `.payment-card--default` border becomes more prominent: `border-color: var(--accent-primary)`.
- Tab bar active state: `box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08)`.

### Status & State Indicators
- `.default-badge` gets `font-weight: 600`.
- Transaction status pills get `font-weight: 600`.

## SCSS Override Snippet
```scss
// Variation 2: Premium Guided -- Profile/Billing

.user-name {
  font-family: 'Fraunces', 'Iowan Old Style', 'Georgia', serif;
  font-size: 22px;
}

.avatar {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-primary) 20%, transparent);
}

.tab-btn--active {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.form-section {
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  background: color-mix(in srgb, var(--bg-card) 97%, var(--accent-primary) 3%);
}

.form-section-title {
  font-family: 'Fraunces', 'Iowan Old Style', 'Georgia', serif;
  font-size: 16px;
}

.billing-section {
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.billing-section-title {
  font-family: 'Fraunces', 'Iowan Old Style', 'Georgia', serif;
}

.quick-links {
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.payment-card {
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.04);
}

.payment-card--default {
  border-color: var(--accent-primary);
}

.default-badge {
  font-weight: 600;
}

.btn-save {
  background: linear-gradient(135deg, #2ECC71, #27AE60);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--accent-primary) 20%, transparent);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #27AE60, #219653);
    transform: translateY(-1px);
    box-shadow: 0 6px 18px color-mix(in srgb, var(--accent-primary) 30%, transparent);
  }
}

.modal-header h3 {
  font-family: 'Fraunces', 'Iowan Old Style', 'Georgia', serif;
}

.tx-status {
  font-weight: 600;
}
```

## Visual Description
The profile page reads as a premium account management experience. The user name in Fraunces serif immediately sets a different tone. The avatar has a subtle emerald ring. Form sections and billing cards have delicate resting shadows that give them material depth.

Section titles in Fraunces create a clear hierarchy between headings and form fields. The "Save Changes" button uses a gradient fill with a persistent glow shadow that intensifies on hover. Payment cards have gentle shadows, and the default card has a full emerald border rather than a translucent one.

The add-card modal header uses Fraunces serif, making even utility modals feel considered. The overall effect is of an account portal that belongs to a premium health platform.
