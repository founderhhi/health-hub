# D4-AUTH Authentication Agent Board

## Editable Scope

- `src/server/api/auth.ts`
- `src/server/middleware/auth.ts`
- `db/seed.sql`
- `docs/audit/agents/task-boards/04-auth-agent-board.md`

## P0 Task Queue

| Task ID | Priority | Status | Notes |
|---|---|---|---|
| AUTH-01 ensure strong `JWT_SECRET` in production | P0 | Pending Runtime Verification | Covered by infra env setup + startup guard; requires manual production runtime validation |

## P1 Review Snapshot

| Item | Status | Notes |
|---|---|---|
| JWT guard implementation | Done | Code-level startup and secret checks are in place |
| Production secret verification | Partial | Blocked on live deploy environment validation |
| Seed auth baseline | Missing | No P1 review evidence for `db/seed.sql` auth data quality |

## Handoff

- `D8-INFRA` provides Render env configuration.
- `AIC-10` confirms no production fallback to `demo_secret`.

## P2 Task Queue

| Task ID | Priority | Status | Notes |
|---|---|---|---|
| P2-AUTH-01 complete production JWT validation runbook execution | P2 | Queued | Depends on `D8-INFRA` deploy window |
| P2-AUTH-02 harden auth middleware edge-case handling | P2 | Done | `requireAuth` now validates bearer format, rejects empty tokens, and blocks refresh-token usage as access auth |
| P2-AUTH-03 review and update auth seed records | P2 | Done | Verified auth seed fixtures and documented that refresh tokens are stateless JWTs (no DB seed rows needed) |
| P2-AUTH-04 publish auth verification checklist for CI/AIC | P2 | Queued | Required before gate close |
| AUTH-04 add explicit `/auth/login` rate limiting (5 req/min/IP) | P2 | Done | Implemented auth-lane limiter in `src/server/middleware/auth.ts` and attached it to `POST /auth/login` in `src/server/api/auth.ts`; infra limiter in `src/server.ts` also still applies as a broader guard |
| AUTH-05 add JWT token refresh mechanism | P2 | Done | Login/signup now return `refreshToken`; added `POST /auth/refresh` to mint new access token from valid refresh token |
| API-12 add POST /auth/forgot-password stub endpoint | P2 | Done | Added generic-success forgot-password response to prevent account enumeration |
