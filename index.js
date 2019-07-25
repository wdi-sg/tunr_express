console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'yixin',
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

// To add the CSS File
app.use(express.static(__dirname + '/public'));

/**
 * ===================================
 * Routes
 * ===================================
 */

var redirectToHome = function(request, response){
  response.redirect('/artists');
}

var displayArtists = function(request, response){

  // query database for all pokemon
    let queryString = 'SELECT * FROM artists ORDER BY id ASC';
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        }
        else {

            var artists = result.rows;

            var data = {
              artists : artists
            }

            response.render( 'artists', data );
        }
    });
}

var displayArtistPage = function(request, response){

    var artistId = parseInt(request.params.id);

  // query database for all pokemon
    let queryString = 'SELECT * FROM artists WHERE id = $1';
    let values = [artistId];

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        }
        else {

            var artist = result.rows[0];

            var data = {
              artist : artist
            }

            response.render( 'artistPage', data );
        }
    });
}


var displayAddArtistForm = function(request,response){
  response.render('newArtist');
}

var addNewArtist = function(request,response){
  let input = request.body;
  let values = [input.name, input.photo_url, input.nationality];
  const queryString = 'INSERT INTO artists (name,photo_url,nationality) VALUES ($1,$2,$3)';

  pool.query(queryString, values, (err, result) => {

      if (err) {
          console.error('query error:', err.stack);
          response.send( 'query error' );
      }
      else {
          response.redirect('/artists')
      }
  });
}

var displayEditArtistForm = function(request, response){

    var artistId = parseInt(request.params.id);
    // console.log('in edit, id ' + artistId);

    let queryString = 'SELECT * FROM artists WHERE id = $1';
    let values = [artistId];

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        }
        else {
            // var artistIdRow = artistId-1;
            // var artist = result.rows[artistIdRow];


            // console.log('in edit, result.rows');
            // console.log(result.rows);

            var artist = result.rows[0];

            var data = {
              artist : artist
            }

            response.render( 'editArtist' , data);
        }
    });
}

var acceptArtistChanges = function(request, response){

    var artistId = parseInt(request.params.id);
    console.log(request.body);
    let queryString = 'UPDATE artists SET name=$1, photo_url=$2,nationality=$3 WHERE id =$4 RETURNING *';
    let values = [request.body.name, request.body.photo_url, request.body.nationality, artistId];

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        }
        else {
            // var artistIdRow = artistId-1;
            // var artist = result.rows[artistIdRow];


            // console.log('in edit, result.rows');
            // console.log(result.rows);

            var artist = result.rows[0];

            var data = {
              artist : artist
            }
            // response.send( 'yay');
            response.render( 'artistPage' , data);
        }
    });
}


var acceptArtistDelete = function(request, response){

    var artistId = parseInt(request.params.id);
    console.log(request.body);
    let queryString = 'DELETE from artists WHERE id= $1';
    let values = [artistId];

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        }
        else {

            response.redirect('/artists');
        }
    });
}

var displaySongsByArtist = function(request, response){

  var artistId = parseInt(request.params.id);

  // query database for all pokemon
  let artistString = 'SELECT * FROM artists WHERE id = $1';
  let artistValues = [artistId];

  pool.query(artistString, artistValues, (err, artist) => {
    if (err) {
        console.error('query error:', err.stack);
        response.send('query error');
    } else {

      let songsString = 'SELECT * FROM songs WHERE artist_id = $1';
      let songsValues = [artistId];

      pool.query(songsString, songsValues, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {

          data = {
              artist: artist.rows,
              songs: result.rows
          }
          response.render('ArtistSongsPage', data);
        }
      });

    }
  });
}

var createNewSongByArtist = function(request,response){
    var artistId = parseInt(request.params.id);

    var data = {
      artistId : artistId
    }

    response.render('newSong', data);
}


var addNewSongByArtist = function(request,response){
  //to insert to database here.

  var artistId = request.params.id;

  let input = request.body;
  let values = [input.title, input.album, input.preview_link, input.artwork,  input.artist_id];

  const queryString = 'INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1,$2,$3,$4,$5) RETURNING *';

  pool.query(queryString, values, (err, result) => {
    if (err) {
        console.error('query error:', err.stack);
        response.send('query error');
    } else {

      console.log("add new song by artist");
      console.log(artistId);

      var url = "/artists/" + artistId + "/songs";

      response.redirect(url);
    }
  });
}

/**
 * ===================================
 * Routes
 * ===================================
 */


app.get('/', redirectToHome);

app.get('/artists', displayArtists);
app.get('/artists/new', displayAddArtistForm);
app.post('/artists/', addNewArtist);

app.get('/artists/:id', displayArtistPage);
app.get('/artists/:id/edit', displayEditArtistForm);
app.put('/artists/:id', acceptArtistChanges);
app.delete('/artists/:id', acceptArtistDelete);

app.get('/artists/:id/songs', displaySongsByArtist);
app.get('/artists/:id/songs/new', createNewSongByArtist);
app.post('/artists/:id/songs/', addNewSongByArtist);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(4200, () => console.log('~~~ Tuning in to the waves of port 4200 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
