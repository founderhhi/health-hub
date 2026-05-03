# Diagnostics Result Upload -- Variation 2: Calm Clinical

## Design Direction
Softer form treatment, gentler dropzone interaction, more whitespace in the form layout, and a quieter verification checklist. The upload page should feel like a calm, focused workspace -- methodical rather than urgent, with clear steps but no visual pressure.

## Visual Changes

### Colors
- **Dropzone border:** lighter dashed `#CBD5E1` (softer than `$color-border`)
- **Dropzone hover/dragover:** `#F0FDF4` bg (very light green), border `#86EFAC`
- **File preview bg:** `#FAFBFC` instead of `$color-surface-elevated`
- **Verification checkmark fill:** `#34D399` (softer green)
- **Form label color:** `$color-text-muted` (lighter than secondary)
- **Section title color:** `$color-text-secondary`
- **Progress bar fill:** `#34D399` (softer green)

### Typography
- **Page title:** keep 24px, reduce to 500 weight
- **Section titles:** 500 weight, 16px, sentence case
- **Form labels:** 400 weight (lighter), 12px
- **Dropzone title:** 500 weight, 16px
- **Dropzone text:** keep 12px, lighter color `$color-text-light`
- **Verification text:** 400 weight, 14px
- **File name:** 500 weight
- **Line-height:** 1.6 on all body text

### Spacing
- **Dropzone padding:** increase from 48px to 56px
- **Form group margin-bottom:** increase from 16px to 20px
- **Section margin-bottom:** increase from 24px to 32px
- **File preview gap:** increase from 16px to 20px
- **Verification items gap:** increase from 16px to 20px
- **Actions section margin-top:** increase from 32px to 48px
- **Upload container padding:** increase to 32px desktop

### Borders
- **All borders:** lighten to `#EDF2F7`
- **Dropzone:** lighter dashed border, increase radius to 16px (`$radius-xl`)
- **File previews:** remove left colored accent, uniform `#EDF2F7` border
- **File preview radius:** increase to `$radius-lg` (12px)
- **Verification items:** no border, just padding
- **Form inputs border:** lighten to `#E2E8F0`, focus border `#34D399` (softer green)
- **Cards radius:** increase to `$radius-lg` (12px)

### Surface
- **Card shadows:** reduce to `0 1px 2px rgba(15, 23, 42, 0.02)`
- **Dropzone:** no shadow, border only
- **File preview hover:** lighten to `#FAFBFC` bg, border stays `#EDF2F7`
- **Verification items hover:** `#FAFBFC` bg (subtle)
- **Order reference card:** `#FAFBFC` bg, no shadow
- **Save Draft button:** softer border (`#E2E8F0`)
- **Submit button:** keep emerald but soften hover (no shadow lift)

### Status
- **Progress bar:** keep 8px height, softer track `#EDF2F7`, softer fill `#34D399`
- **Progress percentage:** 500 weight, `#34D399` color
- **Verification checkmark:** subtle fade-in (no scale effect)
- **Status banners:** remove shadow, softer border colors
- **Upload progress:** gentler animation (no striping)

## SCSS Override Snippet

```scss
// V2: Calm Clinical -- Result Upload
// Softer forms, more breathing room, quieter interactions

.result-upload--v2 {
  .upload-container {
    padding: 32px;
  }

  // Softer page title
  .page-header .page-title {
    font-weight: v.$font-weight-medium;
  }

  // Quieter section titles
  .section-title {
    font-weight: v.$font-weight-medium;
    color: v.$color-text-secondary;
  }

  // Softer, rounder dropzone
  .dropzone {
    border-color: #CBD5E1;
    border-radius: v.$radius-xl;
    padding: 56px;

    &:hover,
    &.dragover {
      background: #F0FDF4;
      border-color: #86EFAC;
    }
  }

  // Lighter form labels
  .form-label {
    font-weight: v.$font-weight-regular;
    color: v.$color-text-muted;
  }

  // Increased form spacing
  .form-group {
    margin-bottom: 20px;
  }

  .section {
    margin-bottom: 32px;
  }

  // Softer file previews
  .file-preview {
    border-color: #EDF2F7;
    border-radius: v.$radius-lg;
    background: #FAFBFC;
    gap: 20px;

    &:hover {
      border-color: #EDF2F7;
      background: v.$color-white;
    }
  }

  // Borderless verification
  .verification-item {
    border: none;
    padding: v.$space-sm;
    gap: 20px;

    &:hover {
      background: #FAFBFC;
    }
  }

  .verification-checkmark::after {
    background: #34D399;
  }

  // Softer progress
  .progress-bar {
    background: #EDF2F7;
  }

  .progress-fill {
    background: #34D399;
  }

  .progress-percent {
    font-weight: v.$font-weight-medium;
    color: #34D399;
  }

  // Cards
  .card {
    border-color: #EDF2F7;
    border-radius: v.$radius-lg;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.02);
  }

  // Actions section
  .actions-section {
    margin-top: 48px;
  }

  // Softer badges
  .badge-urgent {
    border: none;
    background: #FFFBEB;
    color: #A16207;
  }
}
```

## Visual Description
The result upload page is a serene, spacious workspace. The dropzone uses a rounded 16px border-radius with a soft dashed border (#CBD5E1) that shifts to a whisper of green (#F0FDF4) on hover, inviting interaction without demanding it. Form labels are light-weight (400) in muted text color, keeping attention on the input values rather than the labels. Sections are separated by 32px gaps, and the overall container has 32px padding on desktop. File previews sit on #FAFBFC backgrounds with nearly invisible borders and generous 20px gaps between them. The verification checklist is borderless -- just clean text with checkmarks that fade in smoothly. The progress bar uses a softer green (#34D399) on a barely-visible track (#EDF2F7). Everything breathes, nothing crowds, and the tech can focus on accuracy without visual fatigue.
