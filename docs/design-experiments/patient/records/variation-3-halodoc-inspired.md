# Medical Records -- Variation 3: Halodoc-Inspired Consumer Health

## Design Direction
Apply consumer health app patterns: flat white cards on gray background, compact record entries, prominent status pills, and a streamlined QR modal. Records should feel like an organized health feed.

## Competitor Reference
Practo's medical records interface uses:
- Timeline-style layout with date headers grouping records.
- Compact record cards with document type icon, title, date, and status in a single horizontal row.
- Color-coded document types (green for prescriptions, blue for lab results).
- Status pills with solid light backgrounds and colored borders.

Halodoc uses similar flat card patterns with no shadows, relying on background contrast. Zuri Health keeps records minimal with simple list items.

## Visual Changes

### Colors
- Page background: `#F5F7FA`.
- Cards: `#FFFFFF`, no border.
- Record type icons: circular (50% radius) with 10% tinted backgrounds.
- Tab active: underline style (green bottom border).

### Typography
- `.page-title` at 20px semibold Inter.
- `.record-title` at 15px semibold.
- `.record-date` at 12px.
- `.med-name` at 13px medium.

### Spacing & Layout
- `.record-card` padding: 14px (slightly tighter for feed density).
- `.records-list` gap: 10px.
- Record icon size reduced from 48px to 40px.

### Borders & Shadows
- All cards: `border: none; box-shadow: none;`.
- Cards: `border-radius: 14px`.
- Tabs: underline style, no background.

### Surface Treatment
- Cards hover with `background: #F8FAF9`.
- QR modal: simplified, cleaner with less decorative shadow.

### Status & State Indicators
- Status pills with colored borders (same pattern as appointments V3).

## SCSS Override Snippet
```scss
// Variation 3: Halodoc-Inspired -- Medical Records

.records-page {
  background: #F5F7FA;
}

.tabs-container {
  background: transparent;
  border-radius: 0;
  padding: 0;
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

.records-list {
  gap: 10px;
}

.record-card {
  background: #FFFFFF;
  border: none;
  border-radius: 14px;
  box-shadow: none;
  padding: 14px;

  &:hover {
    background: #F8FAF9;
  }
}

.record-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;

  svg {
    width: 20px;
    height: 20px;
  }

  &.rx-icon { background: rgba(46, 204, 113, 0.10); }
  &.lab-icon { background: rgba(59, 130, 246, 0.10); }
}

.record-info .record-title {
  font-size: 15px;
}

.record-info .record-date {
  font-size: 12px;
}

.med-details .med-name {
  font-size: 13px;
}

.status-badge {
  border-radius: 999px;

  &.status-active {
    background: #ECFDF3;
    color: #166534;
    border: 1px solid #BBF7D0;
  }
  &.status-claimed {
    background: #FEF3C7;
    color: #92400E;
    border: 1px solid #FDE68A;
  }
  &.status-fulfilled {
    background: #DBEAFE;
    color: #1E40AF;
    border: 1px solid #93C5FD;
  }
  &.status-completed {
    background: #ECFDF3;
    color: #166534;
    border: 1px solid #BBF7D0;
  }
  &.status-ordered {
    background: #F1F5F9;
    color: #475569;
    border: 1px solid #E2E8F0;
  }
  &.status-in-progress {
    background: #FEF3C7;
    color: #92400E;
    border: 1px solid #FDE68A;
  }
}

.medication-list,
.test-list {
  border-top-color: #F1F5F9;
}

.lab-status-message {
  border-radius: 10px;
  border: none;
}

.qr-modal-content {
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.qr-prescription-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
```

## Visual Description
The records page functions as a clean health document feed. White cards sit flat on a gray background, each containing a circular record-type icon, the record title, date, and a status pill. The list is slightly denser than other variations, with 10px gaps creating a continuous feed feel.

Tabs use the underline-active pattern, keeping the top of the page clean. Status pills follow the consumer app convention of light colored backgrounds with matching borders. The QR modal is simplified with a cleaner shadow treatment, no emerald glow -- just a clean document presentation. Records feel organized and accessible rather than decorative.
