# GP Dashboard -- V3: Helium Health-Inspired

## Design Direction

Bring more hospital-operations discipline into the GP queue without changing the underlying layout. This variation borrows from the cleaner, data-forward healthcare SaaS pattern described in the business-plan competitor notes for Helium Health: flatter cards, sharper hierarchy, denser scanning, and less decorative motion.

## Competitor Reference

Use Helium Health as the provider-workbench reference point from the business-plan analysis:

- Queue management should feel efficient before it feels expressive
- Metrics should read like operational counters, not marketing numbers
- Filters and patient rows should look like a serious clinical work surface
- Status needs to be visible in peripheral vision through layout, not only through copy

Patterns borrowed for this variation:

1. Flat, bordered stat cards with category-coded top rails instead of floating emphasis
2. More table-like queue rows while preserving the existing card/list structure
3. Compact, utility-first chip styling for urgency and wait-state indicators
4. Stronger separation between filters, queue controls, and the patient list

## Visual Changes

### Colors

- Page background shifts slightly cooler to `#F7FAFC`
- Stat cards get a `3px` top border by category instead of relying on icon circles alone:
  - Waiting: `#2ECC71`
  - Active: `#1D4ED8`
  - Completed: `#8B5CF6`
  - Avg. Session: `#64748B`
- Queue items use cleaner neutral surfaces: white on odd rows, `#FAFBFC` on even rows
- Emergency and urgent rows keep their left-border logic, but the border colors deepen:
  - Urgent: `#D97706`
  - Emergency: `#DC2626`
- AI summary background becomes `#F8FAFC` with a thin emerald top rule instead of a large branded block

### Typography

- `.page-title` drops from consumer-dashboard scale to `22px / 600`
- Stat labels become uppercase utility labels at `11px / 600` with `0.06em` letter-spacing
- `.patient-name` shifts to `15px / 600`
- `.meta-item` stays compact at `12px`
- `.queue-number` becomes a quieter utility marker at `12px / 700`
- Filter controls keep current size, but placeholder and option text should read as neutral system text rather than accent-led UI

### Spacing

- `.stats-row` gap reduces from `16px` to `12px`
- `.stat-card` padding reduces from `24px` to `16px`
- `.filter-section` padding tightens to `12px`
- `.queue-item` padding becomes `12px 14px`
- `.queue-list` gap reduces from `16px` to `10px`
- `.queue-actions` buttons keep their action set but align to a tighter, more tool-like rhythm

### Borders & Radius

- Stat cards use `8px` radius and visible borders
- Queue items use `8px` radius instead of softer dashboard rounding
- Chips and badges move to `4px` radius
- Filter section keeps `8px` rounding but gains clearer border separation from the queue below

### Surface & Shadow

- Stat cards become mostly flat: `box-shadow: none; border: 1px solid #E2E8F0`
- Queue items use no resting shadow
- Hover state uses a minimal `0 2px 6px rgba(15, 23, 42, 0.06)` instead of a lifted card effect
- Sparkline graphics remain, but should feel secondary through lower opacity

### Status & State Indicators

- `.operational-status` becomes a smaller utility pill with a tighter badge shape
- `.expiring-badge` reads like an SLA warning tag rather than a promotional badge
- AI summary label becomes a smaller system marker, making the summary itself easier to scan
- Wait indicators should feel procedural, not alarming

## SCSS Override Snippet

```scss
// V3: Helium Health-Inspired -- GP Dashboard

.gp-dashboard {
  background: #F7FAFC;

  .dashboard-header .page-title {
    font-size: 22px;
    font-weight: 600;
  }

  .stats-row {
    gap: 12px;
  }

  .stat-card {
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #E2E8F0;
    box-shadow: none;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 0 0 auto 0;
      height: 3px;
      border-radius: 8px 8px 0 0;
      background: #CBD5E1;
    }

    &:nth-child(1)::before { background: #2ECC71; }
    &:nth-child(2)::before { background: #1D4ED8; }
    &:nth-child(3)::before { background: #8B5CF6; }
    &:nth-child(4)::before { background: #64748B; }

    &__label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    &__sparkline svg path {
      opacity: 0.45;
    }
  }

  .filter-section {
    padding: 12px;
    border-color: #CBD5E1;
    border-radius: 8px;
  }

  .queue-list {
    gap: 10px;
  }

  .queue-item {
    padding: 12px 14px;
    border-radius: 8px;
    box-shadow: none;

    &:nth-child(even) {
      background: #FAFBFC;
    }

    &:hover {
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
    }

    &.priority-urgent {
      border-left-color: #D97706;
    }

    &.priority-emergency {
      border-left-color: #DC2626;
    }

    .queue-number {
      font-size: 12px;
      font-weight: 700;
    }

    .patient-info .patient-header .patient-name {
      font-size: 15px;
      font-weight: 600;
    }
  }

  .hhi-badge,
  .expiring-badge,
  .operational-status {
    border-radius: 4px;
  }

  .ai-summary {
    background: #F8FAFC;
    border-left: none;
    border-top: 2px solid #2ECC71;
  }
}
```

## Visual Description

The dashboard reads less like a consumer-friendly queue and more like a disciplined clinical operations board. Stat cards are flatter and tighter, each marked with a colored top rail rather than ornamental emphasis. Queue items stack closely with light alternating row tints, crisp 8px corners, and sharper status chips. The result is still recognizably Health Hub, but the page feels more capable under pressure: calmer, more procedural, and easier to scan at speed.
