# HealthHub Project Management Agent System

This directory defines the execution model for the HealthHub audit implementation.

## Agent Topology

- `PM-00` Project Management Agent
- `D1-DB` Database and Schema Agent
- `D2-API` Backend API Agent
- `D3-FE` Frontend Components Agent
- `D4-AUTH` Authentication Agent
- `D5-WS` Real-time and WebSocket Agent
- `D6-VIDCHAT` Video and Chat Agent
- `D7-PAY` Payment UI Agent
- `D8-INFRA` Infrastructure and Deployment Agent
- `D9-CI` CI/CD and Testing Agent
- `AIC-10` Auditing and Code Integration Checker

## Operating Rules

- Strict write allowlist per agent in `docs/audit/agents/agent-boundaries.json`.
- Agents may read the full repository.
- Agents collaborate only through task boards and dependency notes.
- Agents must not edit outside their allowlist.
- Ownership is exclusive per file path/glob to keep parallel execution safe.
- `AIC-10` enforces boundary and integration checks before phase closure.

## Phase Policy

- Current phase: `P1 Review + P2 Execution`.
- P1 review output: each domain board carries a Done/Partial/Missing snapshot.
- P2 execution output: each domain board carries an explicit next task queue.
- Exit criteria for this cycle:
  - P1 review baseline report published.
  - P2 work mapped to owners with no boundary overlap.
  - CI/evidence and integration checks recorded by `D9-CI` and `AIC-10`.
  - Final PM gate decision captured on the PM board.
