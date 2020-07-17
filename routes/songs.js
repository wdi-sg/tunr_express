const express = require("express");
const router = express.Router();
const pool = require("../utils/database");

router.get("/:id/songs", (req, res) => {
  const {id} = req.params;
  const queryText = `SELECT * FROM songs WHERE artist_id=${id}`;

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      // iterate through all of your results:
      const songs = result.rows;
      console.log(songs);
      res.render("songs", {songs, id});
    }
  });
});

router.get("/:id/songs/new", (req, res) => {
  const {id} = req.params;
  res.render("newSong", {id});
});

router.post("/:id/songs", (req, res) => {
  const {id} = req.params;
  const queryText = "INSERT INTO songs (title, album, artwork, preview_link, artist_id) VALUES ($1, $2, $3, $4, $5) RETURNING id";

  const {title, album, artwork, preview_link} = req.body;
  console.log(req.body);
  const values = [title, album, artwork, preview_link, id];

  pool.query(queryText, values, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      res.redirect(`/artists/${id}/songs`);
    }
  });
});

// router.get("/:id", (req, res) => {
//   const queryText = `SELECT * FROM songs WHERE artist_id=${req.params.id}`;

//   pool.query(queryText, (err, result) => {
//     if (err) {
//       console.log("query error", err.message);
//     } else {
//       // iterate through all of your results:
//       const artist = result.rows[0];
//       res.render("artist", {artist});
//     }
//   });
// });

// router.get("/:id/edit", (req, res) => {
//   const queryText = `SELECT * FROM songs WHERE artist_id=${req.params.id}`;

//   pool.query(queryText, (err, result) => {
//     if (err) {
//       console.log("query error", err.message);
//     } else {
//       // iterate through all of your results:
//       const artist = result.rows[0];
//       res.render("edit", {artist});
//     }
//   });
// });

// router.put("/:id", (req, res) => {
//   const {name, photo_url, nationality} = req.body;
//   const queryText = "UPDATE artists SET (name, photo_url, nationality) = ($1, $2, $3) WHERE id = $4 RETURNING *";

//   const values = [name, photo_url, nationality, req.params.id];

//   pool.query(queryText, values, (err, result) => {
//     if (err) {
//       console.log("query error", err.message);
//     } else {
//       res.redirect("/artists");
//     }
//   });
// });

// router.delete("/:id", (req, res) => {
//   const {name, photo_url, nationality} = req.body;
//   const queryText = "DELETE FROM songs WHERE artist_id=$1 RETURNING *";

//   const values = [req.params.id];

//   pool.query(queryText, values, (err, result) => {
//     if (err) {
//       console.log("query error", err.message);
//     } else {
//       res.redirect("/artists");
//     }
//   });
// });

module.exports = router;