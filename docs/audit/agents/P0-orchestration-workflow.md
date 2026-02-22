# P1 Review + P2 Execution Workflow

This workflow is the execution contract for the active cycle.

## Goal

Lock a clean P1 status baseline, then execute P2 tasks in parallel with strict boundaries.

## Lane Assignment

- `PM-00`: phase orchestration, dependency sequencing, gate decisions
- `D1-DB`: schema, migrations, db init, pool/runtime db plumbing
- `D2-API`: API route handlers in `src/server/api/{index,gp,pharmacy,prescriptions,referrals,notifications,patient}.ts`
- `D3-FE`: feature wiring, `app.scss`, and core API client files
- `D4-AUTH`: auth API, auth middleware, and seed data
- `D5-WS`: server/client WebSocket + notifications API client integration
- `D6-VIDCHAT`: Daily integration, chat API, shared video/chat components
- `D7-PAY`: payment mock and patient dashboard payment UX
- `D8-INFRA`: server bootstrap, Render config, deploy docs
- `D9-CI`: CI workflow, e2e, execution docs
- `AIC-10`: boundary audit + integration review reports

## Execution Stages

1. `PM-00` updates all boards with P1 snapshots and P2 queues.
2. Domain agents execute only P2 tasks inside owned files.
3. `D9-CI` records build/test/e2e evidence or blockers.
4. `AIC-10` runs boundary and integration checks on merged deltas.
5. `PM-00` closes cycle with pass/fail plus carry-over items.

## Pass Rules

- Every lane has a P1 snapshot (`Done`, `Partial`, or `Missing`).
- Every lane has a concrete P2 queue with owner + status.
- No boundary overlap or cross-agent writes outside allowlist.
- CI/integration evidence is attached, or blockers are explicitly documented.
