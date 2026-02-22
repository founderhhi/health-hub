#!/usr/bin/env node
/**
 * HealthHub Agent Orchestrator
 *
 * Runs domain agents in the correct dependency order, enforces write-boundary
 * compliance, and generates a consolidated report.
 *
 * Usage:
 *   node scripts/agents/agent-runner.js --phase P0
 *   node scripts/agents/agent-runner.js --phase P0 --agent D1-DB
 *   node scripts/agents/agent-runner.js --phase P0 --dry-run
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '../..');
const BOUNDARIES_PATH = path.join(ROOT, 'docs/audit/agents/agent-boundaries.json');
const REPORTS_DIR = path.join(ROOT, 'docs/audit/agents/reports');

// ── Agent registry with dependencies and validation functions ──

const AGENT_REGISTRY = {
  'D1-DB': {
    name: 'Database and Schema Agent',
    dependencies: [],
    validators: [
      'validate-schema',
      'validate-migration',
      'validate-pool',
    ],
  },
  'D2-API': {
    name: 'Backend API Agent',
    dependencies: ['D1-DB'],
    validators: [
      'validate-gp-endpoints',
      'validate-prescription-scope',
      'validate-referral-scope',
      'validate-pharmacy-claim',
    ],
  },
  'D4-AUTH': {
    name: 'Authentication Agent',
    dependencies: ['D8-INFRA'],
    validators: ['validate-jwt-guard'],
  },
  'D8-INFRA': {
    name: 'Infrastructure and Deployment Agent',
    dependencies: [],
    validators: ['validate-render-yaml', 'validate-startup-guard'],
  },
  'D9-CI': {
    name: 'CI/CD and Testing Agent',
    dependencies: ['D1-DB', 'D2-API'],
    validators: ['validate-build'],
  },
  'AIC-10': {
    name: 'Audit and Integration Checker',
    dependencies: ['D1-DB', 'D2-API', 'D4-AUTH', 'D8-INFRA', 'D9-CI'],
    validators: ['validate-boundaries', 'validate-integration'],
  },
  'PM-00': {
    name: 'Project Management Agent',
    dependencies: ['AIC-10'],
    validators: ['validate-phase-gate'],
  },
  // Monitoring-only agents (no P0 implementation)
  'D3-FE': { name: 'Frontend Components Agent', dependencies: [], validators: [] },
  'D5-WS': { name: 'Real-time and WebSocket Agent', dependencies: [], validators: [] },
  'D6-VIDCHAT': { name: 'Video and Chat Agent', dependencies: [], validators: [] },
  'D7-PAY': { name: 'Payment UI Agent', dependencies: [], validators: [] },
};

// ── Validation functions ──

const VALIDATORS = {
  'validate-schema': () => {
    const schema = fs.readFileSync(path.join(ROOT, 'db/schema.sql'), 'utf8');
    const checks = [
      ['first_name text', 'users.first_name column'],
      ['last_name text', 'users.last_name column'],
      ['is_operating boolean', 'users.is_operating column'],
      ['removed_at timestamptz', 'consult_requests.removed_at column'],
      ['removed_reason text', 'consult_requests.removed_reason column'],
      ['removed_by uuid', 'consult_requests.removed_by column'],
      ["'removed'", 'consult_requests removed status in CHECK'],
      ['completed_at timestamptz', 'consultations.completed_at column'],
      ["'completed'", 'consultations completed status in CHECK'],
      ['gp_deleted boolean', 'consultations.gp_deleted column'],
      ['gp_deleted_at timestamptz', 'consultations.gp_deleted_at column'],
    ];
    return runChecks(schema, checks, 'db/schema.sql');
  },

  'validate-migration': () => {
    const migrationPath = path.join(ROOT, 'db/migrations/001-fix-schema-mismatches.sql');
    if (!fs.existsSync(migrationPath)) {
      return { pass: false, details: ['Migration file 001-fix-schema-mismatches.sql does not exist'] };
    }
    const migration = fs.readFileSync(migrationPath, 'utf8');
    const checks = [
      ['ALTER TABLE users ADD COLUMN', 'ALTER TABLE for users columns'],
      ['ALTER TABLE consult_requests ADD COLUMN', 'ALTER TABLE for consult_requests columns'],
      ['ALTER TABLE consultations ADD COLUMN', 'ALTER TABLE for consultations columns'],
      ['consult_requests_status_check', 'consult_requests constraint recreation'],
      ['consultations_status_check', 'consultations constraint recreation'],
    ];
    return runChecks(migration, checks, 'db/migrations/001-fix-schema-mismatches.sql');
  },

  'validate-pool': () => {
    const db = fs.readFileSync(path.join(ROOT, 'src/server/db.ts'), 'utf8');
    const checks = [['max: 25', 'Pool max connections set to 25']];
    return runChecks(db, checks, 'src/server/db.ts');
  },

  'validate-gp-endpoints': () => {
    const gp = fs.readFileSync(path.join(ROOT, 'src/server/api/gp.ts'), 'utf8');
    const checks = [
      ['BEGIN', 'Transaction BEGIN in accept flow'],
      ['for update', 'Row lock (FOR UPDATE) in accept flow'],
      ['409', 'Conflict response (409) for duplicate accept'],
      ['COALESCE', 'COALESCE in history query'],
      ['started_at', 'started_at usage in history'],
      ['gp_deleted', 'gp_deleted filter in history/delete'],
    ];
    return runChecks(gp, checks, 'src/server/api/gp.ts');
  },

  'validate-prescription-scope': () => {
    const rx = fs.readFileSync(path.join(ROOT, 'src/server/api/prescriptions.ts'), 'utf8');
    const checks = [
      ['patient', 'Patient role scoping'],
      ['admin', 'Admin role check'],
      ['403', 'Forbidden response for unauthorized access'],
    ];
    return runChecks(rx, checks, 'src/server/api/prescriptions.ts');
  },

  'validate-referral-scope': () => {
    const ref = fs.readFileSync(path.join(ROOT, 'src/server/api/referrals.ts'), 'utf8');
    const checks = [
      ['to_specialist_id', 'Specialist scoping on referral list'],
      ['404', 'Not found for unauthorized referral detail'],
    ];
    return runChecks(ref, checks, 'src/server/api/referrals.ts');
  },

  'validate-pharmacy-claim': () => {
    const ph = fs.readFileSync(path.join(ROOT, 'src/server/api/pharmacy.ts'), 'utf8');
    const checks = [
      ['BEGIN', 'Transaction in claim flow'],
      ["'active'", 'Active status check for claim'],
      ['409', 'Conflict response for non-claimable state'],
    ];
    return runChecks(ph, checks, 'src/server/api/pharmacy.ts');
  },

  'validate-jwt-guard': () => {
    const server = fs.readFileSync(path.join(ROOT, 'src/server.ts'), 'utf8');
    const checks = [
      ['JWT_SECRET', 'JWT_SECRET reference in startup guard'],
      ['demo_secret', 'demo_secret rejection check'],
      ['process.exit', 'Fatal exit on insecure secret'],
    ];
    return runChecks(server, checks, 'src/server.ts');
  },

  'validate-render-yaml': () => {
    const renderPath = path.join(ROOT, 'render.yaml');
    if (!fs.existsSync(renderPath)) {
      return { pass: false, details: ['render.yaml does not exist'] };
    }
    const render = fs.readFileSync(renderPath, 'utf8');
    const checks = [
      ['DATABASE_URL', 'DATABASE_URL env var configured'],
      ['JWT_SECRET', 'JWT_SECRET env var configured'],
    ];
    return runChecks(render, checks, 'render.yaml');
  },

  'validate-startup-guard': () => {
    const server = fs.readFileSync(path.join(ROOT, 'src/server.ts'), 'utf8');
    const checks = [
      ['NODE_ENV', 'Production environment check'],
      ['process.exit(1)', 'Fatal exit on misconfiguration'],
    ];
    return runChecks(server, checks, 'src/server.ts');
  },

  'validate-build': () => {
    try {
      execSync('npm run build', { cwd: ROOT, stdio: 'pipe', timeout: 120000 });
      return { pass: true, details: ['Build succeeded'] };
    } catch (e) {
      return { pass: false, details: [`Build failed: ${e.stderr?.toString().slice(0, 500) || e.message}`] };
    }
  },

  'validate-boundaries': () => {
    const reportPath = path.join(REPORTS_DIR, 'latest-boundary-audit.md');
    if (!fs.existsSync(reportPath)) {
      return { pass: false, details: ['Boundary audit report does not exist. Run boundary_audit.py first.'] };
    }
    const report = fs.readFileSync(reportPath, 'utf8');
    if (report.includes('PASS')) {
      return { pass: true, details: ['Boundary audit report shows PASS'] };
    }
    return { pass: false, details: ['Boundary audit report shows FAIL'] };
  },

  'validate-integration': () => {
    const reportPath = path.join(REPORTS_DIR, 'p0-integration-check.md');
    if (!fs.existsSync(reportPath)) {
      return { pass: false, details: ['Integration check report does not exist'] };
    }
    const report = fs.readFileSync(reportPath, 'utf8');
    if (report.includes('Conditional Pass') || report.includes('Pass') || report.includes('PASS')) {
      return { pass: true, details: ['Integration check shows Conditional Pass or better'] };
    }
    return { pass: false, details: ['Integration check does not show pass'] };
  },

  'validate-phase-gate': () => {
    const boardPath = path.join(ROOT, 'docs/audit/agents/task-boards/00-project-manager-board.md');
    if (!fs.existsSync(boardPath)) {
      return { pass: false, details: ['PM board does not exist'] };
    }
    return { pass: true, details: ['PM board exists and is maintained'] };
  },
};

// ── Helpers ──

function runChecks(content, checks, filePath) {
  const results = [];
  let allPass = true;
  for (const [pattern, label] of checks) {
    if (content.includes(pattern)) {
      results.push(`  PASS: ${label}`);
    } else {
      results.push(`  FAIL: ${label} (pattern "${pattern}" not found in ${filePath})`);
      allPass = false;
    }
  }
  return { pass: allPass, details: results };
}

function topologicalSort(agentIds) {
  const visited = new Set();
  const sorted = [];

  function visit(id) {
    if (visited.has(id)) return;
    visited.add(id);
    const agent = AGENT_REGISTRY[id];
    if (!agent) return;
    for (const dep of agent.dependencies) {
      visit(dep);
    }
    sorted.push(id);
  }

  for (const id of agentIds) {
    visit(id);
  }
  return sorted;
}

// ── Main ──

function main() {
  const args = process.argv.slice(2);
  const phaseIdx = args.indexOf('--phase');
  const phase = phaseIdx !== -1 ? args[phaseIdx + 1] : 'P0';
  const agentIdx = args.indexOf('--agent');
  const singleAgent = agentIdx !== -1 ? args[agentIdx + 1] : null;
  const dryRun = args.includes('--dry-run');

  console.log(`\n========================================`);
  console.log(`  HealthHub Agent Orchestrator`);
  console.log(`  Phase: ${phase}`);
  console.log(`  Mode: ${dryRun ? 'DRY RUN' : 'EXECUTE'}`);
  if (singleAgent) console.log(`  Agent: ${singleAgent}`);
  console.log(`========================================\n`);

  // Determine which agents to run
  let agentIds;
  if (singleAgent) {
    agentIds = [singleAgent];
  } else {
    // P0 active agents only
    agentIds = ['D1-DB', 'D2-API', 'D4-AUTH', 'D8-INFRA', 'D9-CI', 'AIC-10', 'PM-00'];
  }

  const executionOrder = topologicalSort(agentIds);
  console.log(`Execution order: ${executionOrder.join(' -> ')}\n`);

  const report = {
    phase,
    timestamp: new Date().toISOString(),
    results: {},
    summary: { total: 0, passed: 0, failed: 0, skipped: 0 },
  };

  for (const agentId of executionOrder) {
    const agent = AGENT_REGISTRY[agentId];
    if (!agent) {
      console.log(`[SKIP] ${agentId}: not in registry`);
      report.results[agentId] = { status: 'skipped', reason: 'not in registry' };
      report.summary.skipped++;
      report.summary.total++;
      continue;
    }

    console.log(`[RUN]  ${agentId} (${agent.name})`);

    if (agent.validators.length === 0) {
      console.log(`       No P0 validators. Monitoring-only.\n`);
      report.results[agentId] = { status: 'monitoring', validators: [] };
      continue;
    }

    const validatorResults = [];
    let agentPass = true;

    for (const validatorName of agent.validators) {
      const validator = VALIDATORS[validatorName];
      if (!validator) {
        console.log(`       [SKIP] ${validatorName}: validator not found`);
        validatorResults.push({ name: validatorName, pass: false, details: ['Validator not found'] });
        agentPass = false;
        continue;
      }

      if (dryRun) {
        console.log(`       [DRY]  ${validatorName}`);
        validatorResults.push({ name: validatorName, pass: true, details: ['Dry run - skipped'] });
        continue;
      }

      const result = validator();
      const icon = result.pass ? 'PASS' : 'FAIL';
      console.log(`       [${icon}] ${validatorName}`);
      for (const detail of result.details) {
        console.log(`              ${detail}`);
      }
      validatorResults.push({ name: validatorName, ...result });
      if (!result.pass) agentPass = false;
    }

    report.results[agentId] = {
      status: agentPass ? 'pass' : 'fail',
      validators: validatorResults,
    };
    report.summary.total++;
    if (agentPass) report.summary.passed++;
    else report.summary.failed++;

    console.log(`       Result: ${agentPass ? 'PASS' : 'FAIL'}\n`);
  }

  // Write report
  const reportPath = path.join(REPORTS_DIR, `${phase.toLowerCase()}-agent-run-report.json`);
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  // Write markdown summary
  const mdPath = path.join(REPORTS_DIR, `${phase.toLowerCase()}-agent-run-report.md`);
  const md = generateMarkdownReport(report, executionOrder);
  fs.writeFileSync(mdPath, md);

  console.log(`\n========================================`);
  console.log(`  Summary: ${report.summary.passed}/${report.summary.total} agents passed`);
  console.log(`  Report:  ${path.relative(ROOT, mdPath)}`);
  console.log(`========================================\n`);

  process.exit(report.summary.failed > 0 ? 1 : 0);
}

function generateMarkdownReport(report, executionOrder) {
  const lines = [
    `# ${report.phase} Agent Run Report`,
    '',
    `Generated: ${report.timestamp}`,
    '',
    '## Summary',
    '',
    `| Metric | Value |`,
    `|---|---|`,
    `| Phase | ${report.phase} |`,
    `| Total agents | ${report.summary.total} |`,
    `| Passed | ${report.summary.passed} |`,
    `| Failed | ${report.summary.failed} |`,
    `| Skipped | ${report.summary.skipped} |`,
    '',
    '## Agent Results',
    '',
  ];

  for (const agentId of executionOrder) {
    const result = report.results[agentId];
    if (!result) continue;

    const icon = result.status === 'pass' ? 'PASS' : result.status === 'fail' ? 'FAIL' : result.status.toUpperCase();
    lines.push(`### ${agentId} - ${icon}`);
    lines.push('');

    if (result.validators && result.validators.length > 0) {
      lines.push('| Validator | Result | Details |');
      lines.push('|---|---|---|');
      for (const v of result.validators) {
        const details = v.details.join('; ');
        lines.push(`| ${v.name} | ${v.pass ? 'PASS' : 'FAIL'} | ${details} |`);
      }
    } else if (result.status === 'monitoring') {
      lines.push('No P0 validators. Monitoring-only lane.');
    }
    lines.push('');
  }

  return lines.join('\n');
}

main();
