import { APIRequestContext, expect } from '@playwright/test';

import { E2EEnvironment } from '../config/env';
import { createPatientSeed, GeneratedPatient } from './test-data';

export interface AuthUser {
  id: string;
  role: string;
  phone: string;
  display_name?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

async function readJson<T>(response: Awaited<ReturnType<APIRequestContext['post']>>, label: string): Promise<T> {
  const bodyText = await response.text();
  expect(
    response.ok(),
    `${label} failed (${response.status()}): ${bodyText}`
  ).toBeTruthy();

  return bodyText ? (JSON.parse(bodyText) as T) : ({} as T);
}

export async function signupPatient(
  api: APIRequestContext,
  env: E2EEnvironment
): Promise<{ auth: AuthResponse; patient: GeneratedPatient }> {
  const patient = createPatientSeed(env.runId, env.patientPassword);
  const response = await api.post('/api/auth/signup', {
    data: {
      phone: patient.phone,
      password: patient.password,
      displayName: patient.displayName
    }
  });

  const auth = await readJson<AuthResponse>(response, 'Patient signup');
  return { auth, patient };
}

export async function loginPatient(
  api: APIRequestContext,
  phone: string,
  password: string
): Promise<AuthResponse> {
  const response = await api.post('/api/auth/login', {
    data: { phone, password }
  });

  return readJson<AuthResponse>(response, 'Patient login');
}

export async function loginProvider(
  api: APIRequestContext,
  env: E2EEnvironment,
  role: keyof E2EEnvironment['roles']
): Promise<AuthResponse> {
  const credentials = env.roles[role];
  const response = await api.post('/api/auth/login', {
    data: {
      phone: credentials.phone,
      password: credentials.password
    }
  });

  return readJson<AuthResponse>(response, `${role} login`);
}
