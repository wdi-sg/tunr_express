//jshint esversion:6
console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');

const IAMSALTY = 'saltyaf';
// Initialise postgres client
const configs = {
  user: 'datguyrhy',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
  console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(cookieParser()); /// THIS LINE IS REQUIRED TO PARSE req.cookies
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




//front page
app.get('/', (request, response) => {
  response.render("home");
});


//registration form
app.get('/register', (req, res) => {
  res.render('registration');
});

////// collect content from reg. form
app.post('/register', (req, res) => {
  console.log(req.body);
  let hashedPw = sha256(req.body.password);
  let regArr = [
    req.body.name,
    hashedPw
  ];
  const queryText = `INSERT INTO users (user_name,pw) VALUES ($1,$2)`;

  pool.query(queryText, regArr, (err, result) => {
    if (err) {
      console.error('query error:', err.message);
      res.send('query error');
    } else {
      console.log('query result:', result);
      // redirect to home page
      res.send("Registration completed for " + req.body.name);
    }
  })
});

// login page
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  let reqUserName = req.body.name;
  let reqPw = req.body.password;

  //check vs db for user
  const queryString = "SELECT*FROM users WHERE user_name='" + reqUserName + "'";
  console.log('checking for user match');

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
      res.send('query error');
    } else {
      console.log('query result:', result.rows);
      // if this user exists in the db
      if (result.rows.length > 0) {
        let hashedReqPw = sha256(reqPw);
        console.log("hashed request password: " + hashedReqPw);

        // check to see if the password in request.body matches what's in the db

        if (hashedReqPw === result.rows[0].pw) {
          let user_id = result.rows[0].id;
          let user_name = result.rows[0].user_name;
          console.log('muahahaha' + user_id);
          console.log('hashing cookies');

          console.log("ok?");
          /////TAKE NOTE////
          //tried result.rows[0].id >>>>> throw err <==
          //SPECIFICALLY IDs REQUIRE SALTING
          //Maybe i wasnt paying attention dyring that part....
          //tried sha256(4) >>>>>> invalid input
          //tried sha256(result.rows[0].user_name) >>>> works
          let hashedCookie = sha256(IAMSALTY + user_id);
          let hashedUser = sha256(user_name);
          res.cookie(hashedUser, hashedCookie);
          res.cookie('user_id', user_id);
          res.cookie("hasLoggedIn", hashedCookie);
          // if it matches they have been verified, log them in
          // res.redirect('/');
        }
      } else {

        res.status(403).send('wrong password');
      }
      // redirect to home page0
      res.redirect('/');
    }

  });
});


//favorites form

/// req.cookies returning undefined.....
/// cant solve this issue
app.get('/favorites/form', (req, res) => {
  let x = req.cookies;
  res.render('newSong');
  console.log(x);
  let user_id = req.cookies['user_id'];
  console.log(req.cookies);
  let hashedValue = sha256(IAMSALTY + user_id);
  console.log(hashedValue);
  if (req.cookies['hasLoggedin'] === hashedValue) {
      res.send('good');
  } else {

    //otherwise, show them a message
    res.send('go awayyyy');
  }
});

app.post('/favorites/form', (req, res) => {
      let pickedSong = req.body.song_id;
      let user_id = req.cookies['user_id'];
      cont newArr =[song_id, user_id];
      const queryString = "INSERT INTO favorites (song_id,user id) VALUES ($1,$2) RETURNING *"

      pool.query(queryString,(err, result)=>{
        if (err) {
      console.error('query error:', err.stack);
      response.send( 'query error' );
    } else {
      console.log("query: result", result);
      res.send(result.rows);
      }
      })
});

app.get('/favorites/:id', (req, res) => {
  let inputId= parseInt(req.params.id_);

  const queryString = "SELECT user_name, title, song_id FROM songs INNER JOIN favorites ON(favorites.song_id = songs.id) INNER JOIN users ON(users.id = favorites.user_id) WHERE favorites.user_id=" +inputId;
  pool.query(queryString,(err, result)=>{
  if (err) {
  console.error('query error:', err.stack);
  response.send( 'query error' );
} else {
  console.log("query: result", result);
  res.send(result.rows);
    }
  });
});
// create a route that renders a form for the user to enter the song they want to favorite. This form can just be a normal input where the user enters the id of a song they want to favorite.
//
// GET /favorites/new
//
// use the user id cookie mentionmed above and the request.body to create the record in the DB
//
// POST /favorites
//
// display a list of all the user's favorites
//
// GET /favorites
//
// show an error if the user is not logged in



// see all artists index///
app.get('/artists/all', (req, res) => {
  console.log("Showing artist list");
  let queryString = "SELECT * FROM artists;";
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error:', err.message);
      res.send('query error');
    } else {
      res.send(result.rows);
    }
  });
});
//display form for a new single artist//
app.get('/artists/new', (req, res) => {
  console.log("rendering new artist form!");
  res.render('form');
});
//Create new artist//
app.post('/artists', (req, res) => {
  console.log("adding new artist!");

  const addArtist = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING*;';
  let newArtistArr = [req.body.name, req.body.photo_url, req.body.nationality];

  pool.query(queryString, newArtistArr, (err, result) => {
    if (err) {
      console.error('query error:', err.message)
      res.send('query error')
    } else {
      console.log('query result:', result)
      // redirect to home page
      res.send(result.rows)
    }
  })
});
//See single artist//
app.get('/artists/:id', (req, res) => {
  console.log("searching for matches~~");
  console.log("baking a pie");
  let id = req.params.id;
  const queryString = `SELECT * FROM artists WHERE id = ${id}`

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error:', err.message);
      res.send('query error');
    } else {
      console.log("Found artist & baked a cake");
      console.log(result.rows);
      res.send(result.rows);
    }
  })
});
//display form for editing artist//
app.get('/artists/:id/edit', (req, res) => {
  let id = req.params.id;
  console.log("Editing artist id: " + id);

  let artistQuery = `SELECT * FROM artists WHERE id=${id}`;

  pool.query(artistQuery, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
      res.send('query error');
    }
    let artist = result.rows[0];
    console.log(artist);
    res.render('edit', artist);
  });
});
//

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function() {

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end(() => console.log('Shut down db connection pool'));
  })
};

//////////Playlist time////////////////
// show all playlists//// tried out constructor component had some error
app.get('/playlist', (req, res) => {
  let playlistShow = `SELECT * FROM playlist`;
  pool.query(playlistShow, (err, result) => {
    // console.log(result.rows)
    const list = {
      arr: result.rows
    }
    res.render('viewPlaylist.jsx', list);
  })
});

//render form for new playlist
app.get('/playlist/new', (req, res) => {
  res.render('newPlaylist.jsx')
});

//create new playlist
app.post('/playlist', (req, res) => {
  let name = req.body.name;
  let queryArr = [name];
  let queryText = `INSERT INTO playlist(name) VALUES ($1) RETURNING *`;
  pool.query(queryText, queryArr, (err, result) => {
    console.log(result.rows[0])
    let name = result.rows[0]["name"];
    res.send("New playlist added: " + name)
  })
});

//render form to add new song to playlist
app.get('/playlist/:id/newsong', (req, res) => {
  let id = req.params.id;
  const data = {
    id: id
  };
  res.render('PlaylistSongAdd', data);
});

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);


// a cookie for their username ///////DONE
// a cookie for their hashed loggedIn cookie ///DONE
// their user id </////DONE
// Redirect them to the home page. ///// DONE
