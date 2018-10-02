console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'wangwh',
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

//***have to be at the top otherwise it will read new as an id
app.get('/artists/new', (request, res) => {
  res.render('artists/new');
})

//

app.get('/artists/:id/songs', (request, res) => {
  // query database for all artists
  let sqlText = "SELECT * FROM songs WHERE artist_id =$1";

  let values = [request.params.id];

  pool.query(sqlText, values, (err, result) => {
    if (err) {
      console.log("error", err);
      res.status(500).send("query not working");
    } else {
      //console.log(result.rows);
      // respond with HTML page displaying all artists
      res.render('songs/show', {songs: result.rows});
    }
  })
});


app.delete('/artists/:id', (request,res) => {

  let sqlText = "DELETE FROM artists WHERE id = $1";

  let values = [request.params.id];

  console.log(values);

  pool.query(sqlText, values, (err, result) => {
    if (err) {
      console.log("error", err);
      res.status(500).send("query not working");
    } else {
      //console.log(result.rows[0]);
      res.redirect('/artists');
    }
  })
})

app.get('/artists/:id', (request,res) => {

  let sqlText = "SELECT * FROM artists WHERE id = $1";

  let values = [request.params.id];

  pool.query(sqlText, values, (err, result) => {
    if (err) {
      console.log("error", err);
      res.status(500).send("query not working");
    } else {
      //console.log(result.rows[0]);
      res.render('artists/show', result.rows[0]);
    }
  })
})


app.put('/artists/:id', (request, res) => {
  console.log(request.body);

  let sqlText = "UPDATE artists SET name=$1, nationality=$2, photo_url=$3 WHERE id=$4";

  let values = [request.body.name, request.body.nationality, request.body.photo_url, request.body.id];

  pool.query(sqlText, values, (err, result) => {
    if (err) {
      console.log("error", err);
      res.status(500).send("query not working");
    } else {
      res.redirect('/artists');
    }
  })
})

app.get('/artists/:id/edit', (request, res) => {

  let sqlText = "SELECT * FROM artists WHERE id = $1";

  let values = [request.params.id];

  pool.query(sqlText, values, (err, result) => {
    if (err) {
      console.log("error", err);
      res.status(500).send("query not working");
    } else {
      //console.log(result.rows[0]);
      res.render('artists/edit', result.rows[0]);
    }
  })
})

app.post('/artists', (request, res) => {
  // respond with HTML page with form to create new artist
  let sqlText = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1,$2,$3)";
  console.log(request.body);

  let values = [request.body.name, request.body.photo_url, request.body.nationality];

  pool.query(sqlText, values, (err, result)=>{
    if (err) {
      console.log("error", err);
      res.status(500).send("query not working");
    } else {
      //console.log(result.rows);
      // respond with HTML page displaying all artists
      //res.send("working")
      res.redirect('/artists');
    }
  })
});


app.get('/artists', (req, res) => {
  // query database for all artists
  let sqlText = "SELECT * FROM artists";

  pool.query(sqlText, (err, result) => {
    if (err) {
      console.log("error", err);
      res.status(500).send("query not working");
    } else {
      //console.log(result.rows);
      // respond with HTML page displaying all artists
      res.render('artists/home', {artists:result.rows});
    }
  })
});

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
