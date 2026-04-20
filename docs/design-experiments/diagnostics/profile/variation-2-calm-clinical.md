# Diagnostics Profile -- Variation 2: Calm Clinical

## Design Direction
Softer field presentation, more whitespace, gentler color usage, and a quieter sign-out treatment. The profile page should feel like a personal settings card -- calm, organized, and non-intrusive. Field information is presented with generous spacing and soft typographic hierarchy.

## Visual Changes

### Colors
- **Page background:** `$color-surface` (#F8FAFC)
- **Field card border:** `#EDF2F7` (lighter than current #e0e0e0)
- **Field label:** `$color-text-light` (#94A3B8) -- even softer than current
- **Field value:** `$color-text-secondary` (#475569) instead of soft charcoal
- **Avatar background:** softer emerald `#34D399`
- **Operational status:** soft emerald tint when operating (no strong border change)
- **Sign out button:** reduce danger emphasis -- `$color-text-muted` color with light border, red only on hover

### Typography
- **Profile header h1:** 500 weight (lighter), 20px
- **Field labels:** 400 weight, 13px, sentence case (not uppercase)
- **Field values:** 400 weight, 16px (lighter, more relaxed)
- **Back button:** 400 weight
- **Sign out button:** 500 weight (down from 600)
- **Line-height:** 1.6 on field values

### Spacing
- **Field card margin-bottom:** increase from 12px to 16px
- **Field card padding:** increase from 16px to 20px
- **Profile avatar margin-bottom:** increase from 24px to 32px
- **Profile header margin-bottom:** increase from 24px to 32px
- **Sign out button margin-top:** increase from 16px to 32px
- **Container padding:** increase to 24px side padding

### Borders
- **Field cards:** 1px `#EDF2F7`, increase radius to `$radius-lg` (12px)
- **No left-bar accents on labels**
- **Avatar:** no ring treatment, just the solid circle
- **Sign out button:** 1px `#E2E8F0` border (muted, not red), red border on hover
- **Operational status card:** no border color change, just subtle bg tint

### Surface
- **Field card shadow:** `0 1px 2px rgba(15, 23, 42, 0.02)` (barely there)
- **Field card hover:** no visual change (static cards)
- **Avatar shadow:** none (flat)
- **Sign out button hover:** border shifts to `$color-danger`, bg becomes `$color-danger-light`
- **Overall:** flat, paper-like feel with no elevation changes

### Status
- **Operational toggle card:** barely tinted `#F0FDF4` bg when operating, no tint when not
- **No colored borders on operational status**
- **Sign out button:** starts as neutral gray, becomes red only on hover
- **Avatar:** simple flat circle, no rings or shadows

## SCSS Override Snippet

```scss
// V2: Calm Clinical -- Diagnostics Profile
// Softer fields, more breathing room, quieter interactions

.provider-profile--v2 {
  background: v.$color-surface;
  padding: v.$space-lg v.$space-lg;

  .profile-container {
    max-width: 560px;
  }

  // Lighter header
  .profile-header h1 {
    font-weight: v.$font-weight-medium;
    color: v.$color-text-secondary;
  }

  // Softer avatar
  .profile-avatar {
    background: #34D399;
    box-shadow: none;
    margin-bottom: 32px;
  }

  // Spacious, soft field cards
  .field-card {
    border-color: #EDF2F7;
    border-radius: v.$radius-lg;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.02);
  }

  // Lighter labels
  .field-label {
    color: v.$color-text-light;
    font-weight: v.$font-weight-regular;
    font-size: 13px;
  }

  // Relaxed values
  .field-value {
    color: v.$color-text-secondary;
    font-weight: v.$font-weight-regular;
    line-height: v.$line-height-relaxed;
  }

  // Gentle operational status
  .field-card:last-of-type {
    background: #F0FDF4;
  }

  // Neutral sign out (red on hover only)
  .sign-out-button {
    border-color: #E2E8F0;
    color: v.$color-text-muted;
    background: transparent;
    border-width: 1px;
    margin-top: 32px;

    &:hover {
      border-color: v.$color-danger;
      color: v.$color-danger;
      background: v.$color-danger-light;
    }
  }
}
```

## Visual Description
The diagnostics profile page is a quiet, personal settings view. The avatar is a simple flat emerald circle (using softer #34D399) without rings or shadows. The page header uses medium weight (500) in secondary text color, stepping back from the content. Field cards are spacious with 20px padding, 16px gaps between them, and nearly invisible borders (#EDF2F7) with 12px radius. Labels are light-weight (400) in the lightest text color (#94A3B8), acting as subtle captions above the values. Field values themselves are regular weight in secondary text color -- readable but unstressed. The operational status card has a barely-there green tint (#F0FDF4) when active, with no border changes. The sign-out button starts neutral -- gray border and muted text -- and only reveals its red danger state on hover, keeping the default view calm. The header area has 32px margin below both the avatar and the heading. Everything feels personal and quiet, like a well-organized settings card.
