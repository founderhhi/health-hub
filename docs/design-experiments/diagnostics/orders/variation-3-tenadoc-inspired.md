# Diagnostics Orders -- V3: Tenadoc-Inspired

## Design Direction

Use the diagnostics-specific competitor lane from the business-plan analysis to push this page toward a more explicit intake-and-processing workflow. The visual goal is to make orders feel closer to lab jobs or specimens moving through a pipeline, while still preserving the exact current Health Hub structure.

## Competitor Reference

Use the diagnostics competitor notes as the reference frame for this direction:

- Diagnostics work benefits from accession-style identifiers and provenance cues
- Test lists should feel procedural and structured, not like generic tag clouds
- Status changes should resemble a lab handoff or readiness pipeline
- Operational clarity should come from order framing and metadata density more than dashboard ornament

Patterns borrowed for this variation:

1. Order IDs treated as primary technical anchors
2. More explicit “intake card” treatment through top rails and mono-coded identifiers
3. Test items styled as structured specimen/work labels
4. Filters framed like a lightweight intake toolbar

## Visual Changes

### Colors

- Page background moves to a cleaner white-forward `#FFFFFF` with a very light lab-surface section tint
- Order cards gain `3px` top rails by status:
  - Pending: `#F59E0B`
  - In Progress: `#2ECC71`
  - Completed: `#1D4ED8`
- Test items use very light tinted capsules instead of plain text lines
- The filter panel uses a faint cool tint `#FAFBFC` to distinguish intake controls from the order grid
- Demo badges become cooler metadata chips instead of rounded marketing pills

### Typography

- `.order-id` uses mono styling at `12px / 700` with wider tracking
- `.patient-name` stays readable at `15px / 600`
- `.patient-masked-info` leans harder into technical metadata styling
- `.test-item` becomes `11px / 600`, slightly uppercase or label-like in feel
- Status chips use compact uppercase utility styling

### Spacing

- Filters compact slightly for intake-tool efficiency
- Order cards keep a moderate `16px` padding, not as dense as GP but more structured than the current default
- The gap between card sections becomes more deliberate so metadata, tests, and footer each read as their own band

### Borders & Radius

- Cards use `8px` radius
- Test capsules use `9999px` pills for quick visual grouping
- Status chips use `4px` utility corners
- Filter inputs and selects remain structurally identical, but their shared framing becomes more consistent

### Surface & Shadow

- Cards become mostly border-led, with shadow only on hover
- The filter section reads like a utility tray
- Progress bars become slightly more prominent to reinforce work readiness

### Status & State Indicators

- Order state should be readable from the card frame before the text label is read
- Technical metadata should feel trustworthy and consistent
- Tests should read like a real work payload, not decorative secondary content
- The “View Order” action remains the main CTA, but the order itself feels better organized around it

## SCSS Override Snippet

```scss
// V3: Tenadoc-Inspired -- Diagnostics Orders

.diagnostics-orders {
  background: #FFFFFF;

  .filters-section {
    background: #FAFBFC;
    border-radius: 8px;
  }

  .filters-grid {
    gap: 6px;
  }

  .order-card {
    border-radius: 8px;
    box-shadow: none;
    position: relative;

    &.order-card--pending {
      border-top: 3px solid #F59E0B;
    }

    &.order-card--progress {
      border-top: 3px solid #2ECC71;
      border-left-width: 1px;
    }

    &.order-card--ready {
      border-top: 3px solid #1D4ED8;
    }

    &:hover {
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.06);
    }
  }

  .order-id {
    font-family: var(--hhi-font-family), monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .patient-masked-info {
    letter-spacing: 0.03em;
  }

  .order-tests {
    gap: 8px;
    border-top-style: dashed;
    border-bottom-style: dashed;
  }

  .test-item {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: 4px 10px 4px 18px;
    border-radius: 9999px;
    background: #F4FBF6;
    color: #166534;
    font-size: 11px;
    font-weight: 600;
    text-transform: none;
  }

  .demo-badge,
  .hhi-badge {
    border-radius: 4px;
  }

  progress.order-progress {
    height: 6px;
  }
}
```

## Visual Description

The orders page feels more like a real lab intake surface. Order IDs read like accession codes, test payloads are framed as structured work labels, and each card carries a clearer status rail across its top edge. The page is still unmistakably Health Hub, but it now leans into diagnostics as a specialized workflow instead of a generic queue.
