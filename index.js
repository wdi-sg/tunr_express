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
app.get('/artists/', async (request, response) => {
  const result = await pool.query("select * from artists")
  response.render('index', {data:result.rows});
});

//Display the form for a single artist
app.get('/artists/new', (request, response) => {
  response.render('new');
});

//Create a new artist
app.post('/artists', async (request, response) => {
  let query =
  `INSERT INTO artists
  (name, photo_url, nationality)
  VALUES ($1, $2, $3)`

  let values = [
  request.body.name,
  request.body.photo_url,
  request.body.nationality,
  ]

  const append = await pool.query(query, values)
  response.redirect('/artists/');
});

//See a single artist
app.get('/artists/:id', async (request, response) => {
  let query =
  `select *
  from artists
  where id = ${request.params.id}`

  const result = await pool.query(query);
  response.render('show', {...result.rows[0]});
});

//Display the form for editing a single artist
app.get('/artists/:id/edit', async (request, response) => {
  let query =
  `select *
  from artists
  where id = ${request.params.id}`

  const result = await pool.query(query);
  response.render('edit', {...result.rows[0]});
});

//Update a artist
app.put('/artists/:id', async (request, response) => {

  let query=
  `update artists
  set
  name=$1,
  photo_url=$2,
  nationality=$3
  where id=$4`

   let values = [
  request.body.name,
  request.body.photo_url,
  request.body.nationality,
  request.params.id,
  ]

  const update = await pool.query(query, values);
  response.redirect(`/artists/${request.params.id}`);
});

//Remove a artist
app.delete('/artists/:id', async (request, response) => {
  let query=
  `delete from artists
  where id = $1`
  let deletion = await pool.query(query, [request.params.id])
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