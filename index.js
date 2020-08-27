console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'vincent',
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

app.get('/artists/', (req, res) => {
  
  queryText = 'SELECT * FROM artists ORDER BY id ASC';
  
  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("ERROR", err.message)
    } else {
      res.render('artists', result);
    }
  }) 
});

app.get('/artists/new', (req, res) => {
  res.render('new');
});

app.post('/artists', (req, res) => {
  let artistInfo = req.body;
  let values = [artistInfo.name, artistInfo.photo_url, artistInfo.nationality];
  let queryText = `INSERT INTO artists(name, photo_url, nationality) VALUES($1, $2, $3)`;

  pool.query(queryText, values, (err, result) => {
    if (err) {
      console.log("ERROR", err.message)
    } 
  })
  res.redirect('/artists/');
})

app.get('/artists/:id', (req, res) => {
  let queryText = `SELECT * from artists WHERE id = ${req.params.id}`

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("ERROR", err.message)
    } else {
      res.render('single_artist', result.rows)
    }
  })
})

app.get('/artists/:id/edit', (req, res) => {
  let queryText = `SELECT * from artists WHERE id = ${req.params.id}`

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("ERROR", err.message)
    } else {
      res.render('update', result.rows)
    }
  })
})

app.put('/artists/:id', (req, res) => {
  let newData = [req.body.name, req.body.photo_url, req.body.nationality];
  let queryText = `UPDATE artists SET name = $1, photo_url = $2, nationality = $3 WHERE id = ${req.params.id}`

  pool.query(queryText, newData, (err, result) => {
    if (err) {
      console.log("ERROR", err.message)
    }
  })
  res.redirect('/artists/');
})

app.delete('/artists/:id', (req, res) => {
  let queryText = `DELETE FROM artists WHERE id = ${req.params.id}`

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("ERROR", err.message)
    }
  })
  res.redirect('/artists/');
})

app.get('/artists/:id/songs', (req, res) => {
  let queryText = `SELECT artists.name, artists.photo_url, songs.title FROM songs INNER JOIN artists ON (artists.id = songs.artist_id) WHERE artists.id = ${req.params.id}`

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("ERROR", err.message)
    } else {
      res.render("artistsong", result)
    }
  })
})

/**
 * ===================================
 * RESTful Routes for songs
 * ===================================
 */

app.get('/songs/', (req, res) => {
  
  queryText = 'SELECT songs.id, artists.name, songs.title, songs.album, songs.preview_link, songs.artwork FROM songs INNER JOIN artists ON (artists.id = songs.artist_id) ORDER BY songs.id';
  
  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("ERROR", err.message)
    } else {
      res.render('songs', result);
    }
  }) 
});

app.get('/songs/new', (req, res) => {
  res.render('new');
});

app.post('/songs', (req, res) => {
  let songInfo = req.body;
  let values = [songInfo.title, songInfo.album, songInfo.preview_link, songInfo.artwork, songInfo.artist_id];
  let queryText = `INSERT INTO songs(title, album, preview_link, artwork, artist_id) VALUES($1, $2, $3, $4, $5)`;

  pool.query(queryText, values, (err, result) => {
    if (err) {
      console.log("ERROR", err.message)
    } 
  })
  res.redirect('/songs/');
})

app.get('/songs/:id', (req, res) => {
  let queryText = `SELECT songs.id, artists.name, songs.title, songs.album, songs.preview_link, songs.artwork FROM songs INNER JOIN artists ON (artists.id = songs.artist_id) WHERE songs.id = ${req.params.id}`

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("ERROR", err.message)
    } else {
      res.render('single_song', result.rows)
    }
  })
})

app.get('/songs/:id/edit', (req, res) => {
  let queryText = `SELECT * FROM songs WHERE id = ${req.params.id}`

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("ERROR", err.message)
    } else {
      res.render('update_song', result.rows)
    }
  })
})

app.put('/songs/:id', (req, res) => {
  let newData = [songInfo.title, songInfo.album, songInfo.preview_link, songInfo.artwork, songInfo.artist_id];
  let queryText = `UPDATE songs SET title = $1, album = $2, preview_link = $3, arkwork = $4, artist_id = $5 WHERE id = ${req.params.id}`

  pool.query(queryText, newData, (err, result) => {
    if (err) {
      console.log("ERROR", err.message)
    }
  })
  res.redirect('/songs/');
})

app.delete('/songs/:id', (req, res) => {
  let queryText = `DELETE FROM songs WHERE id = ${req.params.id}`

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("ERROR", err.message)
    }
  })
  res.redirect('/songs/');
})

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
