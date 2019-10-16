console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'SYNG',
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
 * Part 1 Artists
 * ===================================
 */

app.get('/', (request, response) => {
  // query database for all artists
  // respond with HTML page displaying all artists
  response.send('Hello World');
  //response.render('home');
});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new artists
  response.render('new');
});

app.post('/artists/new', (request, response) => {
    // INSERT new artist into artists db
    console.log("Adding artist:");
    console.log(request.body);
    let newArtist = [ request.body.name, request.body.photo_url, request.body.nationality ];

    let queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES($1, $2, $3) RETURNING *';

    pool.query(queryText, newArtist, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        let artist = result.rows[0];
        response.render('artist', artist);
    });
});

app.get('/artists/:id', (request, response) => {
    // SELECT artist from artists db
    let id = request.params.id;
    console.log("Getting artist id: " + id);

    let queryText = `SELECT * FROM artists WHERE id=${id}`;

    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        let artist = result.rows[0];
        response.render('artist', artist);
    });
});

app.get('/artists/:id/edit', (request, response) => {
    // SELECT artist from artists db
    let id = request.params.id;
    console.log("Editing artist id: " + id);

    let queryText = `SELECT * FROM artists WHERE id=${id}`;

    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        let artist = result.rows[0];
        console.log(artist);
        response.render('edit', artist);
    });
});

app.put('/artists/:id', (request, response) => {
    // SELECT artist from artists db
    let id = request.params.id;
    console.log("Updating artist id: " + id);
    console.log(request.body);
    let editArtist = [ request.body.name, request.body.photo_url, request.body.nationality, id];

    let queryText = `UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4 RETURNING *`;

    pool.query(queryText, editArtist, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        let artist = result.rows[0];
        response.render('artist', artist);
    });
})

app.delete('/artists/:id', (request, response) => {
    // SELECT artist from artists db
    let id = request.params.id;
    console.log("Deleting artist id: " + id);

    let queryText = `DELETE FROM artists WHERE id=${id} RETURNING *`;
    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        console.log("Deleted: " + result.rows[0]);
        let home = '<a href="http://localhost:3000/artists" alt="home">Back to Homepage</a>'
        response.send(home);
    });
})

app.get('/artists/:id/songs', (request, response) => {
    //SELECT songs for artist from songs db
    let artist_id = request.params.id;
    console.log("Getting songs for artist id: " + artist_id);

    let queryText = `SELECT * FROM songs WHERE artist_id=${artist_id}`;

    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        let songs = result.rows
        response.send(songs);
    });
});

app.get('/artists', (request, response) => {
    // display all artists from artists db
    let queryText = "SELECT * FROM artists ORDER BY name";

    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        //response.send(result.rows);
        let data = {};
        data.artists = result.rows;
        response.render('home', data);
    });
});

/**
 * ===================================
 * Part 2 Playlists
 * ===================================
 */

app.get('/playlists/new', (request, response) => {
  // respond with HTML page with form to create new playlist
  response.render('newlist');
});

app.post('/playlists/new', (request, response) => {
    // INSERT new playlist into playlist db
    console.log("Adding playlist:")
    console.log(request.body);
    let newList = [ request.body.name ];

    let queryText = 'INSERT INTO playlists (name) VALUES($1) RETURNING *';

    pool.query(queryText, newList, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        let list = result.rows[0];
        response.render('list', list);
    });
});

app.get('/playlists/:id', (request, response) => {
    // SELECT playlist from playlists db
    let id = request.params.id;
    console.log("Getting playlist id: " + id);

    let queryText = `SELECT * FROM playlists WHERE id=${id}`;

    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        let list = result.rows[0];
        response.render('list', list);
    });
});

app.get('/playlists/:id/newsong', (request, response) => {
    // respond with HTML page with form to add new song to playlist
    console.log("Adding to playlist id: " + request.params.id);
    response.render('newlistsong', request.params);
});

app.post('/playlists/:id/newsong', (request, response) => {
    // INSERT song_id into playlist_song db
    let song_id = request.body.song_id;
    let playlist_id = request.params.id;
    console.log("Inserting to playlist id: " + playlist_id);

    let addSong = [ song_id, playlist_id ];
    let queryText = `INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2) RETURNING *`;

    pool.query(queryText, addSong, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        console.log(result.rows[0]);
        response.redirect('/playlists/'+playlist_id);
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){
  console.log("closing");
  server.close(() => {
    console.log('Process terminated');
    pool.end( () => console.log('Shut down db connection pool'));
  });
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);