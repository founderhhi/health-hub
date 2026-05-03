# Medical Records -- Variation 1: Calm Clinical

## Design Direction
Soften the records page with lighter card borders, gentler status badge colors, more generous padding within record cards, and increased spacing between list items. Medical records should feel approachable, not clinical.

## Visual Changes

### Colors
- `.record-icon.rx-icon` background reduced from 10% to 7% opacity.
- `.record-icon.lab-icon` background reduced from 10% to 7%.
- Status badge backgrounds all reduced by ~5% opacity.
- `.lab-status-message` backgrounds reduced from 10% to 7% opacity.
- `.warning-banner` background from 12% to 8%.

### Typography
- `.page-title` weight reduced from 600 to 500.
- `.record-title` line-height increased to 1.4.
- `.med-name` weight from 500 to 400 (regular).
- `.record-date` line-height set to 1.6.
- `.record-doctor` line-height set to 1.6.

### Spacing & Layout
- `.record-card` padding increased from 16px to 20px.
- `.records-list` gap increased from 16px to 20px.
- `.medication-list` and `.test-list` margin-top from 8px to 12px, padding-top from 8px to 12px.
- `.medication-item` padding from 4px 0 to 6px 0.
- `.tabs-container` margin-bottom from 32px to 36px.

### Borders & Shadows
- `.record-card` border color lightened: `color-mix(in srgb, var(--border-color) 70%, transparent)`.
- `.record-card` border-radius increased from 12px to 14px.
- `.record-icon` border-radius from 12px to 14px.
- `.tab-btn` radius from 8px to 10px.
- `.medication-list` and `.test-list` border-top color lightened.

### Surface Treatment
- No hover transforms on record cards (they're not navigation targets in prescriptions tab -- only clickable in the clickable variant).
- `.lab-status-message` border-radius increased from 8px to 10px.

### Status & State Indicators
- All status badges: backgrounds at 15% opacity (from 20%).
- `.lab-status-message` icon size unchanged (18px) but with slightly more gap (10px).
- Empty state icon size increased from 48px to 56px.

## SCSS Override Snippet
```scss
// Variation 1: Calm Clinical -- Medical Records

.page-title {
  font-weight: 500;
}

.tabs-container {
  margin-bottom: 36px;
  border-radius: 14px;
}

.tab-btn {
  border-radius: 10px;

  &.active {
    background: color-mix(in srgb, #2ECC71 85%, white 15%);
  }
}

.records-list {
  gap: 20px;
}

.record-card {
  padding: 20px;
  border-color: color-mix(in srgb, var(--border-color) 70%, transparent);
  border-radius: 14px;
}

.record-icon {
  border-radius: 14px;

  &.rx-icon { background: rgba(46, 204, 113, 0.07); }
  &.lab-icon { background: rgba(59, 130, 246, 0.07); }
}

.record-info {
  .record-title { line-height: 1.4; }
  .record-date { line-height: 1.6; }
  .record-doctor { line-height: 1.6; }
}

.medication-list,
.test-list {
  margin-top: 12px;
  padding-top: 12px;
  border-top-color: color-mix(in srgb, var(--border-color) 70%, transparent);
}

.medication-item {
  padding: 6px 0;
}

.med-details .med-name {
  font-weight: 400;
}

.status-badge {
  &.status-active { background: rgba(46, 204, 113, 0.15); }
  &.status-claimed { background: rgba(245, 158, 11, 0.15); }
  &.status-fulfilled { background: rgba(96, 165, 250, 0.15); }
  &.status-completed { background: rgba(16, 185, 129, 0.15); }
  &.status-ordered { background: rgba(100, 116, 139, 0.15); }
  &.status-in-progress { background: rgba(245, 158, 11, 0.15); }
}

.lab-status-message {
  border-radius: 10px;
  gap: 10px;

  &.lab-completed { background: rgba(16, 185, 129, 0.07); }
  &.lab-in_progress { background: rgba(245, 158, 11, 0.07); }
  &.lab-ordered { background: rgba(100, 116, 139, 0.07); }
}

.warning-banner {
  background: rgba(245, 158, 11, 0.08);
}

.empty-state {
  .empty-icon {
    width: 56px;
    height: 56px;
  }
}
```

## Visual Description
The records page feels like a well-organized medical file viewed in a calm environment. Cards have softer borders with more internal room, making medication lists and lab test details easier to scan without feeling cramped. Record icons have lighter tinted backgrounds that barely whisper their category color. Status badges are gentle tinted pills rather than attention-grabbing labels.

The medication list separator line is lighter, and each medication item has a touch more vertical space. Lab status messages use very subtle background tints that provide context without alarm. The overall impression is of a trustworthy, organized health record that does not overwhelm.
