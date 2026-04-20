# Appointments -- Variation 2: Premium Guided

## Design Direction
Elevate the appointments page with richer card framing, Fraunces serif for the page title, subtle card shadows, and more expressive status indicators. Appointment cards should feel like premium booking confirmations.

## Visual Changes

### Colors
- `.doctor-avatar` gets a subtle ring: `box-shadow: 0 0 0 3px color-mix(in srgb, #2ECC71 20%, transparent)`.
- Status badges get slightly bolder backgrounds (+3% opacity).
- `.tab-btn.active` background becomes gradient: `linear-gradient(135deg, #2ECC71, #27AE60)`.
- Urgency indicators get a left border accent: `border-left: 3px solid currentColor`.

### Typography
- `.page-title` uses `'Fraunces', serif` at 22px.
- `.doctor-name` at 17px semibold.
- `.empty-title` uses `'Fraunces', serif`.

### Spacing & Layout
- `.appointment-card` padding stays at 16px but gets `padding-left: 20px` for slight asymmetry.
- `.appointment-actions` padding-top increased from 16px to 20px.

### Borders & Shadows
- `.appointment-card` gets default shadow: `box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05)`.
- `.appointment-card` border-radius increased to 14px.
- `.btn-primary` border-radius increased from 8px to 10px.
- `.btn-primary` gets gradient: `background: linear-gradient(135deg, #2ECC71, #27AE60)`.
- `.tabs-container` gets `box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04)`.

### Surface Treatment
- Cards get a subtle hover lift: `&:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08); }`.
- `.btn-primary` hover includes `transform: translateY(-1px)` and deeper shadow.

### Status & State Indicators
- Status badges get `font-weight: 700` for stronger presence.
- `.urgency-indicator` gets `border-left: 3px solid currentColor; padding-left: 12px`.
- Mode badges get pill shape: `border-radius: 999px; padding: 3px 10px`.

## SCSS Override Snippet
```scss
// Variation 2: Premium Guided -- Appointments
// Richer cards, gradient CTAs, Fraunces headings

.page-title {
  font-family: 'Fraunces', 'Iowan Old Style', 'Georgia', serif;
  font-size: 22px;
}

.tabs-container {
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
}

.tab-btn.active {
  background: linear-gradient(135deg, #2ECC71, #27AE60);
}

.appointment-card {
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
  padding-left: 20px;
  transition: transform 200ms ease, box-shadow 200ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
  }
}

.doctor-avatar {
  box-shadow: 0 0 0 3px color-mix(in srgb, #2ECC71 20%, transparent);
}

.doctor-details .doctor-name {
  font-size: 17px;
}

.status-badge {
  font-weight: 700;
}

.urgency-indicator {
  border-left: 3px solid currentColor;
  padding-left: 12px;
}

.detail-item .mode-badge {
  border-radius: 999px;
  padding: 3px 10px;
}

.btn-primary {
  border-radius: 10px;
  background: linear-gradient(135deg, #2ECC71, #27AE60);

  &:hover {
    background: linear-gradient(135deg, #27AE60, #219653);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(46, 204, 113, 0.25);
  }
}

.empty-state .empty-title {
  font-family: 'Fraunces', 'Iowan Old Style', 'Georgia', serif;
}
```

## Visual Description
The appointments page feels polished and intentional. The page title in Fraunces serif gives it an editorial quality. Appointment cards have a subtle resting shadow that lifts them off the surface, and they hover with a gentle rise. The doctor avatar is framed with a soft emerald ring, creating a premium profile picture treatment.

The active tab uses a gradient fill, and the "Join Consultation" CTA button matches with its own gradient. Urgency indicators have a left border accent that creates a visual language similar to priority markers in premium apps. Status badges are bolder, using heavier font weight for stronger readability.

The overall impression is of a well-crafted booking experience that treats each appointment as an important event.
