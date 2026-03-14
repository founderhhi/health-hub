# Remediation Plan - Patient, GP, Messaging, and Specialist Workflows

Related review:
- `docs/review/2026-03-13-video-bug-list.md`

Date:
- March 13, 2026

Goal:
- Turn the validated video findings into an execution order that stabilizes the patient and GP experience first, then completes the shared consultation and specialist workflow on top of that.

Working assumptions:
- "Completed Today" means consultations completed between local midnight and now on the viewer's current calendar day. For example, on March 13, 2026 it should count only consultations completed on March 13, 2026.
- The specialist workflow should converge toward the same consultation architecture used by patient and GP, not keep a separate demo-style implementation.
- Patient tab switches should feel instant even when data is still loading; loading should not look like a failed navigation.

## Success Criteria

- Patient navigation works on a single tap and no tab looks "stuck" behind a blank loading shell.
- Patient light mode and dark mode both render correctly with consistent token usage.
- GP dashboard metrics are stable across refreshes and match their labels.
- Patient consultation handoff is explicit and predictable.
- Messaging shows the correct participant names and stays synchronized across patient, GP, and specialist consults.
- Specialist screens stop showing fake/demo data where real workflow data should appear.

## Recommended Execution Order

1. Lock the shared data contracts for consultation state, participant identity, and GP metrics.
2. Fix patient navigation and theme reliability.
3. Fix consultation handoff, cancel state, and chat identity/sync.
4. Fix GP metric definitions and refresh behavior.
5. Rebuild the specialist workflow on the shared consultation model.
6. Add regression coverage for all four workstreams.

## Phase 0 - Contract Lock

Purpose:
- Prevent duplicate fixes by agreeing on the data model before changing multiple screens.

Tasks:
- Define a single consultation lifecycle:
  - `waiting -> accepted -> joined -> active -> completed`
  - `waiting -> cancelled`
  - `waiting -> removed`
- Define a single participant payload shape returned anywhere consultation UI needs names:
  - patient display name
  - GP display name
  - specialist display name
  - sender label for chat
  - sender role for chat
- Define GP metric rules:
  - `Waiting`: current queue count only
  - `Active Sessions`: live active consults only
  - `Completed Today`: consultations completed on the current local day only
  - `Avg. Session`: average duration of today's completed consults only
- Decide whether `started_at` should mean "consultation record created" or "consult actually joined". The current bugs suggest we should add or use a true join/start event timestamp for duration math.

Done when:
- Backend and frontend both consume the same field names for participant display and consult status.
- Metric labels and SQL definitions match exactly.

## Phase 1 - Patient Reliability

Priority:
- Highest frontend priority after the data contract.

Problems addressed:
- Theme mismatch between light and dark mode
- Single tap leading to a loading shell that feels broken
- Patient stats showing false zero values
- Loading states replacing useful content too aggressively

Implementation steps:
- Replace hard-coded dashboard surfaces with theme-aware CSS variables in:
  - `src/app/features/patient/dashboard/dashboard.component.scss`
  - `src/app/shared/styles/_variables.scss`
- Rework patient bottom-nav state so active state follows router state, not temporary click state.
- Replace route-wide blank loaders with persistent layouts plus skeleton or inline loading blocks in:
  - `src/app/features/patient/records/*`
  - `src/app/features/patient/appointments/*`
  - `src/app/features/patient/profile/*`
  - `src/app/features/patient/ai-chat/*`
- Keep last successful patient tab data on screen while refreshes happen in the background where possible.
- Change patient dashboard summary cards so request failures show a warning state, not a real numeric zero.
- Reposition or constrain the floating AI bubble so it never covers core service cards or bottom-nav touch targets.

Acceptance criteria:
- From the patient dashboard, tapping `Health Records`, `Appointments`, `AI`, or `Profile` once always transitions correctly.
- Loading a patient tab keeps the shell visible and never looks like a broken route change.
- Dashboard summary cards do not temporarily lie with `0` values on slow requests.
- Both light mode and dark mode render readable cards and text.

Verification:
- Add a Playwright mobile test for single-tap patient tab switching.
- Add a visual audit check for light and dark patient dashboard states.

## Phase 2 - Consultation Handoff and Messaging

Priority:
- Highest workflow priority.

Problems addressed:
- Patient consult starts before the patient explicitly joins
- Cancel and join states conflict
- Participant names are inconsistent
- Chat sender labels are ambiguous
- Chat sync is weak across participants

Implementation steps:
- Remove patient auto-open and auto-start behavior from:
  - `src/app/features/patient/waiting/waiting.component.ts`
  - `src/app/features/patient/waiting/waiting.component.html`
  - `src/app/shared/components/consult-shell/consult-shell.ts`
- Keep the patient on the waiting screen after GP acceptance until the patient taps a clear join CTA.
- Add a distinct post-accept waiting state:
  - accepted
  - ready to join
  - joining
  - active
  - completed
  - cancelled
- Normalize naming from backend payloads so patient, GP, and specialist UIs read from the same identity fields.
- Update chat rendering so sender labels reflect:
  - the actual sender display name
  - sender role where needed
  - "You" for own messages
- Tighten chat synchronization:
  - optimistic append for self-send
  - stable dedupe by message id
  - consistent initial history load
  - consistent websocket append behavior
- Prevent any join CTA from rendering while a cancellation is in progress.
- Ensure consultation completion propagates immediately to both sides and closes stale active states.

Acceptance criteria:
- A GP can accept a consult without forcing the patient directly into the consult shell.
- A patient must explicitly tap join before entering the consultation.
- Chat labels make it obvious who sent each message.
- A sent message appears once, in order, on both sides.
- Cancelling a request never shows a contradictory join CTA.

Verification:
- Extend `flow2` to cover patient waiting -> GP accept -> explicit patient join.
- Add a Playwright regression for chat sender identity and message sync.
- Add a test for cancel-during-ready-to-join state.

## Phase 3 - GP Metrics and Refresh Stability

Priority:
- High, but after consultation state and messaging are made trustworthy.

Problems addressed:
- `Completed Today` is a rolling history count
- `Avg. Session` is inflated
- Refresh flashes `0 / 0m`
- Metrics can disagree with their labels

Implementation steps:
- Move "today" calculations to the backend and return explicit metric values rather than deriving them from arbitrary history length on the client.
- Update GP history or dashboard endpoints so they return:
  - completed today count
  - average duration today
  - active consult count
  - waiting queue count
- Filter by local calendar day, not "last 50 items".
- Fix duration semantics:
  - use a true consult start/join timestamp if available
  - otherwise document the fallback and avoid silently inflating the average
- Make dashboard refresh atomic:
  - wait for queue and metric payloads together before replacing displayed stats
  - do not flash zeros between partial responses

Acceptance criteria:
- On March 13, 2026, "Completed Today" counts only consults completed on March 13, 2026.
- Average session time reflects the same day window.
- Refreshing the GP dashboard never briefly shows false zero metrics.

Verification:
- Add backend tests for day-window metric queries.
- Add frontend tests for stable stats across refresh.

## Phase 4 - Specialist Workflow Completion

Priority:
- After shared consultation and messaging are stable.

Problems addressed:
- Specialist dashboard stats are placeholders
- Appointments are hard-coded demo content
- Filters are cosmetic
- Referral details mix live and fake data
- "Schedule Appointment" is not a real scheduling action
- Specialist consultation uses a demo room fallback and a separate architecture
- Patient appointment history does not reflect the full specialist lifecycle

Implementation steps:
- Replace specialist dashboard placeholder stats with real derived data from referrals and consultations.
- Replace hard-coded appointment cards with real referral-backed upcoming items.
- Make dashboard filters functional or remove them until functional.
- Strip or mark any fake referral details data that is not backed by the database.
- Split specialist actions into clear steps:
  - accept referral
  - request more info
  - schedule consultation
  - start consultation
  - complete consultation
- Rebuild specialist consultation to reuse the shared consultation shell and secure join-link flow.
- Remove the demo Daily room fallback from the specialist frontend path.
- Add proper patient appointment lifecycle states so specialist consults move from upcoming to completed/past correctly.

Acceptance criteria:
- Specialist screens no longer show fake appointments or fake workflow data as if it were real.
- Accepting a referral creates the right consultation linkage exactly once.
- Starting a specialist consultation uses a consultation-specific join flow, not a demo URL.
- Patient appointment history reflects accepted, upcoming, and completed specialist interactions correctly.

Verification:
- Extend `flow4` to cover referral acceptance, consultation linkage, and patient-visible appointment state.
- Add a specialist UI regression for dashboard stats and referral actions.

## Phase 5 - Regression Coverage and Release Gate

Purpose:
- Make sure these issues do not reappear while multiple people are editing the site.

Tests to add or extend:
- Patient mobile nav single-tap flow
- Patient dashboard light and dark theme visual checks
- GP accept -> patient explicit join handoff
- Chat identity and synchronization
- GP metrics daily reset and stable refresh
- Specialist referral -> consult -> patient appointment lifecycle

Release gate:
- No false zero metrics on patient or GP dashboards
- No consultation auto-start on the patient side
- No demo-only specialist data in real workflow surfaces
- No ambiguous chat sender labels

## Suggested Task Breakdown

If multiple people are working in parallel, split the work like this:

- Engineer 1:
  - Patient navigation
  - Patient loading states
  - Theme-token cleanup
- Engineer 2:
  - Consultation state machine
  - Chat identity and sync
  - Waiting/cancel/join flow
- Engineer 3:
  - GP metrics backend
  - GP dashboard refresh behavior
  - Metric tests
- Engineer 4:
  - Specialist dashboard cleanup
  - Referral details cleanup
  - Shared consult-shell migration for specialist

## Recommended First Build Slice

Implement this first before touching specialist UI polish:

1. Stop patient auto-start.
2. Fix contradictory cancel/join states.
3. Normalize participant names in consultation and chat payloads.
4. Fix patient nav loading behavior.
5. Fix GP "Completed Today" and "Avg. Session" definitions.

Reason:
- These are the most user-visible trust breakers across the patient and GP flows.
