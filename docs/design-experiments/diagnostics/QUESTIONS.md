# Diagnostics Design Experiment -- Open Questions

## Layout vs. Visual Boundary
1. **Profile page single-card layout (V3):** The Tenadoc-inspired profile variation proposes consolidating individual field cards into a single card with divider-separated rows. This changes the DOM structure slightly (wrapping in a container). Does this cross the "visual only, no layout change" boundary, or is it acceptable as a surface treatment?

2. **Test items as horizontal chips (V3 Orders):** The Tenadoc-inspired orders variation proposes rendering test items as horizontal pill chips instead of vertical bullet lists. This changes `flex-direction` on `.order-tests`. Is this within scope as a visual refinement, or does it constitute a layout change?

3. **Step indicator on Result Upload (V3):** The Tenadoc-inspired result upload references a 4-step progress indicator. This would require new HTML elements. Should this be documented as a concept only, or should the SCSS assume new markup will be added?

## Design System Alignment
4. **Profile page hardcoded colors:** The current profile SCSS uses `#f5f5f5`, `#e0e0e0`, and `#7f8c8d` instead of design system tokens. All three variations correct this. Should the token alignment be applied as a baseline fix before the experiment, or is it part of the variation?

5. **Badge system consistency:** The orders page uses `.hhi-badge` classes from the provider-ui system, but the result-upload page defines its own `.badge` classes. Should the experiment unify these, or treat them as separate scopes?

## Interaction Patterns
6. **Filter bar always-visible (V3 Orders):** Making the filter bar permanently expanded (never collapsible) changes interaction behavior. Is this within the "visual only" scope?

7. **Operational status banner (V3 Profile):** Replacing the toggle component's field card with a full-width colored banner changes the visual hierarchy significantly. Does this need a separate component, or can it be achieved with CSS-only on the existing toggle wrapper?

## Competitor Research Gaps
8. **Tenadoc screenshots:** Tenadoc's app is available on the App Store but detailed UI screenshots were not accessible through web search. The V3 variations are based on described patterns (doctor card selection, Telebirr payment flow, mobile-first Ethiopian UX) rather than pixel-level references. Should we attempt to obtain actual screenshots via the App Store listing before finalizing V3?

9. **LIS dashboard patterns:** The V3 variations reference modern LIS patterns (specimen lifecycle, TAT counters, barcode identification) from general industry research rather than a single competitor. Is this acceptable for the competitor-inspired lane?
