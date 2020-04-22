const express = require('express');
const router = express.Router();

// user auth
const hash = require('node_hash');
const rsP = require('./crypt.js');

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

router.post('/register', async (req, res) => {
  let form = req.body;
  let userCheckQuery = "SELECT * FROM users WHERE username = $1";
  let existUsers = await makeQuery(userCheckQuery, [form.username]);
  if (existUsers.length > 0) {
    let data = {
      title: "Register for Tunr",
      button: "Register",
      action: "/register",
      sitecount: req.visitCount,
      error: "That username is taken, please choose another."
    };
    res.render('userform', data);
    return;
  }

  let salt = await rsP(4);
  let saltedPass = hash.sha256(form.password, salt);
  let values = [
    form.username,
    saltedPass,
    salt
  ];

  let userQuery =
      "INSERT INTO users " +
      "(username, password, salt) " +
      "VALUES ($1, $2, $3)";

  await makeQuery(userQuery, values);
  res.redirect('/');
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

router.post('/login', async (req, res) => {
  let form = req.body;
  let authQuery = "SELECT * FROM users WHERE username = $1";
  let authResults = await makeQuery(authQuery, [form.username]);
  let saltedPass = hash.sha256(form.password, authResults[0].salt);

  if (authResults.length > 0 && authResults[0].password === saltedPass) {
    let session = await rsP(30);
    let sesId = hash.sha256(session);

    let sessionQuery =
        "INSERT INTO sessions " +
        "(id, user_id) " +
        "VALUES ($1, $2)";
    let sessionValues = [
      sesId,
      authResults[0].id
    ];
    await makeQuery(sessionQuery, sessionValues);
    res.cookie('session', sesId);
    res.redirect('/');
  }

  let data = {
    title: "Log In to Tunr",
    button: "Log In",
    action: "/login",
    sitecount: req.visitCount,
    error: "Unable to log in"
  };
  res.render('userform', data);
});

router.get('/logout', (req, res) => {
  res.clearCookie('session');
  res.redirect('/');
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
