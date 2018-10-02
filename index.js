console.log('starting up!!');

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

const PORT = process.env.PORT || 80;

// Initialise postgres client
const configs = {
  user: 'lamesensei',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', (err) => {
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
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(methodOverride('_method'));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (req, res) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  res.render('home');
});

app.get('/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(PORT);

server.on('close', () => {
  console.log('Closed express server');

  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });
});
