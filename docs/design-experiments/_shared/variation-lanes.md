# Design Variation Lanes

## Structure: 2 Theme + 1 Competitor

Each page gets 3 variations:
- **V1:** Best-fit theme lane for the role
- **V2:** Second-best theme lane for contrast
- **V3:** Competitor-inspired direction (informed by web research of specific competitor UIs)

## The 3 Theme Lanes

### 1. Calm Clinical
**Philosophy:** Softer hierarchy, lighter surfaces, less visual noise, more breathing room.
**Best suited for:** Patient dashboard, diagnostics, records views

**Key moves:**
- Reduce shadow intensity (use shadow-sm everywhere, remove shadow-md from cards)
- Increase card padding from 16px to 20-24px
- Soften border colors (use #E2E8F0 → #EDF2F7)
- Lighten status badges (use tinted backgrounds instead of solid)
- Increase line-height from 1.5 to 1.6 on body text
- Use more whitespace between sections (gap: 24px → 32px)
- Reduce font-weight on secondary text (500 → 400)
- Mute the emerald accent slightly for non-interactive elements

**SCSS overrides pattern:**
```scss
// Calm Clinical overrides
$shadow-md: 0 2px 4px rgba(15, 23, 42, 0.04); // softer than default
$card-padding: 20px; // up from 16px
$section-gap: 32px; // up from 24px
$border-color-default: #EDF2F7; // lighter than #E2E8F0
```

### 2. Operational Clarity
**Philosophy:** Sharper status chips, stronger queue contrast, denser but cleaner information grouping.
**Best suited for:** GP queue, specialist referral inbox, admin dashboard

**Key moves:**
- Increase contrast between status states (bolder badge colors)
- Tighten card padding (16px → 12-14px) for density
- Add subtle left-border accents on queue items (2-3px colored border)
- Use heavier font-weight on counts and key numbers (600 → 700)
- Sharper border-radius on badges (8px → 4px for chips)
- Introduce alternating row tints on lists (every other: #FAFBFC)
- Make primary actions more prominent (larger, bolder CTA buttons)
- Stronger visual separation between sections (1px border or 2px gap increase)

**SCSS overrides pattern:**
```scss
// Operational Clarity overrides
$card-padding: 14px; // tighter for density
$badge-radius: 4px; // sharper chips
$list-item-border-left: 3px solid; // accent borders
$font-weight-emphasis: 700; // bolder numbers
$row-alt-bg: #FAFBFC; // alternating rows
```

### 3. Premium Guided
**Philosophy:** Richer surface depth, more considered card framing, more confident CTA treatment.
**Best suited for:** Patient dashboard hero, pharmacy scanner, specialist consultation

**Key moves:**
- Add subtle gradient backgrounds on hero sections (emerald → transparent)
- Increase shadow depth on primary cards (shadow-sm → shadow-md)
- Use Fraunces serif for section headings (not just hero)
- Add border-radius-lg (12px) on main content cards
- Richer button styles (gradient fills, subtle hover animations)
- More intentional use of emerald as highlight (not just accent)
- Slightly warm the neutral palette (#F8FAFC → #FAFAF8 subtle warm tint)
- Add micro-interactions (scale 1.02 on card hover, smooth transitions)

**SCSS overrides pattern:**
```scss
// Premium Guided overrides
$card-radius: 12px; // rounder cards
$card-shadow: 0 4px 6px rgba(15, 23, 42, 0.08); // richer depth
$heading-font: 'Fraunces', serif; // premium headings
$cta-gradient: linear-gradient(135deg, #2ECC71, #27AE60); // richer CTAs
$hover-scale: 1.02; // micro-interaction
```

## Per-Role Assignment

| Role | V1 (Best-fit) | V2 (Contrast) | V3 (Competitor) |
|---|---|---|---|
| Patient | Calm Clinical | Premium Guided | Halodoc consumer health |
| GP | Operational Clarity | Calm Clinical | Helium Health SaaS |
| Specialist | Operational Clarity | Premium Guided | Vezeeta provider portal |
| Pharmacy | Premium Guided | Calm Clinical | MyDawa order flow |
| Diagnostics | Operational Clarity | Calm Clinical | Tenadoc diagnostics |
| Admin | Operational Clarity | Premium Guided | Helium Health SaaS admin |
