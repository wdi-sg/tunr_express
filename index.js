// console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require("cookie-parser");


// Initialise postgres client
const configs = {
  user: 'weepinsoh',
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

//***** Display home page where all the artists are ******
app.get('/artists',(request, response)=>{
  const whenQueryDone = (queryError, result) => {
    if( queryError ){
      console.log("Error");
      console.log(queryError);
      response.status(500);
      response.send('db error');
    }else{
      let visits = request.cookies["visits"];
      if (visits === undefined){
        visits = 1;
      } else {
        visits++;
      }
      response.cookie(`visits`, visits)

      const data = {
        artistsInformation : result.rows,
        count : visits
      }
      console.log(result.rows);
      response.render('home', data);
    }
  };


  const queryString = "SELECT * FROM artists";

  pool.query(queryString, whenQueryDone )

});

//***** Display a form for adding new artists ******
app.get('/artists/new',(request, response)=>{
  const whenQueryDone = (queryError, result) => {
    if( queryError ){
      console.log("Error");
      console.log(queryError);
      response.status(500);
      response.send('db error');
    }else{
      let visits = request.cookies["visits"];
      if (visits === undefined){
        visits = 1;
      } else {
        visits++;
      }
      response.cookie(`visits`, visits)

      const data = {
        count : visits
      }
      response.render('new-artist', data);
    }
  };

  const queryString = "SELECT * FROM artists";

  pool.query(queryString, whenQueryDone )

});

//See a single artist
app.get('/artists/:id', (request, response) => {
  const whenQueryDone = (queryError, result) => {
    if (queryError) {
      console.log("Error");
      console.log(queryError);
      response.status(500);
      response.send('db error');
    } else {

      let visits = request.cookies["visits"];
      if (visits === undefined) {
        visits = 1;
      } else {
        visits++;
      }
      response.cookie('visits', visits);

      console.log(result.rows[0]);
      const data = {
        artistName : result.rows[0].name,
        photo : result.rows[0].photo_url,
        nationality : result.rows[0].nationality,
        count : visits
      };

      response.render('show', data);
    }
  };

  const queryString = "SELECT * FROM artists WHERE id="+request.params.id;
  pool.query(queryString, whenQueryDone);
});


//Create a new artist
app.post('/artists',(request, response)=>{
  const whenQueryDone = (queryError, result) => {
    if( queryError ){
      console.log("Error");
      console.log(queryError);
      response.status(500);
      response.send('db error');
    }else{
      response.redirect('/artists/')
    }
  };

  const queryString = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *";
  const insertValues = [request.body.name, request.body.photo_url, request.body.nationality];

  pool.query(queryString, insertValues, whenQueryDone )

});

//See a single playlist
app.get('/playlists/:id', (request, response) => {
  const whenQueryDone = (queryError, result) => {
    if( queryError ){
      console.log("Error");
      console.log(queryError);
      response.status(500);
      response.send('db error');
    }else{
      console.log(result);
      const data = {
        playlistName : result.rows[0].title,
      }
      response.render('show-playlist',data);
    };
  };
  const queryString = "SELECT songs.title FROM songs INNER JOIN playlist_song ON (songs.id = playlist_song.song_id) WHERE playlist_song.id="+request.params.id;
  pool.query(queryString, whenQueryDone )

});

//***** Display a form for adding new playlists ******
app.get('/playlists/new',(request, response)=>{
  const whenQueryDone = (queryError, result) => {
    if( queryError ){
      console.log("Error");
      console.log(queryError);
      response.status(500);
      response.send('db error');
    }else{
      response.render('new-playlist');
    }
  };

  const queryString = "SELECT * FROM playlist";

  pool.query(queryString, whenQueryDone )

});

//Create a new playlist
app.post('/playlists',(request, response)=>{
  const whenQueryDone = (queryError, result) => {
    if( queryError ){
      console.log("Error");
      console.log(queryError);
      response.status(500);
      response.send('db error');
    }else{
      response.redirect('/playlists/')
    }
  };

  const queryString = "INSERT INTO playlist (name) VALUES ($1) RETURNING *";
  const insertValues = [request.body.name];

  pool.query(queryString, insertValues, whenQueryDone )

});

//***** Display a form for adding songs to a playlist ******
app.get('/playlists/:id/newsong',(request, response)=>{
  const whenQueryDone = (queryError, result) => {
    if( queryError ){
      console.log("Error");
      console.log(queryError);
      response.status(500);
      response.send('db error');
    }else{
      const data = {
        songs : result.rows,
        id : request.params.id
      }
      response.render('new-playlist-song', data);
    }
  };

  const queryString = "SELECT * FROM songs";

  pool.query(queryString, whenQueryDone )

});

//Add song to playlist
app.post('/playlists/:id/newsong',(request, response)=>{
  const whenQueryDone = (queryError, result) => {
    if( queryError ){
      console.log("Error");
      console.log(queryError);
      response.status(500);
      response.send('db error');
    }else{
      response.render('/playlists/')
    }
  };

  const queryString = "INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2) RETURNING *";
  const insertValues = [request.body.songs, request.params.id];

  pool.query(queryString, insertValues, whenQueryDone )

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
  });
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
