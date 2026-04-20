# GP Design Experiments — Open Questions

## Dashboard

1. **AI Summary theming**: The current AI summary uses a dark background (`#1A2535`) which is inconsistent with the light theme of the rest of the dashboard. All three variations change this. Should the current dark treatment be considered intentional (to make it stand out), or is it a leftover from a dark-mode iteration?

2. **Sparkline data**: The sparklines in stat cards are currently static SVG paths. If these will remain decorative (no real data), V3's approach of removing them entirely may be preferable. Are real-time sparklines planned?

3. **Queue density vs. readability tradeoff**: V1 tightens to 14px padding and 12px gaps. V3 goes further to 12px padding and zero-gap table rows. Which density level feels right for a GP who may see 20-40 patients per day?

4. **Mobile queue experience**: All three variations focus on desktop density. On mobile, queue items stack vertically. Should mobile get its own variation treatment, or should we keep mobile as-is and only vary the desktop experience?

5. **Alternating row tints (V1)**: The even-row `#FAFBFC` tint in V1 may be too subtle to notice. Should it be darker (`#F5F7FA`), or is a zebra-stripe pattern not appropriate for this context?

## Profile

6. **Single-card grouping (V3)**: V3 merges all field-cards into one unified card. This requires either a template wrapper element or adjacent-sibling CSS selectors. Is a minor HTML change acceptable for design experiments, or should we stay CSS-only?

7. **Avatar visibility**: V3 hides the centered avatar. The avatar shows the first letter of the facility name. Is this meaningful enough to keep, or is it purely decorative?

8. **Triage Handoff page**: The task mentioned exploring a triage-handoff page, but `triage-handoff.ts` is a utility module with no template or SCSS. It provides `normalizeTriageHandoff()` and `formatTriageSourceLabel()` functions consumed by the practitioner component. There is no separate triage handoff page to design. Should a triage handoff UI be designed as a new page, or is the current inline display within the patient detail modal sufficient?
