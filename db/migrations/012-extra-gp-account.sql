-- Migration 012: Add a fourth demo GP / Health Expert account
-- Password: bcrypt hash of 'demo1234'

insert into users (role, phone, password_hash, display_name, first_name, last_name, is_operating)
values
  ('gp', '+17000000204', '$2a$10$OE2hhxnWq5T/Z3c3uQQZM.oCYxKCSc0KKpG/xfDtYtdM7iCtxZK2W', 'Dr Demo GP Four', 'Demo', 'GP Four', true)
on conflict (phone) do update set
  password_hash = excluded.password_hash,
  display_name  = excluded.display_name,
  first_name    = excluded.first_name,
  last_name     = excluded.last_name,
  is_operating  = true;
