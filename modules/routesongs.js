const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());

// helper functions
const makeQuery = require('./makequery');
const increaseVisits = require('./cookies.jsx');

router.get('/', async function (req, res) {
  let visitCount = increaseVisits(req.cookies['visits']);
  res.cookie('visits', visitCount);

  let songQuery =
      "SELECT songs.title, songs.album, artists.name FROM songs " +
      "INNER JOIN artists " +
      "ON (songs.artist_id = artists.id)";
  let songResults = await makeQuery(songQuery);

  let data = {
    songs: songResults,
    sitecount: visitCount
  };

  res.render('songlist', data);
});

router.get('/new', async function (req, res) {
  let visitCount = increaseVisits(req.cookies['visits']);
  res.cookie('visits', visitCount);

  res.render('songform', {sitecount: visitCount});
});

module.exports = router;
