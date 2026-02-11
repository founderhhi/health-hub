import { expect, test } from '@playwright/test';

import { getE2EEnvironment } from '../config/env';
import { loginProvider, signupPatient } from '../helpers/api-auth';
import { acceptGpQueueItem, listGpQueue, requestGpConsult } from '../helpers/api-flow-setup';
import { retry } from '../helpers/retry';

const env = getE2EEnvironment();

test.describe('Flow 2: GP queue and accept', () => {
  test.setTimeout(env.timeoutMs);

  test('accepts queued consult request as GP', async ({ page, request }) => {
    const { auth: patientAuth, patient } = await signupPatient(request, env);
    const consultRequest = await requestGpConsult(request, patientAuth, `GP queue accept ${patient.runTag}`);

    const gpAuth = await loginProvider(request, env, 'gp');
    const queueItem = await retry(async () => {
      const queue = await listGpQueue(request, gpAuth);
      return queue.find((item) => item.id === consultRequest.id) || null;
    });

    expect(queueItem.status).toBe('waiting');

    const accepted = await acceptGpQueueItem(request, gpAuth, consultRequest.id);
    expect(accepted.consultation.request_id).toBe(consultRequest.id);
    expect(accepted.roomUrl).toContain('http');

    await page.goto('/landing');
    await expect(page.getByRole('heading', { name: /health hub/i })).toBeVisible();
  });
});
