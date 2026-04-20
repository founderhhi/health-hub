# AI Chat -- Variation 1: Calm Clinical

## Design Direction
Soften the AI chat interface with lighter message bubbles, more generous spacing between messages, a gentler usage bar, and calmer CTA treatments. The chat should feel like a supportive conversation, not a technical interface.

## Visual Changes

### Colors
- User message bubble: softer emerald -- `color-mix(in srgb, var(--accent-primary) 85%, white 15%)`.
- Assistant message border lightened: `color-mix(in srgb, var(--border-color) 70%, transparent)`.
- Usage bar fill: `color-mix(in srgb, var(--accent-primary) 80%, white 20%)` for a lighter bar.
- `.send-error` background softened: `#FEF2F2` with `color: #B91C1C` (less harsh red).
- `.diagnostics-cta` border reduced from 2px to 1px.

### Typography
- `.page-title` weight from 700 to 600.
- `.page-subtitle` line-height from default to 1.6.
- `.message` line-height from 1.45 to 1.55 for easier reading.
- `.limit-message` line-height set to 1.6.

### Spacing & Layout
- `.chat-shell` padding from 16px to 20px.
- `.chat-shell` gap from 14px to 18px.
- `.messages-list` gap from 10px to 14px.
- `.message` padding from `10px 12px` to `12px 16px`.
- `.input-row` gap from 10px to 12px.

### Borders & Shadows
- `.chat-shell` border-radius stays 16px (already soft).
- `.chat-shell` border color lightened.
- `.message` border-radius: user `16px 16px 8px 16px`, assistant `16px 16px 16px 8px` (rounder).
- `.chat-input` border-radius from 10px to 12px.
- `.send-btn` border-radius from 10px to 12px.

### Surface Treatment
- `.chat-shell` shadow reduced: use `0 1px 3px rgba(15, 23, 42, 0.03)`.
- No hover transforms on buttons (keep interactions flat and calm).

### Status & State Indicators
- Usage bar height increased from 6px to 8px for better visibility.
- `.usage-text` line-height set to 1.5.
- Typing dots: slightly slower animation (1.4s instead of 1.2s).

## SCSS Override Snippet
```scss
// Variation 1: Calm Clinical -- AI Chat

.page-title {
  font-weight: 600;
}

.page-subtitle {
  line-height: 1.6;
}

.chat-shell {
  padding: 20px;
  gap: 18px;
  border-color: color-mix(in srgb, var(--border-color) 80%, transparent);
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03);
}

.usage-bar {
  height: 8px;
}

.usage-fill {
  background: color-mix(in srgb, var(--accent-primary) 80%, white 20%);
}

.usage-text {
  line-height: 1.5;
}

.messages-list {
  gap: 14px;
}

.message {
  padding: 12px 16px;
  line-height: 1.55;
  border-radius: 16px 16px 8px 16px;
  background: color-mix(in srgb, var(--accent-primary) 85%, white 15%);
}

.message--assistant {
  border-radius: 16px 16px 16px 8px;
  border-color: color-mix(in srgb, var(--border-color) 70%, transparent);
}

.message--typing {
  .typing-dot {
    animation-duration: 1.4s;
  }
}

.limit-message {
  line-height: 1.6;
}

.send-error {
  background: #FEF2F2;
  color: #B91C1C;
  border-color: #FECACA;
}

.input-row {
  gap: 12px;
}

.chat-input {
  border-radius: 12px;
}

.send-btn {
  border-radius: 12px;
}

.gp-cta,
.diagnostics-cta {
  &:hover {
    transform: none; // Remove lift on hover for calmer interaction
  }
}

.diagnostics-cta {
  border-width: 1px;
}
```

## Visual Description
The AI chat feels like a supportive conversation space. Message bubbles are rounder with more internal padding, and the spacing between messages is generous, preventing the conversation from feeling rushed. The user's messages use a slightly lighter emerald that is easier on the eyes during extended reading.

The usage bar is slightly taller and uses a lighter emerald fill, making it visible without being anxiety-inducing. The chat shell has a barely-there shadow and lighter border. Error messages use a softer red. The typing indicator dots animate more slowly, conveying a thoughtful rather than hurried response.

CTA buttons (Connect to Health Expert, Open Diagnostics) do not lift on hover, keeping the interface calm. The send button and input field have rounder corners (12px) for a friendlier feel. Overall, the chat reads as a calm health guidance space.
