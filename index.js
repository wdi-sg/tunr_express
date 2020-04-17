console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'Azhar',
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

//Unused boilerplate
// app.get('/', (request, response) => {
//   // query database for all ....

//   // respond with HTML page displaying all ....
//   response.send("Hello World");
//   // response.render('home');
// });

// app.get('/new', (request, response) => {
//   // respond with HTML page with form to create new ....
//   response.render('new');
// });

// View list of artists
app.get('/artists', (request, response) => {
  // respond with HTML page with form to create new ....
  const queryString = 'SELECT * from artists ORDER BY id ASC'

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send('query error');
    } else {
      // console.log('query result:', result);

      // redirect to home page
      var output = {
        'artists': result.rows,
      }
      response.render('artists', output);
      // response.send( output);
    }
  });
});

// View new artist form page
app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new ....
  response.render('new-artist');
});

app.post('/artists', (request, response) => {
  const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)'
  const values = [request.body.name, request.body.photo_url, request.body.nationality];
  pool.query(queryString, values, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send('query error');
    } else {
      const queryString = 'SELECT * from artists ORDER BY id ASC'

      pool.query(queryString, (err, result) => {

        if (err) {
          console.error('query error:', err.stack);
          response.send('query error');
        } else {
          // console.log('query result:', result);

          // redirect to home page
          var output = {
            'artists': result.rows,
          }
          response.render('artists', output);
          // response.send( output);
        }
      });
    }
  });
});

app.get('/artists/:id', (request, response) => {
  // respond with HTML page with form to create new ....
  var artistId = request.params.id;
  const queryString = `SELECT * FROM artists WHERE id = ${artistId} ORDER BY id ASC`

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send('query error');
    } else {
      // console.log('query result:', result);

      // redirect to home page
      var output = {
        'artists': result.rows,
      }
      response.render('artists', output);
      // response.send(output);
    }
  });
});

app.get('/artists/:id/edit', (request, response) => {
  // respond with HTML page with form to create new ....
  var artistId = request.params.id;
  const queryString = `SELECT * FROM artists WHERE id = ${artistId} ORDER BY id ASC`

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send('query error');
    } else {
      // console.log('query result:', result);

      // redirect to home page
      var output = {
        'artists': result.rows,
      }
      // console.log(output);
      
      response.render('edit-artist', output);
      // response.send(output);
    }
  });
});

app.put('/artists/:id', (request, response) => {
  var artistId = request.params.id;
  const queryString = 
  `UPDATE artists SET name = $1, photo_url = $2, nationality = $3 WHERE id = $4`;
  const values = [request.body.name, request.body.photo_url,request.body.nationality,artistId];
  pool.query(queryString, values, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send('query error');
    } else {
      const queryString = `SELECT * from artists WHERE id = ${artistId} ORDER BY id ASC`;

      pool.query(queryString, (err, result) => {

        if (err) {
          console.error('query error:', err.stack);
          response.send('query error');
        } else {
          // console.log('query result:', result);

          var output = {
            'artists': result.rows,
          }
          response.render('artists', output);
          // response.send( output);
        }
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

let onClose = function () {

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end(() => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
