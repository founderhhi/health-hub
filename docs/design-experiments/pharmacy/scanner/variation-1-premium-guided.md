# Pharmacy Scanner -- V1: Premium Guided

## Design Direction

The scanner is the pharmacist's first touchpoint with every prescription. This variation treats it as a **trust moment** -- a confident, premium surface that communicates reliability and precision. The scanner frame becomes a focal hero element with richer depth, the manual input section gains gravitas through surface treatment, and the claim flow conveys assurance through gradient CTAs and considered spacing.

## Visual Changes

### Colors
- Scanner frame background shifts from pure white to a subtle warm tint (`#FAFAF8`) to soften the clinical feel
- Scanner frame border changes from dashed emerald to a solid 2px emerald border with a soft emerald glow (`box-shadow: 0 0 20px rgba(46, 204, 113, 0.12)`)
- Corner markers gain a gradient treatment (`linear-gradient(135deg, #2ECC71, #27AE60)`)
- Scan line glow intensified with a warmer bio-lime halo
- Recent scans icon wrapper uses a subtle emerald gradient background instead of flat `$color-success-light`
- Dialog overlay gains a slightly warmer backdrop tint

### Typography
- Page title `"Scan Prescription"` uses `'Fraunces', serif` at 28px, weight 600 -- a premium serif moment
- Section headers ("Recent Scans", "Enter Code Manually") use Fraunces at 18px, weight 500
- Scanner instructions text gets a slightly larger size (15px) with relaxed line-height (1.6)
- Manual input title keeps Inter but bumps to weight 600

### Spacing
- Scanner container padding increases from `$space-lg` to `$space-xl` (32px) top/bottom
- Scanner frame wrapper vertical padding increases from `$space-md` to `$space-lg` (24px)
- Manual input section internal padding increases from `$space-md` to 20px
- Gap between scanner column and recent scans column increases from 32px to 40px on desktop
- Recent scan items get 18px vertical padding (up from 16px)

### Borders & Radius
- Scanner frame radius increases from `$radius-xl` (16px) to 20px for a softer, more premium feel
- Manual input section radius increases from `$radius-md` (8px) to `$radius-lg` (12px)
- Recent scans list radius increases to 12px
- Dialog border-radius increases from 12px to 16px
- Lookup button gets `$radius-lg` (12px) radius

### Surface & Shadows
- Scanner frame shadow deepens from `$shadow-md` to `0 6px 16px rgba(15, 23, 42, 0.10)` -- more presence
- Manual input card shadow upgrades from `$shadow-sm` to `$shadow-md`
- Recent scans list shadow upgrades from `$shadow-sm` to `$shadow-md`
- Dialog shadow intensifies: `0 24px 64px rgba(0, 0, 0, 0.32), 0 8px 24px rgba(0, 0, 0, 0.16)`
- Page background stays `$color-surface` but adds a faint top gradient: `linear-gradient(180deg, #ECFDF3 0%, #F8FAFC 120px)`

### Status & Interactions
- Lookup button uses gradient fill: `linear-gradient(135deg, #2ECC71, #27AE60)` with white text
- Lookup button hover scales to `transform: scale(1.02)` with deeper shadow
- Recent scan items gain a `transform: translateX(2px)` on hover for a subtle slide effect
- Scan success overlay ring uses the gradient green instead of flat `#22C55E`
- Toast message gains `$shadow-lg` and a subtle border: `1px solid rgba(255,255,255,0.2)`
- Mark/Claim button in dialog uses the same gradient CTA treatment

## SCSS Override Snippet

```scss
// V1: Premium Guided -- Pharmacy Scanner
// Overlay on top of existing pharmacy-scanner.scss

.pharmacy-scanner {
  background: linear-gradient(180deg, #ECFDF3 0%, v.$color-surface 120px);
}

.scanner-container {
  padding: v.$space-xl v.$space-md;
}

.page-title {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.scanner-frame-wrapper {
  padding: v.$space-lg 0;
}

.scanner-frame {
  border: 2px solid v.$color-emerald;
  border-style: solid; // override dashed
  border-radius: 20px;
  background: #FAFAF8;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.10), 0 0 20px rgba(46, 204, 113, 0.12);
}

.corner-marker {
  background: linear-gradient(135deg, #2ECC71, #27AE60);
}

.scanner-instructions {
  font-size: 15px;
  line-height: 1.6;
}

.manual-input-section {
  border-radius: v.$radius-lg;
  padding: 20px;
  box-shadow: v.$shadow-md;
}

.manual-input-title {
  font-family: 'Fraunces', serif;
  font-size: v.$font-size-lg;
  font-weight: 500;
}

.lookup-button {
  background: linear-gradient(135deg, #2ECC71, #27AE60);
  border-color: transparent;
  color: v.$color-white;
  border-radius: v.$radius-lg;
  transition: all v.$transition-fast;

  &:hover:not(:disabled) {
    transform: scale(1.02);
    box-shadow: v.$shadow-md;
    background: linear-gradient(135deg, #27AE60, #219a52);
  }
}

.recent-scans-section .section-header {
  font-family: 'Fraunces', serif;
  font-size: v.$font-size-lg;
  font-weight: 500;
}

.recent-scans-list {
  border-radius: v.$radius-lg;
  box-shadow: v.$shadow-md;
}

.recent-scan-item {
  padding: 18px v.$space-md;
  transition: all v.$transition-fast;

  &:hover {
    transform: translateX(2px);
  }

  &__icon-wrapper {
    background: linear-gradient(135deg, #F0FDF4, #DCFCE7);
  }
}

@media (min-width: 768px) {
  .pharmacy-scanner-layout {
    gap: 40px;
  }
}

.details-dialog {
  border-radius: 16px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.32), 0 8px 24px rgba(0, 0, 0, 0.16);
}

.mark-button {
  background: linear-gradient(135deg, #2ECC71, #27AE60);
  border-color: transparent;
  color: v.$color-white;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #27AE60, #219a52);
  }
}

.toast-message {
  box-shadow: v.$shadow-lg;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

## Visual Description

The scanner page opens with a faint emerald-to-neutral gradient wash at the top, grounding the "Scan Prescription" Fraunces serif heading. The scanner frame sits centrally with a solid emerald border and soft green halo glow, feeling like a precision instrument rather than a placeholder. Corner markers have a subtle gradient depth. Below, the manual input card has rounder corners, deeper shadow, and the Lookup button uses a confident emerald gradient with white text. The right column's "Recent Scans" header is set in Fraunces serif, and scan items slide gently right on hover. The prescription dialog has a deeper, layered shadow and the "Claim Prescription" CTA uses the same gradient treatment. Every surface feels intentional and considered -- a pharmacist tool that inspires confidence.
