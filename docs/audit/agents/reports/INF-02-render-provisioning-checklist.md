# INF-02 Render Provisioning Checklist (Manual)

Status: Pending manual execution in Render (requires Render console access).

## Preconditions

- `render.yaml` is present in repo root with:
  - `health-hub` web service
  - `health-hub-db` PostgreSQL service
  - `JWT_SECRET` configured with `generateValue: true`

## Manual Runbook

1. Create services from blueprint:
   - In Render, create Blueprint from repo and apply `render.yaml`.
2. Validate resource wiring:
   - Confirm `health-hub-db` is provisioned.
   - Confirm `health-hub` web service is linked to DB via `DATABASE_URL`.
3. Validate required production env vars on web service:
   - `NODE_ENV=production`
   - `DATABASE_SSL=true`
   - `JWT_SECRET` is generated and is not `demo_secret`
   - `DAILY_API_KEY` is set (or intentionally left empty for fallback behavior)
4. Initialize database schema and seed data:
   - `DATABASE_URL=<render-external-url> DATABASE_SSL=true npm run db:init`
5. Verify seeded records:
   - Execute `SELECT phone, role FROM users;`
   - Confirm expected provider seed rows are present.
6. Verify deployed app health:
   - Call `GET /api/health`
   - Expect `{ "ok": true }`.

## Evidence to Attach

- Screenshot of Render Blueprint resources (`health-hub` + `health-hub-db`).
- Screenshot/output showing web env var values (redact secrets).
- Render shell output for `npm run db:init`.
- SQL query output for seeded users.
- Health endpoint response snapshot.

## Completion Criteria

- All checklist steps complete with attached evidence.
- No production runtime failure from JWT startup guard.
- INF-02 can be moved from `Pending (Manual)` to `Complete` on infra board.
