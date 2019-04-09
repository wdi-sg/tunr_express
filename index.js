console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'khyreerusydi',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
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
 * Function Declarations For Routes
 * ===================================
 */

let lookupArtistById = (request, response) => {
    // get id from request
    let inputId = parseInt( request.params.id );
    // form query string
    let queryText = `SELECT * FROM artists WHERE id = ${inputId}`;
    // query database for id
    pool.query(queryText, (err, result) => {
        if (err) {
            console.log("query error", err.message);
            response.send('query error');
        }
        else {
            // respond with HTML page displaying artist's details
            console.log(result.rows);
            response.render('ViewArtist', {artist: result.rows[0]});
        }
    });
}

let homepage = (request, response) => {
    // form query string
    let queryText = 'SELECT * FROM artists';
    // query database for so and so
    pool.query(queryText, (err, result) => {
        if (err) {
            console.log("query error", err.message);
            response.send('query error');
        }
        else {
            // respond with HTML page displaying welcome message
            // console.log(result.rows);
            // find a way to query both tables at the same time?
            response.render('home', {artists: result.rows});
        }
    });
}

let redirectToHomepage = (request, response) => {
    response.redirect('/');
}

/**
 * ===================================
 * Routes
 * ===================================
 */

// get a specified artist's details by ID
app.get('/artist/:id', lookupArtistById);

// redirects /artists to default index page
app.get('/artists', redirectToHomepage);

// default index page
app.get('/', homepage);

app.get('/new', (request, response) => {
    // respond with HTML page with new form - to update
    response.render('new');
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){

    console.log("closing");

    server.close(() => {

        console.log('Process terminated');

        pool.end( () => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);