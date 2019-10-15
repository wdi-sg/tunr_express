console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'garrick',
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

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/artists'), (req, res) => {

}

app.get('/artists/new', (re, res) => {
  res.render('new');
});

app.post('/artists', (req, res) => {
  console.log(req.body);
  const queryArray = [req.body.name, req.body.photo_url, req.body.nationality];
  const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';
  console.log(queryString);

  pool.query(queryString, queryArray, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      res.send( 'query error' );
    } else {
      console.log('query result:', result);
      // data = {
      //   result : result
      // };
      // redirect to home page
      res.send(result.rows);
    }
  });
});

app.get('/artists/:id', (req, res) => {
  const queryArray = [req.params.id];
  const queryString = 'SELECT * FROM artists where ID = $1';

  pool.query(queryString, queryArray, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      res.send( 'query error' );
    } else {
      console.log('query result:', result.rows);
      data = {
        rows : result.rows
      };
      res.send(result.rows);
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
