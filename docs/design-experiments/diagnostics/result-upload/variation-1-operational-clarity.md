# Diagnostics Result Upload -- Variation 1: Operational Clarity

## Design Direction
Sharper form hierarchy, clearer upload status indicators, stronger verification checklist treatment, and bolder action buttons. The result upload page is a critical workflow endpoint -- the lab tech must feel confident that the submission is complete and correct. This variation makes every required field, validation state, and action unmistakably clear.

## Visual Changes

### Colors
- **Dropzone active state:** stronger emerald border (`#166534`), deeper green tint bg (`#DCFCE7`)
- **File preview border:** add 2px left colored border (blue for PDF, pink for image)
- **Verification checkmarks:** emerald fill with white checkmark icon (not just a square)
- **Submit button:** deeper emerald gradient-like feel (`#166534` active)
- **Form labels:** `$color-text-primary` (darker than current secondary)
- **Required field indicator:** small red asterisk next to label

### Typography
- **Page title:** keep 24px / 600
- **Section titles:** 700 weight, uppercase, `letter-spacing: 0.04em`
- **Form labels:** 600 weight (up from 500), 12px
- **File name in preview:** 600 weight, 14px
- **Dropzone title:** 700 weight, 16px
- **Verification text:** 600 weight (up from 400)
- **Progress percent:** 700 weight, 14px

### Spacing
- **Form group margin-bottom:** keep 16px
- **Section margin-bottom:** keep 24px
- **Dropzone padding:** reduce from 48px to 40px (tighter)
- **File preview padding:** keep 16px
- **Verification items padding:** keep 8px
- **Verification items gap:** keep 16px

### Borders
- **Section titles:** 3px left emerald border accent, 8px left padding
- **Dropzone:** 2px dashed border (keep), sharpen radius from `$radius-lg` to `$radius-md`
- **File previews:** 2px left colored border (blue for docs, pink for images)
- **Verification items:** add 1px border, `$radius-md`, `$color-border`
- **Form inputs:** keep current styling, add green focus border (already exists)
- **Progress bar:** increase height from 8px to 10px

### Surface
- **Dropzone hover/dragover:** `#DCFCE7` bg (stronger green tint)
- **File preview hover:** stronger emerald border (not just border-color shift)
- **Verification items:** white background with border (card-like)
- **Verification items checked state:** `$color-emerald-light` background
- **Save Draft button:** stronger secondary treatment (border-color `$color-text-muted`)

### Status
- **Upload progress bar:** 10px height, add animated striping pattern
- **Progress percentage:** bold 700 weight, emerald color
- **Verification checkmark animation:** scale-in effect when checked
- **Submit button:** disabled state more visually distinct (grayed out with cross-hatch pattern text)
- **Status banners:** keep existing treatment, add left colored bar (3px)

## SCSS Override Snippet

```scss
// V1: Operational Clarity -- Result Upload
// Sharper forms, stronger verification, bolder actions

.result-upload--v1 {
  // Section title accents
  .section-title {
    border-left: 3px solid v.$color-emerald;
    padding-left: v.$space-sm;
    font-weight: v.$font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  // Tighter dropzone
  .dropzone {
    border-radius: v.$radius-md;
    padding: 40px;

    &:hover,
    &.dragover {
      background: #DCFCE7;
      border-color: #166534;
    }
  }

  .dropzone-title {
    font-weight: v.$font-weight-bold;
  }

  // File preview left border
  .file-preview {
    border-left: 2px solid v.$color-info;

    &:hover {
      border-left-color: v.$color-emerald;
      border-color: v.$color-emerald;
    }
  }

  // Stronger form labels
  .form-label {
    font-weight: v.$font-weight-semibold;
    color: v.$color-text-primary;
  }

  // Thicker progress bar
  .progress-bar {
    height: 10px;
  }

  .progress-percent {
    font-weight: v.$font-weight-bold;
    font-size: v.$font-size-base;
  }

  // Card-like verification items
  .verification-item {
    background: v.$color-white;
    border: 1px solid v.$color-border;
    border-radius: v.$radius-md;
    padding: v.$space-sm v.$space-md;
  }

  .verification-checkbox:checked ~ .verification-text {
    font-weight: v.$font-weight-semibold;
  }

  .verification-checkbox:checked ~ .verification-checkmark {
    transform: scale(1.1);
    transition: transform 150ms ease;
  }

  .verification-text {
    font-weight: v.$font-weight-semibold;
  }

  // Status banner left accent
  .status-banner {
    border-left: 3px solid v.$color-info;

    &--error {
      border-left-color: v.$color-danger;
    }
  }

  // Submit button active state
  .btn.btn-primary {
    &:active {
      background: #166534;
    }

    &:hover {
      box-shadow: v.$shadow-md;
    }
  }
}
```

## Visual Description
The result upload page is structured for confident, error-free submissions. Section titles carry 3px emerald left-bar accents, creating strong visual anchors that guide the tech through the upload workflow. The dropzone uses a tighter border-radius (8px) and responds to hover with a stronger green tint (#DCFCE7) and deeper border color (#166534). File previews have colored left-edge borders (blue for documents, transitioning to emerald on hover). Form labels are bolder (600 weight, primary text color) so nothing is overlooked. The verification checklist renders each item as a bordered card with a subtle background shift when checked. The progress bar is thicker (10px) with bold percentage text. Status banners gain a 3px left-color accent matching their severity. Every interaction state is pronounced -- this is a page where getting it right matters.
