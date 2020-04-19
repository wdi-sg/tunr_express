// create postgres-node connection pool
const pg = require('pg');
const configs = {
  user: 'dwu',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);
pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

// generic SQL query helper function
const makeQuery = async function (query, values) {
  try {
    let results = await pool.query(query, values);
    return results.rows;
  }
  catch (err) {
    return err;
  }
};

module.exports = makeQuery;
