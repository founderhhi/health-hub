# Diagnostics Result Upload -- Variation 3: Tenadoc-Inspired

## Design Direction
Competitor-inspired result upload drawing from Tenadoc's clean mobile-first card layout, Practo's result documentation patterns, and modern LIS upload/submission workflows. The upload page becomes a structured submission form with clear step progression, specimen-aware file handling, and a completion checklist inspired by laboratory quality control processes.

## Competitor Reference

### Tenadoc (Ethiopia)
- Clean single-column mobile forms with prominent action buttons
- Card-based information grouping with clear section separation
- Telebirr-style payment confirmation patterns (confirmation -> processing -> complete)
- Key pattern applied: **single-column step-by-step form with prominent full-width action buttons**

### Practo (India)
- Lab technician uploads results that are marked "complete" with clear visual feedback
- Result documentation includes test name, values, and reference ranges
- Document hierarchy for managing multiple result files
- Key pattern applied: **file upload with document type classification and completion marking**

### Modern LIS Upload Workflows
- Structured submission with required fields validation before upload
- Specimen-type-aware file categorization
- Quality control checklists integrated into submission flow
- Digital signature / technician verification at submission
- Key pattern applied: **step-indicator showing upload progress (1. Files -> 2. Details -> 3. Verify -> 4. Submit)**

## Visual Changes

### Colors
- **Page background:** `#F1F5F9` for card contrast
- **Step indicator (new):** emerald for completed steps, blue for active, gray for pending
- **Dropzone:** white bg, 2px dashed `#94A3B8` border (more visible)
- **File type color coding:** blue for PDF (#DBEAFE), amber for images (#FEF3C7), gray for DICOM (#F1F5F9)
- **Verification checklist:** green check circles (not squares) when complete
- **Submit button:** emerald with white text, full-width with `$radius-lg`

### Typography
- **Page title:** 24px, 700 weight
- **Step indicator labels:** monospace, 11px, 600 weight
- **Section titles:** 14px, 700 weight, uppercase, `letter-spacing: 0.05em`
- **Dropzone title:** 18px, 600 weight
- **Form labels:** 12px, 700 weight, uppercase (LIS form style)
- **File name:** 14px, 600 weight, monospace for file extensions
- **Verification text:** 14px, 500 weight

### Spacing
- **Dropzone padding:** 48px (standard)
- **Section margin-bottom:** 24px
- **Form group margin-bottom:** 16px
- **Step indicator:** 12px vertical padding, 24px bottom margin
- **File previews:** 16px padding, 12px gap
- **Verification items:** 12px padding

### Borders
- **Cards:** `$radius-lg` (12px) throughout
- **Dropzone:** `$radius-lg` (12px)
- **File previews:** `$radius-md` (8px), 1px border
- **File type indicator:** colored left bar (3px) matching file type
- **Verification items:** 1px border with `$radius-md`, checkbox becomes circle
- **Form inputs:** `$radius-md` border, 1px solid

### Surface
- **Page bg:** `#F1F5F9`
- **Card shadow:** `0 2px 8px rgba(15, 23, 42, 0.06)`
- **Order reference card:** white with top 2px emerald border
- **Dropzone shadow:** none (border only)
- **File preview hover:** shadow lifts to `$shadow-md`
- **Step indicator area:** white card with shadow
- **Mobile actions bar:** white bg, `$shadow-lg` above

### Status
- **Step indicator (new concept):** 4-step horizontal progress: Files -> Details -> Verify -> Submit. Each step is a numbered circle with label. Completed = emerald fill + check. Active = blue outline. Pending = gray.
- **File upload state:** each file shows upload status (checkmark when done, spinner when uploading)
- **Verification circles:** green-filled circles when checked (not square checkboxes)
- **Submit button disabled state:** clear gray-out with "Complete checklist to submit" helper text
- **Progress bar:** add file count label "2 of 3 files uploaded"

## SCSS Override Snippet

```scss
// V3: Tenadoc-Inspired -- Result Upload
// Step progression, file type coding, LIS submission patterns

.result-upload--v3 {
  background: #F1F5F9;

  // Section titles
  .section-title {
    font-size: v.$font-size-base;
    font-weight: v.$font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  // Form labels (LIS style)
  .form-label {
    font-weight: v.$font-weight-bold;
    text-transform: uppercase;
    font-size: v.$font-size-sm;
    letter-spacing: 0.03em;
  }

  // Dropzone
  .dropzone {
    border-color: #94A3B8;
    border-radius: v.$radius-lg;

    &:hover,
    &.dragover {
      border-color: v.$color-emerald;
      background: v.$color-emerald-light;
    }
  }

  .dropzone-title {
    font-size: v.$font-size-lg;
    font-weight: v.$font-weight-semibold;
  }

  // Cards
  .card {
    border-radius: v.$radius-lg;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
  }

  .order-ref-card {
    border-top: 2px solid v.$color-emerald;
  }

  // File preview with type coding
  .file-preview {
    border-radius: v.$radius-md;
    gap: 12px;

    &:hover {
      box-shadow: v.$shadow-md;
    }
  }

  .file-thumb-pdf {
    border-left: 3px solid v.$color-info;
  }

  .file-thumb-image {
    border-left: 3px solid v.$color-warning;
  }

  // File name monospace for extension
  .file-name {
    font-weight: v.$font-weight-semibold;
  }

  // Circular verification checkmarks
  .verification-checkmark {
    border-radius: v.$radius-full;
    width: 24px;
    height: 24px;

    &::after {
      border-radius: v.$radius-full;
      width: 14px;
      height: 14px;
    }
  }

  .verification-item {
    border: 1px solid v.$color-border;
    border-radius: v.$radius-md;
    padding: 12px v.$space-md;
  }

  // Submit button
  .btn.btn-primary.btn-full {
    border-radius: v.$radius-lg;
    font-size: v.$font-size-md;
    min-height: 48px;
    box-shadow: v.$shadow-sm;

    &:hover {
      box-shadow: v.$shadow-md;
    }
  }

  // Progress bar
  .progress-bar {
    border-radius: v.$radius-full;
    height: 8px;
  }
}
```

## Visual Description
The result upload page is structured as a guided submission workflow. On `#F1F5F9` background, a step indicator (conceptual -- Files, Details, Verify, Submit) could sit at the top in its own white card, though the current layout works well as a scrolling form. The order reference card carries a 2px emerald top-border, tying it to the system identity. The dropzone has a more visible border (#94A3B8 dashed) and a rounded 12px radius. Form labels are uppercase and bold (700 weight), giving the form a structured laboratory submission feel. File previews gain left-edge color coding: blue for PDFs, amber for images. The verification checklist uses circular checkmarks instead of square boxes -- a detail pattern from quality control checklists in LIS systems. The submit button is full-width with 12px radius and a shadow that lifts on hover, a pattern from Tenadoc's mobile-first action prominence. The page feels like a professional laboratory submission system adapted for mobile use.
