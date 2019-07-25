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
var sha256 = require('js-sha256');
const SALT = "POTANG INA MO";
const cookieParser = require('cookie-parser')
app.use(cookieParser());

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
            let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;

            let data = {
                title: "Home",
                artists: result.rows,
                cookieLogin: cookieLogin
            };
            res.render('home', data);
        }
    });
});

//ADD artist
app.get('/artist/new', (req, res) => {
    let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
    let data = {
        title: "Add",
        cookieLogin: cookieLogin
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
            let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
            let data = {
                title: result.rows[0].name,
                artists: result.rows[0],
                cookieLogin: cookieLogin
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
            let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
            let data = {
                title: result.rows[0].name,
                artists: result.rows[0],
                cookieLogin: cookieLogin
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
            let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
            let data = {
                title: result.rows[0].name,
                artists: result.rows[0],
                cookieLogin: cookieLogin
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
            let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
            let data = {
                title: result.rows[0].name,
                artists: result.rows[0],
                cookieLogin: cookieLogin
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
    const queryString = 'SELECT DISTINCT songs.id,songs.title FROM songs INNER JOIN artists ON (artists.id = songs.artist_id) WHERE artists.id =' + parseInt(req.params.id) + "ORDER BY  songs.title ASC";
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
            data = {
                title: "Song List",
                songs: result.rows,
                id: parseInt(req.params.id),
                cookieLogin: cookieLogin
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
            let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
            let id = parseInt(req.params.id);
            let data = {
                title: "New Song",
                id: id,
                artists: result.rows,
                cookieLogin: cookieLogin
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
            let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
            let data = {
                song: result.rows[0],
                title: result.rows[0].title,
                cookieLogin: cookieLogin,
                addIntoFavorites: false
            }
            let song_id = parseInt(req.params.idd);
            const queryString = 'SELECT * FROM PLAYLISTS WHERE ID IN (SELECT ID FROM PLAYLISTS EXCEPT SELECT PLAYLIST_ID FROM PLAYLISTS_SONGS WHERE SONG_ID = ' + song_id + ')';
            pool.query(queryString, (err, result2) => {

                if (err) {
                    console.error('query error:', err.stack);
                    res.send('query error');
                } else {
                    data['playlists'] = result2.rows;

                    let user_id = parseInt(req.cookies["user_id"]);
                    const queryString = 'SELECT EXISTS (SELECT * FROM favorites WHERE song_id = ' + song_id + 'AND user_id = ' + user_id + ')';
                    pool.query(queryString, (err, result3) => {

                        if (err) {
                            console.error('query error:', err.stack);
                            res.send('query error');
                        } else {
                            console.log("HERE");
                            console.log(result3.rows[0].exists);
                            console.log(cookieLogin);
                            if (result3.rows[0].exists === false && cookieLogin === true) {
                                data['addIntoFavorites'] = true;
                            }
                            res.render('singlesong', data);

                        }
                    });

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
            let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
            let data = {
                playlists: result.rows,
                title: "Playlists",
                cookieLogin: cookieLogin
            }
            res.render('playlists', data);
        }
    });
})

//add new playlist
app.get('/playlist/new', (req, res) => {
    let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
    let data = {
        title: "Add Playlists",
        cookieLogin: cookieLogin
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
                        res.redirect("/playlist/" + playlistId);
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
                let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
                let data = {
                    playlist: "Empty Playlist",
                    playlistId: parseInt(req.params.id),
                    songs: [],
                    cookieLogin: cookieLogin
                }
                res.render("playlist_songs", data);
            } else {
                console.log("gg");
                let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
                let data = {

                    playlist: result.rows[0].name,
                    playlistId: result.rows[0].playlist_id,
                    songs: result.rows,
                    cookieLogin: cookieLogin
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
            let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
            let data = {
                songs: result.rows,
                playlistId: parseInt(req.params.id),
                cookieLogin: cookieLogin
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
    } else if (typeof req.body.song === "string") {
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
    } else {
        res.redirect("/playlist");
    }



})


app.get('/login', (req, res) => {
    let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
    let data = {
        title: "Log In",
        cookieLogin: cookieLogin
    };
    res.render("login", data);
})

app.get('/login/register', (req, res) => {
    let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
    let data = {
        title: "Register",
        cookieLogin: cookieLogin
    };
    res.render("register", data);
})

app.get('/login/logout', (req, res) => {
    res.cookie('logged_in', sha256(SALT));
    res.redirect("/login");
})

app.post('/login/check_user', (req, res) => {
    const queryString = 'SELECT * FROM users WHERE name=$1 AND password=$2';
    let hashedPW = sha256(req.body.password);
    let arr = [req.body.name, hashedPW];

    pool.query(queryString, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {

            if (result.rows[0] === undefined) {
                res.redirect("/login");
            } else {
                res.cookie("user_id", parseInt(result.rows[0].id));
                let currentSessionCookie = sha256(parseInt(result.rows[0].id) + 'logged_in' + SALT);
                res.cookie('logged_in', currentSessionCookie);

                res.redirect("/");
            }
        }
    });
})

app.post('/login/create_new_user', (req, res) => {
    const queryString = 'INSERT INTO users (name,password) VALUES ($1,$2)';
    let hashedPW = sha256(req.body.password);
    let arr = [req.body.name, hashedPW];

    pool.query(queryString, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {

            res.redirect('/login');
        }
    });
})

app.get('/favorites', (req, res) => {
    let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
    if (cookieLogin) {
        let user_id = parseInt(req.cookies["user_id"]);
        const queryString = 'SELECT * FROM songs WHERE id IN (SELECT song_id FROM favorites WHERE user_id=' + user_id + ")";
        pool.query(queryString, (err, result) => {

            if (err) {
                console.error('query error:', err.stack);
                res.send('query error');
            } else {
                let data = {
                    songs: result.rows,
                    title: "Favorites",
                    cookieLogin: cookieLogin
                }
                const queryString = 'SELECT * FROM users WHERE id ='+req.cookies["user_id"];
                pool.query(queryString, (err, result) => {

                    if (err) {
                        console.error('query error:', err.stack);
                        res.send('query error');
                    } else {
                        data['user_name']=result.rows[0].name;
                        res.render('favorites', data);
                    }
                });

            }
        });
    } else {
        res.send("NO ENTRY HERE BRO!");
    }

})

app.get('/favorites/new', (req, res) => {
    let cookieLogin = (sha256(req.cookies["user_id"] + 'logged_in' + SALT) === req.cookies["logged_in"]) ? true : false;
    if (cookieLogin) {
        let user_id = parseInt(req.cookies["user_id"]);
        const queryString = 'SELECT * FROM songs WHERE id IN (SELECT id FROM songs EXCEPT (SELECT song_id FROM favorites WHERE user_id = ' + user_id + "))"

        pool.query(queryString, (err, result) => {

            if (err) {
                console.error('query error:', err.stack);
                res.send('query error');
            } else {
                let data = {
                    songs: result.rows,
                    cookieLogin: cookieLogin
                }

                res.render("favorites_addsongs", data);

            }
        });
    } else {
        res.send("NO ENTRY HERE BRO!");
    }
})

app.post('/favorites', (req, res) => {
    let user_id = parseInt(req.cookies["user_id"]);
    if (Array.isArray(req.body.song)) {
        req.body.song.map(song_id => {
            const queryString = 'INSERT INTO favorites (song_id,user_id) VALUES ($1,$2)'
            let arr = [song_id, user_id];
            pool.query(queryString, arr, (err, result) => {

                if (err) {
                    console.error('query error:', err.stack);
                    res.send('query error');
                } else {
                    console.log("added song");

                }
            });

        })
        setTimeout(res.redirect("/favorites"), 1000);
    } else if (typeof req.body.song === "string") {
        let song_id = parseInt(req.body.song);
        const queryString = 'INSERT INTO favorites (song_id,user_id) VALUES ($1,$2)'
        let arr = [song_id, user_id];
        pool.query(queryString, arr, (err, result) => {

            if (err) {
                console.error('query error:', err.stack);
                res.send('query error');
            } else {
                console.log("added song");
                res.redirect("/favorites");
            }
        });

    } else {
        res.redirect("/favorites");
    }
})

app.post('/favorites/fromSingleSong', (req, res) => {
    let song_id = parseInt(req.body.song_id);
    let artist_id = parseInt(req.body.artist_id);
    let user_id = parseInt(req.cookies["user_id"]);
    const queryString = 'INSERT INTO favorites (song_id,user_id) VALUES ($1,$2)'
    let arr = [song_id, user_id];
    pool.query(queryString, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            console.log("added song");
            let url = "/artist/" + artist_id + "/songs/" + song_id;
            res.redirect(url);
        }
    });
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