console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'leowzhenkang',
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
//render home for app
app.get('/tunr', (request, response) => {
  response.render('home');
});
//render form for adding new artists
app.get('/new', (request, response) => {
  response.render('new');
});
//POST function for adding new artists
app.post('/tunr', (request, response) => {
    const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)'
    console.log(request.body)

    const values = [
        request.body.name,
        request.body.photo_url,
        request.body.nationality
    ];
    console.log(values)

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result);

            // redirect to home page
            response.send("Song Added!");
        }
    });
});

//for displaying list of all pokemon in table
app.get('/artists/:id', (req, response) => {
    // query database for all pokemon
    const queryString = 'SELECT * from artists'

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log(req.params.id - 1)
            response.send(result.rows[req.params.id - 1]);
        }
    });
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