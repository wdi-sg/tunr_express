const express = require('express');
const router = express.Router();

// helper functions
const db = require('./db');

router.get('/', async (req, res) => {
  let songQuery =
      "SELECT songs.title, songs.album, artists.name FROM songs " +
      "INNER JOIN artists " +
      "ON (songs.artist_id = artists.id)";
  let songResults = await db.makeQuery(songQuery);

  let data = {
    songs: songResults,
    sitecount: req.visitCount,
    username: req.username,
    auth: req.authed
  };

  res.render('songlist', data);
});

router.get('/new', async (req, res) => {
  res.render('songform', {sitecount: req.visitCount});
});

module.exports = router;
