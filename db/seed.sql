-- Seed provider accounts for demo
-- Passwords are demo-only. API will accept either bcrypt or plain string match.

insert into users (role, phone, password_hash, display_name)
values
  ('gp', '+17000000001', 'demo1234', 'Dr Demo GP'),
  ('specialist', '+17000000002', 'demo1234', 'Dr Demo Specialist'),
  ('pharmacist', '+17000000003', 'demo1234', 'Demo Pharmacy Admin'),
  ('lab_tech', '+17000000004', 'demo1234', 'Demo Diagnostics Admin'),
  ('admin', '+17000000009', 'demo1234', 'Demo Admin')
on conflict (phone) do nothing;
