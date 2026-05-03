# Specialist Consultation Room -- V1: Operational Clarity

## Design Direction
Sharper clinical workspace. The consultation room is a high-stakes, time-sensitive environment. This variation emphasizes clear panel separation, stronger section headers, tighter information density in the patient panel, and more visible action hierarchy in quick-action buttons.

## Visual Changes

### Colors
- Patient panel cards: add `border-left: 3px solid #E2E8F0` to all panel cards for visual anchoring; chief complaint card uses `border-left-color: #F59E0B` (amber warning)
- Vitals grid: individual vital items get a `background: #F8FAFC` with `1px solid #E2E8F0` border for distinct cell separation
- Quick action icons: active state uses solid emerald `#2ECC71` background (not just hover); disabled uses `#1E293B` (darker than current)
- Chat bubble (me): switch from emerald to `#1D4ED8` (info blue) for clearer sender distinction
- Session timer progress bar: use solid emerald instead of gradient (sharper, no bio-lime)

### Typography
- Card titles ("Chief Complaint", "Visit Context"): increase to `13px` / `700` weight (from 12px / 600) with `letter-spacing: 0.06em`
- Patient name: increase to `20px` / `700` for stronger anchoring in the panel
- Vital values: use `font-family: $font-family-mono` for numeric precision feel
- Vital labels: increase to `12px` (from 11px) for legibility
- Context values: increase weight to `500` (from 400) for scannability
- Quick action labels: increase to `12px` / `600` (from 11px / 500)

### Spacing
- Patient panel card padding: reduce from `16px` to `14px` for tighter clinical density
- Vitals grid gap: reduce from `16px` to `12px`
- Context grid gap: reduce from `16px` to `12px`
- Chat bubble padding: reduce from `8px 16px` to `6px 12px` for denser message thread
- Quick action gap: reduce from `16px` to `12px`

### Borders & Radius
- Panel cards: reduce radius from `12px` to `8px`
- Chat bubbles: reduce radius from `8px` to `6px`
- Video container: keep `12px`
- Quick action icons: reduce from `9999px` (circle) to `12px` (rounded square) for a more tool-like feel
- Notes textarea: reduce radius from `8px` to `4px`

### Surface & Shadow
- Panel cards: remove shadow entirely, use `border: 1px solid #E2E8F0` only
- Video container: add `border: 2px solid #1E293B` for stronger frame definition
- Chat container: add `border: 2px solid #1E293B`
- Quick action bar: add `border-top: 2px solid #1E293B` (thicker separator)

### Status
- Connection status dot: increase from `8px` to `10px`, add `border: 2px solid` matching background for stronger visibility
- Timer time: add `background: rgba(46, 204, 113, 0.1)` pill behind the time value for emphasis
- End call button: add `border: 2px solid #991B1B` in addition to red background

## SCSS Override Snippet

```scss
// V1: Operational Clarity -- Consultation Room

.panel-card {
  border-radius: v.$radius-md;
  padding: 14px;
  box-shadow: none;
  border: 1px solid v.$color-border;
  border-left: 3px solid v.$color-border;
}

// Chief complaint card gets amber accent
.patient-summary + .panel-card {
  border-left-color: v.$color-warning;
}

.card-title {
  font-size: 13px;
  font-weight: v.$font-weight-bold;
  letter-spacing: 0.06em;
}

.patient-name {
  font-size: v.$font-size-xl;
  font-weight: v.$font-weight-bold;
}

.vital-item {
  background: v.$color-surface;
  border: 1px solid v.$color-border;
  border-radius: v.$radius-sm;
  padding: v.$space-sm;
}

.vital-value {
  font-family: v.$font-family-mono;
}

.vital-label {
  font-size: v.$font-size-sm;
}

.vitals-grid {
  gap: 12px;
}

.context-grid {
  gap: 12px;
}

.context-value {
  font-weight: v.$font-weight-medium;
}

.quick-action__icon {
  border-radius: v.$radius-lg; // 12px rounded square
}

.quick-action__label {
  font-size: v.$font-size-sm;
  font-weight: v.$font-weight-semibold;
}

.chat-bubble {
  &--me .bubble-content {
    background: rgba(29, 78, 216, 0.15);
    color: #BFDBFE;
  }
}

.bubble-content {
  padding: 6px 12px;
}

.video-container {
  border: 2px solid v.$color-border-dark;
}

.timer-time {
  background: rgba(46, 204, 113, 0.1);
  padding: 2px 8px;
  border-radius: v.$radius-sm;
}

.timer-progress__bar {
  background: v.$color-emerald; // solid, no gradient
}

.notes-textarea {
  border-radius: v.$radius-sm;
}

.status-dot {
  width: 10px;
  height: 10px;
  border: 2px solid v.$color-card-bg;
}

.end-call-btn {
  border: 2px solid v.$color-danger-dark;
}
```

## Visual Description
The consultation room feels like a clinical workstation. Panel cards have left-border accents (amber for chief complaint) and no shadows -- clean bordered containers that prioritize content over decoration. Vital values use monospace type for numeric precision, each housed in a distinct bordered cell. The patient name is large and bold at 20px/700 for instant identification. Quick action buttons use rounded squares instead of circles, reinforcing a tool-palette metaphor. Chat bubbles are tighter and the specialist's messages use blue (not green) for clear sender differentiation. The video frame has a thicker border for strong visual separation. Everything is tighter, crisper, and more workspace-efficient.
