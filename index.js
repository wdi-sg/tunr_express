console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'weslie',
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

app.get('/new', (req, res) => {
  // respond with HTML page with form to create new pokemon
  res.render('new');
});

app.get('/:id', (req, res) => {
  let sqlText = "SELECT * FROM artists WHERE id = ($1)";
  let id = req.params.id;
  let values = [id];

  pool.query(sqlText, values, (error, queryResult) => {
  if (error) 
  {
    console.log("query error: ", error);
    res.status(500).send('DIDNT WORKS!!');
  } else 
  {
    console.log(queryResult.rows);
    res.render('home', {artists: queryResult.rows});
  }
  });
});

app.post('/', (req, res) => {
    let sqlText = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)";
    const values = [req.body.name, req.body.photo_url, req.body.nationality];

    pool.query(sqlText, values, (error, queryResult) => {
      if (error)
      {
        console.log("query error: ", error);
        res.status(500).send('DIDNT WORKS!!');
      } else
      {
        //res.send('working fine!')
        res.redirect('/');
      }
    });
});

app.get('/', (req, res) => {
  // query database for all pokemon
  let sqlText = "SELECT * FROM artists";
  // respond with HTML page displaying all pokemon
  //res.render('home');
  //res.send('hello world!')
  pool.query(sqlText, (error, queryResult) => {
      if (error)
      {
        console.log('error!', error);
        res.status(500).send('DIDNT WORKS!!');
      }else
      {
        console.log(queryResult.rows);
        res.render('home', {artists: queryResult.rows});
      }
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

//server.on('close', () => {
  //console.log('Closed express server');

  //db.pool.end(() => {
    //console.log('Shut down db connection pool');
  //});
//});
