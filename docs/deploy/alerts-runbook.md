# Deployment Alerts Runbook

This runbook defines minimum production/staging alerts for deployment/runtime consistency.

## Required alerts

1. `/api/ready` failures
- Signal: HTTP status >= 500 on `GET /api/ready`
- Threshold: 2 consecutive failures within 5 minutes
- Action: treat as critical, start rollback if coincident with recent deploy

2. API 5xx spike
- Signal: structured logs with `alertSignal=api.5xx`
- Threshold: >= 10 responses with status >= 500 in 5 minutes
- Action: page on-call, compare latest deploy timestamp, run deploy smoke

3. Login deny spike (401/403)
- Signal: structured logs with `path=/api/auth/login` and `alertSignal=auth.login.denied`
- Threshold: >= 20 denied logins in 10 minutes or sudden baseline jump
- Action: inspect auth service status, rate limiter behavior, account disablement events

4. DB connection/runtime errors
- Signal patterns:
  - `Database health check failed`
  - `Unexpected PostgreSQL pool error on idle client`
  - `Database schema is incompatible`
- Threshold: any occurrence in production
- Action: immediate incident, verify DB availability and migration state

## Where signals come from

- `/api/ready` endpoint: runtime readiness.
- API request logs (`src/server.ts`) emit `alertSignal` for:
  - `api.ready.failure`
  - `auth.login.denied`
  - `api.5xx`
- DB layer (`src/server/db.ts`) emits connection and schema compatibility errors.

## Rollback policy

- CI deploy guard (`npm run deploy:postcheck`) triggers smoke checks after deploy.
- If smoke fails and prior live deploy ID is known, rollback is triggered via Render API.
- Keep `RENDER_API_KEY` + `RENDER_SERVICE_ID` configured in CI for auto-rollback.
