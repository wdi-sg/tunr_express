const { Pool } = require('pg');

const configs = {
    user: 'zachariah',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
};

const pool = new Pool(configs);

pool.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});


module.exports = {
    query: async (queryText, queryValues) => {

        await pool.connect(() => {
            console.log('connected');
        });

        return await pool.query(queryText, queryValues);
    },
}