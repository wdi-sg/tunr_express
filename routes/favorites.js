const express = require("express");
const router = express.Router();
const pool = require("../utils/database");

router.get("/", (req, res) => {
  const user_id = req.cookies["user_id"];
  const queryText = `SELECT * FROM favorites INNER JOIN songs ON (favorites.song_id = songs.id) WHERE favorites.user_id=${user_id}`;

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      // iterate through all of your results:
      const favorites = result.rows;
      res.render("favorites", {favorites});
    }
  });
});

router.get("/new", (req, res) => {
  const queryText = `SELECT * FROM songs`;

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      // iterate through all of your results:
      const songs = result.rows;
      res.render("newFavorite", {songs});
    }
  });
});

router.post("/", (req, res) => {
  const user_id = req.cookies["user_id"];
  const {song_id} = req.body;
  const queryText = "INSERT INTO favorites (user_id, song_id) VALUES ($1, $2) RETURNING *";
  const values = [user_id, song_id];

  pool.query(queryText, values, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      res.redirect("/favorites");
    }
  });
});

module.exports = router;
