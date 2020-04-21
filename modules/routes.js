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

router.get('/register', (req, res) => {
  res.render('registerform', {sitecount: req.visitCount});
});

router.post('/register', (req, res) => {
//  res.render('registerform', {sitecount: req.visitCount});
});

router.get('/login', (req, res) => {
  res.render('loginform', {sitecount: req.visitCount});
});

router.post('/login', (req, res) => {
//  res.render('loginform', {sitecount: req.visitCount});
});

router.get('/testpage', (req, res) => {
  res.render('template-content', {sitecount: req.visitCount});
});

module.exports = router;
