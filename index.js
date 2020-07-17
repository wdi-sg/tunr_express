console.log("starting up!!");

const express = require("express");
const methodOverride = require("method-override");
const pg = require("pg");
const cookieParser = require('cookie-parser')
const SALT = 'banana';
var sha256 = require('js-sha256');

// Initialise postgres client
const configs = {
  user: "hongjin",
  host: "127.0.0.1",
  database: "tunr_db",
  port: 5432
};

const pool = new pg.Pool(configs);

pool.on("error", function(err) {
  console.log("idle client error", err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(methodOverride("_method"));
app.use(cookieParser());

// Set react-views to be the default view engine
const reactEngine = require("express-react-views").createEngine();
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/", (request, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  response.render("Home");
});

app.get("/artists/", (request, response) => {
  pool.query("SELECT * FROM artists", (err, result) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log(result.rows);
    response.render("AllArtists", { artists: result.rows });
  });
});

app.get("/artists/new", (req, res) => {
  res.render("AddArtist");
});

app.post("/artists", (req, res) => {
  // console.log(req.body);
  const { name, nationality, photo_url } = req.body;

  pool.query(
    "INSERT INTO artists (name, nationality, photo_url) VALUES ($1,$2,$3) RETURNING *",
    [name, nationality, photo_url],
    (err, result) => {
      // console.log("INSERTED:", result.rows[0]);


      res.render("SingleArtist", { artist: result.rows[0], msg: "added:"});
    }
  );
});

app.get("/artists/:id", (req, res) => {
  pool.query(
    "SELECT * FROM artists WHERE id = $1",
    [req.params.id],
    (err, result) => {
      if (err) {
        return console.error("Error executing query", err.stack);
      }
      res.render("SingleArtist", { artist: result.rows[0] });
    }
  );
});

app.get("/artists/:id/edit", (req, res) => {
  pool.query(
    "SELECT * FROM artists WHERE id = $1",
    [req.params.id],
    (err, result) => {
      if (err) {
        return console.error("Error executing query", err.stack);
      }
      res.render("EditArtist", { artist: result.rows[0], id: req.params.id });
    }
  );
});

app.put("/artists/:id", (req, res) => {
  // console.log("PUT!!!!!!",req.body);
  const { name, nationality, photo_url } = req.body;
  pool.query(
    "UPDATE artists SET (name, nationality, photo_url) = ($1, $2, $3) WHERE id = $4 RETURNING *",
    [name, nationality, photo_url, req.params.id],
    (err, result) => {
      if (err) {
        return console.error("Error executing query", err.stack);
      }
      // console.log("PUT RETURNING!!!!!", result);
      res.render("SingleArtist", { artist: result.rows[0] });
    }
  );
});

app.delete("/artists/:id", (req, res) => {
  // console.log("PUT!!!!!!",req.body);
  // const { name, nationality, photo_url } = req.body;
  pool.query(
    "DELETE FROM artists WHERE id = $1 RETURNING *",
    [req.params.id],
    (err, result) => {
      if (err) {
        return console.error("Error executing query", err.stack);
      }
      // console.log("PUT RETURNING!!!!!", result);
      res.render("SingleArtist", { artist: result.rows[0], msg: "deleted:"});
    }
  );
});

app.get("/playlists/", (request, response) => {
  pool.query("SELECT * FROM playlist", (err, result) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log(result.rows);
    response.render("AllPlaylists", { playlists: result.rows });
  });
});

app.get("/playlists/new", (req, res) => {
  res.render("AddPlaylist");
});

app.post("/playlists", (req, res) => {
  console.log(req.body);
  const { name } = req.body;

  pool.query(
    "INSERT INTO playlist (name) VALUES ($1) RETURNING *",
    [name],
    (err, result) => {
      // console.log("INSERTED:", result.rows[0]);

      // res.render("SinglePlaylist", { playlist: result.rows[0], msg: "added:"});
      res.redirect('/playlists/');
    }
  );
});


app.get("/playlists/:id", (req, res) => {
  pool.query(
    "SELECT * FROM playlist_song INNER JOIN songs ON (songs.id = playlist_song.song_id) WHERE playlist_id = $1",
    [req.params.id],
    (err, result) => {
      if (err) {
        return console.error("Error executing query", err.stack);
      }
      console.log("result!!!!", result.rows);
      res.render("SinglePlaylist", { result: result.rows, playlist_id : req.params.id });
    }
  );
});

app.get("/playlists/:id/newsong", (req, res) => {
  pool.query(
    "SELECT * FROM playlist WHERE id = $1",
    [req.params.id],
    (err, result) => {
      if (err) {
        return console.error("Error executing query", err.stack);
      }
      res.render("AddNewSong", { playlist: result.rows[0] });
    }
  );

});

app.post("/playlists/:id", (req, res) => {
  console.log(req.body);
  const { id : song_id } = req.body;
  const playlist_id = req.params.id;

  pool.query(
    "INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2) RETURNING *",
    [song_id, playlist_id],
    (err, result) => {
      console.log("INSERTED:", result.rows[0]);

      // res.render("SinglePlaylist", { playlist: result.rows[0], msg: "added:"});
      res.redirect('/playlists/');
    }
  );
});

app.get('/register', (req, res) => {

  res.render('Register');
})

app.post('/register', (req, res) => {

  const { name, password } = req.body;

  console.log("req.body", req.body);
  console.log("name", name);
  console.log("password", password);

  const hashedPassword = sha256(SALT + password);

  pool.query(`INSERT INTO users (name, password) VALUES ('${name}', '${hashedPassword}') RETURNING *`, (err, result) => {
    console.log('result', result.rows);

    let username = result.rows[0].name;
    let user_id = result.rows[0].id; 
    let loggedin = sha256(SALT + user_id);

    res.cookie('username', username);
    res.cookie('user_id', user_id);
    res.cookie('loggedin', loggedin);
    // res.send('user registered');
    res.redirect('/');
  
  })

})

app.get('/login', (req, res) => {

  res.render('Login');

});

app.post('/login', (req, res) => {

  console.log('req.body', req.body);
  const {name, password} = req.body;
  const hashedReqPassword = sha256(SALT + password);

  pool.query(`SELECT * FROM users WHERE users.name = '${name}'`, (err, result) => {
    console.log("result",result.rows);

    if (result.rows.length > 0 ) {

      if (result.rows[0].password === hashedReqPassword) {

    let username = result.rows[0].name;
    let user_id = result.rows[0].id; 
    let loggedin = sha256(SALT + user_id);

    res.cookie('username', username);
    res.cookie('user_id', user_id);
    res.cookie('loggedin', loggedin);
    // res.send('user registered');
    res.redirect('/');
      } else {
        res.send('password is wrong.');
      }
    } else {
      res.send('please register first.');
    }

  });
});

app.get('/favorites/new', (req, res) => {
  res.render('AddFavorites');
})

app.post('/favorites', (req, res) => {
  console.log("req.body", req.body);
  console.log("req.cookies", req.cookies);

  const queryText = `INSERT INTO favorites (song_id, user_id) VALUES('${req.body.song_id}','${req.cookies.user_id}') RETURNING *`;

  pool.query(queryText, (err, result) => {
    console.log("result", result);
  });

  res.send("added fav song")

});

app.get('/favorites', (req, res) => {

  console.log('coookies', req.cookies);

  if (req.cookies.loggedin) {
    // res.send('show favorites');

    // const text = `SELECT * FROM favorites WHERE user_id = '${req.cookies.user_id}'`;
    const text = `SELECT songs.title FROM favorites INNER JOIN songs ON ( favorites.song_id = songs.id ) WHERE user_id = '${req.cookies.user_id}'`;

    pool.query(text, (err, result) => {
      console.log("result rows", result.rows);
      res.render('ShowFavorites', {songs : result.rows});
    })

  } else {
    res.send('not logged in')
  }

})



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);

let onClose = function() {
  console.log("closing");

  server.close(() => {
    console.log("Process terminated");

    pool.end(() => console.log("Shut down db connection pool"));
  });
};

process.on("SIGTERM", onClose);
process.on("SIGINT", onClose);
