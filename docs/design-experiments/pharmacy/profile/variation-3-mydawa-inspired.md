# Pharmacy Profile -- V3: MyDawa-Inspired

## Design Direction

Adapts **pharmacy business profile patterns from MyDawa and mPharma** -- treating the profile as a **pharmacy storefront card** with operational information presented clearly and concisely. The layout borrows from seller profile pages in e-commerce: verification badge, key details in a compact list, and operational status as a prominent indicator.

## Competitor Reference

**MyDawa pharmacy patterns:**
- Licensed and regulated status prominently displayed
- Pharmacy & Poisons Board Kenya verification as a trust signal
- Delivery hours prominently shown (8am-8pm, 365 days)
- Contact information in a clean list format
- M-PESA and multiple payment methods shown as capabilities

**mPharma pharmacy management patterns:**
- Pharmacy location and inventory status on profile
- Operating hours and availability indicators
- Network badges (part of 120+ pharmacies)
- Clean data card layouts for pharmacy details
- Status indicators: open/closed, stocked/low stock

## Visual Changes

### Colors
- Page background uses white (`#FFFFFF`) with 4px emerald top strip
- Field cards lose individual borders and instead stack in a single white card container with internal dividers
- Dividers use `#EDF2F7` -- thin 1px lines between fields
- A verification badge section at top: emerald background chip with white text "Licensed Pharmacy"
- Avatar background stays `$color-emerald` but gains no extra treatment
- Operational status area gets a colored background: `#F0FDF4` when operating, `#FEF2F2` when not

### Typography
- Profile header uses Inter at 20px bold -- compact
- Field labels use 11px uppercase, weight 600, letter-spacing wide, `$color-text-muted`
- Field values use 15px, weight 500
- A pharmacy ID/registration shown in monospace font
- Sign-out button uses 14px weight 500

### Spacing
- Page padding uses `$space-md` on all sides -- tighter, app-like
- Profile container max-width narrows from 560px to 480px
- The unified card container has 0px gap between items (divider-separated)
- Internal field padding uses 14px vertical, 16px horizontal
- Avatar size reduces from 68px to 56px -- less dominant
- Avatar margin-bottom reduces to `$space-md`
- Sign-out button margin-top: `$space-lg`

### Borders & Radius
- Unified card container uses `$radius-md` (8px) -- single bordered entity
- No individual field card borders -- only the container
- Status badge uses `$radius-sm` (4px) -- sharp
- Sign-out button uses `$radius-md`
- Verification badge uses `$radius-sm`

### Surface & Shadows
- Unified card has `$shadow-sm` only -- flat
- No hover effects on field rows
- Avatar has no shadow
- Sign-out button has no shadow
- Minimal visual weight throughout

### Status & Interactions
- Operational status row has a colored background indicator
- Sign-out button is full-width with minimal styling: 1px danger border, no background fill
- Back button is a simple text link with left arrow, no button styling
- Verification badge is static, not interactive
- Fields are read-only with no hover states

## SCSS Override Snippet

```scss
// V3: MyDawa-Inspired -- Pharmacy Profile

.provider-profile {
  background: v.$color-white;
  padding: v.$space-md;

  &::before {
    content: '';
    display: block;
    height: 4px;
    background: v.$color-emerald;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: v.$z-fixed;
  }
}

.profile-container {
  max-width: 480px;
}

.profile-header h1 {
  font-size: 20px;
  font-weight: v.$font-weight-bold;
  color: v.$color-text-primary;
}

.back-button {
  color: v.$color-text-secondary;
  font-weight: v.$font-weight-regular;
  text-decoration: none;
}

.profile-avatar {
  width: 56px;
  height: 56px;
  font-size: v.$font-size-lg;
  margin-bottom: v.$space-md;
}

// Verification badge (requires HTML addition or ::after pseudo on avatar)
.profile-avatar::after {
  content: 'Licensed';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 9px;
  font-weight: v.$font-weight-semibold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: v.$color-emerald;
  color: v.$color-white;
  padding: 2px 8px;
  border-radius: v.$radius-sm;
  white-space: nowrap;
}

// Unified card container -- all field-cards merge into one
.field-card {
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #EDF2F7;
  box-shadow: none;
  padding: 14px v.$space-md;
  margin-bottom: 0;

  &:first-of-type {
    border-top: 1px solid v.$color-border;
    border-top-left-radius: v.$radius-md;
    border-top-right-radius: v.$radius-md;
  }

  &:last-of-type {
    border-bottom: 1px solid v.$color-border;
    border-bottom-left-radius: v.$radius-md;
    border-bottom-right-radius: v.$radius-md;
  }
}

// Wrap all field-cards in a container (if HTML supports it)
// Otherwise, first and last get outer borders + radius, middle get dividers only

.field-label {
  font-size: 11px;
  font-weight: v.$font-weight-semibold;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: v.$color-text-muted;
}

.field-value {
  font-size: 15px;
  font-weight: v.$font-weight-medium;
}

// Registration number in mono
.field-card:nth-of-type(3) .field-value {
  font-family: v.$font-family-mono;
}

// Operational status card gets colored background
.field-card:last-of-type {
  background: v.$color-success-light;
}

.sign-out-button {
  border-width: 1px;
  background: transparent;
  font-weight: v.$font-weight-medium;
  margin-top: v.$space-lg;

  &:hover {
    background: rgba(v.$color-danger, 0.06);
  }
}
```

## Visual Description

The profile page is a compact, app-like card on a white background with the emerald identity strip at top. The avatar is smaller (56px) with a tiny "Licensed" badge beneath it. All field rows are merged into a single unified card: top and bottom rows get rounded corners, internal rows are separated by thin `#EDF2F7` dividers. Labels are 11px uppercase with wide letter-spacing. The registration number renders in monospace. The operational status row has a green-tinted background when operating. The sign-out button is minimally styled: thin 1px danger border, no fill, transparent background until hover. The overall feel is a compact pharmacy storefront info card -- the kind of profile display you'd see on a marketplace or pharmacy network platform.
