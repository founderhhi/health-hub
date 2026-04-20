# Profile/Billing -- Variation 3: Halodoc-Inspired Consumer Health

## Design Direction
Apply consumer app patterns: flat sections on gray background, compact form fields, simplified tab navigation, and a clean billing layout. The profile should feel like account settings in a consumer health app.

## Competitor Reference
Halodoc's profile section features clean account management with trust signals. Zuri Health uses a minimal profile with prominent payment integration (mobile money in Kenya). Common patterns:
- Flat white sections on gray backgrounds.
- Compact form fields with minimal label styling.
- Payment methods displayed as simple list items rather than card-styled components.
- Quick links as a grouped list with chevrons.

## Visual Changes

### Colors
- Page background: `#F5F7FA`.
- Form sections: `#FFFFFF`, no border.
- Tab bar: underline style, no background container.
- Avatar background stays emerald but no ring/shadow treatment.

### Typography
- `.user-name` at 20px semibold Inter (no serif).
- `.form-section-title` at 15px medium.
- `.form-label` at 12px.

### Spacing & Layout
- `.form-section` padding: 16px.
- Form inputs tighter: padding `8px 12px`.
- Quick links: no border container, just a list of items.

### Borders & Shadows
- All sections: `border: none; box-shadow: none`.
- Sections: `border-radius: 14px`.
- Form inputs: `border-radius: 8px`.

### Surface Treatment
- Cards use pure white background against gray page.
- No hover effects on sections.

### Status & State Indicators
- Default badge: simple text label, no background.
- Transaction rows: clean divider lines.

## SCSS Override Snippet
```scss
// Variation 3: Halodoc-Inspired -- Profile/Billing

.profile-page {
  background: #F5F7FA;
}

.user-name {
  font-size: 20px;
  font-weight: 600;
}

.tab-bar {
  background: transparent;
  border-radius: 0;
  padding: 0;
  border-bottom: 1px solid #E2E8F0;
  gap: 0;
}

.tab-btn {
  border-radius: 0;
  background: transparent;
  border-bottom: 2px solid transparent;
  color: #64748B;

  &--active {
    background: transparent;
    color: #0B0F14;
    border-bottom-color: #2ECC71;
    box-shadow: none;
  }
}

.form-section {
  background: #FFFFFF;
  border: none;
  box-shadow: none;
  border-radius: 14px;
  padding: 16px;
}

.form-section-title {
  font-size: 15px;
  font-weight: 500;
}

.form-label {
  font-size: 12px;
}

.form-input {
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
}

.billing-section {
  background: #FFFFFF;
  border: none;
  box-shadow: none;
  border-radius: 14px;
}

.payment-card {
  border: none;
  border-radius: 10px;
  background: #F8FAFC;
  box-shadow: none;

  &--default {
    background: #F0FDF4;
    border: none;
  }
}

.quick-links {
  background: #FFFFFF;
  border: none;
  box-shadow: none;
  border-radius: 14px;
}

.quick-link {
  border-bottom-color: #F1F5F9;
}

.btn-save {
  border-radius: 12px;
  background: #2ECC71;
  box-shadow: none;

  &:hover:not(:disabled) {
    background: #27AE60;
  }
}

.default-badge {
  background: transparent;
  color: #2ECC71;
  font-weight: 600;
  border: 1px solid #BBF7D0;
}
```

## Visual Description
The profile page looks like account settings in a polished consumer app. White sections sit flat on a gray background with no borders or shadows. The tab bar uses a clean underline-active pattern. Form fields are compact, with smaller labels and tighter padding.

Payment cards in the billing section use a light gray background for standard cards and a light green tint for the default card, without any border or shadow treatment. The default badge is a simple outlined pill rather than a filled one. Quick links use the same flat white section treatment with very light dividers.

The "Save Changes" button is a clean flat emerald button without gradient or shadow. The whole page feels efficient and app-like, prioritizing function over visual decoration.
