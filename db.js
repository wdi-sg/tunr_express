const pg = require('pg');
// const url = require('url');

// var configs;

// if (process.env.DATABASE_URL) {
//     const params = url.parse(process.env.DATABASE_URL)
//     const auth = params.auth.split(':');

//     configs = {
//         user: auth[0],
//         password: auth[1],
//         host: params.hostname,
//         port: params.port,
//         database: params.pathname.split('/')[1],
//         ssl: true
//     };

// } else {
//    configs = {
//         user: 'vincent',
//         host: '127.0.0.1',
//         database: 'tunr_db',
//         port: 5432
//     };
// }

let configs = {
    user: 'vincent',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432
};

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});

// import/require models files

const allArtistFunction = require('./models/artist');
let artistModelsObject = allArtistFunction(pool);

const allSongFunction = require('./models/song');
let songModelsObject = allSongFunction(pool);

console.log("HELLO");

// module export

module.export = {
    // make queries using this method
    queryInterface: (text, params, callback) => {
        return pool.query(text, params, callback);
    },

    // get a reference to end the connection pool at server end
    pool: pool,

    // add app models here
    artist: artistModelsObject,
    song: songModelsObject
};