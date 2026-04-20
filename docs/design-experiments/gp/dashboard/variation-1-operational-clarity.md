# GP Dashboard — V1: Operational Clarity

## Design Direction
Sharpen the GP queue for maximum scan-ability: stronger status chips, denser queue items with clearer priority borders, bolder stat numbers, and crisper section separation. Every urgency level should be distinguishable in peripheral vision.

## Visual Changes

### Colors
- Queue item left-border widths increase from 4px to 5px for stronger priority signaling
- Emergency background shifts from `#FEF2F2` to `#FFF1F0` (slightly warmer red tint)
- Stat card icon backgrounds gain 5% more opacity: waiting `rgba(46,204,113,0.15)`, active `rgba(59,130,246,0.15)`, completed `rgba(139,92,246,0.15)`
- Alternating queue rows: odd items get `background: #FFFFFF`, even items get `background: #FAFBFC`
- AI summary background changes from dark `#1A2535` to light `#F0F4F8` with `color: #334155` for consistency with the light theme

### Typography
- `.stat-card__value` font-weight increases from 700 to 800 (extra-bold), font-size stays 32px
- `.stat-card__label` font-weight increases from 500 to 600
- `.patient-name` font-size stays 16px but weight increases from 600 to 700
- `.queue-number` font-size reduces from 20px to 16px, weight increases to 800, color changes from `#94A3B8` to `#475569`
- `.section-title` letter-spacing tightens to `-0.01em`
- `.filter-badge` font-weight increases from 400 to 600

### Spacing & Layout
- `.queue-item` padding tightens from 16px to 14px for density
- `.queue-list` gap reduces from 16px to 12px
- `.stats-row` gap reduces from 16px to 12px
- `.stat-card` padding reduces from 24px to 20px
- `.filter-section` padding reduces from 16px to 12px
- `.dashboard-content` gap stays at 32px (separation between queue and sidebar is important)

### Borders & Shadows
- `.queue-item` border changes from `1px solid #E2E8F0` to `1px solid #D1D5DB` (slightly darker for definition)
- `.queue-item:hover` shadow increases from `0 4px 6px rgba(15,23,42,0.08)` to `0 4px 8px rgba(15,23,42,0.12)`
- `.stat-card` border changes to `1px solid #D1D5DB`
- Badge border-radius sharpens: `.hhi-badge` and `.expiring-badge` use `4px` instead of default
- `.filter-section` border strengthens to `1px solid #CBD5E1`

### Surface Treatment
- Page background stays `#F8FAFC`
- `.ai-summary` gets a light treatment: `background: #F0F4F8; border-left: 3px solid #2ECC71; color: #334155`
- `.ai-badge` color changes from `#166534` to `#2ECC71` for brand consistency on light bg

### Status & State Indicators
- Priority badges get bolder backgrounds:
  - Routine: `background: #E2E8F0; color: #334155; font-weight: 700`
  - Urgent: `background: #FEF3C7; color: #92400E; border: 1px solid #FDE68A; font-weight: 700`
  - Emergency: `background: #FEE2E2; color: #991B1B; border: 1px solid #FECACA; font-weight: 700`
- `.expiring-badge` gains a pulsing left dot indicator (8px amber circle with `animation: hhi-haptic-pulse`)
- `.operational-status` pill font-weight increases to 600
- `.hhi-wait-indicator--overdue` size increases from 8px to 10px

## SCSS Override Snippet
```scss
// V1: Operational Clarity — GP Dashboard overrides
// Apply via component-level override or theme class

.gp-dashboard {
  // Tighter queue density
  .queue-list {
    gap: 12px;
  }

  .queue-item {
    padding: 14px;
    border: 1px solid #D1D5DB;
    border-left-width: 5px;

    &:nth-child(even) {
      background: #FAFBFC;
    }

    &:hover {
      box-shadow: 0 4px 8px rgba(15, 23, 42, 0.12);
    }

    .queue-number {
      font-size: 16px;
      font-weight: 800;
      color: #475569;
    }

    .patient-info .patient-header .patient-name {
      font-weight: 700;
    }
  }

  // Bolder stats
  .stats-row {
    gap: 12px;
  }

  .stat-card {
    padding: 20px;
    border-color: #D1D5DB;

    &__value {
      font-weight: 800;
    }

    &__label {
      font-weight: 600;
    }

    &__icon {
      &--waiting { background: rgba(46, 204, 113, 0.15); }
      &--active { background: rgba(59, 130, 246, 0.15); }
      &--completed { background: rgba(139, 92, 246, 0.15); }
    }
  }

  // Sharper badges
  .hhi-badge,
  .expiring-badge {
    border-radius: 4px;
    font-weight: 700;
  }

  .hhi-badge--neutral {
    background: #E2E8F0;
    color: #334155;
  }

  .hhi-badge--warning {
    background: #FEF3C7;
    color: #92400E;
    border: 1px solid #FDE68A;
  }

  .hhi-badge--urgent {
    background: #FEE2E2;
    color: #991B1B;
    border: 1px solid #FECACA;
  }

  // Light AI summary
  .ai-summary {
    background: #F0F4F8;
    border-left: 3px solid #2ECC71;
    color: #334155;

    .ai-badge {
      color: #2ECC71;
    }

    .summary-text {
      color: #334155;
    }
  }

  // Filter section
  .filter-section {
    padding: 12px;
    border-color: #CBD5E1;
  }

  // Filter badge
  .queue-section .queue-header .filter-badge {
    font-weight: 600;
  }

  // Section titles
  .section-title {
    letter-spacing: -0.01em;
  }
}
```

## Visual Description
The dashboard feels denser and more task-oriented. Stat cards are compact with extra-bold numbers that pop against a slightly stronger border. The queue list is tighter, with 12px gaps between items and 14px internal padding. Each queue item has a 5px left border that makes priority (green/amber/red) immediately visible. Alternating row tints (white/off-white) help the eye track across rows. Patient names are bolder. The AI summary block is now light-themed (pale blue-gray) instead of dark, keeping the page cohesive. Priority badges use sharper 4px radius and heavier weight. The overall impression is a clinical command center where every number and status can be read at a glance without leaning in.
