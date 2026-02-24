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

export async function ensureRuntimeSchema(): Promise<void> {
  if (!connectionString) {
    return;
  }

  if (ensureRuntimeSchemaPromise) {
    return ensureRuntimeSchemaPromise;
  }

  ensureRuntimeSchemaPromise = (async () => {
    try {
      // Runtime safety net for production incidents where predeploy migrations were not applied.
      await db.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name text;`);
      await db.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name text;`);
      await db.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS is_operating boolean;`);
      await db.query(`UPDATE users SET is_operating = true WHERE is_operating IS NULL;`);
      await db.query(`ALTER TABLE users ALTER COLUMN is_operating SET DEFAULT true;`);
      await db.query(`ALTER TABLE users ALTER COLUMN is_operating SET NOT NULL;`);

      await db.query(`ALTER TABLE consult_requests ADD COLUMN IF NOT EXISTS removed_at timestamptz;`);
      await db.query(`ALTER TABLE consult_requests ADD COLUMN IF NOT EXISTS removed_reason text;`);
      await db.query(`ALTER TABLE consult_requests ADD COLUMN IF NOT EXISTS removed_by uuid;`);

      await db.query(`ALTER TABLE consultations ADD COLUMN IF NOT EXISTS completed_at timestamptz;`);
      await db.query(`ALTER TABLE consultations ADD COLUMN IF NOT EXISTS gp_deleted boolean NOT NULL DEFAULT false;`);
      await db.query(`ALTER TABLE consultations ADD COLUMN IF NOT EXISTS gp_deleted_at timestamptz;`);

      await db.query(`ALTER TABLE referrals ADD COLUMN IF NOT EXISTS consultation_id uuid;`);
      await db.query(`ALTER TABLE referrals ADD COLUMN IF NOT EXISTS requested_info_note text;`);
      await db.query(`ALTER TABLE referrals ADD COLUMN IF NOT EXISTS requested_info_at timestamptz;`);
      await db.query(`ALTER TABLE referrals ADD COLUMN IF NOT EXISTS requested_info_by uuid;`);

      await db.query(`ALTER TABLE pharmacy_claims ADD COLUMN IF NOT EXISTS dispensed_at timestamptz;`);
      await db.query(`ALTER TABLE pharmacy_claims ADD COLUMN IF NOT EXISTS dispensed_items jsonb DEFAULT '[]'::jsonb;`);

      await db.query(`CREATE INDEX IF NOT EXISTS idx_referrals_consultation_id ON referrals (consultation_id);`);
      console.log('Runtime schema compatibility check complete.');
    } catch (error) {
      console.error('Runtime schema compatibility check failed:', error);
    }
  })();

  return ensureRuntimeSchemaPromise;
}
