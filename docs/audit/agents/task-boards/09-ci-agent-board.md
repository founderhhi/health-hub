# D9-CI CI/CD and Testing Agent Board

## Editable Scope

- `.github/workflows/ci.yml`
- `e2e/**`
- `docs/ci/**`
- `docs/execution/**`

## P1 Review Snapshot

| Item | Status | Notes |
|---|---|---|
| Build evidence for P0 baseline | Done | Build validation exists and is referenced by AIC report |
| E2E runtime readiness | Partial | Requires provisioned DB/runtime path |
| CI workflow expansion for parallel P2 lanes | Missing | No lane-specific CI gating added yet |

## P2 Task Queue

| Task ID | Priority | Status | Notes |
|---|---|---|---|
| P2-CI-01 update CI workflow for P2 lane checks | P2 | Queued | Keep `.github/workflows/ci.yml` aligned to lane ownership |
| P2-CI-02 add/refresh e2e coverage for API/WS/video/payment flows | P2 | Queued | Execute in `e2e/**` |
| P2-CI-03 add smoke tests for all 5 provider account logins | P2 | Complete | Added `e2e/flows/flow7-provider-account-logins-smoke.spec.ts`; reused `loginProvider` + env pattern with admin credentials in `e2e/config/env.ts`; evidence in `docs/execution/ci-p2-login-smoke-and-render-hook.md` |
| P2-CI-04 add safe Render deploy hook trigger in CI | P2 | Complete | Added gated deploy-hook step in `.github/workflows/ci.yml` (`push` on `main` + secret presence guard); documented secret in `docs/ci/env-secrets.md` |
