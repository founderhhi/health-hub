# Diagnostics Profile -- Variation 3: Tenadoc-Inspired

## Design Direction
Competitor-inspired profile drawing from Tenadoc's doctor profile cards, Practo's credential display patterns, and modern health-tech provider profile layouts. The profile becomes a facility identity card with structured credential display, operational status as a prominent banner, and a professional presentation suited to the Ethiopian diagnostics market.

## Competitor Reference

### Tenadoc (Ethiopia)
- Doctor profiles show specialty, calendar availability, and fee information in card format
- Clean, mobile-first profile layout optimized for Ethiopian mobile users
- Prominent action buttons (book appointment) at profile level
- Key pattern applied: **structured credential card with prominent status and action areas**

### Practo (India)
- Professional provider profiles with verification badges
- Credential display: registration number, address, specialties listed as tags
- Profile photo with verified indicator
- Key pattern applied: **credential tags and verification indicators on profile fields**

### Modern Health-Tech Provider Profiles
- Facility profiles with operating hours, location, and service catalogue
- Operational status as a banner (Open/Closed) with real-time indicator
- QR code for facility identification
- Key pattern applied: **operational status as a top-level banner with live dot indicator**

## Visual Changes

### Colors
- **Page background:** `#F1F5F9`
- **Profile card:** white with emerald top border (3px)
- **Avatar:** emerald bg with white border ring (3px)
- **Field sections:** grouped into a single white card rather than individual cards
- **Operational status banner:** full-width banner above fields -- emerald bg with white text when operating, red bg with white text when not
- **Field label:** `$color-text-muted`
- **Field value:** `$color-text-primary`
- **Credential tag style:** for registration number -- `$color-emerald-light` bg, emerald text, pill shape

### Typography
- **Facility name (new emphasis):** 20px, 700 weight, displayed below avatar
- **Profile header h1:** 24px, 700 weight
- **Field labels:** 11px, 700 weight, uppercase, `letter-spacing: 0.05em`
- **Field values:** 16px, 500 weight
- **Operational status banner text:** 14px, 700 weight, uppercase
- **Registration number:** monospace, 14px, 600 weight (credential style)
- **Sign out:** 14px, 600 weight

### Spacing
- **Profile card padding:** 24px
- **Field items within card:** 16px gap (dividers between)
- **Avatar to name gap:** 12px
- **Status banner padding:** 12px 16px
- **Sign out area:** 24px top margin, separated by divider line

### Borders
- **Profile card:** `$radius-lg` (12px), 3px top emerald border
- **Avatar ring:** 3px white border
- **Field dividers:** 1px `#EDF2F7` between fields (not separate cards)
- **Registration number:** pill-shaped badge with `$radius-full`
- **Operational status banner:** `$radius-md` (8px)
- **Sign out button:** `$radius-md`, 1px border

### Surface
- **Page bg:** `#F1F5F9`
- **Single profile card:** white, `0 2px 8px rgba(15, 23, 42, 0.06)` shadow
- **Status banner:** solid emerald (operating) or solid red (not operating) -- elevated look
- **Avatar:** sits centered at top of the profile card, overlapping the top border area
- **Sign out button:** ghost treatment inside the card, not standalone

### Status
- **Operational status as banner:** full-width colored banner at top of the field list
  - Operating: emerald bg, white text, green dot pulsing animation
  - Not operating: red bg, white text, static red dot
- **Live dot indicator:** 8px circle with pulse animation next to "Operating" text
- **Registration number as credential badge:** pill-shaped, emerald-light bg
- **All fields in single card with dividers:** instead of individual field cards

## SCSS Override Snippet

```scss
// V3: Tenadoc-Inspired -- Diagnostics Profile
// Facility identity card, status banner, credential presentation

.provider-profile--v3 {
  background: #F1F5F9;
  padding: v.$space-lg;

  .profile-container {
    max-width: 560px;
  }

  // Single profile card
  .profile-card {
    background: v.$color-white;
    border-radius: v.$radius-lg;
    border-top: 3px solid v.$color-emerald;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
    padding: v.$space-lg;
    overflow: hidden;
  }

  // Avatar with white ring
  .profile-avatar {
    border: 3px solid v.$color-white;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.12);
    margin-bottom: v.$space-md;
  }

  // Field label (LIS style)
  .field-label {
    font-size: v.$font-size-xs;
    font-weight: v.$font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: v.$color-text-muted;
  }

  // Fields as divider-separated rows (not individual cards)
  .field-card {
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: v.$space-md 0;
    margin-bottom: 0;
    border-bottom: 1px solid #EDF2F7;

    &:last-of-type {
      border-bottom: none;
    }
  }

  // Registration number as credential badge
  .field-value--credential {
    display: inline-block;
    background: v.$color-emerald-light;
    color: v.$color-emerald-dark;
    padding: 2px v.$space-sm;
    border-radius: v.$radius-full;
    font-family: v.$font-family-mono;
    font-weight: v.$font-weight-semibold;
    font-size: v.$font-size-base;
  }

  // Operational status banner
  .operational-banner {
    padding: 12px v.$space-md;
    border-radius: v.$radius-md;
    font-weight: v.$font-weight-bold;
    text-transform: uppercase;
    font-size: v.$font-size-base;
    display: flex;
    align-items: center;
    gap: v.$space-sm;
    margin-bottom: v.$space-md;

    &--active {
      background: v.$color-emerald;
      color: v.$color-white;
    }

    &--inactive {
      background: v.$color-danger;
      color: v.$color-white;
    }
  }

  // Pulsing live dot
  .live-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: v.$color-white;
    animation: pulse-dot 2s ease-in-out infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  // Sign out inside card
  .sign-out-button {
    width: 100%;
    margin-top: v.$space-lg;
    border-width: 1px;
    border-color: v.$color-border;
    color: v.$color-text-muted;
    background: transparent;

    &:hover {
      border-color: v.$color-danger;
      color: v.$color-danger;
      background: v.$color-danger-light;
    }
  }
}
```

## Visual Description
The diagnostics profile page is redesigned as a facility identity card. On a `#F1F5F9` background, a single white card with a 3px emerald top-border and 12px radius contains all profile information. The avatar sits at the top center with a white border ring and shadow. Below it, an operational status banner stretches full-width within the card -- solid emerald with white text and a pulsing white dot when operating, or solid red when not. This banner pattern, inspired by Tenadoc's prominent status displays and modern health-tech facility profiles, makes operational state the most visible element on the page. Field information is presented as divider-separated rows within the single card (not individual cards), giving a cleaner grouped presentation. The registration number renders as a monospace credential badge with an emerald-light pill background, borrowing from Practo's verification patterns. Field labels are small, uppercase, and bold -- a structured LIS form aesthetic. The sign-out button sits at the bottom of the card as a ghost button that only shows danger colors on hover. The overall feel is a professional facility identity card suited to the Ethiopian diagnostics market.
