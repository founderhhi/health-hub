# Pharmacy Design Experiment -- Open Questions

## Scanner Page

1. **Scanner frame size on desktop**: The current 280x280px frame works on mobile but feels small in the two-column desktop layout. Should V1 (Premium Guided) increase it to 320x320 on desktop, or keep it compact?

2. **Step label in V3**: The MyDawa-inspired variation adds a "STEP 1: SCAN OR ENTER CODE" label via CSS pseudo-element. This works for visual design exploration but would be better as an HTML element for accessibility. Should we note this as a required HTML change if V3 is selected?

3. **Toast position**: V3 moves the toast from bottom (above bottom-nav) to top of page (e-commerce notification bar pattern). This conflicts with the existing toast component pattern used across the app. Should V3 keep the bottom toast for consistency, or is the top position worth the inconsistency?

## Prescription Details Page

4. **Progress bar shimmer animation (V1)**: The Premium Guided variation adds a shimmer overlay to the progress bar fill. This is a nice micro-interaction but adds CSS complexity. Is the shimmer pattern approved for use, or should we keep progress bars static?

5. **Stepper/timeline indicator (V3)**: The MyDawa-inspired variation references a "step indicator row" above the progress bar (Claimed -> Dispensing -> Complete). This would require HTML additions beyond CSS-only changes. Should this be flagged as out of scope for pure visual exploration?

6. **Monospace prescription ID (V3)**: Rendering the prescription code in monospace changes the character of the page significantly. Is monospace appropriate for pharmacist-facing tools, or does it feel too developer-oriented?

## History Page

7. **Alternating row tints (V3)**: The MyDawa-inspired variation uses alternating `#FAFBFC` tints on even rows. This works well for dense lists but may feel odd if only 2-3 items are visible. Should alternating rows only activate when item count exceeds a threshold?

8. **Left-border color coding (V3)**: The `:has()` CSS selector is used to apply parent-level left-border colors based on child status classes. Browser support is good but not universal. Should we use a class-based approach on the parent element instead?

9. **Date group header as full-width strip (V3)**: The date header becomes a full-bleed background strip, which requires negative margins to break out of the container. Is this pattern acceptable, or should date headers stay within container bounds?

## Profile Page

10. **Unified card vs individual cards**: V3 merges all field cards into a single unified card with internal dividers. The current HTML structure uses individual `<article class="field-card">` elements. This visual treatment works via CSS (first/last child radius, divider borders) but the semantic grouping might benefit from a wrapping element. Is CSS-only acceptable here?

11. **Avatar size reduction (V3)**: V3 reduces the avatar from 68px to 56px. This is a meaningful change to the visual hierarchy. Is the current 68px avatar considered the right size, or is there appetite to reduce it?

## Cross-Cutting

12. **Emerald top strip (V3)**: All V3 pages use a fixed 4px emerald strip at the very top of the viewport. This creates visual consistency within the pharmacy portal but may conflict with other portals (GP, specialist, diagnostics) that don't have this pattern. Should this be a pharmacy-specific treatment, or should it be a global provider-portal pattern?

13. **Fraunces serif usage (V1)**: V1 uses Fraunces for page titles and section headers across all pages. The brand brief lists Fraunces for "hero/premium moments" -- are section headers considered premium moments, or should Fraunces be limited to page titles only?

14. **Font loading**: Fraunces is referenced in V1 but may not be currently loaded in the pharmacy module. Confirming whether the font is globally available or needs a specific import.
