console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'qunda',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (error) {
  console.log('idle client error', error.message, error.stack);
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
* GET Routes
* ===================================
*/

app.get('/', (request, response) => {
  response.render('home');
});

app.get('/artists/', (request, response) => {
  pool.query('SELECT * FROM artists', (error, result) => {
    if (error) {
      console.log('query error: ', error.message, error.stack);
    } else {
      const artists = result.rows;
      response.render('artists', {"artists": artists});
    }
  })
});

app.get('/artists/new', (request, response) => {
  response.render('new');
});

app.get('/artists/:id', (request, response) => {
  const artistId = request.params.id;

  pool.query('SELECT * FROM artists WHERE id=$1', [artistId], (error, result) => {
    if (error) {
      console.log('query error: ', error.message, error.stack);
    } else {
      const artist = result.rows[0];
      response.render('artist', {'artist': artist});
    }
  });
});

app.get('/artists/:id/edit', (request, response) => {
  const artistId = request.params.id;

  pool.query('SELECT * FROM artists WHERE id=$1', [artistId], (error, result) => {
    if (error) {
      console.log('artist query error: ', error.message, error.stack);
    } else {
      const artist = result.rows[0];
      response.render('artist-edit', {"artist": artist});
    }
  });
});

app.get('/artists/:id/songs', (request, response) => {
  const artistId = request.params.id;

  pool.query('SELECT * FROM artists WHERE id=$1', [artistId], (error, result) => {
    if (error) {
      console.log('artist query error: ', error.message, error.stack);
    } else {
      const artist = result.rows[0];

      pool.query('SELECT * FROM songs WHERE artist_id=$1', [artistId], (error, result) => {
        if (error) {
          console.log('query error: ', error.message, error.stack);
        } else {
          const songs = result.rows;
          response.render('artist-songs', {"songs": songs, "artist": artist});
        }
      });
    }
  })
});



/**
* ===================================
* POST Routes
* ===================================
*/

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



/**
* ===================================
* PUT Routes
* ===================================
*/

app.put('/artists/:id', (request, response) => {
  const name = request.body.name;
  const photo_url = request.body.photo_url;
  const nationality = request.body.nationality;
  const artistId = request.params.id;

  const values = [name, photo_url, nationality, artistId];

  const queryString = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4';

  pool.query(queryString, values, (error, result) => {
    if (error) {
      console.log('query error: ', error.message, error.stack);
    } else {
      response.render('success');
    }
  })
})



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