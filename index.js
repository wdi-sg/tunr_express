console.log("starting up!!");

const express = require("express");
const methodOverride = require("method-override");
const cookierParser = require("cookie-parser");
const pg = require("pg");
const sha256 = require("js-sha256");
const SALT = "pepper";
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
app.use(cookierParser());
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

app.get("/register", (request, response) => {
  let objVariableToSend = {};
  //check for cookie to see if user has already registered
  //if registered, add button to continue
  response.render("register", objVariableToSend);
});

app.post("/register/add", (request, response) => {
  let objVariableToSend = { data: request.body };
  console.log(request.body);
  let user_hash = sha256(SALT + request.body.username);
  let password_hash = sha256(SALT + request.body.password);
  let username = request.body.username;
  let cookie = sha256(SALT + request.body.username + request.body.password);
  let cookieOnDatabase = sha256(SALT + cookie);

  let query_username =
    "INSERT INTO usernames" + "(username)" + "VALUES" + "('" + username + "')";
  let query_passwords =
    "INSERT INTO passwords" +
    "(user_hash, password_hash)" +
    "VALUES" +
    "('" +
    user_hash +
    "', '" +
    password_hash +
    "')";
  let query_cookie =
    "INSERT INTO cookies" + "(cookie)" + "VALUES" + "('" + cookieOnDatabase + "')";
  pool.query(query_username, (errObject, result) => {
    if (errObject === undefined) {
      console.log(username + " added to database");
    } else {
      console.error("query error:", errObject.stack);
      result.send("query error");
    }
  });
  pool.query(query_passwords, (errObject, result) => {
    if (errObject === undefined) {
      console.log(
        "password_hash: " +
          password_hash +
          "and user_hash: " +
          user_hash +
          " added to database"
      );
    } else {
      console.error("query error:", errObject.stack);
      result.send("query error");
    }
  });
  pool.query(query_cookie, (errObject, result) => {
    if (errObject === undefined) {
      console.log("cookie: " + cookieOnDatabase + " added to database");
    } else {
      console.error("query error:", errObject.stack);
      result.send("query error");
    }
  });
  //check for cookie to see if user has already registered
  //if registered, add button to continue

  response.render("register", objVariableToSend);
});

app.get("/login", (request, response) => {
  let objVariableToSend = {};

  response.render("login", objVariableToSend);
});

app.get("/login/confirm", (request, response) => {
  console.log(request.query);
  let username = request.query.username;
  let password = request.query.password;
  let user_hash = sha256(SALT + username);
  let password_hash = sha256(SALT + password);
  let cookie = sha256(SALT + username + password);
  let query_verify =
    "SELECT * FROM passwords WHERE user_hash = '" +
    user_hash +
    "' AND password_hash = '" +
    password_hash +
    "'";
  pool.query(query_verify, (errObject, result) => {
    if (errObject === undefined) {
      console.log(result.rows);
      if (result.rows.length === 1) {
        response.cookie("loggedin", cookie);
        response.render("login");
      }
    } else {
      console.error("query error:", errObject.stack);
      result.send("query error");
    }
  });
});

app.get("/favourites", (request, response) => {
  // let objVariableToSend = {}
  console.log(request.cookies);
  let obj = {};
  let cookieInDatabase = sha256(SALT + request.cookies.loggedin);
  let queryVerify = "SELECT * FROM cookies WHERE cookie = '" + cookieInDatabase + "'";
  let queryFavourites =
    "SELECT songs.title, songs.album, songs.preview_link, songs.artist_id FROM favourites INNER JOIN songs ON (songs.id = favourites.song_id) WHERE favourites.cookie = '" +
    cookieInDatabase +
    "'";
  //change query string to be a string which gets favourites data
  pool.query(queryFavourites, (errObject, result) => {
    if (errObject === undefined) {
      if (result.rows.length > 0) {
        console.log("match found!");
        console.log(result.rows);
        //use cookieInDatabase to get favourites data
        obj['songs'] = result.rows;
        //obj will contain favourites data of user based on cookie
        response.render("favourites", obj);
      }
    } else {
      console.error("query error:", errObject.stack);
      result.send("query error");
    }
  });
  // let cookie = request.cookies.loggedin;
  // console.log(cookie);
  // response.render(jsxFileName, objVariableToSend);
});

app.get("/artist/create", (request, response) => {
  // respond with HTML page displaying all pokemon
  let obj = {};
  response.render("create-artist", obj);
});
app.get("/song/create", (request, response) => {
  objVariableToSend = {};

  response.render("create-song", objVariableToSend);
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
