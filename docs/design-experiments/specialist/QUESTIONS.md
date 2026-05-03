# Specialist Design Experiment -- Open Questions

## Dashboard

1. **Tab style direction**: V1 keeps pill tabs (sharper), V2 keeps pill tabs (richer), V3 switches to underline tabs (Vezeeta portal style). The underline tab bar is a significant interaction pattern change -- should this be considered a layout change or a visual-only refinement?

2. **Appointment section priority**: V3 (Vezeeta-inspired) promotes appointments above referrals, matching Vezeeta's schedule-first approach. In the current codebase, referrals are the primary content. Should V3 reorder sections, or keep the current referral-first order with only visual changes?

3. **Stat card icon treatment**: V3 removes the floating icon backgrounds and uses colored top-borders instead. This is a visual simplification but also changes the information hierarchy. Is this acceptable scope?

## Consultation Room

4. **Light-mode vs dark-mode action bar**: The current consultation room uses a dark action bar (matching the dark video container). V3 proposes a light-mode toolbar to match Vezeeta's portal aesthetic. This changes the visual tone significantly. Should dark-mode elements in the consultation room be considered fixed?

5. **Chat container height**: V2 increases chat height from 280px to 320px, V3 reduces it to 240px. Both are visual changes but affect information density. Is adjusting fixed container heights within scope?

6. **Vital cell coloring in V3**: Color-coding each vital type (heart rate = red, BP = blue, etc.) adds semantic meaning. Is adding semantic color associations to vitals within visual-only scope, or does it edge into information architecture?

## Referral Details

7. **Status header bar (V3)**: V3 proposes a full-width colored status banner at the top of the page. This would require a new HTML element. Should V3 variations describe elements that require HTML additions, or strictly work within existing DOM structure?

8. **Card-to-divider transition (V3)**: V3 replaces card borders with section dividers (no `.info-card` styling). This is a significant visual shift. Is removing card styling from existing `.info-card` elements acceptable as a "visual refinement"?

## Profile

9. **Profile header restructuring (V3)**: V3 merges the separate field cards for name, specialization, and registration into a single header section. This implies DOM restructuring. Should V3 be treated as a visual-only SCSS override applied to existing structure, or can it describe an ideal DOM change?

10. **Practice stats row (V3)**: V3 adds a stats row (referrals this month, consultations, patients). This data does not currently exist in the profile component. Should V3 describe it as a visual aspiration (with placeholder content), or flag it as out-of-scope?

11. **Settings list vs card pattern (V3)**: V3 switches from individual bordered cards to a settings-list pattern (rows with dividers). This is achievable purely with SCSS overrides on the existing `.field-card` class but changes the visual pattern fundamentally. Is this within scope?

## Cross-cutting

12. **Fraunces serif font**: V2 uses Fraunces for headings across all four pages. Is the Fraunces font currently loaded in the application, or would it need to be added to the font stack? The `_variables.scss` defines `$font-family-primary` (Inter) and `$font-family-mono` but no serif variable.

13. **Brand brief specifies specialist pages use "left emerald border, urgency variants, count badges, tabs"**. V3 (Vezeeta-inspired) departs from some of these patterns (underline tabs, top-border instead of left-border on stat cards). How strictly should the brand brief archetype be followed in competitor-inspired variations?
