const express = require('express');
const router = express.Router();

// helper functions
const db = require('./db');

router.get('/', async (req, res) => {
  let artistQuery = "SELECT * FROM artists ORDER BY id";
  let artists = await db.makeQuery(artistQuery);
  let data = {
    artistlist: artists,
    sitecount: req.visitCount,
    username: req.username,
    auth: req.authed
  };
  res.render('artistlist', data);
});

router.get('/new', (req, res) => {
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
  res.render('artistform', data);
});

router.post('/new', async (req, res) => {
  let newArtistValues = [
    req.body.name,
    req.body.photo_url,
    req.body.nationality
  ];
  let insertQuery =
      "INSERT INTO artists (name, photo_url, nationality) " +
      "VALUES ($1, $2, $3) " +
      "RETURNING id";
  let newArtistId = await db.makeQuery(insertQuery, newArtistValues);

  res.redirect(`/artists/${newArtistId[0].id}`);
});

router.get('/:id', async (req, res) => {
  let artistId = [req.params.id];
  let artistQuery =
      "SELECT * FROM artists " +
      "WHERE id >= $1 " +
      "ORDER BY id LIMIT 2";
  let artistResult = await db.makeQuery(artistQuery, artistId);

  let prevArtistQuery =
      "SELECT * FROM artists " +
      "WHERE id < $1 " +
      "ORDER BY id DESC LIMIT 1";
  let prevArtistResult = await db.makeQuery(prevArtistQuery, artistId);

  let prevArtist = prevArtistResult.length === 0 ? 0 : prevArtistResult[0].id;
  let nextArtist = artistResult.length === 1 ? 0 : artistResult[1].id;

  let data = {
    artist: artistResult[0],
    prevArtistId: prevArtist,
    nextArtistId: nextArtist,
    sitecount: req.visitCount,
    username: req.username,
    auth: req.authed
  };

  res.render('artistview', data);
});

router.get('/:id/edit', async (req, res) => {
  let artistId = [req.params.id];
  let artistQuery =
      "SELECT * FROM artists " +
      "WHERE id = $1";
  let artistResult = await db.makeQuery(artistQuery, artistId);
  let data = {
    id: artistResult[0].id,
    name: artistResult[0].name,
    photo_url: artistResult[0].photo_url,
    nationality: artistResult[0].nationality,
    new: false,
    sitecount: req.visitCount,
    username: req.username,
    auth: req.authed
  };

  res.render('artistform', data);
});

router.put('/:id', async (req, res) => {
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

  await db.makeQuery(updateArtist, artistInfo);
  res.redirect(`/artists/${req.body.id}`);
});

router.get('/:id/delete', async (req, res) => {
  let artistId = [req.params.id];
  let artistQuery = "SELECT name FROM artists WHERE id = $1";
  let artistName = await db.makeQuery(artistQuery, artistId);

  let songQuery =
      "SELECT id, title, album " +
      "FROM songs " +
      "WHERE artist_id = $1 " +
      "ORDER BY album, id";

  let songResults = await db.makeQuery(songQuery, artistId);

  let data = {
    name: artistName[0].name,
    id: req.params.id,
    songs: songResults,
    sitecount: req.visitCount,
    username: req.username,
    auth: req.authed
  };

  res.render('artistdelete', data);
});

router.delete('/:id', async (req, res) => {
  let artistInfo = [
    Number(req.params.id),
  ];

  let deleteQuery =
      "DELETE FROM artists " +
      "WHERE id = $1";

  let deleteResult = await db.makeQuery(deleteQuery, artistInfo);
  if (deleteResult.name === "error") {
    let data = {
      errorinfo: deleteResult
    };
    res.render('errorpage', data);
    return;
  }

  res.redirect('/artists');
});

router.get('/:id/songs', async (req, res) => {
  let artistId = [req.params.id];
  let artistQuery = "SELECT name FROM artists WHERE id = $1";
  let artistName = await db.makeQuery(artistQuery, artistId);

  let songQuery =
      "SELECT id, title, album " +
      "FROM songs " +
      "WHERE artist_id = $1 " +
      "ORDER BY album, id";

  let songResults = await db.makeQuery(songQuery, artistId);

  let data = {
    name: artistName[0].name,
    id: req.params.id,
    songs: songResults,
    sitecount: req.visitCount,
    username: req.username,
    auth: req.authed
  };

  res.render('artistsonglist', data);
});

router.get('/:aid/songs/new', async (req, res) => {
  let artistId = req.params.aid;
  let artistQuery = "SELECT name FROM artists WHERE id = $1";
  let artistName = await db.makeQuery(artistQuery, [artistId]);

  let data = {
    id: artistId,
    name: artistName[0].name,
    sitecount: req.visitCount,
    username: req.username,
    auth: req.authed
  };

  res.render('artistsongform', data);
});

router.post('/:aid/songs/new', async (req, res) => {
  res.send(req.body);
});

router.get('/:aid/songs/:sid', async (req, res) => {
  let songId = req.params.sid;

  let songQuery =
      "SELECT * FROM songs " +
      "WHERE id = $1";

  let songInfo = await db.makeQuery(songQuery, [songId]);

  let data = {
    aid: req.params.aid,
    song: songInfo[0],
    sitecount: req.visitCount,
    username: req.username,
    auth: req.authed
  };

  res.render('artistsongview', data);
});

module.exports = router;
