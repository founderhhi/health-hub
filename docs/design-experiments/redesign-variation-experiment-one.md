# Redesign Variation Experiment One

## Objective
Explore refined visual variations of the existing Health Hub Angular app without changing layout structure, component architecture, or functionality.

Design context to keep constant:
- Trustworthy, warm, quietly premium
- Emerald-led healthcare brand
- Mobile-first patient experience, with provider surfaces staying crisp and efficient

## Current Dependency
`Stitch MCP` init, authentication, and API connectivity are healthy as of March 26, 2026. The currently exposed Stitch tools do not provide a direct live-URL crawler, so [DESIGN.md](/Users/anuraaggudimella/Documents/health-hub/DESIGN.md) now combines live deployed landing-page inspection with the existing repo context, brand notes, and tenant code.

## Shared Baseline

Use [DESIGN.md](/Users/anuraaggudimella/Documents/health-hub/DESIGN.md) as the shared design-system baseline. It now captures the current token system, live deployed landing-page signals, the light-first emerald palette, typography scale, card/badge patterns, and the split between the more expressive patient direction and the more utilitarian provider surfaces.

## Artifact Layout

Shared experiment context lives here:

- [docs/design-experiments/_shared/brand-brief.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/_shared/brand-brief.md)
- [docs/design-experiments/_shared/competitor-page-map.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/_shared/competitor-page-map.md)
- [docs/design-experiments/_shared/variation-lanes.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/_shared/variation-lanes.md)

Tenant variation specs for side-by-side review:

- Patient dashboard:
  [variation-1-calm-clinical.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/patient/dashboard/variation-1-calm-clinical.md),
  [variation-2-premium-guided.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/patient/dashboard/variation-2-premium-guided.md),
  [variation-3-halodoc-inspired.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/patient/dashboard/variation-3-halodoc-inspired.md)
- GP dashboard:
  [variation-1-operational-clarity.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/gp/dashboard/variation-1-operational-clarity.md),
  [variation-2-calm-clinical.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/gp/dashboard/variation-2-calm-clinical.md),
  [variation-3-helium-health-inspired.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/gp/dashboard/variation-3-helium-health-inspired.md)
- Specialist dashboard:
  [variation-1-operational-clarity.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/specialist/dashboard/variation-1-operational-clarity.md),
  [variation-2-premium-guided.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/specialist/dashboard/variation-2-premium-guided.md),
  [variation-3-vezeeta-inspired.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/specialist/dashboard/variation-3-vezeeta-inspired.md)
- Pharmacy scanner:
  [variation-1-premium-guided.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/pharmacy/scanner/variation-1-premium-guided.md),
  [variation-2-calm-clinical.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/pharmacy/scanner/variation-2-calm-clinical.md),
  [variation-3-mydawa-inspired.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/pharmacy/scanner/variation-3-mydawa-inspired.md)
- Diagnostics orders:
  [variation-1-operational-clarity.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/diagnostics/orders/variation-1-operational-clarity.md),
  [variation-2-calm-clinical.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/diagnostics/orders/variation-2-calm-clinical.md),
  [variation-3-tenadoc-inspired.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/diagnostics/orders/variation-3-tenadoc-inspired.md)

Extra patient candidate already sketched:

- [docs/design-experiments/patient/appointments/variation-1-calm-clinical.md](/Users/anuraaggudimella/Documents/health-hub/docs/design-experiments/patient/appointments/variation-1-calm-clinical.md)

## Tenant / Page Taxonomy

Common page families across comparable health platforms:

| Page family | What it does | Health Hub tenants |
| --- | --- | --- |
| Home / dashboard | Surfaces status, next step, and primary action | Patient, GP, Specialist, Pharmacy, Diagnostics |
| Queue / inbox | Shows waiting items, urgency, and actionability | GP, Specialist, Diagnostics, Pharmacy |
| Detail view | Expands one case, order, referral, or prescription | Specialist, Pharmacy, Diagnostics, GP |
| List / history | Shows prior items and filters by state | Patient, Pharmacy, Diagnostics |
| Consultation / live session | Supports active care exchange | Patient, GP, Specialist |
| Profile / settings | Personal data, preferences, and account actions | All tenants |
| Empty / coming soon | Communicates locked or future state | Patient, GP, Specialist, Pharmacy, Diagnostics |
| Search / filter | Helps triage high-volume lists | GP, Specialist, Pharmacy, Diagnostics |
| Records / documents | Stores outcomes and attachments | Patient, GP, Specialist |

## Best Experiment One Targets

Pick one representative page per tenant for the first visual variation pass:

| Tenant | Recommended page | Why this page first |
| --- | --- | --- |
| Patient | `patient/dashboard` | Highest-visibility consumer surface, already mixes summary, service tiles, and care-plan hierarchy |
| GP | `gp` / practitioner dashboard | Best place to refine queue density, urgency cues, and action hierarchy |
| Specialist | `specialist` dashboard | Closest to a referral inbox pattern and most representative of provider workflow clarity |
| Pharmacy | `pharmacy/scanner` | Strongest brand moment for operational trust, scan state, and claim flow |
| Diagnostics | `diagnostics` orders | Best surface for status, filtering, and order-card refinement |

## Variation Guardrails

Keep these fixed across all three variations:
- Same layout structure and Angular component tree
- Same content model, actions, and behavior
- Same route purpose and information architecture

Only vary:
- Spacing rhythm
- Typography weight and scale
- Border treatment
- Surface layering and shadow restraint
- Color distribution within the existing emerald-led system
- Empty/loading/status treatments

## Recommended Design Directions

Three variation lanes that stay inside the current brand:

1. `Calm Clinical`
   - Softer hierarchy, lighter surfaces, less visual noise
   - Best for patient and diagnostics pages
2. `Operational Clarity`
   - Sharper status chips, stronger queue contrast, denser but cleaner information grouping
   - Best for GP and specialist dashboards
3. `Premium Guided`
   - Slightly richer surface depth, more considered card framing, more confident CTA treatment
   - Best for pharmacy scanner and patient dashboard

## Current Visual Findings By Tenant

### Patient

- Patient surfaces are split between a newer, more expressive premium-light direction and older utility-style mobile pages.
- The best current examples are the patient dashboard, travel, HealWell region, and shared consult/chat surfaces.
- The strongest first-wave opportunity is to spread that calmer, more intentional patient language across appointments, records, profile, specialist, and pharmacy without changing their route structure or layout.

### GP

- The GP dashboard is structurally strong but visually closer to a generic ops dashboard than a calm clinical command center.
- The first viewport of `/gp` is the best experiment target because stats, filters, queue density, urgency, and primary actions all converge there.
- The best design push is to make queue risk and care actionability outrank decorative dashboard patterns like sparklines.

### Specialist

- Specialist surfaces feel coherent but generic compared with the intended “quietly premium” direction.
- The dashboard is the highest-value experiment-one target because it combines referral triage and appointment scanning in one surface.
- Referral details are the best secondary target for a more confident handoff and provenance treatment.

### Pharmacy

- Pharmacy surfaces are operational and calm, with the scanner route already acting as the clearest trust moment in the role.
- The scanner page is still the best experiment-one target because it combines device framing, success/failure states, manual fallback, and claim confidence in one place.
- The design push should focus on trust, clarity, and precision rather than decorative flourish.
- The biggest structural risk is inconsistent state vocabulary across scanner, details, and history: `claim`, `dispense`, `fulfilled`, `completed`, and related terms should not be visually reinvented during the experiment.

### Diagnostics

- Diagnostics surfaces already have useful state patterns: filter trays, order cards, masked identity treatment, progress indicators, and order-detail pipelines.
- The orders screen is still the best first-wave target because it is the main triage/inbox surface.
- Order details are the natural second page if experiment one expands beyond a single page per tenant.
- Diagnostics also has a clear “future controls mixed with active controls” issue, so experiment-one visuals should make working filters feel distinct from roadmap placeholders.

## Variation Strategy By Tenant

| Tenant | Best lane | Why it fits |
| --- | --- | --- |
| Patient | `Premium Guided` | The dashboard and discovery surfaces already hint at a warmer, more editorial consumer-health direction |
| GP | `Operational Clarity` | Queue pressure, urgency, and action hierarchy matter more than expressive decoration |
| Specialist | `Operational Clarity` with a small `Premium Guided` layer | Referral triage needs stronger scanning, but trust cues can be elevated |
| Pharmacy | `Premium Guided` | The scanner and claim flow benefit from precision plus confidence-building framing |
| Diagnostics | `Calm Clinical` | Order/state-heavy surfaces need cleaner hierarchy and lower visual stress |

## Ambiguities To Confirm

- Which live URL should Stitch extract from if the default Render domain is not the right source of truth?
- Should the first experiment cover only patient-facing surfaces, or all major tenants now?
- Do you want separate preview routes, or separate document/spec files only for v1?
- Is the goal to stay strictly inside the current emerald brand, or allow one or two bolder accent experiments?
- Should admin be excluded from this first wave unless explicitly requested?
- Do you want one shared design direction across tenants, or a distinct direction per tenant?
- Is light-first the intended patient default, with dark mode staying secondary?
- The live landing page currently says `Health Expert`, while routes and internal docs still mix `GP` and `practitioner`. Which label should the experiment standardize on?
- Should specialist IA stay as the current combined dashboard/requests surface, or align to the fuller tab split described in the reference doc?
- Should pharmacy keep the current `Scan / Prescriptions / History` mental model, or move closer to the simpler pharmacy structure in the reference guide?
- What is the canonical pharmacy state vocabulary for user-facing UI: `claimed`, `dispensed`, `fulfilled`, `completed`, or another fixed set?
- Is diagnostics home intentionally an orders queue, or should it evolve toward the order lookup / scanner model described in the broader reference?
- What is the canonical diagnostics status model to design around for v1: the current `Pending / In Progress / Completed` set or the fuller staged flow from the reference docs?

## Tenant Agent Briefs

Use these as read-only analysis prompts for focused agents:

### Patient Agent
Inspect `src/app/features/patient/**`, `src/app/shared/components/**`, and `src/app/shared/styles/**`. Return the current visual language, the patient page family map, the best candidate for experiment one, and 2-3 visual pushes that preserve behavior and layout.

### GP Agent
Inspect `src/app/features/dashboard/components/practitioner/**`, `src/app/shared/components/**`, and `src/app/shared/styles/**`. Focus on queue density, status hierarchy, and action grouping.

### Specialist Agent
Inspect `src/app/features/specialist/**`, `src/app/shared/components/**`, and `src/app/shared/styles/**`. Focus on referral inbox clarity, appointment prominence, and provider trust cues.

### Pharmacy Agent
Inspect `src/app/features/pharmacy/**`, `src/app/shared/components/**`, and `src/app/shared/styles/**`. Focus on scanner trust, claim-state clarity, and the right balance between utility and calm.

### Diagnostics Agent
Inspect `src/app/features/diagnostics/**`, `src/app/shared/components/**`, and `src/app/shared/styles/**`. Focus on list-state hierarchy, filter treatment, and result readiness.

## PM Summary

Experiment one should start with one page per tenant, using the same structural shell and the same component architecture. The first pass should not invent new layout patterns; it should sharpen hierarchy, spacing, and surface treatment inside the existing Health Hub system.

The highest-signal pages are:
- Patient dashboard
- GP dashboard
- Specialist dashboard
- Pharmacy scanner
- Diagnostics orders

The main risk is scope drift. If a variation starts changing IA, component structure, or feature behavior, it is no longer part of this experiment and should be cut back. The other risk is naming drift: the current live marketing surface already leans toward `Health Expert`, so role labels should be normalized early in the experiment rather than after visual work starts.
