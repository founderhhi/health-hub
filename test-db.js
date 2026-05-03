import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool();
pool.query('select * from users limit 1')
  .then(res => console.log("Columns:", Object.keys(res.rows[0])))
  .catch(err => console.error("Error:", err.message))
  .finally(() => pool.end());
