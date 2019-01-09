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
    password: 'postgres'
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
    response.redirect('/artists/');
})

app.get('/songs/', (request, response) => {
    const queryString = 'SELECT * FROM songs ORDER BY id'
    pool.query(queryString, (err, result) => {
        if (err) {
          console.error('query error:', err.stack);
          response.send( 'query error' );
        } else {
          // redirect to home page
          response.render('songs', {'songs': result.rows});
        }
      });
});

app.get('/artists/', (request, response) => {
    const queryString = 'SELECT * FROM artists ORDER BY id'
    pool.query(queryString, (err, result) => {
        if (err) {
          console.error('query error:', err.stack);
          response.send( 'query error' );
        } else {
          // redirect to home page
          response.render('artists', {'artists': result.rows});
        }
      });
});

app.get('/artists/:id', (request, response) => {
    const queryString = `SELECT * FROM artists WHERE id=${request.params.id}`
    pool.query(queryString, (err, result) => {
        err ? console.error(err.stack) : null;
        response.render('artist', {'artist': result.rows[0]});
    });
});

app.get('/songs/:id', (request, response) => {
    const queryString = `SELECT * FROM songs WHERE id=${request.params.id}`
    pool.query(queryString, (err, result) => {
        err ? console.error(err.stack) : null;
        response.render('song', {'song': result.rows[0]});
    });
});

app.delete('/artists/:id/delete', (request, response) => {
    const queryString = `DELETE FROM artists WHERE id=$1`;
    let values = [request.params.id];
    pool.query(queryString, values, (err, result) => {
        err ? console.error(err.stack) : null;
        response.redirect('/artists/');
    })
});

app.get('/artists/new', (request, response) => {
    response.render('new');
});


app.get('/artists/:id/edit', (request, response) => {
    const queryString = `SELECT * FROM artists WHERE id=${request.params.id}`
    pool.query(queryString, (err, result) => {
        err ? console.error(err.stack) : null;
        response.render('edit', {'artist': result.rows[0]});
    });
});

app.post('/artists/new', (request, response) => {
    let submitted = request.body;
    let values = [submitted.name, submitted.photo_url, submitted.nationality];
    const queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)`;

    pool.query(queryString, values, (err, result) => {
        err ? console.error(err.stack) : null;
        response.redirect('/');
    });
});

app.put('/artists/:id/put', (request, response) => {
    const queryString = `UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4`;
    let values = [request.body.name, request.body.photo_url, request.body.nationality, request.params.id]
    pool.query(queryString, values, (err, result) => {
        err ? console.error(err.stack) : null;
        response.redirect('/artists/' + request.params.id);
    });
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function () {

    console.log("closing");

    server.close(() => {

        console.log('Process terminated');

        pool.end(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);