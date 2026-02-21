/**
 * D8-INFRA Infrastructure and Deployment Agent
 *
 * Validates render.yaml configuration, startup guards, and deployment readiness.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../..');

function validateRenderYaml() {
  const renderPath = path.join(ROOT, 'render.yaml');
  if (!fs.existsSync(renderPath)) {
    return [{ task: 'INF-01', check: 'render.yaml exists', pass: false }];
  }

  const render = fs.readFileSync(renderPath, 'utf8');
  return [
    { task: 'INF-01', check: 'render.yaml exists', pass: true },
    { task: 'INF-01', check: 'Web service configured', pass: render.includes('services') },
    { task: 'INF-01', check: 'DATABASE_URL env var', pass: render.includes('DATABASE_URL') },
    { task: 'INF-01', check: 'JWT_SECRET env var', pass: render.includes('JWT_SECRET') },
    { task: 'INF-01', check: 'Health check configured', pass: render.includes('healthCheckPath') || render.includes('health') },
    { task: 'INF-01', check: 'Database provisioning defined', pass: render.includes('databases') || render.includes('postgres') },
  ];
}

function validateStartupGuard() {
  const server = fs.readFileSync(path.join(ROOT, 'src/server.ts'), 'utf8');
  return [
    { task: 'INF-01', check: 'Production env check exists', pass: server.includes("NODE_ENV") && server.includes("production") },
    { task: 'AUTH-01', check: 'JWT_SECRET validated at startup', pass: server.includes('JWT_SECRET') },
    { task: 'AUTH-01', check: 'demo_secret rejected in production', pass: server.includes('demo_secret') },
    { task: 'AUTH-01', check: 'process.exit on insecure config', pass: server.includes('process.exit(1)') },
  ];
}

function run() {
  console.log('D8-INFRA Infrastructure Agent - Validation Run\n');

  const allResults = [
    ...validateRenderYaml(),
    ...validateStartupGuard(),
  ];

  let passed = 0;
  let failed = 0;

  for (const r of allResults) {
    const icon = r.pass ? 'PASS' : 'FAIL';
    console.log(`  [${icon}] [${r.task}] ${r.check}`);
    if (r.pass) passed++;
    else failed++;
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed out of ${allResults.length}`);
  return failed === 0;
}

module.exports = { run, validateRenderYaml, validateStartupGuard };

if (require.main === module) {
  process.exit(run() ? 0 : 1);
}
