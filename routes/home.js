const express = require("express");
const pg = require("pg");
const sha256 = require("js-sha256");
const router = express.Router();
const pool = require("../utils/database");

const SALT = process.env.SALT;

router.get("/", (req, res) => {
  // query database for all pokemon
  const user_id = req.cookies["user_id"];
  if (user_id !== undefined) {
    const queryText = `SELECT * from users WHERE id='${user_id}'`;
    pool.query(queryText, (err, result) => {
      if (err) {
        res.render("home");
      } else {
        const user = {
          name: result.rows[0].name,
        };
        res.render("home", user);
      }
    });
  } else {
    res.render("home");
  }
});

router.get("/new", (req, res) => {
  // respond with HTML page with form to create new pokemon
  res.render("new");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const {name, password} = req.body;
  const hashedPassword = sha256(password + SALT);
  const queryText = "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *";
  const values = [name, hashedPassword];

  pool.query(queryText, values, (err, result) => {
    if (err) {
      console.error("query error:", err.stack);
      res.send( "query error" );
    } else {
      res.redirect("/");
    }
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const {name, password} = req.body;
  console.log(name);
  const queryText = `SELECT * from users WHERE name='${name}'`;
  pool.query(queryText, (err, result) => {
    if (err) {
      console.error("query error:", err.stack);
      res.send( "query error" );
    } else {
      console.log("query result:", result.rows);
      // if this user exists in the db
      if ( result.rows.length > 0 ) {
        const hashedRequestPassword = sha256( password + SALT );
        // check to see if the password in request.body matches what's in the db
        if ( hashedRequestPassword === result.rows[0].password ) {
          const user_id = result.rows[0].id;
          const hashedCookie = sha256(SALT + user_id);
          console.log(user_id, hashedCookie);
          res.cookie("user_id", user_id);
          res.cookie("hasLoggedIn", hashedCookie);
          // if it matches they have been verified, log them in
          res.redirect("/");
        } else {
          res.status(403).send("wrong password");
        }
      } else {
        res.status(403).send("no username");
      }
      // redirect to home page
    }
  });
});

module.exports = router;
