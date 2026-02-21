# CI Environment and Secrets

This repository ships with `.github/workflows/ci.yml` for build, unit, and E2E gates.

## Required CI variables

- `DATABASE_URL`: Postgres connection string used by API and `npm run db:init`.
- `DATABASE_SSL`: set to `false` for local/CI service containers.
- `JWT_SECRET`: signing key for auth tokens in API tests.
- `E2E_BASE_URL`: browser base URL (default `http://127.0.0.1:4000`).
- `E2E_API_BASE_URL`: API base URL (default `http://127.0.0.1:4000/api`).
- `E2E_TIMEOUT_MS`: timeout for Playwright tests in milliseconds.

## Optional CI variables

- `E2E_RUN_ID`: override generated test run prefix.
- `E2E_PATIENT_PASSWORD`: generated patient password for E2E.
- `E2E_GP_PHONE`, `E2E_GP_PASSWORD`
- `E2E_SPECIALIST_PHONE`, `E2E_SPECIALIST_PASSWORD`
- `E2E_PHARMACY_PHONE`, `E2E_PHARMACY_PASSWORD`
- `E2E_DIAGNOSTICS_PHONE`, `E2E_DIAGNOSTICS_PASSWORD`
- `E2E_ADMIN_PHONE`, `E2E_ADMIN_PASSWORD`
- `RENDER_DEPLOY_HOOK_URL_STAGING`: Render staging deploy hook URL used on pushes to `health-hub-test`.
- `RENDER_DEPLOY_HOOK_URL_PROD`: Render production deploy hook URL used on pushes to `main`.
- `RENDER_DEPLOY_HOOK_URL`: Legacy fallback deploy hook secret used if stage-specific secrets are not set.

## Notes for hosted CI

- The default workflow uses a Postgres service container and seeds demo provider users through `npm run db:init`.
- If you use external databases, replace the service container and provide `DATABASE_URL` through repository or environment secrets.
- Preserve artifact upload for `test-results/` and `playwright-report/` to debug flaky or failing E2E runs.
