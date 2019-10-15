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

app.get('/', (request, response) => {
  // query database for all artists/songs

  // respond with HTML page displaying all artists/songs
  response.render('home');
});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new artist
  response.render('newArtist');
});

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
            console.log("Error is " + err.message);
        } else {
            console.log("Artist added successfully");
        }
    });

    response.send(request.body);
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
