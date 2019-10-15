console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'home',
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

app.get('/artists', (request, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  response.render('home');
});

app.get('/artists/new', (request, response) => {
  response.render('new');
});

let queryString;
app.get('/artists/:id', (request, response) => {
    let identifier = parseInt(request.params.id)

    queryString = `SELECT * FROM artists WHERE id = '${identifier}'`

     pool.query(queryString, (err, result) => {
        console.log(queryString)

          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            console.log('query result:', result);

            const data = {
                artist: result.rows[0]
            }
            response.render('artist',data)
          }
    });
});

app.post('/artists', (request, response) => {

let art = request.body
const array = [art.name,art.photo,art.nationality]
console.log(array)

const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';


    pool.query(queryString, array, (err, result) => {
        console.log(queryString)

          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            console.log('query result:', result);

            // redirect to home page
            response.send( result.rows );
          }
    });
});

app.get('/artists/:id/songs', (request, response) => {
    let identifier = parseInt(request.params.id)

    queryString = `SELECT title,album FROM songs WHERE artist_id = '${identifier}'`

     pool.query(queryString, (err, result) => {
        console.log(queryString)

          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            console.log('query result:', result.rows);

            const data = {
                songs: result.rows
            }

            // const data = {
            //     artist: result.rows[0]
            // }
            // response.render('artist',data)

            response.render('songs',data)
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