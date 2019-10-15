console.log("starting up!!");

const express = require("express");
const methodOverride = require("method-override");
const pg = require("pg");

// Initialise postgres client
const configs = {
  user: "cyeap",
  host: "127.0.0.1",
  database: "tuner_db",
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

// Set react-views to be the default view engine
const reactEngine = require("express-react-views").createEngine();
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactEngine);

/**
 * ===================================
 **Route handlers
 * ===================================
 */
const showArtists = response => {
  const queryStr = "SELECT * FROM artists";

  pool.query(queryStr, (err, res) => {
    if (err) {
      console.log("Something went wrong!!!!");
      console.log(err);
    }

    // for (let i in res.rows){
    //     console.log(res.rows[i])}
    //this is what return res.rows does
    response.render("home", { idontknow: res.rows });
  });
};

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/", (request, response) => {
  // query database for all pokemon
  showArtists(response);
  // respond with HTML page displaying all pokemon
  // response.render('home',{data:showArtists()});
});

// app.get('/new', (request, response) => {
//   // respond with HTML page with form to create new pokemon
//   response.render('new');
// });

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
