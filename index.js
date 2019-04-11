const pg = require('pg');
const express = require('express');
const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override');

// Initialise postgres client
const configs = {
    user: 'chuasweechin',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
};

const SSALT =  '&SHD%G#&BCJKDJ(ASUD*&TYAS^V#BTFYDASG%gfs5gsf520yga4evgh2!';
const PWSALT = '9UY&u3h7%adghf54Radnsuyg62312i8y6312bhdsnbahg67T%2^Q!sas?';

const pool = new pg.Pool(configs);

pool.on('error', function (e) {
    console.log('idle client error', e.message, e.stack);
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

app.use(cookieParser());
app.use(methodOverride('_method'));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Helper Function
 * ===================================
 */

let checkForLogin = function (request) {
    if (request.cookies === undefined) {
        return false;
    }

    let loggedInHash = sha256(request.cookies['username'] + SSALT);

    if( request.cookies['loggedIn'] === loggedInHash) {
        return true;
    } else {
        return false;
    }
}


/**
 * ===================================
 * Function
 * ===================================
 */
let getArtistsRequestHandler = async function (request, response) {
    try {
        if (checkForLogin(request) === true){
            const sqlQuery = `SELECT * FROM artists`;

            const artistResult = await pool.query(sqlQuery);
            response.send(artistResult.rows);

        } else {
            response.send('Unauthorized!');
        }
    } catch(e) {
        console.log(e);
    }
}

let getArtistSongListRequestHandler = async function (request, response) {
    try {
        const values2 = [request.params.id];
        const sqlQuery2 = `SELECT * FROM songs
                           WHERE artist_id = $1`;

        const songsResult = await pool.query(sqlQuery2, values2);

        response.send(songsResult.rows);

    } catch(e) {
        console.log(e);
    }
}

let newArtistRequestHandler = async function (request, response) {
    response.render('addArtist');
}

let addNewArtistRequestHandler = async function (request, response) {
    try {
        const values = [request.body.name, request.body.photo_url, request.body.nationality];
        const sqlQuery = `INSERT INTO artists (name, photo_url, nationality)
                          VALUES ($1, $2, $3) RETURNING *`;

        const artistResult = await pool.query(sqlQuery, values);
        response.send(artistResult.rows[0]);

    } catch(e) {
        console.log("addNewArtistRequestHandler:" + e);
    }
}

let editArtistRequestHandler = async function (request, response) {
   try {
        const values = [request.params.id];
        const sqlQuery = `SELECT * FROM artists
                          WHERE id= $1`;

        const artistResult = await pool.query(sqlQuery, values);
        const data = {  'artist' : artistResult.rows[0] };

        response.render('editArtist', data);

    } catch(e) {
        console.log(e);
    }
}

let editExistingArtistRequestHandler = async function (request, response) {
    try {
        const values = [request.body.name, request.body.photo_url, request.body.nationality, request.params.id];
        const sqlQuery = `UPDATE artists
                          SET name = $1, photo_url = $2, nationality = $3
                          WHERE id = $4 RETURNING *`;

        const artistResult = await pool.query(sqlQuery, values);
        response.send(artistResult.rows[0]);

    } catch(e) {
        console.log("addNewArtistRequestHandler:" + e);
    }
}

let deleteArtistRequestHandler = async function (request, response) {
   try {
        const values = [request.params.id];
        const sqlQuery = `SELECT * FROM artists
                          WHERE id= $1`;

        const artistResult = await pool.query(sqlQuery, values);
        const data = {  'artist' : artistResult.rows[0] };

        response.render('deleteArtist', data);

    } catch(e) {
        console.log(e);
    }
}

let deleteExistingArtistRequestHandler = async function (request, response) {
    try {
        const values = [request.params.id];
        const sqlQuery = `DELETE FROM artists
                          WHERE id = $1`;

        const artistResult = await pool.query(sqlQuery, values);
        response.send("deleted!");

    } catch(e) {
        console.log("addNewArtistRequestHandler:" + e);
    }
}

let getArtistByIdRequestHandler = async function (request, response) {
    try {
        const values = [request.params.id];
        const sqlQuery = `SELECT * FROM artists
                          WHERE id = $1`;

        const artistResult = await pool.query(sqlQuery, values);
        response.send(artistResult.rows);

    } catch(e) {
        console.log(e);
    }
}

let newArtistSongRequestHandler = async function (request, response) {
   try {
        const values = [request.params.id];
        const sqlQuery = `SELECT * FROM artists
                          WHERE id= $1`;

        const artistResult = await pool.query(sqlQuery, values);
        const data = {  'artist' : artistResult.rows[0] };

        response.render('addSong', data);

    } catch(e) {
        console.log(e);
    }
}

let addNewArtistSongRequestHandler = async function (request, response) {
    try {
        const values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, request.body.artist_id];
        const sqlQuery = `INSERT INTO songs (title, album, preview_link, artwork, artist_id)
                          VALUES ($1, $2, $3, $4, $5) RETURNING *`;

        const artistResult = await pool.query(sqlQuery, values);
        response.send(artistResult.rows[0]);

    } catch(e) {
        console.log("addNewArtistRequestHandler:" + e);
    }
}

let getPlaylistRequestHandler = async function (request, response) {
    try {
        const sqlQuery = `SELECT * FROM playlists`;

        const playlistResult = await pool.query(sqlQuery);
        response.send(playlistResult.rows);

    } catch(e) {
        console.log(e);
    }
}

let newPlaylistRequestHandler = async function (request, response) {
    try {
        const sqlQuery = `SELECT * FROM songs`;

        const songResult = await pool.query(sqlQuery);
        const data = {  'songs' : songResult.rows };

        response.render('addPlaylist', data);

    } catch(e) {
        console.log(e);
    }
}

let addNewPlaylistRequestHandler = async function (request, response) {
    try {
        const values = [request.body.name];
        const playlistSqlQuery = `INSERT INTO playlists (name) VALUES ($1) RETURNING id`;
        const playlistResult = await pool.query(playlistSqlQuery, values);

        let songSqlQuery = `INSERT INTO playlist_songs (playlist_id, song_id) VALUES `;

        request.body.songs.forEach((song, index) => {
            songSqlQuery += `(${ playlistResult.rows[0].id }, ${ song }),`;
        });

        // final step to remove a comma to complete the query string
        songSqlQuery= songSqlQueryTBC.slice(0, -1);

        await pool.query(songSqlQuery);

        response.send("Added new Playlist!");

    } catch(e) {
        console.log(e);
    }
}

let getPlaylistByIdRequestHandler = async function (request, response) {
    try {
        const values = [request.params.id];
        const sqlQuery = `SELECT s.id, s.title, s.album FROM playlist_songs ps
                          INNER JOIN songs s ON (s.id = ps.song_id)
                          WHERE ps.playlist_id = $1 `;

        const playlistResult = await pool.query(sqlQuery, values);
        response.send(playlistResult.rows);

    } catch(e) {
        console.log(e);
    }
}

let registerRequestHandler = async function (request, response) {
    response.render('register');
}

let registerAccountRequestHandler = async function (request, response) {
    try {
        const passwordHash = sha256(request.body.password + PWSALT);

        const values = [request.body.name, passwordHash];
        const sqlQuery = `INSERT INTO users (name, password)
                          VALUES ($1, $2)`;

        const result = await pool.query(sqlQuery, values);
        response.send('Account created!</br><a href="/login">click here to login</a>');

    } catch(e) {
        console.log("addNewArtistRequestHandler:" + e);
    }
}

let loginRequestHandler = async function (request, response) {
    response.render('login');
}

let authenticateRequestHandler = async function (request, response) {
    try {
        const username = request.body.name;
        const passwordHash = sha256(request.body.password + PWSALT);

        const values = [username, passwordHash];
        const sqlQuery = `SELECT * FROM users WHERE name= $1 AND password= $2`;

        const result = await pool.query(sqlQuery, values);

        if (result.rows.length === 1) {
            const loggedInHash = sha256(username + SSALT);

            response.cookie('username', username);
            response.cookie('loggedIn', loggedInHash);

            response.send('You have now log on to the system!</br><a href="/artists">click here for resources</a>');

        } else {
            response.send('Login Failure');

        }
    } catch(e) {
        console.log(e);
    }
}

/**
 * ===================================
 * Artists Routes
 * ===================================
 */
app.get('/artists', getArtistsRequestHandler);
app.get('/artists/:id/songs', getArtistSongListRequestHandler);

app.get('/artists/new', newArtistRequestHandler);
app.post('/artists', addNewArtistRequestHandler);

app.get('/artists/:id/edit', editArtistRequestHandler);
app.put('/artists/:id', editExistingArtistRequestHandler);

app.get('/artists/:id/delete', deleteArtistRequestHandler);
app.delete('/artists/:id', deleteExistingArtistRequestHandler);

app.get('/artists/:id', getArtistByIdRequestHandler);


/**
 * ===================================
 * Songs Routes
 * ===================================
 */
app.get('/artists/:id/songs/new', newArtistSongRequestHandler);
app.post('/artists/:id/songs', addNewArtistSongRequestHandler);


/**
 * ===================================
 * Playlist Routes
 * ===================================
 */
app.get('/playlist', getPlaylistRequestHandler);

app.get('/playlist/new', newPlaylistRequestHandler);
app.post('/playlist', addNewPlaylistRequestHandler);

app.get('/playlist/:id', getPlaylistByIdRequestHandler);


/**
 * ===================================
 * User Account Routes
 * ===================================
 */
app.get('/register', registerRequestHandler);
app.post('/register', registerAccountRequestHandler);

app.get('/login', loginRequestHandler);
app.post('/login', authenticateRequestHandler);


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function() {
    console.log("closing off server process...");

    server.close(() => {
        console.log('server process terminated....');
        pool.end(() => console.log('Shut down db connection pool'));
    });
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);