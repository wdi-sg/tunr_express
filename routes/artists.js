const express = require("express");
const router = express.Router();
const pool = require("../utils/database");

router.get("/", (req, res) => {
  const queryText = "SELECT * FROM artists";

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      // iterate through all of your results:
      const artists = result.rows;
      res.render("artists", {artists});
    }
  });
});

router.get("/new", (req, res) => {
  // respond with HTML page with form to create new pokemon
  res.render("new");
});

router.post("/", (req, res) => {
  const queryText = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id";

  const {name, photo_url, nationality} = req.body;
  console.log(req.body);
  const values = [name, photo_url, nationality];

  pool.query(queryText, values, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      res.redirect("/artists");
    }
  });
});

router.get("/:id", (req, res) => {
  const queryText = `SELECT * FROM artists WHERE id = ${req.params.id}`;

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      // iterate through all of your results:
      const artist = result.rows[0];
      res.render("artist", {artist});
    }
  });
});

router.get("/:id/edit", (req, res) => {
  const queryText = `SELECT * FROM artists WHERE id = ${req.params.id}`;

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      // iterate through all of your results:
      const artist = result.rows[0];
      res.render("edit", {artist});
    }
  });
});

router.put("/:id", (req, res) => {
  const {name, photo_url, nationality} = req.body;
  const queryText = "UPDATE artists SET (name, photo_url, nationality) = ($1, $2, $3) WHERE id = $4 RETURNING *";

  const values = [name, photo_url, nationality, req.params.id];

  pool.query(queryText, values, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      res.redirect("/artists");
    }
  });
});

router.delete("/:id", (req, res) => {
  const {name, photo_url, nationality} = req.body;
  const queryText = "DELETE FROM artists WHERE id = $1 RETURNING *";

  const values = [req.params.id];

  pool.query(queryText, values, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      res.redirect("/artists");
    }
  });
});

module.exports = router;
