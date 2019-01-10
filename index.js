console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'postgres',
  password: 'postgres',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

// var tools = require('./functions.js');

// sudo -u postgres createdb todolist
// psql -d todolist -U postgres -f tables.sql;

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

let text = "";
let followUpText="";

const showArtist =  ( text, response ) => {
  pool.query(text,(err, res) => {
    let artists = {};
    artists.list=[];
    for(let i = 0; i < res.rows.length; i++){
            artists.list.push(res.rows[i]);
        }
    response.render('artists', artists);
  });
}

const showSong =  ( text, response ) => {
  pool.query(text,(err, res) => {
    let songs = {};
    songs.list=[];
    for(let i = 0; i < res.rows.length; i++){
            songs.list.push(res.rows[i]);
        }
    response.render('songs', songs);
  });
}

const editArtist =  ( text, response ) => {
  pool.query(text,(err, res) => {
    response.render('editArtist', res.rows);
  });
}

const editSong =  ( text, response ) => {
  pool.query(text,(err, res) => {
    response.render('editSong', res.rows);
  });
}

const createSongSpecific =  ( text, response ) => {
  pool.query(text,(err, res) => {
    response.render('createSongSpecific', res.rows);
  });
}

const doubleQuerySong = ( text, followUpText, response ) => {
  pool.query(text,(err, res) => {
    pool.query(followUpText,(err, res) => {
      let songs = {};
      songs.list=[];
      for(let i = 0; i < res.rows.length; i++){
              songs.list.push(res.rows[i]);
          }
      response.render('songs', songs);
    });
  });
}

const insertSongPlaylist =(text, followUpText, response) => {
  pool.query(text,(err, res) => {
    pool.query(followUpText,(err, res) => {
      // response.send(res);
    let items = {};
      items.list=[];
      for(let i = 0; i < res.rows.length; i++){
              items.list.push(res.rows[i]);
          }
      response.render('playlists', items);
    });
  });
}

const showPlaylist =(text, response) => {
  pool.query(text,(err, res) => {
    let items = {};
      items.list=[];
      for(let i = 0; i < res.rows.length; i++){
              items.list.push(res.rows[i]);
          }
      response.render('playlists', items);
  });
}

app.get('/', (request, response) => {
  text = 'SELECT * FROM artists';
  showArtist(text, response);
});

app.get('/songs', (request, response) => {
  text = `SELECT songs.*, artists.name 
          AS artist_name 
          FROM songs 
          INNER JOIN artists 
          ON songs.artist_id = artists.id`;
  showSong(text, response);
});

app.get('/artist/:id', (request, response) => {
  text = `SELECT * FROM artists WHERE id= ${request.params.id}`;
  showArtist(text, response);
});

app.delete('/delete/artist/:id', (request, response) => {
  text = `DELETE FROM artists WHERE id= ${request.params.id} RETURNING *`;
  showArtist(text, response);
});

app.get('/songs/:id', (request, response) => {
  text = `SELECT songs.*, artists.name
          AS artist_name
          FROM songs
          INNER JOIN artists
          ON songs.artist_id = artists.id
          WHERE songs.id=${request.params.id}`;
  showSong(text, response);
});

app.delete('/delete/song/:id', (request, response) => {
  text = `DELETE FROM songs WHERE id= ${request.params.id} RETURNING *`;
  showSong(text, response);
});

app.get('/artist/:id/songs/new', (request, response) => {
  text = `SELECT id, name FROM artists WHERE id= ${request.params.id}`;
  createSongSpecific(text, response);
});

app.get('/artist/:id/songs', (request, response) => {
  text = `SELECT songs.*, artists.name
          AS artist_name
          FROM songs
          INNER JOIN artists
          ON songs.artist_id = artists.id 
          WHERE songs.artist_id= ${request.params.id}`;
  showSong(text, response);
});

app.get('/create/artist', (request, response) => {
  response.render('createArtist');
});

app.post('/create/newArtist', (request, response) => {
  text = `INSERT INTO artists(name, photo_url, nationality) VALUES ('${request.body.name}', '${request.body.photo_url}', '${request.body.nationality}') RETURNING *`;
  showArtist(text, response);
});

app.get('/create/song', (request, response) => {
  response.render('createSong');
});

app.post('/create/newSong', (request, response) => {

  let album = request.body.album;
  let updateAlbum = album.replace(`'`, `''`);

  text = `INSERT INTO songs(title, album, preview_link, artwork, artist_id) 
          VALUES ('${request.body.title}', '${updateAlbum}', '${request.body.preview_link}','${request.body.artwork}', ${request.body.artist_id}) 
          RETURNING *`;

  followUpText = `SELECT songs.*, artists.name
          AS artist_name
          FROM songs
          INNER JOIN artists
          ON songs.artist_id = artists.id
          WHERE songs.title='${request.body.title}' 
          AND songs.album='${updateAlbum}'`

  doubleQuerySong(text, followUpText, response);
});

app.get('/edit/artist/:id', (request, response) => {
  text = `SELECT * FROM artists WHERE id= ${request.params.id}`;
  editArtist(text, response);
});

app.post('/edit/editedArtist/:id', (request, response) => {
  text = `UPDATE artists SET name='${request.body.name}', photo_url='${request.body.photo_url}', nationality='${request.body.nationality}' WHERE id= ${request.params.id} RETURNING *`;
  console.log(text);
  showArtist(text, response);
});

app.get('/edit/song/:id', (request, response) => {
  text = `SELECT * FROM songs WHERE id= ${request.params.id}`;
  editSong(text, response);
});

app.post('/edit/editedsong/:id', (request, response) => {

  let album = request.body.album;
  let updateAlbum = album.replace(`'`, `''`);

  text = `UPDATE songs 
          SET title='${request.body.title}', album='${updateAlbum}', preview_link='${request.body.preview_link}', artwork='${request.body.artwork}', artist_id='${request.body.artist_id}' 
          WHERE id= ${request.params.id}`;

  console.log(text);

  followUpText = `SELECT songs.*, artists.name
          AS artist_name
          FROM songs
          INNER JOIN artists
          ON songs.artist_id = artists.id
          WHERE songs.title='${request.body.title}' 
          AND songs.album='${updateAlbum}'`

  doubleQuerySong(text, followUpText, response);
  
});

app.get('/playlists', (request, response) => {

  text = `SELECT playlists.playlist, songs.*
          FROM ((playlists
          RIGHT JOIN relations
          ON playlists.id = relations.playlist_id)
          INNER JOIN songs
          ON relations.song_id = songs.id)`;

  showPlaylist(text, response);

});

app.post('/playlist/addsong/:id', (request, response) => {

  text = `INSERT INTO relations(song_id, playlist_id) VALUES(${request.params.id}, 1);`;

  followUpText = `SELECT playlists.playlist, songs.*
          FROM ((playlists
          RIGHT JOIN relations
          ON playlists.id = relations.playlist_id)
          INNER JOIN songs
          ON relations.song_id = songs.id)`;

  insertSongPlaylist(text, followUpText, response);

});


// Add a table for playlist
// add column at the side displaying title and artist in a table

// Playlist song data is a join table between a playlist and songs. (each record in the join table records the adding of one song to the playlist)
//???

// /playlist - list all the playlists /playlist/new - render the form to create a new playlist /playlist/:id - show all the song titles inside this playlist

// Further
// For the form at /songs/new, add a dropdown of artists to select from when creating a new song.
//see reference

// Further: Playlist
// Restrict the user from adding a song to a playlist twice.
// disable if true

// Further
// Add a button to each song in the lists of songs ( /songs, /artist/:id/songs ) that goes to a new page.
// This page will have a list of playlists. Let the user add the song to any playlist.


// sub-futher: If a playlist already has the song in it, then don't render that playlist in the list.

// Further
// Add the ability for the user to add the song to multiple playlists at once. ( this is a checkbox form input )
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

//testing new branch
