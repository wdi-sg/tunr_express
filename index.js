console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'sirron',
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

//app.get to see all the artist
app.get('/', (request, res) => {
    const text = 'SELECT * FROM artists'

    pool.query(text, (err, result) => {
        if (err) {
            console.log("query error", err.message);
        } else {
            console.log("result", result.rows);
            res.send(result.rows);
            // res.render('home');
        }
    });
    // response.render('home');
});


//app.get to create a form for new artist
app.get('/artist/new', (request, res) => {

    res.render('new');
});



//app.post to create a new artist
app.post('/artist', (request, res) => {
    console.log(request.body);
    const artistArray = [request.body.name, request.body.photo_url, request.body.nationality];

    const text = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';
    pool.query(text, artistArray, (err, result) => {

        if (err) {
            console.error("query error", err.message);
            res.send("query error");
        } else {
            console.log("query result :", result);
            res.send(result.rows);
        }
    });
});

//app.get to see a single artist
app.get('/artist/:id', (request, res) => {
    const id = parseInt(request.params.id);
    const inputValues = [id];
    const text = "SELECT * FROM artists WHERE id = ($1)";

    pool.query(text, inputValues, (err, result) => {
    console.log(result.rows);
    res.send(result.rows[0]);
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