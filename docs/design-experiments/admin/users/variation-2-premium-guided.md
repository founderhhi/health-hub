# Admin Users Management - Variation 2: Premium Guided

## Design Direction

The Users management surface gets the **premium SaaS treatment**: more generous spacing, richer card framing for the create-user panel, polished status indicators, and thoughtful micro-interactions on every action. The admin should feel like they are managing users inside a well-crafted product -- not an internal tool bolted onto a database.

Key philosophy: **User management is a trust-critical function. The interface should feel confident, precise, and worthy of that responsibility.**

## Visual Changes

### Colors
- **Create user panel**: White background with shadow-md and a subtle emerald gradient top-border (`border-top: 3px solid; border-image: linear-gradient(90deg, #2ECC71, #27AE60) 1`)
- **Search input**: On focus, border transitions to emerald with a soft glow: `box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.15)`
- **Table row hover**: `background: rgba(46, 204, 113, 0.03)` -- barely-there emerald wash
- **Primary action buttons**: Emerald gradient fill `linear-gradient(135deg, #2ECC71, #27AE60)` instead of flat emerald
- **Active status badge**: Add a subtle inner glow: `box-shadow: inset 0 0 0 1px rgba(46, 204, 113, 0.2)`

### Typography
- **User count**: 14px, weight 500, add "Total:" prefix feel by using `font-variant-numeric: tabular-nums`
- **Name cells**: Weight 500, color `#111827` (near-black for maximum contrast)
- **Create user panel**: Field labels could benefit from above-input labels rather than just placeholders (noted as potential HTML change -- SCSS only: increase placeholder opacity to 0.7 for better visibility)
- **Pagination info**: Increase to 14px from 13px, weight 500

### Spacing
- **Create user panel padding**: 24px (up from 14px) -- generous, premium feel
- **Create user grid gap**: 14px (up from 10px)
- **Create user actions margin**: 20px top (up from 12px)
- **Controls gap**: 14px (up from 12px)
- **Table cells**: 14px vertical padding, 14px horizontal

### Borders & Surfaces
- **Create user panel**: `border-radius: 16px`, `box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08)`, emerald gradient top-border
- **Search input**: `border-radius: 10px` (up from 8px)
- **Role select**: `border-radius: 10px` (up from 8px)
- **Table wrapper**: `border-radius: 12px`, `border: 1px solid var(--border-color)`, `overflow: hidden`, `box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04)`
- **Inline select**: `border-radius: 6px`, subtle shadow on focus
- **Status badges**: Keep 12px pill radius, add `box-shadow: 0 1px 2px rgba(0,0,0,0.04)` for subtle lift

### Transitions & Micro-interactions
- **Search input focus**: Smooth 200ms border-color and box-shadow transition
- **Create Account button**: `transform: scale(1.02)` on hover, 150ms transition
- **Table row hover**: 150ms background transition
- **Status badge**: 150ms transition on hover (prepare for future tooltips)
- **Inline select focus**: Smooth border-color transition 200ms

### Action Buttons
- **Create Account**: Gradient fill, 10px radius, 10px 20px padding, weight 600
- **Enable/Disable**: 6px radius, clear hover state with background shift
- **Page buttons**: 10px radius, hover shows emerald border with 200ms transition

## SCSS Override Snippet

```scss
// ============================================
// V2: Premium Guided - Users Management
// ============================================

// Premium controls row
.admin-dashboard .controls {
  gap: 14px;

  .search-input {
    border-radius: 10px;
    transition: all 200ms ease;

    &:focus {
      border-color: #2ECC71;
      box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.15);
    }
  }

  .role-select {
    border-radius: 10px;
  }
}

// Premium create user panel
.admin-dashboard .create-user-panel {
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
  border-top: 3px solid #2ECC71;

  .create-user-grid {
    gap: 14px;
  }

  .create-user-actions {
    margin-top: 20px;
  }

  .search-input {
    &::placeholder {
      opacity: 0.7;
    }
  }
}

// Premium Create Account button
.admin-dashboard .create-user-actions .action-btn--primary {
  background: linear-gradient(135deg, #2ECC71, #27AE60);
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: 600;
  transition: all 150ms ease;

  &:hover:not(:disabled) {
    transform: scale(1.02);
    box-shadow: 0 2px 8px rgba(46, 204, 113, 0.25);
  }
}

// Premium table
.admin-dashboard .user-table-wrap {
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
}

.admin-dashboard .user-table {
  td, th {
    padding: 14px;
  }

  .name-cell {
    color: #111827;
    font-weight: 500;
  }

  tbody tr {
    transition: background 150ms ease;

    &:hover {
      background: rgba(46, 204, 113, 0.03);
    }
  }
}

// Refined inline select
.admin-dashboard .inline-select {
  border-radius: 6px;
  transition: border-color 200ms ease;

  &:focus {
    box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.15);
  }
}

// Premium status badges
.admin-dashboard .status-badge {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 150ms ease;

  &.active {
    box-shadow: inset 0 0 0 1px rgba(46, 204, 113, 0.2), 0 1px 2px rgba(0, 0, 0, 0.04);
  }
}

// Refined user count
.admin-dashboard .user-count {
  font-size: 14px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

// Premium pagination
.admin-dashboard .page-btn {
  border-radius: 10px;
  transition: all 200ms ease;
}

.admin-dashboard .page-info {
  font-size: 14px;
  font-weight: 500;
}

// Premium primary button in controls
.admin-dashboard .controls .action-btn--primary {
  border-radius: 10px;
  padding: 8px 20px;
}
```

## Visual Description

The Users management surface feels **elevated and intentional**. The controls row at top uses rounder inputs (10px radius) with smooth focus transitions -- the search input gets a soft emerald glow on focus, and the role dropdown matches with the same radius.

The Create User button in the controls row is emerald-filled with 10px radius and generous padding. When the create panel opens below, it appears as a substantial card: 16px radius, 24px padding, a soft medium shadow, and an emerald top-border accent. The form fields inside have 14px gaps and visible placeholder text (opacity 0.7). The Create Account action button at bottom-right uses a gradient fill and subtly scales on hover (1.02x) with an emerald shadow bloom.

The user table sits in a framed container (12px radius, 1px border, subtle shadow). Cell padding is generous at 14px, giving each row comfortable breathing room. Name cells are in near-black `#111827` at medium weight. Hovering any row introduces the faintest emerald wash.

Status badges are polished pills with subtle outer shadows and, for "Active" badges, an inner emerald ring. The inline role `<select>` uses 6px radius and gets a smooth focus glow matching the search input.

Pagination at bottom uses rounder 10px buttons that highlight with an emerald border on hover. The page info text is slightly larger (14px) and medium weight.

The overall experience feels like managing users in a **premium SaaS product** -- every interaction has a considered transition, every surface has appropriate depth, and the emerald accents feel intentional rather than applied.
