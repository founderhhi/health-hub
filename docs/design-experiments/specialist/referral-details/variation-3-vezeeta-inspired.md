# Referral Details -- V3: Vezeeta-Inspired

## Design Direction
Structured referral review modeled after Vezeeta's patient record and appointment management patterns. The page becomes more form-like and portal-structured: clear field-value pairs in a consistent grid, a progress tracker styled as a horizontal timeline, and clinical actions organized as a toolbar rather than scattered buttons.

## Competitor Reference
**Vezeeta for Doctors:**
- Patient record view: structured field-value layout, not free-form cards
- Appointment details: date, time, clinic, status displayed in uniform grid
- Action buttons: consistently placed at bottom of record view
- Treatment plan: structured template with medication fields
- Confirmation status prominently displayed
- Multi-clinic context: which clinic this appointment belongs to

**Key Patterns Adopted:**
1. **Uniform field-value grid**: All patient and referral info presented in a consistent label/value grid (like a medical form, not loose cards)
2. **Horizontal action toolbar**: Accept, Decline, Order Tests, Prescribe grouped in a single horizontal bar
3. **Timeline stepper**: Stepper styled as a connected horizontal timeline with date labels under each step
4. **Status header bar**: A top status bar showing referral status, urgency, and consultation mode at a glance
5. **Flat, borderless sections**: Sections separated by dividers, not cards -- reducing visual noise

## Visual Changes

### Colors
- Status header bar: full-width `background: #F0FDF4` for accepted, `#FEF3C7` for new, `#FEF2F2` for declined
- Section dividers: `1px solid #E2E8F0` lines between sections instead of card borders
- Field labels: `#64748B` at `11px` uppercase (matching Vezeeta's form field labels)
- Field values: `#0B0F14` at `14px` / `500`
- Action toolbar: `background: #FFFFFF` with `border-top: 1px solid #E2E8F0`
- Stepper line: `#E2E8F0` base, `#2ECC71` filled, `3px` height

### Typography
- Page title: `20px` / `600` (compact portal header)
- Patient name: `18px` / `700` (functional, not decorative)
- Section labels: `11px` / `700` uppercase with `letter-spacing: 0.06em` (form-field style)
- Field values: `14px` / `500` (consistent throughout)
- Clinical summary: `14px` / `400` with `line-height: 1.6` (standard body text)
- Action button labels: `14px` / `600`
- Stepper labels: `10px` / `600` with date underneath at `10px` / `400`

### Spacing
- Remove card padding -- sections use `padding: 16px 0` with divider lines
- Field grid: `16px` column gap, `12px` row gap in a 2-column layout
- Action toolbar: `12px` gap, `56px` height, `16px` horizontal padding
- Stepper: `20px` vertical padding, dots at `20px` diameter
- Section gaps: `0` (divider-separated, not gap-separated)
- Patient header: `12px` gap between avatar and name

### Borders & Radius
- No card borders -- sections are divider-separated
- Action toolbar buttons: `6px` radius
- Patient avatar: circle, `56px` (slightly smaller)
- Stepper dots: `20px` diameter (smaller, more timeline-like)
- Status header bar: `0px` radius (full-width banner)
- Clinical box: `6px` radius, `3px` left border

### Surface & Shadow
- No shadows anywhere -- fully flat portal aesthetic
- Status header bar: flat colored background, no border
- Action toolbar: fixed at bottom of content area (not page-fixed)
- Sections: separated by `1px` horizontal rules
- No hover transforms on info sections

### Status
- Status header bar at top of page: shows "NEW REFERRAL", "ACCEPTED", or "DECLINED" with urgency badge alongside
- Stepper: smaller dots (20px), add date labels under each step showing when that stage was reached
- Action toolbar: primary action (Accept/Open Consultation) gets emerald background, secondary actions get outlined style, danger (Decline) gets red outline
- Clinical box: remove blue background, use simple `border-left: 3px solid #2ECC71` on white background

## SCSS Override Snippet

```scss
// V3: Vezeeta-Inspired -- Referral Details

.referral-details {
  .hhi-provider-container {
    max-width: 640px;
  }
}

.page-title {
  font-size: v.$font-size-xl;
  font-weight: v.$font-weight-semibold;
  margin-bottom: v.$space-md;
}

// Status header bar (new element concept)
.referral-status-bar {
  padding: v.$space-sm v.$space-md;
  margin: 0 calc(-1 * v.$space-md) v.$space-md;
  display: flex;
  align-items: center;
  gap: v.$space-sm;
  font-size: v.$font-size-sm;
  font-weight: v.$font-weight-semibold;

  &--new { background: v.$color-warning-light; color: v.$color-warning-dark; }
  &--accepted { background: v.$color-success-light; color: v.$color-success-dark; }
  &--declined { background: v.$color-danger-light; color: v.$color-danger-dark; }
}

.info-card {
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
}

.section-wrapper {
  margin-bottom: 0;
  padding: v.$space-md 0;
  border-bottom: 1px solid v.$color-border;
}

.section-title {
  font-size: 11px;
  font-weight: v.$font-weight-bold;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: v.$color-text-muted;
  margin-bottom: v.$space-md;
}

.patient-name {
  font-size: v.$font-size-lg;
  font-weight: v.$font-weight-bold;
}

.patient-avatar {
  width: 56px;
  height: 56px;
  font-size: v.$font-size-lg;
}

.patient-info-header {
  gap: 12px;
}

.patient-info-grid {
  gap: 12px v.$space-md;
  grid-template-columns: repeat(2, 1fr);
}

.info-label {
  font-size: 11px;
  letter-spacing: 0.06em;
}

.info-value {
  font-size: v.$font-size-base;
  font-weight: v.$font-weight-medium;
}

.clinical-box {
  background: v.$color-white;
  border-left: 3px solid v.$color-emerald;
  padding: v.$space-md;
}

.clinical-grid {
  gap: 12px v.$space-md;
  grid-template-columns: repeat(2, 1fr);
}

.clinical-label {
  font-size: 11px;
  letter-spacing: 0.06em;
}

.referral-stepper {
  padding: 20px 0;

  &__step-dot {
    width: 20px;
    height: 20px;
  }

  &__line {
    height: 3px;
  }

  &__step-label {
    font-size: 10px;
  }
}

.action-panel {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: v.$space-md;
  padding: v.$space-md 0;
  border-top: 1px solid v.$color-border;
}

.action-btn {
  border-radius: 6px;
  min-height: 44px;
  flex: 0 0 auto;

  &--primary {
    min-height: 44px;
  }

  &--secondary {
    min-height: 44px;
  }
}

.physician-avatar {
  width: 44px;
  height: 44px;
  font-size: v.$font-size-base;
}

.divider {
  display: none; // Use section borders instead
}
```

## Visual Description
The referral details page becomes a structured clinical record form. The status header bar at the top immediately communicates the referral state (new/accepted/declined) in a full-width colored banner. Below, patient info is presented in a clean 2-column grid of label/value pairs separated by section dividers -- not floating cards. All labels are 11px uppercase in muted gray, values in 14px medium weight black. The stepper is compact (20px dots) with a 3px connecting line. The clinical summary uses a simple emerald left-border on white (no blue background). Section dividers replace card boundaries, reducing visual noise. The action panel is a horizontal toolbar with compact 44px buttons: Accept (emerald), Order Tests (outlined), Prescribe (outlined), Decline (red outline). Everything feels like a well-designed medical records system -- structured, scannable, and form-like rather than card-based.
