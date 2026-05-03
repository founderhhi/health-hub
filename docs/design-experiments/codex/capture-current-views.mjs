import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const base = process.env.HEALTH_HUB_CAPTURE_BASE_URL ?? 'http://127.0.0.1:4300';
const outDir = path.join(root, 'codex', 'current');

fs.mkdirSync(outDir, { recursive: true });

const futureExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;
const authToken = [
  Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url'),
  Buffer.from(JSON.stringify({ exp: futureExp, role: 'patient', sub: 'codex-patient' })).toString('base64url'),
  'signature',
].join('.');

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1800 },
  deviceScaleFactor: 1.5,
});

async function capture(name, route) {
  const page = await context.newPage();
  await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2200);
  await page.waitForLoadState('networkidle', { timeout: 9000 }).catch(() => {});
  await page.screenshot({
    path: path.join(outDir, `${name}.png`),
    fullPage: true,
  });
  await page.close();
}

await capture('landing-current', '/landing');
await capture('login-current', '/auth/login');
await capture('signup-current', '/auth/signup');

const dashboardPage = await context.newPage();
await dashboardPage.goto(`${base}/landing`, { waitUntil: 'domcontentloaded', timeout: 30000 });
await dashboardPage.evaluate((tokenValue) => {
  localStorage.setItem('hhi_auth_token', tokenValue);
  localStorage.setItem('access_token', tokenValue);
  localStorage.setItem('hhi_user_role', 'patient');
  localStorage.setItem('hhi_display_name', 'Ananya');
  localStorage.setItem('userName', 'Ananya');
}, authToken);
await dashboardPage.goto(`${base}/patient/dashboard`, { waitUntil: 'domcontentloaded', timeout: 30000 });
await dashboardPage.waitForTimeout(3200);
await dashboardPage.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
await dashboardPage.screenshot({
  path: path.join(outDir, 'patient-dashboard-current.png'),
  fullPage: true,
});
await dashboardPage.close();

await browser.close();

console.log(`Captured current Health Hub screens to ${outDir}`);
