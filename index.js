console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'chanosborne',
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

//Home
app.get('/artists/', (request, response) => {
    response.render('home');
});

//Create New Artist
app.get('/artists/new', (request, response) => {
    response.render('new');
});

app.post('/artists', (request, response) => {
    const newArtist = request.body;

    let values = [newArtist.name, newArtist.photo_url, newArtist.nationality];
    let queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)';

    pool.query(queryString, values, (err, result) => {
        if (err) {
            console.log('Query Error', err.stack);
            response.send('An error occurred 😢');
        } else {
            const data = {
                name: newArtist.name,
                photo_url: newArtist.photo_url,
                nationality: newArtist.nationality
            }

        response.render('artist', data);
        }
    })
});

//Show Individual Artist
app.get('/artists/:id', (request, response) => {
    const queryString = 'SELECT * FROM artists ORDER BY id ASC';

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('Query Error', err.stack);
            response.send('An error occurred 😢');
        } else {
            let index = request.params.id - 1;
            const data = {
                id: result.rows[index].id,
                name: result.rows[index].name,
                photo_url: result.rows[index].photo_url,
                nationality: result.rows[index].nationality
            }

        response.render('show', data);
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