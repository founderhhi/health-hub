-- Migration 001: Add missing GP-related schema fields and status checks.
-- Covers DB-01 through DB-07 from AUDIT-AND-IMPLEMENTATION-PLAN.

ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_operating boolean NOT NULL DEFAULT true;

ALTER TABLE consult_requests ADD COLUMN IF NOT EXISTS removed_at timestamptz;
ALTER TABLE consult_requests ADD COLUMN IF NOT EXISTS removed_reason text;
ALTER TABLE consult_requests ADD COLUMN IF NOT EXISTS removed_by uuid;

ALTER TABLE consult_requests DROP CONSTRAINT IF EXISTS consult_requests_status_check;
ALTER TABLE consult_requests ADD CONSTRAINT consult_requests_status_check
  CHECK (status IN ('waiting', 'accepted', 'cancelled', 'completed', 'removed'));

ALTER TABLE consultations ADD COLUMN IF NOT EXISTS completed_at timestamptz;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS gp_deleted boolean NOT NULL DEFAULT false;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS gp_deleted_at timestamptz;

ALTER TABLE consultations DROP CONSTRAINT IF EXISTS consultations_status_check;
ALTER TABLE consultations ADD CONSTRAINT consultations_status_check
  CHECK (status IN ('active', 'ended', 'completed'));
