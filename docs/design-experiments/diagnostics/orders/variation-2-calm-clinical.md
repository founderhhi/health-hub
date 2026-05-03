# Diagnostics Orders -- V2: Calm Clinical

## Design Direction

Reduce visual stress across the diagnostics inbox. This variation gives the page more breathing room, softer borders, gentler state colors, and a clearer distinction between active work and future functionality. It is the least aggressive direction and the best fit if the diagnostics role should feel reassuring instead of intensely operational.

## Visual Changes

### Colors

- Page background shifts from `#F8FAFC` toward `#FAFBFD`
- Card borders lighten from `#E2E8F0` to `#EDF2F7`
- Progress state colors soften:
  - Pending: `#FEF9EE`
  - In Progress: `#ECFDF3`
  - Completed: `#EFF6FF`
- Avatar tint becomes slightly lighter so identity framing feels less pronounced
- Empty states keep their meaning but use softer, less contrast-heavy supporting surfaces

### Typography

- `.page-title` softens to `24px / 600`
- `.page-subtitle` becomes more muted
- `.patient-name` drops from semibold weight to medium
- `.test-item` line-height increases slightly for easier multi-test scanning
- Helper and empty-state copy gets more breathing room through `1.6` line-height

### Spacing

- `.orders-container` top and bottom padding increase by `4px`
- `.filters-section` margin-bottom increases from `24px` to `28px`
- `.order-card` padding increases from `16px` to `20px`
- `.orders-list` gap increases from `12px` to `16px`
- `.order-tests` spacing opens from `2px` to `6px`
- `.empty-state` spacing becomes a little more editorial and less compact

### Borders & Radius

- Cards and filters move from `8px` to `10px` rounding
- The progress bar stays pill-shaped but visually softens through lighter track contrast
- Badges remain semantic, but drop heavy borders where possible

### Surface & Shadow

- Resting shadows become almost imperceptible
- Hover states favor subtle border emphasis instead of lift
- The filter section reads as one calm panel rather than a sharp utility block
- Roadmap-only controls stay visible but intentionally washed back

### Status & State Indicators

- “Urgent” should still be obvious, but not the loudest element on every card
- In-progress orders should feel active through the progress rail first
- Filter helper copy should behave like a quiet note, not an alert
- No state should feel punitive or alarming unless it truly is an error

## SCSS Override Snippet

```scss
// V2: Calm Clinical -- Diagnostics Orders

.diagnostics-orders {
  background: #FAFBFD;

  .orders-container {
    padding-top: 28px;
    padding-bottom: 28px;
  }

  .page-title {
    font-weight: 600;
  }

  .page-subtitle,
  .order-date,
  .patient-masked-info {
    color: #94A3B8;
  }

  .filters-section,
  .order-card {
    border-color: #EDF2F7;
    border-radius: 10px;
  }

  .filters-section {
    margin-bottom: 28px;
  }

  .filters-helper {
    background: #F7FAFC;
    color: #475569;
  }

  .coming-soon-pill {
    opacity: 0.8;
  }

  .orders-list {
    gap: 16px;
  }

  .order-card {
    padding: 20px;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.02);

    &:hover {
      border-color: #D7E3F1;
      box-shadow: 0 2px 4px rgba(15, 23, 42, 0.04);
    }
  }

  .patient-name {
    font-weight: 500;
  }

  .order-tests {
    gap: 6px;
    border-top-color: #EDF2F7;
    border-bottom-color: #EDF2F7;
  }

  .test-item {
    line-height: 1.6;
  }

  progress.order-progress {
    background: #EAF2EC;

    &::-webkit-progress-bar {
      background: #EAF2EC;
    }
  }
}
```

## Visual Description

The page feels cleaner, quieter, and more forgiving. Cards have a little more room to breathe, text hierarchy relaxes, and state cues are still clear without barking for attention. It looks like a well-run diagnostics workspace where calm process matters as much as throughput.
