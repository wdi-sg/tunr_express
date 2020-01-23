console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'stuartmyers',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
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
 * Routes
 * ===================================
 */


// Display all at root page
app.get('/', (request, response) => {
    // respond with HTML page displaying all
    const queryString = "SELECT * FROM artists"
    pool.query(queryString, (err, result) => {
        if (err) {
            console.log(err);
            response.render('home', {
                message: "Error!"
            });
            return;
        }
        if (!result.rows.length) {
            const data = {
                message: "No artists in database "
            };
            response.render('home', data);
            return;
        }

        data = {
            artists: result.rows
        };
        response.render('artists', data);
    })

});


app.get('/artists/', (request, response) => {
    response.status(300).redirect('/');
})


// Add a new artist page
app.get('/artists/new', (request, response) => {
    // respond with HTML page with form to create new
    response.render('new');
});


// List all songs for a given artist.
app.get('/artists/:id/songs', (request, response) => {
    if (isNaN(request.params.id)) {
        response.render('home', {
            message: 'Invalid Id No.'
        });
        return;
    };
    const queryString = "SELECT * FROM artists WHERE id=$1";
    const queryValues = [request.params.id];
    pool.query(queryString, queryValues, (err, artistResult) => {
        if (!artistResult.rows.length) {
            const data = {
                message: "Invalid Artist Id."
            };
            response.render('home', data);
            return;
        }

        const artist = artistResult.rows[0];
        const queryString = "SELECT * FROM songs WHERE artist_id=$1";
        pool.query(queryString, queryValues, (err, songResult) => {
            if (err) {
                console.log(err);
                response.render('home', {
                    message: "Error!"
                });
                return;
            }
            if (!songResult.rows.length) {
                const data = {
                    message: "Invalid Artist Id"
                };
                response.render('home', data);
                return;
            }
            const songs = songResult.rows;

            const data = {
                songs: songs,
                artist: artist
            };
            response.render('songs', data);
        })
    })
})


// Edit an artist:
app.get('/artists/:id/edit', (request, response) => {
    if (isNaN(request.params.id)) {
        response.render('home', {
            message: 'Invalid Id No.'
        });
        return;
    };
    const queryString = "SELECT * FROM artists WHERE id=$1";
    const queryValues = [request.params.id];
    pool.query(queryString, queryValues, (err, artistResult) => {
        if (!artistResult.rows.length) {
            const data = {
                message: "Invalid Artist Id."
            };
            response.render('home', data);
            return;
        }
        const artist = artistResult.rows[0];
        const data = {
            artist: artist
        };
        response.render('edit', data);
    })
})


app.get('/artists/:id', (request, response) => {
    if (isNaN(request.params.id)) {
        response.render('home', {
            message: 'Invalid Id No.'
        });
        return;
    };
    const queryString = "SELECT * FROM artists WHERE id=$1";
    const queryValues = [request.params.id];
    pool.query(queryString, queryValues, (err, result) => {
        if (err) {
            console.log(err);
            response.render('home', {
                message: "Error!"
            });
            return;
        }
        if (!result.rows.length) {
            const data = {
                message: "Invalid Artist Id"
            };
            response.render('home', data);
            return;
        }
        const artist = result.rows[0];
        const data = {
            artist: artist
        };
        response.render('artist', data);

    })
})


app.put('/artists/:id', (request, response) => {
    const queryString = "UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4 RETURNING *;"
    const queryValues = [request.body.name, request.body.photo_url, request.body.nationality, request.params.id];
    pool.query(queryString, queryValues, (err, result) => {
        if (err) {
            console.log(err);
            response.render('home', {
                message: "Error!"
            })
            return;
        }
        const artist = result.rows[0];
        const message = "This record has been updated";
        const data = {
            artist: artist,
            message: message
        }
        response.render('artist', data);
    })
})


app.post('/artists', (request, response) => {
    // respond with HTML page with form to create new
    const message = `${request.body.name} = ${request.body.photo_url} - ${request.body.nationality}`;
    const queryString = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3);"
    const queryValues = [request.body.name, request.body.photo_url, request.body.nationality];
    pool.query(queryString, queryValues, (err, result) => {
        if (err) {
            console.log(err);
            response.render('home', {
                message: "Error!"
            })
            return;
        }

        const message = "artist added";
        const data = {
            message: message
        };
        response.render('home', data);
    })
});


/**
 * ===================================
 * PLaylist Functions
 * ===================================
 */

app.get('/playlist', (request, response) => {
    const queryString = `SELECT * FROM playlist;`;
    pool.query(queryString, (err, result) => {
        if (err) {
            console.log(err);
            response.render('home', {
                message: "Error!"
            })
            return;
        }
        if (!result.rows.length) {
            const data = {
                message: "Playlist does not exist."
            };
            response.render('home', data);
            return;
        }

        const playlists = result.rows;
        const message = "Playlists";
        const data = {
            message: message,
            playlists: playlists
        };
        response.render('playlists', data);
    })
})


app.get('/playlist/new', (request, response) => {
    response.render('newplaylist');
})


app.get('/playlist/:id/newsong', (request, response) => {
    const queryString = `SELECT * FROM songs;`;
    pool.query(queryString, (err, result) => {
        if (err) {
            console.log(err);
            response.render('home', {
                message: "Error!"
            })
            return;
        }
        if (!result.rows.length) {
            const data = {
                message: "No songs in database."
            };
            response.render('home', data);
            return;
        }
        const songs = result.rows;
        const data = {
            playlistid: request.params.id,
            songs: songs
        }
        response.render('addtoplaylist', data);
    })
})


app.post(`/playlist/:id`, (request, response) => {
    const queryString = `INSERT INTO playlist_songs (playlist_id, song_id) VALUES ($1, $2);`;
    const queryValues = [request.params.id, request.body.songindex];
    pool.query(queryString, queryValues, (err, result) => {
        if (err) {
            console.log(err);
            response.render('home', {
                message: "Error!"
            })
            return;
        }

        const message = "Song added to playlist";
        data = {
            message: message
        };
        response.render('home', data);
    })
})


app.post('/playlist', (request, response) => {
    const playListName = request.body.name;
    const queryString = `INSERT INTO playlist (name) VALUES ($1) RETURNING *;`;
    const queryValues = [playListName];
    pool.query(queryString, queryValues, (err, result) => {
        if (err) {
            console.log(err);
            response.render('home', {
                message: "Error!"
            })
            return;
        }

        const playList = result.rows[0];

        const message = `Playlist ${playListName} added`;
        const data = {
            message: message,
            playList: playList
        };
        response.render('playlist', data);
    })
})


app.get('/playlist/:id', (request, response) => {
    if (isNaN(request.params.id)) {
        response.render('home', {
            message: 'Invalid Id No.'
        });
        return;
    }
    const queryString = `SELECT * FROM playlist WHERE id=$1`;
    const queryValues = [request.params.id];
    pool.query(queryString, queryValues, (err, result) => {
        if (err) {
            console.log(err);
            response.render('home', {
                message: "Error!"
            })
            return;
        }

        if (result.rows.length === 0) {
            console.log(err);
            response.render('home', {
                message: `Error: id ${request.params.id} not valid.`
            })
            return;
        }

        const playList = result.rows[0];

        const songQueryString = `SELECT songs.artist_id, songs.title, songs.album, songs.preview_link FROM songs INNER JOIN playlist_songs ON (playlist_songs.song_id = songs.id) WHERE playlist_songs.playlist_id = $1;`;
        const songQueryValues = [request.params.id];
        pool.query(songQueryString, songQueryValues, (err, result) => {
            if (err) {
                console.log(err);
                response.render('home', {
                    message: "Error!"
                })
                return;
            }

            const songs = result.rows;

            const data = {
                playList: playList,
                songs: songs
            };
            response.render('playlist', data);
        })


    })
})


/**
 * ===================================
 * Registration and log in
 * ===================================
 */

app.get('/register', (request, response) => {
    console.log("HEEEEELLLLLPPPPPP");
    response.render('register');
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
