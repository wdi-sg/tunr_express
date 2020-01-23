console.log("starting up!!");
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');
const SALT = "banana";
const sha256 = require('js-sha256');

// Initialise postgres client
const configs = {
  user: 'joyce',
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
/**
 * ===================================
 * HELLO WORLD
 * ===================================
 */
app.get('/', (request, response) => {

  response.render('home');
});

/**
 * ===================================
 * CREATE A NEW ARTIST 
 * ===================================
 */
app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new artist
  response.render('new');
});
app.post('/artists', (request, response) => {
  let insertQueryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';
  const values = [
    request.body.name,
    request.body.photo_url,
    request.body.nationality
  ];
  pool.query(insertQueryText, values, (err, result) => {
    console.log("INSERT query callback")
    console.log()
    if (err) {
      console.log("ERROR", err);
      response.send("error")
    } else {
      console.log("DONE", result.rows)
      response.send("Added artist" + "" + request.body.name)
    }
  });
})

/**
 * ===================================
 * SHOW AN ARTIST 
 * ===================================
 */
app.get("/artists/:id", (request, response) => {
  let artistId = parseInt(request.params.id);

  console.log(artistId);
  let query = "SELECT * from artists where id =" + artistId;

  pool.query(query, (err, result) => {
    const data = {
      id: result.rows[0].id,
      name: result.rows[0].name,
      photo_url: result.rows[0].photo_url,
      nationality: result.rows[0].nationality
    };
    response.render('artistsSearch', data);
  });
});
/**
 * ===================================
 * CREATE A NEW PLAYLIST
 * ===================================
 */
app.get('/playlist/new', (request, response) => {
  // respond with HTML page with form to create new artist
  response.render('playlistNew');
});
app.post('/playlist', (request, response) => {
  let insertQueryText = 'INSERT INTO playlist (name) VALUES ($1) RETURNING *';

  const values =
    [request.body.playlist_name];
  console.log(values)

  pool.query(insertQueryText, values, (err, result) => {
    console.log("INSERT query callback")
    if (err) {
      console.log("ERROR", err);
      response.send("error")
    } else {
      console.log("DONE", result.rows)
      response.send("Added playlist!" + "" + request.body.playlist_name)
    }
  });
})

/**
 * ===================================
 * SHOW A SPECIFIC PLAYLIST 
 * ===================================
 */
app.get("/playlist/:id", (request, response) => {
  let playlistId = parseInt(request.params.id);

  console.log(playlistId);
  let query = "SELECT * from playlist where id =" + playlistId;

  pool.query(query, (err, result) => {
    const data = {
      id: result.rows[0].id,
      name: result.rows[0].name
    };
    response.render('playlistsSearch', data);
  });
});
/**
 * ===================================
 * ADD NEW SONG to PLAYLIST
 * ===================================
 */
app.get('/playlist/:id/newsong', (request, response) => {
  // respond with HTML page with form to create new artist
  let queryText = 'SELECT * FROM songs;';

  pool.query(queryText, (err, result) => {
    const data = {
      songs: result.rows,
      playlistId: request.params.id
    };
    //converts an array type into an object type

    console.log("INSERT query callback")
    if (err) {
      console.log("ERROR", err);
      response.send("error")
    }
    console.log(data)
    response.render('newsong', data);
  });
});

// app.post('/playlist/:id', (request, response) => {
//   let insertQueryText = 'INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2) RETURNING *';
//   const values = [
//     request.body.song_id,
//     request.params.id
//   ];
//   pool.query(insertQueryText, values, (err, result) => {
//     console.log("INSERT query callback")
//     console.log()
//     if (err) {
//       console.log("ERROR", err);
//       response.send("error")
//     } else {
//       console.log("DONE", result.rows)
//       response.send("Added song!")
//     }
//   });
// })

/**
 * ===================================
 * SHOW A SPECIFIC PLAYLIST WITH SONGS
 * ===================================
 */

app.get('/playlist/:id', (request, response) => {
  // show all the song titles inside this playlist
  let queryText1 = 'SELECT * FROM playlist_song INNER JOIN songs ON playlist_song.song_id = songs.id WHERE playlist_song.playlist_id =' + playlistId;

  pool.query(queryText1, (err, result) => {
    const data = {
      songs: result.rows,
      playlistId: request.params.id
    };
    console.log("INSERT query callback")
    if (err) {
      console.log("ERROR", err);
      response.send("error")
    }
    console.log(data)
    response.render('playsong', data);
  });
});

/**
 * ===================================
 * REGISTER AND LOGIN
 * ===================================
 */
app.get('/register', (request, response) => {
  response.render('Register');
});

app.post('/register', (request, response) => {

  // if they are, insert the record

  let insertQueryText = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *';

  let hashedPw = sha256(request.body.password + SALT);

  const values = [
    request.body.name,
    hashedPw
  ];

  pool.query(insertQueryText, values, (err, result) => {
    console.log("INSERT query callback")

    if (err) {
      console.log("ERROR", err);
      response.send("Username taken. Please choose another one.")
    } else {

      let user_id = result.rows[0].id;
      let hashedCookie = sha256(SALT + user_id);
      response.cookie('username', request.body.name);
      response.cookie('registered', hashedCookie);
      response.cookie('userId', user_id);
      response.redirect('/');
    }
  });
});


// app.get('/login', (request, response) => {
//   response.render('Login');
// });


// app.post('/login', (request, response) => {


//   let query = "SELECT * FROM users WHERE name='" + request.body.name + "'";

//   console.log("LOGIN: " + query)

//   pool.query(query, (err, result) => {

//     if (err) {
//       console.log("Login error", err);
//       response.status(500).send("error")

//     } else {

//       if (result.rows.length === 0) {
//         response.send("NO RESULT");
//       } else {

//         // hash the request, if its the same as db
//         let hashedRequestPw = sha256(request.body.password + SALT);

//         // if the password in the db matches the one in the login form
//         if (result.rows[0].password === hashedRequestPw) {

//           let user_id = result.rows[0].id;
//           let hashedCookie = sha256(SALT + user_id);
//           response.cookie('username', request.body.name);
//           response.cookie('registered', hashedCookie);
//           response.cookie('userId', user_id);
//           response.redirect('/');
//         }
//       };
//     };

app.get('/papaya', (request, response) => {

  // check to see if a user is logged in

  let user_id = request.cookies.userId;
  let hashedCookie = sha256(SALT + user_id);

  if (request.cookies.loggedIn === hashedCookie) {

    response.send('papaya');
  } else {

    response.send('secret! go away');
  }

  // response.send(request.cookies);
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