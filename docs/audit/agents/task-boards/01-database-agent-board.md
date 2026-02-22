# D1-DB Database and Schema Agent Board

## Editable Scope

- `db/schema.sql`
- `db/migrations/**/*.sql`
- `scripts/db-init.js`
- `src/server/db.ts`

## P1 Review Snapshot

| Item | Status | Notes |
|---|---|---|
| P0 schema mismatch closure | Done | DB-01 to DB-08 verified in schema + migration |
| Migration safety baseline | Done | Constraint and column updates validated |
| Deploy-time schema validation | Partial | Awaiting infra-backed live DB verification |

## P0 Task Queue

| Task ID | Priority | Status | Notes |
|---|---|---|---|
| DB-01 add `users.first_name`, `users.last_name` | P0 | Verified | `db/schema.sql` defines both columns; migration `001-fix-schema-mismatches.sql` adds both with `IF NOT EXISTS`. |
| DB-02 add `users.is_operating` | P0 | Verified | `db/schema.sql` has `is_operating boolean not null default true`; migration adds same column with same default. |
| DB-03 add removal fields to `consult_requests` | P0 | Verified | `db/schema.sql` includes `removed_at`, `removed_reason`, `removed_by`; migration adds all three columns. |
| DB-04 update `consult_requests` status check with `removed` | P0 | Verified | Canonical schema allows `removed`; migration recreates `consult_requests_status_check` including `removed`. |
| DB-05 add `consultations.completed_at` | P0 | Verified | `db/schema.sql` includes `completed_at`; migration adds `completed_at timestamptz`. |
| DB-06 update `consultations` status check with `completed` | P0 | Verified | Canonical schema allows `completed`; migration recreates `consultations_status_check` including `completed`. |
| DB-07 add `gp_deleted` and `gp_deleted_at` | P0 | Verified | `db/schema.sql` includes both fields (`gp_deleted` default false); migration adds both with matching defaults/types. |
| DB-08 tune DB pool to max 25 | P0 | Verified | `src/server/db.ts` sets `Pool` option `max: 25` (plus idle/connection timeout tuning). |

## Handoff

- DB lane completed and handed off to `D2-API`.

## P2 Task Queue

| Task ID | Priority | Status | Notes |
|---|---|---|---|
| DB-11 add `pharmacy_claims.dispensed_at` | P2 | Done | Added to canonical schema in `db/schema.sql`; migration `003-add-chat-messages-and-dispensed-at.sql` applies `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`. |
| DB-12 / CHAT-01 add `chat_messages` table + `(consultation_id, created_at)` index | P2 | Done | Added `chat_messages` in `db/schema.sql` with FKs to `consultations` and `users`; migration `003-add-chat-messages-and-dispensed-at.sql` creates table/index with `IF NOT EXISTS`. |
| P2-DB-01 prepare migration intake template | P2 | Queued | Standardize how API/Auth/WS schema requests enter lane |
| P2-DB-02 reserve migration slots for realtime + video metadata | P2 | Queued | Keep sequence conflict-free across concurrent lanes |
| P2-DB-03 add rollback notes for each new migration | P2 | Queued | Required for CI and integration gating |
| P2-DB-04 re-run db pool/runtime sanity after P2 schema deltas | P2 | Queued | Validate `src/server/db.ts` behavior remains stable |
