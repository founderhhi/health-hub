# Pharmacy History -- V1: Premium Guided

## Design Direction

The history page becomes a **polished record of pharmacy activity** -- a ledger that feels substantial and trustworthy. Date group headers use serif typography, history cards have richer depth, status badges feel more considered, and the filter section is elevated into a premium tool bar. The page communicates that every prescription is carefully tracked and recorded.

## Visual Changes

### Colors
- Page background adds a faint top gradient: `linear-gradient(180deg, #ECFDF3 0%, #F8FAFC 80px)`
- Date group headers use `$color-emerald-dark` (#166534) instead of `$color-text-secondary` -- more distinguished
- Status badge "Completed" uses a richer green: `#DCFCE7` background with `#15803D` text
- Status badge "Pending" uses warmer amber: `#FEF3C7` with `#92400E`
- Filter section background gains a warm tint: `#FAFAF8`
- History item icon wrapper gradient: `linear-gradient(135deg, #F0FDF4, #DCFCE7)` for completed

### Typography
- Page title uses `'Fraunces', serif` at 28px, weight 600
- Date group headers use Fraunces at 14px, weight 500 -- premium date labels
- History item titles use weight 600 (up from semibold -- same value but ensuring consistency)
- History item subtitle line-height relaxes to 1.6
- Filter section labels (if added) would use weight 500
- Results count uses Fraunces at 13px italic

### Spacing
- History container padding increases from `$space-lg` to `$space-xl` on desktop
- History list gap increases from `$space-md` to 20px between cards
- History group gap increases from `$space-xl` to 36px
- Filter section padding increases from `$space-md` to 20px
- Filter grid gap increases from `$space-md` to 20px
- History item padding increases from `$space-md` to 18px

### Borders & Radius
- History cards radius increases from `$radius-md` to `$radius-lg` (12px)
- Filter section radius increases to `$radius-lg`
- Status badges keep pill shape but gain 1px border matching their background tone
- History item icon wrapper radius increases to `$radius-lg`

### Surface & Shadows
- History cards shadow upgrades from `$shadow-sm` to `$shadow-md` in resting state
- Filter section shadow upgrades to `$shadow-md`
- History card hover shadow deepens to `$shadow-lg`
- History card hover adds `transform: translateY(-1px)` micro-lift
- Date group header gains a subtle bottom border: `1px solid #EDF2F7`

### Status & Interactions
- History cards gain a 2px left border in status color on hover (emerald for completed, amber for pending, red for cancelled)
- Clear filters button uses emerald text on hover instead of `$color-text-primary`
- Filter inputs gain emerald focus ring (already present via mixin but ensured)
- Empty state icon wrapper gains a gradient background

## SCSS Override Snippet

```scss
// V1: Premium Guided -- Pharmacy History

.pharmacy-history {
  background: linear-gradient(180deg, #ECFDF3 0%, v.$color-surface 80px);
}

.history-container {
  padding: v.$space-xl;
}

.page-title {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  font-weight: 600;
}

.filter-section {
  background: #FAFAF8;
  border-radius: v.$radius-lg;
  padding: 20px;
  box-shadow: v.$shadow-md;
}

.filter-grid {
  gap: 20px;
}

.results-count {
  font-family: 'Fraunces', serif;
  font-size: 13px;
  font-style: italic;
}

.history-list-container {
  gap: 36px;
}

.history-group .date-header {
  font-family: 'Fraunces', serif;
  font-size: v.$font-size-base;
  font-weight: 500;
  color: v.$color-emerald-dark;
  text-transform: none;
  letter-spacing: normal;
  border-bottom: 1px solid #EDF2F7;
  padding-bottom: v.$space-sm;
}

.history-list {
  gap: 20px;
}

.history-item {
  border-radius: v.$radius-lg;
  box-shadow: v.$shadow-md;
  padding: 18px;
  transition: all v.$transition-fast;

  &:hover {
    transform: translateY(-1px);
    box-shadow: v.$shadow-lg;
  }

  &__icon-wrapper {
    border-radius: v.$radius-lg;
    background: linear-gradient(135deg, #F0FDF4, #DCFCE7);
  }

  &__subtitle {
    line-height: 1.6;
  }
}

.hhi-badge {
  border: 1px solid transparent;

  &--success {
    background: v.$green-100;
    color: v.$green-700;
    border-color: v.$color-success-border;
  }

  &--warning {
    background: v.$color-warning-light;
    color: v.$color-warning-dark;
    border-color: v.$color-warning-border;
  }
}

.clear-filters-btn:hover {
  color: v.$color-emerald-dark;
  border-color: v.$color-emerald;
}

.hhi-empty-state__icon-wrapper {
  background: linear-gradient(135deg, #F0FDF4, #DCFCE7);
}
```

## Visual Description

The history page opens with a faint emerald gradient at the top, anchoring the Fraunces serif "Prescription History" heading. The filter section sits on a warm `#FAFAF8` surface with rounded 12px corners and `shadow-md`. Date group headers are rendered in Fraunces serif in dark emerald -- no longer uppercase but instead title-case with a subtle bottom border. Each history card has 12px radius, `shadow-md`, and lifts 1px on hover with deepened shadow. Status badges have a matching 1px border for definition. The icon wrappers use gradient green backgrounds. The overall feel is a substantial, well-crafted activity ledger that a pharmacist can trust.
