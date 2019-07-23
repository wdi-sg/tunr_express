console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'bennychin',
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
app.use(express.static(__dirname+'/public/'));
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

 /**
 * ======================================================
 *             Route - Index - Homepage - Show
 * ======================================================
 */

app.get('/', (request, response) => {
  // query database for all artists
    const queryString = 'SELECT * from artists'

    pool.query(queryString, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );

        } else {
        console.log('query result:', result);

        // redirect to home page
        response.render('home',result);
      }
    });
  // response.send("hello tunr db");
});

app.get('/artist', (request, response) => {
    response.redirect('/');
});

 /**
 * ======================================================
 *                  Route - Add Artist
 * ======================================================
 */
app.get('/new', (request, response) => {
  // respond with HTML page with form to create new artist
    response.render('addArtist');
});

app.post('/artist', (request,response) => {
    console.log("request body is");
    console.log(request.body);

    const queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES('${request.body.name}', '${request.body.photo_url}', '${request.body.nationality}');`

    pool.query(queryString, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );

        } else {
        console.log('query result:', result);

        // redirect to home page
        response.redirect('/');
      }
    });
});


 /**
 * ======================================================
 *                 Route - Artist - Show
 * ======================================================
 */
app.get('/artist/:id', (request, response) => {
  // query database for selected artist by id
    const queryString = "SELECT * FROM songs WHERE artist_id = " + request.params.id + ""

    pool.query(queryString, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );

        } else {
        console.log('query result:', result);


        // redirect to home page
        response.render('artistPage',result);
        // response.send(result)
      }
    });
  // response.send("hello tunr db");
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