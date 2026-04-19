-- 017: add triage_context jsonb to referrals so the patient's pre-consultation
-- symptoms captured via consult_requests flow through to the specialist view.
ALTER TABLE referrals
  ADD COLUMN IF NOT EXISTS triage_context jsonb NOT NULL DEFAULT '{}'::jsonb;
