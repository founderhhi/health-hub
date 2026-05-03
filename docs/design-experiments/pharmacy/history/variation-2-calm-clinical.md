# Pharmacy History -- V2: Calm Clinical

## Design Direction

The history page becomes a **quiet, scannable log** optimized for quick lookup. Shadows are minimized, borders are softened, status indicators use lighter tints, and the overall density is comfortable without being sparse. A pharmacist should be able to scan the list, find a prescription, and move on without visual friction.

## Visual Changes

### Colors
- Page background stays flat `$color-surface` -- no gradients
- All border colors soften from `$color-border` to `#EDF2F7`
- Status badge backgrounds use lower opacity tints (10% instead of default)
- History item icon wrapper uses lighter tints: `#F7FFF7` for completed, `#FFFCF0` for pending
- Date group header color stays `$color-text-secondary` but weight drops to 500
- Filter input border uses `#D4D9E0` -- slightly lighter than default

### Typography
- All text stays in Inter
- Page title drops to weight 600
- Page subtitle color lightens to `$color-text-muted`
- Date group headers use weight 500 (from 600)
- History item title uses weight 500 (from semibold)
- History item subtitle line-height increases to 1.6
- Results count weight stays at regular

### Spacing
- History container padding stays at `$space-lg` -- no increase
- History list gap stays at `$space-md` -- no increase
- Filter section margin-bottom increases from `$space-xl` to 28px
- History group gap increases from `$space-xl` to 28px
- History item padding stays at `$space-md`

### Borders & Radius
- All borders use `#EDF2F7`
- No radius increases -- keep `$radius-md` everywhere
- Filter section border lightens
- History cards border lightens
- Status badges keep pill shape

### Surface & Shadows
- History cards stay at `$shadow-sm` -- no upgrades
- History card hover: background tint only (`#FAFBFC`), no shadow change, no border color change
- Filter section stays at `$shadow-sm`
- Date group header has no extra borders or decorations
- Loading banner has no shadow

### Status & Interactions
- No transform animations on any element
- Hover states use background tint only
- Clear filters button hover uses `$color-surface` background -- subtle
- Focus states unchanged for accessibility
- Status badges use softer backgrounds at 10% opacity

## SCSS Override Snippet

```scss
// V2: Calm Clinical -- Pharmacy History

$border-calm: #EDF2F7;

.page-title {
  font-weight: v.$font-weight-semibold;
}

.page-subtitle {
  color: v.$color-text-muted;
}

.filter-section {
  border-color: $border-calm;
}

.filter-group {
  .filter-input,
  .filter-select {
    border-color: #D4D9E0;
  }
}

.filter-section {
  margin-bottom: 28px;
}

.history-list-container {
  gap: 28px;
}

.history-group .date-header {
  font-weight: v.$font-weight-medium;
}

.history-item {
  border-color: $border-calm;

  &:hover {
    border-color: $border-calm; // no change
    box-shadow: v.$shadow-sm; // no escalation
    background: #FAFBFC;
  }

  &__icon-wrapper {
    background: #F7FFF7;

    &--pending {
      background: #FFFCF0;
    }

    &--cancelled {
      background: #FFF5F5;
    }
  }

  &__title {
    font-weight: v.$font-weight-medium;
  }

  &__subtitle {
    line-height: 1.6;
  }
}

.hhi-badge {
  &--success {
    background: rgba(v.$color-success, 0.10);
  }

  &--warning {
    background: rgba(v.$color-warning, 0.10);
  }

  &--error {
    background: rgba(v.$color-danger, 0.10);
  }
}
```

## Visual Description

The history page is clean and undemanding. The title is Inter semibold -- present but not loud. Filters have lighter input borders and the section uses soft `#EDF2F7` borders. Date group headers are weight 500 in secondary text color -- functional dividers. History cards have barely-there borders and hover to a `#FAFBFC` background without shadow changes. Status badges use 10% opacity tints for a softer presence. Icon wrappers use very light tinted backgrounds. The entire page reads as a calm log -- easy to scan during a busy pharmacy shift without any element competing for attention.
