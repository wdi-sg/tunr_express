console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser');
const SALT = 'applebeescatsdogs';

// Initialise postgres client
const configs = {
  user: 'postgres',
  password: 'postgres',
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

app.use(express.static('Public'));
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
 *
 *
 * ===================================
 * Routes Part 1
 * ===================================
 *
 *
 *
 */

app.get('/artists', (request, response) => {

  const queryString = "SELECT * FROM artists ORDER BY id";

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('59 query error:', err.stack);
      response.send( 'query error' );
    } else {
      const data = { artists: result.rows };
      response.render('home', data );
    }
  });
});

app.get('/artists/new', (request, response) => {
  response.render('new');
});

app.post('/artists', (request, response) => {

  const queryString = "INSERT INTO artists(name, nationality, photo_url) VALUES($1,$2,$3) RETURNING id";
  const values = Object.values(request.body);

  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.error('80 query error:', err.stack);
      response.send( 'query error' );
    } else {
      response.redirect(`/artists/${result.rows[0].id}`);
    }
  });
});

app.get('/artists/:id/edit', (request, response) => {

  const id = request.params.id;

  const queryString = `SELECT * FROM artists WHERE id='${id}'`;

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('96 query error:', err.stack);
      response.send( 'query error' );
    } else {
      const data = { artist: result.rows };
      response.render('editArtist', data );
    }
  });
});

app.put('/artists/:id', (request, response) => {

  const id = request.params.id;
  const object = request.body;
  const name = object.name;
  const nationality = object.nationality;
  const url = object.url;

  const queryString = `UPDATE artists SET name='${name}', nationality='${nationality}', photo_url='${url}' WHERE id='${id}' RETURNING id`;

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('117 query error:', err.stack);
      response.send( 'query error' );
    } else {
      response.redirect(`/artists/${result.rows[0].id}`);
    }
  });
});

app.get('/artists/:id/delete', (request, response) => {

  const id = request.params.id;

  const queryString = `SELECT * FROM artists WHERE id='${id}' ORDER BY id`;

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('134 query error:', err.stack);
      response.send( 'query error' );
    } else {
      const data = { artist: result.rows };
      response.render('deleteArtist', data );
    }
  });
});

app.delete('/artists/:id', (request, response) => {

  const id = request.params.id;

  const queryString = 
  `DELETE FROM artists WHERE id='${id}'`;

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('134 query error:', err.stack);
      response.send( 'query error' );
    } else {
      response.redirect('/artists');
    }
  });
});

app.get('/artists/:id', (request, response) => {

  const id = request.params.id;

  const queryString = `SELECT * FROM artists WHERE id='${id}'`;

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('152 query error:', err.stack);
      response.send( 'query error' );
    } else {
      const data = { artist: result.rows };
      response.render('showSingleArtist', data );
    }
  });
});


/**
 *
 *
 * ===================================
 * Part 2: Routes for songs of a particular artist
 * ===================================
 *
 *
 *
 */
app.get('/artists/:id/songs', (request, response) => {

  const artistId = request.params.id;
  const queryString = `SELECT *, songs.id FROM songs INNER JOIN artists ON (songs.artist_id=artists.id) where artist_id=${artistId}`;

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('203 query error:', err.stack);
      response.send( 'query error' );
    } else {
      const data = { songs: result.rows };
      response.render('listSongsOfAnArtist', data );
    }
  });
});

app.get('/artists/:id/songs/new', (request, response) => {

  const id = request.params.id;
  const queryString = `SELECT * FROM artists WHERE id=${id}`;

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('220 query error:', err.stack);
      response.send( 'query error' );
    } else {
      const data = { artist: result.rows };
      response.render('newSong', data );
    }
  });
});

app.post('/artists/:id/songs', (request, response) => {

  const id = request.params.id;
  const queryString = `INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1,$2,$3,$4,$5)`;
  let values = Object.values(request.body);
  values.push(id);
  pool.query(queryString, values, (err, result) => {

    if (err) {
      console.error('241 query error:', err.stack);
      response.send( 'query error' );
    } else {
      response.redirect(`/artists/${id}/songs`);
    }
  });
});


/**
 *
 *
 * ===================================
 * Part 2: Routes for playlist
 * ===================================
 *
 *
 *
 */

// app.get('/playlist', (request, response) => {
//   const queryString = "SELECT * FROM playlist ORDER BY id";

//   pool.query(queryString, (err, result) => {

//     if (err) {
//       console.error('264 query error:', err.stack);
//       response.send( 'query error' );
//     } else {
//       const data = { playlist: result.rows };
//       response.render('playlistHome', data );
//     }
//   });
// });

// app.get('/playlist/new', (request, response) => {
//   response.render('newPlaylist');
// });

// app.post('/playlist', (request, response) => {
  
//   const array = Object.values(request.body);
//   const playlist_name = array.shift();
//   const values = [];
//   const valueString = "";
//   for (i=0; i<array.length; i++) {
//   	values.push(playlist_name);
//   	values.push(array[i]);
//   	valuesString += `$${i+1}`;
//   }
//   console.log("288");
//   console.log(values);
//   console.log(valuesString);

//   const queryString = `INSERT INTO playlist_songs(playlist_name, song_title) VALUES($1,$2)`;
  


//   pool.query(queryString, values, (err, result) => {
//     if (err) {
//       console.error('270 query error:', err.stack);
//       response.send( 'query error' );
//     } else {
//       response.redirect(`/playlist`);
//     }
//   });
// });


/**
 *
 *
 * ===================================
 * Part 3
 * ===================================
 *
 *
 *
 */

app.get('/register', (request, response) => {
  response.render('registerNewUser');
})

app.post('/register', (request, response) => {

  const hash = sha256(request.body.password + SALT);
  const queryString = "INSERT INTO users (username, password) VALUES ($1, $2);"
  const values = [request.body.username, hash];
  console.log("332");
  console.log(values);

  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.error('337 query error:', err.stack);
      response.send( 'query error' );
    }

  const hashLoggedIn = sha256(SALT+values.username);
  response.cookie('username', request.body.username);
  response.cookie('loggedIn', hashLoggedIn);
  
  response.redirect('/artists');
  })
})


app.get('/login', (request, response) => {
  response.render('login');
})

app.post('/login', (request, response) => {

  const usernameInput = request.body.username;
  const passwordInput = request.body.password;
  const passwordInputHash = sha256(passwordInput + SALT);
  console.log("363");
  console.log(usernameInput);
  console.log(passwordInput);
  const queryString = `SELECT * from users WHERE username='${usernameInput}'`;

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('370 query error:', err.stack);
      response.send( 'query error' );
    }
    console.log("373");
    console.log(result.rows[0].password);
    console.log("375");
    console.log(passwordInputHash);
    if (result.rows.length === 1) {
      if (passwordInputHash === result.rows[0].password) {

        const hashLoggedIn = sha256(SALT+usernameInput);

        response.cookie('username', usernameInput);
        response.cookie('loggedIn', hashLoggedIn);
        response.redirect('/artists');
      } else {
        response.send('Incorrect password. Please refresh page and try again')
      }

    } else {
      response.send('Incorrect username. Please refresh page and try again')
    }

  });
})

app.get('/favorites/new', (request, response) => {

  if (request.cookies.username === undefined) {
    response.send("You must be logged in to view this page. Please log in and try again.");
  }
  else {
    const username = request.cookies.username;
    let queryString = "SELECT id, title FROM songs ORDER BY title";
    
    pool.query(queryString, (err, result) => {
      if (err) {
        console.error('402 query error:', err.stack);
        response.send( 'query error' );
      }
      const data={songs: result.rows};
      response.render('addFavorites', data);
    })
  }
})

app.post('/favorites', (request, response) => {
  const username = request.cookies.username;
  const userIdQuery = `SELECT users.id FROM users WHERE username='hello2'`;

  pool.query(userIdQuery, (err, result) => {
    if (err) {
      console.error('417 query error:', err.stack);
      response.send( 'query error' );
    }
    let userId = result.rows[0].id;

    let object = request.body;
    let arrayOfFavoriteSongs = Object.values(object);
    
    let valuesString = "";
    for (i=0; i<arrayOfFavoriteSongs.length; i++) {
      if (i < arrayOfFavoriteSongs.length-1) {
        valuesString += `(${userId}, ${arrayOfFavoriteSongs[i]}), `; 
      } else {
        valuesString += `(${userId}, ${arrayOfFavoriteSongs[i]})`;
      }
    }

    let queryString = `INSERT INTO favorites (user_id, song_id) VALUES ${valuesString}`;
    
    pool.query(queryString, (err, result) => {
      if (err) {
        console.error('438 query error:', err.stack);
        response.send( 'query error' );
      }
      response.send("ok!");
    })

  });

})

app.get('/favorites', (request, response) => {
  if (request.cookies.username === undefined) {
    response.send("You must be logged in to view this page. Please log in and try again.");
  }
  else {

    let queryString = "SELECT songs.title, songs.album, songs.preview_link, songs.artwork, songs.artist_id FROM favorites INNER JOIN users ON (favorites.user_id=users.id) INNER JOIN songs ON (favorites.song_id=songs.id) ORDER BY songs.title";
    
    pool.query(queryString, (err, result) => {
      if (err) {
        console.error('461 query error:', err.stack);
        response.send( 'query error' );
      }
      const data = {songsDetail: result.rows};
      response.render('showFavorites', data);

      // let artistIdArray = [];
      // for (i=0; i<result.rows.length; i++) {
      //   artistIdArray.push(result.rows[i].artist_id);
      // }

      // let artistNameQuery = `SELECT name FROM artists WHERE artists.id IN ($1, $2, $3)`;

      // pool.query(artistNameQuery, artistIdArray, (err, result) => {
      //   if (err) {
      //     console.error('472 query error:', err.stack);
      //     response.send( 'query error' );
      //   }
      //   const artistNameArray = result.rows;
      //   console.log("482");
      //   console.log(artistNameArray);

      //   const data = {songsDetails: songsDetailsArray, artistNames: artistNameArray}
      //   response.render('showFavorites', data);
      // })
    })
  }
})



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(8080, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){
  
  console.log("closing");
  
  server.close(() => {
    
    console.log('Process terminated');
    
    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
