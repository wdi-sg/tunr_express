console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

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

// GET Method - query database for all artists
app.get('/artists/', (request, response) => {

    // Construct the select statement to get all artists from database
    const queryString = 'SELECT * FROM artists';

    // Use pool.query to run the select query
    pool.query(queryString, (err, result) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {

            const data = {
                artists: result.rows
            };
            // respond with HTML page displaying all artists
            response.render('home', data);
        }
    });
});

// GET Method - query database for an individual artist
app.get('/artists/:id', (request, response) => {

    // Get the ID from the URL parameter
    let artistID = request.params.id;

    // Construct the select statement to get all artists from database
    const queryString = 'SELECT * FROM artists WHERE id=' + artistID;

    // Use pool.query to run the select query
    pool.query(queryString, (err, result) => {

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

// GET Method - respond with HTML page with form to create new artist
app.get('/artists/new', (request, response) => {
    response.render('newArtist');
});

// POST Method - to create new artist in DB
app.post('/artists', (request, response) => {

    // Get the individual values from each field of the request body
    let artistName = request.body.artistName;
    let photoURL = request.body.photoURL;
    let nationality = request.body.nationality;

    const inputValues = [artistName, photoURL, nationality];

    // Construct the insert into query with the values from the request body
    const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)';

    // Use pool.query to run the insert query
    pool.query(queryString, inputValues, (err, result) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {
            response.send("Artist added successfully");
        }
    });

    response.send(request.body);
});

// GET method - To display songs for an artist
app.get('/artists/:id/songs', (request, response) => {

    // Get the ID from the URL parameter
    let artistID = request.params.id;

    // Construct the select query to get the song where the artist id = param id
    const queryString = 'SELECT * FROM songs WHERE artist_id=' + artistID;

    // Display the result using pool.query
    pool.query(queryString, (err, resultOfSongsByArtist) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {

            const getArtistName = 'SELECT name FROM artists WHERE id=' + artistID;

            pool.query(getArtistName, (err, resultOfArtistName) => {

                const data = {
                    artistName: resultOfArtistName.rows,
                    artistSongs: resultOfSongsByArtist.rows
                };

                response.render('artistSongs', data);
            });
        }
    });
});

// GET method - To render edit artist form
app.get('/artists/:id/edit', (request, response) => {
    // Get the ID from the URL parameter
    let artistID = request.params.id;

    // Construct the select statement to get all artists from database
    const queryString = 'SELECT * FROM artists WHERE id=' + artistID;

    // Use pool.query to run the select query
    pool.query(queryString, (err, result) => {

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

    // Construct the update statement
    const queryString = "UPDATE artists SET name= '" + request.body.artistName + "' , photo_url= '" + request.body.photoURL + "' , nationality= '" + request.body.nationality + "' WHERE id= " + artistID;

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log("Error: ", err.message);
        } else {
            response.send("Artist info updated!");
        }
    });
});

// GET method - To render delete artist form
app.get('/artists/:id/delete', (request, response) => {
    // Get the ID from the URL parameter
    let artistID = request.params.id;

    // Construct the select statement to get all artists from database
    const queryString = 'SELECT * FROM artists WHERE id=' + artistID;

    // Use pool.query to run the select query
    pool.query(queryString, (err, result) => {

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

    // Construct the update statement
    const queryString = "DELETE from artists WHERE id= " + artistID;

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log("Error: ", err.message);
        } else {
            response.send("Artist info deleted!");
        }
    });
});

// GET Method - get form to show all playlists
app.get('/playlist/', (request, response) => {

    // Construct query to select all playlist from database using pool.query
    const getAllPlaylists = 'SELECT * FROM playlist';

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
    const createPlaylist = 'INSERT INTO playlist (name) VALUES ($1)';

    // Call pool.query to save the request body to database
    pool.query(createPlaylist, inputValues, (err, result) => {
        if (err) {
            console.log("Error: ", err.message);
        } else {
            response.send("Playlist created successfully.");
        }
    });

});

// GET Method - get form to show details of individual playlist
app.get('/playlist/:id', (request, response) => {

    let playlistId = request.params.id;

    // Construct query to select the specified playlist from database using pool.query
    const getSpecificPlaylist = 'SELECT title FROM songs INNER JOIN playlist_song ON (songs.id = playlist_song.song_id) WHERE playlist_id = ' + playlistId;

    pool.query(getSpecificPlaylist, (err, resultOfSongTitle) => {
        if (err) {
            console.log("Error: ", err.message);
        } else {

            const getPlaylistName = 'SELECT name FROM playlist WHERE id = ' + playlistId;

            pool.query(getPlaylistName, (err, resultOfPlaylistName) => {
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

    // Construct query to select the specified playlist from database using pool.query
    const getSpecificPlaylist = 'SELECT * FROM playlist WHERE id=' + playlistId;

    pool.query(getSpecificPlaylist, (err, resultOfPlaylistName) => {
        if (err) {
            console.log("Error: ", err.message);
        } else {

            const getAllSongs = 'SELECT * FROM songs';

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
    const addSongToPlaylistQuery = "INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2)";

    // Call pool.query to run the query
    pool.query(addSongToPlaylistQuery, inputValues, (err, result) => {
        if (err) {
            console.log("Error adding song to playlist: ", err.message);
        } else {
            response.send("Song added to playlist!");
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