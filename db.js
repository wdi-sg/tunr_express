const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'clairetay',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

const allTunrModelsFunction = require('./models/tunr')
const tunrModelsObject = allTunrModelsFunction(pool)



module.exports = {
    pool: pool,
    tunr: tunrModelsObject,
    queryInterface: (text, params, callback) =>{
        return pool.query(text, params, callback)
    }
}