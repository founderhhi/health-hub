# D7-PAY Payment UI Agent Board

## Editable Scope

- `src/app/shared/components/payment-mock/**`
- `src/app/features/patient/dashboard/**`

## P1 Review Snapshot

| Item | Status | Notes |
|---|---|---|
| Payment mock baseline | Missing | No P1 payment-lane review artifacts published |
| Dashboard payment UX readiness | Missing | No P1 queue execution in this lane |
| API dependency check | Partial | Requires contract sync once `D2-API` P2 queue starts |

## P2 Task Queue

| Task ID | Priority | Status | Notes |
|---|---|---|---|
| P2-PAY-01 build payment mock interaction flow | P2 | Queued | Execute in `src/app/shared/components/payment-mock/**` |
| P2-PAY-02 wire patient dashboard payment states | P2 | Queued | Execute in `src/app/features/patient/dashboard/**` |
| P2-PAY-03 align mock statuses with API payload contract | P2 | Queued | Coordinate with `D2-API` and `D3-FE` |
| P2-PAY-04 publish UI acceptance checklist for AIC review | P2 | Queued | Needed before phase gate |
