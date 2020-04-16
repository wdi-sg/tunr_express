console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'marcustan',
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
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  response.render('home');
});

// Show all artists 

//

app.get('/artists/', (request, response) => {
  // query database for all artists
  pool.query('SELECT * FROM artists', (error, result) => {
    if (error) {
      console.log('query error');
    } else {
      const artists = result.rows;
      // respond with HTML page displaying all artist
      response.render('artists', {"artists": artists});
    }
  })
});


// Form for a single artist 

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new artist
  response.render('new');
});

// Create a new artist

app.post('/artists', (request, response) => {
  const name = request.body.name;
  const photo_url = request.body.photo_url;
  const nationality = request.body.nationality;

  const values = [name, photo_url, nationality];

  const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)';

  pool.query(queryString, values, (error, result) => {
    if (error) {
      console.log('query error: ', error.message, error.stack);
    } else {
      response.render('success');
    }
  });
})

// See a single artist 

app.get('/artists/:id', (request, response) => {
  const artistId = request.params.id;

  pool.query('SELECT * FROM artists WHERE id=$1', [artistId], (error, result) => {
    if (error) {
      console.log('query error: ', error.message, error.stack);
    } else {
      const artist = result.rows[0];
      response.render('single', {'artist': artist});
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
