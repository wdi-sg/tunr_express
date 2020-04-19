const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'rachelik',
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

const express = require('express');

// Init express app
const app = express();

// tell app to use module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// For PUT or DELETE
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


// Sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
//tells express where to look for the view files
app.set('views', __dirname + '/views');
// sets react to be the default view engine
app.set('view engine', 'jsx');

/**
 * ===================================
 * Routes
 * ===================================
 */

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//ALL VARIABLES
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// '/artists'
// GET
// - allArtistsQ (All artists data query)
// - allArtistsResult (All artists data)
// POST
// - newArtistProfile
// - newArtistValues
// - newArtistId
//---------------------------------
// '/artists/:id'
// - artistProfile
// - artistProfileResult
//---------------------------------
// '/artists/:id/edit'
// - editArtistProfile
// - editArtistProfileErr
// - editArtistProfileResult
//---------------------------------
// app.delete
// - deleteArtist
// - deleteArtistErr
//---------------------------------

// '/' MAIN (HOME PAGE)
//jsx: home

//------------------------------------------------------
// INDEX. List out all ARTIST in HTML.
// - DONE (to artists.jsx) -
//------------------------------------------------------
app.get('/artists', (req, res) => {
    // query database for all artists
    const allArtistsQ = 'SELECT * from artists';
    const whenQueryDone = (queryError, allArtistsResult) => {
        if (queryError) {
            console.log(queryError);
            res.status(500);
            res.send('db error');
        } else {
            res.render('artists', allArtistsResult);
        }
    }
    pool.query(allArtistsQ, whenQueryDone);
});

//------------------------------------------------------
// INDEX. List out all SONGS in HTML.
// - DONE (to songs.jsx) -
//------------------------------------------------------
app.get('/songs', (req, res) => {
    // query database for all artists
    const allSongsQ = 'SELECT * from songs';
    const whenQueryDone = (queryError, allSongsResult) => {
        if (queryError) {
            console.log(queryError);
            res.status(500);
            res.send('db error');
        } else {
            res.render('songs', allSongsResult);
        }
    }
    pool.query(allSongsQ, whenQueryDone);
});

//------------------------------------------------------
// FORM to get user input for NEW ARTIST
// - DONE (to new-artist.jsx) -
//------------------------------------------------------
app.get('/artists/new', (req, res) => {
    //FORM to add new artists
    res.render('new-artist')
});

//------------------------------------------------------
// FORM to get user input for NEW ARTIST
// - DONE -
//------------------------------------------------------
app.get('/songs/new', (req, res) => {
    //FORM to add new song
    const allArtistsQ = 'SELECT * FROM artists';
    const whenQueryDone = (allArtistsQErr, allArtistsQResult) => {
        if (allArtistsQErr) {
            console.log(allArtistsQErr);
            response.status(500);
            response.send('new songs db error');
        } else {
            console.log(allArtistsQResult)
            res.render('new-song', allArtistsQResult);
        };
    };
    pool.query(allArtistsQ, whenQueryDone);
});




//------------------------------------------------------
// SHOW ARTIST by ID
// - DONE (to show-artist.jsx) -
//------------------------------------------------------
app.get('/artists/:id', (req, res) => {
    const artistProfile = 'SELECT * FROM artists WHERE id ='+req.params.id;
    pool.query(artistProfile, (artistProfileErr, artistProfileResult) => {
        if (artistProfileErr) {
            console.log(artistProfileErr);
            res.status(500);
            res.send('ERR');
        } else {
            // console.log('query result:', artistProfileResult);
            res.render('show-artist', artistProfileResult);
        };
    });
});

//------------------------------------------------------
// SHOW SONG by ID
// - DONE (to show-song.jsx) -
//------------------------------------------------------
app.get('/songs/:id', (req, res) => {
    const songProfile = 'SELECT * FROM songs WHERE id ='+req.params.id;
    pool.query(songProfile, (songProfileErr, songProfileResult) => {
        if (songProfileErr) {
            console.log(songProfileErr);
            res.status(500);
            res.send('ERR');
        } else {
            // console.log('query result:', songProfileResult);
            res.render('show-song', songProfileResult);
        };
    });
});


//------------------------------------------------------
// Save NEW ARTIST from user input
// - DONE (from new-artist.jsx redirect to /artists/:id) -
//------------------------------------------------------
app.post('/artists', (req, res) => {
    // console.log(req.body);
    const whenQueryDone = (queryError, newArtistResult) => {
        if (queryError) {
            res.status(500);
            res.send('db error');
        } else {
            let newArtistId = newArtistResult.rows[0].id;
            // console.log(newArtistId);
            res.redirect('/artists/'+newArtistId);
        };
    };
    const newArtistProfile = "INSERT INTO artists (name, photo_url, nationality) values ($1, $2, $3) RETURNING *";
    const newArtistValues = [req.body.name, req.body.photo_url, req.body.nationality];
    pool.query(newArtistProfile, newArtistValues, whenQueryDone);
});


//------------------------------------------------------
// SAVE NEW SONG from user input
// - DONE  -
//------------------------------------------------------
app.post('/songs', (req, res) => {
    const whenQueryDone = (newSongError, newSongResult) => {
        if (newSongError) {
            res.status(500);
            res.send('new song db error');
        } else {
            let newSongId = newSongResult.rows[0].id;
            res.redirect('/songs/'+newSongId);
        }
    }
    const newSongProfile = "INSERT INTO songs (title, album, preview_link, artwork, artist_id) values ($1, $2, $3, $4, $5) RETURNING *";
    const newSongValues = [req.body.title, req.body.album, req.body.preview_link, req.body.artwork, req.body.artist_id];
    pool.query(newSongProfile, newSongValues, whenQueryDone);
});

//------------------------------------------------------
// Display songs by artists id
// - DONE -
//------------------------------------------------------
app.get('/artists/:id/songs', (req, res) => {
    const artistProfile = 'SELECT * FROM artists WHERE id ='+req.params.id;
    pool.query(artistProfile, (artistProfileErr, artistProfileResult) => {
        if (artistProfileErr) {
            console.log(artistProfileErr);
            res.status(500);
            res.send('ERR');
        } else {
                const artistSongs = "SELECT * FROM songs WHERE artist_id ="+req.params.id;
                console.log(artistSongs);
                pool.query(artistSongs, (artistSongsErr, artistSongsResult) => {
                    if (artistSongsErr) {
                        res.status(500);
                        res.send('show songs err');
                    } else {
                        const artistSongsData = {
                            artist: artistProfileResult,
                            songs: artistSongsResult
                        }
                        res.render('artist-songs', artistSongsData);
                    }
                });
        };
    });
});

//------------------------------------------------------
// FORM to ddd new song to artists by id
// - DONE -
//------------------------------------------------------
app.get('/artists/:id/songs/new', (req, res) => {
    const artistProfile = 'SELECT * FROM artists WHERE id ='+req.params.id;
    pool.query(artistProfile, (artistProfileErr, artistProfileResult) => {
        if (artistProfileErr) {
            console.log(artistProfileErr);
            res.status(500);
            res.send('ERR');
        } else {
            res.render('new-song-artist', artistProfileResult);
        };
    });
});

//------------------------------------------------------
// SAVE new song to artists by id
// - DONE -
//------------------------------------------------------
app.post('/artists/:id/songs', (req, res) => {
    const whenQueryDone = (newSongTAErr, newSongTAResult) => {
        if (newSongTAErr) {
            res.status(500);
            res.send('db error');
        } else {
            let newSongTAId = newSongTAResult.rows[0].id;
            // console.log(newArtistId);
            res.redirect('/artists/'+req.body.artist_id+'/songs');
        };
    };
    const newSongTA = "INSERT INTO songs (title, album, preview_link, artwork, artist_id) values ($1, $2, $3, $4, $5) RETURNING *";
    const newSongTAValues = [req.body.title, req.body.album, req.body.preview_link, req.body.artwork, req.body.artist_id];
    pool.query(newSongTA, newSongTAValues, whenQueryDone);
});


//------------------------------------------------------
// EDIT FORM (ARTIST)
// - DONE -
//------------------------------------------------------
app.get('/artists/:id/edit', (req, res) => {
    const editArtistProfile = 'SELECT * FROM artists WHERE id ='+req.params.id;
    pool.query(editArtistProfile, (editArtistProfileErr, editArtistProfileResult) => {
        if (editArtistProfileErr) {
            console.log(editArtistProfileErr);
            res.status(500);
            res.send('ERR');
        } else {
            const data = {
                artist : editArtistProfileResult.rows[0]
            };
            // console.log(data);
            res.render('edit-artist', data);
        };
    });
});

//------------------------------------------------------
// EDIT FORM (SONG)
// - DONE -
//------------------------------------------------------
app.get('/songs/:id/edit', (req, res) => {
    const editSongProfile = 'SELECT * FROM songs WHERE id ='+req.params.id;
    pool.query(editSongProfile, (editSongProfileErr, editSongProfileResult) => {
        if (editSongProfileErr) {
            console.log(editSongProfileErr);
            res.status(500);
            res.send('song db ERR');
        } else {
            const allArtistsProfile = 'SELECT * FROM artists';
            pool.query(allArtistsProfile, (allArtistsProfileErr, allArtistsProfileResult) => {
                const data = {
                    artist : allArtistsProfileResult.rows,
                    song : editSongProfileResult.rows[0]
                };
                // console.log(data);
                res.render('edit-song', data);
            });

        };
    });
});

//------------------------------------------------------
// EDIT (UPDATE) Artist
// - DONE -
//------------------------------------------------------
app.put('/artists/:id', (req, res) => {
    const putArtistProfile = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id='+req.params.id;

    const putArtistValues = [req.body.name, req.body.photo_url, req.body.nationality];

    pool.query(putArtistProfile, putArtistValues, (putArtistProfileErr, putArtistProfileResult) => {
        if (putArtistProfileErr) {
            console.log(putArtistProfileErr);
            res.status(500);
            res.send('ERR');
        } else {
            res.redirect('/artists/'+req.params.id);
        };
    });
});

//------------------------------------------------------
// EDIT (UPDATE) Song
// - DONE -
//------------------------------------------------------
app.put('/songs/:id', (req, res) => {
    const putSongProfile = 'UPDATE songs SET title=$1, album=$2, preview_link=$3, artwork=$4, artist_id=$5 WHERE id='+req.params.id;

    const putSongValues = [req.body.title, req.body.album, req.body.preview_link, req.body.artwork, req.body.artist_id];

    pool.query(putSongProfile, putSongValues, (putSongProfileErr, putSongProfileResult) => {
        if (putSongProfileErr) {
            console.log(putSongProfileErr);
            res.status(500);
            res.send('ERR');
        } else {
            res.redirect('/songs/'+req.params.id);
        };
    });
});


//------------------------------------------------------
// DELETE Artist
// - DONE -
//------------------------------------------------------
app.delete('/artists/:id', (req, res) => {
    const deleteArtist = 'DELETE FROM artists WHERE id='+req.params.id;

    pool.query(deleteArtist, (deleteArtistErr) => {
        if (deleteArtistErr) {
            console.log(deleteArtistErr);
            res.status(500);
            res.send('ERR');
        } else {
            res.redirect('/artists');
        };
    });
});

//------------------------------------------------------
// HOME
// - DONE (to home.jsx) -
//------------------------------------------------------
app.get('/', (req, res) => {
        res.render('home');
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
