console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');

// Initialise postgres client
const configs = {
  user: 'chanosborne',
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

//Set configuration to tell express to use the cookie parser.
app.use(cookieParser());

/**
 * ===================================
 * Routes
 * ===================================
 */

/////////////////////
////   Home     ////
///////////////////
app.get('/artists/', (request, response) => {
    let visitCounter = request.cookies['visitCounter'];
    if (visitCounter === undefined) {
        visitCounter = 1;
    } else {
        visitCounter = parseInt(visitCounter) + 1;
    }
    const data = {
        visitCounter: visitCounter
    }
    response.cookie('visitCounter', visitCounter, {maxAge: 10 * 36000});
    response.render('home', data);
});

///////////////////////////////////
////   //List of all Artists  ////
/////////////////////////////////
app.get('/artists/list', (request, response) => {
    const queryString = 'SELECT * FROM artists ORDER BY id ASC';

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send('An error occurred when displaying list of artists 😢');
        } else {
            const data = {
                list: result.rows,
                visitCounter: request.cookies['visitCounter']
            }

        response.render('all_artists', data);
        }
    })
});

////////////////////////////
////  List of all songs  //
//////////////////////////
app.get('/artists/songs/', (request, response) => {
    let queryString = 'SELECT * FROM songs';

    pool.query(queryString, (err, result) => {
        const data = {
            allSongs: result.rows,
            visitCounter: request.cookies['visitCounter']
        }
    response.render('all_songs', data)
    })
});

/////////////////////////////
////  List of playlists  ///
///////////////////////////
app.get('/playlists/', (request, response) => {
    let queryString = 'SELECT * FROM playlist';

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send('An error occurred when posting new playlist 😢');
        } else {
            const data = {
                playlists: result.rows,
                visitCounter: request.cookies['visitCounter']
            }
        response.render('all_playlists', data)
        }
    })
});

////////////////////////////
///  Add new playlist   ///
//////////////////////////
app.get('/playlists/new', (request, response) => {
    let queryString = 'SELECT * FROM songs';

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send('An error occurred when creating new artist 😢');
        } else {
            const data = {
                visitCounter: request.cookies['visitCounter']
            }
            response.render('new_playlist', data);
        }
    })
})

app.post('/playlists/', (request, response) => {
    const newPlaylistName = request.body.name;
    let queryInsertString = "INSERT INTO playlist (name) VALUES ('" + newPlaylistName + "')";

    pool.query(queryInsertString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send('An error occurred when posting new playlist 😢');
        } else {
            let queryString = 'SELECT * FROM playlist';

            pool.query(queryString, (err, result) => {
                 if (err) {
                    console.log('dbQuery Error', err.stack);
                    response.send('An error occurred when posting new playlist 😢');
                } else {
                    const data = {
                        playlists: result.rows,
                        visitCounter: request.cookies['visitCounter']
                    }

                response.render('all_playlists', data)
                }
            })
        }
    })
})

////////////////////////////////////////////////
////  Add / Remove songs to/from playlist  ////
//////////////////////////////////////////////
app.get('/playlists/:id/newsong', (request, response) => {
    let queryPlaylistString = 'SELECT * FROM playlist WHERE id=' + request.params.id;

    //Get name and id of playlist
    pool.query(queryPlaylistString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send('An error occurred when adding new song to playlist 😢');
        } else {
            let playlistId = result.rows[0].id;
            let playlistName = result.rows[0].name;
            let querySongString = 'SELECT songs.id, songs.title, songs.album, songs.preview_link, songs.artwork, songs.artist_id, artists.name AS artist_name FROM songs INNER JOIN artists ON (songs.artist_id = artists.id)' ;

            //Get details of all songs
            pool.query(querySongString, (err, result) => {
                if (err) {
                    console.log('dbQuery Error', err.stack);
                    response.send('An error occurred when adding new song to playlist 😢');
                } else {
                    let allSongs = result.rows;
                    let queryPlaylistSongString = 'SELECT songs.id, songs.title FROM songs INNER JOIN playlist_song ON (songs.id = playlist_song.song_id) WHERE playlist_song.playlist_id=' + request.params.id;

                    //Get songs existing in playlist
                    pool.query(queryPlaylistSongString, (err, result) => {
                            const data = {
                            playlistId: playlistId,
                            playlistName: playlistName,
                            allSongs: allSongs,
                            existingSongs: result.rows,
                            visitCounter: request.cookies['visitCounter']
                        }

                    response.render('song_to_playlist', data)
                    })
                }
            })
        }
    })
})

app.post('/playlists/:id', (request, response) => {
    let selectedSongsId = request.body.song_id;

    //Change single song added from string to array
    if (typeof(selectedSongsId) === 'string') {
        selectedSongsId = [];
        selectedSongsId.push(request.body.song_id)
    }

    //Delete existing songs from playlist
    let queryString = 'DELETE FROM playlist_song WHERE playlist_id=' + request.params.id;

    pool.query(queryString, (err, result) => {
        selectedSongsId.forEach(selectedSongId => {
            queryString = "INSERT INTO playlist_song (song_id, playlist_id) VALUES ('" + selectedSongId + "', " + "'" + request.params.id + "')"

            //Update playlist with selected songs
            pool.query(queryString, (err, result) => {
                console.log('Updated playlist')
            })
        })

        //Generate playlist and song details
        queryString = 'SELECT songs.id, songs.title, songs.album, songs.preview_link, playlist_song.playlist_id, playlist.name AS playlist_name FROM songs INNER JOIN playlist_song ON (songs.id = playlist_song.song_id) INNER JOIN playlist ON (playlist.id = playlist_song.playlist_id) WHERE playlist_song.playlist_id=' + request.params.id;

        pool.query(queryString, (err, result) => {
            console.log(result.rows)
            const data = {
                playlistId: result.rows[0].playlist_id,
                playlistName: result.rows[0].playlist_name,
                updatedSongs: result.rows,
                visitCounter: request.cookies['visitCounter']
            }

        response.render('show_playlist', data);
        })
    })
})


app.put('/playlists/:id', (request, response) => {
    let updatedPlaylistName = request.body.name;

    let queryString = "UPDATE playlist SET name='" + updatedPlaylistName + "' WHERE id=" + request.params.id;

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send('An error occurred when updating playlist name 😢');
        } else {
            const data = {
                visitCounter: request.cookies['visitCounter']
            }
            response.render('show_playlist', data);
        }
    })
})


/////////////////////////////////
////  Individual playlist  /////
///////////////////////////////
app.get('/playlists/:id', (request, response) => {
    let queryString = 'SELECT songs.id, songs.title, songs.album, songs.preview_link FROM songs INNER JOIN playlist_song ON (playlist_song.song_id = songs.id) WHERE playlist_song.playlist_id =' + request.params.id;

    //Get details of added songs to display on page
    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send('An error occurred when creating new artist 😢');
        } else {
            let updatedSongs = result.rows;
            let queryPlaylistString = 'SELECT * FROM playlist WHERE id=' + request.params.id;

            //Get playlist name to display even when playlist is empty
            pool.query(queryPlaylistString, (err, result) => {
                if (err) {
                    console.log('dbQuery Error', err.stack);
                    response.send('An error occurred when creating new artist 😢');
                } else {
                    const data = {
                        playlistId: result.rows[0].id,
                        playlistName: result.rows[0].name,
                        updatedSongs: updatedSongs,
                        visitCounter: request.cookies['visitCounter']
                    }

                response.render('show_playlist', data)
                }
            })
        }
    })
})

///////////////////////////
////  Delete playlist  ///
/////////////////////////
app.delete('/playlists/:id', (request, response) => {
    let queryString = 'DELETE FROM playlist WHERE id=' + request.params.id;

    pool.query(queryString, (err, result) => {
        response.redirect('/playlists/');
    })
})

/////////////////////////////////////////
////  Create new artist (from home)  ///
///////////////////////////////////////
app.get('/artists/new', (request, response) => {
    const data = {
        visitCounter: visitCounter
    }
    response.render('new_artist', data);
});

app.post('/artists', (request, response) => {
    const newArtist = request.body;

    let values = [newArtist.name, newArtist.photo_url, newArtist.nationality];
    let queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)';

    pool.query(queryString, values, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send('An error occurred when creating new artist 😢');
        } else {
            const data = {
                name: newArtist.name,
                photo_url: newArtist.photo_url,
                nationality: newArtist.nationality,
                visitCounter: request.cookies['visitCounter']
            }

        response.render('artist', data);
        }
    })
});

////////////////////////////////////
////  Add new song (from home)  ///
//////////////////////////////////
app.get('/artists/songs/new', (request, response) => {
    let queryString = 'SELECT * FROM artists ORDER BY id ASC'

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send("An error occurred when displaying artist's songs 😢");
        } else {
            const data = {
                allArtists: result.rows,
                visitCounter: request.cookies['visitCounter']
            }

        response.render('new_song', data);
        }
    })
});

app.post('/artists/songs', (request, response) => {
    const newSong = request.body;
    let queryIdString = "SELECT id FROM artists WHERE name='" + newSong.artist + "'";

    pool.query(queryIdString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send("An error occurred when posting new song 😢");
        } else {
            const artistId = result.rows[0].id.toString();
            let values = [newSong.title, newSong.album, newSong.preview_link, newSong.artwork, artistId];
            let queryInsertString = 'INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5)'

            pool.query(queryInsertString, values, (err, result) => {
                if (err) {
                    console.log('dbQuery Error', err.stack);
                    response.send("An error occurred when adding songs 😢");
                } else {
                    const data = {
                        title: newSong.title,
                        album: newSong.album,
                        preview_link: newSong.preview_link,
                        artwork: newSong.artwork,
                        artist_id: artistId,
                        artist_name: newSong.artist,
                        visitCounter: request.cookies['visitCounter']
                    }
                response.render('song', data);
                }
            })
        }
    })
});

///////////////////////////
////    Edit song     ////
/////////////////////////
app.get('/artists/:id/songs/:songId/edit', (request, response) => {
    let artistId = request.params.id;
    let songId = request.params.songId;
    let querySongString = 'SELECT songs.id, songs.title, songs.album, songs.preview_link, songs.artwork, songs.artist_id, artists.name FROM songs INNER JOIN artists ON (songs.artist_id = artists.id) WHERE songs.artist_id =' + artistId + 'AND songs.id =' + songId;

    pool.query(querySongString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send("An error occurred when editing artist's songs 😢");
        } else {
            let queryArtistString = 'SELECT * FROM artists ORDER BY id ASC';
            let songDetails = result.rows[0];

            pool.query(queryArtistString, (err, result) => {
                if (err) {
                    console.log('dbQuery Error', err.stack);
                    response.send("An error occurred when editing artist's songs 😢");
                } else {
                    const data = {
                        song: songDetails,
                        artists: result.rows,
                        visitCounter: request.cookies['visitCounter']
                    }

                response.render('edit_song', data);
                }
            })

        }
    })
})

app.put('/artists/:id/songs/:songId', (request, response) => {
    let songId = request.params.songId;
    let updateDetails = request.body;

    let queryArtistString = "SELECT * FROM artists WHERE name='" + updateDetails.artist + "'";

    pool.query(queryArtistString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send("An error occurred when updating songs 😢");
        } else {
            let artistId = result.rows[0].id;

            let queryUpdateSongString = "UPDATE songs SET title='" + updateDetails.title + "', album='" + updateDetails.album + "', preview_link='" + updateDetails.preview_link + "', artwork='" + updateDetails.artwork + "', artist_id='" + artistId + "' WHERE id=" + songId;

            pool.query(queryUpdateSongString, (err, result) => {
                if (err) {
                    console.log('dbQuery Error', err.stack);
                    response.send("An error occurred when updating songs 😢");
                } else {
                    let updatedSongPage = '/artists/' + artistId + '/songs/' + songId;
                    response.redirect(updatedSongPage);
                }
            })
        }
    })
})

////////////////////////////////////////////
////  Add new song (from artist's page)  //
//////////////////////////////////////////
app.get('/artists/:id/songs/new', (request, response) => {
    const id = request.params.id;
    const queryString = 'SELECT * FROM artists WHERE id=' + id;

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send("An error occurred when displaying artist's songs 😢");
        } else {
            const data = {
                artist: result.rows[0],
                visitCounter: request.cookies['visitCounter']
            }

        response.render('new_artist_song', data);
        }
    })
})

//////////////////////////////
////   Individual song   ////
////////////////////////////
app.get('/artists/:id/songs/:songId', (request, response) => {
    let artistId = request.params.id;
    let songId = request.params.songId;
    let queryString = 'SELECT songs.id, songs.title, songs.album, songs.preview_link, songs.artwork, songs.artist_id, artists.name FROM songs INNER JOIN artists ON (songs.artist_id = artists.id) WHERE songs.artist_id =' + artistId + 'AND songs.id =' + songId;

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send("An error occurred when editing artist's songs 😢");
        } else {
            const data = {
                song: result.rows[0],
                visitCounter: request.cookies['visitCounter']
            }

        response.render('show_song', data);
        }
    })
})

//////////////////////////
////   Delete song   ////
////////////////////////
app.delete('/artists/:id/songs/:songId', (request, response) => {
    let artistId = request.params.id;
    let songId = request.params.songId;
    let queryString = 'DELETE FROM songs WHERE id=' + songId;

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send("An error occurred when deleting song 😢");
        } else {
            let artistSongPage = '/artists/' + artistId + '/songs/';
            response.redirect(artistSongPage);
        }
    })
});

/////////////////////////////////////////
////   Display all artist's songs   ////
///////////////////////////////////////
app.get('/artists/:id/songs', (request, response) => {
    let id = request.params.id;
    let querySongString = 'SELECT * FROM songs WHERE artist_id=' + id;
    //let queryString = 'SELECT songs.id, songs.title, songs.preview_link, songs.artwork, song.artist_id, artists.id', artists.name, artists.photo_url, artists.nationality FROM songs INNER JOIN artists ON (songs.artist_id = artists.id)

    pool.query(querySongString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send("An error occurred when displaying artist's songs 😢");
        } else {
            let songs = result.rows;
            let queryArtistString = 'SELECT * FROM artists WHERE id=' + id;

            pool.query(queryArtistString, (err, result) => {
                if (err) {
                    console.log('dbQuery Error', err.stack);
                    response.send("An error occurred when displaying artist's songs 😢");
                } else {
                    const data = {
                        id: id,
                        songs: songs,
                        artist: result.rows,
                        visitCounter: request.cookies['visitCounter']
                    }
                response.render('artist_songs', data);
                }
            });
        }
    });
})

//////////////////////////////////
////   Edit artist details   ////
////////////////////////////////
app.get('/artists/:id/edit', (request, response) => {
    let id = request.params.id;
    let queryString = 'SELECT * FROM artists WHERE id=' + id;

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send("An error occurred when displaying artist's page 😢");
        } else {
            const data = {
                artist: result.rows,
                visitCounter: request.cookies['visitCounter']
            }
        response.render('edit_artist', data);
        }
    });
})

app.put('/artists/:id', (request, response) => {
    const update = request.body;
    const queryString = "UPDATE artists SET name='" + update.name + "', photo_url='" + update.photo_url + "', nationality='" + update.nationality + "' WHERE id=" + request.params.id;

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send('An error occurred when updating artist information 😢');
        } else {
            let updatedArtistPage = '/artists/' + request.params.id;
            response.redirect(updatedArtistPage);
        }
    })
})

///////////////////////////
////  Delete artist   ////
/////////////////////////
app.delete('/artists/:id', (request, response) => {
    const queryString = 'DELETE FROM artists WHERE id=' + request.params.id;

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send('An error occurred when deleting artist information 😢');
        } else {
            response.redirect('/artists/list');
        }
    });
})

//////////////////////////////
////  Individual artist  ////
////////////////////////////
app.get('/artists/:id', (request, response) => {
    const queryString = 'SELECT * FROM artists ORDER BY id ASC';

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('Query Error', err.stack);
            response.send('An error occurred when displaying artist information 😢');
        } else {
            result.rows.forEach(row => {
                let index = result.rows.indexOf(row)

                if (parseInt(request.params.id) === row.id) {
                    const data = {
                        id: result.rows[index].id,
                        name: result.rows[index].name,
                        photo_url: result.rows[index].photo_url,
                        nationality: result.rows[index].nationality,
                        visitCounter: request.cookies['visitCounter']
                    }

                response.render('show_artist', data);
                }
            })
        }
    });
})


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