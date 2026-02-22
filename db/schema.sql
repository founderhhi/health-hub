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
  is_operating boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists patient_profiles (
  user_id uuid primary key references users(id) on delete cascade,
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
  status text not null default 'active' check (status in ('active','ended','completed')),
  notes jsonb default '{}'::jsonb,
  started_at timestamptz not null default now(),
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
  created_at timestamptz not null default now()
);

create table if not exists prescriptions (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid not null references users(id) on delete cascade,
  provider_id uuid not null references users(id) on delete set null,
  code text unique not null,
  items jsonb not null default '[]'::jsonb,
  status text not null default 'active' check (status in ('active','claimed','fulfilled')),
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
