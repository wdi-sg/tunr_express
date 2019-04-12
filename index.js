console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');
var sha256 = require('js-sha256');
const SALT = 'random';

// Initialise postgres client
const configs = {
  user: 'andyng',
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

app.use(cookieParser());

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);
//
app.use(express.static('public'));

/**
 * ===================================
 * Routes
 * ===================================
 */

// Show all artists
app.get(`/artist`, (request, response) => {
    // query database for all pokemon
    // After editing a data, it gets push to the bottom of the 'database'
    // we can sort them here by adding ORDER BY id**
    const queryString = "Select * FROM artists ORDER BY id";
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            // result.rows [{},{}]
            // const artistsArr = result.rows;
            // we then need to pass the arr into an obj?
            const data = {artists : result.rows};
            response.render(`index`, data);
        }
    })
});

// Renders a form for 'creating' new artist
// ** This route should be before the show route. As they have similar link /artist/new fits /artist/:id
app.get('/artist/new', (request, response) => {
    response.render('new');
})

// POST Route
app.post('/artist', (request, response) => {
    const newArtist = request.body; // {}
    const queryString = `INSERT INTO artists
    (name, photo_url, nationality)
    VALUES
    ('${newArtist.name}', '${newArtist["photo_url"]}', '${newArtist.nationality}') RETURNING *`;
    // console.log(queryString);
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            // result.rows [{}]
            const index = result.rows[0].id;
            response.redirect(`/artist/${index}`);
        }
    })
})

// Show a particular artist
app.get('/artist/:id', (request, response) => {
    const reqId = parseFloat(request.params.id);
    const queryString = `SELECT * FROM artists WHERE id = ${reqId}`;
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            // result.rows is always an arr even if it's only 1 'result'
            const data = {artist : result.rows};
            response.render('show', data);
        }
    })
});

// Render a form for editing
app.get('/artist/:id/edit', (request, response) => {
    const reqId = parseFloat(request.params.id);
    const queryString = `SELECT * FROM artists WHERE id = ${reqId}`;
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            // result.rows is always an arr even if it's only 1 'result'
            const data = {artist : result.rows};
            response.render('edit', data);
        }
    })
})

// Put route..
app.put('/artist/:id', (request, response) => {
    const reqId = parseFloat(request.params.id);
    const editedObj = request.body; // {} is from the edit form
    // console.log(editedObj);
    // We need to update =_=
    const queryString = `UPDATE artists SET name='${editedObj.name}', photo_url='${editedObj["photo_url"]}', nationality='${editedObj.nationality}' WHERE id = ${reqId}`;
    // console.log(queryString);
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            // result.rows [{}]
            // even though the order inside the 'database' get messed up after edit
            // referencing reqId will always bring us to the edited artist(in this case)
            response.redirect(`/artist/${reqId}`);
        }
    })
})

// Delete route
// Note: in pratice you will hardly ever delete anything, but mostly set a boolean 'valid' or something similar.
app.delete('/artist/:id', (request, response) => {
    const reqId = parseFloat(request.params.id);
    const queryString = `DELETE from artists WHERE id = ${reqId}`;
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            // result.rows [{}]
            // even though the order inside the 'database' get messed up after edit
            // referencing reqId will always bring us to the edited artist(in this case)
            response.redirect(`/artist`);
        }
    })
})

// Show all songs from an artist
app.get('/artist/:id/songs', (request, response) => {
    const reqId = request.params.id;
    const queryString = `Select * FROM songs WHERE artist_id = '${reqId}'`;
    console.log("This is the queryString: "+queryString);
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            // result.rows [{},{}]**
            // we then need to pass the arr into an obj?
            const data = {songs : result.rows};
            response.render('songs', data);
        }
    })
});

// Renders a form to upload new song to the site
app.get('/artist/:id/songs/new', (request, response) => {
    // Do we actually need reqId?
    const reqId = parseFloat(request.params.id);
    const data = {id : reqId};
    response.render('new-song', data);
});

// POST Route
app.post('/artist/:id/songs', (request, response) => {
    // request.body {}
    // reqId is also the artist_id / artist.id
    const reqId = parseFloat(request.params.id);
    const newSong = request.body; // {}
    // INSERT new song in relation to artist_id
    const queryString = `INSERT INTO songs
    (title, album, preview_link, artwork, artist_id)
    VALUES
    ('${newSong.title}', '${newSong.album}', '${newSong["preview_link"]}', '${newSong.artwork}', '${reqId}') RETURNING *`;
    // console.log(`queryString: ${queryString}`);
    // console.log(`*****************************************************************`);
    // console.log(`reqId: ${reqId}`);
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            // result.rows [{}]**
            // const index = result.rows[0]["artist_id"];
            // Re-direct to show all songs from that particular artist..
            response.redirect(`/artist/${reqId}/songs`);
        }
    })
})

// List all playlists
app.get("/playlist", (requests, response) => {
    const queryString = `SELECT * FROM playlist`;
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            // result.rows [{},{}]
            const data = {playlists : result.rows}
            response.render(`playlist-index`, data);
        }
    })
})

app.get(`/register`, (request, response) => {
    response.render(`register`);
})

app.post(`/register`, (request, response) => {
  // console.log( request.body ); {}
  const hash = sha256(request.body.password + SALT);
  const query = `INSERT INTO users (name, password) VALUES ($1, $2)`;
  const values = [request.body.name, hash];
  // [{}, hash]
  pool.query(query, values, (err, result) => {
    if( err ){
      console.log( "ERROR");
      console.log( err );
    }
    console.log("query done");
    response.redirect(`index`);
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
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);