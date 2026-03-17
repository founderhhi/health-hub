import { expect, test } from '@playwright/test';

import { getE2EEnvironment } from '../config/env';
import {
  createLabOrder,
  createReferral,
  getReferral,
  loginProviderWithRetry,
  listSpecialistReferrals,
  signupPatientWithRetry,
  updateReferralStatus
} from '../helpers/api-flow-setup';
import { retry } from '../helpers/retry';

const env = getE2EEnvironment();

test.describe('Flow 4: referral, specialist accept, lab order', () => {
  test.setTimeout(env.timeoutMs);

  test('creates referral chain through specialist and labs', async ({ page, request }) => {
    const { auth: patientAuth, patient } = await signupPatientWithRetry(request, env);
    const gpAuth = await loginProviderWithRetry(request, env, 'gp');
    const specialistAuth = await loginProviderWithRetry(request, env, 'specialist');

    const referral = await createReferral(
      request,
      gpAuth,
      patientAuth.user.id,
      `Specialist referral ${patient.runTag}`,
      {
        specialty: 'Cardiology',
        toSpecialistId: specialistAuth.user.id
      }
    );
    expect(referral.patient_id).toBe(patientAuth.user.id);

    const specialistReferral = await retry(async () => {
      const referrals = await listSpecialistReferrals(request, specialistAuth);
      return referrals.find((item) => item.id === referral.id) || null;
    });

    expect(specialistReferral.id).toBe(referral.id);

    const acceptedReferral = await updateReferralStatus(request, specialistAuth, referral.id, 'accepted');
    expect(acceptedReferral.status).toBe('accepted');
    expect(acceptedReferral.to_specialist_id).toBe(specialistAuth.user.id);

    const order = await createLabOrder(request, specialistAuth, patientAuth.user.id, ['CBC', 'Lipid Panel']);
    expect(order.patient_id).toBe(patientAuth.user.id);

    await page.goto('/landing');
    await expect(page.getByRole('button', { name: /provider login/i })).toBeVisible();
  });

  test('broadcasts unassigned referrals and lets first specialist claim by accepting', async ({ request }) => {
    const { auth: patientAuth, patient } = await signupPatientWithRetry(request, env);
    const gpAuth = await loginProviderWithRetry(request, env, 'gp');
    const specialistAuth = await loginProviderWithRetry(request, env, 'specialist');

    const referral = await createReferral(
      request,
      gpAuth,
      patientAuth.user.id,
      `Broadcast referral ${patient.runTag}`,
      {
        specialty: 'Cardiology'
      }
    );
    expect(referral.to_specialist_id).toBeFalsy();
    expect(referral.status).toBe('new');

    const visibleToSpecialist = await retry(async () => {
      const referrals = await listSpecialistReferrals(request, specialistAuth);
      return referrals.find((item) => item.id === referral.id) || null;
    });
    expect(visibleToSpecialist.id).toBe(referral.id);

    const claimed = await updateReferralStatus(request, specialistAuth, referral.id, 'accepted');
    expect(claimed.status).toBe('accepted');
    expect(claimed.to_specialist_id).toBe(specialistAuth.user.id);
    expect(claimed.consultation_id).toBeTruthy();

    const referralAfterClaim = await getReferral(request, gpAuth, referral.id);
    expect(referralAfterClaim.to_specialist_id).toBe(specialistAuth.user.id);
    expect(referralAfterClaim.consultation_id).toBeTruthy();
  });
});
