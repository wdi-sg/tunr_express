

console.log("Starting up!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');


const configs = {
    user: 'kencheng',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(methodOverride('_method'));


const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);


/**
 * ===================================
 * Routes
 * ===================================
 */


app.get('/artists/:id', (request, response) => {

    let text = `SELECT * FROM artists WHERE id = ${request.params.id}`;

    pool.query(text, (err, result) => {

        if (err) {

            console.log(err);
            response.status(500).send("pool.query error");

        } else {

            console.log("result.rows: ", result.rows);
            response.render('artist_show', {artist: result.rows});
        };
    });
});


app.get('/artists', (request, response) => {

    let text = "SELECT * FROM artists";

    pool.query(text, (err, result) => {

        if (err) {

            console.log(err);
            response.status(500).send("pool.query error");

        } else {

            console.log("result.rows: ", result.rows);
            response.render('artists_index', {artists: result.rows});
        };
    });
});


app.get('/', (req, response) => {

    response.render('root');
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */


const server = app.listen(3001, () => console.log('~~~ Tuning in to the waves of port 3001 ~~~'));

server.on('close', () => {
    console.log('Closed express server');

    db.pool.end(() => {
        console.log('Shut down db connection pool');
    });
});