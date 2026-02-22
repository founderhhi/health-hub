# D8-INFRA Infrastructure and Deployment Agent Board

## Editable Scope

- `render.yaml`
- `src/server.ts`
- `docs/deploy/**`

## P0 Task Queue

| Task ID | Priority | Status | Notes |
|---|---|---|---|
| INF-01 create `render.yaml` for Render deployment | P0 | Complete | `render.yaml` present with web + Postgres blueprint, `DATABASE_URL` mapping, and generated `JWT_SECRET` |
| INF-02 provision Render Postgres and wire `DATABASE_URL` | P0 | Pending (Manual) | Manual runbook documented in `docs/audit/agents/reports/INF-02-render-provisioning-checklist.md`; requires Render console/API access |

## P1 Review Snapshot

| Item | Status | Notes |
|---|---|---|
| Render blueprint and startup guard | Done | Config and production secret guard are implemented |
| Postgres provisioning completion | Partial | Manual INF-02 remains open |
| Deploy docs coverage | Partial | Existing runbook present; P2 needs broader execution notes |

## Auth Dependency

- Supports AUTH-01 by ensuring generated production `JWT_SECRET` and guardrails.
- `src/server.ts` includes production startup guard that exits when `JWT_SECRET` is missing or `demo_secret`.
- AUTH-04 infra policy now enforced at route level for `/api/auth/login` with 5 requests/minute/IP.

## P2 Task Queue

| Task ID | Priority | Status | Notes |
|---|---|---|---|
| P2-INF-01 close INF-02 manual provisioning | P2 | Queued | Complete Render Postgres + `DATABASE_URL` wiring |
| P2-INF-02 validate production secret posture with AUTH lane | P2 | Queued | Pair-run with `D4-AUTH` for runtime proof |
| P2-INF-03 update deploy docs for P2 rollout path | P2 | Queued | Keep `docs/deploy/**` synchronized with real steps |
| P2-INF-04 publish infra readiness signal for CI/e2e | P2 | Queued | Unblock database-backed automation where possible |

## P2 Execution Log (INF)

| Task ID | Priority | Status | Notes |
|---|---|---|---|
| INF-06 deep `/api/health` response in `src/server.ts` | P2 | Complete | Added deep JSON health payload with top-level `ok`, DB connectivity check via `healthCheck()`, and WS status/metrics field that consumes exported WS helper when available |
| INF-07 manual uptime setup checklist under `docs/deploy/**` | P2 | Complete | Added `docs/deploy/uptimerobot-checklist.md` for UptimeRobot 5-minute ping monitor configuration and validation steps |
| INF-08 WS deep-health helper discovery + AUTH-04 login throttle | P2 | Complete | Updated WS helper discovery to prefer `getWsHealthStatus` then `getWsHealthMetrics`, ensuring `/api/health` surfaces WS helper data instead of defaulting to unavailable; tightened `/api/auth/login` rate limit to 5 req/min/IP |
