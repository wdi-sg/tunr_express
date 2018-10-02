const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'admin',
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

//2.1 INDEX Feature
app.get('/', (req, res) => {

    let sqlText = "SELECT * FROM artists";

    //query tunr_db database for all artists
    pool.query(sqlText, (error, queryResult) => {

        if (error) {
           console.log('error!', error);
            queryResult.status(500).send('Error!');
          } else {
            var array = queryResult.rows;
            res.render('home', {artists: array});
          }
    });
});

//2.2 SHOW feature
app.get('/artists/:id', (req, res) => {

    let nameOfArtist= req.params.id;

    let sqlText = "SELECT * FROM artists WHERE name = ($1)";
    const values = [nameOfArtist];

    //query tunr_db database for all artists
    pool.query(sqlText, values, (error, queryResult) => {

        if (error) {
           console.log('error!', error);
            res.send('Error!');
          } else {
            var array = queryResult.rows;
            res.render('home', {artists: array});
          }
    });
});



app.get('/new', (req, res) => {
  // respond with HTML page with form to create new ...
  res.render('new');
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// server.on('close', () => {
//   console.log('Closed express server');

  // db.pool.end(() => {
  //   console.log('Shut down db connection pool');
  // });
// });
