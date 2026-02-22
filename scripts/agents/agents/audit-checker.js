/**
 * AIC-10 Audit and Integration Checker
 *
 * Performs cross-agent integration verification, boundary compliance,
 * and generates the phase gate recommendation.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../..');
const REPORTS_DIR = path.join(ROOT, 'docs/audit/agents/reports');
const TASK_BOARDS_DIR = path.join(ROOT, 'docs/audit/agents/task-boards');

function checkBoundaryCompliance() {
  const reportPath = path.join(REPORTS_DIR, 'latest-boundary-audit.md');
  if (!fs.existsSync(reportPath)) {
    return { pass: false, detail: 'Boundary audit report missing. Run: python3 scripts/agents/boundary_audit.py' };
  }
  const report = fs.readFileSync(reportPath, 'utf8');
  const pass = report.includes('PASS');
  return { pass, detail: pass ? 'Boundary audit PASS' : 'Boundary audit FAIL - violations detected' };
}

function checkTaskBoardCoverage() {
  const boards = [
    { file: '01-database-agent-board.md', agent: 'D1-DB', requiredTasks: ['DB-01', 'DB-08'] },
    { file: '02-backend-api-agent-board.md', agent: 'D2-API', requiredTasks: ['COR-01', 'COR-05'] },
    { file: '04-auth-agent-board.md', agent: 'D4-AUTH', requiredTasks: ['AUTH-01'] },
    { file: '08-infra-agent-board.md', agent: 'D8-INFRA', requiredTasks: ['INF-01'] },
  ];

  const results = [];
  for (const board of boards) {
    const boardPath = path.join(TASK_BOARDS_DIR, board.file);
    if (!fs.existsSync(boardPath)) {
      results.push({ agent: board.agent, pass: false, detail: `Board file missing: ${board.file}` });
      continue;
    }
    const content = fs.readFileSync(boardPath, 'utf8');
    for (const taskId of board.requiredTasks) {
      const found = content.includes(taskId);
      results.push({
        agent: board.agent,
        pass: found,
        detail: found ? `${taskId} tracked in board` : `${taskId} NOT found in board`,
      });
    }
  }
  return results;
}

function checkBuildStatus() {
  try {
    const { execSync } = require('child_process');
    execSync('npm run build', { cwd: ROOT, stdio: 'pipe', timeout: 120000 });
    return { pass: true, detail: 'Build succeeds' };
  } catch (e) {
    return { pass: false, detail: 'Build fails - P0 gate cannot close' };
  }
}

function generateGateRecommendation(boundaryResult, boardResults, buildResult) {
  const allBoardsPass = boardResults.every(r => r.pass);
  const allPass = boundaryResult.pass && allBoardsPass && buildResult.pass;

  if (allPass) return 'PASS';
  if (boundaryResult.pass && allBoardsPass) return 'CONDITIONAL PASS (build verification needed)';
  return 'FAIL';
}

function run(options = {}) {
  const skipBuild = options.skipBuild || false;

  console.log('AIC-10 Audit and Integration Checker - Gate Review\n');

  // 1. Boundary compliance
  console.log('=== Boundary Compliance ===');
  const boundary = checkBoundaryCompliance();
  console.log(`  [${boundary.pass ? 'PASS' : 'FAIL'}] ${boundary.detail}`);

  // 2. Task board coverage
  console.log('\n=== Task Board Coverage ===');
  const boards = checkTaskBoardCoverage();
  for (const r of boards) {
    console.log(`  [${r.pass ? 'PASS' : 'FAIL'}] [${r.agent}] ${r.detail}`);
  }

  // 3. Build verification
  console.log('\n=== Build Verification ===');
  let build;
  if (skipBuild) {
    build = { pass: true, detail: 'Build check skipped (--skip-build)' };
  } else {
    build = checkBuildStatus();
  }
  console.log(`  [${build.pass ? 'PASS' : 'FAIL'}] ${build.detail}`);

  // 4. Gate recommendation
  const recommendation = generateGateRecommendation(boundary, boards, build);
  console.log(`\n=== Gate Recommendation: ${recommendation} ===\n`);

  // Write report
  const report = [
    '# AIC-10 Phase Gate Report',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Boundary Compliance',
    '',
    `- ${boundary.pass ? 'PASS' : 'FAIL'}: ${boundary.detail}`,
    '',
    '## Task Board Coverage',
    '',
    ...boards.map(r => `- ${r.pass ? 'PASS' : 'FAIL'} [${r.agent}]: ${r.detail}`),
    '',
    '## Build Verification',
    '',
    `- ${build.pass ? 'PASS' : 'FAIL'}: ${build.detail}`,
    '',
    `## Recommendation: ${recommendation}`,
    '',
  ].join('\n');

  const reportPath = path.join(REPORTS_DIR, 'p0-gate-report.md');
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  fs.writeFileSync(reportPath, report);
  console.log(`Report written to: ${path.relative(ROOT, reportPath)}`);

  return recommendation === 'PASS';
}

module.exports = { run };

if (require.main === module) {
  const skipBuild = process.argv.includes('--skip-build');
  process.exit(run({ skipBuild }) ? 0 : 1);
}
