# Admin Users Management - Variation 1: Operational Clarity

## Design Direction

The Users tab is the most-used surface in the admin dashboard. This variation optimizes it for **high-frequency user management tasks**: scanning a list of users, checking status at a glance, changing roles, toggling active/disabled state, and creating new accounts. Every visual decision serves scan speed, action clarity, and error prevention.

Key philosophy: **The user table is a work surface. Make status unmistakable, actions immediate, and data dense without being cramped.**

## Visual Changes

### Colors
- **Search input focus**: Stronger focus ring -- `box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.3)` on focus
- **Role select dropdown**: Add a subtle left-border accent on focus: `border-left: 3px solid #2ECC71`
- **Create User button**: Keep emerald fill, but when in "Cancel" state, switch to outlined style: `background: transparent; border: 1px solid #E74C3C; color: #E74C3C` -- the cancel action should look clearly different from create
- **Table row for disabled users**: Entire row gets `opacity: 0.7` to visually de-emphasize disabled accounts
- **Inline role select**: Subtle background tint `#F8FAFC` to differentiate from plain text cells

### Typography
- **User count** ("X users found"): 14px, weight 600, color `var(--text-primary)` -- this is operational data, make it prominent
- **Create User panel heading**: Add an implicit heading via increased font-size on the first input placeholder or add visual weight to the panel with a top accent
- **Name cell**: Keep weight 500 but add `color: var(--text-primary)` explicitly for contrast anchoring
- **Phone column**: Use `font-variant-numeric: tabular-nums` and `letter-spacing: 0.02em` for phone number readability

### Spacing
- **Controls row**: Align items to center vertically, ensure consistent 44px height on search input and role select
- **Create user grid**: Increase gap from 10px to 12px for slight breathing room between fields
- **Create user actions**: Increase margin-top from 12px to 16px

### Borders & Surfaces
- **Create user panel**: Add `border-top: 3px solid #2ECC71` accent to signal "active creation context"
- **Controls row bottom**: Add `border-bottom: 1px solid var(--border-color)` with `padding-bottom: 12px` to separate filters from data
- **Inline select in table**: Reduce padding to `4px 8px` and border-radius to 4px -- minimal chrome within the table row

### Status Indicators
- **Active badge**: Sharper 6px radius, bolder `rgba(46, 204, 113, 0.22)` background, weight 600
- **Disabled badge**: Sharper 6px radius, bolder `rgba(239, 68, 68, 0.22)` background, weight 600
- **Disabled user row treatment**: `opacity: 0.7` on the entire `<tr>` for disabled users -- this creates an immediate visual pattern where disabled accounts recede

### Action Buttons
- **Enable/Disable toggle**: Color-code the button based on action:
  - "Disable" button: `color: #E74C3C; background: rgba(239, 68, 68, 0.08)` -- destructive action looks different
  - "Enable" button: `color: #2ECC71; background: rgba(46, 204, 113, 0.08)` -- positive action looks different
- **Hover states**: Both darken their background on hover
- **Create Account button**: Full emerald with 600 weight, 8px 16px padding

### Search/Filter UX
- **Search input**: Increase min-width to 280px on desktop for comfortable phone number entry
- **Role filter dropdown**: Add a clear visual reset -- when a role is selected, the dropdown border should shift to emerald to indicate active filtering

## SCSS Override Snippet

```scss
// ============================================
// V1: Operational Clarity - Users Management
// ============================================

// Prominent user count
.admin-dashboard .user-count {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

// Controls bar separation
.admin-dashboard .controls {
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
  align-items: center;

  .search-input {
    min-width: 280px;

    &:focus {
      box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.3);
    }
  }

  // Active filter indicator
  .role-select:not([value=""]) {
    border-color: #2ECC71;
  }
}

// Create user panel accent
.admin-dashboard .create-user-panel {
  border-top: 3px solid #2ECC71;

  .create-user-grid {
    gap: 12px;
  }

  .create-user-actions {
    margin-top: 16px;
  }
}

// Cancel state for create button
.admin-dashboard .action-btn--primary[class*="cancel"],
.admin-dashboard .controls .action-btn--primary:has(+ .create-user-panel) {
  // Note: apply via component class toggle in practice
}

// Table row for disabled users
.admin-dashboard .user-table tbody tr:has(.status-badge.disabled) {
  opacity: 0.7;
}

// Phone number formatting
.admin-dashboard .user-table td:nth-child(2) {
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}

// Inline role select - minimal chrome
.admin-dashboard .inline-select {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background: #F8FAFC;
}

// Color-coded action buttons
.admin-dashboard .user-table .action-btn {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: 500;
  transition: all 150ms ease;
}

// Sharper status badges
.admin-dashboard .status-badge {
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.02em;

  &.active {
    background: rgba(46, 204, 113, 0.22);
  }

  &.disabled {
    background: rgba(239, 68, 68, 0.22);
  }
}
```

## Visual Description

The Users tab is a focused work surface. The controls row at top has a clear bottom border separating search/filter from data. The search input has a generous 280px minimum width and a strong emerald focus ring. When a role filter is active, the dropdown border shifts to emerald as a visual cue that results are filtered.

Below, the user count reads prominently at 14px/600 weight -- "47 users found" is operational intelligence, not a footnote.

The table uses alternating row tints and row hover from the dashboard-level V1 overrides. The key user-tab addition is **disabled-user row dimming** -- rows where the user is disabled get `opacity: 0.7`, creating an immediate visual pattern: active accounts are crisp and full-contrast, disabled accounts recede. This lets an admin instantly gauge the ratio of active to disabled accounts just by scanning the table.

Status badges are compact 6px-radius rectangles with 600 weight and 22% opacity backgrounds -- bolder and sharper than the default pills.

The inline role `<select>` within each row is minimally styled: 4px radius, 12px font, light `#F8FAFC` background -- it reads as an interactive element but does not dominate the row.

When the Create User panel expands, it announces itself with a 3px emerald top-border accent. Fields have 12px gaps and the Create Account button sits right-aligned with generous padding. The overall panel feels like an inline form region, clearly scoped but not modal.

Phone numbers use `tabular-nums` for alignment, making the phone column easy to scan vertically.
