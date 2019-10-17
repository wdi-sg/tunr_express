console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

const cookieParser = require('cookie-parser');

const sha256 = require('js-sha256');
const SALT = "gasei20rocks";

// Initialise postgres client
const configs = {
    user: 'siewling',
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
app.use(cookieParser());


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

// GET Method - respond with HTML page with form to create new artist
app.get('/artists/new', (request, response) => {
    response.render('newArtist');
});

// GET Method - query database for all artists
app.get('/artists/', (request, response) => {

    // Construct the select statement to get all artists from database
    const queryString = "SELECT * FROM artists";

    // Use pool.query to run the select query
    pool.query(queryString, (err, result) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {

            const data = {
                artists: result.rows
            };
            // respond with HTML page displaying all artists
            response.render('allArtists', data);
        }
    });
});

// GET Method - query database for an individual artist
app.get('/artists/:id', (request, response) => {

    // Get the ID from the URL parameter
    let artistID = request.params.id;

    const inputValues = [artistID];

    // Construct the select statement to get all artists from database
    const queryString = "SELECT * FROM artists WHERE id = $1";

    // Use pool.query to run the select query
    pool.query(queryString, inputValues, (err, result) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {

            const data = {
                artist: result.rows
            };
            // respond with HTML page displaying all artists
            response.render('artistInfo', data);
        }
    });
});

// POST Method - to create new artist in DB
app.post('/artists', (request, response) => {

    // Get the individual values from each field of the request body
    let artistName = request.body.artistName;
    let photoURL = request.body.photoURL;
    let nationality = request.body.nationality;

    const inputValues = [artistName, photoURL, nationality];

    // Construct the insert into query with the values from the request body
    const queryString = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *";

    // Use pool.query to run the insert query
    pool.query(queryString, inputValues, (err, result) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {
            response.redirect("/artists");
        }
    });
});

// GET method - To display songs for an artist
app.get('/artists/:id/songs', (request, response) => {

    // Get the ID from the URL parameter
    let artistID = request.params.id;

    const inputValues = [artistID];

    // Construct the select query to get the song where the artist id = param id
    const queryString = "SELECT songs.title, songs.album, artists.name FROM songs INNER JOIN artists ON (artists.id = songs.artist_id) WHERE artist_id = $1";

    // Display the result using pool.query
    pool.query(queryString, inputValues, (err, result) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {

            const data = {
                artistSongs: result.rows
            };

            response.render('artistSongs', data);
        }
    });
});

// GET method - To render form for creating new song for the artist
app.get('/artists/:id/songs/new', (request, response) => {

    // Get the ID from the URL parameter
    let artistID = request.params.id;

    const inputValues = [artistID];

    // Construct the select query to get the song where the artist id = param id
    const getArtistName = "SELECT * FROM artists WHERE id = $1";

    // Display the result using pool.query
    pool.query(getArtistName, inputValues, (err, result) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {

            const data = {
                artistName: result.rows
            };
            //response.send(data.artistName);
            response.render('artistNewSong', data);
        }
    });
});

// POST method - To save new song for the artist
app.post('/artists/:id/songs', (request, response) => {

    // Get the ID from the URL parameter
    let artistID = request.params.id;

    // Get values from request body and save in variables
    let songTitle = request.body.songTitle;
    let album = request.body.album;
    let previewLink = request.body.previewLink;
    let artwork = request.body.artwork;

    let inputValues = [songTitle, album, previewLink, artwork, artistID];

    // Construct the insert query to save the artist's new song to DB
    const createArtistSong = "INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";

    // Run pool.query
    pool.query(createArtistSong, inputValues, (err, result) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {

            //Console log successful result
            console.log("Song added successfully");
            response.redirect('/artists/' + artistID + '/songs');
        }
    });
});

// GET method - To render edit artist form
app.get('/artists/:id/edit', (request, response) => {
    // Get the ID from the URL parameter
    let artistID = request.params.id;

    const inputValues = [artistID];

    // Construct the select statement to get all artists from database
    const queryString = "SELECT * FROM artists WHERE id = $1";

    // Use pool.query to run the select query
    pool.query(queryString, inputValues, (err, result) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {

            const data = {
                artistID: result.rows[0].id,
                artistName: result.rows[0].name,
                photoURL: result.rows[0].photo_url,
                nationality: result.rows[0].nationality
            };

            // respond with HTML page
            response.render('editArtistInfo', data);
        }
    });
});

// PUT method to update artist info back to database
app.put('/artists/:id/', (request, response) => {
    // Get the ID from the URL parameter
    let artistID = request.params.id;

    let artistName = request.body.artistName;
    let photoURL = request.body.photoURL;
    let nationality = request.body.nationality;

    const inputValues = [artistName, photoURL, nationality, artistID];

    // Construct the update statement
    const queryString = "UPDATE artists SET name = $1, photo_url = $2, nationality = $3 WHERE id = $4";

    pool.query(queryString, inputValues, (err, result) => {
        if (err) {
            console.log("Error: ", err.message);
        } else {
            response.redirect("/artists/" + artistID);
        }
    });
});

// GET method - To render delete artist form
app.get('/artists/:id/delete', (request, response) => {
    // Get the ID from the URL parameter
    let artistID = request.params.id;

    const inputValues = [artistID];

    // Construct the select statement to get all artists from database
    const queryString = "SELECT * FROM artists WHERE id = $1";

    // Use pool.query to run the select query
    pool.query(queryString, inputValues, (err, result) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {

            const data = {
                artistID: result.rows[0].id,
                artistName: result.rows[0].name,
                photoURL: result.rows[0].photo_url,
                nationality: result.rows[0].nationality
            };

            // respond with HTML page
            response.render('deleteArtist', data);
        }
    });
});

// DELETE method to delete artist info from database
app.delete('/artists/:id/', (request, response) => {
    // Get the ID from the URL parameter
    let artistID = request.params.id;

    const inputValues = [artistID];

    // Construct the update statement
    const queryString = "DELETE from artists WHERE id = $1";

    pool.query(queryString, inputValues, (err, result) => {
        if (err) {
            console.log("Error: ", err.message);
        } else {
            response.redirect("/artists");
        }
    });
});

// GET Method - get form to show all playlists
app.get('/playlist/', (request, response) => {

    // Construct query to select all playlist from database using pool.query
    const getAllPlaylists = "SELECT * FROM playlist";

    pool.query(getAllPlaylists, (err, result) => {
        if (err) {
            console.log("Error: ", err.message);
        } else {
            // Store the result as data object
            const data = {
                playlists: result.rows
            };

            response.render('allPlaylist', data);
        }
    });
});

// GET Method - get form to create new playlist
app.get('/playlist/new', (request, response) => {

    response.render('newPlaylist');
});

// POST Method - Save new playlist
app.post('/playlist', (request, response) => {

    // Get the data from request body
    let newPlaylistName = request.body.playlistName;

    const inputValues = [newPlaylistName];

    // Construct insert query
    const createPlaylist = "INSERT INTO playlist (name) VALUES ($1) RETURNING *";

    // Call pool.query to save the request body to database
    pool.query(createPlaylist, inputValues, (err, result) => {
        if (err) {
            console.log("Error: ", err.message);
        } else {
            response.redirect("/playlist");
        }
    });

});

// GET Method - get form to show details of individual playlist
app.get('/playlist/:id', (request, response) => {

    let playlistId = request.params.id;

    const inputValues = [playlistId];

    // Construct query to select the specified playlist from database using pool.query
    const getSpecificPlaylist = "SELECT title FROM songs INNER JOIN playlist_song ON (songs.id = playlist_song.song_id) WHERE playlist_id = $1";

    pool.query(getSpecificPlaylist, inputValues, (err, resultOfSongTitle) => {
        if (err) {
            console.log("Error: ", err.message);
        } else {

            const getPlaylistName = "SELECT name FROM playlist WHERE id = $1";

            pool.query(getPlaylistName, inputValues, (err, resultOfPlaylistName) => {
                if (err) {
                    console.log("Error getting playlist name: ", err.message);
                } else {
                    // Store the result as data object
                    const data = {
                        songTitle: resultOfSongTitle.rows,
                        playlistName: resultOfPlaylistName.rows[0]
                    };

                    // response.send(data.songTitle);
                    // response.send(data.playlistName);
                    response.render('playlistInfo', data);
                }
            });
        }
    });
});

// GET Method - get form to add song to playlist
app.get('/playlist/:id/newsong', (request, response) => {

    let playlistId = request.params.id;

    const inputValues = [playlistId];

    // Construct query to select the specified playlist from database using pool.query
    const getSpecificPlaylist = "SELECT * FROM playlist WHERE id = $1";

    pool.query(getSpecificPlaylist, inputValues, (err, resultOfPlaylistName) => {
        if (err) {
            console.log("Error: ", err.message);
        } else {

            const getAllSongs = "SELECT * FROM songs";

            pool.query(getAllSongs, (err, resultOfSongList) => {

                if (err) {
                    console.log("Error getting songs: ", err.message);
                } else {
                    // Store the result as data object
                    const data = {
                        playlistName: resultOfPlaylistName.rows,
                        songList: resultOfSongList.rows
                    };

                    response.render('addSongToPlaylist', data);
                }
            });
        }
    });
});

// POST Method - To add song to playlist
app.post('/playlist/:id', (request, response) => {

    // Get the ID
    let playlistId = request.params.id;

    // Get the song ID entered from the request body
    let inputSongID = request.body.songID;
    // response.send(request.body.songID);

    let inputValues = [inputSongID, playlistId];

    // Construct the query to insert the playlist ID and inputSongID into playlist_song table
    const addSongToPlaylistQuery = "INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2) RETURNING *";

    // Call pool.query to run the query
    pool.query(addSongToPlaylistQuery, inputValues, (err, result) => {
        if (err) {
            console.log("Error adding song to playlist: ", err.message);
        } else {
            response.send("Song added to playlist!");
        }
    });
});

// GET method - To render registration page
app.get('/register', (request, response) => {
    response.render('register');
});

// POST method - To save user account details to DB
app.post('/register', (request, response) => {

    // Get request body values
    let inputUsername = request.body.username;

    let inputPassword = request.body.password;
    let hashedInputPassword = sha256(inputPassword);

    const inputValues = [inputUsername, hashedInputPassword];

    // Construct INSERT query
    const createUserQuery = "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";

    // Use pool.query to store in DB
    pool.query(createUserQuery, inputValues, (err, result) => {

        if (err) {
            console.log("Error creating user: " + err.message);
        } else {
            // After user has been created, set cookie
            let userId = result.rows[0].id;
            response.cookie('user_id', userId);

            let currentSessionCookie = sha256(userId + SALT);
            response.cookie('logged_in', currentSessionCookie);

            response.render('home');
        }
    });
});

// GET method - To render login page
app.get('/login', (request, response) => {
    response.render('login');
});

// POST method - To allow user to login if verified
app.post('/login', (request, response) => {

    // Get request body values
    let inputUsername = request.body.username;

    let inputPassword = request.body.password;
    let hashedInputPassword = sha256(inputPassword);

    const inputValues = [inputUsername];

    // Construct SELECT query
    const verifyUserQuery = "SELECT * FROM users WHERE username = $1";

    // Use pool.query to store in DB
    pool.query(verifyUserQuery, inputValues, (err, result) => {
        // If user exists
        if (result.rows.length > 0) {

            // Check if password is correct
            if (hashedInputPassword === result.rows[0].password) {

                // If user has correct username and password, set cookie, log user in
                let userId = result.rows[0].id;
                response.cookie('user_id', userId);

                let currentSessionCookie = sha256(userId + SALT);
                response.cookie('logged_in', currentSessionCookie);

                response.render('home');

            } else {
                response.send("Password do not match!");
            }

        } else {
            response.send("Cannot find user!");
        }
    });
});

// GET method - To display all favorite songs
app.get('/favorites', (request, response) => {

    let userId = request.cookies["user_id"];
    const inputValues = [userId];

    if (userId !== undefined) {

        // Get all favorite songs for this user ID
        const getFavoriteSongs = "SELECT songs.title FROM songs INNER JOIN favorites ON (favorites.song_id = songs.id) WHERE favorites.user_id = $1";

        pool.query(getFavoriteSongs, inputValues, (err, result) => {
            if (err) {
                console.log("Error getting favorite songs: ", err.message);
            } else {
                const data = {
                    favSongList: result.rows
                };

                response.render('favorites', data);
            }
        });

    } else {
        response.send("You must login to access favorites page.");
    }

});

// GET method - To render add song to favorites page
app.get('/favorites/new', (request, response) => {

    let userId = request.cookies["user_id"];

    if (userId !== undefined) {
        response.render('newFavorites');
    } else {
        response.send("You must login to access favorites page.");
    }
});

// POST method - To save the song to favorites
app.post('/favorites', (request, response) => {

    // Get value from request body & cookie
    let userId = request.cookies["user_id"];
    let songId = request.body.songID;

    let inputValues = [songId, userId];

    // Construct insert statement
    const createFavorite = "INSERT INTO favorites (song_id, user_id) VALUES ($1, $2) RETURNING *";

    // Save to DB using pool.query
    pool.query(createFavorite, inputValues, (err, result) => {
        if (err) {
            console.log("Error adding favorite song: ", err.message);
        } else {
            response.redirect("/favorites");
        }
    });
});

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