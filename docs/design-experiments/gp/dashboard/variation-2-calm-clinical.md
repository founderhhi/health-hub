# GP Dashboard — V2: Calm Clinical

## Design Direction
Add breathing room between patients and sections. Soften urgency cues so they are clear but not alarming. Reduce visual noise so the doctor can focus on the next patient without cognitive overload.

## Visual Changes

### Colors
- Page background softens from `#F8FAFC` to `#FAFBFD` (fractionally warmer)
- Queue item borders lighten from `#E2E8F0` to `#EDF2F7`
- Emergency background softens from `#FEF2F2` to `#FFF5F5` (less saturated)
- Expiring-soon background softens from `#FFFBEB` to `#FFFDF5`
- Stat card icon backgrounds reduce to 8% opacity: `rgba(46,204,113,0.08)`, etc.
- AI summary: `background: #F7FAFC; border-left: 2px solid rgba(46,204,113,0.3)` — very subtle
- Sparkline stroke opacity reduces: add `opacity: 0.6` to sparkline paths

### Typography
- `.stat-card__value` font-size reduces from 32px to 28px, weight stays 700
- `.page-title` font-size reduces from 24px to 22px
- `.patient-name` font-size stays 16px, weight reduces from 600 to 500
- Body text line-height increases from 1.5 to 1.6 wherever `font-size-sm` or `font-size-base` is used
- `.queue-number` opacity reduces to 0.4 (further de-emphasized)
- `.meta-item` color lightens from `#64748B` to `#94A3B8`

### Spacing & Layout
- `.queue-item` padding increases from 16px to 20px
- `.queue-list` gap increases from 16px to 20px
- `.stats-row` gap increases from 16px to 20px
- `.stat-card` padding increases from 24px to 28px
- `.filter-section` margin-bottom increases from 24px to 28px
- `.dashboard-header` margin-bottom increases from 32px to 40px
- `.sidebar-card` padding increases from 24px to 28px
- `.queue-header` margin-bottom increases from 24px to 20px (tighter since items have more padding)

### Borders & Shadows
- `.queue-item` shadow removed entirely (flat cards, border only)
- `.queue-item:hover` shadow softens to `0 2px 4px rgba(15,23,42,0.04)`
- `.stat-card` shadow reduces from `0 1px 2px rgba(15,23,42,0.04)` to `0 1px 2px rgba(15,23,42,0.02)`
- `.stat-card:hover` transform removed; shadow on hover: `0 2px 4px rgba(15,23,42,0.04)` (gentler)
- All border-radius on cards increases from 8px to 10px
- `.modal-card` border-radius increases from 12px to 14px

### Surface Treatment
- Stat cards get a very subtle top-border accent: `border-top: 2px solid #EDF2F7`
- Queue items lose the left-border accent for routine priority (only urgent/emergency keep it)
- Sidebar cards get `border: 1px solid #EDF2F7` (lighter)

### Status & State Indicators
- Priority badges use tinted backgrounds with no border:
  - Routine: `background: #F1F5F9; color: #64748B` (very muted)
  - Urgent: `background: #FEF9EE; color: #B45309` (softer amber)
  - Emergency: `background: #FEF2F2; color: #B91C1C` (keeps seriousness but less harsh)
- `.expiring-badge` loses the border, uses only `background: #FEF9EE; color: #B45309`
- `.operational-status` pill border opacity reduces to 0.2
- `.hhi-wait-indicator--overdue` animation slows to 2.5s (less anxious pulsing)

## SCSS Override Snippet
```scss
// V2: Calm Clinical — GP Dashboard overrides

.gp-dashboard {
  background: #FAFBFD;

  // More breathing room
  .dashboard-header {
    margin-bottom: 40px;
  }

  .stats-row {
    gap: 20px;
  }

  .stat-card {
    padding: 28px;
    border-radius: 10px;
    border-color: #EDF2F7;
    border-top: 2px solid #EDF2F7;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.02);

    &:hover {
      transform: none;
      box-shadow: 0 2px 4px rgba(15, 23, 42, 0.04);
    }

    &__value {
      font-size: 28px;
    }

    &__icon {
      &--waiting { background: rgba(46, 204, 113, 0.08); }
      &--active { background: rgba(59, 130, 246, 0.08); }
      &--completed { background: rgba(139, 92, 246, 0.08); }
      &--time { background: rgba(100, 116, 139, 0.08); }
    }

    &__sparkline svg path {
      opacity: 0.6;
    }
  }

  .queue-list {
    gap: 20px;
  }

  .queue-item {
    padding: 20px;
    border-color: #EDF2F7;
    border-left-color: transparent;
    border-radius: 10px;

    &.priority-urgent {
      border-left-color: #F59E0B;
    }

    &.priority-emergency {
      border-left-color: #EF4444;
      background: #FFF5F5;
    }

    &.expiring-soon {
      background: #FFFDF5;
      border-color: #FDE68A;
    }

    &:hover {
      box-shadow: 0 2px 4px rgba(15, 23, 42, 0.04);
    }

    .queue-number {
      opacity: 0.4;
    }

    .patient-info .patient-header .patient-name {
      font-weight: 500;
    }

    .patient-meta .meta-item {
      color: #94A3B8;
    }
  }

  // Softer badges
  .hhi-badge--neutral {
    background: #F1F5F9;
    color: #64748B;
    border: none;
  }

  .hhi-badge--warning {
    background: #FEF9EE;
    color: #B45309;
    border: none;
  }

  .hhi-badge--urgent {
    background: #FEF2F2;
    color: #B91C1C;
    border: none;
  }

  .expiring-badge {
    border: none;
    background: #FEF9EE;
    color: #B45309;
  }

  // Gentle AI summary
  .ai-summary {
    background: #F7FAFC;
    border-left: 2px solid rgba(46, 204, 113, 0.3);

    .summary-text {
      color: #64748B;
      line-height: 1.6;
    }
  }

  // Softer sidebar
  .sidebar-card {
    padding: 28px;
    border-color: #EDF2F7;
  }

  // Operational status
  .operational-status {
    border-color: rgba(46, 204, 113, 0.2);
  }

  // Filter section
  .filter-section {
    border-color: #EDF2F7;
    margin-bottom: 28px;
  }

  // Overdue indicator
  .hhi-wait-indicator--overdue {
    animation-duration: 2.5s;
  }

  .page-title {
    font-size: 22px;
  }
}
```

## Visual Description
The dashboard exhales. Stat cards have generous 28px padding and smaller (28px) numbers that feel informative rather than demanding. Card borders are a whisper-light `#EDF2F7`. The queue list spaces items 20px apart with 20px internal padding, giving each patient their own visual room. Only urgent and emergency items carry the colored left border; routine items are clean white. Priority badges are tinted pastels without borders. The AI summary block is barely there, a pale gray card with a faint emerald left accent. Hover effects are minimal: no card lift, just a 2px soft shadow. The page title is slightly smaller. The overall mood is a calm, bright workspace where the doctor is not visually pressured but can still quickly identify who needs attention.
