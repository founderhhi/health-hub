-- Migration 006: enforce consultation queue status compatibility and chat schema.

ALTER TABLE consult_requests DROP CONSTRAINT IF EXISTS consult_requests_status_check;
ALTER TABLE consult_requests
  ADD CONSTRAINT consult_requests_status_check
  CHECK (status IN ('waiting', 'accepted', 'cancelled', 'completed', 'removed'));

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id uuid NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_consultation_created_at
  ON chat_messages (consultation_id, created_at);
