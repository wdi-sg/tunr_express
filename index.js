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
app.get('/artists/', (request, response) => {

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



//Create a new artist in the database
app.get('/artists/new', (request, response) => {
    response.render('add');
});

app.get('/artists/:id/songs/new', (request, response) => {

    const userInput = parseInt(request.params.id);
    const data = {artistId: userInput};


    response.render('newsong', data);
});



app.post('/artists/:id/songs', (request, response) => {

    let queryText = 'INSERT INTO songs(title, album, preview_link, artwork, artist_id) VALUES($1, $2, $3, $4, $5) RETURNING *';
    let values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, request.params.id];

    pool.query(queryText, values, (err, result) => {

        if (err) {
            console.error('query error:', err);
            response.send('LINE 101 query error');
          } else {
            response.send(result);
          }
    });

});
//======================================================
//In order to see the new data =>
//Use psql / RETURNING * + response.send(result) / with app.get(/artists/:id/songs)
//======================================================



//Displays a list of songs for the selected artist
app.get('/artists/:id/songs', (request, response) => {
    const queryString = 'SELECT * from songs WHERE artist_id=' + request.params.id;

    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err);
            response.send('LINE 125 query error');
          } else {
            const userInput = parseInt(request.params.id);

            const artistId = result.rows[0].artist_id;

            const data = {songs: result.rows};
            response.render('displaysongs', data);
          }

    });

});



//Will show the selected artist info
app.get('/artists/:id', (request, response) => {
    const queryString = 'SELECT * from artists WHERE id=' + request.params.id;
//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
    // console.log("SQL query: ", queryString);
//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err);
            response.send( 'LINE 98 query error' );
          } else {
            const userInput = parseInt(request.params.id);
//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
            // console.log("HEY userInput is here: ", userInput);
            // console.log(result.rows);
//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
            const artistId = result.rows[0].id;
//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
            // console.log("HEY artistID is:", artistId);
//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
            const data = { artist: result.rows };
            response.render('showartist', data );
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