# Pharmacy Profile -- V1: Premium Guided

## Design Direction

The pharmacy profile becomes a **distinguished credential card** -- a place that communicates the pharmacy's identity with quiet pride. The avatar gains gradient treatment, field cards have richer surfaces, and the overall layout feels like a premium business card rather than a settings form. The operational status toggle becomes a trust signal.

## Visual Changes

### Colors
- Page background changes from `#f5f5f5` to the branded `$color-surface` (#F8FAFC) with a faint top gradient: `linear-gradient(180deg, #ECFDF3 0%, #F8FAFC 80px)`
- Profile avatar gains gradient: `linear-gradient(135deg, #2ECC71, #27AE60)` with a subtle ring: `0 0 0 3px rgba(46, 204, 113, 0.2)`
- Field card border changes from `#e0e0e0` to `$color-border` (#E2E8F0) -- aligned with design system
- Field card shadow uses `$shadow-md` instead of custom `0 1px 3px rgba(0,0,0,0.08)`
- Field label color changes from `#7f8c8d` to `$color-text-muted` (#64748B) -- design system aligned
- Sign-out button danger background uses `rgba($color-danger, 0.06)` -- lighter default

### Typography
- Profile header `h1` uses `'Fraunces', serif` at 22px, weight 500
- Field labels use `$font-size-sm` (12px) with weight 500 and uppercase treatment
- Field values use `$font-size-md` (16px) with weight 500 -- slightly bolder
- Back button text uses weight 500
- Sign-out button text uses weight 600

### Spacing
- Profile container max-width stays at 560px
- Page padding increases from `$space-lg $space-md` to `$space-xl $space-lg`
- Field card padding increases from `$space-md` to 20px
- Field card margin-bottom increases from 12px to `$space-md` (16px)
- Avatar margin-bottom increases from `$space-lg` to 28px
- Sign-out button margin-top increases from `$space-md` to `$space-xl`

### Borders & Radius
- Field card radius increases from `$radius-md` to `$radius-lg` (12px)
- Avatar keeps full radius but gains the ring shadow
- Sign-out button radius increases to `$radius-lg`
- Back button area gains no changes

### Surface & Shadows
- Field cards shadow upgrades to `$shadow-md`
- Field card hover (new): gains `$shadow-lg` and `transform: translateY(-1px)`
- Avatar gains ring shadow: `0 0 0 3px rgba(46, 204, 113, 0.2), 0 4px 12px rgba(0,0,0,0.1)`
- Sign-out button hover shadow: `0 2px 8px rgba(231, 76, 60, 0.2)`

### Status & Interactions
- Field cards gain hover state: subtle lift + shadow deepening
- Operational status toggle area gets a subtle emerald left border when operating
- Back button emerald color stays but hover darkens to `$color-emerald-hover`
- Sign-out button hover intensifies background to `rgba($color-danger, 0.15)`

## SCSS Override Snippet

```scss
// V1: Premium Guided -- Pharmacy Profile

.provider-profile {
  background: linear-gradient(180deg, #ECFDF3 0%, v.$color-surface 80px);
  padding: v.$space-xl v.$space-lg;
}

.profile-header h1 {
  font-family: 'Fraunces', serif;
  font-size: 22px;
  font-weight: 500;
}

.profile-avatar {
  background: linear-gradient(135deg, #2ECC71, #27AE60);
  box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 28px;
}

.field-card {
  border-color: v.$color-border;
  border-radius: v.$radius-lg;
  padding: 20px;
  margin-bottom: v.$space-md;
  box-shadow: v.$shadow-md;
  transition: all v.$transition-fast;

  &:hover {
    transform: translateY(-1px);
    box-shadow: v.$shadow-lg;
  }
}

.field-label {
  color: v.$color-text-muted;
  font-size: v.$font-size-sm;
  font-weight: v.$font-weight-medium;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.field-value {
  font-weight: v.$font-weight-medium;
}

.sign-out-button {
  border-radius: v.$radius-lg;
  margin-top: v.$space-xl;
  background: rgba(v.$color-danger, 0.06);

  &:hover {
    background: rgba(v.$color-danger, 0.15);
    box-shadow: 0 2px 8px rgba(231, 76, 60, 0.2);
  }
}
```

## Visual Description

The profile page opens with a faint emerald gradient wash. The "Profile" heading is Fraunces serif at 22px -- distinguished but not oversized. The avatar circle uses a gradient emerald fill with a soft green ring glow, sitting centrally with generous bottom spacing. Field cards have 12px radius, `shadow-md`, and lift gently on hover. Labels are uppercase at 12px in muted text. Values are medium-weight at 16px. The sign-out button has a lighter danger tint and gains a reddish shadow on hover. The overall impression is a premium pharmacy credential card -- professional, trustworthy, and well-crafted.
