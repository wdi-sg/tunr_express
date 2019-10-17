const express = require("express");
const router = express.Router();
const pool = require("../utils/database");

router.get("/", (req, res) => {
  const queryText = "SELECT * FROM playlist";

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      // iterate through all of your results:
      const playlist = result.rows;
      res.render("playlist", {playlist});
    }
  });
});

router.get("/new", (req, res) => {
  res.render("newPlaylist");
});

router.post("/", (req, res) => {
  const queryText = "INSERT INTO playlist (name) VALUES ($1) RETURNING id";

  const {name} = req.body;
  console.log(req.body);
  const values = [name];

  pool.query(queryText, values, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      res.redirect("/playlist");
    }
  });
});

router.get("/:id", (req, res) => {
  const {id} = req.params;
  const queryText = `SELECT * FROM playlist INNER JOIN playlist_song ON (playlist.id = playlist_song.playlist_id) inner join songs on (playlist_song.song_id = songs.id) WHERE playlist_id = ${id}`;

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      // iterate through all of your results:
      const playlist = result.rows;
      console.log(playlist);
      res.render("playlistSongs", {playlist, id});
    }
  });
});

router.get("/:id/newsong", (req, res) => {
  const {id} = req.params;
  const queryText = `SELECT * FROM songs`;

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      // iterate through all of your results:
      const songs = result.rows;
      res.render("newPlaylistSong", {songs, id});
    }
  });
});

router.post("/:id", (req, res) => {
  const {id} = req.params;
  console.log(req.body);
  const {song_id} = req.body;
  const queryText = "INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2) RETURNING id";

  const values = [song_id, id];

  pool.query(queryText, values, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      res.redirect(`/playlist/${id}`);
    }
  });
});

// router.delete("/:id", (req, res) => {
//   const {name, photo_url, nationality} = req.body;
//   const queryText = "DELETE FROM artists WHERE id = $1 RETURNING *";

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