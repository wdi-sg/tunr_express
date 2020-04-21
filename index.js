console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser')
const sha256 = require('js-sha256');

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

app.use(cookieParser());

app.use(express.static('public'))

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

// Home Page
app.get('/', (request, response) => {
  // set cookie for visits
  let visits = request.cookies.visits;

  if (visits === undefined) {
    visits = 1;
  } else {
    visits = parseInt(visits) + 1;
  }
  response.cookie('visits', visits);

  // Get login status
  const loggedIn = request.cookies.loggedIn;

  // Get username if logged in
  let data;
  if(loggedIn === 'true'){
    const username = request.cookies.username;
    data = {"visits" : visits, "username" : username}
  }else{
    data = {"visits" : visits, "username" : false}
  }

  response.render('home', data);
});

// Login
app.get('/login', (request, response) => {

    // Get username and password
    const username = request.query.user;

    const password = request.query.password;

    let userID;

    let userStatus = false;

    let promise = new Promise((resolve, reject) => {
        // Check if username exists
        const queryString = `select * from users where username='${username}'`

        pool.query(queryString, (err, results) => {
            if(err) {
                console.error('query error: ', err.stack);
                response.send('query error');
            }
            else if(results.rows.length > 0){
                userStatus = true;
                userID = results.rows[0].id
                resolve();
            }
            else{
                response.send('wrong username');
            }
        })
    })

    // Check if password is correct if username exists
    promise.then(() => {
        // hash password input
        hashPassword = sha256(password);

        const queryString2 = `select password from users where username = '${username}'`
        if (userStatus){
            pool.query(queryString2, (err, results) => {
                if(err) {
                    console.error('query error: ', err.stack);
                    response.send('query error');
                }
                else if(results.rows.length > 0 && hashPassword === results.rows[0].password){
                    response.cookie('username', results.rows[0].username);
                    response.cookie('loggedIn', 'true');
                    response.cookie('user_id', userID);
                    response.redirect("/");
                }
                else{
                    response.send('wrong password, try again!');
                }
            })
        }
    })

})

// Account registration
app.get('/register', (request, response) => {
    response.render('register');
})

app.post('/register', (request, response) => {
    const username = request.body.username;

    const password = request.body.password;

    const password2 = request.body.password2;

    // Convert password into hash
    let hashPassword;

    if (password === password2) {
        hashPassword = sha256(password);
    }else{
        response.send('Wrong password entered for 2nd password')
    }

    // Insert user and pass into database
    let queryString = `insert into users (username, password) values ($1, $2) returning id`

    values = [username, hashPassword];

    let userID;

    pool.query(queryString, values, (err, results) => {
        if(err) {
            console.error('query error: ', err.stack);
            response.send('query error');
        }
        else{
            userID = results.rows[0].id;
            console.log(userID);
            response.cookie('username', username);
            response.cookie('loggedIn', 'true');
            response.cookie('user_id', userID);
            response.redirect('/');
        }
    })

})


/********************
====================
Artist stuff
====================
********************/

// Show all artists
app.get('/artists', (request, response) => {
  let visits = request.cookies.visits;

  // query database for all artists
  const queryString = 'select * from artists'

  pool.query(queryString, (err, result) => {
    if(err) {
        console.error('query error: ', err.stack);
        response.send('query error');
    }
    else{
        const data = {"result" : result.rows, "visits" : visits};
        response.render('allartists', data);
    }
  })
});

// Show single artist
app.get('/artists/:id/songs', (request, response) => {
    let visits = request.cookies.visits;

    console.log('redirect works');
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
        const data = {"artistDetails" : artistDetails, "allSongDetails" : allSongDetails, "visits" : visits};
        response.render('singleartist', data);
    })

});

/*
===================
Creating a new Song
====================
*/

app.get('/artists/:id/songs/new', (request, response) => {
    let visits = request.cookies.visits;

    const data = {"artistID" : request.params.id, "visits" : visits};

    response.render('newsong', data);
})

// Add song into database
app.post('/artists/:id/songs', (request, response) => {
    let visits = request.cookies.visits;

    const id = request.params.id;

    const songDetails = request.body;

    // Add song into song database
    let addSongDB = new Promise((resolve, reject) => {
        let queryString = 'insert into songs (title, album, preview_link, artwork, artist_id) values ($1, $2, $3, $4, $5)'

        const values = [songDetails.title, songDetails.album, songDetails.preview_link, songDetails.artwork, id];

        pool.query(queryString, values, (err, result) => {
            if(err) {
                console.error('query error: ', err.stack);
                response.send('query error');
            }
            else{
                console.log('successfully added song into db');
                resolve();
            }
        })
    })

    addSongDB.then(() => {
        response.redirect(`/artists/${id}/songs`);
    })

    // // Get artist details
    // let artistDetails;

    // let getArtistDetails = new Promise((resolve, reject) => {
    //     const queryString = `select * from artists where id=${id}`

    //     pool.query(queryString, (err, result) => {
    //         if(err) {
    //             console.error('query error: ', err.stack);
    //             response.send('query error');
    //         }
    //         else{
    //             artistDetails = result.rows;
    //             resolve();
    //         }
    //     })
    // })

    // // Get all songs from artist
    // let allSongDetails;

    // let getSongDetails = new Promise((resolve, reject) => {
    //     const queryString2 = `select * from songs where artist_id = ${id}`

    //     pool.query(queryString2, (err, result) => {
    //         if(err) {
    //             console.error('query error: ', err.stack);
    //             response.send('query error');
    //         }
    //         else{
    //             allSongDetails = result.rows;
    //             resolve();
    //         }
    //     })
    // })

    // addSongDB.then(() => {
    //     Promise.all([getArtistDetails, getSongDetails]).then(() => {
    //         const data = {"artistDetails" : artistDetails, "allSongDetails" : allSongDetails};
    //         response.redirect(`/artists/${id}/songs`);
    //     })
    // })
})


/*
====================
Creating a new Artist
=======================
*/

app.get('/artists/new', (request, response) => {
    let visits = request.cookies.visits;

    const data = {'visits' : visits};

    response.render('newartist', data);
})

app.post('/artists', (request, response) => {
    let visits = request.cookies.visits;

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
    let visits = request.cookies.visits;

    let queryString = `select * from playlist`

    pool.query(queryString, (err, result) => {
        if(err){
            console.error('query error: ', err.stack);
            response.send('query error');
        }
        else{
            const data = {"result" : result.rows, 'visits' : visits};
            response.render('allplaylists', data);
        }
    })
})


////////////
//////////// Creating new Playlist
app.get('/playlist/new', (request, response) => {
    let visits = request.cookies.visits;

    const data = {'visits' : visits};
    response.render('newplaylist', data);
})

app.post('/playlists/show', (request, response) => {
    let visits = request.cookies.visits;
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
    let visits = request.cookies.visits;

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

        const data = {"playlistDetails" : playlistDetails, "songsDetails" : allSongsDetails, "artistsDetails" : allArtistsDetails, 'visits' : visits };

        response.render('addsong', data);
    }
    getDetails()

});


app.post('/playlist/:id', (request, response) => {
    let visits = request.cookies.visits;

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
                    console.log(result.rows)
                    const data = {"playlistSongs" : result.rows, "playlistDetails" : playlistDetails, 'visits' : visits};
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
    let visits = request.cookies.visits;

    const id = request.params.id;

    let playlistDetails;

    let songDetails;

    let favouriteSongs;

    const userID = request.cookies.user_id;

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
                    songs.id,
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

        let getFavouriteSongs = new Promise((resolve, reject) => {
            let queryString3 = `select songs_id from favourites where user_id=${userID}`

            pool.query(queryString3, (err, result) => {
                if(err){
                    console.error('query error: ', err.stack);
                    response.send('query error');
                }
                else{
                    favouriteSongs = result.rows;
                    resolve('resolve');
                }
            })

        })

        Promise.all([getPlaylistDetails, getSongDetails, getFavouriteSongs]).then(() => {
            const data = {"playlistSongs" : songDetails, "playlistDetails" : playlistDetails, 'favouriteSongs' : favouriteSongs, 'visits' : visits};

            response.render('singleplaylist', data);
        });
    }

    getSongPlaylist();
})



/***************
================
================
================
Favourites Part
================
================
================

***************/

app.post('/addfavourites/:id', (request, response) => {
    const playlistID = request.params.id;

    const songID = request.body.songID;

    const userID = request.cookies.user_id;

    // Add song into favourites database
    let queryString = 'insert into favourites (songs_id, user_id) values ($1, $2) returning *'

    const values=[songID, userID];

    pool.query(queryString, values, (err, results) => {
        if(err){
            console.error('query error: ', err.stack);
            response.send('query error');
        }
        else{
            response.redirect(`/playlist/${playlistID}`)
        }
    })
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