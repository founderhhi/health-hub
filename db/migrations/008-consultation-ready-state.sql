-- Migration 008: introduce a ready consultation state so sessions only become active when joined.

ALTER TABLE consultations ALTER COLUMN started_at DROP NOT NULL;
ALTER TABLE consultations ALTER COLUMN started_at DROP DEFAULT;
ALTER TABLE consultations ALTER COLUMN status SET DEFAULT 'ready';

ALTER TABLE consultations DROP CONSTRAINT IF EXISTS consultations_status_check;
ALTER TABLE consultations
  ADD CONSTRAINT consultations_status_check
  CHECK (status IN ('ready', 'active', 'ended', 'completed'));
