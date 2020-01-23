const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const callback = require('./functions')
const cookieParser = require('cookie-parser')


// Initialise postgres client
const configs = {
  user: 'robertkolsek',
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

//INIT COOKIER PARSER
app.use(cookieParser());

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

app.get('/favorites', callback.showFavorites)
app.get('/register', callback.registerForm)
app.post('/register', callback.registerUser)
app.get('/login', callback.loginForm)
app.post('/login', callback.loginUser)
app.post('/playlist', callback.newPlaylist)
app.post('/playlist/:id', callback.playlistNewSong)
app.get('/playlist/new', callback.showNewPlaylist)
app.get('/playlist/:id', callback.showPlaylistByID)
app.get('/playlist/:id/newsong', callback.showPlaylistNewSong)
app.delete('/artists/:id', callback.deleteArtist)
app.get('/artists/:id/delete', callback.deleteForm)
app.get('/artists/:id/edit', callback.editForm)
app.put('/artists/:id', callback.editArtist)
app.get('/artists/new', callback.newForm);
app.post('/artists', callback.newArtist)
app.get('/artists', callback.showArtists)
app.get('/artists/:id/songs', callback.showSongs)
app.get('/artists/:id/songs/new', callback.showArtistNewSong)
app.post('/artists/:id/songs', callback.artistNewSong)
app.get('/artists/:id', callback.showArtistByID)

app.get('/', (request, response) => {
  response.render('home');
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function () {

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end(() => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);