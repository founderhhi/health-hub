/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const { Pool } = require('pg');

const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
const seedPath = path.join(__dirname, '..', 'db', 'seed.sql');
const migrationsDir = path.join(__dirname, '..', 'db', 'migrations');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not set. Aborting.');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: process.env.DATABASE_SSL === 'false' ? undefined : { rejectUnauthorized: false }
});

async function run() {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  const seed = fs.readFileSync(seedPath, 'utf8');

  console.log('Applying schema...');
  await pool.query(schema);

  // [AGENT_DB] ISS-04: migrations must run before seed
  if (fs.existsSync(migrationsDir)) {
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter((file) => file.endsWith('.sql'))
      .sort();

    for (const file of migrationFiles) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      console.log(`Applying migration: ${file}`);
      await pool.query(sql);
    }

    console.log(`Applied ${migrationFiles.length} migration(s).`);
  }

  console.log('Applying seed data...');
  await pool.query(seed);

  console.log('Database initialized.');
  await pool.end();
}

run().catch((error) => {
  console.error('Database init failed:', error);
  process.exit(1);
});
