-- Migration 005: Enforce consult request status constraint to include `removed`
-- and clean up stale waiting requests that have already exceeded the timeout window.

ALTER TABLE consult_requests DROP CONSTRAINT IF EXISTS consult_requests_status_check;
ALTER TABLE consult_requests
  ADD CONSTRAINT consult_requests_status_check
  CHECK (status IN ('waiting', 'accepted', 'cancelled', 'completed', 'removed'));

-- One-time cleanup: stale waiting requests should be treated as timed out.
UPDATE consult_requests
SET status = 'removed',
    removed_at = COALESCE(removed_at, now()),
    removed_reason = COALESCE(removed_reason, 'timeout')
WHERE status = 'waiting'
  AND created_at < now() - interval '15 minutes';
