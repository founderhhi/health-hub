# Specialist Profile -- V2: Premium Guided

## Design Direction
A polished, professional profile that reflects the specialist's expertise. Richer avatar treatment, Fraunces serif for the name, elevated card surfaces, and a more considered layout that treats the profile as a professional identity document rather than a settings page.

## Visual Changes

### Colors
- Page background: warm `#FAFAF8`
- Field cards: white `#FFFFFF` with softer border `#EDF2F7`
- Avatar: richer gradient `linear-gradient(135deg, #2ECC71 0%, #15803D 100%)` with `box-shadow: 0 6px 16px rgba(46, 204, 113, 0.25)`
- Field labels: `#94A3B8` (lighter, more refined)
- Field values: `#0B0F14` (strong primary)
- Header background: subtle emerald gradient wash `linear-gradient(180deg, rgba(46, 204, 113, 0.05) 0%, transparent 60%)` behind avatar area
- Sign out: softer danger color `#DC2626` instead of `#E74C3C`

### Typography
- Header title: `'Fraunces', serif` at `22px` / `600`
- Field labels: `13px` / `500` regular case (not uppercase) for softer feel
- Field values: `16px` / `500` with `line-height: 1.5`
- Avatar initial: `'Fraunces', serif` at `26px` / `700`
- Full Name value: `18px` / `600` `'Fraunces', serif` (special treatment for the name field)
- Sign out button: `15px` / `500`

### Spacing
- Field card padding: increase to `20px`
- Field card margin-bottom: increase to `16px`
- Avatar margin-bottom: increase to `28px`
- Profile container max-width: increase to `520px` (slightly narrower for premium column feel)
- Avatar size: increase to `80px` for stronger visual presence
- Profile header margin-bottom: increase to `28px`

### Borders & Radius
- Field cards: increase radius to `12px`
- Avatar: keep circle at `80px`
- Sign out button: increase radius to `12px`
- Container: consider `max-width: 520px` for a centered column feel

### Surface & Shadow
- Field cards: upgrade shadow to `0 2px 8px rgba(15, 23, 42, 0.06)` with hover `0 4px 16px rgba(15, 23, 42, 0.1)`
- Field cards: `transition: box-shadow 200ms ease, transform 200ms ease` with `&:hover { transform: translateY(-1px) }`
- Avatar: `box-shadow: 0 6px 16px rgba(46, 204, 113, 0.25)` for emerald glow
- Sign out button: no background, just border, with `transition: all 200ms ease`
- Header area: subtle gradient wash behind avatar

### Status
- Operational status: the toggle gets a larger container treatment with descriptive text ("You are accepting referrals" / "You are not accepting referrals")
- Field cards: subtle hover lift for interactive quality feel

## SCSS Override Snippet

```scss
// V2: Premium Guided -- Specialist Profile

.provider-profile {
  background: #FAFAF8;
  padding: v.$space-xl v.$space-md;
}

.profile-container {
  max-width: 520px;
}

.profile-header {
  margin-bottom: 28px;

  h1 {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    font-weight: v.$font-weight-semibold;
  }
}

.profile-avatar {
  width: 80px;
  height: 80px;
  font-family: 'Fraunces', serif;
  font-size: 26px;
  background: linear-gradient(135deg, v.$color-emerald 0%, #15803D 100%);
  box-shadow: 0 6px 16px rgba(46, 204, 113, 0.25);
  margin-bottom: 28px;
}

.field-card {
  background: v.$color-white;
  border: 1px solid #EDF2F7;
  border-radius: v.$radius-lg;
  padding: 20px;
  margin-bottom: v.$space-md;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
  transition: box-shadow 200ms ease, transform 200ms ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.1);
    transform: translateY(-1px);
  }
}

.field-label {
  font-size: 13px;
  font-weight: v.$font-weight-medium;
  color: v.$color-text-light;
  text-transform: none;
  letter-spacing: normal;
}

.field-value {
  color: v.$color-text-primary;
  font-size: v.$font-size-md;
  font-weight: v.$font-weight-medium;
  line-height: v.$line-height-normal;
}

// Special treatment for the full name field
.field-card:nth-child(2) .field-value {
  font-family: 'Fraunces', serif;
  font-size: v.$font-size-lg;
  font-weight: v.$font-weight-semibold;
}

.sign-out-button {
  border: 1px solid #DC2626;
  color: #DC2626;
  background: transparent;
  border-radius: v.$radius-lg;
  font-size: 15px;
  font-weight: v.$font-weight-medium;
  transition: all 200ms ease;

  &:hover {
    background: rgba(220, 38, 38, 0.08);
  }
}
```

## Visual Description
The profile becomes a premium professional card. The avatar is larger at 80px with a rich emerald-to-dark-green gradient and a warm glow shadow. The initial is set in Fraunces serif for distinctive character. Field cards are generous with 20px padding and 12px radius, lifting subtly on hover with shadow transitions. Labels use a refined 13px regular-case style in light gray, while values are strong and clear in primary black. The full name field gets special treatment with Fraunces serif at 18px -- this is the specialist's identity, and it deserves distinction. The warm `#FAFAF8` background and softer `#EDF2F7` card borders create a quieter, more refined palette. The sign-out button is deliberately understated with a thin red outline and no fill. The page feels like a professional identity card -- something a specialist would be proud to see as their digital presence.
