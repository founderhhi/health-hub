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
const REQUIRED_SCHEMA_TABLES = ['chat_messages'];
const REQUIRED_SCHEMA_INDEXES = [
  'idx_chat_messages_consultation_created_at',
  'idx_referrals_consultation_id'
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

export async function ensureRuntimeSchema(): Promise<void> {
  if (!connectionString) {
    return;
  }

  if (ensureRuntimeSchemaPromise) {
    return ensureRuntimeSchemaPromise;
  }

  ensureRuntimeSchemaPromise = (async () => {
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
    console.log('Runtime schema compatibility check passed.');
  })();

  return ensureRuntimeSchemaPromise;
}
