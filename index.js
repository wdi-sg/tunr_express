console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'weiwenlee',
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

  // respond with HTML page displaying home
  res.render('home');
});

app.get('/artist', (req, res) => { //build the index

    let queryText = 'SELECT * FROM Artists';

    pool.query(queryText, (sqlError, queryResult) => {
      if(sqlError){
        console.error('error: ', sqlError);
        res.status(500).send('Not working, server down?');
      }
      else{
        //console.log('queryResult.rows', queryResult.rows);
        
        //Adding artist makes the queryResult into a obj so that it
        //can be a goes as input into jsx
        res.render('Index', {artists: queryResult.rows});
      }
    });
});

// app.get('/new', (req, res) => {
//   // respond with HTML page with form to create new pokemon
//   res.render('new');
// });


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// server.on('close', () => {
//   console.log('Closed express server');
//
//   db.pool.end(() => {
//     console.log('Shut down db connection pool');
//   });
//});
