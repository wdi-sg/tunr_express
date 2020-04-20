const express = require('express');
const router = express.Router();
const makeQuery = require('./makequery');

router.get('/', async function (req, res) {
  let playlistQuery = "SELECT * FROM playlists";
  let playlistResults = await makeQuery(playlistQuery);

  let data = {
    playlists: playlistResults
  };

  res.render('playlistlist', data);
});

router.get('/new', async function (req, res) {
  let data = {
    id: 0,
    name: "",
    photo_url: "",
    nationality: "",
    new: true
  };
  res.render('playlistform', data);
});

router.get('/:id', async function (req, res) {
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
  let playlistName = await makeQuery(nameQuery, value);
  let playlistResults = await makeQuery(playlistQuery, value);

  let data = {
    listname: playlistName[0].name,
    playlist: playlistResults
  };

  res.render('playlistview', data);
});

module.exports = router;
