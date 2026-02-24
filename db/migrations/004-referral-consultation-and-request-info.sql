-- Migration 004: Persist specialist referral consultation linkage and request-info state.

ALTER TABLE referrals
  ADD COLUMN IF NOT EXISTS consultation_id uuid REFERENCES consultations(id) ON DELETE SET NULL;

ALTER TABLE referrals
  ADD COLUMN IF NOT EXISTS requested_info_note text;

ALTER TABLE referrals
  ADD COLUMN IF NOT EXISTS requested_info_at timestamptz;

ALTER TABLE referrals
  ADD COLUMN IF NOT EXISTS requested_info_by uuid REFERENCES users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_referrals_consultation_id ON referrals (consultation_id);
