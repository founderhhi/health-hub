-- HealthHub demo schema (Supabase Postgres)

create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  role text not null check (role in ('patient','gp','doctor','specialist','pharmacist','pharmacy_tech','lab_tech','radiologist','pathologist','admin')),
  phone text unique not null,
  password_hash text not null,
  display_name text,
  first_name text,
  last_name text,
  account_status text not null default 'active' check (account_status in ('active','pending_review','disabled')),
  is_operating boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists patient_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  email text,
  date_of_birth date,
  gender text,
  address text,
  emergency_contact jsonb default '{}'::jsonb,
  notes jsonb default '{}'::jsonb
);

create table if not exists provider_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  specialty text,
  facility_name text,
  notes jsonb default '{}'::jsonb
);

create table if not exists consult_requests (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid not null references users(id) on delete cascade,
  status text not null default 'waiting' check (status in ('waiting','accepted','cancelled','completed','removed')),
  mode text not null default 'video' check (mode in ('video','audio','chat')),
  symptoms jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  removed_at timestamptz,
  removed_reason text,
  removed_by uuid
);

create table if not exists consultations (
  id uuid primary key default uuid_generate_v4(),
  request_id uuid references consult_requests(id) on delete set null,
  patient_id uuid not null references users(id) on delete cascade,
  gp_id uuid references users(id) on delete set null,
  specialist_id uuid references users(id) on delete set null,
  daily_room_url text,
  status text not null default 'ready' check (status in ('ready','active','ended','completed')),
  notes jsonb default '{}'::jsonb,
  started_at timestamptz,
  ended_at timestamptz,
  completed_at timestamptz,
  gp_deleted boolean not null default false,
  gp_deleted_at timestamptz
);

create table if not exists referrals (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid not null references users(id) on delete cascade,
  from_provider_id uuid not null references users(id) on delete set null,
  to_specialist_id uuid references users(id) on delete set null,
  urgency text not null default 'routine' check (urgency in ('routine','urgent','emergency')),
  reason text,
  status text not null default 'new' check (status in ('new','accepted','declined','confirmed')),
  appointment_date date,
  appointment_time time,
  consultation_mode text default 'online' check (consultation_mode in ('online','offline')),
  location text,
  specialty text,
  consultation_id uuid references consultations(id) on delete set null,
  requested_info_note text,
  requested_info_at timestamptz,
  requested_info_by uuid references users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists prescriptions (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid not null references users(id) on delete cascade,
  provider_id uuid not null references users(id) on delete set null,
  code text unique not null,
  items jsonb not null default '[]'::jsonb,
  status text not null default 'active' check (status in ('active','claimed','fulfilled')),
  patient_contacted boolean not null default false,
  patient_contacted_by uuid references users(id) on delete set null,
  patient_contacted_at timestamptz,
  patient_contact_note text,
  created_at timestamptz not null default now()
);

create table if not exists pharmacy_claims (
  id uuid primary key default uuid_generate_v4(),
  prescription_id uuid not null references prescriptions(id) on delete cascade,
  pharmacy_id uuid not null references users(id) on delete set null,
  claimed_at timestamptz not null default now(),
  dispensed_at timestamptz,
  dispensed_items jsonb default '[]'::jsonb
);

create table if not exists chat_messages (
  id uuid primary key default uuid_generate_v4(),
  consultation_id uuid not null references consultations(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_chat_messages_consultation_created_at
  on chat_messages (consultation_id, created_at);

create table if not exists lab_orders (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid not null references users(id) on delete cascade,
  specialist_id uuid not null references users(id) on delete set null,
  tests jsonb not null default '[]'::jsonb,
  status text not null default 'ordered' check (status in ('ordered','in_progress','completed')),
  result_notes text,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  type text not null,
  message text not null,
  data jsonb default '{}'::jsonb,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists admin_activity (
  id uuid primary key default uuid_generate_v4(),
  actor_user_id uuid references users(id) on delete set null,
  action text not null,
  target_user_id uuid references users(id) on delete set null,
  target_phone text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_admin_activity_created_at
  on admin_activity (created_at desc);

create index if not exists idx_admin_activity_target_user_id
  on admin_activity (target_user_id);

create table if not exists admin_workflow_tracking (
  id uuid primary key default uuid_generate_v4(),
  entity_type text not null check (entity_type in ('service_request','referral','prescription')),
  entity_id uuid not null,
  workflow_status text not null check (workflow_status in ('contacted','completed','accepted','rejected','home_delivery','in_service')),
  notes text,
  updated_by uuid references users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists idx_admin_workflow_entity_created
  on admin_workflow_tracking (entity_type, entity_id, created_at desc);

create table if not exists account_access_requests (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null unique references users(id) on delete cascade,
  requested_role text not null check (requested_role in ('gp','specialist','pharmacist','lab_tech','radiologist','pathologist')),
  requested_specialty text,
  organization_name text,
  contacted boolean not null default false,
  review_status text not null default 'new' check (review_status in ('new','under_review','review_completed','account_handed_over')),
  admin_notes text,
  contacted_by uuid references users(id) on delete set null,
  contacted_at timestamptz,
  reviewed_by uuid references users(id) on delete set null,
  reviewed_at timestamptz,
  approved_at timestamptz,
  approved_by uuid references users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_account_access_requests_status_created
  on account_access_requests (review_status, created_at desc);

create index if not exists idx_account_access_requests_contacted
  on account_access_requests (contacted, created_at desc);

-- Migration 009: Patient billing tables (added via 009-patient-billing.sql)

create table if not exists patient_payment_methods (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  card_brand text not null default 'visa' check (card_brand in ('visa', 'mastercard', 'amex', 'discover', 'other')),
  card_last4 text not null,
  card_expiry text not null,
  card_holder text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists payment_transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  amount_cents integer not null,
  currency text not null default 'GBP',
  description text,
  service_type text check (service_type in ('consultation', 'prescription', 'lab', 'referral', 'other')),
  status text not null default 'completed' check (status in ('pending', 'completed', 'failed', 'refunded')),
  card_last4 text,
  payment_method_id uuid references patient_payment_methods(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists idx_payment_methods_user on patient_payment_methods(user_id);
create index if not exists idx_payment_transactions_user on payment_transactions(user_id, created_at desc);
