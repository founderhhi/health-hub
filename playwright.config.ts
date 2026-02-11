import { defineConfig } from '@playwright/test';

import { getE2EEnvironment } from './e2e/config/env';

const env = getE2EEnvironment();

process.env['E2E_RUN_ID'] = process.env['E2E_RUN_ID'] || env.runId;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 1,
  workers: process.env['CI'] ? 2 : undefined,
  timeout: env.timeoutMs,
  expect: {
    timeout: env.timeoutMs
  },
  reporter: process.env['CI']
    ? [['line'], ['junit', { outputFile: 'test-results/playwright-junit.xml' }], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: env.baseUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: env.timeoutMs,
    navigationTimeout: env.timeoutMs
  },
  globalSetup: './e2e/global-setup.ts',
  globalTeardown: './e2e/global-teardown.ts',
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium'
      }
    }
  ]
});
