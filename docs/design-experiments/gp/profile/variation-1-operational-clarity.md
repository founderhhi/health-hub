# GP Profile — V1: Operational Clarity

## Design Direction
Make the profile a quick-reference card with stronger visual hierarchy. Field labels and values should be scannable in seconds. The operational status toggle should be the most prominent interactive element.

## Visual Changes

### Colors
- Page background: stays `#f5f5f5`, unchanged
- `.field-card` border strengthens from `#e0e0e0` to `#D1D5DB`
- `.field-label` color darkens from `#7f8c8d` to `#64748B` for better readability
- `.profile-avatar` background: `#2ECC71` with a subtle `box-shadow: 0 0 0 3px rgba(46,204,113,0.2)` ring

### Typography
- `.field-label` font-size reduces from 14px to 12px, weight increases to 600, and gains `text-transform: uppercase; letter-spacing: 0.04em`
- `.field-value` font-weight increases from 400 to 600
- Profile header `h1` gains `letter-spacing: -0.01em`

### Spacing & Layout
- `.field-card` padding reduces from 16px to 14px for tighter density
- `.field-card` margin-bottom reduces from 12px to 10px
- `.profile-avatar` size reduces from 68px to 56px (less decorative space, more functional)
- `.profile-avatar` margin-bottom reduces from 24px to 16px

### Borders & Shadows
- `.field-card` shadow strengthens from `0 1px 3px rgba(0,0,0,0.08)` to `0 1px 3px rgba(0,0,0,0.12)`
- `.field-card` border-radius stays 8px
- `.sign-out-button` border width reduces from 2px to 1px (less dramatic)

### Surface Treatment
- No changes to overall surface; keep flat white cards on gray background

### Status & State Indicators
- The operational status field-card gets a subtle left border: `border-left: 3px solid #2ECC71` (or `#EF4444` when offline)
- `.settings-icon-button` border strengthens to `1px solid #CBD5E1`

## SCSS Override Snippet
```scss
// V1: Operational Clarity — GP Profile overrides

.provider-profile {
  .field-card {
    padding: 14px;
    margin-bottom: 10px;
    border-color: #D1D5DB;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  }

  .field-label {
    font-size: 12px;
    font-weight: 600;
    color: #64748B;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .field-value {
    font-weight: 600;
  }

  .profile-avatar {
    width: 56px;
    height: 56px;
    margin-bottom: 16px;
    box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.2);
  }

  .sign-out-button {
    border-width: 1px;
  }

  .settings-icon-button {
    border-color: #CBD5E1;
  }

  // Highlight operational status card
  .field-card:has(app-operational-status-toggle) {
    border-left: 3px solid #2ECC71;
  }
}
```

## Visual Description
The profile page is tighter and more functional. The avatar shrinks from 68px to 56px with an emerald ring highlight. Field labels are 12px uppercase with tracking, acting as clear section markers above each value. Values are semibold for instant readability. Cards have slightly stronger borders and shadows for crisper definition. The operational status card stands out with a green left-border accent. The sign-out button is less dramatic with a 1px border. Everything reads like a quick-reference identity card for a busy practitioner.
