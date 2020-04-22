const express = require('express');
const router = express.Router();

// user auth
const hash = require('node_hash');
const makeRandString = require('./crypt.js');

// helper functions
const makeQuery = require('./makequery');

router.get('/', (req, res) => {
  let data = {
    sitecount: req.visitCount,
    username: req.authed ? req.username : "",
    auth: req.authed
  };

  res.render('home', data);
});

router.get('/register', (req, res) => {
  let data = {
    title: "Register for Tunr",
    button: "Register",
    action: "/register",
    sitecount: req.visitCount,
    error: ""
  };
  res.render('userform', data);
});

router.post('/register', (req, res) => {
//  res.render('registerform', {sitecount: req.visitCount});
});

router.get('/login', (req, res) => {
  let data = {
    title: "Log In to Tunr",
    button: "Log In",
    action: "/login",
    sitecount: req.visitCount,
    error: ""
  };
  res.render('userform', data);
});

router.post('/login', (req, res) => {
//  res.render('loginform', {sitecount: req.visitCount});
});

router.get('/testpage', (req, res) => {
  let data = {
    sitecount: req.visitCount,
    username: req.username
  };
  console.log("data", data);
  res.render('template-content', data);
});

router.get('/testerror', (req, res) => {
  let data = {
    errorinfo: {
      line1: "HERE",
      line2: "ANOTHER",
      line3: "YEAH OKAY",
      sitecount: req.visitCount,
      username: req.username,
      auth: req.authed
    }
  };
  res.render('errorpage', data);
});

module.exports = router;
