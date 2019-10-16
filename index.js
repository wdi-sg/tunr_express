console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'syahirah',
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

//test with 'Hello World'
app.get('/', (request, response) => {
  response.send('Hello World');
});

//SHOWS FORM TO CREATE NEW ARTIST
app.get('/artists/new', (request, response) => {
  response.render('new');
});

//SUBMITS FORM TO CREATE NEW ARTIST
app.post('/artists', (request, response) => {
    let newArtist = request.body;
    let newValues = [newArtist.name, newArtist.photo_url, newArtist.nationality];

    const newData =  "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *";

    pool.query(newData, newValues, (err, result) => {

    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    } else {
        console.log('query result:', result);

        // redirect to home page
        response.send( result.rows[0] );
    }
    });
});

//SHOW INDIVIDUAL ARTIST PAGE
app.get('/artists/:id', (request, response) => {
    let inputId = request.params.id;
    const artistsList = `SELECT * FROM artists WHERE id = ${inputId}`;

    // find artist by id from the artists table
    pool.query(artistsList, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'Artist not found' );
        } else {
            console.log('query result:', result);
            const theArtist = {
                "id": result.rows[0].id,
                "name": result.rows[0].name,
                "photo_url": result.rows[0].photo_url,
                "nationality": result.rows[0].nationality
            };
            // redirect to home page
            response.render('individual', theArtist);
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