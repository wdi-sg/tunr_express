console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'postgres',
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

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {
  // respond with HTML page displaying all pokemon
  response.render('home');
});

// Show all artists
app.get('/artists', (request, response) => {
  // query database for all artists
  const queryString = 'select * from artists'

  pool.query(queryString, (err, result) => {
    if(err) {
        console.error('query error: ', err.stack);
        response.send('query error');
    }
    else{
        const data = {"result" : result.rows};
        response.render('allartists', data);
    }
  })
});

// Show single artist
app.get('/artists/:id/songs', (request, response) => {
    // Get ID of artist
    const id = request.params.id;

    // Get artist details
    let artistDetails;

    let getArtistDetails = new Promise((resolve, reject) => {
        const queryString = `select * from artists where id=${id}`

        pool.query(queryString, (err, result) => {
            if(err) {
                console.error('query error: ', err.stack);
                response.send('query error');
            }
            else{
                artistDetails = result.rows;
                resolve();
            }
        })
    })

    // Get all songs from artist
    let allSongDetails;

    let getSongDetails = new Promise((resolve, reject) => {
        const queryString2 = `select * from songs where artist_id = ${id}`

        pool.query(queryString2, (err, result) => {
            if(err) {
                console.error('query error: ', err.stack);
                response.send('query error');
            }
            else{
                allSongDetails = result.rows;
                resolve();
            }
        })
    })

    Promise.all([getArtistDetails, getSongDetails]).then(() => {
        const data = {"artistDetails" : artistDetails, "allSongDetails" : allSongDetails};
        response.render('singleartist', data);
    })

});


/*
====================
Creating a new Artist
=======================
*/

app.get('/artists/new', (request, response) => {

    response.render('newartist');
})

app.post('/artists', (request, response) => {
    // query database for all artists
    let queryString = 'insert into artists (name, photo_url, nationality) values ($1, $2, $3) returning *';

    const artist = request.body;

    const values = [artist.name, artist.photo_url, artist.nationality];

    pool.query(queryString, values, (err, result) => {
        if(err) {
            console.error('query error: ', err.stack);
            response.send('query error');
        }
        else{
            response.send(result.rows);
        }
    })
})



/***************
================
================
================
Playlist Part
================
================
================

***************/

////////////Show All playlists
app.get('/playlist', (request,response) => {
    let queryString = `select * from playlist`

    pool.query(queryString, (err, result) => {
        if(err){
            console.error('query error: ', err.stack);
            response.send('query error');
        }
        else{
            const data = {"result" : result.rows};
            response.render('allplaylists', data);
        }
    })
})


////////////
//////////// Creating new Playlist
app.get('/playlist/new', (request, response) => {
    response.render('newplaylist');
})

app.post('/playlists/show', (request, response) => {
    const artistName = request.body.playlist;

    let queryString = 'insert into playlist (playlist_name) values ($1) returning *'

    const values = [artistName];

    pool.query(queryString, values, (err, result) => {
        if(err) {
            console.error('query error: ', err.stack);
            response.send('query error');
        }
        else{
            const data = result.rows;
            response.send(result.rows);
        }
    })
})


/********************
=====================

Add song to playlist from exisitng database

=====================
********************/

app.get('/playlist/:id/newsong', (request, response) => {
    const id = request.params.id;

    let playlistDetails;

    let allSongsDetails;

    let allArtistsDetails;

    // Async function to get all relevant details from database before rendering
    async function getDetails(){
        // Identify playlist that is requested
        const queryString = `select * from playlist where id=${id}`

        // Get playlist details
        let getPlaylistDetails = new Promise((resolve, reject) => {
            pool.query(queryString, (err, result) => {
                if(err){
                    console.error('query error: ', err.stack);
                    response.send('query error');
                }
                else{
                    playlistDetails = result.rows;
                    resolve('resolved');
                }
            })
        })

        // Get all songs from database
        const queryString2 = `select * from songs`

        let getAllSongs = new Promise((resolve, reject) => {
            pool.query(queryString2, (err, result) => {
                if(err){
                    console.error('query error: ', err.stack);
                    response.send('query error');
                }
                else{
                    allSongsDetails = result.rows;
                    resolve('resolved');
                }
            })
        })

        // Get all songs from database
        const queryString3 = `select * from artists`

        let getAllArtists = new Promise((resolve, reject) => {
            pool.query(queryString3, (err, result) => {
                if(err){
                    console.error('query error: ', err.stack);
                    response.send('query error');
                }
                else{
                    allArtistsDetails = result.rows;
                    resolve('resolved');
                }
            })
        })

        await Promise.all([getPlaylistDetails, getAllSongs, getAllArtists]);

        const data = {"playlistDetails" : playlistDetails, "songsDetails" : allSongsDetails, "artistsDetails" : allArtistsDetails };

        response.render('addsong', data);
    }
    getDetails()

});


app.post('/playlist/:id', (request, response) => {

    const id = request.params.id;

    let playlistDetails;

    const songID = request.body.song;

    let songTitles;

    let artistNames;

    async function addSongPlaylist() {
        // Get playlist details
        const queryString = `select * from playlist where id=${id}`

        let getPlaylistDetails = new Promise((resolve, reject) => {
            pool.query(queryString, (err, result) => {
                if(err){
                    console.error('query error: ', err.stack);
                    response.send('query error');
                }
                else{
                    playlistDetails = result.rows;
                    resolve('resolved');
                }
            })
        })

        let queryString2 = 'insert into playlist_song (playlist_id, song_id) values ($1, $2) returning *'

        const values = [id, songID]


        let addSongDB = new Promise((resolve, reject) => {
            pool.query(queryString2, values, (err, result) => {
                if(err){
                    console.error('query error: ', err.stack);
                    response.send('query error');
                }
                else{
                    resolve('resolved');
                }
            })
        })

        addSongDB.then(() => {
            // Inner join 3 tables, song table, artist table, and playlist_song
            let queryString3 = `
                SELECT
                    songs.title,
                    songs.album,
                    songs.preview_link,
                    artists.name
                FROM
                    songs
                INNER JOIN playlist_song
                ON (songs.id = playlist_song.song_id)
                INNER JOIN artists
                ON (songs.artist_id = artists.id)
            `;

            pool.query(queryString3, (err, result) => {
                if(err){
                    console.error('query error: ', err.stack);
                    response.send('query error');
                }
                else{
                    const data = {"playlistSongs" : result.rows, "playlistDetails" : playlistDetails};
                    response.render('singleplaylist', data);
                }
            })
        })
        /* Need a better way to use the async await, it is now hanging by a thread. sequence of operations should be as follows
        1. Get the playlist details
        2. asynchronously add the new song to the playlist
        3. get the songs within the playlist after the new song is added
        4. render the results once the (1)playlist details (2)songs in playlist are all retrieved.
        */
    }
    addSongPlaylist();
})



/**********************
=======================

Show individual playlist

==========================
***********************/
app.get('/playlist/:id', (request, response) => {
    const id = request.params.id;

    let playlistDetails;

    let songDetails;

    async function getSongPlaylist() {
        // Get playlist details
        const queryString = `select * from playlist where id=${id}`

        let getPlaylistDetails = new Promise((resolve, reject) => {
            pool.query(queryString, (err, result) => {
                if(err){
                    console.error('query error: ', err.stack);
                    response.send('query error');
                }
                else{
                    playlistDetails = result.rows;
                    resolve('resolved');
                }
            })
        })



        let getSongDetails = new Promise((resolve, reject) => {
            // Inner join 3 tables, song table, artist table, and playlist_song
            let queryString2 = `
                SELECT
                    songs.title,
                    songs.album,
                    songs.preview_link,
                    artists.name
                FROM
                    songs
                INNER JOIN playlist_song
                ON (songs.id = playlist_song.song_id)
                INNER JOIN artists
                ON (songs.artist_id = artists.id)
            `;

            pool.query(queryString2, (err, result) => {
                if(err){
                    console.error('query error: ', err.stack);
                    response.send('query error');
                }
                else{
                    songDetails = result.rows
                    resolve('resolve');
                }
            })
        })

        Promise.all([getPlaylistDetails, getSongDetails]).then(() => {
            const data = {"playlistSongs" : songDetails, "playlistDetails" : playlistDetails};

            response.render('singleplaylist', data);
        });
    }

    getSongPlaylist();
})



/***************
================
================
================
Artost Part
================
================
================

***************/





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