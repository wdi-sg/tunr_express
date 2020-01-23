const express = require('express');
const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');
const methodOverride = require('method-override');
const pg = require('pg');
const func = require('./function')
// Initialise postgres client
const configs = {
  user: 'jessica',
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
//Artist
app.get('/new', func.addArtistPage);
app.post('/', func.addArtist);
app.get('/artist/:id/songs/new', func.displaySongsToAddArtist);
app.post('/artist/:id/songs', func.addSongsToArtist);
app.get('/artists/:id/songs',func.showArtistSongs);
app.get('/artists/:id/edit',func.editArtist);
app.put('/artists/:id',func.storeEditArtist);
app.get('/artists/:id',func.showArtist);
app.delete('/artists/:id', func.deleteArtist);
//////////////////PLAYLIST/////////////////
app.get('/playlists/new', func.addPlayListPage);
app.get('/playlists/:id', func.showPlayList)
app.get('/playlists', func.showPlayLists)
app.post('/playlists', func.addPlayList );
app.get('/playlists/:id/newsong', func.newPlaylistSongPage);
app.get('/playlists/:id/newsong', func.newPlaylistSongPage);
app.post('/playlists/:id', func.addPlayListSongs);

app.get('/register', func.registerUserPage);
app.post('/register', func.registerUser);
app.get('/', func.showArtists);
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