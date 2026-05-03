# Diagnostics Orders -- V1: Operational Clarity

## Design Direction

Turn the orders screen into a clearer lab dispatch board. This variation keeps the existing filters, cards, and actions, but makes order state, urgency, and next action scan faster through sharper chips, tighter spacing, and cleaner separation between active controls and roadmap placeholders.

## Visual Changes

### Colors

- Page background stays in the soft-slate family, but card borders darken slightly to `#CBD5E1`
- Order cards use stronger state framing:
  - Pending: amber top accent `#F59E0B`
  - In Progress: emerald left border `#2ECC71`
  - Completed: blue-gray top accent `#94A3B8`
  - Urgent: add a deeper urgent border `#DC2626`
- `.filters-helper` gets a more operational info tint: `#EFF6FF` background, `#1D4ED8` text
- `Coming Soon` pills become more visibly roadmap-only with dashed outlines and lighter fill

### Typography

- `.page-title` stays `24px` but increases to `700`
- `.order-id` uses `13px / 700` with `0.04em` letter-spacing for accession-like clarity
- `.patient-name` becomes `15px / 600`
- `.test-item` becomes `12px / 500`
- Badges move toward utility-chip styling at `10px / 700`

### Spacing

- `.filters-grid` gap tightens from `8px` to `6px`
- `.orders-list` gap reduces from `12px` to `10px`
- `.order-card` padding tightens from `16px` to `14px`
- `.order-tests` padding reduces to `10px 0`
- `.order-footer` margin-top tightens slightly so actions sit closer to order details

### Borders & Radius

- `.filters-section` radius stays modest but sharpens to `8px`
- `.order-card` radius becomes `8px`
- Badges and pills use `4px` radius
- Progress bar height increases from `4px` to `6px` so active work stands out earlier

### Surface & Shadow

- Resting card shadow is removed in favor of stronger borders
- Hover state uses border-color emphasis before shadow
- Filters area keeps a solid white surface, but the toggle strip reads more like a utility toolbar than a content card

### Status & State Indicators

- The “Demo Data” badge should read like provenance metadata, not a decorative pill
- The status chip should visually outrank the button in the first scan
- “Coming Soon” priority controls should remain visible but visually separated from working filters
- In-progress orders should be identifiable from shape and structure even before their text label is read

## SCSS Override Snippet

```scss
// V1: Operational Clarity -- Diagnostics Orders

.diagnostics-orders {
  .filters-section {
    border-radius: 8px;
    border-color: #CBD5E1;
  }

  .filters-helper {
    background: #EFF6FF;
    color: #1D4ED8;
  }

  .coming-soon-pill {
    border-style: dashed;
    border-radius: 4px;
  }

  .orders-list {
    gap: 10px;
  }

  .order-card {
    padding: 14px;
    border-radius: 8px;
    border-color: #CBD5E1;
    box-shadow: none;

    &:hover {
      border-color: #2ECC71;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
    }

    &.order-card--pending {
      border-top: 3px solid #F59E0B;
    }

    &.order-card--progress {
      border-left: 4px solid #2ECC71;
    }

    &.order-card--ready {
      border-top: 3px solid #94A3B8;
    }

    &.order-card--urgent {
      border-right: 3px solid #DC2626;
    }
  }

  .order-id {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  .patient-name {
    font-size: 15px;
    font-weight: 600;
  }

  .test-item,
  .hhi-badge,
  .demo-badge {
    border-radius: 4px;
  }

  progress.order-progress {
    height: 6px;
  }
}
```

## Visual Description

The screen feels like a lab queue first and a generic dashboard second. Cards are tighter, flatter, and more structured, with status accents built into their frame instead of relying on scattered emphasis. Active filters feel procedural, while “Coming Soon” controls are clearly parked off to the side visually. The overall result is a faster, more clinical read without changing how the page works.
