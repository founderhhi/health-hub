export interface RoleCredentials {
  phone: string;
  password: string;
}

export interface E2EEnvironment {
  baseUrl: string;
  apiBaseUrl: string;
  timeoutMs: number;
  runId: string;
  patientPassword: string;
  roles: {
    gp: RoleCredentials;
    specialist: RoleCredentials;
    pharmacy: RoleCredentials;
    diagnostics: RoleCredentials;
    admin: RoleCredentials;
  };
}

let cachedEnvironment: E2EEnvironment | null = null;

const DEFAULT_BASE_URL = 'http://127.0.0.1:4000';

function trimTrailingSlash(value: string): string {
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

function readNumber(name: string, fallback: number): number {
  const value = process.env[name];
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function buildRunId(): string {
  if (process.env['E2E_RUN_ID']) {
    return process.env['E2E_RUN_ID'];
  }

  const stamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8);
  return `run-${stamp}-${random}`;
}

export function loadE2EEnvironment(): E2EEnvironment {
  const baseUrl = trimTrailingSlash(process.env['E2E_BASE_URL'] || DEFAULT_BASE_URL);
  const apiBaseUrl = trimTrailingSlash(process.env['E2E_API_BASE_URL'] || `${baseUrl}/api`);

  return {
    baseUrl,
    apiBaseUrl,
    timeoutMs: readNumber('E2E_TIMEOUT_MS', 15000),
    runId: buildRunId(),
    patientPassword: process.env['E2E_PATIENT_PASSWORD'] || 'Demo1234',
    roles: {
      gp: {
        phone: process.env['E2E_GP_PHONE'] || '+17000000001',
        password: process.env['E2E_GP_PASSWORD'] || 'demo1234'
      },
      specialist: {
        phone: process.env['E2E_SPECIALIST_PHONE'] || '+17000000002',
        password: process.env['E2E_SPECIALIST_PASSWORD'] || 'demo1234'
      },
      pharmacy: {
        phone: process.env['E2E_PHARMACY_PHONE'] || '+17000000003',
        password: process.env['E2E_PHARMACY_PASSWORD'] || 'demo1234'
      },
      diagnostics: {
        phone: process.env['E2E_DIAGNOSTICS_PHONE'] || '+17000000004',
        password: process.env['E2E_DIAGNOSTICS_PASSWORD'] || 'demo1234'
      },
      admin: {
        phone: process.env['E2E_ADMIN_PHONE'] || '+17000000009',
        password: process.env['E2E_ADMIN_PASSWORD'] || 'demo1234'
      }
    }
  };
}

export function getE2EEnvironment(): E2EEnvironment {
  if (!cachedEnvironment) {
    cachedEnvironment = loadE2EEnvironment();
  }

  return cachedEnvironment;
}
