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

//parse cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser());

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

            const data = {
                artists : allArtistsResult,
                cookies: req.cookies
            }

            res.render('artists', data);
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
            const data = {
                songs: allSongsResult,
                cookies: req.cookies
            }
            res.render('songs', data);
        }
    }
    pool.query(allSongsQ, whenQueryDone);
});


//------------------------------------------------------
// INDEX. List out all Playlists in HTML.
// - DONE -
//------------------------------------------------------
app.get('/playlists', (req, res) => {
    const allPlaylistsQ = 'SELECT * from playlists';

    pool.query(allPlaylistsQ, (queryError, allPlaylistsResult) => {
        if (queryError) {
            console.log("playlist db error", queryError);
            res.status(500);
            res.send("playlist db error")
        } else {
            // console.log('playlists');
            // console.log(allPlaylistsResult);
            const data = {
                playlists : allPlaylistsResult,
                cookies: req.cookies
            }
            res.render('playlists', data)
        };
    });
});


//------------------------------------------------------
// FORM to get user input for NEW ARTIST
// - DONE (to new-artist.jsx) -
//------------------------------------------------------
app.get('/artists/new', (req, res) => {
    //FORM to add new artists
    const data = {
        cookies: req.cookies
    }
    res.render('new-artist', data)
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
            const data = {
                allArtists : allArtistsQResult,
                cookies: req.cookies
            }
            res.render('new-song', data);
        };
    };
    pool.query(allArtistsQ, whenQueryDone);
});

//------------------------------------------------------
// FORM to get user input for NEW PLAYLIST
// - DONE -
//------------------------------------------------------
app.get('/playlists/new', (req, res) => {
    //FORM to add new playlist
    const data = {
        cookies: req.cookies
    }
    res.render('new-playlist', data);
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
            const data = {
                artist: artistProfileResult,
                cookies: req.cookies
            }
            res.render('show-artist', data);
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
            const data = {
                song : songProfileResult,
                cookies: req.cookies
            }
            res.render('show-song', data);
        };
    });
});


//------------------------------------------------------
// SHOW PLAYLIST by ID
// - DONE -
//------------------------------------------------------
app.get('/playlists/:id', (req, res) => {
    const playlistQ = 'SELECT * FROM playlists WHERE id ='+req.params.id;
    pool.query(playlistQ, (playlistQErr, playlistQResult) => {
        if (playlistQErr) {
            console.log(playlistQErr);
            res.status(500);
            res.send('playlistQ ERR');
        } else {
            const playlistSongQ = "SELECT playlist_song.song_id, playlist_song.playlist_id, songs.title FROM playlist_song INNER JOIN songs ON (playlist_song.song_id = songs.id) WHERE playlist_id ="+req.params.id;
            pool.query(playlistSongQ, (playlistSongQErr, playlistSongQResult) => {
                if (playlistSongQErr) {
                    console.log(playlistSongQErr);
                    res.status(500);
                    res.send("playlist_song db err")
                } else {
                    data = {
                        playlist : playlistQResult,
                        playlistSong : playlistSongQResult,
                        cookies: req.cookies
                    }
                    // console.log('query result:', playlistQResult);
                    res.render('show-playlist', data);
                }
            })
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

//------------------------------------------------------?
// SAVE NEW PLAYLIST from user input
// - DONE  -
//------------------------------------------------------
app.post('/playlists', (req, res) => {
    const whenQueryDone = (newPlaylistError, newPlaylistResult) => {
        if (newPlaylistError) {
            res.status(500);
            res.send('new playlist db error');
        } else {
            let newPlaylistId = newPlaylistResult.rows[0].id;
            res.redirect('/playlists/'+newPlaylistId);
        }
    }
    const newPlaylist = "INSERT INTO playlists (name) values ($1) RETURNING *";
    const newPlaylistValues = [req.body.name];
    pool.query(newPlaylist, newPlaylistValues, whenQueryDone);
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
                            songs: artistSongsResult,
                            cookies: req.cookies
                        }
                        res.render('artist-songs', artistSongsData);
                    }
                });
        };
    });
});


//------------------------------------------------------
// FORM to add new song to artists by id
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
            const data = {
                artist : artistProfileResult,
                cookies : req.cookies
            }
            res.render('new-song-artist', data);
        };
    });
});


//-----------------------------------------------------?
// FORM to add new song to Playlist by id
// - DONE -
//------------------------------------------------------
app.get('/playlists/:id/newsong', (req, res) => {
    const allSAQ = "SELECT songs.id AS song_id, songs.title, songs.artist_id, artists.name AS artist_name FROM songs INNER JOIN artists ON (songs.artist_id = artists.id)";
    pool.query(allSAQ, (allSAQErr, allSAQResult) => {
        if (allSAQErr) {
            console.log(allSAQErr);
            res.status(500);
            res.send('allSAQ_db err')
        } else {
            const playlistQ = "SELECT * from playlists where id="+req.params.id;
            pool.query(playlistQ, (playlistQErr, playlistQResult) => {
                if (playlistQErr) {
                    console.log(playlistQErr);
                    res.status(500);
                    res.send('playlistQ db err')
                } else {
                    const data = {
                        playlist : playlistQResult,
                        allsongs : allSAQResult,
                        cookies : req.cookies
                    }
                    res.render('new-playlist-song', data);
                };
            });
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


//------------------------------------------------------?
// SAVE new song to playlist by id
// - DONE -
//------------------------------------------------------
app.post('/playlists/:id', (req, res) => {
    console.log(req.body.song_id);
    const whenQueryDone = (newSongTPErr, newSongTPResult) => {
        if (newSongTPErr) {
            res.status(500);
            res.send('newSongTP db error');
        } else {
            // let newSongTPId = newSongTPResult.rows[0].id;
            res.redirect('/playlists/'+req.body.playlist_id);
        };
    };

    var valueSongId ="";
    const newSongTPValues = []
    for (var i = 0; i < req.body.song_id.length+1; i++){
        if (i < req.body.song_id.length) {
            newSongTPValues.push(req.body.song_id[i]);
        } else {
            newSongTPValues.push(req.body.playlist_id);
        }
    }

    for (var i = 1; i <= req.body.song_id.length; i++){
        if (i < req.body.song_id.length) {
            valueSongId += "($"+i+", $"+(req.body.song_id.length+1)+"),";
        } else {
            valueSongId += "($"+i+", $"+(req.body.song_id.length+1)+")";
        }
    }
    const newSongTP = "INSERT INTO playlist_song (song_id, playlist_id) values "+valueSongId;
    pool.query(newSongTP, newSongTPValues, whenQueryDone);
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
                artist : editArtistProfileResult.rows[0],
                cookies : req.cookies
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
                    song : editSongProfileResult.rows[0],
                    cookies : req.cookies
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
// DELETE SONG
// - DONE -
//------------------------------------------------------
app.delete('/songs/:id', (req, res) => {
    const deleteSong = 'DELETE FROM songs WHERE id='+req.params.id;

    pool.query(deleteSong, (deleteSongErr) => {
        if (deleteSongErr) {
            console.log(deleteSongErr);
            res.status(500);
            res.send('ERR');
        } else {
            res.redirect('/songs');
        };
    });
});

//------------------------------------------------------
// HOME
// - DONE (to home.jsx) -
//------------------------------------------------------
app.get('/', (req, res) => {

    let visits = 1;
    visits = parseInt(req.cookies.visits);

    if(isNaN(visits) || visits === undefined) {
        visits = 0;
    }

    visits = visits + 1;
    res.cookie('visits', visits);
    data = {
        cookies: req.cookies
    };

    res.render('home', data);
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
