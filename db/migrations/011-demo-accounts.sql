-- Migration 011: Ensure all demo accounts exist in production DB
-- Root cause: seed.sql runs as a single pool.query() call; if any row fails
-- the entire INSERT is aborted. This migration creates all missing demo accounts
-- individually so they are guaranteed to exist regardless of seed.sql health.
-- Passwords: bcrypt hash of 'demo1234'
-- Also updates legacy plain-text passwords ('demo1234') to bcrypt hashes.

-- ── Users ─────────────────────────────────────────────────────────────────────
insert into users (role, phone, password_hash, display_name, first_name, last_name, is_operating)
values
  -- Patients
  ('patient',      '+17000000101', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Patient One',         'Demo', 'Patient One',         true),
  ('patient',      '+17000000102', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Patient Two',         'Demo', 'Patient Two',         true),
  ('patient',      '+17000000103', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Patient Three',       'Demo', 'Patient Three',       true),

  -- GPs
  ('gp',           '+17000000201', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo GP One',           'Demo', 'GP One',             true),
  ('gp',           '+17000000202', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo GP Two',           'Demo', 'GP Two',             true),
  ('gp',           '+17000000203', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo GP Three',         'Demo', 'GP Three',           true),

  -- Specialists (one per specialty for auto-routing)
  ('specialist',   '+17000000301', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo Cardiology',       'Demo', 'Cardiology',         true),
  ('specialist',   '+17000000302', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo Dermatology',      'Demo', 'Dermatology',        true),
  ('specialist',   '+17000000303', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo Orthopedics',      'Demo', 'Orthopedics',        true),
  ('specialist',   '+17000000304', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo Neurology',        'Demo', 'Neurology',          true),
  ('specialist',   '+17000000305', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo Pediatrics',       'Demo', 'Pediatrics',         true),
  ('specialist',   '+17000000306', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo Oncology',         'Demo', 'Oncology',           true),
  ('specialist',   '+17000000307', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo ENT',              'Demo', 'ENT',                true),
  ('specialist',   '+17000000308', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo Ophthalmology',    'Demo', 'Ophthalmology',      true),

  -- Pharmacists
  ('pharmacist',   '+17000000401', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Pharmacy One',        'Demo', 'Pharmacy One',       true),
  ('pharmacist',   '+17000000402', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Pharmacy Two',        'Demo', 'Pharmacy Two',       true),
  ('pharmacy_tech','+17000000403', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Pharmacy Tech',       'Demo', 'Pharmacy Tech',      true),

  -- Diagnostics
  ('lab_tech',     '+17000000501', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Diagnostics One',     'Demo', 'Diagnostics One',    true),
  ('lab_tech',     '+17000000502', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Diagnostics Two',     'Demo', 'Diagnostics Two',    true),
  ('radiologist',  '+17000000503', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Radiology',           'Demo', 'Radiology',          true),
  ('pathologist',  '+17000000504', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Pathology',           'Demo', 'Pathology',          true),

  -- Extra admin
  ('admin',        '+17000000010', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Admin Two',           'Demo', 'Admin Two',          true)

on conflict (phone) do update set
  password_hash = excluded.password_hash,
  display_name  = excluded.display_name,
  first_name    = excluded.first_name,
  last_name     = excluded.last_name,
  is_operating  = true;

-- Also upgrade legacy plain-text password accounts to bcrypt
update users
set    password_hash = '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W',
       first_name    = coalesce(first_name, 'Demo'),
       is_operating  = true
where  phone in ('+17000000001','+17000000002','+17000000003','+17000000004','+17000000009')
  and  password_hash = 'demo1234';

-- ── Provider profiles for specialists ─────────────────────────────────────────
insert into provider_profiles (user_id, specialty, facility_name)
select u.id, p.specialty, 'Health Hub Demo'
from (values
  ('+17000000301', 'Cardiology'),
  ('+17000000302', 'Dermatology'),
  ('+17000000303', 'Orthopedics'),
  ('+17000000304', 'Neurology'),
  ('+17000000305', 'Pediatrics'),
  ('+17000000306', 'Oncology'),
  ('+17000000307', 'ENT'),
  ('+17000000308', 'Ophthalmology'),
  ('+17000000002', 'General Surgery')
) as p(phone, specialty)
join users u on u.phone = p.phone
on conflict (user_id) do update set
  specialty      = excluded.specialty,
  facility_name  = coalesce(provider_profiles.facility_name, excluded.facility_name);
