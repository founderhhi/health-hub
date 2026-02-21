# HealthHub Comprehensive Audit & Implementation Plan

**Date:** 2026-02-17
**Target:** Beta launch for 200-300 users within 14 days
**Stack:** Angular 21 SSR + Express 5 + PostgreSQL 16 + WebSocket (ws) + Daily.co
**Deployment:** Render (web service + managed PostgreSQL)
**Development mode:** AI-assisted (Claude Code) -- estimated 3-5x faster for boilerplate

---

## Table of Contents

1. [Current State Summary](#section-1-current-state-summary)
2. [Critical Blockers](#section-2-critical-blockers)
3. [Prioritized TODO List](#section-3-prioritized-todo-list)
4. [Implementation Plan](#section-4-implementation-plan)
5. [Risk Register](#section-5-risk-register)
6. [Environment and Deployment Checklist](#section-6-environment-and-deployment-checklist)

---

## SECTION 1: CURRENT STATE SUMMARY

### Overview

HealthHub is approximately 70% complete overall. The patient-facing portal and
authentication system are largely functional end-to-end. The GP practitioner
portal has a complete frontend UI but five of its six backend API endpoints will
crash on any real database because they reference columns that do not exist in
the schema -- this is the single largest blocker. Specialist, Diagnostics, and
Pharmacy core flows work for their primary operations. Video consultations
function via Daily.co but open in a new browser tab rather than an embedded
component. In-app chat does not exist. Payment UI does not exist. The HealWell
and Practitioner-Connect features are empty scaffold stubs with no
implementation.

### Status Matrix by Feature Area

```
+----------------------------+----------+----------+----------+----------+---------+
| Feature Area               | Frontend | Backend  | Database | Realtime | Overall |
+----------------------------+----------+----------+----------+----------+---------+
| Auth (login/signup)        | DONE     | DONE     | DONE     | N/A      | DONE    |
| Auth (forgot password)     | STUB     | MISSING  | N/A      | N/A      | 20%     |
| Patient Portal             | DONE     | DONE     | DONE     | DONE     | 95%     |
| GP Queue Management        | DONE     | BROKEN   | BROKEN   | DONE     | 40%     |
| GP Prescriptions           | DONE     | DONE     | DONE     | DONE     | 95%     |
| GP Referrals               | DONE     | DONE     | DONE     | DONE     | 95%     |
| GP Status / History        | DONE     | BROKEN   | BROKEN   | DONE     | 30%     |
| Specialist Portal          | DONE     | DONE     | DONE     | DONE     | 90%     |
| Diagnostics Portal         | DONE     | DONE     | DONE     | DONE     | 90%     |
| Pharmacy Portal            | DONE     | PARTIAL  | DONE     | DONE     | 80%     |
| Pharmacy History           | STUB     | MISSING  | DONE     | N/A      | 10%     |
| Video Consultation         | PARTIAL  | DONE     | DONE     | N/A      | 70%     |
| Chat                       | MISSING  | MISSING  | MISSING  | MISSING  | 0%      |
| Payment UI                 | MISSING  | N/A      | N/A      | N/A      | 0%      |
| HealWell                   | STUB     | N/A      | N/A      | N/A      | 0%      |
| Practitioner-Connect       | STUB     | N/A      | N/A      | N/A      | 0%      |
| Notifications              | DONE     | PARTIAL  | DONE     | PARTIAL  | 70%     |
| WebSocket Infrastructure   | PARTIAL  | PARTIAL  | N/A      | PARTIAL  | 50%     |
| Deployment / CI            | PARTIAL  | N/A      | N/A      | N/A      | 60%     |
+----------------------------+----------+----------+----------+----------+---------+
```

### What Works Today (End-to-End)

- Patient signs up with phone + password, receives JWT, lands on dashboard.
- Patient requests a GP consultation; request is saved and broadcast to GPs via
  WebSocket.
- GP accepts a consult request; a Daily.co room is created and the patient is
  notified in real time.
- GP writes a prescription with items; patient receives notification with the
  prescription code.
- GP creates a specialist referral with date, time, and specialty; specialist
  sees it in their referral list.
- Specialist accepts or declines a referral; patient is notified.
- Specialist orders lab tests; diagnostics staff sees the orders and can update
  status.
- Pharmacy scans a prescription code (camera or manual entry), claims the
  prescription, and patient is notified.
- Patient can view appointments, prescriptions, referrals, lab orders, and
  notifications from their dashboard.
- Landing page renders correctly with SSR. All route guards enforce auth and
  role checks.
- CI pipeline runs build, unit tests, and six Playwright e2e flows against a
  PostgreSQL service container.

### What Is Broken Right Now

- Five of six GP API endpoints crash with "column does not exist" due to schema
  mismatches (details in Section 2).
- The consult_requests CHECK constraint rejects the 'removed' status that the GP
  delete endpoint tries to set.
- The consultations CHECK constraint does not include 'completed', so the GP
  history query returns nothing.
- WebSocket client has no reconnection logic -- any network interruption
  permanently kills real-time updates for that session.
- Notifications cannot be marked as read (no endpoint exists).
- Pharmacy history page is an empty component with a TODO comment.

### What Is Missing Entirely

- In-app chat UI and message persistence.
- Payment or billing mock UI of any kind.
- HealWell video content page (component is `<p>video-search works!</p>`).
- Practitioner-Connect directory page (component is `<p>preview works!</p>`).
- Password reset backend endpoint.
- Database performance indexes beyond primary keys.
- Render deployment configuration file (render.yaml).
- Rate limiting, structured logging, graceful shutdown, health monitoring.

---

## SECTION 2: CRITICAL BLOCKERS

These issues will crash the application or make entire portals unusable.
They must be resolved before any testing begins.

### BLOCKER 1: GP API Endpoints Reference Non-Existent Database Columns

**Impact:** The entire GP workflow is non-functional. The GP dashboard loads its
Angular component, but every API call returns a 500 error because PostgreSQL
throws "column X does not exist."

**Root cause:** The file `src/server/api/gp.ts` was written assuming columns
that were never added to `db/schema.sql`.

Specific mismatches (verified by reading both files):

```
+-------------------------------+-----------------------------+-----------------------+---------+
| Endpoint                      | Column Referenced           | Table                 | Exists? |
+-------------------------------+-----------------------------+-----------------------+---------+
| GET  /gp/queue        (ln 12) | users.first_name            | users                 | NO      |
| GET  /gp/queue        (ln 12) | users.last_name             | users                 | NO      |
| POST /gp/queue/:id/delete(94) | consult_requests.removed_at | consult_requests      | NO      |
| POST /gp/queue/:id/delete(94) | consult_requests.removed_reason | consult_requests  | NO      |
| POST /gp/queue/:id/delete(94) | consult_requests.removed_by | consult_requests      | NO      |
| POST /gp/queue/:id/delete(96) | status = 'removed'          | CHECK constraint      | NO      |
| POST /gp/status       (ln143) | users.is_operating          | users                 | NO      |
| GET  /gp/consultations/history| consultations.completed_at  | consultations         | NO      |
| GET  /gp/consultations/history| users.first_name            | users                 | NO      |
| GET  /gp/consultations/history| users.last_name             | users                 | NO      |
| GET  /gp/consultations/history| status = 'completed'        | consultations CHECK   | NO      |
| DEL  /gp/consultations/:id   | consultations.gp_deleted    | consultations         | NO      |
| DEL  /gp/consultations/:id   | consultations.gp_deleted_at | consultations         | NO      |
+-------------------------------+-----------------------------+-----------------------+---------+
```

**Fix:** Add all missing columns via ALTER TABLE in a migration script, and
update both CHECK constraints. Details in Section 4, Sprint 1A.

### BLOCKER 2: consult_requests CHECK Constraint Too Restrictive

**Impact:** The GP "delete from queue" endpoint sets
`status = 'removed'`, but the CHECK constraint only allows
`('waiting','accepted','cancelled','completed')`. PostgreSQL will throw a
constraint violation error even after the missing columns are added.

**Root cause:** `db/schema.sql` line 29 defines the CHECK without 'removed'.

**Fix:** ALTER the CHECK constraint to include 'removed'.

### BLOCKER 3: consultations CHECK Constraint Missing 'completed'

**Impact:** The GP consultation history query filters by
`c.status = 'completed'`, but the CHECK constraint only allows
`('active','ended')`. No rows will ever match this filter.

**Root cause:** `db/schema.sql` line 43 defines the CHECK without 'completed'.

**Fix:** ALTER the CHECK constraint to include 'completed'.

### BLOCKER 4: Database Connection Pool Will Exhaust Under Load

**Impact:** With the default pool size of 10 connections and 200-300 concurrent
users, the pool will exhaust. Requests will queue indefinitely and eventually
timeout.

**Root cause:** `src/server/db.ts` creates a `new Pool({...})` with no explicit
`max` setting (pg defaults to 10).

**Fix:** Set `max: 25` in the Pool constructor options.

---

## SECTION 3: PRIORITIZED TODO LIST

### Priority Definitions

- **P0:** Blocks all testing. Must fix Day 1-2.
- **P1:** Required for internal team demo. Must fix Day 3-7 (Week 1).
- **P2:** Required for external beta launch. Must fix Day 8-12 (Week 2).
- **P3:** Nice to have. Post-beta backlog.

---

### DOMAIN 1: Database and Schema

| ID    | Pri | Task                                                              |
|-------|-----|-------------------------------------------------------------------|
| DB-01 | P0  | Add first_name, last_name columns to users table                  |
| DB-02 | P0  | Add is_operating boolean column to users table (default true)     |
| DB-03 | P0  | Add removed_at, removed_reason, removed_by to consult_requests    |
| DB-04 | P0  | Update consult_requests status CHECK to include 'removed'         |
| DB-05 | P0  | Add completed_at column to consultations table                    |
| DB-06 | P0  | Update consultations status CHECK to include 'completed'          |
| DB-07 | P0  | Add gp_deleted, gp_deleted_at columns to consultations table      |
| DB-08 | P0  | Increase connection pool max to 25 in src/server/db.ts            |
| DB-09 | P1  | Add 10 critical performance indexes                               |
| DB-10 | P1  | Create a numbered migration system (db/migrations/ directory)     |
| DB-11 | P2  | Add dispensed_at column to pharmacy_claims for history tracking   |
| DB-12 | P2  | Add chat_messages table for in-app chat                           |

### DOMAIN 2: Backend API

| ID     | Pri | Task                                                             |
|--------|-----|------------------------------------------------------------------|
| API-01 | P0  | Verify GP queue query works after schema fix (no code change)    |
| API-02 | P0  | Verify GP delete endpoint works after schema fix                 |
| API-03 | P0  | Verify GP status endpoint works after schema fix                 |
| API-04 | P0  | Fix GP history query to COALESCE completed_at with ended_at      |
| API-05 | P0  | Verify GP consultation delete works after schema fix             |
| API-06 | P1  | Add PATCH /notifications/:id/read endpoint                       |
| API-07 | P1  | Add POST /notifications/read-all endpoint                        |
| API-08 | P1  | Add PUT /patient/me endpoint for profile update                  |
| API-09 | P1  | Add POST /gp/consultations/:id/complete endpoint                 |
| API-10 | P1  | Add POST /pharmacy/prescriptions/:id/dispense endpoint           |
| API-11 | P1  | Add GET /pharmacy/history endpoint                               |
| API-12 | P2  | Add POST /auth/forgot-password stub endpoint                     |
| API-13 | P2  | Add chat endpoints (POST + GET /chat/:consultationId)            |
| API-14 | P3  | Add admin user management endpoints                              |

### DOMAIN 3: Frontend Components

| ID    | Pri | Task                                                              |
|-------|-----|-------------------------------------------------------------------|
| FE-01 | P1  | Build HealWell video page with YouTube links and tag filtering    |
| FE-02 | P1  | Build Practitioner-Connect provider directory page                |
| FE-03 | P1  | Implement pharmacy history page with claim/dispense records       |
| FE-04 | P1  | Build mock payment UI component (Stripe/UPI style, "Free Beta")  |
| FE-05 | P1  | Add notification mark-as-read UI to patient notifications page   |
| FE-06 | P2  | Build embedded Daily.co video component (iframe-based)            |
| FE-07 | P2  | Build basic in-app chat panel component                           |
| FE-08 | P2  | Wire forgot-password form to backend endpoint                     |
| FE-09 | P2  | Polish all "Coming Soon" items with consistent badge styling      |
| FE-10 | P3  | Build admin dashboard UI                                          |

### DOMAIN 4: Authentication

| ID      | Pri | Task                                                            |
|---------|-----|-----------------------------------------------------------------|
| AUTH-01 | P0  | Set strong JWT_SECRET in Render production env vars             |
| AUTH-02 | P1  | Replace plaintext seed passwords with bcrypt hashes             |
| AUTH-03 | P1  | Add provider_profiles entries for each seeded provider account  |
| AUTH-04 | P2  | Add rate limiting on /auth/login (5 requests/min/IP)            |
| AUTH-05 | P2  | Add JWT token refresh mechanism                                 |
| AUTH-06 | P3  | Add backend password length validation                          |

### DOMAIN 5: Real-time and WebSocket

| ID    | Pri | Task                                                              |
|-------|-----|-------------------------------------------------------------------|
| WS-01 | P1  | Add exponential-backoff reconnection logic to WsService client    |
| WS-02 | P1  | Add onerror and onclose handlers to WsService client              |
| WS-03 | P1  | Add heartbeat ping-pong to WebSocket server                       |
| WS-04 | P1  | Add singleton guard to prevent duplicate connect() calls          |
| WS-05 | P2  | Add JWT authentication to WebSocket connections                   |
| WS-06 | P2  | Add notification polling fallback when WebSocket disconnects      |
| WS-07 | P3  | Add Redis adapter for multi-instance WebSocket scaling            |

### DOMAIN 6: Video and Chat

| ID      | Pri | Task                                                           |
|---------|-----|----------------------------------------------------------------|
| VID-01  | P2  | Create embedded Daily.co iframe video component                |
| VID-02  | P2  | Generate Daily.co meeting tokens for secure room access        |
| VID-03  | P2  | Add room cleanup on consultation end                           |
| CHAT-01 | P2  | Create chat_messages database table                            |
| CHAT-02 | P2  | Create chat API endpoints (send message, list by consultation) |
| CHAT-03 | P2  | Create chat UI panel component with WebSocket real-time        |

### DOMAIN 7: Payment UI

| ID    | Pri | Task                                                              |
|-------|-----|-------------------------------------------------------------------|
| PAY-01| P1  | Create mock payment component (Stripe/UPI card style)             |
| PAY-02| P1  | Display "Free Beta - No payment required" badge prominently       |
| PAY-03| P1  | Add payment mock card to patient dashboard                        |

### DOMAIN 8: Infrastructure and Deployment

| ID    | Pri | Task                                                              |
|-------|-----|-------------------------------------------------------------------|
| INF-01| P0  | Create render.yaml for Render deployment configuration            |
| INF-02| P0  | Provision Render PostgreSQL and set DATABASE_URL                   |
| INF-03| P1  | Add express-rate-limit middleware globally and on auth routes      |
| INF-04| P1  | Add structured JSON request logging middleware                    |
| INF-05| P1  | Add graceful shutdown handler (SIGTERM/SIGINT)                    |
| INF-06| P2  | Enhance /api/health with deep check (DB connectivity + WS status) |
| INF-07| P2  | Set up UptimeRobot to ping /api/health every 5 minutes            |
| INF-08| P3  | Create Dockerfile for containerized deployment                    |

### DOMAIN 9: CI/CD and Testing

| ID    | Pri | Task                                                              |
|-------|-----|-------------------------------------------------------------------|
| CI-01 | P1  | Update db-init.js to run migration files from db/migrations/      |
| CI-02 | P1  | Verify GP queue e2e test passes after schema fix                  |
| CI-03 | P2  | Add smoke tests for all 5 provider account logins                 |
| CI-04 | P2  | Add Render deploy hook trigger to CI pipeline                     |
| CI-05 | P3  | Add load testing with k6 or artillery (50 concurrent users)       |

---

## SECTION 4: IMPLEMENTATION PLAN

### Day 1-2: Critical Blockers (P0)

---

#### Sprint 1A: Database Schema Migration (3 hours)

**Tasks:** DB-01, DB-02, DB-03, DB-04, DB-05, DB-06, DB-07

**Step 1 -- Create migration directory and first migration file.**

Create directory: `db/migrations/`
Create file: `db/migrations/001-fix-schema-mismatches.sql`

Contents of `db/migrations/001-fix-schema-mismatches.sql`:

```sql
-- Migration 001: Add columns referenced by GP API endpoints
-- Date: 2026-02-17
-- Fixes: DB-01 through DB-07

-- DB-01: Add first_name, last_name to users (GP queue + history queries)
ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name text;

-- DB-02: Add is_operating to users (GP operational status toggle)
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_operating boolean NOT NULL DEFAULT true;

-- DB-03: Add soft-delete fields to consult_requests (GP delete-from-queue)
ALTER TABLE consult_requests ADD COLUMN IF NOT EXISTS removed_at timestamptz;
ALTER TABLE consult_requests ADD COLUMN IF NOT EXISTS removed_reason text;
ALTER TABLE consult_requests ADD COLUMN IF NOT EXISTS removed_by uuid;

-- DB-04: Update consult_requests CHECK to include 'removed'
ALTER TABLE consult_requests DROP CONSTRAINT IF EXISTS consult_requests_status_check;
ALTER TABLE consult_requests ADD CONSTRAINT consult_requests_status_check
  CHECK (status IN ('waiting', 'accepted', 'cancelled', 'completed', 'removed'));

-- DB-05: Add completed_at to consultations
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS completed_at timestamptz;

-- DB-06: Update consultations CHECK to include 'completed'
ALTER TABLE consultations DROP CONSTRAINT IF EXISTS consultations_status_check;
ALTER TABLE consultations ADD CONSTRAINT consultations_status_check
  CHECK (status IN ('active', 'ended', 'completed'));

-- DB-07: Add GP soft-delete fields to consultations
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS gp_deleted boolean NOT NULL DEFAULT false;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS gp_deleted_at timestamptz;
```

**Step 2 -- Update the canonical schema file so fresh deployments are correct.**

File to modify: `db/schema.sql`

In the `users` CREATE TABLE, add after `display_name text,`:
```sql
  first_name text,
  last_name text,
  is_operating boolean not null default true,
```

In the `consult_requests` CREATE TABLE, change the CHECK to:
```sql
  check (status in ('waiting','accepted','cancelled','completed','removed'))
```

Add after `accepted_at timestamptz`:
```sql
  removed_at timestamptz,
  removed_reason text,
  removed_by uuid
```

In the `consultations` CREATE TABLE, change the CHECK to:
```sql
  check (status in ('active','ended','completed'))
```

Add after `ended_at timestamptz`:
```sql
  completed_at timestamptz,
  gp_deleted boolean not null default false,
  gp_deleted_at timestamptz
```

**Step 3 -- Update db-init.js to run migrations.**

File to modify: `scripts/db-init.js`

After the existing seed application (around line 29), add logic to read and
execute all `.sql` files in `db/migrations/` in sorted order. This ensures
both fresh installs and existing databases converge to the same state.

Add before `await pool.end()`:
```javascript
const migrationsDir = path.join(__dirname, '..', 'db', 'migrations');
if (fs.existsSync(migrationsDir)) {
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();
  for (const file of files) {
    console.log(`Applying migration: ${file}`);
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    await pool.query(sql);
  }
  console.log(`Applied ${files.length} migration(s).`);
}
```

**Dependencies:** None. This is the very first task.
**Effort:** 2.5 hours (write migration + update schema + update init script + test locally)
**Cross-references:** Enables API-01 through API-05. Enables all GP dashboard functionality.

---

#### Sprint 1B: Database Pool Size Fix (0.5 hours)

**Task:** DB-08

File to modify: `src/server/db.ts`

Change the Pool constructor (currently line 16-18) from:
```typescript
export const db = new Pool({
  connectionString,
  ssl: sslEnabled ? { rejectUnauthorized: false } : undefined
});
```

To:
```typescript
export const db = new Pool({
  connectionString,
  ssl: sslEnabled ? { rejectUnauthorized: false } : undefined,
  max: 25,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});
```

The `idleTimeoutMillis` reclaims idle connections after 30 seconds. The
`connectionTimeoutMillis` fails fast (10s) rather than hanging indefinitely if
the pool is exhausted.

**Dependencies:** None.
**Effort:** 0.5 hours
**Cross-references:** Required for all endpoints under load (200-300 users).

---

#### Sprint 1C: Verify and Fix GP API Endpoints (2 hours)

**Tasks:** API-01, API-02, API-03, API-04, API-05

After the schema migration is applied, most GP endpoints will work without code
changes. The one exception is the consultation history query.

**API-01 (GET /gp/queue):** No code change needed. The query on line 12 of
`src/server/api/gp.ts` selects `u.first_name, u.last_name, u.display_name` --
these columns now exist after DB-01. The frontend component at
`src/app/features/dashboard/components/practitioner/practitioner.ts` (line
308-312) already handles fallback from first_name/last_name to display_name via
its `formatPatientName()` method.

**API-02 (POST /gp/queue/:id/delete):** No code change needed. The query on
lines 94-98 of `src/server/api/gp.ts` sets `removed_at`, `removed_reason`,
`removed_by`, and `status = 'removed'` -- all now valid after DB-03 and DB-04.

**API-03 (POST /gp/status):** No code change needed. The query on line 143 of
`src/server/api/gp.ts` updates `is_operating` -- now valid after DB-02.

**API-04 (GET /gp/consultations/history):** Code change required.

File to modify: `src/server/api/gp.ts`

The query starting at line 171 references `c.completed_at` for ordering and
duration calculation. After DB-05 adds this column, existing rows will have
`completed_at = NULL`. The query should use COALESCE to fall back to `ended_at`.

Change the query (lines 171-183) from:
```sql
select c.*,
  u.display_name as patient_name,
  u.first_name as patient_first_name,
  u.last_name as patient_last_name,
  c.notes as diagnosis,
  c.completed_at,
  extract(epoch from (c.completed_at - c.created_at))/60 as duration_minutes
from consultations c
join users u on u.id = c.patient_id
where c.gp_id = $1 and c.status = 'completed'
order by c.completed_at desc
limit 50
```

To:
```sql
select c.*,
  u.display_name as patient_name,
  u.first_name as patient_first_name,
  u.last_name as patient_last_name,
  c.notes as diagnosis,
  COALESCE(c.completed_at, c.ended_at) as completed_at,
  extract(epoch from (COALESCE(c.completed_at, c.ended_at) - c.started_at))/60 as duration_minutes
from consultations c
join users u on u.id = c.patient_id
where c.gp_id = $1 and c.status in ('completed', 'ended')
  and c.gp_deleted = false
order by COALESCE(c.completed_at, c.ended_at) desc nulls last
limit 50
```

Key changes:
- COALESCE handles rows that were ended before the completed_at column existed.
- Uses `c.started_at` instead of `c.created_at` for accurate duration.
- Includes both 'completed' and 'ended' statuses to capture old records.
- Filters out gp_deleted records.
- NULLS LAST prevents NULL dates from appearing at the top.

**API-05 (DELETE /gp/consultations/:id):** No code change needed. The query on
lines 208-211 sets `gp_deleted = true, gp_deleted_at = now()` -- now valid
after DB-07.

**Dependencies:** Sprint 1A (schema migration) must be completed first.
**Effort:** 1 hour (code change) + 1 hour (manual testing of all 6 GP endpoints)
**Cross-references:** Unblocks the entire GP dashboard. The frontend component
at `src/app/features/dashboard/components/practitioner/practitioner.ts` will
function fully once these APIs return 200.

---

#### Sprint 1D: Render Deployment Configuration (2 hours)

**Tasks:** INF-01, INF-02, AUTH-01

**INF-01: Create render.yaml**

Create new file: `render.yaml` (project root)

```yaml
services:
  - type: web
    name: health-hub
    runtime: node
    plan: starter
    buildCommand: npm ci && npm run build
    startCommand: node --dns-result-order=ipv4first dist/health-hub/server/server.mjs
    healthCheckPath: /api/health
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: health-hub-db
          property: connectionString
      - key: DATABASE_SSL
        value: "true"
      - key: JWT_SECRET
        generateValue: true
      - key: DAILY_API_KEY
        sync: false
      - key: DAILY_FALLBACK_ROOM
        value: https://healthhub.daily.co/demo

databases:
  - name: health-hub-db
    plan: starter
    databaseName: healthhub
    postgresMajorVersion: "16"
```

**INF-02: Provision and initialize the database**

After deploying with render.yaml:
1. Confirm the PostgreSQL database is created on the Render dashboard.
2. Use the Render shell or connect locally with the external URL.
3. Run: `DATABASE_URL=<render-external-url> DATABASE_SSL=true npm run db:init`
4. Verify seed data: query `SELECT phone, role FROM users;` to confirm 5 rows.

**AUTH-01: Verify JWT_SECRET is not demo_secret**

The render.yaml uses `generateValue: true` which auto-generates a random secret.
Add a startup guard to `src/server.ts` (before the listen call, around line 74):

```typescript
if (process.env['NODE_ENV'] === 'production' &&
    (!process.env['JWT_SECRET'] || process.env['JWT_SECRET'] === 'demo_secret')) {
  console.error('FATAL: JWT_SECRET must be set to a secure value in production.');
  process.exit(1);
}
```

**Dependencies:** None. Can run in parallel with Sprint 1A.
**Effort:** 1 hour (render.yaml + startup guard) + 1 hour (first deploy + verify)
**Cross-references:** Required for all production testing from Day 3 onward.

---

#### Day 1-2 Summary

```
+---------------------------------------+-------+--------------------+
| Task                                  | Hours | Focus Area         |
+---------------------------------------+-------+--------------------+
| Sprint 1A: Schema migration           | 2.5   | Database / Backend |
| Sprint 1B: Pool size fix              | 0.5   | Backend            |
| Sprint 1C: GP API verify/fix          | 2.0   | Backend            |
| Sprint 1D: Render deployment config   | 2.0   | Infrastructure     |
| Smoke test: all provider logins       | 0.5   | QA                 |
+---------------------------------------+-------+--------------------+
| TOTAL                                 | 7.5   |                    |
+---------------------------------------+-------+--------------------+
```

---

### Day 3-4: Core Flow Completion (P1, Part 1)

---

#### Sprint 2A: Notification Endpoints and Frontend (2.5 hours)

**Tasks:** API-06, API-07, FE-05

**API-06 and API-07: Mark-as-read endpoints**

File to modify: `src/server/api/notifications.ts`

Add two new routes after the existing GET / route (after line 19):

```typescript
// Mark single notification as read
notificationsRouter.patch('/:id/read', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;
    const result = await db.query(
      `UPDATE notifications SET read = true
       WHERE id = $1 AND user_id = $2 RETURNING *`,
      [id, user.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    return res.json({ notification: result.rows[0] });
  } catch (error) {
    console.error('Mark notification read error', error);
    return res.status(500).json({ error: 'Unable to update notification' });
  }
});

// Mark all notifications as read
notificationsRouter.post('/read-all', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    await db.query(
      `UPDATE notifications SET read = true WHERE user_id = $1 AND read = false`,
      [user.userId]
    );
    return res.json({ success: true });
  } catch (error) {
    console.error('Mark all read error', error);
    return res.status(500).json({ error: 'Unable to update notifications' });
  }
});
```

**FE-05: Add mark-as-read to notifications service and component**

File to modify: `src/app/core/api/notifications.service.ts`

Add two new methods:
```typescript
markAsRead(id: string) {
  return this.http.patch(`/api/notifications/${id}/read`, {});
}

markAllAsRead() {
  return this.http.post('/api/notifications/read-all', {});
}
```

File to modify: `src/app/features/patient/notifications/notifications.component.ts`

- Inject NotificationsApiService.
- Add a "Mark all as read" button handler that calls markAllAsRead().
- Add per-notification tap/click handler that calls markAsRead(id).
- Visually distinguish read vs unread notifications (opacity, background color).

File to modify: `src/app/features/patient/notifications/notifications.component.html`

- Add "Mark all read" button at top of notification list.
- Add conditional CSS class for read/unread state on each notification card.

**Dependencies:** None.
**Effort:** 2.5 hours
**Cross-references:** WS-06 (polling fallback) will use the same GET endpoint.

---

#### Sprint 2B: GP Consultation Completion Endpoint (1.5 hours)

**Task:** API-09

File to modify: `src/server/api/gp.ts`

Add after the existing DELETE /consultations/:id route (after line 220):

```typescript
// Complete a consultation with optional notes
gpRouter.post('/consultations/:id/complete', requireAuth,
  requireRole(['gp', 'doctor']), async (req, res) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;
    const { notes } = req.body as { notes?: string };

    const result = await db.query(
      `UPDATE consultations
       SET status = 'completed', completed_at = now(),
           notes = COALESCE($3, notes)
       WHERE id = $1 AND gp_id = $2 AND status = 'active'
       RETURNING *`,
      [id, user.userId, notes ? JSON.stringify({ summary: notes }) : null]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Active consultation not found' });
    }

    const consultation = result.rows[0];

    // Also mark the original request as completed
    if (consultation.request_id) {
      await db.query(
        `UPDATE consult_requests SET status = 'completed' WHERE id = $1`,
        [consultation.request_id]
      );
    }

    // Notify patient
    await db.query(
      `INSERT INTO notifications (user_id, type, message, data)
       VALUES ($1, $2, $3, $4)`,
      [
        consultation.patient_id,
        'consult.completed',
        'Your consultation has ended. Check your records for details.',
        JSON.stringify({ consultationId: consultation.id })
      ]
    );

    broadcastToUser(consultation.patient_id, 'consult.completed', {
      consultationId: consultation.id
    });

    return res.json({ consultation });
  } catch (error) {
    console.error('Complete consultation error', error);
    return res.status(500).json({ error: 'Unable to complete consultation' });
  }
});
```

The `broadcastToUser` and `broadcastToRole` imports already exist at the top of
the file (line 5).

**Dependencies:** DB-05 (completed_at column), DB-06 (consultations CHECK).
**Effort:** 1.5 hours
**Cross-references:** Enables the GP consultation history to populate. The
frontend practitioner component already calls `loadConsultationHistory()` on
init (line 147).

---

#### Sprint 2C: Pharmacy Dispensing and History (3 hours)

**Tasks:** API-10, API-11, FE-03

**API-10: Pharmacy dispense endpoint**

File to modify: `src/server/api/pharmacy.ts`

Add after the existing claim route (after line 60):

```typescript
// Complete dispensing of a claimed prescription
pharmacyRouter.post('/prescriptions/:id/dispense', requireAuth,
  requireRole(['pharmacist', 'pharmacy_tech']), async (req, res) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;
    const { dispensedItems } = req.body as { dispensedItems?: unknown[] };

    const update = await db.query(
      `UPDATE prescriptions SET status = 'fulfilled'
       WHERE id = $1 AND status = 'claimed' RETURNING *`,
      [id]
    );
    if (update.rows.length === 0) {
      return res.status(404).json({ error: 'Claimed prescription not found' });
    }

    const prescription = update.rows[0];

    // Update the pharmacy_claims record with dispensed items
    await db.query(
      `UPDATE pharmacy_claims SET dispensed_items = $1
       WHERE prescription_id = $2 AND pharmacy_id = $3`,
      [JSON.stringify(dispensedItems || prescription.items), id, user.userId]
    );

    // Notify patient
    await db.query(
      `INSERT INTO notifications (user_id, type, message, data)
       VALUES ($1, $2, $3, $4)`,
      [
        prescription.patient_id,
        'prescription.dispensed',
        'Your prescription has been dispensed and is ready for pickup.',
        JSON.stringify({ prescriptionId: prescription.id })
      ]
    );
    broadcastToUser(prescription.patient_id, 'prescription.dispensed', {
      prescription
    });

    return res.json({ prescription });
  } catch (error) {
    console.error('Dispense prescription error', error);
    return res.status(500).json({ error: 'Unable to dispense prescription' });
  }
});
```

**API-11: Pharmacy history endpoint**

Same file: `src/server/api/pharmacy.ts`

```typescript
// Get pharmacy claim history
pharmacyRouter.get('/history', requireAuth,
  requireRole(['pharmacist', 'pharmacy_tech']), async (req, res) => {
  try {
    const user = (req as any).user;
    const result = await db.query(
      `SELECT pc.*, p.code, p.items, p.status as prescription_status,
              u.display_name as patient_name, u.phone as patient_phone
       FROM pharmacy_claims pc
       JOIN prescriptions p ON p.id = pc.prescription_id
       JOIN users u ON u.id = p.patient_id
       WHERE pc.pharmacy_id = $1
       ORDER BY pc.claimed_at DESC
       LIMIT 100`,
      [user.userId]
    );
    return res.json({ history: result.rows });
  } catch (error) {
    console.error('Pharmacy history error', error);
    return res.status(500).json({ error: 'Unable to fetch history' });
  }
});
```

**FE-03: Implement pharmacy history component**

File to modify: `src/app/features/pharmacy/pharmacy-history/pharmacy-history.ts`

Replace entire contents:
```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PharmacyApiService } from '../../../core/api/pharmacy.service';

interface HistoryRecord {
  id: string;
  code: string;
  patient_name: string;
  items: any[];
  prescription_status: string;
  claimed_at: string;
  dispensed_items: any[];
}

@Component({
  selector: 'app-pharmacy-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pharmacy-history.html',
  styleUrl: './pharmacy-history.scss',
})
export class PharmacyHistoryComponent implements OnInit {
  history: HistoryRecord[] = [];
  loading = true;
  error = '';

  constructor(private pharmacyApi: PharmacyApiService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  private loadHistory(): void {
    this.pharmacyApi.getHistory().subscribe({
      next: (response: any) => {
        this.history = response.history || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to load history. Please try again.';
        this.loading = false;
      }
    });
  }
}
```

File to modify: `src/app/core/api/pharmacy.service.ts`

Add a new method:
```typescript
getHistory() {
  return this.http.get<any>('/api/pharmacy/history');
}
```

File to modify: `src/app/features/pharmacy/pharmacy-history/pharmacy-history.html`

Replace contents with a card list showing each history record: prescription
code, patient name, items dispensed, date, and status badge.

**Dependencies:** None (pharmacy_claims table already exists).
**Effort:** 3 hours
**Cross-references:** DB-11 (dispensed_at column) is optional polish.

---

#### Sprint 2D: Payment Mock UI (2 hours)

**Tasks:** PAY-01, PAY-02, PAY-03

Create three new files:
- `src/app/shared/components/payment-mock/payment-mock.ts`
- `src/app/shared/components/payment-mock/payment-mock.html`
- `src/app/shared/components/payment-mock/payment-mock.scss`

**payment-mock.ts:**
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-mock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-mock.html',
  styleUrl: './payment-mock.scss',
})
export class PaymentMockComponent {
  @Input() serviceName = 'Consultation';
  @Input() amount = '0.00';
  @Output() closed = new EventEmitter<void>();

  dismiss(): void {
    this.closed.emit();
  }
}
```

**payment-mock.html:**
A card styled like a Stripe checkout with:
- Header: "Payment -- Free Beta"
- Service name and amount ($0.00)
- Disabled card number field showing "4242 **** **** 4242"
- Disabled UPI field showing "beta@healthhub"
- A prominent banner: "No payment required during beta. All services are free."
- A "Proceed (Free)" button that calls dismiss()

**payment-mock.scss:**
Mobile-first card layout, muted input styling for disabled fields, green
"Free Beta" badge.

**PAY-03: Wire into patient dashboard**

File to modify: `src/app/features/patient/dashboard/dashboard.component.ts`
- Import PaymentMockComponent.
- Add a `showPaymentModal` boolean.
- Replace the "Coming Soon" interaction on billing-related cards.

File to modify: `src/app/features/patient/dashboard/dashboard.component.html`
- Add `<app-payment-mock>` conditional block.

**Dependencies:** None.
**Effort:** 2 hours
**Cross-references:** None.

---

#### Sprint 2E: Database Performance Indexes (1 hour)

**Task:** DB-09

Create file: `db/migrations/002-add-indexes.sql`

```sql
-- Migration 002: Add performance indexes for common query patterns
-- Date: 2026-02-17

CREATE INDEX IF NOT EXISTS idx_consult_requests_status
  ON consult_requests(status);
CREATE INDEX IF NOT EXISTS idx_consult_requests_patient_id
  ON consult_requests(patient_id);
CREATE INDEX IF NOT EXISTS idx_consultations_gp_id
  ON consultations(gp_id);
CREATE INDEX IF NOT EXISTS idx_consultations_patient_id
  ON consultations(patient_id);
CREATE INDEX IF NOT EXISTS idx_consultations_status
  ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id
  ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id_read
  ON notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_referrals_patient_id
  ON referrals(patient_id);
CREATE INDEX IF NOT EXISTS idx_referrals_to_specialist_id
  ON referrals(to_specialist_id);
CREATE INDEX IF NOT EXISTS idx_lab_orders_patient_id
  ON lab_orders(patient_id);
```

**Dependencies:** DB-10 (migration system from Sprint 1A).
**Effort:** 0.5 hours write + 0.5 hours apply and verify.

---

#### Day 3-4 Summary

```
+------------------------------------------+-------+---------------------+
| Task                                     | Hours | Focus Area          |
+------------------------------------------+-------+---------------------+
| Sprint 2A: Notification endpoints + FE   | 2.5   | Full-stack          |
| Sprint 2B: GP consultation completion    | 1.5   | Backend             |
| Sprint 2C: Pharmacy dispense + history   | 3.0   | Full-stack          |
| Sprint 2D: Payment mock UI              | 2.0   | Frontend            |
| Sprint 2E: Database indexes             | 1.0   | Database            |
+------------------------------------------+-------+---------------------+
| TOTAL                                    | 10.0  |                     |
+------------------------------------------+-------+---------------------+
```

---

### Day 5-7: Internal Demo Readiness (P1, Part 2)

---

#### Sprint 3A: WebSocket Reliability (3 hours)

**Tasks:** WS-01, WS-02, WS-03, WS-04

**WS-01 and WS-02: Client-side reconnection and error handling**

File to modify: `src/app/core/realtime/ws.service.ts`

Replace the entire file contents with an enhanced version that includes:
- Exponential backoff reconnection: 1s, 2s, 4s, 8s, up to 30s max.
- `reconnectAttempts` counter and `maxReconnectAttempts` (20).
- `onerror` handler that logs the error and triggers reconnection.
- `onclose` handler that triggers reconnection unless `disconnect()` was called.
- `disconnect()` method that sets `intentionalClose = true` and closes socket.
- Re-sends the subscribe message on successful reconnect.
- Public `connected$` observable (BehaviorSubject) for connection state.

Key structure:
```typescript
@Injectable({ providedIn: 'root' })
export class WsService {
  private socket?: WebSocket;
  private intentionalClose = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 20;
  private reconnectTimer?: any;
  private subscribedRole?: string;
  private subscribedUserId?: string;

  private readonly eventsSubject = new Subject<WsEvent>();
  private readonly connectedSubject = new BehaviorSubject<boolean>(false);

  events$ = this.eventsSubject.asObservable();
  connected$ = this.connectedSubject.asObservable();

  connect(role: string, userId?: string) { /* with singleton guard */ }
  disconnect() { /* sets intentionalClose, closes socket */ }
  private attemptReconnect() { /* exponential backoff */ }
  private buildWsUrl() { /* same as current */ }
}
```

**WS-03: Server-side heartbeat**

File to modify: `src/server/realtime/ws.ts`

Add a ping interval inside `initWebSocketServer()`:
```typescript
const HEARTBEAT_INTERVAL = 30000; // 30 seconds

const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if ((ws as any).isAlive === false) {
      return ws.terminate();
    }
    (ws as any).isAlive = false;
    ws.ping();
  });
}, HEARTBEAT_INTERVAL);

wss.on('close', () => clearInterval(interval));

wss.on('connection', (ws) => {
  (ws as any).isAlive = true;
  ws.on('pong', () => { (ws as any).isAlive = true; });
  // ... existing message/close handlers
});
```

**WS-04: Singleton guard**

Already partially implemented -- the current `connect()` checks
`this.socket && this.socket.readyState <= WebSocket.OPEN`. The enhanced version
from WS-01 will maintain this guard more robustly by tracking the
`subscribedRole` and `subscribedUserId`.

**Dependencies:** None.
**Effort:** 3 hours
**Cross-references:** WS-06 (polling fallback) depends on the `connected$`
observable exposed here. CHAT-03 depends on reliable WebSocket.

---

#### Sprint 3B: HealWell Video Page (2 hours)

**Task:** FE-01

File to modify: `src/app/features/heal-well/components/video-search/video-search.ts`

Replace entire contents with a component that:
- Defines a `videos` array of 12-15 curated health video objects:
  `{ title: string, youtubeId: string, tags: string[], description: string }`
- Categories: Nutrition, Exercise, Mental Health, Sleep, Heart Health,
  Diabetes, Women's Health, Men's Health
- Implements `searchTerm` text filter on title and description
- Implements `selectedTags` filter (toggle chips)
- Computes `filteredVideos` from both filters

File to modify:
`src/app/features/heal-well/components/video-search/video-search.html`

Replace `<p>video-search works!</p>` with:
- Page header: "HealWell - Health Education Videos"
- Search input field
- Tag filter chips row (all unique tags from videos array)
- Grid of video cards, each with:
  - YouTube thumbnail: `https://img.youtube.com/vi/{youtubeId}/mqdefault.jpg`
  - Title, description snippet, tags as small badges
  - "Watch on YouTube" link: `https://www.youtube.com/watch?v={youtubeId}`
- Empty state message when no videos match filters

File to modify:
`src/app/features/heal-well/components/video-search/video-search.scss`

Mobile-first responsive grid (1 column on mobile, 2 on tablet, 3 on desktop).
Card styling consistent with the rest of the app.

**Dependencies:** None.
**Effort:** 2 hours
**Cross-references:** None. Self-contained feature.

---

#### Sprint 3C: Practitioner-Connect Directory Page (2 hours)

**Task:** FE-02

File to modify:
`src/app/features/practitioner-connect/components/preview/preview.ts`

Replace entire contents with a component that:
- Hardcodes the 5 provider profiles from seed data (for beta, no API needed):
  - Dr Demo GP -- General Practice -- +17000000001
  - Dr Demo Specialist -- Specialist -- +17000000002
  - Demo Pharmacy Admin -- Pharmacist -- +17000000003
  - Demo Diagnostics Admin -- Lab Tech -- +17000000004
  - Demo Admin -- Administrator -- +17000000009
- Adds role filter dropdown (All, GP, Specialist, Pharmacist, Lab Tech)
- Shows online/offline status badge (hardcoded to "Online" for beta)

File to modify:
`src/app/features/practitioner-connect/components/preview/preview.html`

Replace `<p>preview works!</p>` with:
- Page header: "Find a Practitioner"
- Role filter dropdown
- Card list showing each provider: avatar placeholder, name, role, specialty,
  status badge, phone number

File to modify:
`src/app/features/practitioner-connect/components/preview/preview.scss`

Card layout consistent with rest of app. Green/gray status badges.

**Dependencies:** DB-02 (is_operating column) if querying live status. For beta,
hardcoded data is acceptable.
**Effort:** 2 hours
**Cross-references:** If time permits, replace hardcoded data with an API call.

---

#### Sprint 3D: Seed Data Improvements (1 hour)

**Tasks:** AUTH-02, AUTH-03

File to modify: `db/seed.sql`

**AUTH-02: Replace plaintext passwords with bcrypt hashes.**

Pre-compute the bcrypt hash for 'demo1234' (10 rounds). The hash will be
the same string for all seed accounts since the password is the same.

Use: `$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`
(example -- generate actual hash before applying).

Update the INSERT to include first_name, last_name:
```sql
INSERT INTO users (role, phone, password_hash, display_name, first_name, last_name)
VALUES
  ('gp',         '+17000000001', '$2a$10$<hash>', 'Dr Demo GP',            'Demo', 'GP'),
  ('specialist', '+17000000002', '$2a$10$<hash>', 'Dr Demo Specialist',    'Demo', 'Specialist'),
  ('pharmacist', '+17000000003', '$2a$10$<hash>', 'Demo Pharmacy Admin',   'Demo', 'Pharmacist'),
  ('lab_tech',   '+17000000004', '$2a$10$<hash>', 'Demo Diagnostics Admin','Demo', 'LabTech'),
  ('admin',      '+17000000009', '$2a$10$<hash>', 'Demo Admin',            'Demo', 'Admin')
ON CONFLICT (phone) DO NOTHING;
```

**AUTH-03: Add provider_profiles entries.**

Append to seed.sql:
```sql
INSERT INTO provider_profiles (user_id, specialty, facility_name)
SELECT id, 'General Practice', 'HealthHub Main Clinic'
FROM users WHERE phone = '+17000000001'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO provider_profiles (user_id, specialty, facility_name)
SELECT id, 'Cardiology', 'HealthHub Specialist Centre'
FROM users WHERE phone = '+17000000002'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO provider_profiles (user_id, specialty, facility_name)
SELECT id, 'Pharmacy', 'HealthHub Pharmacy'
FROM users WHERE phone = '+17000000003'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO provider_profiles (user_id, specialty, facility_name)
SELECT id, 'Diagnostics', 'HealthHub Diagnostics Lab'
FROM users WHERE phone = '+17000000004'
ON CONFLICT (user_id) DO NOTHING;
```

**Dependencies:** DB-01 (first_name/last_name columns must exist).
**Effort:** 1 hour
**Cross-references:** AUTH-02 means the login API bcrypt path will be used
instead of the plaintext fallback.

---

#### Sprint 3E: Infrastructure Hardening (2.5 hours)

**Tasks:** INF-03, INF-04, INF-05

**INF-03: Rate limiting**

File: `package.json` -- add `"express-rate-limit": "^7.0.0"` to dependencies.

Create new file: `src/server/middleware/rate-limit.ts`

```typescript
import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
  windowMs: 60 * 1000,     // 1 minute
  max: 100,                 // 100 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' }
});

export const authLimiter = rateLimit({
  windowMs: 60 * 1000,     // 1 minute
  max: 10,                  // 10 auth attempts per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please wait a minute.' }
});
```

File to modify: `src/server.ts`
- Import and apply `globalLimiter` before the API router.
- Import and apply `authLimiter` on `/api/auth` specifically.

File to modify: `src/server/api/index.ts`
- Or apply `authLimiter` to the auth sub-router:
  `apiRouter.use('/auth', authLimiter, authRouter);`

**INF-04: Structured request logging**

Create new file: `src/server/middleware/logger.ts`

```typescript
import type { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      duration_ms: duration,
      timestamp: new Date().toISOString()
    };
    if (res.statusCode >= 500) {
      console.error(JSON.stringify(log));
    } else if (res.statusCode >= 400) {
      console.warn(JSON.stringify(log));
    } else {
      console.log(JSON.stringify(log));
    }
  });
  next();
}
```

File to modify: `src/server.ts`
- Import requestLogger.
- Add `app.use(requestLogger);` before the API router.

**INF-05: Graceful shutdown**

File to modify: `src/server.ts`

Add after the `server.listen()` block (after line 85):
```typescript
function gracefulShutdown(signal: string) {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed.');
    db.end().then(() => {
      console.log('Database pool closed.');
      process.exit(0);
    });
  });
  // Force exit after 10 seconds
  setTimeout(() => {
    console.error('Forced shutdown after timeout.');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
```

Also add the db import at the top of `src/server.ts`:
```typescript
import { db } from './server/db';
```

**Dependencies:** None.
**Effort:** 2.5 hours
**Cross-references:** INF-03 (rate limiting) addresses AUTH-04 as well.

---

#### Sprint 3F: CI Pipeline Updates (1 hour)

**Tasks:** CI-01, CI-02

**CI-01: Migration support in CI**

The update to `scripts/db-init.js` from Sprint 1A already handles running
migration files. Verify the CI pipeline step "Initialize database" now
applies migrations automatically.

File to verify: `.github/workflows/ci.yml` (line 50)
- The existing step `run: npm run db:init` calls `scripts/db-init.js` which
  now includes migration logic. No CI file change needed.

**CI-02: Verify GP queue e2e test**

File to check: `e2e/flows/flow2-gp-queue-accept.spec.ts`
- This test already exists and covers the GP accept flow.
- After schema fixes, it should pass. Run locally to verify.
- If the test was previously skipped or marked as expected-fail, remove
  that annotation.

**Dependencies:** Sprint 1A (schema migration) and Sprint 1B (pool fix).
**Effort:** 1 hour
**Cross-references:** CI-04 (deploy hook) depends on having a working CI first.

---

#### Day 5-7 Summary

```
+------------------------------------------+-------+---------------------+
| Task                                     | Hours | Focus Area          |
+------------------------------------------+-------+---------------------+
| Sprint 3A: WebSocket reliability         | 3.0   | Full-stack          |
| Sprint 3B: HealWell video page           | 2.0   | Frontend            |
| Sprint 3C: Practitioner-Connect page     | 2.0   | Frontend            |
| Sprint 3D: Seed data improvements        | 1.0   | Database            |
| Sprint 3E: Infrastructure hardening      | 2.5   | Backend             |
| Sprint 3F: CI pipeline updates           | 1.0   | DevOps              |
+------------------------------------------+-------+---------------------+
| TOTAL                                    | 11.5  |                     |
+------------------------------------------+-------+---------------------+
```

---

### Day 8-10: Beta Polish (P2)

---

#### Sprint 4A: Embedded Video Component (3 hours)

**Tasks:** VID-01, VID-02, VID-03

**VID-01: Create Daily.co embedded video component**

Create new files:
- `src/app/shared/components/video-room/video-room.ts`
- `src/app/shared/components/video-room/video-room.html`
- `src/app/shared/components/video-room/video-room.scss`

**video-room.ts:**
```typescript
import { Component, Input, Output, EventEmitter, OnDestroy,
         ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-video-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-room.html',
  styleUrl: './video-room.scss',
})
export class VideoRoomComponent implements AfterViewInit, OnDestroy {
  @Input() roomUrl = '';
  @Input() token = '';
  @Output() left = new EventEmitter<void>();

  @ViewChild('videoFrame') videoFrame!: ElementRef<HTMLIFrameElement>;
  private platformId = inject(PLATFORM_ID);

  get iframeSrc(): string {
    const base = this.roomUrl;
    const params = this.token ? `?t=${this.token}` : '';
    return `${base}${params}`;
  }

  ngAfterViewInit(): void {
    // Daily.co iframe embeds work automatically
  }

  ngOnDestroy(): void {
    // Cleanup handled by iframe removal
  }

  leaveCall(): void {
    this.left.emit();
  }

  openInNewTab(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.open(this.iframeSrc, '_blank');
    }
  }
}
```

**video-room.html:**
- Full-viewport iframe pointing to Daily.co room URL
- Overlay controls bar at bottom: Leave Call button, Open in New Tab fallback
- Loading indicator while iframe loads

**video-room.scss:**
- Full-height container, iframe fills parent
- Semi-transparent control bar at bottom

Wire into patient waiting component:

File to modify: `src/app/features/patient/waiting/waiting.component.ts`
- Import VideoRoomComponent.
- When consultation is accepted and roomUrl is received, show `<app-video-room>`
  instead of calling `window.open()`.
- Keep `window.open()` as fallback (accessible via "Open in New Tab" button).

Wire into GP practitioner component:

File to modify:
`src/app/features/dashboard/components/practitioner/practitioner.ts`
- Import VideoRoomComponent.
- After accepting a patient (line 392-402), store the roomUrl.
- Show `<app-video-room>` component instead of `window.open()`.

**VID-02: Generate Daily.co meeting tokens**

File to modify: `src/server/integrations/daily.ts`

Add new function:
```typescript
export async function createMeetingToken(
  roomName: string, userName: string
): Promise<string | null> {
  const apiKey = process.env['DAILY_API_KEY'];
  if (!apiKey) return null;

  const response = await fetch('https://api.daily.co/v1/meeting-tokens', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        room_name: roomName,
        user_name: userName,
        exp: Math.floor(Date.now() / 1000) + 60 * 60
      }
    })
  });

  if (!response.ok) return null;
  const data = (await response.json()) as { token?: string };
  return data.token || null;
}
```

File to modify: `src/server/api/gp.ts` (accept endpoint, around line 42)
- After creating the room, generate tokens for both GP and patient.
- Include tokens in the response and notification data.

**VID-03: Room cleanup on consultation end**

File to modify: `src/server/integrations/daily.ts`

Add new function:
```typescript
export async function deleteRoom(roomUrl: string): Promise<void> {
  const apiKey = process.env['DAILY_API_KEY'];
  if (!apiKey) return;
  const roomName = roomUrl.split('/').pop();
  if (!roomName) return;

  fetch(`https://api.daily.co/v1/rooms/${roomName}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${apiKey}` }
  }).catch(err => console.error('Room cleanup failed:', err));
}
```

File to modify: `src/server/api/gp.ts` (in the consultation complete endpoint
from Sprint 2B)
- After marking consultation as completed, call `deleteRoom()` with the
  consultation's `daily_room_url`.

**Dependencies:** Daily.co API key must be configured.
**Effort:** 3 hours
**Cross-references:** CHAT-03 will sit alongside this video component.

---

#### Sprint 4B: Basic In-App Chat (4 hours)

**Tasks:** CHAT-01/DB-12, CHAT-02/API-13, CHAT-03/FE-07

**CHAT-01: Create chat_messages table**

Create file: `db/migrations/003-add-chat-messages.sql`

```sql
-- Migration 003: Add chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id uuid NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_consultation_id
  ON chat_messages(consultation_id, created_at);
```

**CHAT-02: Create chat API endpoints**

Create new file: `src/server/api/chat.ts`

```typescript
import { Router } from 'express';
import { db } from '../db';
import { requireAuth } from '../middleware/auth';
import { broadcastToUser } from '../realtime/ws';

export const chatRouter = Router();

// Send a message
chatRouter.post('/:consultationId', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const { consultationId } = req.params;
    const { message } = req.body as { message?: string };

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Verify user is part of this consultation
    const consult = await db.query(
      `SELECT * FROM consultations WHERE id = $1
       AND (patient_id = $2 OR gp_id = $2 OR specialist_id = $2)`,
      [consultationId, user.userId]
    );
    if (consult.rows.length === 0) {
      return res.status(403).json({ error: 'Not a participant' });
    }

    const insert = await db.query(
      `INSERT INTO chat_messages (consultation_id, sender_id, message)
       VALUES ($1, $2, $3) RETURNING *`,
      [consultationId, user.userId, message.trim()]
    );

    const chatMessage = insert.rows[0];
    const consultation = consult.rows[0];

    // Broadcast to all participants
    const participants = [
      consultation.patient_id,
      consultation.gp_id,
      consultation.specialist_id
    ].filter(id => id && id !== user.userId);

    for (const participantId of participants) {
      broadcastToUser(participantId, 'chat.message', {
        consultationId,
        message: chatMessage
      });
    }

    return res.json({ message: chatMessage });
  } catch (error) {
    console.error('Send chat message error', error);
    return res.status(500).json({ error: 'Unable to send message' });
  }
});

// Get messages for a consultation
chatRouter.get('/:consultationId', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const { consultationId } = req.params;

    // Verify user is part of this consultation
    const consult = await db.query(
      `SELECT id FROM consultations WHERE id = $1
       AND (patient_id = $2 OR gp_id = $2 OR specialist_id = $2)`,
      [consultationId, user.userId]
    );
    if (consult.rows.length === 0) {
      return res.status(403).json({ error: 'Not a participant' });
    }

    const result = await db.query(
      `SELECT cm.*, u.display_name as sender_name
       FROM chat_messages cm
       JOIN users u ON u.id = cm.sender_id
       WHERE cm.consultation_id = $1
       ORDER BY cm.created_at ASC`,
      [consultationId]
    );

    return res.json({ messages: result.rows });
  } catch (error) {
    console.error('Get chat messages error', error);
    return res.status(500).json({ error: 'Unable to fetch messages' });
  }
});
```

Register in `src/server/api/index.ts`:
```typescript
import { chatRouter } from './chat';
// ...
apiRouter.use('/chat', chatRouter);
```

**CHAT-03: Chat UI component**

Create new files:
- `src/app/shared/components/chat-panel/chat-panel.ts`
- `src/app/shared/components/chat-panel/chat-panel.html`
- `src/app/shared/components/chat-panel/chat-panel.scss`

The component accepts `consultationId` as @Input(), loads existing messages
on init, subscribes to WS `chat.message` events, displays messages in a
scrollable list, and provides a text input with send button. Auto-scrolls
to bottom on new messages. Mobile-friendly (full-width, fixed bottom input).

Wire into the video-room component or alongside it as a side panel / toggle
panel.

**Dependencies:** WS-01/WS-02 (reliable WebSocket). VID-01 (video component to
sit alongside).
**Effort:** 4 hours
**Cross-references:** Uses the same WsService for real-time message delivery.

---

#### Sprint 4C: WebSocket Authentication (1.5 hours)

**Task:** WS-05

**Server side**

File to modify: `src/server/realtime/ws.ts`

After a new connection is established, require the client to send an auth
message within 5 seconds. Verify the JWT. If invalid, close the connection.

In the `wss.on('connection')` handler, add:
```typescript
let authenticated = false;
const authTimeout = setTimeout(() => {
  if (!authenticated) {
    ws.close(4001, 'Authentication timeout');
  }
}, 5000);

ws.on('message', (raw) => {
  const msg = JSON.parse(raw.toString());
  if (msg.type === 'auth') {
    try {
      const payload = jwt.verify(msg.token, jwtSecret);
      authenticated = true;
      clearTimeout(authTimeout);
      // Auto-subscribe based on JWT role and userId
      if (payload.role) addToMap(roleConnections, payload.role, ws);
      if (payload.userId) addToMap(userConnections, payload.userId, ws);
      ws.send(JSON.stringify({ type: 'authenticated' }));
    } catch {
      ws.close(4002, 'Invalid token');
    }
    return;
  }
  if (!authenticated) {
    ws.send(JSON.stringify({ type: 'error', message: 'Not authenticated' }));
    return;
  }
  // ... existing subscribe handling
});
```

Import jwt at the top of the file:
```typescript
import * as jwt from 'jsonwebtoken';
const jwtSecret = process.env['JWT_SECRET'] || 'demo_secret';
```

**Client side**

File to modify: `src/app/core/realtime/ws.service.ts`

In the `onopen` handler, send the auth message before the subscribe message:
```typescript
this.socket.onopen = () => {
  const token = localStorage.getItem('token');
  if (token) {
    this.socket?.send(JSON.stringify({ type: 'auth', token }));
  }
  // Subscribe message is now handled by server after auth
};
```

**Dependencies:** None.
**Effort:** 1.5 hours
**Cross-references:** Secures all real-time communication.

---

#### Sprint 4D: Forgot Password and Profile Update (2 hours)

**Tasks:** API-12, FE-08, API-08

**API-12: Forgot password stub**

File to modify: `src/server/api/auth.ts`

Add after the logout route (after line 110):
```typescript
authRouter.post('/forgot-password', async (req, res) => {
  const { phone } = req.body as { phone?: string };
  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }
  // In production, this would send an SMS/email with a reset link.
  // For beta, we just acknowledge the request.
  console.log(`Password reset requested for: ${phone}`);
  return res.json({
    success: true,
    message: 'If this phone number is registered, you will receive reset instructions.'
  });
});
```

**FE-08: Wire forgot-password form to backend**

File to modify:
`src/app/features/auth/components/forgot-password/forgot-password.ts`

- Inject HttpClient.
- On form submit, call POST /api/auth/forgot-password with the phone number.
- Show the response message to the user.
- Handle error state.

**API-08: Patient profile update**

File to modify: `src/server/api/patient.ts`

Add after the existing GET /me route (after line 56):
```typescript
patientRouter.put('/me', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const { displayName, firstName, lastName } = req.body as {
      displayName?: string; firstName?: string; lastName?: string;
    };

    const result = await db.query(
      `UPDATE users SET
        display_name = COALESCE($2, display_name),
        first_name = COALESCE($3, first_name),
        last_name = COALESCE($4, last_name)
       WHERE id = $1 RETURNING id, role, phone, display_name, first_name, last_name`,
      [user.userId, displayName || null, firstName || null, lastName || null]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Update profile error', error);
    return res.status(500).json({ error: 'Unable to update profile' });
  }
});
```

File to modify: `src/app/features/patient/profile/profile.component.ts`
- Add edit mode toggle.
- Bind form fields to displayName, firstName, lastName.
- Call PUT /api/patient/me on save.

**Dependencies:** DB-01 (first_name/last_name columns).
**Effort:** 2 hours

---

#### Sprint 4E: Notification Polling Fallback (1 hour)

**Task:** WS-06

File to modify: `src/app/core/api/notifications.service.ts`

Add polling mechanism:
- Inject WsService.
- Subscribe to `WsService.connected$`.
- When `connected$` emits `false`, start a 30-second polling interval that
  calls GET /api/notifications.
- When `connected$` emits `true`, stop polling.
- Expose a `notifications$` observable that merges WS events and poll results.

File to modify: `src/app/features/patient/notifications/notifications.component.ts`
- Subscribe to the merged `notifications$` instead of (or in addition to)
  direct API calls.

**Dependencies:** WS-01 (the `connected$` BehaviorSubject).
**Effort:** 1 hour
**Cross-references:** Uses the same GET /api/notifications endpoint.

---

#### Sprint 4F: Smoke Tests and Deploy Hook (1.5 hours)

**Tasks:** CI-03, CI-04

**CI-03: Provider login smoke tests**

Create new file: `e2e/smoke/provider-logins.smoke.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

const providers = [
  { phone: '+17000000001', role: 'gp',         name: 'Dr Demo GP' },
  { phone: '+17000000002', role: 'specialist',  name: 'Dr Demo Specialist' },
  { phone: '+17000000003', role: 'pharmacist',  name: 'Demo Pharmacy Admin' },
  { phone: '+17000000004', role: 'lab_tech',    name: 'Demo Diagnostics Admin' },
];

for (const provider of providers) {
  test(`${provider.role} can login with seed credentials`, async ({ request }) => {
    const response = await request.post('/api/auth/login', {
      data: { phone: provider.phone, password: 'demo1234' }
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.token).toBeTruthy();
    expect(body.user.role).toBe(provider.role);
  });
}
```

**CI-04: Render deploy hook**

File to modify: `.github/workflows/ci.yml`

Add a new job after `build-test-e2e` that triggers on the main branch only:

```yaml
  deploy:
    needs: build-test-e2e
    if: github.ref == 'refs/heads/health-hub-test' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Render deploy
        run: curl -X POST "${{ secrets.RENDER_DEPLOY_HOOK_URL }}"
```

Store the Render deploy hook URL as a GitHub Actions secret named
`RENDER_DEPLOY_HOOK_URL`.

**Dependencies:** Working CI pipeline. Render deployment from Sprint 1D.
**Effort:** 1.5 hours

---

#### Sprint 4G: Coming Soon Polish (1 hour)

**Task:** FE-09

Files to review and update:

1. `src/app/features/dashboard/components/patient/patient.html`
   - Diagnostics card: keep "Coming Soon" badge, ensure consistent styling.
   - Travel/Insurance card: keep "Coming Soon" badge.

2. `src/app/features/dashboard/components/practitioner/practitioner.html`
   - Schedule, Patients, Settings quick actions: ensure they show a toast
     notification "Coming soon" rather than being silently broken.

3. `src/app/features/specialist/specialist-dashboard/specialist-dashboard.html`
   - "Patients" nav button: show disabled state with tooltip.

4. `src/app/features/specialist/referral-details/referral-details.html`
   - "Request more info" button: show toast "Coming soon".

5. `src/app/features/diagnostics/diagnostics-result-upload/diagnostics-result-upload.ts`
   - Draft saving notice: keep "Server draft sync coming soon" text.

Create a shared CSS class `.coming-soon-badge` in `src/app/app.scss` or a
shared stylesheet:
```scss
.coming-soon-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  background: #f0f0f0;
  color: #666;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

**Dependencies:** None.
**Effort:** 1 hour

---

#### Day 8-10 Summary

```
+------------------------------------------+-------+---------------------+
| Task                                     | Hours | Focus Area          |
+------------------------------------------+-------+---------------------+
| Sprint 4A: Embedded video component      | 3.0   | Full-stack          |
| Sprint 4B: Basic in-app chat             | 4.0   | Full-stack          |
| Sprint 4C: WebSocket authentication      | 1.5   | Full-stack          |
| Sprint 4D: Forgot password + profile     | 2.0   | Full-stack          |
| Sprint 4E: Notification polling fallback | 1.0   | Frontend            |
| Sprint 4F: Smoke tests + deploy hook     | 1.5   | DevOps / QA         |
| Sprint 4G: Coming Soon polish            | 1.0   | Frontend            |
+------------------------------------------+-------+---------------------+
| TOTAL                                    | 14.0  |                     |
+------------------------------------------+-------+---------------------+
```

---

### Day 11-14: Testing and Bug Fixes

---

#### Sprint 5A: Full Flow Manual Testing (Day 11-12, 8 hours)

Test the complete loop step by step:

```
Step 1: Patient signup
  - Navigate to /auth/signup
  - Enter new phone number and password
  - Verify redirect to patient dashboard
  - Verify JWT stored in localStorage

Step 2: Patient requests GP consultation
  - Click "Request Consultation" on patient dashboard
  - Select video mode, enter symptoms
  - Verify consult request created (check /api/patient/consults)
  - Verify patient enters waiting room

Step 3: GP receives and accepts patient
  - Login as GP (+17000000001 / demo1234)
  - Verify queue loads without errors
  - Verify new patient appears in queue
  - Click Accept
  - Verify Daily.co room opens (embedded or new tab)
  - Verify patient receives real-time notification

Step 4: GP writes prescription
  - Open prescription modal from queue
  - Enter medication items
  - Submit
  - Verify patient receives notification with prescription code

Step 5: GP creates specialist referral
  - Open referral modal
  - Select specialty, urgency, reason, date/time
  - Submit
  - Verify specialist receives notification

Step 6: Specialist handles referral
  - Login as specialist (+17000000002 / demo1234)
  - Verify referral appears in list
  - Accept the referral
  - Verify patient receives status update notification

Step 7: Specialist orders lab tests
  - From referral details, order lab tests
  - Verify lab order created
  - Verify diagnostics staff receives notification

Step 8: Diagnostics processes lab order
  - Login as lab tech (+17000000004 / demo1234)
  - Verify order appears in orders list
  - Update status to in_progress, then completed
  - Add result notes
  - Verify patient receives notification

Step 9: Pharmacy dispenses prescription
  - Login as pharmacist (+17000000003 / demo1234)
  - Enter prescription code in scanner
  - Verify prescription details display
  - Claim prescription
  - Dispense prescription
  - Verify patient receives notification

Step 10: Patient reviews everything
  - Login as patient
  - Check notifications (verify mark-as-read works)
  - Check appointments page
  - Check records page (prescriptions, referrals, lab orders)
  - Check HealWell page (videos load)
  - Check Practitioner-Connect page (providers display)
  - Check payment mock (shows Free Beta)
```

For each step: test on mobile viewport (375px), test on desktop (1440px),
verify WebSocket updates arrive in real time.

#### Sprint 5B: Bug Fix Buffer (Day 12-13, 8 hours)

Reserve 8 hours for fixing bugs discovered during full flow testing. Based on
common patterns in similar projects, likely issues include:

- Timezone display mismatches (timestamps stored as UTC, displayed without
  conversion).
- Mobile layout breakages on specific components (modal overflow, button
  overlap).
- Race conditions when two GPs accept the same patient simultaneously.
- WebSocket reconnection edge cases (rapid disconnect/reconnect).
- CORS preflight failures on specific endpoints.
- SSR hydration mismatches on dynamic content.
- Notification duplication (WS + HTTP poll delivering the same notification).

#### Sprint 5C: Render Deployment Verification (Day 13-14, 3 hours)

Full production deployment checklist:

```
[ ] render.yaml committed and pushed
[ ] Render detects and deploys automatically
[ ] Health check passes: curl https://<app>.onrender.com/api/health
[ ] Database initialized: npm run db:init against production DB
[ ] Seed data verified: all 5 provider accounts exist
[ ] JWT_SECRET is NOT 'demo_secret' (check Render env vars)
[ ] DAILY_API_KEY is set (check Render env vars)
[ ] SSL certificate is valid (Render provides automatically)
[ ] WebSocket connects over wss://
[ ] All provider logins work
[ ] Patient signup works
[ ] Full consult flow completes without errors
[ ] No 500 errors in Render logs
[ ] UptimeRobot configured and pinging /api/health
```

#### Sprint 5D: Light Load Testing (Day 14, 2 hours)

Using k6, artillery, or manual browser tab multiplication:

- Simulate 50 concurrent users (30 patients, 10 GPs, 5 specialists,
  5 pharmacists).
- Each patient makes 1 consult request.
- Each GP accepts 3 patients.
- Monitor: response times, error rates, DB connection count, WS stability.
- Acceptance criteria: p95 response time under 2 seconds, zero 500 errors,
  zero WS disconnections.

If load testing reveals issues, the most likely bottleneck is the database
connection pool. Increase `max` in `src/server/db.ts` if needed (up to the
Render PostgreSQL plan limit).

---

#### Day 11-14 Summary

```
+------------------------------------------+-------+---------------------+
| Task                                     | Hours | Focus Area          |
+------------------------------------------+-------+---------------------+
| Sprint 5A: Full flow manual testing      | 8.0   | QA                  |
| Sprint 5B: Bug fix buffer                | 8.0   | Full-stack          |
| Sprint 5C: Render deployment verification| 3.0   | DevOps              |
| Sprint 5D: Light load testing            | 2.0   | QA                  |
+------------------------------------------+-------+---------------------+
| TOTAL                                    | 21.0  |                     |
+------------------------------------------+-------+---------------------+
```

---

### Grand Total Effort Estimate

```
+----------------------------+--------+--------+---------------------------------+
| Phase                      | Days   | Hours  | Notes                           |
+----------------------------+--------+--------+---------------------------------+
| Critical Blockers (P0)     | 1-2    |  7.5   | Schema, GP API, Render config   |
| Core Flow Completion (P1a) | 3-4    | 10.0   | Notifications, pharmacy, payment|
| Internal Demo Ready (P1b)  | 5-7    | 11.5   | WS, HealWell, infra, CI        |
| Beta Polish (P2)           | 8-10   | 14.0   | Video, chat, auth, polish       |
| Testing and Bug Fixes      | 11-14  | 21.0   | QA, bugs, deploy, load test     |
+----------------------------+--------+--------+---------------------------------+
| GRAND TOTAL                | 14     | 64.0   |                                 |
+----------------------------+--------+--------+---------------------------------+
```

At AI-assisted development speed (3-5x for boilerplate), the actual focused
developer-hours is approximately 25-35 hours spread across the 14 days. This
is feasible for a single experienced developer or a small team of 2-3.

---

## SECTION 5: RISK REGISTER

### High Severity Risks

```
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| #  | Risk                                       | Likelihood| Impact | Mitigation                               |
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| R1 | Database migration fails on production      | Medium    | Critical| Test migration on a clone of production  |
|    | data or causes data loss                   |           |        | DB first. Keep rollback SQL for every    |
|    |                                            |           |        | ALTER TABLE. Use IF NOT EXISTS/IF EXISTS.|
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| R2 | Daily.co API key not configured, quota     | Medium    | High   | Create Daily.co account on Day 1. Free  |
|    | exceeded, or rooms fail to create          |           |        | tier: 2000 participant-min/month. Use    |
|    |                                            |           |        | fallback room URL. Monitor API dashboard.|
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| R3 | WebSocket drops under load; users lose     | High      | High   | Implement reconnection (WS-01) + polling|
|    | all real-time updates permanently          |           |        | fallback (WS-06) before beta. Test with |
|    |                                            |           |        | 50+ concurrent WS connections.           |
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| R4 | Render starter tier has cold starts;       | High      | Medium | Use paid plan if budget allows ($7/mo).  |
|    | first request after idle takes 30+ seconds |           |        | Configure UptimeRobot to ping every 5   |
|    |                                            |           |        | minutes to prevent sleeping.             |
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| R5 | PostgreSQL connection pool exhaustion       | Medium    | Critical| Set max:25 (DB-08). Add connection      |
|    | under 200+ concurrent users               |           |        | timeout (10s). Monitor active count.     |
|    |                                            |           |        | Upgrade Render DB plan if needed.        |
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| R6 | JWT_SECRET left as 'demo_secret' in        | Low       | Critical| render.yaml uses generateValue:true.    |
|    | production, enabling token forgery         |           |        | Startup guard exits if secret is default |
|    |                                            |           |        | in production (AUTH-01).                 |
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| R7 | Two GPs accept the same patient            | Medium    | High   | The current SQL uses                     |
|    | simultaneously (race condition)            |           |        | WHERE status='waiting' which provides    |
|    |                                            |           |        | basic protection. Add SELECT FOR UPDATE  |
|    |                                            |           |        | SKIP LOCKED for proper concurrency.      |
+----+--------------------------------------------+-----------+--------+------------------------------------------+
```

### Medium Severity Risks

```
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| #  | Risk                                       | Likelihood| Impact | Mitigation                               |
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| R8 | Video iframe blocked by browser security   | Medium    | Medium | Keep window.open() fallback. Test iframe |
|    | policies (Safari, Firefox)                 |           |        | embedding on Safari, Chrome, Firefox.    |
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| R9 | Chat feature scope creep delays beta       | Medium    | Medium | Keep chat minimal: text only, no file    |
|    |                                            |           |        | uploads, no read receipts, no typing     |
|    |                                            |           |        | indicators. Cut chat entirely if behind. |
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| R10| Mobile browser compatibility issues        | Medium    | Medium | Test on iOS Safari, Chrome Android,      |
|    | (camera, WebSocket, CSS)                   |           |        | Samsung Internet. WebSocket on mobile    |
|    |                                            |           |        | can be flaky -- polling fallback helps.  |
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| R11| Seed provider accounts compromised by      | Medium    | Low    | Change seed passwords before public      |
|    | external testers (passwords are known)     |           |        | beta. Or create fresh provider accounts  |
|    |                                            |           |        | with unique passwords for each tester.   |
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| R12| CI pipeline breaks during sprint,          | Low       | Medium | Fix CI immediately on failure. Do not    |
|    | blocking deployments                       |           |        | merge without green CI. Keep pipeline    |
|    |                                            |           |        | execution under 10 minutes.              |
+----+--------------------------------------------+-----------+--------+------------------------------------------+
```

### Low Severity Risks

```
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| #  | Risk                                       | Likelihood| Impact | Mitigation                               |
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| R13| Angular 21 SSR hydration mismatches on     | Low       | Medium | All existing components use PLATFORM_ID  |
|    | new components                             |           |        | checks. Maintain this pattern for new    |
|    |                                            |           |        | components (video-room, chat-panel).     |
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| R14| Playwright e2e tests become flaky          | Medium    | Low    | retry.ts helper already exists. Increase |
|    |                                            |           |        | timeouts in CI. Use test.retry(2).       |
+----+--------------------------------------------+-----------+--------+------------------------------------------+
| R15| Notification spam overwhelms user inbox    | Low       | Low    | Each action creates at most 1            |
|    |                                            |           |        | notification. Mark-as-read (API-06/07)   |
|    |                                            |           |        | helps. No email/SMS to worry about.      |
+----+--------------------------------------------+-----------+--------+------------------------------------------+
```

---

## SECTION 6: ENVIRONMENT AND DEPLOYMENT CHECKLIST

### Required Environment Variables

```
+---------------------+----------+----------------------------+-------------------------------------+-------------------+
| Variable            | Required | Default                    | Description                         | Where to set      |
+---------------------+----------+----------------------------+-------------------------------------+-------------------+
| DATABASE_URL        | YES      | (none -- app warns)        | PostgreSQL connection string         | Render env vars   |
| DATABASE_SSL        | YES      | "true"                     | Enable SSL for DB connection         | Render env vars   |
| JWT_SECRET          | YES      | "demo_secret" (INSECURE)   | HMAC secret for signing JWTs         | Render (generate) |
| DAILY_API_KEY       | YES      | (none -- uses fallback)    | Daily.co REST API key                | Render env vars   |
| DAILY_FALLBACK_ROOM | NO       | healthhub.daily.co/demo    | Fallback Daily.co room URL           | Render env vars   |
| PORT                | NO       | 4000                       | HTTP server listen port              | Render auto-sets  |
| NODE_ENV            | NO       | (none)                     | Set to "production" for prod         | Render env vars   |
+---------------------+----------+----------------------------+-------------------------------------+-------------------+
```

### Service Setup Procedures

#### 1. Render Web Service

```
1. Go to https://dashboard.render.com
2. Click "New" > "Blueprint"
3. Connect the GitHub repository (health-hub)
4. Render detects render.yaml and creates:
   - Web service: health-hub
   - PostgreSQL: health-hub-db
5. Verify environment variables are populated:
   - DATABASE_URL: auto-linked from health-hub-db
   - JWT_SECRET: auto-generated
   - DAILY_API_KEY: must be manually set
   - NODE_ENV: set to "production"
6. Trigger first deploy
7. Monitor build logs for success
8. Verify health check: curl https://<app-name>.onrender.com/api/health
```

#### 2. Render PostgreSQL Database

```
1. Database is created automatically via render.yaml blueprint
2. Note the connection details from Render dashboard:
   - Internal URL (for same-region, faster)
   - External URL (for local access/migrations)
3. Initialize the database:
   Option A (Render Shell):
     - Open Render Shell for the web service
     - Run: npm run db:init
   Option B (Local):
     - Export: DATABASE_URL=<external-url> DATABASE_SSL=true
     - Run: npm run db:init
4. Verify initialization:
   - Connect with psql or a GUI tool
   - Run: SELECT phone, role, display_name FROM users;
   - Expect 5 rows (GP, Specialist, Pharmacist, Lab Tech, Admin)
   - Run: SELECT table_name FROM information_schema.tables
          WHERE table_schema = 'public';
   - Expect 10 tables
```

#### 3. Daily.co Video Service

```
1. Go to https://dashboard.daily.co/signup
2. Create account and domain (e.g., healthhub.daily.co)
3. Navigate to Settings > Developers
4. Copy the API key
5. Set DAILY_API_KEY in Render environment variables
6. Create a permanent fallback room:
   - Go to Rooms in Daily.co dashboard
   - Create room named "demo"
   - Set expiry to "never" (or very far future)
   - Copy URL: https://healthhub.daily.co/demo
   - Set DAILY_FALLBACK_ROOM in Render env vars
7. Verify room creation works:
   - curl -H "Authorization: Bearer <API_KEY>" \
     -H "Content-Type: application/json" \
     -X POST https://api.daily.co/v1/rooms \
     -d '{"properties":{"exp":9999999999}}'
   - Should return JSON with room URL
8. Note free tier limits: 2000 participant-minutes/month
   - With 200 testers doing 10-min consults: ~2000 minutes
   - May need to upgrade if usage is heavy
```

#### 4. GitHub Repository Configuration

```
1. Verify branch protection on health-hub-test:
   - Require pull request reviews (optional for speed)
   - Require status checks (CI must pass)
2. Add GitHub Actions secret:
   - RENDER_DEPLOY_HOOK_URL: copy from Render dashboard
     (Settings > Deploy Hook)
3. Verify CI pipeline runs on push:
   - Push a small change
   - Check Actions tab for green build
4. Verify e2e tests pass:
   - Locally: npm run e2e
   - In CI: check Playwright artifacts on failure
```

#### 5. Monitoring Setup

```
1. UptimeRobot (free tier):
   - Create account at https://uptimerobot.com
   - Add HTTP monitor: https://<app-name>.onrender.com/api/health
   - Interval: 5 minutes
   - Alert contacts: team email/Slack
   - This also prevents Render cold starts

2. Render Dashboard Monitoring:
   - Check "Logs" tab daily for errors
   - Check "Metrics" tab for CPU/memory usage
   - Check PostgreSQL "Metrics" for connection count
   - Set up Render notifications for deploy failures

3. Daily.co Dashboard:
   - Monitor participant-minutes usage
   - Check for failed room creation errors
```

### Pre-Launch Verification Checklist

Run through every item before opening to external testers (Week 2).

```
INFRASTRUCTURE
[ ] render.yaml is committed and Render detected it
[ ] Web service is deployed and healthy
[ ] PostgreSQL is provisioned and initialized
[ ] All env vars are set (DATABASE_URL, JWT_SECRET, DAILY_API_KEY, NODE_ENV)
[ ] JWT_SECRET is NOT 'demo_secret' -- verify in Render env vars
[ ] SSL/HTTPS works (Render provides automatically)
[ ] UptimeRobot is monitoring /api/health

DATABASE
[ ] Schema is current (all migrations applied)
[ ] All 10 tables exist with correct columns
[ ] Indexes are created (check with \di in psql)
[ ] Seed data present (5 provider accounts)
[ ] Pool max is 25 (verify in db.ts)

AUTHENTICATION
[ ] GP login:         +17000000001 / demo1234 -- verify 200 response
[ ] Specialist login:  +17000000002 / demo1234 -- verify 200 response
[ ] Pharmacist login:  +17000000003 / demo1234 -- verify 200 response
[ ] Lab Tech login:    +17000000004 / demo1234 -- verify 200 response
[ ] Admin login:       +17000000009 / demo1234 -- verify 200 response
[ ] Patient signup with new phone number -- verify token returned
[ ] Auth guard redirects unauthenticated users to login
[ ] Role guard prevents patients from accessing provider portals

CORE FLOW
[ ] Patient requests GP consultation -- verify 200 and WebSocket broadcast
[ ] GP queue loads -- verify no 500 error (schema fix working)
[ ] GP accepts patient -- verify consultation created and Daily.co room opens
[ ] GP writes prescription -- verify patient notified with code
[ ] GP creates referral -- verify specialist notified
[ ] Specialist accepts referral -- verify patient notified
[ ] Specialist orders lab tests -- verify diagnostics staff notified
[ ] Diagnostics updates lab order status -- verify patient notified
[ ] Pharmacy scans prescription code -- verify prescription displayed
[ ] Pharmacy claims and dispenses -- verify patient notified

FEATURES
[ ] Patient dashboard loads all sections
[ ] Patient notifications display and mark-as-read works
[ ] Patient records show prescriptions, referrals, lab orders
[ ] HealWell page shows videos with tag filtering
[ ] Practitioner-Connect shows provider directory
[ ] Payment mock displays "Free Beta" correctly
[ ] Forgot password form submits without error

REAL-TIME
[ ] WebSocket connects on page load
[ ] WebSocket reconnects after brief disconnect (kill/restart server)
[ ] Notifications arrive in real time when actions occur
[ ] Polling fallback works when WebSocket is down

VIDEO
[ ] Daily.co room opens (embedded or new tab)
[ ] Both GP and patient can join the same room
[ ] Room is cleaned up after consultation ends

MOBILE
[ ] Landing page renders correctly at 375px width
[ ] Login/signup forms are usable on mobile
[ ] Patient dashboard scrolls and navigates correctly
[ ] GP queue cards are readable and tappable
[ ] Video room is usable on mobile browser
[ ] Bottom navigation works on all portal pages

PERFORMANCE
[ ] No visible loading delays over 3 seconds on any page
[ ] No console errors visible in browser developer tools
[ ] No 500 errors in Render application logs
[ ] Database connection count stays below 20 under normal use
```

---

## APPENDIX A: Cross-Reference Dependency Map

This map shows how tasks depend on each other across domains. An arrow (-->)
means "enables" or "must be done before."

```
DB-01 (users.first_name/last_name)
  --> API-01 (GP queue query works)
  --> API-04 (GP history query works)
  --> AUTH-03 (seed data includes first/last names)
  --> FE-02 (Practitioner-Connect can show names)

DB-02 (users.is_operating)
  --> API-03 (GP status toggle works)
  --> FE-02 (Practitioner-Connect can show online/offline)

DB-03 + DB-04 (consult_requests removed_* + CHECK)
  --> API-02 (GP delete-from-queue works)

DB-05 + DB-06 (consultations completed_at + CHECK)
  --> API-04 (GP history query returns results)
  --> API-09 (GP consultation complete endpoint)

DB-07 (consultations gp_deleted/gp_deleted_at)
  --> API-05 (GP consultation soft-delete works)

DB-08 (pool max:25)
  --> All API endpoints under concurrent load

DB-09 (indexes)
  --> Performance under load (200+ users)

DB-12 (chat_messages table)
  --> API-13 (chat endpoints)
  --> CHAT-03 (chat UI)

WS-01 + WS-02 (client reconnection + error handling)
  --> WS-06 (polling fallback uses connected$ observable)
  --> CHAT-03 (chat needs reliable WebSocket)

API-06 + API-07 (notification mark-as-read)
  --> FE-05 (notification UI mark-as-read)

API-09 (consultation complete)
  --> VID-03 (room cleanup on end)

API-10 + API-11 (pharmacy dispense + history)
  --> FE-03 (pharmacy history page)

VID-01 (embedded video component)
  --> CHAT-03 (chat panel sits alongside video)

INF-01 (render.yaml)
  --> INF-02 (database provisioning)
  --> CI-04 (deploy hook)
  --> All production testing
```

## APPENDIX B: File Index

Every source file referenced in this plan, organized by directory.

```
PROJECT ROOT
  render.yaml ...................... INF-01 (create)
  package.json ..................... INF-03 (add express-rate-limit dep)

DATABASE
  db/schema.sql ................... DB-01 through DB-07 (update CREATE TABLEs)
  db/seed.sql ..................... AUTH-02, AUTH-03 (bcrypt hashes, profiles)
  db/migrations/001-fix-schema-mismatches.sql ..... DB-01 through DB-07 (create)
  db/migrations/002-add-indexes.sql ............... DB-09 (create)
  db/migrations/003-add-chat-messages.sql ......... DB-12/CHAT-01 (create)

SCRIPTS
  scripts/db-init.js .............. DB-10 (add migration runner)

SERVER
  src/server.ts ................... AUTH-01, INF-03, INF-04, INF-05 (modify)
  src/server/db.ts ................ DB-08 (pool max + timeouts)
  src/server/api/index.ts ......... API-13 (register chat router)
  src/server/api/auth.ts .......... API-12 (forgot-password endpoint)
  src/server/api/gp.ts ............ API-01-05, API-09 (verify + complete endpoint)
  src/server/api/patient.ts ....... API-08 (profile update endpoint)
  src/server/api/pharmacy.ts ...... API-10, API-11 (dispense + history endpoints)
  src/server/api/notifications.ts . API-06, API-07 (mark-as-read endpoints)
  src/server/api/chat.ts .......... API-13/CHAT-02 (create)
  src/server/realtime/ws.ts ....... WS-03, WS-05 (heartbeat + auth)
  src/server/integrations/daily.ts  VID-02, VID-03 (tokens + cleanup)
  src/server/middleware/rate-limit.ts ... INF-03 (create)
  src/server/middleware/logger.ts ....... INF-04 (create)

FRONTEND - CORE SERVICES
  src/app/core/realtime/ws.service.ts ........... WS-01, WS-02, WS-04 (rewrite)
  src/app/core/api/notifications.service.ts ..... FE-05, WS-06 (add methods)
  src/app/core/api/pharmacy.service.ts .......... FE-03 (add getHistory method)

FRONTEND - FEATURES
  src/app/features/heal-well/components/video-search/video-search.ts ... FE-01
  src/app/features/heal-well/components/video-search/video-search.html . FE-01
  src/app/features/heal-well/components/video-search/video-search.scss . FE-01
  src/app/features/practitioner-connect/components/preview/preview.ts .. FE-02
  src/app/features/practitioner-connect/components/preview/preview.html  FE-02
  src/app/features/practitioner-connect/components/preview/preview.scss  FE-02
  src/app/features/pharmacy/pharmacy-history/pharmacy-history.ts ....... FE-03
  src/app/features/pharmacy/pharmacy-history/pharmacy-history.html ..... FE-03
  src/app/features/pharmacy/pharmacy-history/pharmacy-history.scss ..... FE-03
  src/app/features/patient/notifications/notifications.component.ts .... FE-05
  src/app/features/patient/notifications/notifications.component.html .. FE-05
  src/app/features/patient/dashboard/dashboard.component.ts ............ PAY-03
  src/app/features/patient/dashboard/dashboard.component.html .......... PAY-03
  src/app/features/patient/profile/profile.component.ts ................ API-08
  src/app/features/patient/waiting/waiting.component.ts ................ VID-01
  src/app/features/auth/components/forgot-password/forgot-password.ts .. FE-08
  src/app/features/dashboard/components/practitioner/practitioner.ts ... VID-01
  src/app/features/dashboard/components/practitioner/practitioner.html . FE-09
  src/app/features/dashboard/components/patient/patient.html ........... FE-09
  src/app/features/specialist/specialist-dashboard/*.html .............. FE-09
  src/app/features/specialist/referral-details/*.html .................. FE-09

FRONTEND - SHARED COMPONENTS (create)
  src/app/shared/components/payment-mock/payment-mock.ts ......... PAY-01
  src/app/shared/components/payment-mock/payment-mock.html ....... PAY-01
  src/app/shared/components/payment-mock/payment-mock.scss ....... PAY-01
  src/app/shared/components/video-room/video-room.ts ............. VID-01
  src/app/shared/components/video-room/video-room.html ........... VID-01
  src/app/shared/components/video-room/video-room.scss ........... VID-01
  src/app/shared/components/chat-panel/chat-panel.ts ............. CHAT-03
  src/app/shared/components/chat-panel/chat-panel.html ........... CHAT-03
  src/app/shared/components/chat-panel/chat-panel.scss ........... CHAT-03

STYLES
  src/app/app.scss ................ FE-09 (coming-soon-badge class)

CI/CD
  .github/workflows/ci.yml ....... CI-04 (add deploy job)

E2E TESTS
  e2e/smoke/provider-logins.smoke.spec.ts ..... CI-03 (create)
```

---

This document is the single source of truth for the HealthHub 2-week beta
sprint. All task assignments, progress tracking, and priority decisions should
reference the task IDs defined herein (DB-01, API-01, FE-01, WS-01, etc.).

When a task is completed, mark it in the team's tracking system with the
corresponding ID. When dependencies change or new issues are discovered, update
this document and note the date of the change.
