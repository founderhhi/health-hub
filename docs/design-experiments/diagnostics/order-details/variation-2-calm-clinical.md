# Diagnostics Order Details -- Variation 2: Calm Clinical

## Design Direction
Softer pipeline colors, more whitespace between sections, gentler card treatments, and quieter action hierarchy. The order details page should feel like reading a well-formatted clinical report -- clear, professional, and easy on the eyes during extended use.

## Visual Changes

### Colors
- **Pipeline completed steps:** softer emerald `#34D399` (green-400) instead of full `#2ECC71`
- **Pipeline active step:** `#93C5FD` bg (blue-300) / `#1E40AF` text (softer blue)
- **Pipeline connectors:** completed uses `#86EFAC` (green-300, lighter)
- **Clinical indication box:** lighten blue to `#F0F9FF` bg / `#2563EB` text
- **Instructions card:** lighten amber to `#FFFDF5` bg / `#B45309` text
- **Patient card bg:** `#FAFBFC` instead of `$color-surface-elevated`
- **Section title color:** `$color-text-secondary` (softer than primary)

### Typography
- **Order ID:** keep 24px, reduce weight to 500 (lighter)
- **Section titles:** 500 weight (down from 600), 16px, sentence case (not uppercase)
- **Pipeline step labels:** keep 10px but reduce weight to 500
- **Test names:** keep 500 weight, 14px
- **Result range labels:** keep 10px / 500
- **Instructions:** increase line-height to 1.7
- **Body line-height:** 1.6 throughout

### Spacing
- **Pipeline section:** increase margin-bottom from 24px to 32px
- **Section margin-bottom:** increase from 24px to 32px
- **Checklist item padding:** increase from 16px to 20px
- **Patient card padding:** increase from 16px to 20px
- **Actions section margin-top:** increase from 32px to 48px
- **Details container padding:** increase to 32px on desktop

### Borders
- **All borders:** lighten to `#EDF2F7`
- **Pipeline step icons border:** reduce to 1.5px (softer)
- **Checklist items:** remove hover border-color change; keep subtle border
- **Patient card:** no left accent, uniform border
- **Cards:** border-radius increase to `$radius-lg` (12px)
- **Result range bar:** no visual change

### Surface
- **Card shadow:** reduce to `0 1px 2px rgba(15, 23, 42, 0.02)`
- **Checklist items hover:** `#FAFBFC` background (barely visible shift)
- **Instructions card shadow:** none (border only)
- **Clinical indication box shadow:** none
- **Accept button hover:** gentle shadow-sm, no scale effect
- **Overall:** more matte, paper-like feel

### Status
- **Pipeline step icons:** keep 32px, softer fill colors
- **Pipeline connector:** keep 2px, lighter fill
- **No animation on active step:** static colored circle
- **Badge on order title (if shown):** borderless pill, soft tint
- **Result range bar:** keep 6px track, softer normal-zone green (`rgba(#34D399, 0.2)`)

## SCSS Override Snippet

```scss
// V2: Calm Clinical -- Order Details
// Softer surfaces, more whitespace, quieter hierarchy

.order-details--v2 {
  .details-container {
    padding: 32px;
  }

  // Lighter order ID
  .order-id {
    font-weight: v.$font-weight-medium;
  }

  // Softer section titles
  .section-title {
    font-weight: v.$font-weight-medium;
    color: v.$color-text-secondary;
  }

  // Softer pipeline
  .status-pipeline {
    margin-bottom: 32px;

    &__step-icon {
      border-width: 1.5px;
    }

    &__step--complete &__step-icon {
      background: #34D399;
      border-color: #34D399;
    }

    &__step--active &__step-icon {
      background: #93C5FD;
      border-color: #93C5FD;
      color: #1E40AF;
    }

    &__connector--complete {
      background: #86EFAC;
    }
  }

  // More breathing room in sections
  .section {
    margin-bottom: 32px;
  }

  // Rounder, softer cards
  .card {
    border-color: #EDF2F7;
    border-radius: v.$radius-lg;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.02);
  }

  // Spacious checklist items
  .checklist-item {
    padding: 20px;
    border-color: #EDF2F7;
    border-radius: v.$radius-lg;

    &:hover {
      background: #FAFBFC;
      border-color: #EDF2F7;
    }
  }

  // Patient card
  .patient-card {
    background: #FAFBFC;
  }

  // Lighter clinical box
  .info-box-clinical {
    background: #F0F9FF;
    border-color: #BFDBFE;
    color: #2563EB;
  }

  // Lighter instructions
  .instructions-card {
    background: #FFFDF5;
    border-color: #FEF3C7;
  }

  // Actions section more spaced
  .actions-section {
    margin-top: 48px;
  }

  // Softer result range
  .result-range-bar__normal-zone {
    background: rgba(#34D399, 0.2);
  }

  .result-range-bar__value-dot {
    background: #34D399;
  }
}
```

## Visual Description
The order details page feels like a thoughtfully formatted clinical document. The status pipeline uses softer greens (#34D399) and blues (#93C5FD) that communicate state without demanding attention. Section titles are medium-weight (500) in secondary text color, acting as quiet organizers rather than bold headers. Cards use 12px border-radius with nearly invisible borders (#EDF2F7) and barely-there shadows, creating a layered-paper effect. Checklist items have generous 20px padding and only the subtlest background shift on hover. The clinical indication and instruction cards use even lighter tints of their respective colors. The actions section sits 48px below the content, with ample breathing room. Everything feels spacious, professional, and restful -- a calm environment for careful clinical work.
