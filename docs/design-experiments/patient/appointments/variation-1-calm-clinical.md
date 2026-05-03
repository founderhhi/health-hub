# Appointments -- Variation 1: Calm Clinical

## Design Direction
Reduce visual density on the appointments page by softening card borders, increasing padding within appointment cards, lightening status badge backgrounds, and adding more whitespace between list items. The page should feel unhurried and easy to scan.

## Visual Changes

### Colors
- `.tabs-container` background lightened: use `color-mix(in srgb, var(--bg-card) 80%, var(--bg-primary) 20%)`.
- `.tab-btn.active` background softened from pure `#2ECC71` to `color-mix(in srgb, #2ECC71 85%, white 15%)`.
- Status badge backgrounds reduced by ~5% opacity across all states.
- `.doctor-avatar` background softened: `color-mix(in srgb, #2ECC71 80%, white 20%)`.

### Typography
- `.page-title` weight reduced from 600 to 500.
- `.doctor-name` line-height increased to 1.4.
- `.doctor-specialty` line-height increased to 1.6.
- Detail item text line-height set to 1.5.

### Spacing & Layout
- `.appointment-card` padding increased from 16px to 20px.
- `.appointments-list` gap increased from 16px to 20px.
- `.appointment-header` margin-bottom increased from 16px to 20px.
- `.appointment-details` padding-bottom increased from 16px to 20px.
- `.tabs-container` margin-bottom increased from 32px to 36px.

### Borders & Shadows
- `.appointment-card` border color lightened: `color-mix(in srgb, var(--border-color) 70%, transparent)`.
- `.appointment-card` border-radius increased from 12px to 14px.
- `.tabs-container` border-radius increased from 12px to 14px.
- `.tab-btn` radius from 8px to 10px.
- `.urgency-indicator` border-radius from 6px to 8px.

### Surface Treatment
- No changes to page background (already clean).
- `.appointment-card` hover state removed (cards are not interactive -- only the CTA button is).
- `.past-card` opacity increased from 0.7 to 0.75 for slightly better readability.

### Status & State Indicators
- `.status-confirmed` background from 20% to 15% opacity.
- `.status-pending` background from 20% to 15%.
- `.status-completed` background from 20% to 15%.
- `.status-cancelled` background from 20% to 15%.
- `.empty-state` icon size increased from 48px to 56px, gap increased to 20px.

## SCSS Override Snippet
```scss
// Variation 1: Calm Clinical -- Appointments
// Softer cards, more breathing room, lighter status badges

.page-title {
  font-weight: 500;
}

.tabs-container {
  background: color-mix(in srgb, var(--bg-card) 80%, var(--bg-primary) 20%);
  border-radius: 14px;
  margin-bottom: 36px;
}

.tab-btn {
  border-radius: 10px;

  &.active {
    background: color-mix(in srgb, #2ECC71 85%, white 15%);
  }
}

.appointments-list {
  gap: 20px;
}

.appointment-card {
  padding: 20px;
  border-color: color-mix(in srgb, var(--border-color) 70%, transparent);
  border-radius: 14px;
}

.appointment-header {
  margin-bottom: 20px;
}

.appointment-details {
  padding-bottom: 20px;
}

.doctor-avatar {
  background: color-mix(in srgb, #2ECC71 80%, white 20%);
}

.doctor-details {
  .doctor-name { line-height: 1.4; }
  .doctor-specialty { line-height: 1.6; }
}

.status-badge {
  &.status-confirmed { background: rgba(46, 204, 113, 0.15); }
  &.status-live { background: rgba(59, 130, 246, 0.13); }
  &.status-completed { background: rgba(96, 165, 250, 0.15); }
  &.status-pending { background: rgba(245, 158, 11, 0.15); }
  &.status-cancelled { background: rgba(239, 68, 68, 0.15); }
  &.status-declined { background: rgba(239, 68, 68, 0.15); }
}

.urgency-indicator {
  border-radius: 8px;
}

.past-card {
  opacity: 0.75;
}

.empty-state {
  gap: 20px;

  .empty-icon {
    width: 56px;
    height: 56px;
  }
}
```

## Visual Description
The appointments page feels calm and orderly. Cards have softer borders and more internal padding, giving each appointment room to breathe. The tab bar uses a slightly translucent background that blends with the page rather than sitting as a hard surface. The active tab is a slightly lighter emerald, reducing the visual jump between active and inactive states.

Status badges use more transparent backgrounds, making them read as gentle labels rather than attention-grabbing indicators. The doctor avatar is a softer emerald tint. Past appointment cards are slightly more visible than before (0.75 vs 0.7), improving scanability while still conveying their historical nature.

Empty states use a larger icon and more spacing, creating a calmer "nothing here yet" message rather than a cramped placeholder.
