# Health Hub Design Baseline

## Status

- `Stitch MCP` init completed locally, and `npx @_davideast/stitch-mcp doctor` returned healthy on March 26, 2026.
- Live app signals were inspected from `https://www.healthhubinternational.com/landing` on March 26, 2026.
- The currently available Stitch MCP tools expose project, screen, and design-system workflows, but not a direct live-URL crawler.
- This file therefore combines live deployed UI inspection, repository tokens, and tenant source code so the redesign experiment can proceed with a grounded baseline.

## Source Inputs

- Live deployment: `https://www.healthhubinternational.com/landing`
- Brand context: [.impeccable.md](/Users/anuraaggudimella/Documents/health-hub/.impeccable.md)
- Global tokens: [src/app/shared/styles/_variables.scss](/Users/anuraaggudimella/Documents/health-hub/src/app/shared/styles/_variables.scss)
- Shared mixins: [src/app/shared/styles/_mixins.scss](/Users/anuraaggudimella/Documents/health-hub/src/app/shared/styles/_mixins.scss)
- Runtime theme variables: [src/styles.scss](/Users/anuraaggudimella/Documents/health-hub/src/styles.scss)
- Shared provider styles: [src/app/shared/_provider-ui.scss](/Users/anuraaggudimella/Documents/health-hub/src/app/shared/_provider-ui.scss)
- Product and role reference: [Styling and frontend Ref/HHI_PROJECT_REFERENCE.md](/Users/anuraaggudimella/Documents/health-hub/Styling%20and%20frontend%20Ref/HHI_PROJECT_REFERENCE.md)

## Live App Signals

- The deployed landing experience is explicitly light-first and reuses the same emerald-led CSS variable system found in the repo.
- The live marketing surface loads `Inter` at `400`, `500`, `600`, and `700`, with no serif accent on the landing page itself.
- The hero uses a restrained emerald radial wash, a floating logo treatment, a bio-lime capsule tagline, and green-primary / outline-secondary CTA pairing.
- Step cards and feature cards use white or soft-surface panels with `12px` to `16px` rounding, modest elevation, and hover lift rather than heavy depth.
- The live marketing copy currently prefers `Health Expert` language instead of `GP`, which matters for visual labels and role naming in redesign experiments.

## Brand Direction

Health Hub should feel trustworthy, warm, and quietly premium. The intended tone is calm rather than cold, guided rather than dense, and polished rather than generic. The strongest design principle in the saved project context is that each screen should make the current status, next step, and primary action feel obvious at a glance.

## Core Visual Language

### Color

- Primary brand color is emerald-led.
- Core green set centers on `#2ECC71`, with lighter medical-surface greens and darker credibility greens.
- A brighter bio-lime accent exists but is secondary and used more sparingly.
- Neutrals stay soft and light in the default experience: white, slate-50 style backgrounds, and muted slate text.
- Semantic states are already established:
  - Success: emerald/green
  - Warning: amber
  - Danger: red
  - Info: blue

### Typography

- Primary UI font is `Inter`.
- The live landing page is `Inter`-only.
- The app uses a compact product scale:
  - `11px`, `12px`, `14px`, `16px`, `18px`, `20px`, `24px`, `32px`
- Font weights are mostly `400`, `500`, `600`, and `700`.
- Fraunces appears selectively in source-level premium moments, especially the patient dashboard hero, but is not currently visible on the deployed landing page.

### Spacing

- The spacing system uses an `8px` base rhythm.
- Common steps: `4`, `8`, `16`, `24`, `32`, `48`, `64`, `96`.
- Most pages rely on familiar card spacing rather than dramatic rhythm shifts.

### Shape

- Border radii are modest and friendly:
  - `4px`, `8px`, `12px`, `16px`, `24px`, `9999px`
- Most surfaces use `8px` to `16px` rounding.
- Pills and badges use fully rounded shapes.
- The live landing page reinforces `8px` buttons, `12px` feature cards, and `16px` step cards as the current public-facing baseline.

### Elevation

- Shadows are subtle and restrained.
- Primary shadow pattern is light card elevation rather than dramatic depth.
- The current app tends to communicate hierarchy more through borders and spacing than through strong shadow contrast.
- The live landing page adds small hover lifts on cards and CTAs, but still stays inside soft, healthcare-safe shadow values.

## Theme Model

- The app is light-first.
- Runtime CSS variables support dark theme toggling.
- Patient pages use CSS variables more heavily and show more expressive theming.
- Provider pages often stay in a stable light operational mode with soft-slate backgrounds and white cards.
- The live landing page currently ships only the light expression of the system.

## Shared Layout Patterns

### Patient Pages

- Mobile-first, full-height surfaces
- Bottom navigation
- Personal greeting headers
- Summary cards and service tiles
- Strong emphasis on next-step CTAs
- Slightly more expressive gradients, orbs, and premium moments

### Provider Pages

- Soft-surface page background with centered content container
- White cards with clear borders
- Operational headers with compact stats
- Filter rows, status chips, list items, and stepper/pipeline patterns
- More utilitarian visual density than patient pages

## Repeating Component Patterns

- Header bars with profile or utility actions
- Card-based groupings
- Status banners
- Pills and semantic badges
- Filter toolbars with search/select fields
- Queue or inbox cards with urgency treatment
- Stepper and progress pipeline components
- Bottom navigation for mobile role portals

## Tenant-Specific Observations

### Patient

- The patient dashboard is the most visually developed page family.
- It already pushes further into layered gradients, expressive hero treatment, and editorial heading moments.
- The rest of the patient pages remain more conservative and rely on token-level consistency rather than a shared premium pattern library.

### GP

- The GP dashboard is optimized for queue actionability.
- It uses dense cards, stats, urgency chips, and button-heavy queue rows.
- The current visual language is functional but can be refined for clearer scanning and calmer operational hierarchy.

### Specialist

- Specialist pages inherit the provider pattern library but lean more on referral cards, counts, tabs, and appointment sections.
- The referral views are structurally strong but visually more generic than the patient dashboard.

### Pharmacy

- Pharmacy pages center on scanning, claim actions, and history.
- The scanner page has the strongest single-use interaction pattern in the provider suite.
- Visual treatment is calm and functional, but the trust and precision cues can be pushed further.

### Diagnostics

- Diagnostics pages emphasize filters, order cards, status progression, and result readiness.
- The order and detail pages already contain useful state patterns, especially cards, badges, masked identity treatment, and pipeline steps.

## Current Design Strengths

- Clear role-based page families
- Consistent emerald-led brand base
- Good semantic state coverage
- Clean card and badge primitives
- Light-first healthcare tone that already feels safer than many generic dashboard patterns
- Patient dashboard shows the right direction for a more refined premium layer
- The live landing page and the app token layer are visibly aligned, which lowers the risk of a redesign drifting away from the real brand

## Current Design Gaps

- Shared provider pages are consistent but visually conservative
- Typography hierarchy is often competent rather than distinctive
- Similar card treatments appear across many pages, which flattens visual rhythm
- Surface layering and border treatment are not yet differentiated enough by importance
- Status and urgency cues are present, but not always visually prioritized in the clearest order

## Experiment Guardrails

For redesign variations, keep these fixed:

- Route structure
- Angular component architecture
- Layout skeleton
- Feature behavior
- Data model and action set

Only refine:

- Spacing rhythm
- Type weight and scale
- Surface layering
- Border treatment
- Shadow restraint
- Color distribution
- Status emphasis
- Empty/loading/coming-soon polish

## Recommended Experiment Lanes

### Calm Clinical

- Softer contrast
- Cleaner spacing cadence
- More breathable cards
- Better quiet-state legibility

### Operational Clarity

- Stronger status hierarchy
- Cleaner queue scanning
- Tighter but more intentional provider layouts
- Sharper priority and action grouping

### Premium Guided

- Slightly richer patient-facing hierarchy
- More deliberate framing of hero and CTA areas
- Editorial accent moments without changing structure

## Stitch Follow-On

Now that Stitch is connected, the next higher-value uses are:

- Create a dedicated Stitch project for these redesign experiments
- Seed that project with this design baseline through `create_design_system`
- Apply the resulting design system to controlled tenant screen variants once target screens are mirrored into Stitch
