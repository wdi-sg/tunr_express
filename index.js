const express = require("express");
const methodOverride = require("method-override");
const pg = require("pg");
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(methodOverride("_method"));
const reactEngine = require("express-react-views").createEngine();
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactEngine);

const configs = {
  user: "postgres",
  host: "127.0.0.1",
  database: "tunr_db",
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on("error", function (err) {
  console.log("IDLE CLIENT ERROR", err.message, err.stack);
});

//----------------------------------
//-------------ROUTES---------------
//----------------------------------

//VIEW HOME PAGE
app.get("/", (request, response) => {
  response.render("home");
});

//VIEW CREATE NEW ARTIST PAGE
app.get("/artists/new", (request, response) => {
  response.render("new-artist");
});

//CAPTURES NEW ARTIST DATA AND DISPLAYS IT
app.post("/artists/new", (request, response) => {
  let queryText = `INSERT INTO artists (name, photo_url, nationality) VALUES ('${request.body.name}', '${request.body.photo_url}', '${request.body.nationality}') RETURNING *`;
  pool.query(queryText, (err, result) => {
    // console.log(result.rows[0]);
    let artistObj = result.rows[0];
    console.log(artistObj);
    response.render("display-one-artist", artistObj);
  });
});

//DISPLAY SINGULAR ARTIST DETAILS BASED ON ID
app.get("/artists/:id", (request, response) => {
  let id = request.params.id; 
  let queryText = `SELECT * FROM artists WHERE id=${id}`;
  pool.query(queryText, (err, result) => {
    let artistObj = result.rows[0];
    response.render("display-one-artist", artistObj);
  });
});

app.get("/artists/:id/songs", (request, response) => {
  let artist_id = request.params.id;
  let artistName;
  let queryText2 = `SELECT name from artists WHERE id=${artist_id}`;
  pool.query(queryText2, (err, result) => {
    artistName = result.rows[0].name;
  });
  let queryText = `SELECT * FROM songs WHERE artist_id=${artist_id}`;
  pool.query(queryText, (err, result) => {
    console.log(result.rows);
    let songData = {songs: result.rows,
    artist: artistName
    };
    response.render("display-all-songs", songData);
  });
});

//------------------------------
//-----LISTEN ON PORT 3000------
//------------------------------

const server = app.listen(3000, () => console.log("Tuning in to port 3000"));

let onClose = function () {
  console.log("closing");
  server.close(() => {
    console.log("Process terminated");
    pool.end(() => console.log("Shut down db connection pool"));
  });
};

process.on("SIGTERM", onClose);
process.on("SIGINT", onClose);
