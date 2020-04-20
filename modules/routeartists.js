const express = require('express');
const router = express.Router();
const makeQuery = require('./makequery');

router.get('/', async function (req, res) {
  let artistQuery = "SELECT * FROM artists ORDER BY id";
  let artists = await makeQuery(artistQuery);
  res.render('artistlist', {artistlist: artists});
});

router.get('/new', (req, res) => {
  let data = {
    id: 0,
    name: "",
    photo_url: "",
    nationality: "",
    new: true
  };
  res.render('artistform', data);
});

router.post('/new', async function (req, res) {
  let newArtistValues = [
    req.body.name,
    req.body.photo_url,
    req.body.nationality
  ];
  let insertQuery =
      "INSERT INTO artists (name, photo_url, nationality) " +
      "VALUES ($1, $2, $3) " +
      "RETURNING id";
  let newArtistId = await makeQuery(insertQuery, newArtistValues);

  res.redirect(`/artists/${newArtistId[0].id}`);
});

router.get('/:id', async function (req, res) {
  let artistId = [req.params.id];
  let artistQuery =
      "SELECT * FROM artists " +
      "WHERE id >= $1 " +
      "ORDER BY id LIMIT 2";
  let artistResult = await makeQuery(artistQuery, artistId);

  let prevArtistQuery =
      "SELECT * FROM artists " +
      "WHERE id < $1 " +
      "ORDER BY id DESC LIMIT 1";
  let prevArtistResult = await makeQuery(prevArtistQuery, artistId);

  let prevArtist = prevArtistResult.length === 0 ? 0 : prevArtistResult[0].id;
  let nextArtist = artistResult.length === 1 ? 0 : artistResult[1].id;

  let data = {
    artist: artistResult[0],
    prevArtistId: prevArtist,
    nextArtistId: nextArtist
  };

  res.render('artistview', data);
});

router.get('/:id/edit', async function (req, res) {
  let artistId = [req.params.id];
  let artistQuery =
      "SELECT * FROM artists " +
      "WHERE id = $1";
  let artistResult = await makeQuery(artistQuery, artistId);
  let data = {
    id: artistResult[0].id,
    name: artistResult[0].name,
    photo_url: artistResult[0].photo_url,
    nationality: artistResult[0].nationality,
    new: false
  };

  res.render('artistform', data);
});

router.put('/:id', async function (req, res) {
  let artistInfo = [
    Number(req.body.id),
    req.body.name,
    req.body.photo_url,
    req.body.nationality
  ];

  let updateArtist =
      "UPDATE artists " +
      "SET (name, photo_url, nationality) = " +
      "($2, $3, $4) " +
      "WHERE id = $1";

  await makeQuery(updateArtist, artistInfo);
  res.redirect(`/artists/${req.body.id}`);
});

router.get('/:id/delete', async function (req, res) {
  let artistId = [req.params.id];
  let artistQuery = "SELECT name FROM artists WHERE id = $1";
  let artistName = await makeQuery(artistQuery, artistId);

  let songQuery =
      "SELECT id, title, album " +
      "FROM songs " +
      "WHERE artist_id = $1 " +
      "ORDER BY album, id";

  let songResults = await makeQuery(songQuery, artistId);

  let data = {
    name: artistName[0].name,
    id: req.params.id,
    songs: songResults
  };

  res.render('artistdelete', data);
});

router.delete('/:id', async function (req, res) {
  let artistInfo = [
    Number(req.params.id),
  ];

  let deleteQuery =
      "DELETE FROM artists " +
      "WHERE id = $1";

  let deleteResult = await makeQuery(deleteQuery, artistInfo);
  if (deleteResult.name === "error") {
    let data = {
      errorinfo: deleteResult
    };
    res.render('errorpage', data);
    return;
  }

  res.redirect('/artists');
});

router.get('/:id/songs', async function (req, res) {
  let artistId = [req.params.id];
  let artistQuery = "SELECT name FROM artists WHERE id = $1";
  let artistName = await makeQuery(artistQuery, artistId);

  let songQuery =
      "SELECT id, title, album " +
      "FROM songs " +
      "WHERE artist_id = $1 " +
      "ORDER BY album, id";

  let songResults = await makeQuery(songQuery, artistId);

  let data = {
    name: artistName[0].name,
    id: req.params.id,
    songs: songResults
  };

  res.render('artistsonglist', data);
});

router.get('/:aid/songs/new', async function (req, res) {
  let artistId = req.params.aid;
  let artistQuery = "SELECT name FROM artists WHERE id = $1";
  let artistName = await makeQuery(artistQuery, [artistId]);

  let data = {
    id: artistId,
    name: artistName[0].name
  };

  res.render('artistsongform', data);
});

router.post('/:aid/songs/new', async function (req, res) {
  res.send(req.body);
});

router.get('/:aid/songs/:sid', async function (req, res) {
  let songId = req.params.sid;

  let songQuery =
      "SELECT * FROM songs " +
      "WHERE id = $1";

  let songInfo = await makeQuery(songQuery, [songId]);

  let data = {
    aid: req.params.aid,
    song: songInfo[0]
  };

  res.render('artistsongview', data);
});

module.exports = router;
