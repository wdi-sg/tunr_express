console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'claucanchin',
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

// the index feature
app.get('/artists', (request, response) => {
    // query database for all artists
    const queryString = 'SELECT * FROM artists';

    pool.query(queryString, (errorObj, result) => {
        // errorObj is null if there's no error
        if (errorObj === undefined) {

            console.log(result.rows);
            const data = { artists : result.rows };
            // respond with HTML page displaying all artists
            response.render('index', data);
        } else {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        }
    });
});

/**
 * ===================================
 * ===================================
 */

//the create feature
//displaying the form to add new artist
app.get('/artist/new', (request, response) => {
    // respond with HTML page with form to create new songs
    response.render('new');
});

//retrieving the form with user input
app.post('/artists', (request, response) => {

    // console.log(request.body);

    const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';

    const values = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(queryString, values, (errorObj, result) => {
        // errorObj is null if there's no error
        if (errorObj === undefined) {

            // console.log(result.rows);

            const data = { artist : result.rows };
            response.render('created', data);
        } else {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        }
    });
});

/**
 * ===================================
 * ===================================
 */

//the show feature
app.get('/artist/:id', (request, response) => {
    // query database for all artists
    const queryString = 'SELECT * FROM artists WHERE id=' + request.params.id;
        // response.send(queryString);
    pool.query(queryString, (errorObj, result) => {
        // console.log(errorObj, result);
        // errorObj is null if there's no error
        if (errorObj === undefined) {

            console.log('Query results: ', result.rows);
            const data = { artist : result.rows };
            // respond with HTML page displaying all artists
            response.render('show', data);
        } else {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        }
    });
});

/**
 * ===================================
 * ===================================
 */


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