# Referral Details -- V2: Premium Guided

## Design Direction
A more polished, breathing referral review experience. The specialist is making an important clinical decision -- the page should feel calm, authoritative, and well-organized. Richer card depth, Fraunces headings, smoother stepper, and more generous spacing create a premium clinical document feel.

## Visual Changes

### Colors
- Patient avatar gradient: richer `linear-gradient(135deg, #2ECC71 0%, #15803D 100%)` with `box-shadow: 0 4px 12px rgba(46, 204, 113, 0.2)`
- Clinical summary box: soften to `background: #F0F9FF` with `border-left: 4px solid #3B82F6` (brighter blue)
- Page background: warm to `#FAFAF8`
- Info card hover: subtle `background: #FEFDFB` on hover (warm white shift)
- Stepper complete: emerald with `box-shadow: 0 2px 8px rgba(34, 197, 94, 0.2)` glow
- Stepper active ring: `box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.15)` (wider, softer)

### Typography
- Page title: `'Fraunces', serif` at `24px` / `700` with `-0.02em` letter-spacing
- Patient name: `'Fraunces', serif` at `22px` / `600`
- Section titles: `'Fraunces', serif` at `16px` / `600` (mixed case, not uppercase) for elegant headers
- Clinical text: `15px` with `line-height: 1.7` for comfortable reading
- Physician name: `16px` / `600` (Fraunces serif)
- Stepper labels: `12px` / `600` with `letter-spacing: 0.02em`

### Spacing
- Info card padding: increase to `20px`
- Patient info header gap: increase to `20px`
- Section wrapper margin: increase to `28px`
- Clinical grid gap: increase to `20px`
- Action panel gap: increase to `20px`
- Action panel padding-top: increase to `28px`
- Stepper padding: increase to `28px 0`
- Patient info grid gap: increase to `20px`

### Borders & Radius
- Info cards: increase radius to `12px`
- Patient info card: `16px` radius
- Clinical box: `0 12px 12px 0` radius (rounder right corners)
- Action buttons: increase radius to `12px`
- Schedule form: increase radius to `12px`
- Request info form: increase radius to `12px`
- Stepper dots: increase to `28px` with smoother transition
- Physician avatar: keep circle, increase to `52px` (from `48px`)

### Surface & Shadow
- Info cards: add shadow `0 2px 8px rgba(15, 23, 42, 0.05)` with hover `0 4px 16px rgba(15, 23, 42, 0.1)`
- Patient info card: shadow `0 4px 12px rgba(15, 23, 42, 0.06)` (slightly deeper as hero card)
- Action buttons: primary gets `box-shadow: 0 2px 8px rgba(46, 204, 113, 0.2)` for emerald glow
- Cards: add `transition: box-shadow 200ms ease, transform 200ms ease`
- Info cards on hover: `transform: translateY(-1px)`

### Status
- Stepper: smoother animation on fill bar `transition: width 0.5s ease-in-out`
- Stepper complete dots: subtle scale animation on load `animation: stepComplete 0.3s ease-out`
- Action primary button: add hover scale `transform: scale(1.01)` for micro-interaction
- Urgency badges: increase padding to `4px 12px` for more generous sizing

## SCSS Override Snippet

```scss
// V2: Premium Guided -- Referral Details

.referral-details {
  background: #FAFAF8;
}

.page-title {
  font-family: 'Fraunces', serif;
  font-size: v.$font-size-2xl;
  font-weight: v.$font-weight-bold;
  letter-spacing: -0.02em;
}

.patient-name {
  font-family: 'Fraunces', serif;
  font-size: 22px;
  font-weight: v.$font-weight-semibold;
}

.section-title {
  font-family: 'Fraunces', serif;
  font-size: v.$font-size-md;
  font-weight: v.$font-weight-semibold;
  text-transform: none;
  letter-spacing: normal;
}

.physician-name {
  font-family: 'Fraunces', serif;
}

.info-card {
  border-radius: v.$radius-lg;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
  transition: box-shadow 200ms ease, transform 200ms ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.1);
    transform: translateY(-1px);
  }
}

.patient-info-card {
  border-radius: v.$radius-xl;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
}

.patient-avatar {
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.2);
}

.patient-info-header {
  gap: 20px;
}

.patient-info-grid {
  gap: 20px;
}

.clinical-box {
  background: #F0F9FF;
  border-left-color: #3B82F6;
  border-radius: 0 v.$radius-lg v.$radius-lg 0;
}

.clinical-text {
  font-size: 15px;
  line-height: 1.7;
}

.clinical-grid {
  gap: 20px;
}

.section-wrapper {
  margin-bottom: 28px;
}

.referral-stepper {
  padding: 28px 0;

  &__step-dot {
    width: 28px;
    height: 28px;
    transition: all 300ms ease;
  }

  &__step--complete .referral-stepper__step-dot {
    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.2);
  }

  &__step--active .referral-stepper__step-dot {
    box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.15);
  }

  &__line-fill {
    transition: width 0.5s ease-in-out;
  }
}

.physician-avatar {
  width: 52px;
  height: 52px;
}

.action-panel {
  gap: 20px;
  padding-top: 28px;
}

.action-btn {
  border-radius: v.$radius-lg;

  &--primary {
    box-shadow: 0 2px 8px rgba(46, 204, 113, 0.2);
    transition: all 200ms ease;

    &:hover:not(:disabled) {
      transform: scale(1.01);
    }
  }
}

.urgency-badge {
  padding: 4px 12px;
}

.schedule-form,
.request-info-form {
  border-radius: v.$radius-lg;
}
```

## Visual Description
The referral details page reads like a premium clinical document. The page title and patient name are set in Fraunces serif, lending authority without being decorative. Section titles use mixed-case Fraunces at 16px -- elegant waypoints that guide the eye without shouting. The patient info card is the hero element with a 16px radius and slightly deeper shadow, the avatar glowing with an emerald shadow. Info cards lift gently on hover with a smooth 1px translateY. The clinical summary box has a brighter blue accent and rounded right corners. The stepper dots are larger with softer active rings and subtle glow on completion. The action panel uses generous 20px gaps with 12px radius buttons, the primary action carrying an emerald shadow glow. The warm `#FAFAF8` background ties everything together with a sense of quiet quality. The page feels like it was designed for a specialist who expects their tools to match their expertise.
