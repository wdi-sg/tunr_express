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

// RESTful Routing
// URL          HTTP Verb   Action      SQL
// /photo/      GET         index       SELECT
// /photos/new  GET         new         N/A (SELECT)
// /photos      POST        create      INSERT
// /photos/:id  GET         show        SELECT
// /photos/:id/ edit        GET edit    SELECT
// /photos/:id  PATCH/PUT   update      UPDATE
// /photos/:id  DELETE      destroy     DELETE

app.get('/', (request, response) => {
  response.send('Hello World');
});


//Build the index feature for artists
app.get('/artists/', (request, response) => {
    pool.query('SELECT * FROM artists;',(err,queryResult) => {
        if (err) {
            console.log('query error', err.message);
        } else {
            const artists = queryResult;
            response.render('artists', artists);
        }
    })
})


//Build a feature that creates a new artist in the database.
app.get('/artists/new', (request, response) => {
    pool.query('SELECT * FROM artists',(err,queryResult) => {
        if (err) {
            console.log('query error', err.message);
        } else {
            const columns = queryResult;
            response.render('artistNew', columns);
        }
    })
});

app.post('/artists', (request, response) => {
    let text = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id;';
    let values = [];
    console.log(request.body);
    values.push(request.body.name);
    values.push(request.body.photo_url);
    values.push(request.body.nationality);
    console.log(values)
    pool.query(text, values,(err,queryResult) => {
        if (err) {
            console.log('query error', err.message);
        } else {

            const newID = queryResult.rows[0].id;
            console.log(newID);
            response.redirect('/artists/'+newID);
        }
    })
});


//Build the show feature for an artist
app.get('/artists/:id', (request, response) => {
    let id = request.params.id;
    pool.query('SELECT * FROM artists WHERE id ='+id,(err,queryResult) => {
        if (err) {
            console.log('query error', err.message);
        } else {
            const artists = queryResult.rows[0];
            console.log(artists);
            response.render('artistByID', artists);
        }
    })
});


//Build a feature that allows a user to edit an existing artist in the database





//Build a feature that allows users to delete an existing artist from the database.



//create the 7 RESTful Routes for songs



//make routes forsongs that are nested under artists: /artist/1/songs



//make route /artist/1/songs

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
