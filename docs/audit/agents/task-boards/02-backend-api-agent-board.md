# D2-API Backend API Agent Board

## Editable Scope

- `src/server/api/index.ts`
- `src/server/api/gp.ts`
- `src/server/api/pharmacy.ts`
- `src/server/api/prescriptions.ts`
- `src/server/api/referrals.ts`
- `src/server/api/notifications.ts`
- `src/server/api/patient.ts`

## P1 Review Snapshot

| Item | Status | Notes |
|---|---|---|
| P0 GP lane verification | Done | API-01 to API-05 validated against schema fixes |
| Correctness hardening set | Done | COR-01 to COR-06 implemented and reviewed |
| Endpoint contract freeze for FE/WS | Partial | Needs explicit P2 contract changelog per release batch |

## P0 Task Queue

| Task ID | Priority | Status | Notes |
|---|---|---|---|
| API-01 verify GP queue query after schema fix | P0 | Verified (Build Pass) | Schema columns confirmed in schema.sql + migration; build succeeds; code references valid columns |
| API-02 verify GP queue delete endpoint after schema fix | P0 | Verified (Build Pass) | Schema columns `removed_*` confirmed; `removed` in CHECK constraint; build succeeds |
| API-03 verify GP status endpoint after schema fix | P0 | Verified (Build Pass) | `users.is_operating` confirmed in schema + migration; build succeeds |
| API-04 fix GP history query with `COALESCE(completed_at, ended_at)` | P0 | Completed | History query uses `COALESCE(completed_at, ended_at)`, `started_at`, statuses `completed/ended`, and `gp_deleted=false` |
| API-05 verify GP consultation delete after schema fix | P0 | Verified (Build Pass) | `gp_deleted` + `gp_deleted_at` confirmed in schema + migration; build succeeds |
| COR-01 lock prescription read scope | P0 | Completed | List/detail now restricted to admin or participants (patient, authoring provider, claiming pharmacy) |
| COR-02 lock referral read scope | P0 | Completed | Referral detail remains participant/admin scoped; specialist list scoped to self or admin-specified `specialistId` |
| COR-03 make GP accept flow transactional | P0 | Completed | Accept update + consultation insert + notification insert execute in one DB transaction |
| COR-04 enforce first-wins GP concurrency | P0 | Completed | `FOR UPDATE` lock and non-`waiting` requests return 409 conflict |
| COR-05 enforce idempotent status-safe pharmacy claim | P0 | Completed | Atomic `active -> claimed` transition only; non-claimable states return 409 |
| COR-06 GP history correctness (`started_at`, fallback end timestamp) | P0 | Completed | Duration derived from `COALESCE(completed_at, ended_at) - started_at` with ended/completed filtering |

## Handoff

- Provide endpoint-level behavior notes for `AIC-10` verification.

## P2 Task Queue

| Task ID | Priority | Status | Notes |
|---|---|---|---|
| P2-API-01 stabilize route registration in `index.ts` | P2 | Completed | Replaced dynamic `require('./chat')` fallback with static `chatRouter` import + unconditional `/api/chat` registration; health compatibility routes retained |
| P2-API-02 add patient dashboard API deltas | P2 | Completed (Follow-up) | DB-11 alignment fixed: dispense flow now stamps `pharmacy_claims.dispensed_at` transactionally for the active pharmacy claim; history reads `pc.dispensed_at` |
| P2-API-03 add notifications API updates for realtime lane | P2 | Completed (Follow-up) | GP Daily integrations now use shared helpers (`createMeetingToken`, `deleteRoom`) while preserving existing response shape for accept endpoint |
| P2-API-04 run API contract review packet per merged change set | P2 | In Progress | Added endpoint behavior deltas below as release evidence for FE/WS/AIC verification |

## P2 Evidence Notes (D2)

- `VID-02` (`POST /api/gp/queue/:id/accept`): response now includes `meetingToken` payload (`token`, `expiresAt`, `roomName`) while preserving `consultation` and `roomUrl`.
- `VID-03` (`POST /api/gp/consultations/:id/complete`): best-effort Daily room cleanup now routes through shared `deleteRoom` helper for consistent integration behavior.
- `VID-02` follow-up: meeting token generation now routes through shared `createMeetingToken` helper; output shape remains `meetingToken: { token, expiresAt, roomName }`.
- `API-10` + `DB-11` (`POST /api/pharmacy/prescriptions/:id/dispense`): fixed schema alignment so dispense transition updates prescription status and stamps `pharmacy_claims.dispensed_at` (not `prescriptions`).
- Pharmacy history (`GET /api/pharmacy/history`): payload now returns `pc.dispensed_at` for claim/dispense timeline rendering.
- Infrastructure compatibility (`GET /api/health`): endpoint behavior preserved and aliased with `GET /api/healthz` to reduce cross-lane breakage.
- Cross-lane dependency: `src/server/api/index.ts` now statically imports/registers `chatRouter` from `src/server/api/chat.ts`.
