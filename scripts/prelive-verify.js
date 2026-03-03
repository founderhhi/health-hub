/* eslint-disable no-console */
const { Pool } = require('pg');

const requiredColumns = [
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
  { table: 'pharmacy_claims', column: 'dispensed_items' }
];
const requiredConstraints = [
  {
    table: 'consult_requests',
    constraint: 'consult_requests_status_check',
    mustInclude: "'removed'"
  }
];

const requiredEndpoints = ['/api/healthz', '/api/health', '/api/ready'];

function withTimeout(ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { controller, clear: () => clearTimeout(timer) };
}

async function verifyDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.log('DB check skipped: DATABASE_URL is not set.');
    return { ok: true, skipped: true };
  }

  const pool = new Pool({
    connectionString,
    ssl: process.env.DATABASE_SSL === 'false' ? undefined : { rejectUnauthorized: false }
  });

  try {
    const missing = [];
    const invalidConstraints = [];
    for (const item of requiredColumns) {
      const result = await pool.query(
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

    for (const item of requiredConstraints) {
      const result = await pool.query(
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
        invalidConstraints.push(`${item.table}.${item.constraint} missing`);
        continue;
      }

      const definition = String(result.rows[0].definition || '');
      if (!definition.includes(item.mustInclude)) {
        invalidConstraints.push(`${item.table}.${item.constraint} missing ${item.mustInclude}`);
      }
    }

    if (missing.length > 0) {
      console.error('DB check failed. Missing columns:');
      for (const item of missing) {
        console.error(`- ${item}`);
      }
      return { ok: false };
    }
    if (invalidConstraints.length > 0) {
      console.error('DB check failed. Invalid constraints:');
      for (const item of invalidConstraints) {
        console.error(`- ${item}`);
      }
      return { ok: false };
    }

    console.log('DB check passed. Required columns and constraints are present.');
    return { ok: true };
  } catch (error) {
    console.error('DB check failed with error:', error.message || error);
    return { ok: false };
  } finally {
    await pool.end();
  }
}

async function verifyEndpoints() {
  const baseUrl = (process.env.BASE_URL || process.env.RENDER_EXTERNAL_URL || '').trim();
  if (!baseUrl) {
    console.log('HTTP check skipped: BASE_URL (or RENDER_EXTERNAL_URL) is not set.');
    return { ok: true, skipped: true };
  }

  for (const path of requiredEndpoints) {
    const url = `${baseUrl.replace(/\/$/, '')}${path}`;
    const timeout = withTimeout(10000);
    try {
      const response = await fetch(url, { signal: timeout.controller.signal });
      if (!response.ok) {
        console.error(`HTTP check failed: ${url} returned ${response.status}`);
        return { ok: false };
      }

      if (path === '/api/ready') {
        const body = await response.json();
        if (!body?.ok || !body?.db?.ok) {
          console.error(`Readiness check failed for ${url}:`, JSON.stringify(body));
          return { ok: false };
        }
      }

      console.log(`HTTP check passed: ${url}`);
    } catch (error) {
      console.error(`HTTP check failed for ${url}:`, error.message || error);
      return { ok: false };
    } finally {
      timeout.clear();
    }
  }

  return { ok: true };
}

async function main() {
  const db = await verifyDatabase();
  const http = await verifyEndpoints();
  if (!db.ok || !http.ok) {
    process.exit(1);
  }
  console.log('Pre-live verification passed.');
}

main().catch((error) => {
  console.error('Pre-live verification failed:', error);
  process.exit(1);
});
