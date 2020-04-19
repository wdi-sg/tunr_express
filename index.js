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
  const queryString = 'SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists'

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error1:', err.stack);
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
      console.error('query error2:', err.stack);
      response.send('query error');
    } else {
      const queryString = 'SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists'

      pool.query(queryString, (err, result) => {

        if (err) {
          console.error('query error3:', err.stack);
          response.send('query error');
        } else {
          // console.log('query result:', result);

          // redirect to home page
          var output = {
            'artists': result.rows,
          }
          response.redirect('/artists');
          // response.send( output);
        }
      });
    }
  });
});

app.get('/artists/:id', (request, response) => {
  var artistId = request.params.id;
  const queryString = 'SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists';
  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error4:', err.stack);
      response.send('query error');
    } else {
      // console.log('query result:', result);
      var idMatch = [];
      // console.log(result.rows)
      for (id in result.rows) {
        if (result.rows[id].artistid == artistId) {
          idMatch.push(result.rows[id]);
        }
      }
      // redirect to home page
      var output = {
        'artists': idMatch,
      }

      response.render('single-artist', output);
      // response.send(output);
    }
  });
});

app.get('/artists/:id/edit', (request, response) => {
  // respond with HTML page with form to create new ....
  var artistId = request.params.id;
  const queryString = 'SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists'

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error5:', err.stack);
      response.send('query error');
    } else {
      // console.log('query result:', result);
      var idMatch = [];
      // console.log(result.rows)
      for (id in result.rows) {
        if (result.rows[id].artistid == artistId) {
          idMatch.push(result.rows[id]);
        }
      }
      // redirect to home page
      var output = {
        'artists': idMatch,
      }

      response.render('edit-artist', output);
      // response.send(output);
    }
  });
});

app.put('/artists/:id', (request, response) => {
  var artistId = request.params.id;
  const queryString = 'SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists';

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error6:', err.stack);
      response.send('query error');
    } else {
      var idMatch = [];
      // console.log(result.rows)
      for (id in result.rows) {
        if (result.rows[id].artistid == artistId) {
          idMatch.push(result.rows[id]);
        }
      }

      var mappedId = idMatch[0].id;
      const queryString =
        `UPDATE artists SET name = $1, photo_url = $2, nationality = $3 WHERE id = $4`;
      const values = [request.body.name, request.body.photo_url, request.body.nationality, mappedId];
      pool.query(queryString, values, (err, result) => {

        if (err) {
          console.error('query error7:', err.stack);
          response.send('query error');
        } else {
          const queryString = `SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists WHERE id = ${mappedId}`;
          pool.query(queryString, (err, result) => {

            if (err) {
              console.error('query error8:', err.stack);
              response.send('query error');
            } else {

              // redirect to home page
              var output = {
                'artists': result.rows,
              }

              response.redirect(`/artists/${artistId}`);
              // response.send(output);
            }
          });
        }
      });
    }
  })
})

app.delete('/artists/:id', (request, response) => {
  var artistId = request.params.id;
  const queryString = 'SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists';

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error9:', err.stack);
      response.send('query error');
    } else {
      var idMatch = [];
      // console.log(result.rows)
      for (id in result.rows) {
        if (result.rows[id].artistid == artistId) {
          idMatch.push(result.rows[id]);
        }
      }

      var mappedId = idMatch[0].id;
      const queryString =
        `DELETE FROM artists WHERE id = ${mappedId}`;
      pool.query(queryString, (err, result) => {

        if (err) {
          console.error('query error10:', err.stack);
          response.send('query error');
        } else {
          const queryString = `SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists`;
          pool.query(queryString, (err, result) => {

            if (err) {
              console.error('query error11:', err.stack);
              response.send('query error');
            } else {

              // redirect to home page
              var output = {
                'artists': result.rows,
              }

              response.redirect('/artists');
              // response.send(output);
            }
          });
        }
      });
    }
  })
})

app.get('/artists/:id/songs', (request, response) => {
  var artistId = request.params.id;
  const queryString = 'SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists';
  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error4:', err.stack);
      response.send('query error');
    } else {
      // console.log('query result:', result);
      var idMatch = [];
      // console.log(result.rows)
      for (id in result.rows) {
        if (result.rows[id].artistid == artistId) {
          idMatch.push(result.rows[id]);
        }
      }
      // redirect to home page
      var output = {
        'artists': idMatch,
      }
      var mappedId = idMatch[0].id;
      const queryString = `SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS songid, * FROM songs WHERE artist_id = ${mappedId}`;
      pool.query(queryString, (err, result) => { 
        if (err) {
          console.error('query error4:', err.stack);
          response.send('query error');
        } else {
          output.songs = result.rows;
          response.render('artist-songs', output);
        }
      })
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
