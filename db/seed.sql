-- Seed provider accounts for demo
-- AUTH-02: Passwords are bcrypt hashed (plaintext: demo1234)
-- AUTH-05: Refresh tokens are stateless JWTs and do not require seed rows

insert into users (role, phone, password_hash, display_name, first_name, last_name)
values
  ('gp', '+17000000001', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo GP', 'Demo', 'GP'),
  ('specialist', '+17000000002', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo Specialist', 'Demo', 'Specialist'),
  ('pharmacist', '+17000000003', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Pharmacy Admin', 'Demo', 'Pharmacy'),
  ('lab_tech', '+17000000004', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Diagnostics Admin', 'Demo', 'Diagnostics'),
  ('admin', '+17000000009', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Demo Admin', 'Demo', 'Admin')
on conflict (phone) do update set password_hash = excluded.password_hash, first_name = excluded.first_name, last_name = excluded.last_name;

-- AUTH-03: Provider profiles for seeded provider accounts
insert into provider_profiles (user_id, specialty, facility_name)
select id, 'General Practice', 'HealthHub Demo Clinic'
from users where phone = '+17000000001'
on conflict (user_id) do nothing;

insert into provider_profiles (user_id, specialty, facility_name)
select id, 'Cardiology', 'HealthHub Specialist Centre'
from users where phone = '+17000000002'
on conflict (user_id) do nothing;

insert into provider_profiles (user_id, specialty, facility_name)
select id, 'Pharmacy', 'HealthPlus Pharmacy - Westlands'
from users where phone = '+17000000003'
on conflict (user_id) do nothing;

insert into provider_profiles (user_id, specialty, facility_name)
select id, 'Laboratory', 'CityLab Diagnostics Center'
from users where phone = '+17000000004'
on conflict (user_id) do nothing;
