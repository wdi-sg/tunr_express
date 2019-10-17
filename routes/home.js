const express = require("express");
const pg = require("pg");
const sha256 = require("js-sha256");
const router = express.Router();
const pool = require("../utils/database");

const SALT = process.env.SALT;

router.get("/", (req, res) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  res.render("home");
});

router.get("/new", (req, res) => {
  // respond with HTML page with form to create new pokemon
  res.render("new");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/", (req, res) => {
  console.log(req.body);
  const hashedPassword = sha256(req.body.password + SALT);
  const queryText = "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *";
  const values = [req.body.name, hashedPassword];

  pool.query(queryText, values, (err, result) => {
    if (err) {
      console.error("query error:", err.stack);
      res.send( "query error" );
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
