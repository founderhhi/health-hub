# D3-FE Frontend Components Agent Board

## Editable Scope

- `src/app/features/**/*.route.ts`
- `src/app/features/**/*.routes.ts`
- `src/app/app.scss`
- `src/app/core/api/api-client.service.ts`
- `src/app/core/api/auth.service.ts`
- `src/app/core/api/gp.service.ts`
- `src/app/core/api/labs.service.ts`
- `src/app/core/api/patient.service.ts`
- `src/app/core/api/pharmacy.service.ts`
- `src/app/core/api/prescriptions.service.ts`
- `src/app/core/api/referrals.service.ts`

## P1 Review Snapshot

| Item | Status | Notes |
|---|---|---|
| FE contract alignment review | Missing | No lane-specific P1 review notes recorded |
| Route wiring readiness | Missing | Requires initial P2 route map and ownership checks |
| Core API client baseline | Partial | Existing clients present, but no P1 integration checklist |

## P2 Task Queue

| Task ID | Priority | Status | Notes |
|---|---|---|---|
| FE-06 integrate shared `app-video-room` in patient + GP flows | P2 | Done | Waiting and practitioner flows now use embedded `app-video-room` as primary path, with explicit Open in New Tab fallback controls |
| FE-07 integrate shared `app-chat-panel` in specialist consultation | P2 | Done (follow-up) | Specialist consultation remains integrated; GP accept + patient waiting embedded flows now store accepted consultation IDs and render `app-chat-panel` with valid IDs |
| FE-08 wire forgot-password form to backend endpoint | P2 | Done | Forgot password submit now calls `AuthApiService.forgotPassword()` and surfaces backend generic-success message |
| FE-09 standardize Coming Soon badge styling | P2 | Done | Added shared `app-coming-soon-badge` helper styles in `app.scss` and applied consistent class usage in touched specialist/practitioner UI |
