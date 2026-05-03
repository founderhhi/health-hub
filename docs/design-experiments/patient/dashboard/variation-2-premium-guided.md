# Patient Dashboard -- Variation 2: Premium Guided

## Design Direction
Elevate the dashboard with richer surface depth, Fraunces serif for section headings, confident gradient CTAs, and more intentional card framing. The result should feel like a premium consumer health app that guides patients through their care journey with visual confidence.

## Visual Changes

### Colors
- Care hero gradient intensified slightly: accent primary mix from 18% to 22% on top-right radial.
- Care hero action button gets a gradient: `linear-gradient(135deg, #2ECC71, #27AE60)`.
- Section titles gain a subtle emerald tint: `color-mix(in srgb, var(--text-primary) 88%, var(--accent-primary) 12%)`.
- Summary card icon backgrounds slightly richer: emerald 12%, bio-lime 12%, blue 12%.
- Neutral background surfaces gain a barely warm tint: `#FAFAF9` (instead of pure `--bg-primary`).

### Typography
- `.section-title` uses `'Fraunces', serif` with `font-weight: 600` and `letter-spacing: -0.01em`.
- `.greeting-section .user-name` uses `'Fraunces', serif` at 26px.
- `.care-hero__title` size bumped to `clamp(26px, 3.6vw, 32px)`.
- `.summary-value` gets `letter-spacing: -0.02em` for tighter number presentation.
- `.records-title` uses `'Fraunces', serif`.

### Spacing & Layout
- `.summary-card` min-width increased from 140px to 148px for more generous proportions.
- `.care-hero` gap increased: `clamp(16px, 2.2vw, 24px)`.
- `.care-hero__signals` gap from 8px to 10px.
- Service tile `aspect-ratio` maintained but padding increased to `14px 10px 12px`.

### Borders & Shadows
- `.summary-card` gets `box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06)` by default (not just on hover).
- `.summary-card` border-radius increased from 12px to 14px.
- `.service-tile` gets default shadow: `0 1px 4px rgba(15, 23, 42, 0.04)`.
- `.records-card` border-radius increased from 12px to 14px with default `box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05)`.
- `.prescription-card` border-radius increased from 10px to 14px.
- `.care-hero` box-shadow enriched to `0 20px 48px color-mix(in srgb, var(--accent-primary) 16%, transparent)`.
- Care hero action button gets `box-shadow: 0 4px 12px color-mix(in srgb, var(--accent-primary) 20%, transparent)` at rest.

### Surface Treatment
- `.care-hero__action` background becomes gradient: `linear-gradient(135deg, #2ECC71, #27AE60)`.
- `.care-hero__action:hover` intensifies to `linear-gradient(135deg, #27AE60, #219653)` with stronger lift shadow.
- Summary cards get a `transition: transform 250ms ease, box-shadow 250ms ease` with `&:hover { transform: translateY(-2px) scale(1.01); }`.
- Service tiles get `transition: transform 200ms ease, box-shadow 200ms ease` with hover scale: `transform: translateY(-2px) scale(1.02)`.

### Status & State Indicators
- `.rx-status` badges get slightly bolder backgrounds (opacity +5% across all states).
- `.notification-badge` gains a subtle white border: `border: 2px solid var(--bg-primary)` for premium badge treatment.
- `.care-hero__signal` pills get a more defined border: `border: 1px solid color-mix(in srgb, var(--accent-primary) 25%, var(--border-color))`.

## SCSS Override Snippet
```scss
// Variation 2: Premium Guided -- Patient Dashboard
// Richer depth, Fraunces headings, confident CTAs

.section-title {
  font-family: 'Fraunces', 'Iowan Old Style', 'Georgia', serif;
  letter-spacing: -0.01em;
  color: color-mix(in srgb, var(--text-primary) 88%, var(--accent-primary) 12%);
}

.greeting-section .user-name {
  font-family: 'Fraunces', 'Iowan Old Style', 'Georgia', serif;
  font-size: 26px;
}

.summary-card {
  min-width: 148px;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
  transition: transform 250ms ease, box-shadow 250ms ease, background 200ms ease-in-out;

  &:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.10);
  }

  .summary-icon {
    &.consultations { background: rgba(46, 204, 113, 0.12); }
    &.prescriptions { background: rgba(174, 234, 0, 0.12); }
    &.records { background: rgba(29, 78, 216, 0.12); }
  }

  .summary-value {
    letter-spacing: -0.02em;
  }
}

.service-tile {
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.04);
  padding: 14px 10px 12px;
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease, background 200ms ease;

  &:hover:not(.coming-soon) {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 14px 28px color-mix(in srgb, var(--accent-primary) 18%, transparent);
  }
}

.care-hero {
  gap: clamp(16px, 2.2vw, 24px);
  box-shadow: 0 20px 48px color-mix(in srgb, var(--accent-primary) 16%, transparent);
}

.care-hero__title {
  font-size: clamp(26px, 3.6vw, 32px);
}

.care-hero__signals {
  gap: 10px;
}

.care-hero__signal {
  border-color: color-mix(in srgb, var(--accent-primary) 25%, var(--border-color));
}

.care-hero__action {
  background: linear-gradient(135deg, #2ECC71, #27AE60);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--accent-primary) 20%, transparent);

  &:hover {
    background: linear-gradient(135deg, #27AE60, #219653);
    transform: translateY(-2px);
    box-shadow: 0 10px 24px color-mix(in srgb, var(--accent-primary) 30%, transparent);
  }
}

.records-card {
  border-radius: 14px;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);
}

.records-title {
  font-family: 'Fraunces', 'Iowan Old Style', 'Georgia', serif;
}

.prescription-card {
  border-radius: 14px;
}

.notification-badge {
  border: 2px solid var(--bg-primary);
}

.rx-status {
  &.status-active { color: #2ECC71; background: rgba(46, 204, 113, 0.18); }
  &.status-claimed { color: #F59E0B; background: rgba(245, 158, 11, 0.18); }
  &.status-fulfilled { color: #60A5FA; background: rgba(96, 165, 250, 0.18); }
}
```

## Visual Description
The Premium Guided dashboard immediately reads as more considered and polished. The user's name is rendered in Fraunces serif, giving the greeting a warm, editorial quality. Section titles ("Services", "Recent Prescriptions") also use Fraunces, creating a clear typographic hierarchy between headings (serif) and body content (Inter).

Health summary cards float with a subtle resting shadow, making them feel elevated from the surface even before interaction. On hover, they lift slightly and scale up 1%, creating a satisfying micro-interaction. The service tile grid has the same scale-on-hover behavior, making the entire grid feel responsive and alive.

The care hero section is the centerpiece -- its shadow is deeper and richer, the CTA button uses a gradient fill that transitions from bright emerald to deeper green, with a persistent glow shadow that intensifies on hover. Signal pills have crisper borders. The overall effect is a dashboard that feels like it was designed by a premium health brand -- confident, guided, and worth trusting with your health data.

Prescription cards and the records shortcut have slightly rounder corners (14px) and resting shadows, maintaining the elevated card language throughout the page.
