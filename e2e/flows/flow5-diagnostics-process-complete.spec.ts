import { expect, test } from '@playwright/test';

import { getE2EEnvironment } from '../config/env';
import { loginProvider, signupPatient } from '../helpers/api-auth';
import {
  createLabOrder,
  listDiagnosticsOrders,
  listNotifications,
  updateDiagnosticsOrderStatus
} from '../helpers/api-flow-setup';
import { retry } from '../helpers/retry';
import { E2E_SELECTORS } from '../helpers/selectors';

const env = getE2EEnvironment();

test.describe('Flow 5: diagnostics process to complete', () => {
  test.setTimeout(env.timeoutMs);

  test('processes diagnostic order and confirms patient updates', async ({ page, request }) => {
    const { auth: patientAuth } = await signupPatient(request, env);
    const specialistAuth = await loginProvider(request, env, 'specialist');
    const diagnosticsAuth = await loginProvider(request, env, 'diagnostics');

    const order = await createLabOrder(request, specialistAuth, patientAuth.user.id, ['TSH', 'A1C']);

    const diagnosticsOrder = await retry(async () => {
      const orders = await listDiagnosticsOrders(request, diagnosticsAuth);
      return orders.find((item) => item.id === order.id) || null;
    });

    expect(diagnosticsOrder.status).toBe('ordered');

    const inProgressOrder = await updateDiagnosticsOrderStatus(request, diagnosticsAuth, order.id, 'in_progress');
    expect(inProgressOrder.status).toBe('in_progress');

    const completedOrder = await updateDiagnosticsOrderStatus(
      request,
      diagnosticsAuth,
      order.id,
      'completed',
      `Completed in run ${env.runId}`
    );
    expect(completedOrder.status).toBe('completed');

    const completionNotification = await retry(async () => {
      const notifications = await listNotifications(request, patientAuth);
      return notifications.find((item) => item.type === 'lab.status' && item.data?.labOrderId === order.id) || null;
    });

    expect(completionNotification.message).toContain('completed');

    await page.goto('/auth/login');
    await expect(page.locator(E2E_SELECTORS.auth.forgotPasswordLink)).toBeVisible();
  });
});
