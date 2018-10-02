console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');


// Initialise postgres client
const configs = {
    user: 'mac',
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

app.use(express.static('public'))

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

app.get('/', (req, res) => {
    // respond with HTML page displaying all artist
    let sqlText = 'SELECT * FROM artists';

    pool.query(sqlText, (error, queryResults) => {
        if (error) {
            console.log('error!', error);
            res.status(500).send('DIDNT WORKS!!');
        } else {
            res.render('home', { artists: queryResults.rows });
        }
    });
});


app.get('/artist/:id', (req, res) => {
    // respond with HTML page displaying id-ed artist
    let resId = req.params.id;
    let sqlText = 'SELECT * FROM artists WHERE id =' + resId;

    pool.query(sqlText, (error, queryResults) => {
        if (error) {
            console.log('error!', error);
            res.status(500).send('DIDNT WORKS!!');
        } else {
            res.render('artist', { artists: queryResults.rows });
        }
    });
});


app.get('/new', (request, response) => {
    // respond with HTML page with form to create new artist page
    response.render('new');
});





/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// server.on('close', () => {
//   console.log('Closed express server');

//   db.pool.end(() => {
//     console.log('Shut down db connection pool');
//   });
// });