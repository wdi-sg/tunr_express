console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'rachelik',
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
  // query database for all artists
  const allArtists = 'SELECT * from artists';

  pool.query(allArtists, (err, allResult) => {
      if (err) {
          console.error('query error:', err.stack);
          response.send( 'query error' );
      } else {
          // console.log('query result:', allResult);

          // respond with HTML page displaying all artists
          response.render( 'home', allResult);
      };
  });
});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new artists
  response.render('new')
});

app.get('/artists/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const artist = 'SELECT * from artists where id ='+id;

    pool.query(artist, (err, artistResult) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            // console.log('query result:', artistResult);
            // respond with HTML page displaying all artists


            response.render('show', artistResult.rows[0]);
        };
    });
});

app.post('/artists', (request, response) => {

    // console.log(request.body);

    const whenQueryDone = (queryError, result) => {
        if (queryError) {
            response.status(500);
            response.send('db error');
        } else {
            // console.log(request.body);
            // console.log(result.rows[0])

            response.redirect('/');
        };
    };

    const newArtist = 'INSERT INTO artists (name, photo_url, nationality) values ($1, $2, $3)';

    const newArtistValues = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(newArtist, newArtistValues, whenQueryDone);
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
