# Specialist Profile -- V1: Operational Clarity

## Design Direction
A sharper, more structured profile view. The profile is a secondary page but it still needs to communicate professional identity clearly. This variation tightens the field cards, adds visual grouping, and makes the operational status toggle more prominent as the key actionable element.

## Visual Changes

### Colors
- Page background: switch from `#f5f5f5` to `#F8FAFC` (brand surface color for consistency)
- Field card border: switch from `#e0e0e0` to `#E2E8F0` (brand border)
- Field labels: switch from `#7f8c8d` to `#64748B` (brand muted)
- Field values: switch from `$color-soft-charcoal` to `#0B0F14` (brand text-primary) for stronger contrast
- Profile avatar: keep emerald background, add `border: 3px solid #FFFFFF` ring for depth
- Operational status field card: add `border-left: 3px solid #2ECC71` when operating, `border-left: 3px solid #E74C3C` when not
- Sign out button border: reduce to `1px solid` (from `2px`) for less visual weight on destructive action

### Typography
- Header title "Profile": increase to `22px` / `700` (from `20px` / `600`)
- Field labels: switch to `12px` / `600` uppercase with `letter-spacing: 0.05em` (from `14px` regular)
- Field values: increase to `16px` / `500` (keep `$font-size-md` but add medium weight)
- Avatar initial: increase to `24px` / `700` for stronger identification
- Sign out button: reduce to `14px` / `500` (de-emphasize)

### Spacing
- Field card padding: reduce from `16px` to `14px` for tighter density
- Field card margin-bottom: keep `12px`
- Avatar margin-bottom: reduce from `24px` to `16px`
- Profile header margin-bottom: reduce from `24px` to `20px`
- Container max-width: keep `560px`

### Borders & Radius
- Field cards: reduce radius from `8px` to `6px`
- Avatar: keep circle, reduce from `68px` to `60px`
- Sign out button: reduce radius from `8px` to `6px`

### Surface & Shadow
- Field cards: reduce shadow from `0 1px 3px rgba(0, 0, 0, 0.08)` to `0 1px 2px rgba(15, 23, 42, 0.04)` (brand shadow-sm)
- Field cards: add alternating subtle tint -- every other card gets `background: #FAFBFC`
- Sign out button: remove background tint, use transparent with border only

### Status
- Operational status: the field card gains a colored left-border (green=operating, red=not) for instant visual status
- Field cards: add a subtle hover state `background: #F8FAFC` for interactive feel even though they are read-only

## SCSS Override Snippet

```scss
// V1: Operational Clarity -- Specialist Profile

.provider-profile {
  background: v.$color-surface;
}

.profile-header h1 {
  font-size: 22px;
  font-weight: v.$font-weight-bold;
}

.profile-avatar {
  width: 60px;
  height: 60px;
  font-size: v.$font-size-2xl;
  border: 3px solid v.$color-white;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.1);
  margin-bottom: v.$space-md;
}

.field-card {
  border-color: v.$color-border;
  border-radius: 6px;
  padding: 14px;
  box-shadow: v.$shadow-sm;

  &:nth-child(even) {
    background: #FAFBFC;
  }

  &:hover {
    background: v.$color-surface;
  }

  // Operational status card (last field-card before sign-out)
  &:last-of-type {
    border-left: 3px solid v.$color-emerald;
  }
}

.field-label {
  font-size: v.$font-size-sm;
  font-weight: v.$font-weight-semibold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: v.$color-text-muted;
  margin-bottom: v.$space-xs;
}

.field-value {
  color: v.$color-text-primary;
  font-size: v.$font-size-md;
  font-weight: v.$font-weight-medium;
}

.sign-out-button {
  border-width: 1px;
  background: transparent;
  font-size: v.$font-size-base;
  font-weight: v.$font-weight-medium;
  border-radius: 6px;

  &:hover {
    background: v.$color-danger-light;
  }
}
```

## Visual Description
The profile page is tightened into an efficient credential display. The avatar is slightly smaller at 60px with a white ring border adding depth. Field cards use brand-consistent borders and shadow, with alternating background tints for scannable grouping. Labels switch to 12px uppercase bold for a clinical form-field feel, while values use 16px medium weight in primary black for strong readability. The operational status card stands out with a colored left-border (emerald when operating, red when not) -- the single most important state on this page is immediately visible. The sign-out button is deliberately understated: thin border, no background fill, smaller text. The overall page feels like a professional settings panel -- dense, organized, and focused on displaying credentials cleanly.
