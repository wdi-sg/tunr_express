const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'chelseaee',
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
app.use(express.static(__dirname + "/public/"));


app.use(methodOverride('_method'));
const sha256 = require("js-sha256");


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

const cookieParser = require("cookie-parser");
app.use(cookieParser());



/**
 * =========================================================
 * =========================================================
 * |###########          ROUTES - ARTISTS        ##########|
 * =========================================================
 * =========================================================
 */

/**
 * -------------------
 * CREATE A NEW ARTIST
 * -------------------
 */

app.get(`/artists/new`, (req, res) => {
    res.render("artists/new-artist");
});

/**
 * -------------------
 * DISPLAY FORM FOR EDITING A SINGLE ARTIST
 * -------------------
 */

app.get(`/artists/:id/edit`, (req, res) => {
    const query = parseInt(req.params.id);

    let command = `SELECT * FROM artists WHERE id = ${query}`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            const foundArtist = result.rows[0];
            const data = {
                artistData: foundArtist,
            };
            res.render("artists/edit-artist", data);
        }
    });
});

/**
 * -------------------
 * DISPLAY A SINGLE ARTIST
 * -------------------
 */

app.get(`/artists/:id`, (req, res) => {
    const query = parseInt(req.params.id);
    let command = `SELECT * FROM artists WHERE id = ${query}`;
    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            const foundArtist = result.rows[0];

            const data = {
                artistData: foundArtist,
            };
            res.render("artists/artist", data);
        }
    });
});


/**
 * -------------------
 * GET ALL SONGS FROM ONE ARTIST
 * -------------------
 */

app.get(`/artists/:id/songs`, (req, res) => {
    const query = parseInt(req.params.id);

    let command = `SELECT songs.*, artists.name AS artist_name FROM songs INNER JOIN artists ON songs.artist_id = artists.id WHERE artists.id = ${query}`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            const foundSongs = result.rows;
            const data = {
                songs: foundSongs,
            };
            res.render("artists/artists-songs", data);
        }
    });
});

/**
 * -------------------
 * CREATE A NEW SONG FOR A SPECIFIC ARTIST
 * -------------------
 */

app.get(`/artists/:id/songs/new`, (req, res) => {
    const query = parseInt(req.params.id);

    let command = `SELECT * FROM artists WHERE id = ${query}`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            const artist = result.rows[0];
            const data = {
                artistData: artist,
            };
            res.render(`artists/new-song-byartist`, data);
        }
    });
});


/**
 * -------------------
 * UPDATE AN ARTIST
 * -------------------
 **/


app.put(`/artists/:id`, (req, res) => {
    const query = parseInt(req.params.id);

    let command = `UPDATE Artists SET name='${req.body.name}', photo_url='${req.body.photo_url}', nationality='${req.body.nationality}' WHERE id = ${query} RETURNING *`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            res.redirect(`/artists/${query}`);
        }
    });
});


/**
 * -------------------
 * DELETE AN ARTIST
 * -------------------
 */

app.delete(`/artists/:id`, (req, res) => {

    const query = parseInt(req.params.id)

    const command = `DELETE FROM Artists WHERE id = ${query} RETURNING *`

    pool.query(command, (err, result) => {

        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            res.redirect(`/artists`);
        }

    })

})

/**
 * -------------------
 * CREATE AN ARTIST
 * -------------------
 */

app.post(`/artists`, (req, res) => {
    let values = [req.body.name, req.body.photo_url, req.body.nationality];

    let command = `INSERT INTO Artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *`;

    pool.query(command, values, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            res.redirect(`/artists/${result.rows[0].id}`);
        }
    });
});

/**
 * -------------------
 * DISPLAY ALL ARTISTS
 * -------------------
 */


app.get(`/artists`, (req, res) => {

    let command = `SELECT * FROM artists ORDER BY id ASC`

    pool.query(command, (err, result) => {

        if (err) {
            console.log(`There was an error.`);
            console.log(err.message)
        } else {
            const artistArr = result.rows;
            const artistData = {
                artists: artistArr
            }

            res.render('artists/all-artists', artistData)

        }
    })
})


/**
 * =========================================================
 * =========================================================
 * |###########          ROUTES - SONGS        ############|
 * =========================================================
 * =========================================================
 */

/**
 * -------------------
 * DISPLAY FORM FOR ADDING A NEW SONG.
 * -------------------
 */

app.get(`/songs/new`, (req, res) => {
    let command = `SELECT id, name FROM artists`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            const data = {
                artistData: result.rows,
            };
            res.render("songs/new-song", data);
        }
    });
});

/**
 * -------------------
 * DISPLAY FORM FOR EDITING A SONG.
 * -------------------
 */
app.get(`/songs/:id/edit`, (req, res) => {
    const query = parseInt(req.params.id);

    let getSongAndArtistName = `SELECT songs.*, artists.name AS artist_name FROM songs INNER JOIN artists ON songs.artist_id = artists.id WHERE songs.id = ${query}`;

    pool.query(getSongAndArtistName, (err, result) => {
        if (err) {
            console.log(`There was an error.`);
            console.log(err.message);
        } else {
            let data = {
                songData: result.rows[0],
            };

            pool.query(
                `SELECT id, name FROM artists ORDER BY id ASC`,
                (err, result) => {
                    if (err) {
                        console.log(`There was an error.`);
                        console.log(err.message);
                    } else {
                        data.artistsData = result.rows;
                        res.render("songs/edit-song", data);
                    }
                });
        }
    });
});

/**
 * -------------------
 * DISPLAY A SONG.
 * -------------------
 */
app.get(`/songs/:id`, (req, res) => {
    const query = parseInt(req.params.id);
    let command = `SELECT songs.*, artists.name AS artist_name FROM songs INNER JOIN artists ON songs.artist_id = artists.id WHERE songs.id = ${query}`;
    pool.query(command, (err, result) => {
        if (err) {
            console.log(`There was an error.`);
            console.log(err.message);
        } else {
            const foundSong = result.rows[0];
            const data = {
                songData: foundSong,
            };

            res.render("songs/song", data);
        }
    });
});

/**
 * -------------------
 * UPDATE A SONG.
 * -------------------
 */

app.put(`/songs/:id`, (req, res) => {
    const query = parseInt(req.params.id);

    let command = `UPDATE songs SET title = '${req.body.title}', album = '${req.body.album}', preview_link = '${req.body.preview_link}', artwork = '${req.body.artwork}', artist_id = ${req.body.artistId} WHERE id=${query} RETURNING *`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            res.redirect(`/songs/${result.rows[0].id}`);
        }
    });

});

/**
 * -------------------
 * DELETE A SONG.
 * -------------------
 */
app.delete(`/songs/:id`, (req, res) => {
    const query = parseInt(req.params.id);

    let command = `DELETE FROM songs WHERE id = ${query}`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            res.redirect(`/songs`);
        }
    });
});

/**
 * -------------------
 * DISPLAY ALL SONGS.
 * -------------------
 */
app.get(`/songs`, (req, res) => {
    let command = `SELECT * FROM songs ORDER BY id ASC`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`There was an error.`);
            console.log(err.message);
        } else {
            const songData = result.rows;
            const data = {
                songs: songData,
            };
            res.render("songs/all-songs", data);
        }
    });
});


/**
 * -------------------
 * CREATE A SONG.
 * -------------------
 */
app.post(`/songs`, (req, res) => {

    const values = [req.body.title, req.body.album, req.body.preview_link, req.body.artwork, req.body.artistId];

    let command = `INSERT INTO Songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    pool.query(command, values, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            res.redirect(`/songs/${result.rows[0].id}`);
        }
    });

})


/**
 * =========================================================
 * =========================================================
 * |###########          ROUTES - PLAYLIST        ##########|
 * =========================================================
 * =========================================================
 */

/**
 * -------------------
 * DISPLAY FORM FOR ADDING A NEW PLAYLIST.
 * -------------------
 */

app.get(`/playlists/new`, (req, res) => {
    res.render('playlists/new-playlist');
})

/**
 * -------------------
 * DISPLAY FORM FOR ADDING A NEW PLAYLIST.
 * -------------------
 */

app.post(`/playlists`, (req, res) => {
    let command = `INSERT INTO playlists (name) VALUES ('${req.body.name}') RETURNING *`;
    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            res.redirect(`/playlists/${result.rows[0].id}`);
        }
    });
})


app.get(`/playlists/:id/newsong`, (req, res) => {
    let command = `SELECT * FROM songs`;
    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            const data = {
                songs: result.rows,
            };

            let command2 = `SELECT * FROM playlists WHERE id = ${req.params.id}`

            pool.query(command2, (err, result) => {
                data.playlist = result.rows[0];
                res.render(`playlists/addto-playlist`, data)
            })
        }
    });
});

app.get(`/playlists/:id`, (req, res) => {
    const playlistId = parseInt(req.params.id);

    let command = `SELECT * FROM playlist_song INNER JOIN playlists ON playlist_song.playlist_id = playlists.id INNER JOIN songs ON playlist_song.song_id = songs.id WHERE playlists.id = ${playlistId}`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            const data = {
                playListData: result.rows,
            };
            res.render(`playlists/playlist`, data);
        }
    });
});

app.post(`/playlists/:id`, (req, res) => {
    const playlistId = parseInt(req.params.id);
    const songId = parseInt(req.body.songId);
    let command = `INSERT INTO playlist_song (song_id, playlist_id) VALUES (${songId}, ${playlistId}) RETURNING *`;
    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            const data = {
                playlist: result.rows[0],
            };
            res.redirect(`/playlists/${playlistId}`);
        }
    });
});

app.get(`/playlists`, (req, res) => {
    let command = `SELECT * FROM playlists`;
    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            const data = {
                playlists: result.rows,
                visits: req.cookies.visits
            };
            res.render(`playlists/all-playlists`, data)
        }
    });
});
app.get(`/login`, (req, res) => {
    res.render(`login`);
});

app.get(`/logout`, (req, res) => {

    req.cookies.isLoggedIn = false;
    req.cookies.currentUser = "";
    res.cookie(`isLoggedIn`, false);
    res.cookie(`currentUser`, null);
    res.cookie(`currentUserId`, null);


    res.redirect(`/`)

})

app.post(`/login`, (req, res) => {
    let usernameInput = req.body.username;
    let hashedPassword = sha256(req.body.password)

    let command = `SELECT * FROM users WHERE username = '${usernameInput}' AND password = '${hashedPassword}'`;

    console.log(command)
    pool.query(command, (err, result) => {
        if (err) {
            return console.log(`Query error:`, err);
        } else {
            let data = {
                errorMsg: ""
            }
            if (result.rows[0] === undefined) {
                data.errorMsg = `Sorry, you have given an incorrect username or password.`
                res.render(`login`, data)
            } else {
                res.cookie(`currentUser`, usernameInput);
                res.cookie(`currentUserId`, result.rows[0].id);
                res.cookie(`isLoggedIn`, true);
                res.redirect(`/`);
            }

        }
    });
});

app.get(`/register`, (req, res) => {
    res.render(`register`)
})

app.post(`/register`, (req, res) => {
    let values = [req.body.username, sha256(req.body.password)]
    let usernameInput = req.body.username;

    // VALIDATION CHECK.
    if (usernameInput.includes(' ')) {
        const data = {
            errorMsg: `Username should not have any spaces`
        }
        return res.render(`register`, data)
    }

    let command = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`

    pool.query(command, values, (err, result) => {

        if (err) {
            return console.log(`Query error:`, err)
        } else {
            res.cookie(`currentUser`, usernameInput);
            res.cookie(`currentUserId`, result.rows[0].id);
            res.cookie(`isLoggedIn`, true);
            res.redirect(`/`)
        }

    });

});


app.get(`/favourites/new`, (req, res) => {
    const data = {
        isLoggedIn: req.cookies.isLoggedIn,
        errorMsg: "",
    };
    if (req.cookies.isLoggedIn === "false") {
        data.errorMsg = `You are not logged in. Please login first.`;
        res.render(`favourites/all-favourites`, data);
    } else {
        let command = `SELECT * FROM songs`;
        pool.query(command, (err, result) => {
            if (err) {
                return console.log(`Query error:`, err);
            } else {
                data.songs = result.rows;
                return res.render(`favourites/add-favourite`, data);
            }
        });
    }
});

app.get(`/favourites`, (req, res) => {

    console.log(req.cookies.currentUserId)

    const data = {
        isLoggedIn: req.cookies.isLoggedIn,
        errorMsg: ""
    }
    if (req.cookies.isLoggedIn === 'false') {
        data.errorMsg = `You are not logged in. Please login first.`;
        res.render(`favourites/all-favourites`, data);
    } else {
        const userId = req.cookies.currentUserId
        let command = `SELECT songs.* FROM favourites INNER JOIN songs ON favourites.song_id = songs.id WHERE favourites.user_id = ${userId} ;`;
        pool.query(command, (err, result) => {
            if (err) {
                return console.log(`Query error:`, err);
            } else {
                data.faves = result.rows;
                return res.render(`favourites/all-favourites`, data);
            }
        });
    }
});

app.post(`/favourites`, (req,res)=> {

    const song = parseInt(req.body.songId);

    let command = `INSERT INTO favourites (user_id, song_id) VALUES (${req.cookies.currentUserId}, ${song})`
    pool.query(command, (err, result)=> {
        if (err) {
            return console.log(`Query error:`,err)
        } else {
            res.redirect(`favourites/all-favourites`)
        }
    })
})

/**
 * ===================================
 * |||||||||| HOME ROUTE |||||||||||||
 * ===================================
 */

app.get("/", (req, res) => {
    let visitCount = req.cookies["visits"];

    if (visitCount === undefined) {
        visitCount = 1;
    } else {
        visitCount++;
    }

    res.cookie(`visits`, visitCount, {
        expire: new Date() + 180000
    });

    const data = {
        visits: visitCount,
    };
    if (visitCount > 100) {
        data.badge = `Veteran`
    } else if (visitCount > 50) {
        data.badge = `Repeat`
    } else if (visitCount > 10) {
        data.badge = `Newbie`
    }

    res.render("home", data);
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