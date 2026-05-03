# GP Profile — V3: Helium Health SaaS-Inspired

## Design Direction
Transform the profile into a structured data view following Helium Health's HeliumOS conventions: grouped fields in a single card with row dividers, uppercase section labels, and compact density. This is a settings/identity panel, not a standalone page.

## Competitor Reference
Helium Health's CARBON design system (as documented in the mokayode.com portfolio) uses:
- **Single-card grouping**: Related fields are grouped in one white card, separated by `1px solid #F1F5F9` horizontal dividers -- not individual cards per field.
- **Uppercase section labels**: `11px, bold, uppercase, letter-spacing 0.08em, color: #64748B` headers above each section.
- **Compact density**: Row height ~48px per field, with label and value on the same horizontal line (label left, value right).
- **Minimal avatars**: Small (40px) circular avatars, positioned inline with the name rather than centered above.
- **Flat surfaces**: No shadows on cards; `border: 1px solid #E2E8F0` only.
- **Action buttons**: Full-width at bottom, solid fill, no outline variants for destructive actions.

Also referenced: Practo's doctor profile screen, which uses inline label-value pairs and credential badges.

## Visual Changes

### Colors
- Page background: `#F1F5F9`
- Single card background: `#FFFFFF`
- Text primary: `#1E293B`
- Label color: `#64748B`
- Divider color: `#F1F5F9`

### Typography
- Section label (new): `font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748B`
- `.field-label` becomes inline (same row as value): `font-size: 13px; font-weight: 500; color: #64748B`
- `.field-value` stays `font-size: 15px; font-weight: 600; color: #1E293B`
- Profile name: `font-size: 18px; font-weight: 700`
- Back button text: `font-size: 13px; font-weight: 600`

### Spacing & Layout
- All field cards merge into a single card with internal dividers
- Each field row: `display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: 1px solid #F1F5F9`
- Avatar moves to inline with name (left-aligned, 40px, next to the name as a header row inside the card)
- `.profile-container` max-width: 560px (unchanged)
- Card padding: 0 (rows handle their own padding)
- Page padding: 24px

### Borders & Shadows
- Single card: `border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden`
- No shadows anywhere
- Sign-out button: `border: none; background: #EF4444; color: #FFFFFF; border-radius: 6px` (solid destructive, no outline)

### Surface Treatment
- Header row inside card (avatar + name): `background: #F8FAFC; padding: 16px; border-bottom: 1px solid #E2E8F0`
- All other rows: white background
- No hover effects on rows

### Status & State Indicators
- Operational status inline with value position: solid pill `background: #2ECC71; color: #FFF; font-size: 11px; padding: 2px 10px; border-radius: 4px` (or red when offline)

## SCSS Override Snippet
```scss
// V3: Helium Health SaaS-Inspired — GP Profile overrides

.provider-profile {
  background: #F1F5F9;
  padding: 24px 16px;
}

.profile-header {
  margin-bottom: 16px;

  h1 {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #64748B;
  }
}

// Hide standalone avatar (moved into card)
.profile-avatar {
  display: none;
}

// Convert field cards to unified card rows
.profile-container {
  // Wrapper for all field-cards (requires a parent wrapper in template,
  // or use adjacent sibling selectors)
  .field-card {
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #F1F5F9;
    box-shadow: none;
    margin-bottom: 0;
    padding: 14px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FFFFFF;

    &:first-of-type {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      border-top: 1px solid #E2E8F0;
    }

    &:last-of-type {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      border-bottom: 1px solid #E2E8F0;
    }

    // Side borders
    border-left: 1px solid #E2E8F0;
    border-right: 1px solid #E2E8F0;
  }

  .field-label {
    font-size: 13px;
    font-weight: 500;
    color: #64748B;
    margin-bottom: 0;
  }

  .field-value {
    font-size: 15px;
    font-weight: 600;
    color: #1E293B;
    text-align: right;
  }
}

// Sign-out as solid destructive button
.sign-out-button {
  background: #EF4444;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 16px;

  &:hover {
    background: #DC2626;
  }

  svg {
    color: #FFFFFF;
  }
}

// Settings button
.settings-icon-button {
  border-color: #E2E8F0;
  background: #FFFFFF;

  &:hover {
    background: #F8FAFC;
  }
}

.settings-notice {
  font-size: 12px;
  color: #64748B;
}
```

## Visual Description
The profile page looks like a settings panel in a hospital management SaaS. The page header shows "PROFILE" in small uppercase letters. Below, all fields are grouped into a single white card with no shadows. Each field is a horizontal row: label on the left in 13px medium gray, value on the right in 15px semibold dark text. Rows are separated by hairline `#F1F5F9` dividers. The card has a unified `#E2E8F0` border with 8px radius. The standalone centered avatar is removed; the practitioner's name appears as the first row. The operational status shows as a small solid green (or red) pill aligned to the right of its row. The sign-out button at the bottom is a solid red button with white text -- no outline, direct and clear. The back button is compact. The overall impression is a data-structured, no-nonsense identity panel that matches the efficiency of the queue dashboard in V3.
