console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser')
var sha256 = require('js-sha256');
const salt = "the world is not enough"


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


//home page/landing page
app.get('/', (request, response) => {
    response.render('home');
});

//new user reg form
app.get('/users/new', (request,response) => {
    response.render('register');
});


//new artist form page
app.get('/artists/new', (request, response) => {
    // respond with HTML page with form to create new artist
    response.render('new');
});

//get all songs by artist
app.get('/artists/:id/songs', (request, response) => {
    let id = request.params.id;
    let text1 = "SELECT name FROM artists WHERE id=$1"
    let values1 = [id];
    pool.query(text1, values1, (err1, result1) => {
        if (err1) {
            console.log("Error :", err1);
            response.status(500).send("ERROR");
        }
        console.log("result : ", result1);
        let artistName = result1.rows[0].name;
        let text2 = "SELECT title, id FROM songs WHERE artist_id=$1";
        let values2 = [id];
        pool.query(text2, values2, (err2, result2) => {
            if (err2) {
                console.log("Error :", err2);
                response.status(500).send("ERROR");
            }
            let data = {
                songs : result2.rows,
                id : id,
                artist : artistName
            };
            response.render('songlist', data)
        })
    })
})

//add song to artist
app.get('/artists/:id/addsong', (request, response) => {
    let artistId = request.params.id;
    let data = {
        artistId : artistId
    };
    response.render('songadd', data)
})


//show artist's details
app.get('/artists/:id', (request, response) => {
    let id = request.params.id;
    let text = "SELECT * FROM artists WHERE id=$1";
    let values = [id];
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log("Error :", err);
            response.status(500).send("ERROR")
        }
        let data = result.rows[0];
        response.render('artists', data);
    })
})

//show list of artists
app.get('/artists', (request, response) => {
    let text = "SELECT * FROM artists ORDER BY id ASC";
    pool.query(text, (err, result) => {
        if (err) {
            console.log("Error :", err);
            response.status(500).send("You got an error")
        }
        let data = {
            artists : result.rows
        };
        response.render('alist', data)
    })
})

//get for songs in favs
app.get('/favs', (request, response) => {
    let text1 = "SELECT songs.title, songs.id FROM songs INNER JOIN favs ON (songs.id = favs.song_id) WHERE favs.users_id=$1 ORDER BY songs.id ASC;";
    let values1 = [request.cookies.userId]
    let text2 = "SELECT title, id FROM songs ORDER BY id ASC;";
    pool.query(text1, values1, (err1, result1) => {
        pool.query(text2, (err2, result2) => {
            let data;
            if (result1.rows.length == 0) {
                data = {
                    songs : result2.rows,
                    fSongs : []
                };
            } else {
                data = {
                    songs : result2.rows,
                    fSongs : result1.rows
                };
            }
            response.render('fav', data)
        })
    })
})



//List of all songs
app.get('/songs', (request, response) => {
    let text = "SELECT title, id FROM songs ORDER BY id ASC";
    pool.query(text, (err, result) => {
        if (err) {
            console.log("Error :", err);
            response.status(500).send("Error Finding songs");
        }
        let data = {
            songs : result.rows
        }
        response.render('songs', data);
    })
})

//form for adding new songs to playlist
app.get('/playlists/:id/new', (request, response) => {
    let playId = request.params.id;
    let text = "SELECT songs.id, songs.title FROM songs ORDER BY id ASC";
    pool.query(text, (err, result) => {
        let data = {
            songs : result.rows,
            playId : playId
        };
        response.render('playadd', data)
    })
})


//display specific playlist
app.get('/playlists/:id', (request, response) => {
    let playId = request.params.id;
    let text = "SELECT songs.id, songs.title, playlist.name, playlist.id AS playlist_id FROM playlist INNER JOIN playlist_song ON (playlist_song.playlist_id = playlist.id) INNER JOIN songs ON (playlist_song.song_id = songs.id) WHERE playlist.id=$1"
    let values = [playId];
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log("Error :", err);
            response.status(500).send("Error finding songs in playlist.");
        }
        if (result.rows.length > 0) {
            let data = {
                playlists : result.rows,
                name : result.rows[0].name,
                play_id : result.rows[0].playlist_id
            };
            response.render('playlist', data)
        } else {

        }//else statement
    })
})


//show all playlists
app.get('/playlists', (request, response) => {
    let text = "SELECT * FROM playlist ORDER BY id ASC";
    pool.query(text, (err, result) => {
        if (err) {
            console.log("error :", err);
            response.status(500).send("Error finding playlists");
        }
        let data = {
            playlists : result.rows
        };
        response.render('playlists', data);
    })
})




//post route for adding new artists
app.post('/artists', (request, response) => {
    let text = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id;";
    let values = [
    request.body.name, request.body.photo_url, request.body.nationality
    ];
    let data = {
        values : values
    };
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log("Error :", err);
            response.status(500).send(err);
        } else {
            response.render('home', data)
        }
    })
})


//post route for adding new song from artist
app.post('/songs', (request, response) => {
    let text = "INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5);";
    let values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, request.body.artist_id];
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log("YOU HAVE AN ERRORORROROROOR!!!");
        }
        response.redirect('/songs')
    })
})



//post route for adding new songs to playlist
app.post('/playlists/:id', (request, response) => {
    let playId = request.params.id;
    let text = "INSERT INTO playlist_song (playlist_id, song_id) VALUES ($1, $2) RETURNING *;";
    let values = [playId, request.body.song_id];
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log("Error :", err);
            response.statu(500).send("Error adding song to playlist");
        }
        response.redirect('/playlists/'+playId);
    })
})


//post route for adding new playlists
app.post('/playlists', (request, response) => {
    let text = "INSERT INTO playlist (name) VALUES ($1) RETURNING *;";
    let values = [request.body.name];
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log("ERror :", err);
            response.status(500).send("Error")
        }
        response.render('home');
    })
});


//post route for logging off
app.delete('/users/logout', (request, response) => {
    response.clearCookie("logSess");
    response.clearCookie("userId")
    response.redirect('/');
});


//post route for adding users
app.post('/users', (request,response) => {
    let text1 = "SELECT name FROM users WHERE name=$1;";
    let values1 = [request.body.name];
    pool.query(text1, values1, (err1, result1) => {
        if (result1.rows.length === 0) {
            let passhash = sha256(request.body.password+salt);
            let text2 = "INSERT INTO users (name, passhash) VALUES ($1, $2) RETURNING id;";
            let values2 = [request.body.name, passhash];
            pool.query(text2, values2, (err2, result2) => {
                if (err2) {
                    console.log("Error :", err2)
                    response.status(500).send("Error")
                }
                let session = sha256(result2.rows[0].id + "logged" + salt);
                response.cookie('logSess', session);
                response.cookie('userId', result2.rows[0].id)
                response.redirect('/')
            })
        } else {
            let data = {invalid : "Username Already In Use"}
            response.render('register', data)
        }
    })

})

//post route for logging in
app.post('/', (request, response) => {
    let password = sha256(request.body.password+salt);
    let text = "SELECT * FROM users WHERE name=$1;";
    let values = [request.body.user];
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log("Err : ", err);
            response.status(500).send("Error Logging")
        }
        if (result.rows.length === 0) {
            response.send("No such user found.")
        } else {
            if (result.rows[0].passhash == password) {
                let session = sha256(result.rows[0].id + "logged" + salt);
                response.cookie('userId', result.rows[0].id)
                response.cookie('logSess', session);
                response.redirect('/')
            } else {
                response.send("Password Invalid!!");
            }
        }
    })
})


//post for adding songs to fav
app.post('/favs', (request, response) => {
    let text = "INSERT INTO favs (song_id, users_id) VALUES ($1, $2);";
    let values = [request.body.song_id, request.cookies.userId];
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log("Error :", err);
            response.status(500).send("YOU GOT ERROR MATE IN YOUR FAVS");
        }
        response.redirect('/');
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