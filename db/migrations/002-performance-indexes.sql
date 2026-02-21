-- Migration 002: Add critical performance indexes
-- Date: 2026-02-18
-- Task: DB-09

-- Users
CREATE INDEX IF NOT EXISTS idx_users_phone ON users (phone);
CREATE INDEX IF NOT EXISTS idx_users_role ON users (role);

-- Consult Requests
CREATE INDEX IF NOT EXISTS idx_consult_requests_patient_id ON consult_requests (patient_id);
CREATE INDEX IF NOT EXISTS idx_consult_requests_status ON consult_requests (status);
CREATE INDEX IF NOT EXISTS idx_consult_requests_status_created ON consult_requests (status, created_at);

-- Consultations
CREATE INDEX IF NOT EXISTS idx_consultations_gp_id ON consultations (gp_id);
CREATE INDEX IF NOT EXISTS idx_consultations_patient_id ON consultations (patient_id);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations (status);
CREATE INDEX IF NOT EXISTS idx_consultations_gp_history ON consultations (gp_id, status, gp_deleted);

-- Prescriptions
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON prescriptions (patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_provider_id ON prescriptions (provider_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_status ON prescriptions (status);
CREATE INDEX IF NOT EXISTS idx_prescriptions_code ON prescriptions (code);

-- Pharmacy Claims
CREATE INDEX IF NOT EXISTS idx_pharmacy_claims_prescription_id ON pharmacy_claims (prescription_id);
CREATE INDEX IF NOT EXISTS idx_pharmacy_claims_pharmacy_id ON pharmacy_claims (pharmacy_id);

-- Referrals
CREATE INDEX IF NOT EXISTS idx_referrals_patient_id ON referrals (patient_id);
CREATE INDEX IF NOT EXISTS idx_referrals_to_specialist_id ON referrals (to_specialist_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals (status);

-- Lab Orders
CREATE INDEX IF NOT EXISTS idx_lab_orders_patient_id ON lab_orders (patient_id);
CREATE INDEX IF NOT EXISTS idx_lab_orders_specialist_id ON lab_orders (specialist_id);

-- Notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications (user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications (user_id, read) WHERE read = false;
CREATE INDEX IF NOT EXISTS idx_notifications_user_created ON notifications (user_id, created_at DESC);
