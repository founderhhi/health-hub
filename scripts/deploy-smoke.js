/* eslint-disable no-console */

const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_PASSWORD = 'demo1234';

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

async function requestJson(url, init, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    const text = await response.text();
    const json = text ? JSON.parse(text) : {};

    return { response, json, text };
  } finally {
    clearTimeout(timer);
  }
}

async function verifyHealth(baseUrl, timeoutMs) {
  const { response, json, text } = await requestJson(`${baseUrl}/api/health`, { method: 'GET' }, timeoutMs);
  if (!response.ok) {
    throw new Error(`Health check failed (${response.status}): ${text}`);
  }

  if (json?.ok !== true) {
    throw new Error(`Health response not ready: ${JSON.stringify(json)}`);
  }

  if (json?.db?.ok !== true) {
    throw new Error(`Database health is not ready: ${JSON.stringify(json)}`);
  }

  console.log('Health check passed.');
}

async function verifyRoleLogin(baseUrl, timeoutMs, role) {
  const passwordEnvName = `E2E_${role.label.toUpperCase()}_PASSWORD`;
  const password = process.env[passwordEnvName] || DEFAULT_PASSWORD;

  const { response, json, text } = await requestJson(
    `${baseUrl}/api/auth/login`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ phone: role.phone, password })
    },
    timeoutMs
  );

  if (!response.ok) {
    throw new Error(`${role.label} login failed (${response.status}): ${text}`);
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

  console.log(`Running deploy smoke checks against ${baseUrl}`);
  console.log(`Request timeout: ${timeoutMs}ms`);

  await verifyHealth(baseUrl, timeoutMs);
  for (const role of roleCredentials) {
    await verifyRoleLogin(baseUrl, timeoutMs, role);
  }

  console.log('Deploy smoke checks passed.');
}

main().catch((error) => {
  console.error(`Deploy smoke checks failed: ${error.message}`);
  process.exit(1);
});
