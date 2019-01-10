const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

var queryText;

const configs = {
  user: 'Serene',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

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



////////////////////////////////////////////////// Main Code ///////////////////////////////////////////////////

// Homepage
app.get('/', (request, response) => {
  response.render('home');
  
});

// Add new artist
app.post('/', (request, response) => {
  let name = request.body.name;
  let photoUrl = request.body.photoUrl;
  let nationality = request.body.nationality;
  
  let queryArgu = [name, photoUrl, nationality];

  queryText = `INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)`;

  pool.query(queryText, queryArgu,(err, result) => {
    if (err) {
      console.log("Oh no, error in POST / : ", err);
    } else {
      response.redirect('/artist');
    }
  })
})


// All artists
app.get('/artist', (request, response) => {
  queryText = `SELECT * FROM artists;`

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("Oh no, error in /artist : ", err);
    } else {
      response.render('allArtists', {artists: result.rows})
    }
  })
});


// New artist
app.get('/artist/new', (request, response) => {
  response.render('newArtist');
});

// Each artist
app.get('/artist/:id', (request, response) => {
  let id = parseInt(request.params.id);
  queryText = `SELECT * FROM artists WHERE id = ${id}`;
   
  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("Oh no, error in /artist/:id : ", err);
    } else {
      // console.log(result.rows);
      response.render('eachArtist', {artist: result.rows})
    }
  })
});

// Edit artist's information
app.put('/artist/:id', (request, response) => {
  let id = parseInt(request.params.id);
  let name = request.body.name;
  let photoUrl = request.body.photoUrl;
  let nationality = request.body.nationality;
  let queryArgu = [id, name, photoUrl, nationality];
  
  queryText = `UPDATE artists SET name=$2, photo_url=$3, nationality=$4 WHERE id=$1`;
  
  pool.query(queryText, queryArgu, (err, result) => {
    if (err) {
      
      console.log("Oh no, error in PUT /artist/:id : ", err);
    } else {
      response.redirect('/');
    }
  })
})

// Delete artist
app.delete('/artist/:id', (request, response) => {
  let queryArgu = [parseInt(request.params.id)];

  queryText = `DELETE from artists where id=$1`;

  pool.query(queryText, queryArgu, (err, result) => {
    if (err) {
      console.log("Oh no, error in DELETE /artist/:id : ", err);
    } else {
      response.redirect('/artist');
    }
  })
})

// Edit page for artist
app.get('/artist/:id/edit', (request, response) => {
  let id = parseInt(request.params.id);
  queryText = `SELECT * FROM artists WHERE id = ${id}`;

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("Oh no, error in /artist/:id/edit : ", err);
    } else {
      response.render('editArtist', {artist: result.rows})
    }
  })
 });


 
 
 // Display all Songs
 app.get('/song', (request, response) => {
   queryText = `SELECT * FROM songs;`
   
   pool.query(queryText, (err, result) => {
     if (err) {
       console.log("Oh no, error in /song : ", err);
      } else {
        console.log(result.rows);
        response.render('allSongs', {songs: result.rows})
      }
    })
  });

  
// Display list of songs of a artist
app.get('/artist/:id/songs', (request, response) => {
  let id = parseInt(request.params.id);
  queryText = `SELECT artists.id, artists.name AS artist_name, songs.id AS song_id, songs.title AS song_title FROM artists INNER JOIN songs ON artists.id = songs.artist_id WHERE artists.id = ${id}`;

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("Oh no, error in /artist/:id/songs : ", err);
    } else {
      // console.log(result.rows);
      response.render('eachArtistSongs', {artistSongs: result.rows})
    }
  })
});

// Add new songs to a artist
app.get('/artist/:id/songs/new', (request, response) => {
  let id = parseInt(request.params.id);
  queryText = `SELECT id ,name FROM artists WHERE artists.id = ${id}`;

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("Oh no, error in /artist/:id/songs/new : ", err);
    } else {
      // console.log(result.rows);
      response.render('newArtistSong', {artist: result.rows});
    }
  })
});


// Add new songs to a artist
app.post('/artist/:id/songs', (request, response) => {
  let id = parseInt(request.params.id);
  let title = request.body.title;
  let album = request.body.album;
  let preview = request.body.preview;
  let artwork = request.body.artwork;
  
  let queryArgu = [title, album, preview, artwork, id];

  queryText = `INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5)`;

  pool.query(queryText, queryArgu,(err, result) => {
    if (err) {
      console.log("Oh no, error in POST /artist/:id/songs : ", err);
    } else {
      let link = "/artist/" + id + "/songs";
      response.redirect(link);
    }
  })
})


// Each song
app.get('/song/:id', (request, response) => {
  let id = parseInt(request.params.id);
  queryText = `SELECT *, artists.id AS artist_id FROM songs INNER JOIN artists ON artists.id = songs.artist_id WHERE songs.id = ${id}`;
  console.log(queryText);
  
  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("Oh no, error in /song/:id : ", err);
    } else {
      response.render('eachSong', {song: result.rows})
    }
  })
});


// All Playlists
app.get('/playlist', (request, response) => {
  queryText = `SELECT * FROM playlists`;
  console.log(queryText);
  
  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("Oh no, error in /playlist: ", err);
    } else {
      // console.log(result.rows);
      response.render('allPlaylists', {playlists: result.rows})
    }
  })
});

// New Playlist
app.get('/playlist/new', (request, response) => {
  response.render('newPlaylist');
});

// New Playlist POST
app.post('/playlist', (request, response) => {
  let queryArgu = [request.body.playlist];
  queryText = `INSERT INTO playlists (name) VALUES ($1)`;

  pool.query(queryText, queryArgu, (err, result) => {
    if (err) {
      console.log("Oh no, error in POST /playlist: ", err);
    } else {
      // console.log(result.rows);
      response.redirect('/playlist');
    }
  })
});


// Each Playlist
app.get('/playlist/:id', (request, response) => {
  let id = parseInt(request.params.id);

  queryText = `SELECT playlists.id AS playlist_id, playlists.name AS playlist_name, songs.id AS song_id, songs.name AS song_name FROM playlists INNER JOIN playlistsongs ON playlists.id = playlistsongs.playlist_id INNER JOIN songs ON playlistsongs.song_id = songs.id WHERE playlists.id = ${id}`;
  console.log(queryText);
  
  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("Oh no, error in /playlist/:id : ", err);
    } else {
      console.log(result.rows);
      // TODO: response.render('eachPlaylist', {playlist: result.rows})  
    }
  })
});



// Server settings
const server = app.listen(3000, () => console.log('~~~ Supz, tuning in to the waves of port 3000 ~~~'));

let onClose = function(){
  console.log("Closing database~");
  
  server.close(() => {
    
    console.log('Process terminated');
    
    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
