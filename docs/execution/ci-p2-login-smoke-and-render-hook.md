# CI P2 Login Smoke and Render Hook Notes

Date: 2026-02-18

## CI-03 provider login smoke coverage

- Added `e2e/flows/flow7-provider-account-logins-smoke.spec.ts`.
- Spec reuses `getE2EEnvironment()` + `loginProvider()` and validates five seeded provider/admin accounts:
  - GP (`gp`)
  - Specialist (`specialist`)
  - Pharmacy (`pharmacist`)
  - Diagnostics (`lab_tech`)
  - Admin (`admin`)
- Extended `e2e/config/env.ts` role map with `admin` credentials (`E2E_ADMIN_PHONE`, `E2E_ADMIN_PASSWORD`).

## CI-04 Render deploy hook trigger

- Added two workflow steps in `.github/workflows/ci.yml` after E2E pass.
- Staging gate:
  - triggers on `push` to `health-hub-test`
  - uses `RENDER_DEPLOY_HOOK_URL_STAGING` (falls back to `RENDER_DEPLOY_HOOK_URL`)
- Production gate:
  - triggers on `push` to `main`
  - uses `RENDER_DEPLOY_HOOK_URL_PROD` (falls back to `RENDER_DEPLOY_HOOK_URL`)
- Trigger command uses `curl --fail --show-error --silent -X POST "$HOOK_URL"`.
