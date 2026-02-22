# Demo Requirements (Notes)

## Core Flow
- Patient can sign up with phone + password and request a GP.
- GP sees the new request in the queue, accepts it, and opens a video room (Daily).
- GP can create a prescription; patient sees it in real time.
- GP can refer to a specialist; specialist sees referral, accepts it, and can order labs.
- Diagnostics can process lab orders and mark results complete.
- Pharmacy can claim prescriptions by code; patient receives updates.

## Demo Constraints
- End-to-end flow must work with real interactions (not just static mocks).
- Mock data is allowed for dashboard stats and preloaded history.
- Remote multi-device demo (no local network assumptions).
- Daily prebuilt UI can open in a new tab (no iframe required).
- Hosted Express API + managed Postgres for persistent state.

## Implementation Guidance
- Optimize for demo readiness over perfection.
- Use stubs/mocks where needed, but keep flows working.
- Keep changes incremental and safe.
