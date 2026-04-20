import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const outDir = path.join(root, 'codex', 'concepts');
fs.mkdirSync(outDir, { recursive: true });

const jobs = [
  {
    file: path.join(root, 'codex', 'landing-redesigns.html'),
    selectors: [
      'landing-practo',
      'landing-marketplace',
      'landing-premium',
    ],
    viewport: { width: 1680, height: 1800 },
  },
  {
    file: path.join(root, 'codex', 'dashboard-redesigns.html'),
    selectors: [
      'dashboard-guided',
      'dashboard-utility',
      'dashboard-premium',
    ],
    viewport: { width: 1480, height: 1800 },
  },
];

const browser = await chromium.launch({ headless: true });

for (const job of jobs) {
  const page = await browser.newPage({
    viewport: job.viewport,
    deviceScaleFactor: 1.5,
  });

  await page.goto(`file://${job.file}`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  for (const selector of job.selectors) {
    await page.locator(`[data-artboard="${selector}"]`).screenshot({
      path: path.join(outDir, `${selector}.png`),
    });
  }

  await page.close();
}

await browser.close();

console.log(`Rendered redesign concepts to ${outDir}`);
