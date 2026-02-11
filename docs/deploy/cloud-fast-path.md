# Cloud Fast Path Deployment

This runbook documents the quickest path to deploy the app for shareholder flow validation.

## Target baseline

- Runtime: Node 20+
- Process command: `npm run serve:ssr:health-hub`
- Health check: `GET /api/health`
- Required services: PostgreSQL

## Deploy steps

1. Install dependencies and build:

```bash
npm ci
npm run build
```

2. Set environment variables in the host:

```bash
DATABASE_URL=<postgres-connection-string>
DATABASE_SSL=false
JWT_SECRET=<strong-secret>
PORT=4000
```

3. Initialize database once per environment:

```bash
npm run db:init
```

4. Start app:

```bash
npm run serve:ssr:health-hub
```

5. Verify health:

```bash
curl -fsS http://127.0.0.1:4000/api/health
```

## Smoke checks after deploy

- `GET /api/health` returns `{ "ok": true }`.
- Login succeeds for seeded accounts:
  - GP: `+17000000001`
  - Specialist: `+17000000002`
  - Pharmacy: `+17000000003`
  - Diagnostics: `+17000000004`
- Route checks:
  - `/auth/forgot-password`
  - `/pharmacy/scanner`

## Release hash freeze procedure

1. Capture exact revision:

```bash
git rev-parse HEAD
```

2. Store hash in release notes and rehearsal log.
3. Do not re-build from a different commit once rehearsal starts.
