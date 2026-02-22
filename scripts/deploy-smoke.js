/* eslint-disable no-console */

const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_PASSWORD = 'demo1234';
const DEFAULT_RETRY_ATTEMPTS = 12;
const DEFAULT_RETRY_DELAY_MS = 5_000;

const roleCredentials = [
  { label: 'gp', expectedRole: 'gp', phone: process.env.E2E_GP_PHONE || '+17000000001' },
  { label: 'specialist', expectedRole: 'specialist', phone: process.env.E2E_SPECIALIST_PHONE || '+17000000002' },
  { label: 'pharmacy', expectedRole: 'pharmacist', phone: process.env.E2E_PHARMACY_PHONE || '+17000000003' },
  { label: 'diagnostics', expectedRole: 'lab_tech', phone: process.env.E2E_DIAGNOSTICS_PHONE || '+17000000004' },
  { label: 'admin', expectedRole: 'admin', phone: process.env.E2E_ADMIN_PHONE || '+17000000009' }
];

function getBaseUrl() {
  const value = process.env.DEPLOY_BASE_URL || process.env.E2E_BASE_URL;
  if (!value) {
    throw new Error('DEPLOY_BASE_URL (or E2E_BASE_URL) is required, e.g. https://your-app.onrender.com');
  }

  return value.endsWith('/') ? value.slice(0, -1) : value;
}

function getTimeoutMs() {
  const raw = process.env.DEPLOY_SMOKE_TIMEOUT_MS;
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_TIMEOUT_MS;
}

function getRetryAttempts() {
  const raw = process.env.DEPLOY_SMOKE_RETRIES;
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_RETRY_ATTEMPTS;
}

function getRetryDelayMs() {
  const raw = process.env.DEPLOY_SMOKE_RETRY_DELAY_MS;
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_RETRY_DELAY_MS;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function summarizeBody(text) {
  return (text || '').replace(/\s+/g, ' ').slice(0, 220);
}

async function requestJson(url, init, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    const text = await response.text();
    let json = {};
    let parseError = null;

    if (text) {
      try {
        json = JSON.parse(text);
      } catch (error) {
        parseError = error instanceof Error ? error : new Error('Invalid JSON response');
      }
    }

    return { response, json, text, parseError };
  } finally {
    clearTimeout(timer);
  }
}

async function withRetries(label, operation, attempts, delayMs) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : String(error);
      if (attempt === attempts) {
        break;
      }
      console.warn(
        `[retry] ${label} attempt ${attempt}/${attempts} failed: ${message}. Retrying in ${delayMs}ms...`
      );
      await sleep(delayMs);
    }
  }

  throw lastError instanceof Error ? lastError : new Error(`${label} failed.`);
}

async function verifyLiveness(baseUrl, timeoutMs) {
  const { response, json, text, parseError } = await requestJson(
    `${baseUrl}/api/healthz`,
    { method: 'GET' },
    timeoutMs
  );
  if (!response.ok) {
    throw new Error(`Liveness check failed (${response.status}): ${summarizeBody(text)}`);
  }

  if (parseError) {
    throw new Error(`Liveness check returned non-JSON payload: ${summarizeBody(text)}`);
  }

  if (json?.ok !== true) {
    throw new Error(`Liveness response not ready: ${JSON.stringify(json)}`);
  }

  console.log('Liveness check passed (/api/healthz).');
}

async function verifyReadiness(baseUrl, timeoutMs) {
  const readinessEndpoints = ['/api/ready', '/api/health'];
  let lastError = null;

  for (const endpoint of readinessEndpoints) {
    try {
      const { response, json, text, parseError } = await requestJson(
        `${baseUrl}${endpoint}`,
        { method: 'GET' },
        timeoutMs
      );

      if (!response.ok) {
        throw new Error(`Readiness check failed (${response.status}): ${summarizeBody(text)}`);
      }

      if (parseError) {
        throw new Error(`Readiness check returned non-JSON payload: ${summarizeBody(text)}`);
      }

      if (json?.ok !== true) {
        throw new Error(`Readiness response not ready: ${JSON.stringify(json)}`);
      }

      if (Object.prototype.hasOwnProperty.call(json, 'db') && json?.db?.ok !== true) {
        throw new Error(`Database readiness is not ready: ${JSON.stringify(json)}`);
      }

      console.log(`Readiness check passed (${endpoint}).`);
      return;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Readiness check failed.');
}

async function verifyRoleLogin(baseUrl, timeoutMs, role) {
  const passwordEnvName = `E2E_${role.label.toUpperCase()}_PASSWORD`;
  const password = process.env[passwordEnvName] || DEFAULT_PASSWORD;

  const { response, json, text, parseError } = await requestJson(
    `${baseUrl}/api/auth/login`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ phone: role.phone, password })
    },
    timeoutMs
  );

  if (!response.ok) {
    throw new Error(`${role.label} login failed (${response.status}): ${summarizeBody(text)}`);
  }

  if (parseError) {
    throw new Error(`${role.label} login returned non-JSON payload: ${summarizeBody(text)}`);
  }

  if (!json?.token || !json?.user?.role) {
    throw new Error(`${role.label} login payload missing token/role: ${JSON.stringify(json)}`);
  }

  if (json.user.role !== role.expectedRole) {
    throw new Error(
      `${role.label} login role mismatch. Expected ${role.expectedRole}, got ${json.user.role}.`
    );
  }

  console.log(`Login passed for ${role.label} (${role.phone}) -> role ${json.user.role}`);
}

async function main() {
  const baseUrl = getBaseUrl();
  const timeoutMs = getTimeoutMs();
  const retryAttempts = getRetryAttempts();
  const retryDelayMs = getRetryDelayMs();

  console.log(`Running deploy smoke checks against ${baseUrl}`);
  console.log(`Request timeout: ${timeoutMs}ms`);
  console.log(`Retry policy: attempts=${retryAttempts}, delay=${retryDelayMs}ms`);

  await withRetries(
    'health checks',
    async () => {
      await verifyLiveness(baseUrl, timeoutMs);
      await verifyReadiness(baseUrl, timeoutMs);
    },
    retryAttempts,
    retryDelayMs
  );

  for (const role of roleCredentials) {
    await withRetries(
      `${role.label} login`,
      () => verifyRoleLogin(baseUrl, timeoutMs, role),
      retryAttempts,
      retryDelayMs
    );
  }

  console.log('Deploy smoke checks passed.');
}

main().catch((error) => {
  console.error(`Deploy smoke checks failed: ${error.message}`);
  process.exit(1);
});
