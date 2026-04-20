# Diagnostics Order Details -- Variation 1: Operational Clarity

## Design Direction
Sharper status pipeline, stronger section separation, bolder action buttons, and denser information grouping. This variation treats the order details page as an active workstation where the lab tech needs to quickly assess order state, verify patient info, check test requirements, and take action -- all without scrolling excessively.

## Visual Changes

### Colors
- **Status pipeline completed steps:** deeper emerald fill (`#166534` bg instead of `#2ECC71`) for stronger contrast
- **Active step:** `#1D4ED8` bg with white text/icon (bold blue, not light blue bg)
- **Pipeline connectors completed:** `#166534` (darker emerald)
- **Clinical indication box:** keep blue info treatment
- **Instructions card:** keep amber warning treatment
- **Action button (Accept):** stronger emerald hover, `#166534` active state
- **Section title color:** `$color-text-primary` with a subtle emerald left-bar accent

### Typography
- **Order ID (h1):** increase to 700 weight (from 600), keep 24px
- **Section titles:** 600 weight, 16px, uppercase with `letter-spacing: 0.04em`
- **Pipeline step labels:** increase from 10px to 11px, 700 weight
- **Test names in checklist:** 600 weight (up from 500)
- **Result range labels:** keep 10px but increase weight to 600
- **Instructions list items:** keep 14px/400

### Spacing
- **Pipeline section:** increase vertical padding from 12px to 16px
- **Section margin-bottom:** keep 24px
- **Checklist item padding:** keep 16px
- **Patient card padding:** keep 16px
- **Actions section margin-top:** keep 32px

### Borders
- **Section titles:** add 3px left emerald border, 8px left padding (operational accent)
- **Pipeline step icons:** increase border width from 2px to 3px
- **Checklist items:** add 2px left border, transparent by default, emerald when checkbox is checked
- **Patient card:** add subtle 1px left emerald border
- **Result range bar track:** increase height from 6px to 8px

### Surface
- **Patient card:** keep `$color-surface-elevated` background
- **Checklist items hover:** more pronounced -- `$color-emerald-light` background
- **Instructions card:** keep amber background
- **Status banner:** keep existing treatments
- **Accept button:** slightly larger shadow on hover (`$shadow-md`)

### Status
- **Pipeline step icons:** increase size from 32px to 36px for better touch targets
- **Pipeline connector thickness:** increase from 2px to 3px
- **Active step:** pulsing dot animation (subtle, 2s cycle) to draw attention
- **Completed steps:** checkmark icon rendered at 18px (up from 16px)
- **Result range bar value dot:** increase from 10px to 12px

## SCSS Override Snippet

```scss
// V1: Operational Clarity -- Order Details
// Sharper pipeline, bolder sections, operational accents

.order-details--v1 {
  // Bolder order ID
  .order-id {
    font-weight: v.$font-weight-bold;
  }

  // Section title left accent
  .section-title {
    border-left: 3px solid v.$color-emerald;
    padding-left: v.$space-sm;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  // Larger pipeline steps
  .status-pipeline {
    padding: 16px 0;

    &__step-icon {
      width: 36px;
      height: 36px;
      border-width: 3px;
    }

    &__step-label {
      font-size: 11px;
      font-weight: v.$font-weight-bold;
    }

    &__connector {
      height: 3px;
    }

    &__step--complete &__step-icon {
      background: #166534;
      border-color: #166534;
    }

    &__step--active &__step-icon {
      background: v.$color-info;
      border-color: v.$color-info;
      color: white;
      animation: pulse-step 2s ease-in-out infinite;
    }

    &__connector--complete {
      background: #166534;
    }
  }

  @keyframes pulse-step {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.08); }
  }

  // Checklist left accent
  .checklist-item {
    border-left: 2px solid transparent;
    transition: border-color v.$transition-fast, background v.$transition-fast;

    &:hover {
      background: v.$color-emerald-light;
    }
  }

  .checkbox-input:checked ~ .test-info {
    // parent checklist-item gets emerald left border via JS class or :has()
  }

  // Bolder test names
  .test-name {
    font-weight: v.$font-weight-semibold;
  }

  // Thicker result range bar
  .result-range-bar__track {
    height: 8px;
  }

  .result-range-bar__value-dot {
    width: 12px;
    height: 12px;
    top: -2px;
  }

  // Patient card left accent
  .patient-card {
    border-left: 2px solid v.$color-emerald;
  }

  // Accept button enhancement
  .btn.btn-primary {
    &:hover {
      box-shadow: v.$shadow-md;
    }

    &:active {
      background: #166534;
    }
  }
}
```

## Visual Description
The order details page reads like a focused operations panel. The status pipeline at the top uses larger step icons (36px) with thicker connectors (3px) and deeper emerald fills on completed steps, making progression impossible to miss. The active step pulses gently to indicate where attention is needed. Section titles carry a 3px emerald left-bar accent with uppercase text, creating strong visual anchors as the user scrolls. The patient card has a subtle emerald left border, tying it visually to the health system's identity. Checklist items gain a left-border accent on hover (emerald-light background), and the result range bar uses a thicker track (8px) with a larger value dot (12px) for clearer data visualization. The Accept button has a deeper active state (#166534) and a shadow lift on hover. Every element feels purposeful and action-ready.
