-- 016-patient-tutorial-grievances.sql
-- Adds tutorial_completed flag to patient_profiles.
-- Creates grievances table for patient feedback.
-- Creates feature_interest table for coming-soon notification opt-ins.

ALTER TABLE patient_profiles
  ADD COLUMN IF NOT EXISTS tutorial_completed BOOLEAN NOT NULL DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS grievances (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_grievances_patient_id ON grievances (patient_id);
CREATE INDEX IF NOT EXISTS idx_grievances_status ON grievances (status);

CREATE TABLE IF NOT EXISTS feature_interest (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (patient_id)
);
