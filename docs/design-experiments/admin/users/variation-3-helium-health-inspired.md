# Admin Users Management - Variation 3: Helium Health SaaS Admin Inspired

## Design Direction

This variation applies the **Helium Health HeliumOS** enterprise admin pattern specifically to the user management surface. Helium Health's HRIS module manages thousands of healthcare professionals (doctors, nurses, administrators) across multiple facilities. Their user management pattern emphasizes: clean sortable tables, flat status indicators, efficient inline actions, and minimal visual chrome. The interface trusts the data to communicate rather than decorating it.

Key philosophy: **Hospital operations managers manage hundreds of staff accounts daily. The UI should be fast to scan, fast to act, and invisible when not needed.**

## Competitor Reference

### Helium Health HRIS (User Management)
- **Table pattern**: Full-width, no outer border, minimal horizontal rules, sortable column headers
- **Status display**: Dot + text or flat colored text -- never heavy background badges
- **Role display**: Plain text, sometimes with a light tag treatment
- **Actions**: Text-link style buttons ("Edit", "Deactivate") rather than filled buttons
- **Search**: Single unified search bar, no separate filter dropdowns (or filters collapsed by default)
- **Bulk operations**: Checkbox column + floating bulk action bar
- **Pagination**: Simple "Showing 1-25 of 147" text with < > arrows

### Modern SaaS User Management Patterns
- **Stripe**: Clean table, text-link actions, dot status, generous horizontal padding
- **Linear**: Flat table, avatar + name pattern, keyboard shortcuts
- **Notion**: Minimal chrome, text-as-interface, functional density

## Visual Changes

### Colors
- **Search/filter bar**: Clean white background inputs with `#D1D5DB` borders (standard gray), emerald only on focus
- **Table**: Remove all colored backgrounds from cells. Status is communicated only through dot + text
- **Create user panel**: White, 1px `#E5E7EB` border, no shadow, no colored accents -- it is just a form, not a feature
- **Action buttons**: Style as **text links**, not buttons: `background: none; border: none; color: #2ECC71; text-decoration: none; font-weight: 500`
  - "Disable" action: `color: #DC2626` (red text link)
  - "Enable" action: `color: #16A34A` (green text link)
- **Active filter state**: When role filter is selected, show a small "x" clear icon or underline to indicate filtering is active

### Typography
- **User count**: Reformat to "Showing 1-25 of 47 users" pattern (Helium/SaaS style) at 13px, weight 400, `#6B7280`
- **Name cells**: 14px, weight 500, `#111827` -- the strongest element in each row
- **Phone cells**: 14px, weight 400, `#374151`, `font-variant-numeric: tabular-nums`
- **Role text** (if switching from dropdown to display): 13px, weight 400, `#6B7280`
- **Action text links**: 13px, weight 500
- **Create user panel fields**: 14px inputs, 13px labels above inputs (if adding labels)
- **Pagination**: "Page 1 of 3" becomes "Showing 1-25 of 47" at 13px, `#6B7280`

### Spacing
- **Search input**: Full row width minus role filter and create button. Height 40px (slightly shorter than 44px -- denser)
- **Table cell padding**: 10px vertical, 16px horizontal -- tight vertically, generous horizontally
- **Create user grid**: 12px gap, tighter form
- **Create user panel padding**: 16px (lean, not generous)
- **Controls margin-bottom**: 8px (tight -- the table follows immediately)

### Borders & Surfaces
- **Table**: No outer border, no border-radius, no shadow. Just horizontal rules:
  - Header bottom: `1px solid #E5E7EB`
  - Row bottom: `1px solid #F3F4F6`
  - Last row: no bottom border
- **Create user panel**: `1px solid #E5E7EB`, `border-radius: 6px`, no shadow
- **Search input**: `border-radius: 6px`, `border: 1px solid #D1D5DB`, 40px height
- **Role select**: `border-radius: 6px`, `border: 1px solid #D1D5DB`, 40px height
- **Inline role select**: Remove border entirely in table. Show as plain text with a small edit icon or hover-to-show dropdown pattern

### Status Indicators (Dot + Text)
- **Active**: 8px green dot `#22C55E` + "Active" in `#15803D`, no background
- **Disabled**: 8px red dot `#EF4444` + "Disabled" in `#991B1B`, no background
- No padding, no border-radius, no background color -- purely inline

### Pagination
- Reformat to: "Showing 1-25 of 47" left-aligned, with < > arrow buttons right-aligned
- Arrow buttons: 32px square, 6px radius, 1px `#D1D5DB` border, icon-only (no text)

## SCSS Override Snippet

```scss
// ============================================
// V3: Helium Health SaaS - Users Management
// ============================================

// Lean controls
.admin-dashboard .controls {
  gap: 10px;
  margin-bottom: 8px;
  align-items: center;

  .search-input {
    border-radius: 6px;
    border-color: #D1D5DB;
    height: 40px;
    min-height: 40px;
    padding: 8px 12px;

    &:focus {
      border-color: #2ECC71;
      box-shadow: 0 0 0 1px #2ECC71;
    }
  }

  .role-select {
    border-radius: 6px;
    border-color: #D1D5DB;
    height: 40px;
  }
}

// Create button as secondary until needed
.admin-dashboard .controls .action-btn--primary {
  height: 40px;
  border-radius: 6px;
  font-size: 13px;
  padding: 0 16px;
}

// Lean create user panel
.admin-dashboard .create-user-panel {
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  padding: 16px;
  box-shadow: none;
  background: #FFFFFF;
  margin-bottom: 8px;

  .create-user-grid {
    gap: 12px;
  }
}

// Minimal table
.admin-dashboard .user-table-wrap {
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.admin-dashboard .user-table {
  th {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: #6B7280;
    background: transparent;
    padding: 10px 16px;
    border-bottom: 1px solid #E5E7EB;
  }

  td {
    padding: 10px 16px;
    border-bottom: 1px solid #F3F4F6;
    font-weight: 400;
    color: #374151;
  }

  .name-cell {
    font-weight: 500;
    color: #111827;
  }

  // Phone numbers
  td:nth-child(2) {
    font-variant-numeric: tabular-nums;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background: #F9FAFB;
  }
}

// Text-link action buttons
.admin-dashboard .user-table .action-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
  font-weight: 500;
  color: #2ECC71;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    background: none;
    color: #16A34A;
  }

  &:disabled {
    color: #D1D5DB;
    opacity: 1;
    cursor: not-allowed;

    &:hover {
      text-decoration: none;
    }
  }
}

// Inline select - minimal
.admin-dashboard .inline-select {
  border: 1px solid transparent;
  background: transparent;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
  color: #6B7280;

  &:hover {
    border-color: #D1D5DB;
  }

  &:focus {
    border-color: #2ECC71;
    background: #FFFFFF;
  }
}

// Dot-based status (inherits from dashboard V3)
.admin-dashboard .status-badge {
  background: none !important;
  padding: 0;
  border-radius: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  &.active {
    color: #15803D;
    &::before { background: #22C55E; }
  }

  &.disabled {
    color: #991B1B;
    &::before { background: #EF4444; }
  }
}

// Refined user count
.admin-dashboard .user-count {
  font-size: 13px;
  font-weight: 400;
  color: #6B7280;
}

// Lean pagination
.admin-dashboard .pagination {
  margin-top: 12px;
}

.admin-dashboard .page-btn {
  border-radius: 6px;
  border-color: #D1D5DB;
  padding: 6px 12px;
  font-size: 13px;
}

.admin-dashboard .page-info {
  font-size: 13px;
  color: #6B7280;
}
```

## Visual Description

The Users tab looks like a **modern SaaS admin console**. The controls row is lean and tight: a 40px-tall search input with 6px radius and standard gray border, a matching role dropdown, and a contained Create User button. The gap between controls and table is minimal (8px) -- the interface wastes no space.

The user table is stripped to essentials. No outer borders, no background fills on the header, just clean horizontal rules: a slightly heavier line under the header and very light `#F3F4F6` lines between rows. The last row has no bottom border, letting the table end cleanly. Header text is 12px uppercase in `#6B7280`.

Data cells use regular weight (400) in `#374151` with name cells promoted to medium weight (500) in `#111827`. Phone numbers are in `tabular-nums` for vertical alignment.

The most distinctive change is in **actions and status**. The Enable/Disable buttons are styled as **text links** -- no background, no border, just colored text. "Disable" appears in emerald green, hover-underlines on interaction. The inline role `<select>` is nearly invisible when not in use (transparent border and background), only revealing itself with a border on hover and focus.

Status is shown via **dot + text**: an 8px green circle followed by "Active" in `#15803D`, or a red circle with "Disabled" in `#991B1B`. No background pills, no padding, no visual weight beyond the semantic color.

The Create User panel, when expanded, is a clean white form with 6px radius and 1px gray border -- no shadow, no accent. It looks like what it is: a form. Fields are tight (12px gap), the Create Account button is functional (not flashy).

The user count line reads "47 users found" in understated 13px gray. Pagination is compact with 6px-radius buttons and 13px text.

This is the kind of user management surface that a hospital IT administrator in Nairobi would use to manage 200+ staff accounts efficiently -- **maximum data, minimum decoration**.
