console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'malcolmlow',
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

// ===================================

// The edit feature (Deliverable)

app.get('/artist/:id/edit', (request, response) => {

    const artistId = request.params.id;

    const queryString = 'SELECT * FROM artists WHERE id = $1'

    const values = [artistId];

    pool.query(queryString, values, (err, result)=> {

        if (err) {
            console.log('query error:', err.stack);
            response.send('query error');
        }
        else {

            const data = {
                artist : result.rows[0]
            }

            response.render('edit', data);
        }
    })
});

app.put('/artist/:id', (request, response) => {

    const artistId = request.params.id;

    const queryString = 'UPDATE artists SET name = ($1), photo_url = ($2), nationality = ($3) WHERE id = ($4) RETURNING *';

    const values = [request.body.name, request.body.photo_url, request.body.nationality, artistId];

    pool.query(queryString, values, (err,result) => {

        if (err) {
            console.log('query error', err.stack);
            response.send('query error');
        }
        else {

            const data = {
                artist : result.rows[0]
            }

            response.render('artist', data);
        }
    })
});

// ===================================

// The create feature (Deliverable)
app.get('/artist/new', (request, response) => {

    response.render('new');
});

app.post('/artist', (request, response) => {

    const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';

    const values = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(queryString, values, (err,result) => {

        if (err) {
            console.log('query error', err.stack);
            response.send('query error');
        }
        else {

            const data = {
                artist : result.rows[0]
            }

            response.render('artist', data);
        }
    })
});

// ===================================

// The show feature (Deliverable)
app.get('/artist/:id', (request, response) => {

    const artistId = request.params.id;

    const queryString = 'SELECT * FROM artists WHERE id = $1'

    const values = [artistId];

    pool.query(queryString, values, (err, result)=> {

        if (err) {
            console.log('query error:', err.stack);
            response.send('query error');
        }
        else {

            const data = {
                artist : result.rows[0]
            }

            response.render('artist', data);
        }
    })
});

// ===================================

// The index feature (Deliverable)
app.get('/', (request, response) => {

  const queryString = 'SELECT * from artists'

  pool.query(queryString, (err, result) => {

    if (err) {
        console.log('query error:', err.stack);
        response.send('query error');
    }
    else {
        // console.log('query result:', result.rows);
        response.render('home', result);
    }
  })
});

// ===================================

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