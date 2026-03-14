create extension if not exists "uuid-ossp";

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
