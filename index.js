console.log("starting up!!");

const express = require("express");
const methodOverride = require("method-override");
const pg = require("pg");
const functions = require("./functions");

// Initialise postgres client
const configs = {
  user: "benn",
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

app.use(express.static(__dirname + "/public/"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(methodOverride("_method"));

// Set react-views to be the default view engine
const reactEngine = require("express-react-views").createEngine();
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactEngine);

// Artists
app.get("/artists/new", functions.addArtistPage);
app.get("/", functions.showArtists);
app.get("/artists", functions.showArtists);
app.get("/artists/:id", functions.showSingleArtist);
app.get("/artists/:id/songs", functions.showArtistSongs);
app.get("/artists/:id/songs/new", functions.addSongPage);
app.get("/artists/:id/edit", functions.artistEditPage);

// Playlists
app.get("/playlists", functions.showPlaylists);
app.get("/playlists/new", (request, response) => {
  response.render("newPlaylist");
});
app.get("/playlists/:id", (request, response) => {
  const playlistID = request.params.id;
  const values = [playlistID];
  const query = "SELECT * from playlist where id = $1";
  pool.query(query, values, (err, result) => {
    const data = {
      playlists: result.rows[0]
    };
    response.render("playlist", data);
  });
});
app.get("/playlists/:id/newsong", (request, response) => {
  const query = "SELECT * from songs";
  pool.query(query, (err, result) => {
    const data = {
      songs: result.rows,
      playlistID: request.params.id
    };
    response.render("newPlaylistSong", data);
  });
});

// Edit database
app.put("/artists/:id/", functions.editArtist);

// Add to database
app.post("/artists", functions.addArtist);
app.post("/artists/:id/songs/", functions.addSong);
app.post("/playlists", (request, response) => {
  const playlistName = request.body.playlist_name;
  const values = [playlistName];
  const query = "INSERT into playlist (name) VALUES($1)";
  pool.query(query, values, (err, result) => {
    if (err) console.log(err);
    else {
      response.redirect("/playlists");
    }
  });
});
app.post("/playlists/:id/", (request, response) => {
  const playlistID = request.params.id;
  const songID = request.body.song_id;
  const values = [songID, playlistID];
  const query =
    "INSERT into playlist_song (song_id, playlist_id) VALUES ($1, $2) RETURNING *";
  pool.query(query, values, (err, result) => {
    if (err) console.log(err);
    else {
      response.redirect("/playlists/" + playlistID);
    }
  });
});

// Delete from database
app.delete("/artists/:id", functions.deleteArtist);

app.get("*", (request, response) => {
  response.render("404");
});

// Listen
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
