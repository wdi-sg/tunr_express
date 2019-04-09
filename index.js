const pg = require('pg');
const express = require('express');
const methodOverride = require('method-override');

// Initialise postgres client
const configs = {
    user: 'chuasweechin',
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
 * Function
 * ===================================
 */
let getArtistsRequestHandler = async function (request, response) {
    try {
        const sqlQuery = `SELECT * FROM artists`;

        const result = await pool.query(sqlQuery);
        response.send(result.rows);

    } catch(e) {
        console.log(e);
    }
}

let getArtistSongListRequestHandler = async function (request, response) {
    try {
        const values1 = [request.params.id];
        const sqlQuery1 = `SELECT * FROM artists
                           WHERE id = $1`;

        const artistResult = await pool.query(sqlQuery1, values1);

        const values2 = [artistResult.rows[0].id];
        const sqlQuery2 = `SELECT * FROM songs
                           WHERE artist_id = $1`;

        const songsResult = await pool.query(sqlQuery2, values2);

        response.send(songsResult.rows);

    } catch(e) {
        console.log(e);
    }
}

let newArtistRequestHandler = function (request, response) {
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
        const data = {  artist : artistResult.rows[0] };

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
        const data = {  artist : artistResult.rows[0] };

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
        const data = {  artist : artistResult.rows[0] };

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


/**
 * ===================================
 * Routes
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

app.get('/artists/:id/songs/new', newArtistSongRequestHandler);
app.post('/artists/:id/songs', addNewArtistSongRequestHandler);

app.get('/artists/:id', getArtistByIdRequestHandler);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000);

let onClose = async function() {
    console.log("closing off server process...");

    server.close(() => {
        console.log('server process terminated....');
        pool.end(() => console.log('Shut down db connection pool'));
    });
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);