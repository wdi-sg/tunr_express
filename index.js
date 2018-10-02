console.log("starting up!!");

const express = require('express');
var fs = require("fs"),
    json;

const jsonfile = require('jsonfile');
const pg = require('pg');

// const artistsFile = 'db/artist_data.json';
// const songsFile = 'db/songs.json';
const methodOverride = require('method-override');

// Initialise postgres client
const configs = {
    user: 'audreykow',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
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

// app.use(express.static('public',{index:false, extensions:['json']}));
// app.use(function (req, res) {
//     // Optional 404 handler
//     res.status(404);
//     res.json({
//         error: {
//             code: 404
//         }
//     });
// })

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

//create the 7 RESTful Routes for songs
//GET /artists/1/songs
//POST /arttists/1/song

app.get('/', (req, res) => {

    res.render('home');
});

app.get('/artists', (req, res) => {

    let queryString = 'SELECT * FROM artists';


            pool.query(queryString, (err, queryResult) => {

                if (err) {
                    console.log('query error', err.message);
                } else {

                    console.log('result', queryResult.rows);

                    res.render('artist-home', {artists: queryResult.rows});

                }

            });

});


app.get('/artists/:id/show', (req, res) => {

        let eachArtist = req.params.id;

         let queryString = `SELECT * FROM artists WHERE id = ${eachArtist} `;

            pool.query(queryString, (err, queryResult) => {

                if (err) {
                    console.log('query error', err.message);
                } else {

                    console.log('result', queryResult.rows);

                    res.render('artist-each', {artist:queryResult.rows});

                }

            });
});



app.get('/artist/new', (request, response) => {

    response.render('artists/new');
});



app.post('/artist', (request, response) => {

    console.log("REQ BODY",request.body);

    let sqlText = `INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)`;
    const values = [request.body.name, request.body.photo_url, request.body.nationality];

          pool.query(sqlText, values, (error, queryResult) => {

          if (error) {
            console.error('error!', error)

        } else {
            console.log("QUERY RESULT", request.body);

            console.log(queryResult.rows);

          response.render("artists/artist-added", {artist: request.body});
        };
        })
});


app.put('/artist/:id/edit', (request, response) => {


});




app.get('/songs', (req, res) => {

    let queryString = 'SELECT * FROM songs';

            pool.query(queryString, (err, queryResult) => {

                if (err) {
                    console.log('query error', err.message);
                } else {

                    console.log('result', queryResult.rows);

                    res.render('song-home', {songs: queryResult.rows});

                }

            });

});

// app.post('/owner', (request, response) => {
//     console.log(request.body);

//     response.send("works");

//     let sqlText = `INSERT INTO owners (name) VALUES ($1)`;
//     const values = [request.body.name];

//       pool.query(sqlText, values, (error, queryResult) => {
//       if (error) {
//         console.error('error!', error)
//     } else {

//         let newId = queryResult.rows[0].id;

//       response.send('this works');
//     };
//     });





// })

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// server.on('close', () => {
//   console.log('Closed express server');

//   db.pool.end(() => {
//     console.log('Shut down db connection pool');
//   });
// });