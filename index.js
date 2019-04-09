console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'siangeeeo',
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

app.use(express.static('public'));
app.use(express.static(__dirname+'/public/'));

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

  // respond with HTML page displaying all stuff?
  response.render('home');
});

app.get('/new', (request, response) => {
  // respond with HTML page with form to create new page
  response.render('new');
});

app.get('/artists', (request, response)=>{
  //respond with HTML page to display all stats about artists
  const queryString = 'SELECT * from artists';

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send('query error');
    } else {
   //   console.log('query resulttttttt:', result.rows);
      const data = {artists: result.rows};
      response.render('artists', data);
    }
  });
});

app.get('/artist/:id', (request, response)=>{
  let artistId = parseInt(request.params.id);

  const queryString = "SELECT * FROM artists WHERE id=" + artistId;

  pool.query(queryString, (err, result)=>{
    if (err){
      console.error('query error:', err.stack);
    }else{
      console.log('query resulttt:', result.rows);
      const data = {artist: result.rows};
      response.render('artist',data);
    };
  });
});


/**
 * ===================================
 * Listen to requests on port 3002
 * ===================================
 */
const server = app.listen(3002, () => console.log('~~~ Tuning in to the waves of port 3002 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
