/* eslint-disable no-console */
const { Pool } = require('pg');

const requiredColumns = [
  { table: 'users', column: 'first_name' },
  { table: 'users', column: 'is_operating' },
  { table: 'referrals', column: 'consultation_id' },
  { table: 'referrals', column: 'requested_info_note' },
  { table: 'referrals', column: 'requested_info_at' },
  { table: 'referrals', column: 'requested_info_by' }
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

    if (missing.length > 0) {
      console.error('DB check failed. Missing columns:');
      for (const item of missing) {
        console.error(`- ${item}`);
      }
      return { ok: false };
    }

    console.log('DB check passed. Required columns are present.');
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
