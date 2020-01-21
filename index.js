console.log("starting up!!");

const express = require("express");
const methodOverride = require("method-override");
const pg = require("pg");

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

/**
 * ===================================
 * Routes
 * ===================================
 */

/**
 * ===================================
 * GET Routes
 * ===================================
 */
app.get("/", (request, response) => {
  let query = "SELECT * from artists";
  pool.query(query, (err, result) => {
    if (err) {
      response.send("error");
    } else {
      const data = {
        artists: result.rows
      };
      response.render("home", data);
    }
  });
});

app.get("/artists", (request, response) => {
  let query = "SELECT * from artists";
  pool.query(query, (err, result) => {
    if (err) {
      response.send("error");
    } else {
      const data = {
        artists: result.rows
      };
      response.render("home", data);
    }
  });
});

app.get("/artists/new", (request, response) => {
  response.render("new");
});

app.get("/artists/:id", (request, response) => {
  const artistId = request.params.id;
  const values = [artistId];
  const query = "SELECT * from artists where id = $1";
  pool.query(query, values, (err, result) => {
    if (err) {
      response.send(err);
    } else {
      if (result.rows.length === 0) {
        response.render("404");
      }
      const data = {
        artists: result.rows[0]
      };
      response.render("home", data);
    }
  });
});

app.get("/artists/:id/edit", (request, response) => {
  const artistId = request.params.id;
  const values = [artistId];
  const query = "SELECT * from artists where id = $1";
  pool.query(query, values, (err, result) => {
    if (err) {
      response.send(err);
    } else {
      const data = {
        artists: result.rows[0]
      };
      response.render("edit", data);
    }
  });
});

app.get("/artists/:id/songs/new", (request, response) => {
  const artistId = request.params.id;
  const data = {
    artistId: artistId
  };
  response.render("newSong", data);
});

app.get("/artists/:id/songs", (request, response) => {
  const artistId = request.params.id;
  const values = [artistId];
  const artistQuery = "SELECT * from artists where id = $1";
  pool.query(artistQuery, values, (err, artistResult) => {
    if (err) {
      response.send(err);
    } else {
      const artist = artistResult.rows[0];
      const artistId = artist.id;
      const values = [artistId];
      const songsQuery = "SELECT * from songs where artist_id = $1";
      pool.query(songsQuery, values, (err, songsResult) => {
        if (err) response.send(err);
        else {
          const songs = songsResult.rows;
          const data = {
            artist: artist,
            songs: songs
          };
          response.render("songs", data);
        }
      });
    }
  });
});

/**
 * ===================================
 * PUT Routes
 * ===================================
 */

app.put("/artists/:id/", (request, response) => {
  const id = request.params.id;
  const artistName = request.body.name;
  const photoURL = request.body.photoURL;
  const nationality = request.body.nationality;

  const values = [artistName, photoURL, nationality, id];

  const query = `UPDATE artists
  SET name = $1, photo_url = $2, nationality = $3
  WHERE id= $4`;

  pool.query(query, values, (err, result) => {
    if (err) {
      response.render("404");
    } else {
      response.render("home");
    }
  });
});

/**
 * ===================================
 * POST Routes
 * ===================================
 */
app.post("/", (request, response) => {
  const artistName = request.body.name;
  const photoURL = request.body.photoURL;
  const nationality = request.body.nationality;
  const values = [artistName, photoURL, nationality];
  const query =
    "INSERT into artists (name, photo_url, nationality) VALUES ($1, $2, $3)";
  console.log(values);
  pool.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      response.send("NO");
    } else {
      const artistsQuery = "SELECT * from artists;";
      pool.query(artistsQuery, (err, artistResult) => {
        const data = {
          artists: artistResult.rows
        };
        response.render("home", data);
      });
    }
  });
});

app.post("/artists/:id/songs/new", (request, response) => {
  const artistId = request.params.id;
  const title = request.body.title;
  const album = request.body.album;
  const previewLink = request.body.preview_link;
  const artwork = request.body.artwork;
  const values = [title, album, previewLink, artwork, artistId];
  console.log(values);
  const query =
    "INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5)";
  pool.query(query, values, (err, result) => {
    if (err) console.log(err);
    else {
      response.redirect("home");
    }
  });
});

/**
 * ===================================
 * DELETE Routes
 * ===================================
 */

app.delete("/artists/:id", (request, response) => {
  const artistId = request.params.id;
  const values = [artistId];
  const query = "DELETE FROM artists where id = $1";
  pool.query(query, values, (err, result) => {
    if (err) console.log(err);
    else {
      response.redirect("/");
    }
  });
});

app.get("*", (request, response) => {
  response.render("404");
});

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
