# Specialist Profile -- V3: Vezeeta-Inspired

## Design Direction
Informed by Vezeeta's doctor profile patterns: practice visibility, multi-clinic management, professional credentials display, and operational status as a first-class business setting. Vezeeta treats the doctor profile as a public-facing asset (patients book through it) and a practice management tool. This variation brings that dual purpose to Health Hub's specialist profile.

## Competitor Reference
**Vezeeta for Doctors:**
- Doctor profile is public-facing: photo, specialization, clinic addresses, booking availability
- Practice growth metrics: "How many patients found you this month"
- Multi-clinic management: list of clinics with individual schedules
- Operational controls: enable/disable booking per clinic
- Confirmation messaging settings: customize patient communication
- Professional credentials: registration number, specialization, experience years prominently displayed

**Key Patterns Adopted:**
1. **Profile header section**: Larger profile area with name, specialization, and registration number grouped as a professional header (not individual cards)
2. **Practice stats row**: A compact stat row showing "patients this month", "referrals accepted", etc. (Vezeeta's practice visibility metrics)
3. **Settings list**: Remaining fields displayed as a settings-list pattern (rows with label-value, no card borders)
4. **Operational toggle prominence**: Operational status at the top of settings, not buried at the bottom
5. **Flat list aesthetic**: No individual card shadows -- clean list rows separated by dividers

## Visual Changes

### Colors
- Page background: `#F8FAFC` (brand surface)
- Profile header: `#FFFFFF` background with `border-bottom: 1px solid #E2E8F0`
- Settings rows: transparent background, `border-bottom: 1px solid #F1F5F9` between rows
- Field labels: `#64748B` (muted)
- Field values: `#0B0F14` (primary)
- Avatar: solid `#2ECC71` background (no gradient, matching Vezeeta's simpler avatar treatment)
- Stats row background: `#F0FDF4` (green-50) for a branded stats section

### Typography
- Profile name (in header): `20px` / `700` -- prominent, functional
- Specialization: `14px` / `500` in `#475569` directly below name
- Registration number: `12px` / `400` in `#64748B` as tertiary info
- Settings labels: `13px` / `400` regular case
- Settings values: `15px` / `500`
- Stats values: `24px` / `700` in `#2ECC71`
- Stats labels: `11px` / `600` uppercase

### Spacing
- Profile header section: `24px` padding, avatar + name + specialization grouped vertically
- Stats row: `16px` padding, horizontal flex with `32px` gap between stats
- Settings rows: `16px` vertical padding per row, no card wrapping
- Avatar size: `64px` (keep current size)
- Gap between header and settings: `0` (connected layout)
- Settings list padding: `0 16px` (container-level padding only)

### Borders & Radius
- Profile header: `0px` radius (full-width, no rounded corners)
- Avatar: circle, `64px`
- No card borders on individual fields -- rows separated by thin `#F1F5F9` dividers
- Stats row: `0px` radius (full-width strip)
- Sign out button: `8px` radius
- Operational toggle: contained in its own settings row, not in a card

### Surface & Shadow
- No shadows anywhere -- fully flat
- Profile header: white background stands out against gray page background
- Stats row: green-50 tinted background for visual distinction
- Settings rows: transparent, divider-separated
- Sign out row: at bottom of settings list, styled as a destructive action row (red text, no card)

### Status
- Operational status: first row in settings list, with prominent toggle and descriptive text "Accepting referrals" / "Not accepting referrals"
- Stats row: show 2-3 practice metrics (referrals this month, consultations completed, patient count)
- Sign out: styled as a settings row with red text, not as a prominent button

## SCSS Override Snippet

```scss
// V3: Vezeeta-Inspired -- Specialist Profile

.provider-profile {
  background: v.$color-surface;
  padding: 0;
}

.profile-container {
  max-width: 100%;
  padding: 0;
}

.profile-header {
  background: v.$color-white;
  padding: v.$space-lg v.$space-md;
  margin-bottom: 0;
  border-bottom: 1px solid v.$color-border;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h1 {
    display: none; // Name moves into the header body
  }
}

.profile-avatar {
  width: 64px;
  height: 64px;
  margin-bottom: v.$space-md;
  background: v.$color-emerald; // Flat, no gradient
  box-shadow: none;
}

// Profile header name & specialization (concept: restructured)
.profile-name-block {
  text-align: center;

  .profile-display-name {
    font-size: v.$font-size-xl;
    font-weight: v.$font-weight-bold;
    color: v.$color-text-primary;
    margin: 0 0 v.$space-xs;
  }

  .profile-specialty {
    font-size: v.$font-size-base;
    color: v.$color-text-secondary;
    font-weight: v.$font-weight-medium;
    margin: 0 0 v.$space-xs;
  }

  .profile-reg-number {
    font-size: v.$font-size-sm;
    color: v.$color-text-muted;
  }
}

// Stats row
.profile-stats-row {
  display: flex;
  justify-content: center;
  gap: v.$space-xl;
  background: v.$green-50;
  padding: v.$space-md;
  border-bottom: 1px solid v.$color-border;

  .stat-item {
    text-align: center;

    .stat-value {
      font-size: v.$font-size-2xl;
      font-weight: v.$font-weight-bold;
      color: v.$color-emerald;
    }

    .stat-label {
      font-size: v.$font-size-xs;
      font-weight: v.$font-weight-semibold;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: v.$color-text-secondary;
    }
  }
}

.field-card {
  background: transparent;
  border: none;
  border-bottom: 1px solid v.$color-border-light;
  border-radius: 0;
  padding: v.$space-md;
  margin-bottom: 0;
  box-shadow: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.field-label {
  font-size: 13px;
  font-weight: v.$font-weight-regular;
  color: v.$color-text-muted;
  text-transform: none;
}

.field-value {
  font-size: 15px;
  font-weight: v.$font-weight-medium;
  color: v.$color-text-primary;
  text-align: right;
}

.sign-out-button {
  width: auto;
  min-height: auto;
  border: none;
  background: transparent;
  color: v.$color-danger;
  font-size: v.$font-size-base;
  font-weight: v.$font-weight-medium;
  padding: v.$space-md;
  margin-top: 0;
  border-radius: 0;
  justify-content: center;
  border-top: 1px solid v.$color-border;

  &:hover {
    background: v.$color-danger-light;
  }
}
```

## Visual Description
The profile page transforms into a Vezeeta-style provider portal profile. At the top, a white header section centers the avatar (flat emerald circle, no gradient), the specialist's name at 20px bold, specialization below, and registration number as tertiary text. Below that, a green-50 tinted stats row shows practice metrics: referrals this month, consultations completed, and patient count -- mimicking Vezeeta's practice visibility metrics. The rest of the page is a clean settings list: each field is a horizontal row with label on the left and value on the right, separated by thin dividers (no card borders, no shadows). The operational status toggle is the first settings row, prominently positioned. Sign-out is a simple text-link row at the bottom with a top border, not a large button. The overall feel is that of a mobile settings screen in a professional app -- familiar, efficient, and portal-native rather than card-decorative.
