const express = require('express');
const router = express.Router();
const makeQuery = require('./makequery');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

// cookie functions
const increaseVisits = require('./cookies.jsx');

router.get('/', (req, res) => {
  let visitCount = increaseVisits(req.cookies['visits'], true);
  res.cookie('visits', visitCount);
  res.render('home', {sitecount: visitCount});
});

router.get('/testpage', (req, res) => {
  let visitCount = increaseVisits(req.cookies['visits']);
  res.cookie('visits', visitCount);
  res.render('template-content', {sitecount: visitCount});
});

module.exports = router;
