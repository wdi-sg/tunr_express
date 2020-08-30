// all db does is to link pool to model and export to app
// since db is wrapping model/queries,
// use model.querymethod to invoke the model
console.log('-- Setting up database --');

// configure pg
const pg = require('pg');

let configs = {
    user: 'Hilman',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

// link pool instances to database queries in models
const linkModelToPool = require('../models/queries');

const modelObject = linkModelToPool(pool);

// export model object for controller

module.exports = {
    // reference to pool to end connections
    pool: pool,

    // useful name please
    model: modelObject,
}