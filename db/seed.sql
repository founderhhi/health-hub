-- Seed provider accounts for demo
-- AUTH-02: Passwords are bcrypt hashed (plaintext: demo1234)
-- AUTH-05: Refresh tokens are stateless JWTs and do not require seed rows

insert into users (role, phone, password_hash, display_name, first_name, last_name, is_operating)
values
  ('patient', '+17000000101', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Patient One', 'Demo', 'Patient One', true),
  ('patient', '+17000000102', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Patient Two', 'Demo', 'Patient Two', true),
  ('patient', '+17000000103', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Patient Three', 'Demo', 'Patient Three', true),

  ('gp', '+17000000201', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo GP One', 'Demo', 'GP One', true),
  ('gp', '+17000000202', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo GP Two', 'Demo', 'GP Two', true),
  ('gp', '+17000000203', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo GP Three', 'Demo', 'GP Three', true),

  ('gp', '+17000000001', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo GP Legacy', 'Demo', 'GP Legacy', true),

  ('specialist', '+17000000301', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo Cardiology', 'Demo', 'Cardiology', true),
  ('specialist', '+17000000302', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo Dermatology', 'Demo', 'Dermatology', true),
  ('specialist', '+17000000303', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo Orthopedics', 'Demo', 'Orthopedics', true),

  ('specialist', '+17000000002', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo Specialist Legacy', 'Demo', 'Specialist Legacy', true),

  ('pharmacist', '+17000000401', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Pharmacy One', 'Demo', 'Pharmacy One', true),
  ('pharmacist', '+17000000402', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Pharmacy Two', 'Demo', 'Pharmacy Two', true),
  ('pharmacy_tech', '+17000000403', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Pharmacy Tech', 'Demo', 'Pharmacy Tech', true),

  ('pharmacist', '+17000000003', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Pharmacy Legacy', 'Demo', 'Pharmacy Legacy', true),

  ('lab_tech', '+17000000501', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Diagnostics One', 'Demo', 'Diagnostics One', true),
  ('lab_tech', '+17000000502', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Diagnostics Two', 'Demo', 'Diagnostics Two', true),
  ('radiologist', '+17000000503', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Radiology', 'Demo', 'Radiology', true),
  ('pathologist', '+17000000504', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Pathology', 'Demo', 'Pathology', true),

  ('lab_tech', '+17000000004', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Diagnostics Legacy', 'Demo', 'Diagnostics Legacy', true),

  ('admin', '+17000000009', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Admin One', 'Demo', 'Admin One', true),
  ('admin', '+17000000010', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Admin Two', 'Demo', 'Admin Two', true)
on conflict (phone) do update set
  role = excluded.role,
  display_name = excluded.display_name,
  password_hash = excluded.password_hash,
  first_name = excluded.first_name,
  last_name = excluded.last_name,
  is_operating = true;

-- AUTH-03: Provider profiles for seeded provider accounts
insert into provider_profiles (user_id, specialty, facility_name)
select u.id, p.specialty, p.facility_name
from (
  values
    ('+17000000201', 'General Practice', 'HealthHub Demo Clinic - Central'),
    ('+17000000202', 'General Practice', 'HealthHub Demo Clinic - North'),
    ('+17000000203', 'General Practice', 'HealthHub Demo Clinic - South'),
    ('+17000000001', 'General Practice', 'HealthHub Demo Clinic - Legacy'),
    ('+17000000301', 'Cardiology', 'HealthHub Specialist Centre - Cardiology'),
    ('+17000000302', 'Dermatology', 'HealthHub Specialist Centre - Dermatology'),
    ('+17000000303', 'Orthopedics', 'HealthHub Specialist Centre - Orthopedics'),
    ('+17000000002', 'General Specialist', 'HealthHub Specialist Centre - Legacy'),
    ('+17000000401', 'Pharmacy', 'HealthPlus Pharmacy - Westlands'),
    ('+17000000402', 'Pharmacy', 'HealthPlus Pharmacy - Riverside'),
    ('+17000000403', 'Pharmacy', 'HealthPlus Pharmacy - Eastgate'),
    ('+17000000003', 'Pharmacy', 'HealthPlus Pharmacy - Legacy'),
    ('+17000000501', 'Laboratory', 'CityLab Diagnostics - Downtown'),
    ('+17000000502', 'Laboratory', 'CityLab Diagnostics - Uptown'),
    ('+17000000503', 'Radiology', 'CityLab Diagnostics - Imaging'),
    ('+17000000504', 'Pathology', 'CityLab Diagnostics - Pathology'),
    ('+17000000004', 'Laboratory', 'CityLab Diagnostics - Legacy')
) as p(phone, specialty, facility_name)
join users u on u.phone = p.phone
on conflict (user_id) do update set
  specialty = excluded.specialty,
  facility_name = excluded.facility_name;

-- Seed notifications for demo patient accounts
insert into notifications (user_id, type, message, read, created_at)
select u.id, n.type, n.message, n.read, now() - (n.age_hours || ' hours')::interval
from users u
cross join (
  values
    ('appointment', 'Your GP consultation has been confirmed for tomorrow at 10:00 AM.', false, 2),
    ('prescription', 'Your prescription for Amoxicillin 500mg is ready for pickup at HealthPlus Pharmacy - Westlands.', false, 5),
    ('lab_result', 'Your blood test results are now available. Please check your records.', false, 8),
    ('system', 'Welcome! Your account has been set up successfully. Explore our services to get started.', true, 24),
    ('consultation', 'A summary of your recent consultation with Dr Demo GP One is now available.', false, 12),
    ('reminder', 'Remember to take your prescribed medication today. Check your prescriptions for details.', false, 1),
    ('system', 'Stay hydrated! Aim to drink at least 8 glasses of water daily for optimal health.', true, 48),
    ('referral', 'You have been referred to a cardiologist. Check your appointments for details.', false, 6),
    ('payment', 'Your payment of £25.00 for the GP consultation has been processed successfully.', true, 36),
    ('appointment', 'Your follow-up appointment with Dr Demo GP Two is scheduled for next week.', false, 3)
) as n(type, message, read, age_hours)
where u.role = 'patient'
on conflict do nothing;
