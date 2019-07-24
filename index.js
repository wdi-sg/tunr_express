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

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

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

app.get('/', (request, response) => {
    const queryArtists = 'SELECT * FROM artists ORDER BY id';
    pool.query(queryArtists, (error, result) => {
        if (error) {
            response.send("Unable to load index");
        }//if CT
        else {
            response.render('home', {singleArtist: results.rows});
        }// else CT
    }) //pool query CT
});


app.get('/artist/test', (req, res) => {
    res.send("HEY APP.GET WORKS");
})//.get test CT

//BUILD INDEX FEATURE
app.get('/artist', (req, res) => {

});



app.get('/artist/new', (req, res) => {
    res.render('new');
}); //.get CT
//     response.render('new');
// })//.get CT

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


//BUILD SHOE FEATURE FOR ONE ARTISTS
//BUILD EDIT FEATURE FOR AN EXSITING ARTIST
// BUILD A FEATURE TO ALLOW USERS TO DELETE AND EXISTING ARTISTS DATABASE
// GET /artist/1/songs This page displays a list of songs for this artist

// GET /artist/1/songs/new This page renders a form to create a new song.

// The action of the form can be set to send the appropriate artist id needed to create the song.

// POST /artist/1/songs This route creates a new song with the appropriate artist.















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