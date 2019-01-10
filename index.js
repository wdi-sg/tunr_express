console.log("starting up!!");

const express = require("express");
const methodOverride = require("method-override");
const pg = require("pg");
const bodyParser = require("body-parser");

/**ß
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

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

const path = require("path");

// Initialise postgres client
const configs = {
  user: "lydiacheung",
  host: "127.0.0.1",
  database: "tunr_db",
  port: 5432
};

const pool = new pg.Pool(configs);

pool.on("error", function(err) {
  console.log("idle client error", err.message, err.stack);
});

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

app.get("/artists", (req, res) => {
  // query database
  pool.query("SELECT * FROM artists", (err, queryResult) => {
    console.log("result", queryResult.rows);

    // respond with HTML page displaying all artists
    res.send(queryResult.rows);
  });
});

app.get("/artists/:id", (req, res) => {
  let artistID = parseInt(req.params.id);
  // query database
  pool.query(
    "SELECT * FROM artists where id = $1",
    [artistID],
    (err, queryResult) => {
      // respond with HTML page d isplaying all artists
      if (queryResult.rowCount > 0) {
        res.render("home", { artist: queryResult.rows[0] });
      } else {
        res.send("not found");
      }
    }
  );
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.get("/artists/edit/:id", (req, res) => {
  let artistID = parseInt(req.params.id);

  pool.query(
    "SELECT * FROM artists where id = $1",
    [artistID],
    (err, queryResult) => {
      // respond with HTML page displaying all artists
      if (queryResult.rowCount > 0) {
        console.log(queryResult.rows);
        res.render("new", { artist: queryResult.rows[0] });
      } else {
        res.send("not found");
      }
    }
  );
});

app.post("/artists", (req, res) => {
  if (req.body.id != "") {
    let artistID = parseInt(req.body.id);
    pool.query(
      "update artists set name = $1, photo_url = $2, nationality = $3 where id = $4",
      [req.body.name, req.body.photoURL, req.body.nationality, artistID],
      (err, queryResult) => {
        console.log(err);
        res.writeHead(301, {
          Location: "http://localhost:8080/artists/edit/" + req.body.id
        });
        res.end();
      }
    );
  } else {
    pool.query(
      "INSERT INTO artists (name,photo_url,nationality) VALUES ($1,$2,$3)",
      [req.body.name, req.body.photoURL, req.body.nationality],
      (err, queryResult) => {
        console.log(queryResult.rows);
        res.send("New Artist Created");
      }
    );
  }
});

app.delete("/artists", (req, res) => {
  let artistID = parseInt(req.body.id);

  pool.query(
    "DELETE FROM artists WHERE id = $1",
    [artistID],
    (err, queryResult) => {
      console.log(queryResult.rows);
      res.send("Artist Deleted");
    }
  );
});

/**
 * ===================================
 * Listen to requests on port 8080
 * ===================================
 */
const server = app.listen(8080, () =>
  console.log("~~~ Tuning in to the waves of port 8080 ~~~")
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
