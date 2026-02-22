import { expect, test } from '@playwright/test';

import { getE2EEnvironment } from '../config/env';
import { loginProvider, signupPatient } from '../helpers/api-auth';
import {
  claimPrescription,
  createPrescription,
  listNotifications,
  lookupPrescriptionByCode
} from '../helpers/api-flow-setup';
import { retry } from '../helpers/retry';
import { E2E_SELECTORS } from '../helpers/selectors';

const env = getE2EEnvironment();

test.describe('Flow 6: pharmacy claim and patient update', () => {
  test.setTimeout(env.timeoutMs);

  test('claims prescription and validates patient notification', async ({ page, request }) => {
    const { auth: patientAuth } = await signupPatient(request, env);
    const gpAuth = await loginProvider(request, env, 'gp');
    const pharmacyAuth = await loginProvider(request, env, 'pharmacy');

    const prescription = await createPrescription(request, gpAuth, patientAuth.user.id, [
      {
        name: 'Ibuprofen',
        dosage: '200mg',
        frequency: '3x/day',
        duration: '5 days'
      }
    ]);
    expect(prescription.code).toContain('RX-');

    const lookedUp = await lookupPrescriptionByCode(request, pharmacyAuth, prescription.code);
    expect(lookedUp.id).toBe(prescription.id);

    const claimed = await claimPrescription(request, pharmacyAuth, prescription.id);
    expect(claimed.status).toBe('claimed');

    const notification = await retry(async () => {
      const notifications = await listNotifications(request, patientAuth);
      return notifications.find((item) => item.type === 'prescription.claimed' && item.data?.prescriptionId === prescription.id) || null;
    });

    expect(notification.message).toContain('pharmacy');

    await page.goto('/auth/login');
    await expect(page.locator(E2E_SELECTORS.auth.loginSubmit)).toBeVisible();
  });
});
