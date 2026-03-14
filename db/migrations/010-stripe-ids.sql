-- Migration 010: Add Stripe identifiers to billing tables

ALTER TABLE patient_profiles
  ADD COLUMN IF NOT EXISTS stripe_customer_id text;

ALTER TABLE patient_payment_methods
  ADD COLUMN IF NOT EXISTS stripe_payment_method_id text;

ALTER TABLE payment_transactions
  ADD COLUMN IF NOT EXISTS stripe_payment_intent_id text;

CREATE INDEX IF NOT EXISTS idx_patient_profiles_stripe_customer
  ON patient_profiles(stripe_customer_id)
  WHERE stripe_customer_id IS NOT NULL;
