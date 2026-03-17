-- Admin workflow tracking + prescription patient-contact audit fields

ALTER TABLE prescriptions
  ADD COLUMN IF NOT EXISTS patient_contacted boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS patient_contacted_by uuid REFERENCES users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS patient_contacted_at timestamptz,
  ADD COLUMN IF NOT EXISTS patient_contact_note text;

CREATE TABLE IF NOT EXISTS admin_workflow_tracking (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type text NOT NULL CHECK (entity_type IN ('service_request', 'referral', 'prescription')),
  entity_id uuid NOT NULL,
  workflow_status text NOT NULL CHECK (workflow_status IN ('contacted', 'completed', 'accepted', 'rejected', 'home_delivery', 'in_service')),
  notes text,
  updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admin_workflow_entity_created
  ON admin_workflow_tracking (entity_type, entity_id, created_at DESC);
