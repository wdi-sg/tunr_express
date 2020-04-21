console.log("starting up!!");

const express = require("express");
const methodOverride = require("method-override");
const pg = require("pg");

// Initialise postgres client
const configs = {
  user: "yannieyeung",
  host: "127.0.0.1",
  database: "tunr_db",
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on("error", function (err) {
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
    extended: true,
  })
);
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(methodOverride("_method"));

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

//============ add new playlist form ===============
app.get("/playlist/:id", (req, res) => {
  let visits = req.cookies["visits"];
  if (visits === undefined) {
    visits = 0;
  } else if (visits) {
    console.log("Hellllooooooo this is from cookies counter");
    console.log(visits);
    visits++;
  }
  if (req.params.id === "new") {
    const data = {
      counter: visits,
    };
    res.cookie("visits", visits);
    res.render("newPlaylist", data);
  } else {
    //============== Get playlist's info ====================
    const whenQueryDone = (queryErr, result) => {
      if (queryErr) {
        console.log(queryErr);
      } else {
        console.log(result.rows[0]);
      }
      const data = {
        playlistInfo: result.rows[0],
        counter: visits,
      };

      res.cookie("visits", visits);
      res.render("singlePlaylist", data);
    };
    const queryString = "SELECT * FROM playlist WHERE id = " + req.params.id;
    pool.query(queryString, whenQueryDone);
  }
});

//=========== Where data submitted from add-new-playlist form posted to ==============
app.post("/playlist", (request, response) => {
  let visits = request.cookies["visits"];
  if (visits === undefined) {
    visits = 0;
  } else if (visits) {
    console.log("Hellllooooooo this is from cookies counter");
    console.log(visits);
    visits++;
  }
  console.log(request.body);

  const whenQueryDone = (queryErr, result) => {
    if (queryErr) {
      console.log(queryErr);
    } else {
      console.log(result.rows[0]);
    }
    const data = {
      justAddedPlaylist: result.rows[0],
      counter: visits,
    };
    response.cookie("visits", visits);
    response.render("justAddedPlaylist", data);
  };
  const newlyAddedPlaylist = request.body.newPlaylist;

  const values = [newlyAddedPlaylist];
  const queryString = "INSERT INTO playlist (name) VALUES ($1) RETURNING *";
  pool.query(queryString, values, whenQueryDone);
});

//============== Show all playlist ====================

app.get("/playlist", (request, response) => {
  let visits = request.cookies["visits"];
  if (visits === undefined) {
    visits = 0;
  } else if (visits) {
    console.log("Hellllooooooo this is from cookies counter");
    console.log(visits);
    visits++;
  }
  const whenQueryDone = (queryErr, result) => {
    if (queryErr) {
      console.log(queryErr);
    } else {
      for (i = 0; i < result.rows.length; i++) {
        console.log(result.rows[i]);
      }
    }
    const data = {
      individualPlaylist: result.rows,
      counter: visits,
    };
    response.cookie("visits", visits);

    response.render("allPlaylist", data);
  };

  const queryString = "SELECT * FROM playlist";
  pool.query(queryString, whenQueryDone);
});

//=========== form for adding a song to a playlist==============
app.get("/playlist/:id/newsong", (req, res) => {
  let visits = req.cookies["visits"];
  if (visits === undefined) {
    visits = 0;
  } else if (visits) {
    console.log("Hellllooooooo this is from cookies counter");
    console.log(visits);
    console.log(typeof visits);
    visits++;
  }
  const whenQueryDone = (queryErr, result) => {
    if (queryErr) {
      console.log(queryErr);
    } else {
      console.log(result.rows[0]);
      const queryString = "SELECT * FROM songs";
      pool.query(queryString, (songQueryErr, songResult) => {
        if (songQueryErr) {
          console.log(songQueryErr);
        }
        const data = {
          playlistInfo: result.rows[0],
          songlist: songResult.rows,
          counter: visits,
        };
        res.cookie("visits", visits);
        res.render("addSongToSinglePlaylist", data);
      });
      // const data = {
      //   playlistInfo: result.rows[0],
      //   songlist: songResult.rows,
      // };
    }

    // const data = {
    //   playlistInfo: result.rows[0],
    //   songlist: songResult.rows,
    // };

    // res.render("addSongToSinglePlaylist", data);
  };
  const queryString = "SELECT * FROM playlist WHERE id = " + req.params.id;
  pool.query(queryString, whenQueryDone);
});

//============= Posting a song to selected playlist ==============
app.post("/playlist/:id", (request, response) => {
  let visits = request.cookies["visits"];
  if (visits === undefined) {
    visits = 0;
  } else if (visits) {
    console.log("Hellllooooooo this is from cookies counter");
    console.log(visits);
    console.log(typeof visits);
    visits++;
  }
  const whenQueryDone = (queryErr, result) => {
    if (queryErr) {
      console.log(queryErr);
    } else {
      console.log(result.rows[0]);
    }
    const data = {
      addedSong: result.rows[0],
      counter: visits,
    };
    response.cookie("visits", visits);
    response.render("addedToPlaylist", data);
  };
  const addedSongId = request.body.songNum;
  const playlistAddedTo = request.body.playlistNum;

  const values = [addedSongId, playlistAddedTo];

  const queryString =
    "INSERT INTO playlist_song (song_id , playlist_id) VALUES ($1, $2) RETURNING *";
  pool.query(queryString, values, whenQueryDone);
});

//=========== adding a new artist form ================

app.get("/artists/:id", (request, response) => {
  let visits = request.cookies["visits"];
  if (visits === undefined) {
    visits = 0;
  } else if (visits) {
    console.log("Hellllooooooo this is from cookies counter");
    console.log(visits);
    console.log(typeof visits);
    visits++;
  }
  if (request.params.id === "new") {
    const data = {
      counter: visits,
    };
    response.cookie("visits", visits);
    response.render("new", data);
  } else {
    //============== Get artist's info ====================
    const whenQueryDone = (queryErr, result) => {
      if (queryErr) {
        console.log(queryErr);
      } else {
        console.log(result.rows[0]);
      }
      const data = {
        artistInfo: result.rows[0],
        counter: visits,
      };
      response.cookie("visits", visits);
      response.render("singleArtist", data);
    };
    const queryString = "SELECT * FROM artists WHERE id = " + request.params.id;
    pool.query(queryString, whenQueryDone);
  }
});

// app.get("/artists/new", (request, response) => {
//   response.render("new");
// });

//======= Page showing newly added artist (POSTED from new artist form) ========
app.post("/artists", (request, response) => {
  let visits = request.cookies["visits"];
  if (visits === undefined) {
    visits = 0;
  } else if (visits) {
    console.log("Hellllooooooo this is from cookies counter");
    console.log(visits);
    console.log(typeof visits);
    visits++;
  }
  // query database for all pokemon
  console.log(request.body);

  const whenQueryDone = (queryErr, result) => {
    if (queryErr) {
      console.log(queryErr);
    } else {
      console.log(result.rows[0]);
    }
    const data = {
      artist: result.rows[0],
      counter: visits,
    };
    response.cookie("visits", visits);
    response.render("artists", data);
  };
  const newlyAddedName = request.body.name;
  const newlyAddedPhotoUrl = request.body.photo_url;
  const newlyAddedNationality = request.body.nationality;

  const values = [newlyAddedName, newlyAddedPhotoUrl, newlyAddedNationality];
  const queryString =
    "INSERT INTO artists (name , photo_url, nationality) VALUES ($1, $2, $3) RETURNING *";
  pool.query(queryString, values, whenQueryDone);
  // respond with HTML page displaying all pokemon
  // response.render("new");
  // response.send("Thank you for adding");
});

app.get("/", (request, response) => {
  let visits = request.cookies["visits"];
  if (visits === undefined) {
    visits = 0;
  } else if (visits) {
    console.log("Hellllooooooo this is from cookies counter");
    console.log(visits);
    console.log(typeof visits);
    visits++;
  }
  const data = { counter: visits };
  response.cookie("visits", visits);
  response.render("home", data);
});

app.get("/new", (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render("new");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);

let onClose = function () {
  console.log("closing");

  server.close(() => {
    console.log("Process terminated");

    pool.end(() => console.log("Shut down db connection pool"));
  });
};

process.on("SIGTERM", onClose);
process.on("SIGINT", onClose);
