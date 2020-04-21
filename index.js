console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'yusofgotboudine',
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
  // respond with app home page
  response.render('home');
});

app.get('/artists/', (request, response) => {
  // query database for all artists
  const queryString = 'SELECT * from artists'

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send('query error');
    } else {
      console.log('query result:', result.rows);

      response.render('artists', result);
    }
  });
});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new artist
  response.render('new-artist');
});

app.post('/artists', (request, response) => {
  // respond with HTML page with created artist

  console.log(request.body);

  const whenQueryDone = (queryError, result) => {
    if (queryError) {
      console.log("Query Error Detected!");
      console.log("------------------");
      console.log(queryError)
    } else {
      console.log("New Artist Added!");
    }
  };

  const queryString = "INSERT INTO artists (name,photo_url,nationality) VALUES ($1,$2,$3) RETURNING *";
  const insertValues = [request.body.name, request.body.photo_url, request.body.nationality];

  pool.query(queryString, insertValues, whenQueryDone)

  response.render('artist-added', request.body);
});

app.get('/artists/:id', (request, response) => {
  // respond with HTML page with corresponding artist id
  // update jsx to include delete and edit button

  const queryString = 'SELECT * from artists WHERE id = ' + request.params.id;

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send('query error');
    } else {
      console.log('query result:', result.rows);

      response.render('artists', result);
    }
  });

});

/* to execute upon click of edit button */
app.get('/artists/:id/edit', (request, response) => {
  // respond with HTML page with form to edit artist
  const queryString = 'SELECT * from artists WHERE id = ' + request.params.id;

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send('query error');
    } else {
      console.log('query result:', result.rows);

      response.render('edit-artist', result);
    }
  });
  // response.render('edit-artist',);
});

app.post('/artists/:id', (request, response) => {
  // respond with HTML page with created artist

  console.log(request.body);

  const whenQueryDone = (queryError, result) => {
    if (queryError) {
      console.log("Query Error Detected!");
      console.log("------------------");
      console.log(queryError)
    } else {
      console.log("Artist Edit Complete!");
    }
  };

  const queryString = "UPDATE artists SET name = ($1), photo_url = ($2), nationality = ($3) WHERE id =" + request.params.id;
  const insertValues = [request.body.name, request.body.photo_url, request.body.nationality];

  pool.query(queryString, insertValues, whenQueryDone)

  response.render('artist-edited', request.body);
});

/* to execute upon click of delete button */
// app.delete("/artists/:id", (request, response) => {
//   //read the file in and write out to it
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function () {

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end(() => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
