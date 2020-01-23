console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser')

// Initialise postgres client
const configs = {
  user: 'AngelFerreros',
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

app.use(cookieParser());
/**
 * ===================================
 * Routes
 * ===================================
 */

  //Define a route with view defined at /. For now it should say Hello World when you visit that url.
  // respond with HTML page
app.get('/', (request, response) => {
  response.render('home');
});

  // Build a feature that creates a new artist in the database.
  // respond with HTML page with form to create new artist
app.get('/artists/new', (request, response) => {
  response.render('new');
});


// accepts form request and process request to add data in DB
app.post ('/artists', (request,response)=>{
 let queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';
    const values = [
    request.body.name,
    request.body.photo_url,
    request.body.nationality];

        pool.query(queryText, values, (err,result)=>{
            console.log(`insert query`);
            if(err){
                console.log(err);
                response.send('error',err);
            } else {
                console.log('insert new artist completed');
                response.send(result.rows);
            }
        });
});

//show page for a single artist
app.get('/artists/:id',(request, response)=>{
  let artistId = parseInt(request.params.id);
  console.log(artistId);
  let queryText = "SELECT * FROM artists WHERE id ="+artistId;
    pool.query(queryText, (err,result)=>{
      console.log("show info:",result.rows);
      const data = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        photo_url: result.rows[0].photo_url,
        nationality: result.rows[0].nationality };
      response.render('info',data);
    });
});

app.get('/artists/:id/songs', (request,response)=> {
//get the artist_id
  let artistId = parseInt(request.params.id);
  let query = "SELECT * FROM artists WHERE id="+artistId;
    pool.query(query, (err, result)=>{
      if(err){
        console.log("Error:", err);
        response.status(500).send("error");
      }
      else {
        // if result is not empty
        let artist_id = result.rows[0].id;
        let artist_name = result.rows[0].name;
        console.log(artist_name);
        //select title from songs where artist_id = (value above)
        let query = "SELECT title FROM songs WHERE artist_id="+artist_id;
        var responseArray =[];
          pool.query(query, (titleErr, titleResult)=>{
          console.log(titleResult);
          let titleArray = titleResult.rows;
          const data = {
              title: titleArray,
              name: artist_name
            };
          response.render('songs',data); //get all songs to print
        });
      }
    })
});


//get the index page for artists
app.get('/artists', (request,response)=> {

let query = 'SELECT name, photo_url, nationality from artists';
    pool.query(query, (err, result)=>{
      console.log(result);
      let


    });

response.render('ArtistIndex',); //render page to show ALL artist photos, name and nationality

});

//list all the playlists
app.get('/playlist', (request, response) => {
  let query = 'SELECT name from playlist';
    pool.query(query, (err,result)=>{
        if(err){
          console.log(err);
          response.status(500).send("error");
        }
        else{
        console.log("show info:",result.rows);
        const data = {
          name: result.rows
        };
        response.render('playlist',data);
        }
    });
});

// GET /playlist/new - render the form to create a new playlist
app.get('/playlist/new',(request, response) => {
  response.render('PlaylistForm');
});

app.post('/playlist',(request, response) => {

  let queryText = 'INSERT INTO playlist (name) VALUES ($1) RETURNING *';
    const values = [request.body.playlist_name];

        pool.query(queryText, values, (err,result)=>{
            console.log(`insert query`);
            if(err){
                console.log(err);
                response.send('error',err);
            } else {
                console.log('insert new playlist completed');
                response.redirect('/playlist');
            }
        });
});

// show all the song titles inside this playlist
app.get ('/playlist/:id',(request,response)=>{
  let playlistId = parseInt(request.params.id);

  response.render()
});


// render the form to add a song to the playlist
app.get ('/playlist/:id/newsong',(request,response)=>{
  let playlistId = parseInt(request.params.id);
  console.log(playlistId);

  let songQuery = "SELECT * FROM songs";
    pool.query(songQuery, (err,result) => {
      let songs = result.rows;
      console.log('SONGS:', songs);

    let playlistQuery = 'SELECT * from playlist';
      pool.query(playlistQuery, (listErr,listResult)=>{
        let playlistArray = listResult.rows;
        console.log(playlistArray);

        let data = {
          songs: songs,
          playlist_id: playlistId,
          playlist: playlistArray};
        response.render('songlist',data);
      });
    });
});

// for this playlist, put a single song on the playlist
app.post('/playlist/:id', (request,response)=>{
  response.send('added song in playlist')
  // "INSERT INTO songs_playlist (playlist_id,songs_id) VALUES ($1, $2)";
  //   let values = [ playlistId, ];
});

//render register pg
app.get('/register', (request, response) => {
  response.render('register');

});

// Create a route that accepts the POST request from the form.
// After the user has been put in the DB, set cookies to set them as logged in:

app.post('/register', (request,response)=>{
  let insertQueryText = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *';
  console.log(request.body.pw);
  let hashedPw = sha256(request.body.pw);
  console.log(hashedPw);
  const values = [
    request.body.username,
    hashedPw
  ];

  pool.query(insertQueryText, values, (err, result)=>{
    if(err){
      console.log("ERROR:", err);
      response.send("ERROR")
    }else{
      console.log("DONE", result.rows)
      let user_id = result.rows[0].id.toString();
      let hashedCookie = sha256(user_id);
      let hashedUn = sha256(request.body.username);

      response.cookie('logged_in', true);
      response.cookie('username', hashedUn);
      response.cookie('loggedIn', hashedCookie);
      response.send("we're done")
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
