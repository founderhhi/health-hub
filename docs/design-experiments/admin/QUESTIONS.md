# Admin Design Experiments - Open Questions

## Layout & Scope

1. **Single component, multiple tabs**: The admin dashboard is a single Angular component (`admin-dashboard.ts`) with 6 tabs (Users, Pharmacy, Requests, Referrals, Activity, System Health). The design variations focus on the Dashboard (System Health tab + overall chrome) and Users tab specifically. Should variations also be produced for Pharmacy, Requests, Referrals, and Activity tabs, or will those inherit from the dashboard-level decisions?

2. **Tab bar pattern**: V3 (Helium-inspired) proposes switching from filled-background tabs to underline-only tabs. This is a meaningful interaction pattern change. Is this within the "visual refinement only" scope, or does it cross into layout/component architecture territory?

3. **Status indicator pattern**: V3 proposes replacing background-tinted pill badges with dot + text indicators. This changes the HTML structure slightly (or uses CSS `::before` pseudo-element). Confirm this is acceptable as a CSS-only change via pseudo-elements.

## Dark Mode Considerations

4. **Current theme**: The admin dashboard uses CSS custom properties (`var(--bg-primary)`, `var(--text-primary)`, etc.) which suggests dark mode support. The V3 Helium-inspired variation uses hard-coded light-mode colors (#FFFFFF, #111827, #F9FAFB). Should all variations maintain dark-mode compatibility through CSS custom properties, or are these explorations assumed to be light-mode only?

5. **V1 alternating row tints**: The `#FAFBFC` and `#F1F5F9` colors are light-mode specific. If dark mode is required, these need dark equivalents via CSS variables.

## Competitor Research Limitations

6. **Helium Health UI specifics**: Direct screenshots of Helium Health's admin interface are not publicly available (it is a private hospital SaaS behind authentication). The V3 variation is based on: (a) Helium Health's published product descriptions and portfolio case studies, (b) general enterprise healthcare SaaS patterns from similar tools, and (c) modern SaaS admin patterns (Stripe, Linear) adapted for healthcare context. If the team has access to Helium Health's actual interface, the V3 direction should be refined against real screenshots.

## Implementation Notes

7. **Fraunces font**: V2 (Premium Guided) uses Fraunces serif for headings. This font is already referenced in the brand brief but may not be loaded in the admin route. Confirm the font is available or needs to be added to the admin module.

8. **CSS `:has()` selector**: V1 Users variation uses `tr:has(.status-badge.disabled)` for row dimming. This has broad browser support (Chrome 105+, Safari 15.4+, Firefox 121+) but should be confirmed against the project's browser support targets.

9. **Inline select behavior**: V3 proposes a nearly-invisible inline `<select>` that only shows its border on hover. This may have accessibility implications (the interactive element is not visually obvious). Consider adding a subtle pencil/edit icon next to the role text to signal editability.
