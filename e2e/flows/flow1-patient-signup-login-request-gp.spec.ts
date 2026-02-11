import { expect, test } from '@playwright/test';

import { getE2EEnvironment } from '../config/env';
import { loginProvider, loginPatient, signupPatient } from '../helpers/api-auth';
import { listGpQueue, requestGpConsult } from '../helpers/api-flow-setup';
import { retry } from '../helpers/retry';
import { E2E_SELECTORS } from '../helpers/selectors';

const env = getE2EEnvironment();

test.describe('Flow 1: patient signup/login/request GP', () => {
  test.setTimeout(env.timeoutMs);

  test('creates patient and places consult request in GP queue', async ({ page, request }) => {
    const { auth: signupAuth, patient } = await signupPatient(request, env);
    expect(signupAuth.user.role).toBe('patient');

    const patientLogin = await loginPatient(request, patient.phone, patient.password);
    expect(patientLogin.user.id).toBe(signupAuth.user.id);

    const requestRecord = await requestGpConsult(request, patientLogin, `E2E complaint ${patient.runTag}`);
    expect(requestRecord.patient_id).toBe(patientLogin.user.id);

    const gpAuth = await loginProvider(request, env, 'gp');
    const queueItem = await retry(async () => {
      const queue = await listGpQueue(request, gpAuth);
      return queue.find((item) => item.id === requestRecord.id) || null;
    });

    expect(queueItem.status).toBe('waiting');

    await page.goto('/auth/login');
    await expect(page.locator(E2E_SELECTORS.auth.loginPhone)).toBeVisible();
  });
});
