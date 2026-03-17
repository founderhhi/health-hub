import { Pool } from 'pg';
import * as dns from 'dns';

// Force IPv4 resolution to avoid IPv6 timeout issues on networks without IPv6 support
dns.setDefaultResultOrder('ipv4first');

const connectionString = process.env['DATABASE_URL'];

if (!connectionString) {
  // Fail fast in production; allow local dev to surface clear error.
  console.warn('DATABASE_URL is not set. API calls will fail until it is configured.');
}

const sslEnabled = process.env['DATABASE_SSL'] !== 'false';

export const db = new Pool({
  connectionString,
  ssl: sslEnabled ? { rejectUnauthorized: false } : undefined,
  max: 25,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

// Prevent process crashes on transient idle-client socket failures.
db.on('error', (error) => {
  console.error('Unexpected PostgreSQL pool error on idle client', error);
});

export async function healthCheck(): Promise<boolean> {
  try {
    await db.query('select 1');
    return true;
  } catch (error) {
    console.error('Database health check failed', error);
    return false;
  }
}

let ensureRuntimeSchemaPromise: Promise<void> | null = null;

const REQUIRED_SCHEMA_COLUMNS: Array<{ table: string; column: string }> = [
  { table: 'users', column: 'first_name' },
  { table: 'users', column: 'last_name' },
  { table: 'users', column: 'is_operating' },
  { table: 'consult_requests', column: 'removed_at' },
  { table: 'consult_requests', column: 'removed_reason' },
  { table: 'consult_requests', column: 'removed_by' },
  { table: 'consultations', column: 'completed_at' },
  { table: 'consultations', column: 'gp_deleted' },
  { table: 'consultations', column: 'gp_deleted_at' },
  { table: 'referrals', column: 'consultation_id' },
  { table: 'referrals', column: 'requested_info_note' },
  { table: 'referrals', column: 'requested_info_at' },
  { table: 'referrals', column: 'requested_info_by' },
  { table: 'prescriptions', column: 'patient_contacted' },
  { table: 'prescriptions', column: 'patient_contacted_by' },
  { table: 'prescriptions', column: 'patient_contacted_at' },
  { table: 'prescriptions', column: 'patient_contact_note' },
  { table: 'pharmacy_claims', column: 'dispensed_at' },
  { table: 'pharmacy_claims', column: 'dispensed_items' },
];
const REQUIRED_SCHEMA_CONSTRAINTS: Array<{
  table: string;
  constraint: string;
  mustInclude: string;
}> = [
  {
    table: 'consult_requests',
    constraint: 'consult_requests_status_check',
    mustInclude: "'removed'"
  }
];
const REQUIRED_SCHEMA_TABLES = ['chat_messages', 'admin_workflow_tracking'];
const REQUIRED_SCHEMA_INDEXES = [
  'idx_chat_messages_consultation_created_at',
  'idx_referrals_consultation_id',
  'idx_admin_workflow_entity_created'
];

async function findMissingSchemaColumns() {
  const missing: string[] = [];

  for (const item of REQUIRED_SCHEMA_COLUMNS) {
    const result = await db.query(
      `select 1
       from information_schema.columns
       where table_schema = 'public'
         and table_name = $1
         and column_name = $2`,
      [item.table, item.column]
    );

    if (result.rows.length === 0) {
      missing.push(`${item.table}.${item.column}`);
    }
  }

  return missing;
}

async function findInvalidSchemaConstraints() {
  const invalid: string[] = [];

  for (const item of REQUIRED_SCHEMA_CONSTRAINTS) {
    const result = await db.query(
      `select pg_get_constraintdef(c.oid) as definition
       from pg_constraint c
       join pg_class t on t.oid = c.conrelid
       join pg_namespace n on n.oid = t.relnamespace
       where n.nspname = 'public'
         and t.relname = $1
         and c.conname = $2
       limit 1`,
      [item.table, item.constraint]
    );

    if (result.rows.length === 0) {
      invalid.push(`${item.table}.${item.constraint} missing`);
      continue;
    }

    const definition = String(result.rows[0].definition || '');
    if (!definition.includes(item.mustInclude)) {
      invalid.push(`${item.table}.${item.constraint} missing ${item.mustInclude}`);
    }
  }

  return invalid;
}

async function findMissingSchemaTables() {
  const missing: string[] = [];

  for (const tableName of REQUIRED_SCHEMA_TABLES) {
    const result = await db.query(
      `select to_regclass($1) as table_ref`,
      [`public.${tableName}`]
    );

    if (!result.rows[0]?.table_ref) {
      missing.push(tableName);
    }
  }

  return missing;
}

async function findMissingSchemaIndexes() {
  const missing: string[] = [];

  for (const indexName of REQUIRED_SCHEMA_INDEXES) {
    const result = await db.query(
      `select to_regclass($1) as index_ref`,
      [`public.${indexName}`]
    );

    if (!result.rows[0]?.index_ref) {
      missing.push(indexName);
    }
  }

  return missing;
}

async function ensureConsultRequestStatusConstraintIncludesRemoved(): Promise<void> {
  const result = await db.query(
    `select pg_get_constraintdef(c.oid) as definition
     from pg_constraint c
     join pg_class t on t.oid = c.conrelid
     join pg_namespace n on n.oid = t.relnamespace
     where n.nspname = 'public'
       and t.relname = 'consult_requests'
       and c.conname = 'consult_requests_status_check'
     limit 1`
  );

  const definition = String(result.rows[0]?.definition || '');
  if (definition.includes("'removed'")) {
    return;
  }

  console.warn(
    'Runtime schema repair: updating consult_requests_status_check to include removed status.'
  );
  await db.query(`ALTER TABLE consult_requests DROP CONSTRAINT IF EXISTS consult_requests_status_check;`);
  await db.query(
    `ALTER TABLE consult_requests
     ADD CONSTRAINT consult_requests_status_check
     CHECK (status IN ('waiting', 'accepted', 'cancelled', 'completed', 'removed'));`
  );
}

async function ensureChatMessagesTableAndIndexes(): Promise<void> {
  await db.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  await db.query(
    `CREATE TABLE IF NOT EXISTS chat_messages (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      consultation_id uuid NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
      user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      message text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );`
  );
  await db.query(`CREATE INDEX IF NOT EXISTS idx_chat_messages_consultation_created_at ON chat_messages (consultation_id, created_at);`);
}

async function ensureServiceRequestsTableAndIndexes(): Promise<void> {
  await db.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  await db.query(
    `CREATE TABLE IF NOT EXISTS service_requests (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      patient_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type text NOT NULL,
      status text NOT NULL DEFAULT 'new'
        CHECK (status IN ('new', 'contacted', 'closed')),
      region text,
      city text,
      hospital_name text,
      notes text,
      handled_by uuid REFERENCES users(id) ON DELETE SET NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );`
  );
  await db.query(`CREATE INDEX IF NOT EXISTS idx_service_requests_created_at ON service_requests (created_at desc);`);
  await db.query(`CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests (status, created_at desc);`);
  await db.query(`CREATE INDEX IF NOT EXISTS idx_service_requests_patient_id ON service_requests (patient_id, created_at desc);`);
}

async function ensurePrescriptionAdminColumns(): Promise<void> {
  await db.query(
    `ALTER TABLE prescriptions
       ADD COLUMN IF NOT EXISTS patient_contacted boolean NOT NULL DEFAULT false,
       ADD COLUMN IF NOT EXISTS patient_contacted_by uuid REFERENCES users(id) ON DELETE SET NULL,
       ADD COLUMN IF NOT EXISTS patient_contacted_at timestamptz,
       ADD COLUMN IF NOT EXISTS patient_contact_note text;`
  );
}

async function ensureAdminWorkflowTrackingTableAndIndexes(): Promise<void> {
  await db.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  await db.query(
    `CREATE TABLE IF NOT EXISTS admin_workflow_tracking (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      entity_type text NOT NULL CHECK (entity_type IN ('service_request','referral','prescription')),
      entity_id uuid NOT NULL,
      workflow_status text NOT NULL CHECK (workflow_status IN ('contacted','completed','accepted','rejected','home_delivery','in_service')),
      notes text,
      updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );`
  );
  await db.query(`CREATE INDEX IF NOT EXISTS idx_admin_workflow_entity_created ON admin_workflow_tracking (entity_type, entity_id, created_at desc);`);
}

export async function ensureRuntimeSchema(): Promise<void> {
  if (!connectionString) {
    return;
  }

  if (ensureRuntimeSchemaPromise) {
    return ensureRuntimeSchemaPromise;
  }

  ensureRuntimeSchemaPromise = (async () => {
    await ensureConsultRequestStatusConstraintIncludesRemoved();
    await ensureChatMessagesTableAndIndexes();
    await ensureServiceRequestsTableAndIndexes();
    await ensurePrescriptionAdminColumns();
    await ensureAdminWorkflowTrackingTableAndIndexes();

    const missingColumns = await findMissingSchemaColumns();
    const invalidConstraints = await findInvalidSchemaConstraints();
    const missingTables = await findMissingSchemaTables();
    const missingIndexes = await findMissingSchemaIndexes();
    if (missingColumns.length > 0) {
      throw new Error(
        `Database schema is incompatible. Missing columns: ${missingColumns.join(', ')}. ` +
        'Run migrations before starting the app.'
      );
    }
    if (invalidConstraints.length > 0) {
      throw new Error(
        `Database schema is incompatible. Invalid constraints: ${invalidConstraints.join(', ')}. ` +
        'Run migrations before starting the app.'
      );
    }
    if (missingTables.length > 0) {
      throw new Error(
        `Database schema is incompatible. Missing tables: ${missingTables.join(', ')}. ` +
        'Run migrations before starting the app.'
      );
    }
    if (missingIndexes.length > 0) {
      throw new Error(
        `Database schema is incompatible. Missing indexes: ${missingIndexes.join(', ')}. ` +
        'Run migrations before starting the app.'
      );
    }

    await db.query(`CREATE INDEX IF NOT EXISTS idx_referrals_consultation_id ON referrals (consultation_id);`);
    await db.query(`CREATE INDEX IF NOT EXISTS idx_chat_messages_consultation_created_at ON chat_messages (consultation_id, created_at);`);
    await db.query(`CREATE INDEX IF NOT EXISTS idx_admin_workflow_entity_created ON admin_workflow_tracking (entity_type, entity_id, created_at desc);`);
    console.log('Runtime schema compatibility check passed.');
  })();

  return ensureRuntimeSchemaPromise;
}
