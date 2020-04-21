console.log("starting up!!");

const express = require("express");
const app = express();
const methodOverride = require("method-override");
const pg = require("pg");

const cookieParser = require("cookie-parser");
app.use(cookieParser());
// ==============================
// Initialise postgres client
// ==============================

const configs = {
  user: "jasminelee",
  host: "127.0.0.1",
  database: "tunr_db",
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on("error", function (err) {
  console.log("idle client error", err.message, err.stack);
});

// ===================================
//  Configurations and set up
// ===================================

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(methodOverride("_method"));

// =============================================
// Set react-views to be the default view engine
// =============================================
const reactEngine = require("express-react-views").createEngine();
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactEngine);

// ===================================
// Routes
// ===================================

app.get("/bananas", (request, response) => {
  let bananas = request.cookies["bananas"];
  console.log(request.cookies);
  console.log(request.cookies.bananas);
  if (bananas === undefined) {
    bananas = 1;
  } else {
    bananas = parseInt(bananas) + 1;
  }
  response.cookie(`bananas`, bananas);
  response.send(`bananas = ${bananas}`);
});

//=======================================
//Testing Cookies
//=======================================

app.get("/", (request, response) => {
  response.send("TEST WORKS!");
});
// ================================================================================================
// Define a route with view defined at /. For now it should say TEST WORKS when you visit that url.
// ================================================================================================

const newArtist = (request, response) => {
  response.render("new");
};

const addArtist = (request, response) => {
  const insertQueryText =
    "INSERT into artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id";
  const values = [
    request.body.name,
    request.body.photo_url,
    request.body.nationality,
  ];

  pool.query(insertQueryText, values, (err, result) => {
    console.log("INSERTED INTO DATABASE");

    if (err) {
      console.log("ERRRRORRRR", err);
      response.send("error");
    } else {
      console.log("DONE", result.rows);
      response.redirect("/");
    }
  });
};
app.get("/artists/new", newArtist);
app.post("/artists", addArtist);
// ===============================================================
// Build a feature that creates a new artist in the database.
// ===============================================================

const findArtist = (request, response) => {
  let query = "SELECT * FROM artists WHERE id=" + request.params.id;
  pool.query(query, (err, result) => {
    if (err) {
      console.log("ERROR", err);
      response.status(500).send("error");
    } else {
      console.log("RESULTS");
      console.log(result.rows);
      let data = result.rows[0];
      response.render("artists", data);
    }
  });
};
app.get("/artists/:id", findArtist);
// =========================================
// Build the show feature for an artist
// =========================================

const showArtist = (request, response) => {
  let query = "SELECT * FROM artists";
  pool.query(query, (err, result) => {
    if (err) {
      console.log("ERROR", err);
      response.statuts(500).send("error");
    } else {
      console.log("RESULTS");
      console.log(result.rows);
      let data = {
        artists: result.rows,
      };
      response.render("allartists", data);
    }
  });
};

app.get("/artists/", showArtist);
// ======================================
// Build the index feature for artists
// ======================================

const findAllSongsByArtists = (request, response) => {
  let query =
    "SELECT * FROM songs WHERE artist_id = '" + request.params.artists_id + "'";

  pool.query(query, (err, result) => {
    if (err) {
      console.log("ERROR", err);
      response.status(500).send("error");
    } else {
      let data = {
        songs: result.rows,
      };
      console.log(result.rows);
      response.render("songs", data);
    }
  });
};

app.get("/artists/:artists_id/songs", findAllSongsByArtists);
// ================================================
// Able to show all the songs by a single artist
// ================================================

app.get("/artists/:artists_id/edit");

// ================================================
// REMEMBER TO COME BACK AND COMPLETE THIS PART!
// ================================================

// =================================================================
// Anything below this portion is for Part 2 of tunr_express
// =================================================================

const createNewPlaylist = (request, response) => {
  response.render("newplaylist");
};

const addNewPlaylist = (request, response) => {
  const insertQueryText =
    "INSERT into playlists (name) VALUES ($1) RETURNING id";
  const values = [request.body.name];

  pool.query(insertQueryText, values, (err, result) => {
    console.log("ABOUT TO INSERT INTO DATABASE!");

    if (err) {
      console.log("ERRRORRRR", err);
      response.send("ERROR!");
    } else {
      console.log("INSERTED!", result.rows);
      response.redirect("/playlists/");
    }
  });
};

app.get("/playlists/new", createNewPlaylist);
app.post("/playlists", addNewPlaylist);
// ==============================================
// CREATE NEW PLAYLISTS AND ADD TABLE
// ==============================================
const showAllPlaylist = (request, response) => {
  let query = "SELECT * FROM playlists";
  pool.query(query, (err, result) => {
    if (err) {
      console.log("ERROR", err);
      response.status(500).send("error");
    } else {
      console.log("RESULTS");
      console.log(result.rows);
      let data = {
        playlists: result.rows,
      };
      response.render("allplaylists", data);
    }
  });
};

app.get("/playlists/", showAllPlaylist);
// =============================================
// SHOW ALL PLAYLISTS
// =============================================

// const findPlayList = (request,response) => {
//   let query = "SELECT * FROM playlists WHERE id=" + request.params.index;
//   pool.query(query,(err,result)=>{
//     if(err){
//       console.log("ERROR",err);
//       response.status(500).send("error");
//     }
//     else{
//       console.log("RESULTS");
//       console.log(result.rows);
//       let data =  result.rows[0];
//       response.render("playlists" , data);
//     }
//   })
// }

// app.get('/playlists/:index', findPlayList);

// ==================================================
// DISPLAY SELECTED PLAYLISTS
// ==================================================

const selectSongsToAddToSelectedPlaylist = (request, response) => {
  let query = "SELECT * FROM playlists WHERE id=" + request.params.index;
  pool.query(query, (err, result) => {
    if (err) {
      console.log("ERROR", err);
      response.status(500).send("error");
    } else {
      let selectSongs = "SELECT * FROM songs";
      pool.query(selectSongs, (error, allsongs) => {
        const object = {
          hello: request.params.index,
          playlists: result.rows,
          songs: allsongs.rows,
        };
        console.log("RESULTS");
        response.render("addsongstoplaylist", object);
      });
    }
  });
};

const addSongsToSelectedPlaylist = (request, response) => {
  let query =
    "INSERT INTO playlists_songs (song_id, playlist_id) VALUES ($1,$2) RETURNING * ;";
  let VALUES = [request.body.selectedSongs, request.params.index];
  pool.query(query, VALUES, (err, result) => {
    if (err) {
      console.log("ERROR", err);
      response.status(500).send("error");
    } else {
      let queryAllSongs = "SELECT * FROM songs";
      pool.query(queryAllSongs, (errors, songResults) => {
        console.log("HELLO");
        console.log(result.rows);
        const object = {
          hello: request.params.index,
          playlists: result.rows,
          songs: songResults.rows,
        };
        response.render("allsongsinplaylist", object);
      });
    }
  });
};

app.get("/playlists/:index/newsong", selectSongsToAddToSelectedPlaylist);
app.post("/playlists/:index", addSongsToSelectedPlaylist);

// =============================================================
// Add Songs into the selected Playlist
// =============================================================

const showAllSongsInThisPlaylist = (request, response) => {
  let query =
    "SELECT playlist_song,songs.id,songs.title FROM songs INNER JOIN playlists_songs ON (songs.id = playlists_songs.song_id) WHERE playlists_songs.playlist_id = '" +
    request.params.index +
    "';";
  pool.query(query, (err, result) => {
    if (err) {
      console.log("ERROR!", err);
      response.status(500).send("error");
    } else {
      console.log("HELLO");
      console.log(results.rows);
      const object = {
        showallsongs: result.rows,
      };

      response.render("allsongsinplaylist", object);
    }
  });
};

app.get("playlists/:index", showAllSongsInThisPlaylist);

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
