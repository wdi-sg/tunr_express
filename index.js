console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
    password: 'postgres'
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
app.use(express.static(__dirname + '/public/'));

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

app.get('/', (request, response) => {
    response.redirect('/artists/');
})

app.get('/songs/', (request, response) => {
    const queryString = 'SELECT * FROM songs ORDER BY id'
    pool.query(queryString, (err, result) => {
        if (err) {
          console.error('query error:', err.stack);
          response.send( 'query error' );
        } else {
          // redirect to home page
          response.render('songs', {'songs': result.rows});
        }
      });
});

app.get('/artists/', (request, response) => {
    const queryString = 'SELECT * FROM artists ORDER BY id'
    pool.query(queryString, (err, result) => {
        if (err) {
          console.error('query error:', err.stack);
          response.send( 'query error' );
        } else {
          // redirect to home page
          response.render('artists', {'artists': result.rows});
        }
      });
});

app.get('/artists/new', (request, response) => {
    response.render('new');
});

app.get('/artists/:id', (request, response) => {
    const queryString = `SELECT * FROM artists WHERE id=${request.params.id}`
    pool.query(queryString, (err, result) => {
        err ? console.error(err.stack) : null;
        response.render('artist', {'artist': result.rows[0]});
    });
});

app.get('/songs/:id', (request, response) => {
    const queryString = `SELECT * FROM songs WHERE id=${request.params.id}`
    pool.query(queryString, (err, result) => {
        err ? console.error(err.stack) : null;
        response.render('song', {'song': result.rows[0]});
    });
});

app.get('/songs/:id/add', (request, response) => {
    const queryString = 'SELECT * FROM playlist';
    pool.query(queryString, (err, result)=>{
        err ? console.error(err.stack) : null;
        response.render('playlistAdd', {'playlist': result.rows, 'songID': request.params.id});
    })
});

app.post('/playlist/add/:id', (request, response) => {
    let playlistID = request.body.playlistID;
    let songID = request.params.id;
    let queryString = 'INSERT INTO playlistedsongs (playlist_id, song_id) VALUES ($1, $2)';
    let values = [playlistID, songID];
    pool.query(queryString, values, (err, result) => {
        err ? console.error(err.stack) : null;
        response.redirect('/');
    })
});

app.delete('/artists/:id/delete', (request, response) => {
    const queryString = `DELETE FROM artists WHERE id=$1`;
    let values = [request.params.id];
    pool.query(queryString, values, (err, result) => {
        err ? console.error(err.stack) : null;
        response.redirect('/artists/');
    })
});

app.get('/artists/:id/edit', (request, response) => {
    const queryString = `SELECT * FROM artists WHERE id=${request.params.id}`
    pool.query(queryString, (err, result) => {
        err ? console.error(err.stack) : null;
        response.render('edit', {'artist': result.rows[0]});
    });
});

app.post('/artists/new', (request, response) => {
    let submitted = request.body;
    let values = [submitted.name, submitted.photo_url, submitted.nationality];
    const queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)`;

    pool.query(queryString, values, (err, result) => {
        err ? console.error(err.stack) : null;
        response.redirect('/');
    });
});

app.put('/artists/:id/put', (request, response) => {
    const queryString = `UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4`;
    let values = [request.body.name, request.body.photo_url, request.body.nationality, request.params.id]
    pool.query(queryString, values, (err, result) => {
        err ? console.error(err.stack) : null;
        response.redirect('/artists/' + request.params.id);
    });
});

app.get('/artists/:id/songs', (request, response) => {  
    const queryString = `SELECT * FROM songs WHERE artist_id=$1`;
    const values = [request.params.id];
    pool.query(queryString, values, (err, result)=>{
        err ? console.error(err.stack) : null;
        response.render('artistSongs', {'songs': result.rows, 'id': request.params.id})
    })
});

app.get('/artists/:id/songs/new', (request, response) => {
    response.render('newSong', {'id': request.params.id});
})

app.post('/artists/:id/songs/new',(request, response) => {
    let info = request.body;
    const queryString = 'INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5)';
    const values = [info.title, info.album, info.preview_link, info.artwork, request.params.id];
    pool.query(queryString, values, (err, result)=>{
        err ? console.error(err.stack) : null;
        response.redirect('/artists/' + request.params.id + '/songs');
    })
})

app.get('/playlist', (request, response) => {
    const queryString = 'SELECT * FROM playlist';
    pool.query(queryString, (err, result)=>{
        err ? console.error(err.stack) : null;
        response.render('playlist', {'playlist': result.rows});
    })
});

app.get('/playlist/:id', (request, response) => {

    const queryString = 'SELECT * FROM songs INNER JOIN playlistedsongs ON (song_id = id) WHERE playlist_id = $1';
    const values = [request.params.id];

    pool.query(queryString, values, (err, result)=>{
        err ? console.error(err.stack) : null;
        response.render('songs', {'songs':result.rows});
    })

});

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