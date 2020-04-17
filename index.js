console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'kwansing',
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
  response.send("Hello World");
});

//Artists
app.get('/artists', (request, response) => {
    const queryString = 'SELECT * from artists';

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            console.log('query result:', result);
            response.send(result.rows);
        }
    });
});

//for Creating new artist
app.get('/artists/new', (req, res) => {
  res.render('artistNew');
});

app.post('/artistNew', (req,res) => {
  console.log(req.body);

  let queryText;
  let values;

  values = [req.body.name,req.body.photo_url,req.body.nationality];
  queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';

  pool.query(queryText, values, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      res.send('query error');
    } else {
      console.log('query result:', result);
      // redirect to home page
      res.redirect("/artists");
      console.log(result)
    }
  });
});

//Selecting a specific artist
app.get('/artists/:id', (req, res) => {
    values = [req.params.id]
    console.log(values);
    queryText = 'SELECT * FROM artists WHERE id = $1';
    pool.query(queryText, values, (err, result) => {

        if (err) {
          console.error('query error:', err.stack);
          res.send( 'query error' );
        } else {
          console.log('query result:', result);
          res.send(result.rows);
        }
    });
})

app.get('/new', (request, response) => {
    response.render('new');
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