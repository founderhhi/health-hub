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
  ssl: sslEnabled ? { rejectUnauthorized: false } : undefined
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
