console.log("starting up!!");

const express = require("express");
const methodOverride = require("method-override");
const pg = require("pg");

// Initialise postgres client
const configs = {
  user: "moses",
  password: "password",
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
  // respond with HTML page displaying all pokemon
  let queryString = "SELECT * FROM artists";
  pool.query(queryString, (errObject, result) => {
    let obj;
    if (errObject === undefined) {
      // console.log(result.rows);
      obj = { data: result.rows };
    } else {
      console.error("query error:", errorObj.stack);
      result.send("query error");
    }
    response.render("home", obj);
  });
});

app.get("/artist/create", (request, response) => {
  // respond with HTML page displaying all pokemon
  let obj = {};
  response.render("create-artist", obj);
});
app.post("/artist/create/add", (request, response) => {
  objVariableToSend = {};
  // console.log(request.body.name);
  console.log(request.body);
  let queryString =
    "INSERT INTO artists" +
    "(name, photo_url, nationality)" +
    "VALUES" +
    "('" +
    request.body.name +
    "', '" +
    request.body.photo_url +
    "', '" +
    request.body.nationality +
    "')";
  pool.query(queryString, (errObject, result) => {
    if (errObject === undefined) {
      // console.log(result.rows);
      // obj["artist"] = result.rows;
      // result.send("Post Success");
    } else {
      console.error("query error:", errObject.stack);
      result.send("query error");
    }
  });
  // response.render(jsxFileName, objVariableToSend);
});
app.get("/artist/:id", (request, response) => {
  // respond with HTML page displaying all pokemon
  let queryString = "SELECT * FROM artists WHERE id = " + request.params.id;
  pool.query(queryString, (errObject, result) => {
    let queryString2 = "SELECT * FROM songs WHERE artist_id = " + request.params.id;
    pool.query(queryString2, (errObject2, result2) => {
      let obj = {};
      if (errObject2 === undefined) {
        // console.log(result.rows);
        obj["songs"] = result2.rows;
      } else {
        console.error("query error:", errObject2.stack);
        result2.send("query error");
      }

      if (errObject === undefined) {
        // console.log(result.rows);
        obj["artist"] = result.rows;
      } else {
        console.error("query error:", errObject.stack);
        result.send("query error");
      }
      response.render("artists", obj);
    });
  });
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

let onClose = function() {
  console.log("closing");

  server.close(() => {
    console.log("Process terminated");

    pool.end(() => console.log("Shut down db connection pool"));
  });
};

process.on("SIGTERM", onClose);
process.on("SIGINT", onClose);
