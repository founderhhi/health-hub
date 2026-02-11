# Wave 4 E2E Baseline Report

Date: 2026-02-11

## Scope

- Playwright smoke test plus six API-first core flow specs:
  - Flow 1: patient signup/login/request GP
  - Flow 2: GP queue accept
  - Flow 3: GP prescription + patient update
  - Flow 4: referral + specialist + lab order
  - Flow 5: diagnostics process to completed
  - Flow 6: pharmacy claim + patient update

## Command

```bash
unset DATABASE_URL DATABASE_SSL JWT_SECRET; node -r dotenv/config scripts/db-init.js && node dist/health-hub/server/server.mjs > e2e-server.log 2>&1 & for i in {1..90}; do curl -fsS "http://127.0.0.1:4000/api/health" > /dev/null && break; sleep 2; done; npm run e2e:ci
```

## Result

- Status: PASS
- Total tests: 7
- Passed: 7
- Failed: 0
- Runtime: 14.9s

## Notes

- Suite is configured with global setup (`/api/health`) and best-effort teardown by run prefix.
- Initial local runs failed when inherited shell env values overrode `.env`; baseline command now clears conflicting DB/auth env values before startup.
- Baseline outputs are available under `playwright-report/` and `test-results/`.
