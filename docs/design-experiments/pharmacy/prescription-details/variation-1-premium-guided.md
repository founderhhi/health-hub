# Prescription Details -- V1: Premium Guided

## Design Direction

The prescription details page is where a pharmacist verifies, checks, and dispenses medication. This variation elevates it into a **confident verification experience** -- the prescription card feels substantial, the progress bar is a premium visual element, medication cards have richer depth, and the sticky footer CTA commands attention with gradient treatment. The prescriber section feels like a trust credential.

## Visual Changes

### Colors
- Page background adds a faint top gradient: `linear-gradient(180deg, #ECFDF3 0%, #F8FAFC 80px)`
- Progress bar fill uses a richer gradient: `linear-gradient(90deg, #2ECC71, #AEEA00)` with a subtle pulsing glow
- Prescriber avatar gets a gradient background: `linear-gradient(135deg, #2ECC71, #27AE60)`
- Privacy badge verified variant uses a slightly deeper green background: `#DCFCE7`
- Medication card hover border uses `#27AE60` (darker emerald) instead of `$color-emerald`

### Typography
- Prescription ID (`h1`) uses `'Fraunces', serif` at 28px, weight 600 -- the hero moment
- Section titles ("Medications", "Prescriber", "Privacy & Verification") use Fraunces at 17px, weight 500
- Prescriber name uses weight 700 instead of 600 -- more authoritative
- Patient identifier line-height relaxes to 1.6

### Spacing
- Prescription container padding increases from `$space-md $space-lg` to `$space-lg $space-xl` on desktop
- Medications section gap increases from `$space-md` to 20px
- Prescriber card padding increases from `$card-padding` to 20px
- Progress section padding increases to 20px
- Sticky footer padding increases from `$space-md $space-lg` to 20px `$space-xl`

### Borders & Radius
- Medication cards radius increases from `$radius-md` to `$radius-lg` (12px)
- Prescriber card radius increases to 12px
- Progress bar outer radius stays pill but inner fill gains a subtle shimmer overlay
- Dispensing progress card radius increases to 12px
- Privacy badges keep pill radius

### Surface & Shadows
- Medication cards shadow upgrades from `$shadow-sm` to `$shadow-md` in resting state
- Dispensing progress card shadow upgrades to `$shadow-md`
- Prescriber card shadow upgrades to `$shadow-md`
- Sticky footer shadow deepens: `0 -8px 24px rgba(15, 23, 42, 0.10)`
- Medication card checked state gains a subtle inner glow: `inset 0 0 0 1px rgba(46, 204, 113, 0.2)`

### Status & Interactions
- "Complete Dispensing" button uses gradient: `linear-gradient(135deg, #2ECC71, #27AE60)` with white text
- Button hover scales to `transform: scale(1.01)` with deeper shadow
- Medication card hover adds `transform: translateY(-1px)` micro-lift
- Checkmark animation on checked cards is smoother (300ms ease-out)
- Progress bar fill has a shimmer animation overlay: moving highlight

## SCSS Override Snippet

```scss
// V1: Premium Guided -- Prescription Details

.prescription-details {
  background: linear-gradient(180deg, #ECFDF3 0%, v.$color-surface 80px);
}

.prescription-container {
  padding: v.$space-lg v.$space-xl;
}

.prescription-id {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  font-weight: 600;
}

.section-title {
  font-family: 'Fraunces', serif;
  font-size: 17px;
  font-weight: 500;
}

.dispensing-progress {
  border-radius: v.$radius-lg;
  padding: 20px;
  box-shadow: v.$shadow-md;
}

.progress-bar__fill {
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: hhi-shimmer 2s ease-in-out infinite;
    background-size: 200% 100%;
  }
}

.medications-section {
  gap: 20px;
}

.medication-card {
  border-radius: v.$radius-lg;
  box-shadow: v.$shadow-md;
  transition: all v.$transition-fast;

  &:hover {
    transform: translateY(-1px);
    border-color: v.$color-emerald-hover;
    box-shadow: v.$shadow-lg;
  }

  &--checked {
    box-shadow: v.$shadow-sm, inset 0 0 0 1px rgba(46, 204, 113, 0.2);
  }
}

.prescriber-card {
  border-radius: v.$radius-lg;
  padding: 20px;
  box-shadow: v.$shadow-md;
}

.prescriber-avatar {
  background: linear-gradient(135deg, #2ECC71, #27AE60);
}

.prescriber-name {
  font-weight: v.$font-weight-bold;
}

.privacy-badge--verified {
  background: v.$green-100; // #DCFCE7
}

.sticky-footer {
  box-shadow: 0 -8px 24px rgba(15, 23, 42, 0.10);
  padding: 20px v.$space-xl;
}

.action-button--primary {
  background: linear-gradient(135deg, #2ECC71, #27AE60);
  border-color: transparent;
  color: v.$color-white;
  transition: all v.$transition-fast;

  &:hover:not(:disabled) {
    transform: scale(1.01);
    box-shadow: v.$shadow-md;
    background: linear-gradient(135deg, #27AE60, #219a52);
  }
}
```

## Visual Description

The prescription details page opens with a soft emerald gradient wash at the top. The prescription ID is rendered in Fraunces serif at 28px -- a premium, confident heading. The dispensing progress card has rounder corners and deeper shadow, with the progress bar fill showing a subtle shimmer animation. Medication cards are elevated with `shadow-md`, round 12px corners, and a micro-lift on hover. The prescriber section feels like a credential card with the avatar using a gradient emerald circle. The sticky footer's "Complete Dispensing" button uses a gradient fill with white text and a gentle scale-up on hover. Every surface communicates trust and precision.
