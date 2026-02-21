import { expect, test } from '@playwright/test';

import { getE2EEnvironment } from '../config/env';
import { loginProvider } from '../helpers/api-auth';

const env = getE2EEnvironment();

const providerLoginMatrix = [
  { role: 'gp' as const, expectedRole: 'gp' },
  { role: 'specialist' as const, expectedRole: 'specialist' },
  { role: 'pharmacy' as const, expectedRole: 'pharmacist' },
  { role: 'diagnostics' as const, expectedRole: 'lab_tech' },
  { role: 'admin' as const, expectedRole: 'admin' }
];

test.describe('Flow 7: provider account login smoke', () => {
  test.setTimeout(env.timeoutMs);

  test('logs in all seeded provider accounts via API', async ({ request }) => {
    for (const loginCase of providerLoginMatrix) {
      const auth = await loginProvider(request, env, loginCase.role);
      expect(auth.token).toBeTruthy();
      expect(auth.user.phone).toBe(env.roles[loginCase.role].phone);
      expect(auth.user.role).toBe(loginCase.expectedRole);
    }
  });
});
