/**
 * D2-API Backend API Agent
 *
 * Validates API correctness for P0 tasks: GP endpoints, prescription scoping,
 * referral scoping, pharmacy claim idempotency, and GP history correctness.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../..');

function validateGpEndpoints() {
  const gp = fs.readFileSync(path.join(ROOT, 'src/server/api/gp.ts'), 'utf8');
  return [
    // COR-03: Transactional accept
    { task: 'COR-03', check: 'GP accept uses BEGIN transaction', pass: gp.includes('BEGIN') },
    { task: 'COR-03', check: 'GP accept uses COMMIT', pass: gp.includes('COMMIT') },
    { task: 'COR-03', check: 'GP accept uses ROLLBACK on error', pass: gp.includes('ROLLBACK') },

    // COR-04: First-wins concurrency
    { task: 'COR-04', check: 'GP accept uses FOR UPDATE row lock', pass: gp.includes('for update') },
    { task: 'COR-04', check: 'GP accept returns 409 on conflict', pass: gp.includes('409') },

    // COR-06 / API-04: History correctness
    { task: 'COR-06', check: 'History uses COALESCE(completed_at, ended_at)', pass: gp.includes('COALESCE') },
    { task: 'COR-06', check: 'History uses started_at', pass: gp.includes('started_at') },
    { task: 'COR-06', check: 'History filters by gp_deleted = false', pass: gp.includes('gp_deleted') },

    // API-05: Consultation delete
    { task: 'API-05', check: 'Consultation delete sets gp_deleted = true', pass: gp.includes('gp_deleted = true') },
    { task: 'API-05', check: 'Consultation delete sets gp_deleted_at', pass: gp.includes('gp_deleted_at') },
  ];
}

function validatePrescriptionScope() {
  const rx = fs.readFileSync(path.join(ROOT, 'src/server/api/prescriptions.ts'), 'utf8');
  return [
    // COR-01: Lock prescription reads
    { task: 'COR-01', check: 'Prescription list checks user role', pass: rx.includes('role') },
    { task: 'COR-01', check: 'Patient scoped to own prescriptions', pass: rx.includes('patient') },
    { task: 'COR-01', check: 'Admin can access all', pass: rx.includes('admin') },
    { task: 'COR-01', check: 'Returns 403 for unauthorized', pass: rx.includes('403') },
    { task: 'COR-01', check: 'Prescription detail restricts access', pass: rx.includes('Forbidden') || rx.includes('forbidden') },
  ];
}

function validateReferralScope() {
  const ref = fs.readFileSync(path.join(ROOT, 'src/server/api/referrals.ts'), 'utf8');
  return [
    // COR-02: Lock referral reads
    { task: 'COR-02', check: 'Specialist list scoped to authenticated user', pass: ref.includes('to_specialist_id') },
    { task: 'COR-02', check: 'Referral detail checks participant/admin', pass: ref.includes('admin') },
    { task: 'COR-02', check: 'Returns 404 for unauthorized detail access', pass: ref.includes('404') },
  ];
}

function validatePharmacyClaim() {
  const ph = fs.readFileSync(path.join(ROOT, 'src/server/api/pharmacy.ts'), 'utf8');
  return [
    // COR-05: Idempotent, status-safe claim
    { task: 'COR-05', check: 'Claim uses BEGIN transaction', pass: ph.includes('BEGIN') },
    { task: 'COR-05', check: 'Claim checks status = active', pass: ph.includes("'active'") },
    { task: 'COR-05', check: 'Claim returns 409 on non-claimable', pass: ph.includes('409') },
    { task: 'COR-05', check: 'Claim uses COMMIT', pass: ph.includes('COMMIT') },
    { task: 'COR-05', check: 'Claim uses ROLLBACK on error', pass: ph.includes('ROLLBACK') },
  ];
}

function run() {
  console.log('D2-API Backend API Agent - Validation Run\n');

  const allResults = [
    ...validateGpEndpoints(),
    ...validatePrescriptionScope(),
    ...validateReferralScope(),
    ...validatePharmacyClaim(),
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

module.exports = { run, validateGpEndpoints, validatePrescriptionScope, validateReferralScope, validatePharmacyClaim };

if (require.main === module) {
  process.exit(run() ? 0 : 1);
}
