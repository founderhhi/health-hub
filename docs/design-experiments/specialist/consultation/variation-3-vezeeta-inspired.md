# Specialist Consultation Room -- V3: Vezeeta-Inspired

## Design Direction
Informed by Vezeeta's treatment-plan and follow-up patterns, plus broader telehealth best practices (KRY/Livi split-screen, Teladoc panel layouts). The consultation room becomes more structured: patient information is presented in a tabbed panel system, clinical actions are grouped into a visible action bar, and the chat/video area follows a clear hierarchy with the specialist's workflow tools foregrounded.

## Competitor Reference
**Vezeeta for Doctors:**
- Treatment plan delivery as a core post-consultation workflow
- Personalized messaging (clinic-branded) sent to patients
- Patient database with quick record access during consultation
- Appointment confirmation status visible alongside consultation

**KRY/Livi:**
- Split-screen layout: patient view on left, medical tools on right
- Chat-to-video transition as a natural escalation
- 15-minute consultation window with visible timer
- Clean, minimal video interface with status indicators

**Telehealth Best Practices (2025):**
- Real-time transcript display alongside video
- Lab results accessible on the same interface during calls
- High-acuity case flagging in patient lists
- Queue management with estimated wait times

**Key Patterns Adopted:**
1. **Tabbed patient panel**: Patient info, vitals, and notes organized in tabs (not stacked cards) for faster switching
2. **Structured action bar**: Quick actions reorganized as a horizontal toolbar with labeled icon-buttons (not floating FAB-style)
3. **Treatment plan prompt**: Post-consultation CTA to "Send Treatment Plan" (Vezeeta pattern)
4. **Consultation timer with session info**: Timer bar includes patient name and consultation type
5. **Flat, bordered panels**: Matching Vezeeta's flat card aesthetic in the provider portal

## Visual Changes

### Colors
- Patient panel: flat white `#FFFFFF` with `1px solid #E2E8F0` border, no shadow
- Vitals: each vital gets a colored top-border on its cell (heart rate = red, BP = blue, temp = amber, O2 = emerald)
- Quick action toolbar: `background: #FFFFFF` with `border-top: 1px solid #E2E8F0` (light mode toolbar, not dark)
- Active quick action: emerald background with dark text
- Chat area: light background `#F8FAFC` instead of dark `#121826` for the container (portal-style, not immersive-style)
- Chat bubbles: specialist = `#DBEAFE` (blue-100), patient = `#F1F5F9`

### Typography
- Panel tab labels: `13px` / `600` uppercase with `letter-spacing: 0.04em`
- Patient name in timer bar: `14px` / `600` alongside time display
- Card section headers: `12px` / `700` uppercase (functional portal headers)
- Vital values: `18px` / `700` (smaller than current, matching compact panels)
- Chat text: `14px` (standard portal size, not enlarged)

### Spacing
- Patient panel: organized as tabs with `40px` tab bar height, content area with `16px` padding
- Vitals grid: `12px` gap in a 2x2 grid (not 4-column) for compact display
- Quick action toolbar: `12px` gap between items, `48px` bar height, centered
- Chat container: `240px` height (smaller, since it shares space with structured panels)
- Consultation layout: `16px` gap between panels

### Borders & Radius
- All panels: `8px` radius (consistent portal feel)
- Video container: `8px` radius
- Chat container: `8px` radius
- Quick action items: `6px` radius (small rectangular buttons, not circles)
- Tab bar: `0px` radius, underline active indicator

### Surface & Shadow
- All panels: flat, no shadows -- `border: 1px solid #E2E8F0` only
- Video container: `border: 1px solid #1E293B` (thin, not thick)
- Quick action toolbar: flat with top border separator
- Tab underline: `2px solid #2ECC71` on active tab
- No hover transforms (portal UIs avoid playful interactions)

### Status
- Consultation timer: add patient name display `"Consulting: [Patient Name]"` in the timer bar
- Connection status: simple text "Connected" in green, no dot animation
- Post-consultation state: show "Send Treatment Plan" CTA button prominently (Vezeeta pattern)
- Quick actions: add text labels below icons, visible at all times (not hover-only)

## SCSS Override Snippet

```scss
// V3: Vezeeta-Inspired -- Consultation Room

.panel-card {
  background: v.$color-white;
  border: 1px solid v.$color-border;
  border-radius: v.$radius-md;
  padding: v.$space-md;
  box-shadow: none;
}

.card-title {
  font-size: v.$font-size-sm;
  font-weight: v.$font-weight-bold;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: v.$color-text-secondary;
}

.vitals-grid {
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.vital-item {
  background: v.$color-white;
  border: 1px solid v.$color-border;
  border-top: 2px solid v.$color-border;
  border-radius: v.$radius-md;
  padding: v.$space-sm;

  &:nth-child(1) { border-top-color: v.$color-danger; }  // Heart rate
  &:nth-child(2) { border-top-color: v.$color-info; }     // BP
  &:nth-child(3) { border-top-color: v.$color-warning; }  // Temp
  &:nth-child(4) { border-top-color: v.$color-emerald; }  // O2
}

.vital-value {
  font-size: v.$font-size-lg;
  color: v.$color-text-primary;
}

.video-container {
  border-radius: v.$radius-md;
  border: 1px solid v.$color-border-dark;
}

.chat-container {
  background: v.$color-surface;
  border: 1px solid v.$color-border;
  border-radius: v.$radius-md;
  height: 240px;
}

.chat-bubble {
  &--me .bubble-content {
    background: v.$color-info-light;
    color: v.$color-info-dark;
    border-radius: v.$radius-md v.$radius-md 0 v.$radius-md;
  }

  &--patient .bubble-content {
    background: v.$color-surface-elevated;
    border-radius: v.$radius-md v.$radius-md v.$radius-md 0;
  }
}

.bubble-content p {
  font-size: v.$font-size-base;
}

.quick-actions {
  background: v.$color-white;
  border-top: 1px solid v.$color-border;
  padding: v.$space-sm v.$space-lg;
  gap: 12px;
}

.quick-action {
  flex-direction: row;
  gap: v.$space-sm;
  padding: v.$space-sm v.$space-md;
  border: 1px solid v.$color-border;
  border-radius: 6px;
  background: v.$color-white;
  min-width: auto;

  &__icon {
    width: 28px;
    height: 28px;
    border-radius: v.$radius-sm;
    background: v.$color-surface;
  }

  &__label {
    font-size: v.$font-size-sm;
    font-weight: v.$font-weight-medium;
  }

  &:hover {
    background: v.$color-emerald-light;
    border-color: v.$color-emerald;

    .quick-action__icon {
      background: v.$color-emerald;
      color: v.$color-white;
    }
  }
}

.consultation-layout {
  gap: v.$space-md;
}

.timer-content {
  justify-content: space-between;
  padding: v.$space-sm v.$space-lg;
}

.connection-status {
  .status-dot {
    animation: none; // No pulse, static indicator
  }
}
```

## Visual Description
The consultation room transforms into a structured clinical portal. All panels are flat white with thin borders and 8px radius -- no shadows, no depth illusion, just clean workspaces. Vitals display in a compact 2x2 grid with colored top-borders per metric type (red for heart rate, blue for BP). The quick action bar sits at the bottom as a light-mode toolbar with horizontal rectangular button-chips (icon + label side-by-side, bordered), not floating dark circles -- this matches Vezeeta's action-oriented portal toolbar pattern. The chat area uses a light background with blue specialist bubbles and gray patient bubbles, feeling more like a clinical messaging tool than a consumer chat. The timer bar expands to show the patient name alongside the elapsed time. The overall feel is portal-utilitarian: efficient, structured, and focused on clinical workflow rather than aesthetic immersion.
