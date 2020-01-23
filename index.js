console.log("starting up!!");

const express = require("express");
const methodOverride = require("method-override");
const pg = require("pg");
const functions = require("./functions");
const cookieParser = require("cookie-parser");
const sha256 = require("js-sha256");

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
app.use(cookieParser());

// Set react-views to be the default view engine
const reactEngine = require("express-react-views").createEngine();
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactEngine);

// Artists
app.get("/", functions.showArtists);
app.get("/artists", functions.showArtists);
app.get("/artists/new", functions.addArtistPage);
app.get("/artists/:id", functions.showSingleArtist);
app.get("/artists/:id/songs", functions.showArtistSongs);
app.get("/artists/:id/songs/new", functions.addSongPage);
app.get("/artists/:id/edit", functions.artistEditPage);
app.get("/register", (request, response) => {
  if (request.cookies.loggedIn !== undefined) {
    const data = {
      errorMessage: "You're already logged in!",
      username: request.cookies.username
    };
    response.render("404", data);
  } else {
    const data = {
      route: "/register",
      header: "Register"
    };
    response.render("register", data);
  }
});
app.get("/login", (request, response) => {
  if (request.cookies.loggedIn !== undefined) {
    const data = {
      errorMessage: "You're already logged in!",
      username: request.cookies.username
    };
    response.render("404", data);
  } else {
    const data = {
      route: "/login",
      header: "Log In"
    };
    response.render("register", data);
  }
});
app.get("/favorites/new", functions.showFavoritesForm);
app.get("/favorites", functions.showFavorites);

// app.get("/songs/:id", (request, response) => {
//   const songID = request.params.id;
//   console.log(songID);
// });

app.get("/logout", functions.clearCookies);

// Playlists
app.get("/playlists", functions.showPlaylists);
app.get("/playlists/new", (request, response) => {
  const data = {
    username: request.cookies.username
  };
  response.render("newPlaylist", data);
});
app.get("/playlists/:id", functions.showPlaylist);

app.get("/playlists/:id/newsong", functions.showSongFormForPlaylist);

//Sort
app.get("/sort/:type", functions.sortArtists);

// Edit database
app.put("/artists/:id/", functions.editArtist);

// Add to database
app.post("/artists", functions.addArtist);
app.post("/artists/:id/songs/", functions.addSong);
app.post("/playlists", functions.makeNewPlaylist);
app.post("/playlists/:id/", functions.addSongIntoPlaylistSong);
app.post("/register", functions.registerUser);
app.post("/login", functions.loginUser);
app.post("/favorites", functions.addFavorites);

// Delete from database
app.delete("/artists/:id", functions.deleteArtist);

app.get("*", (request, response) => {
  let data;
  if (request.cookies.loggedIn !== undefined) {
    data = {
      username: request.cookies.username
    };
  }

  response.render("404", data);
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
