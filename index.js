console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');

// Initialise postgres client
const configs = {
    user: 'mariadimitrijevic',
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


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

app.use(cookieParser());

/**
 * ===================================
 * Routes
 * ===================================
 */

//index - render home
app.get('/', (request, response) => {
    // query database for all artists

    // respond with HTML page displaying all artists
    response.render('home');
});

//table for creating new artist, display form for new artist
app.get('/artists/new', (request, response) => {
    // respond with HTML page with form to create new artist
    response.render('new');
});


app.get('/artists/', (request, response) => {

    // const data = {artists: result.rows};


    const queryText = "SELECT * FROM artists";

    pool.query(queryText, (err, queryRes) => {
        // const data = {artists: queryRes.rows};

        const artistsDB = queryRes.rows;
        const data = {
            artists: artistsDB
        };

        // if (err) {
        //     return console.error('Error executing query', err.stack)
        // }


        console.log(queryRes.rows);
        response.render('index', data);
    });
});

//show new artist, post

app.post('/artists', (request, response) => {

    let { name, photo_url, nationality } = request.body;
    queryText = `INSERT INTO artists (name, photo_url, nationality) VALUES ('${name}', '${photo_url}', '${nationality}') RETURNING *`


    pool.query(queryText, (err, queryRes) => {
        console.log(queryRes.rows[0])

        response.render('showNewArtist', queryRes.rows[0]);

    })
})





//show single artist
app.get('/artists/:id', (request, response) => {

    const queryText = "SELECT * FROM artists";

    pool.query(queryText, (err, queryRes) => {
        console.log(queryRes);

        const artistsDB = queryRes.rows; //the array of objects from the database

        const data = {
            artists: artistsDB
        };

        response.render('showSingleArtist', data);

    })
});


// update
app.put('/artists/:id', (request, response) => {
    let { id } = request.params;
    let { name, photo_url, nationality } = request.body;
    const queryText = `UPDATE artists SET name='${name}', photo_url='${photo_url}', nationality='${nationality}' WHERE id=${id} RETURNING *`;
    pool.query(queryText, (err, queryRes) => {
        response.render('show', queryRes.rows[0]);
    });
});


//delete artist
app.delete('/artists/:id', (request, result) => {
    let { id } = request.params;
    const queryText = `DELETE FROM artists WHERE id=${id}`;
    pool.query(queryText, (err, queryRes) => {
        response.render('home');
    });
});

//songs

app.get('/artists/:id/songs', (request, result) => {
    let { id } = request.params;
    const queryText = `SELECT * FROM songs WHERE artist_id=${id}`;
    pool.query(queryText, (err, queryRes) => {
        response.render('songs', queryRes);
    });
});


//playlist new form
app.get('/playlist/new', (request, response) => {
    // respond with HTML page with form to create new artist
    response.render('newPlaylist');
});


//show playlist, post

app.post('/playlist', (request, response) => {


    let queryText = 'INSERT INTO playlist (name) VALUES ($1) RETURNING id';

    const values = [request.body.playlistName];

    pool.query(queryText, values, (err, queryRes) => {


        response.render('newPlaylist', data);
    });

});





//add song to a playlist
app.post('/playlist/:id', (request, response) => {
    let id = request.params.id;
    const values = [request.body.song_id, request.params.id];
    let queryText = 'INSERT INTO playlist_song (song_id , playlist_id) VALUES ($1, $2) RETURNING id';


    pool.query(queryText, values, (err, queryRes) => {
        console.log(err);
    });
    queryText = 'SELECT * from songs';
    pool.query(queryText, (err, queryRes) => {


        const data = {
            songsList: queryRes.rows
        }

        data.id = id;


        response.render('playlistNewSong', data);
    });

});

///part 3

// Create a route and jsx file that renders a form for the user to register.

// GET /register

// Create a route that accepts the POST request from the form.

// After the user has been put in the DB, set cookies to set them as logged in:

// a cookie for their username
// a cookie for their hashed loggedIn cookie
// their user id
// Redirect them to the home page.

// register
//get form

app.get('/register', (request, response)=>{
  response.render('register')

});

//post


//login
//get form
app.get('/login', (request, response)=>{
  response.render('login')
});

//post






/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function() {

    console.log("closing");

    server.close(() => {

        console.log('Process terminated');

        pool.end(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);