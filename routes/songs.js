const express = require("express");
const router = express.Router();
const pool = require("../utils/database");

router.get("/:id/songs", (req, res) => {
  const queryText = `SELECT * FROM songs WHERE artist_id=${req.params.id}`;

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      // iterate through all of your results:
      const songs = result.rows;
      console.log(songs);
      res.render("songs", {songs});
    }
  });
});

module.exports = router;