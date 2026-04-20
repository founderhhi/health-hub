# AI Chat -- Variation 3: Halodoc-Inspired Consumer Health

## Design Direction
Apply consumer health chat patterns: flat borderless chat container, compact message bubbles, prominent action CTAs, and a simpler input area. The chat should feel like messaging a doctor in a consumer health app.

## Competitor Reference
Halodoc's "Chat with Doctor" feature uses:
- A clean chat interface with minimal chrome -- no heavy container border or shadow.
- User messages as colored bubbles (brand color), doctor messages as light gray bubbles.
- A simple input bar at the bottom with a send icon (no text label).
- Action buttons (e.g., "Book appointment", "Order medicine") displayed as horizontal chips above the input.
- Chat history displayed in a scrollable area with compact bubble spacing.

Zuri Health's WhatsApp-style integration suggests ultra-minimal chat styling with focus on the conversation content.

## Visual Changes

### Colors
- Page background: `#F5F7FA`.
- Chat shell: `#FFFFFF`, no border.
- User message: `#2ECC71` with `color: #FFFFFF` (unchanged but on flat surface).
- Assistant message: `#F1F5F9` background, no border.
- Usage bar: `background: #E2E8F0; fill: #2ECC71` (simpler).

### Typography
- `.page-title` at 20px semibold Inter.
- `.page-subtitle` at 13px.
- `.message` font-size at 14px, line-height 1.5.

### Spacing & Layout
- `.chat-shell` padding: 14px.
- `.chat-shell` no gap label (use spacing from children).
- `.messages-list` gap: 8px (tighter, more chat-like).
- `.message` padding: `8px 12px`.
- `.input-row` gap: 8px.

### Borders & Shadows
- `.chat-shell`: `border: none; box-shadow: none; border-radius: 16px`.
- `.message`: `border-radius: 18px 18px 6px 18px` (user), `18px 18px 18px 6px` (assistant).
- `.chat-input`: `border-radius: 999px` (pill input).
- `.send-btn`: `border-radius: 999px; min-width: 44px; padding: 0` (circular send button).
- CTA buttons: `border-radius: 999px` (pill buttons).

### Surface Treatment
- No decorative elements.
- CTA buttons as horizontal pills rather than full-width blocks.

### Status & State Indicators
- Usage row: simplified to just text, no bar (or very thin 4px bar).
- Typing indicator unchanged.
- Limit message: simple inline text, no special container.

## SCSS Override Snippet
```scss
// Variation 3: Halodoc-Inspired -- AI Chat

.ai-chat-page {
  background: #F5F7FA;
  padding: 16px;
  padding-bottom: calc(88px + env(safe-area-inset-bottom, 0px));
}

.page-title {
  font-size: 20px;
  font-weight: 600;
}

.page-subtitle {
  font-size: 13px;
}

.chat-shell {
  background: #FFFFFF;
  border: none;
  box-shadow: none;
  border-radius: 16px;
  padding: 14px;
  gap: 12px;
}

.usage-bar {
  height: 4px;
  background: #E2E8F0;
}

.usage-fill {
  background: #2ECC71;
}

.usage-text {
  font-size: 11px;
}

.cta-row {
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
}

.gp-cta,
.diagnostics-cta {
  min-height: 36px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  padding: 0 16px;
  flex: 0 1 auto;

  &:hover {
    transform: none;
  }
}

.diagnostics-cta {
  border-width: 1px;
}

.messages-list {
  gap: 8px;
}

.message {
  padding: 8px 12px;
  border-radius: 18px 18px 6px 18px;
  font-size: 14px;
  line-height: 1.5;
}

.message--assistant {
  border-radius: 18px 18px 18px 6px;
  background: #F1F5F9;
  border: none;
}

.limit-message {
  border: none;
  background: transparent;
  padding: 8px 0;
  font-size: 12px;
  color: #64748B;
}

.input-row {
  gap: 8px;
}

.chat-input {
  border-radius: 999px;
  background: #F1F5F9;
  border: none;
  padding: 0 16px;
  font-size: 14px;

  &:focus-visible {
    outline: 2px solid #2ECC71;
  }
}

.send-btn {
  min-width: 44px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  padding: 0;
  font-size: 0; // Hide text, use as icon button
  background: #2ECC71;

  &::after {
    content: '';
    display: block;
    width: 18px;
    height: 18px;
    margin: auto;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5'%3E%3Cline x1='22' y1='2' x2='11' y2='13'/%3E%3Cpolygon points='22 2 15 22 11 13 2 9 22 2'/%3E%3C/svg%3E") center / contain no-repeat;
  }

  &:hover:not(:disabled) {
    background: #27AE60;
  }
}

.send-error {
  border: none;
  background: #FEF2F2;
  border-radius: 12px;
}
```

## Visual Description
The AI chat looks and feels like a consumer messaging app. The chat container is a flat white card on a gray background with no borders or shadows. Messages are compact with tighter spacing, creating a real chat conversation feel.

CTA buttons are displayed as horizontal pill-shaped chips rather than full-width blocks, making them feel like quick-action suggestions in a chat context. The input area uses a pill-shaped text field (borderless, light gray background) paired with a circular emerald send button -- a pattern familiar from WhatsApp and similar messaging apps.

The usage indicator is minimized to a thin 4px bar with small text, preventing it from dominating the interface. Assistant messages use a neutral gray background with no border, keeping the conversation visually clean. The limit message is simple inline text rather than a boxed container.

The overall effect is of chatting with a health assistant in a familiar, consumer-grade messaging interface.
