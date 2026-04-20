# Referral Details -- V1: Operational Clarity

## Design Direction
Stronger stepper, denser info sections, sharper clinical summary treatment, and a more prominent action panel. The referral details page is a decision point -- the specialist must quickly assess the referral, understand the clinical context, and take action. This variation sharpens every element toward faster decision-making.

## Visual Changes

### Colors
- Stepper dots (complete): switch from `#22C55E` to brand emerald `#2ECC71` for consistency
- Stepper active dot ring: increase ring opacity from `0.2` to `0.3` for stronger visibility
- Clinical summary box: keep blue-left border but darken background to `#EFF6FF` (slightly more saturated blue tint)
- Action panel: add `background: #FAFBFC` to separate it visually from the content area
- Urgency badges: use sharper colors -- routine `#DCFCE7`/`#166534`, urgent `#FEF3C7`/`#92400E`, emergency `#FEE2E2`/`#991B1B`
- Info labels: darken from `#64748B` to `#475569` for better readability

### Typography
- Page title "Referral Details": increase to `24px` / `700` with tight letter-spacing `-0.02em`
- Patient name: increase to `22px` / `700` for strong identification
- Section titles: increase to `15px` / `700` with `letter-spacing: 0.03em` uppercase
- Info labels: increase to `12px` / `600` (from `11px` / `500`) for sharper legibility
- Info values: increase weight to `600` (from `500`) for stronger data anchoring
- Clinical text: keep `14px` but increase line-height to `1.7`
- Physician name: increase to `16px` / `700`

### Spacing
- Patient info card padding: reduce from `16px` to `14px` for tighter density
- Patient info grid gap: reduce from `16px` to `12px`
- Clinical grid gap: reduce from `16px` to `12px`
- Section wrapper margin-bottom: reduce from `24px` to `20px`
- Action panel gap: reduce from `16px` to `12px`
- Stepper padding: reduce from `24px 0` to `16px 0`

### Borders & Radius
- Info cards: reduce radius from `8px` to `6px` for sharper look
- Clinical box: keep `0 8px 8px 0` radius but increase left border from `4px` to `5px`
- Patient avatar: keep circle
- Action buttons: reduce radius from `8px` to `6px`
- Stepper dots: keep circle, increase from `24px` to `28px` for better touch target
- Schedule form: reduce radius from `8px` to `6px`

### Surface & Shadow
- Info cards: remove shadow, use `border: 1px solid #E2E8F0` only
- Action panel: add `background: #FAFBFC` with `border-top: 2px solid #E2E8F0` (thicker separator)
- Patient info card: add `border-left: 4px solid #2ECC71` for emerald accent
- Schedule form: no shadow, border only
- Request info form: no shadow, border only

### Status
- Stepper line fill: increase thickness from `2px` to `3px`
- Stepper step dots: increase to `28px` diameter
- Stepper complete dots: add checkmark icon (currently empty)
- Appointment status in clinical grid: add colored dot before value text (green=ready, amber=pending)
- Action buttons: primary `48px` min-height kept, add `font-weight: 700` for stronger CTA

## SCSS Override Snippet

```scss
// V1: Operational Clarity -- Referral Details

.page-title {
  font-size: v.$font-size-2xl;
  font-weight: v.$font-weight-bold;
  letter-spacing: -0.02em;
}

.patient-name {
  font-size: 22px;
  font-weight: v.$font-weight-bold;
}

.section-title {
  font-size: 15px;
  font-weight: v.$font-weight-bold;
  letter-spacing: 0.03em;
}

.info-label {
  font-size: v.$font-size-sm;
  font-weight: v.$font-weight-semibold;
  color: v.$color-text-secondary;
}

.info-value {
  font-weight: v.$font-weight-semibold;
}

.info-card {
  box-shadow: none;
  border: 1px solid v.$color-border;
  border-radius: 6px;
}

.patient-info-card {
  border-left: 4px solid v.$color-emerald;
}

.patient-info-grid {
  gap: 12px;
}

.clinical-box {
  background: #EFF6FF;
  border-left-width: 5px;
}

.clinical-text {
  line-height: 1.7;
}

.clinical-grid {
  gap: 12px;
}

.section-wrapper {
  margin-bottom: 20px;
}

.referral-stepper {
  padding: v.$space-md 0;

  &__line {
    height: 3px;
  }

  &__step-dot {
    width: 28px;
    height: 28px;
  }
}

.action-panel {
  gap: 12px;
  background: #FAFBFC;
  padding: v.$space-lg;
  border-radius: 6px;
  border-top: 2px solid v.$color-border;
}

.action-btn {
  border-radius: 6px;

  &--primary {
    font-weight: v.$font-weight-bold;
  }
}

.physician-name {
  font-size: v.$font-size-md;
  font-weight: v.$font-weight-bold;
}

.urgency-badge {
  &--routine {
    background: #DCFCE7;
    color: #166534;
  }

  &--urgent {
    background: #FEF3C7;
    color: #92400E;
  }

  &--emergency {
    background: #FEE2E2;
    color: #991B1B;
  }
}
```

## Visual Description
The referral details page is tightened for rapid clinical assessment. The patient info card has an emerald left-border accent, anchoring the patient identity section. Info labels are darker and bolder, values use semibold weight for immediate readability. The clinical summary box has a slightly deeper blue tint and thicker left border. The stepper uses larger 28px dots with a 3px connecting line for clearer progress visualization. Section titles are 15px uppercase bold, serving as strong waypoints as the specialist scrolls. The action panel sits on a subtle gray background with a thick top border, separating decisions from information. Action buttons use 6px radius for a sharper, more decisive feel. The overall page reads like a well-structured clinical brief -- information is dense but organized, and every action is clearly accessible.
