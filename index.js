console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'KWAN',
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

app.use(express.static(__dirname+'/public'));



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
 * Artist Index Route
 * ===================================
 */


app.get('/', (request, response) => {
  // query database for all pokemon
  const queryString = 'SELECT * from artists ORDER BY id';

  pool.query(queryString, (err, result) => {

  if (err) {
    console.error('query error:', err.stack);
    response.send( 'query error' );
  } else {
    console.log('query result:', result);

    let data = {
        artists: result.rows
    }

    // redirect to home page
    // response.send( result.rows );
    response.render('home', data);

    // response.redirect('/show/'+idvariable)
    }
});
});

/**
 * ===================================
 * Single Artist Route
 * ===================================
 */

app.get('/single/:id', (request, response) => {

    const queryString = 'SELECT * from artists WHERE id = $1';

    const VALUES = [request.params.id]

    pool.query(queryString, VALUES, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {

        // let data = {
        // artists: result.rows[request.params.id-1]
        response.render('single', result);

        console.log('query result:', result);
        }

    });
});
// });
/**
 * ===================================
 * Create New Artist
 * ===================================
 */
app.get('/new', (request, response) => {

    response.render('newartist');
});

app.post('/newartist', (request, response) => {

    const queryString = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)";

    const VALUES = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(queryString, VALUES, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {

            response.redirect('/');
        }
        // console.log('query result:', result);
    });
});
/**
 * ===================================
 * Edit Artist
 * ===================================
 */
app.get('/single/:id/edit', (request, response) => {

    const queryString = 'SELECT * from artists WHERE id = $1';

    const VALUES = [request.params.id]

    pool.query(queryString, VALUES, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {

        console.log('query result:', result.rows[0]);
        response.render('edit', {artist: result.rows[0]});

        }

    });

});

app.put('/single/:id', (request, response) => {

    const queryString = "UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4";

    const VALUES = [request.body.name, request.body.photo_url, request.body.nationality, request.body.id];

    pool.query(queryString, VALUES, (err, result) => {
        console.log(result);

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
            response.redirect('/');
        }
        // console.log('query result:', result);
    });
});
/**
 * ===================================
 * Delete Artist [undone]
 * ===================================
 */
app.get('/single/:id/delete', (request, response) => {

    const queryString = 'SELECT * from artists WHERE id = $1';

    const VALUES = [request.params.id]

    pool.query(queryString, VALUES, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {

        console.log('query result:', result.rows[0]);
        response.render('delete', {artist: result.rows[0]});

        }

    });

});

app.delete('/single/:id', (request, response) => {

    const queryString = "DELETE FROM artists WHERE id=$1";

    const VALUES = [request.body.id];

    pool.query(queryString, VALUES, (err, result) => {
        console.log(result);

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
            response.redirect('/');
        }
        // console.log('query result:', result);
    });
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3001, () => console.log('~~~ Tuning in to the waves of port 3001 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);