-- Migration 009: Patient general details + billing/payment tables

-- Extend patient_profiles with general details fields
ALTER TABLE patient_profiles
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS date_of_birth date,
  ADD COLUMN IF NOT EXISTS gender text,
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS emergency_contact jsonb DEFAULT '{}'::jsonb;

-- Payment methods table (no real processing - UI scaffold for Stripe integration)
CREATE TABLE IF NOT EXISTS patient_payment_methods (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_brand text NOT NULL DEFAULT 'visa' CHECK (card_brand IN ('visa', 'mastercard', 'amex', 'discover', 'other')),
  card_last4 text NOT NULL,
  card_expiry text NOT NULL,
  card_holder text,
  is_default boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Payment transactions table (spending history)
CREATE TABLE IF NOT EXISTS payment_transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount_cents integer NOT NULL,
  currency text NOT NULL DEFAULT 'GBP',
  description text,
  service_type text CHECK (service_type IN ('consultation', 'prescription', 'lab', 'referral', 'other')),
  status text NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  card_last4 text,
  payment_method_id uuid REFERENCES patient_payment_methods(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payment_methods_user ON patient_payment_methods(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_user ON payment_transactions(user_id, created_at DESC);
