# Diagnostics Order Details -- Variation 3: Tenadoc-Inspired

## Design Direction
Competitor-inspired order details drawing from Tenadoc's clean card-based layout, Practo's result-forward presentation with inline reference ranges, and modern LIS specimen lifecycle patterns. The order details page becomes a specimen-centric operations view with a prominent lifecycle pipeline, barcode-style order identification, and result visualization patterns from leading health-tech platforms.

## Competitor Reference

### Tenadoc (Ethiopia)
- Clean single-column card layout with clear section separation
- Doctor/specialty cards with calendar and fee information
- Mobile-first touch-optimized interfaces for Ethiopian mobile users
- Key pattern applied: **single-column stacked cards with clear visual hierarchy and action prominence**

### Practo (India)
- Lab results displayed with test name, result value, reference range inline
- "Complete" status marking with clear visual indicator
- Timeline view for order history
- Key pattern applied: **inline result ranges with visual bar indicators showing normal vs. out-of-range**

### Modern LIS Dashboards
- Specimen lifecycle tracking: Ordered -> Collected -> In Lab -> Results Ready
- Barcode-first specimen identification
- TAT (turnaround time) tracking with countdown timers
- Key pattern applied: **expanded lifecycle pipeline with TAT counter and specimen barcode display**

## Visual Changes

### Colors
- **Pipeline uses 4-color system:**
  - Received: `#2ECC71` emerald (complete)
  - Collected: `#3B82F6` blue
  - In Lab: `#8B5CF6` violet
  - Ready: `#2ECC71` emerald
- **Inactive pipeline steps:** `#E2E8F0` bg with `#94A3B8` text
- **Page background:** `#F1F5F9` (slightly darker for card pop)
- **Patient card:** white with top 2px emerald accent
- **Action buttons:** emerald primary, keep existing colors

### Typography
- **Order ID:** monospace (`$font-family-mono`), 700 weight, 24px -- barcode-like rendering
- **Pipeline step labels:** 12px (up from 10px), 600 weight, sentence case
- **TAT counter (new):** monospace, 14px, 600 weight, muted text, displayed below pipeline
- **Section titles:** 14px, 700 weight, uppercase, `letter-spacing: 0.05em`
- **Test names:** 14px, 600 weight
- **Sample type labels:** 12px, 600 weight with colored dot prefix

### Spacing
- **Pipeline section:** increase padding to 20px vertical, add 16px bottom margin
- **Section margin-bottom:** 24px (standard)
- **Cards:** 16px padding
- **TAT counter area:** 8px padding, centered below pipeline
- **Specimen info section:** 16px padding, inline layout

### Borders
- **Pipeline step icons:** 2px border, 36px diameter
- **Pipeline connectors:** 3px height with rounded caps
- **Cards:** `$radius-lg` (12px) border-radius
- **Patient card:** 2px top emerald border
- **Checklist items:** 1px border, `$radius-md`
- **Result range bar:** increase track to 8px with rounded ends

### Surface
- **Page bg:** `#F1F5F9`
- **Card shadow:** `0 2px 8px rgba(15, 23, 42, 0.06)`
- **Pipeline area:** white card background with shadow, contains both pipeline and TAT
- **Specimen type indicators:** small colored circles (8px) inline with sample requirements
- **Accept button:** full-width with `$shadow-sm` resting, `$shadow-md` hover

### Status
- **Expanded pipeline:** renders inside its own white card with padding, not just as a bare element
- **Pipeline step icons:** 36px with checkmark (completed) or step number (pending)
- **TAT counter:** `font-family-mono`, "Turnaround: 3h 45m" format, displayed below pipeline connector area
- **Specimen barcode display (new concept):** small barcode-style visual next to order ID (decorative SVG pattern, not functional)
- **Result range bar:** 8px track, larger value dot (12px), out-of-range dot adds pulsing red glow

## SCSS Override Snippet

```scss
// V3: Tenadoc-Inspired -- Order Details
// Specimen lifecycle, barcode identity, LIS dashboard patterns

.order-details--v3 {
  background: #F1F5F9;

  // Monospace order ID
  .order-id {
    font-family: v.$font-family-mono;
    font-weight: v.$font-weight-bold;
    letter-spacing: -0.02em;
  }

  // Pipeline in its own card
  .status-pipeline {
    background: v.$color-white;
    border-radius: v.$radius-lg;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
    margin-bottom: v.$space-lg;

    &__step-icon {
      width: 36px;
      height: 36px;
    }

    &__connector {
      height: 3px;
      border-radius: 2px;
    }

    &__step-label {
      font-size: 12px;
      font-weight: v.$font-weight-semibold;
    }
  }

  // Section titles
  .section-title {
    font-size: v.$font-size-base;
    font-weight: v.$font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  // Cards with more radius
  .card {
    border-radius: v.$radius-lg;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
  }

  // Patient card top accent
  .patient-card {
    border-top: 2px solid v.$color-emerald;
    background: v.$color-white;
  }

  // Thicker result range bar
  .result-range-bar__track {
    height: 8px;
  }

  .result-range-bar__value-dot {
    width: 12px;
    height: 12px;

    &--out-of-range {
      box-shadow: 0 0 0 3px rgba(v.$color-danger, 0.2);
    }
  }

  // Accept button
  .btn.btn-primary.btn-full {
    border-radius: v.$radius-lg;
    box-shadow: v.$shadow-sm;

    &:hover {
      box-shadow: v.$shadow-md;
    }
  }
}
```

## Visual Description
The order details page takes cues from specimen tracking dashboards and Ethiopian health-tech card layouts. The order ID renders in monospace font with bold weight, evoking the precision of barcode labels. The status pipeline lives inside its own white card with shadow, elevated from the `#F1F5F9` page background -- a pattern from LIS dashboards where the lifecycle view is the primary interface element. Pipeline steps use 36px icons with 3px rounded connectors. Below the pipeline, a monospace TAT counter shows elapsed turnaround time. The patient card has a thin 2px emerald top-border as an identity accent. Section titles are uppercase with wide letter-spacing, creating strong visual anchors. The result range bars use an 8px track with larger value dots, and out-of-range values gain a subtle red glow ring -- a pattern inspired by Practo's result-forward display. Cards use 12px border-radius throughout for a modern app feel. The overall design balances clinical precision with the clean, card-based layouts of emerging-market health-tech.
