console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'll',
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
  // query database for all artists
    const queryString = 'SELECT * from artists';
    pool.query(queryString, (errorObj, result) => {
        if (errorObj === undefined) {
            console.log('query result:', result.rows);
            const data = {  artists : result.rows};
            response.render('home', data);
        } else {
            console.error('query error:', errorObj.stack);
            response.send( 'query error' );
        }
  // respond with HTML page displaying all artists
    });
})

app.get('/:id', (request, response) => {
    const queryString = 'SELECT * from artists WHERE id =' + request.params.id;
    pool.query(queryString, (errorObj, result) => {
        if (errorObj === undefined) {
            console.log('query result:', result.rows);
            const data = {  artists : result.rows};
            response.render('show', data);
        } else {
            console.error('query error:', errorObj.stack);
            response.send( 'query error' );
        }
    });
})

app.get('/new', (request, response) => {
    const queryString = 'SELECT * from artists WHERE id =' + request.params.id;
    pool.query(queryString, (errorObj, result) => {
        if (errorObj === undefined) {
            console.log('query result:', result.rows);
            const data = {  artists : result.rows};
            response.render('show', data);
        } else {
            console.error('query error:', errorObj.stack);
            response.send( 'query error' );
        }
    });
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