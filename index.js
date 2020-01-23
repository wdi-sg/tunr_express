console.log("starting up!!");
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const reactEngine = require('express-react-views').createEngine();
const cookieParser = require('cookie-parser')

// Initialise postgres client
const configs = {
  user: 'rachelle',
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

app.use(methodOverride('_method'));
app.engine('jsx', reactEngine);

app.use(cookieParser());

// Set react-views to be the default view engine

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

app.use(express.static(__dirname + "/public/"));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/home', (request, response) => {
  let myResponse = "visits: "+request.cookies.visits;
  response.send(myResponse);
});

/**
 * ===================================
 * Routes {ARTISTS}
 * ===================================
 */

app.get('/artists', (request, response) => {
  
  // get the currently set cookie
  var visits = request.cookies['visits'];

  // see if there is a cookie
  if( visits === undefined ){
    // set a default value if it doesn't exist
    visits = 1;
  }else{
    // if a cookie exists, make a value thats 1 bigger
    visits = parseInt( visits ) + 1;
  }
  var date = new Date();
  date.setTime(date.getTime() + (10 * 1000));
  response.cookie('visits', visits, { expires: date });

  // query database for all pokemon
  
  const queryString = 'SELECT * from artists'
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
      response.send( 'query error' );
    } else {
      console.log('query result:', result);
      let data = {
          artists: result.rows
      }
      response.render('home', data);
    }
  });
  // respond with HTML page displaying all pokemon
  //response.render('home');
});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

app.post('/artists', (request,response) => {
  let insertQueryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id';

  const values = [
    request.body.name,
    request.body.url,
    request.body.nationality
  ];

  pool.query(insertQueryText, values, (err, result) => {
    if (err) {
      //console.error('query error:', err.stack);
      response.send( 'query error' );
    } else {
      //console.log('query result:', result);
      // redirect to home page
      // response.send( result.rows );
      let allArtistsName = [];
      let listOfArtists = result.rows;
      console.log(result.rows)
      for (i = 0; i < listOfArtists.length; i++) {
          let currentArtistName = listOfArtists[i].name;
          allArtistsName.push(currentArtistName);
          // console.log(currentArtist);
          // console.log(currentArtistName);
      }
      let data = {
          artists: allArtistsName,
      }
      response.render('home', data);
      //console.log(data)
    }
  });
});

app.get('/artists/:id', (request,response) => {
  const queryString = 'SELECT * from artists WHERE id=$1;'
  const values = [request.params.id];
  pool.query(queryString, values, (err,result) => {
    if (err) {
      console.log("error", err.message)
    } else {
      let currentArtist = result.rows[0];
      let artistId = result.rows[0].id;
      let songsQuery = "SELECT * FROM songs WHERE artist_id="+artistId;
      pool.query(songsQuery, (songsErr, songsResult) => {
        if (err) {
          console.log("error", err.message)
        } else {
          // let songs = [];
          // for (var i = 0; i < songsResult.rows.length; i++) {
          //   let songName = songsResult.rows[i].title;
          //   songs = songs + "," + songName;
          // }
          console.log(currentArtist)
          let data = {
              artists: currentArtist,
              songs: songsResult.rows
          }
          //console.log(songs);
          response.render('single', data);
        }
      });
    }
  }); // end outer pool.query
});

app.get('/artists/:id/edit', (request,response) => {
  const queryString = 'SELECT * from artists WHERE id=$1;'
  const values = [request.params.id];
  pool.query(queryString, values, (err,result) => {
    let currentArtist = result.rows[0];
    console.log(currentArtist)
    let data = {
        artists: currentArtist
    }
    response.render('edit', data);
  });
});

app.put('/artists/:id', (request,response) => {
  const queryString = 'UPDATE artists SET name=$2, photo_url=$3, nationality=$4 WHERE id=$1;'
  const values = [
    request.params.id,
    request.body.name,
    request.body.url,
    request.body.nationality
  ];
  pool.query(queryString, values, (err,result) => {
    if (err) {
      console.log("error", err.message)
    } else {
      let currentArtist = result.rows[0];
      console.log(currentArtist)
      let data = {
          artists: currentArtist
      }
      response.render('single', data);
    }
  });
});

app.delete('/artists/:id', (request, response) => {
  const queryId = request.params.id;
  const queryString = 'DELETE from artists WHERE id='+queryId;
  pool.query(queryString, (err,result) => {
    if (err) {
      console.log("error", err.message)
    } else {
      const queryArtistString = 'SELECT * from artists;'
      pool.query(queryArtistString, (artistErr, artistResult) => {
        if (artistErr) {
          console.log("error", err.message)
        } else {
          let currentArtist = result.rows;
          console.log(currentArtist)
          let data = {
              artists: currentArtist
          }
          response.render('home', data);
        }
      });
    }
  });
});

/**
 * ===================================
 * Routes {PLAYLISTS}
 * ===================================
 */

app.get('/playlist/new', (request, response) => {
  response.render('playlist-new');
});

app.get('/playlist', (request, response) => {
  
  const queryString = 'SELECT * from playlist'
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
      response.send( 'query error' );
    } else {
      console.log('query result:', result);
      let data = {
          playlists: result.rows
      }
      response.render('playlist-home', data);
    }
  });
  // respond with HTML page displaying all pokemon
  //response.render('home');
});

app.post('/playlist', (request,response) => {
  let insertQueryText = 'INSERT INTO playlist (name) VALUES ($1) RETURNING id';

  const values = [
    request.body.name,
  ];

  pool.query(insertQueryText, values, (err, result) => {
    if (err) {
      //console.error('query error:', err.stack);
      response.send( 'query error' );
    } else {
      let data = {
          playlists: result.rows[0],
      }
      response.render('playlist-home', data);
      //console.log(data)
    }
  });
});

app.get('/playlist/:id', (request,response) => {
  const queryString = 'SELECT * from playlist WHERE id=$1;'
  const values = [request.params.id];
  pool.query(queryString, values, (err,result) => {
    if (err) {
      console.log("error", err.message)
    } else {
      let currentArtist = result.rows[0];
      let data = {
        playlists: currentArtist
      }
      //console.log(songs);
      response.render('playlist-single', data);
    }
  }); // end outer pool.query
});

app.get('/playlist/:id/newsong', (request,response) => {
  const queryString = 'SELECT * FROM playlist WHERE id=$1;'
  const values = [request.params.id];
  pool.query(queryString, values, (err,result) => {
    if (err) {
      console.log("error", err.message)
    } else {
      const queryString = 'SELECT * FROM songs;'
      // figure out the bloody select query
      // const queryString = 'SELECT * FROM playlist_song INNER JOIN songs ON playlist_song.song_id = songs.id WHERE playlist_song.playlist_id=$1'
      // SELECT songs.song_id, playlist.playlist_id
      // FROM playlist_song 
      // INNER JOIN shop_products 
      // ON (shop_products.product_id = products.id) 
      // WHERE shop_products.shop_id = 2;
      pool.query(queryString, (err,result) => {
        if (err) {
          console.log("error", err.message)
        } else {
          
          let allSongs = result.rows;
          let data = {
            songs: allSongs
          }
          //console.log(songs);
          response.render('playlist-new-song', data);
            //console.log(songs);
          }
      }); // end inner pool.query
      }
  }); // end outer pool.query
});

app.post('/playlist/:id', (request,response) => {
  let insertQueryText = 'INSERT INTO playlist_song (song_id, playlist_id) VALUES ($2, $1) WHERE id=$1';
  const values = [request.params.id, request.body.id];
  // const values = [];
  pool.query(insertQueryText, values, (err,result) => {
    if (err) {
      console.log("error", err.message)
    } else {
      let currentArtist = result.rows[0];
      let data = {
        playlists: currentArtist
      }
      //console.log(songs);
      response.render('playlist-single', data);
    }
  }); // end outer pool.query
});

/**
 * ===================================
 * Routes {CATCH}
 * ===================================
 */

app.get('/', (request,response) => {
  response.send("Hello World");
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
