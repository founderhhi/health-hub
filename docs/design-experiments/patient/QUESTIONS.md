# Patient Design Experiment -- Open Questions

## Dashboard

### Q1: Care hero section in V3 (Halodoc-inspired) -- how minimal?
The current care hero is a complex multi-part section with visual panel, orb, snapshot card, and mini card. V3 proposes collapsing it to a compact card with just text and CTA. However, this removes a significant amount of content and visual storytelling. **Decision needed**: Should V3 keep any of the visual panel elements, or is the compact approach correct for the consumer app direction?

### Q2: Service tile grid -- 3x3 or 4-column on wider screens?
V3 proposes a denser 4-column grid on wider screens (matching Halodoc's dense service layout). The current 3x3 grid uses `aspect-ratio: 1` tiles. **Decision needed**: Is the 4-column density appropriate for Health Hub's service count (currently 9 tiles), or does the 3-column layout better serve the brand's "calm" positioning?

### Q3: Summary cards -- horizontal scroll vs fixed grid?
V3 proposes converting the horizontal-scrolling summary cards to a fixed 3-column grid. This makes all stats visible at once but removes the scroll interaction. **Decision needed**: With exactly 3 summary cards, is the scroll pattern justified (it was likely designed for potential expansion), or should we commit to the fixed grid?

## Profile/Billing

### Q4: Payment card visual treatment
The current profile page has a detailed payment card preview component with brand-specific gradients (visa dark blue, mastercard dark green, etc.). V3's flat approach would significantly simplify this. **Decision needed**: Should the premium card preview be maintained across all variations, or can V3 simplify payment cards to list items?

## AI Chat

### Q5: Send button -- text label vs icon-only?
V3 proposes converting the send button from a text-labeled button ("Send") to a circular icon-only button (send arrow). This is more app-like but potentially less discoverable for older users. **Decision needed**: Should we test both patterns, or commit to one approach?

### Q6: Chat input -- bordered vs borderless?
V3 uses a borderless pill input on a gray background (WhatsApp-style). The current design uses a bordered input. **Decision needed**: Does the borderless input provide enough visual affordance for the target demographic (health-seeking patients, potentially stressed)?

## Cross-Page

### Q7: Hover transforms across variations
V1 reduces hover transforms to 1px lift (from 2px). V3 removes them entirely. V2 adds scale(1.02) micro-interactions. **Decision needed**: Should hover behavior be standardized across pages within each variation, or can it vary per component?

### Q8: Dark mode compatibility
All three variations are written for light mode. The current codebase uses CSS custom properties (--bg-primary, --bg-card, etc.) for theme switching. V3's hardcoded hex values (#FFFFFF, #F5F7FA) would break dark mode. **Decision needed**: Should V3 SCSS be rewritten to use custom properties with overrides, or is it acceptable for V3 to be light-mode only as an experiment?
