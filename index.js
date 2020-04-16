console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'lekhweemeng',
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
  response.render('main');
});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new tune
  response.render('new');
});

app.post('/artists', (request, response) => {
    let queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1,$2,$3)'
    const values = [request.body.artistName, request.body.photo, request.body.nationality];
    pool.query(queryString, values, (err,result)=> {
        if (err) {
            console.log('error: ', err.stack);
            response.send('query error');
        } else {
            console.log('query result: ', result);
            response.redirect('/');
        }
    })
});

app.get('/artists/:id', (request, response) => {
    let artistId = parseInt(request.params.id);
    let queryString = 'SELECT name FROM artists WHERE id =$1';
    const values=[artistId];
    pool.query(queryString, values, (err,result)=> {
        if (err) {
            console.log('error: ', err.stack);
            response.send('query error');
        } else {
            var data = {
                name: result.rows[0].name
            }
            console.log('query result: ', result.rows[0].name);
            response.render('oneArtist', data);
        };
    });
});

app.get('/artists/:id/songs', (request, response) => {
    let artistId = parseInt(request.params.id);
    let queryString = 'SELECT title FROM songs WHERE artist_id =$1';
    const values=[artistId];
    pool.query(queryString, values, (err,result)=> {
        if (err) {
            console.log('error: ', err.stack);
            response.send('query error');
        } else {
            var data = {
                songs: result.rows
            }
            console.log('query result: ', result.rows);
            response.render('artistSongs', data);
        };
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