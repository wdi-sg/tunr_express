console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: '13InchWong',
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
//------------------------------------------------------------------------------------
app.get('/', (request, response) => {
  // respond with HTML page displaying a big Welcome
  response.render('home');
});
//------------------------------------------------------------------------------------
app.get('/artists', (request, response) => {
  // query database for all artists
  const queryString = 'SELECT * FROM artists'
  pool.query(queryString, (err, result) => {
    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    } else {
        console.log("data downloaded");
    }
  // respond with HTML page displaying all artists
  const data = { searched : result.rows };
  response.render('indexArtists', data);
  });    
});
//------------------------------------------------------------------------------------
app.get('/artists/new', (request, response) => {
  response.render('addArtists');
});
//------------------------------------------------------------------------------------
app.post('/artists' , (request, response) => {
  console.log("Added new artists: ", request.body);
  queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';
  const values = [request.body.name , request.body.photo_url , request.body.nationality];
  console.log("INSERT=================================");
  pool.query(queryString, values, (err, res) => {
      if (err) {
      console.log("query error", err.message);
      } else {
      console.log("id of the thing you just created:", res.rows[0].id);
      }
  });
})
//------------------------------------------------------------------------------------
app.get('/artists/:id', (request, response) => {
  const queryString = `SELECT * FROM artists WHERE id = '${request.params.id}'`;
  pool.query(queryString, (err, result) => {
    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    } else {
        console.log("Foundddddddddddddddddddddd");
    }
  // respond with HTML page displaying all artists
  const data = { searched : result.rows };
  response.render('eachArtist',data);
  });    
});


//------------------------------------------------------------------------------------


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
