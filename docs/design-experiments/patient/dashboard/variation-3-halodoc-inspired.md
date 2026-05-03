# Patient Dashboard -- Variation 3: Halodoc-Inspired Consumer Health

## Design Direction
Adapt Halodoc's consumer health visual language -- clean card grids, action-forward service tiles, status pills, and a mobile-first "super app" feel -- to Health Hub's emerald brand. The emphasis is on directness, clarity of service options, and a warm but functional card-based layout.

## Competitor Reference
Research into Halodoc's app UI revealed several key patterns:
- **Service tile grid as primary navigation**: Halodoc's home screen centers on a grid of service tiles (Chat with Doctor, Buy Medicine, Book Appointment, etc.) with rounded icon containers and short labels. The grid is the main interaction surface.
- **Flat, bright card style**: Cards use minimal shadow, relying on white backgrounds against a light gray page background for contrast. Borders are subtle or absent.
- **Status-forward design**: Active consultations and pending orders surface at the top of the home screen in colored banner cards.
- **Color usage**: Halodoc uses a warm red (#E0004D) as primary, but the principle is a single strong accent color used sparingly on CTAs and status indicators, with most of the UI in neutral grays.
- **Customizable home screen**: Users can prioritize which health services appear first, suggesting a modular tile system.
- **Low-bandwidth considerations**: UI is optimized for emerging markets with lightweight assets and minimal decorative elements.

Secondary reference from Practo: status-first appointment cards, clean service grids with counts, timeline-based records. From Zuri Health: ultra-minimal UI, WhatsApp-style simplicity, mobile money integration cues.

Patterns borrowed for this variation:
1. Flatter cards with no resting shadow, relying on background contrast.
2. Larger, more tappable service tiles with rounded icon containers.
3. Active status banner at top (replacing scattered status banners).
4. Simplified care hero reduced to a compact action card rather than a large editorial section.
5. Warmer, friendlier tone through rounded corners and softer type weight.

## Visual Changes

### Colors
- Page background lightened to `#F5F7FA` (slightly cooler than current `--bg-primary`).
- Cards use pure `#FFFFFF` background with no border -- contrast comes from bg difference.
- Service tile icons use full-circle containers (border-radius: 50%) with 12% tinted backgrounds.
- Status banner consolidated into a single top card with emerald left border (3px).
- Care hero simplified: solid emerald background with white text for the CTA area.

### Typography
- `.greeting-time` removed uppercase/small text treatment, uses `font-size: 15px`.
- `.user-name` uses Inter at 22px semibold (no serif -- consumer app feel).
- `.section-title` at 16px medium weight (less heavy, more app-like).
- `.tile-title` at 11px with `font-weight: 500` (compact label style).
- `.summary-value` at 20px bold (slightly smaller, denser presentation).

### Spacing & Layout
- `.services-grid` changes to `repeat(4, minmax(0, 1fr))` on wider screens, `repeat(3, 1fr)` on mobile -- denser grid.
- Service tiles lose `aspect-ratio: 1`, instead using `padding: 14px 8px` with auto height.
- `.health-summary` scrolling container replaced with a fixed 3-column grid (no scroll).
- `.care-hero` dramatically simplified: single row with icon, text, and CTA button. Max height ~80px.
- Gap between all sections reduced to 20px for a denser, app-like feed.
- Summary cards use `min-width: auto` and fill the grid equally.

### Borders & Shadows
- All cards: `border: none; box-shadow: none;` -- pure flat design.
- Cards get `border-radius: 16px` uniformly.
- Service tiles: `border-radius: 14px`, no border, `background: #FFFFFF`.
- Hover states use background color change only (no transform/shadow): `background: #F0FAF4`.
- Prescription cards: no border, white bg, 12px radius.

### Surface Treatment
- Decorative `::before` and `::after` pseudo-elements removed entirely.
- Care hero becomes a compact emerald-tinted card: `background: linear-gradient(135deg, #ECFDF3, #F0FDF4)` with an emerald left border.
- No decorative orbs, snapshot cards, or mini-cards in the hero -- just text and CTA.
- Records quick-access card uses a light emerald background: `background: #F0FDF4`.

### Status & State Indicators
- Status pills use fully rounded (pill) shape with solid light backgrounds.
- Active status: `background: #ECFDF3; color: #166534; border: 1px solid #BBF7D0`.
- Pending status: `background: #FEF3C7; color: #92400E; border: 1px solid #FDE68A`.
- Completed status: `background: #DBEAFE; color: #1E40AF; border: 1px solid #93C5FD`.
- Notification badge: solid red circle, no border treatment.

## SCSS Override Snippet
```scss
// Variation 3: Halodoc-Inspired Consumer Health -- Patient Dashboard
// Flat cards, action-forward tiles, status pills, consumer app density

.patient-dashboard {
  background: #F5F7FA;
  padding: 20px;
  padding-bottom: calc(80px + env(safe-area-inset-bottom, 0px));

  // Remove decorative orbs
  &::before,
  &::after {
    display: none;
  }
}

.dashboard-header {
  margin-bottom: 20px;
}

.greeting-section {
  .greeting-time {
    font-size: 15px;
    line-height: 1.4;
  }

  .user-name {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 22px;
    font-weight: 600;
  }
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
}

// Flat summary cards in a grid
.health-summary {
  margin-bottom: 20px;
  margin-left: 0;
  margin-right: 0;
  padding: 0;
}

.summary-scroll-container::after {
  display: none; // Remove fade gradient
}

.summary-scroll {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  overflow: visible;
}

.summary-card {
  min-width: auto;
  background: #FFFFFF;
  border: none;
  border-radius: 16px;
  box-shadow: none;
  padding: 16px;

  &:hover {
    background: #F0FAF4;
    box-shadow: none;
    transform: none;
  }

  .summary-value {
    font-size: 20px;
  }

  .summary-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%; // Halodoc-style circular icons
    margin-bottom: 12px;
  }
}

// Denser service grid
.services-section {
  margin-bottom: 20px;
}

.services-grid {
  gap: 10px;
}

.service-tile {
  aspect-ratio: auto;
  padding: 14px 8px;
  background: #FFFFFF;
  border: none;
  border-radius: 14px;
  box-shadow: none;

  &:hover:not(.coming-soon) {
    background: #F0FAF4;
    border-color: transparent;
    transform: none;
    box-shadow: none;
  }

  .tile-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%; // Circular icon containers
  }

  .tile-title {
    font-size: 11px;
    font-weight: 500;
  }
}

// Simplified care hero -- compact action card
.care-hero {
  padding: 20px;
  border-radius: 16px;
  border: none;
  border-left: 3px solid #2ECC71;
  background: linear-gradient(135deg, #ECFDF3, #F0FDF4);
  box-shadow: none;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.care-hero__visual {
  display: none; // Remove the decorative visual panel
}

.care-hero__orb {
  display: none;
}

.care-hero__snapshot {
  display: none;
}

.care-hero__mini-card {
  display: none;
}

.care-hero__eyebrow {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  color: #166534;
}

.care-hero__title {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 18px;
  font-weight: 600;
}

.care-hero__text {
  font-size: 13px;
  line-height: 1.5;
}

.care-hero__action {
  min-height: 44px;
  border-radius: 12px;
  font-size: 14px;
  width: 100%;
  background: #2ECC71;

  &:hover {
    background: #27AE60;
    transform: none;
    box-shadow: none;
  }
}

// Flat records card
.records-quick-access {
  margin-bottom: 20px;
}

.records-card {
  background: #FFFFFF;
  border: none;
  border-radius: 16px;
  box-shadow: none;

  &:hover {
    background: #F0FAF4;
    border-color: transparent;
    transform: none;
    box-shadow: none;
  }
}

// Flat prescription cards
.recent-section {
  margin-bottom: 20px;
}

.prescription-card {
  background: #FFFFFF;
  border: none;
  border-radius: 12px;
  box-shadow: none;

  &:hover {
    background: #F0FAF4;
    border-color: transparent;
    transform: none;
    box-shadow: none;
  }
}

// Halodoc-style status pills
.rx-status {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
}

.status-active {
  background: #ECFDF3;
  color: #166534;
  border: 1px solid #BBF7D0;
}

.status-claimed {
  background: #FEF3C7;
  color: #92400E;
  border: 1px solid #FDE68A;
}

.status-fulfilled {
  background: #DBEAFE;
  color: #1E40AF;
  border: 1px solid #93C5FD;
}

// Consolidated status banner
.status-banner {
  border-radius: 12px;
  border-left: 3px solid;
  margin-bottom: 12px;

  &--info {
    background: #FFFFFF;
    border-left-color: #2ECC71;
    border-top: none;
    border-right: none;
    border-bottom: none;
  }

  &--error {
    background: #FFFFFF;
    border-left-color: #EF4444;
    border-top: none;
    border-right: none;
    border-bottom: none;
  }
}
```

## Visual Description
The Halodoc-inspired dashboard feels like a consumer health super-app. The page background is a cool light gray, and every card sits on a pure white surface with no borders or shadows -- the contrast between gray background and white cards creates natural visual separation.

Decorative elements are stripped away entirely: no background orbs, no gradient overlays. The care hero is dramatically simplified into a compact card with an emerald left border accent and a light green-tinted background. It contains just the title, a brief line of text, and a full-width CTA button. This is the Halodoc approach -- action over atmosphere.

Service tiles use circular icon containers (a Halodoc signature) with tinted backgrounds, and the grid is tighter. Each tile is a simple white rectangle with rounded corners, an icon, and a label. No hover transforms -- just a subtle green tint on hover, keeping interactions flat and fast.

Summary statistics sit in a 3-column grid rather than a horizontal scroller, making all three values visible at once. Status pills use the "colored background + colored border + dark text" pattern common in consumer health apps, giving each state (active, pending, completed) a distinct, readable appearance.

The overall effect is clean, fast, and functional -- a dashboard that gets out of the way and lets patients tap into services immediately.
