# Specialist Consultation Room -- V2: Premium Guided

## Design Direction
A richer, more immersive consultation experience. The specialist is guiding a patient through a high-trust interaction -- the room should feel confident, polished, and calm. Deeper shadows, warmer surfaces, Fraunces serif for panel headings, smoother transitions, and more considered video framing.

## Visual Changes

### Colors
- Patient panel cards: use warm white `#FEFDFB` background with `border: 1px solid #EDF2F7` (softer border)
- Patient avatar: richer gradient `linear-gradient(135deg, #2ECC71 0%, #166534 100%)` with subtle `box-shadow: 0 4px 12px rgba(46, 204, 113, 0.25)`
- Chat bubble (me): use deeper emerald `#27AE60` with white text for stronger brand presence
- Quick action hover: emerald background with `box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3)` glow
- Video overlay gradient: extend from `rgba(0,0,0,0.6)` to `rgba(0,0,0,0.4)` over `40%` height for gentler fade
- Session timer bar: keep gradient but use `#2ECC71` to `#22C55E` (emerald range, dropping bio-lime)

### Typography
- Card titles: use `'Fraunces', serif` at `13px` / `600` weight for premium section headers
- Patient name: `20px` / `600` in the panel, `18px` in the video overlay (both Fraunces serif)
- Timer time: increase to `20px` for more visual weight
- Complaint text: increase `line-height` to `1.7` for more readable clinical narrative
- Chat bubble text: increase to `15px` for comfortable reading during consultation

### Spacing
- Patient panel card padding: increase from `16px` to `20px`
- Patient header gap: increase from `16px` to `20px`
- Notes textarea min-height: increase from `120px` to `140px` for more generous writing space
- Chat container height: increase from `280px` to `320px` for more visible message history
- Consultation layout gap: increase from `24px` to `32px`

### Borders & Radius
- Panel cards: increase radius from `12px` to `16px`
- Video container: increase radius from `12px` to `16px`
- Chat container: increase radius from `12px` to `16px`
- Video PIP: increase radius from `8px` to `12px`
- Quick action icons: keep circle but increase to `48px` (from `44px`)
- Patient avatar: keep full circle

### Surface & Shadow
- Panel cards: add shadow `0 2px 8px rgba(15, 23, 42, 0.06)` (between sm and md)
- Video container: add `box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2)` for cinematic depth
- Chat container: add `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)`
- Quick action bar: add `background: linear-gradient(180deg, rgba(18, 24, 38, 0.95), #121826)` for richer backdrop
- Panel cards: add `transition: box-shadow 200ms ease` and subtle hover shadow increase

### Status
- Connection status: add `background: rgba(46, 204, 113, 0.1)` pill behind "Connected" text
- LIVE indicators: add subtle glow `box-shadow: 0 0 12px rgba(46, 204, 113, 0.3)`
- End call button: add `transition: all 200ms ease` with scale `1.02` on hover before the translateY

## SCSS Override Snippet

```scss
// V2: Premium Guided -- Consultation Room

.panel-card {
  background: #FEFDFB;
  border: 1px solid #EDF2F7;
  border-radius: v.$radius-xl;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
  transition: box-shadow 200ms ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
  }
}

.card-title {
  font-family: 'Fraunces', serif;
  font-size: 13px;
  font-weight: v.$font-weight-semibold;
}

.patient-avatar {
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.25);
}

.patient-name {
  font-family: 'Fraunces', serif;
  font-size: v.$font-size-xl;
}

.patient-header {
  gap: 20px;
}

.complaint-text {
  line-height: 1.7;
}

.video-container {
  border-radius: v.$radius-xl;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.video-pip {
  border-radius: v.$radius-lg;
}

.chat-container {
  border-radius: v.$radius-xl;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: 320px;
}

.chat-bubble--me .bubble-content {
  background: #27AE60;
  color: v.$color-white;
}

.bubble-content p {
  font-size: 15px;
}

.consultation-layout {
  gap: v.$space-xl;
}

.quick-action__icon {
  width: 48px;
  height: 48px;

  &:hover {
    box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
  }
}

.quick-actions {
  background: linear-gradient(180deg, rgba(18, 24, 38, 0.95), #121826);
}

.timer-time {
  font-size: v.$font-size-xl;
}

.connection-status {
  background: rgba(46, 204, 113, 0.1);
  padding: 2px 10px;
  border-radius: v.$radius-full;
}

.notes-textarea {
  min-height: 140px;
}

.video-overlay {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, transparent 40%);
}

.end-call-btn {
  transition: all 200ms ease;

  &:hover {
    transform: scale(1.02) translateY(-2px);
  }
}

.timer-progress__bar {
  background: linear-gradient(90deg, v.$color-emerald, #22C55E);
}
```

## Visual Description
The consultation room feels immersive and trustworthy. Panel cards use warm white backgrounds with softer borders and 16px radius, creating a gentle container system. Section headers are set in Fraunces serif -- small but distinctive, adding quiet authority. The video frame has cinematic shadow depth, the PIP view is smoothly rounded. The patient avatar glows subtly with an emerald shadow. Chat is roomier at 320px height with 15px text for comfortable reading during the consultation. The quick action bar has a rich gradient backdrop, and action icons are slightly larger at 48px with an emerald glow on hover. The end-call button scales subtly before lifting. The overall feel is that of a premium telehealth suite -- confident, polished, and designed to make both specialist and patient feel the interaction is high-quality.
