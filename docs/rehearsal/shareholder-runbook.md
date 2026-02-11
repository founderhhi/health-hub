# Shareholder Rehearsal Runbook

Use this checklist for the live rehearsal of the six core product flows.

## Preconditions

- Deployment is healthy (`/api/health`).
- Database seeded (`npm run db:init` completed for environment).
- Demo hash frozen and recorded.

## Role credentials

- GP: `+17000000001 / demo1234`
- Specialist: `+17000000002 / demo1234`
- Pharmacy: `+17000000003 / demo1234`
- Diagnostics: `+17000000004 / demo1234`

## Live flow script

1. Patient signup/login, then submit GP request.
2. GP opens queue and accepts request.
3. GP creates prescription, patient sees update.
4. GP creates referral, specialist accepts and creates lab order.
5. Diagnostics processes order to completed.
6. Pharmacy claims prescription; patient sees final update.

## Recovery/fallback actions

- If websocket update does not show in UI, refresh target page and validate via API endpoint.
- If role route access is denied, re-login and verify local session role.
- If flow fails, capture timestamp, user role, API payload, and screenshot before retry.

## Final freeze checks

- All six flows executed at least once without manual DB edits.
- No enabled dead-link actions on critical pages.
- Execution details entered in `docs/rehearsal/rehearsal-log-template.md`.
