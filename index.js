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

// Show content
app.get("/", functions.showArtists);
app.get("/artists", functions.showArtists);
app.get("/artists/:id", functions.showSingleArtist);
app.get("/artists/:id/songs", functions.showArtistSongs);

// Show add/edit pages
app.get("/artists/new", functions.addArtistPage);
app.get("/artists/:id/songs/new", functions.addSongPage);
app.get("/artists/:id/edit", functions.artistEditPage);
app.get("/playlist/new", (request, response) => {
  const query = "SELECT * from songs";
  const values = [query];
  pool.query(query, (err, result) => {
    const songs = result.rows;
    const data = {
      songs: songs
    };
    response.render("newPlaylist", data);
  });
});

// Edit database
app.put("/artists/:id/", functions.editArtist);

// Add to database
app.post("/artists", functions.addArtist);
app.post("/artists/:id/songs/", functions.addSong);
app.post("/playlist", (request, response) => {
  const song = request.body.song;
  const values = [song];
  const query = "INSERT INTO playlist (name) VALUES ($1);";
  pool.query(query, values, (err, result) => {
    if (err) console.log(err);
    else {
      console.log(result.rows);
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
