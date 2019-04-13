console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

//require password hasher
const sha256 = require('js-sha256');

//cookie parser library
const cookieParser = require('cookie-parser');

// Initialise postgres client
const configs = {
    user: 'claucanchin',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
};

const SALT = 'how does your garden grow';

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

//tell express to use cookie parser
app.use(cookieParser());

// Using public folder for files like css, index.html
app.use(express.static('public'));

app.use(methodOverride('_method'));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);


/**
 * ===================================
 * Request Handler
 * ===================================
 */

//===================================
// INDEX ARTISTS

app.get('/artists', (request, response) => {
    // query database for all artists
    const queryString = 'SELECT * FROM artists ORDER BY id ASC';

    pool.query(queryString, (errorObj, result) => {
        // errorObj is null if there's no error
        if (!errorObj) {

            // console.log(result.rows);
            const data = { artists: result.rows };
            // respond with HTML page displaying all artists
            response.render('artistindex', data);
        } else {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        }
    });
});


//===================================
// CREATE AN ARTIST

//displaying the form to add new artist
app.get('/artists/new', (request, response) => {
    // respond with HTML page with form to create new songs
    response.render('artistcreateform');
});

//retrieving the form with user input
app.post('/artists', (request, response) => {

    // console.log(request.body);

    const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';

    const values = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(queryString, values, (errorObj, result) => {
        // errorObj is null if there's no error
        if (!errorObj) {

            // console.log(result.rows);

            const data = { artist: result.rows };
            response.render('artistcreated', data);
        } else {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        }
    });
});


//===================================
// SHOW AN ARTIST

app.get('/artists/:id', (request, response) => {
    // query database for all artists
    const queryString = 'SELECT * FROM artists WHERE id=' + request.params.id;
    // response.send(queryString);
    pool.query(queryString, (errorObj, result) => {
        // console.log(errorObj, result);
        // errorObj is null if there's no error
        if (!errorObj) {

            // console.log('Query results: ', result.rows);
            const data = { artist: result.rows };
            // respond with HTML page displaying all artists
            response.render('artistshow', data);
        } else {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        }
    });
});


//===================================
// EDIT AN ARTIST

app.get('/artists/:id/edit', (request, response) => {
    // query database for all artists
    const queryString = 'SELECT * FROM artists WHERE id=' + request.params.id;
    // response.send(queryString);
    pool.query(queryString, (errorObj, result) => {
        // console.log(errorObj, result);
        // errorObj is null if there's no error
        if (!errorObj) {

            // console.log('Query results: ', result.rows);
            const data = { artist: result.rows };
            // respond with HTML page displaying all artists
            response.render('artisteditform', data);
        } else {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        }
    });
});

app.put('/artists/:id', (request, response) => {

    const queryString = "UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=" + request.params.id;

    const values = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(queryString, values, (errorObj) => {
        // errorObj is null if there's no error
        if (!errorObj) {

            const data = { artists: values };
            response.render('artistedited', data);
        } else {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        }
    });
});


//===================================
// DELETE AN ARTIST

app.get('/artists/:id/delete', (request, response) => {
    // query database for all artists
    const queryString = 'SELECT * FROM artists WHERE id=' + request.params.id;
    // response.send(queryString);
    pool.query(queryString, (errorObj, result) => {
        // console.log(errorObj, result);
        // errorObj is null if there's no error
        if (!errorObj) {

            // console.log('Query results: ', result.rows);
            const data = { artist: result.rows };
            // respond with HTML page displaying all artists
            response.render('artistdeleteform', data);
        } else {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        }
    });
});

app.delete('/artists/:id', (request, response) => {

    const queryString = "DELETE FROM artists WHERE id=" + request.params.id + " RETURNING *";

    pool.query(queryString, (errorObj, result) => {

        // errorObj is null if there's no error
        if (!errorObj) {
            const data = { artists: result.rows };
            response.render('artistdeleted', data);
        } else {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        }
    });
});


//===================================
//SHOW SELECTED ARTIST SONGS

app.get('/artists/:id/songs', (request, response) => {

    let artistIdInput = request.params.id;
    const queryString = 'SELECT * FROM songs WHERE artist_id=' + artistIdInput;

    pool.query(queryString, (errorObj, result) => {

        if (!errorObj) {
            const data = { songs: result.rows };
            response.render('songshow', data);
        } else {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        }
    });
});


//===================================
//CREATE NEW SONG FOR SELECTED ARTIST

//displaying the form to add new song to artist
app.get('/artists/:id/songs/new', (request, response) => {

    const queryString = 'SELECT * FROM artists WHERE id=' + request.params.id;

    pool.query(queryString, (errorObj, result) => {

        if (!errorObj) {
            const data = { artist: result.rows };
            response.render('songcreateform', data);
        } else {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        }
    });
});

app.post('/artists/:id/songs', (request, response) => {

    const queryString = 'INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';

    const values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, request.params.id];

    pool.query(queryString, values, (errorObj, result) => {
        if (!errorObj) {
            response.send(`New song "${values[0]}" created.`)
        } else {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        }
    });
});


//===================================
// LIST ALL PLAYLISTS

app.get('/playlist', (request, response) => {
    // query database for all artists
    const queryString = 'SELECT * FROM playlist ORDER BY id ASC';

    pool.query(queryString, (errorObj, result) => {
        // errorObj is null if there's no error
        if (!errorObj) {

            // console.log(result.rows);
            const data = { playlist: result.rows };
            // respond with HTML page displaying all artists
            response.render('playlistindex', data);
        } else {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        }
    });
});


//===================================
// CREATE PLAYLIST

//displaying the form to add new artist
app.get('/playlist/new', (request, response) => {
    // respond with HTML page with form to create new songs
    response.render('playlistcreateform');
});

//retrieving the form with user input
app.post('/playlist', (request, response) => {

    const queryString = 'INSERT INTO playlist (name) VALUES ($1) RETURNING *';

    const values = [request.body.name];

    pool.query(queryString, values, (errorObj, result) => {

        if (!errorObj) {
            // const data = { playlist : result.rows };
            response.send(`New Playlist "${result.rows[0].name}" created.`);
        } else {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        }
    });
});


//===================================
// SHOW SONGS IN PLAYLIST
app.get('/playlist/:id', (request, response) => {

    const playlistId = request.params.id;

    const queryString1 = `SELECT playlist_songs.playlist_id, songs.title FROM songs INNER JOIN playlist_songs ON (playlist_songs.song_id = songs.id) WHERE playlist_songs.playlist_id = ${playlistId}`;

    pool.query(queryString1, (errorObj, result1) => {
        // errorObj is null if there's no error
        if (errorObj) {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        } else {
            let data1 = result1.rows;

            const queryString2 = `SELECT * FROM playlist WHERE id = ${playlistId};`
            pool.query(queryString2, (errorObj, result2) => {
                if (errorObj) {
                    console.error('Query Error: ', errorObj.stack);
                    response.send('Query Error');
                } else {
                    let data2 = result2.rows;
                    let data = {songlist: data1, playlist: data2};
                    response.render('playlist_songs_index', data);
                }
            });
        }
    });
});

// ADD SONG TO PLAYLIST VIA SONG ID
app.post("/playlist/:id", (request, response) => {

    const playlistId = request.params.id;
    const queryString = "INSERT INTO playlist_songs (playlist_id, song_id) VALUES ($1, $2) RETURNING *";

    const values = [playlistId, request.body.songs_id];

    pool.query(queryString, values, (errorObj, result) => {
        if(errorObj) {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        } else {
            response.redirect("/playlist/" + playlistId);
        }
    })
});


//===================================
// REGISTER USER
app.get('/register', (request, response) => {
    response.render('registerform');
});

app.post('/register', (request, response) => {

    const hashPassword = sha256(request.body.password);
    const queryString = `INSERT INTO users (username, password) VALUES ($1, $2);`
    const values = [request.body.username, hashPassword];

    pool.query(queryString, values, (errObj, result) => {
        if (errObj) {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        } else {
            response.send('Account created!</br><a href="/login">Click here to login</a>');
        }
    })
});


//===================================
// USER LOGIN

app.get('/login', (request, response) => {
    // console.log(request.cookies);
    response.render('loginform');
});

//authenticate login request
app.post('/login', (request, response) => {

    const username = request.body.username;
    const hashPassword = sha256(request.body.password);

    const queryString = `SELECT * FROM users WHERE username = $1 AND password = $2`;
    const values = [username, hashPassword];

    pool.query(queryString, values, (errorObj, result) => {

        if (errorObj) {
            console.error('Query Error: ', errorObj.stack);
            response.send('Query Error');
        } else if ( result.rowCount === 1 ) {
            let loggedInCookie = sha256(username + SALT);

            response.cookie('loggedIn', loggedInCookie);

            response.send('You have now log on to the system!</br><a href="/artists">Click here for resources.</a>');
        } else {
            response.send('Login Failed');
        }
    })
});


/**
 * ===================================
 * Helper Function
 * ===================================
 */

//check if user has been logged in (has login cookies that match)
let isLoggedIn = function (request) {
    if (request.cookies === undefined) {
        return false;
    }

    let loggedInHash = sha256(request.cookies['username'] + SALT);

    if (request.cookies['loggedIn'] === loggedInHash) {
        return true;
    } else {
        return false;
    }
}


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