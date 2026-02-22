# Post-M2 Defect List

- Date: 2026-02-11
- Scope: Post-Wave 2 route/button contract and unit stabilization

## Defect Tracking

| ID | Summary | Severity | Owner | Status |
|---|---|---|---|---|
| M2-001 | Route contract tests for `/auth/forgot-password` and `/pharmacy/scanner` were missing | High | QA/Coordinator | Closed |
| M2-002 | Practitioner dead-link controls were not contract-tested | Medium | Frontend Lane A | Closed |
| M2-003 | Specialist disabled patient-nav was not contract-tested across screens | Medium | Frontend Lane B | Closed |
| M2-004 | `app.spec.ts` had stale title assertion | Low | Frontend Coordinator | Closed |
| M2-005 | `patient.spec.ts` and `practitioner.spec.ts` had insufficient router/provider setup | Medium | Frontend Coordinator | Closed |

## Hotfix Assignment

- Hotfix owner of record for any M2 regression: **Frontend Coordinator**.
- Backup owner: **QA Coordinator**.

## Current Post-M2 State

- No open M2 blockers remain in unit/build verification scope.
