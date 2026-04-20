# Diagnostics Profile -- Variation 1: Operational Clarity

## Design Direction
Sharper field cards, stronger operational status treatment, bolder section separation, and clearer action hierarchy. The profile page is a settings/identity screen -- the lab tech needs to quickly verify their facility information and toggle operational status. This variation makes the operational status toggle the visual focal point and strengthens the identity presentation.

## Visual Changes

### Colors
- **Profile avatar:** keep emerald bg, increase size ring (add 2px white border + 2px emerald outer ring)
- **Field card border:** replace `#e0e0e0` with `$color-border` (#E2E8F0) for design system consistency
- **Field label color:** replace `#7f8c8d` with `$color-text-muted` (#64748B)
- **Field value color:** use `$color-text-primary` (#0B0F14) instead of soft charcoal
- **Operational status area:** emerald tinted bg when operating, red tinted bg when not
- **Sign out button:** keep existing red treatment, add 1px border only (no bg tint)
- **Page background:** use `$color-surface` (#F8FAFC) instead of `#f5f5f5`

### Typography
- **Profile header h1:** 700 weight (up from 600), keep 20px
- **Field labels:** 600 weight, 12px, uppercase, `letter-spacing: 0.04em`
- **Field values:** 600 weight, 16px
- **Operational status label:** 700 weight, larger at 14px
- **Back button:** 600 weight
- **Sign out button:** keep 600 weight

### Spacing
- **Field card margin-bottom:** increase from 12px to 14px
- **Field card padding:** keep 16px
- **Profile avatar margin-bottom:** keep 24px
- **Profile header margin-bottom:** keep 24px
- **Sign out button margin-top:** increase from 16px to 24px
- **Container max-width:** keep 560px

### Borders
- **Field cards:** 1px `$color-border`, keep `$radius-md`
- **Field labels:** add 3px left emerald bar accent, 8px left padding
- **Profile avatar:** add double-ring (2px white + 2px emerald)
- **Operational status field card:** thicker border (2px) when operating (emerald), 2px red when not
- **Sign out button:** 1px border (reduce from 2px), no background tint

### Surface
- **Page background:** `$color-surface` (#F8FAFC) -- design system token
- **Field card shadow:** replace custom `0 1px 3px rgba(0,0,0,0.08)` with `$shadow-sm`
- **Field card hover:** border-color shifts to emerald, shadow lifts to `$shadow-md`
- **Operational status card:** `$color-emerald-light` bg when operating, `$color-danger-light` bg when not
- **Avatar shadow:** add `$shadow-md` for depth

### Status
- **Operational toggle:** the field card for operational status gets a colored background based on state
- **Operating:** emerald-light bg (#ECFDF3), 2px emerald border
- **Not operating:** danger-light bg (#FEF2F2), 2px red border
- **Avatar ring:** double border acts as a visual identity anchor

## SCSS Override Snippet

```scss
// V1: Operational Clarity -- Diagnostics Profile
// Sharper fields, operational status emphasis, design system alignment

.provider-profile--v1 {
  background: v.$color-surface;

  // Field label accents
  .field-label {
    color: v.$color-text-muted;
    font-weight: v.$font-weight-semibold;
    font-size: v.$font-size-sm;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    border-left: 3px solid v.$color-emerald;
    padding-left: v.$space-sm;
  }

  // Field card alignment to design system
  .field-card {
    border-color: v.$color-border;
    box-shadow: v.$shadow-sm;
    margin-bottom: 14px;
    transition: all v.$transition-fast;

    &:hover {
      border-color: v.$color-emerald;
      box-shadow: v.$shadow-md;
    }
  }

  // Field value bolder
  .field-value {
    color: v.$color-text-primary;
    font-weight: v.$font-weight-semibold;
  }

  // Profile header
  .profile-header h1 {
    font-weight: v.$font-weight-bold;
    color: v.$color-text-primary;
  }

  // Avatar double ring
  .profile-avatar {
    box-shadow: 0 0 0 2px v.$color-white, 0 0 0 4px v.$color-emerald, v.$shadow-md;
  }

  // Operational status card (conditional via class)
  .field-card--operational-active {
    background: v.$color-emerald-light;
    border: 2px solid v.$color-emerald;
  }

  .field-card--operational-inactive {
    background: v.$color-danger-light;
    border: 2px solid v.$color-danger;
  }

  // Sign out button refinement
  .sign-out-button {
    border-width: 1px;
    background: transparent;
    margin-top: v.$space-lg;

    &:hover {
      background: v.$color-danger-light;
    }
  }
}
```

## Visual Description
The diagnostics profile page is crisp and identity-focused. The facility avatar has a double-ring treatment (white inner ring, emerald outer ring) with a subtle shadow, making it feel like an official identity mark. Field labels are uppercase with 3px emerald left-bar accents and semibold weight, giving each field a structured, form-like quality. Field values are rendered in primary text color with semibold weight for immediate readability. The operational status field card is the visual focal point -- it takes on an emerald-light background with a 2px emerald border when operating, or a red-light background with red border when not, making the facility's current state impossible to miss. The sign out button uses a single-pixel border without background tint, reducing its visual weight relative to the operational status. All colors now use design system tokens instead of hardcoded hex values (#f5f5f5, #e0e0e0, #7f8c8d are replaced). The overall feel is a clean identity card with clear operational emphasis.
