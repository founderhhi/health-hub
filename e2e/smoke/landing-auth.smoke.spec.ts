import { expect, test } from '@playwright/test';

import { getE2EEnvironment } from '../config/env';
import { E2E_SELECTORS } from '../helpers/selectors';

const env = getE2EEnvironment();

test.describe('Smoke: landing to auth', () => {
  test.setTimeout(env.timeoutMs);

  test('navigates from landing to login route', async ({ page }) => {
    await page.goto('/landing');

    await expect(page.getByRole('heading', { name: /health hub/i })).toBeVisible();
    await page.getByRole('button', { name: /patient login/i }).click();

    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.locator(E2E_SELECTORS.auth.loginPhone)).toBeVisible();
  });
});
