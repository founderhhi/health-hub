import { expect, test } from '@playwright/test';

import { getE2EEnvironment } from '../config/env';
import { loginProvider, signupPatient } from '../helpers/api-auth';
import { createPrescription, listNotifications, listPatientPrescriptions } from '../helpers/api-flow-setup';
import { retry } from '../helpers/retry';
import { E2E_SELECTORS } from '../helpers/selectors';

const env = getE2EEnvironment();

test.describe('Flow 3: GP prescription and patient update', () => {
  test.setTimeout(env.timeoutMs);

  test('creates prescription and validates patient updates', async ({ page, request }) => {
    const { auth: patientAuth } = await signupPatient(request, env);
    const gpAuth = await loginProvider(request, env, 'gp');

    const prescription = await createPrescription(request, gpAuth, patientAuth.user.id, [
      {
        name: 'Amoxicillin',
        dosage: '500mg',
        frequency: '2x/day',
        duration: '7 days'
      }
    ]);
    expect(prescription.patient_id).toBe(patientAuth.user.id);

    const patientPrescription = await retry(async () => {
      const prescriptions = await listPatientPrescriptions(request, patientAuth, patientAuth.user.id);
      return prescriptions.find((item) => item.id === prescription.id) || null;
    });

    expect(patientPrescription.code).toBeTruthy();

    const notification = await retry(async () => {
      const notifications = await listNotifications(request, patientAuth);
      return notifications.find((item) => item.type === 'prescription.created' && item.data?.prescriptionId === prescription.id) || null;
    });

    expect(notification.message).toContain('prescription');

    await page.goto('/auth/forgot-password');
    await expect(page.locator(E2E_SELECTORS.auth.forgotPasswordPhone)).toBeVisible();
  });
});
