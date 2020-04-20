console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');

// Initialise postgres client
const configs = {
  user: 'elter',
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

app.use(cookieParser());
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



app.get('/artists', (request, response) => {
  // query database for all artist
  var visits = request.cookies['visits'];
  if(visits === undefined) {
    visits = 1;
  }else {
    visits = parseInt(visits) + 1;
  }
  response.cookie('visits', visits);
  let queryString = "SELECT * FROM artists";
  pool.query(queryString, (err, res) => {
    if(err){
      console.log("Query error!: ", err.message);
    }else {
      console.log(res.rows);
      let data = {
        "artists": res.rows,
        "visits": visits
      };
      response.render('home', data);
    }
  });
});


app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new artist
  response.render('new');
});


app.get('/artists/:id/edit', (request, response) => {
  let id = request.params.id;
  let queryString = "SELECT * FROM artists WHERE id = " + id;
  pool.query(queryString, (error, result) => {
    if(error) {
      console.log('Query error:', error.stack);
      response.send('query error');
    }else {
      console.log(result.rows);
      let data = {
        "artist": result.rows
      }
      response.render('edit', data);
    }
  });
});


app.get('/artists/:id/songs', (request, response) => {
  let id = request.params.id;
  let queryString = "SELECT * FROM songs WHERE artist_id = " + id;
  pool.query(queryString, (error, result) => {
    if(error) {
      console.log('Query error:', error.stack);
      response.send('query error');
    }else {
      console.log(result.rows);
      let data = {
        "songs": result.rows,
        "visits": request.cookies['visits']
      };
      response.render('songs', data);
    }
  });
});


app.get('/artists/:id', (request, response) => {
  let id = request.params.id;
  let queryString = "SELECT * FROM artists WHERE id = " + id;
  pool.query(queryString, (error, result) => {
    if(error) {
      console.log('Query error:', error.stack);
      response.send('query error');
    }else {
      console.log(result.rows);
      let data = {
        "artist": result.rows,
        "visits": request.cookies['visits']
      }
      response.render('id', data);
    }
  });
});


app.get('/playlist/new', (request, response) => {
  response.render('playlistnew');
});


app.get('/playlist/:id/newsong', (request, response) => {
  let id = request.params.id;
  let queryString = "SELECT songs.* FROM songs LEFT JOIN playlist_song ON (songs.id = playlist_song.song_id) WHERE playlist_song.song_id IS NULL";
    pool.query(queryString, (error, result) => {
    if(error) {
      console.log('Query error:', error.stack);
      response.send('query error');
    }else {
      console.log(result.rows);
      let data = {
        "songs": result.rows,
        "id": id,
      };
      response.render('playlistsongsadd', data);
    }
  });
});


app.get('/playlist/:id/', (request, response) => {
  let id = request.params.id;
  let queryString = "SELECT songs.* FROM songs INNER JOIN playlist_song ON (songs.id = playlist_song.song_id) WHERE playlist_song.playlist_id = " + id;
  pool.query(queryString, (error, result) => {
    if(error) {
      console.log('Query error:', error.stack);
      response.send('query error');
    }else {
      console.log(result.rows);
      let data = {
        "songs": result.rows,
        "id": id,
        "visits": request.cookies['visits']
      };
      response.render('playlistsongs', data);
    }
  });
});


app.get('/playlist', (request, response) => {
  // query database for all artist
  let queryString = "SELECT * FROM playlist";
  pool.query(queryString, (err, res) => {
    if(err){
      console.log("Query error!: ", err.message);
    }else {
      console.log(res.rows);
      let data = {
        "playlists": res.rows,
        "visits": request.cookies['visits']
      };
      response.render('playlisthome', data);
    }
  });
});


//POST requests
app.post('/artists', (request, response) => {
  let queryString = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)";
  let values = [request.body.name, request.body.photourl, request.body.nationality];
  pool.query(queryString, values, (error, result) => {
    if(error) {
      console.log('Query error:', error.stack);
      response.send('query error');
    }else {
      response.redirect('/artists');
    }
  });
});


app.post('/playlist', (request, response) => {
  let queryString = "INSERT INTO playlist (name) VALUES ($1)";
  let values = [request.body.name];
  pool.query(queryString, values, (error, result) => {
    if(error) {
      console.log('Query error:', error.stack);
      response.send('query error');
    }else {
      response.redirect('/playlist');
    }
  });
});


app.post("/playlist/:id", (request, response) => {
  let queryString = "INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2)";
  let values = [request.body.songs, request.params.id];
  pool.query(queryString, values, (error, result) => {
    if(error) {
      console.log('Query error:', error.stack);
      response.send('query error');
    }else {
      response.redirect('/playlist/' + request.params.id);
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