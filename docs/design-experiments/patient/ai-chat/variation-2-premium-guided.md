# AI Chat -- Variation 2: Premium Guided

## Design Direction
Elevate the AI chat with Fraunces serif for the page title, richer message bubble styling, a premium gradient send button, and a more polished usage indicator. The chat should feel like a premium AI health assistant experience.

## Visual Changes

### Colors
- User message: slightly richer emerald, unchanged.
- Assistant message: gets a subtle inner glow: `box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--border-color) 50%, transparent)`.
- `.gp-cta` gets gradient: `linear-gradient(135deg, #2ECC71, #27AE60)`.
- `.send-btn` gets gradient: `linear-gradient(135deg, #2ECC71, #27AE60)`.
- Usage bar fill gets gradient: `linear-gradient(90deg, #2ECC71, #27AE60)`.

### Typography
- `.page-title` uses `'Fraunces', serif` at 26px.
- `.page-subtitle` at 15px with `line-height: 1.55`.
- `.message--assistant` font-size stays 14px but `line-height: 1.5`.
- `.limit-message` uses slightly bolder text: `font-weight: 500`.

### Spacing & Layout
- `.page-header` margin-bottom from 20px to 24px.
- `.chat-shell` padding stays 16px (appropriate for chat density).

### Borders & Shadows
- `.chat-shell` gets richer shadow: `box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06)`.
- `.chat-shell` border-radius from 16px to 18px.
- `.send-btn` gets resting shadow: `box-shadow: 0 2px 8px color-mix(in srgb, var(--accent-primary) 20%, transparent)`.
- `.gp-cta` gets resting shadow: `box-shadow: 0 3px 10px color-mix(in srgb, var(--accent-primary) 20%, transparent)`.

### Surface Treatment
- `.send-btn:hover` gets lift: `transform: translateY(-1px); box-shadow: 0 4px 14px color-mix(...)`.
- `.gp-cta:hover` gets stronger lift and deeper shadow.
- Chat shell gets a subtle background gradient: `background: linear-gradient(180deg, var(--bg-card), color-mix(in srgb, var(--bg-card) 98%, var(--accent-primary) 2%))`.

### Status & State Indicators
- Usage bar: `border-radius: 999px; height: 6px` (unchanged but with gradient fill).
- Typing dots: get emerald color hint: `background: color-mix(in srgb, var(--text-secondary) 70%, var(--accent-primary) 30%)`.

## SCSS Override Snippet
```scss
// Variation 2: Premium Guided -- AI Chat

.page-title {
  font-family: 'Fraunces', 'Iowan Old Style', 'Georgia', serif;
  font-size: 26px;
}

.page-subtitle {
  font-size: 15px;
  line-height: 1.55;
}

.page-header {
  margin-bottom: 24px;
}

.chat-shell {
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  background: linear-gradient(180deg, var(--bg-card), color-mix(in srgb, var(--bg-card) 98%, var(--accent-primary) 2%));
}

.usage-fill {
  background: linear-gradient(90deg, #2ECC71, #27AE60);
}

.message--assistant {
  line-height: 1.5;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--border-color) 50%, transparent);
  border: none;
}

.limit-message {
  font-weight: 500;
}

.gp-cta {
  background: linear-gradient(135deg, #2ECC71, #27AE60);
  box-shadow: 0 3px 10px color-mix(in srgb, var(--accent-primary) 20%, transparent);

  &:hover {
    background: linear-gradient(135deg, #27AE60, #219653);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px color-mix(in srgb, var(--accent-primary) 30%, transparent);
  }
}

.send-btn {
  background: linear-gradient(135deg, #2ECC71, #27AE60);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--accent-primary) 20%, transparent);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #27AE60, #219653);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px color-mix(in srgb, var(--accent-primary) 30%, transparent);
  }
}

.typing-dot {
  background: color-mix(in srgb, var(--text-secondary) 70%, var(--accent-primary) 30%);
}
```

## Visual Description
The AI chat feels like a premium health AI experience. The page title in Fraunces serif (HealthHub Guide) immediately sets an editorial, trustworthy tone. The chat shell has a richer shadow and rounder corners, with a barely perceptible gradient that warms from top to bottom.

The send button and "Connect to Health Expert" CTA both use gradient fills with persistent glow shadows, making them feel premium and inviting. On hover, they lift and deepen their glow. The usage progress bar uses a gradient fill (emerald to deeper green) that adds visual polish to a functional element.

Assistant message bubbles have a subtle inset border rather than a regular border, giving them a carved-in quality. Typing indicator dots have a hint of emerald, tying them to the brand. The overall effect is of a health AI you would expect from a well-funded, design-conscious platform.
