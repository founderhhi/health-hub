import { expect, test } from '@playwright/test';

import { getE2EEnvironment } from '../config/env';
import { signupPatient } from '../helpers/api-auth';
import { E2E_SELECTORS } from '../helpers/selectors';

const env = getE2EEnvironment();

test.describe('Smoke: patient pharmacy navigation', () => {
  test.setTimeout(env.timeoutMs);

  test('opens records prescriptions tab from pharmacy card with one click', async ({ page, request }) => {
    const apiEvents: string[] = [];
    page.on('request', (requestEvent) => {
      const url = requestEvent.url();
      if (url.includes('/api/prescriptions') || url.includes('/api/patient/lab-orders')) {
        apiEvents.push(`REQ ${url}`);
      }
    });
    page.on('response', (response) => {
      const url = response.url();
      if (url.includes('/api/prescriptions') || url.includes('/api/patient/lab-orders')) {
        apiEvents.push(`${response.status()} ${url}`);
      }
    });
    page.on('requestfailed', (requestEvent) => {
      const url = requestEvent.url();
      if (url.includes('/api/prescriptions') || url.includes('/api/patient/lab-orders')) {
        apiEvents.push(`FAILED ${url}`);
      }
    });

    const { patient } = await signupPatient(request, env);
    const localPhoneDigits = patient.phone.replace(/^\+1/, '').slice(-10);

    await page.goto('/auth/login');
    await page.locator(E2E_SELECTORS.auth.loginPhone).fill(localPhoneDigits);
    await page.locator(E2E_SELECTORS.auth.loginPassword).fill(patient.password);
    await page.locator(E2E_SELECTORS.auth.loginSubmit).click();

    await expect(page).toHaveURL(/\/patient\/dashboard/);

    const pharmacyCard = page.locator('.service-card', { hasText: 'Pharmacy' }).first();
    await expect(pharmacyCard).toBeVisible();
    await pharmacyCard.click();

    await expect(page).toHaveURL(/\/patient\/records(\?|$)/);
    await expect(page).toHaveURL(/tab=prescriptions/);
    console.log('patient-pharmacy-nav API events:', apiEvents.join(' | '));
    await expect(page.locator('.tab-btn.active')).toHaveText(/Prescriptions/i);
    await expect(page.getByText('Loading records...')).not.toBeVisible({ timeout: 12000 });

    await page.screenshot({
      path: `test-results/patient-pharmacy-navigation-${Date.now()}.png`,
      fullPage: true
    });
  });
});
