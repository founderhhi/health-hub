# Admin Dashboard - Variation 2: Premium Guided

## Design Direction

This variation treats the admin dashboard as a **polished SaaS product surface** rather than a raw operational tool. Richer shadows, more considered card framing, smoother transitions, and a serif accent on section headings give the admin experience a sense of craft and confidence. The goal is an admin who feels they are using a premium, well-built system -- not a hastily assembled internal tool.

Key philosophy: **Operational confidence through visual refinement and intentional depth.**

## Visual Changes

### Colors
- **Page background**: Warm the surface from `var(--bg-primary)` to a subtle warm neutral undertone -- if using dark mode, keep; if light mode variant exists, shift toward `#FAFAF9` (very slight warm tint)
- **Tab bar active state**: Replace solid emerald fill with a gradient: `linear-gradient(135deg, #2ECC71, #27AE60)` for richer active treatment
- **Health metric cards**: Add a subtle emerald gradient top-border: `border-top: 3px solid` with `linear-gradient(90deg, #2ECC71, #27AE60)`
- **Table header**: Subtle warm tint `#F8FAF9` (barely warm) instead of transparent
- **Notice success**: Add a subtle left-border accent `border-left: 4px solid #2ECC71` in addition to existing treatment
- **Notice error**: Add `border-left: 4px solid #E74C3C`

### Typography
- **Page title "Admin Dashboard"**: Use Fraunces serif at 28px (up from 24px) weight 600 -- this is the premium moment
- **Health card labels** (`h3`): Use Fraunces at 14px weight 500 for a distinguished look on metric labels
- **Role breakdown heading** (`h2`): Fraunces at 20px weight 600
- **Table headers**: Keep Inter, but at 11px with wider letter-spacing `0.08em` -- more refined uppercase treatment
- **Health values**: Keep 32px/700 but add `color: var(--accent-primary)` with a subtle text-shadow: `0 1px 2px rgba(46, 204, 113, 0.15)`

### Spacing
- **Dashboard padding**: Increase from 24px to 32px -- more breathing room around the entire page
- **Health grid gap**: Increase from 16px to 20px
- **Table cell padding**: Increase vertical from 12px to 14px for more generous row height
- **Tab bar**: Increase tab padding from `8px 20px` to `10px 24px` -- more substantial tab targets
- **Section gaps**: Increase margin-bottom on `.admin-header` from 24px to 32px
- **Create user panel padding**: Increase from 14px to 20px

### Borders & Surfaces
- **Health cards**: Increase radius from 12px to 16px, add `box-shadow: 0 4px 6px rgba(15, 23, 42, 0.08)` (shadow-md) -- richer depth
- **Table wrapper**: Add `box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06)`, `border-radius: 12px`, `overflow: hidden`, white background
- **Tab buttons**: Increase radius from 8px to 10px
- **Create user panel**: Radius from 10px to 14px, shadow-md added
- **Pagination buttons**: Radius from 8px to 10px
- **Card hover**: Health cards get `transform: translateY(-1px)` and `box-shadow: 0 6px 12px rgba(15, 23, 42, 0.10)` on hover

### Transitions & Micro-interactions
- **Health card hover**: `transition: all 200ms ease; &:hover { transform: translateY(-1px); box-shadow: $shadow-md; }`
- **Tab transition**: Smooth background-color transition over 200ms
- **Table row hover**: Gentle `background: rgba(46, 204, 113, 0.04)` -- barely-there emerald wash
- **Action buttons**: `transition: all 150ms ease` on hover, subtle scale `transform: scale(1.02)` on primary buttons

### Status Indicators
- **Badge treatment**: Keep 12px pill radius but add `box-shadow: 0 1px 2px rgba(0,0,0,0.06)` for subtle lift
- **Badge font**: Keep 12px/500 -- refined, not heavy

## SCSS Override Snippet

```scss
// ============================================
// V2: Premium Guided - Admin Dashboard
// ============================================

// Premium page spacing
.admin-dashboard {
  padding: 32px;
}

.admin-dashboard .admin-header {
  margin-bottom: 32px;

  h1 {
    font-family: 'Fraunces', serif;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
}

// Richer tab treatment
.admin-dashboard .tab {
  border-radius: 10px;
  padding: 10px 24px;
  transition: all 200ms ease;

  &.active {
    background: linear-gradient(135deg, #2ECC71, #27AE60);
    font-weight: 600;
  }
}

// Premium table framing
.admin-dashboard .user-table-wrap {
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.admin-dashboard .user-table {
  th {
    font-size: 11px;
    letter-spacing: 0.08em;
    background: #F8FAF9;
    padding: 14px 12px;
  }

  td {
    padding: 14px 12px;
  }

  tbody tr {
    transition: background 150ms ease;

    &:hover {
      background: rgba(46, 204, 113, 0.04);
    }
  }
}

// Premium health cards
.admin-dashboard .health-card {
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(15, 23, 42, 0.08);
  border-top: 3px solid #2ECC71;
  transition: all 200ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 12px rgba(15, 23, 42, 0.10);
  }

  h3 {
    font-family: 'Fraunces', serif;
    font-size: 14px;
    font-weight: 500;
  }
}

.admin-dashboard .health-grid {
  gap: 20px;
}

.admin-dashboard .health-value {
  text-shadow: 0 1px 2px rgba(46, 204, 113, 0.15);
}

// Premium role breakdown heading
.admin-dashboard .role-breakdown h2 {
  font-family: 'Fraunces', serif;
  font-size: 20px;
  font-weight: 600;
}

// Refined status badges
.admin-dashboard .status-badge {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

// Premium create user panel
.admin-dashboard .create-user-panel {
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(15, 23, 42, 0.08);
}

// Notice accents
.admin-dashboard .notice {
  &.success {
    border-left: 4px solid #2ECC71;
  }

  &.error {
    border-left: 4px solid #E74C3C;
  }
}

// Refined pagination
.admin-dashboard .page-btn {
  border-radius: 10px;
}

// Primary button micro-interaction
.admin-dashboard .action-btn--primary {
  transition: all 150ms ease;

  &:hover:not(:disabled) {
    transform: scale(1.02);
  }
}
```

## Visual Description

The dashboard opens with a Fraunces serif "Admin Dashboard" heading at 28px -- immediately signaling that this is a considered, premium product surface, not a raw admin tool. The tab bar below uses slightly larger, rounder tabs (10px radius, 24px horizontal padding) with a smooth gradient fill on the active state.

The data table sits inside a softly shadowed container with 12px rounded corners. The header row has a barely-warm `#F8FAF9` tint with refined 11px uppercase labels tracked at 0.08em. Row heights are generous (14px vertical padding) and hover states introduce a whisper of emerald (`rgba(46, 204, 113, 0.04)`).

Health metric cards in the System Health tab are the visual highlight: 16px radius with a 3px emerald top-border and medium shadow depth. On hover they lift 1px with a deeper shadow, creating a subtle interactive feel. Labels use Fraunces serif for distinction; values keep their bold emerald treatment with a faint text-shadow.

The create user panel, when expanded, has generous 20px padding and a medium shadow that gives it presence without dominating. Notice banners carry left-border accents in their semantic colors (green for success, red for error) for quick recognition.

Pagination buttons use rounder 10px corners. Primary action buttons have a micro-scale on hover (1.02x). The overall feel is **polished, confident, and intentional** -- an admin tool that respects the person using it.
