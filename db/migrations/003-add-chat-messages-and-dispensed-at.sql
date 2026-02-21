-- Migration 003: Add pharmacy dispensed timestamp and consultation chat messages.
-- Date: 2026-02-18
-- Tasks: DB-11, DB-12, CHAT-01

ALTER TABLE pharmacy_claims ADD COLUMN IF NOT EXISTS dispensed_at timestamptz;

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id uuid NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_consultation_created_at
  ON chat_messages (consultation_id, created_at);
