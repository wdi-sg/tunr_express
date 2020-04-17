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

app.get("/artists/:id", (request, response) => {
  const whenQueryDone = (queryErr, result) => {
    if (queryErr) {
      console.log(querErr);
    } else {
      console.log(result.rows[0]);
    }
    const data = {
      artistInfo: result.rows[0],
    };
    // query database for all pokemon

    // respond with HTML page displaying all pokemon
    response.render("singleArtist", data);
  };
  const queryString = "SELECT * FROM artists WHERE id = " + request.params.id;
  pool.query(queryString, whenQueryDone);
});

app.get("/artists/new", (request, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  response.render("new");
});

app.post("/artists", (request, response) => {
  // query database for all pokemon
  console.log(request.body);

  const whenQueryDone = (queryErr, result) => {
    if (queryErr) {
      console.log(querErr);
    } else {
      console.log(result.rows[0]);
    }
    const data = {
      artist: result.rows[0],
    };
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
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  response.render("home");
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
