import { getE2EEnvironment } from './config/env';

async function globalTeardown() {
  const env = getE2EEnvironment();
  const runId = process.env['E2E_RUN_ID'] || env.runId;

  console.log(`[e2e teardown] completed run: ${runId}`);
  console.log('[e2e teardown] cleanup strategy: best-effort by run prefix (no destructive API endpoints available)');
}

export default globalTeardown;
