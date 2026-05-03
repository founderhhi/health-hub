# Specialist Dashboard -- V1: Operational Clarity

## Design Direction
Sharper status hierarchy, denser referral cards, bolder count badges, and left-border accent emphasis. The specialist dashboard is an operational inbox -- the specialist needs to scan, triage, and act quickly. This variation tightens information density while making status states unmissable.

## Visual Changes

### Colors
- Stat card values: switch from `#4ADE80` to the brand emerald `#2ECC71` for consistency, with a bolder `700` weight retained
- Tab count badges: increase size from 18px to 20px height, use `#166534` text on `#ECFDF3` background (inverted from current solid green) for better contrast against active/inactive tabs
- Referral card left borders: increase from `4px` to `5px` for stronger visual priority signal
- Alternating referral card backgrounds: odd cards get `#FFFFFF`, even cards get `#FAFBFC` for scannable separation
- Urgent/emergency left-border colors intensified: urgent `#DC2626` (from `#EF4444`), emergency `#991B1B`

### Typography
- Stat card values: keep 32px / 700 weight, add `letter-spacing: -0.02em` for a tighter numeric feel
- Stat labels: bump to `13px` (from 12px) for legibility at density
- Section titles ("Assigned Referrals", "Today's Appointments"): increase to `font-size: 20px` / `font-weight: 700` with `letter-spacing: -0.01em`
- Patient names on referral cards: keep 18px but increase weight to `700` (from 600)
- Badge text: reduce to `10px` (from 11px) with `letter-spacing: 0.06em` for sharper chip feel

### Spacing
- Stat card padding: reduce from `24px` to `16px` on mobile, keep `24px` on desktop -- tighter density
- Referral card padding: reduce from `24px` to `18px` vertically, `20px` horizontally
- Gap between referral cards: reduce from `16px` to `12px` for denser stacking
- Tab filter horizontal padding: reduce from `24px` to `16px` for a tighter pill row
- Stats grid gap: keep `16px` but reduce stat card `min-height` from `120px` to `100px`

### Borders & Radius
- Referral card radius: reduce from `12px` to `8px` for sharper, more operational feel
- Badge/chip radius: reduce from `9999px` (pill) to `4px` for a sharper rectangular chip
- Stat card radius: keep `12px`
- Tab filters: keep pill shape but reduce border width to `1px` with sharper hover transition

### Surface & Shadow
- Referral cards: remove `box-shadow` at rest, add only on hover (`0 2px 8px rgba(0,0,0,0.08)`)
- Stat cards: keep current subtle shadow
- Active tab filter: add `box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.25)` for focus ring

### Status
- Badge `--new`: switch from bio-lime `#AEEA00` to a high-contrast `#DCFCE7` bg with `#166534` text
- Badge `--urgent`: use solid `#FEF3C7` background with `#92400E` text (keep current)
- Badge `--emergency`: use solid `#FEF2F2` background with `#991B1B` text (keep current)
- LIVE badge: add a pulsing green dot (8px) before text, `animation: pulse 2s infinite`
- Appointment status chips: sharpen radius to `4px`, add `1px` border matching background color

## SCSS Override Snippet

```scss
// V1: Operational Clarity -- Specialist Dashboard
// Apply via :host or .specialist-dashboard scope

.stat-card {
  padding: v.$space-md;
  min-height: 100px;

  .stat-value {
    color: v.$color-emerald;
    letter-spacing: -0.02em;
  }

  .stat-label {
    font-size: 13px;
  }
}

.section-title {
  font-size: v.$font-size-xl;
  font-weight: v.$font-weight-bold;
  letter-spacing: -0.01em;
}

.referral-card {
  border-radius: v.$radius-md; // 8px
  padding: 18px 20px;
  margin-bottom: 12px;
  box-shadow: none;
  border-left-width: 5px;

  &:nth-child(even) {
    background: #FAFBFC;
  }

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  &--urgent {
    border-left-color: #DC2626;
  }

  &--emergency {
    border-left-color: #991B1B;
  }
}

.referral-card__info .patient-name {
  font-weight: v.$font-weight-bold;
}

.badge {
  border-radius: v.$radius-sm; // 4px
  font-size: 10px;
  letter-spacing: 0.06em;

  &--new {
    background: v.$color-emerald-light;
    color: v.$color-emerald-dark;
  }
}

.tab-filter {
  padding: v.$space-sm v.$space-md;

  .tab-count-badge {
    min-width: 20px;
    height: 20px;
    background: v.$color-emerald-light;
    color: v.$color-emerald-dark;
  }
}

.appointment-status {
  border-radius: v.$radius-sm;
  border: 1px solid currentColor;
}
```

## Visual Description
The dashboard feels like a well-organized triage inbox. Referral cards stack tightly with alternating subtle tint, each anchored by a bold 5px left-border that immediately communicates urgency (blue for routine, red for urgent, dark red for emergency). Status badges are sharp rectangular chips rather than soft pills, giving them a clinical precision. The stat cards at the top are compact but punchy -- large emerald numbers with tight letter-spacing command immediate attention. Tab filters sit in a tight horizontal row with inverted-color count badges (green-on-cream rather than white-on-green) that read clearly at small sizes. The overall impression is efficient, scannable, and decisive -- a specialist can glance at the page and know exactly what needs attention.
