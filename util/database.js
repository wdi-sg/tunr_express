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
    poolEnd: async () => {
        await pool.end(() => console.log('Shut down db connection pool'));
    },

    query: async (queryText, queryValues) => {

        try {

            const client = await pool.connect();
            console.log('connected!');

            const res = await pool.query(queryText, queryValues);

            client.release();
            console.log('released!');

            return res;

        } catch (e) {
            console.log(`Error\n` + e.message, e.stack);
        }
    },
}