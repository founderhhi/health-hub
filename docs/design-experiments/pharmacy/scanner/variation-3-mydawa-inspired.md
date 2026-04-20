# Pharmacy Scanner -- V3: MyDawa-Inspired

## Design Direction

Inspired by **MyDawa** (Kenya's leading online pharmacy, 40+ stores, $9.6M raised) and general pharmacy e-commerce UX patterns. MyDawa's approach emphasizes: prescription upload as a clear first step, order tracking with visible status progression, clean prescription cards with product-like clarity, and delivery step indicators. This variation adapts those patterns for a pharmacist-facing scanner -- treating the prescription lookup like an order intake flow with clear step progression and status-forward card layouts.

## Competitor Reference

**MyDawa key patterns observed:**
- Prescription upload as a prominent, guided first action (upload photo/scan, professional reviews, items auto-added)
- Order tracking with unique order number and SMS confirmation -- status is always visible
- Delivery time estimates shown prominently (4 hours Nairobi, 24 hours upcountry)
- Payment method variety displayed as trust signals (M-PESA, Visa, Mastercard)
- Clean product card layouts with clear naming, dosage, and pricing

**mPharma / pharmacy management dashboard patterns:**
- Data-dense but clean inventory tracking layouts
- Status-first card designs with left-border color coding
- Responsive auto-layout designs that adapt from desktop to mobile
- Light and dark mode support with consistent variable systems

**General pharmacy UI patterns (2025):**
- Smart prescription scanning with guided frame and text extraction confirmation
- Real-time order status displayed on timeline/stepper
- Large, accessible buttons and clear labels for elderly/stressed users
- Security badges and verification indicators prominently placed

## Visual Changes

### Colors
- Page background uses a clean white (`#FFFFFF`) instead of `$color-surface` -- e-commerce feel
- Scanner frame gets a blue-emerald accent: border uses `$color-emerald` but inner highlight ring uses `#1D4ED8` (info blue) as a secondary accent, nodding to MyDawa's blue
- A thin top status bar area in `$color-emerald` at 4px height across the full width -- pharmacy identity strip
- Recent scans cards gain a left border accent: 3px solid `$color-emerald` for completed, 3px solid `$color-warning` for pending
- Manual input section background uses `#FAFBFC` instead of white -- subtle differentiation

### Typography
- Page title stays Inter but at 22px (slightly smaller than 24px) -- e-commerce scale
- A new "step label" pattern: above the scanner, a small uppercase label "STEP 1: SCAN OR ENTER CODE" in `$font-size-xs`, weight 600, `$color-text-muted`, letter-spacing wide
- Recent scan item titles use `$font-size-sm` (12px) mono font for prescription codes -- technical precision
- Status text uses weight 600 in uppercase at 10px

### Spacing
- Scanner container max-width narrows from 900px to 800px -- tighter, more app-like
- Page header gains a bottom border: `1px solid #EDF2F7` with 16px bottom padding -- section separation
- Manual input row gap tightens from `$space-sm` to 6px -- denser input group
- Recent scan items tighten padding to 14px vertical -- list density

### Borders & Radius
- Scanner frame uses a double-border treatment: outer 2px solid emerald, inner (via box-shadow) 1px inset `rgba(29, 78, 216, 0.15)`
- Cards use `$radius-md` (8px) consistently -- no rounding up
- Status badges use sharp `$radius-sm` (4px) corners instead of pill shape -- more operational
- Lookup button uses `$radius-md` (8px) -- matching cards

### Surface & Shadows
- Scanner frame shadow: `0 2px 8px rgba(15, 23, 42, 0.06)` -- lighter than default
- Cards use `$shadow-sm` only -- flat, clean, e-commerce
- No shadow on recent scans list -- relies on border only
- Dialog uses a clean `0 12px 24px rgba(0, 0, 0, 0.2)` -- less dramatic

### Status & Interactions
- Lookup button is solid emerald with dark text (matching existing) but adds a subtle inner shadow: `inset 0 1px 0 rgba(255,255,255,0.2)` -- depth cue
- Recent scan items show a step-indicator dot before the code: 8px circle, colored by status (green=processed, amber=pending)
- Scan success uses a simpler checkmark animation -- no expanding ring, just fade-in check at 40px
- Toast message sits at top of page (not bottom) -- notification bar pattern common in e-commerce

## SCSS Override Snippet

```scss
// V3: MyDawa-Inspired -- Pharmacy Scanner
// Overlay on top of existing pharmacy-scanner.scss

.pharmacy-scanner {
  background: v.$color-white;

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

.scanner-container {
  max-width: 800px;
}

.page-header {
  padding-bottom: v.$space-md;
  border-bottom: 1px solid #EDF2F7;
}

.page-title {
  font-size: 22px;
}

// Step label (requires HTML addition or ::before pseudo)
.scanner-frame-wrapper::before {
  content: 'STEP 1: SCAN OR ENTER CODE';
  display: block;
  font-family: v.$font-family-primary;
  font-size: v.$font-size-xs;
  font-weight: v.$font-weight-semibold;
  color: v.$color-text-muted;
  letter-spacing: v.$letter-spacing-wide;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: v.$space-sm;
}

.scanner-frame {
  border: 2px solid v.$color-emerald;
  border-style: solid;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06), inset 0 0 0 1px rgba(29, 78, 216, 0.15);
}

.manual-input-section {
  background: #FAFBFC;
}

.manual-input-row {
  gap: 6px;
}

.lookup-button {
  border-radius: v.$radius-md;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.recent-scans-list {
  box-shadow: none;
}

.recent-scan-item {
  padding: 14px v.$space-md;
  border-left: 3px solid v.$color-emerald;

  &__title {
    font-family: v.$font-family-mono;
    font-size: v.$font-size-sm;
  }

  &__badge {
    border-radius: v.$radius-sm;
    font-size: 10px;
    font-weight: v.$font-weight-semibold;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
}

.scan-success-overlay {
  &__ring {
    display: none; // remove expanding ring
  }

  &__check {
    animation: hhi-fade-in-up 250ms ease-out both; // simpler fade-in
  }
}

.details-dialog {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.toast-message {
  top: 12px;
  bottom: auto;
  left: 50%;
  transform: translateX(-50%);
}
```

## Visual Description

The page opens on a clean white background with a thin 4px emerald identity strip fixed at the top -- a subtle pharmacy branding element borrowed from e-commerce header patterns. The page header has a bottom border separator. Above the scanner frame, a small uppercase step label reads "STEP 1: SCAN OR ENTER CODE" -- guiding the pharmacist through a clear intake flow. The scanner frame has a solid emerald border with a faint blue inner glow, referencing MyDawa's blue accent. The manual input section sits on a barely-there grey background for differentiation. Recent scans use a left-border accent pattern (emerald for processed) with prescription codes rendered in monospace for technical precision. Status badges are sharp-cornered and uppercase. The overall feel is clean, app-like, and transactional -- a pharmacist's order intake tool that borrows the clarity of e-commerce without losing clinical credibility.
