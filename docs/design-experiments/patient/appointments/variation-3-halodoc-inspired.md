# Appointments -- Variation 3: Halodoc-Inspired Consumer Health

## Design Direction
Apply Halodoc's consumer app patterns: flat borderless cards on a gray background, prominent status pills, compact doctor info rows, and clear action hierarchy. Make the appointments list feel like a booking feed in a consumer health super-app.

## Competitor Reference
Halodoc's consultation booking flow features:
- Flat white cards on light gray backgrounds with no borders or shadows.
- Doctor information displayed in a compact horizontal row: avatar, name, specialty, and price.
- Status displayed as colored pills positioned prominently.
- Clear single CTA per card, typically full-width at the card bottom.
- Tabs use an underline-style active indicator rather than a filled pill.

Practo's appointment cards use a similar pattern: left-aligned doctor info, right-aligned status badge, and a detail row beneath with date and mode.

## Visual Changes

### Colors
- Page background: `#F5F7FA`.
- Cards: `#FFFFFF`, no border.
- Tab active indicator: underline style, `border-bottom: 2px solid #2ECC71` instead of filled background.
- Tab inactive: transparent background, gray text.

### Typography
- `.page-title` at 20px semibold Inter (no serif).
- `.doctor-name` at 15px semibold.
- `.doctor-specialty` at 12px, `color: #64748B`.

### Spacing & Layout
- `.appointment-card` padding: 16px, no border.
- `.appointments-list` gap: 10px (tighter feed).
- Doctor avatar reduced from 48px to 40px.

### Borders & Shadows
- All cards: `border: none; box-shadow: none;`.
- Cards: `border-radius: 14px`.
- Tabs: no background fill, underline only.

### Surface Treatment
- Cards hover with `background: #F8FAF9` (barely visible tint).
- No transform on hover.

### Status & State Indicators
- Status pills: solid light backgrounds with colored borders.
- Confirmed: `background: #ECFDF3; color: #166534; border: 1px solid #BBF7D0`.
- Pending: `background: #FEF3C7; color: #92400E; border: 1px solid #FDE68A`.

## SCSS Override Snippet
```scss
// Variation 3: Halodoc-Inspired -- Appointments

.appointments-page {
  background: #F5F7FA;
}

.tabs-container {
  background: transparent;
  border-radius: 0;
  padding: 0;
  gap: 0;
  border-bottom: 1px solid #E2E8F0;
}

.tab-btn {
  border-radius: 0;
  background: transparent;
  border-bottom: 2px solid transparent;
  color: #64748B;

  &.active {
    background: transparent;
    color: #0B0F14;
    border-bottom-color: #2ECC71;
    font-weight: 600;
  }
}

.appointments-list {
  gap: 10px;
}

.appointment-card {
  background: #FFFFFF;
  border: none;
  border-radius: 14px;
  box-shadow: none;
  padding: 16px;

  &:hover {
    background: #F8FAF9;
  }
}

.doctor-avatar {
  width: 40px;
  height: 40px;
  font-size: 13px;
}

.doctor-details .doctor-name {
  font-size: 15px;
}

.doctor-details .doctor-specialty {
  font-size: 12px;
  color: #64748B;
}

.status-badge {
  border-radius: 999px;

  &.status-confirmed {
    background: #ECFDF3;
    color: #166534;
    border: 1px solid #BBF7D0;
  }

  &.status-pending {
    background: #FEF3C7;
    color: #92400E;
    border: 1px solid #FDE68A;
  }

  &.status-completed {
    background: #DBEAFE;
    color: #1E40AF;
    border: 1px solid #93C5FD;
  }

  &.status-cancelled,
  &.status-declined {
    background: #FEF2F2;
    color: #991B1B;
    border: 1px solid #FECACA;
  }
}

.btn-primary {
  width: 100%;
  border-radius: 12px;
  background: #2ECC71;
  font-size: 14px;

  &:hover {
    background: #27AE60;
  }
}

.past-card {
  opacity: 0.65;
}
```

## Visual Description
The appointments page looks like a consumer booking app. Cards are flat white rectangles on a cool gray background, with no borders or shadows. The tab bar uses an underline-style active indicator (a green bottom border) rather than a filled background, giving it a modern app-tab feel.

Doctor avatars are compact (40px), and the information layout is tight but readable. Status pills use the colored-background-with-border pattern, making each state immediately identifiable. CTA buttons are full-width within cards, making them easy to tap on mobile.

The overall density is higher than the other variations, but the flat design and consistent whitespace keep it scannable. It reads as a functional, trustworthy health booking interface.
