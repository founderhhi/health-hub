# D5-WS Real-time and WebSocket Agent Board

## Editable Scope

- `src/server/realtime/ws.ts`
- `src/app/core/realtime/ws.service.ts`
- `src/app/core/api/notifications.service.ts`

## P1 Review Snapshot

| Item | Status | Notes |
|---|---|---|
| WS runtime behavior review | Missing | No lane-specific P1 runtime evidence yet |
| Notification payload alignment | Missing | Needs explicit contract check against `D2-API` |
| Client reconnect strategy review | Missing | No documented baseline in current boards |

## P2 Task Queue

| Task ID | Priority | Status | Notes |
|---|---|---|---|
| P2-WS-01 verify server WS channel/auth flow (WS-05) | P2 | Done | JWT token accepted via `?token=...`, verified against `JWT_SECRET`, unauthorized sockets closed with `1008`; WS now rejects refresh tokens (`tokenType !== access`) and subscribe identity remains claim-derived (`src/server/realtime/ws.ts`). |
| P2-WS-02 align client WS service with new event contracts (WS-06) | P2 | Done | Added `connectionState$`, JWT query-token URL construction, and disconnect fallback ticker that emits `notifications.refresh.fallback` until reconnect (`src/app/core/realtime/ws.service.ts`). |
| P2-WS-03 wire notification service to finalized event payloads | P2 | Done | `refreshTriggers$` remains compatible with both `notifications.refresh` and `notifications.refresh.fallback` event names, plus domain WS events (`src/app/core/api/notifications.service.ts`). |
| P2-WS-04 publish WS failure-mode checklist | P2 | Done | Health exports remain stable and available as `getWsHealthMetrics` and `getWsHealthStatus` for infra checks (`src/server/realtime/ws.ts`). |
