import { Page } from '@playwright/test';

import { AuthResponse } from './api-auth';

export async function seedBrowserAuth(page: Page, auth: AuthResponse): Promise<void> {
  await page.goto('/landing');
  await page.evaluate((payload) => {
    localStorage.setItem('access_token', payload.token);
    localStorage.setItem('hhi_auth_token', payload.token);
    localStorage.setItem('hhi_user_role', payload.user.role);
    localStorage.setItem('hhi_user_id', payload.user.id);

    if (payload.user.display_name) {
      localStorage.setItem('hhi_display_name', payload.user.display_name);
    } else {
      localStorage.removeItem('hhi_display_name');
    }
  }, auth);
}

export async function clearBrowserAuth(page: Page): Promise<void> {
  await page.goto('/landing');
  await page.evaluate(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('hhi_auth_token');
    localStorage.removeItem('hhi_user_role');
    localStorage.removeItem('hhi_user_id');
    localStorage.removeItem('hhi_display_name');
  });
}
