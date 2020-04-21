const express = require('express');
const router = express.Router();
const makeQuery = require('./makequery');

// cookie functions
const increaseVisits = require('./cookies.jsx');

router.get('/', async function (req, res) {
  let visitCount = increaseVisits(req.cookies['visits']);
  res.cookie('visits', visitCount);

  let playlistQuery = "SELECT * FROM playlists";
  let playlistResults = await makeQuery(playlistQuery);

  let data = {
    playlists: playlistResults,
    sitecount: visitCount
  };

  res.render('playlistlist', data);
});

router.get('/new', async function (req, res) {
  let visitCount = increaseVisits(req.cookies['visits']);
  res.cookie('visits', visitCount);

  let data = {
    id: 0,
    name: "",
    photo_url: "",
    nationality: "",
    new: true,
    sitecount: visitCount
  };
  res.render('playlistform', data);
});

router.get('/:id', async function (req, res) {
  let visitCount = increaseVisits(req.cookies['visits']);
  res.cookie('visits', visitCount);

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
    playlist: playlistResults,
    sitecount: visitCount
  };

  res.render('playlistview', data);
});

module.exports = router;
