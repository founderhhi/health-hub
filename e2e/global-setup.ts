import { getE2EEnvironment } from './config/env';
import { retry } from './helpers/retry';

async function fetchHealth(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      return false;
    }

    const data = (await response.json()) as { ok?: boolean };
    return data.ok === true;
  } catch {
    return false;
  }
}

async function globalSetup() {
  const env = getE2EEnvironment();
  const healthUrl = `${env.apiBaseUrl}/health`;

  process.env['E2E_RUN_ID'] = process.env['E2E_RUN_ID'] || env.runId;

  await retry(async () => {
    const ok = await fetchHealth(healthUrl);
    return ok ? true : null;
  }, {
    attempts: 20,
    initialDelayMs: 300,
    maxDelayMs: 2000,
    backoffMultiplier: 1.4
  });
}

export default globalSetup;
