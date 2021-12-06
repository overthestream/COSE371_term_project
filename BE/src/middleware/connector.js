const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cose371',
  password: '0129',
  port: 5433,
});

const queryGenerator = async (queryStr, queryVal) => {
  const client = await pool.connect();
  try {
    const res = await client.query(queryStr, queryVal);
    client.release();
    return res.rows;
  } catch (err) {
    return err;
  }
};

module.exports = queryGenerator;
