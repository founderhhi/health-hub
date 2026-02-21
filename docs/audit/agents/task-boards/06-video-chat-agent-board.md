# D6-VIDCHAT Video and Chat Agent Board

## Editable Scope

- `src/server/integrations/daily.ts`
- `src/server/api/chat.ts`
- `src/app/shared/components/video-room/**`
- `src/app/shared/components/chat-panel/**`

## P1 Review Snapshot

| Item | Status | Notes |
|---|---|---|
| Daily integration review | Missing | No P1 lane evidence published |
| Chat API behavior review | Missing | No P1 endpoint contract snapshot published |
| Shared component readiness | Partial | Component directories are in scope but not queued in prior phase |

## P2 Task Queue

| Task ID | Priority | Status | Notes |
|---|---|---|---|
| P2-VID-01 validate Daily token/session handling | P2 | Done | Added `createMeetingToken(roomName, userName)` and best-effort `deleteRoom(roomUrl)` in `src/server/integrations/daily.ts`. |
| P2-VID-02 align chat API for consultation lifecycle states | P2 | Done | Created `src/server/api/chat.ts` with participant-guarded `POST /:consultationId` and `GET /:consultationId`; message sends restricted to active consultations. |
| P2-VID-03 implement shared video-room updates | P2 | Done | Added standalone `video-room` component with iframe embed plus leave and open-in-new-tab controls. |
| P2-VID-04 implement shared chat-panel updates | P2 | Done | Added standalone `chat-panel` with message list rendering, load/send API calls, and send-state/error handling. |

## Execution Notes

- Chat API route registration in `src/server/api/index.ts` remains pending because this lane had strict write scope outside that file.
