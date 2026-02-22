import { expect, test } from '@playwright/test';

import { getE2EEnvironment } from '../config/env';
import { loginProvider, signupPatient } from '../helpers/api-auth';
import {
  createLabOrder,
  createReferral,
  listSpecialistReferrals,
  updateReferralStatus
} from '../helpers/api-flow-setup';
import { retry } from '../helpers/retry';

const env = getE2EEnvironment();

test.describe('Flow 4: referral, specialist accept, lab order', () => {
  test.setTimeout(env.timeoutMs);

  test('creates referral chain through specialist and labs', async ({ page, request }) => {
    const { auth: patientAuth, patient } = await signupPatient(request, env);
    const gpAuth = await loginProvider(request, env, 'gp');
    const specialistAuth = await loginProvider(request, env, 'specialist');

    const referral = await createReferral(request, gpAuth, patientAuth.user.id, `Specialist referral ${patient.runTag}`);
    expect(referral.patient_id).toBe(patientAuth.user.id);

    const specialistReferral = await retry(async () => {
      const referrals = await listSpecialistReferrals(request, specialistAuth);
      return referrals.find((item) => item.id === referral.id) || null;
    });

    expect(specialistReferral.id).toBe(referral.id);

    const acceptedReferral = await updateReferralStatus(request, specialistAuth, referral.id, 'accepted');
    expect(acceptedReferral.status).toBe('accepted');

    const order = await createLabOrder(request, specialistAuth, patientAuth.user.id, ['CBC', 'Lipid Panel']);
    expect(order.patient_id).toBe(patientAuth.user.id);

    await page.goto('/landing');
    await expect(page.getByRole('button', { name: /provider login/i })).toBeVisible();
  });
});
