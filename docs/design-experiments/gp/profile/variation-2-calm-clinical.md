# GP Profile — V2: Calm Clinical

## Design Direction
Give the profile page breathing room and a softer, more personal feel. Reduce visual density, lighten borders, and let the content breathe. This is a moment where the practitioner is not under queue pressure, so the page can be unhurried.

## Visual Changes

### Colors
- Page background: `#FAFBFD` (softer than current `#f5f5f5`)
- `.field-card` border lightens from `#e0e0e0` to `#EDF2F7`
- `.field-label` color: `#94A3B8` (lighter, more muted)
- `.profile-avatar` background: `#2ECC71` (unchanged), but no ring shadow

### Typography
- `.field-label` font-size: stays 14px, weight reduces to 400
- `.field-value` line-height increases to 1.6
- Profile header `h1` font-size increases from 20px to 22px, weight stays 600
- `.field-value` font-size increases from 16px to 17px

### Spacing & Layout
- `.field-card` padding increases from 16px to 20px
- `.field-card` margin-bottom increases from 12px to 16px
- `.profile-avatar` size increases from 68px to 80px
- `.profile-avatar` margin-bottom increases from 24px to 32px
- `.profile-container` max-width increases from 560px to 480px (narrower, more focused reading column)
- `.provider-profile` padding increases from `24px 16px` to `32px 16px`

### Borders & Shadows
- `.field-card` shadow softens from `0 1px 3px rgba(0,0,0,0.08)` to `0 1px 2px rgba(0,0,0,0.04)`
- `.field-card` border-radius increases from 8px to 10px
- `.sign-out-button` border-radius increases from 8px to 10px

### Surface Treatment
- `.profile-avatar` gets a subtle `background: linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)` for a richer feel
- `.field-card` on hover: `border-color: #D1D5DB` (subtle acknowledgment, no shadow change)

### Status & State Indicators
- Operational status toggle area gets extra vertical padding: `padding: 24px 20px`
- No additional accent borders; keep it clean

## SCSS Override Snippet
```scss
// V2: Calm Clinical — GP Profile overrides

.provider-profile {
  background: #FAFBFD;
  padding: 32px 16px;

  .profile-container {
    max-width: 480px;
  }

  .profile-header h1 {
    font-size: 22px;
  }

  .profile-avatar {
    width: 80px;
    height: 80px;
    margin-bottom: 32px;
    background: linear-gradient(135deg, #2ECC71 0%, #27AE60 100%);
    font-size: 24px;
  }

  .field-card {
    padding: 20px;
    margin-bottom: 16px;
    border-color: #EDF2F7;
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

    &:hover {
      border-color: #D1D5DB;
    }
  }

  .field-label {
    color: #94A3B8;
    font-weight: 400;
  }

  .field-value {
    font-size: 17px;
    line-height: 1.6;
  }

  // Extra space for status toggle
  .field-card:has(app-operational-status-toggle) {
    padding: 24px 20px;
  }

  .sign-out-button {
    border-radius: 10px;
  }
}
```

## Visual Description
The profile page feels like a personal settings screen rather than an administrative form. The avatar is larger (80px) with a subtle emerald gradient. The reading column narrows to 480px for comfortable scanning. Field cards have generous 20px padding and whisper-light borders (`#EDF2F7`) with barely-there shadows. Labels are lighter (`#94A3B8`), acting as gentle guides rather than bold markers. Values are slightly larger (17px) with relaxed line-height. The page background is a warm off-white. Everything signals: "You are not in a rush here." The operational status card gets extra vertical breathing room. The sign-out button has softer rounded corners. The overall feel is a quiet, personal moment in an otherwise busy workflow.
