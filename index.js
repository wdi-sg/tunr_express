console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'postgres',
  password: 'postgres',
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

app.get('/artists', (request, response) => {

  const queryString = "SELECT * FROM artists";

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('59 query error:', err.stack);
      response.send( 'query error' );
    } else {
      const data = { artists: result.rows };
      response.render('home', data );
    }
  });
});

app.get('/artists/new', (request, response) => {
  response.render('new');
});

app.post('/artists', (request, response) => {

  const queryString = "INSERT INTO artists(name, nationality, photo_url) VALUES($1,$2,$3) RETURNING id";
  const values = Object.values(request.body);

  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.error('80 query error:', err.stack);
      response.send( 'query error' );
    } else {
      response.redirect(`/artists/${result.rows[0].id}`);
    }
  });
});

app.get('/artists/:id/edit', (request, response) => {

  const id = request.params.id;

  const queryString = `SELECT * FROM artists WHERE id='${id}'`;

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('96 query error:', err.stack);
      response.send( 'query error' );
    } else {
      const data = { artist: result.rows };
      response.render('editArtist', data );
    }
  });
});

app.put('/artists/:id', (request, response) => {

  const id = request.params.id;
  const object = request.body;
  const name = object.name;
  const nationality = object.nationality;
  const url = object.url;

  const queryString = `UPDATE artists SET name='${name}', nationality='${nationality}', photo_url='${url}' WHERE id='${id}' RETURNING id`;

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('117 query error:', err.stack);
      response.send( 'query error' );
    } else {
      response.redirect(`/artists/${result.rows[0].id}`);
    }
  });
});

app.get('/artists/:id/delete', (request, response) => {

  const id = request.params.id;

  const queryString = `SELECT * FROM artists WHERE id='${id}'`;

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('134 query error:', err.stack);
      response.send( 'query error' );
    } else {
      const data = { artist: result.rows };
      response.render('deleteArtist', data );
    }
  });
});

app.delete('/artists/:id', (request, response) => {

  const id = request.params.id;

  const queryString = 
  `DELETE FROM artists WHERE id='${id}'`;

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('134 query error:', err.stack);
      response.send( 'query error' );
    } else {
      response.redirect('/artists');
    }
  });
});

app.get('/artists/:id', (request, response) => {

  const id = request.params.id;

  const queryString = `SELECT * FROM artists WHERE id='${id}'`;

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('152 query error:', err.stack);
      response.send( 'query error' );
    } else {
      const data = { artist: result.rows };
      response.render('showSingleArtist', data );
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
