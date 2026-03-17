import { expect, test, Page, BrowserContext } from '@playwright/test';
import { getE2EEnvironment } from '../config/env';
import { signupPatient, loginProvider, loginPatient, AuthResponse } from '../helpers/api-auth';

const env = getE2EEnvironment();

// Login via API, then inject token into browser context before navigating
async function setupAuth(context: BrowserContext, page: Page, auth: AuthResponse) {
  // Add init script that sets localStorage before any page JS runs
  await context.addInitScript(({ token, user }) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('hhi_auth_token', token);
    localStorage.setItem('hhi_user_id', user.id);
    localStorage.setItem('hhi_user_role', user.role);
    localStorage.setItem('hhi_display_name', user.display_name || 'Test User');
  }, { token: auth.token, user: auth.user });
}

async function shot(page: Page, name: string) {
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `e2e/screenshots/${name}.png`, fullPage: true });
}

test.describe('Visual Audit — All Flows', () => {
  test.setTimeout(90000);

  // ═══════════════════════════════════════════════════════
  // PUBLIC PAGES
  // ═══════════════════════════════════════════════════════
  test('1.1 Landing page', async ({ page }) => {
    await page.goto(env.baseUrl);
    await page.waitForLoadState('networkidle');
    await shot(page, '01-landing');
    await expect(page.getByRole('heading', { name: 'Welcome to Health Hub' })).toBeVisible();
  });

  test('1.2 Login page', async ({ page }) => {
    await page.goto(`${env.baseUrl}/auth/login`);
    await page.waitForLoadState('networkidle');
    await shot(page, '02-login');
    await expect(page.getByText('Welcome Back')).toBeVisible();
  });

  test('1.3 Signup page', async ({ page }) => {
    await page.goto(`${env.baseUrl}/auth/signup`);
    await page.waitForLoadState('networkidle');
    await shot(page, '03-signup');
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
  });

  // ═══════════════════════════════════════════════════════
  // PATIENT FLOW (full walkthrough)
  // ═══════════════════════════════════════════════════════
  test('2.0 Patient full flow', async ({ page, context, request }) => {
    const { auth, patient } = await signupPatient(request, env);
    await setupAuth(context, page, auth);

    // Dashboard
    await page.goto(`${env.baseUrl}/patient/dashboard`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(4000);
    await shot(page, '04-patient-dashboard');

    const url = page.url();
    console.log(`[AUDIT] Dashboard URL: ${url}`);
    const skeletons = await page.locator('.summary-card--skeleton').count();
    const values = await page.locator('.summary-value').count();
    const hasBottomNav = await page.locator('app-bottom-nav').count();
    console.log(`[AUDIT] Dashboard: skeletons=${skeletons}, values=${values}, bottomNav=${hasBottomNav}`);
    if (skeletons > 0) console.error('BUG: Stats skeleton still showing after 4s');
    if (hasBottomNav === 0) console.error('BUG: Dashboard missing bottom-nav');

    // Appointments
    await page.goto(`${env.baseUrl}/patient/appointments`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await shot(page, '05-patient-appointments');
    console.log(`[AUDIT] Appointments URL: ${page.url()}, bottomNav=${await page.locator('app-bottom-nav').count()}`);

    // Records
    await page.goto(`${env.baseUrl}/patient/records`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await shot(page, '06-patient-records');

    const labTab = page.locator('button:has-text("Lab Results")');
    if (await labTab.isVisible()) {
      await labTab.click();
      await page.waitForTimeout(1000);
      await shot(page, '07-patient-records-labs');
    }

    // Notifications
    await page.goto(`${env.baseUrl}/patient/notifications`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await shot(page, '08-patient-notifications');
    const notifNav = await page.locator('app-bottom-nav').count();
    console.log(`[AUDIT] Notifications: bottomNav=${notifNav}`);
    if (notifNav === 0) console.error('BUG: Notifications MISSING bottom-nav');

    // AI Chat
    await page.goto(`${env.baseUrl}/patient/ai-chat`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await shot(page, '09-patient-ai-chat');
    const chatInputs = await page.locator('input, textarea').count();
    console.log(`[AUDIT] AI Chat URL: ${page.url()}, inputs=${chatInputs}`);
    if (chatInputs === 0) console.error('BUG: AI Chat missing input field');

    // Return to Dashboard (test stats reload)
    await page.goto(`${env.baseUrl}/patient/dashboard`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(4000);
    await shot(page, '10-patient-dashboard-return');
    const returnSkeletons = await page.locator('.summary-card--skeleton').count();
    const returnValues = await page.locator('.summary-value').count();
    console.log(`[AUDIT] Dashboard return: skeletons=${returnSkeletons}, values=${returnValues}`);
    if (returnSkeletons > 0) console.error('BUG: Stats still loading after nav return');

    // Profile
    await page.goto(`${env.baseUrl}/patient/profile`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await shot(page, '11-patient-profile');
  });

  // ═══════════════════════════════════════════════════════
  // GP PROVIDER
  // ═══════════════════════════════════════════════════════
  test('3.1 GP dashboard', async ({ page, context, request }) => {
    const auth = await loginProvider(request, env, 'gp');
    await setupAuth(context, page, auth);

    await page.goto(`${env.baseUrl}/gp`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    await shot(page, '12-gp-dashboard');
    console.log(`[AUDIT] GP URL: ${page.url()}`);
  });

  // ═══════════════════════════════════════════════════════
  // SPECIALIST
  // ═══════════════════════════════════════════════════════
  test('4.1 Specialist dashboard', async ({ page, context, request }) => {
    const auth = await loginProvider(request, env, 'specialist');
    await setupAuth(context, page, auth);

    await page.goto(`${env.baseUrl}/specialist`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    await shot(page, '13-specialist-dashboard');
    console.log(`[AUDIT] Specialist URL: ${page.url()}`);
  });

  // ═══════════════════════════════════════════════════════
  // PHARMACY
  // ═══════════════════════════════════════════════════════
  test('5.1 Pharmacy dashboard', async ({ page, context, request }) => {
    const auth = await loginProvider(request, env, 'pharmacy');
    await setupAuth(context, page, auth);

    await page.goto(`${env.baseUrl}/pharmacy`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    await shot(page, '14-pharmacy-dashboard');
    console.log(`[AUDIT] Pharmacy URL: ${page.url()}`);
  });

  // ═══════════════════════════════════════════════════════
  // DIAGNOSTICS
  // ═══════════════════════════════════════════════════════
  test('6.1 Diagnostics dashboard', async ({ page, context, request }) => {
    const auth = await loginProvider(request, env, 'diagnostics');
    await setupAuth(context, page, auth);

    await page.goto(`${env.baseUrl}/provider/diagnostics`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    await shot(page, '15-diagnostics-dashboard');
    console.log(`[AUDIT] Diagnostics URL: ${page.url()}`);
  });

  // ═══════════════════════════════════════════════════════
  // ADMIN
  // ═══════════════════════════════════════════════════════
  test('7.1 Admin dashboard', async ({ page, context, request }) => {
    const auth = await loginProvider(request, env, 'admin');
    await setupAuth(context, page, auth);

    await page.goto(`${env.baseUrl}/admin`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    await shot(page, '16-admin-dashboard');
    console.log(`[AUDIT] Admin URL: ${page.url()}`);

    const rows = await page.locator('table tbody tr, .user-card').count();
    console.log(`[AUDIT] Admin users: ${rows}`);
    if (rows === 0) console.error('BUG: Admin shows no users');
  });

  // ═══════════════════════════════════════════════════════
  // API HEALTH & AUTH
  // ═══════════════════════════════════════════════════════
  test('8.1 Health + ready endpoints', async ({ request }) => {
    const healthz = await request.get(`${env.baseUrl}/api/healthz`);
    expect(healthz.ok()).toBeTruthy();

    const ready = await request.get(`${env.baseUrl}/api/ready`);
    expect(ready.ok()).toBeTruthy();
    const body = await ready.json();
    expect(body.ok).toBe(true);
    console.log(`[AUDIT] Ready: ok=${body.ok}, db=${JSON.stringify(body.database)}`);
  });

  test('8.2 Auth guards on API', async ({ request }) => {
    for (const ep of ['/api/admin/users', '/api/patient/consults', '/api/gp/queue']) {
      const r = await request.get(`${env.baseUrl}${ep}`);
      console.log(`[AUDIT] ${ep} → ${r.status()}`);
      expect(r.status()).toBe(401);
    }
  });

  test('8.3 No rate limit on healthz', async ({ request }) => {
    const codes: number[] = [];
    for (let i = 0; i < 10; i++) {
      codes.push((await request.get(`${env.baseUrl}/api/healthz`)).status());
    }
    console.log(`[AUDIT] 10x healthz: ${codes.join(',')}`);
    expect(codes.filter(c => c === 429)).toHaveLength(0);
  });

  // ═══════════════════════════════════════════════════════
  // ROUTE GUARDS (unauthenticated)
  // ═══════════════════════════════════════════════════════
  test('9.1 Guards redirect to login', async ({ page }) => {
    await page.goto(env.baseUrl);
    await page.evaluate(() => localStorage.clear());

    for (const path of ['/patient/dashboard', '/gp', '/specialist', '/pharmacy', '/admin']) {
      await page.goto(`${env.baseUrl}${path}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      const url = page.url();
      const ok = url.includes('/auth/') || url === env.baseUrl + '/' || url === env.baseUrl;
      console.log(`[AUDIT] Guard ${path} → ${url} (ok=${ok})`);
      if (!ok) {
        await shot(page, `BUG-guard${path.replace(/\//g, '-')}`);
        console.error(`BUG: ${path} accessible without auth`);
      }
    }
  });
});
