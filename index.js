console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'siewling',
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

// GET Method - query database for all artists
app.get('/artists/', (request, response) => {

    // Construct the select statement to get all artists from database
    const queryString = 'SELECT * FROM artists';

    // Use pool.query to run the select query
    pool.query(queryString, (err, result) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {

            const data = {
                artists: result.rows
            };
            // respond with HTML page displaying all artists
            response.render('home', data);
        }
    });
});

// GET Method - query database for an individual artist
app.get('/artists/:id', (request, response) => {

    // Get the ID from the URL parameter
    let artistID = request.params.id;

    // Construct the select statement to get all artists from database
    const queryString = 'SELECT * FROM artists WHERE id=' + artistID;

    // Use pool.query to run the select query
    pool.query(queryString, (err, result) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {

            const data = {
                artist: result.rows
            };
            // respond with HTML page displaying all artists
            response.render('artistInfo', data);
        }
    });
});

// GET Method - respond with HTML page with form to create new artist
app.get('/artists/new', (request, response) => {
  response.render('newArtist');
});

// POST Method - to create new artist in DB
app.post('/artists', (request, response) => {

    // Get the individual values from each field of the request body
    let artistName = request.body.artistName;
    let photoURL = request.body.photoURL;
    let nationality = request.body.nationality;

    const inputValues = [artistName, photoURL, nationality];

    // Construct the insert into query with the values from the request body
    const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';

    // Use pool.query to run the insert query
    pool.query(queryString, inputValues, (err, result) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {
            console.log("Artist added successfully");
        }
    });

    response.send(request.body);
});

// GET method - To display songs for an artist
app.get('/artists/:id/songs', (request, response) => {

    // Get the ID from the URL parameter
    let artistID = request.params.id;

    // Construct the select query to get the song where the artist id = param id
    const queryString = 'SELECT * FROM songs WHERE artist_id=' + artistID;

    // Display the result using pool.query
    pool.query(queryString, (err, resultOfSongsByArtist) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {

            const getArtistName = 'SELECT name FROM artists WHERE id=' + artistID;

            pool.query(getArtistName, (err, resultOfArtistName) => {

                const data = {
                    artistName: resultOfArtistName.rows,
                    artistSongs: resultOfSongsByArtist.rows
                };

                response.render('artistSongs', data);
            });
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
