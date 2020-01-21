console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'postgres',
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
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {
    response.render('home');
});

app.get('/artists/new', (request, response) => {
    // respond with HTML page with form to create new artist
    response.render('new');
});

app.get('/artists/:id', (request, response) => {
    let id = request.params.id;
    let text = "SELECT * FROM artists WHERE id=$1"
    let values = [id]
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log("Error :", err);
        }
    let data = result.rows[0];
    response.render('artists', data)
    })
})

















app.post('/artists', (request, response) => {
    let text = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id;";
    let values = [
    request.body.name, request.body.photo_url, request.body.nationality
    ];
    let data = {
        values : values
    };
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log("Error :", err);
            response.status(500).send(err);
        } else {
            response.render('home', data)
        }
    })
})










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
