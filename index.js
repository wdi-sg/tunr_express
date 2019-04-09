console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'yuiterai',
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
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  response.render('home');
});



//Show a list of all artists name
app.get('/artist/', (request, response) => {

    const queryString = 'SELECT * FROM artists'

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            const data = {artists: result.rows};

            response.render('selectartist', data);
          }

  });
});



//Will show the selected artist info
app.get('/artist/:id', (request, response) => {

    const queryString = 'SELECT * from artists WHERE id='+request.params.id;


//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
    console.log("SQL query: ", queryString);
//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//

    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            const userInput = parseInt(request.params.id);


//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
            console.log("HEY userInput is here: ", userInput);
            console.log(result.rows);
//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//


            const artistId = result.rows[0].id;


//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
            console.log("HEY artistID is:", artistId);
//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//

            const data = { artist: result.rows };
            response.render('showartist', data );
          }
     });
});







app.get('/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
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