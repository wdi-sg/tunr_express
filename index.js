console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'hilmijohari',
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

  response.redirect('/artists');

});


app.get('/artists', (request, response) => {
  // query database for all artists
  // respond with text that lists the names of all the pokemons

  let queryString = "SELECT * FROM artists ORDER BY id ASC";

  pool.query(queryString, (err, result) => {

    if (err) {
      console.log('query error:', err.stack);
      response.send( 'query error' );

    } else {
      console.log('query result:', result);

      console.log(result.rows);

      const data = {
        artist : result.rows
      }

      response.render('home', data);
    }
  });

});

app.get('/artists/:id', (request, response) => {

    let queryString = "SELECT * FROM artists WHERE id=$1";
    let values = [request.params.id]

    pool.query(queryString, values, (err, result) => {

    if (err) {
      console.log('query error:', err.stack);
      response.send( 'query error' );

    } else {
      console.log('query result:', result.rows[0]);

      const data = {
        artist : result.rows[0]
      }

      response.render('singleArtist', data);
    }
  });
});



app.get('/new', (request, response) => {

    response.render('form');

});

app.post('/artists', (request, response) => {

    let queryString = "INSERT INTO artists (name, photo_url, nationality, info) VALUES ($1, $2, $3, $4)"
    let values = [request.body.name, request.body.photo_url, request.body.nationality, request.body.info]

    pool.query(queryString, values, (err, result) => {

    if (err) {
      console.log('query error:', err.stack);
      response.send( 'query error' );

    } else {
      console.log('query result:', result.rows);

      response.redirect('/artists')
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