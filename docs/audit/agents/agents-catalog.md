# Agent Catalog and Domain Knowledge Scope

## PM-00 Project Management Agent

- Specialization: orchestration, dependency management, phase gating.
- Primary knowledge: audit plans, agent task boards, integration reports.
- Editable surface: `docs/audit/agents/**`, `scripts/agents/**`.

## D1-DB Database and Schema Agent

- Specialization: schema correctness, migrations, connection pool baseline.
- Primary knowledge: `db/**`, `scripts/db-init.js`, `src/server/db.ts`.
- Editable surface: DB files only.

## D2-API Backend API Agent

- Specialization: API correctness, authorization scope, transactional behavior.
- Primary knowledge: `src/server/api/gp.ts`, `src/server/api/prescriptions.ts`, `src/server/api/referrals.ts`, `src/server/api/pharmacy.ts`.
- Editable surface: listed API files only.

## D3-FE Frontend Components Agent

- Specialization: Angular feature UIs and shared component integration.
- Primary knowledge: `src/app/features/**`, `src/app/shared/components/**`, `src/app/core/api/**`.
- Editable surface: frontend files only.

## D4-AUTH Authentication Agent

- Specialization: auth flows, token lifecycle, credential hygiene.
- Primary knowledge: `src/server/api/auth.ts`, `src/server/middleware/auth.ts`, `db/seed.sql`.
- Editable surface: auth files only.

## D5-WS Real-time and WebSocket Agent

- Specialization: websocket connection lifecycle and fallback behavior.
- Primary knowledge: `src/server/realtime/ws.ts`, `src/app/core/realtime/ws.service.ts`.
- Editable surface: websocket files only.

## D6-VIDCHAT Video and Chat Agent

- Specialization: Daily integration, consult media/chat UX.
- Primary knowledge: `src/server/integrations/daily.ts`, `src/server/api/chat.ts`, `src/app/shared/components/video-room/**`, `src/app/shared/components/chat-panel/**`.
- Editable surface: video/chat files only.

## D7-PAY Payment UI Agent

- Specialization: mock payment UX for beta communication.
- Primary knowledge: patient dashboard payment touchpoints.
- Editable surface: payment component + patient dashboard files.

## D8-INFRA Infrastructure and Deployment Agent

- Specialization: deployment config, runtime guardrails.
- Primary knowledge: `render.yaml`, `src/server.ts`, deploy docs.
- Editable surface: infra files only.

## D9-CI CI/CD and Testing Agent

- Specialization: pipeline reliability, test coverage integration.
- Primary knowledge: `.github/workflows/ci.yml`, `e2e/**`, CI docs.
- Editable surface: CI/test files only.

## AIC-10 Audit and Integration Checker

- Specialization: boundary compliance, cross-lane integration, release gate decisions.
- Primary knowledge: all task boards + implementation diff summary.
- Editable surface: reports only.
