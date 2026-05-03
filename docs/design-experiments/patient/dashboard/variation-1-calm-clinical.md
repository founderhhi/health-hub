# Patient Dashboard -- Variation 1: Calm Clinical

## Design Direction
Soften the dashboard's visual intensity by reducing shadow depth, lightening borders, increasing breathing room between sections, and muting decorative gradients. The goal is a calmer, less stimulating first impression that still communicates status and next steps clearly.

## Visual Changes

### Colors
- Decorative radial gradients (the `::before` and `::after` pseudo-elements) reduced from 18%/14% opacity to 10%/8%.
- Care hero border accent reduced from 30% mix to 18%.
- Care hero box-shadow reduced from 12% accent mix to 6%.
- Service tile hover shadow reduced from 16% to 10%.
- Summary card icon backgrounds lightened: emerald 10% -> 7%, bio-lime 10% -> 7%, blue 10% -> 7%.
- Status banner backgrounds softened: green 15% -> 10%, red 15% -> 10%.

### Typography
- `.greeting-time` line-height increased from default to 1.6.
- `.section-title` weight softened from 600 to 500.
- `.summary-label` line-height set to 1.6.
- `.care-hero__text` line-height increased from 1.65 to 1.7.
- `.tile-title` weight reduced from 600 to 500.

### Spacing & Layout
- `.patient-dashboard` padding increased from `$space-lg` (24px) to 28px.
- `.dashboard-header` margin-bottom increased from `$space-xl` (32px) to 36px.
- `.health-summary` margin-bottom increased from `$space-xl` to 36px.
- `.services-section` margin-bottom increased from `$space-xl` to 36px.
- `.services-grid` gap increased from 12px to 16px.
- `.summary-card` padding increased from `$space-md` (16px) to 20px.
- `.care-hero` padding clamp adjusted: clamp(24px, 3vw, 32px) instead of clamp(20px, 3vw, 28px).
- `.records-quick-access` margin-bottom increased from `$space-xl` to 36px.
- `.recent-section` margin-bottom increased from `$space-xl` to 36px.

### Borders & Shadows
- `.summary-card` border color changed from `var(--border-color)` to a lighter `color-mix(in srgb, var(--border-color) 70%, transparent)`.
- `.summary-card` hover box-shadow reduced from `0 0 0 1px rgba(46, 204, 113, 0.2)` to `0 0 0 1px rgba(46, 204, 113, 0.12)`.
- `.service-tile` border-radius increased from 14px to 16px.
- `.prescription-card` border-radius increased from 10px to 12px.
- `.records-card` hover box-shadow reduced from 12% to 8%.
- `.care-hero` border-radius stays at 24px (already soft).
- All card hover `translateY(-2px)` reduced to `translateY(-1px)` for subtlety.

### Surface Treatment
- Background decorative orbs reduced in size: 380px -> 320px, 320px -> 260px.
- `.care-hero__visual` background gradient lightened: white mix from 14% to 10%.
- `.care-hero__orb` opacity reduced from 28% accent to 18%.
- `.care-hero__snapshot` box-shadow reduced from `0 12px 26px` to `0 8px 18px` at 6% opacity.

### Status & State Indicators
- `.rx-status` colors unchanged but with slightly lower opacity backgrounds if customized.
- `.notification-badge` stays red for urgency (no change -- safety signal).
- `.tile-badge` ("Soon") background opacity reduced from 8% to 6%.
- Skeleton shimmer animation unchanged (already subtle).

## SCSS Override Snippet
```scss
// Variation 1: Calm Clinical -- Patient Dashboard
// Softer hierarchy, lighter surfaces, more breathing room

.patient-dashboard {
  padding: 28px;
  padding-bottom: calc(80px + env(safe-area-inset-bottom, 0px));

  &::before {
    width: 320px;
    height: 320px;
    background: radial-gradient(circle, color-mix(in srgb, var(--accent-primary) 10%, transparent) 0%, transparent 70%);
  }

  &::after {
    width: 260px;
    height: 260px;
    background: radial-gradient(circle, color-mix(in srgb, #1d4ed8 8%, transparent) 0%, transparent 72%);
  }
}

.dashboard-header {
  margin-bottom: 36px;
}

.section-title {
  font-weight: 500;
}

.health-summary {
  margin-bottom: 36px;
}

.summary-card {
  padding: 20px;
  border-color: color-mix(in srgb, var(--border-color) 70%, transparent);

  &:hover {
    box-shadow: 0 0 0 1px rgba(46, 204, 113, 0.12);
    transform: translateY(-1px);
  }

  .summary-icon {
    &.consultations { background: rgba(46, 204, 113, 0.07); }
    &.prescriptions { background: rgba(174, 234, 0, 0.07); }
    &.records { background: rgba(29, 78, 216, 0.07); }
  }

  .summary-label {
    line-height: 1.6;
  }
}

.services-section {
  margin-bottom: 36px;
}

.services-grid {
  gap: 16px;
}

.service-tile {
  border-radius: 16px;

  &:hover:not(.coming-soon) {
    transform: translateY(-1px);
    box-shadow: 0 12px 24px color-mix(in srgb, var(--accent-primary) 10%, transparent);
  }

  .tile-title {
    font-weight: 500;
  }

  .tile-badge {
    background: color-mix(in srgb, var(--text-primary) 6%, transparent);
  }
}

.care-hero {
  padding: clamp(24px, 3vw, 32px);
  border-color: color-mix(in srgb, var(--accent-primary) 18%, transparent);
  box-shadow: 0 18px 40px color-mix(in srgb, var(--accent-primary) 6%, transparent);
}

.care-hero__text {
  line-height: 1.7;
}

.care-hero__visual {
  background:
    linear-gradient(160deg, color-mix(in srgb, var(--bg-card) 90%, white 10%), color-mix(in srgb, var(--bg-card) 96%, #dbeafe 4%));
}

.care-hero__orb {
  background:
    radial-gradient(circle, color-mix(in srgb, var(--accent-primary) 18%, white 24%) 0%, transparent 68%);
}

.care-hero__snapshot {
  box-shadow: 0 8px 18px color-mix(in srgb, #1d4ed8 6%, transparent);
}

.records-quick-access {
  margin-bottom: 36px;
}

.records-card {
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px color-mix(in srgb, var(--accent-primary) 8%, transparent);
  }
}

.recent-section {
  margin-bottom: 36px;
}

.prescription-card {
  border-radius: 12px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px color-mix(in srgb, var(--accent-primary) 8%, transparent);
  }
}

.status-banner {
  &--info {
    background: rgba(46, 204, 113, 0.10);
    border-color: rgba(46, 204, 113, 0.25);
  }
  &--error {
    background: rgba(239, 68, 68, 0.10);
    border-color: rgba(239, 68, 68, 0.25);
  }
}

.greeting-section .greeting-time {
  line-height: 1.6;
}
```

## Visual Description
The Calm Clinical dashboard feels spacious and unhurried. The greeting section has more vertical breathing room before the health summary cards appear. The decorative background orbs are barely perceptible, adding just enough color warmth without drawing attention. Summary cards sit in lighter-bordered containers with gentler padding, and their icon backgrounds are tinted so subtly they almost read as neutral surfaces with a hint of brand color.

The services grid has wider gaps between tiles, making each service feel like its own discrete, tappable target rather than a dense grid. Tile labels use medium weight instead of semibold, reducing visual shouting. The care hero section retains its gradient personality but with muted intensity -- the shadow beneath it is lighter, the border accent is softer, and the internal orb is more transparent. This makes the hero feel inviting rather than commanding.

Prescription cards and the health records shortcut both hover with minimal lift (1px instead of 2px), giving tactile feedback without dramatic motion. Overall, the page reads as a calm, trustworthy health companion rather than an information-dense dashboard.
