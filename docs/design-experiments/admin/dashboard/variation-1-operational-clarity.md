# Admin Dashboard - Variation 1: Operational Clarity

## Design Direction

The admin dashboard is the operational nerve center of Health Hub. This variation pushes toward **data density with visual clarity** -- sharper status indicators, tighter spacing for scan efficiency, stronger numerical hierarchy, and clear action affordances. The goal is an admin who can glance at the dashboard and immediately understand system state, user counts, and pending actions without scrolling or hunting.

Key philosophy: **Every pixel earns its place through information density or action clarity.**

## Visual Changes

### Colors
- **Tab bar active state**: Solid emerald `#2ECC71` background with `#0B0F14` text (current) -- keep, but add a 2px bottom border on active tab for double-signal
- **Health metric cards**: Add a 3px left border in emerald `#2ECC71` to each `.health-card` for faster visual grouping
- **Table header row**: Background tint `#F1F5F9` instead of transparent, creating a sticky visual anchor
- **Alternating row tints**: Every other `<tr>` gets `#FAFBFC` background for scan-line tracking
- **Status badge "Active"**: Slightly bolder green -- `rgba(46, 204, 113, 0.20)` background (up from 0.15)
- **Status badge "Disabled"**: Slightly bolder red -- `rgba(239, 68, 68, 0.20)` background (up from 0.15)
- **Notice banners**: Keep current treatment, adequate

### Typography
- **Health metric values** (`.health-value`): Increase weight from 700 to 800 (extra-bold) if available, or use `font-variant-numeric: tabular-nums` for alignment
- **Table header** (`th`): Keep 12px uppercase but increase weight from 500 to 600 for stronger column anchoring
- **User count label**: Increase from 13px to 14px, weight 500 -- this is operational data, not decoration
- **Tab text**: Keep 14px but active tab goes to weight 700 (up from 600)

### Spacing
- **Table cell padding**: Tighten from 12px to 10px vertical, keep 12px horizontal -- increases visible rows per viewport
- **Health grid gap**: Tighten from 16px to 12px -- the cards are small, tighter grouping reads as a cohesive metrics panel
- **Tab bar gap**: Keep 8px -- already tight
- **Section gap between controls and table**: Reduce from 16px to 12px
- **Pagination margin-top**: Reduce from 20px to 16px

### Borders & Surfaces
- **Table**: Add `border: 1px solid var(--border-color)` around the entire `.user-table-wrap` with `border-radius: 8px` and `overflow: hidden` -- frames the table as a distinct data region
- **Health cards**: Change from 12px radius to 8px -- sharper, more operational feel
- **Create user panel**: Keep 10px radius, but add a subtle top-border accent: `border-top: 3px solid #2ECC71`
- **Table row hover**: Add `background: #F1F5F9` on `tbody tr:hover` for interactive feedback

### Status Indicators
- **Badge border-radius**: Reduce from 12px (pill) to 6px -- sharper chips read as data labels, not decorative tags
- **Badge font-weight**: Increase from 500 to 600
- **Badge letter-spacing**: Add `0.02em` for tighter, more deliberate feel
- **Claimed badge**: Add left-border accent `border-left: 3px solid #F59E0B` in addition to background tint
- **Fulfilled badge**: Add left-border accent `border-left: 3px solid #3B82F6`

### Action Buttons
- **Primary action button** (`.action-btn--primary`): Increase padding from `6px 14px` to `8px 16px` for better click target
- **Table action buttons**: Keep compact but add `font-weight: 500` for slightly more authority
- **Disabled state**: Reduce opacity from 0.55 to 0.4 to make disabled state more obviously inactive

## SCSS Override Snippet

```scss
// ============================================
// V1: Operational Clarity - Admin Dashboard
// ============================================

// Tighter table density
.admin-dashboard .user-table {
  th, td {
    padding: 10px 12px;
  }

  th {
    font-weight: 600;
    background: #F1F5F9;
    border-bottom: 2px solid var(--border-color);
  }

  // Alternating row tints
  tbody tr:nth-child(even) {
    background: #FAFBFC;
  }

  // Row hover
  tbody tr:hover {
    background: #F1F5F9;
  }
}

// Framed table region
.admin-dashboard .user-table-wrap {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

// Sharper status badges
.admin-dashboard .status-badge {
  border-radius: 6px;
  font-weight: 600;
  letter-spacing: 0.02em;

  &.active {
    background: rgba(46, 204, 113, 0.20);
  }

  &.disabled {
    background: rgba(239, 68, 68, 0.20);
  }

  &.claimed {
    border-left: 3px solid #F59E0B;
  }

  &.fulfilled {
    border-left: 3px solid #3B82F6;
  }
}

// Health cards with left accent
.admin-dashboard .health-card {
  border-left: 3px solid #2ECC71;
  border-radius: 8px;
}

.admin-dashboard .health-grid {
  gap: 12px;
}

.admin-dashboard .health-value {
  font-variant-numeric: tabular-nums;
}

// Active tab double-signal
.admin-dashboard .tab.active {
  font-weight: 700;
  border-bottom: 2px solid var(--bg-primary);
}

// Stronger user count
.admin-dashboard .user-count {
  font-size: 14px;
  font-weight: 500;
}

// Tighter controls-to-table gap
.admin-dashboard .controls {
  margin-bottom: 12px;
}

// Create user panel accent
.admin-dashboard .create-user-panel {
  border-top: 3px solid #2ECC71;
}

// Primary action button sizing
.admin-dashboard .action-btn--primary {
  padding: 8px 16px;
}

// Disabled clarity
.admin-dashboard .action-btn:disabled {
  opacity: 0.4;
}

// Pagination tightening
.admin-dashboard .pagination {
  margin-top: 16px;
}
```

## Visual Description

The dashboard reads as a **command center**. The tab bar across the top stays clean but the active tab is heavier (700 weight) with a bottom-border accent for unmistakable selection state. Below, the controls row (search, filter, create) sits in a tight band before the main data table.

The table is the star: framed in a subtle 1px border with rounded corners, it feels like a proper data region rather than floating rows. The header row has a light `#F1F5F9` tint and 600-weight labels that anchor each column. Alternating rows in `#FAFBFC` create natural scan lines. Hovering any row highlights it in `#F1F5F9`.

Status badges are compact rectangles (6px radius) rather than soft pills -- they read as structured data labels. "Active" badges carry a bolder green tint; "Disabled" badges a bolder red. In the pharmacy tab, "Claimed" and "Fulfilled" badges get left-border accents in their semantic colors for instant status recognition.

Health metric cards in the System Health tab have a 3px emerald left border, making them feel like KPI indicators rather than generic boxes. Values use tabular-nums for alignment when numbers change.

Overall the density is slightly increased (tighter padding, smaller gaps) but legibility is maintained through stronger typographic hierarchy and color contrast. The admin can see more data per viewport without feeling cramped.
