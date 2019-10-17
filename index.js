console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'jasminesis',
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
 * Routes
 * ===================================
 */
// show home page
const showHome = (request, response) => {
    response.render('home');
};

const showNewArtistForm = (request, response) => {
    // respond with HTML page with form to create new artist
    response.render('new');
};
const postNewArtist = (request, response) => {
    let input = request.body;
    let inputArr = [input.name, input.photo_url, input.nationality];
    console.log(inputArr);

    const queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *`
    pool.query(queryString, inputArr, (err, result) => {
        if (err) {
            console.log('query error: ', err.stack)
            response.send('query error');
        } else {
            console.log('query results: ', result);
            response.send(result.rows)
        }
    })
};
const showArtistByID = (request, response) => {
    let inputID = request.params.id;

    const queryString = `SELECT * FROM artists WHERE id=${inputID}`

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('query error: ', err.stack)
            response.send('query error');
        } else {
            console.log('query results: ', result);
            response.send(result.rows)
        }
    })
};

const showSongsByArtist = (request, response) => {
    let inputID = request.params.id;

    const queryString = `SELECT * FROM songs WHERE artist_id=${inputID}`

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('query error: ', err.stack)
            response.send('query error');
        } else {
            // console.log('query results: ', result);
            const data = {
                result: result.rows
            }
            console.log(data)
            response.render('showsongs', data)
        }
    })
};

const showPlaylists = (request, response) => {
    const queryString = `SELECT * FROM playlists ORDER BY id`

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('query error: ', err.stack)
            response.send('query error');
        } else {
            // console.log('query results: ', result);
            const data = {
                result: result.rows
            }
            console.log(data)
            response.render('showplaylists', data)
        }
    })
};

// shows all playlists

const showNewPlaylistForm = (request, response) => {
    // respond with HTML page with form to create new artist
    response.render('newplaylist');
};


const postNewPlaylist = (request, response) => {
    let input = request.body;
    let inputArr = [input.name];
    console.log(inputArr);

    const queryString = `INSERT INTO playlists (name) VALUES ($1) RETURNING *`
    pool.query(queryString, inputArr, (err, result) => {
        if (err) {
            console.log('query error: ', err.stack)
            response.send('query error');
        } else {
            console.log('query results: ', result);
            response.send(result.rows)
        }
    })
};
const addNewSongToPlaylist = (request, response) => {
    let inputID = request.params.id;

    const queryString = `SELECT * FROM songs WHERE id=${inputID}`

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('query error: ', err.stack)
            response.send('query error');
        } else {
            // console.log('query results: ', result);
            const data = {
                result: result.rows
            }
            console.log(data)
            response.render('addtoplaylist', data)
        }
    })
};
const postNewSongsToPlaylist = (request, response) => {
    let input = request.body;
    let inputArr = [input.id, input.playlist_id];
    console.log(inputArr);

    const queryString = `INSERT INTO playlist_songs (song_id, playlist_id) VALUES ($1, $2) RETURNING *`
    pool.query(queryString, inputArr, (err, result) => {
        if (err) {
            console.log('query error: ', err.stack)
            response.send('query error');
        } else {
            console.log('query results: ', result);
            response.send(result.rows)
        }
    })
}
const showPlaylistByID = (request, response) => {
    let inputID = parseInt(request.params.id);

    const queryString = "SELECT playlists.name, songs.title, playlists.id FROM playlist_songs INNER JOIN playlists ON playlist_songs.playlist_id = playlists.id INNER JOIN songs ON playlist_songs.playlist_id = songs.id;"

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('query error: ', err.stack)
            response.send('query error');
        } else {
            console.log('query results: ', result);
            const data = {
                result: result.rows,
                inputID: inputID
            }
            console.log(data)
            response.render('showoneplaylist', data)
        }
    })
};

/*==========================================
          Restful Routes
==========================================*/

app.get('/artists', showHome);
app.get('/artists/new', showNewArtistForm);
app.post('/artists', postNewArtist)
app.get('/artists/:id', showArtistByID)
app.get('/artists/:id/songs', showSongsByArtist)
app.get('/playlists', showPlaylists);
app.get('/playlists/new', showNewPlaylistForm);
app.post('/playlists', postNewPlaylist);
app.get('/playlists/:id/newsong', addNewSongToPlaylist)
app.post('/playlists/:id', postNewSongsToPlaylist)
app.get('/playlists/:id', showPlaylistByID)


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function () {

    console.log("closing");

    server.close(() => {

        console.log('Process terminated');

        pool.end(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);