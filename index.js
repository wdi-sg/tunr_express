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

app.get("/", (request, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  response.render("home");
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

app.get("/artists/:id", (request, response) => {
  const artistId = request.params.id;
  const values = [artistId];
  const query = "SELECT * from artists where id =" + artistId;
  pool.query(query, (err, result) => {
    if (err) {
      response.send(err);
    } else {
      const data = {
        artists: result.rows[0]
      };
      response.render("home", data)
    }
  });
});

app.get("/artists/new", (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render("new");
});

app.post("/", (request, response) => {
  const name = request.body.name;
  const photoURL = request.body.photoURL;
  const nationality = request.body.nationality;
  const values = [name, photoURL, nationality];
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
