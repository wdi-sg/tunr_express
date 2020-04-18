console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'qunda',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (error) {
  console.log('idle client error', error.message, error.stack);
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

async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
}

const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

/**
* ===================================
* GET Routes Artists
* ===================================
*/

app.get('/', (request, response) => {
  response.render('home');
});

app.get('/artists/', (request, response) => {
  pool.query('SELECT * FROM artists', (error, result) => {
    if (error) {
      console.log('query error: ', error.message, error.stack);
    } else {
      const artists = result.rows;
      response.render('artists', {"artists": artists});
    }
  })
});

app.get('/artists/new', (request, response) => {
  response.render('new');
});

app.get('/artists/:id', (request, response) => {
  const artistId = request.params.id;

  pool.query('SELECT * FROM artists WHERE id=$1', [artistId], (error, result) => {
    if (error) {
      console.log('query error: ', error.message, error.stack);
    } else {
      const artist = result.rows[0];
      response.render('artist', {'artist': artist});
    }
  });
});

app.get('/artists/:id/edit', (request, response) => {
  const artistId = request.params.id;

  pool.query('SELECT * FROM artists WHERE id=$1', [artistId], (error, result) => {
    if (error) {
      console.log('artist query error: ', error.message, error.stack);
    } else {
      const artist = result.rows[0];
      response.render('artist-edit', {"artist": artist});
    }
  });
});

app.get('/artists/:id/songs', (request, response) => {
  const artistId = request.params.id;

  pool.query('SELECT * FROM artists WHERE id=$1', [artistId], (error, result) => {
    if (error) {
      console.log('artist query error: ', error.message, error.stack);
    } else {
      const artist = result.rows[0];

      pool.query('SELECT * FROM songs WHERE artist_id=$1', [artistId], (error, result) => {
        if (error) {
          console.log('query error: ', error.message, error.stack);
        } else {
          const songs = result.rows;
          response.render('artist-songs', {"songs": songs, "artist": artist});
        }
      });
    }
  })
});



/**
* ===================================
* GET Routes Playlists
* ===================================
*/

app.get('/playlists/', (request, response) => {
  response.send('under construciton');
});

app.get('/playlists/new', (request, response) => {
  pool.query('SELECT * FROM songs', (error, result) => {
    if (error) {
      console.log('query error: ', error.message, error.stack);
    } else {
      const songList = result.rows;
      response.render('new-playlist', {"songList": songList});
    }
  })
});

app.get('/playlists/:id', (request, response) => {
  const playlistId = request.params.id;

  pool.query('SELECT * FROM playlist_song WHERE playlist_id=$1', [playlistId], (error, result) => {
    if (error) {
      console.log('playlist songs query error: ', error.message, error.stack);
    } else {
      const playlistSongs = result.rows;
      const songs = [];

      const playlistSongsQuery = async () => {
        await asyncForEach(playlistSongs, async playlistSong => {
          await waitFor(50);
          pool.query('SELECT * FROM songs WHERE id=$1', [playlistSong.song_id], (error, result) => {
            if (error) {
              console.log('song query error: ', error.message, error.stack);
            } else {
              songs.push(result.rows[0]);
            }
          })
        })

        pool.query('SELECT * FROM playlist WHERE id=$1', [playlistId], (error, result) => {
          if (error) {
            console.log('playlist query error: ', error.message, error.stack);
          } else {
            const playlist = result.rows[0];
            response.render('playlist', {"playlist": playlist, "songs": songs});
          }
        })
      };

      playlistSongsQuery();
    }
  })
});



/**
* ===================================
* POST Routes
* ===================================
*/

app.post('/artists', (request, response) => {
  const name = request.body.name;
  const photo_url = request.body.photo_url;
  const nationality = request.body.nationality;

  const values = [name, photo_url, nationality];

  const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)';

  pool.query(queryString, values, (error, result) => {
    if (error) {
      console.log('query error: ', error.message, error.stack);
    } else {
      response.render('success');
    }
  });
});

app.post('/playlists', (request, response) => {
  const name = request.body.name;
  const songs = request.body.songs;

  pool.query('INSERT INTO playlist (name) VALUES ($1) RETURNING id', [name], (error, result) => {
    if (error) {
      console.log('playlist insery error: ', error.message, error.stack);
    } else {
      const playlist_id = result.rows[0].id;

      pool.query('SELECT id, title FROM songs', (error, result) => {
        if (error) {
          console.log('query error: ', error.message, error.stack);
        } else {
          const songList = result.rows;

          const songsId = songs.map(song => {
            for (let i = 0; i < songList.length; i++) {
              if (songList[i].title === song) {
                return songList[i].id;
              }
            }
          })

          songsId.forEach(songId => {
            pool.query('INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2)', [songId, playlist_id], (error, result) => {
              if (error) {
                console.log(`error inserting song_id ${songId}: `, error.message, error.stack);
              } else {
                console.log('done!');
              }
            })
          })

          response.render('success');
        }
      })
    }
  })
})



/**
* ===================================
* PUT Routes
* ===================================
*/

app.put('/artists/:id', (request, response) => {
  const name = request.body.name;
  const photo_url = request.body.photo_url;
  const nationality = request.body.nationality;
  const artistId = request.params.id;

  const values = [name, photo_url, nationality, artistId];

  const queryString = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4';

  pool.query(queryString, values, (error, result) => {
    if (error) {
      console.log('query error: ', error.message, error.stack);
    } else {
      response.render('success');
    }
  })
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