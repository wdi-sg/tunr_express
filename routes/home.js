const express = require("express");
const router = express.Router();
const pg = require("pg");

router.get("/", (req, res) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  res.render("home");
});

router.get("/new", (req, res) => {
  // respond with HTML page with form to create new pokemon
  res.render("new");
});

module.exports = router;