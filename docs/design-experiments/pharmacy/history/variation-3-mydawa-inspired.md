# Pharmacy History -- V3: MyDawa-Inspired

## Design Direction

Adapts **MyDawa's order history and tracking patterns** for a pharmacist's prescription log. Prescriptions are presented as order records with prominent status tracking, codes in monospace, and a transactional density that mirrors e-commerce order history pages. Filters feel like search/sort tools in a fulfillment dashboard.

## Competitor Reference

**MyDawa order history patterns:**
- Order list with order number, date, status, and item count prominently displayed
- Status shown as colored chips: Processing, Dispatched, Delivered, Cancelled
- Delivery time estimates and payment method shown per order
- Search and filter by status, date range
- SMS confirmation with unique order number -- trackable

**General pharmacy order management patterns:**
- Left-border color coding for quick status scanning
- Alternating row tints for list scannability
- Compact card density for high-volume environments
- Sort by status, date, patient -- multiple axes
- Export/print capability indicators

## Visual Changes

### Colors
- Page background uses white (`#FFFFFF`) with 4px emerald top strip
- History items gain left-border color coding: 3px solid emerald (completed), 3px amber (pending), 3px red (cancelled)
- Alternating row tints: even items get `#FAFBFC` background
- Date group headers use a `#F0F4F8` background strip -- full-width header bars
- Filter section background uses `#FAFBFC`
- Status badges use sharper colors: solid-background at 15% opacity with darker text

### Typography
- Page title uses Inter at 22px bold -- e-commerce scale
- Date group headers use 11px uppercase, weight 600, letter-spacing wide -- system headers
- History item code uses monospace font at `$font-size-sm`
- History item subtitle uses `$font-size-xs` -- denser
- Status badge text uses 10px uppercase, weight 600
- Results count uses monospace font

### Spacing
- History container max-width narrows from 800px to 720px
- History list gap tightens from `$space-md` to 8px -- denser list
- History item padding tightens to 12px 14px
- Filter grid gap tightens to 12px
- Filter section padding tightens to 14px
- Date group header has 10px vertical padding with full-width background

### Borders & Radius
- History cards use `$radius-sm` (4px) -- sharper, more data-table-like
- Filter section uses `$radius-md`
- Status badges use `$radius-sm` (4px) instead of pill
- Filter inputs use `$radius-sm`
- History item icon wrapper uses `$radius-sm`

### Surface & Shadows
- History cards have no shadow -- flat with border only
- Filter section has no shadow -- relies on background differentiation
- Hover on history cards adds a subtle background tint only
- No shadow escalation anywhere -- e-commerce flat
- Date group headers are flat full-width strips

### Status & Interactions
- History items are more clickable-feeling: cursor pointer with full-row hover tint
- Left border thickens from 3px to 4px on hover
- Clear filters button uses emerald text color
- Filter selects use a smaller dropdown chevron
- Empty state is minimal: icon, text, clear filters link (no large illustration)

## SCSS Override Snippet

```scss
// V3: MyDawa-Inspired -- Pharmacy History

.pharmacy-history {
  background: v.$color-white;

  &::before {
    content: '';
    display: block;
    height: 4px;
    background: v.$color-emerald;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: v.$z-fixed;
  }
}

.history-container {
  max-width: 720px;
}

.page-title {
  font-size: 22px;
}

.filter-section {
  background: #FAFBFC;
  box-shadow: none;
  padding: 14px;
}

.filter-grid {
  gap: 12px;
}

.filter-group {
  .filter-input,
  .filter-select {
    border-radius: v.$radius-sm;
  }
}

.results-count {
  font-family: v.$font-family-mono;
}

.history-group .date-header {
  font-size: 11px;
  background: #F0F4F8;
  padding: 10px v.$space-md;
  margin: 0 calc(v.$space-md * -1);
  width: calc(100% + v.$space-md * 2);
  border-radius: 0;
}

.history-list {
  gap: 8px;
}

.history-item {
  border-radius: v.$radius-sm;
  box-shadow: none;
  padding: 12px 14px;
  border-left: 3px solid v.$color-emerald;
  transition: border-left-width v.$transition-fast, background v.$transition-fast;

  &:nth-child(even) {
    background: #FAFBFC;
  }

  &:hover {
    border-left-width: 4px;
    background: #F5F7FA;
    box-shadow: none;
  }

  &__icon-wrapper {
    width: 36px;
    height: 36px;
    border-radius: v.$radius-sm;

    &--pending {
      & ~ .history-item__info {
        // parent item gets amber border
      }
    }
  }

  &__title {
    font-family: v.$font-family-mono;
    font-size: v.$font-size-sm;
  }

  &__subtitle {
    font-size: v.$font-size-xs;
  }
}

// Status-based left borders (applied via parent)
.history-item:has(.history-item__icon-wrapper--pending) {
  border-left-color: v.$color-warning;
}

.history-item:has(.history-item__icon-wrapper--cancelled) {
  border-left-color: v.$color-danger;
}

.hhi-badge {
  border-radius: v.$radius-sm;
  font-size: 10px;
  font-weight: v.$font-weight-semibold;
  text-transform: uppercase;
  letter-spacing: 0.04em;

  &--success {
    background: rgba(v.$color-success, 0.15);
  }

  &--warning {
    background: rgba(v.$color-warning, 0.15);
  }

  &--error {
    background: rgba(v.$color-danger, 0.15);
  }
}

.clear-filters-btn {
  color: v.$color-emerald-dark;
  border-color: rgba(v.$color-emerald, 0.3);
}
```

## Visual Description

The history page is a clean fulfillment log on a white background with the thin emerald identity strip at top. The page title is a compact 22px. The filter section sits on `#FAFBFC` with no shadow and tighter spacing. Date group headers appear as full-width `#F0F4F8` strips with 11px uppercase text -- system-level dividers. History items are flat cards (no shadow) with sharp 4px radius, each with a 3px left border colored by status (emerald/amber/red). Prescription codes are monospace. Even rows have alternating `#FAFBFC` tint. Status badges are sharp-cornered uppercase chips at 10px. Hovering thickens the left border to 4px. The result is a dense, transactional order history that a high-volume pharmacy can scan efficiently -- borrowing the clean data density of e-commerce fulfillment dashboards.
