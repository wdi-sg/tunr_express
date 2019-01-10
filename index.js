console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432
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

app.use(express.static(__dirname+'/public/'));
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

// RESTful Routing
// URL          HTTP Verb   Action      SQL
// /photo/      GET         index       SELECT
// /photos/new  GET         new         N/A (SELECT)
// /photos      POST        create      INSERT
// /photos/:id  GET         show        SELECT
// /photos/:id/ edit        GET edit    SELECT
// /photos/:id  PATCH/PUT   update      UPDATE
// /photos/:id  DELETE      destroy     DELETE

app.get('/', (request, response) => {
  response.send('Hello World');
});


//Build the index feature for artists
app.get('/artists/', (request, response) => {
    pool.query('SELECT * FROM artists ORDER by id ASC;',(err,queryResult) => {
        if (err) {
            console.log('query error', err.message);
        } else {
            const artists = queryResult;
            response.render('artists', artists);
        }
    })
})


//Build a feature that creates a new artist in the database.
app.get('/artists/new', (request, response) => {
    response.render('artistNew');
});

app.post('/artists', (request, response) => {
    let text = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id;';
    let values = [];
    values.push(request.body.name);
    values.push(request.body.photo_url);
    values.push(request.body.nationality);
    pool.query(text, values,(err,queryResult) => {
        if (err) {
            console.log('query error', err.message);
        } else {

            const newID = queryResult.rows[0].id;
            console.log(newID);
            response.redirect('/artists/'+newID);
        }
    })
});


//Build the show feature for an artist
app.get('/artists/:id', (request, response) => {
    let id = request.params.id;
    pool.query('SELECT * FROM artists WHERE id ='+id,(err,queryResult) => {
        if (err) {
            console.log('query error', err.message);
        } else {
            const artists = queryResult.rows[0];
            response.render('artistByID', artists);
        }
    })
});


// Build a feature that allows a user to edit an existing artist in the database
app.get('/artists/:id/edit', (request, response) => {
    let id = request.params.id;
    pool.query('SELECT * FROM artists WHERE id ='+id,(err,queryResult) => {
        if (err) {
            console.log('query error', err.message);
        } else {
            const artist = queryResult.rows[0];
            response.render('artistEdit', {'artist': artist});
        }
    })
});


app.put('/artists/:id/put', (request, response) => {
    let id = request.params.id;
    let text = 'UPDATE artists SET name = $1, nationality = $2, photo_url = $3 WHERE id ='+id;
    let values = [request.body.name, request.body.nationality, request.body.photo_url];
    pool.query(text, values, (err,queryResult) => {
        if (err) {
            console.log('query error', err.message);
        } else {
            const artist = queryResult.rows[0];
            response.redirect('/artists/' + id);
        }
    })
})


//Build a feature that allows users to delete an existing artist from the database.
app.delete('/artists/:id/delete', (request, response) => {
    let id = request.params.id;
    pool.query('DELETE from artists WHERE id ='+id,(err,queryResult) => {
        if (err) {
            console.log('query error', err.message);
        } else {
            response.redirect('/artists/');
        }
    })
});


//create the 7 RESTful Routes for songs


// GET /artist/1/songs This page displays a list of songs for this artist
app.get('/artists/:id/songs', (request, response) => {
    let id = request.params.id;
    let text = 'SELECT songs.* FROM artists LEFT JOIN songs ON artists.id = songs.artist_id WHERE artists.id = '+id;
    pool.query(text, (err,queryResult) => {
        if (err) {
            console.log('query error', err.message);
        } else {
            const songs = queryResult.rows;
            let obj = {
            'songList': songs,
            'id': id}
            response.render("songsByArtists", {'songList': songs});
        }
    })
});


// GET /artist/1/songs/new This page renders a form to create a new song.
// The action of the form can be set to send the appropriate artist id needed to create the song.
// POST /artist/1/songs This route creates a new song with the appropriate artist.
app.get('/artists/:id/songs/new', (request, response) => {
    let id = request.params.id;
    response.render('songNewByArtist', {'id': id});
})

app.post('/artists/:id/songs/new', (request, response) => {
       console.log(request.body.artist_id)
    let text = 'INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
   let values = [];
    values.push(request.body.title);
    values.push(request.body.album);
    values.push(request.body.preview_link);
    values.push(request.body.artwork);
    values.push(request.body.artist_id);
    pool.query(text, values,(err,queryResult) => {
        if (err) {
            console.log('query error', err.message);
        } else {
            response.redirect('/artists/'+request.body.artist_id/songs);
        }
    })
});


// Further: Playlist
// Add the ability to put songs in a playlist.

// Add a table for playlist

// Playlist song data is a join table between a playlist and songs. (each record in the join table records the adding of one song to the playlist)

// /playlist - list all the playlists /playlist/new - render the form to create a new playlist /playlist/:id - show all the song titles inside this playlist

// Further
// For the form at /songs/new, add a dropdown of artists to select from when creating a new song.

// Further: Playlist
// Restrict the user from adding a song to a playlist twice.

// Further
// Add a button to each song in the lists of songs ( /songs, /artist/:id/songs ) that goes to a new page.

// This page will have a list of playlists. Let the user add the song to any playlist.

// sub-futher: If a playlist already has the song in it, then don't render that playlist in the list.

// Further
// Add the ability for the user to add the song to multiple playlists at once. ( this is a checkbox form input )

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
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
