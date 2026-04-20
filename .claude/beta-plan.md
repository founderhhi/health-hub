# Health Hub Beta Fine-Tuning Plan

## Status Legend
- DONE = Already fixed in codebase
- TODO = Needs work
- LOW = Can defer

---

## GROUP A: Loading & State Bugs

### A1: Bottom nav activeTab not syncing with route
**Status: DONE (already working)**
- `isActive()` uses `router.url.startsWith(tab.route)` as fallback
- This handles programmatic navigation correctly
- The static `activeTab` input is overridden by the URL check
- No fix needed

### A2: Records loading race condition
**Status: DONE (already fixed)**
- `records.component.ts:64-124` now uses `checkDone()` callback pattern
- Both API calls have independent loaded/failed flags
- RxJS `timeout(8000)` routes to error handler cleanly
- `loading` only set to false when BOTH calls complete
- No competing setTimeout anymore

### A3: Patient dashboard silent API failures
**Status: TODO (~1h)**
- `dashboard.component.ts:207-213` — `getActiveConsult()` has NO error handler
- `dashboard.component.ts:236-241` — `loadPrescriptions()` has NO error handler
- `dashboard.component.ts:244-249` — `loadNotifications()` has NO error handler
- **Fix**: Add error handlers to all three. Show user-facing error for prescriptions, silent fallback for notifications count.

### A4: WaitingComponent poll subscriptions leak
**Status: DONE (not a real issue)**
- `setInterval` is cleaned up in `ngOnDestroy` (line 82-85)
- Individual HTTP subscriptions auto-complete when response arrives
- No memory leak in practice

### A5: ChatPanel race condition on consultation switch
**Status: TODO (~0.5h)**
- `chat-panel.ts:88-98` — changing `consultationId` calls `loadMessages()` without canceling previous request
- If old request completes after new one, stale messages overwrite
- **Fix**: Add a `switchMap` pattern or request cancellation flag

### A6: Diagnostics WS subscription leak
**Status: TODO (~0.5h)**
- `diagnostics-orders.ts:122` — `ws.events$.subscribe()` not stored, no `OnDestroy`
- **Fix**: Store subscription, implement `OnDestroy`, unsubscribe

### A7: Notifications optimistic update without rollback
**Status: TODO (~0.5h)**
- `notifications.component.ts:60-66` — `markAsRead()` no error handler
- `notifications.component.ts:69-74` — `markAllAsRead()` no error handler
- **Fix**: Add error handlers that revert `notification.read` on failure, show error toast

### A8: WaitingComponent cancel state lock
**Status: DONE (already fixed)**
- All code paths in `confirmCancel()` properly reset `cancelPending`
- `cancelRequest()` has both next/error handlers (lines 166-176)
- Fallback path also resets on both success and error (lines 149-163)

### A9: Pharmacy scanner camera double-tap
**Status: TODO (~0.25h, LOW)**
- `pharmacy-scanner.ts:112` — check `cameraActive` happens before `await`, so rapid double-tap can start two getUserMedia calls
- **Fix**: Add `requestingCamera` flag set before the await

### A10: Admin notices don't auto-clear
**Status: TODO (~0.5h)**
- `admin-dashboard.ts:71-72` — `actionNotice`/`actionError` persist until tab switch
- **Fix**: Add `setTimeout(() => { this.actionNotice = ''; }, 5000)` after setting notices

---

## GROUP B: Navigation & Flow Fixes

### B1: Specialist bottom nav points to nonexistent route
**Status: TODO (~0.5h)**
- `bottom-nav.component.ts:105-108` — `/provider/specialist/patients` has no component
- **Fix**: Either create a basic patients list page, or remap tab to `/provider/specialist/dashboard`

### B2: Records tab state lost on re-navigation
**Status: DONE (working as designed)**
- Query params preserve tab selection during navigation
- `setTab()` updates URL query params
- On fresh navigation defaults to 'prescriptions' — expected behavior

### B3: Referral details missing per-action loading states
**Status: TODO (~1h)**
- `referral-details.ts` — `orderTests()`, `prescribe()`, `accept()`, `decline()` have no loading indicators
- User can't tell which action is pending
- **Fix**: Add boolean flags per action (e.g., `orderingTests`, `prescribing`, `accepting`, `declining`), disable buttons during request

### B4: Specialist consultation missing loading indicator
**Status: TODO (~0.5h)**
- `specialist-consultation.ts` — no `loading` flag during initial referral fetch
- User sees empty content until API responds
- **Fix**: Add `loading = true` initial state, set false in next/error handlers, show spinner in template

### B5: Standardize user-facing errors with retry across app
**Status: TODO (~2h)**
- Different components use different error patterns
- Beta requires all errors to be user-visible
- **Fix**: Ensure every component shows inline error with retry button when API fails. Standardize the pattern.

---

## GROUP C: Admin Page & Demo Accounts

### C1: Admin subscription cleanup (OnDestroy)
**Status: LOW (not needed)**
- HTTP subscriptions auto-complete, no memory leak risk
- Admin page unlikely to be rapidly created/destroyed
- Skip for now

### C2: Auto-clear success/error notices (same as A10)
**Status: TODO (~0.5h)**
- Covered under A10

### C3: Password policy on admin create-user form
**Status: TODO (~0.5h)**
- Backend enforces >= 8 chars but frontend doesn't validate
- **Fix**: Add frontend validation matching backend rules, show policy hint

### C4: Seed demo accounts
**Status: TODO (~1.5h)**
- Need: 2-3 patient accounts, 2-3 GP accounts, 1 per specialist type, 2-3 pharmacies, 2-3 diagnostics, 1 admin
- Create via admin API or seed SQL
- Use consistent naming pattern for demo credentials
- **Fix**: Add seed accounts to db/seed.sql with bcrypt passwords

---

## SUMMARY: What Actually Needs Work

| Issue | Description | Est. | Priority |
|-------|-------------|------|----------|
| A3 | Dashboard silent API failures | 1h | HIGH |
| A5 | ChatPanel race condition | 0.5h | HIGH |
| A6 | Diagnostics WS subscription leak | 0.5h | MED |
| A7 | Notifications no error rollback | 0.5h | MED |
| A10 | Admin notices auto-clear | 0.5h | MED |
| B1 | Specialist nav broken route | 0.5h | HIGH |
| B3 | Referral details loading states | 1h | MED |
| B4 | Specialist consult loading state | 0.5h | MED |
| B5 | Standardize error display | 2h | HIGH |
| C3 | Admin password policy frontend | 0.5h | MED |
| C4 | Seed demo accounts | 1.5h | HIGH |

**Already fixed (no work needed): A1, A2, A4, A8, B2, C1**
**Low priority defer: A9**

**Total remaining: ~9h of work**

---

## Execution Order (2-day sprint)

### Day 1: Core reliability (deploy as daily release)
1. A3 — Dashboard error handlers (1h)
2. A5 — ChatPanel race condition (0.5h)
3. A6 — Diagnostics subscription cleanup (0.5h)
4. A7 — Notifications error rollback (0.5h)
5. B1 — Fix specialist broken nav tab (0.5h)
6. A10 — Admin notice auto-clear (0.5h)
→ Commit & deploy end of Day 1

### Day 2: UX polish + demo readiness
7. B3 — Referral action loading states (1h)
8. B4 — Specialist consultation loading (0.5h)
9. B5 — Standardize error display across app (2h)
10. C3 — Admin password validation (0.5h)
11. C4 — Seed demo accounts (1.5h)
→ Commit & deploy end of Day 2
