console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'Hilman',
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
  response.redirect('/artists/');
});

//See all artists
app.get('/artists/', (request, response) => {
  response.render('index');
});

//Display the form for a single artist
app.get('/artists/new', (request, response) => {
  response.render('new');
});

//Create a new artist
app.post('/artists', (request, response) => {
  response.redirect('/artists/');
});

//See a single artist
app.get('/artists/:id', (request, response) => {
  response.render('show');
});

//Display the form for editing a single artist
app.get('/artists/:id/edit', (request, response) => {
  response.render('edit');
});

//Update a artist
app.put('/artists/:id', (request, response) => {
  response.redirect('/artists/');
});

//Remove a artist
app.delete('/artists/:id', (request, response) => {
  response.redirect('/artists/');
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