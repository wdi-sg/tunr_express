const express = require('express');
const router = express.Router();

// helper functions
const db = require('./db');

router.get('/', async (req, res) => {
  let playlistQuery = "SELECT * FROM playlists";
  let playlistResults = await db.makeQuery(playlistQuery);

  let data = {
    playlists: playlistResults,
    sitecount: req.visitCount,
    username: req.username,
    auth: req.authed
  };

  res.render('playlistlist', data);
});

router.get('/new', async (req, res) => {
  let data = {
    id: 0,
    name: "",
    photo_url: "",
    nationality: "",
    new: true,
    sitecount: req.visitCount,
    username: req.username,
    auth: req.authed
  };
  res.render('playlistform', data);
});

router.get('/:id', async (req, res) => {
  let value = [req.params.id];
  let playlistQuery =
      "SELECT songs.id, songs.title, songs.album, artists.name " +
      "FROM songs " +
      "INNER JOIN artists " +
      "ON (artists.id = songs.artist_id) " +
      "INNER JOIN playlist_songs " +
      "ON (songs.id = playlist_songs.song_id) " +
      "WHERE playlist_songs.playlist_id = $1";

  let nameQuery = "SELECT name FROM playlists WHERE id = $1";
  let playlistName = await db.makeQuery(nameQuery, value);
  let playlistResults = await db.makeQuery(playlistQuery, value);

  let data = {
    listname: playlistName[0].name,
    playlist: playlistResults,
    sitecount: req.visitCount,
    username: req.username,
    auth: req.authed
  };

  res.render('playlistview', data);
});

module.exports = router;
