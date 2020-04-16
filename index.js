console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'elter',
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
app.get('/artists/:id/edit', (request, response) => {
  let id = request.params.id;
  let queryString = "SELECT * FROM artists WHERE id = " + id;
  pool.query(queryString, (error, result) => {
    if(error) {
      console.log('Query error:', error.stack);
      response.send('query error');
    }else {
      console.log(result.rows);
      let data = {
        "artist": result.rows
      }
      response.render('edit', data);
    }
  });
});


app.get('/artists/:id/songs', (request, response) => {
  let id = request.params.id;
  let queryString = "SELECT * FROM songs WHERE artist_id = " + id;
  pool.query(queryString, (error, result) => {
    if(error) {
      console.log('Query error:', error.stack);
      response.send('query error');
    }else {
      console.log(result.rows);
      let data = {
        "songs": result.rows
      };
      response.render('songs', data);
    }
  });
});


app.get('/artists/:id', (request, response) => {
  let id = request.params.id;
  let queryString = "SELECT * FROM artists WHERE id = " + id;
  pool.query(queryString, (error, result) => {
    if(error) {
      console.log('Query error:', error.stack);
      response.send('query error');
    }else {
      console.log(result.rows);
      let data = {
        "artist": result.rows
      }
      response.render('id', data);
    }
  });
});


app.get('/artists', (request, response) => {
  // query database for all artist
  let queryString = "SELECT * FROM artists";
  pool.query(queryString, (err, res) => {
    if(err){
      console.log("Query error!: ", err.message);
    }else {
      console.log(res.rows);
      let data = {
        "artists": res.rows
      };
      response.render('home', data);
    }
  });
});


app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new artist
  response.render('new');
});


app.post('/artists', (request, response) => {
  let queryString = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)";
  let values = [request.body.name, request.body.photourl, request.body.nationality];
  pool.query(queryString, values, (error, result) => {
    if(error) {
      console.log('Query error:', error.stack);
      response.send('query error');
    }else {
      response.redirect('/artists');
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