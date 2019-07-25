console.log("starting up!!");
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const configs = {
    user: 'kach92',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
    password: "Kenny Ang"
};
const pool = new pg.Pool(configs);
pool.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);
app.use(express.static(__dirname + '/public/'));

/**
 * ===================================
 * Routes
 * ===================================
 */
//redirectto artists
app.get('/', (request, response) => {
    // query database for all pokemon

    // respond with HTML page displaying all pokemon
    response.redirect('/artist');
});


//artist main page
app.get('/artist', (req, res) => {
    const queryString = 'SELECT * from artists ORDER BY id ASC'

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            let data = {
                title: "Home",
                artists: result.rows
            };
            res.render('home', data);
        }
    });
});

//ADD artist
app.get('/artist/new', (req, res) => {
    let data = {
        title: "Add"
    }
    res.render("add", data);
})

//ADD artist POST
app.post('/artist', (req, res) => {

    const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1,$2,$3) RETURNING *';
    let arr = [req.body.name, req.body.photo_url, req.body.nationality];
    pool.query(queryString, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            let data = {
                title: result.rows[0].name,
                artists: result.rows[0]
            };
            res.render('artist', data);
        }
    });
})

//get artist by id
app.get('/artist/:id', (req, res) => {

    const queryString = 'SELECT * from artists WHERE id=' + parseInt(req.params.id);

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            let data = {
                title: result.rows[0].name,
                artists: result.rows[0]
            };
            res.render('artist', data);
        }
    });
});


//edit artist
app.get('/artist/:id/edit', (req, res) => {

    const queryString = 'SELECT * from artists WHERE id=' + parseInt(req.params.id);

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            let data = {
                title: result.rows[0].name,
                artists: result.rows[0]
            };
            res.render('edit', data);
        }
    });
});

//edit artist PUT
app.put('/artist/:id', (req, res) => {
    const queryString = 'UPDATE artists SET name=$1,nationality=$2,photo_url=$3 WHERE id =' + parseInt(req.params.id) + "RETURNING *";
    let arr = [req.body.name, req.body.nationality, req.body.photo_url];
    pool.query(queryString, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            let data = {
                title: result.rows[0].name,
                artists: result.rows[0]
            };

            res.render('artist', data);
        }
    });
})

//delete artist DELETE
app.delete('/artist/:id', (req, res) => {
    const queryString = 'DELETE from artists WHERE id=' + parseInt(req.params.id);
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {

            res.redirect("/artist");
        }
    });
})

//get songs by artist id
app.get('/artist/:id/songs', (req, res) => {
    const queryString = 'SELECT DISTINCT songs.id,songs.title FROM songs INNER JOIN artists ON (artists.id = songs.artist_id) WHERE artists.id =' + parseInt(req.params.id)+"ORDER BY  songs.title ASC";
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            data = {
                title: "Song List",
                songs: result.rows,
                id: parseInt(req.params.id)
            }
            res.render("songlist", data);
        }
    });
})

//add new song
app.get('/artist/:id/songs/new', (req, res) => {
    const queryString = 'SELECT * FROM artists';
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            let id = parseInt(req.params.id);
            let data = {
                title: "New Song",
                id: id,
                artists: result.rows
            }
            res.render("newsong", data);
        }
    });

})

//add new song POST
app.post('/artist/:id/songs', (req, res) => {
    let id = parseInt(req.body.artist);
    const queryString = 'INSERT INTO songs (title, album, preview_link, artwork,artist_id) VALUES ($1,$2,$3,$4,$5)';
    let arr = [req.body.title, req.body.album, req.body.preview_link, req.body.artwork, id];
    pool.query(queryString, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {

            let url = "/artist/" + id + "/songs";
            res.redirect(url);
        }
    });

})

//get individual song
app.get('/artist/:id/songs/:idd', (req, res) => {
    const queryString = 'SELECT * FROM songs WHERE id=' + parseInt(req.params.idd);
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            let data = {
                song: result.rows[0],
                title: result.rows[0].title
            }

            const queryString = 'SELECT * FROM PLAYLISTS WHERE ID IN (SELECT ID FROM PLAYLISTS EXCEPT SELECT PLAYLIST_ID FROM PLAYLISTS_SONGS WHERE SONG_ID = '+parseInt(req.params.idd)+')';
            pool.query(queryString, (err, result2) => {

                if (err) {
                    console.error('query error:', err.stack);
                    res.send('query error');
                } else {
                    data['playlists'] = result2.rows;
                    res.render('singlesong', data);
                }
            });



        }
    });
})

//list of playlist
app.get('/playlist', (req, res) => {
    const queryString = 'SELECT * FROM playlists';
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            let data = {
                playlists: result.rows,
                title: "Playlists"
            }
            res.render('playlists', data);
        }
    });
})

//add new playlist
app.get('/playlist/new', (req, res) => {
    let data = {
        title: "Add Playlists"
    }

    res.render("new_playlist", data);
})

//add new playlist POST
app.post('/playlist', (req, res) => {
    const queryString = 'INSERT INTO playlists (name) VALUES ($1)';
    let arr = [req.body.name];
    pool.query(queryString, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {

            res.redirect('/playlist');
        }
    });
})

//adding song to playlist
app.post('/playlist/addSongToPlaylist', (req, res) => {


    let playlistId = parseInt(req.body.playlistId);
    let id = parseInt(req.body.song);
    const queryString = 'SELECT EXISTS (SELECT * FROM playlists_songs WHERE playlist_id = $1 AND song_id = $2);'
    let arr = [playlistId, id];
    pool.query(queryString, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            if (result.rows[0].exists) {
                console.log("forget it");
            } else {
                const queryString = 'INSERT INTO playlists_songs (playlist_id,song_id) VALUES ($1,$2)'
                let arr = [playlistId, id];
                pool.query(queryString, arr, (err, result) => {

                    if (err) {
                        console.error('query error:', err.stack);
                        res.send('query error');
                    } else {
                        console.log("added song");
                        res.redirect("/playlist/"+playlistId);
                    }
                });
            }

        }
    });



})


//single playlist and show available songs
app.get('/playlist/:id', (req, res) => {
    const queryString = 'SELECT playlists.id AS playlist_id,songs.artist_id, playlists.name,songs.id,songs.title FROM songs INNER JOIN playlists_songs ON (songs.id = playlists_songs.song_id) INNER JOIN playlists ON (playlists.id = playlists_songs.playlist_id) WHERE playlists.id =' + parseInt(req.params.id);

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            if (result.rows.length === 0) {
                let data = {
                    playlist: "Empty Playlist",
                    playlistId: parseInt(req.params.id),
                    songs: []
                }
                res.render("playlist_songs", data);
            } else {
                console.log("gg");
                let data = {

                    playlist: result.rows[0].name,
                    playlistId: result.rows[0].playlist_id,
                    songs: result.rows
                }

                res.render("playlist_songs", data);
            }


        }
    });
})

//add songs into playlist
app.get('/playlist/:id/add', (req, res) => {
    const queryString = 'SELECT * FROM songs'

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            let data = {
                songs: result.rows,
                playlistId: parseInt(req.params.id)
            }

            res.render("choose_songs", data);

        }
    });
})

//add songs into playlist POST
app.post('/playlist/:id', (req, res) => {
    let playlistId = req.params.id;
    if (Array.isArray(req.body.song)) {
        req.body.song.map(id => {

            const queryString = 'SELECT EXISTS (SELECT * FROM playlists_songs WHERE playlist_id = $1 AND song_id = $2);'
            let arr = [playlistId, id];
            pool.query(queryString, arr, (err, result) => {

                if (err) {
                    console.error('query error:', err.stack);
                    res.send('query error');
                } else {
                    if (result.rows[0].exists) {
                        console.log("forget it");
                    } else {
                        const queryString = 'INSERT INTO playlists_songs (playlist_id,song_id) VALUES ($1,$2)'
                        let arr = [playlistId, id];
                        pool.query(queryString, arr, (err, result) => {

                            if (err) {
                                console.error('query error:', err.stack);
                                res.send('query error');
                            } else {
                                console.log("added song");

                            }
                        });
                    }

                }
            });



        })
        res.redirect("/playlist");
    } else {
        let id = parseInt(req.body.song);
        console.log(id);
        const queryString = 'SELECT EXISTS (SELECT * FROM playlists_songs WHERE playlist_id = $1 AND song_id = $2);'
        let arr = [playlistId, id];
        pool.query(queryString, arr, (err, result) => {

            if (err) {
                console.error('query error:', err.stack);
                res.send('query error');
            } else {
                if (result.rows[0].exists) {
                    console.log("forget it");
                } else {
                    const queryString = 'INSERT INTO playlists_songs (playlist_id,song_id) VALUES ($1,$2)'
                    let arr = [playlistId, id];
                    pool.query(queryString, arr, (err, result) => {

                        if (err) {
                            console.error('query error:', err.stack);
                            res.send('query error');
                        } else {
                            console.log("added song");
                            res.redirect("/playlist");
                        }
                    });
                }

            }
        });
    }



})


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function() {

    console.log("closing");

    server.close(() => {

        console.log('Process terminated');

        pool.end(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);