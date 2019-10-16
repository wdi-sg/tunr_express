console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'mariadimitrijevic',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(methodOverride('_method'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

//index - render home
app.get('/', (request, response) => {
    // query database for all artists

    // respond with HTML page displaying all artists
    response.render('home');
});

//table for creating new artist
app.get('/artists/new', (request, response) => {
    // respond with HTML page with form to create new artist
    response.render('new');
});


app.get('/artists', (request, response) => {

    // const data = {artists: result.rows};


    const queryText = "SELECT * FROM artists";

    pool.query(queryText, (err, queryRes) => {
        // const data = {artists: queryRes.rows};

         const artistsDB = queryRes.rows;
         const data = {
            artists: artistsDB
        };

        // if (err) {
        //     return console.error('Error executing query', err.stack)
        // }


        console.log(queryRes.rows);
        response.render('home', data);
    });
});





//show single artist
app.get('/artists/:id', (request, response) => {

    const queryText = "SELECT * FROM artists";

    pool.query(queryText, (err, queryRes) => {
        console.log(queryRes);

        const artistsDB = queryRes.rows; //the array of objects from the database

        const data = {
            artists: artistsDB
        };

        response.render('showSingleArtist', data);

    })
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function() {

    console.log("closing");

    server.close(() => {

        console.log('Process terminated');

        pool.end(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);