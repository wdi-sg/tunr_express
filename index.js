console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'stuartmyers',
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

app.get('/', (request, response) => {

    // respond with HTML page displaying all
    const message = "hello world";
    data = {
        message: message
    };
    response.render('home', data);
});

app.get('/artists/new', (request, response) => {
    // respond with HTML page with form to create new
    response.render('new');
});

app.get('/artists/:id', (request, response) => {
    if (isNaN(request.params.id)) {
        response.render('home', {
            message: 'Invalid Id No.'
        });
        return;
    };
    const queryString = "SELECT * FROM artists WHERE id=$1";
    const queryValues = [request.params.id];
    pool.query(queryString, queryValues, (err, result) => {
        if (err) {
            console.log(err);
            response.render('home', {
                message: "Error!"
            });
            return;
        }
        if (!result.rows.length) {
            const data = {
                message: "Invalid Artist Id"
            };
            response.render('home', data);
            return;
        }
        const artist = result.rows[0];

        const message = `Artist: ${artist.name} - Nationality: ${artist.nationality}`;
        const data = {
            message: message
        };
        response.render('home', data);

    })
})

app.post('/artists', (request, response) => {
    // respond with HTML page with form to create new
    const message = `${request.body.name} = ${request.body.photo_url} - ${request.body.nationality}`;
    const queryString = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3);"
    const queryValues = [request.body.name, request.body.photo_url, request.body.nationality];
    pool.query(queryString, queryValues, (err, result) => {
        if (err) {
            console.log(err);
            response.render('home', {
                message: "Error!"
            })
            return;
        }

        const message = "artist added";
        const data = {
            message: message
        };
        response.render('home', data);
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
