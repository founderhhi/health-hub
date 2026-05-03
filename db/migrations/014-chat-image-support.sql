-- Migration 014: Add image attachment support to chat messages.
-- Date: 2026-03-28
-- Allows sending base64-encoded images inline with chat messages.

ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS image_data text;
ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS image_mime text;
ALTER TABLE chat_messages ALTER COLUMN message DROP NOT NULL;
