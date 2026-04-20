# Medical Records -- Variation 2: Premium Guided

## Design Direction
Elevate the records page with Fraunces serif headings, richer card framing with resting shadows, more expressive record type icons, and a QR modal that feels like a premium document viewer.

## Visual Changes

### Colors
- `.record-icon.rx-icon` background richer: 14% opacity.
- `.record-icon.lab-icon` background richer: 14% opacity.
- Record icons get a subtle inner border: `box-shadow: inset 0 0 0 1px rgba(0,0,0,0.04)`.

### Typography
- `.page-title` uses `'Fraunces', serif` at 22px.
- `.record-title` at 17px semibold.
- `.empty-title` uses `'Fraunces', serif`.
- `.qr-modal-title` uses `'Fraunces', serif`.
- `.med-name` at 15px medium weight.

### Spacing & Layout
- `.record-card` padding stays 16px but left padding increases to 20px.
- `.record-header` gap increased from 16px to 18px.

### Borders & Shadows
- `.record-card` gets resting shadow: `0 2px 8px rgba(15, 23, 42, 0.05)`.
- `.record-card` border-radius increased to 14px.
- `.record-card` hover: `transform: translateY(-1px); box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08)`.
- `.record-icon` border-radius from 12px to 14px.
- `.qr-modal-content` border-radius increased from 16px to 20px.
- `.qr-prescription-card` gets enhanced shadow: `box-shadow: 0 0 0 1px rgba(46, 204, 113, 0.2), 0 0 40px rgba(46, 204, 113, 0.15)`.

### Surface Treatment
- `.qr-modal-content` background stays `$color-surface-1` but with a subtle emerald border accent.
- Record cards get hover transitions for lift effect.

### Status & State Indicators
- Status badges get `font-weight: 700`.
- Lab status messages get left border: `border-left: 3px solid currentColor`.

## SCSS Override Snippet
```scss
// Variation 2: Premium Guided -- Medical Records

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

.record-card {
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
  padding-left: 20px;
  transition: transform 200ms ease, box-shadow 200ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
  }
}

.record-icon {
  border-radius: 14px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.04);

  &.rx-icon { background: rgba(46, 204, 113, 0.14); }
  &.lab-icon { background: rgba(59, 130, 246, 0.14); }
}

.record-header {
  gap: 18px;
}

.record-info .record-title {
  font-size: 17px;
}

.med-details .med-name {
  font-size: 15px;
}

.status-badge {
  font-weight: 700;
}

.lab-status-message {
  border-left: 3px solid currentColor;
  padding-left: 14px;
}

.empty-state .empty-title {
  font-family: 'Fraunces', 'Iowan Old Style', 'Georgia', serif;
}

.qr-modal-title {
  font-family: 'Fraunces', 'Iowan Old Style', 'Georgia', serif;
}

.qr-modal-content {
  border-radius: 20px;
}

.qr-prescription-card {
  box-shadow: 0 0 0 1px rgba(46, 204, 113, 0.2),
    0 0 40px rgba(46, 204, 113, 0.15);
}
```

## Visual Description
The records page has the feel of a premium health document viewer. Fraunces serif titles give it an editorial quality. Record cards have subtle resting shadows and hover with a gentle lift. Record type icons are more richly tinted with an imperceptible inner border that adds material depth.

The QR prescription modal feels particularly premium, with a rounder container and a more luminous emerald glow around the prescription card. Lab status messages have a left-border accent that creates a visual priority lane. Status badges are bolder with heavier weight text. The overall effect is of a health records system you would expect from a well-funded digital health platform.
