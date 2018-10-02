const express = require("express");
const methodOverride = require("method-override");
const pg = require("pg");

// Initialise postgres client
const configs = {
  user: "mervyn",
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

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/artists", (req, res) => {
  let queryString = "SELECT * FROM artists";
  pool.query(queryString, (err, queryResult) => {
    if (err) {
      console.log("Error!", err);
      res.status(500).send("Error");
    } else {
      res.render("artists", { artists: queryResult.rows });
    }
  });
});
// Route to Show individual artist
app.get("/artists/:id/show", (req, res) => {
  let queryString = "SELECT * FROM artists WHERE id = ($1)";
  values = [req.params.id];
  pool.query(queryString, values, (err, queryResult) => {
    if (err) {
      console.log("Error!", err);
      res.status(500).send("Error");
    } else {
      res.render("showartist", { artist: queryResult.rows });
    }
  });
});
// Route to show page for Adding New Artist
app.get("/artists/new", (req, res) => {
  res.render("newartist");
});
// Route to POST request for adding new artists
app.post("/artists/", (req, res) => {
  let queryString =
    "INSERT INTO artists(name, photo_url, nationality) VALUES ($1, $2, $3)";
  values = [
    req.body.artistName,
    req.body.artistImageUrl,
    req.body.artistNationality
  ];
  pool.query(queryString, values, (err, queryResult) => {
    if (err) {
      console.log("Error!", err);
      res.status(500).send("Error");
    } else {
      res.render("addsuccess", { artist: req.body });
    }
  });
});

//Route to show when editing artists
app.get("/artists/:id/edit", (req, res) => {
    let queryString = "SELECT * FROM artists WHERE id = ($1)";
    values = [req.params.id];
    pool.query(queryString, values, (err, queryResult) => {
      if (err) {
        console.log("Error!", err);
        res.status(500).send("Error");
      } else {
        res.render("editartist", { artist: queryResult.rows });
      }
    });
})
// Route to PUT Artists Edit Requests
app.put("/artists/:id", (req, res) => {
    let reqBody = req.body
    let queryString = "UPDATE artists SET (name, photo_url, nationality) = ($2,$3,$4) WHERE id = ($1)";
    values = [req.params.id, reqBody.artistName, reqBody.artistImageUrl, reqBody.artistNationality ];
    pool.query(queryString, values, (err, queryResult) => {
      if (err) {
        console.log("Error!", err);
        res.status(500).send("Error");
      } else {
        res.redirect(`/artists/${req.params.id}/show`);
      }
    });
})

app.delete('/artists/:id', (req, res) => {
  const queryString = 'DELETE FROM artists WHERE id = ($1)';
  const values = [req.params.id];
  pool.query(queryString, values, (err, queryResult) => {
    if (err) return console.log("Error!", err);
    res.redirect('/artists');
  });
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);

pool.on("close", () => {
  console.log("Closed express server");

  db.pool.end(() => {
    console.log("Shut down db connection pool");
  });
});
