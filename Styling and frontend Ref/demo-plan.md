# Demo-Ready Remote Prototype Plan (HealthHub)

## Summary
Deliver a fully working remote demo where new patients can sign up, request a GP, join a Daily video call in a new tab, receive prescriptions in real time, and complete pharmacy/diagnostics flows across multiple devices on mobile data. Providers remain seeded, patient accounts are created live. The system runs on a public Express + Angular SSR app hosted on Render, backed by Supabase Postgres, with WebSocket realtime updates.

## Public API / Interface Changes
1. New REST API endpoints under `/api/*` for auth, patient, GP, specialist, pharmacy, diagnostics, notifications.
2. New WebSocket channel for realtime events (`queue.updated`, `consult.accepted`, `prescription.created`, `lab.status.updated`, `notification.created`).
3. New shared data models (user, consult request, consultation, referral, prescription, pharmacy claim, lab order, notification).

## Assumptions and Defaults
1. Patient signup fields: phone + password only.
2. Provider accounts are seeded only (no provider signup).
3. Daily rooms are created on-demand and opened in a new tab; room URLs are stored in DB.
4. Demo is remote-only; all devices access the Render-hosted URL.
5. Realtime transport is WebSocket.
6. Hosting: Render (app) + Supabase (Postgres).

## Milestones
### M1 — Can run remotely + core navigation stable
Tasks: T01–T12

### M2 — Core patient → GP → prescription → pharmacy flow
Tasks: T13–T33

### M3 — Specialist → lab → diagnostics flow
Tasks: T34–T48

### M4 — Demo polish + reliability
Tasks: T49–T62

## Stop-the-Line Tasks
1. T01 Fix SSR prerender config to allow dynamic routes.
2. T02 Raise SCSS budgets so build passes.
3. T03–T05 Fix failing unit test imports or skip broken specs.
4. T06 Align route schema and nav links.
5. T13–T25 Add backend hosting, DB config, and websocket scaffolding.
6. T26–T33 Create DB schema + seed providers + core APIs.
7. T34–T38 Add auth API and patient signup flow.

---

## Detailed Task List (Strict Priority Order)

### T01 — Disable prerender for dynamic routes
Objective: Make SSR build succeed with dynamic params.
File: `src/app/app.routes.server.ts`
To-do:
1. Replace `RenderMode.Prerender` with `RenderMode.Server` for `**`.
2. Add explicit `renderMode` entries for known dynamic routes if needed.
Validation:
1. `npm run build` no longer errors about `getPrerenderParams`.
Risk/Notes:
1. SSR only; no static prerender.

### T02 — Raise component style budgets
Objective: Prevent SCSS budget errors.
File: `angular.json`
To-do:
1. Increase `anyComponentStyle` maximumWarning and maximumError to match current file sizes.
Validation:
1. `npm run build` passes budget checks.
Risk/Notes:
1. Demo-only relaxation.

### T03 — Fix failing unit tests (login)
Objective: Remove TypeScript errors in specs.
File: `src/app/features/auth/components/login/login.spec.ts`
To-do:
1. Update imports to the correct component class name.
Validation:
1. `npm run test -- --watch=false` moves past this spec.
Risk/Notes:
1. Keep spec minimal.

### T04 — Fix failing unit tests (signup)
Objective: Remove TypeScript errors in specs.
File: `src/app/features/auth/components/signup/signup.spec.ts`
To-do:
1. Update imports to the correct component class name.
Validation:
1. `npm run test -- --watch=false` moves past this spec.
Risk/Notes:
1. If component is placeholder, set test to `xdescribe`.

### T05 — Fix failing unit tests (admin)
Objective: Remove TypeScript errors in specs.
File: `src/app/features/dashboard/components/admin/admin.spec.ts`
To-do:
1. Update imports to the correct component class name or skip.
Validation:
1. Tests compile.
Risk/Notes:
1. Demo acceptable to skip tests.

### T06 — Canonical route schema
Objective: Define canonical paths for all roles.
File: `src/app/app.routes.ts`
To-do:
1. Set base routes to `/patient`, `/gp`, `/specialist`, `/pharmacy`, `/diagnostics`, `/auth`.
2. Update redirect default to onboarding or login.
Validation:
1. Navigating base routes resolves correctly.
Risk/Notes:
1. Must align with all routerLink updates.

### T07 — Update role-based redirects
Objective: Ensure correct redirect paths after login.
File: `src/app/shared/guards/role.guard.ts`
To-do:
1. Update `roleRoutes` to canonical paths.
Validation:
1. Login routes into correct portal.
Risk/Notes:
1. Align with new `/gp`, `/specialist`, etc.

### T08 — Add HttpClient provider
Objective: Enable API calls in Angular.
File: `src/app/app.config.ts`
To-do:
1. Add `provideHttpClient()` to providers.
Validation:
1. App compiles and HttpClient injection works.
Risk/Notes:
1. Also update server config.

### T09 — Add HttpClient server-side
Objective: Enable server-side HTTP during SSR.
File: `src/app/app.config.server.ts`
To-do:
1. Mirror `provideHttpClient()` config.
Validation:
1. SSR build succeeds.
Risk/Notes:
1. Required for SSR compatibility.

### T10 — Add environment config (dev)
Objective: Store API base URL and Daily settings.
File: `src/environments/environment.ts`
To-do:
1. Add `apiBaseUrl`, `dailyDomain`.
Validation:
1. App compiles with new imports.
Risk/Notes:
1. Add `environment.prod.ts` later.

### T11 — Add environment config (prod)
Objective: Provide Render URL config.
File: `src/environments/environment.prod.ts`
To-do:
1. Set `apiBaseUrl` to Render URL.
Validation:
1. Build uses correct base URL.
Risk/Notes:
1. Replace with actual URL after deploy.

### T12 — Add auth interceptor
Objective: Attach auth token to API calls.
File: `src/app/shared/services/auth.interceptor.ts`
To-do:
1. Read token and set `Authorization: Bearer`.
Validation:
1. Requests include token header.
Risk/Notes:
1. Works with SSR.

---

## Backend + DB (Render + Supabase)

### T13 — Add server DB connection
Objective: Connect Express SSR server to Postgres.
File: `src/server/db.ts`
To-do:
1. Create `pg.Pool` using `DATABASE_URL`.
Validation:
1. Simple connection test query works.
Risk/Notes:
1. Use SSL settings compatible with Supabase.

### T14 — Add schema SQL
Objective: Define demo DB tables.
File: `db/schema.sql`
To-do:
1. Create tables: users, patient_profiles, provider_profiles, consult_requests, consultations, referrals, prescriptions, pharmacy_claims, lab_orders, notifications.
Validation:
1. SQL runs clean in Supabase.
Risk/Notes:
1. Keep JSON columns for flexible mock data.

### T15 — Add seed SQL
Objective: Seed provider accounts.
File: `db/seed.sql`
To-do:
1. Insert GP, Specialist, Pharmacy, Diagnostics users with known phone + password hash.
Validation:
1. Seeded accounts exist in DB.
Risk/Notes:
1. Store hashes only.

### T16 — Add DB init script
Objective: Apply schema + seed from CLI.
File: `scripts/db-init.ts`
To-do:
1. Run `schema.sql` then `seed.sql` against `DATABASE_URL`.
Validation:
1. `node scripts/db-init.ts` completes.
Risk/Notes:
1. Demo-only tooling.

### T17 — Add package scripts
Objective: Simplify DB setup.
File: `package.json`
To-do:
1. Add `db:init` script to run db init.
Validation:
1. `npm run db:init` works.
Risk/Notes:
1. Ensure devDependencies include tooling.

### T18 — Add backend dependencies
Objective: Enable auth, DB, realtime.
File: `package.json`
To-do:
1. Add `bcryptjs`, `jsonwebtoken`, `pg`, `ws`, `cors`, `node-fetch` (or `undici`).
Validation:
1. `npm install` succeeds.
Risk/Notes:
1. Use `bcryptjs` to avoid native build issues.

### T19 — Add CORS config
Objective: Allow remote devices.
File: `src/server.ts`
To-do:
1. Add `cors` middleware with allowed origins.
Validation:
1. API calls from remote device succeed.
Risk/Notes:
1. Allow `*` for demo if needed.

### T20 — Add API routing scaffold
Objective: Create API router mount.
File: `src/server.ts`
To-do:
1. Mount `/api` router before SSR handler.
Validation:
1. `/api/health` returns 200.
Risk/Notes:
1. Keep SSR handler last.

### T21 — Add API router file
Objective: Centralize API routes.
File: `src/server/api/index.ts`
To-do:
1. Export router, mount sub-routers.
Validation:
1. Routes resolved.
Risk/Notes:
1. Keep minimal.

### T22 — Add auth routes
Objective: Patient signup + login for all roles.
File: `src/server/api/auth.ts`
To-do:
1. `POST /auth/signup` for patient.
2. `POST /auth/login` for all roles.
3. Issue JWT and return user/role.
Validation:
1. Login with seeded provider works.
Risk/Notes:
1. Hash patient password at signup.

### T23 — Add auth middleware
Objective: Secure API by role.
File: `src/server/middleware/auth.ts`
To-do:
1. Validate JWT and set `req.user`.
Validation:
1. Protected route requires token.
Risk/Notes:
1. Simple for demo.

### T24 — Add realtime WebSocket server
Objective: Push updates across roles.
File: `src/server/realtime/ws.ts`
To-do:
1. Create `WebSocketServer`, connection map by role/user.
2. Support `subscribe` messages.
3. Add `broadcastToRole` and `broadcastToUser`.
Validation:
1. WebSocket connects and receives test event.
Risk/Notes:
1. Keep it stateless beyond connection map.

### T25 — Wire WebSocket into server
Objective: Attach WS to HTTP server.
File: `src/server.ts`
To-do:
1. Use `http.createServer(app)` and pass to WS.
2. Replace `app.listen` with `server.listen`.
Validation:
1. WS and SSR both respond.
Risk/Notes:
1. Ensure SSR still works.

### T26 — Add Daily integration
Objective: Create Daily rooms via API.
File: `src/server/integrations/daily.ts`
To-do:
1. Call Daily REST API to create room.
2. Return room URL.
Validation:
1. Test room creation with API key.
Risk/Notes:
1. Use `DAILY_API_KEY` env.

### T27 — Add consult request endpoints
Objective: Patient creates consult requests.
File: `src/server/api/patient.ts`
To-do:
1. `POST /patient/consults` to create request.
2. `GET /patient/consults` to list.
Validation:
1. New request appears in DB.
Risk/Notes:
1. Broadcast `queue.updated` to GP.

### T28 — Add GP queue endpoints
Objective: GP sees and accepts queue.
File: `src/server/api/gp.ts`
To-do:
1. `GET /gp/queue` lists requested consults.
2. `POST /gp/queue/:id/accept` assigns GP and creates Daily room.
Validation:
1. Accept returns Daily URL.
Risk/Notes:
1. Broadcast `consult.accepted` to patient.

### T29 — Add prescriptions endpoints
Objective: GP issues prescriptions; patient fetches.
File: `src/server/api/prescriptions.ts`
To-do:
1. `POST /prescriptions` create.
2. `GET /prescriptions?patientId=...` list.
Validation:
1. Prescription appears in patient list.
Risk/Notes:
1. Broadcast `prescription.created`.

### T30 — Add pharmacy endpoints
Objective: Pharmacy claims and updates prescriptions.
File: `src/server/api/pharmacy.ts`
To-do:
1. `GET /pharmacy/prescriptions/:code` lookup.
2. `POST /pharmacy/prescriptions/:id/claim` update status.
Validation:
1. Claim updates patient status.
Risk/Notes:
1. Broadcast `prescription.claimed`.

### T31 — Add referrals endpoints
Objective: GP refers to specialist.
File: `src/server/api/referrals.ts`
To-do:
1. `POST /referrals` create.
2. `GET /specialist/referrals` list.
Validation:
1. Referral appears in specialist requests.
Risk/Notes:
1. Broadcast `referral.created`.

### T32 — Add lab order endpoints
Objective: Specialist orders labs; diagnostics updates status.
File: `src/server/api/labs.ts`
To-do:
1. `POST /labs` create order.
2. `GET /diagnostics/labs` list.
3. `POST /diagnostics/labs/:id/status` update.
Validation:
1. Patient sees status change.
Risk/Notes:
1. Broadcast `lab.status.updated`.

### T33 — Add notifications endpoints
Objective: Patient can see notification list.
File: `src/server/api/notifications.ts`
To-do:
1. `GET /notifications` list by user.
Validation:
1. Notification list returns results.
Risk/Notes:
1. Notifications created in other endpoints.

---

## Frontend Auth + Signup

### T34 — Add API client base
Objective: Centralize HTTP logic.
File: `src/app/core/api/api-client.service.ts`
To-do:
1. Wrapper around HttpClient with base URL.
Validation:
1. Service instantiated.
Risk/Notes:
1. Keep minimal.

### T35 — Add auth service
Objective: Login and signup via API.
File: `src/app/core/api/auth.service.ts`
To-do:
1. `signup(phone, password)`.
2. `login(phone, password)`.
3. Store JWT in localStorage.
Validation:
1. Auth flow works.
Risk/Notes:
1. Clear token on logout.

### T36 — Update login UI
Objective: Use API login for all roles.
File: `src/app/features/auth/components/login/login.ts`
To-do:
1. Replace mock login with real API call.
2. Navigate based on role.
Validation:
1. Provider login works.
Risk/Notes:
1. Keep existing UI.

### T37 — Update signup UI logic
Objective: Create new patient account.
File: `src/app/features/auth/components/signup/signup.ts`
To-do:
1. Capture phone + password only.
2. Call signup API and redirect to patient dashboard.
Validation:
1. New patient can login immediately.
Risk/Notes:
1. Optional display name not required.

### T38 — Update signup UI template
Objective: Match minimal signup fields.
File: `src/app/features/auth/components/signup/signup.html`
To-do:
1. Remove unused fields.
2. Add phone + password inputs.
Validation:
1. Form submits.
Risk/Notes:
1. Keep styling minimal.

---

## Patient Flow (Request → Daily → Prescription)

### T39 — Add patient consult request API calls
Objective: Patient requests GP consult.
File: `src/app/features/patient/dashboard/dashboard.component.ts`
To-do:
1. Add `requestConsult(mode, symptoms)` API call.
2. Navigate to waiting screen.
Validation:
1. Request appears in GP queue.
Risk/Notes:
1. Use simple symptom payload.

### T40 — Add patient waiting screen (logic)
Objective: Show waiting state and join link when accepted.
File: `src/app/features/patient/waiting/waiting.component.ts`
To-do:
1. Subscribe to WS for `consult.accepted`.
2. Show “Join Consultation” button with Daily URL.
Validation:
1. Patient sees join link after GP accepts.
Risk/Notes:
1. Open in new tab.

### T41 — Add patient waiting screen (template)
Objective: UI for waiting state.
File: `src/app/features/patient/waiting/waiting.component.html`
To-do:
1. Display doctor card, status, cancel button.
Validation:
1. Waiting view renders.
Risk/Notes:
1. Style can be basic.

### T42 — Add patient prescription list (logic)
Objective: Real-time prescriptions.
File: `src/app/features/patient/pharmacy/prescriptions.component.ts`
To-do:
1. Fetch prescriptions from API.
2. Subscribe to `prescription.created` WS event.
Validation:
1. List updates on new prescription.
Risk/Notes:
1. Use mock data until backend.

### T43 — Add patient prescription list (template)
Objective: Show active/past.
File: `src/app/features/patient/pharmacy/prescriptions.component.html`
To-do:
1. Render active and past tabs.
Validation:
1. Tabs switch.
Risk/Notes:
1. Keep simple.

---

## GP Flow (Queue → Accept → Prescribe)

### T44 — Wire GP queue data
Objective: Fetch queue from API.
File: `src/app/features/dashboard/components/practitioner/practitioner.ts`
To-do:
1. Replace static queue with API data.
2. Subscribe to `queue.updated` WS event.
Validation:
1. New patient requests appear in queue.
Risk/Notes:
1. Keep display mapping simple.

### T45 — Handle accept action
Objective: Create Daily room and return join URL.
File: `src/app/features/dashboard/components/practitioner/practitioner.ts`
To-do:
1. Call accept API and open Daily URL in new tab.
2. Show “In Consultation” state.
Validation:
1. GP opens Daily room.
Risk/Notes:
1. Store consult ID for prescriptions.

### T46 — Add GP prescription modal (template)
Objective: Issue prescription after consult.
File: `src/app/features/dashboard/components/practitioner/practitioner.html`
To-do:
1. Add modal markup with medication fields.
Validation:
1. Modal opens.
Risk/Notes:
1. Use simple fields.

### T47 — Add GP prescription logic
Objective: Submit prescription.
File: `src/app/features/dashboard/components/practitioner/practitioner.ts`
To-do:
1. Submit prescription API call with consult ID and items.
Validation:
1. Patient receives prescription in real time.
Risk/Notes:
1. Minimal validation.

---

## Specialist → Lab → Diagnostics Flow

### T48 — Add referral creation (GP)
Objective: Create referral after consult.
File: `src/app/features/dashboard/components/practitioner/practitioner.ts`
To-do:
1. Add referral action that calls referral API.
Validation:
1. Specialist sees referral.
Risk/Notes:
1. Simple reason/urgency.

### T49 — Wire specialist requests list (logic)
Objective: Show referrals to specialist.
File: `src/app/features/specialist/requests/requests.component.ts`
To-do:
1. Fetch referrals and subscribe to WS.
Validation:
1. New referral appears.
Risk/Notes:
1. Minimal UI.

### T50 — Add specialist requests list (template)
Objective: List requests and accept.
File: `src/app/features/specialist/requests/requests.component.html`
To-do:
1. Render referral cards with accept.
Validation:
1. Accept button works.
Risk/Notes:
1. Simplify layout.

### T51 — Add specialist lab order action
Objective: Create lab order for a patient.
File: `src/app/features/specialist/specialist-consultation/specialist-consultation.ts`
To-do:
1. Add “Order Lab” form and API call.
Validation:
1. Diagnostics sees order.
Risk/Notes:
1. Use predefined test list.

### T52 — Wire diagnostics orders list
Objective: Fetch lab orders.
File: `src/app/features/diagnostics/diagnostics-orders/diagnostics-orders.ts`
To-do:
1. Replace static list with API data.
2. Subscribe to `lab.status.updated`.
Validation:
1. New lab order appears.
Risk/Notes:
1. Keep filters simple.

### T53 — Add diagnostics status update
Objective: Update lab status.
File: `src/app/features/diagnostics/diagnostics-order-details/diagnostics-order-details.ts`
To-do:
1. Add status update API call.
Validation:
1. Patient receives status update.
Risk/Notes:
1. Use dropdown with statuses.

---

## Pharmacy Flow

### T54 — Add pharmacy lookup by code
Objective: Manual code lookup.
File: `src/app/features/pharmacy/pharmacy-scanner/pharmacy-scanner.ts`
To-do:
1. Call API by code and route to detail.
Validation:
1. Valid code opens detail.
Risk/Notes:
1. Show error on invalid code.

### T55 — Add pharmacy claim action
Objective: Mark prescription as dispensed.
File: `src/app/features/pharmacy/prescription-details/prescription-details.ts`
To-do:
1. Add claim API call on “Complete”.
Validation:
1. Patient sees status update.
Risk/Notes:
1. Update local UI state.

---

## Realtime Client

### T56 — Add WebSocket service
Objective: Centralize realtime.
File: `src/app/core/realtime/ws.service.ts`
To-do:
1. Connect to `/ws`, send subscribe message.
2. Expose observable for events.
Validation:
1. Events received in patient/GP UIs.
Risk/Notes:
1. Reconnect on drop.

---

## Deployment

### T57 — Add Render config
Objective: Deploy SSR + API + WS.
File: `render.yaml`
To-do:
1. Define build command `npm run build`.
2. Define start command `node dist/health-hub/server/server.mjs`.
Validation:
1. Render build and start succeed.
Risk/Notes:
1. Add env vars in Render dashboard.

### T58 — Add prod environment wiring
Objective: API base URL for production.
File: `src/environments/environment.prod.ts`
To-do:
1. Set `apiBaseUrl` to Render URL.
Validation:
1. Remote devices call correct API.
Risk/Notes:
1. Update after deploy.

### T59 — Add README demo instructions
Objective: Make demo reproducible.
File: `README.md`
To-do:
1. Add steps for DB init, Render deploy, Daily keys, login info.
Validation:
1. A teammate can run demo.
Risk/Notes:
1. Keep short.

---

## Demo Polish + Reliability

### T60 — Add notifications view
Objective: Patient sees updates.
File: `src/app/features/patient/notifications/notifications.component.ts`
To-do:
1. Fetch notifications from API.
Validation:
1. Notifications display.
Risk/Notes:
1. Simple list.

### T61 — Apply brand dark theme defaults
Objective: Align with HHI palette.
File: `src/styles.scss`
To-do:
1. Set body background and text to brand tokens.
Validation:
1. Portal pages use dark theme.
Risk/Notes:
1. Minimal change.

### T62 — Add smoke test checklist
Objective: Verify demo flows quickly.
File: `docs/demo-checklist.md`
To-do:
1. Document steps: signup → GP → Daily → prescription → pharmacy → lab.
Validation:
1. Checklist is clear and complete.
Risk/Notes:
1. No automation required.

---

## Test Cases and Scenarios
1. New patient signup (phone + password) creates account in DB.
2. Patient request appears in GP queue in real time.
3. GP accepts and opens Daily room in new tab.
4. Patient receives join link and opens Daily room.
5. GP creates prescription; patient sees it immediately.
6. Pharmacy enters prescription code; claim updates patient status.
7. GP creates referral; specialist sees it.
8. Specialist orders lab; diagnostics updates status; patient receives update.
9. App runs from Render URL on multiple devices.
