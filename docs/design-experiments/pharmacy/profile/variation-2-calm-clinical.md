# Pharmacy Profile -- V2: Calm Clinical

## Design Direction

The profile page becomes a **simple, functional settings card** with minimal visual weight. Field cards are light, borders are soft, and the overall page feels like a quiet utility screen -- present when needed, never demanding attention. The pharmacist can glance at their profile details and operational status without any visual overhead.

## Visual Changes

### Colors
- Page background changes from `#f5f5f5` to `$color-surface` (#F8FAFC) -- design system aligned, no gradient
- Field card border softens from `#e0e0e0` to `#EDF2F7`
- Field card shadow reduces to `$shadow-sm` (lighter than current custom shadow)
- Field label color changes from `#7f8c8d` to `$color-text-light` (#94A3B8) -- lighter than muted
- Avatar background stays solid `$color-emerald` -- no gradient
- Sign-out button background lightens to `rgba($color-danger, 0.06)`
- Sign-out button border width reduces from 2px to 1px

### Typography
- All text stays in Inter
- Profile header `h1` weight drops to 500
- Field labels stay at `$font-size-base` (14px) -- no uppercase treatment
- Field values use weight 400 (regular) instead of implicit -- lighter presence
- Field values line-height increases to 1.6
- Sign-out button weight drops to 500

### Spacing
- Page padding changes from `$space-lg $space-md` to `$space-lg` on all sides -- consistent
- Field card padding stays at `$space-md`
- Field card margin-bottom increases from 12px to 14px -- slightly more air
- Avatar margin-bottom stays at `$space-lg`
- Sign-out button margin-top increases from `$space-md` to `$space-lg`

### Borders & Radius
- All borders use `#EDF2F7`
- No radius changes -- keep `$radius-md` and `$radius-full` as-is
- Sign-out button border reduces to 1px

### Surface & Shadows
- Field cards use `$shadow-sm` only
- No hover shadow changes on field cards -- static
- Avatar has no additional shadow or ring
- Sign-out button has no hover shadow
- No transforms on any element

### Status & Interactions
- Field cards have no hover state -- static display cards
- Back button color stays emerald, no hover darkening
- Sign-out button hover just slightly darkens background tint
- Operational status toggle stays as-is -- functional without embellishment
- Focus states unchanged

## SCSS Override Snippet

```scss
// V2: Calm Clinical -- Pharmacy Profile

$border-calm: #EDF2F7;

.provider-profile {
  background: v.$color-surface;
  padding: v.$space-lg;
}

.profile-header h1 {
  font-weight: v.$font-weight-medium;
  color: v.$color-text-secondary;
}

.field-card {
  border-color: $border-calm;
  box-shadow: v.$shadow-sm;
  margin-bottom: 14px;
}

.field-label {
  color: v.$color-text-light;
}

.field-value {
  font-weight: v.$font-weight-regular;
  line-height: 1.6;
}

.sign-out-button {
  border-width: 1px;
  font-weight: v.$font-weight-medium;
  margin-top: v.$space-lg;
  background: rgba(v.$color-danger, 0.06);

  &:hover {
    background: rgba(v.$color-danger, 0.10);
  }
}
```

## Visual Description

The profile page is a quiet settings screen. Background is flat `$color-surface` with no gradient. The heading is Inter medium in secondary text color -- understated. The avatar is a solid emerald circle with no glow or ring. Field cards have `#EDF2F7` borders and `$shadow-sm` only, with no hover effects. Labels are in `$color-text-light` and values are regular weight with relaxed line-height. The sign-out button has a thin 1px danger border with a very light tint. Every element is functional and calm -- a utility screen that gets out of the pharmacist's way.
