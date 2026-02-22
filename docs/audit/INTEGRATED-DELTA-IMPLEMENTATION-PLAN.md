# HealthHub Integrated Delta Plan (User-Confirmed Decisions + Existing Audit)

### Brief Summary
This is an **append-only delta** to `/Users/anuraaggudimella/Documents/health-hub/docs/audit/AUDIT-AND-IMPLEMENTATION-PLAN.md`, not a rewrite.  
It preserves the original 14-day structure, but adds missing backend correctness work, updates consultation flow to your chosen mode behavior, and locks beta gates.

### Locked Product/Execution Decisions
- Beta type: Controlled internal beta.
- Scope gate: All existing P1 + P2 items must be complete.
- Release gate: CI green + manual checklist green.
- Timeline: 14 days.
- Team model: 2-3 engineers in parallel lanes.
- Consultation modes: Video + Audio + Chat.
- Post-accept flow: In-app consult shell first.
- Chat mode: In-app chat with optional escalation to call.
- Audio mode: Daily call, audio-first behavior.
- Specialist flow: Keep current referral-based flow; new consult shell applies to patient<->GP only.
- Queue removal: `removed` + patient retries.
- Consultation completion: explicit GP end action -> `completed`.
- Referral assignment: optional specialist selection (specialty-based; auto-assign fallback allowed).
- Pharmacy flow: claim -> dispense (two-step).
- Data reset: daily reset script (admin reset is post-beta backlog).
- Execution order: correctness-first is mandatory.

---

## Delta to Add to Existing Audit

### 1. New P0 Correctness Tasks (Add before current Sprint 1C)
- `COR-01` Lock down prescription read access.
  - Update `GET /api/prescriptions` and `GET /api/prescriptions/:id` in `/Users/anuraaggudimella/Documents/health-hub/src/server/api/prescriptions.ts` so patients cannot query other patients’ data.
- `COR-02` Lock down referral read access.
  - Update `GET /api/referrals/specialist` and `GET /api/referrals/:id` in `/Users/anuraaggudimella/Documents/health-hub/src/server/api/referrals.ts` with participant/role scoping.
- `COR-03` Make GP accept atomic.
  - Wrap request accept + consultation create + patient notification in one DB transaction in `/Users/anuraaggudimella/Documents/health-hub/src/server/api/gp.ts`.
- `COR-04` Enforce first-wins GP concurrency.
  - Use row lock/atomic status transition for queue acceptance, return conflict (409) to second GP.
- `COR-05` Make pharmacy claim idempotent and status-safe.
  - In `/Users/anuraaggudimella/Documents/health-hub/src/server/api/pharmacy.ts`, allow claim only from `active`; second claim returns 409; prevent duplicate claim rows.
- `COR-06` Fix GP history query correctness.
  - In `/Users/anuraaggudimella/Documents/health-hub/src/server/api/gp.ts`, replace `c.created_at` usage with `started_at` and use `COALESCE(completed_at, ended_at)`.

### 2. Update Existing Audit Classification
- Reclassify pharmacy history from “empty stub” to “frontend demo/mocked, backend integration missing”.
  - `/Users/anuraaggudimella/Documents/health-hub/src/app/features/pharmacy/pharmacy-history/pharmacy-history.ts`

### 3. Consultation Flow Delta (Replaces embedded-first assumption)
- Replace “embedded video first” requirement with “consult shell first + external call tab”.
- New flow tasks:
  - `FLOW-01` Build GP consult shell UI (mode-aware status, actions, errors, retry UX).
  - `FLOW-02` Build patient consult shell UI with mode-aware entry.
  - `FLOW-03` Chat mode in shell with persistent messages and optional “Start Call”.
  - `FLOW-04` Video/audio start from shell opens Daily in new tab.
  - `FLOW-05` Add explicit GP “End Consultation” action -> `completed` + patient notification.
- Keep specialist consultation flow unchanged for beta (referral-based).

---

## Public API / Interface Changes

### Endpoint Behavior Changes
- `GET /api/prescriptions?patientId=...`
  - Patient role: ignores foreign `patientId`; always self.
  - Provider/admin role: allowed with explicit patientId.
- `GET /api/prescriptions/:id`
  - Allowed only if requester is patient owner, prescribing provider, relevant provider, or admin.
- `GET /api/referrals/specialist`
  - Returns referrals scoped to authenticated specialist unless admin override.
- `GET /api/referrals/:id`
  - Returns only if requester is participant (patient/from/to specialist) or admin.
- `POST /api/pharmacy/prescriptions/:id/claim`
  - `active -> claimed` only; otherwise 409.
- `POST /api/gp/queue/:id/accept`
  - Atomic; second concurrent accept returns 409 conflict.
- `POST /api/gp/consultations/:id/complete`
  - Canonical completion endpoint (`status='completed'`, timestamp, notification).

### Data/Schema Notes
- Keep `completed` as canonical completed state.
- Keep `ended` for legacy compatibility and query fallback.
- Include migrations from original audit plus correctness-related updates in migration ordering.

---

## Implementation Plan (14 Days, Parallel Lanes)

### Days 1-3: Lane A Backend Correctness (Mandatory First)
- Complete all `COR-*` tasks.
- Apply DB mismatch migration + pool tuning from existing audit.
- Validate all GP endpoints and pharmacy claim semantics.
- Add API authorization unit/integration coverage for prescriptions/referrals.

### Days 3-7: Lane B Core P1 Completion
- Notifications mark-read endpoints + UI.
- Pharmacy dispense endpoint + real history integration.
- Payment mock (simple free-beta card).
- HealWell + Practitioner-Connect implementation.
- Keep coming-soon polish consistent.

### Days 5-10: Lane C P2 Consultation Flow
- Build mode-based consult shell (patient + GP).
- Chat persistence + chat API + WS updates.
- Mode behavior:
  - Chat: in-shell.
  - Audio: Daily call launch, audio-first.
  - Video: Daily call launch.
- Explicit completion endpoint wiring and history integration.
- Keep specialist flow unchanged.

### Days 10-14: QA + Stabilization
- CI remains blocking.
- Manual full-flow checklist pass required.
- Daily data reset script operationalized.
- Bugfix buffer for P0/P1 only; P2 non-blockers triaged tightly.

---

## Test Cases and Scenarios

### API/Backend
- Authorization matrix tests for all scoped prescription/referral reads.
- GP queue concurrency test: two accepts, one success + one 409.
- Transaction rollback test: force failure after accept step, verify no partial state.
- Pharmacy claim idempotency/status test (`active` only, duplicate 409).
- Consultation completion test (`completed_at`, notifications, history visibility).

### E2E Functional
- Patient selects each mode (video/audio/chat), GP accepts, correct shell behavior occurs.
- Chat mode: send/receive messages, reload persistence, optional call escalation.
- Audio/video mode: shell -> new tab launch path works.
- Existing Flows 1-6 remain green.
- Notification read/unread actions verified.

### Release Acceptance
- All core flows pass manually.
- No open P0/P1 defects.
- CI pipeline fully green.

---

## Explicit Assumptions and Defaults
- Internal beta only, not public production rollout.
- Existing `render.yaml`/deployment work from audit remains in scope.
- Admin reset UI is deferred post-beta; daily reset script is sufficient for beta.
- No expansion into specialist consult-shell parity during this beta cycle.
- Error UX standard: inline error + toast + retry action across critical screens.
