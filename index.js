/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

console.log("starting up!!");
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'nuraqilahrajab',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

// Init express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Functions
 * ===================================
 */


var React = require("react");

//RENDER REGISTRATION FORM
app.get('/register', (req, res) => {
    res.render('register');
}); //.get CT

//RENDER NEW REGISTRATION FORM
app.post('/register', (request, response) => {

    // Set variable for comparison
    let existingUser = "SELECT * FROM userInfo WHERE name = $1";
    let inputValue = [request.body];
    let inputPassword = sha256(inputValue.password);
    let inputName = inputValue.name.lowercase();

    //compare if username exist
    let values = [inputName];
    pool.query(existingUser, values, (error, results) => {
        if (error) {
            console.log(error);
            response.send("Unable to check database");
        }// if CT
        else {
            if(result.rows.length > 0) {
                response.send("Username already exist");
            } else {
                let addNewAccount = 'INSERT INTO userInfo (name,password) VALUES ($1,$2)';
                values = [inputName, inputPassword];
                pool.query(query, values, (error, results) => {
                    if (error) {
                        console.log(error);
                    }//if CT
                    else {
                        let user_id = results.rows[0].id;
                        let currentSessionCookie = sha256( user_id + "logged_id" + SALT );
                        res.redirect('/artists');
                    } //else CT
                })//query CT
            }//else CT
        }//else CT
    })//pool.query CT
})//.post CT


//TEST IF APP.GET WORKS
app.get('/artist/test', (req, res) => {
    res.send("HEY APP.GET WORKS");
})//.get test CT


//SETUP INDEX PAGE
app.get('/home', (request, response) => {
    let queryString = "SELECT * FROM artists";
    pool.query(queryString, (err,result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } //if CT
        else {
            const data = {
            artists : result.rows
            } //data CT
            response.render('home', data);
       }//else CT
     })//pool.query CT
});



//RENDER NEW ARTIST FORM
app.get('/artist/new', (req, res) => {
    res.render('new');
}); //.get CT


//RENDER NEW SONG FORM
app.post('/artist', (request, response) => {

    const insertQuery = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id';
    const values = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(insertQuery, values, (error, result) => {
        if (error) {
           response.send("Unable to add artist");
        } // if CT
        else {
        response.send("New artist added");
        } //else CT
    })//pool.query CT
})//.post CT




/**
 * ===================================
 * Routes
 * ===================================
 */

 // (artist/new) -- new artist form
 //








/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(4000, () => console.log('~~~ Tuning in to the waves of port 4000 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);