# P0 Agent Run Report

Generated: 2026-02-17T20:06:28.015Z

## Summary

| Metric | Value |
|---|---|
| Phase | P0 |
| Total agents | 7 |
| Passed | 7 |
| Failed | 0 |
| Skipped | 0 |

## Agent Results

### D1-DB - PASS

| Validator | Result | Details |
|---|---|---|
| validate-schema | PASS |   PASS: users.first_name column;   PASS: users.last_name column;   PASS: users.is_operating column;   PASS: consult_requests.removed_at column;   PASS: consult_requests.removed_reason column;   PASS: consult_requests.removed_by column;   PASS: consult_requests removed status in CHECK;   PASS: consultations.completed_at column;   PASS: consultations completed status in CHECK;   PASS: consultations.gp_deleted column;   PASS: consultations.gp_deleted_at column |
| validate-migration | PASS |   PASS: ALTER TABLE for users columns;   PASS: ALTER TABLE for consult_requests columns;   PASS: ALTER TABLE for consultations columns;   PASS: consult_requests constraint recreation;   PASS: consultations constraint recreation |
| validate-pool | PASS |   PASS: Pool max connections set to 25 |

### D2-API - PASS

| Validator | Result | Details |
|---|---|---|
| validate-gp-endpoints | PASS |   PASS: Transaction BEGIN in accept flow;   PASS: Row lock (FOR UPDATE) in accept flow;   PASS: Conflict response (409) for duplicate accept;   PASS: COALESCE in history query;   PASS: started_at usage in history;   PASS: gp_deleted filter in history/delete |
| validate-prescription-scope | PASS |   PASS: Patient role scoping;   PASS: Admin role check;   PASS: Forbidden response for unauthorized access |
| validate-referral-scope | PASS |   PASS: Specialist scoping on referral list;   PASS: Not found for unauthorized referral detail |
| validate-pharmacy-claim | PASS |   PASS: Transaction in claim flow;   PASS: Active status check for claim;   PASS: Conflict response for non-claimable state |

### D8-INFRA - PASS

| Validator | Result | Details |
|---|---|---|
| validate-render-yaml | PASS |   PASS: DATABASE_URL env var configured;   PASS: JWT_SECRET env var configured |
| validate-startup-guard | PASS |   PASS: Production environment check;   PASS: Fatal exit on misconfiguration |

### D4-AUTH - PASS

| Validator | Result | Details |
|---|---|---|
| validate-jwt-guard | PASS |   PASS: JWT_SECRET reference in startup guard;   PASS: demo_secret rejection check;   PASS: Fatal exit on insecure secret |

### D9-CI - PASS

| Validator | Result | Details |
|---|---|---|
| validate-build | PASS | Build succeeded |

### AIC-10 - PASS

| Validator | Result | Details |
|---|---|---|
| validate-boundaries | PASS | Boundary audit report shows PASS |
| validate-integration | PASS | Integration check shows Conditional Pass or better |

### PM-00 - PASS

| Validator | Result | Details |
|---|---|---|
| validate-phase-gate | PASS | PM board exists and is maintained |
