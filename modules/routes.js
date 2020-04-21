const express = require('express');
const router = express.Router();

// user auth
const hash = require('node_hash');
const makeRandString = require('./crypt.js');

// helper functions
const makeQuery = require('./makequery');

router.get('/', (req, res) => {
  res.render('home', {sitecount: req.visitCount});
});

router.get('/testpage', (req, res) => {
  res.render('template-content', {sitecount: req.visitCount});
});

module.exports = router;
