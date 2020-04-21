const express = require('express');
const router = express.Router();
const makeQuery = require('./makequery');

// cookie functions
const increaseVisits = require('./cookies.jsx');

router.get('/', async function (req, res) {
  let visitCount = increaseVisits(req.cookies['visits']);
  res.cookie('visits', visitCount);

  let songQuery = "SELECT * FROM songs";
  let songResults = await makeQuery(songQuery);

  let data = {
    songs: songResults,
    sitecount: visitCount
  };

  res.render('songlist', data);
});

module.exports = router;
