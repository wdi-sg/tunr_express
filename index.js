
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'elisu',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);
pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

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

/* ==== Front Page ==== */
app.get('/', (request, response) => {
  // for now just say hello world
  response.send('Hello World!');
});

/* ==== Request Artist Index Page ==== */
app.get('/artists', (request, response) => {

    console.log("now getting artists");
    const queryString = "SELECT * FROM artists";

    pool.query(queryString, (err, result) => {

        if (err) {
            console.log('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result);
            // response.send(result);
            response.render('artists.jsx', result);
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