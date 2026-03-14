import { expect, test } from '@playwright/test';

import { getE2EEnvironment } from '../config/env';
import { loginProvider, signupPatient } from '../helpers/api-auth';
import {
  createReferral,
  getConsultationJoinLink,
  getReferral
} from '../helpers/api-flow-setup';

const env = getE2EEnvironment();

test.describe('Flow 8: specialist schedule editor and ready consultation lifecycle', () => {
  test.setTimeout(env.timeoutMs * 2);

  test('keeps specialist scheduling and patient join state in sync', async ({ browser, request }) => {
    const { auth: patientAuth, patient } = await signupPatient(request, env);
    const gpAuth = await loginProvider(request, env, 'gp');
    const specialistAuth = await loginProvider(request, env, 'specialist');

    const reason = `Schedule regression ${patient.runTag}`;
    const referral = await createReferral(request, gpAuth, patientAuth.user.id, reason);
    const appointmentDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const appointmentTime = '10:30';
    const location = 'Majolly Clinic Room 12';

    const specialistContext = await browser.newContext({ baseURL: env.baseUrl });
    await specialistContext.addInitScript((auth) => {
      localStorage.setItem('access_token', auth.token);
      localStorage.setItem('hhi_auth_token', auth.token);
      localStorage.setItem('hhi_user_role', auth.user.role);
      localStorage.setItem('hhi_user_id', auth.user.id);
      if (auth.user.display_name) {
        localStorage.setItem('hhi_display_name', auth.user.display_name);
      }
    }, specialistAuth);
    const specialistPage = await specialistContext.newPage();
    await specialistPage.goto(`/specialist/referral/${referral.id}`);

    await expect(specialistPage.getByRole('heading', { name: /referral details/i })).toBeVisible();
    await specialistPage.getByRole('button', { name: /edit appointment details/i }).click();
    await specialistPage.getByLabel('Appointment Date').fill(appointmentDate);
    await specialistPage.getByLabel('Appointment Time').fill(appointmentTime);
    await specialistPage.getByLabel('Visit Mode').selectOption('offline');
    await specialistPage.getByLabel('Location').fill(location);
    await specialistPage.getByRole('button', { name: /save appointment details/i }).click();

    await expect(specialistPage.getByText(/appointment details updated successfully/i)).toBeVisible();

    const offlineReferral = await getReferral(request, specialistAuth, referral.id);
    expect(offlineReferral.consultation_mode).toBe('offline');
    expect(offlineReferral.status).toBe('confirmed');
    expect(offlineReferral.location).toBe(location);
    expect(offlineReferral.consultation_id).toBeFalsy();

    await specialistPage.getByRole('button', { name: /edit appointment details/i }).click();
    await specialistPage.getByLabel('Visit Mode').selectOption('online');
    await specialistPage.getByRole('button', { name: /save appointment details/i }).click();

    await expect(specialistPage.getByText(/appointment details updated successfully/i)).toBeVisible();
    await expect(specialistPage.getByText(/consultation ready/i)).toBeVisible();

    const onlineReferral = await getReferral(request, specialistAuth, referral.id);
    expect(onlineReferral.consultation_mode).toBe('online');
    expect(onlineReferral.consultation_id).toBeTruthy();
    expect(onlineReferral.consultation_status).toBe('ready');

    const patientContext = await browser.newContext({ baseURL: env.baseUrl });
    await patientContext.addInitScript((auth) => {
      localStorage.setItem('access_token', auth.token);
      localStorage.setItem('hhi_auth_token', auth.token);
      localStorage.setItem('hhi_user_role', auth.user.role);
      localStorage.setItem('hhi_user_id', auth.user.id);
      if (auth.user.display_name) {
        localStorage.setItem('hhi_display_name', auth.user.display_name);
      }
    }, patientAuth);
    const patientPage = await patientContext.newPage();
    await patientPage.goto('/patient/appointments');

    await expect(patientPage.getByRole('heading', { name: /my appointments/i })).toBeVisible();
    const appointmentCard = patientPage.locator('.appointment-card').filter({ hasText: reason }).first();
    await expect(appointmentCard).toBeVisible();
    await expect(appointmentCard).toContainText('Online');
    await expect(appointmentCard.getByRole('button', { name: /join consultation/i })).toBeVisible();

    await appointmentCard.getByRole('button', { name: /join consultation/i }).click();
    await expect(patientPage).toHaveURL(new RegExp(`/patient/appointments/${referral.id}/consultation`));
    await expect(patientPage.getByText(/start video call/i)).toBeVisible();

    await getConsultationJoinLink(request, patientAuth, onlineReferral.consultation_id, 'patient');

    await patientPage.goto('/patient/appointments');
    const liveCard = patientPage.locator('.appointment-card').filter({ hasText: reason }).first();
    await expect(liveCard).toContainText('Live');

    await specialistContext.close();
    await patientContext.close();
  });
});
