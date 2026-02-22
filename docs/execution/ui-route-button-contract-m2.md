# UI Route and Button Contract (Frozen at M2)

- Date: 2026-02-11
- Purpose: Stable contract for Playwright authoring (`T211`)

## Route Contract

- Enabled route: `/auth/forgot-password`
- Enabled route alias: `/pharmacy/scanner`
- Existing scanner root remains enabled: `/pharmacy`

## Critical No-Dead-Link Rules

- No enabled controls may target non-existent practitioner routes:
  - `/dashboard/practitioner/patients`
  - `/dashboard/practitioner/schedule`
  - `/dashboard/practitioner/profile`
- No enabled controls may target non-existent specialist route:
  - `/specialist/patients`

## Disabled-Action Contract (Must Stay Disabled + Labeled)

- Practitioner:
  - Bottom nav items: Patients, Schedule, Profile (`Coming soon`)
  - Quick actions: My Schedule, My Patients, Settings (`Coming soon`)
  - History button in empty state (`Coming soon`)
- Specialist:
  - Bottom nav Patients action in dashboard, referral details, and profile (`Coming soon`)
  - Consultation TODO actions: Refer, Share Screen, Mute, Video, End Call (`Coming soon`)
- Pharmacy:
  - Mark All as Dispensed (`Coming soon` reason text shown)
  - Item-level dispense checkboxes are read-only/disabled
- Diagnostics:
  - Orders filter controls are disabled with helper text
  - Order Details reject action disabled (`Coming soon`)

## UX Policy for Unavailable Actions

- Unavailable action response must be inline status/notice.
- Blocking browser `alert()` is not allowed for critical-path actions.
- Disabled controls must include visible helper label (`Coming soon`).
