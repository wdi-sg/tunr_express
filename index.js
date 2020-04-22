console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser')
var sha256 = require('js-sha256');

// Initialise postgres client
const configs = {
  user: 'Azhar',
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

//Unused boilerplate
// app.get('/', (request, response) => {
//   // query database for all ....

//   // respond with HTML page displaying all ....
//   response.send("Hello World");
//   // response.render('home');
// });

// app.get('/new', (request, response) => {
//   // respond with HTML page with form to create new ....
//   response.render('new');
// });

//Login and Register functions

app.get('/', (request, response) => {

  response.redirect("/login");

});
app.get('/login', (request, response) => {

  response.render("login");

});

app.get('/register', (request, response) => {

  response.render("register");

});
app.get('/logout', (request, response) => {
  var userId = "";
  var username = "";



  response.cookie('username', username);
  response.cookie('userId', userId);
  response.cookie('loggedin', false);
  response.redirect("/login");
});

app.post('/register', (request, response) => {
  var password = sha256(request.body.password);
  var confirm = sha256(request.body.confirm);
  console.log(request.body.username);

  if (password == confirm) {
    const queryString = 'INSERT INTO userTable (username, password) VALUES ($1, $2) RETURNING uid'
    const values = [request.body.username, password];
    pool.query(queryString, values, (err, result) => {

      if (err) {
        console.error('query error2:', err.stack);
        response.send('query error');
      } else {
        var username = request.body.username
        var userId = result.rows[0].uid;

        response.cookie('username', username);
        response.cookie('userId', userId);
        response.cookie('loggedin', true);
        response.redirect('/artists');

      }
    });
  }


});

app.post('/login', (request, response) => {
  var password = sha256(request.body.password);
  var username = request.body.username;
  const queryString = `SELECT * FROM userTable WHERE username = '${username}'`
  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error2:', err.stack);
      response.send('query error');
    } else {
      var checkPassword = result.rows[0].password;
      if (checkPassword == password) {
        var username = request.body.username
        var userId = result.rows[0].uid;

        response.cookie('username', username);
        response.cookie('userId', userId);
        response.cookie('loggedin', true);
        response.redirect('/artists');
      }
    }

  });
});

// View list of artists
app.get('/artists', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  // respond with HTML page with form to create new ....
  const queryString = 'SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists'

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error1:', err.stack);
      response.send('query error');
    } else {
      // console.log('query result:', result);
      var visits = request.cookies['visits'];

      // see if there is a cookie
      if (visits === undefined) {

        // set a default value if it doesn't exist
        visits = 1;
      } else {

        // if a cookie exists, make a value thats 1 bigger
        visits = parseInt(visits) + 1;
      }

      // set the cookie
      response.cookie('visits', visits);
      // console.log(result.rows);
      var output = {
        'artists': result.rows,
        'visits': visits
      }
      response.render('artists', output);
      // response.send( output);
    }
  });
}
});

// View new artist form page
app.get('/artists/new', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  // respond with HTML page with form to create new ....
  var visits = request.cookies['visits'];

  var output = {
    'visits': visits
  }
  response.render('new-artist', output);

}
});

app.post('/artists', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)'
  const values = [request.body.name, request.body.photo_url, request.body.nationality];
  pool.query(queryString, values, (err, result) => {

    if (err) {
      console.error('query error2:', err.stack);
      response.send('query error');
    } else {
      const queryString = 'SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists'

      pool.query(queryString, (err, result) => {

        if (err) {
          console.error('query error3:', err.stack);
          response.send('query error');
        } else {
          // console.log('query result:', result);
          var output = {
            'artists': result.rows
          }
          response.redirect('/artists');
          // response.send( output);
        }
      });
    }
  });

}});

app.get('/artists/:id', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  var artistId = request.params.id;
  const queryString = 'SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists';
  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error4:', err.stack);
      response.send('query error');
    } else {
      // console.log('query result:', result);
      var idMatch = [];
      // console.log(result.rows)
      for (id in result.rows) {
        if (result.rows[id].id == artistId) {
          idMatch.push(result.rows[id]);
        }
      }
      var visits = request.cookies['visits'];

      var output = {
        'artists': idMatch,
        'visits': visits
      }

      response.render('single-artist', output);
      // response.send(output);
    }
  });
}});

app.get('/artists/:id/edit', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  // respond with HTML page with form to create new ....
  var artistId = request.params.id;
  const queryString = 'SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists'

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error5:', err.stack);
      response.send('query error');
    } else {
      // console.log('query result:', result);
      var idMatch = [];
      // console.log(result.rows)
      for (id in result.rows) {
        if (result.rows[id].id == artistId) {
          idMatch.push(result.rows[id]);
        }
      }
      var visits = request.cookies['visits'];

      var output = {
        'artists': idMatch,
        'visits': visits
      }

      response.render('edit-artist', output);
      // response.send(output);
    }
  });
}});

app.put('/artists/:id', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  var artistId = request.params.id;
  const queryString = 'SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists';

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error6:', err.stack);
      response.send('query error');
    } else {
      var idMatch = [];
      // console.log(result.rows)
      for (id in result.rows) {
        if (result.rows[id].id == artistId) {
          idMatch.push(result.rows[id]);
        }
      }

      // var mappedId = idMatch[0].id;
      const queryString =
        `UPDATE artists SET name = $1, photo_url = $2, nationality = $3 WHERE id = $4`;
      const values = [request.body.name, request.body.photo_url, request.body.nationality, artistId];
      pool.query(queryString, values, (err, result) => {

        if (err) {
          console.error('query error7:', err.stack);
          response.send('query error');
        } else {
          const queryString = `SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists WHERE id = ${artistId}`;
          pool.query(queryString, (err, result) => {

            if (err) {
              console.error('query error8:', err.stack);
              response.send('query error');
            } else {

              // redirect to home page
              var output = {
                'artists': result.rows,
              }

              response.redirect(`/artists/${artistId}`);
              // response.send(output);
            }
          });
        }
      });
    }
  })
}})

app.delete('/artists/:id', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  var artistId = request.params.id;
  const queryString = 'SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists';

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error9:', err.stack);
      response.send('query error');
    } else {
      var idMatch = [];
      // console.log(result.rows)
      for (id in result.rows) {
        if (result.rows[id].artistid == artistId) {
          idMatch.push(result.rows[id]);
        }
      }

      // var mappedId = idMatch[0].id;
      const queryString =
        `DELETE FROM artists WHERE id = ${artistId}`;
      pool.query(queryString, (err, result) => {

        if (err) {
          console.error('query error10:', err.stack);
          response.send('query error');
        } else {
          const queryString = `SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists`;
          pool.query(queryString, (err, result) => {

            if (err) {
              console.error('query error11:', err.stack);
              response.send('query error');
            } else {

              // redirect to home page
              var output = {
                'artists': result.rows,
              }

              response.redirect('/artists');
              // response.send(output);
            }
          });
        }
      });
    }
  })
}})

app.get('/artists/:id/songs', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  var artistId = request.params.id;
  const queryString = 'SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists';
  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error4:', err.stack);
      response.send('query error');
    } else {
      // console.log('query result:', result);
      var idMatch = [];
      // console.log(result.rows)
      for (id in result.rows) {
        if (result.rows[id].id == artistId) {
          idMatch.push(result.rows[id]);
        }
      }
      // redirect to home page
      var output = {
        'artists': idMatch,
      }
      // var mappedId = idMatch[0].id;
      const queryString = `SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS songid, * FROM songs WHERE artist_id = ${artistId}`;
      pool.query(queryString, (err, result) => {
        if (err) {
          console.error('query error4:', err.stack);
          response.send('query error');
        } else {
          output.songs = result.rows;
          var visits = request.cookies['visits'];

          output.visits = visits;
          response.render('artist-songs', output);
        }
      })
    }
  });
}});

app.get('/artists/:id/songs/new', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  // respond with HTML page with form to create new ....
  var id = { 'id': request.params.id };
  var visits = request.cookies['visits'];

  // see if there is a cookie
  if (visits === undefined) {

    // set a default value if it doesn't exist
    visits = 1;
  } else {

    // if a cookie exists, make a value thats 1 bigger
    visits = parseInt(visits) + 1;
  }

  // set the cookie
  response.cookie('visits', visits);
  id.visits = visits;
  response.render('new-song', id);
}});

app.post('/artists/songs', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  const queryString = `SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS artistid, * FROM artists`;
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error2:', err.stack);
      response.send('query error');
    } else {
      var idMatch = [];
      // console.log(result.rows)
      for (id in result.rows) {
        if (result.rows[id].id == request.body.artist_id) {
          idMatch.push(result.rows[id]);
        }
      }
      var mappedId = idMatch[0].id;
      const queryString = 'INSERT INTO songs (title, album, preview_link,artwork,artist_id) VALUES ($1, $2, $3, $4, $5)';
      const values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, mappedId];
      pool.query(queryString, values, (err, result) => {

        if (err) {
          console.error('query error3:', err.stack);
          response.send('query error');
        } else {
          // console.log('query result:', result);

          // redirect to home page

          response.redirect(`/artists/${request.body.artist_id}/songs`);
          // response.send( output);
        }
      });
    }
  });
}});

app.get('/artists/:artist_id/songs/edit/:song_id', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  const queryString = `SELECT * FROM songs WHERE id = ${request.params.song_id}`;
  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error3:', err.stack);
      response.send('query error');
    } else {
      // console.log('query result:', result);
      var visits = request.cookies['visits'];

      var output = {
        'artist': request.params.artist_id,
        'song': result.rows,
        'visits': visits
      }

      response.render('edit-song', output);
    }
  });

}});

app.put('/artists/:artist_id/songs/:song_id', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  const queryString = `UPDATE songs SET title = $1, album = $2, preview_link = $3, artwork = $4 WHERE id = ${request.params.song_id}`;
  const values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork];
  pool.query(queryString, values, (err, result) => {

    if (err) {
      console.error('query error3:', err.stack);
      response.send('query error');
    } else {
      // console.log('query result:', result);

      var output = {
        'song': result.rows,
      }
      response.redirect(`/artists/${request.params.artist_id}/songs`);

    }
  });

}});

app.delete('/artists/:artist_id/songs/:song_id', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  const queryString = `DELETE FROM songs WHERE id = ${request.params.song_id}`;
  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error3:', err.stack);
      response.send('query error');
    } else {
      // console.log('query result:', result);

      var output = {
        'song': result.rows,
      }
      response.redirect(`/artists/${request.params.artist_id}/songs`);

    }
  });

}});

app.get('/playlists', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  // respond with HTML page with form to create new ....
  const queryString = 'SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS playlistid, * FROM playlist'

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error1:', err.stack);
      response.send('query error');
    } else {
      // console.log('query result:', result);

      var visits = request.cookies['visits'];

      var output = {
        'playlists': result.rows,
        'visits': visits
      }
      response.render('playlists', output);
      // response.send( output);
    }
  });
}});

app.get('/playlists/new', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  // respond with HTML page with form to create new ....
  var visits = request.cookies['visits'];
  var output = {
    'visits': visits
  }
  response.render('new-playlist', output);
}});

app.post('/playlists', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  const queryString = 'INSERT INTO playlist (name) VALUES ($1)'
  const values = [request.body.name];
  pool.query(queryString, values, (err, result) => {

    if (err) {
      console.error('query error2:', err.stack);
      response.send('query error');
    } else {

      var output = {
        'playlists': result.rows,
      }
      response.redirect('/playlists');
      // response.send( output);
    }
  })
}});

app.post('/playlists/:song_id', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  const queryString = 'INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1 , $2)'
  const values = [request.params.song_id, request.body.playlist];
  pool.query(queryString, values, (err, result) => {

    if (err) {
      console.error('query error2:', err.stack);
      response.send('query error');
    } else {

      response.redirect(`/playlists/${request.body.playlist}`);
      // response.send(request.body.playlist);
    }
  })
}});


app.get('/playlists/:song_id/newsong', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  const queryString
    = `SELECT *,songs.id AS song_id 
  FROM songs
  INNER JOIN artists 
  ON (songs.artist_id = artists.id)
  WHERE songs.id = ${request.params.song_id}`;
  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error3:', err.stack);
      response.send('query error');
    } else {
      var output = {
        'song': result.rows,
      }
    }
    const queryString = 'SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS playlistid, * FROM playlist';
    pool.query(queryString, (err, result) => {

      if (err) {
        console.error('query error3:', err.stack);
        response.send('query error');
      } else {
        output.playlists = result.rows;
        var visits = request.cookies['visits'];


        output.visits = visits;
        response.render('add-to-playlist', output);
      }
    });
  });
}});

app.get('/playlists/:playlist_id', (request, response) => {
  var loggedin = request.cookies['loggedin'];
  if(loggedin == false || loggedin == undefined){
    response.redirect('login');
  }
  else{
  // respond with HTML page with form to create new ....
  const queryString
    = `SELECT  ROW_NUMBER() OVER (ORDER BY ps.id ASC) AS trackid, ps.playlist_id, p.name AS playlist_name, ps.song_id, s.title, s.album, a.name AS artist_name, s.artist_id, s.preview_link, s.artwork
  FROM playlist AS p
  INNER JOIN playlist_song AS ps ON ps.playlist_id = p.id
  INNER JOIN songs AS s ON s.id = ps.song_id
  INNER JOIN artists AS a ON s.artist_id = a.id
  WHERE p.id = ${request.params.playlist_id}`

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error1:', err.stack);
      response.send('query error');
    } else {
      // console.log('query result:', result);

      var visits = request.cookies['visits'];

      var output = {
        'playlist': result.rows,
        'visits': visits
      }
      response.render('single-playlist', output);
      // response.send( output);
    }
  });
}});
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

