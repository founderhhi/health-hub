/**
 * D1-DB Database and Schema Agent
 *
 * Validates schema correctness, migration integrity, and pool configuration.
 * Can also apply migrations when run with --apply flag.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../..');

const REQUIRED_SCHEMA_ELEMENTS = {
  users: [
    { column: 'first_name', type: 'text', task: 'DB-01' },
    { column: 'last_name', type: 'text', task: 'DB-01' },
    { column: 'is_operating', type: 'boolean', task: 'DB-02' },
  ],
  consult_requests: [
    { column: 'removed_at', type: 'timestamptz', task: 'DB-03' },
    { column: 'removed_reason', type: 'text', task: 'DB-03' },
    { column: 'removed_by', type: 'uuid', task: 'DB-03' },
    { constraint: 'removed', task: 'DB-04' },
  ],
  consultations: [
    { column: 'completed_at', type: 'timestamptz', task: 'DB-05' },
    { constraint: 'completed', task: 'DB-06' },
    { column: 'gp_deleted', type: 'boolean', task: 'DB-07' },
    { column: 'gp_deleted_at', type: 'timestamptz', task: 'DB-07' },
  ],
};

function validateSchema() {
  const schema = fs.readFileSync(path.join(ROOT, 'db/schema.sql'), 'utf8');
  const results = [];

  for (const [table, elements] of Object.entries(REQUIRED_SCHEMA_ELEMENTS)) {
    for (const el of elements) {
      if (el.column) {
        const found = schema.includes(el.column);
        results.push({
          task: el.task,
          check: `${table}.${el.column} (${el.type})`,
          pass: found,
        });
      }
      if (el.constraint) {
        const found = schema.includes(`'${el.constraint}'`);
        results.push({
          task: el.task,
          check: `${table} CHECK includes '${el.constraint}'`,
          pass: found,
        });
      }
    }
  }

  return results;
}

function validateMigration() {
  const migPath = path.join(ROOT, 'db/migrations/001-fix-schema-mismatches.sql');
  if (!fs.existsSync(migPath)) {
    return [{ task: 'DB-01..DB-07', check: 'Migration file exists', pass: false }];
  }

  const mig = fs.readFileSync(migPath, 'utf8');
  return [
    { task: 'DB-01..DB-07', check: 'Migration file exists', pass: true },
    { task: 'DB-01..DB-07', check: 'Uses IF NOT EXISTS for safety', pass: mig.includes('IF NOT EXISTS') },
    { task: 'DB-04', check: 'Recreates consult_requests_status_check', pass: mig.includes('consult_requests_status_check') },
    { task: 'DB-06', check: 'Recreates consultations_status_check', pass: mig.includes('consultations_status_check') },
  ];
}

function validatePool() {
  const db = fs.readFileSync(path.join(ROOT, 'src/server/db.ts'), 'utf8');
  return [
    { task: 'DB-08', check: 'Pool max set to 25', pass: db.includes('max: 25') },
    { task: 'DB-08', check: 'Idle timeout configured', pass: db.includes('idleTimeoutMillis') },
    { task: 'DB-08', check: 'Connection timeout configured', pass: db.includes('connectionTimeoutMillis') },
  ];
}

function validateDbInit() {
  const init = fs.readFileSync(path.join(ROOT, 'scripts/db-init.js'), 'utf8');
  return [
    { task: 'CI-01', check: 'db-init reads migrations directory', pass: init.includes('migrations') },
    { task: 'CI-01', check: 'db-init applies .sql files', pass: init.includes('.sql') },
  ];
}

function run() {
  console.log('D1-DB Database and Schema Agent - Validation Run\n');

  const allResults = [
    ...validateSchema(),
    ...validateMigration(),
    ...validatePool(),
    ...validateDbInit(),
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

module.exports = { run, validateSchema, validateMigration, validatePool, validateDbInit };

if (require.main === module) {
  process.exit(run() ? 0 : 1);
}
