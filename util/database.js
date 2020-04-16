const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
    query: (queryText, queryValues) => {
        pool.query(queryText, queryValues);
    }
}