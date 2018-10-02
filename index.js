console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'benghui',
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

// artists index
app.get('/artists', (req, res) => {
  let sqlText = "SELECT * FROM artists ORDER BY id";
  pool.query(sqlText, (error, queryResult) => {
      if (error){
        console.log('error!', error);
        res.status(500).send("DOESN'T WORK!!");
      } else{
        // console.log(queryResult.rows);
        res.render('artists/home',{artists: queryResult.rows});
    }
  });
});

// artist show
app.get('/artists/:id', (req, res) => {
  let inputId = parseInt(req.params.id);
  let sqlText = "SELECT * FROM artists WHERE id = ($1)";
  let values = [inputId];
  pool.query(sqlText, values, (error, queryResult) => {
    // console.log(queryResult.rows);
      if (error){
        console.log('error!', error);
        res.status(500).send("DOESN'T WORK!!");
      } else{
        // console.log(queryResult.rows);
        res.render('artists/show',{artist: queryResult.rows});
    }
  });
});

// create artist
app.get('/artist/new',(req, res) => {
  res.render('artists/new');
});

app.post('/artist', (req, res) => {
  // console.log(req.body)
  let sqlText = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)";
  let values = [req.body.name, req.body.photo_url, req.body.nationality];
  pool.query(sqlText, values, (error, queryResult) => {
      if (error){
        console.log('error!', error);
        res.status(500).send("DOESN'T WORK!!");
      } else{
        // console.log(queryResult.rows);
        res.render('artists/newartists', {artist: req.body});
    }
  });
});

// edit artist
app.get('/artists/:id/edit', (req, res) => {
  let inputId = parseInt(req.params.id);
  let sqlText = "SELECT * FROM artists WHERE id = ($1)";
  let values = [inputId];
  pool.query(sqlText, values, (error, queryResult) => {
    // console.log(queryResult.rows);
      if (error){
        console.log('error!', error);
        res.status(500).send("DOESN'T WORK!!");
      } else{
        // console.log(queryResult.rows);
        res.render('artists/edit', {artist: queryResult.rows});
    }
  });
});

app.put('/artists/:id', (req, res) => {
  let inputId = parseInt(req.params.id);

  let sqlText = "UPDATE artists SET (name, photo_url, nationality) = ($1, $2, $3) WHERE id = ($4)";
  values = [req.body.name, req.body.photo_url, req.body.nationality, inputId ];
  pool.query(sqlText, values, (error, queryResult) => {
    if (error) {
      console.log('error!', error);
      res.status(500).send("DOESN'T WORK!!");
    } else {
        res.redirect(`/artists/${inputId}`);
      }
  });
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

server.on('close', () => {
  console.log('Closed express server');

  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });
});
