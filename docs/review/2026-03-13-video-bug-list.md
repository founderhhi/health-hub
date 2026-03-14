# Video Bug Review - March 13, 2026

Source recordings:
- `Screen Recording 2026-03-13 at 4.29.22 PM.mov` - patient-side UI/UX review
- `Screen Recording 2026-03-13 at 4.28.49 PM.mov` - GP-side UI/UX review
- `Screen Recording 2026-03-13 at 4.30.28 PM.mov` - patient/GP consultation workflow, naming, and messaging review

This note is intentionally a review artifact, not an implementation plan yet.

## Video 1 - Patient-side UI/UX (`4.29.22 PM`, 48.9s)

### P-01. Patient home cards are visually unreadable on first load
- Evidence: around `00:06` the top summary cards and service cards render with very dark fills and low-contrast text/icons, making the labels hard to read.
- Impact: the dashboard feels unfinished and users cannot quickly understand available actions.
- Likely areas:
  - `src/app/features/patient/dashboard/dashboard.component.html`
  - `src/app/features/patient/dashboard/dashboard.component.scss`
  - `src/app/shared/styles/_variables.scss`

### P-01a. Light and dark theme tokens are mixed incorrectly on the patient dashboard
- Evidence:
  - the first recording shows different breakage between light and dark mode
  - code confirms the dashboard is using hard-coded dark surfaces (`v.$color-surface-1`, `v.$color-surface-2`) inside a theme-aware page
- Impact: light mode renders with dark cards, while dark mode and light mode do not behave consistently.
- Likely areas:
  - `src/app/features/patient/dashboard/dashboard.component.scss`
  - `src/app/shared/styles/_variables.scss`

### P-02. Floating AI bubble overlaps core dashboard actions
- Evidence: around `00:06` to `00:18` the `HealthHub AI` bubble sits on top of the service cards and near the bottom navigation hit area.
- Impact: important CTAs are visually obstructed and touch targets are easier to miss.
- Likely areas:
  - `src/app/shared/components/ai-chat-bubble/ai-chat-bubble.component.html`
  - `src/app/shared/components/ai-chat-bubble/ai-chat-bubble.component.scss`
  - `src/app/features/patient/dashboard/dashboard.component.scss`

### P-03. Bottom-nav transitions feel broken because screens hard-cut to full-page loaders
- Evidence:
  - `00:30` shows `Loading records...`
  - `00:36` shows `Loading appointments...`
- Impact: tapping a nav item looks like the page failed, especially on mobile, because the previous screen disappears before the destination content is ready.
- Likely areas:
  - `src/app/features/patient/records/records.component.html`
  - `src/app/features/patient/appointments/appointments.component.html`
  - `src/app/shared/components/bottom-nav/bottom-nav.component.ts`

### P-04. Records and appointments flows do not provide a reassuring first meaningful state
- Evidence: the recordings spend visible time on loading-only screens instead of quickly landing on either cached content, skeletons, or an empty state.
- Impact: users may think the tab switch failed or the app is frozen.
- Likely areas:
  - `src/app/features/patient/records/records.component.ts`
  - `src/app/features/patient/appointments/appointments.component.ts`

### P-04a. Patient bottom-nav and service navigation likely create the "double-tap" feeling
- Evidence:
  - user report: a first tap often lands on a loading shell, and a second tap is needed before the destination feels usable
  - code pattern: records, appointments, profile, and AI chat all fetch on `ngOnInit()` and show route-level loading states rather than keeping prior content visible
- Impact: mobile navigation feels unreliable across the patient app, not just on one icon.
- Likely areas:
  - `src/app/shared/components/bottom-nav/bottom-nav.component.ts`
  - `src/app/features/patient/records/records.component.ts`
  - `src/app/features/patient/appointments/appointments.component.ts`
  - `src/app/features/patient/profile/profile.component.ts`
  - `src/app/features/patient/ai-chat/ai-chat.component.ts`

### P-04b. Patient dashboard summary cards can falsely show zero on slow or failed requests
- Evidence:
  - user report: prescriptions and related summary stats often show `0` until navigating home again
  - code confirms `loadStats()` replaces timeout/error cases with empty arrays, which are rendered as real zero values
- Impact: temporary data-fetch problems are shown as real patient data, which is misleading.
- Likely areas:
  - `src/app/features/patient/dashboard/dashboard.component.ts`
  - `src/app/core/api/patient.service.ts`
  - `src/app/core/api/prescriptions.service.ts`

### P-05. AI chat page looks empty and under-explained
- Evidence: around `00:42` the page shows a mostly blank screen with `0/15 messages used` and a small input field, with little context or onboarding.
- Impact: users do not get a clear sense of what the AI chat is for, what to ask, or whether it is working.
- Likely areas:
  - `src/app/features/patient/ai-chat/ai-chat.component.html`
  - `src/app/features/patient/ai-chat/ai-chat.component.scss`

## Video 2 - GP-side UI/UX (`4.28.49 PM`, 30.1s)

### G-01. Schedule and Patients are presented as real navigation, but they are still stubs
- Evidence:
  - around `00:21` the bottom nav highlights `Schedule`
  - around `00:24` the page still shows dashboard content and a notice says `Schedule view is coming soon.`
- Impact: the UI promises fully available destinations that do not actually exist yet.
- Likely areas:
  - `src/app/features/dashboard/components/practitioner/practitioner.html`
  - `src/app/features/dashboard/components/practitioner/practitioner.ts`

### G-02. GP navigation state is misleading
- Evidence: the active bottom-nav state changes before the main content changes, so the user can appear to be on `Schedule` while still seeing the dashboard.
- Impact: navigation feels broken and reduces trust in the app shell.
- Likely areas:
  - `src/app/features/dashboard/components/practitioner/practitioner.html`
  - `src/app/features/dashboard/components/practitioner/practitioner.ts`

### G-03. Dashboard stats appear unstable during a normal interaction
- Evidence: the dashboard shows non-zero values earlier in the video, then around `00:27` the same dashboard surface shows `0 Completed Today` and `0m Avg. Session`.
- Impact: providers cannot trust the numbers if they visibly reset or fluctuate without explanation.
- Likely areas:
  - `src/app/features/dashboard/components/practitioner/practitioner.ts`
  - `src/app/core/api/gp.service.ts`

### G-03a. "Completed Today" is not actually calculated for today
- Evidence:
  - user report: the value should reset daily
  - code confirms the dashboard sets `completed` to `this.consultationHistory.length`, which is simply the number of loaded history rows
- Impact: the label says "today" but the metric is a rolling history count.
- Likely areas:
  - `src/app/features/dashboard/components/practitioner/practitioner.ts`
  - `src/server/api/gp.ts`

### G-03b. Average session time is calculated from the wrong population and can be inflated
- Evidence:
  - user report: the average time is unnecessarily high
  - code confirms the average is taken across all returned history durations, not just today's consultations
  - durations are based on `consultations.started_at`, which defaults at consultation creation time and may not reflect the true time the consult actually began
- Impact: the average looks clinically implausible and loses operational value.
- Likely areas:
  - `src/app/features/dashboard/components/practitioner/practitioner.ts`
  - `src/server/api/gp.ts`
  - `db/schema.sql`

### G-03c. Refresh can flash `0 / 0m` because queue and history load independently
- Evidence:
  - user report: refresh sometimes shows all zeros first and then changes
  - code confirms `refreshDashboard()` loads queue and history in parallel, but `loadQueue()` clears the refresh state and calls `syncStats()` before consultation history necessarily returns
- Impact: the dashboard visibly oscillates between empty and populated numbers during a normal refresh.
- Likely areas:
  - `src/app/features/dashboard/components/practitioner/practitioner.ts`

### G-04. GP quick actions need stronger expectation-setting
- Evidence: `My Schedule` and `My Patients` are prominent buttons even though both currently just raise `coming soon` notices.
- Impact: these read like production-ready controls but behave like placeholders.
- Likely areas:
  - `src/app/features/dashboard/components/practitioner/practitioner.html`
  - `src/app/features/dashboard/components/practitioner/practitioner.scss`

## Video 3 - Consultation workflow, naming, and messaging (`4.30.28 PM`, 1m 53.6s)

### W-01. Patient consultation auto-starts without an explicit patient join action
- Evidence:
  - user report: "it started even before I could accept"
  - recording shows the patient moving from waiting into the consultation flow without a clear patient-controlled handoff
  - code confirms this behavior: the waiting page auto-opens the consult shell and sets `autoStartCall` to `true`
- Impact: patients lose control of the handoff, and the behavior feels surprising or broken.
- Likely areas:
  - `src/app/features/patient/waiting/waiting.component.ts`
  - `src/app/features/patient/waiting/waiting.component.html`
  - `src/app/shared/components/consult-shell/consult-shell.ts`

### W-02. Patient/GP naming is inconsistent across the same consultation
- Evidence:
  - around `00:48` the GP side shows `Consultation with Sam`
  - the patient side shows `Consultation with Dr Demo GP`
  - the user also called out that "it is not showing me the right names"
- Impact: users cannot confidently tell who they are connected to, which is especially risky in a clinical workflow.
- Likely areas:
  - `src/app/features/patient/waiting/waiting.component.ts`
  - `src/app/features/dashboard/components/practitioner/practitioner.ts`
  - `src/server/api/gp.ts`
  - `src/server/api/patient.ts`

### W-03. Chat sender identity is ambiguous
- Evidence:
  - around `01:12` the GP chat view shows multiple messages labeled `Sam`
  - the patient side is also showing `Sam` on the message bubble
- Impact: it is hard to tell who sent what, which makes consultation chat unreliable.
- Likely areas:
  - `src/app/shared/components/chat-panel/chat-panel.html`
  - `src/app/shared/components/chat-panel/chat-panel.ts`
  - `src/server/api/chat.ts`

### W-04. Consultation chat state is not synchronized cleanly between patient and GP
- Evidence:
  - around `00:48` one side is still `Loading messages...` while the other side is already in the consultation shell
  - later the conversation appears at different times and in different formats on each side
- Impact: the messaging flow feels laggy and unsafe for real-time care coordination.
- Likely areas:
  - `src/app/shared/components/chat-panel/chat-panel.ts`
  - `src/app/core/realtime/ws.service.ts`
  - `src/server/api/chat.ts`
  - `src/server/realtime/ws.ts`

### W-05. Cancel flow exposes contradictory states
- Evidence: around `01:48` the patient screen says `Cancelling your consultation request...` but still shows a green `Join Chat Consultation` button at the same time.
- Impact: the user is told the request is being cancelled while the UI still invites them to enter the consult.
- Likely areas:
  - `src/app/features/patient/waiting/waiting.component.ts`
  - `src/app/features/patient/waiting/waiting.component.html`

### W-06. End-of-consultation state is not fully reflected on the patient side
- Evidence:
  - around `01:36` to `01:48` the GP opens the `End Consultation` modal
  - the patient still appears to be inside an active consultation flow
- Impact: state propagation feels delayed and could leave the patient in a confusing limbo.
- Likely areas:
  - `src/app/shared/components/consult-shell/consult-shell.ts`
  - `src/app/features/patient/waiting/waiting.component.ts`
  - `src/app/features/dashboard/components/practitioner/practitioner.ts`
  - `src/server/realtime/ws.ts`

### W-07. Messaging needs to become a first-class consultation channel, not just an embedded panel
- Evidence: the current chat UI has no participant clarity, no delivery/read cues, no obvious conversation history model, and weak synchronization.
- Impact: this will become harder to maintain as more people work on the product over the next few days.
- Likely areas:
  - `src/app/shared/components/chat-panel/*`
  - `src/server/api/chat.ts`
  - `db/migrations/006-consultation-chat-schema-guard.sql`

## Specialist Workflow Insights

### S-01. Specialist dashboard stats are mostly placeholders
- Evidence: only `pending` is populated in code; `appointments`, `active`, and `patients` are initialized to `0` and never computed from backend data.
- Impact: the specialist dashboard presents production-looking KPIs that are not actually connected to the workflow.
- Likely areas:
  - `src/app/features/specialist/specialist-dashboard/specialist-dashboard.ts`

### S-02. Specialist "Today's Appointments" list is hard-coded demo content
- Evidence: the dashboard HTML contains fixed names and times like `James Wilson`, `Maria Garcia`, and `Robert Taylor` instead of rendering referral data.
- Impact: specialists are shown fake appointment data even when the real referral data is different.
- Likely areas:
  - `src/app/features/specialist/specialist-dashboard/specialist-dashboard.html`

### S-03. Specialist dashboard filters are cosmetic only
- Evidence: the `All`, `GP Referrals`, and `Specialist Referrals` buttons show counts but do not change component state or filter the list.
- Impact: the UI suggests segmentation that does not actually work.
- Likely areas:
  - `src/app/features/specialist/specialist-dashboard/specialist-dashboard.html`
  - `src/app/features/specialist/specialist-dashboard/specialist-dashboard.ts`

### S-04. Specialist dashboard only refreshes on `referral.created`
- Evidence: websocket handling reloads data for `referral.created` only; it does not react to `referral.status` or `referral.request_info`.
- Impact: specialist views can go stale after accepting, declining, or requesting more info from another tab or device.
- Likely areas:
  - `src/app/features/specialist/specialist-dashboard/specialist-dashboard.ts`
  - `src/server/api/referrals.ts`

### S-05. Referral details page mixes real referral data with hard-coded demo content
- Evidence: attachments, insurance, emergency contact, referring physician identity, and portions of the stepper are static placeholders rather than true referral-backed fields.
- Impact: the workflow looks richer than the data model actually supports, which can mislead both users and developers.
- Likely areas:
  - `src/app/features/specialist/referral-details/referral-details.html`
  - `src/app/features/specialist/referral-details/referral-details.ts`

### S-06. "Schedule Appointment" does not schedule an appointment
- Evidence: the action simply navigates to `/specialist/consultation/:id` using the referral id; it does not create or update a scheduled appointment state.
- Impact: the specialist flow conflates accepting a referral, scheduling it, and starting a consultation.
- Likely areas:
  - `src/app/features/specialist/referral-details/referral-details.ts`
  - `src/app/features/specialist/specialist-consultation/specialist-consultation.ts`

### S-07. Specialist consultation falls back to a demo room URL
- Evidence:
  - backend may create a consultation with `DAILY_FALLBACK_ROOM` or `null`
  - frontend sets `dailyRoomUrl = 'https://healthhub.daily.co/demo'` as a default
- Impact: the specialist workflow can open a demo room instead of a consultation-specific, role-safe join link.
- Likely areas:
  - `src/server/api/referrals.ts`
  - `src/app/features/specialist/specialist-consultation/specialist-consultation.ts`

### S-08. Specialist consultation is visually advanced but operationally partial
- Evidence: timer, vitals, and notes controls are static UI; the screen does not use the shared consult shell or join-link token flow used by GP/patient.
- Impact: the specialist path diverges from the rest of the real-time consultation architecture and is likely to drift further.
- Likely areas:
  - `src/app/features/specialist/specialist-consultation/specialist-consultation.html`
  - `src/app/features/specialist/specialist-consultation/specialist-consultation.ts`
  - `src/app/shared/components/consult-shell/consult-shell.ts`

### S-09. Patient appointment history does not represent the full specialist lifecycle
- Evidence: patient appointments treat only `declined` referrals as past items; completed specialist interactions are not classified into a real past state.
- Impact: the patient side under-reports completed specialist journeys and weakens trust in appointment history.
- Likely areas:
  - `src/app/features/patient/appointments/appointments.component.ts`
  - `src/server/api/referrals.ts`

## Highest-priority items before implementation planning

1. `W-01` auto-start consultation behavior
2. `W-02` incorrect or inconsistent participant names
3. `W-03` and `W-04` unreliable chat identity/sync
4. `W-05` contradictory cancel/join states
5. `G-03a`, `G-03b`, and `G-03c` incorrect GP metric definitions and refresh behavior
6. `P-01a`, `P-04a`, and `P-04b` patient theme/state/navigation reliability issues
7. `S-01` through `S-09` specialist workflow still contains major demo-state gaps
