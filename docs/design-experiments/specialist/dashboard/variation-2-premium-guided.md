# Specialist Dashboard -- V2: Premium Guided

## Design Direction
Richer surface depth, more confident stat cards, Fraunces serif for the page title, elevated card treatments, and a subtle emerald gradient header. The specialist dashboard becomes not just functional but premium-feeling -- a tool that reflects the authority and expertise of the specialist using it.

## Visual Changes

### Colors
- Page background: warm tint `#FAFAF8` instead of cool `#F8FAFC`
- Stat card values: keep emerald `#4ADE80` but add a subtle text-shadow `0 1px 2px rgba(46, 204, 113, 0.15)` for depth
- Active tab filter: use gradient `linear-gradient(135deg, #2ECC71, #27AE60)` instead of flat emerald
- Referral card hover: background shifts to `#F0FDF4` (green-50) for a warmer, branded hover
- Header area: add a very subtle gradient banner `linear-gradient(180deg, rgba(46, 204, 113, 0.04) 0%, transparent 100%)` behind the page header

### Typography
- Page title "Specialist Dashboard": use `'Fraunces', serif` at `28px` / `700` weight with `letter-spacing: -0.02em` for a premium serif moment
- Page subtitle: increase to `15px` with `line-height: 1.6` for more breathing room
- Stat card values: increase to `36px` for more visual weight
- Patient names: keep 18px / 600 but use `color: #0B0F14` (darker) for stronger anchoring

### Spacing
- Stat card padding: increase from `24px` to `28px` for more generous internal space
- Referral card padding: increase from `24px` to `28px` for a roomier feel
- Gap between sections: increase from `32px` to `40px` for more vertical rhythm
- Stats grid gap: increase from `16px` to `20px`
- Page header bottom margin: increase from `24px` to `32px`

### Borders & Radius
- Referral cards: increase radius from `12px` to `16px` for softer, rounder cards
- Stat cards: increase radius from `12px` to `16px`
- Appointment cards: increase radius from `12px` to `16px`
- Tab filters: keep pill shape, add `2px` border on active state

### Surface & Shadow
- Stat cards: upgrade shadow from `sm` to `md` -- `0 4px 6px rgba(15, 23, 42, 0.08)`
- Referral cards: add resting shadow `0 2px 4px rgba(15, 23, 42, 0.04)`, hover shadow `0 8px 20px rgba(15, 23, 42, 0.12)`
- Referral cards: add `transition: transform 200ms ease, box-shadow 200ms ease` and `&:hover { transform: translateY(-1px) }` micro-interaction
- Appointment cards: add similar hover lift

### Status
- Badges: keep pill shape (`9999px` radius) but add `padding: 3px 10px` for slightly more generous sizing
- LIVE badge: add subtle glow `box-shadow: 0 0 8px rgba(46, 204, 113, 0.3)`
- Tab count badges: use gradient background matching active tab

## SCSS Override Snippet

```scss
// V2: Premium Guided -- Specialist Dashboard

.specialist-dashboard {
  background: #FAFAF8;
}

.hhi-page-header {
  margin-bottom: v.$space-xl;
  padding-bottom: v.$space-lg;
  background: linear-gradient(180deg, rgba(46, 204, 113, 0.04) 0%, transparent 100%);

  .hhi-page-title {
    font-family: 'Fraunces', serif;
    font-size: 28px;
    font-weight: v.$font-weight-bold;
    letter-spacing: -0.02em;
  }

  .hhi-page-subtitle {
    font-size: 15px;
    line-height: 1.6;
  }
}

.stats-grid {
  gap: 20px;
  margin-bottom: v.$space-2xl;
}

.stat-card {
  border-radius: v.$radius-xl; // 16px
  padding: 28px;
  box-shadow: v.$shadow-md;

  .stat-value {
    font-size: 36px;
    text-shadow: 0 1px 2px rgba(46, 204, 113, 0.15);
  }
}

.tab-filter {
  &--active {
    background: linear-gradient(135deg, v.$color-emerald, v.$color-emerald-hover);
    border: 2px solid v.$color-emerald;
  }

  .tab-count-badge {
    background: linear-gradient(135deg, v.$color-emerald, v.$color-emerald-hover);
  }
}

.referral-card {
  border-radius: v.$radius-xl;
  padding: 28px;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.04);
  transition: transform 200ms ease, box-shadow 200ms ease;

  &:hover {
    background: v.$green-50;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
    transform: translateY(-1px);
  }
}

.appointment-card {
  border-radius: v.$radius-xl;
  transition: transform 200ms ease, box-shadow 200ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
  }
}

.badge {
  padding: 3px 10px;
}

.hhi-badge--success {
  box-shadow: 0 0 8px rgba(46, 204, 113, 0.3);
}
```

## Visual Description
The dashboard feels like a premium medical tool. The page title is set in Fraunces serif -- a subtle but distinctive signal that this is not a generic admin panel. A whisper of emerald gradient washes the header area. Stat cards are generous in padding with richer shadows, their large 36px numbers anchoring the eye. Referral cards have rounded 16px corners and lift gently on hover with a smooth translateY animation, their surfaces shifting to a warm green-50 tint. The active tab filter uses a gradient fill rather than flat color. Everything breathes more -- wider gaps between sections, more padding inside cards -- creating a sense of space and authority appropriate for a specialist's primary workspace.
