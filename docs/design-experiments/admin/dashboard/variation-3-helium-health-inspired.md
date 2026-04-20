# Admin Dashboard - Variation 3: Helium Health SaaS Admin Inspired

## Design Direction

This variation draws from **Helium Health's HeliumOS** platform design philosophy -- a $30M+ Series B Pan-African hospital management SaaS that serves thousands of healthcare facilities. Helium Health's admin interface prioritizes: clean data tables with clear column hierarchy, efficient bulk actions, real-time metrics cards with minimal decoration, streamlined navigation, and a professional neutral palette that avoids consumer flashiness.

Key philosophy: **Enterprise-grade clarity with SaaS-product polish -- the admin UI should feel like a tool used by hospital operations managers across Africa.**

## Competitor Reference

### Helium Health (HeliumOS)
- **Navigation**: Clean horizontal tab/nav pattern with minimal styling; active state is understated (bottom border or color shift, not filled background)
- **Data tables**: Full-width tables with clear column headers, generous but not wasteful padding, no decorative borders -- just clean horizontal rules
- **Metrics**: Simple stat cards with label-above-number pattern, no gradients or heavy styling
- **Actions**: Inline text-buttons or small contained buttons, not oversized CTAs
- **Color**: Predominantly white/light gray surfaces with a blue primary accent; status uses standard semantic colors
- **HRIS integration**: User management is treated as a core module, not an afterthought -- full table with role, department, status columns
- **Overall feel**: Clinical efficiency meets modern SaaS -- think Stripe Dashboard or Linear for healthcare

### Vezeeta (Partner Portal)
- **Multi-role management**: Clean role selectors, tabular user lists
- **Analytics**: Simple bar charts and count cards, no visual excess

### General Healthcare SaaS Patterns (2025-2026)
- **Sortable columns**: Click-to-sort on table headers with directional indicators
- **Filter bars**: Horizontal filter row with dropdowns and search, clearly separated from data
- **Bulk actions**: Checkbox column + floating action bar pattern
- **Status chips**: Small, flat, colored text with dot indicators rather than full background badges

## Visual Changes

### Colors
- **Tab bar**: Replace filled-background active tab with an **underline-only** active state -- 2px bottom border in `#2ECC71`, transparent background. This is the Helium/modern-SaaS pattern
- **Tab inactive**: Remove border entirely, just text on transparent background
- **Page background**: Clean `#F8FAFC` (the existing surface color) -- no warmth, pure professional neutral
- **Table header**: Very light `#F9FAFB` background (slightly lighter than current surface)
- **Health cards**: White background, 1px border `#E5E7EB` (slightly warmer gray), no colored accents -- let the number speak
- **Status indicators**: Replace background-tint badges with **dot + text** pattern:
  - Active: Green dot `#22C55E` + "Active" text in `#15803D`
  - Disabled: Red dot `#EF4444` + "Disabled" text in `#991B1B`
  - Claimed: Amber dot `#F59E0B` + text in `#92400E`
  - Fulfilled: Blue dot `#3B82F6` + text in `#1E40AF`

### Typography
- **Page title**: Inter 22px, weight 600 -- smaller than current 24px, professional restraint
- **Table headers**: Inter 12px, weight 500, uppercase, letter-spacing `0.06em`, color `#6B7280` (slightly different gray)
- **Table body**: Inter 14px, weight 400 (regular, not 500) -- let the data breathe without heavy weight
- **Name cells**: Inter 14px, weight 500 -- only names get medium weight
- **Health values**: Inter 28px (down from 32px), weight 700, color `#111827` (near-black, not emerald) -- Helium-style: the number is data, not decoration
- **Health card labels**: Inter 13px, weight 400, color `#6B7280`
- **User count**: Inter 13px, weight 400, color `#6B7280` -- understated

### Spacing
- **Dashboard padding**: 24px (keep current) -- Helium-style is efficient, not spacious
- **Table cell padding**: 12px vertical, 16px horizontal -- slightly more horizontal space for readability
- **Health grid gap**: 16px (keep) -- efficient
- **Tab bar**: Gap 0, tabs directly adjacent with only the underline differentiating
- **Filter/controls row**: Add 12px padding-bottom and a bottom border `1px solid #E5E7EB` to visually separate filters from data

### Borders & Surfaces
- **Table**: Remove all outer borders. Use only horizontal rules between rows (`border-bottom: 1px solid #F3F4F6` -- very light)
- **Table header bottom border**: Slightly heavier `1px solid #E5E7EB`
- **Health cards**: 1px border `#E5E7EB`, radius 8px, no shadow -- flat and clean
- **Tab bar bottom**: Full-width bottom border `1px solid #E5E7EB` under the entire tab bar (the active tab's 2px border sits on top of this)
- **Create user panel**: Clean 1px border, 8px radius, no shadow
- **Pagination buttons**: 6px radius (sharper), 1px border

### Status Indicators (Dot Pattern)
- Replace `.status-badge` background-tint pills with inline dot + text:
  - 8px circle (`width: 8px; height: 8px; border-radius: 50%; display: inline-block`) in the semantic color
  - 4px gap
  - Text in a darker shade of the semantic color
  - No background, no padding, no border-radius on the text

## SCSS Override Snippet

```scss
// ============================================
// V3: Helium Health SaaS Admin Inspired
// ============================================

// Professional page title
.admin-dashboard .admin-header h1 {
  font-size: 22px;
  font-weight: 600;
  color: #111827;
}

// Underline-only tab bar (Helium/modern SaaS pattern)
.admin-dashboard .tab-bar {
  gap: 0;
  border-bottom: 1px solid #E5E7EB;
}

.admin-dashboard .tab {
  background: transparent;
  border: none;
  border-radius: 0;
  border-bottom: 2px solid transparent;
  padding: 10px 20px;
  color: #6B7280;
  font-size: 14px;
  font-weight: 500;

  &.active {
    color: #111827;
    border-bottom-color: #2ECC71;
    background: transparent;
    font-weight: 600;
  }

  &:hover:not(.active) {
    color: #374151;
  }
}

// Clean filter bar
.admin-dashboard .controls {
  padding-bottom: 12px;
  border-bottom: 1px solid #F3F4F6;
  margin-bottom: 16px;
}

// Minimal table styling
.admin-dashboard .user-table-wrap {
  border: none;
  border-radius: 0;
}

.admin-dashboard .user-table {
  th {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: #6B7280;
    background: #F9FAFB;
    padding: 12px 16px;
    border-bottom: 1px solid #E5E7EB;
  }

  td {
    font-weight: 400;
    padding: 12px 16px;
    border-bottom: 1px solid #F3F4F6;
  }

  .name-cell {
    font-weight: 500;
    color: #111827;
  }

  tbody tr:hover {
    background: #F9FAFB;
  }
}

// Dot-based status indicators
.admin-dashboard .status-badge {
  background: none;
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

  &.claimed {
    color: #92400E;
    &::before { background: #F59E0B; }
  }

  &.fulfilled {
    color: #1E40AF;
    &::before { background: #3B82F6; }
  }
}

// Flat health cards
.admin-dashboard .health-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  box-shadow: none;

  h3 {
    font-size: 13px;
    font-weight: 400;
    color: #6B7280;
  }
}

.admin-dashboard .health-value {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
}

// Clean create user panel
.admin-dashboard .create-user-panel {
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  box-shadow: none;
}

// Sharper pagination
.admin-dashboard .page-btn {
  border-radius: 6px;
}

// User count understated
.admin-dashboard .user-count {
  color: #6B7280;
  font-weight: 400;
}
```

## Visual Description

The dashboard adopts a **modern SaaS admin aesthetic** inspired by Helium Health's enterprise-grade hospital management platform and similar tools like Stripe Dashboard or Linear.

The most striking change is the tab bar: instead of filled-background tabs, it uses a clean **underline-only** pattern -- a full-width bottom border with a 2px emerald accent under the active tab. Inactive tabs are plain text in `#6B7280` gray. This immediately feels more enterprise and less consumer-app.

The data table is stripped of decorative borders. Only horizontal rules separate rows, using very light `#F3F4F6` lines. The header row gets a barely-there `#F9FAFB` tint and standard 12px uppercase labels. Data cells use regular weight (400) with only name cells in medium (500) -- the Helium pattern of letting data density carry the interface rather than typographic weight.

Status indicators are the most distinctive change: instead of background-tinted pill badges, they use a **dot + text** pattern -- an 8px colored circle followed by text in a darker shade of the same semantic color. This is the pattern used across modern enterprise SaaS tools and reduces visual noise significantly.

Health metric cards are flat and clean: white background, 1px gray border, no shadow, no colored accents. The metric value is shown in near-black `#111827` at 28px rather than emerald -- treating the number as data, not branding. Labels are 13px regular weight in `#6B7280`.

The filter/controls row has a subtle bottom border separating it from the data table below, creating a clear information architecture: navigation (tabs) > filters > data > pagination.

Overall this reads as a **serious enterprise tool** -- the kind of admin interface a hospital operations manager in Lagos or Nairobi would expect from a well-funded health-tech platform.
