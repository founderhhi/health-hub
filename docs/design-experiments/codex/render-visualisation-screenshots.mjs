import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const filePath = path.join(root, 'codex', 'visualisation.html');
const outDir = path.join(root, 'codex', 'screens');

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1680, height: 1600 },
  deviceScaleFactor: 1.5,
});

await page.goto(`file://${filePath}`);
await page.waitForLoadState('networkidle');
await page.waitForSelector('.variation-card[data-card]');
await page.evaluate(async () => {
  document.querySelectorAll('img').forEach((image) => {
    image.loading = 'eager';
  });

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  for (let offset = 0; offset <= maxScroll; offset += Math.max(window.innerHeight - 160, 320)) {
    window.scrollTo({ top: offset, behavior: 'instant' });
    await new Promise((resolve) => window.setTimeout(resolve, 160));
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
});
await page.waitForTimeout(1000);

await page.screenshot({
  path: path.join(root, 'codex', 'visualisation-overview.png'),
  fullPage: true,
});

const cards = await page.locator('.variation-card[data-card]').evaluateAll((nodes) =>
  nodes
    .map((node) => node.getAttribute('data-card'))
    .filter(Boolean)
);

for (const slug of cards) {
  await page.locator(`.variation-card[data-card="${slug}"]`).screenshot({
    path: path.join(outDir, `${slug}.png`),
  });
}

await browser.close();

console.log(`Rendered ${cards.length} variation screenshots to ${outDir}`);
